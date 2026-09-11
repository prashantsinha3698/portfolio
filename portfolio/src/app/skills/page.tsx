"use client";

import { useState } from "react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import SectionLabel from "@/components/ui/SectionLabel";
import { Award } from "lucide-react";

interface SkillItem {
  name: string;
  detail: string;
  hasDot?: boolean;
}

interface CapabilityGroup {
  id: string;
  code: string;
  title: string;
  category: "SALESFORCE" | "INTEGRATION" | "ENGINEERING" | "TOOLS & DEVOPS" | "SYSTEMS";
  description: string;
  skills: SkillItem[];
}

const CAPABILITIES: CapabilityGroup[] = [
  {
    id: "salesforce",
    code: "CAP-01",
    title: "SALESFORCE",
    category: "SALESFORCE",
    description: "Enterprise CRM development, data modeling, and process automation",
    skills: [
      { name: "Apex Classes", detail: "Controller logic, domain services", hasDot: true },
      { name: "Apex Triggers", detail: "Bulkified trigger handler frameworks", hasDot: true },
      { name: "Batch Apex", detail: "Asynchronous processing over millions of records", hasDot: true },
      { name: "Scheduled Apex", detail: "Automated off-hours database maintenance" },
      { name: "Visualforce", detail: "Custom controllers, page extensions, dynamic tables" },
      { name: "SOQL & SOSL", detail: "Query optimization, selective indexing, relationship queries", hasDot: true },
      { name: "Flow Builder", detail: "Declarative record-triggered and screen flows" },
      { name: "Data Management", detail: "Import wizard, Data Loader, data hygiene validation" },
      { name: "Test Classes", detail: "Governor limit enforcement, positive/negative test coverage" },
      { name: "Security & Sharing", detail: "OWD, role hierarchy, permission sets, profile management" },
    ],
  },
  {
    id: "integration",
    code: "CAP-02",
    title: "INTEGRATION",
    category: "INTEGRATION",
    description: "Connecting Salesforce with enterprise systems, manufacturing plants, and external web APIs",
    skills: [
      { name: "REST APIs", detail: "Custom Apex REST web services and HTTP callouts", hasDot: true },
      { name: "XML Generation & Parsing", detail: "Structured payload interchange for legacy systems", hasDot: true },
      { name: "JSON Serialization", detail: "Modern external API data exchange" },
      { name: "External Gateways", detail: "Connecting on-premise ERP to cloud applications" },
      { name: "Authentication", detail: "OAuth 2.0 flows, API keys, basic authentication" },
      { name: "Webhook Handlers", detail: "Asynchronous event consumption and verification" },
    ],
  },
  {
    id: "engineering",
    code: "CAP-03",
    title: "ENGINEERING",
    category: "ENGINEERING",
    description: "Core programming languages, algorithmic design, and full-stack software practices",
    skills: [
      { name: "Python 3.11", detail: "Timeseries analysis, backend scripting, quantitative engines", hasDot: true },
      { name: "JavaScript", detail: "Modern DOM manipulation, frontend applications" },
      { name: "Git & Version Control", detail: "Feature branching, conflict resolution, clean commit hygiene", hasDot: true },
      { name: "Defensive Coding", detail: "State validation, boundary checks, zero-assumption design" },
      { name: "Debugging & Forensics", detail: "Log inspection, race-condition tracing, performance profiling" },
      { name: "Architecture", detail: "Decoupled tier separation, modular plugins, event buses", hasDot: true },
    ],
  },
  {
    id: "tools",
    code: "CAP-04",
    title: "TOOLS & DEVOPS",
    category: "TOOLS & DEVOPS",
    description: "Deployment pipelines, developer environments, and monitoring tooling",
    skills: [
      { name: "GitHub", detail: "Source control, code reviews, collaboration" },
      { name: "Gearset & FlexDeploy", detail: "Enterprise Salesforce CI/CD and deployment tracking", hasDot: true },
      { name: "IntelliJ IDEA & VS Code", detail: "Primary IDEs with Salesforce extensions and Python virtualenvs" },
      { name: "Azure Cloud", detail: "L2/L3 cloud support, virtual machines, networking" },
      { name: "Postman", detail: "API design, contract validation, automated endpoint testing" },
      { name: "Linux & Bash", detail: "Shell scripting, server management, environment configuration" },
    ],
  },
  {
    id: "systems",
    code: "CAP-05",
    title: "SYSTEMS",
    category: "SYSTEMS",
    description: "Data pipelines, runtime caching, persistence engines, and operational observability",
    skills: [
      { name: "Data Pipelines", detail: "Streaming market kline ingestion, resampling, calculations", hasDot: true },
      { name: "Dual-Cache Architecture", detail: "Separation of high-frequency scalar lookups from disk writes", hasDot: true },
      { name: "Persistence Engines", detail: "SQLite WAL mode, PostgreSQL data warehouses, Supabase sync" },
      { name: "Parity Validation", detail: "Comparing backtest models against live tick feeds" },
      { name: "Telemetry & Observability", detail: "Server-Sent Events (SSE), Flask dashboards, Telegram alerting" },
      { name: "Resilience Patterns", detail: "Circuit breakers, exponential backoff, automated reconnection loops" },
    ],
  },
];

const FILTER_OPTIONS = [
  "ALL CAPABILITIES",
  "SALESFORCE",
  "INTEGRATION",
  "ENGINEERING",
  "TOOLS & DEVOPS",
  "SYSTEMS",
] as const;

type FilterType = typeof FILTER_OPTIONS[number];

export default function SkillsPage() {
  const [activeFilter, setActiveFilter] = useState<FilterType>("ALL CAPABILITIES");

  const filteredCapabilities = activeFilter === "ALL CAPABILITIES"
    ? CAPABILITIES
    : CAPABILITIES.filter((cap) => cap.category === activeFilter);

  return (
    <div style={{ minHeight: "100vh", width: "100%", display: "flex", flexDirection: "column", background: "var(--bg-canvas)", color: "var(--ink-primary)" }}>
      <Navigation />

      <main style={{ flex: 1, width: "100%", maxWidth: "100%", padding: "3rem clamp(1.25rem, 4vw, 4.5rem) 6rem" }}>
        <PageHeader
          sectionNumber="03"
          category="CAPABILITY MATRIX & CREDENTIALS"
          title="Skills & Certifications"
          description="Enterprise Salesforce development, verified industry certifications, Trailhead Ranger platform rank, data integrations, and software engineering capabilities."
        />

        <section id="systems" style={{ padding: "1rem 0 3rem" }}>
          {/* Header & Filter Controls Strip */}
          <div
            style={{
              marginBottom: "2.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: "1.5rem",
            }}
          >
            <div>
              <div className="font-mono" style={{ fontSize: "0.75rem", color: "var(--accent-primary)", fontWeight: 700, letterSpacing: "0.08em", marginBottom: "0.35rem" }}>
                05 // CAPABILITY MATRIX
              </div>
              <h2 className="font-display" style={{ fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)", color: "var(--ink-primary)", letterSpacing: "-0.03em", lineHeight: 1.1, fontWeight: 700 }}>
                Skills & Certifications
              </h2>
            </div>

            {/* Filter Buttons */}
            <div className="font-mono" style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem", fontSize: "0.72rem" }}>
              {FILTER_OPTIONS.map((opt) => {
                const isActive = activeFilter === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => setActiveFilter(opt)}
                    style={{
                      padding: "0.4rem 0.85rem",
                      border: "1px solid var(--border-primary)",
                      background: isActive ? "var(--ink-primary)" : "var(--bg-surface)",
                      color: isActive ? "var(--bg-canvas)" : "var(--ink-secondary)",
                      fontWeight: 700,
                      boxShadow: isActive ? "2px 2px 0 var(--border-primary)" : "none",
                      transition: "all var(--motion-fast)",
                      cursor: "pointer",
                    }}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Salesforce Certifications & Trailhead Platform Rank Showcase (Prominent for Recruiter ease) */}
          {(activeFilter === "ALL CAPABILITIES" || activeFilter === "SALESFORCE") && (
            <div
              className="skills-showcase-box"
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border-primary)",
                boxShadow: "var(--shadow-tactile)",
                marginBottom: "2.5rem",
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  padding: "1rem 1.25rem",
                  borderBottom: "1px solid var(--border-subtle)",
                  background: "var(--bg-surface-subtle)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "1rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span className="font-mono" style={{ fontSize: "0.7rem", padding: "0.2rem 0.45rem", background: "var(--accent-green)", color: "#FFFFFF", fontWeight: 700 }}>
                    VERIFIED
                  </span>
                  <span className="font-display" style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--ink-primary)", letterSpacing: "0.02em" }}>
                    SALESFORCE CERTIFICATIONS & TRAILHEAD RANK
                  </span>
                </div>
                <div className="font-mono" style={{ fontSize: "0.78rem", color: "var(--ink-muted)" }}>
                  Verified Administrator & Business Analyst Credentials + Trailhead Ranger
                </div>
              </div>

              <div style={{ padding: "1.25rem", boxSizing: "border-box" }}>
                <div
                  className="skills-certs-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
                    gap: "1.25rem",
                    marginBottom: "1.25rem",
                    boxSizing: "border-box",
                  }}
                >
                  <div style={{ border: "1px solid var(--border-primary)", background: "var(--bg-surface-subtle)", padding: "1.25rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.35rem" }}>
                      <Award size={17} color="var(--accent-primary)" />
                      <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.02rem", color: "var(--ink-primary)" }}>
                        Salesforce Certified Administrator
                      </span>
                    </div>
                    <div className="font-mono" style={{ fontSize: "0.74rem", color: "var(--accent-green)", fontWeight: 700, marginBottom: "0.35rem" }}>
                      CERTIFIED | CREDENTIAL ID: 22807661
                    </div>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", color: "var(--ink-secondary)", lineHeight: 1.5 }}>
                      Platform configuration, security models, OWD, Flow builder, custom objects, and user administration.
                    </p>
                  </div>

                  <div style={{ border: "1px solid var(--border-primary)", background: "var(--bg-surface-subtle)", padding: "1.25rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.35rem" }}>
                      <Award size={17} color="var(--accent-primary)" />
                      <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.02rem", color: "var(--ink-primary)" }}>
                        Salesforce Certified Business Analyst
                      </span>
                    </div>
                    <div className="font-mono" style={{ fontSize: "0.74rem", color: "var(--accent-green)", fontWeight: 700, marginBottom: "0.35rem" }}>
                      CERTIFIED
                    </div>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", color: "var(--ink-secondary)", lineHeight: 1.5 }}>
                      Enterprise discovery, business process mapping, user stories, acceptance criteria, and UAT execution.
                    </p>
                  </div>

                  <div style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface-subtle)", padding: "1.25rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.35rem" }}>
                      <Award size={17} color="var(--ink-muted)" />
                      <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.02rem", color: "var(--ink-primary)" }}>
                        Platform Developer I (PD1)
                      </span>
                    </div>
                    <div className="font-mono" style={{ fontSize: "0.74rem", color: "var(--accent-yellow)", fontWeight: 700, marginBottom: "0.35rem" }}>
                      IN PROGRESS
                    </div>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", color: "var(--ink-secondary)", lineHeight: 1.5 }}>
                      Apex object-oriented programming, SOQL/SOSL queries, trigger handlers, and governor limit handling.
                    </p>
                  </div>
                </div>

                {/* Trailhead Ranger Badge Bar */}
                <div
                  style={{
                    border: "1px solid var(--border-subtle)",
                    background: "var(--bg-surface)",
                    padding: "1rem 1.25rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "0.75rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <div
                      style={{
                        width: 32,
                        height: 32,
                        background: "var(--accent-yellow)",
                        color: "var(--ink-primary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid var(--border-primary)",
                        fontWeight: 700,
                      }}
                    >
                      <Award size={18} />
                    </div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", flexWrap: "wrap" }}>
                        <span style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.98rem", color: "var(--ink-primary)" }}>
                          Trailhead Ranger
                        </span>
                        <span className="font-mono" style={{ fontSize: "0.68rem", background: "var(--bg-surface-subtle)", border: "1px solid var(--border-subtle)", padding: "0.1rem 0.4rem", fontWeight: 700, color: "var(--accent-primary)" }}>
                          SALESFORCE PLATFORM RANK
                        </span>
                      </div>
                      <div className="font-mono" style={{ fontSize: "0.74rem", color: "var(--ink-muted)", marginTop: "0.1rem" }}>
                        Earned through 100+ hands-on modules, platform trails, and superbadges.
                      </div>
                    </div>
                  </div>

                  <span className="font-mono" style={{ fontSize: "0.74rem", color: "var(--accent-green)", fontWeight: 700 }}>
                    100+ BADGES COMPLETED
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Capability Boxes List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem", width: "100%" }}>
            {filteredCapabilities.map((group) => (
              <div
                key={group.id}
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border-primary)",
                  boxShadow: "var(--shadow-tactile)",
                  width: "100%",
                }}
              >
                {/* Capability Header Strip */}
                <div
                  style={{
                    padding: "1rem 1.5rem",
                    borderBottom: "1px solid var(--border-subtle)",
                    background: "var(--bg-surface-subtle)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "1rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span className="font-mono" style={{ fontSize: "0.7rem", padding: "0.2rem 0.45rem", background: "var(--accent-primary)", color: "#FFFFFF", fontWeight: 700 }}>
                      {group.code}
                    </span>
                    <span className="font-display" style={{ fontSize: "1.15rem", fontWeight: 700, color: "var(--ink-primary)", letterSpacing: "0.02em" }}>
                      {group.title}
                    </span>
                  </div>
                  <div className="font-mono" style={{ fontSize: "0.78rem", color: "var(--ink-muted)" }}>
                    {group.description}
                  </div>
                </div>

                {/* Skills Grid */}
                <div
                  className="skills-caps-grid"
                  style={{
                    padding: "1.5rem",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 250px), 1fr))",
                    gap: "1rem",
                    width: "100%",
                  }}
                >
                  {group.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      style={{
                        padding: "0.85rem 1rem",
                        border: skill.hasDot ? "1px solid var(--border-primary)" : "1px solid var(--border-subtle)",
                        background: skill.hasDot ? "var(--bg-surface-subtle)" : "var(--bg-surface)",
                        boxShadow: skill.hasDot ? "2px 2px 0 var(--border-primary)" : "none",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        transition: "transform var(--motion-fast)",
                      }}
                    >
                      <div className="font-mono" style={{ fontSize: "0.86rem", color: "var(--ink-primary)", fontWeight: 700, marginBottom: "0.3rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span>{skill.name}</span>
                        {skill.hasDot && (
                          <span style={{ width: 6, height: 6, background: "var(--accent-primary)", borderRadius: "50%" }} />
                        )}
                      </div>
                      <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", color: "var(--ink-secondary)", lineHeight: 1.4 }}>
                        {skill.detail}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />

      <style>{`
        @media (max-width: 768px) {
          main {
            padding: 2rem 0.85rem 4rem !important;
          }
          .skills-showcase-box {
            margin-bottom: 1.5rem !important;
          }
          .skills-certs-grid {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
          .skills-caps-grid {
            grid-template-columns: 1fr !important;
            padding: 0.85rem !important;
          }
        }
      `}</style>
    </div>
  );
}
