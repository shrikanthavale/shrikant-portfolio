import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ThemeProvider from "@/app/components/ThemeProvider";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

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
  authors: [{ name: "Shrikant Havale", url: siteUrl }],
  creator: "Shrikant Havale",
  publisher: "Shrikant Havale",
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
    siteName: "Shrikant Havale Portfolio",
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
    card: "summary",
    title: "Shrikant Havale | Senior Backend Engineer",
    description:
      "Portfolio showcasing Java backend engineering work in resilient microservices, distributed systems, and technical architecture.",
    images: ["/profile.jpg"],
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
    sameAs: [
      "https://github.com/shrikanthavale",
      "https://www.linkedin.com/in/shrikanthavale/",
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
        <Analytics nonce={nonce} />
        <SpeedInsights nonce={nonce} />
      </body>
    </html>
  );
}
