"use client";

import { Code } from "lucide-react";
import { GitHubIcon } from "@/components/ui/SocialIcons";
import ProjectDocumentationLayout, { ProjectChapter, ProjectMetric } from "@/components/layout/ProjectDocumentationLayout";
import SectionLabel from "@/components/ui/SectionLabel";

export default function OnyxFlowDocPage() {
  const chapters: ProjectChapter[] = [
    { id: "overview", label: "01 Overview" },
    { id: "problem", label: "02 Problem" },
    { id: "architecture", label: "03 Architecture" },
    { id: "modules", label: "04 Core Modules" },
    { id: "strategy", label: "05 Strategy Logic" },
    { id: "challenges", label: "06 Challenges" },
    { id: "lessons", label: "07 What I Learned" },
    { id: "codebase", label: "08 Codebase" },
  ];

  const metrics: ProjectMetric[] = [
    { value: "< 20 ms", label: "SIGNAL LATENCY TARGET", detail: "Vectorized TA-Lib C-binding and dual-cache evaluation" },
    { value: "100%", label: "STATE RECONCILIATION", detail: "Deterministic client order IDs to recover state on restart" },
    { value: "30 MIN", label: "CLOSED CANDLE EVAL", detail: "Strict bar closure evaluation to eliminate indicator repainting" },
    { value: "5 TIERS", label: "DECOUPLED LAYERS", detail: "Independent ingestion, caching, strategy, risk, and execution" },
  ];

  const technologies = [
    "Python 3.11",
    "SQLite WAL",
    "TA-Lib",
    "Flask SSE",
    "WebSockets",
    "Pandas",
    "YAML Config",
  ];

  return (
    <ProjectDocumentationLayout
      projectNumber="01"
      title="OnyxFlow"
      tagline="A personal project exploring market data, strategy evaluation, risk controls and recovery"
      description="I built OnyxFlow to explore how a small trading system could handle live market data feeds, indicator calculations, risk controls and process recovery without becoming difficult to reason about. It connects to cryptocurrency exchange WebSocket feeds, parses candle intervals, calculates technical signals, and records execution states in a local database."
      status="Personal Project"
      developmentNote="Development note: Designed and iterated with AI coding assistance using Codex and Claude Code. I designed the project requirements, data models and system boundaries, and used AI tools to accelerate implementation, write repetitive boilerplate, and debug issues."
      technologies={technologies}
      metrics={metrics}
      chapters={chapters}
      nextProject={{ label: "Quantfolio", href: "/projects/quantfolio" }}
      actions={
        <>
          <a
            href="https://github.com/prashantsinha3698"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-tactile-primary"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
          >
            <GitHubIcon size={15} /> <span>GITHUB REPO</span>
          </a>
          <a
            href="#architecture"
            className="btn-tactile-secondary"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
          >
            <Code size={15} /> <span>ARCHITECTURE</span>
          </a>
        </>
      }
    >
      {/* 01 / OVERVIEW */}
      <section id="overview" style={{ scrollMarginTop: 100, marginBottom: "3.5rem" }}>
        <SectionLabel number="01" label="OVERVIEW" />
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.85rem", fontWeight: 400, letterSpacing: "0.02em", margin: "0.5rem 0 1.25rem" }}>
          Why I Built This System
        </h2>

        <div style={{ border: "1px solid var(--border-primary)", background: "var(--bg-surface)", padding: "1.75rem 2rem", boxShadow: "var(--shadow-tactile-sm)" }}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", color: "var(--ink-secondary)", lineHeight: 1.7, marginBottom: "1.25rem" }}>
            Most basic trading scripts place API orders in simple loops. In real situations, things go wrong quickly. WebSocket connections drop, market orders execute in multiple partial fills, historical indicator recalculations peg the CPU, and if the process restarts while a position is open, the script loses track of state.
          </p>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", color: "var(--ink-secondary)", lineHeight: 1.7 }}>
            I wanted to build an architecture that addresses these problems systematically. The focus was not on finding a magical trading strategy, but on designing the engineering plumbing: handling streaming feeds, caching indicators, validating risk constraints, and reconciling state upon restart.
          </p>
        </div>
      </section>

      {/* 02 / PROBLEM */}
      <section id="problem" style={{ scrollMarginTop: 100, marginBottom: "3.5rem" }}>
        <SectionLabel number="02" label="PROBLEM" />
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.85rem", fontWeight: 400, letterSpacing: "0.02em", margin: "0.5rem 0 1.25rem" }}>
          The Core Technical Challenges
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
          {[
            {
              title: "Process Restarts and State Drift",
              desc: "If the Python process crashes or the server restarts during an open trade, the bot must query the exchange, identify open orders, and reconcile local state without placing duplicate trades.",
            },
            {
              title: "Partial Fills",
              desc: "Market orders often fill across multiple smaller matches. Position tracking must track cumulative filled quantity and fees, only considering a position closed when the remaining quantity is exactly zero.",
            },
            {
              title: "Redundant Indicator Recalculation",
              desc: "Re-computing technical indicators over thousands of historical bars on every incoming 1-second price tick wastes CPU. Completed bars should be computed once and cached in memory.",
            },
            {
              title: "Database Lock Contention",
              desc: "Allowing a web dashboard to read trade logs while the core engine is writing orders can lock the database. Using SQLite Write-Ahead Logging allows concurrent readers without blocking writes.",
            },
          ].map((p, i) => (
            <div key={i} style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface)", padding: "1.5rem" }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 400, letterSpacing: "0.03em", fontSize: "1.25rem", color: "var(--ink-primary)", marginBottom: "0.4rem" }}>
                {p.title}
              </div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.86rem", color: "var(--ink-secondary)", lineHeight: 1.6 }}>
                {p.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 03 / ARCHITECTURE */}
      <section id="architecture" style={{ scrollMarginTop: 100, marginBottom: "3.5rem" }}>
        <SectionLabel number="03" label="ARCHITECTURE" />
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.85rem", fontWeight: 400, letterSpacing: "0.02em", margin: "0.5rem 0 1.25rem" }}>
          5-Layer Decoupled Design
        </h2>

        <div style={{ border: "1px solid var(--border-primary)", background: "var(--bg-surface)", padding: "1.75rem 2rem", boxShadow: "var(--shadow-tactile-sm)", display: "flex", flexDirection: "column", gap: "1rem" }}>
          {[
            {
              layer: "Layer 01: Telemetry and Dashboard",
              desc: "Flask web server with server-sent events (SSE) streaming position data and log updates to a local browser interface.",
            },
            {
              layer: "Layer 02: API and Gateway",
              desc: "Exchange connectors handling REST orders and WebSocket kline streams with automated reconnection backoff.",
            },
            {
              layer: "Layer 03: Core Engine and Routing",
              desc: "Loads strategy plugins dynamically from configuration files, calculates technical indicators, and coordinates order decisions.",
            },
            {
              layer: "Layer 04: Risk and Position Manager",
              desc: "Validates position sizing, margin limits, stop losses, and tracks remaining amounts during partial fills.",
            },
            {
              layer: "Layer 05: Persistence and Audit Log",
              desc: "SQLite database configured in WAL mode storing trade executions, fills, and audit snapshots with zero write locks.",
            },
          ].map((l, i) => (
            <div
              key={i}
              style={{
                padding: "1.1rem 1.25rem",
                background: "var(--bg-surface-subtle)",
                border: "1px solid var(--border-subtle)",
                borderLeft: "4px solid var(--accent-primary)",
              }}
            >
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 400, letterSpacing: "0.03em", color: "var(--ink-primary)", marginBottom: "0.25rem" }}>
                {l.layer}
              </div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.86rem", color: "var(--ink-secondary)", lineHeight: 1.5 }}>
                {l.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 04 / CORE MODULES */}
      <section id="modules" style={{ scrollMarginTop: 100, marginBottom: "3.5rem" }}>
        <SectionLabel number="04" label="CORE MODULES" />
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.85rem", fontWeight: 400, letterSpacing: "0.02em", margin: "0.5rem 0 1.25rem" }}>
          Implementation Details
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {[
            {
              mod: "Order Manager",
              file: "core/order_manager.py",
              purpose: "Tracks order lifecycles and handles partial fills.",
              decision: "Generates deterministic client order IDs (ORD_... for entries, CLS_... for exits) so that if the bot disconnects, it can query the exchange and identify whether the order actually went through.",
            },
            {
              mod: "Indicators Engine",
              file: "core/indicators_engine.py",
              purpose: "Computes technical indicators across multi-timeframe candle bars.",
              decision: "Uses an in-memory dual cache. Historical completed bars are computed once and stored; incoming real time ticks only update the current open bar.",
            },
            {
              mod: "Position Handler",
              file: "core/position_handler.py",
              purpose: "Maintains active position state, entry prices, and stop loss levels.",
              decision: "Tracks exact remaining filled quantities so a position is not considered closed until all partial exit matches have settled.",
            },
            {
              mod: "Database Manager",
              file: "core/database.py",
              purpose: "Manages local transactional storage for execution logs.",
              decision: "Enables SQLite Write-Ahead Logging (PRAGMA journal_mode=WAL) so that dashboard reads do not block atomic trade writes.",
            },
          ].map((m, i) => (
            <div
              key={i}
              style={{
                background: "var(--bg-surface)",
                border: "1px solid var(--border-primary)",
                padding: "1.5rem",
                boxShadow: "var(--shadow-tactile-sm)",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.5rem", flexWrap: "wrap", gap: "0.5rem" }}>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem", fontWeight: 400, letterSpacing: "0.03em", color: "var(--ink-primary)" }}>
                  {m.mod}
                </h3>
                <code style={{ fontFamily: "var(--font-mono)", fontSize: "0.78rem", color: "var(--accent-primary)", background: "var(--bg-surface-subtle)", padding: "0.2rem 0.5rem", border: "1px solid var(--border-subtle)" }}>
                  {m.file}
                </code>
              </div>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", color: "var(--ink-secondary)", lineHeight: 1.6, marginBottom: "0.4rem" }}>
                <strong>Role:</strong> {m.purpose}
              </p>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", color: "var(--ink-secondary)", lineHeight: 1.6 }}>
                <strong>Key Choice:</strong> {m.decision}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 05 / STRATEGY */}
      <section id="strategy" style={{ scrollMarginTop: 100, marginBottom: "3.5rem" }}>
        <SectionLabel number="05" label="STRATEGY LOGIC" />
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.85rem", fontWeight: 400, letterSpacing: "0.02em", margin: "0.5rem 0 1.25rem" }}>
          Multi-Timeframe Structure
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.25rem" }}>
          {[
            {
              tf: "30-MINUTE PRIMARY",
              role: "Signal Evaluation",
              desc: "Evaluates trend direction and momentum signals strictly on closed candles to avoid repainting artifacts.",
            },
            {
              tf: "15-MINUTE EXIT",
              role: "Trailing Stop Protection",
              desc: "Calculates ATR-based dynamic trailing stops to lock in unrealized gains once price moves in the intended direction.",
            },
            {
              tf: "1-MINUTE CHECK",
              role: "Emergency Safety Guardian",
              desc: "Monitors mark price every minute to trigger immediate liquidation prevention stops if market conditions suddenly diverge.",
            },
          ].map((s, i) => (
            <div key={i} style={{ background: "var(--bg-surface)", border: "1px solid var(--border-primary)", padding: "1.5rem", boxShadow: "var(--shadow-tactile-sm)" }}>
              <div className="font-mono" style={{ fontSize: "0.72rem", color: "var(--accent-primary)", fontWeight: 700, marginBottom: "0.4rem" }}>
                {s.tf}
              </div>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 400, letterSpacing: "0.03em", color: "var(--ink-primary)", marginBottom: "0.35rem" }}>
                {s.role}
              </h3>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.85rem", color: "var(--ink-secondary)", lineHeight: 1.55 }}>
                {s.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 06 / CHALLENGES */}
      <section id="challenges" style={{ scrollMarginTop: 100, marginBottom: "3.5rem" }}>
        <SectionLabel number="06" label="CHALLENGES" />
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.85rem", fontWeight: 400, letterSpacing: "0.02em", margin: "0.5rem 0 1.25rem" }}>
          What Was Difficult and How I Solved It
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {[
            {
              problem: "State recovery after sudden process crash",
              detail: "If the script died with open orders, restarting it without careful checks would either orphan the position or place a duplicate trade.",
              solution: "Built a startup recovery module in core/state_recovery.py. When the engine starts, it checks the exchange API for open orders, matches them against local SQLite records via deterministic client order IDs, and restores the active position before resuming normal evaluation.",
            },
            {
              problem: "Handling partial order fills across multiple matches",
              detail: "A market order for 0.5 BTC might fill in three separate pieces (0.2, 0.2, 0.1). Treating the first fill as the complete exit broke position accounting.",
              solution: "Tracked closed amount, remaining amount, and cumulative fees per fill. A position is marked flat only when remaining quantity equals zero.",
            },
            {
              problem: "Dashboard read queries blocking bot database writes",
              detail: "Polling the database from the web UI occasionally locked SQLite, causing write timeouts during order placement.",
              solution: "Enabled Write-Ahead Logging mode (PRAGMA journal_mode=WAL). This allows readers to read from the main database file while the core engine writes into the WAL log without contention.",
            },
          ].map((item, i) => (
            <div key={i} style={{ background: "var(--bg-surface)", border: "1px solid var(--border-primary)", padding: "1.5rem", boxShadow: "var(--shadow-tactile-sm)" }}>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.3rem", fontWeight: 400, letterSpacing: "0.03em", color: "var(--accent-primary)", marginBottom: "0.5rem" }}>
                {item.problem}
              </h3>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", color: "var(--ink-secondary)", lineHeight: 1.6, marginBottom: "0.75rem" }}>
                <strong>The issue:</strong> {item.detail}
              </p>
              <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.88rem", color: "var(--ink-secondary)", lineHeight: 1.6 }}>
                <strong>The fix:</strong> {item.solution}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 07 / LESSONS */}
      <section id="lessons" style={{ scrollMarginTop: 100, marginBottom: "3.5rem" }}>
        <SectionLabel number="07" label="WHAT I LEARNED" />
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.85rem", fontWeight: 400, letterSpacing: "0.02em", margin: "0.5rem 0 1.25rem" }}>
          Key Takeaways
        </h2>

        <div style={{ border: "1px solid var(--border-primary)", background: "var(--bg-surface)", padding: "2rem", boxShadow: "var(--shadow-tactile-sm)" }}>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              "Idempotency is essential in any stateful system. Relying on API responses alone without deterministic client generated identifiers makes recovery almost impossible.",
              "Separating strategy rules from execution mechanics was the best architectural choice. It allowed testing entry logic independently without risking accidental API calls.",
              "AI coding assistants like Codex and Claude Code were helpful for testing edge cases and writing repetitive boilerplate, but having a clear mental model of data flow was required to keep the architecture clean.",
            ].map((lesson, i) => (
              <li key={i} style={{ fontFamily: "var(--font-sans)", fontSize: "0.92rem", color: "var(--ink-secondary)", lineHeight: 1.65, display: "flex", gap: "0.75rem" }}>
                <span style={{ color: "var(--accent-primary)", fontWeight: 700 }}>•</span>
                <span>{lesson}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 08 / CODEBASE LAYOUT */}
      <section id="codebase" style={{ scrollMarginTop: 100, marginBottom: "2rem" }}>
        <SectionLabel number="08" label="CODEBASE LAYOUT" />
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.85rem", fontWeight: 400, letterSpacing: "0.02em", margin: "0.5rem 0 1.25rem" }}>
          Project Directory Tree
        </h2>

        <div
          className="font-mono"
          style={{
            background: "var(--bg-surface)",
            border: "1px solid var(--border-primary)",
            padding: "1.5rem",
            boxShadow: "var(--shadow-tactile-sm)",
            fontSize: "0.82rem",
            lineHeight: 1.65,
            color: "var(--ink-secondary)",
            overflowX: "auto",
          }}
        >
          <pre style={{ margin: 0 }}>
            {`Onyxflow/
├── main.py                        # CLI entrypoint and runtime initializer
├── bot_runner.py                  # Main execution loop and WebSocket listener
├── config/                        # Application and strategy configuration
│   ├── config.yaml                # Core exchange and timeframe settings
│   └── strategy.yaml              # Strategy parameters and risk limits
├── core/                          # Engine subsystems
│   ├── order_manager.py           # Order lifecycle and partial-fill tracking
│   ├── position_handler.py        # Position tracking and liquidation proximity
│   ├── database.py                # SQLite WAL database management
│   ├── indicators_engine.py       # TA-Lib calculations and cache
│   ├── state_recovery.py          # Startup exchange reconciliation
│   └── exchange.py                # CCXT exchange connector and error retries
├── strategies/                    # Pluggable strategy modules
│   ├── entry/                     # 30-minute closed candle entry rules
│   └── exit/                      # 15-minute trailing stop protection
└── dashboard/                     # Local telemetry dashboard
    └── api_server.py              # Flask server and SSE real time stream`}
          </pre>
        </div>
      </section>
    </ProjectDocumentationLayout>
  );
}

