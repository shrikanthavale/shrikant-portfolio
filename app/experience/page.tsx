import Link from "next/link";
import ExperienceTimeline from "@/app/components/ExperienceTimeline";
import CredentialsStrip from "@/app/components/CredentialsStrip";
import SubpageTopBar from "@/app/components/SubpageTopBar";

export default function ExperiencePage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <SubpageTopBar leftLabel="Experience" rightHref="/" />

      <ExperienceTimeline />
      <CredentialsStrip />

      <section className="border-t border-slate-200 bg-slate-100/70 dark:border-slate-800 dark:bg-slate-950/80">
        <div className="mx-auto max-w-6xl px-6 py-10 text-center">
          <Link
            href="/Havale_Shrikant.pdf"
            className="inline-flex items-center rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-sky-500/30 transition-all duration-200 hover:scale-105 hover:bg-sky-500 hover:shadow-md hover:shadow-sky-400/40"
          >
            Download Resume
          </Link>
        </div>
      </section>
    </main>
  );
}
