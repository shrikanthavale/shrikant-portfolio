import type { Metadata } from "next";
import CertificationsClient from "@/app/components/CertificationsClient";
import SubpageTopBar from "@/app/components/SubpageTopBar";
import { certifications } from "@/app/data/certifications";

export const metadata: Metadata = {
  title: "Certifications",
  description:
    "Technical certifications earned by Shrikant Havale across cloud platforms, backend engineering, and distributed systems.",
};

export default function CertificationsPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <SubpageTopBar leftLabel="Certifications" rightHref="/" />

      <section className="section-ambient section-ambient-alt border-t border-slate-200 bg-slate-50/60 dark:border-gray-800 dark:bg-slate-950/70">
        <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
          <div className="mx-auto max-w-3xl text-center">
            <p className="text-[0.72rem] font-semibold uppercase tracking-[0.34em] text-sky-700 dark:text-sky-300">
              Professional learning
            </p>
            <h1 className="heading-gradient mt-3 text-3xl font-bold tracking-tight sm:text-5xl">Technical Certifications</h1>
            <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8 dark:text-gray-400">
              A curated view of cloud, backend, and software engineering certifications with filtering by domain, issuer, and status.
            </p>
          </div>

          <CertificationsClient certifications={certifications} />
        </div>
      </section>
    </main>
  );
}
