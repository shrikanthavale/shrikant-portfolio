import type { MetadataRoute } from "next";
import { getPosts } from "@/app/lib/getPosts";
import { projects } from "@/app/data/projects";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 1,
    },
    {
      url: `${siteUrl}/journey`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/projects`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/blog`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/certifications`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projects.map((project) => ({
    url: `${siteUrl}/projects/${project.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const postRoutes: MetadataRoute.Sitemap = getPosts().map((post) => {
    const parsedDate = Date.parse(post.date);

    return {
      url: `${siteUrl}${post.href}`,
      lastModified: Number.isNaN(parsedDate) ? now : new Date(parsedDate),
      changeFrequency: "yearly",
      priority: 0.7,
    };
  });

  return [...staticRoutes, ...projectRoutes, ...postRoutes];
}
