export const siteConfig = {
  person: {
    name: "Shrikant Havale",
    title: "Senior Backend Engineer",
    location: "Austria",
    currentEmployer: "Eurofunk Kappacher Gmbh",
    profilePhoto: "/profile.jpg",
    knowsAbout: ["Java", "Spring Boot", "Microservices", "Kafka", "Redis", "Distributed Systems"],
  },

  /**
   * All social profiles.
   * navbarVisible: true  → rendered in Navbar icon row and ContactSection buttons
   * navbarVisible: false → rendered in Footer only
   */
  social: [
    {
      label: "GitHub",
      href: "https://github.com/shrikanthavale",
      icon: "Github",
      navbarVisible: true,
    },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/shrikanthavale/",
      icon: "Linkedin",
      navbarVisible: true,
    },
    {
      label: "Stack Overflow",
      href: "https://stackoverflow.com/users/2931342/shrikant-havale",
      icon: "Code2",
      navbarVisible: false,
    },
    {
      label: "HackerRank",
      href: "https://www.hackerrank.com/shrikant_havale",
      icon: "TerminalSquare",
      navbarVisible: false,
    },
  ],

  navbar: {
    cta: { label: "Let's talk", href: "#contact" },
    navItems: [
      { label: "Home", href: "#hero" },
      { label: "Projects", href: "#projects" },
      { label: "Tech Stack", href: "#tech" },
      { label: "Blog", href: "#blog" },
      { label: "Contact", href: "#contact" },
    ],
  },

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

  contact: {
    heading: "Let's build scalable systems together",
    subheading:
      "I design resilient backend systems, distributed architectures, and high-throughput event-driven platforms.",
    hintsTitle: "To help me respond faster, please include:",
    hints: ["Project context or role details", "Expected timeline", "Relevant links or references"],
    messagePlaceholder: "Tell me a bit about the project, role, or problem you want to discuss.",
    responseTime: "Usually responds within 24 hours",
    successMessage: "Thanks for reaching out. I will get back to you within 24 hours.",
  },

  footer: {
    copyright: "Built with Next.js & Tailwind CSS.",
    quickLinks: [
      {
        heading: "Work",
        links: [
          { label: "Featured projects", href: "#projects" },
          { label: "Tech stack", href: "#tech" },
          { label: "All Projects", href: "/projects" },
          { label: "Career journey", href: "/journey" },
          { label: "Certifications", href: "/certifications" },
        ],
      },
      {
        heading: "Writing",
        links: [
          { label: "Latest posts", href: "#blog" },
          { label: "All blogs", href: "/blog" },
        ],
      },
    ],
  },

  seo: {
    url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.shrikant-havale.in",
    siteName: "Shrikant Havale Portfolio",
    description:
      "Shrikant Havale is a Senior Backend Engineer specializing in Java microservices, distributed systems, resiliency, observability, and event-driven architecture.",
    ogDescription:
      "Portfolio showcasing Java backend engineering work in resilient microservices, distributed systems, and technical architecture.",
    ogImage: "/profile.jpg",
    keywords: [
      "Shrikant Havale",
      "Senior Backend Engineer",
      "Java Backend Developer",
      "Spring Boot",
      "Microservices",
      "Distributed Systems",
      "Portfolio",
    ],
    googleVerification: "vdT2Qx0QvbFBMDrxdEFqrntWgxIPbf6v5MA6fqGGy_Q",
  },

  resume: {
    path: "/Havale_Shrikant.pdf",
  },
};
