import Link from "next/link";
import { notFound } from "next/navigation";
import { getProjectBySlug, projects } from "@/app/data/projects";

type ProjectPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export function generateMetadata({ params }: ProjectPageProps) {
  return params.then(({ slug }) => {
    const project = getProjectBySlug(slug);

    if (!project) {
      return { title: "Project not found" };
    }

    return {
      title: `${project.title} | Project Details`,
      description: project.description,
    };
  });
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = getProjectBySlug(slug);

  if (!project) notFound();

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <article className="mx-auto max-w-4xl px-6 py-20">
        <Link
          href="/projects"
          className="text-sm font-medium text-sky-700 transition hover:text-sky-600 dark:text-sky-300 dark:hover:text-sky-200"
        >
          ← Back to all projects
        </Link>

        <header className="mt-6 border-b border-slate-200 pb-7 dark:border-slate-800">
          <h1 className="heading-gradient text-3xl font-bold tracking-tight sm:text-5xl">{project.title}</h1>
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
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Project context</h2>
            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-gray-400">{project.context}</p>
          </div>

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
        </section>

        <section className="glass-card mt-6 rounded-2xl p-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">Architecture and implementation highlights</h2>
          <ul className="mt-4 space-y-2 text-sm leading-7 text-slate-600 dark:text-gray-400">
            {project.architecture.map((item) => (
              <li key={item} className="flex gap-2">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" aria-hidden="true" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </section>
      </article>
    </main>
  );
}
