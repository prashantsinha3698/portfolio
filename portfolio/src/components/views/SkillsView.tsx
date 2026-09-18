"use client";

import { useState } from "react";
import Navigation from "@/components/layout/Navigation";
import Footer from "@/components/layout/Footer";
import PageHeader from "@/components/ui/PageHeader";
import { Award } from "lucide-react";
import { getTranslation, Locale } from "@/locales";

interface SkillsViewProps {
  locale: Locale;
}

export default function SkillsView({ locale }: SkillsViewProps) {
  const t = getTranslation(locale);
  const s = t.skillsPage;
  const isDe = locale === "de";

  const filterOptions = [
    { id: "ALL", label: isDe ? "ALLE KOMPETENZEN" : "ALL CAPABILITIES" },
    { id: "SALESFORCE", label: "SALESFORCE" },
    { id: "INTEGRATION", label: "INTEGRATION" },
    { id: "ENGINEERING", label: "ENGINEERING" },
    { id: "TOOLS & DEVOPS", label: "TOOLS & DEVOPS" },
    { id: "SYSTEMS", label: "SYSTEMS" },
  ] as const;

  const [activeFilter, setActiveFilter] = useState<string>("ALL");

  const filteredCapabilities = activeFilter === "ALL"
    ? s.capabilities
    : s.capabilities.filter((cap) => cap.category === activeFilter);

  return (
    <div style={{ minHeight: "100vh", width: "100%", display: "flex", flexDirection: "column", background: "var(--bg-canvas)", color: "var(--ink-primary)" }}>
      <Navigation />

      <main style={{ flex: 1, width: "100%", maxWidth: "100%", padding: "3rem clamp(1.25rem, 4vw, 4.5rem) 6rem" }}>
        <PageHeader
          sectionNumber={s.headerNumber}
          category={s.headerCategory}
          title={s.headerTitle}
          description={s.headerDescription}
        />

        <section id="systems" style={{ padding: "1rem 0 3rem" }}>
          {/* Header & Filter Controls Strip */}
          <div
            style={{
              marginBottom: "2.5rem",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: "1.5rem",
            }}
          >
            <div>
              <div className="font-mono" style={{ fontSize: "0.75rem", color: "var(--accent-primary)", fontWeight: 700, letterSpacing: "0.08em", marginBottom: "0.35rem" }}>
                05 {"//"} {isDe ? "KOMPETENZMATRIX" : "CAPABILITY MATRIX"}
              </div>
              <h2 className="font-display" style={{ fontSize: "clamp(2rem, 3.5vw, 2.6rem)", color: "var(--ink-primary)", letterSpacing: "0.02em", lineHeight: 1.1, fontWeight: 400 }}>
                {isDe ? "Fähigkeiten & Zertifizierungen" : "Skills & Certifications"}
              </h2>
            </div>

            {/* Filter Buttons */}
            <div className="font-mono" style={{ display: "flex", flexWrap: "wrap", gap: "0.45rem", fontSize: "0.72rem" }}>
              {filterOptions.map((opt) => {
                const isActive = activeFilter === opt.id;
                return (
                  <button
                    key={opt.id}
                    onClick={() => setActiveFilter(opt.id)}
                    style={{
                      padding: "0.4rem 0.85rem",
                      border: "1px solid var(--border-primary)",
                      background: isActive ? "var(--ink-primary)" : "var(--bg-surface)",
                      color: isActive ? "var(--bg-canvas)" : "var(--ink-secondary)",
                      fontWeight: 700,
                      boxShadow: isActive ? "2px 2px 0 var(--border-primary)" : "none",
                      transition: "all var(--motion-fast)",
                      cursor: "pointer",
                    }}
                  >
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Salesforce Certifications & Trailhead Platform Rank Showcase */}
          {(activeFilter === "ALL" || activeFilter === "SALESFORCE") && (
            <div
              className="skills-showcase-box"
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border-primary)",
                boxShadow: "var(--shadow-tactile)",
                marginBottom: "2.5rem",
                width: "100%",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  padding: "1rem 1.25rem",
                  borderBottom: "1px solid var(--border-subtle)",
                  background: "var(--bg-surface-subtle)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "1rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span className="font-mono" style={{ fontSize: "0.7rem", padding: "0.2rem 0.45rem", background: "var(--accent-green)", color: "#FFFFFF", fontWeight: 700 }}>
                    {isDe ? "VERIFIZIERT" : "VERIFIED"}
                  </span>
                  <span className="font-display" style={{ fontSize: "1.25rem", fontWeight: 400, color: "var(--ink-primary)", letterSpacing: "0.03em" }}>
                    {isDe ? "SALESFORCE-ZERTIFIZIERUNGEN & TRAILHEAD-RANG" : "SALESFORCE CERTIFICATIONS & TRAILHEAD RANK"}
                  </span>
                </div>
                <div className="font-mono" style={{ fontSize: "0.78rem", color: "var(--ink-muted)" }}>
                  {isDe
                    ? "Verifizierte Administrator- & Business-Analyst-Zertifikate + Trailhead Ranger"
                    : "Verified Administrator & Business Analyst Credentials + Trailhead Ranger"}
                </div>
              </div>

              <div style={{ padding: "1.25rem", boxSizing: "border-box" }}>
                <div
                  className="skills-certs-grid"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 280px), 1fr))",
                    gap: "1.25rem",
                    marginBottom: "1.25rem",
                    boxSizing: "border-box",
                  }}
                >
                  <div style={{ border: "1px solid var(--border-primary)", background: "var(--bg-surface-subtle)", padding: "1.25rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.35rem" }}>
                      <Award size={17} color="var(--accent-primary)" />
                      <span className="font-display" style={{ fontWeight: 400, fontSize: "1.2rem", letterSpacing: "0.03em", color: "var(--ink-primary)" }}>
                        Salesforce Certified Administrator
                      </span>
                    </div>
                    <div className="font-mono" style={{ fontSize: "0.74rem", color: "var(--accent-green)", fontWeight: 700, marginBottom: "0.35rem" }}>
                      {isDe ? "ZERTIFIZIERT | ZERTIFIKATS-ID: 22807661" : "CERTIFIED | CREDENTIAL ID: 22807661"}
                    </div>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", color: "var(--ink-secondary)", lineHeight: 1.5 }}>
                      {isDe
                        ? "Plattformkonfiguration, Sicherheitsmodelle, OWD, Flow Builder, benutzerdefinierte Objekte und Benutzeradministration."
                        : "Platform configuration, security models, OWD, Flow builder, custom objects, and user administration."}
                    </p>
                  </div>

                  <div style={{ border: "1px solid var(--border-primary)", background: "var(--bg-surface-subtle)", padding: "1.25rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.35rem" }}>
                      <Award size={17} color="var(--accent-primary)" />
                      <span className="font-display" style={{ fontWeight: 400, fontSize: "1.2rem", letterSpacing: "0.03em", color: "var(--ink-primary)" }}>
                        Salesforce Certified Business Analyst
                      </span>
                    </div>
                    <div className="font-mono" style={{ fontSize: "0.74rem", color: "var(--accent-green)", fontWeight: 700, marginBottom: "0.35rem" }}>
                      {isDe ? "ZERTIFIZIERT" : "CERTIFIED"}
                    </div>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", color: "var(--ink-secondary)", lineHeight: 1.5 }}>
                      {isDe
                        ? "Geschäftsanforderungserhebung, Geschäftsprozess-Modellierung, User Stories, Akzeptanzkriterien und UAT-Durchführung."
                        : "Enterprise discovery, business process mapping, user stories, acceptance criteria, and UAT execution."}
                    </p>
                  </div>

                  <div style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface-subtle)", padding: "1.25rem" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", marginBottom: "0.35rem" }}>
                      <Award size={17} color="var(--ink-muted)" />
                      <span className="font-display" style={{ fontWeight: 400, fontSize: "1.2rem", letterSpacing: "0.03em", color: "var(--ink-primary)" }}>
                        Platform Developer I (PD1)
                      </span>
                    </div>
                    <div className="font-mono" style={{ fontSize: "0.74rem", color: "var(--accent-yellow)", fontWeight: 700, marginBottom: "0.35rem" }}>
                      {isDe ? "IN VORBEREITUNG" : "IN PROGRESS"}
                    </div>
                    <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.82rem", color: "var(--ink-secondary)", lineHeight: 1.5 }}>
                      {isDe
                        ? "Objektorientierte Apex-Programmierung, SOQL/SOSL-Abfragen, Trigger Handler und Berücksichtigung von Governor Limits."
                        : "Apex object-oriented programming, SOQL/SOSL queries, trigger handlers, and governor limit handling."}
                    </p>
                  </div>
                </div>

                {/* Trailhead Ranger Badge Bar */}
                <div
                  className="trailhead-ranger-bar"
                  style={{
                    border: "1px solid var(--border-subtle)",
                    background: "var(--bg-surface)",
                    padding: "1rem 1.25rem",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "0.75rem",
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                >
                  <div className="trailhead-ranger-left" style={{ display: "flex", alignItems: "center", gap: "0.75rem", flex: "1 1 240px" }}>
                    <div
                      style={{
                        width: 38,
                        height: 38,
                        minWidth: 38,
                        minHeight: 38,
                        flexShrink: 0,
                        background: "var(--accent-yellow)",
                        color: "var(--ink-primary)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        border: "1px solid var(--border-primary)",
                        fontWeight: 700,
                      }}
                    >
                      <Award size={20} />
                    </div>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.45rem", flexWrap: "wrap", marginBottom: "0.15rem" }}>
                        <span className="font-display" style={{ fontWeight: 400, fontSize: "1.2rem", letterSpacing: "0.03em", color: "var(--ink-primary)" }}>
                          Trailhead Ranger
                        </span>
                        <span className="font-pixel" style={{ fontSize: "0.68rem", background: "var(--bg-surface-subtle)", border: "1px solid var(--border-subtle)", padding: "0.1rem 0.4rem", fontWeight: 700, color: "var(--accent-primary)" }}>
                          {isDe ? "SALESFORCE PLATTFORM-RANG" : "SALESFORCE PLATFORM RANK"}
                        </span>
                      </div>
                      <div className="font-mono" style={{ fontSize: "0.74rem", color: "var(--ink-muted)", lineHeight: 1.4 }}>
                        {isDe
                          ? "Erlangt durch 100+ absolvierte Praxis-Module, Lernpfade und Superbadges."
                          : "Earned through 100+ hands-on modules, platform trails, and superbadges."}
                      </div>
                    </div>
                  </div>

                  <span className="font-pixel trailhead-verified-badge" style={{ fontSize: "0.72rem", color: "var(--accent-green)", fontWeight: 700, whiteSpace: "nowrap" }}>
                    {isDe ? "100+ BADGES ERFOLGREICH ABSOLVIERT" : "100+ BADGES COMPLETED"}
                  </span>
                </div>
              </div>
            </div>
          )}

          {/* Capability Boxes List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "2.5rem", width: "100%" }}>
            {filteredCapabilities.map((group) => (
              <div
                key={group.id}
                style={{
                  background: "var(--bg-surface)",
                  border: "1px solid var(--border-primary)",
                  boxShadow: "var(--shadow-tactile)",
                  width: "100%",
                }}
              >
                {/* Capability Header Strip */}
                <div
                  style={{
                    padding: "1rem 1.5rem",
                    borderBottom: "1px solid var(--border-subtle)",
                    background: "var(--bg-surface-subtle)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "1rem",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                    <span className="font-mono" style={{ fontSize: "0.7rem", padding: "0.2rem 0.45rem", background: "var(--accent-primary)", color: "#FFFFFF", fontWeight: 700 }}>
                      {group.code}
                    </span>
                    <span className="font-display" style={{ fontSize: "1.25rem", fontWeight: 400, color: "var(--ink-primary)", letterSpacing: "0.03em" }}>
                      {group.title}
                    </span>
                  </div>
                  <div className="font-mono" style={{ fontSize: "0.78rem", color: "var(--ink-muted)" }}>
                    {group.description}
                  </div>
                </div>

                {/* Skills Grid */}
                <div
                  className="skills-caps-grid"
                  style={{
                    padding: "1.5rem",
                    display: "grid",
                    gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 250px), 1fr))",
                    gap: "1rem",
                    width: "100%",
                  }}
                >
                  {group.skills.map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      style={{
                        padding: "0.85rem 1rem",
                        border: skill.hasDot ? "1px solid var(--border-primary)" : "1px solid var(--border-subtle)",
                        background: skill.hasDot ? "var(--bg-surface-subtle)" : "var(--bg-surface)",
                        boxShadow: skill.hasDot ? "2px 2px 0 var(--border-primary)" : "none",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                        transition: "transform var(--motion-fast)",
                      }}
                    >
                      <div className="font-mono" style={{ fontSize: "0.86rem", color: "var(--ink-primary)", fontWeight: 700, marginBottom: "0.3rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <span>{skill.name}</span>
                        {skill.hasDot && (
                          <span style={{ width: 6, height: 6, background: "var(--accent-primary)", borderRadius: "50%" }} />
                        )}
                      </div>
                      <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.78rem", color: "var(--ink-secondary)", lineHeight: 1.4 }}>
                        {skill.detail}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer locale={locale} />

      <style suppressHydrationWarning>{`
        @media (max-width: 768px) {
          main {
            padding: 2rem 0.85rem 4rem !important;
          }
          .skills-showcase-box {
            margin-bottom: 1.5rem !important;
          }
          .skills-certs-grid {
            grid-template-columns: 1fr !important;
            gap: 1rem !important;
          }
          .skills-caps-grid {
            grid-template-columns: 1fr !important;
            padding: 0.85rem !important;
          }
          .trailhead-ranger-bar {
            padding: 1.15rem 1rem !important;
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 0.85rem !important;
          }
          .trailhead-ranger-left {
            width: 100% !important;
            align-items: flex-start !important;
          }
          .trailhead-verified-badge {
            align-self: flex-start !important;
          }
        }
      `}</style>
    </div>
  );
}
