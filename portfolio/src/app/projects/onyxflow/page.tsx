"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, ArrowUpRight, Sun, Moon } from "lucide-react";
import Link from "next/link";

export default function OnyxFlowDocPage() {
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [activeSection, setActiveSection] = useState<string>("summary");

  useEffect(() => {
    const currentTheme =
      (document.documentElement.getAttribute("data-theme") as "dark" | "light") ||
      "light";
    setTheme(currentTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    document.documentElement.setAttribute("data-theme", nextTheme);
    localStorage.setItem("theme", nextTheme);
  };

  const sections = [
    { id: "summary", label: "01 // Executive Summary" },
    { id: "architecture", label: "02 // System Architecture" },
    { id: "tech-stack", label: "03 // Tech Stack Rationale" },
    { id: "core-modules", label: "04 // Core Subsystems" },
    { id: "strategy-engine", label: "05 // Strategy Framework" },
    { id: "data-pipeline", label: "06 // Data Pipeline & Caching" },
    { id: "resilience", label: "07 // API Resilience & Recovery" },
    { id: "dashboard", label: "08 // Telemetry & Dashboard" },
    { id: "challenges", label: "09 // Engineering Challenges" },
    { id: "skills-matrix", label: "10 // Technical Skills Matrix" },
    { id: "directory", label: "11 // Project Tree" },
  ];

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div style={{ minHeight: "100vh", background: "var(--bg)", color: "var(--text-primary)" }}>
      {/* Header Navigation */}
      <header
        className="onyx-header"
        style={{
          position: "sticky",
          top: 0,
          zIndex: 100,
          background: "color-mix(in srgb, var(--bg) 85%, transparent)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          borderBottom: "1px solid var(--border)",
          padding: "0.875rem 2rem",
        }}
      >
        <div
          className="onyx-header-inner"
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
          }}
        >
          <div className="onyx-header-left" style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <Link
              href="/"
              className="onyx-back-btn"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "var(--text-xs)",
                fontWeight: 600,
                color: "var(--accent)",
                textDecoration: "none",
                padding: "0.375rem 0.75rem",
                border: "var(--pixel-border-accent)",
                borderRadius: "var(--radius-button)",
                background: "color-mix(in srgb, var(--accent) 8%, transparent)",
                transition: "all var(--duration-fast)",
              }}
            >
              <ArrowLeft size={12} style={{ display: "inline", verticalAlign: "middle", marginRight: 4 }} /> BACK TO PORTFOLIO
            </Link>
            <span className="font-pixel-xs onyx-header-title" style={{ color: "var(--text-tertiary)", fontSize: "0.45rem" }}>
              ONYXFLOW://ARCH_SPEC.V2
            </span>
          </div>

          <div className="onyx-header-right" style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: "var(--text-xs)",
                fontWeight: 600,
                color: "var(--text-secondary)",
                textDecoration: "none",
                padding: "0.375rem 0.75rem",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-button)",
              }}
            >
              RÉSUMÉ PDF <ArrowUpRight size={12} style={{ display: "inline", verticalAlign: "middle", marginLeft: 4 }} />
            </a>
            <button
              onClick={toggleTheme}
              aria-label="Toggle light and dark mode"
              style={{
                background: "var(--surface-muted)",
                border: "var(--pixel-border)",
                borderRadius: "var(--radius-button)",
                width: 36,
                height: 36,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "var(--text-primary)",
              }}
            >
              {theme === "dark" ? <Sun size={16} /> : <Moon size={16} />}
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main style={{ maxWidth: 1200, margin: "0 auto", padding: "2.5rem 1.5rem 6rem" }}>
        {/* Page Hero */}
        <div style={{ marginBottom: "3.5rem" }}>
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.25rem 0.75rem",
              border: "1px solid var(--accent)",
              borderRadius: "var(--radius-sm)",
              marginBottom: "1.25rem",
              background: "color-mix(in srgb, var(--accent) 8%, transparent)",
            }}
          >
            <div style={{ width: 6, height: 6, background: "var(--accent)", imageRendering: "pixelated" }} />
            <span className="font-pixel-xs" style={{ color: "var(--accent)", fontSize: "0.42rem" }}>
              SYSTEM ARCHITECTURE & TECHNICAL OVERVIEW
            </span>
          </div>

          <h1
            style={{
              fontSize: "clamp(2.2rem, 5vw, 3.5rem)",
              fontWeight: 800,
              letterSpacing: "-0.035em",
              color: "var(--text-primary)",
              lineHeight: 1.1,
              marginBottom: "1rem",
            }}
          >
            OnyxFlow Algorithmic Platform
          </h1>
          <p
            style={{
              fontSize: "clamp(1.05rem, 2vw, 1.25rem)",
              color: "var(--text-secondary)",
              maxWidth: 820,
              lineHeight: 1.6,
              fontWeight: 400,
            }}
          >
            An enterprise-grade, modular, runtime-first algorithmic trading system built for cryptocurrency
            perpetual futures (BTC, ETH, SOL). Features multi-timeframe regime identification, vectorised TA-Lib signal evaluation, partial-fill aware execution, and dynamic state recovery.
          </p>

          {/* Key Stat Cards */}
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
              gap: "1rem",
              marginTop: "2.5rem",
            }}
          >
            {[
              { label: "SIGNAL LATENCY", val: "< 20 ms", note: "Vectorized TA-Lib dual-cache pipeline" },
              { label: "AVG BACKTEST GROWTH", val: "10–20%", note: "2024–2026 perpetual dataset validation" },
              { label: "PARITY ACCURACY", val: "100%", note: "Zero live vs backtest signal divergence" },
              { label: "STATE RECOVERY", val: "100% Reliable", note: "Deterministic clientOrderId reconciliation" },
            ].map((stat, i) => (
              <div
                key={i}
                style={{
                  padding: "1.25rem 1.5rem",
                  background: "var(--surface)",
                  border: "var(--pixel-border)",
                  borderRadius: "var(--radius-card)",
                  boxShadow: "var(--pixel-shadow)",
                }}
              >
                <div className="font-pixel-xs" style={{ color: "var(--text-tertiary)", fontSize: "0.4rem", marginBottom: "0.5rem" }}>
                  {stat.label}
                </div>
                <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "var(--accent)", letterSpacing: "-0.03em" }}>
                  {stat.val}
                </div>
                <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.25rem" }}>
                  {stat.note}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section Navigation Tabs */}
        <div
          style={{
            position: "sticky",
            top: 60,
            zIndex: 90,
            background: "var(--bg)",
            padding: "0.75rem 0",
            marginBottom: "3rem",
            borderBottom: "1px solid var(--border)",
            display: "flex",
            gap: "0.5rem",
            overflowX: "auto",
            WebkitOverflowScrolling: "touch",
          }}
        >
          {sections.map((s) => (
            <button
              key={s.id}
              onClick={() => scrollToSection(s.id)}
              style={{
                padding: "0.375rem 0.875rem",
                border: activeSection === s.id ? "var(--pixel-border-accent)" : "1px solid var(--border)",
                borderRadius: "var(--radius-button)",
                background: activeSection === s.id ? "color-mix(in srgb, var(--accent) 10%, transparent)" : "var(--surface)",
                color: activeSection === s.id ? "var(--accent)" : "var(--text-secondary)",
                fontSize: "var(--text-xs)",
                fontWeight: 600,
                whiteSpace: "nowrap",
                cursor: "pointer",
                transition: "all var(--duration-fast)",
              }}
            >
              {s.label}
            </button>
          ))}
        </div>

        {/* SECTION 1: EXECUTIVE SUMMARY */}
        <section id="summary" style={{ scrollMarginTop: 120, marginBottom: "4rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <div className="pixel-divider" style={{ width: 32 }} />
            <span className="font-pixel-xs" style={{ color: "var(--accent)", fontSize: "0.45rem" }}>01 // EXECUTIVE SUMMARY & VISION</span>
          </div>
          <h2 style={{ fontSize: "1.875rem", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: "1.5rem" }}>
            Platform Vision & Core Objectives
          </h2>
          <div
            style={{
              background: "var(--surface)",
              border: "var(--pixel-border)",
              borderRadius: "var(--radius-card)",
              padding: "2rem",
              boxShadow: "var(--pixel-shadow)",
              lineHeight: 1.75,
              color: "var(--text-secondary)",
              fontSize: "var(--text-sm)",
            }}
          >
            <p style={{ marginBottom: "1.25rem" }}>
              <strong>OnyxFlow</strong> is an enterprise-grade, modular, runtime-first algorithmic trading platform engineered specifically for cryptocurrency futures derivatives (BTC, ETH, SOL). Built from the ground up as a production-hardened system, OnyxFlow enables multi-timeframe regime identification, signal generation, partial-fill aware order execution, dynamic risk management, and real-time state recovery.
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1.25rem", marginTop: "1.5rem" }}>
              {[
                {
                  title: "Low-Latency & High Reliability",
                  desc: "Handles WebSocket disconnects, API rate-limiting, slippage, and volatile spreads on perpetual futures.",
                },
                {
                  title: "State Recovery & Financial Integrity",
                  desc: "Manages partial fills, network partitions, process crashes, and exchange restart reconciliations without trade drift.",
                },
                {
                  title: "Decoupled Strategy Architecture",
                  desc: "Supports plug-and-play strategy loading via configuration files without modifying underlying execution logic.",
                },
                {
                  title: "Production Observability",
                  desc: "Delivers operational posture, position metrics, and audit logs via an embedded interactive Flask dashboard & Telegram telemetry bot.",
                },
              ].map((obj, i) => (
                <div
                  key={i}
                  style={{
                    padding: "1.25rem",
                    background: "var(--surface-muted)",
                    border: "1px solid var(--border)",
                    borderRadius: "var(--radius-sm)",
                  }}
                >
                  <div style={{ fontWeight: 700, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                    {obj.title}
                  </div>
                  <div style={{ fontSize: "0.85rem", color: "var(--text-secondary)" }}>{obj.desc}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 2: SYSTEM ARCHITECTURE */}
        <section id="architecture" style={{ scrollMarginTop: 120, marginBottom: "4rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <div className="pixel-divider" style={{ width: 32 }} />
            <span className="font-pixel-xs" style={{ color: "var(--accent)", fontSize: "0.45rem" }}>02 // SYSTEM ARCHITECTURE</span>
          </div>
          <h2 style={{ fontSize: "1.875rem", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: "1.5rem" }}>
            5-Layer Decoupled Component Architecture
          </h2>

          {/* Interactive Layered Component View */}
          <div
            style={{
              background: "var(--surface)",
              border: "var(--pixel-border)",
              borderRadius: "var(--radius-card)",
              padding: "2rem",
              boxShadow: "var(--pixel-shadow)",
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
            }}
          >
            {[
              {
                layer: "USER INTERFACE LAYER",
                sub: "Flask Web Dashboard (HTML5/CSS3/Chart.js) · Telegram Telemetry Bot · Interactive Terminal Logger",
                color: "var(--accent)",
              },
              {
                layer: "APPLICATION & API LAYER",
                sub: "Dashboard API Server (api_server.py & dashboard_api.py) · Session Auth (Bcrypt / PyOTP 2FA) · CORS & Throttling",
                color: "var(--accent-secondary)",
              },
              {
                layer: "CORE ENGINE LAYER",
                sub: "Strategy Router (strategies/entry & exit) · Indicators Engine (TA-Lib / NumPy / Pandas) · Risk Engine (adaptive caps) · Order Manager & Position Handler",
                color: "var(--warning)",
              },
              {
                layer: "EXCHANGE INTERFACE LAYER",
                sub: "Exchange Gateway & Resilience (core/exchange.py, CCXT REST) · Live WebSocket Runner (market_data)",
                color: "var(--success)",
              },
              {
                layer: "PERSISTENCE & DATA LAYER",
                sub: "SQLite Local Database (WAL mode logs/trade_log.db) · PostgreSQL Server Warehouse · Supabase Backup",
                color: "var(--accent-tertiary, #6366f1)",
              },
            ].map((l, i) => (
              <div
                key={i}
                style={{
                  padding: "1.25rem 1.5rem",
                  background: "var(--surface-muted)",
                  borderLeft: `4px solid ${l.color}`,
                  border: "1px solid var(--border)",
                  borderLeftWidth: "4px",
                  borderRadius: "var(--radius-sm)",
                }}
              >
                <div className="font-pixel-xs" style={{ color: l.color, fontSize: "0.42rem", marginBottom: "0.375rem" }}>
                  LAYER {i + 1} {"//"} {l.layer}
                </div>
                <div style={{ fontSize: "var(--text-sm)", color: "var(--text-primary)", fontWeight: 600 }}>
                  {l.sub}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 3: TECH STACK RATIONALE */}
        <section id="tech-stack" style={{ scrollMarginTop: 120, marginBottom: "4rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <div className="pixel-divider" style={{ width: 32 }} />
            <span className="font-pixel-xs" style={{ color: "var(--accent)", fontSize: "0.45rem" }}>03 // TECH STACK RATIONALE</span>
          </div>
          <h2 style={{ fontSize: "1.875rem", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: "1.5rem" }}>
            Technology Choices & Architectural Rationale
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {[
              {
                tech: "Python 3.11+",
                role: "Core Language & Execution Engine",
                rationale: "Ecosystem support for financial computing, async IO, high developer velocity.",
                alt: "C++ (Over-engineered for MVP), Rust (Steeper learning curve for rapid strategy iteration).",
              },
              {
                tech: "Flask 3.1",
                role: "Web Server & REST Dashboard API",
                rationale: "Minimal overhead for custom UI/API services, clean integration with custom SSE & WS telemetry handlers.",
                alt: "FastAPI (Flask chosen for seamless integration with custom templates & thread contexts).",
              },
              {
                tech: "Pandas & NumPy",
                role: "Vectorized Indicator Calculations",
                rationale: "C-extensions for fast array manipulation, kline resampling (1m, 15m, 30m, 4h), and rolling matrix math.",
                alt: "Polars (Pandas provided direct TA-Lib C-binding integration and backtesting ecosystem support).",
              },
              {
                tech: "TA-Lib (C-Binding)",
                role: "High-Speed Technical Analysis Engine",
                rationale: "Industry-standard C library calculating high-performance MACD, RSI, ADX, ATR, and EMA indicators.",
                alt: "Pure Python indicator calculations (Higher execution overhead during live candle ticks).",
              },
              {
                tech: "SQLite (WAL Mode)",
                role: "Low-Latency Local Runtime Persistence",
                rationale: "Zero-config embedded disk DB with Write-Ahead Logging (WAL) for non-blocking concurrent reads during execution writes.",
                alt: "Pure memory dicts (Vulnerable to data loss on process crashes).",
              },
              {
                tech: "PostgreSQL & Supabase",
                role: "Analytics Warehouse & Cloud Backup",
                rationale: "ACID relational schema, multi-session backtest analysis, cloud backups, and cross-environment sync.",
                alt: "MongoDB (Relational schemas required for auditability & double-entry trade ledgering).",
              },
            ].map((item, i) => (
              <div
                key={i}
                style={{
                  background: "var(--surface)",
                  border: "var(--pixel-border)",
                  borderRadius: "var(--radius-card)",
                  padding: "1.5rem",
                  boxShadow: "var(--pixel-shadow)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
                  <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--accent)" }}>{item.tech}</h3>
                  <span className="font-pixel-xs" style={{ color: "var(--text-tertiary)", fontSize: "0.38rem" }}>
                    {item.role}
                  </span>
                </div>
                <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "0.75rem" }}>
                  <strong>Rationale:</strong> {item.rationale}
                </p>
                <p style={{ fontSize: "0.78rem", color: "var(--text-tertiary)", fontStyle: "italic" }}>
                  <strong>Alternatives Evaluated:</strong> {item.alt}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 4: CORE MODULES BREAKDOWN */}
        <section id="core-modules" style={{ scrollMarginTop: 120, marginBottom: "4rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <div className="pixel-divider" style={{ width: 32 }} />
            <span className="font-pixel-xs" style={{ color: "var(--accent)", fontSize: "0.45rem" }}>04 // CORE SUBSYSTEMS BREAKDOWN</span>
          </div>
          <h2 style={{ fontSize: "1.875rem", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: "1.5rem" }}>
            Core Modules & Execution Mechanics
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {[
              {
                mod: "Order Manager",
                file: "core/order_manager.py",
                purpose: "Centralized lifecycle management, partial fill tracking, concurrency locks, and deterministic client order ID generation.",
                decisions: "Generates deterministic clientOrderId strings (ORD_... for entries, CLS_... for exits) guaranteeing execution idempotency and zero-drift state recovery upon system restart.",
              },
              {
                mod: "Indicators Engine",
                file: "core/indicators_engine.py",
                purpose: "Computes multi-timeframe technical indicators, volume metrics, and orderbook microstructure features.",
                decisions: "Uses an in-memory dual-cache layer to eliminate redundant indicator recalculation on static historical bars, reducing CPU overhead during high-frequency candle streams.",
              },
              {
                mod: "Position Handler",
                file: "core/position_handler.py",
                purpose: "Tracks active market positions, unrealized/realized PnL, leverage settings, and margin utilization.",
                decisions: "Calculates real-time liquidation distance on 1-minute intervals to trigger safety stops independent of regular strategy exits.",
              },
              {
                mod: "Database Manager",
                file: "core/database.py",
                purpose: "Manages connection pooling, automated schema migrations, transactional SQL queries, and data backup routines.",
                decisions: "Uses SQLite Write-Ahead Logging (WAL) mode to permit concurrent read queries from the Flask dashboard while the core bot writes execution trades without lock contention.",
              },
              {
                mod: "Strategy Router",
                file: "core/strategy_router.py",
                purpose: "Dynamically loads, registers, and routes streaming market snapshots to active entry and exit strategy modules.",
                decisions: "Employs dynamic Python module importing based on YAML configurations, enabling zero-code-change strategy updates and runtime swapping.",
              },
            ].map((m, i) => (
              <div
                key={i}
                style={{
                  background: "var(--surface)",
                  border: "var(--pixel-border)",
                  borderRadius: "var(--radius-card)",
                  padding: "1.75rem",
                  boxShadow: "var(--pixel-shadow)",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.75rem", flexWrap: "wrap", gap: "0.5rem" }}>
                  <h3 style={{ fontSize: "1.25rem", fontWeight: 800, color: "var(--text-primary)" }}>{m.mod}</h3>
                  <code style={{ fontSize: "0.8rem", color: "var(--accent)", background: "var(--surface-muted)", padding: "0.2rem 0.5rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)" }}>
                    {m.file}
                  </code>
                </div>
                <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: 1.7, marginBottom: "0.75rem" }}>
                  <strong>Primary Purpose:</strong> {m.purpose}
                </p>
                <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: 1.7 }}>
                  <strong>Key Design Decision:</strong> {m.decisions}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 5: MODULAR STRATEGY FRAMEWORK */}
        <section id="strategy-engine" style={{ scrollMarginTop: 120, marginBottom: "4rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <div className="pixel-divider" style={{ width: 32 }} />
            <span className="font-pixel-xs" style={{ color: "var(--accent)", fontSize: "0.45rem" }}>05 // DYNAMIC STRATEGY FRAMEWORK</span>
          </div>
          <h2 style={{ fontSize: "1.875rem", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: "1.5rem" }}>
            Multi-Timeframe Strategy Matrix
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {[
              {
                tf: "30-Minute Primary",
                role: "Signal Entry Evaluation",
                desc: "Evaluates structural market trends, multi-indicator momentum confluences, and volume participation metrics. Strict closed-candle evaluation eliminates repainting.",
              },
              {
                tf: "15-Minute Exit & Trailing",
                role: "Dynamic Profit Protection",
                desc: "Monitors ATR-based dynamic trailing stops, profit ratchets, and momentum exhaustion indicators to lock in open gains.",
              },
              {
                tf: "1-Minute Safety Guardian",
                role: "Emergency Proximity Guard",
                desc: "Scans price action continuously for extreme adverse excursions, exchange liquidation proximity, and sudden orderbook collapse.",
              },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  background: "var(--surface)",
                  border: "var(--pixel-border)",
                  borderRadius: "var(--radius-card)",
                  padding: "1.5rem",
                  boxShadow: "var(--pixel-shadow)",
                }}
              >
                <div className="font-pixel-xs" style={{ color: "var(--accent)", fontSize: "0.4rem", marginBottom: "0.5rem" }}>
                  TIMEFRAME LAYER // {s.tf}
                </div>
                <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                  {s.role}
                </h3>
                <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 9: ENGINEERING CHALLENGES & SOLUTIONS */}
        <section id="challenges" style={{ scrollMarginTop: 120, marginBottom: "4rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <div className="pixel-divider" style={{ width: 32 }} />
            <span className="font-pixel-xs" style={{ color: "var(--accent)", fontSize: "0.45rem" }}>09 // ENGINEERING CHALLENGES</span>
          </div>
          <h2 style={{ fontSize: "1.875rem", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: "1.5rem" }}>
            Technical Challenges & Implemented Solutions
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {[
              {
                challenge: "Partial Fill Position Desynchronization",
                cause: "Market orders executing across multiple liquidity matches, leaving open residual balances.",
                solution: "Implemented detailed tracking of closed_amount, remaining_amount, and cumulative_exit_fees per fill in OrderManager and PositionHandler. Position is marked flat only when remaining_amount == 0.",
              },
              {
                challenge: "Process Crashes & Restart State Drift",
                cause: "Sudden system power loss or process kill leaving active exchange positions unmonitored.",
                solution: "Designed startup state reconciliation (core/state_recovery.py). On startup, the engine queries exchange API for open orders/positions and reconciles with local SQLite state using deterministic clientOrderId tags.",
              },
              {
                challenge: "Indicator Recalculation CPU Spikes",
                cause: "Re-computing complex TA-Lib indicators over thousands of historical bars on every 1-second price tick.",
                solution: "Built a multi-timeframe dual-cache in IndicatorsEngine. Historical completed bars are calculated once and cached; only the current open bar is updated on incoming tick streams.",
              },
              {
                challenge: "SQLite Write-Lock Contention During Dashboard Polling",
                cause: "Concurrent read requests from Flask web dashboard blocking database writes by core execution runner.",
                solution: "Configured SQLite Write-Ahead Logging (PRAGMA journal_mode=WAL;), enabling simultaneous non-blocking reads while the engine executes atomic writes.",
              },
            ].map((c, i) => (
              <div
                key={i}
                style={{
                  background: "var(--surface)",
                  border: "var(--pixel-border)",
                  borderRadius: "var(--radius-card)",
                  padding: "1.5rem",
                  boxShadow: "var(--pixel-shadow)",
                }}
              >
                <h3 style={{ fontSize: "1.15rem", fontWeight: 800, color: "var(--accent)", marginBottom: "0.75rem" }}>
                  {c.challenge}
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1rem", fontSize: "var(--text-sm)" }}>
                  <div style={{ background: "var(--surface-muted)", padding: "1rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)" }}>
                    <span style={{ fontWeight: 700, color: "var(--warning)" }}>Root Cause:</span>
                    <p style={{ color: "var(--text-secondary)", marginTop: "0.25rem", lineHeight: 1.6 }}>{c.cause}</p>
                  </div>
                  <div style={{ background: "var(--surface-muted)", padding: "1rem", borderRadius: "var(--radius-sm)", border: "1px solid var(--border)" }}>
                    <span style={{ fontWeight: 700, color: "var(--success)" }}>Solution Implemented:</span>
                    <p style={{ color: "var(--text-secondary)", marginTop: "0.25rem", lineHeight: 1.6 }}>{c.solution}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 10: TECHNICAL SKILLS MATRIX */}
        <section id="skills-matrix" style={{ scrollMarginTop: 120, marginBottom: "4rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <div className="pixel-divider" style={{ width: 32 }} />
            <span className="font-pixel-xs" style={{ color: "var(--accent)", fontSize: "0.45rem" }}>10 // TECHNICAL SKILLS MATRIX</span>
          </div>
          <h2 style={{ fontSize: "1.875rem", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: "1.5rem" }}>
            Engineering Competencies & Implementation Mapping
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "1.25rem",
            }}
          >
            {[
              {
                skill: "Python Software Engineering",
                evidence: "Object-oriented design, abstract base classes, type hints, thread concurrency, custom exception handling.",
                modules: ["bot_runner.py", "core/order_manager.py"],
              },
              {
                skill: "System Architecture & Design",
                evidence: "Event-driven architecture, decoupled strategy router, factory pattern, observer pattern, circuit breakers.",
                modules: ["core/strategy_router.py", "core/event_bus.py"],
              },
              {
                skill: "Database Engineering",
                evidence: "SQLite WAL concurrency optimization, automated schema migration scripts, transactional integrity, state forensics.",
                modules: ["core/database.py"],
              },
              {
                skill: "API Development & Web Frameworks",
                evidence: "Flask REST API endpoints, SSE real-time streaming, CORS security, rate limiting, Jinja dashboard interface.",
                modules: ["dashboard/api_server.py", "dashboard/dashboard_api.py"],
              },
              {
                skill: "Financial & Quantitative Computing",
                evidence: "Multi-timeframe indicator computation, vectorized calculations, PnL tracking, Sharpe/Sortino metrics.",
                modules: ["core/indicators_engine.py", "reports/report_generator.py"],
              },
              {
                skill: "High-Availability & Fault Tolerance",
                evidence: "State recovery on startup, partial-fill accounting, deterministic order ID tracking, REST retry logic.",
                modules: ["core/execution_reconciler.py", "core/binance_rest_resilience.py"],
              },
              {
                skill: "Security & Authentication",
                evidence: "Secrets isolation, Bcrypt password hashing, PyOTP 2FA integration, API key encryption.",
                modules: ["core/secrets_manager.py", "dashboard/api_server.py"],
              },
              {
                skill: "DevOps & Software Portability",
                evidence: "Cross-platform runtime scripts, YAML configuration management, environment separation, Git workflow.",
                modules: ["scripts/portable_project.py", "config/config.yaml"],
              },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  background: "var(--surface)",
                  border: "var(--pixel-border)",
                  borderRadius: "var(--radius-card)",
                  padding: "1.5rem",
                  boxShadow: "var(--pixel-shadow)",
                }}
              >
                <h3 style={{ fontSize: "1.1rem", fontWeight: 800, color: "var(--text-primary)", marginBottom: "0.5rem" }}>
                  {s.skill}
                </h3>
                <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", lineHeight: 1.6, marginBottom: "1rem" }}>
                  {s.evidence}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
                  {s.modules.map((mod, j) => (
                    <code
                      key={j}
                      style={{
                        fontSize: "0.75rem",
                        color: "var(--accent-secondary)",
                        background: "var(--surface-muted)",
                        padding: "0.2rem 0.5rem",
                        borderRadius: "var(--radius-sm)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      {mod}
                    </code>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* SECTION 11: PROJECT DIRECTORY TREE */}
        <section id="directory" style={{ scrollMarginTop: 120, marginBottom: "4rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
            <div className="pixel-divider" style={{ width: 32 }} />
            <span className="font-pixel-xs" style={{ color: "var(--accent)", fontSize: "0.45rem" }}>11 // PROJECT STRUCTURE</span>
          </div>
          <h2 style={{ fontSize: "1.875rem", fontWeight: 800, letterSpacing: "-0.025em", marginBottom: "1.5rem" }}>
            Codebase Directory Layout
          </h2>

          <div
            style={{
              background: "var(--surface)",
              border: "var(--pixel-border)",
              borderRadius: "var(--radius-card)",
              padding: "1.75rem",
              boxShadow: "var(--pixel-shadow)",
              fontFamily: "var(--font-geist-mono), monospace",
              fontSize: "0.85rem",
              lineHeight: 1.7,
              color: "var(--text-secondary)",
              overflowX: "auto",
            }}
          >
            <pre style={{ margin: 0 }}>
              {`Onyxflow-new/
├── main.py                        # Primary CLI Entrypoint & Runtime Initializer
├── main_production.py             # Headless Production Execution Entrypoint
├── bot_runner.py                  # Core Runtime Loop & Process Manager
├── config/                        # Hierarchical Configuration Engine
│   ├── config.yaml                # Master Application Anchors & Timeframe Settings
│   ├── strategy.yaml              # Strategy Enablement & Parameter Bindings
│   ├── runtime_trade.yaml         # Risk Limits, Leverage Guards & Sizing Knobs
│   └── observability.yaml         # Alert Routing, Telegram & Logging Thresholds
├── core/                          # Platform Core Engine Subsystems
│   ├── order_manager.py           # Order Lifecycle & Partial-Fill Accounting
│   ├── position_handler.py        # Active Position Tracking & Liquidation Buffer
│   ├── database.py                # SQLite WAL Database Engine & Schema Migrations
│   ├── indicators_engine.py       # TA-Lib Multi-Timeframe Vectorized Computing
│   ├── strategy_router.py         # Dynamic Strategy Plugin Loader & Dispatcher
│   ├── risk_engine.py             # Margin Validation & Exposure Controls
│   ├── exchange.py                # Unified CCXT Exchange Connector
│   ├── live_ws_runner.py          # WebSocket Market & Account Stream Listener
│   └── binance_rest_resilience.py # REST Rate-Limiting & Exponential Backoff
├── strategies/                    # Modular Strategy Framework
│   ├── entry/                     # Entry Strategy Plugins
│   └── exit/                      # Exit Strategy Plugins
├── dashboard/                     # Flask Web Dashboard Subsystem
│   ├── api_server.py              # Flask Web Server & Authentication Endpoints
│   └── dashboard_api.py           # Real-Time Telemetry Data Feed APIs
└── reports/                       # Quantitative Performance Report Generator`}
            </pre>
          </div>
        </section>

        {/* Footer Navigation CTA */}
        <div
          style={{
            background: "var(--surface)",
            border: "var(--pixel-border)",
            borderRadius: "var(--radius-card)",
            padding: "2.5rem 2rem",
            boxShadow: "var(--pixel-shadow)",
            textAlign: "center",
            marginTop: "4rem",
          }}
        >
          <h3 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "0.75rem" }}>
            Interested in Discussing Systems Architecture?
          </h3>
          <p style={{ fontSize: "var(--text-sm)", color: "var(--text-secondary)", marginBottom: "1.5rem", maxWidth: 540, margin: "0 auto 1.5rem" }}>
            Whether discussing Salesforce CRM architectures, Python backend systems, or quantitative trading engines, feel free to reach out.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
            <Link
              href="/#contact"
              style={{
                padding: "0.625rem 1.25rem",
                border: "var(--pixel-border-accent)",
                borderRadius: "var(--radius-button)",
                background: "var(--accent)",
                color: "white",
                fontWeight: 600,
                fontSize: "var(--text-xs)",
                textDecoration: "none",
              }}
            >
              GET IN TOUCH →
            </Link>
            <Link
              href="/"
              style={{
                padding: "0.625rem 1.25rem",
                border: "1px solid var(--border)",
                borderRadius: "var(--radius-button)",
                background: "var(--surface-muted)",
                color: "var(--text-primary)",
                fontWeight: 600,
                fontSize: "var(--text-xs)",
                textDecoration: "none",
              }}
            >
              RETURN TO PORTFOLIO
            </Link>
          </div>
        </div>
      </main>

      <style>{`
        @media (max-width: 768px) {
          .onyx-header {
            padding: 0.875rem 1rem !important;
          }
          .onyx-header-inner {
            flex-direction: column;
            align-items: stretch !important;
            gap: 1rem !important;
          }
          .onyx-header-left {
            justify-content: space-between;
          }
          .onyx-header-right {
            justify-content: space-between;
          }
          .onyx-back-btn {
            flex: 1;
            justify-content: center;
          }
        }
        @media (max-width: 480px) {
          .onyx-header-title {
            display: none;
          }
        }
      `}</style>
    </div>
  );
}
