import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contact" className="section-ambient section-ambient-alt border-t border-slate-200 bg-slate-100 dark:border-gray-800 dark:bg-slate-950">
      <div className="mx-auto max-w-6xl px-6 py-20 sm:py-24">
        <div className="grid gap-10 lg:grid-cols-3">
          <div>
            <h3 className="heading-gradient text-xl font-bold sm:text-2xl">Get in touch</h3>
            <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-gray-400">
              I&apos;m available for contract work and senior backend roles. Send a message and I&apos;ll respond within one business day.
            </p>
            <div className="mt-6 space-y-3 text-sm leading-relaxed text-slate-600 dark:text-gray-400">
              <p>
                <span className="font-medium text-slate-800 dark:text-slate-200">Email:</span>{' '}
                <a href="mailto:shrikant.havale@yahoo.com" className="text-sky-700 hover:text-sky-600 dark:text-sky-300 dark:hover:text-sky-200">shrikant.havale@yahoo.com</a>
              </p>
              <p>
                <span className="font-medium text-slate-800 dark:text-slate-200">Location:</span> Pune, India
              </p>
            </div>
          </div>
          <div className="lg:col-span-2">
            <h3 className="heading-gradient text-xl font-bold sm:text-2xl">Quick links</h3>
            <div className="mt-6 grid grid-cols-2 gap-8 sm:grid-cols-3">
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Work</p>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600 dark:text-gray-400">
                  <li><a className="hover:text-slate-900 dark:hover:text-slate-100" href="#projects">Featured projects</a></li>
                  <li><a className="hover:text-slate-900 dark:hover:text-slate-100" href="#tech">Tech stack</a></li>
                  <li><Link className="hover:text-slate-900 dark:hover:text-slate-100" href="/projects">All project pages</Link></li>
                  <li><Link className="hover:text-slate-900 dark:hover:text-slate-100" href="/experience">Experience details</Link></li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Writing</p>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600 dark:text-gray-400">
                  <li><a className="hover:text-slate-900 dark:hover:text-slate-100" href="#blog">Latest posts</a></li>
                  <li><a className="hover:text-slate-900 dark:hover:text-slate-100" href="#">All archives</a></li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-800 dark:text-slate-200">Social</p>
                <ul className="mt-3 space-y-2 text-sm leading-relaxed text-slate-600 dark:text-gray-400">
                  <li><a className="hover:text-slate-900 dark:hover:text-slate-100" href="https://github.com/shrikanthavale" target="_blank" rel="noopener noreferrer">GitHub</a></li>
                  <li><a className="hover:text-slate-900 dark:hover:text-slate-100" href="https://www.linkedin.com/in/shrikanthavale/" target="_blank" rel="noopener noreferrer">LinkedIn</a></li>
                  <li><a className="hover:text-slate-900 dark:hover:text-slate-100" href="https://stackoverflow.com/users/2931342/shrikant-havale" target="_blank" rel="noopener noreferrer">Stack Overflow</a></li>
                  <li><a className="hover:text-slate-900 dark:hover:text-slate-100" href="https://www.hackerrank.com/shrikant_havale" target="_blank" rel="noopener noreferrer">HackerRank</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t border-slate-300 pt-6 text-center text-sm text-slate-500 dark:border-slate-800">
          © {new Date().getFullYear()} Shrikant Havale. Built with Next.js & Tailwind CSS.
        </div>
      </div>
    </footer>
  );
}
