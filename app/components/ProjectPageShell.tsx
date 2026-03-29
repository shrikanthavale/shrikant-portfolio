import SubpageTopBar from "@/app/components/SubpageTopBar";
import ProjectTabs, { type ProjectTab } from "@/app/components/ProjectTabs";
import { TECH_BADGE_META } from "@/app/components/ProjectCard";
import { siteConfig } from "@/app/site.config";
import type { Project } from "@/app/data/projects";
import { Cpu } from "lucide-react";

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
