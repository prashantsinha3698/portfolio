"use client";

import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import SectionLabel from "@/components/ui/SectionLabel";
import StoryTimeline from "@/components/sections/StoryTimeline";
import { ArrowRight } from "lucide-react";
import { getTranslation, Locale } from "@/locales";

interface AboutViewProps {
  locale: Locale;
}

export default function AboutView({ locale }: AboutViewProps) {
  const t = getTranslation(locale);
  const a = t.aboutPage;
  const isDe = locale === "de";

  const methodologyPrinciples = isDe
    ? [
        {
          title: "Zuerst den Datenfluss verstehen",
          desc: "Bevor ich Code schreibe, analysiere ich exakte Datenstrukturen, Einstiegspunkte und Grenzfälle. Ein klares mentales Systemmodell spart Stunden an nachträglichem Refactoring.",
        },
        {
          title: "Defensive Softwarearchitektur",
          desc: "Externe Schnittstellen fallen aus, Daten-Schemas ändern sich unerwartet und Netzwerkaufrufe laufen ins Timeout. Robuste Fehlerbehandlung mit aussagekräftigem Logging macht Systemausfälle vorhersehbar und beherrschbar.",
        },
        {
          title: "KI-unterstützte Entwicklung",
          desc: "Ich nutze moderne KI-Werkzeuge wie Codex und Claude Code, um Boilerplate-Code zu beschleunigen, Testsuites zu erstellen und Bibliotheken zu evaluieren – während das Gesamtsystemdesign und die Architekturentscheidungen vollständig in meiner Hand bleiben.",
        },
      ]
    : [
        {
          title: "Understand Data Flow First",
          desc: "Before writing code, I trace the exact payload shapes, entry points, and edge cases. Clear mental models save hours of refactoring.",
        },
        {
          title: "Defensive Engineering",
          desc: "External services will fail, schemas will drift, and network calls will time out. Handling errors with clear logging makes recovery predictable.",
        },
        {
          title: "AI Assisted Iteration",
          desc: "I use modern AI tools like Codex and Claude Code to accelerate boilerplate, run tests, and explore libraries, while retaining full personal ownership of system design.",
        },
      ];

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg-canvas)", color: "var(--ink-primary)" }}>
      <Navigation />

      <main style={{ flex: 1, width: "100%", maxWidth: "100%", padding: "3rem clamp(1.25rem, 4vw, 4.5rem) 6rem" }}>
        <PageHeader
          sectionNumber={a.headerNumber}
          category={a.headerCategory}
          title={a.headerTitle}
          description={a.headerDescription}
        />

        <div style={{ display: "flex", flexDirection: "column", gap: "3rem" }}>
          
          {/* Section 1: Introduction */}
          <section className="about-section">
            <SectionLabel number="01" label={isDe ? "EINLEITUNG" : "INTRODUCTION"} />
            
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                fontWeight: 700,
                color: "var(--ink-primary)",
                letterSpacing: "-0.03em",
                margin: "0.5rem 0 1.25rem",
              }}
            >
              {a.introSection.title}
            </h2>

            <div style={{ fontFamily: "var(--font-ibm-plex-sans), sans-serif", fontSize: "1rem", color: "var(--ink-secondary)", lineHeight: 1.75, maxWidth: 820 }}>
              {a.introSection.paragraphs.map((p, idx) => (
                <p key={idx} style={{ marginBottom: idx < a.introSection.paragraphs.length - 1 ? "1rem" : 0 }}>
                  {p}
                </p>
              ))}
            </div>
          </section>

          {/* Section 2: Chronological Background and Journey (Interactive Deep Timeline) */}
          <StoryTimeline locale={locale} />

          {/* Section 3: What I Enjoy Learning */}
          <section className="about-section">
            <SectionLabel number="03" label={isDe ? "INTERESSEN" : "CURIOSITY"} />

            <h2
              className="font-display"
              style={{
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                fontWeight: 700,
                color: "var(--ink-primary)",
                letterSpacing: "-0.03em",
                margin: "0.5rem 0 1.25rem",
              }}
            >
              {a.learningSection.title}
            </h2>

            <div style={{ fontFamily: "var(--font-ibm-plex-sans), sans-serif", fontSize: "0.98rem", color: "var(--ink-secondary)", lineHeight: 1.75, maxWidth: 820 }}>
              {a.learningSection.paragraphs.map((p, idx) => (
                <p key={idx} style={{ marginBottom: idx < a.learningSection.paragraphs.length - 1 ? "1rem" : 0 }}>
                  {p}
                </p>
              ))}
            </div>
          </section>

          {/* Section 4: How I Approach Projects */}
          <section className="about-section">
            <SectionLabel number="04" label={isDe ? "METHODIK" : "METHODOLOGY"} />

            <h2
              className="font-display"
              style={{
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                fontWeight: 700,
                color: "var(--ink-primary)",
                letterSpacing: "-0.03em",
                margin: "0.5rem 0 1.25rem",
              }}
            >
              {a.methodologySection.title}
            </h2>

            <div className="about-approach-grid">
              {methodologyPrinciples.map((item, idx) => (
                <div key={idx} style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface-subtle)", padding: "1.25rem", boxSizing: "border-box" }}>
                  <h3 style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: "1rem", fontWeight: 700, color: "var(--ink-primary)", marginBottom: "0.4rem" }}>
                    {item.title}
                  </h3>
                  <p style={{ fontFamily: "var(--font-ibm-plex-sans), sans-serif", fontSize: "0.86rem", color: "var(--ink-secondary)", lineHeight: 1.6, margin: 0 }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Section 5: What I Want to Explore Next */}
          <section className="about-section">
            <SectionLabel number="05" label={isDe ? "ZUKUNFTSPERSPEKTIVE" : "FUTURE FOCUS"} />

            <h2
              className="font-display"
              style={{
                fontSize: "clamp(1.6rem, 3vw, 2.2rem)",
                fontWeight: 700,
                color: "var(--ink-primary)",
                letterSpacing: "-0.03em",
                margin: "0.5rem 0 1.25rem",
              }}
            >
              {isDe ? "Zukünftige Schwerpunkte" : "What I Want to Explore Next"}
            </h2>

            <div style={{ fontFamily: "var(--font-ibm-plex-sans), sans-serif", fontSize: "0.98rem", color: "var(--ink-secondary)", lineHeight: 1.75, maxWidth: 820 }}>
              <p style={{ marginBottom: "1rem" }}>
                {isDe
                  ? "Für meine nächste berufliche Station möchte ich mein solides Fundament in der Enterprise-Salesforce-Entwicklung mit vertieftem Backend-Engineering verbinden. Besonders interessieren mich der Entwurf robuster API-Schnittstellen, containerisierter Microservices und ausfallsicherer ereignisgesteuerter Datenpipelines."
                  : "Looking ahead, I want to take on roles where I can combine my enterprise Salesforce development foundation with broader backend engineering. I am interested in building robust API integrations, containerized microservices, and reliable event driven pipelines."}
              </p>

              <p>
                {isDe
                  ? "Zudem plane ich den Abschluss meiner Salesforce Platform Developer I-Zertifizierung und vertiefe kontinuierlich meine praktischen Kenntnisse in Docker, Linux-Systemwerkzeugen und verteilten Datensystemen."
                  : "I also plan to complete my Salesforce Platform Developer I certification and continue refining my hands on knowledge of Docker, Linux tooling, and distributed data systems."}
              </p>
            </div>
          </section>

          {/* Action Links (Golden Rule 3-Button Responsive Layout) */}
          <div className="btn-group btn-group-3" style={{ borderTop: "1px solid var(--border-primary)", paddingTop: "1.5rem" }}>
            <Link href={isDe ? "/de/experience" : "/experience"} className="btn-tactile-primary">
              <span>{isDe ? "BERUFLICHEN WERDEGANG ANSEHEN" : "VIEW WORK EXPERIENCE"}</span>
              <ArrowRight size={14} />
            </Link>
            <Link href={isDe ? "/de/projects" : "/projects"} className="btn-tactile-secondary">
              <span>{isDe ? "PROJEKTE ANSEHEN" : "VIEW PROJECTS"}</span>
              <ArrowRight size={14} />
            </Link>
            <Link href={isDe ? "/de#contact" : "/#contact"} className="btn-tactile-secondary">
              <span>{isDe ? "KONTAKT AUFNEHMEN" : "GET IN TOUCH"}</span>
              <ArrowRight size={14} />
            </Link>
          </div>

        </div>
      </main>

      <Footer locale={locale} />

      <style suppressHydrationWarning>{`
        .about-section {
          background: var(--bg-surface);
          border: 1px solid var(--border-primary);
          box-shadow: var(--shadow-tactile);
          padding: 2.5rem 2.25rem;
          box-sizing: border-box;
          width: 100%;
        }
        .about-approach-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
          gap: 1.25rem;
          box-sizing: border-box;
        }
        @media (max-width: 768px) {
          main {
            padding: 2rem 0.85rem 4rem !important;
          }
          .about-section {
            padding: 1.35rem 0.95rem !important;
          }
          .about-approach-grid {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
        }
      `}</style>
    </div>
  );
}
