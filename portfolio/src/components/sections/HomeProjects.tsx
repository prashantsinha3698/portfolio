"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import SectionLabel from "@/components/ui/SectionLabel";
import StatusBadge from "@/components/ui/StatusBadge";
import TechTag from "@/components/ui/TechTag";
import FolderTab from "@/components/ui/FolderTab";
import { ArrowRight, ExternalLink, FileText } from "lucide-react";
import { GitHubIcon } from "@/components/ui/SocialIcons";
import { getLocaleFromPathname, getTranslation, Locale } from "@/locales";
import ScrollReveal, { ParallaxReveal } from "@/components/ui/ScrollReveal";

interface CardContentProps {
  locale: Locale;
}

function OnyxFlowCardContent({ locale }: CardContentProps) {
  const t = getTranslation(locale);
  const hp = t.homeProjects;
  const isDe = locale === "de";

  return (
    <>
      {/* Header Strip */}
      <div
        style={{
          padding: "1.25rem 2rem",
          borderBottom: "1px solid var(--border-subtle)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          background: "var(--bg-surface-subtle)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          <span
            className="font-mono"
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              color: "var(--accent-primary)",
              letterSpacing: "0.06em",
            }}
          >
            PROJECT 01
          </span>
          <StatusBadge status={isDe ? "Eigenes Projekt" : "Personal Project"} />
        </div>

        <span className="font-mono" style={{ fontSize: "0.74rem", color: "var(--ink-muted)" }}>
          {hp.onyxflow.categoryTag}
        </span>
      </div>

      {/* Content Grid */}
      <div
        style={{
          padding: "2.25rem 2rem",
          display: "grid",
          gridTemplateColumns: "1.25fr 0.75fr",
          gap: "3rem",
          alignItems: "start",
        }}
        className="project-home-grid"
      >
        {/* Left Column */}
        <div>
          <h3
            className="font-display"
            style={{
              fontSize: "clamp(1.75rem, 3.5vw, 2.3rem)",
              fontWeight: 700,
              color: "var(--ink-primary)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: "0.5rem",
            }}
          >
            OnyxFlow
          </h3>

          <div
            className="font-mono"
            style={{
              fontSize: "0.88rem",
              color: "var(--accent-primary)",
              fontWeight: 600,
              marginBottom: "1rem",
            }}
          >
            {hp.onyxflow.tagline}
          </div>

          <p
            style={{
              fontFamily: "var(--font-ibm-plex-sans), sans-serif",
              fontSize: "0.95rem",
              color: "var(--ink-secondary)",
              lineHeight: 1.68,
              marginBottom: "1.25rem",
            }}
          >
            {hp.onyxflow.description}
          </p>

          {/* AI Assistance disclosure */}
          <div
            className="font-mono"
            style={{
              fontSize: "0.75rem",
              color: "var(--ink-muted)",
              marginBottom: "1.25rem",
              padding: "0.5rem 0.75rem",
              background: "var(--bg-surface-subtle)",
              border: "1px solid var(--border-subtle)",
            }}
          >
            {isDe
              ? "Entwicklung: Konzipiert und iteriert mit KI-Programmierunterstützung (Codex, Claude Code)."
              : "Development: Designed and iterated with AI coding assistance using Codex and Claude Code."}
          </div>

          {/* Tech Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.75rem" }}>
            <TechTag label="Python 3.11" />
            <TechTag label="SQLite WAL" />
            <TechTag label="TA-Lib" />
            <TechTag label="Flask SSE" />
            <TechTag label="WebSocket" />
            <TechTag label="REST APIs" />
          </div>

          {/* Action Buttons */}
          <div className="btn-group project-btn-group btn-group-2" style={{ marginTop: "1rem" }}>
            <Link href={isDe ? "/de/projects/onyxflow" : "/projects/onyxflow"} className="btn-tactile-primary">
              <FileText size={14} />
              <span>{isDe ? "PROJEKT ANSEHEN" : "VIEW PROJECT"}</span>
            </Link>

            <a
              href="https://github.com/prashantsinha3698"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-tactile-secondary"
            >
              <GitHubIcon size={14} />
              <span>GITHUB REPO</span>
            </a>
          </div>
        </div>

        {/* Right Column: Architectural Highlights */}
        <div
          style={{
            background: "var(--bg-surface-subtle)",
            border: "1px solid var(--border-subtle)",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          <div
            className="font-mono"
            style={{
              fontSize: "0.72rem",
              color: "var(--ink-muted)",
              letterSpacing: "0.06em",
              fontWeight: 600,
            }}
          >
            {isDe ? "SYSTEM-HIGHLIGHTS" : "SYSTEM HIGHLIGHTS"}
          </div>

          <div>
            <div className="font-display" style={{ fontSize: "1.7rem", fontWeight: 700, color: "var(--ink-primary)", lineHeight: 1 }}>
              &lt; 20 ms
            </div>
            <div className="font-mono" style={{ fontSize: "0.72rem", color: "var(--accent-primary)", fontWeight: 600, marginTop: "3px" }}>
              {isDe ? "ZIEL-SIGNALLATENZ" : "SIGNAL LATENCY TARGET"}
            </div>
            <div style={{ fontFamily: "var(--font-ibm-plex-sans), sans-serif", fontSize: "0.8rem", color: "var(--ink-muted)", marginTop: "3px", lineHeight: 1.4 }}>
              {isDe
                ? "Vektorisierter Berechnungscache vermeidet die Neuberechnung statischer historischer Balken."
                : "Vectorized calculation cache to avoid re-evaluating static historical bars."}
            </div>
          </div>

          <div style={{ height: "1px", background: "var(--border-subtle)" }} />

          <div>
            <div className="font-display" style={{ fontSize: "1.7rem", fontWeight: 700, color: "var(--ink-primary)", lineHeight: 1 }}>
              30 MIN
            </div>
            <div className="font-mono" style={{ fontSize: "0.72rem", color: "var(--accent-primary)", fontWeight: 600, marginTop: "3px" }}>
              {isDe ? "KERZENABSCHLUSS-BEWERTUNG" : "CLOSED-CANDLE EVALUATION"}
            </div>
            <div style={{ fontFamily: "var(--font-ibm-plex-sans), sans-serif", fontSize: "0.8rem", color: "var(--ink-muted)", marginTop: "3px", lineHeight: 1.4 }}>
              {isDe
                ? "Bewertet Einstiegssignale strikt bei Kerzenabschluss zur Vermeidung von Repainting."
                : "Evaluates entry signals strictly on candle closure to prevent repainting."}
            </div>
          </div>

          <div style={{ height: "1px", background: "var(--border-subtle)" }} />

          <div>
            <div className="font-display" style={{ fontSize: "1.7rem", fontWeight: 700, color: "var(--ink-primary)", lineHeight: 1 }}>
              5 TIERS
            </div>
            <div className="font-mono" style={{ fontSize: "0.72rem", color: "var(--accent-primary)", fontWeight: 600, marginTop: "3px" }}>
              {isDe ? "ENTKOPPELTE ARCHITEKTUR" : "DECOUPLED ARCHITECTURE"}
            </div>
            <div style={{ fontFamily: "var(--font-ibm-plex-sans), sans-serif", fontSize: "0.8rem", color: "var(--ink-muted)", marginTop: "3px", lineHeight: 1.4 }}>
              {isDe
                ? "Trennt Datenaufnahme, Caching, Strategieregeln, Risiko und Börsenausführung."
                : "Separates data ingestion, caching, strategy rules, risk, and execution."}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function QuantfolioCardContent({ locale }: CardContentProps) {
  const t = getTranslation(locale);
  const hp = t.homeProjects;
  const isDe = locale === "de";

  return (
    <>
      {/* Header Strip */}
      <div
        style={{
          padding: "1.25rem 2rem",
          borderBottom: "1px solid var(--border-subtle)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "1rem",
          background: "var(--bg-surface-subtle)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          <span
            className="font-mono"
            style={{
              fontSize: "0.75rem",
              fontWeight: 700,
              color: "var(--accent-primary)",
              letterSpacing: "0.06em",
            }}
          >
            PROJECT 02
          </span>
          <StatusBadge status={isDe ? "Eigenes Projekt" : "Personal Project"} />
        </div>

        <span className="font-mono" style={{ fontSize: "0.74rem", color: "var(--ink-muted)" }}>
          {hp.quantfolio.categoryTag}
        </span>
      </div>

      {/* Content Grid */}
      <div
        style={{
          padding: "2.25rem 2rem",
          display: "grid",
          gridTemplateColumns: "1.25fr 0.75fr",
          gap: "3rem",
          alignItems: "start",
        }}
        className="project-home-grid"
      >
        {/* Left Column */}
        <div>
          <h3
            className="font-display"
            style={{
              fontSize: "clamp(1.75rem, 3.5vw, 2.3rem)",
              fontWeight: 700,
              color: "var(--ink-primary)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              marginBottom: "0.5rem",
            }}
          >
            Quantfolio
          </h3>

          <div
            className="font-mono"
            style={{
              fontSize: "0.88rem",
              color: "var(--accent-primary)",
              fontWeight: 600,
              marginBottom: "1rem",
            }}
          >
            {hp.quantfolio.tagline}
          </div>

          <p
            style={{
              fontFamily: "var(--font-ibm-plex-sans), sans-serif",
              fontSize: "0.95rem",
              color: "var(--ink-secondary)",
              lineHeight: 1.68,
              marginBottom: "1.25rem",
            }}
          >
            {hp.quantfolio.description}
          </p>

          {/* AI Assistance disclosure */}
          <div
            className="font-mono"
            style={{
              fontSize: "0.75rem",
              color: "var(--ink-muted)",
              marginBottom: "1.25rem",
              padding: "0.5rem 0.75rem",
              background: "var(--bg-surface-subtle)",
              border: "1px solid var(--border-subtle)",
            }}
          >
            {isDe
              ? "Entwicklung: Konzipiert und iteriert mit KI-Programmierunterstützung (Codex, Claude Code)."
              : "Development: Designed and iterated with AI coding assistance using Codex and Claude Code."}
          </div>

          {/* Tech Tags */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.75rem" }}>
            <TechTag label="Python" />
            <TechTag label="SciPy" />
            <TechTag label="FastAPI" />
            <TechTag label="React" />
            <TechTag label="Plotly" />
            <TechTag label="NumPy" />
          </div>

          {/* Action Buttons */}
          <div className="btn-group project-btn-group btn-group-3" style={{ marginTop: "1rem" }}>
            <Link href={isDe ? "/de/projects/quantfolio" : "/projects/quantfolio"} className="btn-tactile-primary">
              <FileText size={14} />
              <span>{isDe ? "PROJEKT ANSEHEN" : "VIEW PROJECT"}</span>
            </Link>

            <a
              href="https://quantfolio-prashant-project.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-tactile-secondary"
            >
              <ExternalLink size={14} />
              <span>LIVE DEMO</span>
            </a>

            <a
              href="https://github.com/prashantsinha3698/quantfolio"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-tactile-secondary"
            >
              <GitHubIcon size={14} />
              <span>GITHUB REPO</span>
            </a>
          </div>
        </div>

        {/* Right Column: Key Highlights */}
        <div
          style={{
            background: "var(--bg-surface-subtle)",
            border: "1px solid var(--border-subtle)",
            padding: "1.5rem",
            display: "flex",
            flexDirection: "column",
            gap: "1.25rem",
          }}
        >
          <div
            className="font-mono"
            style={{
              fontSize: "0.72rem",
              color: "var(--ink-muted)",
              letterSpacing: "0.06em",
              fontWeight: 600,
            }}
          >
            {isDe ? "SYSTEM-HIGHLIGHTS" : "SYSTEM HIGHLIGHTS"}
          </div>

          <div>
            <div className="font-display" style={{ fontSize: "1.7rem", fontWeight: 700, color: "var(--ink-primary)", lineHeight: 1 }}>
              22 / 22
            </div>
            <div className="font-mono" style={{ fontSize: "0.72rem", color: "var(--accent-primary)", fontWeight: 600, marginTop: "3px" }}>
              {isDe ? "TEST-SUITE (INVARIANTEN)" : "UNIT TEST SUITE"}
            </div>
            <div style={{ fontFamily: "var(--font-ibm-plex-sans), sans-serif", fontSize: "0.8rem", color: "var(--ink-muted)", marginTop: "3px", lineHeight: 1.4 }}>
              {isDe
                ? "Automatisierte Tests für mathematische Randfälle und Summenrestriktionen der Gewichte."
                : "Automated tests covering mathematical edge cases and weight sum constraints."}
            </div>
          </div>

          <div style={{ height: "1px", background: "var(--border-subtle)" }} />

          <div>
            <div className="font-display" style={{ fontSize: "1.7rem", fontWeight: 700, color: "var(--ink-primary)", lineHeight: 1 }}>
              SLSQP
            </div>
            <div className="font-mono" style={{ fontSize: "0.72rem", color: "var(--accent-primary)", fontWeight: 600, marginTop: "3px" }}>
              {isDe ? "NUMERISCHER SOLVER" : "OPTIMIZATION SOLVER"}
            </div>
            <div style={{ fontFamily: "var(--font-ibm-plex-sans), sans-serif", fontSize: "0.8rem", color: "var(--ink-muted)", marginTop: "3px", lineHeight: 1.4 }}>
              {isDe
                ? "Nutzt SciPy Sequential Least Squares zur Maximierung der Sharpe-Ratio unter Allokationsgrenzen."
                : "Uses SciPy sequential least squares to maximize Sharpe ratio under allocation bounds."}
            </div>
          </div>

          <div style={{ height: "1px", background: "var(--border-subtle)" }} />

          <div>
            <div className="font-display" style={{ fontSize: "1.7rem", fontWeight: 700, color: "var(--ink-primary)", lineHeight: 1 }}>
              4 TIERS
            </div>
            <div className="font-mono" style={{ fontSize: "0.72rem", color: "var(--accent-primary)", fontWeight: 600, marginTop: "3px" }}>
              {isDe ? "ENTKOPPELTER STACK" : "DECOUPLED STACK"}
            </div>
            <div style={{ fontFamily: "var(--font-ibm-plex-sans), sans-serif", fontSize: "0.8rem", color: "var(--ink-muted)", marginTop: "3px", lineHeight: 1.4 }}>
              {isDe
                ? "Datenaufnahme, mathematische Berechnungen, FastAPI-Backend und React-Frontend."
                : "Data ingestion, mathematical calculations, FastAPI backend, and React UI."}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

interface HomeProjectsProps {
  locale?: Locale;
}

export default function HomeProjects({ locale }: HomeProjectsProps) {
  const [activeTab, setActiveTab] = useState<0 | 1>(0);
  const pathname = usePathname();
  const activeLocale = locale || getLocaleFromPathname(pathname);
  const t = getTranslation(activeLocale);
  const hp = t.homeProjects;
  const isDe = activeLocale === "de";

  return (
    <section
      id="projects"
      aria-label="Selected Projects"
      style={{
        padding: "5rem 0 5.5rem",
        borderBottom: "1px solid var(--border-primary)",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <ScrollReveal variant="fade-up" style={{ marginBottom: "3.5rem" }}>
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
              <SectionLabel number="02" label={isDe ? "PROJEKTE" : "PROJECTS"} />
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
                {hp.title}
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
              {hp.subtitle}
            </p>
          </div>
        </ScrollReveal>

        {/* Desktop & Horizontal Tablet: Interactive Folder Tabs */}
        <ScrollReveal variant="fade-up" delay={0.05} style={{ marginBottom: "3rem" }}>
          <div className="desktop-projects-tabbed" style={{ position: "relative" }}>
            <div
              role="tablist"
              aria-label="Projects tab navigation"
              style={{ display: "flex", gap: "0.25rem", alignItems: "flex-end" }}
            >
              <FolderTab
                active={activeTab === 0}
                number="01"
                title="ONYXFLOW.SYS"
                id="project-tab-0"
                controls="project-panel-0"
                onClick={() => setActiveTab(0)}
              />

              <FolderTab
                active={activeTab === 1}
                number="02"
                title="QUANTFOLIO.APP"
                id="project-tab-1"
                controls="project-panel-1"
                onClick={() => setActiveTab(1)}
              />
            </div>

            <div
              role="tabpanel"
              id={`project-panel-${activeTab}`}
              aria-labelledby={`project-tab-${activeTab}`}
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border-primary)",
                boxShadow: "var(--shadow-tactile)",
                position: "relative",
                zIndex: 2,
              }}
            >
              {activeTab === 0 ? <OnyxFlowCardContent locale={activeLocale} /> : <QuantfolioCardContent locale={activeLocale} />}
            </div>
          </div>
        </ScrollReveal>

        {/* Mobile: Sequential Stacked One-by-One */}
        <div className="mobile-projects-stacked" style={{ display: "flex", flexDirection: "column", gap: "3.5rem", marginBottom: "3rem" }}>
          {/* Project 01: OnyxFlow */}
          <ScrollReveal variant="fade-up">
            <div style={{ position: "relative" }}>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <FolderTab
                  active={true}
                  number="01"
                  title="ONYXFLOW.SYS"
                />
              </div>
              <div
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border-primary)",
                  boxShadow: "var(--shadow-tactile)",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                <OnyxFlowCardContent locale={activeLocale} />
              </div>
            </div>
          </ScrollReveal>

          {/* Project 02: Quantfolio */}
          <ScrollReveal variant="fade-up" delay={0.08}>
            <div style={{ position: "relative" }}>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <FolderTab
                  active={true}
                  number="02"
                  title="QUANTFOLIO.APP"
                />
              </div>
              <div
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border-primary)",
                  boxShadow: "var(--shadow-tactile)",
                  position: "relative",
                  zIndex: 2,
                }}
              >
                <QuantfolioCardContent locale={activeLocale} />
              </div>
            </div>
          </ScrollReveal>
        </div>

        {/* Section Footer Link */}
        <ScrollReveal delay={0.12}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Link href={isDe ? "/de/projects" : "/projects"} className="btn-tactile-secondary" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
              <span>{isDe ? "ALLE 2 PROJEKTE ANSEHEN" : "VIEW ALL PROJECTS"}</span>
              <ArrowRight size={14} />
            </Link>
          </div>
        </ScrollReveal>
      </div>

      <style suppressHydrationWarning>{`
        @media (max-width: 900px) {
          .project-home-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  );
}
