"use client";

import Image from "next/image";

interface PixelAvatarProps {
  className?: string;
  style?: React.CSSProperties;
}

export default function PixelAvatar({ className, style }: PixelAvatarProps) {
  return (
    <div
      className={`pixel-avatar-artifact ${className ?? ""}`}
      style={{
        background: "var(--bg-surface)",
        border: "1px solid var(--border-primary)",
        boxShadow: "var(--shadow-tactile)",
        position: "relative",
        zIndex: 2,
        display: "flex",
        flexDirection: "column",
        width: "100%",
        maxWidth: "390px",
        ...style,
      }}
    >
      {/* Editorial Header Strip */}
      <div
        style={{
          padding: "0.75rem 1.15rem",
          borderBottom: "1px solid var(--border-primary)",
          background: "var(--bg-surface-subtle)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: "0.72rem",
          fontFamily: "var(--font-mono)",
          fontWeight: 700,
          color: "var(--ink-primary)",
          letterSpacing: "0.06em",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span
            style={{
              width: 8,
              height: 8,
              background: "var(--accent-green)",
              borderRadius: "50%",
              display: "inline-block",
              boxShadow: "0 0 0 2px var(--bg-surface)",
            }}
          />
          <span>PROFILE // 01</span>
        </div>
        <span
          style={{
            fontSize: "0.68rem",
            color: "var(--accent-green)",
            background: "var(--accent-green-surface, rgba(46, 107, 91, 0.12))",
            padding: "0.15rem 0.45rem",
            border: "1px solid var(--accent-green)",
            fontWeight: 700,
          }}
        >
          ACTIVE DEV
        </span>
      </div>

      {/* Identity Top Row: Shrunk Pixel Character + Quick Identifier */}
      <div
        style={{
          padding: "1rem 1.15rem",
          display: "flex",
          alignItems: "center",
          gap: "1.15rem",
          borderBottom: "1px solid var(--border-subtle)",
          background: "linear-gradient(180deg, var(--bg-surface) 0%, var(--bg-surface-subtle) 100%)",
        }}
      >
        {/* Shrunk Pixel Character Frame with Architectural Corner Marks */}
        <div
          style={{
            position: "relative",
            width: "74px",
            height: "74px",
            minWidth: "74px",
            background: "var(--bg-surface)",
            border: "1px solid var(--border-primary)",
            padding: "3px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "2px 2px 0 var(--border-subtle)",
          }}
        >
          {/* Subtle Corner Marks */}
          <div style={{ position: "absolute", top: 2, left: 2, width: 4, height: 4, borderTop: "1px solid var(--ink-muted)", borderLeft: "1px solid var(--ink-muted)" }} />
          <div style={{ position: "absolute", top: 2, right: 2, width: 4, height: 4, borderTop: "1px solid var(--ink-muted)", borderRight: "1px solid var(--ink-muted)" }} />
          <div style={{ position: "absolute", bottom: 2, left: 2, width: 4, height: 4, borderBottom: "1px solid var(--ink-muted)", borderLeft: "1px solid var(--ink-muted)" }} />
          <div style={{ position: "absolute", bottom: 2, right: 2, width: 4, height: 4, borderBottom: "1px solid var(--ink-muted)", borderRight: "1px solid var(--ink-muted)" }} />

          <div style={{ position: "relative", width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Image
              src="/picon.png"
              alt="Prashant Sinha pixel portrait"
              width={68}
              height={68}
              unoptimized
              className="pixel-art"
              style={{
                objectFit: "contain",
                width: "auto",
                height: "auto",
                maxWidth: "100%",
                maxHeight: "100%",
              }}
            />
          </div>
        </div>

        {/* Quick Identity Text */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem", overflow: "hidden" }}>
          <div
            className="font-display"
            style={{
              fontSize: "1.15rem",
              fontWeight: 700,
              color: "var(--ink-primary)",
              lineHeight: 1.15,
            }}
          >
            Prashant Sinha
          </div>
          <div
            className="font-mono"
            style={{
              fontSize: "0.75rem",
              color: "var(--accent-primary)",
              fontWeight: 600,
            }}
          >
            Salesforce Developer & Admin
          </div>
          <div
            style={{
              fontFamily: "var(--font-ibm-plex-sans), sans-serif",
              fontSize: "0.72rem",
              color: "var(--ink-muted)",
              lineHeight: 1.3,
            }}
          >
            Open to remote & relocation
          </div>
        </div>
      </div>

      {/* Structured Concrete Facts Ledger */}
      <div
        className="font-mono"
        style={{
          padding: "1rem 1.15rem",
          display: "flex",
          flexDirection: "column",
          gap: "0.65rem",
          fontSize: "0.74rem",
          background: "var(--bg-surface)",
        }}
      >
        {/* BASED AT */}
        <div>
          <div style={{ fontSize: "0.66rem", color: "var(--ink-muted)", letterSpacing: "0.06em", marginBottom: "0.15rem" }}>
            BASED AT
          </div>
          <div style={{ fontSize: "0.84rem", color: "var(--ink-primary)", fontWeight: 700 }}>
            Raipur, India
          </div>
          <div style={{ fontSize: "0.72rem", color: "var(--ink-muted)", marginTop: "1px" }}>
            (IST / UTC+5:30) · Remote Available
          </div>
        </div>

        <div style={{ height: "1px", background: "var(--border-subtle)" }} />

        {/* WORK EXPERIENCE */}
        <div>
          <div style={{ fontSize: "0.66rem", color: "var(--ink-muted)", letterSpacing: "0.06em", marginBottom: "0.15rem" }}>
            WORK EXPERIENCE
          </div>
          <div style={{ fontSize: "0.84rem", color: "var(--ink-primary)", fontWeight: 600 }}>
            3 Years at Tata Consultancy Services
          </div>
        </div>

        <div style={{ height: "1px", background: "var(--border-subtle)" }} />

        {/* CORE SKILLS */}
        <div>
          <div style={{ fontSize: "0.66rem", color: "var(--ink-muted)", letterSpacing: "0.06em", marginBottom: "0.15rem" }}>
            CORE SKILLS
          </div>
          <div style={{ fontSize: "0.84rem", color: "var(--ink-primary)", fontWeight: 600 }}>
            Apex · Flows · Automation · SOQL · REST APIs
          </div>
        </div>

        <div style={{ height: "1px", background: "var(--border-subtle)" }} />

        {/* WORKFLOW & TOOLS */}
        <div>
          <div style={{ fontSize: "0.66rem", color: "var(--ink-muted)", letterSpacing: "0.06em", marginBottom: "0.15rem" }}>
            WORKFLOW & TOOLS
          </div>
          <div style={{ fontSize: "0.84rem", color: "var(--ink-secondary)", fontWeight: 600 }}>
            Git · CI/CD · Process Automation · Postman
          </div>
        </div>

        <div style={{ height: "1px", background: "var(--border-subtle)" }} />

        {/* CURRENT BUILDS */}
        <div>
          <div style={{ fontSize: "0.66rem", color: "var(--ink-muted)", letterSpacing: "0.06em", marginBottom: "0.15rem" }}>
            CURRENT BUILDS
          </div>
          <div style={{ fontSize: "0.84rem", color: "var(--accent-primary)", fontWeight: 700 }}>
            OnyxFlow (Trading Engine) & Quantfolio (Analytics)
          </div>
        </div>
      </div>
    </div>
  );
}
