import { Award, Cloud, GraduationCap } from "lucide-react";

const credentials = [
  {
    icon: Cloud,
    title: "OCI Learning Track",
    detail: "Oracle Cloud Infrastructure topics including autonomous database, MySQL/NoSQL, and converged database foundations.",
  },
  {
    icon: GraduationCap,
    title: "MSc in Mobile Computing",
    detail: "University of Applied Sciences, Austria (2013-2015) with focus on communication technologies and app systems.",
  },
  {
    icon: Award,
    title: "BSc in Computer Science",
    detail: "Mumbai University (2004-2008), graduated with distinction in final year.",
  },
];

export default function CredentialsStrip() {
  return (
    <section id="credentials" className="section-ambient border-t border-slate-200 bg-white/70 dark:border-gray-800 dark:bg-slate-900/30">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="heading-gradient text-3xl font-bold tracking-tight sm:text-5xl">Credentials and learning</h2>
          <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg sm:leading-8 dark:text-gray-400">
            Continuous learning across cloud, distributed systems, and software engineering foundations.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {credentials.map((item) => (
            <article key={item.title} className="glass-card glass-card-hover rounded-2xl p-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 dark:bg-slate-800">
                  <item.icon className="h-5 w-5 text-slate-700 dark:text-slate-200" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{item.title}</h3>
              </div>
              <p className="mt-4 text-sm leading-relaxed text-slate-600 dark:text-gray-400">{item.detail}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
