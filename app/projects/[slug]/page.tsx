import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getProjectBySlug, projects } from "@/app/data/projects";
import SystemArchitecture from "@/app/components/SystemArchitecture";
import PortfolioArchitecture from "@/app/components/PortfolioArchitecture";
import ThesisArchitecture from "@/app/components/ThesisArchitecture";
import ProjectPageShell from "@/app/components/ProjectPageShell";
import type { ProjectTab } from "@/app/components/ProjectTabs";
import { TechStackContent } from "@/app/components/ProjectTabs";
import { buildProjectMetadata } from "@/app/lib/projectMetadata";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

const architectureLabelsBySlug: Record<string, string[]> = {
  testhoop: [
    "Spec-first API contracts",
    "Hexagonal backend",
    "Exam engine",
    "Learning loop",
    "Readiness verdict",
    "Content supply chain",
  ],
  "testhoop-qgen": [
    "Module layout",
    "Pluggable LLM backends",
    "Self-healing loop",
    "Verification oracles",
    "Content lints",
    "Import contract",
  ],
  "emergency-operations-control-platform": [
    "Gateway and service boundaries",
    "Asynchronous coordination",
    "Low-latency shared state",
    "Fault isolation",
  ],
};

type FlowStep = { step: string; title: string; detail: string };

const flowBySlug: Record<string, { heading: string; intro: string; steps: FlowStep[] }> = {
  testhoop: {
    heading: "From exam pack to readiness verdict",
    intro:
      "What a learner's path through TestHoop looks like, and where the backend contracts, the exam engine and the learning loop each do their work.",
    steps: [
      {
        step: "1",
        title: "Pick a pack",
        detail:
          "Choose a certification or entrance-exam pack — OCP Java 21, OCI, AWS AI Practitioner, MHT-CET and more. No account needed to start.",
      },
      {
        step: "2",
        title: "Sit a timed mock",
        detail:
          "The exam engine mirrors the real exam's question count, time limit and pass line; options are shuffled per attempt.",
      },
      {
        step: "3",
        title: "Review with explanations",
        detail:
          "Every option carries a worked explanation; every question has a report button that feeds back into the content pipeline.",
      },
      {
        step: "4",
        title: "Diagnose weak topics",
        detail:
          "Per-topic scores across attempts surface the weakest area with a one-click 'Drill this' shortcut.",
      },
      {
        step: "5",
        title: "Spaced review",
        detail:
          "Missed questions come back on a 1 / 3 / 7 / 16 / 35-day schedule until they stick.",
      },
      {
        step: "6",
        title: "Readiness verdict",
        detail:
          "Likely ready / Borderline / Not yet — weighted by the official topic weights where the exam owner publishes them.",
      },
    ],
  },
  "testhoop-qgen": {
    heading: "From prompt to production question",
    intro:
      "One objective's journey through the pipeline: generate, verify, lint, review, import. Nothing reaches a student without clearing an oracle or a judge.",
    steps: [
      {
        step: "1",
        title: "Generate",
        detail:
          "qgen generate -o <objective> --verified --via agent drafts a batch of questions as JSON through the LlmClient port (manual, API or headless Claude Code).",
      },
      {
        step: "2",
        title: "Verify",
        detail:
          "Each question is routed to its oracle: javac compile-and-run, JDBC against an Oracle fixture, SymPy, Pint or the chemistry verifier — or the second-model judge if it has no mechanical oracle.",
      },
      {
        step: "3",
        title: "Repair",
        detail:
          "Failures go back to the model as a repair prompt (up to --max-repairs rounds); still-broken questions are dropped and every round is logged as JSONL.",
      },
      {
        step: "4",
        title: "Lint",
        detail:
          "Key balance, duplicate and positional options, letter references in explanations — per-question lints gate the batch before it is stamped verified.",
      },
      {
        step: "5",
        title: "Review and coverage",
        detail:
          "qgen coverage prints the per-objective gap matrix and pack-level lints; a human reviews every judge-only item.",
      },
      {
        step: "6",
        title: "Import",
        detail:
          "qgen import runs the pack gates pre-flight, then POSTs idempotently through TestHoop's OpenAPI contract, keyed by content-hash external IDs guarded by ids.lock.",
      },
    ],
  },
};

function buildFlowTab(slug: string): ProjectTab | null {
  const flow = flowBySlug[slug];
  if (!flow) return null;
  return {
    id: "flow",
    label: "End-to-end flow",
    content: (
      <div className="ds-card p-6">
        <h2 className="ds-display-font ds-text text-xl">{flow.heading}</h2>
        <p className="mt-3 text-sm leading-7 ds-muted">{flow.intro}</p>
        <ol className="mt-5 space-y-3">
          {flow.steps.map(({ step, title, detail }) => (
            <li key={step} className="flex gap-4">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--ds-accent-soft)] text-xs font-bold text-[var(--ds-accent)]">
                {step}
              </span>
              <div className="pt-0.5">
                <p className="ds-text text-sm font-semibold">{title}</p>
                <p className="ds-soft mt-0.5 text-sm leading-6">{detail}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    ),
  };
}

function buildTechStackTab(tags: string[]): ProjectTab {
  return {
    id: "techstack",
    label: "Tech Stack",
    content: (
      <div className="ds-card p-6">
        <h2 className="ds-display-font ds-text text-xl">Technology stack</h2>
        <div className="mt-5">
          <TechStackContent tags={tags} />
        </div>
      </div>
    ),
  };
}

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  return params.then(({ slug }) => {
    const project = getProjectBySlug(slug);
    if (!project) return { title: "Project not found" };
    return buildProjectMetadata(project, slug);
  });
}

export default async function ProjectPage({ params }: Readonly<ProjectPageProps>) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  if (slug === "secure-code-execution-engine") {
    const tabs: ProjectTab[] = [
      {
        id: "overview",
        label: "Overview",
        content: (
          <div className="space-y-6">
            <div className="ds-card p-6">
              <h2 className="ds-display-font ds-text text-xl">Research context</h2>
              <p className="mt-3 text-sm leading-7 ds-muted">{project.context}</p>
              <p className="mt-3 text-sm leading-7 ds-muted">
                Existing automated graders were built as standalone tools — disconnected from LMS
                platforms and never designed to handle the security risks of running arbitrary
                student code. The research tackled both gaps simultaneously: full Moodle integration
                and execution isolation via per-user virtual machines.
              </p>
            </div>
            <div className="ds-card p-6">
              <h2 className="ds-display-font ds-text text-xl">
                The problem: executing untrusted code
              </h2>
              <p className="mt-3 text-sm leading-7 ds-muted">
                Automated evaluation of programming assignments requires actually running
                student-submitted code. That code is untrusted by definition — a student may
                knowingly or unknowingly submit programs that delete files, exhaust memory, spin
                infinite loops, or open network connections to internal services. Reek (1989) noted
                this directly: execution of alien code in a live environment may result in damage to
                or disclosure of the system or data held therein.
              </p>
              <p className="mt-3 text-sm leading-7 ds-muted">
                The thesis evaluated four isolation approaches before landing on VM-per-user: static
                analysis (bypassable with reflection), Java Security Manager (same-JVM, no resource
                limits, removed in Java 21), Unix accounts with ulimit (shared kernel, no
                per-submission tree limits), and finally full VM isolation — the only approach that
                closes every vector in the threat model.
              </p>
            </div>
          </div>
        ),
      },
      {
        id: "architecture",
        label: "Architecture",
        content: (
          <div className="ds-card p-6">
            <h2 className="ds-display-font ds-text text-xl">
              Architecture and implementation highlights
            </h2>
            <p className="mt-3 text-sm leading-7 ds-muted">
              The system is structured as four layers with clear abstraction boundaries — each layer
              independently replaceable without changing the infrastructure beneath it.
            </p>
            <ul className="mt-4 space-y-2 text-sm leading-7 ds-muted">
              {project.architecture.map((item) => (
                <li key={item} className="flex gap-2">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--ds-accent)]"
                    aria-hidden="true"
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <ThesisArchitecture />
            <div className="mt-8 border-t ds-rule pt-6">
              <h3 className="ds-display-font ds-text text-base">
                Trade-offs and what I would do differently today
              </h3>
              <p className="mt-3 text-sm leading-7 ds-muted">
                Full VMs provide the strongest isolation guarantee but are expensive — boot time,
                disk footprint, and memory overhead per user make the 1-VM-per-user model
                impractical at scale. The thesis future work section explicitly named Docker
                containerization as the natural successor, written in 2015 before container runtimes
                were production-stable.
              </p>
              <p className="mt-3 text-sm leading-7 ds-muted">
                Today the same architecture would use gVisor or Firecracker microVMs at the
                execution layer — kernel-level isolation without full VM overhead — with cgroups v2
                for hard CPU and memory limits, network namespace isolation to block all egress by
                default, and a read-only root filesystem with a short-lived writable scratch mount
                discarded after each run. The REST API contract and Moodle plugin architecture would
                remain unchanged; only the virtualization layer beneath would be swapped.
              </p>
            </div>
          </div>
        ),
      },
      {
        id: "outcomes",
        label: "Outcomes",
        content: (
          <div className="ds-card p-6">
            <h2 className="ds-display-font ds-text text-xl">Impact</h2>
            <p className="mt-3 text-sm leading-7 ds-muted">
              Successfully prototyped an end-to-end system where student Java code submitted in
              Moodle was compiled and executed in isolated remote VMs, with results returned
              automatically — the same architectural concept used today by HackerRank and LeetCode.
            </p>
            <ul className="mt-4 space-y-2 text-sm leading-7 ds-muted">
              {project.outcomes.map((item) => (
                <li key={item} className="flex gap-2">
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--ds-accent)]"
                    aria-hidden="true"
                  />
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
          <div className="ds-card p-6">
            <h2 className="ds-display-font ds-text text-xl">End-to-end execution flow</h2>
            <p className="mt-3 text-sm leading-7 ds-muted">
              A single programming assignment submission traverses all four layers of the system,
              from the Moodle UI to an isolated VM and back.
            </p>
            <ol className="mt-5 space-y-3">
              {[
                {
                  step: "1",
                  title: "Student submits code",
                  detail:
                    "Java source code entered in a programming question inside a Moodle quiz.",
                },
                {
                  step: "2",
                  title: "Moodle plugin calls REST API",
                  detail:
                    "The question type plugin sends the source code and student ID to the VM Management API.",
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
                  detail:
                    "Execution output is returned to the API and compared against expected results.",
                },
                {
                  step: "6",
                  title: "Result written to Moodle",
                  detail:
                    "Grade and feedback are returned to the Moodle plugin and saved to the gradebook.",
                },
              ].map(({ step, title, detail }) => (
                <li key={step} className="flex gap-4">
                  <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--ds-accent-soft)] text-xs font-bold text-[var(--ds-accent)]">
                    {step}
                  </span>
                  <div className="pt-0.5">
                    <p className="ds-text text-sm font-semibold">{title}</p>
                    <p className="ds-soft mt-0.5 text-sm leading-6">{detail}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        ),
      },
      buildTechStackTab(project.tags),
    ];
    return <ProjectPageShell project={project} slug={slug} tabs={tabs} />;
  }

  const architectureLabels = architectureLabelsBySlug[slug] ?? [];
  const flowTab = buildFlowTab(slug);

  let architectureContent: React.ReactNode;
  if (slug === "emergency-operations-control-platform") {
    architectureContent = (
      <>
        <p className="mt-3 text-sm leading-7 ds-muted">
          The delivery model centered on four architectural concerns. The diagram below shows how
          those concerns connected in the runtime flow.
        </p>
        <div className="mt-5 grid gap-3">
          {project.architecture.map((item, index) => (
            <div
              key={item}
              className="rounded-[var(--ds-radius-card)] border ds-rule bg-[var(--ds-bg-alt)] p-4"
            >
              <p className="ds-eyebrow text-xs">
                {architectureLabels[index] ?? `Architecture focus ${index + 1}`}
              </p>
              <p className="mt-2 text-sm leading-7 ds-muted">{item}</p>
            </div>
          ))}
        </div>
        <SystemArchitecture embedded />
      </>
    );
  } else if (slug === "portfolio-development") {
    architectureContent = <PortfolioArchitecture />;
  } else if (architectureLabels.length > 0) {
    architectureContent = (
      <div className="mt-5 grid gap-3">
        {project.architecture.map((item, index) => (
          <div
            key={item}
            className="rounded-[var(--ds-radius-card)] border ds-rule bg-[var(--ds-bg-alt)] p-4"
          >
            <p className="ds-eyebrow text-xs">
              {architectureLabels[index] ?? `Architecture focus ${index + 1}`}
            </p>
            <p className="mt-2 text-sm leading-7 ds-muted">{item}</p>
          </div>
        ))}
      </div>
    );
  } else {
    architectureContent = (
      <ul className="mt-3 space-y-2 text-sm leading-7 ds-muted">
        {project.architecture.map((item) => (
          <li key={item} className="flex gap-2">
            <span
              className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--ds-accent)]"
              aria-hidden="true"
            />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    );
  }

  const tabs: ProjectTab[] = [
    {
      id: "overview",
      label: "Overview",
      content: (
        <div className="ds-card p-6">
          <h2 className="ds-display-font ds-text text-xl">Project context</h2>
          <p className="mt-3 text-sm leading-7 ds-muted">{project.context}</p>
        </div>
      ),
    },
    {
      id: "architecture",
      label: "Architecture",
      content: (
        <div className="ds-card p-6">
          <h2 className="ds-display-font ds-text text-xl">
            Architecture and implementation highlights
          </h2>
          {architectureContent}
        </div>
      ),
    },
    {
      id: "outcomes",
      label: "Outcomes",
      content: (
        <div className="ds-card p-6">
          <h2 className="ds-display-font ds-text text-xl">Outcomes</h2>
          <ul className="mt-3 space-y-2 text-sm leading-7 ds-muted">
            {project.outcomes.map((item) => (
              <li key={item} className="flex gap-2">
                <span
                  className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-[var(--ds-accent)]"
                  aria-hidden="true"
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ),
    },
    ...(flowTab ? [flowTab] : []),
    buildTechStackTab(project.tags),
  ];

  return <ProjectPageShell project={project} slug={slug} tabs={tabs} />;
}
