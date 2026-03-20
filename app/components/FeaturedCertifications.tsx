import Link from "next/link";
import { certifications } from "@/app/data/certifications";
import IssuerIcon from "@/app/components/IssuerIcon";

const statusBadgeClassName = {
  active:
    "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-700/80 dark:bg-emerald-900/30 dark:text-emerald-300",
  "no-expiry":
    "border-sky-300 bg-sky-50 text-sky-700 dark:border-sky-700/80 dark:bg-sky-900/30 dark:text-sky-300",
  expired:
    "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-700/80 dark:bg-amber-900/30 dark:text-amber-300",
} as const;

const statusLabel = {
  active: "Active",
  "no-expiry": "No expiry",
  expired: "Expired",
} as const;

const featuredCertifications = certifications.filter((item) => item.featured);

export default function FeaturedCertifications({ showLink = true }: { showLink?: boolean }) {
  return (
    <section className="section-ambient border-t border-slate-200 bg-white dark:border-gray-800 dark:bg-slate-900/30">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        {showLink && (
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="heading-gradient text-3xl font-bold tracking-tight sm:text-5xl">Featured certifications</h2>
            <p className="mt-4 text-base leading-8 text-slate-600 sm:text-lg sm:leading-9 dark:text-gray-400">
              Snapshot of top certifications across cloud architecture, AI, Java, and backend engineering.
            </p>
          </div>
        )}

        {!showLink && (
          <div className="mb-10">
            <h2 className="text-lg font-bold text-slate-900 dark:text-white">Highlights</h2>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">Top 5 featured certifications</p>
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featuredCertifications.map((item) => (
            <article
              key={item.id}
              className="glass-card glass-card-hover flex h-full flex-col justify-between rounded-2xl border border-slate-200 p-5 shadow-sm dark:border-slate-800"
            >
              <div>
                <div className="flex items-start gap-3">
                  <IssuerIcon issuer={item.issuer} />
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="rounded-full border border-slate-300 bg-slate-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                      {item.domain}
                    </span>
                    <span className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] ${statusBadgeClassName[item.status]}`}>
                      {statusLabel[item.status]}
                    </span>
                  </div>
                </div>

                <h3 className="mt-4 line-clamp-3 text-base font-bold leading-snug text-slate-900 dark:text-white">
                  {item.title}
                </h3>
                <p className="mt-1.5 text-sm font-medium text-slate-600 dark:text-slate-300">{item.issuer}</p>
                <p className="mt-0.5 text-xs uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Issued {item.year}</p>
              </div>
            </article>
          ))}
        </div>

        {showLink && (
          <div className="mt-10 text-center">
            <Link
              href="/certifications"
              className="inline-flex items-center rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-sky-500/30 transition-all duration-200 hover:scale-105 hover:bg-sky-500 hover:shadow-md hover:shadow-sky-400/40"
            >
              View all certifications →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
