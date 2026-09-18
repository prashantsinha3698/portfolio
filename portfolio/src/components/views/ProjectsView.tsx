import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import StatusBadge from "@/components/ui/StatusBadge";
import TechTag from "@/components/ui/TechTag";
import FolderTab from "@/components/ui/FolderTab";
import { ArrowRight, ExternalLink, FileText } from "lucide-react";
import { GitHubIcon } from "@/components/ui/SocialIcons";
import { getTranslation, Locale } from "@/locales";

interface ProjectsViewProps {
  locale: Locale;
}

export default function ProjectsView({ locale }: ProjectsViewProps) {
  const t = getTranslation(locale);
  const p = t.projectsPage;
  const isDe = locale === "de";

  const onyxflowUrl = isDe ? "/de/projects/onyxflow" : "/projects/onyxflow";
  const quantfolioUrl = isDe ? "/de/projects/quantfolio" : "/projects/quantfolio";

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column", background: "var(--bg-canvas)", color: "var(--ink-primary)" }}>
      <Navigation locale={locale} />

      <main style={{ flex: 1, width: "100%", maxWidth: "100%", padding: "3rem clamp(1.25rem, 4vw, 4.5rem) 6rem" }}>
        <PageHeader
          sectionNumber={p.headerNumber}
          category={p.headerCategory}
          title={p.headerTitle}
          description={p.headerDescription}
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
            {p.compareTag}
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
            {p.compareHeading}
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
            {p.compareParagraph}
          </p>

          <div
            className="font-mono projects-compare-grid"
            style={{
              border: "1px solid var(--border-subtle)",
              background: "var(--bg-surface-subtle)",
            }}
          >
            <div className="projects-compare-col-1">
              <div style={{ fontSize: "0.74rem", color: "var(--accent-primary)", fontWeight: 700, letterSpacing: "0.05em" }}>
                {p.compareOnyxflowTitle}
              </div>
              <div className="font-display" style={{ fontSize: "1.2rem", fontWeight: 400, letterSpacing: "0.03em", color: "var(--ink-primary)", margin: "0.35rem 0" }}>
                {p.compareOnyxflowSubtitle}
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.4rem", fontSize: "0.82rem", color: "var(--ink-secondary)", marginTop: "0.5rem" }}>
                {p.compareOnyxflowBullets.map((bullet, idx) => (
                  <li key={idx}>• {bullet}</li>
                ))}
              </ul>
            </div>

            <div className="projects-compare-col-2">
              <div style={{ fontSize: "0.74rem", color: "var(--accent-primary)", fontWeight: 700, letterSpacing: "0.05em" }}>
                {p.compareQuantfolioTitle}
              </div>
              <div className="font-display" style={{ fontSize: "1.2rem", fontWeight: 400, letterSpacing: "0.03em", color: "var(--ink-primary)", margin: "0.35rem 0" }}>
                {p.compareQuantfolioSubtitle}
              </div>
              <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.4rem", fontSize: "0.82rem", color: "var(--ink-secondary)", marginTop: "0.5rem" }}>
                {p.compareQuantfolioBullets.map((bullet, idx) => (
                  <li key={idx}>• {bullet}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Project Rows */}
        <div style={{ display: "flex", flexDirection: "column", gap: "3.5rem", marginBottom: "4rem" }}>
          
          {/* ROW 01: ONYXFLOW */}
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
                border: "1px solid var(--border-primary)",
                background: "var(--bg-surface)",
                boxShadow: "var(--shadow-tactile)",
                padding: "2rem 2.25rem",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", marginBottom: "1rem" }}>
                <div>
                  <div className="font-mono" style={{ fontSize: "0.74rem", color: "var(--accent-primary)", fontWeight: 700, marginBottom: "0.25rem" }}>
                    01 // {isDe ? "EIGENES PROJEKT" : "PERSONAL PROJECT"}
                  </div>
                  <h3 className="font-display" style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 400, color: "var(--ink-primary)", letterSpacing: "0.02em" }}>
                    OnyxFlow
                  </h3>
                  <div className="font-mono" style={{ fontSize: "0.88rem", color: "var(--ink-secondary)", fontWeight: 500, marginTop: "0.2rem" }}>
                    {p.card1Tagline}
                  </div>
                </div>

                <StatusBadge status={isDe ? "Eigenes Projekt" : "Personal Project"} />
              </div>

              <p style={{ fontFamily: "var(--font-ibm-plex-sans), sans-serif", fontSize: "0.95rem", color: "var(--ink-secondary)", lineHeight: 1.68, maxWidth: "800px", marginBottom: "1rem" }}>
                {p.card1Desc}
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
                {isDe
                  ? "Entwicklung: Konzipiert und iterativ entwickelt unter Zuhilfenahme von KI-Programmierwerkzeugen (Codex, Claude Code)."
                  : "Development: Designed and iterated with AI coding assistance using Codex and Claude Code."}
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.75rem" }}>
                <TechTag label="Python 3.11" />
                <TechTag label="SQLite WAL" />
                <TechTag label="TA-Lib" />
                <TechTag label="Flask SSE" />
                <TechTag label="WebSockets" />
                <TechTag label="REST APIs" />
              </div>

              <div className="btn-group project-btn-group btn-group-2" style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "1.25rem" }}>
                <Link href={onyxflowUrl} className="btn-tactile-primary">
                  <FileText size={14} />
                  <span>{isDe ? "DETAILS" : "DETAILS"}</span>
                  <ArrowRight size={14} />
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
          </div>

          {/* ROW 02: QUANTFOLIO */}
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
                border: "1px solid var(--border-primary)",
                background: "var(--bg-surface)",
                boxShadow: "var(--shadow-tactile)",
                padding: "2rem 2.25rem",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", marginBottom: "1rem" }}>
                <div>
                  <div className="font-mono" style={{ fontSize: "0.74rem", color: "var(--accent-primary)", fontWeight: 700, marginBottom: "0.25rem" }}>
                    02 // {isDe ? "EIGENES PROJEKT" : "PERSONAL PROJECT"}
                  </div>
                  <h3 className="font-display" style={{ fontSize: "clamp(1.8rem, 3vw, 2.4rem)", fontWeight: 400, color: "var(--ink-primary)", letterSpacing: "0.02em" }}>
                    Quantfolio
                  </h3>
                  <div className="font-mono" style={{ fontSize: "0.88rem", color: "var(--ink-secondary)", fontWeight: 500, marginTop: "0.2rem" }}>
                    {p.card2Tagline}
                  </div>
                </div>

                <StatusBadge status={isDe ? "Eigenes Projekt" : "Personal Project"} />
              </div>

              <p style={{ fontFamily: "var(--font-ibm-plex-sans), sans-serif", fontSize: "0.95rem", color: "var(--ink-secondary)", lineHeight: 1.68, maxWidth: "800px", marginBottom: "1rem" }}>
                {p.card2Desc}
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
                {isDe
                  ? "Entwicklung: Konzipiert und iterativ entwickelt unter Zuhilfenahme von KI-Programmierwerkzeugen (Codex, Claude Code)."
                  : "Development: Designed and iterated with AI coding assistance using Claude Code."}
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem", marginBottom: "1.75rem" }}>
                <TechTag label="Python" />
                <TechTag label="FastAPI" />
                <TechTag label="SciPy" />
                <TechTag label="React" />
                <TechTag label="Plotly" />
                <TechTag label="NumPy" />
                <TechTag label="Apache Parquet" />
              </div>

              <div className="btn-group project-btn-group btn-group-3" style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "1.25rem" }}>
                <Link href={quantfolioUrl} className="btn-tactile-primary">
                  <FileText size={14} />
                  <span>{isDe ? "DETAILS" : "DETAILS"}</span>
                  <ArrowRight size={14} />
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
          </div>
        </div>
      </main>

      <Footer locale={locale} />

      <style suppressHydrationWarning>{`
        .projects-compare-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
        }
        .projects-compare-col-1 {
          padding: 1.25rem 1.5rem;
          border-right: 1px solid var(--border-subtle);
        }
        .projects-compare-col-2 {
          padding: 1.25rem 1.5rem;
        }
        @media (max-width: 640px) {
          .projects-compare-grid {
            grid-template-columns: 1fr !important;
          }
          .projects-compare-col-1 {
            border-right: none !important;
            border-bottom: 1px solid var(--border-subtle) !important;
          }
        }
      `}</style>
    </div>
  );
}
