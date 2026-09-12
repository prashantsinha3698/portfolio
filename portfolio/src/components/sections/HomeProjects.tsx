"use client";

import { useState } from "react";
import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";
import StatusBadge from "@/components/ui/StatusBadge";
import TechTag from "@/components/ui/TechTag";
import FolderTab from "@/components/ui/FolderTab";
import { ArrowRight, ExternalLink, FileText } from "lucide-react";
import { GitHubIcon } from "@/components/ui/SocialIcons";

function OnyxFlowCardContent() {
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
          <StatusBadge status="Personal Project" />
        </div>

        <span className="font-mono" style={{ fontSize: "0.74rem", color: "var(--ink-muted)" }}>
          MARKET DATA & RISK EXPLORATION
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
            Algorithmic trading and risk engine exploration
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
            I built OnyxFlow to explore how a small trading system could handle market data feeds, indicator calculations, risk controls and process recovery without becoming fragile. It connects to exchange WebSocket feeds, parses candle intervals, calculates technical signals, and records execution states in a local database.
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
            Development: Designed and iterated with AI coding assistance using Codex and Claude Code.
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
          <div className="btn-group btn-group-2" style={{ marginTop: "1rem" }}>
            <Link href="/projects/onyxflow" className="btn-tactile-primary">
              <FileText size={14} />
              <span>VIEW PROJECT</span>
            </Link>

            <a
              href="https://github.com/prashantsinha3698"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-tactile-secondary"
            >
              <GitHubIcon size={14} />
              <span>GITHUB CODE</span>
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
            SYSTEM HIGHLIGHTS
          </div>

          <div>
            <div className="font-display" style={{ fontSize: "1.7rem", fontWeight: 700, color: "var(--ink-primary)", lineHeight: 1 }}>
              &lt; 20 ms
            </div>
            <div className="font-mono" style={{ fontSize: "0.72rem", color: "var(--accent-primary)", fontWeight: 600, marginTop: "3px" }}>
              SIGNAL LATENCY TARGET
            </div>
            <div style={{ fontFamily: "var(--font-ibm-plex-sans), sans-serif", fontSize: "0.8rem", color: "var(--ink-muted)", marginTop: "3px", lineHeight: 1.4 }}>
              Vectorized calculation cache to avoid re-evaluating static historical bars.
            </div>
          </div>

          <div style={{ height: "1px", background: "var(--border-subtle)" }} />

          <div>
            <div className="font-display" style={{ fontSize: "1.7rem", fontWeight: 700, color: "var(--ink-primary)", lineHeight: 1 }}>
              30 MIN
            </div>
            <div className="font-mono" style={{ fontSize: "0.72rem", color: "var(--accent-primary)", fontWeight: 600, marginTop: "3px" }}>
              CLOSED-CANDLE EVALUATION
            </div>
            <div style={{ fontFamily: "var(--font-ibm-plex-sans), sans-serif", fontSize: "0.8rem", color: "var(--ink-muted)", marginTop: "3px", lineHeight: 1.4 }}>
              Evaluates entry signals strictly on candle closure to prevent repainting.
            </div>
          </div>

          <div style={{ height: "1px", background: "var(--border-subtle)" }} />

          <div>
            <div className="font-display" style={{ fontSize: "1.7rem", fontWeight: 700, color: "var(--ink-primary)", lineHeight: 1 }}>
              5 TIERS
            </div>
            <div className="font-mono" style={{ fontSize: "0.72rem", color: "var(--accent-primary)", fontWeight: 600, marginTop: "3px" }}>
              DECOUPLED ARCHITECTURE
            </div>
            <div style={{ fontFamily: "var(--font-ibm-plex-sans), sans-serif", fontSize: "0.8rem", color: "var(--ink-muted)", marginTop: "3px", lineHeight: 1.4 }}>
              Separates data ingestion, caching, strategy rules, risk, and execution.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

function QuantfolioCardContent() {
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
          <StatusBadge status="Personal Project" />
        </div>

        <span className="font-mono" style={{ fontSize: "0.74rem", color: "var(--ink-muted)" }}>
          PORTFOLIO OPTIMIZATION EXPLORATION
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
            Portfolio analytics and optimization tool
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
            A personal project I built to understand portfolio risk, optimization and rebalancing. It ingests historical price data, calculates risk-return profiles, runs optimization using SciPy to find efficient frontiers, and provides an interactive web interface to inspect asset weights.
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
            Development: Designed and iterated with AI coding assistance using Codex and Claude Code.
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
          <div className="btn-group btn-group-3" style={{ marginTop: "1rem" }}>
            <Link href="/projects/quantfolio" className="btn-tactile-primary">
              <FileText size={14} />
              <span>VIEW PROJECT</span>
            </Link>

            <a
              href="https://quantfolio-nine.vercel.app"
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
              <span>GITHUB CODE</span>
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
            SYSTEM HIGHLIGHTS
          </div>

          <div>
            <div className="font-display" style={{ fontSize: "1.7rem", fontWeight: 700, color: "var(--ink-primary)", lineHeight: 1 }}>
              22 / 22
            </div>
            <div className="font-mono" style={{ fontSize: "0.72rem", color: "var(--accent-primary)", fontWeight: 600, marginTop: "3px" }}>
              UNIT TEST SUITE
            </div>
            <div style={{ fontFamily: "var(--font-ibm-plex-sans), sans-serif", fontSize: "0.8rem", color: "var(--ink-muted)", marginTop: "3px", lineHeight: 1.4 }}>
              Automated tests covering mathematical edge cases and weight sum constraints.
            </div>
          </div>

          <div style={{ height: "1px", background: "var(--border-subtle)" }} />

          <div>
            <div className="font-display" style={{ fontSize: "1.7rem", fontWeight: 700, color: "var(--ink-primary)", lineHeight: 1 }}>
              SLSQP
            </div>
            <div className="font-mono" style={{ fontSize: "0.72rem", color: "var(--accent-primary)", fontWeight: 600, marginTop: "3px" }}>
              OPTIMIZATION SOLVER
            </div>
            <div style={{ fontFamily: "var(--font-ibm-plex-sans), sans-serif", fontSize: "0.8rem", color: "var(--ink-muted)", marginTop: "3px", lineHeight: 1.4 }}>
              Uses SciPy sequential least squares to maximize Sharpe ratio under allocation bounds.
            </div>
          </div>

          <div style={{ height: "1px", background: "var(--border-subtle)" }} />

          <div>
            <div className="font-display" style={{ fontSize: "1.7rem", fontWeight: 700, color: "var(--ink-primary)", lineHeight: 1 }}>
              4 TIERS
            </div>
            <div className="font-mono" style={{ fontSize: "0.72rem", color: "var(--accent-primary)", fontWeight: 600, marginTop: "3px" }}>
              DECOUPLED STACK
            </div>
            <div style={{ fontFamily: "var(--font-ibm-plex-sans), sans-serif", fontSize: "0.8rem", color: "var(--ink-muted)", marginTop: "3px", lineHeight: 1.4 }}>
              Data ingestion, mathematical calculations, FastAPI backend, and React UI.
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function HomeProjects() {
  const [activeTab, setActiveTab] = useState<0 | 1>(0);

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
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "1.5rem",
            marginBottom: "3.5rem",
          }}
        >
          <div>
            <SectionLabel number="01" label="PROJECTS" />
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
              Selected Projects
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
            Personal software projects built to explore technical systems, data processing and architecture beyond daily client work.
          </p>
        </div>

        {/* ============================================================ */}
        {/* DESKTOP & HORIZONTAL TABLET: Interactive Folder Tabs        */}
        {/* ============================================================ */}
        <div className="desktop-projects-tabbed scroll-reveal" style={{ position: "relative", marginBottom: "3rem" }}>
          {/* Side-by-side folder tabs */}
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

          {/* Active Project Folder Card */}
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
            {activeTab === 0 ? <OnyxFlowCardContent /> : <QuantfolioCardContent />}
          </div>
        </div>

        {/* ============================================================ */}
        {/* MOBILE: Sequential Stacked One-by-One                       */}
        {/* ============================================================ */}
        <div className="mobile-projects-stacked" style={{ display: "flex", flexDirection: "column", gap: "3.5rem", marginBottom: "3rem" }}>
          {/* Project 01: OnyxFlow */}
          <div className="scroll-reveal" style={{ position: "relative" }}>
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
              <OnyxFlowCardContent />
            </div>
          </div>

          {/* Project 02: Quantfolio */}
          <div className="scroll-reveal" style={{ position: "relative" }}>
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
              <QuantfolioCardContent />
            </div>
          </div>
        </div>

        {/* Section Footer Link */}
        <div style={{ display: "flex", justifyContent: "center" }}>
          <Link href="/projects" className="btn-tactile-secondary" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}>
            <span>VIEW ALL PROJECTS</span>
            <ArrowRight size={14} />
          </Link>
        </div>
      </div>

      <style>{`
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
