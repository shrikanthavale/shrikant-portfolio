---
title: "Designing a secure automated grading system for programming assignments"
date: "2026-04-08"
excerpt: "A walkthrough of the four-layer architecture behind a Moodle plugin that safely compiles and executes student-submitted Java code on isolated virtual machines."
tags: "java,architecture,security,system-design,rest-api"
source: "thesis"
---

Most automated grading systems for programming assignments share the same blind spot: they execute student code on the same machine that runs the grading platform. This works until it doesn't — and when it fails, it fails badly.

This post walks through the architecture I designed for my Master's thesis at FH Hagenberg in 2015: a Moodle plugin that evaluates Java programming assignments by routing all code execution through isolated virtual machines. The design decisions are still relevant for anyone building systems that execute untrusted code at the application layer.

## The Problem to Solve

The system needed to:

- Let instructors write programming questions with a code template and expected output
- Let students write and submit Java solutions inside Moodle
- Automatically compile and execute both, compare outputs, and assign grades
- Do all of this without running untrusted code on the host machine

The last requirement is the hard one. For the threat model and why naive approaches fail, see the earlier post on [executing untrusted code safely](/blog/executing-untrusted-code).

## Four-Layer Architecture

The system is divided into four independent layers, each with a single responsibility.

![Overall system architecture showing four layers](/images/blog/SystemArchitecture.png)

**Layer 1 — Virtualization Layer**
Hosts Oracle VirtualBox with multiple minimal Linux VMs (SliTaz Linux, ~30MB). Each VM has only what it needs: SSH, JRE, and a small utility application for compiling and executing Java programs. Nothing else. No web server, no database, no shared filesystem with the host.

**Layer 2 — Virtualization API Layer**
The Oracle VirtualBox SDK (`vboxjws.jar`) — a Java library that exposes programmatic control over VMs. This layer is vendor-provided, not custom code. It maps directly to what VirtualBox's desktop application does, but accessible via Java API calls.

**Layer 3 — VM Management and Programming API**
The core of the system. A Java/J2EE web application deployed on Tomcat that exposes a REST API. It uses the VirtualBox SDK from Layer 2 to control VMs, and SSH to transfer files and run programs inside them.

**Layer 4 — Application Layer**
The Moodle plugin. It makes HTTP calls to Layer 3 and renders results to students and instructors. It has no knowledge of what happens in the layers below — VMs, SSH, VirtualBox are all invisible to it.

The key design principle: each layer is independently replaceable. Swap VirtualBox for Docker in Layer 1 and 2, and Layer 3 adapts its SDK calls. Layer 4 never changes.

## Layer 3 in Detail: The REST API

This is where all the business logic lives. The API has two components.

### VM Management Component

Handles the lifecycle of virtual machines:

![VM Management and Programming API layer architecture](/images/blog/SystemArchitecture_VMPAPILayer.png)

```
GET  /vm/list                    → list all VMs and their status
GET  /vm/{name}                  → get VM details (IP, state, OS)
POST /vm/{name}/start            → boot the VM
POST /vm/{name}/stop             → shut down the VM
POST /vm/clone                   → clone a base VM for a new student
POST /vm/{name}/copyfile         → copy source file into VM via SSH
DELETE /vm/{name}                → delete the VM
```

The internal class structure has two layers:

- `com.fhooe.mc.thesis.virtualmachine.restapi` — Jersey REST endpoints, handles request/response marshalling
- `com.fhooe.mc.thesis.virtualmachine.business` — business logic, talks directly to VirtualBox SDK

A typical clone operation sequence: the REST endpoint receives the request, passes it to the business layer, which calls the VirtualBox SDK to find the base machine, initiates a full clone, waits for completion, and returns the new VM's details.

### Programming Component

Handles compilation and execution of Java source code inside a VM:

```
POST /program/compile            → compile Java source on target VM
POST /program/execute            → execute compiled class on target VM
```

The flow for a student submission:

1. Moodle plugin calls `POST /vm/{name}/copyfile` with the source code in XML format
2. The business layer SSHs into the VM and places the file at the expected location
3. Moodle plugin calls `POST /program/compile` with the VM name
4. The business layer SSHs into the VM and invokes the utility JAR
5. The utility extracts the source from XML, creates a `.java` file, runs `javac`
6. Compilation result (success/errors) is returned in XML format
7. If successful, Moodle calls `POST /program/execute`
8. The utility runs `java` and captures stdout/stderr
9. Result is returned to Moodle for grading

The XML format for source transfer:

```xml
<programDetails>
  <className>StudentSolution</className>
  <sourceCode>
    public class StudentSolution {
        public static void main(String[] args) {
            System.out.println("Hello World");
        }
    }
  </sourceCode>
  <action>COMPILE</action>
</programDetails>
```

## Layer 1 in Detail: The Utility Application

A small JAR installed on each VM that processes the XML file dropped by the SSH transfer, compiles or executes the Java source, and writes results back to a known location for SSH retrieval.

```
/vm-tools/
  ├── utility.jar          ← compilation/execution engine
  ├── input/               ← SSH drops XML files here
  └── output/              ← results written here, SSH reads back
```

This indirection matters: the REST API never runs `javac` or `java` directly. It copies a file and invokes a JAR. The JAR handles all compilation logic, error formatting, and output capture. This separation means the REST API doesn't need to know anything about Java compilation — it just moves files and runs a command.

## Layer 4: The Moodle Plugin

A PHP-based Moodle question type plugin that adds "Programming Question" as a question type in Moodle's quiz system.

From the instructor's perspective:

- Write a question description
- Provide a code template (scaffolding for students)
- Write or upload a reference solution
- Define expected input/output pairs for grading

From the student's perspective:

- See the question and template in the Moodle quiz interface
- Write their solution in a code editor
- Submit — grading happens automatically

The plugin consumes the REST API entirely transparently. The instructor and student never know VMs exist.

## What the Architecture Gets Right

**Separation of concerns** — each layer has one job. The Moodle plugin manages the quiz UX. The REST API manages VM lifecycle and code execution. VirtualBox manages VM infrastructure. None of these bleed into each other.

**Replaceability** — the Layer 3 REST API contract (URL structure, request/response format) is stable regardless of what's in Layers 1 and 2. You could swap VirtualBox for Docker or AWS EC2 without changing the Moodle plugin at all.

**Blast containment** — the most important property. Student code runs in a dedicated VM. Damage is contained. The host, the Moodle database, other students' VMs — all unaffected.

**Auditability** — every operation goes through the REST API. Every compilation, execution, clone, and deletion is logged at the API layer. You have a complete record of what ran, when, and on which VM.

## What It Would Do Differently Today

The architecture is sound. The implementation details would change:

- VirtualBox → Docker containers (faster startup, lighter weight, better resource limits)
- Jersey REST → Spring Boot (better ecosystem, easier testing)
- SSH file transfer → Docker volume mounts or container file copy API
- Manual XML format → JSON
- Tomcat → embedded server in Spring Boot fat JAR

The four-layer separation, the REST API contract, and the blast-containment model all stay. See the companion post [From VirtualBox to Docker](/blog/from-virtualbox-to-docker) for the full modernisation walkthrough.
