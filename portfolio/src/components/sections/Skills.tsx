"use client";

import { useEffect, useRef, useState } from "react";
import { capabilityMatrix } from "@/data/skills";

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const [activeGroup, setActiveGroup] = useState<string>("all");

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

  const filteredGroups =
    activeGroup === "all"
      ? capabilityMatrix
      : capabilityMatrix.filter((g) => g.id === activeGroup);

  return (
    <section
      id="systems"
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
              05 // CAPABILITY MATRIX
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
              Skills & Systems Capabilities
            </h2>
          </div>

          {/* Filter Pills */}
          <div
            className="font-mono"
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.4rem",
              fontSize: "0.72rem",
            }}
          >
            <button
              onClick={() => setActiveGroup("all")}
              style={{
                padding: "0.35rem 0.75rem",
                border: "var(--border-thin)",
                background: activeGroup === "all" ? "var(--ink-primary)" : "var(--surface)",
                color: activeGroup === "all" ? "var(--background)" : "var(--ink-secondary)",
                fontWeight: 600,
                boxShadow: activeGroup === "all" ? "2px 2px 0 var(--border)" : "none",
                transition: "all var(--motion-fast)",
              }}
            >
              ALL CAPABILITIES
            </button>
            {capabilityMatrix.map((g) => (
              <button
                key={g.id}
                onClick={() => setActiveGroup(g.id)}
                style={{
                  padding: "0.35rem 0.75rem",
                  border: "var(--border-thin)",
                  background: activeGroup === g.id ? "var(--ink-primary)" : "var(--surface)",
                  color: activeGroup === g.id ? "var(--background)" : "var(--ink-secondary)",
                  fontWeight: 600,
                  boxShadow: activeGroup === g.id ? "2px 2px 0 var(--border)" : "none",
                  transition: "all var(--motion-fast)",
                }}
              >
                {g.category}
              </button>
            ))}
          </div>
        </div>

        {/* The Capability Matrix Table/Grid */}
        <div
          className="reveal"
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "2.5rem",
          }}
        >
          {filteredGroups.map((group) => (
            <div
              key={group.id}
              style={{
                background: "var(--surface)",
                border: "var(--border-medium)",
                boxShadow: "4px 4px 0 var(--border)",
              }}
            >
              {/* Group Header Bar */}
              <div
                style={{
                  padding: "1rem 1.5rem",
                  borderBottom: "var(--border-thin)",
                  background: "var(--surface-alt)",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "1rem",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                  <span
                    className="font-mono"
                    style={{
                      fontSize: "0.7rem",
                      padding: "0.2rem 0.4rem",
                      background: "var(--accent-primary)",
                      color: "#FFFFFF",
                      fontWeight: 700,
                    }}
                  >
                    {group.code}
                  </span>
                  <span
                    className="font-display"
                    style={{
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      color: "var(--ink-primary)",
                      letterSpacing: "0.02em",
                    }}
                  >
                    {group.category}
                  </span>
                </div>

                <div
                  className="font-mono"
                  style={{
                    fontSize: "0.76rem",
                    color: "var(--ink-muted)",
                  }}
                >
                  {group.description}
                </div>
              </div>

              {/* Capabilities Grid */}
              <div
                style={{
                  padding: "1.5rem",
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                  gap: "1rem",
                }}
              >
                {group.capabilities.map((cap, idx) => (
                  <div
                    key={idx}
                    style={{
                      padding: "0.85rem 1rem",
                      border: cap.highlight ? "1px solid var(--border)" : "1px solid var(--border-light)",
                      background: cap.highlight ? "var(--surface-alt)" : "var(--surface)",
                      boxShadow: cap.highlight ? "2px 2px 0 var(--border)" : "none",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      transition: "transform var(--motion-fast)",
                    }}
                  >
                    <div
                      className="font-mono"
                      style={{
                        fontSize: "0.85rem",
                        color: "var(--ink-primary)",
                        fontWeight: 700,
                        marginBottom: "0.3rem",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <span>{cap.name}</span>
                      {cap.highlight && (
                        <span style={{ width: 6, height: 6, background: "var(--accent-primary)", borderRadius: "50%" }} />
                      )}
                    </div>
                    {cap.detail && (
                      <div
                        style={{
                          fontSize: "0.78rem",
                          color: "var(--ink-secondary)",
                          lineHeight: 1.4,
                        }}
                      >
                        {cap.detail}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
