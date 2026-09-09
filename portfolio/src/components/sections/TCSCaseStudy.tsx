"use client";

import { useEffect, useRef } from "react";
import { ArrowRight, AlertTriangle, Lightbulb } from "lucide-react";
import { tcsCaseStudy } from "@/data/experience";

export default function TCSCaseStudy() {
  const sectionRef = useRef<HTMLElement>(null);

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

  return (
    <section
      id="work"
      ref={sectionRef}
      style={{
        padding: "5.5rem 0 6rem",
        borderTop: "var(--border-thin)",
        background: "var(--surface-alt)",
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
              03 // ENTERPRISE WORK EXP & CASE STUDY
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
              Tata Consultancy Services Limited
            </h2>
          </div>

          <div
            className="font-mono"
            style={{
              fontSize: "0.8rem",
              color: "var(--ink-muted)",
              maxWidth: "420px",
              lineHeight: 1.5,
            }}
          >
            A cohesive retrospective on enterprise Salesforce development, regional enhancements, and production incident recovery.
          </div>
        </div>

        {/* The Cohesive Case Study Block */}
        <div
          className="reveal"
          style={{
            background: "var(--surface)",
            border: "var(--border-medium)",
            boxShadow: "6px 6px 0 var(--border)",
            overflow: "hidden",
          }}
        >
          {/* Header Banner: Career Progression inside TCS */}
          <div
            className="tcs-banner-header"
            style={{
              padding: "2rem 2.25rem",
              borderBottom: "var(--border-thin)",
              background: "var(--surface)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              flexWrap: "wrap",
              gap: "2rem",
            }}
          >
            <div>
              <div
                className="font-mono"
                style={{
                  fontSize: "0.75rem",
                  color: "var(--accent-primary)",
                  fontWeight: 600,
                  letterSpacing: "0.08em",
                  marginBottom: "0.5rem",
                }}
              >
                ROLE PROGRESSION & TIMELINE
              </div>
              <h3
                className="font-display"
                style={{
                  fontSize: "1.75rem",
                  color: "var(--ink-primary)",
                  letterSpacing: "-0.02em",
                  marginBottom: "0.75rem",
                }}
              >
                Salesforce Developer
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
                {tcsCaseStudy.roles.map((r, i) => (
                  <div key={i} className="font-mono" style={{ fontSize: "0.82rem", color: "var(--ink-secondary)" }}>
                    <strong style={{ color: "var(--ink-primary)" }}>{r.title}</strong> · {r.period}
                    <div style={{ fontSize: "0.75rem", color: "var(--ink-muted)", marginTop: "2px" }}>
                      {r.focus}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Account Focus Badge */}
            <div
              className="font-mono"
              style={{
                background: "var(--surface-alt)",
                border: "var(--border-thin)",
                padding: "1.25rem",
                maxWidth: "340px",
                fontSize: "0.78rem",
              }}
            >
              <div style={{ color: "var(--accent-primary)", fontWeight: 700, marginBottom: "0.3rem" }}>
                MAJOR CLIENT ACCOUNT
              </div>
              <div style={{ color: "var(--ink-primary)", fontWeight: 700, fontSize: "0.92rem", marginBottom: "0.4rem" }}>
                {tcsCaseStudy.account}
              </div>
              <div style={{ color: "var(--ink-secondary)", lineHeight: 1.4 }}>
                {tcsCaseStudy.accountRegion}
              </div>
            </div>
          </div>

          {/* VISUAL ARTIFACT: INTEGRATION FLOW DIAGRAM */}
          <div
            className="tcs-flow-container"
            style={{
              padding: "1.75rem 2.25rem",
              borderBottom: "var(--border-thin)",
              background: "var(--surface-alt)",
            }}
          >
            <div
              className="font-mono"
              style={{
                fontSize: "0.72rem",
                color: "var(--ink-muted)",
                letterSpacing: "0.08em",
                marginBottom: "1rem",
                fontWeight: 600,
              }}
            >
              SYSTEM INTEGRATION FLOW / REAL-TIME XML TRANSMISSION
            </div>

            <div
              className="font-mono tcs-flow-grid"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: "0.75rem",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  background: "var(--surface)",
                  border: "var(--border-thin)",
                  padding: "1rem",
                  textAlign: "center",
                }}
              >
                <div style={{ color: "var(--accent-primary)", fontSize: "0.7rem", fontWeight: 700, marginBottom: "4px" }}>
                  SOURCE
                </div>
                <div style={{ color: "var(--ink-primary)", fontWeight: 700, fontSize: "0.85rem" }}>
                  Salesforce CRM
                </div>
                <div style={{ color: "var(--ink-muted)", fontSize: "0.68rem", marginTop: "4px" }}>
                  Sales Cloud
                </div>
              </div>

              <div style={{ textAlign: "center", color: "var(--accent-primary)" }}>
                <div style={{ fontSize: "0.68rem", color: "var(--ink-muted)", marginBottom: "4px" }}>TRIGGER</div>
                <ArrowRight size={20} style={{ margin: "0 auto" }} />
              </div>

              <div
                style={{
                  background: "var(--surface)",
                  border: "var(--border-thin)",
                  padding: "1rem",
                  textAlign: "center",
                }}
              >
                <div style={{ color: "var(--accent-primary)", fontSize: "0.7rem", fontWeight: 700, marginBottom: "4px" }}>
                  LOGIC
                </div>
                <div style={{ color: "var(--ink-primary)", fontWeight: 700, fontSize: "0.85rem" }}>
                  Apex Trigger + REST
                </div>
                <div style={{ color: "var(--ink-muted)", fontSize: "0.68rem", marginTop: "4px" }}>
                  XML Serializer
                </div>
              </div>

              <div style={{ textAlign: "center", color: "var(--accent-primary)" }}>
                <div style={{ fontSize: "0.68rem", color: "var(--ink-muted)", marginBottom: "4px" }}>PAYLOAD</div>
                <ArrowRight size={20} style={{ margin: "0 auto" }} />
              </div>

              <div
                style={{
                  background: "var(--surface)",
                  border: "var(--border-thin)",
                  padding: "1rem",
                  textAlign: "center",
                }}
              >
                <div style={{ color: "var(--accent-primary)", fontSize: "0.7rem", fontWeight: 700, marginBottom: "4px" }}>
                  DESTINATION
                </div>
                <div style={{ color: "var(--ink-primary)", fontWeight: 700, fontSize: "0.85rem" }}>
                  Manufacturing Unit
                </div>
                <div style={{ color: "var(--ink-muted)", fontSize: "0.68rem", marginTop: "4px" }}>
                  Factory Floor System
                </div>
              </div>
            </div>
          </div>

          {/* Deep Case Study Narrative: Context, Role, Built, Broke, Solved, Learned */}
          <div
            style={{
              padding: "2.25rem",
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "3rem",
            }}
            className="tcs-narrative-grid"
          >
            {/* Left Column: Context, Environment, What I Built */}
            <div>
              <div style={{ marginBottom: "2rem" }}>
                <div
                  className="font-mono"
                  style={{
                    fontSize: "0.72rem",
                    color: "var(--ink-muted)",
                    letterSpacing: "0.08em",
                    marginBottom: "0.5rem",
                    fontWeight: 600,
                  }}
                >
                  [ 01 ] CONTEXT & CLIENT ENVIRONMENT
                </div>
                <p style={{ fontSize: "0.95rem", color: "var(--ink-secondary)", lineHeight: 1.7, marginBottom: "1rem" }}>
                  {tcsCaseStudy.context}
                </p>
                <p style={{ fontSize: "0.95rem", color: "var(--ink-secondary)", lineHeight: 1.7 }}>
                  {tcsCaseStudy.clientEnvironment}
                </p>
              </div>

              <div>
                <div
                  className="font-mono"
                  style={{
                    fontSize: "0.72rem",
                    color: "var(--ink-muted)",
                    letterSpacing: "0.08em",
                    marginBottom: "0.75rem",
                    fontWeight: 600,
                  }}
                >
                  [ 02 ] WHAT I BUILT
                </div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                  {tcsCaseStudy.whatIBuilt.map((item, idx) => (
                    <li
                      key={idx}
                      style={{
                        fontSize: "0.92rem",
                        color: "var(--ink-secondary)",
                        lineHeight: 1.6,
                        display: "flex",
                        gap: "0.6rem",
                        alignItems: "flex-start",
                      }}
                    >
                      <span style={{ color: "var(--accent-primary)", fontWeight: 700, marginTop: "2px" }}>+</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Right Column: What Broke, How I Solved It, Outcomes, Learnings */}
            <div>
              <div
                style={{
                  background: "var(--surface-alt)",
                  border: "var(--border-thin)",
                  padding: "1.5rem",
                  marginBottom: "2rem",
                }}
              >
                <div
                  className="font-mono"
                  style={{
                    fontSize: "0.72rem",
                    color: "var(--accent-primary)",
                    letterSpacing: "0.08em",
                    marginBottom: "0.5rem",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                  }}
                >
                  <AlertTriangle size={15} />
                  <span>[ 03 ] WHAT BROKE & HOW I SOLVED IT</span>
                </div>
                <p
                  style={{
                    fontSize: "0.92rem",
                    color: "var(--ink-secondary)",
                    lineHeight: 1.65,
                    marginBottom: "1rem",
                  }}
                >
                  {tcsCaseStudy.whatBroke}
                </p>
                <p
                  style={{
                    fontSize: "0.92rem",
                    color: "var(--ink-primary)",
                    fontWeight: 500,
                    lineHeight: 1.65,
                  }}
                >
                  {tcsCaseStudy.howISolvedIt}
                </p>
              </div>

              {/* Outcomes Matrix */}
              <div style={{ marginBottom: "2rem" }}>
                <div
                  className="font-mono"
                  style={{
                    fontSize: "0.72rem",
                    color: "var(--ink-muted)",
                    letterSpacing: "0.08em",
                    marginBottom: "0.75rem",
                    fontWeight: 600,
                  }}
                >
                  [ 04 ] VERIFIED OUTCOMES
                </div>
                <div
                  style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    gap: "0.75rem",
                  }}
                  className="tcs-outcomes-subgrid"
                >
                  {tcsCaseStudy.outcomes.map((out, idx) => (
                    <div
                      key={idx}
                      style={{
                        padding: "0.75rem",
                        background: "var(--surface)",
                        border: "1px solid var(--border-light)",
                      }}
                    >
                      <div className="font-mono" style={{ fontSize: "0.7rem", color: "var(--accent-primary)", fontWeight: 700, marginBottom: "2px" }}>
                        {out.label}
                      </div>
                      <div style={{ fontSize: "0.82rem", color: "var(--ink-secondary)", lineHeight: 1.4 }}>
                        {out.detail}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* What I Learned */}
              <div
                style={{
                  borderLeft: "3px solid var(--accent-primary)",
                  paddingLeft: "1.25rem",
                }}
              >
                <div
                  className="font-mono"
                  style={{
                    fontSize: "0.72rem",
                    color: "var(--accent-primary)",
                    letterSpacing: "0.08em",
                    marginBottom: "0.4rem",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    gap: "0.4rem",
                  }}
                >
                  <Lightbulb size={14} />
                  <span>[ 05 ] WHAT I LEARNED</span>
                </div>
                <p style={{ fontSize: "0.92rem", color: "var(--ink-secondary)", lineHeight: 1.65 }}>
                  {tcsCaseStudy.whatILearned}
                </p>
              </div>
            </div>
          </div>

          {/* Footer Tags */}
          <div
            className="font-mono tcs-footer-tags"
            style={{
              padding: "1rem 2.25rem",
              borderTop: "var(--border-thin)",
              background: "var(--surface-alt)",
              display: "flex",
              flexWrap: "wrap",
              gap: "0.6rem",
              fontSize: "0.74rem",
              color: "var(--ink-muted)",
            }}
          >
            <span>CORE EVIDENCE:</span>
            {tcsCaseStudy.technicalArtifacts.map((art) => (
              <span key={art} style={{ color: "var(--ink-primary)", fontWeight: 600 }}>
                {art} ·
              </span>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .tcs-narrative-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .tcs-flow-grid {
            grid-template-columns: 1fr !important;
            gap: 0.5rem !important;
          }
          .tcs-flow-grid > div:nth-child(2),
          .tcs-flow-grid > div:nth-child(4) {
            transform: rotate(90deg);
            padding: 0.25rem 0;
          }
          .tcs-outcomes-subgrid {
            grid-template-columns: 1fr !important;
          }
        }
        @media (max-width: 640px) {
          .tcs-banner-header,
          .tcs-flow-container,
          .tcs-narrative-grid,
          .tcs-footer-tags {
            padding: 1.25rem 1rem !important;
          }
        }
      `}</style>
    </section>
  );
}
