export interface TCSMetric {
  id: string;
  value: string;
  label: string;
  context: string;
  story: string;
  color: string;
}

export interface TCSCaseStudyData {
  company: string;
  companyFull: string;
  roles: { title: string; period: string; focus: string }[];
  account: string;
  accountRole: string;
  accountPeriod: string;
  accountRegion: string;
  context: string;
  clientEnvironment: string;
  whatIBuilt: string[];
  whatBroke: string;
  howISolvedIt: string;
  outcomes: { label: string; detail: string }[];
  whatILearned: string;
  technicalArtifacts: string[];
}

export interface StoryChapter {
  id: string;
  year: string;
  shortLabel: string;
  category: string;
  title: string;
  lede: string;
  story: string[];
  learning: string;
  artifactTitle?: string;
  artifactDetails?: string[];
  tag?: string;
}

export const tcsMetrics: TCSMetric[] = [
  {
    id: "01",
    value: "+80%",
    label: "DATA PROCESSING EFFICIENCY",
    context: "Opportunity-triggered REST API integration",
    story: "Built a REST API integration triggered on Opportunity records to transmit XML metadata to a manufacturing unit system in real time. This replaced manual batch uploads and cut transmission delay by 80%.",
    color: "var(--accent-primary)",
  },
  {
    id: "02",
    value: "+60%",
    label: "DATA ACCURACY",
    context: "Trigger-driven Visualforce regional views",
    story: "Constructed reporting views with Apex controllers that grouped customer accounts by region and pending balances as orders progressed, cutting out reporting discrepancies.",
    color: "var(--accent-blue)",
  },
  {
    id: "03",
    value: "-30%",
    label: "SYSTEM ERRORS",
    context: "Automated scheduled Apex maintenance",
    story: "Wrote scheduled Batch Apex jobs to scan data daily, validate key record relationships, and clean orphaned records during low-traffic windows.",
    color: "var(--accent-yellow)",
  },
  {
    id: "04",
    value: "<1 DAY",
    label: "INCIDENT RECOVERY",
    context: "Cross-platform production outage resolution",
    story: "Led resolution of a priority incident spanning three platform teams. Traced the failure to payload mismatches between Salesforce and an external gateway, deployed a fix, and restored full operations within 24 hours.",
    color: "var(--accent-primary)",
  },
];

export const tcsCaseStudy: TCSCaseStudyData = {
  company: "Tata Consultancy Services Limited",
  companyFull: "Tata Consultancy Services Limited (TCS)",
  roles: [
    {
      title: "Assistant System Engineer",
      period: "January 2020 – December 2021",
      focus: "Salesforce development across Sales Cloud, Service Cloud, and Azure cloud support",
    },
    {
      title: "System Engineer",
      period: "January 2022 – December 2022",
      focus: "Avery Dennison account handling regional enhancements for European and Latin American business units",
    },
  ],
  account: "Avery Dennison Account",
  accountRole: "Salesforce Developer",
  accountPeriod: "January 2022 – December 2022",
  accountRegion: "European & Latin American Business Units",
  context: "Tata Consultancy Services was my entry into large enterprise software. I worked on live Salesforce instances supporting international operations, moving from general platform support to direct developer responsibility on major manufacturing accounts.",
  clientEnvironment: "The client ran international manufacturing and labeling operations. Their workflow relied on Salesforce as the central system of record for customer quotes, which had to sync with factory-floor systems across multiple timezones and regulatory environments.",
  whatIBuilt: [
    "Opportunity-triggered REST API integration transmitting XML payloads directly to the manufacturing line system",
    "Asynchronous Batch Apex jobs to roll up complex Quote-to-Account fields without hitting Salesforce governor limits",
    "Scheduled Apex classes for automated nightly data validation, error flagging, and orphan record cleanup",
    "Custom Visualforce pages and controller extensions for regional managers to track pending account approvals",
    "Trigger frameworks enforcing validation logic across order status updates and regional tax assignments",
  ],
  whatBroke: "During a major enhancement rollout, a sudden change in regional tax rules caused XML generation to fail on specific multi-currency Opportunity records. Downstream manufacturing queues stalled, creating a critical cross-team escalation between sales operations and warehouse logistics.",
  howISolvedIt: "I coordinated across three technical teams to isolate the exact currency rounding edge case in the XML builder. I rewrote the parsing logic in Apex with fallback defaults and added unit tests covering multi-currency edge cases before pushing the emergency deployment through UAT.",
  outcomes: [
    { label: "Throughput", detail: "+80% data processing efficiency through automated XML transmission" },
    { label: "Data Quality", detail: "+60% data accuracy across regional account reporting" },
    { label: "Platform Health", detail: "-30% reduction in automated system errors via nightly cleanup" },
    { label: "Incident Resolution", detail: "Critical production bug resolved and deployed in under 24 hours" },
    { label: "Support Reliability", detail: "98% SLA compliance on 50+ weekly tickets across Azure L2/L3 support" },
    { label: "Release Quality", detail: "-25% reduction in post-deployment bugs through structured UAT testing" },
  ],
  whatILearned: "Writing code in an enterprise environment is rarely about writing something fancy. The real work is handling edge cases, writing defensive queries that never break under volume, and understanding what happens to other departments when your integration drops an unexpected value.",
  technicalArtifacts: [
    "Apex Classes & Triggers",
    "Batch & Scheduled Apex",
    "REST API / XML Payloads",
    "SOQL / SOSL Query Tuning",
    "Visualforce & Controllers",
    "FlexDeploy & Gearset CI/CD",
  ],
};

export const storyChapters: StoryChapter[] = [
  {
    id: "education",
    year: "2015–19",
    shortLabel: "EDUCATION",
    category: "FOUNDATION",
    title: "Government College of Engineering, Raipur",
    lede: "Four years studying Electronics & Telecommunications Engineering.",
    story: [
      "I completed my Bachelor of Engineering in Electronics and Telecommunications at Government College of Engineering, Raipur. My coursework focused on signals, circuits, microprocessors, and digital logic.",
      "The degree gave me a solid technical grounding. Working with hardware constraints and low-level communication protocols taught me how machines actually execute instructions before I shifted my attention toward modern software systems.",
    ],
    learning: "Engineering taught me to respect hardware constraints, structured logic, and how low-level systems function under real load.",
    tag: "B.E. ET&T · CGPA 7.62",
    artifactTitle: "ACADEMIC RECORD",
    artifactDetails: [
      "Institution: GEC Raipur",
      "Degree: Bachelor of Engineering",
      "Discipline: Electronics & Telecommunications",
      "Graduated: 2019",
    ],
  },
  {
    id: "tulipwell",
    year: "2018",
    shortLabel: "COMMERCE",
    category: "INDEPENDENT EXPERIMENT",
    title: "Tulipwell: International E-Commerce",
    lede: "Selling physical goods to customers in Europe and North America.",
    story: [
      "While in college in 2018, I started a dropshipping business called Tulipwell. I set up a digital storefront, ran paid customer acquisition campaigns, and fulfilled customer orders directly to buyers in European and North American markets.",
      "This was my earliest experience running an operation where every part mattered. I had to understand conversion rates, international shipping delays, currency conversion costs, customer service emails, and payment gateway chargebacks.",
    ],
    learning: "Software does not exist in a vacuum. You learn how a digital system behaves when you are directly responsible for checkout drop-offs, shipping delays, and the unit economics behind every transaction.",
    tag: "E-COMMERCE · PAYMENTS · LOGISTICS",
    artifactTitle: "OPERATIONAL STACK",
    artifactDetails: [
      "Market: EU & North America",
      "Core: Cross-border fulfillment",
      "Key Lesson: Unit economics and checkout friction",
    ],
  },
  {
    id: "oldtownfunk",
    year: "2019",
    shortLabel: "COMMERCE",
    category: "LOCAL MARKET EXPERIMENT",
    title: "OldtownFunk: Print-on-Demand Clothing",
    lede: "Testing consumer behavior in the Indian apparel market.",
    story: [
      "In 2019, I pivoted away from dropshipping to experiment with a print-on-demand clothing label for Indian consumers under the name OldtownFunk.",
      "Selling in India revealed a completely different set of economic realities. Indian consumers are discerning about price and wary of upfront digital payments. Margins on printed apparel were thin, and return rates on Cash on Delivery orders created unpredictable cash flow.",
    ],
    learning: "Selling internationally versus selling domestically requires completely different playbooks. The project was an education in price sensitivity, consumer skepticism, and the brutal reality of thin-margin inventory businesses.",
    tag: "APPAREL · MARGIN DYNAMICS · D2C",
    artifactTitle: "MARKET LESSONS",
    artifactDetails: [
      "Market: India Domestic",
      "Focus: Apparel Print-on-Demand",
      "Key Finding: COD risk and price sensitivity",
    ],
  },
  {
    id: "tcs-early",
    year: "2020–21",
    shortLabel: "ENTERPRISE",
    category: "ENTERPRISE SOFTWARE",
    title: "Tata Consultancy Services: Assistant System Engineer",
    lede: "Stepping inside enterprise Salesforce implementations.",
    story: [
      "I joined Tata Consultancy Services Limited in January 2020 as an Assistant System Engineer. This was my introduction to large-scale enterprise technology.",
      "I worked as a Salesforce Developer on Sales and Service Cloud projects. I wrote Apex triggers, developed asynchronous batch jobs to handle data updates, customized Visualforce pages, and supported enterprise Azure infrastructure.",
    ],
    learning: "Writing production code inside a global IT services firm taught me the discipline of code reviews, automated test classes, deployment pipelines, and meeting strict SLAs.",
    tag: "SALESFORCE · APEX · ENTERPRISE",
    artifactTitle: "TECHNICAL SCOPE",
    artifactDetails: [
      "Company: Tata Consultancy Services Limited",
      "Role: Assistant System Engineer",
      "Stack: Apex, SOQL, Visualforce, Azure L2/L3",
    ],
  },
  {
    id: "tcs-system-eng",
    year: "2022",
    shortLabel: "SYSTEM ENGINEER",
    category: "ENTERPRISE ARCHITECTURE",
    title: "Avery Dennison Account: System Engineer",
    lede: "Handling regional enhancements for European and Latin American units.",
    story: [
      "In January 2022, I was promoted to System Engineer and joined the Avery Dennison account team. My primary role was building and deploying enhancements for their European and Latin American business units.",
      "A key project was designing an Opportunity-triggered REST API integration that generated XML metadata and transmitted it directly to a manufacturing facility system. Automating this eliminated manual data entry errors and increased data throughput by 80%.",
    ],
    learning: "Integrations break at boundaries. Building reliable connections between a modern CRM and legacy manufacturing software requires strict data contracts, defensive parsing, and exhaustive testing.",
    tag: "REST APIS · XML · MANUFACTURING INTEGRATION",
    artifactTitle: "AVERY DENNISON SCOPE",
    artifactDetails: [
      "Role: System Engineer / Salesforce Developer",
      "Regions: Europe & Latin America",
      "Key Build: Opportunity REST integration to factory line",
    ],
  },
  {
    id: "upsc",
    year: "2023–24",
    shortLabel: "EXAMINATION",
    category: "INTENSIVE STUDY",
    title: "Union Public Service Commission Civil Services Examination",
    lede: "Two intensive attempts at India's civil services examination.",
    story: [
      "I stepped away from private software engineering to prepare full-time for the Union Public Service Commission Civil Services Examination. I attempted the examination twice and was unable to clear it.",
      "I do not view this as a tragic setback or a heroic journey. It was a clear, calculated attempt at a national examination with roughly 0.1% final selection rates. The experience required long stretches of solitary discipline, structured study schedules, and in-depth analysis of Indian polity, economics, administrative history, and international relations.",
    ],
    learning: "Long-term preparation under high uncertainty builds a different kind of mental endurance. It taught me how large institutions govern, how public policy impacts industry, and how to analyze complex qualitative information under tight time limits.",
    tag: "POLICY · MACRO-SYSTEMS · DISCIPLINE",
    artifactTitle: "EXAMINATION CONTEXT",
    artifactDetails: [
      "Focus: Indian Polity, Governance, Economics",
      "Structure: Structured analytical writing & CSAT",
      "Outcome: Two attempts completed, exam not cleared",
    ],
  },
  {
    id: "pet-research",
    year: "2024",
    shortLabel: "INDUSTRIAL RESEARCH",
    category: "FEASIBILITY STUDY",
    title: "PET Bottle & Plastics Manufacturing Research",
    lede: "Deep feasibility study on setting up a physical manufacturing plant.",
    story: [
      "Towards the end of 2024, I spent several months researching the viability of setting up an industrial manufacturing plant for PET bottles and plastics.",
      "I evaluated raw material costs, electricity tariffs, machinery procurement, labor requirements, environmental permits, and working capital cycles. After completing the detailed financial modeling, I decided not to proceed. The combination of low profit margins, massive volume requirements, heavy capital lock-in, and bureaucratic approvals made the business profile unattractive for me at that stage.",
    ],
    learning: "Knowing when not to build something is as important as knowing how to build it. Walking away from a project after rigorous research saved time and capital that would have been trapped in an unviable operation.",
    tag: "SUPPLY CHAIN · CAPITAL MODELING · DUE DILIGENCE",
    artifactTitle: "RESEARCH SCOPE",
    artifactDetails: [
      "Sector: PET Plastics & Blow Molding",
      "Analysis: Power tariffs, resin costs, labor overhead",
      "Decision: Dropped based on margin-to-capital ratio",
    ],
  },
  {
    id: "suto-cafe",
    year: "2025",
    shortLabel: "HOSPITALITY",
    category: "PHYSICAL OPERATIONS",
    title: "SUTO Cafe: Retail Operations in Raipur",
    lede: "Running a physical coffee shop outlet in partnership with SUTO Cafe.",
    story: [
      "In 2025, I opened a physical coffee shop outlet in Raipur in partnership with SUTO Cafe. I managed day-to-day retail operations, staff hiring, shift training, raw material inventory, and customer retention.",
      "Running a physical shop was entirely different from software. When a line of customers forms or milk supply is delayed, you cannot push a hotfix to production. You have to handle people directly, motivate young staff, manage wastage, and watch cash flow on a daily sheet.",
    ],
    learning: "Managing real people in physical environments teaches patience and operational empathy. You understand customer psychology, price sensitivity, and how operational friction affects frontline workers.",
    tag: "PEOPLE MANAGEMENT · INVENTORY · RETAIL",
    artifactTitle: "STORE OPERATIONS",
    artifactDetails: [
      "Location: Raipur, India",
      "Brand: SUTO Cafe Partner Outlet",
      "Responsibilities: Hiring, training, supply chain, daily P&L",
    ],
  },
  {
    id: "onyxflow-story",
    year: "2025–",
    shortLabel: "SYSTEM BUILDING",
    category: "CORE TECHNICAL BUILD",
    title: "OnyxFlow: Algorithmic Futures Trading Engine",
    lede: "Architecting a modular, runtime-first crypto futures trading platform.",
    story: [
      "During this period, I began architecting OnyxFlow, an independent algorithmic trading system for crypto perpetual futures. I wanted to design a software system from the ground up where precision, data integrity, and error recovery had direct financial consequences.",
      "I utilized modern AI coding tools to accelerate initial boilerplate and implementation tasks. However, I took full personal responsibility for the system architecture, YAML strategy engine design, dual-cache indicators pipeline, Git version control, exchange API safety, and data validation.",
    ],
    learning: "AI tools can write functions, but the engineer must decide the architecture, verify data integrity, test edge cases, and ensure the system behaves safely when network connections drop.",
    tag: "PYTHON · ALGORITHMIC TRADING · EVENT-DRIVEN",
    artifactTitle: "ONYXFLOW ARCHITECTURE",
    artifactDetails: [
      "Language: Python 3.11 with Flask telemetry",
      "Execution: Closed-candle evaluation on 30m timeframes",
      "Persistence: SQLite WAL + Postgres analytics",
    ],
  },
];
