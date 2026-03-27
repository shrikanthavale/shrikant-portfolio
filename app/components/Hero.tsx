import { LayoutTemplate, Zap, ShieldCheck } from "lucide-react";

export default function Hero() {
  return (
    <section id="hero" className="section-ambient border-b border-slate-200 dark:border-slate-800">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-16 sm:gap-12 sm:py-20 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        <div className="max-w-xl">
          <p className="text-sm font-medium uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Senior Java Backend Engineer · Available for Consulting
          </p>
          <h1 className="heading-gradient mt-3 text-4xl font-bold tracking-tight sm:mt-4 sm:text-6xl">
            Backend expertise, when your team needs it most
          </h1>
          <p className="mt-5 text-base leading-7 text-slate-600 sm:mt-6 sm:text-lg sm:leading-8 dark:text-gray-400">
            15+ years designing and delivering resilient Java backend systems for mission-critical environments. I work
            with teams on focused engagements — architecture reviews, microservices design, event-driven systems, and
            delivery quality improvements.
          </p>
          <div className="mt-7 flex flex-wrap gap-3 sm:mt-8">
            <a
              href="#contact-form"
              className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-sky-500 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-sky-500/35 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-sky-400/45"
            >
              Let&apos;s work together
            </a>
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:scale-105 hover:border-sky-500 hover:bg-sky-500 hover:text-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-sky-400 dark:hover:bg-sky-500"
            >
              View Projects
            </a>
          </div>
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">
            Oracle Certified Professional · Java SE 17 · Spring Certified Professional 2024
          </p>
        </div>

        <div className="glass-card glass-card-hover w-full max-w-md shrink-0 rounded-2xl p-7 shadow-lg sm:p-9">
          <div className="space-y-7">
            <div className="space-y-5">
              <div className="flex gap-4">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-sky-200 bg-sky-50 dark:border-sky-800/60 dark:bg-sky-900/30">
                  <LayoutTemplate className="h-4 w-4 text-sky-600 dark:text-sky-400" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Architecture reviews</p>
                  <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                    Microservices design, distributed systems assessment
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-violet-200 bg-violet-50 dark:border-violet-800/60 dark:bg-violet-900/30">
                  <Zap className="h-4 w-4 text-violet-600 dark:text-violet-400" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Event-driven systems</p>
                  <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                    RabbitMQ, Kafka, Redis — async processing and coordination
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-emerald-200 bg-emerald-50 dark:border-emerald-800/60 dark:bg-emerald-900/30">
                  <ShieldCheck className="h-4 w-4 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">Delivery quality</p>
                  <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                    Test automation, CI/CD, reducing manual effort
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-slate-200 pt-6 dark:border-slate-700">
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                <div>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">15+ certs</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">active certifications</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">Austria + India</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">cross-border delivery</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">Robot + Cypress</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">test automation</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-slate-900 dark:text-white">Since 2008</p>
                  <p className="text-xs text-slate-500 dark:text-slate-400">professional Java development</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
