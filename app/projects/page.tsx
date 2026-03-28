import type { Metadata } from "next";
import ProjectCard from "@/app/components/ProjectCard";
import SubpageTopBar from "@/app/components/SubpageTopBar";
import { projects } from "@/app/data/projects";
import { siteUrl } from "@/app/lib/config";

const description =
  "Backend engineering projects by Shrikant Havale — microservices, distributed systems, event-driven architecture, and real-world system design.";

export const metadata: Metadata = {
  title: "Projects",
  description,
  alternates: { canonical: "https://www.shrikant-havale.in/projects" },
  openGraph: {
    type: "website",
    title: "Projects | Shrikant Havale",
    description,
    url: "https://www.shrikant-havale.in/projects",
    images: [{ url: "/profile.jpg", width: 500, height: 500, alt: "Shrikant Havale" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Projects | Shrikant Havale",
    description,
    images: ["/profile.jpg"],
  },
};

export default function ProjectsIndexPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <SubpageTopBar leftLabel="Projects" rightHref="/#projects" />

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
              <ProjectCard
                key={project.slug}
                title={project.title}
                description={project.description}
                tags={project.tags}
                detailsHref={`/projects/${project.slug}`}
                detailsLabel="Open project page"
                variant="compact"
                preface={project.preface}
              />
            ))}
          </div>
        </div>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: siteUrl },
              { "@type": "ListItem", position: 2, name: "Projects", item: `${siteUrl}/projects` },
            ],
          }),
        }}
      />
    </main>
  );
}
