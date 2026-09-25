"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Moon, Sun, Menu, X, Download, Mail, Copy, Check, MapPin, Clock } from "lucide-react";
import { profile } from "@/data/profile";
import { GitHubIcon, LinkedInIcon, CodewarsIcon } from "@/components/ui/SocialIcons";
import LanguageSwitcher from "@/components/ui/LanguageSwitcher";
import { getLocaleFromPathname, getTranslation, Locale } from "@/locales";
import { smoothScrollToElement } from "@/lib/scroll";

interface NavigationProps {
  locale?: Locale;
}

export default function Navigation({ locale }: NavigationProps) {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const pathname = usePathname();

  const activeLocale = locale || getLocaleFromPathname(pathname);
  const t = getTranslation(activeLocale);
  const nav = t.nav;

  const isDe = activeLocale === "de";
  const basePrefix = isDe ? "/de" : "";
  const homePath = isDe ? "/de" : "/";

  const navLinks = [
    { href: homePath, label: nav.home },
    { href: `${basePrefix}/projects`, label: nav.projects },
    { href: `${basePrefix}/experience`, label: nav.experience },
    { href: `${basePrefix}/skills`, label: nav.skills },
    { href: `${basePrefix}/education`, label: nav.education },
    { href: `${basePrefix}/about`, label: nav.about },
    { href: `${basePrefix}/#contact`, label: nav.contact, isContact: true },
  ];

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

  // Lock body scroll when mobile menu or modal is open to eliminate jank
  useEffect(() => {
    if (mobileOpen || contactOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen, contactOpen]);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    try {
      localStorage.setItem("theme", nextTheme);
    } catch {
      // ignore
    }
  };

  const isLinkActive = (href: string) => {
    if (href === "/" || href === "/de") return pathname === href;
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
    if (pathname === "/" || pathname === "/de") {
      e.preventDefault();
      const el = document.getElementById("contact");
      if (el) {
        smoothScrollToElement(el, { duration: 650, offset: -70 });
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
        className="notranslate"
        translate="no"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          width: "100%",
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
            gap: "0.75rem",
          }}
        >
          {/* Brand Identity / Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", minWidth: 0 }}>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="show-mobile-btn nav-square-btn"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

            <Link
              href={homePath}
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
                suppressHydrationWarning
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
              gap: "1.25rem",
              fontSize: "0.82rem",
              fontWeight: 500,
              letterSpacing: "0.02em",
            }}
          >
            {navLinks.map((link) => {
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
                  suppressHydrationWarning
                  style={{
                    color: active ? "var(--accent-primary)" : "var(--ink-secondary)",
                    fontWeight: active ? 700 : 500,
                    position: "relative",
                    padding: "0.25rem 0",
                    transition: "color var(--motion-fast)",
                    whiteSpace: "nowrap",
                  }}
                  onMouseEnter={(e) => {
                    if (!active) e.currentTarget.style.color = "var(--ink-primary)";
                  }}
                  onMouseLeave={(e) => {
                    if (!active) e.currentTarget.style.color = "var(--ink-secondary)";
                  }}
                >
                  <span suppressHydrationWarning>{link.label}</span>
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

          {/* Utility Controls: Language Switcher + Resume CTA + Theme Toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexShrink: 0 }}>
            <LanguageSwitcher />

            <a
              href="/resume.pdf"
              download="Prashant_Sinha_Resume.pdf"
              className="btn-tactile-primary nav-resume-cta"
              title="Download Verified Curriculum Vitae (PDF)"
              aria-label={nav.resume}
              style={{
                height: "38px",
                minHeight: "38px",
                padding: "0 0.85rem",
                fontSize: "0.76rem",
              }}
            >
              <Download size={13} />
              <span className="hide-resume-text">{nav.resume}</span>
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

      {/* Fixed Header Spacer */}
      <div style={{ height: "3.75rem", width: "100%", flexShrink: 0 }} aria-hidden="true" />

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
            gap: "0.6rem",
            overflowY: "auto",
            overflowX: "hidden",
          }}
          className="font-mono"
        >
          {/* Mobile Language Switcher */}
          <div style={{ marginBottom: "0.5rem" }}>
            <div
              style={{
                fontSize: "0.72rem",
                color: "var(--ink-muted)",
                letterSpacing: "0.06em",
                marginBottom: "0.4rem",
                fontWeight: 700,
              }}
            >
              LANGUAGE / SPRACHE
            </div>
            <LanguageSwitcher isMobile />
          </div>

          {navLinks.map((link) => {
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
                    {nav.reachOutBadge}
                  </span>
                </button>
              );
            }

            return (
              <Link
                key={link.href}
                href={link.href}
                suppressHydrationWarning
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
                <span suppressHydrationWarning style={{ whiteSpace: "nowrap" }}>{link.label}</span>
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
                    {nav.activeBadge}
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
              marginTop: "1rem",
              width: "100%",
              justifyContent: "center",
              fontSize: "0.85rem",
              minHeight: "44px",
            }}
          >
            <Download size={16} />
            <span>{nav.downloadResume}</span>
          </a>
        </div>
      )}

      {/* Quick Contact Slide-Over / Dialog */}
      {contactOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={nav.contactModal.title}
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
                  {nav.contactModal.sectionTag}
                </div>
                <h2 className="font-display" style={{ fontSize: "1.6rem", fontWeight: 700, color: "var(--ink-primary)", letterSpacing: "-0.02em" }}>
                  {nav.contactModal.title}
                </h2>
              </div>
              <button
                onClick={() => setContactOpen(false)}
                className="nav-square-btn"
                aria-label={nav.contactModal.closeDialogAria}
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
              <span style={{ color: "var(--ink-primary)", fontWeight: 600 }}>{nav.contactModal.availabilityStatus}</span>
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
                {nav.contactModal.primaryEmailTag}
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
                  <span>{copied ? nav.contactModal.copiedEmail : nav.contactModal.copyEmail}</span>
                </button>
                <a
                  href={`mailto:${profile.email}`}
                  className="btn-tactile-secondary"
                  style={{ fontSize: "0.78rem", padding: "0.55rem 1rem" }}
                >
                  <Mail size={14} />
                  <span>{nav.contactModal.openEmailClient}</span>
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
                <span>{nav.contactModal.locationNote}</span>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "var(--ink-secondary)" }}>
                <Clock size={13} color="var(--accent-primary)" />
                <span>IST / UTC +05:30</span>
              </div>
            </div>

            {/* Social Network Profiles */}
            <div style={{ marginBottom: "1.5rem" }}>
              <div className="font-mono" style={{ fontSize: "0.72rem", color: "var(--ink-muted)", marginBottom: "0.5rem", textTransform: "uppercase" }}>
                {nav.contactModal.verifiedProfilesTag}
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
                href={`${homePath}#contact`}
                onClick={() => setContactOpen(false)}
                className="font-mono"
                style={{ fontSize: "0.78rem", color: "var(--accent-primary)", textDecoration: "underline", fontWeight: 600 }}
              >
                {nav.contactModal.homepageContactLink}
              </Link>
              <span className="font-mono" style={{ fontSize: "0.7rem", color: "var(--ink-muted)" }}>
                {nav.contactModal.escHint}
              </span>
            </div>
          </div>
        </div>
      )}

      <style suppressHydrationWarning>{`
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
        @media (max-width: 960px) {
          .hide-mobile-nav {
            display: none !important;
          }
          .show-mobile-btn {
            display: flex !important;
          }
        }
        @media (max-width: 600px) {
          .nav-resume-cta {
            width: 38px !important;
            height: 38px !important;
            min-width: 38px !important;
            min-height: 38px !important;
            padding: 0 !important;
            display: inline-flex !important;
            align-items: center !important;
            justify-content: center !important;
            box-shadow: 2px 2px 0 var(--border-primary) !important;
            box-sizing: border-box !important;
          }
          .hide-resume-text {
            display: none !important;
          }
          .lang-switcher-desktop {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
