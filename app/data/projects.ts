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
      "Developed backend modules for a distributed operations-control system handling real-life emergency workflows, with secure API exposure and resilient service-to-service communication.",
    tags: ["Java", "Spring Boot", "RabbitMQ", "Redis"],
    role: "Software Developer, distributed operation control and management systems",
    context:
      "Worked on a mission-critical platform used for emergency workflows in a distributed environment. The focus was on reliability, clear service boundaries, and robust backend communication under operational pressure.",
    architecture: [
      "Built Spring-based backend services exposing secured APIs to client-facing systems.",
      "Used RabbitMQ for asynchronous service communication and event-driven coordination.",
      "Applied Redis for low-latency data access and cross-service coordination paths.",
      "Improved module isolation to keep fault impact localized during incident-heavy periods.",
    ],
    outcomes: [
      "Improved system stability for operationally sensitive emergency use cases.",
      "Reduced manual integration testing by 50% through automation with Robot Framework.",
      "Increased deployment confidence by strengthening backend integration quality checks.",
    ],
  },
  {
    slug: "admin-console-modernization",
    title: "Admin Console Modernization",
    description:
      "Remodeled an enterprise customer-care admin console to simplify configuration and operations, reducing training overhead and dependence on specialized database handling.",
    tags: ["Java", "Eclipse RCP", "Oracle", "Db2"],
    role: "Consultant, post-sales enterprise application modernization",
    context:
      "Contributed to modernization of an administrative console where operations teams needed faster and safer control over platform behavior without deep database-level interventions.",
    architecture: [
      "Designed and implemented modules compatible with the existing Eclipse RCP framework.",
      "Refined configuration and control flows to reduce operational friction.",
      "Supported migration paths from Oracle to IBM Db2 where required.",
      "Collaborated with cross-functional teams to convert requirements into implementable technical designs.",
    ],
    outcomes: [
      "Reduced training effort for support and operations users.",
      "Lowered dependence on specialized manual database procedures.",
      "Improved maintainability of admin workflows in production operations.",
    ],
  },
  {
    slug: "integration-test-automation-initiative",
    title: "Integration Test Automation Initiative",
    description:
      "Implemented automated integration test flows with the Robot Framework, cutting manual testing effort by 50% and improving release stability for distributed services.",
    tags: ["Robot Framework", "Java", "CI/CD", "Microservices"],
    role: "Backend engineer driving release quality and test automation",
    context:
      "Led integration testing improvements for distributed backend services where manual validation was a deployment bottleneck and quality risk for frequent releases.",
    architecture: [
      "Defined repeatable integration scenarios for key service interactions.",
      "Automated end-to-end validation flows with Robot Framework.",
      "Integrated automated checks into delivery pipelines to catch regressions earlier.",
      "Standardized validation criteria for cross-service behavior and release readiness.",
    ],
    outcomes: [
      "Cut manual integration testing effort by 50%.",
      "Improved release stability and reduced production-risk regressions.",
      "Enabled faster feedback loops for backend delivery teams.",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | null {
  return projects.find((project) => project.slug === slug) ?? null;
}
