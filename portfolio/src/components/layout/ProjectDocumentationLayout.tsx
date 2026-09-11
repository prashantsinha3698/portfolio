"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import SectionLabel from "@/components/ui/SectionLabel";
import StatusBadge from "@/components/ui/StatusBadge";
import TechTag from "@/components/ui/TechTag";
import { ArrowLeft, ArrowRight, ChevronDown, ChevronUp } from "lucide-react";

export interface ProjectChapter {
  id: string;
  label: string;
}

export interface ProjectMetric {
  value: string;
  label: string;
  detail: string;
}

export interface ProjectDocumentationLayoutProps {
  projectNumber: string;
  title: string;
  tagline: string;
  description: string;
  status: string;
  developmentNote: string;
  technologies: string[];
  actions?: React.ReactNode;
  metrics?: ProjectMetric[];
  chapters: ProjectChapter[];
  prevProject?: { label: string; href: string };
  nextProject?: { label: string; href: string };
  children: React.ReactNode;
}

export default function ProjectDocumentationLayout({
  projectNumber,
  title,
  tagline,
  description,
  status,
  developmentNote,
  technologies,
  actions,
  metrics,
  chapters,
  prevProject,
  nextProject,
  children,
}: ProjectDocumentationLayoutProps) {
  const [activeChapter, setActiveChapter] = useState<string>(chapters[0]?.id || "");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [scrollY, setScrollY] = useState<number>(0);

  // Parallax scroll listener
  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // IntersectionObserver to sync active chapter with natural scroll position
  useEffect(() => {
    const handleIntersect = (entries: IntersectionObserverEntry[]) => {
      const visibleEntries = entries.filter((entry) => entry.isIntersecting);
      if (visibleEntries.length > 0) {
        visibleEntries.sort((a, b) => Math.abs(a.boundingClientRect.top) - Math.abs(b.boundingClientRect.top));
        setActiveChapter(visibleEntries[0].target.id);
      }
    };

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: "-20% 0px -65% 0px",
      threshold: 0,
    });

    chapters.forEach((ch) => {
      const el = document.getElementById(ch.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [chapters]);

  const scrollToChapter = (id: string) => {
    setActiveChapter(id);
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -85;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  const currentChapterObj = chapters.find((c) => c.id === activeChapter) || chapters[0];

  return (
    <div style={{ minHeight: "100vh", width: "100%", display: "flex", flexDirection: "column", background: "var(--bg-canvas)", color: "var(--ink-primary)" }}>
      <Navigation />

      <main id="main-content" style={{ flex: 1, width: "100%", paddingBottom: "6rem" }}>
        {/* Full Width Top Band with Parallax Depth */}
        <div
          className="project-hero-band"
          style={{
            borderBottom: "1px solid var(--border-subtle)",
            background: "var(--bg-surface-subtle)",
            padding: "3rem 0 3.5rem",
            position: "relative",
            overflow: "hidden",
            width: "100%",
          }}
        >
          {/* Subtle Parallax Background Layer */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              top: "-50px",
              left: 0,
              right: 0,
              bottom: "-50px",
              backgroundImage: "radial-gradient(var(--border-subtle) 1px, transparent 1px)",
              backgroundSize: "32px 32px",
              opacity: 0.5,
              transform: `translateY(${scrollY * 0.18}px)`,
              pointerEvents: "none",
              willChange: "transform",
            }}
          />

          <div style={{ width: "100%", paddingInline: "clamp(1.25rem, 4vw, 4.5rem)", position: "relative", zIndex: 2 }}>
            {/* Breadcrumb */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", fontFamily: "var(--font-mono)", fontSize: "0.8rem", color: "var(--ink-muted)", marginBottom: "1.5rem" }}>
              <Link href="/projects" style={{ color: "var(--ink-secondary)", textDecoration: "none" }}>
                Projects
              </Link>
              <span>/</span>
              <span style={{ color: "var(--accent-primary)", fontWeight: 700 }}>{title}</span>
            </div>

            {/* Project Title Card */}
            <div
              style={{
                border: "1px solid var(--border-primary)",
                background: "var(--bg-surface)",
                padding: "2.75rem 2.5rem",
                boxShadow: "var(--shadow-tactile)",
                width: "100%",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", marginBottom: "1rem" }}>
                <SectionLabel number={projectNumber} label="PERSONAL PROJECT" />
                <StatusBadge status={status} />
              </div>

              <h1
                style={{
                  fontFamily: "var(--font-display)",
                  fontSize: "clamp(2.6rem, 6vw, 4.25rem)",
                  fontWeight: 700,
                  letterSpacing: "-0.04em",
                  lineHeight: 1.05,
                  marginBottom: "0.75rem",
                  color: "var(--ink-primary)",
                }}
              >
                {title}
              </h1>

              <div className="font-mono" style={{ fontSize: "1.1rem", color: "var(--accent-primary)", fontWeight: 700, marginBottom: "1.25rem" }}>
                {tagline}
              </div>

              <p style={{ fontFamily: "var(--font-sans)", fontSize: "1.05rem", color: "var(--ink-secondary)", maxWidth: 960, lineHeight: 1.7, marginBottom: "1.5rem" }}>
                {description}
              </p>

              {/* AI Development Disclosure Note */}
              <div
                className="font-mono"
                style={{
                  fontSize: "0.82rem",
                  color: "var(--ink-muted)",
                  marginBottom: "1.75rem",
                  padding: "0.9rem 1.25rem",
                  background: "var(--bg-surface-subtle)",
                  border: "1px solid var(--border-subtle)",
                  lineHeight: 1.6,
                  maxWidth: 960,
                }}
              >
                {developmentNote}
              </div>

              {/* Technologies Used In This Project */}
              <div style={{ marginBottom: "1.75rem" }}>
                <div className="font-mono" style={{ fontSize: "0.74rem", color: "var(--ink-muted)", marginBottom: "0.5rem", fontWeight: 700, letterSpacing: "0.06em" }}>
                  TECHNOLOGIES USED IN THIS PROJECT:
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {technologies.map((tech) => (
                    <TechTag key={tech} label={tech} />
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              {actions && (
                <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", alignItems: "center", paddingTop: "1.5rem", borderTop: "1px solid var(--border-subtle)" }}>
                  {actions}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Optional Metrics Highlight Band */}
        {metrics && metrics.length > 0 && (
          <div style={{ width: "100%", paddingInline: "clamp(1.25rem, 4vw, 4.5rem)", marginTop: "3rem" }}>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                gap: "1.5rem",
                marginBottom: "3rem",
                width: "100%",
              }}
            >
              {metrics.map((item, idx) => (
                <div
                  key={idx}
                  style={{
                    border: "1px solid var(--border-primary)",
                    background: "var(--bg-surface)",
                    padding: "1.5rem 1.75rem",
                    boxShadow: "var(--shadow-tactile-sm)",
                  }}
                >
                  <div style={{ fontFamily: "var(--font-display)", fontSize: "2rem", fontWeight: 700, color: "var(--accent-primary)", letterSpacing: "-0.03em", lineHeight: 1.1, marginBottom: "0.25rem" }}>
                    {item.value}
                  </div>
                  <div className="font-mono" style={{ fontSize: "0.74rem", fontWeight: 700, letterSpacing: "0.06em", color: "var(--ink-primary)", textTransform: "uppercase", marginBottom: "0.35rem" }}>
                    {item.label}
                  </div>
                  <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--ink-muted)", lineHeight: 1.5 }}>
                    {item.detail}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Mobile Sticky Chapter Selector Header (<768px) */}
        <div className="doc-mobile-chapter-bar">
          <div style={{ paddingInline: "clamp(1.25rem, 4vw, 4.5rem)", width: "100%" }}>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-expanded={mobileMenuOpen}
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.9rem 1.25rem",
                background: "var(--bg-surface)",
                border: "1px solid var(--border-primary)",
                boxShadow: "var(--shadow-tactile-sm)",
                fontFamily: "var(--font-mono)",
                fontSize: "0.84rem",
                fontWeight: 700,
                color: "var(--ink-primary)",
                cursor: "pointer",
              }}
            >
              <span style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <span style={{ color: "var(--accent-primary)" }}>SECTION:</span>
                <span>{currentChapterObj.label}</span>
              </span>
              {mobileMenuOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            {/* Mobile Dropdown List */}
            {mobileMenuOpen && (
              <div
                style={{
                  marginTop: "0.35rem",
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border-primary)",
                  boxShadow: "var(--shadow-tactile)",
                  display: "flex",
                  flexDirection: "column",
                  padding: "0.5rem 0",
                  maxHeight: "60vh",
                  overflowY: "auto",
                }}
              >
                {chapters.map((ch) => (
                  <button
                    key={ch.id}
                    onClick={() => scrollToChapter(ch.id)}
                    style={{
                      textAlign: "left",
                      padding: "0.75rem 1.25rem",
                      fontFamily: "var(--font-mono)",
                      fontSize: "0.84rem",
                      fontWeight: activeChapter === ch.id ? 700 : 500,
                      background: activeChapter === ch.id ? "var(--bg-surface-subtle)" : "transparent",
                      color: activeChapter === ch.id ? "var(--accent-primary)" : "var(--ink-secondary)",
                      borderLeft: activeChapter === ch.id ? "3px solid var(--accent-primary)" : "3px solid transparent",
                      cursor: "pointer",
                    }}
                  >
                    {ch.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Main Documentation Shell: 2-Column Full Width Desktop Grid */}
        <div style={{ width: "100%", paddingInline: "clamp(1.25rem, 4vw, 4.5rem)", marginTop: "3rem" }}>
          <div className="doc-layout-grid">
            {/* Left Column: Persistent Static Sticky Chapter Rail */}
            <aside className="doc-sidebar">
              <div
                className="font-mono doc-sidebar-inner"
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border-primary)",
                  boxShadow: "var(--shadow-tactile-sm)",
                  padding: "1.25rem",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.35rem",
                }}
              >
                <div style={{ fontSize: "0.74rem", color: "var(--ink-muted)", letterSpacing: "0.08em", marginBottom: "0.6rem", fontWeight: 700 }}>
                  DOCUMENT CHAPTERS
                </div>
                {chapters.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => scrollToChapter(s.id)}
                    style={{
                      textAlign: "left",
                      padding: "0.6rem 0.75rem",
                      fontSize: "0.8rem",
                      fontWeight: activeChapter === s.id ? 700 : 500,
                      background: activeChapter === s.id ? "var(--bg-surface-subtle)" : "transparent",
                      color: activeChapter === s.id ? "var(--accent-primary)" : "var(--ink-secondary)",
                      borderLeft: activeChapter === s.id ? "3px solid var(--accent-primary)" : "3px solid transparent",
                      cursor: "pointer",
                      transition: "all var(--motion-fast)",
                    }}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </aside>

            {/* Right Column: Article Long-Form Content */}
            <article className="doc-article">
              {children}

              {/* Bottom Traversal Project Navigation */}
              <div
                style={{
                  borderTop: "1px solid var(--border-primary)",
                  marginTop: "5rem",
                  paddingTop: "2.5rem",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "1.5rem",
                }}
              >
                {prevProject ? (
                  <Link
                    href={prevProject.href}
                    className="btn-tactile-secondary font-mono"
                    style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
                  >
                    <ArrowLeft size={15} /> <span>PREVIOUS: {prevProject.label}</span>
                  </Link>
                ) : (
                  <div />
                )}

                <Link
                  href="/projects"
                  className="font-mono"
                  style={{ fontSize: "0.84rem", color: "var(--ink-secondary)", textDecoration: "underline" }}
                >
                  All Projects Index
                </Link>

                {nextProject ? (
                  <Link
                    href={nextProject.href}
                    className="btn-tactile-primary font-mono"
                    style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
                  >
                    <span>NEXT: {nextProject.label}</span> <ArrowRight size={15} />
                  </Link>
                ) : (
                  <div />
                )}
              </div>
            </article>
          </div>
        </div>
      </main>

      <Footer />

      <style>{`
        .doc-layout-grid {
          display: grid;
          grid-template-columns: 280px minmax(0, 1fr);
          gap: 3.5rem;
          align-items: start;
          width: 100%;
        }

        /* Static sticky sidebar while reading long article */
        .doc-sidebar {
          position: -webkit-sticky;
          position: sticky;
          top: 5rem;
          align-self: flex-start;
          height: fit-content;
          max-height: calc(100vh - 6.5rem);
          overflow-y: auto;
          z-index: 40;
        }

        .doc-article {
          width: 100%;
          min-width: 0;
        }

        .doc-mobile-chapter-bar {
          display: none;
        }

        @media (max-width: 1100px) {
          .doc-layout-grid {
            grid-template-columns: 230px minmax(0, 1fr);
            gap: 2.25rem;
          }
        }

        @media (max-width: 768px) {
          .doc-layout-grid {
            display: block !important;
          }

          .doc-sidebar {
            display: none !important;
          }

          .doc-mobile-chapter-bar {
            display: block !important;
            position: sticky;
            top: 60px;
            z-index: 35;
            padding: 0.75rem 0;
            background: var(--bg-canvas);
          }

          .doc-article {
            max-width: 100% !important;
            margin-top: 1rem;
          }
        }
      `}</style>
    </div>
  );
}
