"use client";

import React, { useState, useEffect } from "react";
import { profile } from "@/data/profile";
import { ArrowUp } from "lucide-react";

const BASH_SPINNER = ["/", "\\", "|", "—"];

export default function Footer() {
  const [spinnerIdx, setSpinnerIdx] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setSpinnerIdx((prev) => (prev + 1) % BASH_SPINNER.length);
    }, 200);
    return () => clearInterval(timer);
  }, []);

  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer
      role="contentinfo"
      style={{
        borderTop: "1px solid var(--border-primary)",
        background: "var(--bg-surface)",
        padding: "3.5rem 0 3rem",
        color: "var(--ink-secondary)",
        width: "100%",
      }}
      className="font-mono"
    >
      <div className="container">
        <div className="footer-layout">
          {/* Left Column (Desktop) / Top Section (Mobile) */}
          <div className="footer-left-col">
            <div
              className="font-display footer-title"
              style={{
                color: "var(--ink-primary)",
                fontWeight: 400,
                fontSize: "1.25rem",
                letterSpacing: "0.03em",
                marginBottom: "0.35rem",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.45rem",
              }}
            >
              <span>PRASHANT SINHA</span>
              <span
                className="font-mono"
                style={{
                  color: "var(--accent-primary)",
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  display: "inline-block",
                  textAlign: "center",
                  minWidth: "1.2ch",
                  userSelect: "none",
                }}
                aria-hidden="true"
              >
                {BASH_SPINNER[spinnerIdx]}
              </span>
            </div>

            <div
              style={{
                fontSize: "0.84rem",
                color: "var(--ink-muted)",
                marginBottom: "0.35rem",
              }}
            >
              Salesforce Developer · Systems Thinker · Independent Builder
            </div>

            <div
              style={{
                fontSize: "0.78rem",
                color: "var(--ink-muted)",
                marginBottom: "1.75rem",
              }}
            >
              Built with Next.js, React, TypeScript and Vanilla CSS tokens.
            </div>

            {/* Social Channels [ GITHUB ] [ LINKEDIN ] [ CODEWARS ] [ EMAIL ] */}
            <div className="footer-social-links">
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-bracket-link"
              >
                [ GITHUB ]
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-bracket-link"
              >
                [ LINKEDIN ]
              </a>

              <a
                href={profile.codewars}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-bracket-link"
              >
                [ CODEWARS ]
              </a>

              <a
                href={`mailto:${profile.email}`}
                className="footer-bracket-link"
              >
                [ EMAIL ]
              </a>
            </div>
          </div>

          {/* Right Column (Desktop) / Bottom Section (Mobile) */}
          <div className="footer-right-col">
            <div className="footer-location-block">
              <div
                style={{
                  fontSize: "0.72rem",
                  color: "var(--ink-muted)",
                  letterSpacing: "0.08em",
                  marginBottom: "0.25rem",
                }}
              >
                LOCATION BASE
              </div>
              <div
                style={{
                  fontSize: "0.95rem",
                  color: "var(--ink-primary)",
                  fontWeight: 700,
                }}
              >
                Raipur, Chhattisgarh, India
              </div>
            </div>

            {/* Return to Top Tactile Button */}
            <button
              onClick={scrollToTop}
              className="btn-tactile-secondary footer-return-btn"
              aria-label="Return to top of page"
            >
              <ArrowUp size={15} />
              <span>RETURN TO TOP</span>
            </button>
          </div>
        </div>

        {/* Copyright notice */}
        <div
          className="footer-copyright"
          style={{
            fontSize: "0.74rem",
            color: "var(--ink-muted)",
            borderTop: "1px solid var(--border-subtle)",
            paddingTop: "1.5rem",
            marginTop: "2.5rem",
          }}
        >
          © 2026 Prashant Sinha · All rights reserved
        </div>
      </div>

      <style>{`
        /* Desktop & Horizontal Tablet (> 768px): Left & Right Columns (Image 1) */
        @media (min-width: 769px) {
          .footer-layout {
            display: flex;
            justify-content: space-between;
            align-items: flex-end;
            gap: 2.5rem;
            width: 100%;
          }
          .footer-left-col {
            text-align: left;
            max-width: 620px;
          }
          .footer-right-col {
            display: flex;
            flex-direction: column;
            align-items: flex-end;
            text-align: right;
            flex-shrink: 0;
            gap: 1.25rem;
          }
          .footer-social-links {
            display: flex;
            gap: 1.25rem;
            flex-wrap: wrap;
            align-items: center;
            font-size: 0.82rem;
            font-weight: 700;
            letter-spacing: 0.04em;
          }
          .footer-return-btn {
            font-size: 0.82rem;
            font-weight: 700;
            padding: 0.75rem 1.75rem;
            min-height: 44px;
            display: inline-flex;
            align-items: center;
            justifyContent: center;
            gap: 0.5rem;
            box-shadow: var(--shadow-tactile);
          }
          .footer-copyright {
            text-align: left;
          }
        }

        /* Mobile & Portrait Tablet (<= 768px): Centered Stack (Image 2) */
        @media (max-width: 768px) {
          .footer-layout {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 2rem;
            width: 100%;
          }
          .footer-left-col {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            width: 100%;
          }
          .footer-social-links {
            display: flex;
            gap: 1rem;
            flex-wrap: wrap;
            justify-content: center;
            align-items: center;
            font-size: 0.82rem;
            font-weight: 700;
            letter-spacing: 0.04em;
          }
          .footer-right-col {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;
            gap: 1.5rem;
            width: 100%;
          }
          .footer-return-btn {
            font-size: 0.82rem;
            font-weight: 700;
            padding: 0.75rem 2rem;
            min-height: 44px;
            width: 100%;
            max-width: 380px;
            display: inline-flex;
            align-items: center;
            justifyContent: center;
            gap: 0.5rem;
            box-shadow: var(--shadow-tactile);
          }
          .footer-copyright {
            text-align: center;
          }
        }

        .footer-bracket-link {
          color: var(--ink-primary);
          text-decoration: none;
          transition: color var(--motion-fast);
        }
        .footer-bracket-link:hover {
          color: var(--accent-primary);
        }
      `}</style>
    </footer>
  );
}
