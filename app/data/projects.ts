export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  role: string;
  context: string;
  architecture: string[];
  outcomes: string[];
};

export const projects: Project[] = [
  {
    slug: "emergency-operations-control-platform",
    title: "Emergency Operations Control Platform",
    description:
      "Built backend modules for a distributed emergency-operations platform, enabling secure API access, resilient event-driven coordination, and low-latency shared state for time-critical workflows.",
    tags: ["Java", "Spring Boot", "RabbitMQ", "Redis"],
    role: "Software Developer, distributed operation control and management systems",
    context:
      "Worked on a mission-critical platform coordinating emergency workflows across distributed services, where operators needed dependable system behavior and fast access to shared operational context during active incidents. The design focus was secure service boundaries, asynchronous backend coordination, and fast state access under pressure.",
    architecture: [
      "Established secure gateway-backed Spring services so operator-facing systems and internal modules could interact through clearly separated service boundaries.",
      "Used RabbitMQ to coordinate incident intake, dispatch, and notification flows asynchronously, reducing tight coupling between operational services.",
      "Applied Redis for low-latency shared state and fast lookups where incident context needed to remain immediately available across services.",
      "Improved module isolation so failures in one operational path stayed contained and did not cascade across incident handling flows.",
    ],
    outcomes: [
      "Improved reliability for operationally sensitive emergency workflows.",
      "Reduced manual integration testing effort by 50% through Robot Framework automation.",
      "Increased release confidence by strengthening backend integration quality checks.",
    ],
  },
  {
    slug: "admin-console-modernization",
    title: "Admin Console Modernization",
    description:
      "Modernized an enterprise customer-care admin console to simplify configuration workflows, reduce training overhead, and lower dependence on specialized database handling.",
    tags: ["Java", "Eclipse RCP", "Oracle", "Db2"],
    role: "Consultant, post-sales enterprise application modernization",
    context:
      "Contributed to an administrative console modernization effort where operations teams needed faster, safer control over platform behavior without relying on deep database-level intervention for routine changes.",
    architecture: [
      "Designed and implemented modules that fit the existing Eclipse RCP application model without disrupting established enterprise workflows.",
      "Refined configuration and control flows so common operational actions were easier to complete and less error-prone.",
      "Supported database migration paths from Oracle to IBM Db2 where customer environments required it.",
      "Worked with cross-functional stakeholders to turn operational requirements into implementable technical designs within legacy constraints.",
    ],
    outcomes: [
      "Reduced training effort for support and operations users adopting the updated console.",
      "Lowered dependence on specialized manual database procedures for routine administrative tasks.",
      "Improved maintainability of production admin workflows within the existing enterprise platform.",
    ],
  },
  {
    slug: "integration-test-automation-initiative",
    title: "Integration Test Automation Initiative",
    description:
      "Implemented automated integration test flows with Robot Framework, cutting manual validation effort by 50% and improving release stability for distributed backend services.",
    tags: ["Robot Framework", "Java", "CI/CD", "Microservices"],
    role: "Backend engineer driving release quality and test automation",
    context:
      "Led integration testing improvements for distributed backend services where manual validation had become a release bottleneck and a recurring quality risk for frequent deployments.",
    architecture: [
      "Defined repeatable integration scenarios around the highest-risk service interactions and failure-prone release paths.",
      "Automated end-to-end validation flows with Robot Framework so critical backend behavior could be exercised consistently.",
      "Integrated automated checks into delivery pipelines to catch regressions earlier in the release cycle.",
      "Standardized release-readiness criteria for cross-service behavior so teams had a shared quality baseline before deployment.",
    ],
    outcomes: [
      "Cut manual integration testing effort by 50%.",
      "Improved release stability by reducing regressions in distributed service interactions.",
      "Enabled faster feedback loops for backend delivery teams through repeatable automated validation.",
    ],
  },
  {
    slug: "portfolio-development",
    title: "Personal Portfolio Development",
    description:
      "Designed and built a modern, responsive portfolio website using Next.js, TypeScript, and Tailwind CSS to showcase projects, certifications, and professional journey.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    role: "Full Stack Developer & Designer",
    context:
      "Created a personal portfolio to highlight technical skills, project experience, and certifications, focusing on performance, accessibility, and maintainability.",
    architecture: [
      "Next.js App Router for hybrid SSR/SSG and routing.",
      "TypeScript for type safety and maintainability.",
      "Tailwind CSS for utility-first, responsive styling.",
      "Custom React components for modular UI.",
      "Dynamic content loading for blog and project data.",
      "Vercel for CI/CD, preview deployments, and global edge delivery.",
      "Contact form API route with email integration.",
      "SEO optimization with sitemap and robots.txt generation.",
      "Dark/light theme support with context provider.",
    ],
    outcomes: [
      "Improved professional visibility and personal branding.",
      "Enabled easy updates and content management for new projects and blogs.",
      "Achieved high Lighthouse scores for performance and accessibility.",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | null {
  return projects.find((project) => project.slug === slug) ?? null;
}
