export const siteConfig = {
  hero: {
    tagline: "Senior Java Backend Engineer · Available for Consulting",
    headline: "Backend expertise, when your team needs it most",
    bio: "15+ years designing and delivering resilient Java backend systems for mission-critical environments. I work with teams on focused engagements — architecture reviews, microservices design, event-driven systems, and delivery quality improvements.",
    credentials: "Oracle Certified Professional · Java SE 17 · Spring Certified Professional 2024",
    cta: {
      primary: { label: "Let's work together", href: "#contact-form" },
      secondary: { label: "View Projects", href: "#projects" },
    },
    services: [
      {
        title: "Architecture reviews",
        description: "Microservices design, distributed systems assessment",
        icon: "LayoutTemplate",
        colors: {
          border: "border-sky-200 dark:border-sky-800/60",
          bg: "bg-sky-50 dark:bg-sky-900/30",
          icon: "text-sky-600 dark:text-sky-400",
        },
      },
      {
        title: "Event-driven systems",
        description: "RabbitMQ, Kafka, Redis — async processing and coordination",
        icon: "Zap",
        colors: {
          border: "border-violet-200 dark:border-violet-800/60",
          bg: "bg-violet-50 dark:bg-violet-900/30",
          icon: "text-violet-600 dark:text-violet-400",
        },
      },
      {
        title: "Delivery quality",
        description: "Test automation, CI/CD, reducing manual effort",
        icon: "ShieldCheck",
        colors: {
          border: "border-emerald-200 dark:border-emerald-800/60",
          bg: "bg-emerald-50 dark:bg-emerald-900/30",
          icon: "text-emerald-600 dark:text-emerald-400",
        },
      },
    ],
    stats: [
      { value: "15+ certs", label: "active certifications" },
      { value: "Austria + India", label: "cross-border delivery" },
      { value: "Robot + Cypress", label: "test automation" },
      { value: "Since 2008", label: "professional Java development" },
    ],
  },
};
