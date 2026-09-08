# OnyxFlow Algorithmic Trading Platform
## System Architecture & Technical Specification

```
DOCUMENT ID      : ONYX-SPEC-2026-V2.4
SYSTEM STATUS    : ACTIVE / FORWARD PAPER-TESTING
CLASSIFICATION   : PROPRIETARY ENGINEERING ARCHITECTURE
AUTHOR           : PRASHANT SINHA (SYSTEMS ARCHITECT & DEVELOPER)
TARGET ASSETS    : CRYPTOCURRENCY PERPETUAL FUTURES (SOL, BTC, ETH)
LAST REVISED     : 2026
```

---

## Table of Contents

1. [Executive Summary](#1-executive-summary)
2. [High-Level System Architecture](#2-high-level-system-architecture)
3. [Component Interaction & Execution Flow](#3-component-interaction--execution-flow)
4. [Technology Stack & Rationale](#4-technology-stack--rationale)
5. [Core Engine Subsystems](#5-core-engine-subsystems)
6. [Strategy Engine Architecture](#6-strategy-engine-architecture)
7. [Data Pipeline & Dual-Cache Storage](#7-data-pipeline--dual-cache-storage)
8. [Exchange Gateway & API Resilience](#8-exchange-gateway--api-resilience)
9. [Telemetry, Observability & Web Dashboard](#9-telemetry-observability--web-dashboard)
10. [Trading Logic & Multi-Timeframe Matrix](#10-trading-logic--multi-timeframe-matrix)
11. [Testing, Validation & Empirical Performance](#11-testing-validation--empirical-performance)
12. [Critical Engineering Challenges & Solutions](#12-critical-engineering-challenges--solutions)
13. [DevOps, Portability & Operational Standards](#13-devops-portability--operational-standards)
14. [Engineering Skills Matrix](#14-engineering-skills-matrix)
15. [Repository Structure](#15-repository-structure)

---

## 1. Executive Summary

**OnyxFlow** is an enterprise-grade, modular, runtime-first algorithmic trading platform engineered specifically for cryptocurrency futures derivatives (SOL/USDT, BTC/USDT, ETH/USDT). Built from the ground up as a production-hardened system, OnyxFlow enables multi-timeframe regime identification, signal generation, partial-fill aware order execution, dynamic risk management, and real-time state recovery.

### Primary Engineering Objectives

- **Low-Latency, High-Reliability Execution**: Resilient handling of WebSocket disconnects, API rate limits, slippage, and volatile perpetual spreads.
- **Robust State Recovery & Financial Integrity**: Deterministic handling of execution edge cases, including partial fills, network partitions, process restarts, and exchange state reconciliations without trade drift.
- **Modular & Decoupled Architecture**: Plug-and-play strategy loading via configuration without modifying underlying order management or indicators code.
- **Real-Time Observability**: Delivering operational posture, position metrics, health diagnostics, and audit logs via an embedded interactive Flask dashboard and Telegram telemetry bot.

---

## 2. High-Level System Architecture

OnyxFlow features a decoupled, event-driven, layer-oriented architecture designed to isolate core execution mechanics from external APIs, strategy definitions, and analytical layers.

```
+-----------------------------------------------------------------------------------+
|                                 USER INTERFACE LAYER                              |
|   +--------------------------+  +--------------------------+  +-----------------+ |
|   |  Flask Web Dashboard     |  |   Telegram Telemetry     |  | Interactive CLI | |
|   |  (HTML5 / CSS / Chart.js)|  |   Alert Bot              |  | Rich Logger     | |
|   +------------+-------------+  +------------+-------------+  +--------+--------+ |
+----------------|-----------------------------|-------------------------|----------+
                 | REST / SSE                  | Webhook                 | Standard Out
+----------------v-----------------------------v-------------------------v----------+
|                              APPLICATION & API LAYER                              |
|   +-----------------------------------------------------------------------------+ |
|   | Dashboard API Server (/dashboard/api_server.py & /dashboard/dashboard_api.py)| |
|   | - Session Auth (Bcrypt / PyOTP 2FA)  - CORS & Limiter  - Config Overrides   | |
|   +--------------------------------------+--------------------------------------+ |
+------------------------------------------|----------------------------------------+
                                           | Event Bus / State Queries
+------------------------------------------v----------------------------------------+
|                                CORE ENGINE LAYER                                  |
|  +--------------------------+  +--------------------------+  +------------------+ |
|  |   Strategy Router        |  |  Indicators Engine       |  |  Risk Engine     | |
|  | (/strategies/entry & exit|  | (TA-Lib / NumPy / Pandas)|  | (Adaptive Caps)  | |
|  +------------+-------------+  +------------+-------------+  +--------+---------+ |
|               |                             |                         |           |
|               +----------------------+------+-------------------------+           |
|                                      |                                            |
|                                      v                                            |
|  +------------------------------------------------------------------------------+ |
|  | Order Manager & Position Handler (/core/order_manager.py & position_handler) | |
|  | - Deterministic clientOrderId   - Partial-fill tracking                      | |
|  | - Reduce-only enforcement       - Liquidation Guardian watcher               | |
|  +-----------------------------------+------------------------------------------+ |
+--------------------------------------|--------------------------------------------+
                                       | Thread-Safe Queue / WebSocket
+--------------------------------------v--------------------------------------------+
|                            EXCHANGE INTERFACE LAYER                               |
|  +-----------------------------------+------------------------------------------+ |
|  | Exchange Gateway & Resilience     | Live WebSocket Runner                    | |
|  | (/core/exchange.py, CCXT, REST)   | (/core/live_ws_runner.py & market data)  | |
|  +-----------------+-----------------+--------------------+---------------------+ |
+--------------------|--------------------------------------|-----------------------+
                     | REST Requests                        | WebSocket Stream
                     v                                      v
+-----------------------------------------------------------------------------------+
|                            EXTERNAL EXCHANGES / APIS                              |
|               [ Binance Futures API ]   [ Delta Exchange India API ]              |
+-----------------------------------------------------------------------------------+
                                       |
                                       v
+-----------------------------------------------------------------------------------+
|                              PERSISTENCE & DATA LAYER                             |
|  +-----------------------------+  +--------------------+  +--------------------+  |
|  | SQLite Local Database (WAL) |  | PostgreSQL Server  |  | Supabase Storage   |  |
|  | (/logs/trade_log.db)        |  | Analytics Store    |  | Backup & Cloud Sync|  |
|  +-----------------------------+  +--------------------+  +--------------------+  |
+-----------------------------------------------------------------------------------+
```

---

## 3. Component Interaction & Execution Flow

```
[ Market Data Stream ]
         │
         ▼
[ Live WebSocket Ingestion ] ──────► (/core/live_ws_runner.py)
         │
         ▼
[ Multi-TF Indicator Engine ] ─────► (/core/indicators_engine.py)
         │                           TA-Lib vectorization & dual-cache
         ▼
[ Strategy Router & Signal ] ──────► (/core/strategy_router.py)
         │                           Modular entry & exit evaluation
         ▼
[ Risk Engine Validation ] ────────► (/core/risk_engine.py)
         │                           Margin check, exposure caps, vol-div filters
         ▼
[ Order Manager Execution ] ───────► (/core/order_manager.py)
         │                           Deterministic clientOrderId, reduce-only flags
         ▼
[ Database & Telemetry Sync ] ─────► (/core/database.py & /core/telegram_bot.py)
                                     SQLite WAL commit, Telegram dispatch, SSE push
```

1. **Market Data Ingestion**: `LiveWSRunner` ([/core/live_ws_runner.py](/core/live_ws_runner.py)) and `MarketDataWS` establish persistent WebSocket feeds with exchange endpoints to ingest orderbook depth, trade ticks, and OHLCV klines across active symbols (SOL/USDT, BTC/USDT, ETH/USDT) and multiple timeframes (1m, 15m, 30m, 4h).
2. **Indicator Computation & Caching**: `IndicatorsEngine` ([/core/indicators_engine.py](/core/indicators_engine.py)) computes vectorized technical indicators (MACD, RSI, ADX, ATR, EMA, Taker Volume Delta) using `TA-Lib`, `Pandas`, and `NumPy`, caching calculated values in a thread-safe dual-cache structure.
3. **Signal Evaluation**: `StrategyRouter` ([/core/strategy_router.py](/core/strategy_router.py)) passes enriched candle snapshots to active strategy plugins. Strategy classes calculate confidence scores and determine entry and exit signals without mutating core system state.
4. **Risk Validation**: Qualified entry and exit intents are submitted to `RiskEngine` ([/core/risk_engine.py](/core/risk_engine.py)) for leverage enforcement, margin verification, volume divergence validation, and max exposure limits.
5. **Order Execution & Reconciliation**: Validated orders are passed to `OrderManager` ([/core/order_manager.py](/core/order_manager.py)), which generates deterministic `clientOrderId` tags (e.g., `ORD_...`, `CLS_...`). The manager enforces `reduce-only` orders for exits and tracks partial fills incrementally.
6. **State Persistence & Forensics**: Every order state change, indicator snapshot at entry/exit, and PnL calculation is transactionally persisted into SQLite WAL via `Database` ([/core/database.py](/core/database.py)) and synced to PostgreSQL / Supabase for offline analysis.
7. **Observability & User Interface**: System health metrics, position states, and telemetry events are broadcast via WebSocket and SSE to the Flask dashboard ([/dashboard/api_server.py](/dashboard/api_server.py)) and routed to Telegram via `TelegramBot` ([/core/telegram_bot.py](/core/telegram_bot.py)).

### Primary Design Patterns

- **Plugin / Strategy Pattern**: Strategy modules implement uniform interfaces, allowing runtime plug-and-play capability without altering core engine modules.
- **Factory & Singleton Pattern**: Utilized in `Database`, `ConfigLoader`, and exchange connectors to maintain single authoritative instances of connection pools and configuration trees.
- **Observer / Event Bus Pattern**: Implemented in [/core/event_bus.py](/core/event_bus.py) for decoupling market state changes, position updates, and execution alerts from UI rendering and Telegram notifications.
- **Repository Pattern**: Abstracted database access in `Database` ([/core/database.py](/core/database.py)) isolates raw SQL queries and schema migrations from application logic.
- **Circuit Breaker / Resilience Pattern**: Applied in REST exchange wrappers (`BinanceRestResilience`, `ExchangeHealthMonitor`) to handle API outages and rate limits gracefully.

---

## 4. Technology Stack & Rationale

| Layer | Technology | Selection Rationale | Project Role | Considered Alternatives |
| :--- | :--- | :--- | :--- | :--- |
| **Runtime Core** | **Python 3.11+** | Rich financial computing ecosystem, asynchronous I/O, fast developer turnaround | Core runtime engine, signal computation, exchange integrations, REST API | C++ (over-engineered for MVP), Rust (slower iteration cycle) |
| **Web Dashboard** | **Flask 3.1** | Lightweight, unobtrusive Python web framework with minimal overhead | Real-time monitoring dashboard, REST endpoints, user authentication, control APIs | FastAPI (Flask chosen for simple template views and custom SSE/WS handlers) |
| **Vector Math** | **Pandas & NumPy** | Optimized C-extensions for fast array manipulation and time series processing | Resampling klines across 1m, 15m, 30m, 4h, rolling windows, trade analysis | Polars (Pandas provided seamless TA-Lib binding support) |
| **Indicator Lib** | **TA-Lib (C-Binding)** | Industry-standard C library providing highly optimized technical indicators | High-performance MACD, RSI, ADX, ATR, and EMA calculations | Pure Python indicators (excessive execution overhead during tick processing) |
| **Local Database** | **SQLite (WAL Mode)** | Zero-configuration, embedded, low-latency disk storage with write-ahead logging | Primary live runtime persistence, instant write speeds, zero network hops | Pure memory dicts (vulnerable to data loss on crashes) |
| **Data Warehouse** | **PostgreSQL / Supabase** | Robust ACID relational schema, powerful analytical queries, cloud accessibility | Long-term data warehousing, multi-session backtest analysis, cloud backups | MongoDB (relational schemas were critical for double-entry trade ledgering) |
| **Exchange Lib** | **CCXT & WebSockets** | Unified crypto exchange library with perpetual futures support | Interfacing with exchange REST endpoints for order placement, balances, market feeds | Custom API wrappers (CCXT provided standardized exception handling) |
| **Configuration** | **PyYAML** | Clean, human-readable configuration standard supporting nested structure | Externalizing system parameters, strategy presets, session overrides, risk thresholds | JSON (no native comment support), TOML (less flexible for deep hierarchies) |

---

## 5. Core Engine Subsystems

### 5.1 Order Manager ([/core/order_manager.py](/core/order_manager.py))
- **Purpose**: Centralized component responsible for order lifecycle management, partial fill tracking, concurrency locks, and deterministic client ID generation.
- **Key Methods**: `OrderManager`, `submit_entry_order()`, `submit_exit_order()`, `reconcile_positions()`.
- **Interactions**: Interacts directly with `Exchange` for REST calls, `Database` for persistence, `PositionHandler` for state updating, and `TelegramBot` for immediate alert routing.
- **Design Decisions**: Implemented deterministic `clientOrderId` generation (e.g., `ORD_...` for entries, `CLS_...` for exits) to guarantee idempotency and simplify state recovery upon system restart.

### 5.2 Indicators Engine ([/core/indicators_engine.py](/core/indicators_engine.py))
- **Purpose**: Computes multi-timeframe technical indicators, volume metrics, and orderbook microstructure indicators.
- **Key Methods**: `IndicatorsEngine`, `compute_multi_timeframe_indicators()`, `get_latest_snapshot()`.
- **Interactions**: Consumes raw OHLCV klines from `MarketDataWS` and supplies cached feature dataframes to `StrategyRouter`.
- **Design Decisions**: Implemented an in-memory dual-cache layer to eliminate redundant indicator recalculation on static historical bars, reducing CPU overhead during high-frequency candle ticks.

### 5.3 Position Handler ([/core/position_handler.py](/core/position_handler.py))
- **Purpose**: Tracks active market positions, unrealized and realized PnL, leverage settings, and margin utilization.
- **Key Methods**: `PositionHandler`, `update_position_from_fill()`, `calculate_liquidation_distance()`.
- **Interactions**: Synchronizes state with exchange position feeds via `LiveWSRunner` and persists snapshots into SQLite.
- **Design Decisions**: Implemented real-time liquidation distance calculations on 1-minute intervals to trigger safety stops independent of regular strategy exits.

### 5.4 Database & Schema Manager ([/core/database.py](/core/database.py))
- **Purpose**: Manages connection pooling, automated schema migrations, transactional SQL queries, and data backup routines.
- **Key Methods**: `Database`, `save_trade()`, `update_partial_fill()`, `save_indicator_snapshot()`, `run_migrations()`.
- **Interactions**: Serves as the central persistence layer for `OrderManager`, `PositionHandler`, and `DashboardAPI`.
- **Design Decisions**: Uses SQLite Write-Ahead Logging (WAL) mode to permit concurrent read queries from the Flask dashboard while the core bot writes execution trades without lock contention.

### 5.5 Strategy Router ([/core/strategy_router.py](/core/strategy_router.py))
- **Purpose**: Dynamically loads, registers, and routes streaming market snapshots to active entry and exit strategy modules.
- **Key Methods**: `StrategyRouter`, `load_registered_strategies()`, `evaluate_entry_signals()`, `evaluate_exit_signals()`.
- **Interactions**: Sits between `IndicatorsEngine` and `OrderManager`, invoking modular strategy logic.
- **Design Decisions**: Employs dynamic Python module importing based on YAML configurations, enabling zero-code-change strategy updates.

---

## 6. Strategy Engine Architecture

OnyxFlow features a plug-and-play, decoupled strategy framework designed for multi-timeframe signal evaluation and rapid strategy prototyping.

```
       +-------------------------------------------------------------+
       |               /config/strategy.yaml & presets               |
       |  - Active Entry Modules: [macd_rsi_confluence_plus]         |
       |  - Active Exit Modules:  [hybrid_trailing_exit, ...]        |
       +------------------------------+------------------------------+
                                      | Dynamic Load & Register
                                      v
       +-------------------------------------------------------------+
       |             StrategyRouter (/core/strategy_router.py)       |
       |  - Instantiates Strategy Classes                            |
       |  - Binds Timeframe Indicators & Configurations              |
       +--------------+-------------------------------+--------------+
                      |                               |
        Evaluates     |                               | Evaluates
        Entry Signals |                               | Exit Signals
                      v                               v
       +------------------------------+ +----------------------------+
       | /strategies/entry/           | | /strategies/exit/          |
       | BaseEntryStrategy (Abstract) | | BaseExitStrategy (Abstract)|
       |  + macd_rsi_confluence_plus  | |  + hybrid_trailing_exit    |
       |  + composite_confluence_perp | |  + liquidation_guardian    |
       +------------------------------+ +----------------------------+
```

### Strategy Engine Features

- **Abstract Base Interfaces**: All entry strategies derive from `BaseEntryStrategy` and exit strategies from `BaseExitStrategy`, establishing mandatory contracts (`evaluate()`, `get_required_timeframes()`, `validate_config()`).
- **External Declarative Configuration**: Strategy enablement, weights, indicator thresholds, and risk bounds are defined in `/config/strategy.yaml`.
- **Multi-Timeframe Context Injection**: Strategies declare required timeframes (e.g., 30m primary for entries, 15m for trailing exits, 1m for liquidation guards). The engine bundles and passes synchronized market context frames.
- **Session Overrides**: System operators can pass session-level config adjustments without overwriting master strategy files, facilitating clean A/B testing and backtesting experiment isolation.

---

## 7. Data Pipeline & Dual-Cache Storage

The data pipeline processes high-volume market streams, performs vectorized feature engineering, caches features in memory, and writes state transactionally to database layers.

```
 +------------------+     +------------------------+     +-------------------------+
 | WebSocket Feed   | --> | LiveWSRunner           | --> | IndicatorsEngine        |
 | (Kline / Ticks)  |     | (Data Normalization)   |     | (TA-Lib Vectorization)  |
 +------------------+     +------------------------+     +------------+------------+
                                                                      |
                                                                      v
 +------------------+     +------------------------+     +-------------------------+
 | Supabase Cloud   | <-- | PostgreSQL Store       | <-- | Dual-Cache Storage Layer|
 | (Remote Backup)  |     | (Analytics & Reports)  |     | - Fast Memory Dict      |
 +------------------+     +------------------------+     | - SQLite WAL Database   |
                                                         +-------------------------+
```

### Data Processing Stages

1. **Normalization**: Standardizes raw JSON tick payloads from exchanges (Binance, Delta) into structured `CandleSchema` instances containing uniform fields (`timestamp`, `open`, `high`, `low`, `close`, `volume`, `taker_buy_volume`).
2. **Resampling**: Aggregates 1-minute primary klines into 15m, 30m, and 4h rolling windows using optimized Pandas resampling routines.
3. **Dual-Cache Strategy**:
   - **In-Memory Volatile Cache**: Stores the last $N$ computed candles in Python dictionaries for $O(1)$ lookup speed during signal evaluation.
   - **SQLite Persistent WAL Cache**: Flushes finalized candle records and computed indicator snapshots to `/logs/trade_log.db` to survive process restarts.
4. **Relational & Cloud Sync**: Trade records, execution fees, and performance metrics are synced to PostgreSQL for long-term quantitative analysis and backed up to Supabase cloud storage.

---

## 8. Exchange Gateway & API Resilience

OnyxFlow implements a resilient REST and WebSocket integration layer capable of interfacing with multiple cryptocurrency exchanges.

### Key Resilience Subsystems

- **CCXT Wrapper & Native Fallback**: Utilizes `CCXT` for cross-exchange normalization while maintaining custom native REST request handlers for exchange-specific features (perpetual leverage adjustments, fee rebate tracking).
- **Authentication & Security**: API keys and secrets are loaded from environment variables via `SecretsManager` ([/core/secrets_manager.py](/core/secrets_manager.py)), ensuring sensitive credentials stay in memory and are never written to disk.
- **REST Resilience & Rate Limiting**: Features exponential backoff, request throttling, and auto-retry decorators in `BinanceRestResilience` ([/core/binance_rest_resilience.py](/core/binance_rest_resilience.py)) to withstand exchange rate-limit HTTP 429 errors.
- **Historical vs. Live Data Handling**: Historical klines for backtesting are fetched via REST in paginated chunks and cached locally in `/data/`, whereas live trading consumes low-latency WebSocket streams for instantaneous fill execution.

---

## 9. Telemetry, Observability & Web Dashboard

The monitoring interface is a Flask-based web application providing real-time system visibility, operational controls, and performance metrics.

```
 +---------------------------------------------------------------------------------+
 |                       ONYXFLOW LIVE OPERATIONAL DASHBOARD                       |
 +---------------------------------------------------------------------------------+
 | [SYSTEM STATUS: ACTIVE]  [MODE: PAPER_TRADE]  [EXCHANGE: HEALTHY] [LATENCY: 18ms] |
 +----------------------------------------+----------------------------------------+
 | ACTIVE POSITIONS                       | REAL-TIME METRICS                      |
 | Symbol: SOL/USDT | Side: LONG          | Realized PnL: +$1,240.50               |
 | Entry: $142.50   | Current: $146.80    | Unrealized PnL: +$430.00               |
 | Size: 10.0 SOL   | Liq Dist: 18.4%     | Win Rate: 68.4%                        |
 +----------------------------------------+----------------------------------------+
 | ACTIVE SAFETY BLOCKS                   | SYSTEM LOGS / AUDIT TRAIL              |
 | [Vol Div Block: CLEAR]                 | 23:01:05 [INFO] Candle 30m Closed      |
 | [ADX Filter Block: ACTIVE (Low Vol)]   | 23:01:06 [SIGNAL] Entry Score Evaluated|
 | [Liquidation Guard: MONITORING]        | 23:01:06 [EXEC] Order ORD_9821 Placed  |
 +----------------------------------------+----------------------------------------+
```

### Dashboard Capabilities

- **Real-Time Telemetry**: Uses Server-Sent Events (SSE) and polling APIs to deliver sub-second position updates, unrealized PnL shifts, and market state diagnostics without full page reloads.
- **Interactive Bot Control**: Enables operators to start, stop, or pause trading operations, change runtime modes, or trigger manual position closes via authenticated Flask endpoints ([/dashboard/api_server.py](/dashboard/api_server.py)).
- **Security & Session Management**: Protected by session token authentication, password hashing (`bcrypt`), and optional Multi-Factor Authentication (`pyotp` 2FA).
- **Safety Indicators**: Renders real-time safety blocks including Volume Divergence Blocks, ADX Low-Volatility Filter Blocks, and Liquidation Distance buffers.

---

## 10. Trading Logic & Multi-Timeframe Matrix

*(Note: Strategy parameter ranges and proprietary thresholds are abstracted to protect intellectual property.)*

### 10.1 Multi-Timeframe Matrix

- **Primary Signal Timeframe (30-Minute)**: Evaluates structural market trends, multi-indicator momentum confluences, and volume participation metrics.
- **Exit & Trailing Timeframe (15-Minute)**: Monitors dynamic ATR-based trailing stops, profit ratchets, and momentum exhaustion indicators to protect open gains.
- **Safety Guardian Timeframe (1-Minute)**: Scans price action continuously for extreme adverse excursions, exchange liquidation proximity, and sudden orderbook collapse.

### 10.2 Signal Evaluation & Execution Lifecycle

```
[Market Data Ingestion] 
       │
       ▼
[Calculate Multi-TF Indicators (30m, 15m, 1m)]
       │
       ▼
[Primary Trend & Confluence Scoring (30m)]
       │
       ├─► Failed Confluence Threshold? ──► [Discard Signal]
       │
       ▼
[Filter Checks (Vol Divergence, ADX Regime)]
       │
       ├─► Filter Blocked? ──────────────► [Log & Discard Signal]
       │
       ▼
[Risk Engine Validation (Position Sizing, Margin)]
       │
       ├─► Risk Violation? ──────────────► [Reject Order]
       │
       ▼
[Order Manager Execution (Deterministic clientOrderId)]
       │
       ▼
[Position State Monitored by 15m Exit & 1m Liquidation Guardian]
```

### 10.3 Look-Ahead Bias & Overfitting Prevention

- **Closed-Candle Execution**: Signal calculations evaluate exclusively on finalized, closed bars (`bar_index - 1`), preventing repainting or look-ahead bias during historical backtests and live execution.
- **Execution Slippage & Fee Modeling**: Backtesting routines incorporate realistic taker fee structures (0.05% per fill), exchange settlement rules, and worst-case price slippage models.

---

## 11. Testing, Validation & Empirical Performance

### 11.1 Backtesting Methodology ([/core/backtest_engine.py](/core/backtest_engine.py))
- **Event-Driven Simulation**: Iterates bar-by-bar over multi-year historical datasets stored in `/data/`, simulating order matching, partial fill queueing, and margin calls.
- **Performance Reporting ([/reports/report_generator.py](/reports/report_generator.py))**: Computes quantitative metrics including Sharpe Ratio, Sortino Ratio, Max Drawdown (MDD), Profit Factor, Win Rate, Average Win/Loss ratio, and Expectancy.

### 11.2 Empirical Validation Metrics
- **Historical Backtest Performance (2024 - 2026)**: Achieved consistent **10% - 20% average portfolio growth** across crypto market regimes while restricting maximum drawdowns to strict predefined limits.
- **Paper Trading Phase**: Deployed in live paper-trading mode to validate WebSocket stability, partial-fill reconciliation logic, and Telegram alerting under live market conditions without capital risk.

---

## 12. Critical Engineering Challenges & Solutions

| Challenge | Root Cause | Architectural Solution Implemented |
| :--- | :--- | :--- |
| **Partial Fill Desynchronization** | Market orders executing across multiple liquidity matches, leaving residual open balances | Implemented tracking of `closed_amount`, `remaining_amount`, and `cumulative_exit_fees` per fill in `OrderManager` and `PositionHandler`. Position is marked flat only when `remaining_amount == 0`. |
| **Unannounced Crashes & State Drift** | Sudden system power loss or process termination leaving active exchange positions unmonitored | Designed startup state reconciliation ([/core/state_recovery.py](/core/state_recovery.py) & [/core/execution_reconciler.py](/core/execution_reconciler.py)). On startup, queries exchange API for open orders and reconciles with local SQLite state using deterministic `clientOrderId` tags. |
| **Indicator Recalculation Spikes** | Re-computing complex TA-Lib indicators over thousands of historical bars on every 1-second price tick | Built a multi-timeframe dual-cache in `IndicatorsEngine`. Historical completed bars are calculated once and cached; only the current open bar is updated on incoming tick streams. |
| **SQLite Write-Lock Contention** | Concurrent read requests from Flask dashboard blocking database writes by core bot runner | Configured SQLite Write-Ahead Logging (`PRAGMA journal_mode=WAL;`), enabling simultaneous non-blocking reads while the engine executes atomic writes. |
| **Exchange Rate Limits & Drops** | High-frequency REST requests causing HTTP 429 rate limit bans during volatility spikes | Implemented connection resilience layer (`BinanceRestResilience`) featuring exponential backoff, request jitter, circuit breaking, and WebSocket automatic reconnect loops. |

---

## 13. DevOps, Portability & Operational Standards

- **Git Branching Strategy**: Clean separation between `main` (production-ready code), `develop` (staging/paper testing), and isolated `feature/*` branches.
- **Commit Discipline**: Standardized conventional commit messages (`feat:`, `fix:`, `refactor:`, `docs:`, `perf:`) reflecting architectural purpose.
- **Cross-Platform Portability**: Project configuration via `.portable-project.yml` and [/scripts/portable_project.py](/scripts/portable_project.py) enables frictionless execution across Windows local workstations and Linux cloud servers.
- **Environment Management**: Secrets isolated via `.env` files and `.gitignore` masks. Complete dependency isolation via standard Python virtual environments (`.venv`) and pinned versions in `requirements.txt`.

---

## 14. Engineering Skills Matrix

| Core Competency | Demonstrated In Codebase | Representative Module References |
| :--- | :--- | :--- |
| **Python Software Engineering** | Object-oriented design, abstract base classes, type hints, thread concurrency, custom exception handling | [/bot_runner.py](/bot_runner.py), [/core/order_manager.py](/core/order_manager.py) |
| **System Architecture & Design** | Event-driven architecture, decoupled strategy router, factory pattern, observer pattern, circuit breakers | [/core/strategy_router.py](/core/strategy_router.py), [/core/event_bus.py](/core/event_bus.py) |
| **Database Engineering** | SQLite WAL concurrency optimization, automated schema migration scripts, transactional integrity, state forensics | [/core/database.py](/core/database.py) |
| **API Development & Web Frameworks** | Flask REST API endpoints, SSE real-time streaming, CORS security, rate limiting, Jinja dashboard interface | [/dashboard/api_server.py](/dashboard/api_server.py), [/dashboard/dashboard_api.py](/dashboard/dashboard_api.py) |
| **Financial & Quantitative Computing** | Multi-timeframe indicator computation, vectorized calculations, PnL tracking, Sharpe/Sortino metrics | [/core/indicators_engine.py](/core/indicators_engine.py), [/reports/report_generator.py](/reports/report_generator.py) |
| **High-Availability & Fault Tolerance** | State recovery on startup, partial-fill accounting, deterministic order ID tracking, REST retry logic | [/core/execution_reconciler.py](/core/execution_reconciler.py), [/core/binance_rest_resilience.py](/core/binance_rest_resilience.py) |
| **Security & Authentication** | Secrets isolation, Bcrypt password hashing, PyOTP 2FA integration, API key encryption | [/core/secrets_manager.py](/core/secrets_manager.py), [/dashboard/api_server.py](/dashboard/api_server.py) |
| **DevOps & Software Portability** | Cross-platform runtime scripts, YAML configuration management, environment separation, Git workflow | [/scripts/portable_project.py](/scripts/portable_project.py), [/config/config.yaml](/config/config.yaml) |

---

## 15. Repository Structure

```
Onyxflow/
├── main.py                        # Primary CLI entrypoint & runtime initializer
├── main_production.py             # Headless production execution entrypoint
├── bot_runner.py                  # Core runtime loop & process manager
├── requirements.txt               # Pinned Python dependencies
├── README.md                      # Quickstart & runtime documentation
├── config/                        # Hierarchical configuration files
│   ├── config.yaml                # Master application anchors & timeframe settings
│   ├── strategy.yaml              # Strategy enablement & parameter bindings
│   ├── runtime_trade.yaml         # Risk limits, leverage guards & sizing knobs
│   ├── execution_integrity.yaml   # Exchange retry & idempotency rules
│   ├── observability.yaml         # Alert routing, Telegram & logging thresholds
│   └── dashboard.yaml             # UI visualization configurations
├── core/                          # Platform core engine subsystems
│   ├── order_manager.py           # Order lifecycle & partial-fill accounting
│   ├── position_handler.py        # Active position tracking & liquidation buffer
│   ├── database.py                # SQLite WAL database engine & schema migrations
│   ├── indicators_engine.py       # TA-Lib multi-timeframe vectorized computing
│   ├── strategy_router.py         # Dynamic strategy plugin loader & dispatcher
│   ├── risk_engine.py             # Margin validation & exposure controls
│   ├── exchange.py                # Unified CCXT exchange connector
│   ├── live_ws_runner.py          # WebSocket market & account stream listener
│   ├── binance_rest_resilience.py # REST rate-limiting & exponential backoff
│   ├── execution_reconciler.py    # Restart position & order state recovery
│   ├── telegram_bot.py            # Event-driven telemetry notification bot
│   ├── secrets_manager.py         # Secure environment credential management
│   └── event_bus.py               # Asynchronous inter-module event bus
├── strategies/                    # Modular strategy framework
│   ├── entry/                     # Entry strategy plugins
│   │   ├── macd_rsi_confluence_plus.py
│   │   └── composite_confluence_perp.py
│   └── exit/                      # Exit strategy plugins
│       ├── hybrid_trailing_exit.py
│       └── liquidation_guardian_exit.py
├── dashboard/                     # Flask web dashboard subsystem
│   ├── api_server.py              # Flask web server & authentication endpoints
│   ├── dashboard_api.py           # Real-time telemetry data feed APIs
│   ├── index.html                 # Main operational monitoring interface
│   ├── botcontrol.html            # Remote control & operations panel
│   ├── analytics.html             # Performance & forensic visualization
│   ├── terminal.html              # Embedded log telemetry terminal
│   └── styles/ & scripts/         # UI CSS tokens & frontend JavaScript
├── data/                          # Cached historical kline data (Parquet/CSV)
├── logs/                          # Runtime logs & SQLite primary database (trade_log.db)
├── reports/                       # Quantitative performance report generator
├── analytics/                     # Post-trade analytics & trade journaling
└── scripts/                       # Operational maintenance & portability utilities
```

---
*(End of System Architecture & Technical Specification)*
