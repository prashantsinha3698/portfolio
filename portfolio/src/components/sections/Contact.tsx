"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/data/profile";
import { Check, Copy, ArrowUpRight, Mail, Terminal, Download } from "lucide-react";

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const [copied, setCopied] = useState(false);

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

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{
        padding: "6rem 0 8rem",
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
              09 // INQUIRIES & CONTACT
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
              Get in Touch
            </h2>
          </div>

          <div
            className="font-mono"
            style={{
              fontSize: "0.8rem",
              color: "var(--ink-muted)",
              maxWidth: "340px",
              lineHeight: 1.5,
            }}
          >
            Direct communication channel for engineering roles, technical collaboration, and systems architecture.
          </div>
        </div>

        {/* Large Human Statement & Interaction Box */}
        <div
          className="reveal contact-main-grid"
          style={{
            background: "var(--surface)",
            border: "var(--border-medium)",
            boxShadow: "6px 6px 0 var(--border)",
            padding: "3rem",
            display: "grid",
            gridTemplateColumns: "1.3fr 1fr",
            gap: "3.5rem",
            alignItems: "center",
          }}
        >
          {/* Left Column: Human Invitation */}
          <div>
            <h3
              className="font-display"
              style={{
                fontSize: "clamp(1.75rem, 3.5vw, 2.5rem)",
                color: "var(--ink-primary)",
                letterSpacing: "-0.03em",
                lineHeight: 1.2,
                marginBottom: "1.25rem",
              }}
            >
              If you are working on a difficult system, building a product, or simply want to talk engineering, I would like to hear from you.
            </h3>

            <p
              style={{
                fontSize: "1rem",
                color: "var(--ink-secondary)",
                lineHeight: 1.7,
                marginBottom: "2rem",
              }}
            >
              I am open to full-time engineering roles, high-impact Salesforce contract work, and technical systems collaborations. Based in Raipur, India, and comfortable coordinating across global timezones.
            </p>

            {/* Email Copy Trigger */}
            <div style={{ display: "flex", alignItems: "center", width: "100%", maxWidth: "100%" }}>
              <div
                className="font-mono contact-email-box"
                style={{
                  background: "var(--surface-alt)",
                  border: "var(--border-thin)",
                  boxShadow: "3px 3px 0 var(--border)",
                  boxSizing: "border-box",
                }}
              >
                <a
                  href={`mailto:${profile.email}`}
                  className="contact-email-link"
                  style={{
                    color: "var(--ink-primary)",
                    fontWeight: 700,
                    fontSize: "0.85rem",
                    display: "flex",
                    alignItems: "center",
                    gap: "0.5rem",
                    minHeight: "44px",
                    boxSizing: "border-box",
                  }}
                >
                  <Mail size={15} style={{ color: "var(--accent-primary)", flexShrink: 0 }} />
                  <span style={{ wordBreak: "break-all" }}>{profile.email}</span>
                </a>

                <button
                  onClick={copyEmail}
                  className="contact-copy-btn"
                  aria-label="Copy email address"
                  style={{
                    background: "var(--surface)",
                    color: copied ? "var(--status-online)" : "var(--ink-secondary)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.4rem",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    cursor: "pointer",
                    minHeight: "44px",
                    transition: "all var(--motion-fast)",
                    boxSizing: "border-box",
                  }}
                >
                  {copied ? (
                    <>
                      <Check size={14} />
                      <span>COPIED EMAIL</span>
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
          </div>

          {/* Right Column: Verified Profiles & Resume */}
          <div
            className="font-mono"
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "0.75rem",
              width: "100%",
            }}
          >
            <div style={{ fontSize: "0.72rem", color: "var(--ink-muted)", marginBottom: "0.25rem", letterSpacing: "0.08em", fontWeight: 700 }}>
              DIRECT CHANNELS & PROFILES
            </div>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.9rem 1.25rem",
                border: "var(--border-thin)",
                background: "var(--surface)",
                color: "var(--ink-primary)",
                fontWeight: 600,
                fontSize: "0.82rem",
                minHeight: "48px",
                boxShadow: "2px 2px 0 var(--border)",
                transition: "all var(--motion-fast)",
                boxSizing: "border-box",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent-primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--accent-primary)" }}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                <span>LINKEDIN</span>
              </div>
              <ArrowUpRight size={15} style={{ color: "var(--ink-muted)" }} />
            </a>

            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.9rem 1.25rem",
                border: "var(--border-thin)",
                background: "var(--surface)",
                color: "var(--ink-primary)",
                fontWeight: 600,
                fontSize: "0.82rem",
                minHeight: "48px",
                boxShadow: "2px 2px 0 var(--border)",
                transition: "all var(--motion-fast)",
                boxSizing: "border-box",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent-primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--accent-primary)" }}><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                <span>GITHUB</span>
              </div>
              <ArrowUpRight size={15} style={{ color: "var(--ink-muted)" }} />
            </a>

            <a
              href={profile.codewars}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.9rem 1.25rem",
                border: "var(--border-thin)",
                background: "var(--surface)",
                color: "var(--ink-primary)",
                fontWeight: 600,
                fontSize: "0.82rem",
                minHeight: "48px",
                boxShadow: "2px 2px 0 var(--border)",
                transition: "all var(--motion-fast)",
                boxSizing: "border-box",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent-primary)")}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <Terminal size={16} style={{ color: "var(--accent-primary)" }} />
                <span>CODEWARS</span>
              </div>
              <ArrowUpRight size={15} style={{ color: "var(--ink-muted)" }} />
            </a>

            <a
              href={profile.resumeUrl}
              download="Prashant_Sinha_Resume.pdf"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0.9rem 1.25rem",
                border: "2px solid var(--border)",
                background: "var(--ink-primary)",
                color: "var(--background)",
                fontWeight: 700,
                fontSize: "0.82rem",
                minHeight: "48px",
                boxShadow: "3px 3px 0 var(--border)",
                transition: "all var(--motion-fast)",
                boxSizing: "border-box",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <Download size={16} />
                <span>DOWNLOAD RESUME (PDF)</span>
              </div>
              <ArrowUpRight size={15} />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        .contact-email-box {
          display: inline-flex;
          alignItems: stretch;
          max-width: 100%;
        }
        .contact-email-link {
          padding: 0.85rem 1.25rem;
        }
        .contact-copy-btn {
          padding: 0.85rem 1rem;
          border-left: var(--border-thin);
          border-top: none;
        }
        @media (max-width: 860px) {
          .contact-main-grid {
            grid-template-columns: 1fr !important;
            padding: 2rem 1.5rem !important;
            gap: 2rem !important;
          }
        }
        @media (max-width: 540px) {
          .contact-main-grid {
            padding: 1.5rem 1rem !important;
            box-shadow: 3px 3px 0 var(--border) !important;
          }
          .contact-email-box {
            display: flex !important;
            flex-direction: column !important;
            width: 100% !important;
          }
          .contact-email-link {
            width: 100% !important;
            justify-content: center !important;
            padding: 0.85rem 0.75rem !important;
            text-align: center !important;
          }
          .contact-copy-btn {
            width: 100% !important;
            border-left: none !important;
            border-top: var(--border-thin) !important;
            padding: 0.85rem 0.75rem !important;
          }
        }
      `}</style>
    </section>
  );
}
