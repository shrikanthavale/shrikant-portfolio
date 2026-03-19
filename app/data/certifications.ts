export type CertificationStatus = "active" | "no-expiry" | "expired";

export type Certification = {
  id: string;
  title: string;
  issuer: string;
  year: number;
  domain: string;
  status: CertificationStatus;
  credentialId?: string;
  verifyUrl?: string;
};

// Add your real certifications here. This structure supports filtering and verification links.
export const certifications: Certification[] = [
  {
    id: "oracle-oci-2025-data-science-professional",
    title: "Oracle Cloud Infrastructure 2025 Certified Data Science Professional",
    issuer: "Oracle",
    year: 2025,
    domain: "Data Science",
    status: "no-expiry",
  },
  {
    id: "oracle-oci-2025-architect-associate",
    title: "Oracle Cloud Infrastructure 2025 Certified Architect Associate",
    issuer: "Oracle",
    year: 2025,
    domain: "Cloud Architecture",
    status: "active",
  },
  {
    id: "oracle-data-platform-2025-foundations",
    title: "Oracle Data Platform 2025 Certified Foundations Associate",
    issuer: "Oracle",
    year: 2025,
    domain: "Data Platform",
    status: "active",
  },
  {
    id: "oracle-oci-2025-ai-foundations-associate",
    title: "Oracle Cloud Infrastructure 2025 Certified AI Foundations Associate",
    issuer: "Oracle",
    year: 2025,
    domain: "AI",
    status: "active",
  },
  {
    id: "oracle-mysql-heatwave-implementation-associate-rel1",
    title: "MySQL HeatWave Implementation Associate Rel 1",
    issuer: "Oracle",
    year: 2025,
    domain: "Database",
    status: "no-expiry",
  },
  {
    id: "github-copilot",
    title: "GitHub Copilot",
    issuer: "GitHub",
    year: 2025,
    domain: "Developer Productivity",
    status: "active",
  },
  {
    id: "github-foundations",
    title: "GitHub Foundations",
    issuer: "GitHub",
    year: 2025,
    domain: "DevOps",
    status: "active",
  },
  {
    id: "oracle-ai-vector-search-professional",
    title: "Oracle AI Vector Search Certified Professional",
    issuer: "Oracle",
    year: 2025,
    domain: "AI",
    status: "active",
  },
  {
    id: "spring-certified-professional-2024-v2",
    title: "Spring Certified Professional 2024 [v2]",
    issuer: "Broadcom",
    year: 2025,
    domain: "Spring",
    status: "no-expiry",
  },
  {
    id: "oracle-certified-professional-java-se-17",
    title: "Oracle Certified Professional: Java SE 17 Developer",
    issuer: "Oracle",
    year: 2024,
    domain: "Java",
    status: "no-expiry",
  },
  {
    id: "oracle-oci-2025-generative-ai-professional",
    title: "Oracle Cloud Infrastructure 2025 Certified Generative AI Professional",
    issuer: "Oracle",
    year: 2025,
    domain: "AI",
    status: "active",
  },
  {
    id: "sun-certified-programmer-java-se-5",
    title: "Sun Certified Programmer for the Java Platform, SE 5.0",
    issuer: "Oracle",
    year: 2010,
    domain: "Java",
    status: "no-expiry",
  },
  {
    id: "sun-certified-web-component-developer-java-ee-5",
    title: "Sun Certified Web Component Developer for the Java Platform, EE 5",
    issuer: "Oracle",
    year: 2010,
    domain: "Java",
    status: "no-expiry",
  },
  {
    id: "oracle-apex-cloud-developer-professional",
    title: "Oracle APEX Cloud Developer Certified Professional",
    issuer: "Oracle",
    year: 2025,
    domain: "APEX",
    status: "no-expiry",
  },
  {
    id: "oracle-cloud-data-management-2023-foundations",
    title: "Oracle Cloud Data Management 2023 Certified Foundations Associate",
    issuer: "Oracle",
    year: 2023,
    domain: "Data Management",
    status: "expired",
  },
  {
    id: "oracle-oci-2025-foundations-associate",
    title: "Oracle Cloud Infrastructure 2025 Certified Foundations Associate",
    issuer: "Oracle",
    year: 2025,
    domain: "Cloud",
    status: "active",
  },
  {
    id: "cips-information-systems-professional",
    title: "I.S.P. (Information Systems Professional) Certification",
    issuer: "CIPS (Canada's Association of I.T. Professionals)",
    year: 2022,
    domain: "Professional Certification",
    status: "no-expiry",
    credentialId: "47272027",
  },
  {
    id: "cips-saskatchewan-membership",
    title: "CIPS Saskatchewan Membership",
    issuer: "CIPS (Canada's Association of I.T. Professionals)",
    year: 2021,
    domain: "Professional Membership",
    status: "expired",
  },
  {
    id: "wes-verified-international-academic-qualifications",
    title: "Verified International Academic Qualifications",
    issuer: "World Education Services",
    year: 2021,
    domain: "Academic Verification",
    status: "no-expiry",
    credentialId: "5196176IMM",
  },
  {
    id: "oracle-1z0-051-database-11g-sql-fundamentals-i",
    title: "1Z0-051 Oracle Database 11g: SQL Fundamentals I",
    issuer: "Oracle",
    year: 2012,
    domain: "Database",
    status: "no-expiry",
    credentialId: "251176125",
  },
];
