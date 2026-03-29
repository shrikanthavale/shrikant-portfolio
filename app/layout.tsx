import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ThemeProvider from "@/app/components/ThemeProvider";
import "./globals.css";

import { siteConfig } from "@/app/site.config";

const { person, seo, social } = siteConfig;
const pageTitle = `${person.name} | ${person.title}`;

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(seo.url),
  title: {
    default: pageTitle,
    template: `%s | ${person.name}`,
  },
  description: seo.description,
  keywords: seo.keywords,
  authors: [{ name: person.name, url: seo.url }],
  creator: person.name,
  publisher: person.name,
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: seo.url,
    title: pageTitle,
    description: seo.ogDescription,
    siteName: seo.siteName,
    images: [
      {
        url: seo.ogImage,
        width: 500,
        height: 500,
        alt: person.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: pageTitle,
    description: seo.ogDescription,
    images: [seo.ogImage],
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
  verification: {
    google: seo.googleVerification,
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
    name: person.name,
    url: seo.url,
    image: `${seo.url}${person.profilePhoto}`,
    jobTitle: person.title,
    worksFor: {
      "@type": "Organization",
      name: person.currentEmployer,
    },
    knowsAbout: person.knowsAbout,
    sameAs: social.map((s) => s.href),
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
