import type { MetadataRoute } from "next";


import { siteConfig } from "@/app/site.config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],  // ← add this
    },
    sitemap: `${siteConfig.seo.url}/sitemap.xml`,
    host: siteConfig.seo.url,
  };
}
