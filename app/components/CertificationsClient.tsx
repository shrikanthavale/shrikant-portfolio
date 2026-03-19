"use client";

import { useMemo, useState } from "react";
import type { Certification } from "@/app/data/certifications";

type CertificationsClientProps = {
  certifications: Certification[];
};

const statusLabel: Record<Certification["status"], string> = {
  active: "Active",
  "no-expiry": "No expiry",
  expired: "Expired",
};

const statusBadgeClassName: Record<Certification["status"], string> = {
  active:
    "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-700/80 dark:bg-emerald-900/30 dark:text-emerald-300",
  "no-expiry":
    "border-sky-300 bg-sky-50 text-sky-700 dark:border-sky-700/80 dark:bg-sky-900/30 dark:text-sky-300",
  expired:
    "border-amber-300 bg-amber-50 text-amber-700 dark:border-amber-700/80 dark:bg-amber-900/30 dark:text-amber-300",
};

export default function CertificationsClient({ certifications }: CertificationsClientProps) {
  const [search, setSearch] = useState("");
  const [selectedDomain, setSelectedDomain] = useState("all");
  const [selectedIssuer, setSelectedIssuer] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");

  const domains = useMemo(
    () => ["all", ...Array.from(new Set(certifications.map((item) => item.domain))).sort((a, b) => a.localeCompare(b))],
    [certifications],
  );

  const issuers = useMemo(
    () => ["all", ...Array.from(new Set(certifications.map((item) => item.issuer))).sort((a, b) => a.localeCompare(b))],
    [certifications],
  );

  const filteredCertifications = useMemo(() => {
    const normalizedQuery = search.trim().toLowerCase();

    return certifications
      .filter((item) => {
        if (selectedDomain !== "all" && item.domain !== selectedDomain) {
          return false;
        }

        if (selectedIssuer !== "all" && item.issuer !== selectedIssuer) {
          return false;
        }

        if (selectedStatus !== "all" && item.status !== selectedStatus) {
          return false;
        }

        if (!normalizedQuery) {
          return true;
        }

        const haystack = `${item.title} ${item.issuer} ${item.domain} ${item.credentialId ?? ""}`.toLowerCase();
        return haystack.includes(normalizedQuery);
      })
      .sort((a, b) => b.year - a.year || a.title.localeCompare(b.title));
  }, [certifications, search, selectedDomain, selectedIssuer, selectedStatus]);

  const resetFilters = () => {
    setSearch("");
    setSelectedDomain("all");
    setSelectedIssuer("all");
    setSelectedStatus("all");
  };

  return (
    <div className="mt-12">
      <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/70">
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          <label className="lg:col-span-2">
            <span className="sr-only">Search certifications</span>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by title, issuer, domain, or credential ID"
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition-colors placeholder:text-slate-400 focus:border-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:placeholder:text-slate-500 dark:focus:border-sky-400"
            />
          </label>

          <label>
            <span className="sr-only">Filter by domain</span>
            <select
              value={selectedDomain}
              onChange={(event) => setSelectedDomain(event.target.value)}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition-colors focus:border-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:focus:border-sky-400"
            >
              {domains.map((domain) => (
                <option key={domain} value={domain}>
                  {domain === "all" ? "All domains" : domain}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="sr-only">Filter by issuer</span>
            <select
              value={selectedIssuer}
              onChange={(event) => setSelectedIssuer(event.target.value)}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition-colors focus:border-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:focus:border-sky-400"
            >
              {issuers.map((issuer) => (
                <option key={issuer} value={issuer}>
                  {issuer === "all" ? "All issuers" : issuer}
                </option>
              ))}
            </select>
          </label>

          <label>
            <span className="sr-only">Filter by status</span>
            <select
              value={selectedStatus}
              onChange={(event) => setSelectedStatus(event.target.value)}
              className="w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700 outline-none transition-colors focus:border-sky-500 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-200 dark:focus:border-sky-400"
            >
              <option value="all">All status</option>
              <option value="active">Active</option>
              <option value="no-expiry">No expiry</option>
              <option value="expired">Expired</option>
            </select>
          </label>
        </div>

        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Showing <span className="font-semibold text-slate-900 dark:text-white">{filteredCertifications.length}</span> of {certifications.length} certifications.
          </p>
          <button
            type="button"
            onClick={resetFilters}
            className="rounded-md border border-slate-300 px-3 py-1.5 text-xs font-semibold text-slate-700 transition-colors hover:border-sky-500 hover:text-sky-700 dark:border-slate-700 dark:text-slate-300 dark:hover:border-sky-500 dark:hover:text-sky-300"
          >
            Reset filters
          </button>
        </div>
      </div>

      {filteredCertifications.length === 0 ? (
        <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white/70 p-8 text-center dark:border-slate-700 dark:bg-slate-900/60">
          <p className="text-sm font-medium text-slate-700 dark:text-slate-200">No certifications match the selected filters.</p>
          <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">
            Add your certifications in app/data/certifications.ts and they will automatically appear here.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredCertifications.map((item) => (
            <article
              key={item.id}
              className="glass-card glass-card-hover flex h-full flex-col justify-between rounded-2xl border border-slate-200 p-5 shadow-sm dark:border-slate-800"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full border border-slate-300 bg-slate-100 px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-slate-600 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    {item.domain}
                  </span>
                  <span className={`rounded-full border px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.1em] ${statusBadgeClassName[item.status]}`}>
                    {statusLabel[item.status]}
                  </span>
                </div>

                <h2 className="mt-4 text-lg font-bold leading-snug text-slate-900 dark:text-white">{item.title}</h2>
                <p className="mt-2 text-sm font-medium text-slate-600 dark:text-slate-300">{item.issuer}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.12em] text-slate-500 dark:text-slate-400">Issued {item.year}</p>

                {item.credentialId && (
                  <p className="mt-4 text-xs text-slate-500 dark:text-slate-400">
                    Credential ID: <span className="font-medium text-slate-700 dark:text-slate-300">{item.credentialId}</span>
                  </p>
                )}
              </div>

              <div className="mt-6 border-t border-slate-200 pt-4 dark:border-slate-800">
                {item.verifyUrl ? (
                  <a
                    href={item.verifyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center rounded-md bg-sky-600 px-3 py-1.5 text-xs font-semibold text-white shadow-sm shadow-sky-500/30 transition-all duration-200 hover:scale-[1.03] hover:bg-sky-500 hover:shadow-md hover:shadow-sky-400/40"
                  >
                    Verify credential
                  </a>
                ) : (
                  <span className="text-xs font-medium text-slate-500 dark:text-slate-400">Verification link not added yet</span>
                )}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
