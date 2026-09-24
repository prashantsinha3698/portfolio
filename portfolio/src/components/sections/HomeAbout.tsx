"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import SectionLabel from "@/components/ui/SectionLabel";
import { ArrowRight } from "lucide-react";
import { getLocaleFromPathname, Locale } from "@/locales";
import ScrollReveal from "@/components/ui/ScrollReveal";

interface HomeAboutProps {
  locale?: Locale;
}

export default function HomeAbout({ locale }: HomeAboutProps) {
  const pathname = usePathname();
  const activeLocale = locale || getLocaleFromPathname(pathname);
  const isDe = activeLocale === "de";

  return (
    <section
      id="about"
      aria-label="About"
      style={{
        padding: "5rem 0 5.5rem",
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
              <SectionLabel number="06" label={isDe ? "ÜBER MICH" : "ABOUT"} />
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
                {isDe ? "Über mich" : "About Me"}
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
                ? "Ein kurzer Einblick in meine Person, meine Herangehensweise an Software und was meine Arbeit antreibt."
                : "A quick introduction to who I am, how I approach software, and what drives my work."}
            </p>
          </div>
        </ScrollReveal>

        {/* 2-Column Layout */}
        <ScrollReveal delay={0.1}>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: "3rem",
            alignItems: "start",
            marginBottom: "3rem",
          }}
          className="about-home-grid"
        >
          {/* Left Column: Human perspective */}
          <div>
            <h3
              className="font-display"
              style={{
                fontSize: "clamp(1.25rem, 2.5vw, 1.65rem)",
                color: "var(--ink-primary)",
                letterSpacing: "-0.02em",
                lineHeight: 1.4,
                fontWeight: 600,
                marginBottom: "1.25rem",
              }}
            >
              {isDe
                ? "Ich verstehe gerne, wie Dinge funktionieren, baue kompakte Systeme zum Lernen und verwandle komplexe Abläufe in verständliche Software."
                : "I like understanding how things work, building small systems to learn, and turning complicated workflows into something easier to use."}
            </h3>

            <p
              style={{
                fontFamily: "var(--font-ibm-plex-sans), sans-serif",
                fontSize: "0.95rem",
                color: "var(--ink-secondary)",
                lineHeight: 1.7,
                marginBottom: "1.25rem",
              }}
            >
              {isDe
                ? "Mein Profil verbindet ein ingenieurwissenschaftliches Studium der Elektronik mit praktischer Softwareentwicklung bei Tata Consultancy Services. Im Berufsalltag unterstütze ich Unternehmensteams bei der Prozessautomatisierung und der Integration von Salesforce mit externen Systemen."
                : "My background connects formal electronics engineering with hands on software development at Tata Consultancy Services. In my day to day work, I help enterprise teams automate processes and integrate Salesforce with external applications."}
            </p>

            <p
              style={{
                fontFamily: "var(--font-ibm-plex-sans), sans-serif",
                fontSize: "0.95rem",
                color: "var(--ink-secondary)",
                lineHeight: 1.7,
              }}
            >
              {isDe
                ? "Außerhalb des Berufs entwickle ich eigenständige Softwareprojekte wie OnyxFlow und Quantfolio. Diese Projekte bieten mir einen praxisnahen Raum, um Daten-Pipelines, mathematische Modelle und Softwarearchitektur von Grund auf zu vertiefen."
                : "Outside work, I build independent software projects like OnyxFlow and Quantfolio. Working on these personal projects gives me practical space to explore data pipelines, math models, and software design from the ground up."}
            </p>
          </div>

          {/* Right Column: Grounded Tenets */}
          <div
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border-primary)",
              boxShadow: "var(--shadow-tactile-sm)",
              padding: "1.75rem",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
            }}
          >
            <div
              className="font-mono"
              style={{
                fontSize: "0.72rem",
                color: "var(--accent-primary)",
                fontWeight: 700,
                letterSpacing: "0.08em",
              }}
            >
              {isDe ? "MEINE ARBEITSWEISE" : "HOW I WORK"}
            </div>

            <div>
              <div style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "var(--ink-primary)", marginBottom: "0.25rem" }}>
                {isDe ? "Verstehen vor dem Programmieren" : "Understand before coding"}
              </div>
              <p style={{ fontFamily: "var(--font-ibm-plex-sans), sans-serif", fontSize: "0.84rem", color: "var(--ink-secondary)", lineHeight: 1.55 }}>
                {isDe
                  ? "Anforderungen und Datenflüsse vorab präzise zu analysieren, verhindert das spätere Umschreiben instabilen Codes."
                  : "Taking time to clearly map the requirements and data flow prevents rewriting fragile code later."}
              </p>
            </div>

            <div style={{ height: "1px", background: "var(--border-subtle)" }} />

            <div>
              <div style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "var(--ink-primary)", marginBottom: "0.25rem" }}>
                {isDe ? "Systeme verständlich halten" : "Keep systems straightforward"}
              </div>
              <p style={{ fontFamily: "var(--font-ibm-plex-sans), sans-serif", fontSize: "0.84rem", color: "var(--ink-secondary)", lineHeight: 1.55 }}>
                {isDe
                  ? "Software, deren Ablauf sich klar nachvollziehen lässt, ist wesentlich leichter zu testen, zu debuggen und langfristig zu warten."
                  : "Software that is easy to reason about is much easier to debug, test, and maintain over time."}
              </p>
            </div>

            <div style={{ height: "1px", background: "var(--border-subtle)" }} />

            <div>
              <div style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "var(--ink-primary)", marginBottom: "0.25rem" }}>
                {isDe ? "Lernen durch praktisches Bauen" : "Learn by building"}
              </div>
              <p style={{ fontFamily: "var(--font-ibm-plex-sans), sans-serif", fontSize: "0.84rem", color: "var(--ink-secondary)", lineHeight: 1.55 }}>
                {isDe
                  ? "Echte Projekte zu bauen und sich realen Randfällen zu stellen, ist der schnellste Weg zu echtem technischen Verständnis."
                  : "Building real projects and wrestling with practical edge cases is the fastest way to truly learn."}
              </p>
            </div>
          </div>
        </div>
        </ScrollReveal>

        {/* Section Footer Link */}
        <ScrollReveal delay={0.15}>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Link href={isDe ? "/de/about" : "/about"} className="btn-tactile-secondary" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
            <span>{isDe ? "MEHR ÜBER MICH UND MEINEN WERDEGANG" : "MORE ABOUT ME AND MY JOURNEY"}</span>
            <ArrowRight size={14} />
          </Link>
        </div>
        </ScrollReveal>
      </div>

      <style suppressHydrationWarning>{`
        @media (max-width: 900px) {
          .about-home-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}
