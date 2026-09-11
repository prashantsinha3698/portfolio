import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import SectionLabel from "@/components/ui/SectionLabel";
import TechTag from "@/components/ui/TechTag";
import { ArrowRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Experience",
  description: "Professional Salesforce development, automation, and enterprise integration experience at Tata Consultancy Services.",
};

export default function ExperiencePage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg-canvas)", color: "var(--ink-primary)" }}>
      <Navigation />

      <main style={{ flex: 1, width: "100%", maxWidth: "100%", padding: "3rem clamp(1.25rem, 4vw, 4.5rem) 6rem" }}>
        <PageHeader
          sectionNumber="02"
          category="PROFESSIONAL EMPLOYMENT"
          title="Experience"
          description="A record of my professional work, responsibilities, and technologies genuinely used in client production systems."
        />

        {/* Editorial Ledger Container */}
        <div style={{ display: "flex", flexDirection: "column", gap: "3.5rem" }}>
          
          {/* Role 01: System Engineer */}
          <section
            className="experience-section"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border-primary)",
              boxShadow: "var(--shadow-tactile)",
              padding: "2.5rem 2.25rem",
              boxSizing: "border-box",
              width: "100%",
            }}
          >
            <div className="experience-ledger-grid" style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "2.5rem", alignItems: "start" }}>
              {/* Left Column: Stable Year & Organization */}
              <div style={{ borderRight: "1px solid var(--border-subtle)", paddingRight: "1.5rem" }} className="experience-year-col">
                <SectionLabel number="01" label="ROLE" />
                <div
                  className="font-mono"
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    color: "var(--accent-primary)",
                    marginTop: "0.75rem",
                    marginBottom: "0.35rem",
                  }}
                >
                  Jan 2022 - Dec 2022
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.05rem", color: "var(--ink-primary)" }}>
                  Tata Consultancy Services
                </div>
                <div className="font-mono" style={{ fontSize: "0.76rem", color: "var(--ink-muted)", marginTop: "0.25rem" }}>
                  Avery Dennison Account
                </div>
                <div className="font-mono" style={{ fontSize: "0.72rem", color: "var(--ink-muted)", marginTop: "0.15rem" }}>
                  Europe and Latin America
                </div>
              </div>

              {/* Right Column: Role Title, Context, Work, Tech */}
              <div>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, color: "var(--ink-primary)", letterSpacing: "-0.02em", marginBottom: "0.25rem" }}>
                  System Engineer / Salesforce Developer
                </h2>
                <div className="font-mono" style={{ fontSize: "0.82rem", color: "var(--accent-primary)", fontWeight: 600, marginBottom: "1.25rem" }}>
                  Enterprise Enhancements and Manufacturing Integration
                </div>

                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", color: "var(--ink-secondary)", lineHeight: 1.7, marginBottom: "1.75rem" }}>
                  Promoted to System Engineer on the Avery Dennison global account, handling business enhancements across European and Latin American business units. Designed and maintained programmatic integrations connecting Salesforce with factory floor manufacturing queues.
                </p>

                {/* Key Deliverables */}
                <div style={{ marginBottom: "1.75rem" }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 700, color: "var(--ink-primary)", marginBottom: "0.75rem" }}>
                    Selected Work and Responsibilities
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {[
                      {
                        title: "Opportunity to Manufacturing XML Pipeline",
                        desc: "Engineered an automated REST integration triggered on closed-won Opportunity records that assembled XML metadata and transmitted it directly to legacy manufacturing line servers, eliminating manual data entry delays.",
                      },
                      {
                        title: "Asynchronous Batch Rollups",
                        desc: "Wrote Batch Apex classes to recalculate complex Quote-to-Account financial rollups across thousands of records without hitting governor limits.",
                      },
                      {
                        title: "Scheduled Health and Data Cleansing",
                        desc: "Scheduled nightly Apex jobs to scan data hygiene, identify orphaned records, and flag status discrepancies during low-traffic windows.",
                      },
                      {
                        title: "Production Incident Recovery",
                        desc: "Isolated and resolved an emergency XML currency rounding failure affecting multi-currency Opportunity queues, restoring pipeline throughput within 24 hours.",
                      },
                    ].map((item, i) => (
                      <div key={i} style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface-subtle)", padding: "1rem 1.25rem" }}>
                        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.95rem", color: "var(--ink-primary)", marginBottom: "0.25rem" }}>
                          {item.title}
                        </div>
                        <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.55 }}>
                          {item.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies Genuinely Used */}
                <div>
                  <div className="font-mono" style={{ fontSize: "0.72rem", color: "var(--ink-muted)", marginBottom: "0.45rem", fontWeight: 700 }}>
                    TECHNOLOGIES GENUINELY USED IN THIS ROLE:
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {["Apex Triggers", "Batch Apex", "Scheduled Apex", "SOQL / SOSL", "REST APIs", "XML Payloads", "FlexDeploy", "Gearset CI/CD"].map((t) => (
                      <TechTag key={t} label={t} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Role 02: Assistant System Engineer */}
          <section
            className="experience-section"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border-primary)",
              boxShadow: "var(--shadow-tactile)",
              padding: "2.5rem 2.25rem",
              boxSizing: "border-box",
              width: "100%",
            }}
          >
            <div className="experience-ledger-grid" style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: "2.5rem", alignItems: "start" }}>
              {/* Left Column: Stable Year & Organization */}
              <div style={{ borderRight: "1px solid var(--border-subtle)", paddingRight: "1.5rem" }} className="experience-year-col">
                <SectionLabel number="02" label="ROLE" />
                <div
                  className="font-mono"
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 700,
                    color: "var(--accent-primary)",
                    marginTop: "0.75rem",
                    marginBottom: "0.35rem",
                  }}
                >
                  Jan 2020 - Dec 2021
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "1.05rem", color: "var(--ink-primary)" }}>
                  Tata Consultancy Services
                </div>
                <div className="font-mono" style={{ fontSize: "0.76rem", color: "var(--ink-muted)", marginTop: "0.25rem" }}>
                  Sales and Service Cloud
                </div>
                <div className="font-mono" style={{ fontSize: "0.72rem", color: "var(--ink-muted)", marginTop: "0.15rem" }}>
                  Global Enterprise Client
                </div>
              </div>

              {/* Right Column: Role Title, Context, Work, Tech */}
              <div>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", fontWeight: 700, color: "var(--ink-primary)", letterSpacing: "-0.02em", marginBottom: "0.25rem" }}>
                  Assistant System Engineer / Salesforce Developer
                </h2>
                <div className="font-mono" style={{ fontSize: "0.82rem", color: "var(--accent-primary)", fontWeight: 600, marginBottom: "1.25rem" }}>
                  Salesforce Development and Azure Cloud Support
                </div>

                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", color: "var(--ink-secondary)", lineHeight: 1.7, marginBottom: "1.75rem" }}>
                  Joined Tata Consultancy Services in January 2020. Developed foundational enterprise Salesforce experience across Sales Cloud and Service Cloud instances, supporting global users and resolving defect tickets under strict SLAs.
                </p>

                {/* Key Deliverables */}
                <div style={{ marginBottom: "1.75rem" }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem", fontWeight: 700, color: "var(--ink-primary)", marginBottom: "0.75rem" }}>
                    Selected Work and Responsibilities
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {[
                      {
                        title: "Apex Controller and Trigger Maintenance",
                        desc: "Wrote and maintained Apex classes and trigger logic to enforce field validation rules and business approval processes.",
                      },
                      {
                        title: "Custom Visualforce Pages",
                        desc: "Built custom Visualforce pages and controller extensions for regional sales leads to view pending customer balance reports.",
                      },
                      {
                        title: "Azure Cloud L2/L3 Support",
                        desc: "Maintained 98% SLA compliance resolving production support tickets spanning cloud infrastructure, user permissions, and data feeds.",
                      },
                      {
                        title: "UAT and Release Deployment",
                        desc: "Prepared test scripts, validated deployment packages in sandbox environments, and executed planned production change sets.",
                      },
                    ].map((item, i) => (
                      <div key={i} style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface-subtle)", padding: "1rem 1.25rem", boxSizing: "border-box" }}>
                        <div style={{ fontFamily: "var(--font-display)", fontWeight: 700, fontSize: "0.95rem", color: "var(--ink-primary)", marginBottom: "0.25rem" }}>
                          {item.title}
                        </div>
                        <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.55 }}>
                          {item.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Technologies Genuinely Used */}
                <div>
                  <div className="font-mono" style={{ fontSize: "0.72rem", color: "var(--ink-muted)", marginBottom: "0.45rem", fontWeight: 700 }}>
                    TECHNOLOGIES GENUINELY USED IN THIS ROLE:
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {["Apex", "SOQL", "Visualforce", "Sales Cloud", "Service Cloud", "Azure Support", "Git"].map((t) => (
                      <TechTag key={t} label={t} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Cross-Link to Projects & Skills */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "3.5rem" }}>
          <Link href="/projects" className="btn-tactile-primary">
            VIEW PERSONAL PROJECTS
          </Link>
          <Link href="/skills" className="btn-tactile-secondary">
            VIEW SKILLS MATRIX
          </Link>
        </div>
      </main>

      <Footer />

      <style>{`
        @media (max-width: 768px) {
          main {
            padding: 2rem 0.85rem 4rem !important;
          }
          .experience-section {
            padding: 1.35rem 0.95rem !important;
          }
          .experience-ledger-grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          .experience-year-col {
            border-right: none !important;
            border-bottom: 1px solid var(--border-subtle) !important;
            padding-right: 0 !important;
            padding-bottom: 1.25rem !important;
          }
        }
      `}</style>
    </div>
  );
}
