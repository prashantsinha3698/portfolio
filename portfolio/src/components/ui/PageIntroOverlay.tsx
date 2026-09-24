"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function PageIntroOverlay() {
  const [visible, setVisible] = useState(false);
  const [mounted, setMounted] = useState(true);

  useEffect(() => {
    // Skip if user prefers reduced motion
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      document.documentElement.classList.add("page-reveal-active");
      window.dispatchEvent(new CustomEvent("page_reveal_start"));
      setMounted(false);
      return;
    }

    // Check if page was already loaded in this session or document is already ready
    const alreadySeen =
      typeof window !== "undefined" &&
      sessionStorage.getItem("ps_intro_seen") === "true";

    const isDocumentLoading =
      typeof document !== "undefined" && document.readyState !== "complete";

    // If already loaded or document is already complete, do not block with an artificial loader!
    if (alreadySeen || !isDocumentLoading) {
      document.documentElement.classList.add("page-reveal-active");
      window.dispatchEvent(new CustomEvent("page_reveal_start"));
      setMounted(false);
      return;
    }

    // Actual loading is occurring: show the loader while assets/DOM load
    setVisible(true);

    const finishLoading = () => {
      sessionStorage.setItem("ps_intro_seen", "true");
      // Swift exit fade so user isn't kept waiting
      setTimeout(() => {
        setVisible(false);
        document.documentElement.classList.add("page-reveal-active");
        window.dispatchEvent(new CustomEvent("page_reveal_start"));
      }, 400);
    };

    if (document.readyState === "complete") {
      finishLoading();
    } else {
      window.addEventListener("load", finishLoading, { once: true });
      // Safety cap: max 1100ms if a background resource hangs
      const fallbackTimer = setTimeout(finishLoading, 1100);
      return () => {
        window.removeEventListener("load", finishLoading);
        clearTimeout(fallbackTimer);
      };
    }
  }, []);

  if (!mounted) return null;

  return (
    <AnimatePresence onExitComplete={() => setMounted(false)}>
      {visible && (
        <motion.div
          key="intro-overlay"
          className="intro-overlay-layer"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "#0A0809",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "none",
          }}
          aria-hidden="true"
        >
          <style suppressHydrationWarning>{`
            .intro-overlay-layer,
            .intro-overlay-layer * {
              pointer-events: none !important;
            }
          `}</style>
          {/* Initials Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.90 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(3.5rem, 10vw, 6rem)",
              color: "#F0EEEA",
              letterSpacing: "0.06em",
              lineHeight: 1,
              userSelect: "none",
            }}
          >
            PS
          </motion.div>

          {/* Crimson underline bar */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.45, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: "clamp(3rem, 8vw, 5rem)",
              height: "3px",
              background: "#C0391E",
              marginTop: "0.85rem",
              transformOrigin: "left center",
            }}
          />

          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.4 }}
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "0.7rem",
              color: "#9E988F",
              letterSpacing: "0.18em",
              marginTop: "1rem",
              textTransform: "uppercase",
            }}
          >
            SALESFORCE DEVELOPER
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
