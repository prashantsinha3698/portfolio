export interface ProjectLevel {
  level: number;
  title: string;
  subtitle: string;
  content: string[];
  techNotes?: { label: string; value: string }[];
  codeSnippet?: string;
}

export interface SelectedProject {
  id: string;
  title: string;
  tagline: string;
  status: string;
  category: string;
  summary: string;
  tags: string[];
  primaryMetrics?: { value: string; label: string; note: string }[];
  levels: ProjectLevel[];
  links: { label: string; url: string | null }[];
  disclaimer?: string;
}

export const onyxflowProject: SelectedProject = {
  id: "onyxflow",
  title: "ONYXFLOW",
  tagline: "Algorithmic Crypto Futures Trading & Risk Platform",
  status: "ACTIVE / TESTING",
  category: "CORE TECHNICAL BUILD",
  summary: "An independent, runtime-first algorithmic trading platform engineered for crypto perpetual futures. The system coordinates closed-candle data ingestion, indicator dual-caching, YAML-driven strategy routing, partial-fill accounting, and local WAL state persistence.",
  tags: [
    "Python 3.11",
    "Flask 3.1",
    "TA-Lib",
    "Pandas & NumPy",
    "SQLite WAL",
    "PostgreSQL",
    "Delta Exchange API",
    "Binance REST",
    "YAML Config",
  ],
  primaryMetrics: [
    {
      value: "< 20 ms",
      label: "SIGNAL LATENCY",
      note: "Vectorized TA-Lib evaluation via dual-cache pipeline",
    },
    {
      value: "30 MIN",
      label: "PRIMARY TIMEFRAME",
      note: "Strict closed-candle evaluation eliminating repainting",
    },
    {
      value: "10–20%",
      label: "BACKTEST RETURN (SIMULATED)",
      note: "Historical simulations on SOL/USDT perpetuals (not guaranteed live returns)",
    },
  ],
  levels: [
    {
      level: 1,
      title: "WHAT IS IT?",
      subtitle: "System overview and scope",
      content: [
        "OnyxFlow is a modular algorithmic trading system built for cryptocurrency perpetual futures (SOL, BTC, ETH).",
        "It ingests market candle feeds from Delta Exchange India and Binance, validates feed integrity, calculates technical indicators across multiple timeframes, evaluates entry and exit conditions through declarative YAML strategy files, and manages order execution with deterministic client identifiers.",
      ],
      techNotes: [
        { label: "Execution Logic", value: "Closed-candle evaluation (strictly at candle close)" },
        { label: "Exchange Gateways", value: "Delta Exchange India REST + Binance Futures" },
        { label: "Storage Engine", value: "Local SQLite with Write-Ahead Logging (WAL) + Postgres sync" },
      ],
    },
    {
      level: 2,
      title: "WHY DID I BUILD IT?",
      subtitle: "The motivation behind an independent financial engine",
      content: [
        "I wanted to build a real-time system where software quality has direct financial consequences. In CRM development, an unhandled exception results in a queued retry or an error log. In an algorithmic trading engine, an unhandled exception or an incorrect position state can cause unintended executions or account liquidation.",
        "Building OnyxFlow from scratch gave me complete visibility into how data flows from exchange sockets to technical indicators, strategy evaluators, risk checks, order managers, and audit databases.",
      ],
    },
    {
      level: 3,
      title: "ARCHITECTURE",
      subtitle: "Decoupled 5-tier layer separation",
      content: [
        "OnyxFlow is divided into five distinct layers to prevent strategy logic from polluting order execution or UI monitoring:",
        "1. Ingestion Layer: Polls REST and WebSocket endpoints for closed OHLCV candles across 1m, 15m, 30m, and 4h intervals.",
        "2. Compute Dual-Cache: A caching layer that separates fast in-memory scalar lookups from SQLite disk persistence, eliminating redundant indicator calculations.",
        "3. Strategy Router: Parses declarative YAML strategy rules, evaluating trend filters, volume divergences, and confirmation signals on closed bars.",
        "4. Risk Engine: Enforces maximum leverage, position size caps, and reduce-only flags before orders leave the application.",
        "5. Execution & Reconciliation: Transmits authenticated REST requests with deterministic clientOrderId tags (ORD_... for entries, CLS_... for exits) to allow restart reconciliation.",
      ],
      techNotes: [
        { label: "Design Pattern", value: "Strategy Pattern + Event Bus + Repository Pattern" },
        { label: "Telemetry", value: "Flask Server-Sent Events (SSE) + Telegram Bot alerts" },
        { label: "Security", value: "Bcrypt password hashing, PyOTP two-factor auth on telemetry dashboard" },
      ],
    },
    {
      level: 4,
      title: "DIFFICULT PROBLEMS",
      subtitle: "Real edge cases in live financial data",
      content: [
        "Eliminating Repainting: Live trading strategies frequently fail because indicators recalculate while the current candle is still forming. I enforced strict closed-candle logic on the 30-minute primary timeframe. No signal can trigger until the candle timestamp is finalized.",
        "Partial-Fill Accounting: When an exit order executes across multiple partial fills, fee tracking becomes non-trivial. I wrote custom accounting logic that updates cumulative exit fees, closed amount, and remaining position size on every execution fill tick.",
        "State Reconciliation: If the server reboots during an open position, the engine must recover the active trade state from the database without placing duplicate orders or drifting stops.",
      ],
    },
    {
      level: 5,
      title: "WHAT WENT WRONG?",
      subtitle: "Failures, bugs, and data integrity debugging",
      content: [
        "During early test sessions on Delta Exchange India, an unexpected API rate limit burst resulted in silent HTTP 429 rejections. The engine believed an exit order was pending, but the exchange had rejected the request. This left an open position unmonitored for nearly twenty minutes.",
        "I resolved this by implementing a circuit breaker pattern with exponential backoff and building an emergency Liquidation Guardian worker that checks open exchange positions every 60 seconds independently of the main loop.",
      ],
    },
    {
      level: 6,
      title: "WHAT I LEARNED & THE ROLE OF AI",
      subtitle: "Engineering discipline and implementation assistance",
      content: [
        "I utilized AI coding tools to accelerate boilerplate generation and explore library interfaces. However, AI cannot verify whether financial math or concurrency state is actually sound.",
        "I retained full responsibility for designing the system architecture, selecting database concurrency models, debugging API payloads, writing unit tests, managing Git commits, and ensuring financial calculations were correct.",
        "The project reinforced that software resilience is about defensive design. Every external API will eventually fail, every network socket will drop, and every database will encounter locks. The system must know how to recover without corrupting user balances.",
      ],
    },
    {
      level: 7,
      title: "CURRENT STATE",
      subtitle: "Active roadmap and operational posture",
      content: [
        "OnyxFlow is currently operating in forward paper-testing and controlled small-capital live verification.",
        "The current focus is expanding multi-exchange parity validation, tuning trailing exit algorithms on high-volatility sessions, and refining the Flask telemetry interface.",
      ],
      techNotes: [
        { label: "Active Symbols", value: "SOL/USDT (primary), BTC/USDT, ETH/USDT" },
        { label: "Development Status", value: "Active independent engineering project" },
      ],
    },
  ],
  links: [
    { label: "ARCHITECTURE OVERVIEW", url: "/onyxflow_system_architecture_overview.md" },
    { label: "GITHUB REPOSITORY", url: "https://github.com/prashantsinha3698" },
  ],
  disclaimer: "Historical performance and backtest figures represent simulated computer models, not guarantees of future returns. OnyxFlow is an independent technical engineering project under active development.",
};

export const quantfolioProject: SelectedProject = {
  id: "quantfolio",
  title: "Quantfolio",
  tagline: "Institutional Portfolio Risk, Mathematical Optimization & Rebalancing Platform",
  status: "DEPLOYED / ACTIVE",
  category: "QUANTITATIVE FINANCE & FULL-STACK",
  summary:
    "A quantitative portfolio analytics platform that calculates historical risk, runs constrained Markowitz optimizations, and generates dollar-denominated rebalancing orders. Built with a decoupled FastAPI analytics engine and an interactive React/Plotly dashboard, backed by 22 automated unit and integration tests enforcing financial invariants.",
  tags: [
    "Python 3.14",
    "FastAPI",
    "SciPy (SLSQP)",
    "NumPy & Pandas",
    "React 19",
    "TypeScript",
    "Tailwind CSS",
    "Plotly.js",
    "Pytest",
    "Parquet Cache",
  ],
  primaryMetrics: [
    {
      value: "22 / 22 PASS",
      label: "MATHEMATICAL INVARIANTS",
      note: "Pytest suite enforcing budget constraints, covariance positive semi-definiteness, percentage risk contributions summing to 100%, and CVaR ≥ VaR",
    },
    {
      value: "4 ENGINES",
      label: "DECOUPLED PIPELINE",
      note: "Independent modules for returns and drawdowns, parametric/historical risk, SciPy SLSQP optimization, and target drift trade generation",
    },
    {
      value: "PARQUET CACHE",
      label: "INGESTION LAYER",
      note: "SHA-256 keyed Arrow partitions to prevent redundant network calls and isolate analytics from yfinance rate limits",
    },
  ],
  levels: [
    {
      level: 1,
      title: "PERFORMANCE & DRAWDOWN ACCOUNTING",
      subtitle: "Compounded returns and underwater loss cycles",
      content: [
        "Computes continuous daily returns, annualized arithmetic return, Compound Annual Growth Rate (CAGR), and risk-adjusted metrics including Sharpe ratio (at fixed 4.0% risk-free rate), Sortino ratio with downside semivariance, and Calmar ratio.",
        "Tracks high-water mark equity curves, underwater drawdown depth, and historical peak-to-trough drawdown episodes with calendar recovery days.",
      ],
      techNotes: [
        { label: "Return Formulas", value: "CAGR, Annualized Arithmetic Return, Daily Geometric Compounding" },
        { label: "Downside Metrics", value: "Sortino (Downside Semivariance), Calmar (CAGR / |MDD|)" },
        { label: "Benchmark Comp", value: "Alpha, Beta, and Tracking Error relative to SPY / QQQ" },
      ],
    },
    {
      level: 2,
      title: "QUANTITATIVE RISK ENGINE",
      subtitle: "Tail risk simulation, PSD covariance, and component volatility",
      content: [
        "Implements dual Value at Risk (VaR): non-parametric historical simulation at 95% and 99% confidence, alongside parametric Gaussian VaR. Computes Conditional Value at Risk (CVaR / Expected Shortfall) to measure average tail losses beyond the VaR cutoff.",
        "Validates sample covariance matrices with eigenvalue checks for positive semi-definiteness (PSD) and diagonal shrinkage, decomposing total portfolio volatility into marginal and percentage component risk contributions.",
      ],
      techNotes: [
        { label: "VaR / CVaR", value: "Historical 95/99% percentiles + Parametric Gaussian (strictly CVaR ≥ VaR)" },
        { label: "Covariance Guard", value: "Eigenvalue inspection for PSD; Ledoit-Wolf diagonal shrinkage" },
        { label: "Risk Decomposition", value: "Marginal (MRC) & Component (PRC) summing to 100%" },
      ],
    },
    {
      level: 3,
      title: "MATHEMATICAL PORTFOLIO OPTIMIZATION",
      subtitle: "Constrained SLSQP solver across the Markowitz frontier",
      content: [
        "Solves constrained mean-variance optimization via SciPy's Sequential Least Squares Programming (SLSQP) solver. Enforces full investment (sum of weights = 1.0) and long-only boundaries (min/max asset constraints).",
        "Traces the Markowitz Efficient Frontier across discrete return targets, plotting the Minimum Volatility and Maximum Sharpe allocations directly against the user's current holdings.",
      ],
      techNotes: [
        { label: "Numerical Solver", value: "SciPy SLSQP (Sequential Least Squares Programming)" },
        { label: "Constraint Types", value: "Equality budget sum(w) = 1.0; Inequality individual bounds w_min ≤ w_i ≤ w_max" },
        { label: "Frontier Plotting", value: "Pareto-optimal risk/return coordinates evaluated dynamically" },
      ],
    },
    {
      level: 4,
      title: "ACTIONABLE REBALANCING & DRIFT DETECTION",
      subtitle: "Delta trade generation with minimum transaction thresholds",
      content: [
        "Monitors target weight divergence (drift = current weight - target weight), categorizing positions into normal, warning, or action-required states.",
        "Calculates exact dollar trade sizes, buys/sells, and estimated share orders, with execution filters to suppress sub-$1,000 noise trades and model simulated transaction cost drag.",
      ],
      techNotes: [
        { label: "Drift Classification", value: "Normal, Warning, Action-Required based on configured tolerance" },
        { label: "Execution Logic", value: "Dollar-denominated delta orders + share count estimation" },
        { label: "Friction Modeling", value: "Transaction fee drag calculation and sub-threshold noise filtering" },
      ],
    },
  ],
  links: [
    { label: "LIVE DEMO", url: "https://quantfolio-prashant-project.vercel.app/" },
    { label: "SOURCE CODE", url: "https://github.com/prashantsinha3698/quantfolio" },
  ],
  disclaimer:
    "All optimizations and risk metrics represent model-based estimates calculated from historical daily closes. They assume continuous liquidity, historical stationary covariance, and do not model live bid-ask spreads or personal tax liabilities. Past performance does not guarantee future results.",
};

export const secondaryProjects: SelectedProject[] = [
  quantfolioProject,
  {
    id: "covid-tracker",
    title: "COVID-19 Tracker",
    tagline: "Real-Time Global Statistics Web Application",
    status: "COMPLETED",
    category: "WEB APPLICATION",
    summary: "A real-time tracking application displaying worldwide case, recovery, and death statistics by country. Consumed public REST endpoints with dynamic client-side filtering and responsive tables.",
    tags: ["JavaScript", "REST APIs", "HTML5", "CSS3"],
    levels: [
      {
        level: 1,
        title: "OVERVIEW",
        subtitle: "Public API data consumer",
        content: [
          "Built a live statistics portal during the early pandemic to provide clean, unadorned country-level pandemic data.",
          "Integrated public REST APIs to fetch and format real-time updates on active cases, recovered patients, and mortality rates.",
        ],
      },
    ],
    links: [
      { label: "LIVE DEMO", url: "https://covid-19-tracker-d6d1b.web.app/" },
      { label: "SOURCE CODE", url: "https://github.com/prashantsinha3698/covid-19-tracker" },
    ],
  },
];
