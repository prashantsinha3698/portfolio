"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun, Menu, X, Download, Mail, Copy, Check, ExternalLink, MapPin, Clock } from "lucide-react";
import { profile } from "@/data/profile";
import { GitHubIcon, LinkedInIcon, CodewarsIcon } from "@/components/ui/SocialIcons";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/projects", label: "Projects" },
  { href: "/experience", label: "Experience" },
  { href: "/skills", label: "Skills" },
  { href: "/education", label: "Education" },
  { href: "/about", label: "About" },
  { href: "/#contact", label: "Contact", isContact: true },
];

export default function Navigation() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const pathname = usePathname();

  const copyEmail = () => {
    navigator.clipboard.writeText(profile.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    const currentTheme =
      (document.documentElement.getAttribute("data-theme") as "light" | "dark") || "light";
    setTheme(currentTheme);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile drawer upon route change
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
  };

  const isLinkActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setContactOpen(false);
        setMobileOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleContactClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      const el = document.getElementById("contact");
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    } else {
      e.preventDefault();
      setContactOpen(true);
    }
    setMobileOpen(false);
  };

  return (
    <>
      <header
        role="banner"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 900,
          background: "var(--bg-canvas)",
          borderBottom: "1px solid var(--border-primary)",
          transition: "box-shadow var(--motion-fast)",
          boxShadow: scrolled ? "0 2px 8px rgba(0, 0, 0, 0.06)" : "none",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            height: "3.75rem",
            gap: "1rem",
          }}
        >
          {/* Brand Identity / Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", minWidth: 0 }}>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="show-mobile-btn nav-square-btn"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

            <Link
              href="/"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                textDecoration: "none",
                minWidth: 0,
              }}
            >
              <span
                className="font-display"
                style={{
                  fontSize: "clamp(0.95rem, 2.5vw, 1.08rem)",
                  letterSpacing: "-0.02em",
                  color: "var(--ink-primary)",
                  fontWeight: 700,
                  whiteSpace: "nowrap",
                }}
              >
                PRASHANT SINHA
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav
            role="navigation"
            aria-label="Main navigation"
            className="font-mono hide-mobile-nav"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "1.75rem",
              fontSize: "0.82rem",
              fontWeight: 500,
              letterSpacing: "0.02em",
            }}
          >
            {NAV_LINKS.map((link) => {
              const isContact = link.href.includes("contact");
              const active = isLinkActive(link.href);

              if (isContact) {
                return (
                  <button
                    key={link.href}
                    onClick={handleContactClick}
                    style={{
                      background: "none",
                      border: "none",
                      fontFamily: "inherit",
                      fontSize: "inherit",
                      letterSpacing: "inherit",
                      cursor: "pointer",
                      color: "var(--ink-secondary)",
                      fontWeight: 500,
                      position: "relative",
                      padding: "0.25rem 0",
                      transition: "color var(--motion-fast)",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = "var(--ink-primary)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = "var(--ink-secondary)";
                    }}
                  >
                    {link.label}
                  </button>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  style={{
                    color: active ? "var(--accent-primary)" : "var(--ink-secondary)",
                    fontWeight: active ? 700 : 500,
                    position: "relative",
                    padding: "0.25rem 0",
                    transition: "color var(--motion-fast)",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) e.currentTarget.style.color = "var(--ink-primary)";
                  }}
                  onMouseLeave={(e) => {
                    if (!active) e.currentTarget.style.color = "var(--ink-secondary)";
                  }}
                >
                  {link.label}
                  {active && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: -2,
                        left: 0,
                        right: 0,
                        height: 2,
                        background: "var(--accent-primary)",
                      }}
                    />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Utility Controls: Resume CTA + Theme Toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", flexShrink: 0 }}>
            <a
              href="/resume.pdf"
              download="Prashant_Sinha_Resume.pdf"
              className="btn-tactile-primary nav-resume-cta"
              title="Download Verified Curriculum Vitae (PDF)"
              aria-label="Download Resume"
              style={{
                height: "38px",
                minHeight: "38px",
                padding: "0 0.9rem",
                fontSize: "0.76rem",
              }}
            >
              <Download size={13} />
              <span className="hide-resume-text">Resume</span>
            </a>

            <button
              onClick={toggleTheme}
              className="nav-square-btn"
              aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            >
              {theme === "light" ? <Moon size={15} /> : <Sun size={15} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-label="Mobile navigation menu"
          style={{
            position: "fixed",
            top: "3.75rem",
            left: 0,
            right: 0,
            bottom: 0,
            width: "100%",
            maxWidth: "100vw",
            boxSizing: "border-box",
            background: "var(--bg-canvas)",
            zIndex: 899,
            padding: "1.5rem 1.25rem 2rem",
            borderTop: "1px solid var(--border-primary)",
            display: "flex",
            flexDirection: "column",
            gap: "0.75rem",
            overflowY: "auto",
            overflowX: "hidden",
          }}
          className="font-mono"
        >
          {NAV_LINKS.map((link) => {
            const isContact = link.href.includes("contact");
            const active = isLinkActive(link.href);

            if (isContact) {
              return (
                <button
                  key={link.href}
                  onClick={handleContactClick}
                  style={{
                    background: "none",
                    border: "none",
                    fontFamily: "inherit",
                    textAlign: "left",
                    width: "100%",
                    boxSizing: "border-box",
                    fontSize: "1.1rem",
                    color: "var(--ink-primary)",
                    fontWeight: 500,
                    padding: "0.75rem 0.5rem",
                    borderBottom: "1px solid var(--border-subtle)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: "0.75rem",
                    cursor: "pointer",
                  }}
                >
                  <span style={{ whiteSpace: "nowrap" }}>{link.label}</span>
                  <span
                    className="font-mono"
                    style={{
                      fontSize: "0.78rem",
                      color: "var(--accent-primary)",
                      fontWeight: 700,
                      letterSpacing: "0.04em",
                      flexShrink: 0,
                    }}
                  >
                    [REACH OUT]
                  </span>
                </button>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontSize: "1.1rem",
                  color: active ? "var(--accent-primary)" : "var(--ink-primary)",
                  fontWeight: active ? 700 : 500,
                  padding: "0.75rem 0.5rem",
                  borderBottom: "1px solid var(--border-subtle)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "0.75rem",
                  boxSizing: "border-box",
                  width: "100%",
                }}
              >
                <span style={{ whiteSpace: "nowrap" }}>{link.label}</span>
                {active && (
                  <span
                    className="font-mono"
                    style={{
                      fontSize: "0.78rem",
                      color: "var(--accent-primary)",
                      fontWeight: 700,
                      letterSpacing: "0.04em",
                      flexShrink: 0,
                    }}
                  >
                    [ACTIVE]
                  </span>
                )}
              </Link>
            );
          })}

          <a
            href="/resume.pdf"
            download="Prashant_Sinha_Resume.pdf"
            className="btn-tactile-primary"
            style={{
              marginTop: "1.25rem",
              width: "100%",
              justifyContent: "center",
              fontSize: "0.88rem",
            }}
          >
            <Download size={16} />
            <span>DOWNLOAD RESUME (PDF)</span>
          </a>
        </div>
      )}

      {/* Quick Contact Slide-Over / Dialog */}
      {contactOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Direct Contact Details"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 999,
            background: "rgba(0, 0, 0, 0.65)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1.25rem",
          }}
          onClick={() => setContactOpen(false)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              background: "var(--bg-surface)",
              border: "2px solid var(--border-primary)",
              boxShadow: "var(--shadow-tactile)",
              width: "100%",
              maxWidth: "560px",
              padding: "2rem 2.25rem",
              position: "relative",
            }}
          >
            {/* Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem" }}>
              <div>
                <div className="font-mono" style={{ fontSize: "0.74rem", color: "var(--accent-primary)", fontWeight: 700, letterSpacing: "0.08em", marginBottom: "0.25rem" }}>
                  06 // DIRECT CONTACT
                </div>
                <h2 className="font-display" style={{ fontSize: "1.6rem", fontWeight: 700, color: "var(--ink-primary)", letterSpacing: "-0.02em" }}>
                  Get In Touch
                </h2>
              </div>
              <button
                onClick={() => setContactOpen(false)}
                className="nav-square-btn"
                aria-label="Close contact dialog"
                style={{ width: 34, height: 34, minWidth: 34, minHeight: 34 }}
              >
                <X size={16} />
              </button>
            </div>

            {/* Availability Status */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.75rem",
                background: "var(--bg-surface-subtle)",
                border: "1px solid var(--border-subtle)",
                padding: "0.75rem 1rem",
                marginBottom: "1.5rem",
                fontSize: "0.82rem",
              }}
              className="font-mono"
            >
              <span style={{ width: 8, height: 8, background: "var(--accent-green)", borderRadius: "50%", display: "inline-block", flexShrink: 0 }} />
              <span style={{ color: "var(--ink-primary)", fontWeight: 600 }}>Available for Salesforce Developer roles & enterprise contracts</span>
            </div>

            {/* Email Action Card */}
            <div
              style={{
                border: "1px solid var(--border-primary)",
                background: "var(--bg-canvas)",
                padding: "1.25rem",
                marginBottom: "1.5rem",
              }}
            >
              <div className="font-mono" style={{ fontSize: "0.72rem", color: "var(--ink-muted)", marginBottom: "0.35rem", textTransform: "uppercase" }}>
                PRIMARY DIRECT EMAIL
              </div>
              <div style={{ fontFamily: "var(--font-mono)", fontSize: "clamp(0.95rem, 2.5vw, 1.15rem)", fontWeight: 700, color: "var(--ink-primary)", marginBottom: "1rem", wordBreak: "break-all" }}>
                {profile.email}
              </div>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                <button
                  onClick={copyEmail}
                  className="btn-tactile-primary"
                  style={{ fontSize: "0.78rem", padding: "0.55rem 1rem" }}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  <span>{copied ? "COPIED TO CLIPBOARD" : "COPY EMAIL"}</span>
                </button>
                <a
                  href={`mailto:${profile.email}`}
                  className="btn-tactile-secondary"
                  style={{ fontSize: "0.78rem", padding: "0.55rem 1rem" }}
                >
                  <Mail size={14} />
                  <span>OPEN EMAIL CLIENT</span>
                </a>
              </div>
            </div>

            {/* Meta Location & Timezone */}
            <div
              className="font-mono"
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "0.75rem",
                marginBottom: "1.5rem",
                fontSize: "0.76rem",
                borderTop: "1px solid var(--border-subtle)",
                paddingTop: "1rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--ink-secondary)" }}>
                <MapPin size={13} color="var(--accent-primary)" />
                <span>Raipur, India (Open to Remote)</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--ink-secondary)" }}>
                <Clock size={13} color="var(--accent-primary)" />
                <span>IST / UTC +05:30</span>
              </div>
            </div>

            {/* Social Network Profiles */}
            <div style={{ marginBottom: "1.5rem" }}>
              <div className="font-mono" style={{ fontSize: "0.72rem", color: "var(--ink-muted)", marginBottom: "0.5rem", textTransform: "uppercase" }}>
                VERIFIED SOCIAL & CODE PROFILES
              </div>
              <div style={{ display: "flex", gap: "0.6rem", flexWrap: "wrap" }}>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-tactile-secondary"
                  style={{ fontSize: "0.76rem", padding: "0.45rem 0.85rem" }}
                >
                  <LinkedInIcon size={14} />
                  <span>LinkedIn</span>
                </a>
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-tactile-secondary"
                  style={{ fontSize: "0.76rem", padding: "0.45rem 0.85rem" }}
                >
                  <GitHubIcon size={14} />
                  <span>GitHub</span>
                </a>
                <a
                  href={profile.codewars}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-tactile-secondary"
                  style={{ fontSize: "0.76rem", padding: "0.45rem 0.85rem" }}
                >
                  <CodewarsIcon size={14} />
                  <span>Codewars</span>
                </a>
              </div>
            </div>

            {/* Footer link to homepage contact section */}
            <div style={{ borderTop: "1px solid var(--border-subtle)", paddingTop: "1rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "0.5rem" }}>
              <Link
                href="/#contact"
                onClick={() => setContactOpen(false)}
                className="font-mono"
                style={{ fontSize: "0.78rem", color: "var(--accent-primary)", textDecoration: "underline", fontWeight: 600 }}
              >
                Go to full homepage contact section ↘
              </Link>
              <span className="font-mono" style={{ fontSize: "0.7rem", color: "var(--ink-muted)" }}>
                [ESC TO CLOSE]
              </span>
            </div>
          </div>
        </div>
      )}

      <style>{`
        .nav-square-btn {
          width: 38px;
          height: 38px;
          min-width: 38px;
          min-height: 38px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--border-primary);
          background: var(--bg-surface);
          color: var(--ink-primary);
          box-shadow: 2px 2px 0 var(--border-primary);
          transition: transform var(--motion-fast), box-shadow var(--motion-fast);
          cursor: pointer;
        }
        .nav-square-btn:active {
          transform: translate(1px, 1px);
          box-shadow: 1px 1px 0 var(--border-primary);
        }
        .show-mobile-btn {
          display: none;
        }
        @media (max-width: 860px) {
          .hide-mobile-nav {
            display: none !important;
          }
          .show-mobile-btn {
            display: flex !important;
          }
        }
        @media (max-width: 520px) {
          .hide-badge-mobile {
            display: none !important;
          }
          .nav-resume-cta {
            padding: 0 0.6rem !important;
          }
          .hide-resume-text {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
