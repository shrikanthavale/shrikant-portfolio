import { notFound } from "next/navigation";
import type { Metadata } from "next";
import SubpageTopBar from "@/app/components/SubpageTopBar";
import { getProjectBySlug, projects } from "@/app/data/projects";
import { siteUrl } from "@/app/lib/config";
import SystemArchitecture from "@/app/components/SystemArchitecture";
import PortfolioArchitecture from "@/app/components/PortfolioArchitecture";
import ProjectTabs, { type ProjectTab, TechStackContent } from "@/app/components/ProjectTabs";
import { TECH_BADGE_META } from "@/app/components/ProjectCard";
import { Cpu } from "lucide-react";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

const architectureLabelsBySlug: Record<string, string[]> = {
  "emergency-operations-control-platform": [
    "Gateway and service boundaries",
    "Asynchronous coordination",
    "Low-latency shared state",
    "Fault isolation",
  ],
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  return params.then(({ slug }) => {
    const project = getProjectBySlug(slug);
    if (!project) return { title: "Project not found" };
    return {
      title: project.title,
      description: project.description,
      alternates: { canonical: `${siteUrl}/projects/${slug}` },
      openGraph: {
        type: "article",
        title: `${project.title} | Shrikant Havale`,
        description: project.description,
        url: `${siteUrl}/projects/${slug}`,
        images: [{ url: "/profile.jpg", width: 500, height: 500, alt: "Shrikant Havale" }],
      },
      twitter: {
        card: "summary_large_image",
        title: `${project.title} | Shrikant Havale`,
        description: project.description,
        images: ["/profile.jpg"],
      },
    };
  });
}

export default async function ProjectPage({ params }: Readonly<ProjectPageProps>) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  const architectureLabels = architectureLabelsBySlug[slug] ?? [];

  let architectureContent: React.ReactNode;
  if (slug === "emergency-operations-control-platform") {
    architectureContent = (
      <>
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-gray-400">
          The delivery model centered on four architectural concerns. The diagram below shows how those concerns
          connected in the runtime flow.
        </p>
        <div className="mt-5 grid gap-3">
          {project.architecture.map((item, index) => (
            <div
              key={item}
              className="rounded-2xl border border-slate-200 bg-slate-50/80 p-4 dark:border-slate-800 dark:bg-slate-900/70"
            >
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-sky-700 dark:text-sky-300">
                {architectureLabels[index] ?? `Architecture focus ${index + 1}`}
              </p>
              <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-gray-400">{item}</p>
            </div>
          ))}
        </div>
        <SystemArchitecture embedded />
      </>
    );
  } else if (slug === "portfolio-development") {
    architectureContent = <PortfolioArchitecture />;
  } else {
    architectureContent = (
      <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600 dark:text-gray-400">
        {project.architecture.map((item) => (
          <li key={item} className="flex gap-2">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" aria-hidden="true" />
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
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Project context</h2>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-gray-400">{project.context}</p>
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
          {architectureContent}
        </div>
      ),
    },
    {
      id: "outcomes",
      label: "Outcomes",
      content: (
        <div className="glass-card rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Outcomes</h2>
          <ul className="mt-3 space-y-2 text-sm leading-7 text-slate-600 dark:text-gray-400">
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
          {project.preface && (
            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-700 dark:text-sky-300">
              {project.preface}
            </p>
          )}
          <h1
            className={`heading-gradient text-3xl font-bold tracking-tight sm:text-5xl ${project.preface ? "mt-3" : ""}`}
          >
            {project.title}
          </h1>
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
