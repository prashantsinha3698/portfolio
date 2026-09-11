"use client";

import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";
import { ArrowRight } from "lucide-react";

const SKILL_GROUPS = [
  {
    title: "Salesforce",
    summary: "Professional core capability",
    items: ["Apex Classes & Triggers", "Batch & Scheduled Jobs", "SOQL Queries", "Flow Automation", "Platform Administration", "Security & Sharing"],
  },
  {
    title: "Integration & APIs",
    summary: "Data exchange & connectivity",
    items: ["REST API Endpoints", "XML Data Pipelines", "Webhooks", "JSON Serialization", "System Synchronization", "Postman Testing"],
  },
  {
    title: "Development Tools",
    summary: "Workflows & version control",
    items: ["Git Version Control", "GitHub Workflows", "Bash & Terminal", "Docker (Basic)", "CI and CD Pipelines"],
  },
  {
    title: "Programming",
    summary: "Personal projects & scripts",
    items: ["Python (Working knowledge)", "JavaScript (Working knowledge)", "Automation Scripts", "Data Handling"],
  },
];

export default function HomeSkills() {
  return (
    <section
      id="skills"
      aria-label="Skills Overview"
      style={{
        padding: "5rem 0 5.5rem",
        borderBottom: "1px solid var(--border-primary)",
        background: "var(--bg-canvas)",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "1.5rem",
            marginBottom: "3rem",
          }}
        >
          <div>
            <SectionLabel number="03" label="SKILLS" />
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(2rem, 4.5vw, 3rem)",
                color: "var(--ink-primary)",
                letterSpacing: "-0.03em",
                fontWeight: 700,
                lineHeight: 1.1,
              }}
            >
              Practical Skills
            </h2>
          </div>

          <p
            style={{
              fontFamily: "var(--font-ibm-plex-sans), sans-serif",
              fontSize: "0.95rem",
              color: "var(--ink-secondary)",
              maxWidth: "460px",
              lineHeight: 1.6,
            }}
          >
            Technologies I have worked with professionally and tools I use in personal software projects.
          </p>
        </div>

        {/* 4 Groups Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(230px, 1fr))",
            gap: "1.5rem",
            marginBottom: "3rem",
          }}
        >
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.title}
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border-primary)",
                boxShadow: "var(--shadow-tactile-sm)",
                padding: "1.5rem",
              }}
            >
              <div
                className="font-mono"
                style={{
                  fontSize: "0.72rem",
                  color: "var(--accent-primary)",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  marginBottom: "0.25rem",
                }}
              >
                {group.summary.toUpperCase()}
              </div>

              <h3
                className="font-display"
                style={{
                  fontSize: "1.2rem",
                  fontWeight: 700,
                  color: "var(--ink-primary)",
                  letterSpacing: "-0.01em",
                  marginBottom: "1rem",
                }}
              >
                {group.title}
              </h3>

              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.55rem" }}>
                {group.items.map((item) => (
                  <li
                    key={item}
                    style={{
                      fontFamily: "var(--font-ibm-plex-sans), sans-serif",
                      fontSize: "0.86rem",
                      color: "var(--ink-secondary)",
                      display: "flex",
                      alignItems: "center",
                      gap: "0.5rem",
                    }}
                  >
                    <span style={{ width: 4, height: 4, background: "var(--accent-primary)", display: "inline-block", flexShrink: 0 }} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Section Footer Link */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Link href="/skills" className="btn-tactile-secondary" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
            <span>VIEW FULL SKILLS BREAKDOWN</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
