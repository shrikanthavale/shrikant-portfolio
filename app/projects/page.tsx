import Link from "next/link";
import { projects } from "@/app/data/projects";

export default function ProjectsIndexPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <section className="border-b border-slate-200 bg-white/90 dark:border-slate-800 dark:bg-slate-950/90">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <Link
            href="/#projects"
            className="text-sm font-medium text-sky-700 transition hover:text-sky-600 dark:text-sky-300 dark:hover:text-sky-200"
          >
            ← Back to home
          </Link>
          <h1 className="heading-gradient text-xl font-bold sm:text-2xl">All projects</h1>
        </div>
      </section>

      <section className="section-ambient border-b border-slate-200 bg-white/80 dark:border-slate-800 dark:bg-slate-900/30">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <h2 className="heading-gradient text-3xl font-bold tracking-tight sm:text-5xl">Project implementation stories</h2>
            <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8 dark:text-gray-400">
              Detailed project pages with context, architecture decisions, and measurable outcomes.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {projects.map((project) => (
              <article key={project.slug} className="glass-card glass-card-hover flex h-full flex-col rounded-2xl p-6 shadow-sm hover:border-sky-300 dark:hover:border-sky-700">
                <h3 className="text-xl font-bold text-slate-900 dark:text-white">{project.title}</h3>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-gray-400">{project.description}</p>

                <div className="mt-4 flex flex-wrap gap-2">
                  {project.tags.map((tag) => (
                    <span
                      key={`${project.slug}-${tag}`}
                      className="rounded-full border border-slate-300/90 bg-white/70 px-2.5 py-1 text-[11px] font-medium text-slate-600 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="mt-6 flex justify-end">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="inline-flex items-center rounded-md border border-sky-200 bg-sky-50 px-3 py-1.5 text-xs font-medium text-sky-700 shadow-sm transition-all duration-200 hover:scale-105 hover:border-sky-500 hover:bg-sky-500 hover:text-white dark:border-sky-800/60 dark:bg-sky-900/20 dark:text-sky-300 dark:hover:border-sky-400 dark:hover:bg-sky-500"
                  >
                    Open project page →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
