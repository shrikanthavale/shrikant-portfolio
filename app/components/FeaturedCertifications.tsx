import Link from "next/link";
import { certifications } from "@/app/data/certifications";

const featuredCertifications = certifications
  .filter((item) => item.status !== "expired")
  .sort((a, b) => b.year - a.year || a.title.localeCompare(b.title))
  .slice(0, 6);

export default function FeaturedCertifications() {
  return (
    <section className="section-ambient border-t border-slate-200 bg-white dark:border-gray-800 dark:bg-slate-900/30">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="heading-gradient text-3xl font-bold tracking-tight sm:text-5xl">Featured certifications</h2>
          <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg sm:leading-9 dark:text-gray-400">
            Snapshot of recent certifications across cloud architecture, AI, Java, and backend engineering.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredCertifications.map((item) => (
            <article
              key={item.id}
              className="glass-card glass-card-hover flex h-full flex-col justify-between rounded-2xl border border-slate-200 p-5 shadow-sm dark:border-slate-800"
            >
              <div>
                <div className="flex items-center justify-between gap-2">
                  <span className="rounded-full border border-slate-300 bg-slate-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {item.domain}
                  </span>
                  <span className="text-xs font-semibold uppercase tracking-[0.1em] text-slate-500 dark:text-slate-400">
                    {item.year}
                  </span>
                </div>

                <h3 className="mt-4 line-clamp-3 text-lg font-bold leading-snug text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{item.issuer}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="/certifications"
            className="inline-flex items-center rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-sky-500/30 transition-all duration-200 hover:scale-105 hover:bg-sky-500 hover:shadow-md hover:shadow-sky-400/40"
          >
            View all certifications
          </Link>
        </div>
      </div>
    </section>
  );
}
