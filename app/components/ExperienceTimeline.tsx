const experiences = [
  {
    company: "Eurofunk Kappacher GmbH",
    location: "Hagenberg, Austria",
    period: "2015-2018",
    role: "Software Developer - Operation Control and Management Systems",
    highlights: [
      "Built backend services for distributed emergency-response workflows.",
      "Implemented Spring-based APIs to expose secure backend functionality.",
      "Used RabbitMQ and Redis for resilient inter-service messaging and communication.",
      "Automated integration tests with Robot Framework, reducing manual testing effort by 50%.",
    ],
  },
  {
    company: "Capgemini",
    location: "Mumbai, India",
    period: "2012-2013",
    role: "Consultant - Post Sales Car Maintenance Application",
    highlights: [
      "Designed and implemented modules compatible with the Eclipse RCP ecosystem.",
      "Supported data migration from Oracle Database to IBM Db2.",
      "Worked with product owners and cross-functional teams on feature and design planning.",
    ],
  },
  {
    company: "Infosys Technologies Limited",
    location: "Pune, India",
    period: "2008-2012",
    role: "System Engineer - Admin Console for Customer Care Application",
    highlights: [
      "Remodeled an admin console to simplify system behavior management.",
      "Reduced operational complexity and reliance on specialized database handling skills.",
      "Lowered training overhead by improving usability for support teams.",
    ],
  },
];

export default function ExperienceTimeline() {
  return (
    <section id="experience" className="section-ambient section-ambient-alt border-t border-slate-200 bg-slate-50/60 dark:border-gray-800 dark:bg-slate-950/70">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="heading-gradient text-3xl font-bold tracking-tight sm:text-5xl">Experience timeline</h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8 dark:text-gray-400">
            A focused view of professional roles where I built and improved backend systems at scale.
          </p>
        </div>

        <div className="mt-12 space-y-5">
          {experiences.map((item) => (
            <article key={`${item.company}-${item.period}`} className="glass-card glass-card-hover rounded-2xl p-6 sm:p-7">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 dark:text-white">{item.company}</h3>
                  <p className="mt-1 text-sm font-medium text-slate-500 dark:text-slate-400">{item.location}</p>
                </div>
                <span className="inline-flex w-fit rounded-full border border-slate-300/90 bg-white/60 px-3 py-1 text-xs font-semibold tracking-wide text-slate-700 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-200">
                  {item.period}
                </span>
              </div>

              <p className="mt-4 text-sm font-semibold text-slate-800 dark:text-slate-100">{item.role}</p>

              <ul className="mt-4 space-y-2 text-sm leading-relaxed text-slate-600 dark:text-gray-400">
                {item.highlights.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-sky-500" aria-hidden="true" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
