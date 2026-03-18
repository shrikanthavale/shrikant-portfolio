import {
  Cloud,
  Database,
  Leaf,
  Package,
  ServerCog,
  Workflow,
} from "lucide-react";

export default function TechStack() {
  const stack = [
    {
      icon: ServerCog,
      name: 'Java',
      description: 'Java is the foundation of my backend work—clean, stable, and performant services.',
    },
    {
      icon: Leaf,
      name: 'Spring Boot',
      description: 'Modular, testable Spring Boot applications with security and metrics.',
    },
    {
      icon: Package,
      name: 'Microservices',
      description: 'Resilient, decoupled services designed for evolution at scale.',
    },
    {
      icon: Database,
      name: 'Redis',
      description: 'Cache and distributed locking to reduce latency and improve throughput.',
    },
    {
      icon: Workflow,
      name: 'Kafka',
      description: 'Event-driven systems and streaming pipelines for reliable async processing.',
    },
    {
      icon: Cloud,
      name: 'OCI',
      description: 'Infrastructure automation and resilient cloud deployments on OCI.',
    },
  ];

  return (
    <section id="tech" className="section-ambient section-ambient-alt border-t border-slate-200 bg-slate-50/70 dark:border-gray-800 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="heading-gradient text-3xl font-bold tracking-tight sm:text-5xl">Core technology stack</h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8 dark:text-gray-400">
            The tools and platforms I rely on to deliver proven backend systems and efficient developer workflows.
          </p>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {stack.map((item) => (
            <div key={item.name} className="glass-card glass-card-hover rounded-2xl p-6 shadow-sm hover:border-sky-300 dark:hover:border-sky-700">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
                  <item.icon className="h-5 w-5 text-slate-700 dark:text-slate-200" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{item.name}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 dark:text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
