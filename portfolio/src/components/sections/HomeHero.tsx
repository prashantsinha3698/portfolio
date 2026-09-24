"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";
import { motion, useScroll, useTransform, type Variants } from "framer-motion";
import { profile } from "@/data/profile";
import { ArrowRight, Download, Mail } from "lucide-react";
import { GitHubIcon, LinkedInIcon, CodewarsIcon } from "@/components/ui/SocialIcons";
import SectionLabel from "@/components/ui/SectionLabel";
import PixelAvatar from "@/components/ui/PixelAvatar";
import { getLocaleFromPathname, getTranslation, Locale } from "@/locales";
import { detectPerfTier } from "@/lib/perfTier";

interface HomeHeroProps {
  locale?: Locale;
}

const CUSTOM_EASE = [0.16, 1, 0.3, 1] as [number, number, number, number];

const CONTAINER_VARIANTS: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.08,
    },
  },
};

const ITEM_VARIANTS: Variants = {
  hidden: { opacity: 0, y: 36, filter: "blur(6px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.85, ease: CUSTOM_EASE },
  },
};

const ITEM_FAST: Variants = {
  hidden: { opacity: 0, y: 22, filter: "blur(4px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.70, ease: CUSTOM_EASE },
  },
};

export default function HomeHero({ locale }: HomeHeroProps) {
  const pathname = usePathname();
  const activeLocale = locale || getLocaleFromPathname(pathname);
  const t = getTranslation(activeLocale);
  const h = t.hero;
  const isDe = activeLocale === "de";

  const typewriterPhrases = h.typewriterPhrases;
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [isRevealed, setIsRevealed] = useState(false);

  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });

  const avatarParallaxY = useTransform(scrollYProgress, [0, 1], [0, 56]);
  const avatarScrollOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.4]);

  const [cardTilt, setCardTilt] = useState({ x: 0, y: 0 });
  const handleCardMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    setCardTilt({ x: -(py * 7), y: px * 7 });
  };
  const handleCardMouseLeave = () => setCardTilt({ x: 0, y: 0 });

  useEffect(() => {
    // Check if page reveal was already triggered
    if (
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("page-reveal-active")
    ) {
      setIsRevealed(true);
    } else {
      const handleReveal = () => setIsRevealed(true);
      window.addEventListener("page_reveal_start", handleReveal, { once: true });
      const timer = setTimeout(() => setIsRevealed(true), 450);
      return () => {
        window.removeEventListener("page_reveal_start", handleReveal);
        clearTimeout(timer);
      };
    }
  }, []);

  useEffect(() => {
    setPhraseIndex(0);
    setDisplayText("");
    setIsDeleting(false);
  }, [activeLocale]);

  useEffect(() => {
    // Sync dark theme state
    const sync = () => {
      setIsDarkTheme(document.documentElement.getAttribute("data-theme") === "dark");
    };
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const currentPhrase = typewriterPhrases[phraseIndex] || typewriterPhrases[0];
    let timer: NodeJS.Timeout;

    if (!isDeleting) {
      if (displayText.length < currentPhrase.length) {
        timer = setTimeout(() => {
          setDisplayText(currentPhrase.substring(0, displayText.length + 1));
        }, 55);
      } else {
        timer = setTimeout(() => { setIsDeleting(true); }, 2000);
      }
    } else {
      if (displayText.length > 0) {
        timer = setTimeout(() => {
          setDisplayText(currentPhrase.substring(0, displayText.length - 1));
        }, 28);
      } else {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % typewriterPhrases.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayText, isDeleting, phraseIndex, typewriterPhrases]);

  const projectsUrl = isDe ? "/de/projects" : "/projects";

  return (
    <section
      id="hero"
      ref={heroRef}
      aria-label="Introduction"
      className="hero-section"
      style={{
        padding: "1.75rem 0 2rem",
        borderBottom: "1px solid var(--border-primary)",
        position: "relative",
        overflow: "hidden",
        background: "transparent",
        display: "flex",
        alignItems: "center",
        minHeight: "calc(100svh - 62px)",
      }}
    >
      <div className="container" style={{ position: "relative", zIndex: 3, width: "100%" }}>
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={isRevealed ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
          transition={{ duration: 0.65, ease: CUSTOM_EASE }}
        >
          <SectionLabel number="01" label={isDe ? "HALLO" : "HELLO"} />
        </motion.div>

        {/* Hero Grid */}
        <div
          style={{ display: "grid", gridTemplateColumns: "1.2fr 0.8fr", gap: "3rem", alignItems: "center" }}
          className="hero-grid"
        >
          {/* Left Column — animated content */}
          <motion.div
            variants={CONTAINER_VARIANTS}
            initial="hidden"
            animate={isRevealed ? "visible" : "hidden"}
            style={{ zIndex: 3 }}
          >
            {/* Headline */}
            <motion.h1
              variants={ITEM_VARIANTS}
              className="font-display"
              style={{
                fontSize: "clamp(3.4rem, 7vw, 5.6rem)",
                color: "var(--ink-primary)",
                letterSpacing: "0.02em",
                lineHeight: 0.92,
                fontWeight: 400,
                marginBottom: "0.85rem",
              }}
            >
              PRASHANT<br />SINHA
            </motion.h1>

            {/* Typewriter role */}
            <motion.div
              variants={ITEM_VARIANTS}
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
            </motion.div>

            {/* Bio */}
            <motion.p
              variants={ITEM_VARIANTS}
              style={{
                fontFamily: "var(--font-sans), sans-serif",
                fontSize: "0.98rem",
                color: "var(--ink-secondary)",
                lineHeight: 1.62,
                maxWidth: "520px",
                marginBottom: "1.65rem",
              }}
            >
              {h.leadBio}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={ITEM_FAST}
              className="btn-group btn-group-2 hero-action-buttons"
              style={{ marginBottom: "1.65rem", maxWidth: "460px" }}
            >
              <Link href={projectsUrl} className="btn-tactile-primary">
                <span>{isDe ? "PROJEKTE ANSEHEN" : "VIEW PROJECTS"}</span>
                <ArrowRight size={14} />
              </Link>

              <a
                href="/resume.pdf"
                download="Prashant_Sinha_Resume.pdf"
                className="btn-tactile-secondary"
              >
                <Download size={14} />
                <span>{isDe ? "LEBENSLAUF HERUNTERLADEN" : "DOWNLOAD RESUME"}</span>
              </a>
            </motion.div>

            {/* Channels strip */}
            <motion.div
              variants={ITEM_FAST}
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
              <span style={{ fontWeight: 600 }}>{isDe ? "KANALE:" : "CHANNELS:"}</span>
              {[
                { href: profile.github, icon: <GitHubIcon size={14} />, label: "GitHub" },
                { href: profile.linkedin, icon: <LinkedInIcon size={14} />, label: "LinkedIn" },
                { href: profile.codewars, icon: <CodewarsIcon size={14} />, label: "Codewars" },
                { href: `mailto:${profile.email}`, icon: <Mail size={14} />, label: isDe ? "E-Mail" : "Email" },
              ].map((ch, i) => (
                <span key={ch.label} style={{ display: "contents" }}>
                  {i > 0 && <span>·</span>}
                  <a
                    href={ch.href}
                    target={ch.href.startsWith("mailto") ? undefined : "_blank"}
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
                    {ch.icon}
                    <span>{ch.label}</span>
                  </a>
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Column — PixelAvatar: smooth slide from right to left with 3D tilt & scroll parallax */}
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
            <motion.div
              style={{
                y: avatarParallaxY,
                opacity: avatarScrollOpacity,
              }}
            >
              <motion.div
                initial={{ opacity: 0, x: 90, filter: "blur(6px)" }}
                animate={isRevealed ? { opacity: 1, x: 0, filter: "blur(0px)" } : { opacity: 0, x: 90, filter: "blur(6px)" }}
                transition={{
                  duration: 1.0,
                  delay: 0.25,
                  ease: CUSTOM_EASE,
                }}
                onMouseMove={handleCardMouseMove}
                onMouseLeave={handleCardMouseLeave}
                style={{
                  transform: `perspective(900px) rotateX(${cardTilt.x}deg) rotateY(${cardTilt.y}deg)`,
                  transition: "transform 0.18s cubic-bezier(0, 0, 0.2, 1)",
                  willChange: "transform",
                }}
              >
                <PixelAvatar />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      <style suppressHydrationWarning>{`
        @media (max-width: 900px) {
          .hero-section { min-height: auto !important; padding: 2.5rem 0 2.5rem !important; }
          .hero-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .hero-avatar-column { justify-content: center !important; margin-top: 0.5rem; }
        }
        @media (min-width: 768px) and (max-width: 1024px) and (orientation: landscape) {
          .hero-section { min-height: calc(100svh - 56px) !important; padding: 1rem 0 !important; }
          .hero-grid { grid-template-columns: 1.15fr 0.85fr !important; gap: 1.5rem !important; }
        }
        @media (max-width: 640px) {
          .hero-action-buttons { display: grid !important; grid-template-columns: 1fr !important; gap: 0.75rem !important; }
          .hero-action-buttons > * { width: 100% !important; text-align: center !important; }
        }
      `}</style>
    </section>
  );
}
