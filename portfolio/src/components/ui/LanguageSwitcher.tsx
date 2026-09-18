"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe } from "lucide-react";
import { getLocalizedPath, getLocaleFromPathname, Locale } from "@/locales";

interface LanguageSwitcherProps {
  className?: string;
  isMobile?: boolean;
}

export default function LanguageSwitcher({ className = "", isMobile = false }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const currentLocale = getLocaleFromPathname(pathname);

  const handleLocaleClick = (targetLocale: Locale) => {
    try {
      localStorage.setItem("portfolio_lang", targetLocale);
      document.cookie = `NEXT_LOCALE=${targetLocale}; path=/; max-age=31536000; SameSite=Lax`;
    } catch {
      // storage unavailable / incognito
    }
  };

  const enUrl = getLocalizedPath(pathname, "en");
  const deUrl = getLocalizedPath(pathname, "de");

  if (isMobile) {
    return (
      <div
        role="group"
        aria-label="Language / Sprache"
        className={`mobile-lang-switcher ${className}`}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          gap: "0.4rem",
          margin: "0.4rem 0",
        }}
      >
        <Link
          href={enUrl}
          onClick={() => handleLocaleClick("en")}
          aria-label="Switch to English"
          aria-current={currentLocale === "en" ? "page" : undefined}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            padding: "0.65rem 0.85rem",
            fontSize: "0.82rem",
            fontFamily: "var(--font-mono)",
            fontWeight: 700,
            letterSpacing: "0.04em",
            textDecoration: "none",
            border: "1px solid var(--border-primary)",
            background: currentLocale === "en" ? "var(--ink-primary)" : "var(--bg-surface)",
            color: currentLocale === "en" ? "var(--bg-canvas)" : "var(--ink-secondary)",
            boxShadow: currentLocale === "en" ? "none" : "2px 2px 0 var(--border-primary)",
            cursor: "pointer",
            transition: "all var(--motion-fast)",
          }}
        >
          <Globe size={14} style={{ opacity: currentLocale === "en" ? 1 : 0.6 }} />
          <span>English (EN)</span>
          {currentLocale === "en" && (
            <span style={{ fontSize: "0.7rem", marginLeft: "auto", opacity: 0.9 }}>✓ Active</span>
          )}
        </Link>

        <Link
          href={deUrl}
          onClick={() => handleLocaleClick("de")}
          aria-label="Zu Deutsch wechseln"
          aria-current={currentLocale === "de" ? "page" : undefined}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.6rem",
            padding: "0.65rem 0.85rem",
            fontSize: "0.82rem",
            fontFamily: "var(--font-mono)",
            fontWeight: 700,
            letterSpacing: "0.04em",
            textDecoration: "none",
            border: "1px solid var(--border-primary)",
            background: currentLocale === "de" ? "var(--ink-primary)" : "var(--bg-surface)",
            color: currentLocale === "de" ? "var(--bg-canvas)" : "var(--ink-secondary)",
            boxShadow: currentLocale === "de" ? "none" : "2px 2px 0 var(--border-primary)",
            cursor: "pointer",
            transition: "all var(--motion-fast)",
          }}
        >
          <Globe size={14} style={{ opacity: currentLocale === "de" ? 1 : 0.6 }} />
          <span>Deutsch (DE)</span>
          {currentLocale === "de" && (
            <span style={{ fontSize: "0.7rem", marginLeft: "auto", opacity: 0.9 }}>✓ Aktiv</span>
          )}
        </Link>
      </div>
    );
  }

  return (
    <div
      role="group"
      aria-label="Language selector / Sprachauswahl"
      className={`lang-switcher-desktop ${className}`}
      style={{
        display: "inline-flex",
        alignItems: "center",
        height: "38px",
        minHeight: "38px",
        boxSizing: "border-box",
        border: "1px solid var(--border-primary)",
        background: "var(--bg-surface)",
        boxShadow: "2px 2px 0 var(--border-primary)",
        padding: "3px",
        gap: "2px",
        fontFamily: "var(--font-mono)",
        fontSize: "0.75rem",
        fontWeight: 700,
        letterSpacing: "0.05em",
      }}
    >
      <div
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "0 0.35rem 0 0.45rem",
          color: "var(--ink-muted)",
        }}
        aria-hidden="true"
      >
        <Globe size={13} />
      </div>

      <Link
        href={enUrl}
        onClick={() => handleLocaleClick("en")}
        aria-label="Switch language to English"
        aria-current={currentLocale === "en" ? "page" : undefined}
        title="English version"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          height: "30px",
          padding: "0 0.55rem",
          textDecoration: "none",
          border: currentLocale === "en" ? "1px solid var(--border-primary)" : "1px solid transparent",
          background: currentLocale === "en" ? "var(--ink-primary)" : "transparent",
          color: currentLocale === "en" ? "var(--bg-canvas)" : "var(--ink-secondary)",
          transition: "all var(--motion-fast)",
          userSelect: "none",
          cursor: "pointer",
        }}
      >
        EN
      </Link>

      <span
        aria-hidden="true"
        style={{
          width: "1px",
          height: "14px",
          background: "var(--border-subtle)",
          margin: "0 1px",
        }}
      />

      <Link
        href={deUrl}
        onClick={() => handleLocaleClick("de")}
        aria-label="Sprache zu Deutsch wechseln"
        aria-current={currentLocale === "de" ? "page" : undefined}
        title="Deutsche Version"
        style={{
          display: "inline-flex",
          alignItems: "center",
          justifyContent: "center",
          height: "30px",
          padding: "0 0.55rem",
          textDecoration: "none",
          border: currentLocale === "de" ? "1px solid var(--border-primary)" : "1px solid transparent",
          background: currentLocale === "de" ? "var(--ink-primary)" : "transparent",
          color: currentLocale === "de" ? "var(--bg-canvas)" : "var(--ink-secondary)",
          transition: "all var(--motion-fast)",
          userSelect: "none",
          cursor: "pointer",
        }}
      >
        DE
      </Link>
    </div>
  );
}
