import type { Metadata } from "next";
import ExperienceTimeline from "@/app/components/ExperienceTimeline";
import SubpageTopBar from "@/app/components/SubpageTopBar";

const description =
  "A timeline of Shrikant Havale's career as a backend engineer — roles, responsibilities, and growth across enterprise and product companies.";

export const metadata: Metadata = {
  title: "Career Journey",
  description,
  alternates: { canonical: "https://www.shrikant-havale.in/journey" },
  openGraph: {
    type: "website",
    title: "Career Journey | Shrikant Havale",
    description,
    url: "https://www.shrikant-havale.in/journey",
    images: [{ url: "/profile.jpg", width: 500, height: 500, alt: "Shrikant Havale" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Career Journey | Shrikant Havale",
    description,
    images: ["/profile.jpg"],
  },
};

export default function JourneyPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <SubpageTopBar leftLabel="Journey" rightHref="/" />

      <ExperienceTimeline />

      {/* Download Resume button removed as requested */}
    </main>
  );
}
