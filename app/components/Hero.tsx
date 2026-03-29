import { LayoutTemplate, Zap, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/app/site.config";

const iconMap = { LayoutTemplate, Zap, ShieldCheck };

export default function Hero() {
  const { hero } = siteConfig;

  return (
    <section id="hero" className="section-ambient border-b border-slate-200 dark:border-slate-800">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-16 sm:gap-12 sm:py-20 lg:flex-row lg:items-center lg:justify-between lg:gap-16">
        <div className="max-w-xl">
          <p className="text-sm font-medium uppercase tracking-widest text-slate-500 dark:text-slate-400">
            {hero.tagline}
          </p>
          <h1 className="heading-gradient mt-3 text-4xl font-bold tracking-tight sm:mt-4 sm:text-6xl">
            {hero.headline}
          </h1>
          <p className="mt-5 text-base leading-7 text-slate-600 sm:mt-6 sm:text-lg sm:leading-8 dark:text-gray-400">
            {hero.bio}
          </p>
          <div className="mt-7 flex flex-wrap gap-3 sm:mt-8">
            <a
              href={hero.cta.primary.href}
              className="inline-flex items-center justify-center rounded-md bg-gradient-to-r from-sky-500 to-cyan-500 px-5 py-3 text-sm font-semibold text-white shadow-md shadow-sky-500/35 transition-all duration-200 hover:scale-105 hover:shadow-lg hover:shadow-sky-400/45"
            >
              {hero.cta.primary.label}
            </a>
            <a
              href={hero.cta.secondary.href}
              className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:scale-105 hover:border-sky-500 hover:bg-sky-500 hover:text-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-sky-400 dark:hover:bg-sky-500"
            >
              {hero.cta.secondary.label}
            </a>
          </div>
          <p className="mt-4 text-sm text-slate-500 dark:text-slate-400">{hero.credentials}</p>
        </div>

        <div className="glass-card glass-card-hover w-full max-w-md shrink-0 rounded-2xl p-7 shadow-lg sm:p-9">
          <div className="space-y-7">
            <div className="space-y-5">
              {hero.services.map((service) => {
                const Icon = iconMap[service.icon as keyof typeof iconMap];
                return (
                  <div key={service.title} className="flex gap-4">
                    <div
                      className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border ${service.colors.border} ${service.colors.bg}`}
                    >
                      <Icon className={`h-4 w-4 ${service.colors.icon}`} aria-hidden="true" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900 dark:text-white">{service.title}</p>
                      <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">{service.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="border-t border-slate-200 pt-6 dark:border-slate-700">
              <div className="grid grid-cols-2 gap-x-6 gap-y-4">
                {hero.stats.map((stat) => (
                  <div key={stat.label}>
                    <p className="text-lg font-bold text-slate-900 dark:text-white">{stat.value}</p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
