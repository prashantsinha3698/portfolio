"use client";

import { ExternalLink } from "lucide-react";
import { GitHubIcon } from "@/components/ui/SocialIcons";
import ProjectDocumentationLayout from "@/components/layout/ProjectDocumentationLayout";
import SectionLabel from "@/components/ui/SectionLabel";
import { getTranslation, Locale } from "@/locales";

interface QuantfolioViewProps {
  locale: Locale;
}

export default function QuantfolioView({ locale }: QuantfolioViewProps) {
  const t = getTranslation(locale);
  const q = t.quantfolioPage;
  const isDe = locale === "de";

  const technologies = [
    "Python",
    "SciPy",
    "FastAPI",
    "React",
    "Plotly",
    "NumPy",
    "Apache Parquet",
  ];

  const problemItems = isDe
    ? [
        {
          title: "Singuläre Kovarianzmatrizen",
          desc: "Wenn zwei Assets nahezu identisch korrelieren oder die Datenhistorie zu kurz ist, wird die Stichproben-Kovarianzmatrix nicht-invertierbar. Durch Ledoit-Wolf-Shrinkage wird die Matrix in Richtung einer Diagonalmatrix geschrumpft, um die positive Semidefinitheit rechnerisch zu garantieren.",
        },
        {
          title: "Konvergenzfehler des Solvers",
          desc: "Strikte Gleichungsnebenbedingungen (wie eine exakte Summe der Gewichte von 1,0) können bei zu hoch gewählten Renditezielen zum Abbruch numerischer Solver führen. Die Implementierung von Schrankenprüfungen und Fallback-Algorithmen gewährleistet eine stabile Ausführung.",
        },
        {
          title: "Latenz durch wiederholte API-Abfragen",
          desc: "Das wiederholte Abrufen historischer Kursdaten von öffentlichen Finanz-Endpunkten bei jeder Nutzeraktion führte zu Rate-Limit-Sperren. Eine lokale Parquet-Cache-Ebene nach Ticker-Symbol und Zeitraum reduzierte redundante Netzwerkanfragen vollständig.",
        },
      ]
    : [
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
      ];

  const architectureTiers = isDe
    ? [
        { tier: "Schicht 1: Dateningestion & Parquet-Cache", desc: "Lädt historische Schlusskurse und speichert tägliche Partitionen lokal ab, um Ratenbegrenzungen zu vermeiden." },
        { tier: "Schicht 2: Kovarianz- & Risikoberechnungen", desc: "Berechnet Renditen, annualisierte Volatilität, Value at Risk (VaR) sowie bereinigte Kovarianzmatrizen." },
        { tier: "Schicht 3: SciPy SLSQP Solver", desc: "Sequential Least Squares Solver zur Ermittlung optimaler Gewichtsvektoren für Sharpe-Ratio- und Minimalvarianz-Ziele." },
        { tier: "Schicht 4: FastAPI & React Schnittstelle", desc: "FastAPI REST-Endpunkte liefern aggregierte JSON-Daten an ein React-Frontend mit interaktiven Plotly-Diagrammen." },
      ]
    : [
        { tier: "Tier 1: Data Ingestion and Parquet Cache", desc: "Downloads historical closes and stores daily partitions locally to prevent rate limiting." },
        { tier: "Tier 2: Covariance and Risk Calculations", desc: "Calculates returns, annual volatility, Value at Risk (VaR), and covariance matrices." },
        { tier: "Tier 3: SciPy SLSQP Solver", desc: "Sequential Least Squares solver finding optimal weight vectors for Sharpe and minimum variance targets." },
        { tier: "Tier 4: FastAPI and React Interface", desc: "FastAPI REST endpoints serving JSON data to a React frontend with Plotly charts." },
      ];

  const invariantItems = isDe
    ? [
        { test: "Budget-Restriktion", check: "w^T * 1 = 1.0 (Summe aller Gewichte muss exakt 100% betragen)" },
        { test: "Nicht-Negativität", check: "0.0 ≤ w_i ≤ 1.0 (keine Short-Positionen mit negativen Gewichten)" },
        { test: "Risiko-Monotonie", check: "CVaR ≥ VaR über alle ausgewerteten Konfidenzintervalle" },
        { test: "Kovarianz-Symmetrie", check: "Σ = Σ^T mit ausschließlich positiven Eigenwerten" },
      ]
    : [
        { test: "Budget Constraint", check: "w^T * 1 = 1.0 (weights must sum to 100%)" },
        { test: "Non-negativity", check: "0.0 ≤ w_i ≤ 1.0 (no negative weight short positions)" },
        { test: "Risk Monotonicity", check: "CVaR ≥ VaR across all evaluated confidence intervals" },
        { test: "Covariance Symmetry", check: "Σ = Σ^T with all positive eigenvalues" },
      ];

  const lessonItems = isDe
    ? [
        "Mathematische Modelle sind nur so verlässlich wie ihre Datenbereinigung. Ausreißer und fehlende Handelstage verzerren Kovarianzmatrizen schneller als numerische Solverfehler.",
        "Automatisierte Invarianten-Tests bieten außergewöhnliche Sicherheit beim Refactoring. Tests, die fundamentale mathematische Gesetze verifizieren, schützen vor stillen Regressionsfehlern.",
        "Das Projekt vermittelte mir praxisnahe Erfahrung mit SciPy, numerischen Optimierern und interaktiver Datenvisualisierung, wie sie in klassischer Unternehmens-CRM-Entwicklung selten vorkommen.",
      ]
    : [
        "Mathematical models are only as good as their data cleaning. Outliers and missing trading dates corrupt covariance matrices faster than solver errors.",
        "Automated invariant testing provided immense confidence. Writing tests that verify mathematical laws made it safe to refactor optimization logic.",
        "Building this project gave me practical exposure to SciPy, numerical solvers, and frontend data visualization that I do not encounter in standard enterprise CRM development.",
      ];

  return (
    <ProjectDocumentationLayout
      projectNumber="02"
      title="Quantfolio"
      tagline={q.tagline}
      description={q.description}
      status={q.personalProjectLabel}
      developmentNote={q.devNote}
      technologies={technologies}
      metrics={q.metrics}
      chapters={q.chapters}
      prevProject={{ label: "OnyxFlow", href: isDe ? "/de/projects/onyxflow" : "/projects/onyxflow" }}
      actions={
        <>
          <a
            href="https://quantfolio-prashant-project.vercel.app/"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-tactile-primary"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
          >
            <ExternalLink size={15} /> <span>{isDe ? "LIVE-DEMO" : "LIVE DEMO"}</span>
          </a>
          <a
            href="https://github.com/prashantsinha3698/quantfolio"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-tactile-secondary"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
          >
            <GitHubIcon size={15} /> <span>{isDe ? "GITHUB REPOSITORY" : "GITHUB REPO"}</span>
          </a>
        </>
      }
    >
      {/* 01 / OVERVIEW */}
      <section id="overview" style={{ scrollMarginTop: 100, marginBottom: "3.5rem" }}>
        <SectionLabel number="01" label={isDe ? "ÜBERSICHT" : "OVERVIEW"} />
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.85rem", fontWeight: 400, letterSpacing: "0.02em", margin: "0.5rem 0 1rem" }}>
          {isDe ? "Zielsetzung und Motivation" : "What I Wanted to Build"}
        </h2>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", color: "var(--ink-secondary)", lineHeight: 1.7, marginBottom: "1.25rem" }}>
          {isDe
            ? "Die moderne Portfoliotheorie ist in Lehrbüchern mathematisch klar definiert, ihre praktische Umsetzung in funktionale Software wirft jedoch anspruchsvolle Fragen auf. Wie geht man mit schlecht konditionierten Kovarianzmatrizen um, wenn Vermögenswerte stark korrelieren? Wie hält man Optimierungsdurchläufe schnell genug für interaktive Regler im Webinterface?"
            : "Modern portfolio theory is straightforward in textbooks, but implementing it as functional software introduces interesting practical questions. How do you handle ill-conditioned covariance matrices when assets correlate? How do you make optimization runs fast enough for interactive web sliders?"}
        </p>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", color: "var(--ink-secondary)", lineHeight: 1.7 }}>
          {isDe
            ? "Quantfolio entstand als meine Entwicklungsumgebung, um das Zusammenspiel dieser Komponenten in der Praxis zu erforschen. Die Plattform lädt historische Kursdaten, puffert sie lokal ab, berechnet erwartete Renditen sowie empirische Kovarianzen und ermittelt über numerische Solver optimale Allokationsgewichte."
            : "Quantfolio was my sandbox to learn how these pieces connect. It downloads historical price data, caches it locally, computes expected returns and sample covariances, and uses numerical solvers to generate optimal allocation weights."}
        </p>
      </section>

      {/* 02 / PROBLEM */}
      <section id="problem" style={{ scrollMarginTop: 100, marginBottom: "3.5rem" }}>
        <SectionLabel number="02" label={isDe ? "PROBLEMSTELLUNG" : "PROBLEM"} />
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.85rem", fontWeight: 400, letterSpacing: "0.02em", margin: "0.5rem 0 1rem" }}>
          {isDe ? "Praktische Rand- und Sonderfälle" : "Practical Edge Cases"}
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {problemItems.map((item, i) => (
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
        <SectionLabel number="03" label={isDe ? "OPTIMIERUNGSMODELL" : "OPTIMIZATION MODEL"} />
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.85rem", fontWeight: 400, letterSpacing: "0.02em", margin: "0.5rem 0 1rem" }}>
          {isDe ? "Markowitz-Mittelwert-Varianz-Formulierung" : "Markowitz Mean-Variance Formulation"}
        </h2>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", color: "var(--ink-secondary)", lineHeight: 1.7, marginBottom: "1.25rem" }}>
          {isDe
            ? "Der Kern-Solver minimiert die Portfoliovarianz über diskrete Zielrendite-Schritte hinweg und zeichnet so die Kurve der Effizienzgrenze (Efficient Frontier)."
            : "The core solver minimizes portfolio variance for a series of discrete expected return steps, tracing the efficient frontier curve."}
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
            {isDe ? "OPTIMIERUNGSAUFGABE:" : "OPTIMIZATION PROBLEM:"}
          </div>
          <div>{isDe ? "minimieren:    w^T * Σ * w   (Portfoliovarianz)" : "minimize:   w^T * Σ * w   (Portfolio Variance)"}</div>
          <div>{isDe ? "unter Nebenb.:  sum(w_i) = 1.0  (Vollinvestitions-Budget)" : "subject to: sum(w_i) = 1.0  (Full Investment Budget)"}</div>
          <div>{isDe ? "                w^T * μ ≥ μ_target (Zielrendite-Restriktion)" : "             w^T * μ ≥ μ_target (Target Return Constraint)"}</div>
          <div>{isDe ? "                0.0 ≤ w_i ≤ 1.0  (Long-Only Allokationsschranken)" : "             0.0 ≤ w_i ≤ 1.0  (Long Only Allocation Bounds)"}</div>
        </div>
      </section>

      {/* 04 / ARCHITECTURE */}
      <section id="architecture" style={{ scrollMarginTop: 100, marginBottom: "3.5rem" }}>
        <SectionLabel number="04" label={isDe ? "ARCHITEKTUR" : "ARCHITECTURE"} />
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.85rem", fontWeight: 400, letterSpacing: "0.02em", margin: "0.5rem 0 1rem" }}>
          {isDe ? "Entkoppelte Systemarchitektur" : "Decoupled Architecture"}
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {architectureTiers.map((tItem, i) => (
            <div key={i} style={{ padding: "1rem 1.25rem", background: "var(--bg-surface-subtle)", border: "1px solid var(--border-subtle)", borderLeft: "4px solid var(--accent-primary)" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: "1.25rem", fontWeight: 400, letterSpacing: "0.03em", color: "var(--ink-primary)" }}>
                {tItem.tier}
              </div>
              <div style={{ fontFamily: "var(--font-sans)", fontSize: "0.84rem", color: "var(--ink-secondary)", marginTop: "0.2rem" }}>
                {tItem.desc}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 05 / INVARIANTS */}
      <section id="invariants" style={{ scrollMarginTop: 100, marginBottom: "3.5rem" }}>
        <SectionLabel number="05" label={isDe ? "TESTINVARIANTEN" : "TEST INVARIANTS"} />
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.85rem", fontWeight: 400, letterSpacing: "0.02em", margin: "0.5rem 0 1rem" }}>
          {isDe ? "Automatisierte Verifikations-Suite" : "Automated Verification Suite"}
        </h2>
        <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.95rem", color: "var(--ink-secondary)", lineHeight: 1.7, marginBottom: "1.25rem" }}>
          {isDe
            ? "Ich habe 22 automatisierte Pytest-Unit-Tests implementiert, um die mathematische Konsistenz vor jeder Codeänderung kontinuierlich zu überprüfen."
            : "I wrote 22 automated Pytest unit tests to verify mathematical consistency before deploying code changes."}
        </p>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "1rem" }}>
          {invariantItems.map((inv, i) => (
            <div key={i} style={{ border: "1px solid var(--border-subtle)", background: "var(--bg-surface)", padding: "1rem 1.25rem" }}>
              <div className="font-mono" style={{ fontSize: "0.72rem", color: "var(--accent-primary)", fontWeight: 700 }}>
                {isDe ? `INVARIANTE 0${i + 1}` : `INVARIANT 0${i + 1}`}
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
        <SectionLabel number="06" label={isDe ? "HERAUSFORDERUNGEN" : "CHALLENGES"} />
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.85rem", fontWeight: 400, letterSpacing: "0.02em", margin: "0.5rem 0 1rem" }}>
          {isDe ? "Herausforderungen in der Implementierung" : "What I Struggled With"}
        </h2>
        <div style={{ border: "1px solid var(--border-primary)", background: "var(--bg-surface)", padding: "1.75rem", boxShadow: "var(--shadow-tactile-sm)" }}>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.92rem", color: "var(--ink-secondary)", lineHeight: 1.68, marginBottom: "1rem" }}>
            {isDe
              ? "Eine wesentliche Herausforderung bestand in der Empfindlichkeit des Solvers. Wählen Nutzer Assets mit nahezu identischer Historie, verflacht das Optimierungsgebirge, wodurch der SciPy-Solver stockt oder suboptimale lokale Minima liefert."
              : "One of the harder parts was dealing with solver sensitivity. If users select assets with almost identical return histories, the optimization surface becomes flat, causing the SciPy solver to stall or return sub-optimal solutions."}
          </p>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "0.92rem", color: "var(--ink-secondary)", lineHeight: 1.68 }}>
            {isDe
              ? "Ich löste dies durch vorgeschaltete Korrelationsprüfungen und eine geringfügige Regularisierungsstrafe, die dem Solver stets einen eindeutigen Konvergenzgradienten bietet."
              : "I resolved this by adding asset correlation checks and applying a small regularization penalty to ensure the solver always converges on a clear local minimum."}
          </p>
        </div>
      </section>

      {/* 07 / LESSONS */}
      <section id="lessons" style={{ scrollMarginTop: 100, marginBottom: "2rem" }}>
        <SectionLabel number="07" label={isDe ? "ERKENNTNISSE" : "WHAT I LEARNED"} />
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.85rem", fontWeight: 400, letterSpacing: "0.02em", margin: "0.5rem 0 1rem" }}>
          {isDe ? "Zentrale Erkenntnisse" : "Takeaways"}
        </h2>
        <div style={{ border: "1px solid var(--border-primary)", background: "var(--bg-surface)", padding: "1.75rem", boxShadow: "var(--shadow-tactile-sm)" }}>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.85rem" }}>
            {lessonItems.map((lesson, i) => (
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
