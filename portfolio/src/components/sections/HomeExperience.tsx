"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SectionLabel from "@/components/ui/SectionLabel";
import TechTag from "@/components/ui/TechTag";
import { ArrowRight } from "lucide-react";
import { getLocaleFromPathname, Locale } from "@/locales";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface HomeExperienceProps {
  locale?: Locale;
}

export default function HomeExperience({ locale }: HomeExperienceProps) {
  const pathname = usePathname();
  const activeLocale = locale || getLocaleFromPathname(pathname);
  const isDe = activeLocale === "de";

  const focusAreas = isDe
    ? [
        {
          title: "Apex-Automatisierung",
          detail: "Entwicklung von Triggern, Batch-Jobs und Scheduled Classes mit Unit-Tests und Governor-Limit-Prüfungen.",
        },
        {
          title: "XML & Schnittstellen",
          detail: "Verwaltung der XML-Generierung und des Datenaustauschs zwischen Salesforce und externen Unternehmensanwendungen.",
        },
        {
          title: "Fehlerbehebung & Support",
          detail: "Untersuchung gemeldeter Anwenderprobleme, Ursachenanalyse und Bereitstellung verifizierter Code-Korrekturen.",
        },
        {
          title: "Daten & Administration",
          detail: "Benutzerdefinierte Felder, Validierungsregeln, Flow-Aktualisierungen und Datenbereinigungen via SOQL.",
        },
      ]
    : [
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
      ];

  return (
    <section
      id="experience"
      aria-label="Professional Experience"
      style={{
        padding: "4.5rem 0 5rem",
        borderBottom: "1px solid var(--border-primary)",
        background: "transparent",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <ScrollReveal variant="fade-up" style={{ marginBottom: "3rem" }}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: "1.5rem",
            }}
          >
            <div>
              <SectionLabel number="03" label={isDe ? "ERFAHRUNG" : "EXPERIENCE"} />
              <h2
                className="font-display"
                style={{
                  fontSize: "clamp(2.2rem, 4.5vw, 3.2rem)",
                  color: "var(--ink-primary)",
                  letterSpacing: "0.02em",
                  fontWeight: 400,
                  lineHeight: 1.1,
                }}
              >
                {isDe ? "Berufserfahrung" : "Work Experience"}
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
              {isDe
                ? "Praktische Softwareentwicklung und Support für Enterprise-Salesforce-Systeme bei Tata Consultancy Services."
                : "Practical software development and support on enterprise Salesforce systems at Tata Consultancy Services."}
            </p>
          </div>
        </ScrollReveal>

        {/* Employment Block */}
        <ScrollReveal delay={0.1} variant="blur-in">
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
                {isDe ? "JANUAR 2020 – DEZEMBER 2022" : "JANUARY 2020 - DECEMBER 2022"}
              </div>

              <h3
                className="font-display"
                style={{
                  fontSize: "clamp(1.5rem, 3vw, 1.85rem)",
                  fontWeight: 400,
                  color: "var(--ink-primary)",
                  letterSpacing: "0.03em",
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
                {isDe ? "Salesforce-Entwickler / Systems Engineer" : "Salesforce Developer / System Engineer"}
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
              {isDe ? "VOLLZEITANSTELLUNG" : "FULL TIME EMPLOYMENT"}
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
              {isDe
                ? "Tätigkeit als Salesforce-Entwickler zur Betreuung globaler Geschäftseinheiten. Zu den Aufgaben gehörten der Bau individueller Automatisierungen, die Pflege von XML-Datenaustausch-Pipelines, das Debugging von Produktivfehlern und das Bereitstellen getesteter Releases in Kundenumgebungen."
                : "Working as a Salesforce developer supporting enterprise business units. Responsibilities include building custom automation, maintaining XML data exchange pipelines, debugging production issues, and deploying tested changes to client environments."}
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
              {focusAreas.map((area, idx) => (
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
                {isDe ? "WERKZEUGE:" : "TOOLS USED:"}
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
        </ScrollReveal>

        {/* Section Footer Link */}
        <ScrollReveal delay={0.15} variant="fade-up">
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Link href={isDe ? "/de/experience" : "/experience"} className="btn-tactile-secondary" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
            <span>{isDe ? "VOLLSTÄNDIGE BERUFSERFAHRUNG ANSEHEN" : "VIEW FULL WORK EXPERIENCE"}</span>
            <ArrowRight size={14} />
          </Link>
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
