export interface CapabilityGroup {
  id: string;
  category: string;
  code: string;
  description: string;
  capabilities: {
    name: string;
    detail?: string;
    highlight?: boolean;
  }[];
}

export interface CredentialItem {
  id: string;
  title: string;
  issuer: string;
  status: "CERTIFIED" | "IN PROGRESS";
  credentialId?: string;
  year?: string;
}

export interface EducationData {
  institution: string;
  degree: string;
  field: string;
  period: string;
  cgpa: string;
  achievements: string[];
  activities: string[];
}

export interface VocationalTrainingItem {
  id: string;
  title: string;
  provider: string;
  location?: string;
  period: string;
  programType: string;
  rating?: string;
  certification: string;
  summary: string;
  keyLearnings: string[];
  skills: string[];
}

export const capabilityMatrix: CapabilityGroup[] = [
  {
    id: "salesforce",
    category: "SALESFORCE",
    code: "CAP-01",
    description: "Enterprise CRM development, data modeling, and process automation",
    capabilities: [
      { name: "Apex Classes", detail: "Controller logic, domain services", highlight: true },
      { name: "Apex Triggers", detail: "Bulkified trigger handler frameworks", highlight: true },
      { name: "Batch Apex", detail: "Asynchronous processing over millions of records", highlight: true },
      { name: "Scheduled Apex", detail: "Automated off-hours database maintenance" },
      { name: "Visualforce", detail: "Custom controllers, page extensions, dynamic tables" },
      { name: "SOQL & SOSL", detail: "Query optimization, selective indexing, relationship queries", highlight: true },
      { name: "Flow Builder", detail: "Declarative record-triggered and screen flows" },
      { name: "Data Management", detail: "Import wizard, Data Loader, data hygiene validation" },
      { name: "Test Classes", detail: "Governor limit enforcement, positive/negative test coverage" },
      { name: "Security & Sharing", detail: "OWD, role hierarchy, permission sets, profile management" },
    ],
  },
  {
    id: "integration",
    category: "INTEGRATION",
    code: "CAP-02",
    description: "Connecting Salesforce with enterprise systems, manufacturing plants, and external web APIs",
    capabilities: [
      { name: "REST APIs", detail: "Custom Apex REST web services and HTTP callouts", highlight: true },
      { name: "XML Generation & Parsing", detail: "Structured payload interchange for legacy systems", highlight: true },
      { name: "JSON Serialization", detail: "Modern external API data exchange" },
      { name: "External Gateways", detail: "Connecting on-premise ERP to cloud applications" },
      { name: "Authentication", detail: "OAuth 2.0 flows, API keys, basic authentication" },
      { name: "Webhook Handlers", detail: "Asynchronous event consumption and verification" },
    ],
  },
  {
    id: "engineering",
    category: "ENGINEERING",
    code: "CAP-03",
    description: "Core programming languages, algorithmic design, and full-stack software practices",
    capabilities: [
      { name: "Python 3.11", detail: "Timeseries analysis, backend scripting, quantitative engines", highlight: true },
      { name: "JavaScript / TypeScript", detail: "Modern DOM manipulation, frontend applications" },
      { name: "Git & Version Control", detail: "Feature branching, conflict resolution, clean commit hygiene", highlight: true },
      { name: "Defensive Coding", detail: "State validation, boundary checks, zero-assumption design" },
      { name: "Debugging & Forensics", detail: "Log inspection, race-condition tracing, performance profiling" },
      { name: "Architecture", detail: "Decoupled tier separation, modular plugins, event buses", highlight: true },
    ],
  },
  {
    id: "tools",
    category: "TOOLS & DEVOPS",
    code: "CAP-04",
    description: "Deployment pipelines, developer environments, and monitoring tooling",
    capabilities: [
      { name: "GitHub", detail: "Source control, code reviews, collaboration" },
      { name: "Gearset & FlexDeploy", detail: "Enterprise Salesforce CI/CD and deployment tracking", highlight: true },
      { name: "IntelliJ IDEA & VS Code", detail: "Primary IDEs with Salesforce extensions and Python virtualenvs" },
      { name: "Azure Cloud", detail: "L2/L3 cloud support, virtual machines, networking" },
      { name: "Postman", detail: "API design, contract validation, automated endpoint testing" },
      { name: "Linux & Bash", detail: "Shell scripting, server management, environment configuration" },
    ],
  },
  {
    id: "systems",
    category: "SYSTEMS",
    code: "CAP-05",
    description: "Data pipelines, runtime caching, persistence engines, and operational observability",
    capabilities: [
      { name: "Data Pipelines", detail: "Streaming market kline ingestion, resampling, calculations", highlight: true },
      { name: "Dual-Cache Architecture", detail: "Separation of high-frequency scalar lookups from disk writes", highlight: true },
      { name: "Persistence Engines", detail: "SQLite WAL mode, PostgreSQL data warehouses, Supabase sync" },
      { name: "Parity Validation", detail: "Comparing backtest models against live tick feeds" },
      { name: "Telemetry & Observability", detail: "Server-Sent Events (SSE), Flask dashboards, Telegram alerting" },
      { name: "Resilience Patterns", detail: "Circuit breakers, exponential backoff, automated reconnection loops" },
    ],
  },
];

export const educationData: EducationData = {
  institution: "Government College of Engineering, Raipur",
  degree: "Bachelor of Engineering (B.E.)",
  field: "Electronics & Telecommunications Engineering",
  period: "2015 - 2019",
  cgpa: "7.62 CGPA",
  achievements: [
    "Letter of Appreciation for Videography at Aavesh Tech Fest",
    "Letter of Appreciation for Leading Sports Management at Aayam Cultural Fest",
    "Letter of Appreciation for Leading the Organizing Team for First-Ever GEC Alumni Meet",
  ],
  activities: [
    "Active participation in campus tech fests and cultural coordination",
    "Led student volunteer teams, developing early operational and leadership skills",
    "Built self-directed learning discipline that led to exploring software, e-commerce, and Python",
  ],
};

export const vocationalTrainings: VocationalTrainingItem[] = [
  {
    id: "technoscripts-iot",
    title: "Certified IoT Professional",
    provider: "TechnoScripts, Pune",
    location: "Pune, India",
    period: "July 2018 - August 2018",
    programType: "1-Month Intensive Internship Training",
    rating: "Rated 'Excellent'",
    certification: "ISO 9001:2015 CERTIFIED",
    summary: "Selected through a competitive internship process to work under senior engineers in the Embedded Development Department on IoT architecture and microcontrollers.",
    keyLearnings: [
      "Embedded systems architecture and microcontroller programming",
      "Sensor integration and automated data acquisition",
      "IoT communication protocols including MQTT, HTTP, and WebSockets",
      "Received Certificate of Completion rated 'Excellent' for core subject understanding",
    ],
    skills: [
      "Internet of Things (IoT)",
      "Embedded Systems",
      "Microcontrollers",
      "Sensor Integration",
      "MQTT",
      "Communication Protocols",
      "Embedded C",
      "Arduino & Raspberry Pi",
    ],
  },
  {
    id: "success-gate-vlsi",
    title: "Vocational Training: VLSI Design (VHDL)",
    provider: "Success Gate",
    period: "May 2017 - July 2017",
    programType: "45-Day Intensive Program",
    certification: "ISO 9001:2008 CERTIFIED",
    summary: "Intensive training program focused on digital logic design, state machine simulation, and hardware verification using VHDL.",
    keyLearnings: [
      "Designed and simulated digital logic circuits using VHDL",
      "Built functional models for real-world systems including elevator controllers and traffic light logic",
      "Hands-on hardware simulation and digital verification",
    ],
    skills: ["VHDL", "VLSI Design", "Digital Logic", "Circuit Simulation"],
  },
];

export const verifiedCredentials: CredentialItem[] = [
  {
    id: "sf-admin",
    title: "Salesforce Certified Administrator",
    issuer: "Salesforce",
    status: "CERTIFIED",
  },
  {
    id: "sf-ba",
    title: "Salesforce Certified Business Analyst",
    issuer: "Salesforce",
    status: "CERTIFIED",
  },
  {
    id: "sf-pd1",
    title: "Salesforce Platform Developer I (PD1)",
    issuer: "Salesforce",
    status: "IN PROGRESS",
  },
  {
    id: "trailhead-ranger",
    title: "Trailhead Ranger",
    issuer: "Salesforce Trailhead",
    status: "CERTIFIED",
  },
];
