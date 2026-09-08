"use client";

import { useEffect, useRef } from "react";
import { tcsMetrics } from "@/data/experience";

export default function ImpactIndex() {
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
      id="proof"
      ref={sectionRef}
      style={{
        padding: "4.5rem 0 5rem",
        borderTop: "var(--border-thin)",
        background: "var(--surface-alt)",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div
          className="reveal"
          style={{
            marginBottom: "3rem",
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
              02 // ENGINEERING EVIDENCE
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
              Impact Index
            </h2>
          </div>

          <div
            className="font-mono"
            style={{
              fontSize: "0.8rem",
              color: "var(--ink-muted)",
              maxWidth: "380px",
              lineHeight: 1.5,
            }}
          >
            Production outcomes from Salesforce enterprise integrations at Tata Consultancy Services Limited.
          </div>
        </div>

        {/* 4-Column Metric Blocks */}
        <div
          className="reveal impact-metrics-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            border: "var(--border-medium)",
            background: "var(--surface)",
            boxShadow: "4px 4px 0 var(--border)",
          }}
        >
          {tcsMetrics.map((metric, idx) => (
            <div
              key={metric.id}
              style={{
                padding: "2rem 1.75rem",
                borderRight: idx < tcsMetrics.length - 1 ? "var(--border-thin)" : "none",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                gap: "1.5rem",
              }}
              className="metric-box"
            >
              <div>
                <div
                  className="font-mono"
                  style={{
                    fontSize: "0.7rem",
                    color: "var(--ink-muted)",
                    marginBottom: "1rem",
                    letterSpacing: "0.05em",
                  }}
                >
                  INDEX [{metric.id}]
                </div>

                <div
                  className="font-display"
                  style={{
                    fontSize: "clamp(2.4rem, 4vw, 3.2rem)",
                    fontWeight: 700,
                    color: metric.color,
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    marginBottom: "0.75rem",
                  }}
                >
                  {metric.value}
                </div>

                <div
                  className="font-mono"
                  style={{
                    fontSize: "0.75rem",
                    color: "var(--ink-primary)",
                    fontWeight: 700,
                    letterSpacing: "0.03em",
                    lineHeight: 1.3,
                    marginBottom: "0.75rem",
                  }}
                >
                  {metric.label}
                </div>
              </div>

              <div>
                <div
                  className="font-mono"
                  style={{
                    fontSize: "0.7rem",
                    color: "var(--accent-primary)",
                    fontWeight: 600,
                    marginBottom: "0.5rem",
                  }}
                >
                  {metric.context}
                </div>
                <p
                  style={{
                    fontSize: "0.88rem",
                    color: "var(--ink-secondary)",
                    lineHeight: 1.5,
                  }}
                >
                  {metric.story}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 960px) {
          .impact-metrics-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .metric-box:nth-child(2) {
            border-right: none !important;
          }
          .metric-box:nth-child(1),
          .metric-box:nth-child(2) {
            border-bottom: var(--border-thin);
          }
        }
        @media (max-width: 580px) {
          .impact-metrics-grid {
            grid-template-columns: 1fr !important;
          }
          .metric-box {
            border-right: none !important;
            border-bottom: var(--border-thin);
          }
          .metric-box:last-child {
            border-bottom: none !important;
          }
        }
      `}</style>
    </section>
  );
}
