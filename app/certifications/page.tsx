import type { Metadata } from "next";
import CertificationsClient from "@/app/components/CertificationsClient";
import SubpageTopBar from "@/app/components/SubpageTopBar";
import { certifications } from "@/app/data/certifications";

const description =
  "Technical certifications earned by Shrikant Havale across cloud platforms, backend engineering, and distributed systems.";

export const metadata: Metadata = {
  title: "Certifications",
  description,
  alternates: { canonical: "https://www.shrikant-havale.in/certifications" },
  openGraph: {
    type: "website",
    title: "Certifications | Shrikant Havale",
    description,
    url: "https://www.shrikant-havale.in/certifications",
    images: [{ url: "/profile.jpg", width: 500, height: 500, alt: "Shrikant Havale" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Certifications | Shrikant Havale",
    description,
    images: ["/profile.jpg"],
  },
};

export default function CertificationsPage() {
  return (
    <main className="ds-page min-h-screen">
      <SubpageTopBar leftLabel="Certifications" rightHref="/" />

      <section className="ds-section-alt">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <div className="reveal mx-auto max-w-3xl text-center">
            <p className="ds-eyebrow">Professional learning</p>
            <h1 className="ds-section-title mt-3 text-3xl font-bold tracking-tight sm:text-5xl">Technical Certifications</h1>
            <p className="ds-muted mt-4 text-base leading-7 sm:text-lg sm:leading-8">
              A curated view of cloud, backend, and software engineering certifications with filtering by domain, issuer, and status.
            </p>
          </div>

          <CertificationsClient certifications={certifications} />
        </div>
      </section>
    </main>
  );
}
