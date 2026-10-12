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
  githubUrl?: string;
  liveUrl?: string;
};

export const projects: Project[] = [
  {
    slug: "testhoop",
    title: "TestHoop — Exam Practice Platform",
    preface: "Side project · Live product",
    liveUrl: "https://testhoop.com",
    description:
      "A free practice-exam platform for IT certifications and entrance exams — timed mocks, topic drills, weak-topic diagnosis and a spaced review queue, built solo on a Java 21 hexagonal backend with a Next.js frontend.",
    tags: [
      "Java",
      "Spring Boot",
      "PostgreSQL",
      "OpenAPI",
      "REST API",
      "Next.js",
      "TypeScript",
      "Docker",
      "Hexagonal Architecture",
      "Claude Code",
    ],
    role: "Founder, Architect and Solo Developer",
    context:
      "TestHoop (testhoop.com) is an exam-practice marketplace — think Udemy for practice tests — that started with Oracle Java OCP certification and has grown to cover Oracle SQL, OCI and AI, VMware Spring, AWS AI Practitioner and the MHT-CET entrance exam. The tagline says it plainly: make the mistakes here, not in the exam room. It is built and operated solo at roughly an hour a day, on a $0–50/month budget, with AI-assisted development as a deliberate part of the workflow rather than an afterthought.",
    architecture: [
      "Spec-first backend: every module is defined by its OpenAPI contract (question-api, exam-api, mock-api, topic-api) before any code is written, so the frontend, the content pipeline and the tests all share one source of truth for the API.",
      "Hexagonal modules on Java 21 — the domain carries no framework dependencies; Spring Boot, PostgreSQL and the REST layer sit behind ports and adapters, mirroring the discipline used in the content pipeline (testhoop-qgen).",
      "Exam engine that reproduces the real exam's length, time limit and pass line; supports flagging, skipping and review; shuffles options per attempt so answer-position bias can never be farmed.",
      "Learning loop: per-topic scoring across attempts surfaces the weakest area with a one-click drill, and missed questions return on a spaced schedule (1, 3, 7, 16 and 35 days).",
      "Readiness verdict (Likely ready / Borderline / Not yet) weighted by the official topic weights from the exam owner's published guide where available, derived from the mock's topic mix where not.",
      "Content is never hand-typed into the database: it arrives only through the REST import contract from the separate testhoop-qgen pipeline, idempotently keyed by content-hash external IDs.",
    ],
    outcomes: [
      "Live at testhoop.com with 17 exam packs across 7 tracks — Oracle Java (OCA 7/8, OCP 8/17/21/25), SQL, OCI, Oracle AI, Spring, AWS AI Practitioner and MHT-CET.",
      "Every shipped question is verified before students see it — about half of the catalog by actual execution (compile-and-run, real Oracle DB), the rest by a second-model judge checked against vendor documentation.",
      "Free to use with no paid tier; practice works without an account, sign-in unlocks timed mocks, custom tests, saved progress and the review queue.",
      "Shipped and operated end to end by one engineer — product, backend, frontend, content pipeline and deployment.",
    ],
  },
  {
    slug: "testhoop-qgen",
    title: "testhoop-qgen — Verified Question Generation Pipeline",
    preface: "Side project · AI content pipeline",
    description:
      "LLM-assisted pipeline that drafts exam questions, mechanically verifies them with real oracles (javac, Oracle SQL, SymPy, Pint, chemistry rules), runs content lints and imports the survivors into TestHoop over REST.",
    tags: [
      "Java",
      "Maven",
      "Picocli",
      "Claude API",
      "Claude Code",
      "Python",
      "SymPy",
      "OpenAPI",
      "Oracle",
      "Docker",
      "GitHub Actions",
      "Hexagonal Architecture",
    ],
    role: "Architect and Developer",
    context:
      "Content quality is the product behind the product: one bad question erodes a learner's trust in the whole platform. qgen is the build-time authoring pipeline that makes LLM-drafted questions safe to ship. The guiding principle is that verification is a gradient, not a boolean — code compiles and runs (confidence ≈ 1.0), maths is checked symbolically (~0.95), physics and chemistry numerics are checked with units (~0.85), and purely conceptual items go to a second-model judge (~0.7) and a human reviewer. The pipeline runs locally and fits a flat-rate Claude subscription by default, with metered API use as an opt-in.",
    architecture: [
      "Maven multi-module hexagonal design (qgen-core, -generation, -verification, -import, -coverage, -cli): cross-module calls go only through application ports; the domain has no framework dependencies.",
      "Three interchangeable LLM backends behind one LlmClient port — manual paste-back (free), the Anthropic Messages API (metered) and headless Claude Code (flat-rate) — selected with a single --via flag.",
      "Self-healing generation loop: generate → verify each question → feed failures back as a repair prompt → re-verify → drop the still-broken → gate the batch. Every round is logged as JSONL, which doubles as a prompt-tuning dataset.",
      "Verifier port with pluggable oracles: javac compile-and-run for Java, JDBC against a real Oracle fixture for SQL, SymPy for symbolic maths, Pint for units-bearing physics and chemistry quantities, a Java chemistry verifier (oxidation numbers, equation balancing, IUPAC names via OPSIN/CDK), and an LLM judge for conceptual items.",
      "Six content lints (key distribution, near-duplicate detection, duplicate options, positional references, letter references in explanations, per-batch key balance) with one definition in core, reported by coverage and enforced as hard gates by import.",
      "Import talks to TestHoop only through its vendored OpenAPI contract — generated DTOs, a contract test and a WireMock harness — never its database; writes are idempotent via content-hash external IDs and guarded by a committed ids.lock that CI refuses to let drift.",
    ],
    outcomes: [
      "Over 350 question batches across 7 tracks and 17 exam packs, from Java OCP through MHT-CET physics, chemistry and maths — every one gated by an oracle or a judge before import.",
      "Grew from a Java-only tool into a domain-extensible framework by the rule of three: adding maths, physics and chemistry each required a new oracle adapter, not a rewrite of the core.",
      "Catalog correctness is a CI gate — a pack with a key-position bias, a near-duplicate or an unanswerable question fails the build before it can reach students.",
      "~900 commits since May 2026 with ~290 Java sources and 100+ test classes, developed with Claude Code sessions driven by phase-structured prompts and reviewed branch by branch.",
    ],
  },
  {
    slug: "secure-code-execution-engine",
    title: "Secure Code Execution Engine",
    preface: "Master's Thesis — FH Hagenberg, 2015",
    description:
      "Built a secure automated grading system for programming assignments in Moodle using isolated Oracle VirtualBox VMs per student.",
    tags: [
      "Java",
      "J2EE",
      "REST API",
      "Oracle VirtualBox",
      "Moodle",
      "SSH",
      "Tomcat",
      "SliTaz Linux",
      "System Design",
      "Security",
    ],
    role: "Researcher, Architect and Developer",
    context:
      "Master's thesis at University of Applied Sciences Hagenberg, Austria (FH OÖ), September 2015. Research identified two critical gaps in automated programming assessment tools: none were integrated with e-learning platforms, and none handled the security risk of executing untrusted student code — file deletion, memory overflow, infinite loops, denial-of-service via threads.",
    architecture: [
      "4-layer architecture: Moodle plugin (application layer) → REST API on Tomcat (VM management and programming API) → Oracle VBox SDK (virtualization API) → Oracle VirtualBox with SliTaz Linux VMs (virtualization layer).",
      "REST API (.war on Tomcat) with 7 endpoints via Oracle VirtualBox SDK: check connection, get VM details, start VM, stop VM, clone VM, compile Java program, execute Java program.",
      "Each student assigned a dedicated SliTaz Linux VM (64MB RAM, 1GB HDD) — code executed in isolation, damage contained to that VM, new clone available in seconds from master.",
      "Moodle question type plugin integrated with Moodle gradebook, student accounts, course system and quiz workflow.",
      "Evaluated static analysis, Java Security Manager, sandboxing and Unix accounts before selecting VM isolation as the only approach that closes the full threat model.",
    ],
    outcomes: [
      "Prototype for executing code in contained environment",
      "Built a REST API (.war deployed on Tomcat) using Oracle VirtualBox SDK with 7 endpoints: check connection, get VM details, start VM, stop VM, clone VM, compile Java program, execute Java program.",
      "Each student assigned a dedicated isolated SliTaz Linux VM (64MB RAM, 1GB HDD) — malicious code damage contained to that VM only, cloneable from master in seconds.",
      "Moodle question type plugin integrated with Moodle gradebook, student accounts, course system and quiz workflow — instructors can mix programming questions with MCQ, true/false etc.",
      "Evaluated multiple security alternatives before the VM approach: static analysis, Java Security Manager, sandboxing, Unix accounts — documented why each was insufficient.",
      "REST API published on GitHub for reuse in other e-learning platforms beyond Moodle.",
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
    preface: "Side project · Open Source",
    description:
      "Production-grade portfolio with CI/CD, static analysis, security hardening and automated deployment verification.",
    tags: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "GitHub Actions",
      "SonarCloud",
      "Vercel",
      "Claude Code",
    ],
    githubUrl: "https://github.com/shrikanthavale/shrikant-portfolio",
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
      "Zero critical vulnerabilities via SonarCloud. Full engineering pipeline from day one.",
      "Automated post-deployment SMTP health check on every release",
      "Dependabot automated dependency vulnerability scanning",
    ],
  },
];

export function getProjectBySlug(slug: string): Project | null {
  return projects.find((project) => project.slug === slug) ?? null;
}
