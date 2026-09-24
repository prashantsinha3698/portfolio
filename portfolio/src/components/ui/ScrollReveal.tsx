"use client";

import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useVelocity,
} from "framer-motion";
import { ReactNode, useRef, useState, useEffect } from "react";

export type RevealVariant =
  | "fade-up"
  | "slide-left"
  | "slide-right"
  | "scale-in"
  | "clip-up"
  | "split-up"
  | "blur-in"
  | "fade";

export interface ScrollRevealProps {
  children: ReactNode;
  delay?: number;
  variant?: RevealVariant;
  className?: string;
  style?: React.CSSProperties;
  amount?: number;
  duration?: number;
  enableBackMotion?: boolean;
}

/**
 * Truly bidirectional Framer Motion scroll-reveal component:
 * - Scrolling top-to-down: component smoothly reveals into position (opacity 0->1, y rises to 0).
 * - Reverse scroll (bottom-to-top): component starts hiding back in the EXACT same reverse motion (y moves down, opacity 1->0).
 * - Tactile spring velocity back-motion for instant responsive reverse inertia.
 */
const CUSTOM_EASE = [0.16, 1, 0.3, 1] as const;

export default function ScrollReveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 0.65,
  className,
  style,
  amount = 0.12,
}: ScrollRevealProps) {
  const [mounted, setMounted] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      setPrefersReducedMotion(true);
    }
  }, []);

  if (!mounted || prefersReducedMotion) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  let hiddenState: Record<string, number> = { opacity: 0, y: 32, scale: 0.98 };
  let visibleState: Record<string, number> = { opacity: 1, y: 0, scale: 1 };

  switch (variant) {
    case "slide-left":
      hiddenState = { opacity: 0, x: 36, scale: 0.98 };
      visibleState = { opacity: 1, x: 0, scale: 1 };
      break;
    case "slide-right":
      hiddenState = { opacity: 0, x: -36, scale: 0.98 };
      visibleState = { opacity: 1, x: 0, scale: 1 };
      break;
    case "scale-in":
      hiddenState = { opacity: 0, scale: 0.92, y: 16 };
      visibleState = { opacity: 1, scale: 1, y: 0 };
      break;
    case "blur-in":
      hiddenState = { opacity: 0, y: 24, scale: 0.96 };
      visibleState = { opacity: 1, y: 0, scale: 1 };
      break;
    case "fade":
      hiddenState = { opacity: 0 };
      visibleState = { opacity: 1 };
      break;
    case "fade-up":
    case "clip-up":
    case "split-up":
    default:
      hiddenState = { opacity: 0, y: 32, scale: 0.98 };
      visibleState = { opacity: 1, y: 0, scale: 1 };
      break;
  }

  const variants = {
    hidden: {
      ...hiddenState,
      transition: {
        duration: 0.42,
        ease: CUSTOM_EASE,
      },
    },
    visible: {
      ...visibleState,
      transition: {
        duration: duration || 0.65,
        ease: CUSTOM_EASE,
        delay: delay || 0,
      },
    },
  };

  return (
    <div className={className} style={{ ...style, position: "relative" }}>
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{
          once: false,
          amount: amount || 0.12,
          margin: "1200px 0px -40px 0px",
        }}
        variants={variants}
        style={{
          width: "100%",
          height: "100%",
          transform: "translate3d(0, 0, 0)",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export { ScrollReveal };

export function ParallaxReveal({
  children,
  offset = 24,
  className,
  style,
}: {
  children: ReactNode;
  offset?: number;
  className?: string;
  style?: React.CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [-offset, offset]);
  const smoothY = useSpring(y, { stiffness: 120, damping: 20 });

  return (
    <motion.div ref={ref} style={{ ...style, y: smoothY }} className={className}>
      {children}
    </motion.div>
  );
}

export function StaggerReveal({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <ScrollReveal className={className} style={style}>
      {children}
    </ScrollReveal>
  );
}

export function StaggerItem({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <div className={className} style={style}>
      {children}
    </div>
  );
}
