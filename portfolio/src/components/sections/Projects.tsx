"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown, ExternalLink, FileText, Code2, AlertCircle } from "lucide-react";
import { onyxflowProject, secondaryProjects } from "@/data/projects";

export default function Projects() {
  const sectionRef = useRef<HTMLElement>(null);
  const [openLevel, setOpenLevel] = useState<number | null>(1); // Level 1 open by default

  useEffect(() => {
    const els = sectionRef.current?.querySelectorAll<HTMLElement>(".reveal");
    if (!els) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.15 }
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const toggleLevel = (lvl: number) => {
    setOpenLevel(openLevel === lvl ? null : lvl);
  };

  return (
    <section
      id="projects"
      ref={sectionRef}
      style={{
        padding: "5.5rem 0 6rem",
        borderTop: "var(--border-thin)",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div
          className="reveal"
          style={{
            marginBottom: "3.5rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div>
            <div
              className="font-mono"
              style={{
                fontSize: "0.75rem",
                color: "var(--accent-primary)",
                fontWeight: 600,
                letterSpacing: "0.1em",
                marginBottom: "0.5rem",
              }}
            >
              04 // INDEPENDENT PROJECTS
            </div>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(2rem, 4.5vw, 2.75rem)",
                color: "var(--ink-primary)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              Independent Systems & Software
            </h2>
          </div>

          <div
            className="font-mono"
            style={{
              fontSize: "0.8rem",
              color: "var(--ink-muted)",
              maxWidth: "400px",
              lineHeight: 1.5,
            }}
          >
            Engineering projects built from the ground up, with complete ownership of architecture and quality.
          </div>
        </div>

        {/* PRIMARY CENTERPIECE: ONYXFLOW */}
        <div
          className="reveal"
          style={{
            background: "var(--surface)",
            border: "var(--border-medium)",
            boxShadow: "6px 6px 0 var(--border)",
            marginBottom: "4.5rem",
          }}
        >
          {/* Project Banner / Spec Header */}
          <div
            className="onyxflow-banner-header"
            style={{
              padding: "2rem 2.25rem",
              borderBottom: "var(--border-thin)",
              background: "var(--surface-alt)",
            }}
          >
            <div
              className="font-mono"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "1rem",
                fontSize: "0.75rem",
                color: "var(--ink-muted)",
                marginBottom: "1rem",
                letterSpacing: "0.06em",
              }}
            >
              <span>{onyxflowProject.category}</span>
              <span
                style={{
                  padding: "0.25rem 0.6rem",
                  background: "var(--accent-primary)",
                  color: "#FFFFFF",
                  fontWeight: 700,
                  fontSize: "0.68rem",
                }}
              >
                {onyxflowProject.status}
              </span>
            </div>

            <h3
              className="font-display"
              style={{
                fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
                color: "var(--ink-primary)",
                letterSpacing: "-0.03em",
                lineHeight: 1,
                marginBottom: "0.5rem",
              }}
            >
              {onyxflowProject.title}
            </h3>

            <div
              className="font-mono"
              style={{
                fontSize: "1rem",
                color: "var(--accent-primary)",
                fontWeight: 600,
                marginBottom: "1.25rem",
              }}
            >
              {onyxflowProject.tagline}
            </div>

            <p
              style={{
                fontSize: "1.05rem",
                color: "var(--ink-secondary)",
                lineHeight: 1.7,
                maxWidth: "780px",
                marginBottom: "1.5rem",
              }}
            >
              {onyxflowProject.summary}
            </p>

            {/* Tech Stack Pills */}
            <div
              className="font-mono"
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "0.5rem",
                marginBottom: "1.75rem",
              }}
            >
              {onyxflowProject.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    fontSize: "0.75rem",
                    padding: "0.3rem 0.6rem",
                    background: "var(--surface)",
                    border: "var(--border-thin)",
                    color: "var(--ink-primary)",
                    fontWeight: 500,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Key Metrics / Execution Standards */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1rem",
                borderTop: "1px solid var(--border-light)",
                paddingTop: "1.25rem",
              }}
              className="onyxflow-metrics"
            >
              {onyxflowProject.primaryMetrics?.map((m) => (
                <div key={m.label}>
                  <div
                    className="font-display"
                    style={{
                      fontSize: "1.6rem",
                      fontWeight: 700,
                      color: "var(--ink-primary)",
                      letterSpacing: "-0.02em",
                      lineHeight: 1.1,
                      marginBottom: "0.25rem",
                    }}
                  >
                    {m.value}
                  </div>
                  <div
                    className="font-mono"
                    style={{
                      fontSize: "0.7rem",
                      color: "var(--accent-primary)",
                      fontWeight: 600,
                      letterSpacing: "0.04em",
                      marginBottom: "0.25rem",
                    }}
                  >
                    {m.label}
                  </div>
                  <div
                    style={{
                      fontSize: "0.78rem",
                      color: "var(--ink-muted)",
                      lineHeight: 1.4,
                    }}
                  >
                    {m.note}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Progressive Disclosure Section: 7 Deep Technical Levels */}
          <div className="onyxflow-specs-container" style={{ padding: "1.5rem 2.25rem" }}>
            <div
              className="font-mono"
              style={{
                fontSize: "0.75rem",
                color: "var(--ink-muted)",
                letterSpacing: "0.08em",
                marginBottom: "1rem",
                fontWeight: 600,
              }}
            >
              PROGRESSIVE TECHNICAL SPECIFICATIONS [CLICK LEVEL TO EXPAND]
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
              {onyxflowProject.levels.map((lvl) => {
                const isOpen = openLevel === lvl.level;
                return (
                  <div
                    key={lvl.level}
                    style={{
                      border: "var(--border-thin)",
                      background: isOpen ? "var(--surface-alt)" : "var(--surface)",
                      transition: "background var(--motion-fast)",
                    }}
                  >
                    {/* Header Button */}
                    <button
                      onClick={() => toggleLevel(lvl.level)}
                      aria-expanded={isOpen}
                      style={{
                        width: "100%",
                        padding: "1rem 1.25rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        textAlign: "left",
                        gap: "1rem",
                        background: "none",
                      }}
                    >
                      <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", flexWrap: "wrap" }}>
                        <span
                          className="font-mono"
                          style={{
                            fontSize: "0.75rem",
                            fontWeight: 700,
                            padding: "0.2rem 0.5rem",
                            background: isOpen ? "var(--ink-primary)" : "var(--border-light)",
                            color: isOpen ? "var(--background)" : "var(--ink-primary)",
                          }}
                        >
                          LEVEL 0{lvl.level}
                        </span>
                        <span
                          className="font-mono"
                          style={{
                            fontSize: "0.85rem",
                            fontWeight: 700,
                            color: "var(--ink-primary)",
                            letterSpacing: "0.02em",
                          }}
                        >
                          {lvl.title}
                        </span>
                        <span
                          style={{
                            fontSize: "0.8rem",
                            color: "var(--ink-muted)",
                          }}
                        >
                          {lvl.subtitle}
                        </span>
                      </div>

                      <ChevronDown
                        size={18}
                        style={{
                          transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                          transition: "transform var(--motion-normal) var(--ease-out)",
                          color: "var(--ink-primary)",
                          flexShrink: 0,
                        }}
                      />
                    </button>

                    {/* Content Drawer */}
                    {isOpen && (
                      <div
                        style={{
                          padding: "0 1.25rem 1.5rem",
                          borderTop: "1px solid var(--border-light)",
                          paddingTop: "1.25rem",
                        }}
                      >
                        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", marginBottom: "1.25rem" }}>
                          {lvl.content.map((p, pIdx) => (
                            <p
                              key={pIdx}
                              style={{
                                fontSize: "0.95rem",
                                color: "var(--ink-secondary)",
                                lineHeight: 1.7,
                              }}
                            >
                              {p}
                            </p>
                          ))}
                        </div>

                        {lvl.techNotes && (
                          <div
                            className="font-mono onyxflow-tech-notes-grid"
                            style={{
                              background: "var(--surface)",
                              border: "1px solid var(--border-light)",
                              padding: "1rem",
                              display: "grid",
                              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
                              gap: "0.75rem",
                              fontSize: "0.78rem",
                              width: "100%",
                              boxSizing: "border-box",
                            }}
                          >
                            {lvl.techNotes.map((note) => (
                              <div
                                key={note.label}
                                style={{
                                  minWidth: 0,
                                  wordBreak: "break-word",
                                  overflowWrap: "break-word",
                                }}
                              >
                                <div style={{ color: "var(--ink-muted)", marginBottom: "0.2rem", fontSize: "0.72rem" }}>
                                  {note.label}
                                </div>
                                <div style={{ color: "var(--ink-primary)", fontWeight: 600, lineHeight: 1.45 }}>
                                  {note.value}
                                </div>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Disclaimer on Backtests */}
            <div
              style={{
                marginTop: "1.75rem",
                padding: "1rem 1.25rem",
                border: "1px dashed var(--border)",
                background: "var(--surface)",
                display: "flex",
                alignItems: "flex-start",
                gap: "0.75rem",
                fontSize: "0.82rem",
                color: "var(--ink-secondary)",
                lineHeight: 1.5,
              }}
            >
              <AlertCircle size={17} style={{ color: "var(--accent-primary)", flexShrink: 0, marginTop: "2px" }} />
              <div>{onyxflowProject.disclaimer}</div>
            </div>

            {/* Links and Source Access */}
            <div
              className="font-mono onyxflow-links-row"
              style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                marginTop: "1.5rem",
                paddingTop: "1.25rem",
                borderTop: "var(--border-thin)",
              }}
            >
              {onyxflowProject.links.map((link) => (
                <a
                  key={link.label}
                  href={link.url || "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="onyxflow-action-btn"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                    padding: "0.55rem 1rem",
                    background: "var(--surface)",
                    border: "var(--border-thin)",
                    color: "var(--ink-primary)",
                    fontWeight: 600,
                    fontSize: "0.78rem",
                    boxShadow: "2px 2px 0 var(--border)",
                    transition: "all var(--motion-fast) var(--ease-out)",
                    boxSizing: "border-box",
                  }}
                  onMouseDown={(e) => (e.currentTarget.style.transform = "translate(1px, 1px)")}
                  onMouseUp={(e) => (e.currentTarget.style.transform = "translate(0, 0)")}
                >
                  <FileText size={14} />
                  <span>{link.label}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* SECONDARY CONFIRMED PROJECT: COVID-19 TRACKER */}
        <div className="reveal">
          <div
            className="font-mono"
            style={{
              fontSize: "0.75rem",
              color: "var(--ink-muted)",
              letterSpacing: "0.08em",
              marginBottom: "1rem",
              fontWeight: 600,
            }}
          >
            SECONDARY APPLICATION / CONFIRMED REPOSITORY RECORD
          </div>

          {secondaryProjects.map((project) => (
            <div
              key={project.id}
              style={{
                background: "var(--surface)",
                border: "var(--border-thin)",
                padding: "2rem",
                boxShadow: "4px 4px 0 var(--border)",
                display: "grid",
                gridTemplateColumns: "1.5fr 1fr",
                gap: "2rem",
                alignItems: "center",
              }}
              className="secondary-project-card"
            >
              <div>
                <div
                  className="font-mono"
                  style={{
                    fontSize: "0.7rem",
                    color: "var(--ink-muted)",
                    marginBottom: "0.4rem",
                    letterSpacing: "0.05em",
                  }}
                >
                  {project.category} · {project.status}
                </div>
                <h3
                  className="font-display"
                  style={{
                    fontSize: "1.75rem",
                    color: "var(--ink-primary)",
                    letterSpacing: "-0.02em",
                    marginBottom: "0.5rem",
                  }}
                >
                  {project.title}
                </h3>
                <p
                  style={{
                    fontSize: "0.92rem",
                    color: "var(--ink-secondary)",
                    lineHeight: 1.6,
                    maxWidth: "580px",
                    marginBottom: "1rem",
                  }}
                >
                  {project.summary}
                </p>
                <div className="font-mono" style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                  {project.tags.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: "0.72rem",
                        padding: "0.2rem 0.5rem",
                        background: "var(--surface-alt)",
                        border: "1px solid var(--border-light)",
                        color: "var(--ink-primary)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              <div
                className="font-mono secondary-links-col"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                  alignItems: "flex-end",
                }}
              >
                {project.links.map((link) => (
                  <a
                    key={link.label}
                    href={link.url || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="secondary-action-btn"
                    style={{
                      display: "inline-flex",
                      alignItems: "center",
                      gap: "0.4rem",
                      padding: "0.6rem 1.1rem",
                      background: "var(--surface)",
                      border: "var(--border-thin)",
                      color: "var(--ink-primary)",
                      fontWeight: 600,
                      fontSize: "0.78rem",
                      boxShadow: "2px 2px 0 var(--border)",
                      transition: "all var(--motion-fast)",
                      boxSizing: "border-box",
                      whiteSpace: "nowrap",
                    }}
                    onMouseDown={(e) => (e.currentTarget.style.transform = "translate(1px, 1px)")}
                    onMouseUp={(e) => (e.currentTarget.style.transform = "translate(0, 0)")}
                  >
                    {link.label === "LIVE DEMO" ? <ExternalLink size={13} /> : <Code2 size={13} />}
                    <span>{link.label}</span>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 840px) {
          .onyxflow-metrics {
            grid-template-columns: 1fr !important;
            gap: 1.25rem !important;
          }
          .secondary-project-card {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
          .secondary-links-col {
            align-items: flex-start !important;
            flex-direction: row !important;
            flex-wrap: wrap !important;
          }
        }
        @media (max-width: 640px) {
          .secondary-project-card {
            padding: 1.25rem 1rem !important;
            box-shadow: 3px 3px 0 var(--border) !important;
          }

          /* OnyxFlow buttons: Long labels (Architecture Overview, GitHub Repository)
             stacked vertically 1 per row taking 100% full width, centered */
          .onyxflow-links-row {
            display: flex !important;
            flex-direction: column !important;
            width: 100% !important;
            gap: 0.75rem !important;
          }
          .onyxflow-action-btn {
            width: 100% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            text-align: center !important;
            min-height: 44px !important;
            padding: 0.85rem 1rem !important;
            font-size: 0.82rem !important;
          }

          /* Secondary project buttons (COVID-19 Tracker):
             Short labels (Live Demo, Source Code) fitted side-by-side with 50-50% width */
          .secondary-links-col {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            width: 100% !important;
            gap: 0.65rem !important;
            align-items: stretch !important;
          }
          .secondary-links-col a:only-child {
            grid-column: 1 / -1 !important;
          }
          .secondary-action-btn {
            width: 100% !important;
            display: flex !important;
            align-items: center !important;
            justify-content: center !important;
            text-align: center !important;
            min-height: 44px !important;
            padding: 0.85rem 0.4rem !important;
            font-size: 0.76rem !important;
          }

          .onyxflow-banner-header {
            padding: 1.25rem 1rem !important;
          }
          .onyxflow-specs-container {
            padding: 1.25rem 1rem !important;
          }
          .onyxflow-tech-notes-grid {
            grid-template-columns: 1fr !important;
            padding: 0.75rem !important;
          }
          .onyxflow-tech-notes-grid > div {
            min-width: 0 !important;
            overflow-wrap: break-word !important;
            word-break: break-word !important;
          }
        }
        @media (max-width: 360px) {
          .secondary-action-btn {
            font-size: 0.7rem !important;
            gap: 0.3rem !important;
            padding: 0.75rem 0.2rem !important;
          }
        }
      `}</style>
    </section>
  );
}
