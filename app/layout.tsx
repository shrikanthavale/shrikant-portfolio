import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ThemeProvider from "@/app/components/ThemeProvider";
import "./globals.css";

import { siteUrl, siteName, siteAuthor } from "@/app/lib/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Shrikant Havale | Senior Backend Engineer",
    template: "%s | Shrikant Havale",
  },
  description:
    "Shrikant Havale is a Senior Backend Engineer specializing in Java microservices, distributed systems, resiliency, observability, and event-driven architecture.",
  keywords: [
    "Shrikant Havale",
    "Senior Backend Engineer",
    "Java Backend Developer",
    "Spring Boot",
    "Microservices",
    "Distributed Systems",
    "Portfolio",
  ],
  authors: [{ name: siteAuthor, url: siteUrl }],
  creator: "Shrikant Havale",
  publisher: siteAuthor,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
     url: siteUrl,
    title: "Shrikant Havale | Senior Backend Engineer",
    description:
      "Portfolio showcasing Java backend engineering work in resilient microservices, distributed systems, and technical architecture.",
     siteName: siteName,
    images: [
      {
        url: "/profile.jpg",
        width: 500,
        height: 500,
        alt: "Shrikant Havale",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shrikant Havale | Senior Backend Engineer",
    description:
      "Portfolio showcasing Java backend engineering work in resilient microservices, distributed systems, and technical architecture.",
    images: ["/profile.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const personJsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Shrikant Havale",
     url: siteUrl,
     image: `${siteUrl}/profile.jpg`,
    jobTitle: "Senior Backend Engineer",
    worksFor: {
      "@type": "Organization",
      name: "Eurofunk Kappacher Gmbh"
    },
    knowsAbout: ["Java", "Spring Boot", "Microservices", "Kafka", "Redis", "Distributed Systems"],
    sameAs: [
      "https://github.com/shrikanthavale",
      "https://www.linkedin.com/in/shrikanthavale/",
      "https://stackoverflow.com/users/2931342/shrikant-havale",  // ← add SO and HackerRank
    ],
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
