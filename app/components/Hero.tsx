export default function Hero() {
  return (
    <section id="hero" className="section-ambient border-b border-slate-200 dark:border-slate-800">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-20 sm:gap-10 sm:py-24 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <p className="text-sm font-medium uppercase tracking-widest text-slate-500 dark:text-slate-400">
            Senior Java Backend Engineer
          </p>
          <h1 className="heading-gradient mt-3 text-4xl font-bold tracking-tight sm:mt-4 sm:text-6xl">
            Building scalable, resilient backend systems
          </h1>
          <p className="mt-5 text-base leading-7 text-slate-600 sm:mt-6 sm:text-lg sm:leading-8 dark:text-gray-400">
            I bring 9+ years of backend engineering experience across the full
            software lifecycle, from requirements to production delivery. I design
            and implement resilient Java microservices focused on reliability,
            observability, and high-throughput event-driven processing.
          </p>
          <div className="mt-7 flex flex-wrap gap-3 sm:mt-8">
            <a
              href="#projects"
              className="inline-flex items-center justify-center rounded-md bg-sky-500 px-5 py-3 text-sm font-semibold text-slate-950 shadow-md shadow-sky-500/35 transition-all duration-200 hover:scale-105 hover:bg-sky-400 hover:shadow-lg hover:shadow-sky-400/45"
            >
              View Projects
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-md border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:scale-105 hover:border-sky-500 hover:bg-sky-500 hover:text-white dark:border-slate-700 dark:bg-slate-900 dark:text-slate-100 dark:hover:border-sky-400 dark:hover:bg-sky-500"
            >
              Contact Me
            </a>
          </div>
        </div>

        <div className="glass-card glass-card-hover relative w-full max-w-md rounded-2xl p-6 shadow-lg sm:p-8">
          <div className="space-y-5">
            <div>
              <h2 className="text-lg font-semibold text-slate-800 dark:text-slate-200">Core strengths</h2>
              <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600 dark:text-gray-400">
                <li>Distributed backend architecture for mission-critical systems</li>
                <li>Spring ecosystem, messaging, and caching (Kafka, RabbitMQ, Redis)</li>
                <li>Integration test automation and delivery quality improvements</li>
              </ul>
            </div>
            <div className="glass-card rounded-xl p-4">
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500 dark:text-slate-400">
                Latest work
              </p>
              <p className="mt-2 text-sm leading-relaxed text-slate-700 dark:text-gray-400">
                Built distributed operation-control backend services for emergency
                workflows and improved delivery reliability through automation,
                including a{' '}
                <span className="font-semibold text-slate-900 dark:text-white">50% reduction in manual integration testing</span>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
