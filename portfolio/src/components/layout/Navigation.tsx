"use client";

import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X, Download } from "lucide-react";

const navLinks = [
  { href: "#work", label: "WORK" },
  { href: "#projects", label: "PROJECTS" },
  { href: "#systems", label: "SYSTEMS" },
  { href: "#story", label: "STORY" },
  { href: "#credentials", label: "EDU & CERT" },
  { href: "#contact", label: "CONTACT" },
];

export default function Navigation() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const currentTheme = (document.documentElement.getAttribute("data-theme") as "light" | "dark") || "light";
    setTheme(currentTheme);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
      const sections = navLinks.map((l) => l.href.replace("#", ""));
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id);
        if (el && window.scrollY >= el.offsetTop - 140) {
          setActiveSection(id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);
  };

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) {
      const navOffset = 65;
      const targetTop = el.getBoundingClientRect().top + window.scrollY - navOffset;
      window.scrollTo({
        top: targetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <nav
        role="navigation"
        aria-label="Main navigation"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 900,
          padding: scrolled ? "0.75rem 0" : "1.25rem 0",
          background: scrolled
            ? "color-mix(in srgb, var(--background) 94%, transparent)"
            : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
          borderBottom: scrolled ? "var(--border-thin)" : "none",
          transition: "all var(--motion-normal) var(--ease-out)",
        }}
      >
        <div
          className="container"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          {/* Logo / Identifier */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="show-mobile-menu-btn"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              style={{
                width: 34,
                height: 34,
                display: "none",
                alignItems: "center",
                justifyContent: "center",
                border: "var(--border-thin)",
                background: "var(--surface)",
                color: "var(--ink-primary)",
              }}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>

            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
              }}
            >
              <span
                className="font-display"
                style={{
                  fontSize: "1rem",
                  letterSpacing: "-0.02em",
                  color: "var(--ink-primary)",
                  fontWeight: 700,
                }}
              >
                PRASHANT SINHA
              </span>
              <span
                className="font-mono"
                style={{
                  fontSize: "0.65rem",
                  color: "var(--accent-primary)",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                }}
              >
                ARCHIVE
              </span>
            </a>
          </div>

          {/* Desktop Navigation Links */}
          <div
            className="font-mono hide-mobile-nav"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "2rem",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.06em",
            }}
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.href.replace("#", "");
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(link.href);
                  }}
                  style={{
                    color: isActive ? "var(--accent-primary)" : "var(--ink-secondary)",
                    position: "relative",
                    paddingBottom: "2px",
                    transition: "color var(--motion-fast)",
                  }}
                >
                  {link.label}
                  {isActive && (
                    <span
                      style={{
                        position: "absolute",
                        bottom: -4,
                        left: 0,
                        right: 0,
                        height: 2,
                        background: "var(--accent-primary)",
                      }}
                    />
                  )}
                </a>
              );
            })}
          </div>

          {/* Controls: Resume + Theme Toggle */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <a
              href="/resume.pdf"
              download="Prashant_Sinha_Resume.pdf"
              className="font-mono"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.4rem",
                padding: "0.45rem 0.85rem",
                fontSize: "0.75rem",
                fontWeight: 600,
                border: "var(--border-thin)",
                background: "var(--surface)",
                color: "var(--ink-primary)",
                boxShadow: "2px 2px 0px var(--border)",
                transition: "all var(--motion-fast) var(--ease-out)",
              }}
              onMouseDown={(e) => (e.currentTarget.style.transform = "translate(1px, 1px)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "translate(0, 0)")}
            >
              <Download size={13} />
              <span className="hide-resume-text">RESUME</span>
            </a>

            <button
              onClick={toggleTheme}
              aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
              style={{
                width: 36,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "var(--border-thin)",
                background: "var(--surface)",
                color: "var(--ink-primary)",
                boxShadow: "2px 2px 0px var(--border)",
                transition: "all var(--motion-fast) var(--ease-out)",
              }}
              onMouseDown={(e) => (e.currentTarget.style.transform = "translate(1px, 1px)")}
              onMouseUp={(e) => (e.currentTarget.style.transform = "translate(0, 0)")}
            >
              {theme === "light" ? <Moon size={15} /> : <Sun size={15} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div
          role="dialog"
          aria-label="Mobile navigation"
          style={{
            position: "fixed",
            top: "3.75rem",
            left: 0,
            right: 0,
            bottom: 0,
            background: "var(--background)",
            zIndex: 899,
            padding: "2rem",
            borderTop: "var(--border-thin)",
            display: "flex",
            flexDirection: "column",
            gap: "1.5rem",
          }}
          className="font-mono"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleNavClick(link.href);
              }}
              style={{
                fontSize: "1.2rem",
                color: "var(--ink-primary)",
                fontWeight: 600,
                padding: "0.5rem 0",
                borderBottom: "1px solid var(--border-light)",
              }}
            >
              {link.label}
            </a>
          ))}
          <a
            href="/resume.pdf"
            download="Prashant_Sinha_Resume.pdf"
            style={{
              marginTop: "1rem",
              padding: "0.85rem",
              textAlign: "center",
              background: "var(--ink-primary)",
              color: "var(--background)",
              fontWeight: 600,
              fontSize: "0.85rem",
              boxShadow: "3px 3px 0 var(--border)",
            }}
          >
            DOWNLOAD RESUME
          </a>
        </div>
      )}

      <style>{`
        @media (max-width: 820px) {
          .hide-mobile-nav {
            display: none !important;
          }
          .show-mobile-menu-btn {
            display: flex !important;
          }
        }
        @media (max-width: 480px) {
          .hide-resume-text {
            display: none;
          }
        }
      `}</style>
    </>
  );
}
