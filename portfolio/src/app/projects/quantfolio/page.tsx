"use client";


import { ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/ui/SocialIcons";
import ProjectDocumentationLayout, { ProjectChapter, ProjectMetric } from "@/components/layout/ProjectDocumentationLayout";
import SectionLabel from "@/components/ui/SectionLabel";

export default function QuantfolioCaseStudyPage() {
  const chapters: ProjectChapter[] = [
    { id: "overview", label: "01 Overview" },
    { id: "problem", label: "02 Problem" },
    { id: "math-model", label: "03 Optimization Model" },
    { id: "architecture", label: "04 Architecture" },
    { id: "invariants", label: "05 Test Invariants" },
    { id: "challenges", label: "06 Challenges" },
    { id: "lessons", label: "07 What I Learned" },
  ];

  const metrics: ProjectMetric[] = [
    { value: "22 / 22 PASS", label: "MATHEMATICAL INVARIANTS", detail: "Automated Pytest suite verifying portfolio weight constraints and risk monotonicity" },
    { value: "4 ENGINES", label: "DECOUPLED PIPELINE", detail: "Independent modules for returns, tail risk simulation, SLSQP optimization, and rebalancing" },
    { value: "PARQUET", label: "LOCAL DATA CACHING", detail: "Local on-disk Arrow partitions to prevent rate limit blocks from public financial APIs" },
    { value: "SLSQP", label: "NUMERICAL SOLVER", detail: "Sequential Least Squares solver for constrained Markowitz Efficient Frontier generation" },
  ];

  const technologies = [
    "Python",
    "SciPy",
    "FastAPI",
    "React",
    "Plotly",
    "NumPy",
    "Apache Parquet",
  ];

  return (
    <ProjectDocumentationLayout
      projectNumber="02"
      title="Quantfolio"
      tagline="Portfolio analytics and optimization tool built to explore risk and allocation"
      description="A personal project I built to understand portfolio risk, optimization and rebalancing. It ingests historical price data, calculates risk-return profiles, runs numerical optimization using SciPy to find efficient frontiers, and provides an interactive web interface to inspect asset weights."
      status="Personal Project"
      developmentNote="Development note: Designed and iterated with AI coding assistance using Codex and Claude Code. I designed the portfolio model, optimization requirements and data flow, using AI tools to assist in numerical scripting and frontend integration."
      technologies={technologies}
      metrics={metrics}
      chapters={chapters}
      prevProject={{ label: "OnyxFlow", href: "/projects/onyxflow" }}
      actions={
        <>
          <a
            href="https://quantfolio-prashant-project.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-tactile-primary"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
          >
            <ExternalLink size={15} /> <span>LIVE DEMO</span>
          </a>
          <a
            href="https://github.com/prashantsinha3698/quantfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-tactile-secondary"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
          >
            <GitHubIcon size={15} /> <span>GITHUB REPO</span>
          </a>
        </>
      }
    >
      {/* 01 / OVERVIEW */}
      <section id="overview" style={{ scrollMarginTop: 100, marginBottom: "3.5rem" }}>
        <SectionLabel number="01" label="OVERVIEW" />
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.85rem", fontWeight: 400, letterSpacing: "0.02em", margin: "0.5rem 0 1rem" }}>
          What I Wanted to Build
        </h2>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", color: "var(--ink-secondary)", lineHeight: 1.7, marginBottom: "1.25rem" }}>
          Modern portfolio theory is straightforward in textbooks, but implementing it as functional software introduces interesting practical questions. How do you handle ill-conditioned covariance matrices when assets correlate? How do you make optimization runs fast enough for interactive web sliders?
        </p>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", color: "var(--ink-secondary)", lineHeight: 1.7 }}>
          Quantfolio was my sandbox to learn how these pieces connect. It downloads historical price data, caches it locally, computes expected returns and sample covariances, and uses numerical solvers to generate optimal allocation weights.
        </p>
      </section>

      {/* 02 / PROBLEM */}
      <section id="problem" style={{ scrollMarginTop: 100, marginBottom: "3.5rem" }}>
        <SectionLabel number="02" label="PROBLEM" />
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.85rem", fontWeight: 400, letterSpacing: "0.02em", margin: "0.5rem 0 1rem" }}>
          Practical Edge Cases
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {[
            {
              title: "Singular Covariance Matrices",
              desc: "When two assets move almost identically or data history is short, the sample covariance matrix can become non-invertible. Using Ledoit-Wolf shrinkage shrinks the sample matrix toward a diagonal target to ensure positive semi-definiteness.",
            },
            {
              title: "Solver Convergence Failures",
              desc: "Strict equality constraints like requiring weights to sum to exactly 1.0 can cause numerical solvers to fail if return targets are set too high. Adding bound checks and fallback solvers keeps the engine stable.",
            },
            {
              title: "Slow API Polling",
              desc: "Fetching historical prices from public financial endpoints on every user click caused rate limit blocks. Adding an on-disk Parquet cache keyed by asset ticker and date range eliminated redundant requests.",
            },
          ].map((item, i) => (
            <div key={i} style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface)", padding: "1.25rem" }}>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 400, letterSpacing: "0.03em", fontSize: "1.25rem", color: "var(--ink-primary)", marginBottom: "0.3rem" }}>
                {item.title}
              </div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.86rem", color: "var(--ink-secondary)", lineHeight: 1.6 }}>
                {item.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 03 / OPTIMIZATION MODEL */}
      <section id="math-model" style={{ scrollMarginTop: 100, marginBottom: "3.5rem" }}>
        <SectionLabel number="03" label="OPTIMIZATION MODEL" />
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.85rem", fontWeight: 400, letterSpacing: "0.02em", margin: "0.5rem 0 1rem" }}>
          Markowitz Mean-Variance Formulation
        </h2>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", color: "var(--ink-secondary)", lineHeight: 1.7, marginBottom: "1.25rem" }}>
          The core solver minimizes portfolio variance for a series of discrete expected return steps, tracing the efficient frontier curve.
        </p>

        <div
          className="font-mono"
          style={{
            background: "var(--bg-surface-subtle)",
            border: "1px solid var(--border-primary)",
            padding: "1.25rem",
            fontSize: "0.82rem",
            lineHeight: 1.65,
            marginBottom: "1.5rem",
          }}
        >
          <div style={{ color: "var(--accent-primary)", fontWeight: 700, marginBottom: "0.4rem" }}>
            OPTIMIZATION PROBLEM:
          </div>
          <div>minimize:   w^T * Σ * w   (Portfolio Variance)</div>
          <div>subject to: sum(w_i) = 1.0  (Full Investment Budget)</div>
          <div>             w^T * μ ≥ μ_target (Target Return Constraint)</div>
          <div>             0.0 ≤ w_i ≤ 1.0  (Long Only Allocation Bounds)</div>
        </div>
      </section>

      {/* 04 / ARCHITECTURE */}
      <section id="architecture" style={{ scrollMarginTop: 100, marginBottom: "3.5rem" }}>
        <SectionLabel number="04" label="ARCHITECTURE" />
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.85rem", fontWeight: 400, letterSpacing: "0.02em", margin: "0.5rem 0 1rem" }}>
          Decoupled Architecture
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {[
            { tier: "Tier 1: Data Ingestion and Parquet Cache", desc: "Downloads historical closes and stores daily partitions locally to prevent rate limiting." },
            { tier: "Tier 2: Covariance and Risk Calculations", desc: "Calculates returns, annual volatility, Value at Risk (VaR), and covariance matrices." },
            { tier: "Tier 3: SciPy SLSQP Solver", desc: "Sequential Least Squares solver finding optimal weight vectors for Sharpe and minimum variance targets." },
            { tier: "Tier 4: FastAPI and React Interface", desc: "FastAPI REST endpoints serving JSON data to a React frontend with Plotly charts." },
          ].map((t, i) => (
            <div key={i} style={{ padding: "1rem 1.25rem", background: "var(--bg-surface-subtle)", border: "1px solid var(--border-subtle)", borderLeft: "4px solid var(--accent-primary)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 400, letterSpacing: "0.03em", color: "var(--ink-primary)" }}>
                {t.tier}
              </div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.84rem", color: "var(--ink-secondary)", marginTop: "0.2rem" }}>
                {t.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 05 / INVARIANTS */}
      <section id="invariants" style={{ scrollMarginTop: 100, marginBottom: "3.5rem" }}>
        <SectionLabel number="05" label="TEST INVARIANTS" />
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.85rem", fontWeight: 400, letterSpacing: "0.02em", margin: "0.5rem 0 1rem" }}>
          Automated Verification Suite
        </h2>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", color: "var(--ink-secondary)", lineHeight: 1.7, marginBottom: "1.25rem" }}>
          I wrote 22 automated Pytest unit tests to verify mathematical consistency before deploying code changes.
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
          {[
            { test: "Budget Constraint", check: "w^T * 1 = 1.0 (weights must sum to 100%)" },
            { test: "Non-negativity", check: "0.0 ≤ w_i ≤ 1.0 (no negative weight short positions)" },
            { test: "Risk Monotonicity", check: "CVaR ≥ VaR across all evaluated confidence intervals" },
            { test: "Covariance Symmetry", check: "Σ = Σ^T with all positive eigenvalues" },
          ].map((inv, i) => (
            <div key={i} style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface)", padding: "1rem 1.25rem" }}>
              <div className="font-mono" style={{ fontSize: "0.72rem", color: "var(--accent-primary)", fontWeight: 700 }}>
                INVARIANT 0{i + 1}
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontWeight: 400, letterSpacing: "0.03em", fontSize: "1.2rem", color: "var(--ink-primary)", margin: "0.2rem 0" }}>
                {inv.test}
              </div>
              <div className="font-mono" style={{ fontSize: "0.78rem", color: "var(--ink-muted)" }}>
                {inv.check}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 06 / CHALLENGES */}
      <section id="challenges" style={{ scrollMarginTop: 100, marginBottom: "3.5rem" }}>
        <SectionLabel number="06" label="CHALLENGES" />
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.85rem", fontWeight: 400, letterSpacing: "0.02em", margin: "0.5rem 0 1rem" }}>
          What I Struggled With
        </h2>
        <div style={{ border: "1px solid var(--border-primary)", background: "var(--bg-surface)", padding: "1.75rem", boxShadow: "var(--shadow-tactile-sm)" }}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.92rem", color: "var(--ink-secondary)", lineHeight: 1.68, marginBottom: "1rem" }}>
            One of the harder parts was dealing with solver sensitivity. If users select assets with almost identical return histories, the optimization surface becomes flat, causing the SciPy solver to stall or return sub-optimal solutions.
          </p>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.92rem", color: "var(--ink-secondary)", lineHeight: 1.68 }}>
            I resolved this by adding asset correlation checks and applying a small regularization penalty to ensure the solver always converges on a clear local minimum.
          </p>
        </div>
      </section>

      {/* 07 / LESSONS */}
      <section id="lessons" style={{ scrollMarginTop: 100, marginBottom: "2rem" }}>
        <SectionLabel number="07" label="WHAT I LEARNED" />
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.85rem", fontWeight: 400, letterSpacing: "0.02em", margin: "0.5rem 0 1rem" }}>
          Takeaways
        </h2>
        <div style={{ border: "1px solid var(--border-primary)", background: "var(--bg-surface)", padding: "1.75rem", boxShadow: "var(--shadow-tactile-sm)" }}>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {[
              "Mathematical models are only as good as their data cleaning. Outliers and missing trading dates corrupt covariance matrices faster than solver errors.",
              "Automated invariant testing provided immense confidence. Writing tests that verify mathematical laws made it safe to refactor optimization logic.",
              "Building this project gave me practical exposure to SciPy, numerical solvers, and frontend data visualization that I do not encounter in standard enterprise CRM development.",
            ].map((lesson, i) => (
              <li key={i} style={{ fontFamily: "var(--font-sans)", fontSize: "0.92rem", color: "var(--ink-secondary)", lineHeight: 1.65, display: "flex", gap: "0.75rem" }}>
                <span style={{ color: "var(--accent-primary)", fontWeight: 700 }}>•</span>
                <span>{lesson}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </ProjectDocumentationLayout>
  );
}

