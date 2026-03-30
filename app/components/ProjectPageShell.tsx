import SubpageTopBar from "@/app/components/SubpageTopBar";
import ProjectTabs, { type ProjectTab } from "@/app/components/ProjectTabs";
import { TECH_BADGE_META } from "@/app/components/ProjectCard";
import { siteConfig } from "@/app/site.config";
import type { Project } from "@/app/data/projects";
import { Cpu, Github } from "lucide-react";

type ProjectPageShellProps = {
  project: Project;
  slug: string;
  tabs: ProjectTab[];
};

export default function ProjectPageShell({ project, slug, tabs }: Readonly<ProjectPageShellProps>) {
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

        {project.githubUrl && (
          <div className="mt-6 flex flex-col gap-3 rounded-xl border border-indigo-200 bg-indigo-50/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-indigo-800/50 dark:bg-indigo-950/30">
            <div className="flex items-center gap-3">
              <Github className="h-5 w-5 shrink-0 text-indigo-500 dark:text-indigo-400" aria-hidden="true" />
              <p className="text-sm font-medium text-indigo-800 dark:text-indigo-200">
                This portfolio is open source and available as a template
              </p>
            </div>
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-lg border border-indigo-300 bg-white px-4 py-2 text-xs font-semibold text-indigo-700 shadow-sm transition-all hover:border-indigo-500 hover:bg-indigo-600 hover:text-white sm:self-auto dark:border-indigo-700/60 dark:bg-indigo-900/40 dark:text-indigo-300 dark:hover:border-indigo-500 dark:hover:bg-indigo-600 dark:hover:text-white"
            >
              Use this template →
            </a>
          </div>
        )}

        <div className="mt-8">
          <ProjectTabs tabs={tabs} />
        </div>
      </article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: siteConfig.seo.url },
              { "@type": "ListItem", position: 2, name: "Projects", item: `${siteConfig.seo.url}/projects` },
              { "@type": "ListItem", position: 3, name: project.title, item: `${siteConfig.seo.url}/projects/${slug}` },
            ],
          }),
        }}
      />
    </main>
  );
}
