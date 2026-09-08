"use client";

import { useEffect, useRef } from "react";

export default function About() {
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
      id="about"
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
              08 // ABOUT & SYSTEMS PHILOSOPHY
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
              How I Think & Build
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
            A short summary of the engineering problems I enjoy, what I care about, and where I contribute best.
          </div>
        </div>

        {/* Editorial Thought Grid */}
        <div
          className="reveal about-editorial-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "2rem",
          }}
        >
          {/* Card 1: What kind of work do I enjoy? */}
          <div
            style={{
              background: "var(--surface)",
              border: "var(--border-thin)",
              padding: "2rem",
              boxShadow: "4px 4px 0 var(--border)",
            }}
          >
            <div
              className="font-mono"
              style={{
                fontSize: "0.72rem",
                color: "var(--accent-primary)",
                fontWeight: 700,
                letterSpacing: "0.08em",
                marginBottom: "0.5rem",
              }}
            >
              [ FOCUS 01 ]
            </div>
            <h3
              className="font-display"
              style={{
                fontSize: "1.3rem",
                color: "var(--ink-primary)",
                letterSpacing: "-0.01em",
                marginBottom: "0.75rem",
              }}
            >
              What Kind of Work Do I Enjoy?
            </h3>
            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--ink-secondary)",
                lineHeight: 1.7,
              }}
            >
              I enjoy problems where software connects to the physical or commercial world. In Salesforce, that meant building integrations where order records triggered factory machinery. In OnyxFlow, that meant writing algorithmic code where execution delays cost money. I prefer systems with clear constraints over purely speculative UI work.
            </p>
          </div>

          {/* Card 2: What am I good at? */}
          <div
            style={{
              background: "var(--surface)",
              border: "var(--border-thin)",
              padding: "2rem",
              boxShadow: "4px 4px 0 var(--border)",
            }}
          >
            <div
              className="font-mono"
              style={{
                fontSize: "0.72rem",
                color: "var(--accent-primary)",
                fontWeight: 700,
                letterSpacing: "0.08em",
                marginBottom: "0.5rem",
              }}
            >
              [ FOCUS 02 ]
            </div>
            <h3
              className="font-display"
              style={{
                fontSize: "1.3rem",
                color: "var(--ink-primary)",
                letterSpacing: "-0.01em",
                marginBottom: "0.75rem",
              }}
            >
              What Am I Good At?
            </h3>
            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--ink-secondary)",
                lineHeight: 1.7,
              }}
            >
              I am good at spotting where data contracts fail. When multiple platforms speak through APIs, discrepancies in rounding, timestamps, or governor limits create silent errors. I enjoy tracing those edge cases, writing defensive error handling, and making sure systems recover cleanly when external dependencies fail.
            </p>
          </div>

          {/* Card 3: What am I currently interested in? */}
          <div
            style={{
              background: "var(--surface)",
              border: "var(--border-thin)",
              padding: "2rem",
              boxShadow: "4px 4px 0 var(--border)",
            }}
          >
            <div
              className="font-mono"
              style={{
                fontSize: "0.72rem",
                color: "var(--accent-primary)",
                fontWeight: 700,
                letterSpacing: "0.08em",
                marginBottom: "0.5rem",
              }}
            >
              [ FOCUS 03 ]
            </div>
            <h3
              className="font-display"
              style={{
                fontSize: "1.3rem",
                color: "var(--ink-primary)",
                letterSpacing: "-0.01em",
                marginBottom: "0.75rem",
              }}
            >
              What Am I Currently Interested In?
            </h3>
            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--ink-secondary)",
                lineHeight: 1.7,
              }}
            >
              I am interested in the intersection of enterprise platforms and runtime event architectures. Salesforce handles the business data and organizational permissions. Python and event streams handle quantitative calculations and telemetry. Understanding how both worlds cooperate is where I spend my engineering energy.
            </p>
          </div>

          {/* Card 4: What kind of teams do I want to work with? */}
          <div
            style={{
              background: "var(--surface)",
              border: "var(--border-thin)",
              padding: "2rem",
              boxShadow: "4px 4px 0 var(--border)",
            }}
          >
            <div
              className="font-mono"
              style={{
                fontSize: "0.72rem",
                color: "var(--accent-primary)",
                fontWeight: 700,
                letterSpacing: "0.08em",
                marginBottom: "0.5rem",
              }}
            >
              [ FOCUS 04 ]
            </div>
            <h3
              className="font-display"
              style={{
                fontSize: "1.3rem",
                color: "var(--ink-primary)",
                letterSpacing: "-0.01em",
                marginBottom: "0.75rem",
              }}
            >
              What Kind of Teams Do I Seek?
            </h3>
            <p
              style={{
                fontSize: "0.95rem",
                color: "var(--ink-secondary)",
                lineHeight: 1.7,
              }}
            >
              I work best with teams that value technical honesty, clean code hygiene, and direct communication. I appreciate engineering cultures where people take pride in stability, understand the business implications of their code, and prioritize reliable systems over superficial complexity.
            </p>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .about-editorial-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
}
