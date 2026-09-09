"use client";

import { useState, useEffect, useRef } from "react";
import { ArrowRight, BookOpen, Download, Mail, Terminal } from "lucide-react";
import { profile } from "@/data/profile";

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  phase: number;
  speed: number;
}

const TYPEWRITER_PHRASES = [
  "Salesforce Developer",
  "Systems Thinker",
  "Independent Builder",
];

export default function Hero() {
  const [mounted, setMounted] = useState(false);
  const [currentText, setCurrentText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const particlesRef = useRef<Particle[]>([]);
  const rafRef = useRef<number | null>(null);
  const timeRef = useRef(0);

  useEffect(() => {
    setMounted(true);
  }, []);

  // ─── Typewriter Effect ─────────────────────────────────────────
  useEffect(() => {
    const fullText = TYPEWRITER_PHRASES[phraseIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (currentText.length < fullText.length) {
        timer = setTimeout(() => {
          setCurrentText(fullText.slice(0, currentText.length + 1));
        }, 85);
      } else {
        // Pause at full phrase before deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 1800);
      }
    } else {
      if (currentText.length > 0) {
        timer = setTimeout(() => {
          setCurrentText(fullText.slice(0, currentText.length - 1));
        }, 45);
      } else {
        // Move to next phrase
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % TYPEWRITER_PHRASES.length);
      }
    }

    return () => clearTimeout(timer);
  }, [currentText, isDeleting, phraseIndex]);

  // ─── Ambient Motion Graphic Canvas ──────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let dpr = window.devicePixelRatio || 1;

    const initParticles = (w: number, h: number) => {
      const count = Math.min(90, Math.floor((w * h) / 14000));
      const arr: Particle[] = [];
      for (let i = 0; i < count; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        arr.push({
          x,
          y,
          baseX: x,
          baseY: y,
          vx: 0,
          vy: 0,
          size: 1.5 + Math.random() * 1.5,
          alpha: 0.15 + Math.random() * 0.25,
          phase: Math.random() * Math.PI * 2,
          speed: 0.1 + Math.random() * 0.25,
        });
      }
      particlesRef.current = arr;
    };

    const resize = () => {
      dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles(rect.width, rect.height);
    };

    resize();
    window.addEventListener("resize", resize);

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };

    const handleMouseLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 };
    };

    window.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseleave", handleMouseLeave);

    const INFLUENCE_RADIUS = 140;
    const REPEL_FORCE = 6;
    const RETURN_SPEED = 0.03;
    const FRICTION = 0.92;
    const LINK_DIST = 90;

    const render = () => {
      const rect = canvas.getBoundingClientRect();
      const w = rect.width;
      const h = rect.height;
      ctx.clearRect(0, 0, w, h);

      timeRef.current += 0.007;
      const t = timeRef.current;
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const particles = particlesRef.current;

      // Update positions
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const driftX = Math.cos(t * 0.8 + p.phase) * p.speed;
        const driftY = Math.sin(t * 0.6 + p.phase) * p.speed;

        const dx = p.x - mx;
        const dy = p.y - my;
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq);

        if (dist < INFLUENCE_RADIUS && dist > 0.01) {
          const force = (1 - dist / INFLUENCE_RADIUS) * REPEL_FORCE;
          p.vx += (dx / dist) * force;
          p.vy += (dy / dist) * force;
        }

        const targetX = p.baseX + Math.sin(t + p.phase) * 16;
        const targetY = p.baseY + Math.cos(t * 0.8 + p.phase) * 12;
        p.vx += (targetX - p.x) * RETURN_SPEED + driftX;
        p.vy += (targetY - p.y) * RETURN_SPEED + driftY;

        p.vx *= FRICTION;
        p.vy *= FRICTION;
        p.x += p.vx;
        p.y += p.vy;
      }

      // Draw subtle connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i];
          const b = particles[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < LINK_DIST) {
            const lineAlpha = (1 - dist / LINK_DIST) * 0.12;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = isDark
              ? `rgba(240, 90, 40, ${lineAlpha * 1.2})`
              : `rgba(21, 21, 21, ${lineAlpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Draw particles as crisp retro pixels
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        const dx = p.x - mx;
        const dy = p.y - my;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const boost = dist < INFLUENCE_RADIUS ? (1 - dist / INFLUENCE_RADIUS) * 0.35 : 0;

        ctx.fillStyle = isDark
          ? `rgba(240, 90, 40, ${Math.min(1, p.alpha + boost)})`
          : `rgba(21, 21, 21, ${Math.min(1, p.alpha + boost)})`;

        const sz = Math.round(p.size);
        ctx.fillRect(Math.floor(p.x), Math.floor(p.y), sz, sz);
      }

      rafRef.current = requestAnimationFrame(render);
    };

    rafRef.current = requestAnimationFrame(render);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return (
    <section
      id="home"
      aria-label="Introduction"
      style={{
        position: "relative",
        minHeight: "calc(100vh - 60px)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        padding: "4.5rem 0 3.5rem",
        overflow: "hidden",
      }}
    >
      {/* Interactive motion canvas */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        {/* Archive Label */}
        <div
          className="font-mono"
          style={{
            fontSize: "0.72rem",
            color: "var(--ink-muted)",
            letterSpacing: "0.12em",
            marginBottom: "1.5rem",
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            opacity: mounted ? 1 : 0,
            transition: "opacity var(--motion-slow) var(--ease-out)",
          }}
        >
          <span style={{ width: 8, height: 8, background: "var(--accent-primary)", display: "inline-block" }} />
          <span>PERSONAL SYSTEMS ARCHIVE / 2020-PRESENT</span>
        </div>

        {/* Main Grid: Left Editorial + Right Factual Index */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: "3.5rem",
            alignItems: "start",
            marginBottom: "3rem",
            opacity: mounted ? 1 : 0,
            transform: mounted ? "translateY(0)" : "translateY(16px)",
            transition: "all var(--motion-slow) var(--ease-out)",
          }}
          className="hero-main-grid"
        >
          {/* Left Column: Name, Typewriter, Intro, CTAs */}
          <div>
            <h1
              className="font-display"
              style={{
                fontSize: "clamp(2.35rem, 7.5vw, 5.5rem)",
                color: "var(--ink-primary)",
                letterSpacing: "-0.04em",
                lineHeight: 0.95,
                marginBottom: "1.25rem",
                wordBreak: "break-word",
              }}
            >
              PRASHANT<br />SINHA
            </h1>

            {/* Typewriter text in crisp Monospace */}
            <div
              className="font-mono"
              style={{
                fontSize: "clamp(0.88rem, 2.2vw, 1.3rem)",
                color: "var(--accent-primary)",
                marginBottom: "1.75rem",
                letterSpacing: "-0.01em",
                fontWeight: 600,
                minHeight: "2rem",
                display: "flex",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <span>{currentText}</span>
              <span
                className="cursor-blink"
                style={{
                  display: "inline-block",
                  width: "2px",
                  height: "1.2em",
                  background: "var(--accent-primary)",
                  marginLeft: "4px",
                }}
              />
            </div>

            {/* Human paragraph */}
            <p
              style={{
                fontSize: "1.05rem",
                color: "var(--ink-secondary)",
                lineHeight: 1.75,
                maxWidth: "540px",
                marginBottom: "2.25rem",
              }}
            >
              {profile.bio}
            </p>

            {/* Action Buttons */}
            <div className="font-mono hero-cta-grid">
              <a
                href="#work"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="hero-btn-explore"
                style={{
                  background: "var(--ink-primary)",
                  color: "var(--background)",
                  border: "2px solid var(--ink-primary)",
                  boxShadow: "3px 3px 0 var(--border)",
                  transition: "transform var(--motion-fast) var(--ease-out), box-shadow var(--motion-fast) var(--ease-out)",
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = "translate(2px, 2px)";
                  e.currentTarget.style.boxShadow = "1px 1px 0 var(--border)";
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = "translate(0, 0)";
                  e.currentTarget.style.boxShadow = "3px 3px 0 var(--border)";
                }}
              >
                <span>EXPLORE WORK</span>
                <ArrowRight size={15} />
              </a>

              <a
                href="#story"
                onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("story")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="hero-btn-story"
                style={{
                  background: "var(--surface)",
                  color: "var(--ink-primary)",
                  border: "2px solid var(--border)",
                  boxShadow: "3px 3px 0 var(--border)",
                  transition: "transform var(--motion-fast) var(--ease-out), box-shadow var(--motion-fast) var(--ease-out)",
                }}
                onMouseDown={(e) => {
                  e.currentTarget.style.transform = "translate(2px, 2px)";
                  e.currentTarget.style.boxShadow = "1px 1px 0 var(--border)";
                }}
                onMouseUp={(e) => {
                  e.currentTarget.style.transform = "translate(0, 0)";
                  e.currentTarget.style.boxShadow = "3px 3px 0 var(--border)";
                }}
              >
                <BookOpen size={15} />
                <span>READ STORY</span>
              </a>

              <a
                href={profile.resumeUrl}
                download="Prashant_Sinha_Resume.pdf"
                className="hero-btn-resume"
                style={{
                  background: "var(--surface-alt)",
                  color: "var(--ink-primary)",
                  border: "1px solid var(--border)",
                  boxShadow: "2px 2px 0 var(--border)",
                  transition: "background var(--motion-fast), color var(--motion-fast)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "var(--surface)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "var(--surface-alt)";
                }}
              >
                <Download size={14} />
                <span>RESUME</span>
              </a>
            </div>

            {/* Quick Social Verification */}
            <div
              className="font-mono"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem 0.85rem",
                fontSize: "0.75rem",
                color: "var(--ink-muted)",
                flexWrap: "wrap",
              }}
            >
              <span>CONNECT:</span>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  color: "var(--ink-secondary)",
                  transition: "color var(--motion-fast)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-secondary)")}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/></svg>
                <span>GITHUB</span>
              </a>
              <span>·</span>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  color: "var(--ink-secondary)",
                  transition: "color var(--motion-fast)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-secondary)")}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
                <span>LINKEDIN</span>
              </a>
              <span>·</span>
              <a
                href={profile.codewars}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  color: "var(--ink-secondary)",
                  transition: "color var(--motion-fast)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-secondary)")}
              >
                <Terminal size={13} />
                <span>CODEWARS</span>
              </a>
              <span>·</span>
              <a
                href={`mailto:${profile.email}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.3rem",
                  color: "var(--ink-secondary)",
                  transition: "color var(--motion-fast)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-secondary)")}
              >
                <Mail size={13} />
                <span>EMAIL</span>
              </a>
            </div>
          </div>

          {/* Right Column: Compact Factual Index */}
          <div
            className="font-mono hero-index-card"
            style={{
              background: "var(--surface)",
              border: "var(--border-thin)",
              boxShadow: "4px 4px 0 var(--border)",
              display: "flex",
              flexDirection: "column",
            }}
          >
            {/* Index Header */}
            <div
              style={{
                padding: "0.85rem 1.25rem",
                borderBottom: "var(--border-thin)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                fontSize: "0.72rem",
                letterSpacing: "0.08em",
                background: "var(--surface-alt)",
                color: "var(--ink-primary)",
                fontWeight: 600,
              }}
            >
              <span>SYSTEM PROFILE / SPEC</span>
              <span style={{ color: "var(--accent-primary)" }}>INDEX 01</span>
            </div>

            {/* Index Entries */}
            <div style={{ padding: "1.25rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
              <div>
                <div style={{ fontSize: "0.68rem", color: "var(--ink-muted)", marginBottom: "0.25rem", letterSpacing: "0.08em" }}>
                  BASE
                </div>
                <div style={{ fontSize: "0.9rem", color: "var(--ink-primary)", fontWeight: 600 }}>
                  {profile.base}
                </div>
              </div>

              <div style={{ height: "1px", background: "var(--border-light)" }} />

              <div>
                <div style={{ fontSize: "0.68rem", color: "var(--ink-muted)", marginBottom: "0.25rem", letterSpacing: "0.08em" }}>
                  EXPERIENCE
                </div>
                <div style={{ fontSize: "0.9rem", color: "var(--ink-primary)", fontWeight: 600 }}>
                  {profile.experienceYears}
                </div>
              </div>

              <div style={{ height: "1px", background: "var(--border-light)" }} />

              <div>
                <div style={{ fontSize: "0.68rem", color: "var(--ink-muted)", marginBottom: "0.25rem", letterSpacing: "0.08em" }}>
                  CURRENT BUILD
                </div>
                <div style={{ fontSize: "0.9rem", color: "var(--accent-primary)", fontWeight: 700 }}>
                  {profile.currentBuild}
                </div>
              </div>

              <div style={{ height: "1px", background: "var(--border-light)" }} />

              <div>
                <div style={{ fontSize: "0.68rem", color: "var(--ink-muted)", marginBottom: "0.25rem", letterSpacing: "0.08em" }}>
                  BACKGROUND
                </div>
                <div style={{ fontSize: "0.9rem", color: "var(--ink-primary)", fontWeight: 600 }}>
                  {profile.background}
                </div>
              </div>

              <div style={{ height: "1px", background: "var(--border-light)" }} />

              <div>
                <div style={{ fontSize: "0.68rem", color: "var(--ink-muted)", marginBottom: "0.25rem", letterSpacing: "0.08em" }}>
                  PRIMARY
                </div>
                <div style={{ fontSize: "0.9rem", color: "var(--ink-primary)", fontWeight: 600 }}>
                  {profile.primaryTech}
                </div>
              </div>

              <div style={{ height: "1px", background: "var(--border-light)" }} />

              <div>
                <div style={{ fontSize: "0.68rem", color: "var(--ink-muted)", marginBottom: "0.25rem", letterSpacing: "0.08em" }}>
                  ALSO
                </div>
                <div style={{ fontSize: "0.9rem", color: "var(--ink-primary)", fontWeight: 600 }}>
                  {profile.alsoTech}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .hero-cta-grid {
          display: flex;
          gap: 1rem;
          flex-wrap: wrap;
          margin-bottom: 2.5rem;
        }
        .hero-btn-explore,
        .hero-btn-story {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.6rem;
          padding: 0.85rem 1.5rem;
          font-size: 0.82rem;
          font-weight: 600;
          min-height: 44px;
          box-sizing: border-box;
          text-decoration: none;
        }
        .hero-btn-resume {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.85rem 1.25rem;
          font-size: 0.82rem;
          font-weight: 600;
          min-height: 44px;
          box-sizing: border-box;
          text-decoration: none;
        }
        @media (max-width: 900px) {
          .hero-main-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
          .hero-index-card {
            max-width: 100% !important;
          }
        }
        @media (max-width: 640px) {
          .hero-cta-grid {
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
            gap: 0.65rem !important;
          }
          .hero-btn-explore,
          .hero-btn-story {
            width: 100% !important;
            padding: 0.85rem 0.4rem !important;
            font-size: 0.76rem !important;
            gap: 0.4rem !important;
          }
          .hero-btn-resume {
            grid-column: 1 / -1 !important;
            width: 100% !important;
            justify-content: center !important;
            font-size: 0.82rem !important;
          }
        }
        @media (max-width: 360px) {
          .hero-btn-explore,
          .hero-btn-story {
            font-size: 0.7rem !important;
            gap: 0.3rem !important;
            padding: 0.75rem 0.25rem !important;
          }
        }
      `}</style>
    </section>
  );
}
