import Link from "next/link";

function ArchitectureCard({
  label,
  description,
  tone = "default",
}: Readonly<{
  label: string;
  description: string;
  tone?: "default" | "event" | "cache" | "storage";
}>) {
  const toneClasses: Record<string, string> = {
    event: "border-indigo-300 bg-indigo-50 text-indigo-900 dark:border-indigo-700/70 dark:bg-indigo-500/10 dark:text-indigo-100",
    cache: "border-emerald-300 bg-emerald-50 text-emerald-900 dark:border-emerald-700/70 dark:bg-emerald-500/10 dark:text-emerald-100",
    storage: "border-cyan-300 bg-cyan-50 text-cyan-900 dark:border-cyan-700/70 dark:bg-cyan-500/10 dark:text-cyan-100",
  };
  const toneClass =
    toneClasses[tone] ?? "border-slate-300 bg-slate-50 text-slate-900 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-100";

  return (
    <div className={`min-w-[132px] rounded-xl border px-3.5 py-2.5 text-center shadow-sm sm:min-w-[148px] ${toneClass}`}>
      <p className="text-sm font-bold">{label}</p>
      <p className="mt-1 text-xs leading-relaxed opacity-80">{description}</p>
    </div>
  );
}

type SystemArchitectureProps = {
  embedded?: boolean;
};

export default function SystemArchitecture({ embedded = false }: Readonly<SystemArchitectureProps>) {
  if (embedded) {
    return (
      <div className="mt-6 border-t border-slate-200 pt-6 dark:border-slate-800">
        <div className="max-w-3xl">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Reference architecture</h3>
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-gray-400">
            Event-driven emergency operations architecture focused on reliable incident handling, asynchronous service coordination, and clear runtime boundaries.
          </p>
        </div>

        <div className="glass-card mt-6 rounded-2xl p-4 shadow-sm sm:p-5 lg:p-6">
          <div className="grid gap-4 xl:grid-cols-[170px_minmax(0,1fr)_170px] xl:items-start">
            <aside className="glass-card order-2 rounded-2xl p-3 xl:order-1">
              <p className="text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Storage
              </p>
              <div className="mt-2.5 flex justify-center">
                <ArchitectureCard label="Redis" description="Caching + idempotency" tone="cache" />
              </div>
              <div className="mt-2 hidden items-center justify-end xl:flex">
                <span className="h-px w-8 bg-slate-300 dark:bg-slate-700" />
                <span className="ml-1 text-[10px] font-semibold tracking-wide text-slate-400">-&gt;</span>
              </div>
              <p className="mt-2.5 text-center text-xs leading-relaxed text-slate-500 dark:text-gray-400">Services &lt;-&gt; Redis</p>
            </aside>

            <div className="order-1 space-y-4 xl:order-2">
              <div>
                <p className="text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  Gateway
                </p>
                <div className="mt-2.5 flex flex-col items-center gap-2.5 md:flex-row md:justify-center md:gap-2">
                  <ArchitectureCard label="Operator UI" description="Control room clients" />
                  <span className="text-xs font-semibold tracking-wide text-slate-400">-&gt;</span>
                  <ArchitectureCard label="API Gateway" description="Auth, routing, rate limits" />
                </div>
              </div>

              <div className="flex justify-center">
                <div className="flex flex-col items-center gap-1">
                  <span className="h-4 w-px bg-slate-300 dark:bg-slate-700" />
                  <span className="text-[10px] font-semibold tracking-wide text-slate-400">v</span>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-4">
                <p className="text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  Services
                </p>
                <div className="mt-3 grid gap-2 sm:grid-cols-3">
                  <ArchitectureCard label="Auth Service" description="Token validation" />
                  <ArchitectureCard label="Incident Service" description="Workflow orchestration" />
                  <ArchitectureCard label="Dispatch Service" description="Operational state updates" />
                </div>
              </div>

              <div className="flex justify-center">
                <div className="flex flex-col items-center gap-1">
                  <span className="h-4 w-px bg-slate-300 dark:bg-slate-700" />
                  <span className="text-[10px] font-semibold tracking-wide text-slate-400">v</span>
                </div>
              </div>

              <div>
                <p className="text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-indigo-600 dark:text-indigo-300">
                  Event Streaming
                </p>
                <div className="mt-2.5 flex justify-center">
                  <ArchitectureCard label="RabbitMQ" description="Async event bus" tone="event" />
                </div>
              </div>

              <div className="flex justify-center">
                <div className="flex flex-col items-center gap-1">
                  <span className="h-4 w-px bg-slate-300 dark:bg-slate-700" />
                  <span className="text-[10px] font-semibold tracking-wide text-slate-400">v</span>
                </div>
              </div>

              <div>
                <p className="text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  Processing Layer
                </p>
                <div className="mt-2.5 flex justify-center">
                  <ArchitectureCard label="Worker Services" description="Event consumers for alerting, validation, and coordination" />
                </div>
              </div>
            </div>

            <aside className="glass-card order-3 rounded-2xl p-3">
              <p className="text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Storage
              </p>
              <div className="mt-2.5 flex justify-center">
                <ArchitectureCard label="Database" description="Transactional persistence" tone="storage" />
              </div>
              <div className="mt-2 hidden items-center xl:flex">
                <span className="mr-1 text-[10px] font-semibold tracking-wide text-slate-400">&lt;-</span>
                <span className="h-px w-8 bg-slate-300 dark:bg-slate-700" />
              </div>
              <p className="mt-2.5 text-center text-xs leading-relaxed text-slate-500 dark:text-gray-400">Workers -&gt; Database</p>
            </aside>
          </div>

        </div>

        <div className="mt-4 flex items-center justify-between gap-3 text-sm">
          <p className="text-slate-500 dark:text-slate-400">This system design supported resilient emergency workflow execution and asynchronous downstream coordination.</p>
          <Link
            href="/blog/scaling-event-driven-systems"
            className="inline-flex shrink-0 items-center font-semibold text-sky-700 transition hover:text-sky-600 dark:text-sky-300 dark:hover:text-sky-200"
          >
            Read the system design notes
          </Link>
        </div>
      </div>
    );
  }

  return (
    <section id="architecture" className="section-ambient section-ambient-alt border-t border-slate-200 bg-slate-100/70 dark:border-gray-800 dark:bg-slate-950/90">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="heading-gradient text-3xl font-bold tracking-tight sm:text-5xl">
            Event-Driven Operations Architecture
          </h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8 dark:text-gray-400">
            A production-style architecture for distributed backend operations, built for reliability, asynchronous processing, and resilient service communication.
          </p>
        </div>

        <div className="glass-card relative mt-12 rounded-2xl p-4 pb-20 shadow-sm sm:p-5 sm:pb-20 lg:p-6 lg:pb-20">
          <div className="grid gap-4 xl:grid-cols-[170px_minmax(0,1fr)_170px] xl:items-start">
            <aside className="glass-card order-2 rounded-2xl p-3 xl:order-1">
              <p className="text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Storage
              </p>
              <div className="mt-2.5 flex justify-center">
                <ArchitectureCard label="Redis" description="Caching + idempotency" tone="cache" />
              </div>
              <div className="mt-2 hidden items-center justify-end xl:flex">
                <span className="h-px w-8 bg-slate-300 dark:bg-slate-700" />
                <span className="ml-1 text-[10px] font-semibold tracking-wide text-slate-400">-&gt;</span>
              </div>
              <p className="mt-2.5 text-center text-xs leading-relaxed text-slate-500 dark:text-gray-400">Services &lt;-&gt; Redis</p>
            </aside>

            <div className="order-1 space-y-4 xl:order-2">
              <div>
                <p className="text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  Gateway
                </p>
                <div className="mt-2.5 flex flex-col items-center gap-2.5 md:flex-row md:justify-center md:gap-2">
                  <ArchitectureCard label="Operator UI" description="Control room clients" />
                  <span className="text-xs font-semibold tracking-wide text-slate-400">-&gt;</span>
                  <ArchitectureCard label="API Gateway" description="Auth, routing, rate limits" />
                </div>
              </div>

              <div className="flex justify-center">
                <div className="flex flex-col items-center gap-1">
                  <span className="h-4 w-px bg-slate-300 dark:bg-slate-700" />
                  <span className="text-[10px] font-semibold tracking-wide text-slate-400">v</span>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-4">
                <p className="text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  Services
                </p>
                <div className="mt-3 grid gap-2 sm:grid-cols-3">
                  <ArchitectureCard label="Auth Service" description="Token validation" />
                  <ArchitectureCard label="Incident Service" description="Workflow orchestration" />
                  <ArchitectureCard label="Dispatch Service" description="Operational state updates" />
                </div>
              </div>

              <div className="flex justify-center">
                <div className="flex flex-col items-center gap-1">
                  <span className="h-4 w-px bg-slate-300 dark:bg-slate-700" />
                  <span className="text-[10px] font-semibold tracking-wide text-slate-400">v</span>
                </div>
              </div>

              <div>
                <p className="text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-indigo-600 dark:text-indigo-300">
                  Event Streaming
                </p>
                <div className="mt-2.5 flex justify-center">
                  <ArchitectureCard label="RabbitMQ" description="Async event bus" tone="event" />
                </div>
              </div>

              <div className="flex justify-center">
                <div className="flex flex-col items-center gap-1">
                  <span className="h-4 w-px bg-slate-300 dark:bg-slate-700" />
                  <span className="text-[10px] font-semibold tracking-wide text-slate-400">v</span>
                </div>
              </div>

              <div>
                <p className="text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                  Processing Layer
                </p>
                <div className="mt-2.5 flex justify-center">
                  <ArchitectureCard label="Worker Services" description="Event consumers for alerting, validation, and coordination" />
                </div>
              </div>
            </div>

            <aside className="glass-card order-3 rounded-2xl p-3">
              <p className="text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 dark:text-slate-400">
                Storage
              </p>
              <div className="mt-2.5 flex justify-center">
                <ArchitectureCard label="Database" description="Transactional persistence" tone="storage" />
              </div>
              <div className="mt-2 hidden items-center xl:flex">
                <span className="mr-1 text-[10px] font-semibold tracking-wide text-slate-400">&lt;-</span>
                <span className="h-px w-8 bg-slate-300 dark:bg-slate-700" />
              </div>
              <p className="mt-2.5 text-center text-xs leading-relaxed text-slate-500 dark:text-gray-400">Workers -&gt; Database</p>
            </aside>
          </div>

          <Link
            href="/blog/scaling-event-driven-systems"
            className="absolute bottom-4 right-4 inline-flex items-center rounded-md bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow-sm shadow-sky-500/30 transition-all duration-200 hover:scale-105 hover:bg-sky-500 hover:shadow-md hover:shadow-sky-400/40 sm:bottom-5 sm:right-5 sm:px-5 sm:py-2.5"
          >
            Read more
          </Link>
        </div>

      </div>
    </section>
  );
}
