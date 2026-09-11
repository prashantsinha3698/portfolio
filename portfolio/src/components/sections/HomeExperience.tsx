"use client";

import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";
import TechTag from "@/components/ui/TechTag";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export default function HomeExperience() {
  return (
    <section
      id="experience"
      aria-label="Professional Experience"
      style={{
        padding: "4.5rem 0 5rem",
        borderBottom: "1px solid var(--border-primary)",
        background: "var(--bg-surface-subtle)",
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
            <SectionLabel number="02" label="EXPERIENCE" />
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
              Work Experience
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
            Practical software development and support on enterprise Salesforce systems at Tata Consultancy Services.
          </p>
        </div>

        {/* Employment Block */}
        <div
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border-primary)",
            boxShadow: "var(--shadow-tactile)",
            marginBottom: "2rem",
          }}
        >
          {/* Header Bar */}
          <div
            style={{
              padding: "1.75rem 2rem",
              borderBottom: "1px solid var(--border-subtle)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <div>
              <div
                className="font-mono"
                style={{
                  fontSize: "0.75rem",
                  color: "var(--accent-primary)",
                  fontWeight: 600,
                  letterSpacing: "0.06em",
                  marginBottom: "0.35rem",
                }}
              >
                JANUARY 2020 - DECEMBER 2022
              </div>

              <h3
                className="font-display"
                style={{
                  fontSize: "clamp(1.35rem, 3vw, 1.75rem)",
                  fontWeight: 700,
                  color: "var(--ink-primary)",
                  letterSpacing: "-0.02em",
                  marginBottom: "0.35rem",
                }}
              >
                Tata Consultancy Services
              </h3>

              <div
                className="font-mono"
                style={{
                  fontSize: "0.86rem",
                  color: "var(--ink-secondary)",
                  fontWeight: 500,
                }}
              >
                Salesforce Developer / System Engineer
              </div>
            </div>

            <div
              className="font-mono"
              style={{
                fontSize: "0.74rem",
                color: "var(--ink-muted)",
                background: "var(--bg-surface-subtle)",
                border: "1px solid var(--border-subtle)",
                padding: "0.35rem 0.75rem",
              }}
            >
              FULL TIME EMPLOYMENT
            </div>
          </div>

          {/* Body Content */}
          <div style={{ padding: "2rem" }}>
            <p
              style={{
                fontFamily: "var(--font-ibm-plex-sans), sans-serif",
                fontSize: "0.95rem",
                color: "var(--ink-secondary)",
                lineHeight: 1.65,
                maxWidth: "760px",
                marginBottom: "1.75rem",
              }}
            >
              Working as a Salesforce developer supporting enterprise business units. Responsibilities include building custom automation, maintaining XML data exchange pipelines, debugging production issues, and deploying tested changes to client environments.
            </p>

            {/* Practical Focus Areas */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                gap: "1.25rem",
                marginBottom: "2rem",
              }}
            >
              {[
                {
                  title: "Apex Automation",
                  detail: "Writing triggers, batch jobs, and scheduled classes with unit tests and governor limit checks.",
                },
                {
                  title: "XML and Integrations",
                  detail: "Managing XML generation and data exchange between Salesforce and external business applications.",
                },
                {
                  title: "Bug Fixing & Support",
                  detail: "Investigating user reported defects, identifying root causes, and deploying verified code fixes.",
                },
                {
                  title: "Data and Admin Configuration",
                  detail: "Custom fields, validation rules, Flow updates, and data cleanups using SOQL.",
                },
              ].map((area, idx) => (
                <div
                  key={idx}
                  style={{
                    border: "1px solid var(--border-subtle)",
                    background: "var(--bg-surface-subtle)",
                    padding: "1.25rem",
                  }}
                >
                  <div style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "var(--ink-primary)", marginBottom: "0.35rem" }}>
                    {area.title}
                  </div>
                  <div style={{ fontFamily: "var(--font-ibm-plex-sans), sans-serif", fontSize: "0.84rem", color: "var(--ink-secondary)", lineHeight: 1.5 }}>
                    {area.detail}
                  </div>
                </div>
              ))}
            </div>

            {/* Technologies genuinely used */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", alignItems: "center" }}>
              <span className="font-mono" style={{ fontSize: "0.75rem", color: "var(--ink-muted)", marginRight: "0.5rem" }}>
                TOOLS USED:
              </span>
              <TechTag label="Apex" />
              <TechTag label="SOQL" />
              <TechTag label="Salesforce Flow" />
              <TechTag label="REST APIs" />
              <TechTag label="XML" />
              <TechTag label="Git" />
              <TechTag label="Developer Console" />
            </div>
          </div>
        </div>

        {/* Section Footer Link */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Link href="/experience" className="btn-tactile-secondary" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
            <span>VIEW FULL WORK EXPERIENCE</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
