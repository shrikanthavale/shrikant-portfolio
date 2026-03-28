import SubpageTopBar from "@/app/components/SubpageTopBar";
import { projects } from "@/app/data/projects";
import { notFound } from "next/navigation";
import ThesisArchitecture from "@/app/components/ThesisArchitecture";

export function generateMetadata() {
  const project = projects.find((p) => p.slug === "secure-code-execution-engine");
  if (!project) return { title: "Project not found" };
  return {
    title: `${project.title} | Project Details`,
    description: project.description,
  };
}

export default function SecureCodeExecutionEnginePage() {
  const project = projects.find((p) => p.slug === "secure-code-execution-engine");
  if (!project) notFound();

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
          <p className="mt-4 text-sm font-medium text-slate-500 dark:text-slate-400">Role: {project.role}</p>
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

        <section className="mt-10 grid gap-6 md:grid-cols-2">
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
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Impact</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-gray-400">
              Successfully prototyped a system where student code submitted via Moodle was compiled and executed in
              isolated remote VMs, preventing damage to the host system — the same concept used today by platforms
              like HackerRank and LeetCode.
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
        </section>

        <section className="glass-card mt-6 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">The problem: executing untrusted code</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-gray-400">
            Automated evaluation of programming assignments requires actually running student-submitted code. That code
            is untrusted by definition — a student may knowingly or unknowingly submit programs that delete files,
            exhaust memory, spin infinite loops, or open network connections to internal services. Reek (1989) noted
            this directly: execution of alien code in a live environment may result in damage to or disclosure of the
            system or data held therein.
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-gray-400">
            The thesis evaluated four isolation approaches before landing on VM-per-user: static analysis (bypassable
            with reflection), Java Security Manager (same-JVM, no resource limits, now removed in Java 21),
            Unix accounts with ulimit (shared kernel, no per-submission tree limits), and finally full VM isolation —
            the only approach that closes every vector in the threat model.
          </p>
        </section>

        <section className="glass-card mt-6 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Architecture and implementation highlights</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-gray-400">
            The system was structured as four layers, each with a clear abstraction boundary so the application layer
            could be swapped without changing the isolation infrastructure beneath it.
          </p>
          <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-600 dark:text-gray-400">
            {project.architecture.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
          <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-900/70">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-700 dark:text-sky-300">
              End-to-end flow
            </p>
            <ol className="mt-3 space-y-1.5 text-sm leading-7 text-slate-600 dark:text-gray-400 [counter-reset:step]">
              {[
                "Student submits Java code via a programming question in a Moodle quiz",
                "Moodle plugin calls the REST API with the source code and student ID",
                "REST API clones the base SliTaz VM and assigns it to the student",
                "Code is transferred to the VM via SSH, compiled, and executed",
                "Output is returned to the REST API, graded against expected results",
                "Result and feedback are written back to the Moodle gradebook",
              ].map((step) => (
                <li key={step} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-400 dark:bg-slate-600" aria-hidden="true" />
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
          <ThesisArchitecture />
        </section>

        <section className="glass-card mt-6 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Trade-offs and what I would do differently today</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-gray-400">
            Full VMs provide the strongest isolation guarantee but are expensive — boot time, disk footprint, and
            memory overhead per user make the 1-VM-per-user model impractical at scale. The thesis future work section
            explicitly named Docker containerization as the natural successor, written in 2015 before container runtimes
            were production-stable.
          </p>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-gray-400">
            Today the same architecture would use gVisor or Firecracker microVMs at the execution layer — kernel-level
            isolation without full VM overhead — with cgroups v2 for hard CPU and memory limits, network namespace
            isolation to block all egress by default, and a read-only root filesystem with a short-lived writable
            scratch mount discarded after each run. The REST API contract and Moodle plugin architecture would remain
            unchanged; only the virtualization layer beneath would be swapped.
          </p>
        </section>

      </article>
    </main>
  );
}
