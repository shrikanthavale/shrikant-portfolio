import type { NextConfig } from "next";

const securityHeaders = [
  // Prevent the site from being embedded in iframes on other origins (clickjacking)
  { key: "X-Frame-Options", value: "SAMEORIGIN" },
  // Stop browsers from MIME-sniffing the content type
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Only send the origin as referrer, never the full URL
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Disable browser features not needed by a portfolio
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=(), interest-cohort=()",
  },
  // Force HTTPS for 2 years (only applies when served over HTTPS)
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  // Content Security Policy
  // - default-src 'self': all resources must come from our origin by default
  // - script-src 'self' 'nonce-<nonce>': Next.js supports nonce-based CSP for hydration
  // - style-src 'self' 'nonce-<nonce>': Tailwind inline styles can use nonce
  // - img-src 'self' data: blob:: allow our images plus data URIs
  // - font-src 'self': Next.js self-hosts Google Fonts at build time
  // - connect-src 'self': fetch/XHR only to our own origin
  // - frame-ancestors 'self': deny framing from other origins
  {
    key: "Content-Security-Policy",
    value: [
      "default-src 'self'",
      "script-src 'self' 'nonce-<nonce>' https://challenges.cloudflare.com",
      "style-src 'self' 'nonce-<nonce>'",
      "img-src 'self' data: blob:",
      "font-src 'self'",
      "connect-src 'self' https://vitals.vercel-insights.com https://va.vercel-scripts.com",
      "frame-ancestors 'self'",
      "frame-src 'self' https://challenges.cloudflare.com",
      "base-uri 'self'",
      "form-action 'self'",
    ].join("; "), // <nonce> will be replaced per request in middleware
  },
];

const nextConfig: NextConfig = {
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};

export default nextConfig;
