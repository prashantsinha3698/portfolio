import type { Metadata } from "next";
import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import StatusBadge from "@/components/ui/StatusBadge";
import TechTag from "@/components/ui/TechTag";
import FolderTab from "@/components/ui/FolderTab";
import { ArrowRight, ExternalLink, FileText } from "lucide-react";
import { GitHubIcon } from "@/components/ui/SocialIcons";

export const metadata: Metadata = {
  title: "Projects",
  description: "Personal software projects built by Prashant Sinha to explore market data, numerical optimization, and system architecture.",
};

export default function ProjectsPage() {
  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg-canvas)", color: "var(--ink-primary)" }}>
      <Navigation />

      <main style={{ flex: 1, width: "100%", maxWidth: "100%", padding: "3rem clamp(1.25rem, 4vw, 4.5rem) 6rem" }}>
        <PageHeader
          sectionNumber="01"
          category="PERSONAL SOFTWARE BUILDS"
          title="Projects"
          description="Personal software projects built to explore market data, numerical optimization, and system architecture beyond daily client work."
        />

        {/* Project Comparison Overview */}
        <div
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border-primary)",
            boxShadow: "var(--shadow-tactile)",
            padding: "2rem",
            marginBottom: "3.5rem",
          }}
        >
          <div
            className="font-mono"
            style={{
              fontSize: "0.74rem",
              color: "var(--accent-primary)",
              fontWeight: 700,
              letterSpacing: "0.06em",
              marginBottom: "0.5rem",
            }}
          >
            PROJECT COMPARISON
          </div>

          <h2
            className="font-display"
            style={{
              fontSize: "clamp(1.5rem, 2.5vw, 1.95rem)",
              fontWeight: 400,
              color: "var(--ink-primary)",
              letterSpacing: "0.02em",
              marginBottom: "1rem",
            }}
          >
            Execution and Risk vs Portfolio Analytics
          </h2>

          <p
            style={{
              fontFamily: "var(--font-ibm-plex-sans), sans-serif",
              fontSize: "0.95rem",
              color: "var(--ink-secondary)",
              lineHeight: 1.68,
              maxWidth: "840px",
              marginBottom: "1.75rem",
            }}
          >
            These two personal projects explore different sides of software and data. OnyxFlow is an execution and risk engine focused on market feeds, trade state, and recovery. Quantfolio is an analytical tool built to calculate risk metrics and solve portfolio weight optimization.
          </p>

          <div
            className="font-mono projects-compare-grid"
            style={{
              border: "1px solid var(--border-subtle)",
              background: "var(--bg-surface-subtle)",
            }}
          >
            <div className="projects-compare-col-1">
              <div style={{ fontSize: "0.74rem", color: "var(--accent-primary)", fontWeight: 700, letterSpacing: "0.05em" }}>PROJECT 01: ONYXFLOW</div>
              <div className="font-display" style={{ fontSize: "1.2rem", fontWeight: 400, letterSpacing: "0.03em", color: "var(--ink-primary)", margin: "0.35rem 0" }}>Market Data and Risk</div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.4rem", fontSize: "0.82rem", color: "var(--ink-secondary)", marginTop: "0.5rem" }}>
                <li>• Real time market data processing via WebSockets</li>
                <li>• Vectorized technical signal calculation cache</li>
                <li>• Local SQLite database with Write-Ahead Logging</li>
                <li>• Automatic state reconciliation on process restarts</li>
              </ul>
            </div>

            <div className="projects-compare-col-2">
              <div style={{ fontSize: "0.74rem", color: "var(--accent-primary)", fontWeight: 700, letterSpacing: "0.05em" }}>PROJECT 02: QUANTFOLIO</div>
              <div className="font-display" style={{ fontSize: "1.2rem", fontWeight: 400, letterSpacing: "0.03em", color: "var(--ink-primary)", margin: "0.35rem 0" }}>Portfolio Optimization</div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.4rem", fontSize: "0.82rem", color: "var(--ink-secondary)", marginTop: "0.5rem" }}>
                <li>• Markowitz mean-variance optimization model</li>
                <li>• SciPy numerical solver for weight allocations</li>
                <li>• Unit test suite with 22 automated math checks</li>
                <li>• Interactive React interface to inspect risk curves</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Project Rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: "3.5rem", marginBottom: "4rem" }}>
          
          {/* ROW 01: ONYXFLOW */}
          <div className="scroll-reveal" style={{ position: "relative" }}>
            {/* Tactile Folder Tab */}
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <FolderTab
                active={true}
                number="01"
                title="ONYXFLOW.SYS"
              />
            </div>

            <div
              style={{
                border: "1px solid var(--border-primary)",
                background: "var(--bg-surface)",
                boxShadow: "var(--shadow-tactile)",
                padding: "2rem 2.25rem",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", marginBottom: "1rem" }}>
                <div>
                  <div className="font-mono" style={{ fontSize: "0.74rem", color: "var(--accent-primary)", fontWeight: 700, marginBottom: "0.25rem" }}>
                    01 // PERSONAL PROJECT
                  </div>
                  <h3 className="font-display" style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 400, color: "var(--ink-primary)", letterSpacing: "0.02em" }}>
                    OnyxFlow
                  </h3>
                  <div className="font-mono" style={{ fontSize: "0.88rem", color: "var(--ink-secondary)", fontWeight: 500, marginTop: "0.2rem" }}>
                    Algorithmic trading and risk engine exploration
                  </div>
                </div>

                <StatusBadge status="Personal Project" />
              </div>

              <p style={{ fontFamily: "var(--font-ibm-plex-sans), sans-serif", fontSize: "0.95rem", color: "var(--ink-secondary)", lineHeight: 1.68, maxWidth: "800px", marginBottom: "1rem" }}>
                I built OnyxFlow to explore how a small trading system could handle live market data feeds, indicator calculations, risk controls and process recovery without becoming fragile. It connects to exchange WebSocket feeds, parses candle intervals, calculates technical signals, and records execution states in a local database.
              </p>

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

              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.75rem" }}>
                <TechTag label="Python 3.11" />
                <TechTag label="SQLite WAL" />
                <TechTag label="TA-Lib" />
                <TechTag label="Flask SSE" />
                <TechTag label="WebSockets" />
                <TechTag label="REST APIs" />
              </div>

              <div className="btn-group btn-group-2" style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "1.25rem" }}>
                <Link href="/projects/onyxflow" className="btn-tactile-primary">
                  <FileText size={14} />
                  <span>VIEW PROJECT DETAILS</span>
                  <ArrowRight size={14} />
                </Link>

                <a
                  href="https://github.com/prashantsinha3698"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-tactile-secondary"
                >
                  <GitHubIcon size={14} />
                  <span>GITHUB REPOSITORY</span>
                </a>
              </div>
            </div>
          </div>

          {/* ROW 02: QUANTFOLIO */}
          <div className="scroll-reveal" style={{ position: "relative" }}>
            {/* Tactile Folder Tab */}
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <FolderTab
                active={true}
                number="02"
                title="QUANTFOLIO.APP"
              />
            </div>

            <div
              style={{
                border: "1px solid var(--border-primary)",
                background: "var(--bg-surface)",
                boxShadow: "var(--shadow-tactile)",
                padding: "2rem 2.25rem",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", marginBottom: "1rem" }}>
                <div>
                  <div className="font-mono" style={{ fontSize: "0.74rem", color: "var(--accent-primary)", fontWeight: 700, marginBottom: "0.25rem" }}>
                    02 // PERSONAL PROJECT
                  </div>
                  <h3 className="font-display" style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 400, color: "var(--ink-primary)", letterSpacing: "0.02em" }}>
                    Quantfolio
                  </h3>
                  <div className="font-mono" style={{ fontSize: "0.88rem", color: "var(--ink-secondary)", fontWeight: 500, marginTop: "0.2rem" }}>
                    Portfolio analytics and optimization tool
                  </div>
                </div>

                <StatusBadge status="Personal Project" />
              </div>

              <p style={{ fontFamily: "var(--font-ibm-plex-sans), sans-serif", fontSize: "0.95rem", color: "var(--ink-secondary)", lineHeight: 1.68, maxWidth: "800px", marginBottom: "1rem" }}>
                A personal project I built to understand portfolio risk, optimization and rebalancing. It ingests historical price data, calculates risk-return profiles, runs optimization using SciPy to find efficient frontiers, and provides an interactive web interface to inspect asset weights.
              </p>

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
                Development: Designed and iterated with AI coding assistance using Claude Code.
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.75rem" }}>
                <TechTag label="Python" />
                <TechTag label="FastAPI" />
                <TechTag label="React" />
                <TechTag label="SciPy Optimize" />
                <TechTag label="Pandas" />
                <TechTag label="Tailwind CSS" />
              </div>

              <div className="btn-group btn-group-3" style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "1.25rem" }}>
                <Link href="/projects/quantfolio" className="btn-tactile-primary">
                  <FileText size={14} />
                  <span>VIEW PROJECT DETAILS</span>
                  <ArrowRight size={14} />
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
                  <span>GITHUB REPO</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Secondary / Archived Experiments Section */}
        <div style={{ borderTop: "1px solid var(--border-primary)", paddingTop: "2.5rem" }}>
          <div className="font-mono" style={{ fontSize: "0.74rem", color: "var(--ink-muted)", letterSpacing: "0.06em", marginBottom: "0.75rem" }}>
            EARLY & ARCHIVED LEARNING EXPERIMENTS
          </div>

          <div
            style={{
              border: "1px solid var(--border-subtle)",
              background: "var(--bg-surface)",
              padding: "1.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              flexWrap: "wrap",
              gap: "1rem",
            }}
          >
            <div>
              <div style={{ fontFamily: "var(--font-space-grotesk), sans-serif", fontSize: "1.1rem", fontWeight: 700, color: "var(--ink-primary)" }}>
                COVID-19 Tracker Web App
              </div>
              <p style={{ fontFamily: "var(--font-ibm-plex-sans), sans-serif", fontSize: "0.85rem", color: "var(--ink-secondary)", marginTop: "0.25rem", maxWidth: "600px" }}>
                An early academic experiment built with React, Leaflet maps, and public REST APIs to track global statistics and regional charts.
              </p>
            </div>

            <div style={{ display: "flex", gap: "0.75rem" }}>
              <a
                href="https://github.com/prashantsinha3698/covid-19-tracker"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-tactile-secondary"
                style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem", fontSize: "0.78rem" }}
              >
                <GitHubIcon size={13} />
                <span>SOURCE CODE</span>
              </a>
            </div>
          </div>
        </div>
      </main>

      <style>{`
        .projects-compare-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        .projects-compare-col-1 {
          padding: 1.5rem;
          border-right: 1px solid var(--border-subtle);
        }
        .projects-compare-col-2 {
          padding: 1.5rem;
        }
        @media (max-width: 768px) {
          .projects-compare-grid {
            grid-template-columns: 1fr !important;
          }
          .projects-compare-col-1 {
            border-right: none !important;
            border-bottom: 1px solid var(--border-subtle) !important;
            padding: 1.25rem 1rem !important;
          }
          .projects-compare-col-2 {
            padding: 1.25rem 1rem !important;
          }
        }
      `}</style>

      <Footer />
    </div>
  );
}
