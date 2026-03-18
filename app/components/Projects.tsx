import ProjectCard from "./ProjectCard";
import Link from "next/link";
import { projects } from "@/app/data/projects";

export default function Projects() {
  return (
    <section id="projects" className="section-ambient border-t border-slate-200 bg-white dark:border-gray-800 dark:bg-slate-900/30">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-700 dark:text-sky-300">Selected delivery work</p>
            <h2 className="heading-gradient mt-3 text-3xl font-bold tracking-tight sm:text-5xl">Featured projects</h2>
            <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8 dark:text-gray-400">
              Case studies focused on backend implementation, architecture decisions, and measurable engineering outcomes across operational systems.
            </p>
          </div>

          <div className="glass-card max-w-sm rounded-2xl p-5 lg:min-w-[280px]">
            <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">Portfolio snapshot</p>
            <div className="mt-3 flex items-end gap-3">
              <span className="text-3xl font-bold text-slate-900 dark:text-white">{projects.length}</span>
              <span className="pb-1 text-sm text-slate-500 dark:text-slate-400">project case studies</span>
            </div>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-gray-400">
              Distributed systems, enterprise modernization, and release-quality engineering documented as implementation stories rather than generic portfolio tiles.
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-6 md:gap-7 lg:grid-cols-3">
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              title={project.title}
              description={project.description}
              tags={project.tags}
              detailsHref={`/projects/${project.slug}`}
              detailsLabel="View project page"
              variant="compact"
            />
          ))}
        </div>

        <div className="mt-8 flex justify-center lg:justify-end">
          <Link
            href="/projects"
            className="inline-flex items-center rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-sky-500/30 transition-all duration-200 hover:scale-105 hover:bg-sky-500 hover:shadow-md hover:shadow-sky-400/40"
          >
            View all projects →
          </Link>
        </div>
      </div>
    </section>
  );
}
