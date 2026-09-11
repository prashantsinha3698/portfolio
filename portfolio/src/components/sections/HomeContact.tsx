"use client";

import { useState } from "react";
import { profile } from "@/data/profile";
import SectionLabel from "@/components/ui/SectionLabel";
import { Mail, Copy, Check, ArrowUpRight, Download } from "lucide-react";
import { GitHubIcon, LinkedInIcon, CodewarsIcon } from "@/components/ui/SocialIcons";

export default function HomeContact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section
      id="contact"
      aria-label="Contact Information"
      style={{
        padding: "5.5rem 0 6rem",
        borderBottom: "1px solid var(--border-primary)",
        position: "relative",
      }}
    >
      <div className="container">
        <SectionLabel number="06" label="CONTACT" />

        {/* Poster Layout */}
        <div
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border-primary)",
            boxShadow: "var(--shadow-tactile)",
            padding: "3.5rem",
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: "4rem",
            alignItems: "start",
          }}
          className="contact-poster-grid"
        >
          {/* Left Column: Direct Invitation & Paragraph */}
          <div>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)",
                fontWeight: 700,
                color: "var(--ink-primary)",
                letterSpacing: "-0.04em",
                lineHeight: 1.05,
                marginBottom: "1.5rem",
              }}
            >
              Have a role, project or idea worth discussing?
            </h2>

            <p
              style={{
                fontFamily: "var(--font-ibm-plex-sans), sans-serif",
                fontSize: "1rem",
                color: "var(--ink-secondary)",
                lineHeight: 1.65,
                maxWidth: "520px",
                marginBottom: "2rem",
              }}
            >
              I am open to Salesforce developer opportunities, contract work, and engineering collaborations. Based in Raipur, India, and comfortable coordinating across global time zones.
            </p>

            {/* Desktop Horizontal Email Copy Bar (Image 4) */}
            <div className="contact-email-desktop font-mono">
              <a
                href={`mailto:${profile.email}`}
                style={{
                  background: "var(--bg-surface-subtle)",
                  padding: "0.85rem 1.25rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.6rem",
                  color: "var(--ink-primary)",
                  fontWeight: 700,
                  fontSize: "0.92rem",
                  textDecoration: "none",
                  borderRight: "1px solid var(--border-primary)",
                  transition: "color var(--motion-fast)",
                  boxSizing: "border-box",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-primary)")}
              >
                <Mail size={16} style={{ color: "var(--accent-primary)", flexShrink: 0 }} />
                <span>{profile.email}</span>
              </a>

              <button
                onClick={copyEmail}
                aria-label="Copy email address to clipboard"
                style={{
                  background: "var(--bg-surface)",
                  padding: "0.85rem 1.25rem",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  color: copied ? "var(--accent-green)" : "var(--ink-secondary)",
                  fontWeight: 700,
                  fontSize: "0.78rem",
                  letterSpacing: "0.06em",
                  border: "none",
                  cursor: "pointer",
                  transition: "background var(--motion-fast), color var(--motion-fast)",
                  boxSizing: "border-box",
                }}
                onMouseEnter={(e) => {
                  if (!copied) e.currentTarget.style.background = "var(--bg-surface-subtle)";
                }}
                onMouseLeave={(e) => {
                  if (!copied) e.currentTarget.style.background = "var(--bg-surface)";
                }}
              >
                {copied ? (
                  <>
                    <Check size={14} style={{ color: "var(--accent-green)" }} />
                    <span style={{ color: "var(--accent-green)" }}>COPIED TO CLIPBOARD</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>COPY EMAIL</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Direct Channels & Stacked Actions */}
          <div
            className="font-mono"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
              width: "100%",
            }}
          >
            {/* Mobile Vertical 2-Tier Email Box (Image 3) */}
            <div className="contact-email-mobile">
              <a
                href={`mailto:${profile.email}`}
                style={{
                  background: "var(--bg-surface-subtle)",
                  padding: "1rem 1.25rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.6rem",
                  color: "var(--ink-primary)",
                  fontWeight: 700,
                  fontSize: "0.95rem",
                  textDecoration: "none",
                  borderBottom: "1px solid var(--border-primary)",
                  transition: "color var(--motion-fast)",
                  wordBreak: "break-all",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-primary)")}
              >
                <Mail size={16} style={{ color: "var(--accent-primary)", flexShrink: 0 }} />
                <span>{profile.email}</span>
              </a>

              <button
                onClick={copyEmail}
                aria-label="Copy email address to clipboard"
                style={{
                  background: "var(--bg-surface)",
                  padding: "0.85rem 1.25rem",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  color: copied ? "var(--accent-green)" : "var(--ink-secondary)",
                  fontWeight: 700,
                  fontSize: "0.78rem",
                  letterSpacing: "0.06em",
                  border: "none",
                  cursor: "pointer",
                  transition: "background var(--motion-fast), color var(--motion-fast)",
                }}
                onMouseEnter={(e) => {
                  if (!copied) e.currentTarget.style.background = "var(--bg-surface-subtle)";
                }}
                onMouseLeave={(e) => {
                  if (!copied) e.currentTarget.style.background = "var(--bg-surface)";
                }}
              >
                {copied ? (
                  <>
                    <Check size={14} style={{ color: "var(--accent-green)" }} />
                    <span style={{ color: "var(--accent-green)" }}>COPIED TO CLIPBOARD</span>
                  </>
                ) : (
                  <>
                    <Copy size={14} />
                    <span>COPY EMAIL</span>
                  </>
                )}
              </button>
            </div>

            {/* Direct Channels Label */}
            <div
              style={{
                fontSize: "0.74rem",
                color: "var(--ink-muted)",
                letterSpacing: "0.08em",
                fontWeight: 700,
                marginTop: "0.25rem",
              }}
            >
              DIRECT CHANNELS & PROFILES
            </div>

            {/* Profile Action Buttons Stack */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", width: "100%" }}>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-tactile-secondary"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  padding: "0.85rem 1.25rem",
                  boxShadow: "var(--shadow-tactile)",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <LinkedInIcon size={16} style={{ color: "var(--accent-primary)", flexShrink: 0 }} />
                  <span>LINKEDIN</span>
                </span>
                <ArrowUpRight size={15} style={{ color: "var(--ink-muted)" }} />
              </a>

              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-tactile-secondary"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  padding: "0.85rem 1.25rem",
                  boxShadow: "var(--shadow-tactile)",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <GitHubIcon size={16} style={{ color: "var(--accent-primary)", flexShrink: 0 }} />
                  <span>GITHUB</span>
                </span>
                <ArrowUpRight size={15} style={{ color: "var(--ink-muted)" }} />
              </a>

              <a
                href={profile.codewars}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-tactile-secondary"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  padding: "0.85rem 1.25rem",
                  boxShadow: "var(--shadow-tactile)",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <CodewarsIcon size={16} style={{ color: "var(--accent-primary)", flexShrink: 0 }} />
                  <span>CODEWARS</span>
                </span>
                <ArrowUpRight size={15} style={{ color: "var(--ink-muted)" }} />
              </a>

              {/* Solid Inverted Contrast Download Resume Button */}
              <a
                href="/resume.pdf"
                download="Prashant_Sinha_Resume.pdf"
                className="contact-resume-btn font-mono"
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  width: "100%",
                  padding: "0.85rem 1.25rem",
                  background: "var(--ink-primary)",
                  color: "var(--bg-canvas)",
                  border: "1px solid var(--border-primary)",
                  boxShadow: "var(--shadow-tactile)",
                  fontWeight: 700,
                  fontSize: "0.82rem",
                  letterSpacing: "0.04em",
                  textDecoration: "none",
                  transition: "transform var(--motion-fast) var(--ease-mechanical), box-shadow var(--motion-fast) var(--ease-mechanical), background var(--motion-fast), color var(--motion-fast)",
                  minHeight: "44px",
                  boxSizing: "border-box",
                }}
              >
                <span style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                  <Download size={15} />
                  <span>DOWNLOAD RESUME (PDF)</span>
                </span>
                <ArrowUpRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .contact-resume-btn:hover {
          transform: translate(-1px, -1px);
          box-shadow: var(--shadow-tactile-lg);
        }
        .contact-resume-btn:active {
          transform: translate(2px, 2px);
          box-shadow: 1px 1px 0 var(--border-primary);
        }
        /* Desktop: Horizontal email card at bottom left (Image 4) */
        @media (min-width: 901px) {
          .contact-email-desktop {
            display: inline-flex !important;
            border: 1px solid var(--border-primary);
            box-shadow: var(--shadow-tactile);
            margin-top: 0.5rem;
          }
          .contact-email-mobile {
            display: none !important;
          }
        }

        /* Mobile: 2-tier stacked email card on top of channels (Image 3) */
        @media (max-width: 900px) {
          .contact-poster-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
            padding: 2rem !important;
          }
          .contact-email-desktop {
            display: none !important;
          }
          .contact-email-mobile {
            display: flex !important;
            flex-direction: column;
            border: 1px solid var(--border-primary);
            box-shadow: var(--shadow-tactile);
            width: 100%;
          }
        }
      `}</style>
    </section>
  );
}
