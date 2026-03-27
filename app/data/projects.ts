export type Project = {
  slug: string;
  title: string;
  description: string;
  tags: string[];
  role: string;
  context: string;
  architecture: string[];
  outcomes: string[];
  preface?: string;
};

export const projects: Project[] = [
  {
    slug: "secure-code-execution-engine",
    title: "Designing a Secure Code Execution Engine for Programming Assessments",
    description:
      "Built a system to automatically evaluate programming assignments by safely executing untrusted code in isolated virtual machines, integrated with Moodle.",
    tags: ["Java", "REST API", "VirtualBox", "Moodle", "System Design"],
    role: "Lead Backend Engineer, secure code execution and assessment automation",
    context:
      "Developed a backend system for programming assessments that required secure, scalable execution of untrusted student code, with seamless integration into Moodle LMS workflows.",
    architecture: [
      "Isolated code execution using VirtualBox VMs to sandbox untrusted code.",
      "REST API for assignment submission, result retrieval, and integration with Moodle.",
      "Automated VM provisioning and teardown for scalable, parallel evaluation.",
      "Centralized logging and result aggregation for auditability and feedback.",
      "Security controls to prevent code breakout and resource abuse.",
    ],
    outcomes: [
      "Demonstrated secure execution of untrusted code and scalable evaluation architecture.",
      "Enabled automated grading and feedback for programming assignments.",
      "Reduced manual grading effort and improved assessment turnaround time.",
    ],
  },
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
    title: "Personal Portfolio Platform",
    preface: "Side project",
    description:
      "Production-grade portfolio with CI/CD pipelines, static analysis, security hardening, and automated deployment verification.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "GitHub Actions", "SonarCloud", "Vercel", "Claude Code"],
    role: "Designer and Engineer",
    context:
      "Personal project to build a consulting-focused portfolio applying the same production engineering standards used in enterprise backend systems.",
    architecture: [
      "GitHub Actions CI pipeline with commit validation, lint, typecheck and build gates",
      "SonarCloud static analysis with quality gates blocking poor code from merging",
      "CSP security headers, HSTS, Turnstile anti-spam on contact form",
      "Automated deployment health check via SMTP verification after each Vercel deploy",
      "AI-assisted development workflow using Claude Code with WebStorm JetBrains plugin",
    ],
    outcomes: [
      "Zero critical security vulnerabilities via SonarCloud quality gates",
      "Automated post-deployment SMTP health check on every release",
      "Dependabot automated dependency vulnerability scanning",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | null {
  return projects.find((project) => project.slug === slug) ?? null;
}
