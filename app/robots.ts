import type { MetadataRoute } from "next";


import { siteUrl } from "@/app/lib/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"],  // ← add this
    },
    sitemap: `${siteUrl}/sitemap.xml`,
    host: siteUrl,
  };
}
