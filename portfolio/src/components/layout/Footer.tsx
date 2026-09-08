"use client";

import { profile } from "@/data/profile";
import { ArrowUp } from "lucide-react";

export default function Footer() {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      style={{
        borderTop: "var(--border-thin)",
        background: "var(--surface)",
        padding: "3.5rem 0 4.5rem",
        color: "var(--ink-secondary)",
      }}
      className="font-mono"
    >
      <div className="container">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: "2.5rem",
            alignItems: "start",
          }}
          className="footer-grid"
        >
          {/* Left Column: Author and System Spec */}
          <div>
            <div
              style={{
                color: "var(--ink-primary)",
                fontWeight: 700,
                fontSize: "1rem",
                letterSpacing: "0.04em",
                marginBottom: "0.5rem",
              }}
            >
              PRASHANT SINHA / PERSONAL SYSTEMS ARCHIVE
            </div>
            <div style={{ fontSize: "0.82rem", color: "var(--ink-muted)", marginBottom: "0.5rem" }}>
              Salesforce Developer · Systems Thinker · Independent Builder
            </div>
            <div style={{ fontSize: "0.78rem", color: "var(--ink-muted)", marginBottom: "1.75rem" }}>
              Built with Next.js, React, TypeScript and Vanilla CSS tokens.
            </div>

            {/* Quick Links */}
            <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap", fontSize: "0.78rem", fontWeight: 600 }}>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--ink-secondary)", transition: "color var(--motion-fast)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-secondary)")}
              >
                [ GITHUB ]
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--ink-secondary)", transition: "color var(--motion-fast)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-secondary)")}
              >
                [ LINKEDIN ]
              </a>
              <a
                href={profile.codewars}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: "var(--ink-secondary)", transition: "color var(--motion-fast)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-secondary)")}
              >
                [ CODEWARS ]
              </a>
              <a
                href={`mailto:${profile.email}`}
                style={{ color: "var(--ink-secondary)", transition: "color var(--motion-fast)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-secondary)")}
              >
                [ EMAIL ]
              </a>
            </div>
          </div>

          {/* Right Column: Location & Back to Top */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-end",
              justifyContent: "space-between",
              gap: "2rem",
            }}
            className="footer-right-col"
          >
            <div style={{ textAlign: "right" }} className="footer-right-text">
              <div style={{ fontSize: "0.78rem", color: "var(--ink-muted)", marginBottom: "0.25rem" }}>
                LOCATION BASE
              </div>
              <div style={{ fontSize: "0.9rem", color: "var(--ink-primary)", fontWeight: 700 }}>
                Raipur, Chhattisgarh, India
              </div>
            </div>

            <button
              onClick={scrollToTop}
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                padding: "0.6rem 1rem",
                border: "var(--border-thin)",
                background: "var(--surface-alt)",
                color: "var(--ink-primary)",
                fontSize: "0.75rem",
                fontWeight: 600,
                boxShadow: "2px 2px 0 var(--border)",
                cursor: "pointer",
                transition: "all var(--motion-fast)",
              }}
              onMouseDown={(e) => (e.currentTarget.style.transform = "translate(1px, 1px)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "translate(0, 0)")}
            >
              <ArrowUp size={14} />
              <span>RETURN TO TOP</span>
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .footer-grid {
            grid-template-columns: 1fr !important;
          }
          .footer-right-col {
            align-items: flex-start !important;
          }
          .footer-right-text {
            text-align: left !important;
          }
        }
      `}</style>
    </footer>
  );
}
