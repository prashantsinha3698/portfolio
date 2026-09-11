"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { profile } from "@/data/profile";
import { ArrowRight, Download, Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon, CodewarsIcon } from "@/components/ui/SocialIcons";
import SectionLabel from "@/components/ui/SectionLabel";
import PixelAvatar from "@/components/ui/PixelAvatar";
import HeroNetwork from "@/components/ui/HeroNetwork";

const TYPEWRITER_PHRASES = [
  "Salesforce Developer",
  "System Thinker",
  "Independent Builder",
];

export default function HomeHero() {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentPhrase = TYPEWRITER_PHRASES[phraseIndex];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayText.length < currentPhrase.length) {
        timer = setTimeout(() => {
          setDisplayText(currentPhrase.substring(0, displayText.length + 1));
        }, 55);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentPhrase.substring(0, displayText.length - 1));
        }, 28);
      } else {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % TYPEWRITER_PHRASES.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIndex]);

  return (
    <section
      aria-label="Introduction"
      className="hero-section"
      style={{
        padding: "1.75rem 0 2rem",
        borderBottom: "1px solid var(--border-primary)",
        position: "relative",
        overflow: "hidden",
        background: "var(--bg-canvas)",
        display: "flex",
        alignItems: "center",
        minHeight: "calc(100svh - 62px)",
      }}
    >
      {/* Interactive Vector Network Motion Graphic (Right-concentrated, Canvas 2D) */}
      <HeroNetwork />

      <div className="container" style={{ position: "relative", zIndex: 2, width: "100%" }}>
        <SectionLabel number="01" label="HELLO" />

        {/* 12-Column Responsive Grid with 7:5 Asymmetry */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.2fr 0.8fr",
            gap: "3rem",
            alignItems: "center",
          }}
          className="hero-grid"
        >
          {/* Left Column: Direct Identity and Grounded Statement */}
          <div style={{ zIndex: 3 }}>
            <h1
              className="font-display"
              style={{
                fontSize: "clamp(2.5rem, 5vw, 4.4rem)",
                color: "var(--ink-primary)",
                letterSpacing: "-0.04em",
                lineHeight: 0.98,
                fontWeight: 700,
                marginBottom: "0.85rem",
              }}
            >
              PRASHANT<br />
              SINHA
            </h1>

            {/* Continuous Retro Typewriter Animated Role (2-word punchy taglines) */}
            <div
              className="font-mono"
              style={{
                fontSize: "clamp(1.05rem, 1.8vw, 1.3rem)",
                color: "var(--accent-primary)",
                fontWeight: 700,
                letterSpacing: "-0.01em",
                minHeight: "2.1rem",
                display: "flex",
                alignItems: "center",
                marginBottom: "0.85rem",
              }}
            >
              <span>{displayText}</span>
              <span className="typewriter-cursor">_</span>
            </div>

            {/* Editorial Description (IBM Plex Sans 400) */}
            <p
              style={{
                fontFamily: "var(--font-ibm-plex-sans), sans-serif",
                fontSize: "0.98rem",
                color: "var(--ink-secondary)",
                lineHeight: 1.62,
                maxWidth: "520px",
                marginBottom: "1.65rem",
              }}
            >
              I work mainly around Salesforce, automation and integrations. Outside work, I enjoy building small software projects to understand how systems work from the ground up.
            </p>

            {/* Tactile Action Buttons */}
            <div
              style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                marginBottom: "1.65rem",
              }}
              className="hero-action-buttons"
            >
              <Link href="/projects" className="btn-tactile-primary">
                <span>VIEW PROJECTS</span>
                <ArrowRight size={14} />
              </Link>

              <a
                href="/resume.pdf"
                download="Prashant_Sinha_Resume.pdf"
                className="btn-tactile-secondary"
              >
                <Download size={14} />
                <span>DOWNLOAD RESUME</span>
              </a>
            </div>

            {/* Verified Direct Channels Strip */}
            <div
              className="font-mono"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.5rem 0.85rem",
                fontSize: "0.78rem",
                color: "var(--ink-muted)",
                flexWrap: "wrap",
                borderTop: "1px solid var(--border-subtle)",
                paddingTop: "1.1rem",
              }}
            >
              <span style={{ fontWeight: 600 }}>CHANNELS:</span>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  color: "var(--ink-secondary)",
                  textDecoration: "none",
                  transition: "color var(--motion-fast)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-secondary)")}
              >
                <GitHubIcon size={14} />
                <span>GitHub</span>
              </a>
              <span>·</span>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  color: "var(--ink-secondary)",
                  textDecoration: "none",
                  transition: "color var(--motion-fast)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-secondary)")}
              >
                <LinkedInIcon size={14} />
                <span>LinkedIn</span>
              </a>
              <span>·</span>
              <a
                href={profile.codewars}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  color: "var(--ink-secondary)",
                  textDecoration: "none",
                  transition: "color var(--motion-fast)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--ink-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-secondary)")}
              >
                <CodewarsIcon size={14} />
                <span>Codewars</span>
              </a>
              <span>·</span>
              <a
                href={`mailto:${profile.email}`}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.35rem",
                  color: "var(--ink-secondary)",
                  textDecoration: "none",
                  transition: "color var(--motion-fast)",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--accent-primary)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--ink-secondary)")}
              >
                <Mail size={14} />
                <span>Email</span>
              </a>
            </div>
          </div>

          {/* Right Column: Editorial Pixel Character Identity Artifact */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              position: "relative",
              zIndex: 3,
            }}
            className="hero-avatar-column"
          >
            <PixelAvatar />
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .hero-section {
            min-height: auto !important;
            padding: 2.5rem 0 2.5rem !important;
          }
          .hero-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
          .hero-avatar-column {
            justify-content: center !important;
            margin-top: 0.5rem;
          }
        }
        @media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
          .hero-section {
            min-height: calc(100svh - 56px) !important;
            padding: 1rem 0 !important;
          }
          .hero-grid {
            grid-template-columns: 1.15fr 0.85fr !important;
            gap: 1.5rem !important;
          }
        }
        @media (max-width: 640px) {
          .hero-action-buttons {
            display: grid !important;
            grid-template-columns: 1fr !important;
            gap: 0.75rem !important;
          }
          .hero-action-buttons > * {
            width: 100% !important;
            text-align: center !important;
          }
        }
      `}</style>
    </section>
  );
}
