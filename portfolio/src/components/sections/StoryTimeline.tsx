"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { storyChapters, StoryChapter } from "@/data/experience";
import { Lightbulb, ChevronLeft, ChevronRight } from "lucide-react";

export default function StoryTimeline() {
  const [activeChapterId, setActiveChapterId] = useState<string>(storyChapters[0].id);
  const sectionRef = useRef<HTMLElement>(null);
  const chapterRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});
  const isClickScrollingRef = useRef(false);
  const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const currentIndex = storyChapters.findIndex((c) => c.id === activeChapterId);
  const safeCurrentIndex = currentIndex === -1 ? 0 : currentIndex;
  const activeChapter: StoryChapter = storyChapters[safeCurrentIndex];

  // Programmatic chapter navigation (used by both left card clicks and right PREV/NEXT controls)
  const goToChapter = useCallback((index: number, smoothScroll = true) => {
    if (index < 0 || index >= storyChapters.length) return;
    const targetChapter = storyChapters[index];
    setActiveChapterId(targetChapter.id);

    if (smoothScroll) {
      isClickScrollingRef.current = true;
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);

      const targetEl = chapterRefs.current[targetChapter.id];
      if (targetEl) {
        targetEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }

      scrollTimeoutRef.current = setTimeout(() => {
        isClickScrollingRef.current = false;
      }, 750);
    }
  }, []);

  const handleIndexClick = (id: string) => {
    const idx = storyChapters.findIndex((c) => c.id === id);
    if (idx !== -1) {
      goToChapter(idx, true);
    }
  };

  // Scroll listener that pins to Chapter 1 at the top of the section and tracks active item without jumpiness
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (isClickScrollingRef.current) return;
      if (ticking) return;

      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        const section = sectionRef.current;
        if (!section) return;

        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        // Skip if section is outside the visible viewport
        if (rect.bottom < 150 || rect.top > windowHeight - 150) return;

        // When at the very top of the section (e.g. after clicking STORY in nav), lock to Chapter 1
        if (rect.top > -180) {
          setActiveChapterId(storyChapters[0].id);
          return;
        }

        // Find the chapter whose card center is closest to 45% of viewport height
        const targetY = windowHeight * 0.45;
        let closestId = storyChapters[0].id;
        let minDistance = Infinity;

        for (const chapter of storyChapters) {
          const el = chapterRefs.current[chapter.id];
          if (!el) continue;
          const elRect = el.getBoundingClientRect();
          const elCenter = (elRect.top + elRect.bottom) / 2;
          const dist = Math.abs(elCenter - targetY);

          if (dist < minDistance) {
            minDistance = dist;
            closestId = chapter.id;
          }
        }

        setActiveChapterId(closestId);
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeoutRef.current) clearTimeout(scrollTimeoutRef.current);
    };
  }, []);

  return (
    <section
      id="story"
      ref={sectionRef}
      style={{
        padding: "5.5rem 0 6.5rem",
        borderTop: "var(--border-thin)",
        background: "var(--background)",
      }}
    >
      <div className="container">
        {/* Section Header */}
        <div
          style={{
            marginBottom: "3rem",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div>
            <div
              className="font-mono"
              style={{
                fontSize: "0.75rem",
                color: "var(--accent-primary)",
                fontWeight: 600,
                letterSpacing: "0.1em",
                marginBottom: "0.5rem",
              }}
            >
              06 // CAREER & LIFE TIMELINE
            </div>
            <h2
              className="font-display"
              style={{
                fontSize: "clamp(2rem, 4.5vw, 2.75rem)",
                color: "var(--ink-primary)",
                letterSpacing: "-0.03em",
                lineHeight: 1.1,
              }}
            >
              The Story
            </h2>
          </div>

          <div
            className="font-mono"
            style={{
              fontSize: "0.8rem",
              color: "var(--ink-muted)",
              maxWidth: "420px",
              lineHeight: 1.5,
            }}
          >
            An honest chronology of engineering foundations, business ventures, public examinations, retail operations, and system building.
          </div>
        </div>

        {/* DESKTOP TWO-COLUMN EXPERIENCE */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1.25fr",
            gap: "3rem",
            alignItems: "start",
            position: "relative",
          }}
          className="story-desktop-grid"
        >
          {/* LEFT: Vertically Scrollable Editorial Timeline Index */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1.25rem",
              position: "relative",
            }}
          >
            {/* Timeline Guide Line */}
            <div
              aria-hidden="true"
              style={{
                position: "absolute",
                left: 18,
                top: 24,
                bottom: "35vh",
                width: 2,
                background: "var(--border-light)",
                zIndex: 0,
              }}
            />

            {storyChapters.map((chapter, idx) => {
              const isActive = activeChapterId === chapter.id;
              return (
                <div
                  key={chapter.id}
                  data-chapter-id={chapter.id}
                  ref={(el) => {
                    chapterRefs.current[chapter.id] = el;
                  }}
                  onClick={() => handleIndexClick(chapter.id)}
                  style={{
                    position: "relative",
                    zIndex: 1,
                    padding: "1.25rem 1.5rem 1.25rem 3.25rem",
                    background: isActive ? "var(--surface)" : "var(--surface-alt)",
                    border: isActive ? "2px solid var(--accent-primary)" : "1px solid var(--border-light)",
                    boxShadow: isActive ? "4px 4px 0 var(--border)" : "none",
                    cursor: "pointer",
                    transition: "all var(--motion-fast) var(--ease-out)",
                  }}
                  className="timeline-index-item"
                >
                  {/* Step Marker */}
                  <div
                    style={{
                      position: "absolute",
                      left: 10,
                      top: "50%",
                      transform: "translateY(-50%)",
                      width: 18,
                      height: 18,
                      background: isActive ? "var(--accent-primary)" : "var(--surface)",
                      border: "2px solid var(--border)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.6rem",
                      fontWeight: 700,
                      color: isActive ? "#FFFFFF" : "var(--ink-secondary)",
                      transition: "background var(--motion-fast)",
                    }}
                  >
                    {idx + 1}
                  </div>

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
                    <span>{chapter.year}</span>
                    <span>{chapter.shortLabel}</span>
                  </div>

                  <div
                    className="font-display"
                    style={{
                      fontSize: "1.05rem",
                      fontWeight: 700,
                      color: "var(--ink-primary)",
                      marginBottom: "0.3rem",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    {chapter.title}
                  </div>

                  <div
                    style={{
                      fontSize: "0.84rem",
                      color: "var(--ink-secondary)",
                      lineHeight: 1.4,
                    }}
                  >
                    {chapter.lede}
                  </div>
                </div>
              );
            })}

            {/* Generous bottom buffer so the final chapter stays centered while sticky panel is active */}
            <div style={{ height: "35vh" }} aria-hidden="true" />
          </div>

          {/* RIGHT: Fixed Viewport-Fitted Narrative Exhibit Panel */}
          <div
            style={{
              position: "sticky",
              top: "5.25rem",
              background: "var(--surface)",
              border: "var(--border-medium)",
              boxShadow: "5px 5px 0 var(--border)",
              maxHeight: "calc(100vh - 6.75rem)",
              display: "flex",
              flexDirection: "column",
              overflow: "hidden",
            }}
            className="sticky-story-panel"
          >
            {/* Control Bar & Progress Indicator */}
            <div
              style={{
                padding: "1.1rem 1.75rem 0.9rem",
                borderBottom: "var(--border-thin)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                flexShrink: 0,
                background: "var(--surface)",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
                <span
                  className="font-mono"
                  style={{
                    padding: "0.2rem 0.55rem",
                    background: "var(--accent-primary)",
                    color: "#FFFFFF",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                  }}
                >
                  {activeChapter.year}
                </span>
                <span
                  className="font-mono"
                  style={{
                    fontSize: "0.72rem",
                    color: "var(--ink-muted)",
                    fontWeight: 700,
                    letterSpacing: "0.04em",
                  }}
                >
                  CHAPTER {String(safeCurrentIndex + 1).padStart(2, "0")} / {String(storyChapters.length).padStart(2, "0")}
                </span>
              </div>

              {/* Prev / Next Stepper Controls */}
              <div style={{ display: "flex", alignItems: "center", gap: "0.4rem" }}>
                <button
                  onClick={() => goToChapter(safeCurrentIndex - 1)}
                  disabled={safeCurrentIndex === 0}
                  className="font-mono"
                  aria-label="Previous chapter"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.2rem",
                    padding: "0.3rem 0.65rem",
                    background: "var(--surface-alt)",
                    border: "var(--border-thin)",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: safeCurrentIndex === 0 ? "var(--ink-muted)" : "var(--ink-primary)",
                    cursor: safeCurrentIndex === 0 ? "not-allowed" : "pointer",
                    opacity: safeCurrentIndex === 0 ? 0.35 : 1,
                    transition: "all var(--motion-fast)",
                  }}
                >
                  <ChevronLeft size={13} />
                  <span>PREV</span>
                </button>
                <button
                  onClick={() => goToChapter(safeCurrentIndex + 1)}
                  disabled={safeCurrentIndex === storyChapters.length - 1}
                  className="font-mono"
                  aria-label="Next chapter"
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "0.2rem",
                    padding: "0.3rem 0.65rem",
                    background: "var(--surface-alt)",
                    border: "var(--border-thin)",
                    fontSize: "0.72rem",
                    fontWeight: 700,
                    color: safeCurrentIndex === storyChapters.length - 1 ? "var(--ink-muted)" : "var(--ink-primary)",
                    cursor: safeCurrentIndex === storyChapters.length - 1 ? "not-allowed" : "pointer",
                    opacity: safeCurrentIndex === storyChapters.length - 1 ? 0.35 : 1,
                    transition: "all var(--motion-fast)",
                  }}
                >
                  <span>NEXT</span>
                  <ChevronRight size={13} />
                </button>
              </div>
            </div>

            {/* Reading Progress Line */}
            <div
              style={{
                height: "3px",
                background: "var(--border-light)",
                width: "100%",
                flexShrink: 0,
              }}
            >
              <div
                style={{
                  height: "100%",
                  background: "var(--accent-primary)",
                  width: `${((safeCurrentIndex + 1) / storyChapters.length) * 100}%`,
                  transition: "width var(--motion-normal) var(--ease-out)",
                }}
              />
            </div>

            {/* Scrollable Narrative Body (fits 100% within viewport, never cropped) */}
            <div
              key={activeChapter.id}
              className="story-panel-scrollable"
              style={{
                padding: "1.75rem 2rem 2rem",
                overflowY: "auto",
                flex: 1,
              }}
            >
              {/* Category & Tag */}
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
                <span>{activeChapter.category}</span>
                {activeChapter.tag && (
                  <>
                    <span style={{ color: "var(--border)" }}>·</span>
                    <span style={{ color: "var(--ink-muted)", fontWeight: 500 }}>{activeChapter.tag}</span>
                  </>
                )}
              </div>

              {/* Title */}
              <h3
                className="font-display"
                style={{
                  fontSize: "1.65rem",
                  color: "var(--ink-primary)",
                  letterSpacing: "-0.02em",
                  lineHeight: 1.2,
                  marginBottom: "1.25rem",
                }}
              >
                {activeChapter.title}
              </h3>

              {/* Full Story Paragraphs */}
              <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem", marginBottom: "1.5rem" }}>
                {activeChapter.story.map((paragraph, pIdx) => (
                  <p
                    key={pIdx}
                    style={{
                      fontSize: "0.94rem",
                      color: "var(--ink-secondary)",
                      lineHeight: 1.65,
                      margin: 0,
                    }}
                  >
                    {paragraph}
                  </p>
                ))}
              </div>

              {/* What I Learned Box */}
              <div
                style={{
                  padding: "1.1rem 1.25rem",
                  background: "var(--surface-alt)",
                  borderLeft: "3px solid var(--accent-primary)",
                  marginBottom: activeChapter.artifactDetails ? "1.25rem" : 0,
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
                    gap: "0.4rem",
                  }}
                >
                  <Lightbulb size={14} />
                  <span>WHAT I LEARNED</span>
                </div>
                <div style={{ fontSize: "0.88rem", color: "var(--ink-primary)", lineHeight: 1.55, fontWeight: 500 }}>
                  {activeChapter.learning}
                </div>
              </div>

              {/* Artifact Details */}
              {activeChapter.artifactTitle && activeChapter.artifactDetails && (
                <div
                  className="font-mono"
                  style={{
                    padding: "0.9rem 1.1rem",
                    border: "1px solid var(--border-light)",
                    background: "var(--surface)",
                    fontSize: "0.76rem",
                  }}
                >
                  <div style={{ color: "var(--ink-muted)", fontWeight: 700, marginBottom: "0.4rem" }}>
                    [{activeChapter.artifactTitle}]
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "0.2rem", color: "var(--ink-secondary)" }}>
                    {activeChapter.artifactDetails.map((detail, dIdx) => (
                      <div key={dIdx}>• {detail}</div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* MOBILE STACKED EXPERIENCE */}
        <div className="story-mobile-stack" style={{ display: "none" }}>
          {storyChapters.map((chapter) => (
            <div
              key={chapter.id}
              style={{
                background: "var(--surface)",
                border: "var(--border-thin)",
                padding: "1.5rem",
                boxShadow: "3px 3px 0 var(--border)",
                marginBottom: "1.5rem",
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
                }}
              >
                <span style={{ color: "var(--accent-primary)", fontWeight: 700 }}>
                  {chapter.year}
                </span>
                <span style={{ color: "var(--ink-muted)" }}>
                  {chapter.shortLabel}
                </span>
              </div>

              <h3
                className="font-display"
                style={{
                  fontSize: "1.35rem",
                  color: "var(--ink-primary)",
                  letterSpacing: "-0.01em",
                  marginBottom: "0.75rem",
                }}
              >
                {chapter.title}
              </h3>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem", marginBottom: "1.25rem" }}>
                {chapter.story.map((p, pIdx) => (
                  <p key={pIdx} style={{ fontSize: "0.92rem", color: "var(--ink-secondary)", lineHeight: 1.6 }}>
                    {p}
                  </p>
                ))}
              </div>

              <div
                style={{
                  padding: "1rem",
                  background: "var(--surface-alt)",
                  borderLeft: "3px solid var(--accent-primary)",
                }}
              >
                <div className="font-mono" style={{ fontSize: "0.68rem", color: "var(--accent-primary)", fontWeight: 700, marginBottom: "0.25rem" }}>
                  WHAT I LEARNED
                </div>
                <div style={{ fontSize: "0.85rem", color: "var(--ink-primary)", lineHeight: 1.5 }}>
                  {chapter.learning}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .story-panel-scrollable {
          animation: storyContentFade 260ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
          scrollbar-width: thin;
          scrollbar-color: var(--border) transparent;
        }
        .story-panel-scrollable::-webkit-scrollbar {
          width: 5px;
        }
        .story-panel-scrollable::-webkit-scrollbar-track {
          background: transparent;
        }
        .story-panel-scrollable::-webkit-scrollbar-thumb {
          background: var(--border-light);
          border-radius: 2px;
        }
        .story-panel-scrollable::-webkit-scrollbar-thumb:hover {
          background: var(--accent-primary);
        }
        @keyframes storyContentFade {
          from {
            opacity: 0;
            transform: translateY(8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @media (max-width: 960px) {
          .story-desktop-grid {
            display: none !important;
          }
          .story-mobile-stack {
            display: block !important;
          }
        }
      `}</style>
    </section>
  );
}
