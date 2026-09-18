"use client";

import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import SectionLabel from "@/components/ui/SectionLabel";
import TechTag from "@/components/ui/TechTag";
import { getTranslation, Locale } from "@/locales";

interface ExperienceViewProps {
  locale: Locale;
}

export default function ExperienceView({ locale }: ExperienceViewProps) {
  const t = getTranslation(locale);
  const e = t.experiencePage;
  const isDe = locale === "de";

  const role1Deliverables = isDe
    ? [
        {
          title: "Automatisierte Opportunity-zu-Fertigung XML-Pipeline",
          desc: "Entwicklung einer automatisierten REST-Integration für gewonnene Opportunities (Closed-Won), die XML-Metadaten generierte und direkt an Server der Fertigungslinien übertrug, was manuelle Datenerfassungsverzögerungen vollständig beseitigte.",
        },
        {
          title: "Asynchrone Batch-Rollup-Verarbeitung",
          desc: "Implementierung von Batch-Apex-Klassen zur Neuberechnung komplexer finanzieller Quote-to-Account-Rollups über Zehntausende Datensätze hinweg unter strikter Einhaltung der Salesforce Governor Limits.",
        },
        {
          title: "Geplante Systemgesundheits- und Datenbereinigungsjobs",
          desc: "Konfiguration nächtlicher Scheduled-Apex-Jobs zur Überprüfung der Datenhygiene, Erkennung verwaister Datensätze und Markierung von Statusdiskrepanzen in lastarmen Betriebsfenstern.",
        },
        {
          title: "Behebung kritischer Produktionsvorfälle",
          desc: "Lokalisierung und Behebung eines dringlichen Rundungsfehlers bei Fremdwährungs-XML-Payloads in Multiwährungs-Opportunity-Warteschlangen, wodurch der Pipeline-Durchsatz innerhalb von 24 Stunden wiederhergestellt wurde.",
        },
      ]
    : [
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
      ];

  const role2Deliverables = isDe
    ? [
        {
          title: "Wartung von Apex-Controllern und Trigger-Logik",
          desc: "Erstellung und Pflege von Apex-Klassen sowie Trigger-Logiken zur Durchsetzung von Feldvalidierungsregeln und mehrstufigen betriebswirtschaftlichen Genehmigungsprozessen.",
        },
        {
          title: "Individuelle Visualforce-Seiten",
          desc: "Entwicklung maßgeschneiderter Visualforce-Seiten und Controller-Erweiterungen für regionale Vertriebsleiter zur Einsichtnahme offener Kundensalden-Berichte.",
        },
        {
          title: "Azure Cloud L2/L3-Betriebssupport",
          desc: "Einhaltung einer 98-prozentigen SLA-Quote bei der Lösung von Produktiv-Supporttickets rund um Cloud-Infrastruktur, Benutzerberechtigungen und Datenfeeds.",
        },
        {
          title: "UAT-Koordination und Release-Deployment",
          desc: "Erstellung von Testskripten, Validierung von Deployment-Paketen in Sandbox-Umgebungen und Durchführung geplanter Produktions-Change-Sets.",
        },
      ]
    : [
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
      ];

  const role1Tech = ["Apex Triggers", "Batch Apex", "Scheduled Apex", "SOQL / SOSL", "REST APIs", "XML Payloads", "FlexDeploy", "Gearset CI/CD"];
  const role2Tech = ["Apex", "SOQL", "Visualforce", "Sales Cloud", "Service Cloud", "Azure Support", "Git"];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg-canvas)", color: "var(--ink-primary)" }}>
      <Navigation />

      <main style={{ flex: 1, width: "100%", maxWidth: "100%", padding: "3rem clamp(1.25rem, 4vw, 4.5rem) 6rem" }}>
        <PageHeader
          sectionNumber={e.headerNumber}
          category={e.headerCategory}
          title={e.headerTitle}
          description={e.headerDescription}
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
                <SectionLabel number={e.role1.sectionNumber} label={e.role1.label} />
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
                  {e.role1.period}
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 400, letterSpacing: "0.03em", fontSize: "1.25rem", color: "var(--ink-primary)" }}>
                  {e.role1.company}
                </div>
                <div className="font-mono" style={{ fontSize: "0.76rem", color: "var(--ink-muted)", marginTop: "0.25rem" }}>
                  {e.role1.account}
                </div>
                <div className="font-mono" style={{ fontSize: "0.72rem", color: "var(--ink-muted)", marginTop: "0.15rem" }}>
                  {e.role1.region}
                </div>
              </div>

              {/* Right Column: Role Title, Context, Work, Tech */}
              <div>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 1.85rem)", fontWeight: 400, letterSpacing: "0.02em", color: "var(--ink-primary)", marginBottom: "0.25rem" }}>
                  {e.role1.roleTitle}
                </h2>
                <div className="font-mono" style={{ fontSize: "0.82rem", color: "var(--accent-primary)", fontWeight: 600, marginBottom: "1.25rem" }}>
                  {e.role1.roleContext}
                </div>

                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", color: "var(--ink-secondary)", lineHeight: 1.7, marginBottom: "1.75rem" }}>
                  {e.role1.leadParagraph}
                </p>

                {/* Key Deliverables */}
                <div style={{ marginBottom: "1.75rem" }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 400, letterSpacing: "0.03em", color: "var(--ink-primary)", marginBottom: "0.75rem" }}>
                    {e.role1.deliverablesTitle}
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {role1Deliverables.map((item, i) => (
                      <div key={i} style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface-subtle)", padding: "1rem 1.25rem" }}>
                        <div style={{ fontFamily: "var(--font-display)", fontWeight: 400, letterSpacing: "0.03em", fontSize: "1.15rem", color: "var(--ink-primary)", marginBottom: "0.25rem" }}>
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
                    {isDe ? "IN DIESER POSITION VERWENDETE TECHNOLOGIEN:" : "TECHNOLOGIES GENUINELY USED IN THIS ROLE:"}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {role1Tech.map((tech) => (
                      <TechTag key={tech} label={tech} />
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
                <SectionLabel number={e.role2.sectionNumber} label={e.role2.label} />
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
                  {e.role2.period}
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontWeight: 400, letterSpacing: "0.03em", fontSize: "1.25rem", color: "var(--ink-primary)" }}>
                  {e.role2.company}
                </div>
                <div className="font-mono" style={{ fontSize: "0.76rem", color: "var(--ink-muted)", marginTop: "0.25rem" }}>
                  {e.role2.account}
                </div>
                <div className="font-mono" style={{ fontSize: "0.72rem", color: "var(--ink-muted)", marginTop: "0.15rem" }}>
                  {e.role2.region}
                </div>
              </div>

              {/* Right Column: Role Title, Context, Work, Tech */}
              <div>
                <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 1.85rem)", fontWeight: 400, letterSpacing: "0.02em", color: "var(--ink-primary)", marginBottom: "0.25rem" }}>
                  {e.role2.roleTitle}
                </h2>
                <div className="font-mono" style={{ fontSize: "0.82rem", color: "var(--accent-primary)", fontWeight: 600, marginBottom: "1.25rem" }}>
                  {e.role2.roleContext}
                </div>

                <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", color: "var(--ink-secondary)", lineHeight: 1.7, marginBottom: "1.75rem" }}>
                  {e.role2.leadParagraph}
                </p>

                {/* Key Deliverables */}
                <div style={{ marginBottom: "1.75rem" }}>
                  <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 400, letterSpacing: "0.03em", color: "var(--ink-primary)", marginBottom: "0.75rem" }}>
                    {e.role2.deliverablesTitle}
                  </h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                    {role2Deliverables.map((item, i) => (
                      <div key={i} style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface-subtle)", padding: "1rem 1.25rem", boxSizing: "border-box" }}>
                        <div style={{ fontFamily: "var(--font-display)", fontWeight: 400, letterSpacing: "0.03em", fontSize: "1.15rem", color: "var(--ink-primary)", marginBottom: "0.25rem" }}>
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
                    {isDe ? "IN DIESER POSITION VERWENDETE TECHNOLOGIEN:" : "TECHNOLOGIES GENUINELY USED IN THIS ROLE:"}
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                    {role2Tech.map((tech) => (
                      <TechTag key={tech} label={tech} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </section>

        </div>

        {/* Cross-Link to Projects & Skills */}
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginTop: "3.5rem" }}>
          <Link href={isDe ? "/de/projects" : "/projects"} className="btn-tactile-primary">
            {isDe ? "PERSÖNLICHE PROJEKTE ANSEHEN" : "VIEW PERSONAL PROJECTS"}
          </Link>
          <Link href={isDe ? "/de/skills" : "/skills"} className="btn-tactile-secondary">
            {isDe ? "FÄHIGKEITSMATRIX ANSEHEN" : "VIEW SKILLS MATRIX"}
          </Link>
        </div>
      </main>

      <Footer locale={locale} />

      <style suppressHydrationWarning>{`
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
