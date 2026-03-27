import SubpageTopBar from "@/app/components/SubpageTopBar";
import { projects } from "@/app/data/projects";
import { notFound } from "next/navigation";
import React from "react";

export default function SecureCodeExecutionEnginePage() {
  const project = projects.find((p) => p.slug === "secure-code-execution-engine");
  if (!project) notFound();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <SubpageTopBar leftLabel="← All projects" leftHref="/projects" maxWidthClass="max-w-4xl" />
      <article className="mx-auto max-w-4xl px-6 py-20">
        {/* Hero Section */}
        <header className="border-b border-slate-200 pb-7 dark:border-slate-800">
          <h1 className="heading-gradient text-3xl font-bold tracking-tight sm:text-5xl">{project.title}</h1>
          <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-gray-400">
            Secure, scalable backend for evaluating programming assignments by executing untrusted code in isolated VMs, integrated with Moodle.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-slate-300/90 bg-white/70 px-2.5 py-1 text-[11px] font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        {/* Problem Section */}ē
        <section className="glass-card mt-10 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Problem</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-gray-400">
            Evaluating programming assignments at scale is challenging. Manual grading is slow, error-prone, and not scalable. Basic automated systems often lack security, flexibility, and cannot safely execute arbitrary code from students.
          </p>
        </section>

        {/* Core Challenge */}
        <section className="glass-card mt-6 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Core Challenge</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-gray-400">
            The main challenge is executing untrusted code submissions. Without proper isolation, malicious or buggy code can compromise the system, access sensitive data, or abuse resources.
          </p>
        </section>

        {/* Architecture Section */}
        <section className="glass-card mt-6 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Architecture</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-gray-400">
            The system flow:
          </p>
          <ol className="mt-4 space-y-2 text-sm leading-7 text-slate-600 dark:text-gray-400 list-decimal list-inside">
            <li>User submits assignment in Moodle</li>
            <li>Moodle calls backend REST API</li>
            <li>API provisions a VirtualBox VM</li>
            <li>Untrusted code is executed in the VM</li>
            <li>Result is collected and returned to Moodle</li>
          </ol>
          <div className="mt-6 flex justify-center">
            {/* Placeholder for architecture diagram */}
            <div className="h-40 w-full max-w-md rounded-xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex items-center justify-center text-slate-400 dark:text-slate-600">
              [Architecture diagram coming soon]
            </div>
          </div>
        </section>

        {/* Technical Approach */}
        <section className="glass-card mt-6 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Technical Approach</h2>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600 dark:text-gray-400 list-disc list-inside">
            <li>REST API orchestrates assignment submission, execution, and result retrieval</li>
            <li>VirtualBox VMs are provisioned on demand for each code execution</li>
            <li>Execution pipeline manages code transfer, execution, and teardown</li>
          </ul>
        </section>

        {/* Security Design */}
        <section className="glass-card mt-6 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Security Design</h2>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600 dark:text-gray-400 list-disc list-inside">
            <li>Isolation: Each submission runs in a dedicated VM, preventing code breakout</li>
            <li>Blast radius control: Resource limits and network isolation reduce risk</li>
          </ul>
        </section>

        {/* Trade-offs */}
        <section className="glass-card mt-6 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Trade-offs</h2>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600 dark:text-gray-400 list-disc list-inside">
            <li>VMs provide strong isolation but are slower to start than containers</li>
            <li>Security prioritized over raw performance for initial prototype</li>
          </ul>
        </section>

        {/* Outcome */}
        <section className="glass-card mt-6 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Outcome</h2>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600 dark:text-gray-400 list-disc list-inside">
            <li>Working prototype with safe code execution</li>
            <li>Integrated with Moodle for real assignment workflows</li>
            <li>Demonstrated secure, automated grading</li>
          </ul>
        </section>

        {/* Future Improvements */}
        <section className="glass-card mt-6 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Future Improvements</h2>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600 dark:text-gray-400 list-disc list-inside">
            <li>Switch to containers for faster startup and better resource efficiency</li>
            <li>Add a queue system for scalable, parallel execution</li>
            <li>Support for multiple programming languages</li>
          </ul>
        </section>
      </article>
    </main>
  );
}

