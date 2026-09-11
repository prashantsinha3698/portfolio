"use client";

import React, { useState, useEffect, useRef } from "react";
import SectionLabel from "@/components/ui/SectionLabel";
import { ChevronLeft, ChevronRight, Lightbulb } from "lucide-react";

export interface StoryChapter {
  id: string;
  number: number;
  period: string;
  category: string;
  badgeSubtitle?: string;
  title: string;
  teaser: string;
  paragraphs: string[];
  whatILearned: string;
  recordTitle: string;
  recordItems: string[];
}

export const STORY_CHAPTERS: StoryChapter[] = [
  {
    id: "education",
    number: 1,
    period: "2015–19",
    category: "EDUCATION",
    badgeSubtitle: "FOUNDATION · B.E. ET&T · CGPA 7.62",
    title: "Government College of Engineering, Raipur",
    teaser: "Four years studying Electronics & Telecommunications Engineering.",
    paragraphs: [
      "I completed my Bachelor of Engineering in Electronics and Telecommunications at Government College of Engineering, Raipur. My coursework focused on signals, circuits, microprocessors, and digital logic.",
      "The degree gave me a solid technical grounding. Working with hardware constraints and low-level communication protocols taught me how machines actually execute instructions before I shifted my attention toward modern software systems.",
    ],
    whatILearned: "Engineering taught me to respect hardware constraints, structured logic, and how low-level systems function under real load.",
    recordTitle: "[ACADEMIC RECORD]",
    recordItems: [
      "• Institution: GEC Raipur",
      "• Degree: Bachelor of Engineering",
      "• Discipline: Electronics & Telecommunications",
      "• Graduated: 2019",
    ],
  },
  {
    id: "tulipwell",
    number: 2,
    period: "2018",
    category: "COMMERCE",
    badgeSubtitle: "GLOBAL E-COMMERCE · DROPSHIPPING",
    title: "Tulipwell: International E-Commerce",
    teaser: "Selling physical goods to customers in Europe and North America.",
    paragraphs: [
      "While in college in 2018, I started a dropshipping business called Tulipwell. I set up a digital storefront, ran paid customer acquisition campaigns, and fulfilled customer orders directly to buyers in European and North American markets.",
      "This was my earliest experience running an operation where every part mattered. I had to understand conversion rates, international shipping delays, currency conversion costs, customer service emails, and payment gateway chargebacks.",
    ],
    whatILearned: "Software does not exist in a vacuum. You learn how a digital system behaves when you are directly responsible for checkout drop-offs, shipping delays, and the unit economics behind every transaction.",
    recordTitle: "[COMMERCE PROFILE]",
    recordItems: [
      "• Venture: Tulipwell",
      "• Model: International Dropshipping",
      "• Markets: Europe & North America",
      "• Focus: Digital Storefront & Unit Economics",
    ],
  },
  {
    id: "oldtownfunk",
    number: 3,
    period: "2019",
    category: "COMMERCE",
    badgeSubtitle: "APPAREL · PRINT-ON-DEMAND",
    title: "OldtownFunk: Print-on-Demand Clothing",
    teaser: "Testing consumer behavior in the Indian apparel market.",
    paragraphs: [
      "In 2019, I pivoted away from dropshipping to experiment with a print-on-demand clothing label for Indian consumers under the name OldtownFunk.",
      "Selling in India revealed a completely different set of economic realities. Indian consumers are discerning about price and wary of upfront digital payments. Margins on printed apparel were thin, and return rates on Cash on Delivery orders created unpredictable cash flow.",
    ],
    whatILearned: "Selling internationally versus selling domestically requires completely different playbooks. The project was an education in price sensitivity, consumer skepticism, and the brutal reality of thin-margin inventory businesses.",
    recordTitle: "[MARKET EXPLORATION]",
    recordItems: [
      "• Venture: OldtownFunk",
      "• Model: Print-on-Demand Apparel",
      "• Target Market: Domestic India (D2C)",
      "• Focus: Consumer Behavior & Payment Trust",
    ],
  },
  {
    id: "tcs-early",
    number: 4,
    period: "2020–21",
    category: "ENTERPRISE",
    badgeSubtitle: "SYSTEM ENGINEER TRAINEE · SALESFORCE DEV",
    title: "Tata Consultancy Services: Assistant System Engineer",
    teaser: "Stepping inside enterprise Salesforce implementations.",
    paragraphs: [
      "I joined Tata Consultancy Services Limited in January 2020 as an Assistant System Engineer. This was my introduction to large-scale enterprise technology.",
      "I worked as a Salesforce Developer on Sales and Service Cloud projects. I wrote Apex triggers, developed asynchronous batch jobs to handle data updates, customized Visualforce pages, and supported enterprise Azure infrastructure.",
    ],
    whatILearned: "Writing production code inside a global IT services firm taught me the discipline of code reviews, automated test classes, deployment pipelines, and meeting strict SLAs.",
    recordTitle: "[ENTERPRISE PROFILE]",
    recordItems: [
      "• Organization: Tata Consultancy Services",
      "• Role: Assistant System Engineer",
      "• Technologies: Apex, Visualforce, SOQL, Sales Cloud, Azure",
      "• Focus: Defect Resolution & Asynchronous Batch Jobs",
    ],
  },
  {
    id: "tcs-system-eng",
    number: 5,
    period: "2022",
    category: "SYSTEM ENGINEER",
    badgeSubtitle: "AVERY DENNISON ACCOUNT · INTEGRATIONS",
    title: "Avery Dennison Account: System Engineer",
    teaser: "Handling regional enhancements for European and Latin American units.",
    paragraphs: [
      "In January 2022, I was promoted to System Engineer and joined the Avery Dennison account team. My primary role was building and deploying enhancements for their European and Latin American business units.",
      "A key project was designing an Opportunity-triggered REST API integration that generated XML metadata and transmitted it directly to a manufacturing facility system. Automating this eliminated manual data entry errors and increased data throughput by 80%.",
    ],
    whatILearned: "Integrations break at boundaries. Building reliable connections between a modern CRM and legacy manufacturing software requires strict data contracts, defensive parsing, and exhaustive testing.",
    recordTitle: "[INTEGRATION METRICS]",
    recordItems: [
      "• Client Account: Avery Dennison Global",
      "• Role: System Engineer / Salesforce Developer",
      "• Pipeline: Opportunity to Manufacturing REST/XML Pipeline",
      "• Impact: +80% Data Throughput Increase",
    ],
  },
  {
    id: "upsc",
    number: 6,
    period: "2023–24",
    category: "EXAMINATION",
    badgeSubtitle: "UPSC CIVIL SERVICES · RIGOROUS STUDY",
    title: "Union Public Service Commission Civil Services Examination",
    teaser: "Two intensive attempts at India's civil services examination.",
    paragraphs: [
      "I stepped away from private software engineering to prepare full-time for the Union Public Service Commission Civil Services Examination. I attempted the examination twice and was unable to clear it.",
      "I do not view this as a tragic setback or a heroic journey. It was a clear, calculated attempt at a national examination with roughly 0.1% final selection rates. The experience required long stretches of solitary discipline, structured study schedules, and in-depth analysis of Indian polity, economics, administrative history, and international relations.",
    ],
    whatILearned: "Long-term preparation under high uncertainty builds a different kind of mental endurance. It taught me how large institutions govern, how public policy impacts industry, and how to analyze complex qualitative information under tight time limits.",
    recordTitle: "[EXAMINATION DISCIPLINE]",
    recordItems: [
      "• Examination: UPSC Civil Services Examination",
      "• Attempts: 2 Complete Preparation Cycles",
      "• Focus Areas: Indian Economy, Governance, Policy, Modern History",
      "• Skill Gained: High-Volume Analytical Synthesis Under Pressure",
    ],
  },
  {
    id: "pet-research",
    number: 7,
    period: "2024",
    category: "INDUSTRIAL RESEARCH",
    badgeSubtitle: "FEASIBILITY STUDY · PLASTICS & PET",
    title: "PET Bottle & Plastics Manufacturing Research",
    teaser: "Deep feasibility study on setting up a physical manufacturing plant.",
    paragraphs: [
      "Towards the end of 2024, I spent several months researching the viability of setting up an industrial manufacturing plant for PET bottles and plastics.",
      "I evaluated raw material costs, electricity tariffs, machinery procurement, labor requirements, environmental permits, and working capital cycles. After completing the detailed financial modeling, I decided not to proceed. The combination of low profit margins, massive volume requirements, heavy capital lock-in, and bureaucratic approvals made the business profile unattractive for me at that stage.",
    ],
    whatILearned: "Knowing when not to build something is as important as knowing how to build it. Walking away from a project after rigorous research saved time and capital that would have been trapped in an unviable operation.",
    recordTitle: "[FEASIBILITY METRICS]",
    recordItems: [
      "• Scope: Industrial PET Bottle Plant Feasibility",
      "• Evaluation: Raw Material Tariffs, Working Capital, Compliance",
      "• Capital Profile: Heavy Asset Lock-in & Low Operating Margin",
      "• Decision: Rigorous Model-Driven Pivot Away From Manufacturing",
    ],
  },
  {
    id: "suto-cafe",
    number: 8,
    period: "2025",
    category: "HOSPITALITY",
    badgeSubtitle: "RETAIL OPERATIONS · STORE MANAGEMENT",
    title: "SUTO Cafe: Retail Operations in Raipur",
    teaser: "Running a physical coffee shop outlet in partnership with SUTO Cafe.",
    paragraphs: [
      "In 2025, I opened a physical coffee shop outlet in Raipur in partnership with SUTO Cafe. I managed day-to-day retail operations, staff hiring, shift training, raw material inventory, and customer retention.",
      "Running a physical shop was entirely different from software. When a line of customers forms or milk supply is delayed, you cannot push a hotfix to production. You have to handle people directly, motivate young staff, manage wastage, and watch cash flow on a daily sheet.",
    ],
    whatILearned: "Managing real people in physical environments teaches patience and operational empathy. You understand customer psychology, price sensitivity, and how operational friction affects frontline workers.",
    recordTitle: "[OPERATIONAL SCOPE]",
    recordItems: [
      "• Outlet: SUTO Cafe Partner Location (Raipur)",
      "• Responsibilities: Staff Roster, Daily Cashflow, Wastage Control",
      "• Frontline Dynamics: In-Person Customer Service & Shift Leadership",
      "• Key Learning: Practical Operational Empathy Under Real Demand",
    ],
  },
  {
    id: "onyxflow-story",
    number: 9,
    period: "2025–",
    category: "SYSTEM BUILDING",
    badgeSubtitle: "ALGORITHMIC TRADING · RUNTIME-FIRST",
    title: "OnyxFlow: Algorithmic Futures Trading Engine",
    teaser: "Architecting a modular, runtime-first crypto futures trading platform.",
    paragraphs: [
      "During this period, I began architecting OnyxFlow, an independent algorithmic trading system for crypto perpetual futures. I wanted to design a software system from the ground up where precision, data integrity, and error recovery had direct financial consequences.",
      "I utilized modern AI coding tools to accelerate initial boilerplate and implementation tasks. However, I took full personal responsibility for the system architecture, YAML strategy engine design, dual-cache indicators pipeline, Git version control, exchange API safety, and data validation.",
    ],
    whatILearned: "AI tools can write functions, but the engineer must decide the architecture, verify data integrity, test edge cases, and ensure the system behaves safely when network connections drop.",
    recordTitle: "[ENGINEERING ARCHITECTURE]",
    recordItems: [
      "• System: OnyxFlow Engine",
      "• Core Tech: Python, FastAPI, WebSockets, SQLite, React",
      "• Design: YAML Strategy Schemas & Non-Blocking Event Loops",
      "• Ownership: 100% Personal System Architecture & Invariant Testing",
    ],
  },
];

export default function StoryTimeline() {
  const [activeIdx, setActiveIdx] = useState(0);
  const currentChapter = STORY_CHAPTERS[activeIdx];
  const itemRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const isProgrammaticScroll = useRef(false);

  // Desktop scroll tracking: sync the active chapter as user scrolls the page
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handleScroll = () => {
      if (isProgrammaticScroll.current) return;
      if (window.innerWidth <= 960) return;

      const targetY = window.innerHeight * 0.38;
      let closestIdx = activeIdx;
      let minDistance = Infinity;

      itemRefs.current.forEach((el, idx) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const dist = Math.abs(cardCenter - targetY);

        if (rect.bottom > 80 && rect.top < window.innerHeight - 80) {
          if (dist < minDistance) {
            minDistance = dist;
            closestIdx = idx;
          }
        }
      });

      if (closestIdx !== activeIdx && minDistance < 320) {
        setActiveIdx(closestIdx);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [activeIdx]);

  const scrollToChapter = (index: number) => {
    isProgrammaticScroll.current = true;
    const targetEl = itemRefs.current[index];
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
    setTimeout(() => {
      isProgrammaticScroll.current = false;
    }, 600);
  };

  const handleSelectChapter = (index: number) => {
    setActiveIdx(index);
    scrollToChapter(index);
  };

  const handlePrev = () => {
    if (activeIdx > 0) {
      const nextIdx = activeIdx - 1;
      setActiveIdx(nextIdx);
      scrollToChapter(nextIdx);
    }
  };

  const handleNext = () => {
    if (activeIdx < STORY_CHAPTERS.length - 1) {
      const nextIdx = activeIdx + 1;
      setActiveIdx(nextIdx);
      scrollToChapter(nextIdx);
    }
  };

  return (
    <section className="about-timeline-section" id="chronology">
      {/* Section Header */}
      <div
        style={{
          marginBottom: "2.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          flexWrap: "wrap",
          gap: "1.5rem",
        }}
      >
        <div>
          <SectionLabel number="02" label="CHRONOLOGY" />
          <h2
            className="font-display"
            style={{
              fontSize: "clamp(1.75rem, 3.5vw, 2.4rem)",
              color: "var(--ink-primary)",
              letterSpacing: "-0.03em",
              lineHeight: 1.1,
              fontWeight: 700,
              marginTop: "0.25rem",
            }}
          >
            The Story
          </h2>
        </div>
        <div
          className="font-mono"
          style={{
            fontSize: "0.82rem",
            color: "var(--ink-muted)",
            maxWidth: "440px",
            lineHeight: 1.5,
          }}
        >
          An honest chronology of engineering foundations, business ventures, public examinations, retail operations, and system building.
        </div>
      </div>

      {/* Desktop Split View (> 960px) */}
      <div className="story-desktop-grid">
        {/* Left Column: Interactive Rail Index */}
        <div style={{ display: "flex", flexDirection: "column", gap: "1.15rem", position: "relative" }}>
          {/* Vertical Connecting Rail Line */}
          <div
            aria-hidden="true"
            style={{
              position: "absolute",
              left: "19px",
              top: "24px",
              bottom: "35vh",
              width: "2px",
              background: "var(--border-subtle)",
              zIndex: 0,
            }}
          />

          {STORY_CHAPTERS.map((ch, idx) => {
            const isActive = activeIdx === idx;
            return (
              <button
                type="button"
                key={ch.id}
                ref={(el) => {
                  itemRefs.current[idx] = el;
                }}
                onClick={() => handleSelectChapter(idx)}
                style={{
                  position: "relative",
                  zIndex: 1,
                  padding: "1.15rem 1.25rem 1.15rem 3.25rem",
                  background: isActive ? "var(--bg-surface)" : "var(--bg-surface-subtle)",
                  border: isActive ? "2px solid var(--accent-primary)" : "1px solid var(--border-subtle)",
                  boxShadow: isActive ? "var(--shadow-tactile)" : "none",
                  cursor: "pointer",
                  textAlign: "left",
                  transition: "all var(--motion-fast) var(--ease-mechanical)",
                  display: "block",
                  width: "100%",
                  boxSizing: "border-box",
                }}
                className="timeline-index-btn"
                aria-pressed={isActive}
              >
                {/* Numbered Node Circle */}
                <div
                  style={{
                    position: "absolute",
                    left: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "20px",
                    height: "20px",
                    background: isActive ? "var(--accent-primary)" : "var(--bg-surface)",
                    border: isActive ? "2px solid var(--border-primary)" : "2px solid var(--border-subtle)",
                    color: isActive ? "#FFFFFF" : "var(--ink-muted)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "0.62rem",
                    fontWeight: 700,
                    fontFamily: "var(--font-mono)",
                    transition: "all var(--motion-fast)",
                  }}
                >
                  {ch.number}
                </div>

                {/* Chapter Meta */}
                <div
                  className="font-mono"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    fontSize: "0.72rem",
                    marginBottom: "0.3rem",
                    color: isActive ? "var(--accent-primary)" : "var(--ink-muted)",
                    fontWeight: 700,
                  }}
                >
                  <span>{ch.period}</span>
                  <span style={{ letterSpacing: "0.04em" }}>{ch.category}</span>
                </div>

                {/* Chapter Title */}
                <div
                  className="font-display"
                  style={{
                    fontSize: "1.02rem",
                    fontWeight: 700,
                    color: "var(--ink-primary)",
                    marginBottom: "0.25rem",
                    letterSpacing: "-0.01em",
                  }}
                >
                  {ch.title}
                </div>

                {/* Chapter Teaser */}
                <div
                  style={{
                    fontSize: "0.82rem",
                    color: "var(--ink-secondary)",
                    lineHeight: 1.45,
                  }}
                >
                  {ch.teaser}
                </div>
              </button>
            );
          })}

          {/* Spacer allowing Chapter 9 to scroll comfortably into reader view */}
          <div style={{ height: "35vh" }} aria-hidden="true" />
        </div>

        {/* Right Column: Sticky Reader Panel */}
        <div className="sticky-story-panel">
          {/* Panel Top Header */}
          <div
            style={{
              padding: "1rem 1.5rem 0.85rem",
              borderBottom: "1px solid var(--border-subtle)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexShrink: 0,
              background: "var(--bg-surface)",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "0.65rem" }}>
              <span
                className="font-mono"
                style={{
                  padding: "0.2rem 0.55rem",
                  background: "var(--accent-primary)",
                  color: "#FFFFFF",
                  fontSize: "0.72rem",
                  fontWeight: 700,
                  letterSpacing: "0.02em",
                }}
              >
                {currentChapter.period}
              </span>
              <span
                className="font-mono"
                style={{
                  fontSize: "0.74rem",
                  color: "var(--ink-muted)",
                  fontWeight: 700,
                  letterSpacing: "0.05em",
                }}
              >
                CHAPTER {String(currentChapter.number).padStart(2, "0")} / {String(STORY_CHAPTERS.length).padStart(2, "0")}
              </span>
            </div>

            {/* Navigation Buttons */}
            <div style={{ display: "flex", alignItems: "center", gap: "0.45rem" }}>
              <button
                type="button"
                onClick={handlePrev}
                disabled={activeIdx === 0}
                aria-label="Previous chapter"
                className="btn-tactile-secondary font-mono"
                style={{
                  padding: "0.25rem 0.65rem",
                  fontSize: "0.72rem",
                  minHeight: "30px",
                  opacity: activeIdx === 0 ? 0.35 : 1,
                  cursor: activeIdx === 0 ? "not-allowed" : "pointer",
                }}
              >
                <ChevronLeft size={13} />
                <span>PREV</span>
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={activeIdx === STORY_CHAPTERS.length - 1}
                aria-label="Next chapter"
                className="btn-tactile-secondary font-mono"
                style={{
                  padding: "0.25rem 0.65rem",
                  fontSize: "0.72rem",
                  minHeight: "30px",
                  opacity: activeIdx === STORY_CHAPTERS.length - 1 ? 0.35 : 1,
                  cursor: activeIdx === STORY_CHAPTERS.length - 1 ? "not-allowed" : "pointer",
                }}
              >
                <span>NEXT</span>
                <ChevronRight size={13} />
              </button>
            </div>
          </div>

          {/* Reading Progress Line */}
          <div style={{ height: "3px", background: "var(--border-subtle)", width: "100%", flexShrink: 0 }}>
            <div
              style={{
                height: "100%",
                background: "var(--accent-primary)",
                width: `${((activeIdx + 1) / STORY_CHAPTERS.length) * 100}%`,
                transition: "width var(--motion-normal) var(--ease-mechanical)",
              }}
            />
          </div>

          {/* Panel Scrollable Content */}
          <div className="story-panel-scrollable" key={currentChapter.id}>
            {/* Meta tags */}
            <div
              className="font-mono"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem",
                fontSize: "0.72rem",
                color: "var(--accent-primary)",
                fontWeight: 700,
                letterSpacing: "0.08em",
                marginBottom: "0.5rem",
                flexWrap: "wrap",
              }}
            >
              <span>{currentChapter.category}</span>
              {currentChapter.badgeSubtitle && (
                <>
                  <span style={{ color: "var(--border-subtle)" }}>·</span>
                  <span style={{ color: "var(--ink-muted)", fontWeight: 500 }}>
                    {currentChapter.badgeSubtitle}
                  </span>
                </>
              )}
            </div>

            {/* Chapter Headline */}
            <h3
              className="font-display"
              style={{
                fontSize: "1.6rem",
                color: "var(--ink-primary)",
                letterSpacing: "-0.02em",
                lineHeight: 1.2,
                fontWeight: 700,
                marginBottom: "1.25rem",
              }}
            >
              {currentChapter.title}
            </h3>

            {/* Story Paragraphs */}
            <div style={{ display: "flex", flexDirection: "column", gap: "0.95rem", marginBottom: "1.5rem" }}>
              {currentChapter.paragraphs.map((p, pIdx) => (
                <p
                  key={pIdx}
                  style={{
                    fontFamily: "var(--font-ibm-plex-sans), sans-serif",
                    fontSize: "0.94rem",
                    color: "var(--ink-secondary)",
                    lineHeight: 1.7,
                    margin: 0,
                  }}
                >
                  {p}
                </p>
              ))}
            </div>

            {/* What I Learned Highlight Callout */}
            <div
              style={{
                padding: "1.1rem 1.25rem",
                background: "var(--bg-surface-subtle)",
                borderLeft: "3px solid var(--accent-primary)",
                marginBottom: "1.25rem",
              }}
            >
              <div
                className="font-mono"
                style={{
                  fontSize: "0.72rem",
                  color: "var(--accent-primary)",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  marginBottom: "0.35rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.45rem",
                }}
              >
                <Lightbulb size={14} />
                <span>WHAT I LEARNED</span>
              </div>
              <div
                style={{
                  fontSize: "0.88rem",
                  color: "var(--ink-primary)",
                  lineHeight: 1.55,
                  fontWeight: 500,
                  fontFamily: "var(--font-ibm-plex-sans), sans-serif",
                }}
              >
                {currentChapter.whatILearned}
              </div>
            </div>

            {/* Record Box */}
            <div
              className="font-mono"
              style={{
                padding: "0.85rem 1.15rem",
                border: "1px solid var(--border-subtle)",
                background: "var(--bg-surface)",
                fontSize: "0.76rem",
              }}
            >
              <div style={{ color: "var(--ink-muted)", fontWeight: 700, marginBottom: "0.4rem" }}>
                {currentChapter.recordTitle}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.25rem", color: "var(--ink-secondary)" }}>
                {currentChapter.recordItems.map((item, rIdx) => (
                  <div key={rIdx}>{item}</div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sequential Stack (<= 960px) */}
      <div className="story-mobile-stack">
        {STORY_CHAPTERS.map((ch) => (
          <div
            key={ch.id}
            className="story-mobile-card"
            style={{
              background: "var(--bg-surface)",
              border: "1px solid var(--border-primary)",
              padding: "1.35rem 1rem",
              boxShadow: "var(--shadow-tactile-sm)",
              marginBottom: "1.5rem",
              boxSizing: "border-box",
              width: "100%",
            }}
          >
            <div
              className="font-mono"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "0.72rem",
                marginBottom: "0.75rem",
                flexWrap: "wrap",
                gap: "0.4rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <span
                  style={{
                    width: 18,
                    height: 18,
                    background: "var(--accent-primary)",
                    color: "#FFFFFF",
                    fontSize: "0.62rem",
                    fontWeight: 700,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    border: "1px solid var(--border-primary)",
                  }}
                >
                  {ch.number}
                </span>
                <span style={{ color: "var(--accent-primary)", fontWeight: 700 }}>
                  {ch.period}
                </span>
              </div>
              <span style={{ color: "var(--ink-muted)", fontWeight: 600 }}>{ch.category}</span>
            </div>

            <h3
              className="font-display"
              style={{
                fontSize: "clamp(1.15rem, 4vw, 1.35rem)",
                color: "var(--ink-primary)",
                letterSpacing: "-0.01em",
                marginBottom: "0.75rem",
                fontWeight: 700,
                lineHeight: 1.25,
                wordBreak: "break-word",
              }}
            >
              {ch.title}
            </h3>

            <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.25rem" }}>
              {ch.paragraphs.map((p, pIdx) => (
                <p
                  key={pIdx}
                  style={{
                    fontSize: "0.9rem",
                    color: "var(--ink-secondary)",
                    lineHeight: 1.6,
                    margin: 0,
                    wordBreak: "break-word",
                  }}
                >
                  {p}
                </p>
              ))}
            </div>

            <div
              style={{
                padding: "0.9rem 1rem",
                background: "var(--bg-surface-subtle)",
                borderLeft: "3px solid var(--accent-primary)",
                marginBottom: "1rem",
                wordBreak: "break-word",
              }}
            >
              <div
                className="font-mono"
                style={{
                  fontSize: "0.7rem",
                  color: "var(--accent-primary)",
                  fontWeight: 700,
                  marginBottom: "0.25rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.35rem",
                }}
              >
                <Lightbulb size={13} />
                <span>WHAT I LEARNED</span>
              </div>
              <div style={{ fontSize: "0.84rem", color: "var(--ink-primary)", lineHeight: 1.5, fontWeight: 500 }}>
                {ch.whatILearned}
              </div>
            </div>

            <div
              className="font-mono"
              style={{
                padding: "0.75rem 0.95rem",
                border: "1px solid var(--border-subtle)",
                background: "var(--bg-surface-subtle)",
                fontSize: "0.72rem",
              }}
            >
              <div style={{ color: "var(--ink-muted)", fontWeight: 700, marginBottom: "0.3rem" }}>
                {ch.recordTitle}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem", color: "var(--ink-secondary)" }}>
                {ch.recordItems.map((item, rIdx) => (
                  <div key={rIdx}>{item}</div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .about-timeline-section {
          background: var(--bg-surface);
          border: 1px solid var(--border-primary);
          box-shadow: var(--shadow-tactile);
          padding: 2.5rem 2.25rem;
          box-sizing: border-box;
          width: 100%;
        }
        .story-desktop-grid {
          display: grid;
          grid-template-columns: 1fr 1.25fr;
          gap: 2.5rem;
          align-items: start;
          position: relative;
        }
        .sticky-story-panel {
          position: sticky;
          top: 5.25rem;
          background: var(--bg-surface);
          border: 2px solid var(--border-primary);
          box-shadow: var(--shadow-tactile);
          max-height: calc(100vh - 6.75rem);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          box-sizing: border-box;
        }
        .story-panel-scrollable {
          padding: 1.5rem 1.75rem 2rem;
          overflow-y: auto;
          flex: 1 1 0%;
          animation: storyContentFade 240ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
          scrollbar-width: thin;
          scrollbar-color: var(--border-subtle) transparent;
        }
        .story-panel-scrollable::-webkit-scrollbar {
          width: 5px;
        }
        .story-panel-scrollable::-webkit-scrollbar-track {
          background: transparent;
        }
        .story-panel-scrollable::-webkit-scrollbar-thumb {
          background: var(--border-subtle);
          border-radius: 2px;
        }
        .story-panel-scrollable::-webkit-scrollbar-thumb:hover {
          background: var(--accent-primary);
        }
        @keyframes storyContentFade {
          from {
            opacity: 0;
            transform: translateY(6px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .story-mobile-stack {
          display: none;
        }
        @media (max-width: 960px) {
          .story-desktop-grid {
            display: none !important;
          }
          .story-mobile-stack {
            display: block !important;
          }
        }
        @media (max-width: 768px) {
          .about-timeline-section {
            padding: 1.35rem 0.95rem !important;
          }
        }
      `}</style>
    </section>
  );
}
