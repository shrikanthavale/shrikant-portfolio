import Link from "next/link";
import ExperienceTimeline from "@/app/components/ExperienceTimeline";
import SubpageTopBar from "@/app/components/SubpageTopBar";

export default function JourneyPage() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100">
      <SubpageTopBar leftLabel="Journey" rightHref="/" />

      <ExperienceTimeline />

      {/* Download Resume button removed as requested */}
    </main>
  );
}
