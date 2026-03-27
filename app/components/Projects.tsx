import ProjectCard from "./ProjectCard";
import Link from "next/link";
import { projects } from "@/app/data/projects";

const featuredSlugs = [
  "portfolio-development",
  "secure-code-execution-engine",
  "emergency-operations-control-platform",
];
const featuredProjects = featuredSlugs
  .map((slug) => projects.find((p) => p.slug === slug))
  .filter(Boolean);

export default function Projects() {
  return (
    <section id="projects" className="section-ambient border-t border-slate-200 bg-white dark:border-gray-800 dark:bg-slate-900/30">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="heading-gradient text-3xl font-bold tracking-tight sm:text-5xl">Featured projects</h2>
          <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg sm:leading-9 dark:text-gray-400">
            Selected work demonstrating backend design, system reliability, and engineering collaboration. Open each project for dedicated implementation and architecture details.
          </p>
        </div>
        <div className="mt-12 grid gap-6 md:gap-7 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <ProjectCard
              key={project!.title}
              title={project!.title}
              description={project!.description}
              outcomes={project!.outcomes}
              tags={project!.tags}
              detailsHref={`/projects/${project!.slug}`}
              detailsLabel="View project page"
              variant="compact"
              preface={project!.preface}
            />
          ))}
        </div>
        <div className="mt-8 text-center">
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
