export type TimelineEntry = {
  title: string;
  accent: "cyan" | "amber" | "rose";
  kind: "work" | "education";
  stage: string;
  location: string;
  period: string;
  role: string;
  narrative: string;
  tags: string[];
  highlights: string[];
};

export const timelineEntries: TimelineEntry[] = [
  {
    title: "Secondary Certificate Examination (10th Standard)",
    accent: "rose",
    kind: "education",
    stage: "School Foundation",
    location: "Kalwa, India",
    period: "2001-2002",
    role: "New English School Kalwa",
    narrative:
      "Completed secondary education with strong results and built a disciplined foundation for technical learning.",
    tags: ["Secondary Education", "Science", "Mathematics"],
    highlights: [
      "Achieved 83% in the Secondary Certificate Examination.",
      "Built early strength in analytical and quantitative subjects.",
      "Established a strong base for engineering-focused studies.",
    ],
  },
  {
    title: "Higher Secondary Education (Science)",
    accent: "rose",
    kind: "education",
    stage: "Pre-Engineering",
    location: "Thane, India",
    period: "2002-2004",
    role: "New English Junior College",
    narrative:
      "Focused on science-stream coursework to prepare for formal engineering education and analytical problem-solving.",
    tags: ["Higher Secondary", "Science", "Pre-Engineering"],
    highlights: [
      "Completed higher secondary education with 75% marks.",
      "Focused on core science subjects relevant to engineering pathways.",
      "Prepared for undergraduate computer engineering curriculum.",
    ],
  },
  {
    title: "Bachelor's Degree in Computer Engineering",
    accent: "rose",
    kind: "education",
    stage: "Undergraduate Engineering",
    location: "Mumbai, India",
    period: "2004-2008",
    role: "Mumbai University",
    narrative:
      "Completed core computer engineering training and built a strong base in software development fundamentals.",
    tags: ["Computer Engineering", "Software Engineering", "Programming"],
    highlights: [
      "Graduated with 71% and consistent academic performance.",
      "Built engineering fundamentals across programming, systems, and software design.",
      "Developed a practical base for backend and enterprise application development.",
    ],
  },
  {
    title: "Infosys",
    accent: "amber",
    kind: "work",
    stage: "Early Career",
    location: "Pune, India",
    period: "2008-2011",
    role: "Software Developer",
    narrative:
      "Started as a software trainee in Java technologies and progressed into enterprise software delivery.",
    tags: ["Java", "Training", "Enterprise Projects"],
    highlights: [
      "Completed foundational training in advanced Java and enterprise development practices.",
      "Contributed to multiple project workstreams across the software delivery lifecycle.",
      "Built core engineering discipline in coding standards, testing, and collaboration.",
    ],
  },
  {
    title: "Amdocs",
    accent: "cyan",
    kind: "work",
    stage: "Product Customization",
    location: "Pune, India",
    period: "2011-2012",
    role: "Software Developer",
    narrative:
      "Customized product-based solutions to address customer-specific requirements in telecom systems.",
    tags: ["Java", "Customization", "Product Engineering"],
    highlights: [
      "Implemented customer-specific adaptations for existing enterprise product modules.",
      "Worked with functional teams to translate requirements into software changes.",
      "Maintained delivery quality while working with evolving product constraints.",
    ],
  },
  {
    title: "Health and Well-being",
    accent: "amber",
    kind: "work",
    stage: "Career Break",
    location: "Pune, India",
    period: "2012",
    role: "Career Break",
    narrative:
      "Took a short planned break for recovery after a leg injury, then returned to full-time software development.",
    tags: ["Recovery", "Resilience", "Career Continuity"],
    highlights: [
      "Focused on recovery from a broken left femur bone.",
      "Returned to engineering with renewed long-term focus.",
      "Resumed career momentum toward enterprise backend roles.",
    ],
  },
  {
    title: "Capgemini",
    accent: "cyan",
    kind: "work",
    stage: "Enterprise Delivery",
    location: "Mumbai, India",
    period: "2012-2013",
    role: "Software Developer",
    narrative:
      "Delivered software development, configuration, and release management for J2EE enterprise applications.",
    tags: ["Java", "J2EE", "Release Management"],
    highlights: [
      "Developed and configured enterprise application modules in the Java/J2EE stack.",
      "Supported release activities to improve deployment consistency.",
      "Worked across development and configuration tasks in a delivery-focused team.",
    ],
  },
  {
    title: "Master's Degree in Mobile Computing",
    accent: "rose",
    kind: "education",
    stage: "Advanced Specialization",
    location: "Hagenberg, Austria",
    period: "2013-2015",
    role: "Hagenberg Campus - FH Upper Austria",
    narrative:
      "Specialized in mobile computing and communication systems while gaining international academic and engineering exposure.",
    tags: ["Mobile Computing", "Engineering", "Communication Systems"],
    highlights: [
      "Graduated with a 1.29 grade, reflecting strong graduate performance.",
      "Deepened systems thinking through advanced mobile and communication-focused coursework.",
      "Expanded technical and cultural perspective through graduate study in Austria.",
    ],
  },
  {
    title: "NTS Retail",
    accent: "amber",
    kind: "work",
    stage: "Summer Internship",
    location: "Linz, Austria",
    period: "2014",
    role: "Summer Intern",
    narrative:
      "Built and configured system and integration testing frameworks using modern testing approaches.",
    tags: ["Internship", "Integration Testing", "Automation"],
    highlights: [
      "Configured system and integration testing workflows for application validation.",
      "Worked with modern testing tooling during a focused internship period.",
      "Gained practical experience in test engineering in an enterprise context.",
    ],
  },
  {
    title: "ETM Professional Control",
    accent: "amber",
    kind: "work",
    stage: "Quality Engineering",
    location: "Linz, Austria",
    period: "2015",
    role: "Software Test Engineer (Part-Time)",
    narrative:
      "Validated control script framework behavior through focused testing and structured bug tracking.",
    tags: ["Software Testing", "Bug Tracking", "Quality"],
    highlights: [
      "Tested control script framework capabilities in a part-time engineering role.",
      "Improved product reliability through structured defect discovery and tracking.",
      "Strengthened practical quality engineering and validation practices.",
    ],
  },
  {
    title: "Eurofunk Kappacher GmbH",
    accent: "cyan",
    kind: "work",
    stage: "Critical Systems",
    location: "Hagenberg, Austria",
    period: "2015-2018",
    role: "Software Developer",
    narrative:
      "Built backend services for emergency-response systems where reliability and response time were critical.",
    tags: ["Java", "Spring Boot", "RabbitMQ", "Redis", "Robot Framework"],
    highlights: [
      "Built distributed backend services for emergency-response systems.",
      "Implemented secure Spring APIs for operator-facing capabilities.",
      "Automated integration testing with Robot Framework, Cypress, and API suites.",
    ],
  },
  {
    title: "Eurofunk Kappacher GmbH",
    accent: "cyan",
    kind: "work",
    stage: "Independent Delivery",
    location: "Pune, India (Remote)",
    period: "2018-Present",
    role: "Software Developer (Freelance)",
    narrative:
      "Continued delivering distributed emergency-response backend systems remotely, with focus on reliability and practical engineering outcomes.",
    tags: ["Spring", "Microservices", "RabbitMQ", "Redis", "Remote Delivery"],
    highlights: [
      "Delivered backend features for real-world emergency operation workflows.",
      "Implemented microservice communication patterns with RabbitMQ and Redis.",
      "Sustained long-term freelance delivery for mission-critical domains.",
    ],
  },
];
