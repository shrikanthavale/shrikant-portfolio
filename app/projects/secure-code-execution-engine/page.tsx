import SubpageTopBar from "@/app/components/SubpageTopBar";
import { projects } from "@/app/data/projects";
import { notFound } from "next/navigation";
import ThesisArchitecture from "@/app/components/ThesisArchitecture";
import ProjectTabs, { type ProjectTab, TechStackContent } from "@/app/components/ProjectTabs";
import { TECH_BADGE_META } from "@/app/components/ProjectCard";
import { Cpu } from "lucide-react";

export function generateMetadata() {
  const project = projects.find((p) => p.slug === "secure-code-execution-engine");
  if (!project) return { title: "Project not found" };
  return {
    title: project.title,
    description: project.description,
  };
}

export default function SecureCodeExecutionEnginePage() {
  const project = projects.find((p) => p.slug === "secure-code-execution-engine");
  if (!project) notFound();

  const tabs: ProjectTab[] = [
    {
      id: "overview",
      label: "Overview",
      content: (
        <div className="space-y-6">
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Research context</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-gray-400">{project.context}</p>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-gray-400">
              Existing automated graders were built as standalone tools — disconnected from LMS platforms and never
              designed to handle the security risks of running arbitrary student code. The research tackled both gaps
              simultaneously: full Moodle integration and execution isolation via per-user virtual machines.
            </p>
          </div>
          <div className="glass-card rounded-2xl p-6">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              The problem: executing untrusted code
            </h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-gray-400">
              Automated evaluation of programming assignments requires actually running student-submitted code. That
              code is untrusted by definition — a student may knowingly or unknowingly submit programs that delete
              files, exhaust memory, spin infinite loops, or open network connections to internal services. Reek
              (1989) noted this directly: execution of alien code in a live environment may result in damage to or
              disclosure of the system or data held therein.
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-gray-400">
              The thesis evaluated four isolation approaches before landing on VM-per-user: static analysis
              (bypassable with reflection), Java Security Manager (same-JVM, no resource limits, removed in Java
              21), Unix accounts with ulimit (shared kernel, no per-submission tree limits), and finally full VM
              isolation — the only approach that closes every vector in the threat model.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "architecture",
      label: "Architecture",
      content: (
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Architecture and implementation highlights
          </h2>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-gray-400">
            The system is structured as four layers with clear abstraction boundaries — each layer independently
            replaceable without changing the infrastructure beneath it.
          </p>
          <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-600 dark:text-gray-400">
            {project.architecture.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <ThesisArchitecture />
          <div className="mt-8 border-t border-slate-200 pt-6 dark:border-slate-800">
            <h3 className="text-base font-semibold text-slate-900 dark:text-white">
              Trade-offs and what I would do differently today
            </h3>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-gray-400">
              Full VMs provide the strongest isolation guarantee but are expensive — boot time, disk footprint, and
              memory overhead per user make the 1-VM-per-user model impractical at scale. The thesis future work
              section explicitly named Docker containerization as the natural successor, written in 2015 before
              container runtimes were production-stable.
            </p>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-gray-400">
              Today the same architecture would use gVisor or Firecracker microVMs at the execution layer —
              kernel-level isolation without full VM overhead — with cgroups v2 for hard CPU and memory limits,
              network namespace isolation to block all egress by default, and a read-only root filesystem with a
              short-lived writable scratch mount discarded after each run. The REST API contract and Moodle plugin
              architecture would remain unchanged; only the virtualization layer beneath would be swapped.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "outcomes",
      label: "Outcomes",
      content: (
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Impact</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-gray-400">
            Successfully prototyped an end-to-end system where student Java code submitted in Moodle was compiled
            and executed in isolated remote VMs, with results returned automatically — the same architectural
            concept used today by HackerRank and LeetCode.
          </p>
          <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-600 dark:text-gray-400">
            {project.outcomes.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    {
      id: "flow",
      label: "End-to-end flow",
      content: (
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">End-to-end execution flow</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-gray-400">
            A single programming assignment submission traverses all four layers of the system, from the Moodle UI
            to an isolated VM and back.
          </p>
          <ol className="mt-5 space-y-3">
            {[
              {
                step: "1",
                title: "Student submits code",
                detail: "Java source code entered in a programming question inside a Moodle quiz.",
              },
              {
                step: "2",
                title: "Moodle plugin calls REST API",
                detail: "The question type plugin sends the source code and student ID to the VM Management API.",
              },
              {
                step: "3",
                title: "VM cloned and assigned",
                detail:
                  "REST API uses Oracle VirtualBox SDK to clone the master SliTaz VM and boot a dedicated instance for this student.",
              },
              {
                step: "4",
                title: "Code compiled and executed",
                detail:
                  "Source is transferred to the VM via SSH, compiled with the on-VM JDK, and executed in isolation.",
              },
              {
                step: "5",
                title: "Output graded",
                detail: "Execution output is returned to the API and compared against expected results.",
              },
              {
                step: "6",
                title: "Result written to Moodle",
                detail: "Grade and feedback are returned to the Moodle plugin and saved to the gradebook.",
              },
            ].map(({ step, title, detail }) => (
              <li key={step} className="flex gap-4">
                <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-sky-100 text-xs font-bold text-sky-700 dark:bg-sky-900/50 dark:text-sky-300">
                  {step}
                </span>
                <div className="pt-0.5">
                  <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">{title}</p>
                  <p className="mt-0.5 text-sm leading-6 text-slate-500 dark:text-slate-400">{detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      ),
    },
    {
      id: "techstack",
      label: "Tech Stack",
      content: (
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Technology stack</h2>
          <div className="mt-5">
            <TechStackContent tags={project.tags} />
          </div>
        </div>
      ),
    },
  ];

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <SubpageTopBar leftLabel="← All projects" leftHref="/projects" maxWidthClass="max-w-4xl" />
      <article className="mx-auto max-w-4xl px-6 py-20">
        <header className="border-b border-slate-200 pb-7 dark:border-slate-800">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-700 dark:text-sky-300">
            {project.preface}
          </p>
          <h1 className="heading-gradient mt-3 text-3xl font-bold tracking-tight sm:text-5xl">{project.title}</h1>
          <p className="mt-4 text-base leading-8 text-slate-600 dark:text-gray-400">{project.description}</p>
          <p className="mt-3 text-sm font-medium text-slate-500 dark:text-slate-400">Role: {project.role}</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => {
              const Icon = (TECH_BADGE_META[tag] ?? { icon: Cpu }).icon;
              return (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1.5 rounded-full border border-slate-200 bg-white/80 px-3.5 py-1.5 text-xs font-semibold text-slate-700 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200"
                >
                  <Icon className="h-3.5 w-3.5 shrink-0 text-slate-400 dark:text-slate-500" aria-hidden="true" />
                  {tag}
                </span>
              );
            })}
          </div>
        </header>
        <div className="mt-8">
          <ProjectTabs tabs={tabs} />
        </div>
      </article>
    </main>
  );
}
