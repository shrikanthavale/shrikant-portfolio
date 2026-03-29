import type { Metadata } from "next";
import type { Project } from "@/app/data/projects";
import { siteConfig } from "@/app/site.config";

export function buildProjectMetadata(project: Project, slug: string): Metadata {
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `${siteConfig.seo.url}/projects/${slug}` },
    openGraph: {
      type: "article",
      title: `${project.title} | Shrikant Havale`,
      description: project.description,
      url: `${siteConfig.seo.url}/projects/${slug}`,
      images: [{ url: "/profile.jpg", width: 500, height: 500, alt: "Shrikant Havale" }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${project.title} | Shrikant Havale`,
      description: project.description,
      images: ["/profile.jpg"],
    },
  };
}
