import React from "react";

export default function PortfolioArchitecture() {
  return (
    <div className="w-full flex flex-col items-center">
      <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">Reference architecture</h3>
      <p className="mb-4 text-sm text-slate-600 dark:text-gray-400 max-w-xl text-center">
        Modern portfolio architecture using Next.js App Router, TypeScript, Tailwind CSS, modular React components, dynamic content, and Vercel deployment.
      </p>
      <div className="relative flex flex-col items-center w-full max-w-2xl">
        {/* Hosting/Deployment */}
        <div className="flex flex-col items-center mb-4">
          <div className="rounded-xl border border-sky-300 bg-sky-50 px-4 py-2 text-center text-sky-900 dark:border-sky-700/70 dark:bg-sky-500/10 dark:text-sky-100 shadow-sm">
            <div className="font-bold">Vercel</div>
            <div className="text-xs opacity-80">CI/CD, Edge Delivery</div>
          </div>
          <div className="h-4 w-0.5 bg-slate-300 dark:bg-slate-700" />
        </div>
        {/* App Layer */}
        <div className="flex flex-row items-center justify-center gap-6 mb-4">
          <div className="rounded-xl border border-indigo-300 bg-indigo-50 px-4 py-2 text-center text-indigo-900 dark:border-indigo-700/70 dark:bg-indigo-500/10 dark:text-indigo-100 shadow-sm">
            <div className="font-bold">Next.js App Router</div>
            <div className="text-xs opacity-80">SSR/SSG, Routing</div>
          </div>
          <div className="rounded-xl border border-emerald-300 bg-emerald-50 px-4 py-2 text-center text-emerald-900 dark:border-emerald-700/70 dark:bg-emerald-500/10 dark:text-emerald-100 shadow-sm">
            <div className="font-bold">TypeScript</div>
            <div className="text-xs opacity-80">Type Safety</div>
          </div>
          <div className="rounded-xl border border-pink-300 bg-pink-50 px-4 py-2 text-center text-pink-900 dark:border-pink-700/70 dark:bg-pink-500/10 dark:text-pink-100 shadow-sm">
            <div className="font-bold">Tailwind CSS</div>
            <div className="text-xs opacity-80">Utility Styling</div>
          </div>
        </div>
        {/* UI/Content Layer */}
        <div className="flex flex-row items-center justify-center gap-6 mb-4">
          <div className="rounded-xl border border-slate-300 bg-slate-50 px-4 py-2 text-center text-slate-900 dark:border-slate-700 dark:bg-slate-800/70 dark:text-slate-100 shadow-sm">
            <div className="font-bold">Custom React Components</div>
            <div className="text-xs opacity-80">Modular UI</div>
          </div>
          <div className="rounded-xl border border-yellow-300 bg-yellow-50 px-4 py-2 text-center text-yellow-900 dark:border-yellow-700/70 dark:bg-yellow-500/10 dark:text-yellow-100 shadow-sm">
            <div className="font-bold">Dynamic Content</div>
            <div className="text-xs opacity-80">Blog, Projects, Data</div>
          </div>
        </div>
        {/* API/Integration Layer */}
        <div className="flex flex-row items-center justify-center gap-6 mb-4">
          <div className="rounded-xl border border-cyan-300 bg-cyan-50 px-4 py-2 text-center text-cyan-900 dark:border-cyan-700/70 dark:bg-cyan-500/10 dark:text-cyan-100 shadow-sm">
            <div className="font-bold">API Routes</div>
            <div className="text-xs opacity-80">Contact, Email</div>
          </div>
          <div className="rounded-xl border border-gray-300 bg-gray-50 px-4 py-2 text-center text-gray-900 dark:border-gray-700/70 dark:bg-gray-500/10 dark:text-gray-100 shadow-sm">
            <div className="font-bold">SEO & Theming</div>
            <div className="text-xs opacity-80">Sitemap, robots.txt, Dark/Light</div>
          </div>
        </div>
      </div>
    </div>
  );
}

