import ProjectCard from "./ProjectCard";
import Link from "next/link";
import { projects } from "@/app/data/projects";

export default function Projects() {
  return (
    <section id="projects" className="section-ambient border-t border-slate-200 bg-white dark:border-gray-800 dark:bg-slate-900/30">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="heading-gradient text-3xl font-bold tracking-tight sm:text-5xl">Featured projects</h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8 dark:text-gray-400">
            Selected work demonstrating backend design, system reliability, and engineering collaboration. Open each project for dedicated implementation and architecture details.
          </p>
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
            />
          ))}
        </div>
        <div className="mt-8 text-center">
          <Link
            href="/experience"
            className="inline-flex items-center text-sm font-medium text-sky-700 transition hover:text-sky-600 dark:text-sky-300 dark:hover:text-sky-200"
          >
            View full experience →
          </Link>
        </div>
      </div>
    </section>
  );
}
