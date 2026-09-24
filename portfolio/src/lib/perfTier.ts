/**
 * perfTier.ts — Device performance tier detection.
 * Mirrors the loehx.com strategy: hardwareConcurrency + deviceMemory -> low/medium/high.
 */

export type PerfTier = "low" | "medium" | "high";

export function detectPerfTier(): PerfTier {
  if (typeof window === "undefined") return "medium";
  try {
    const param = new URLSearchParams(window.location.search).get("perf");
    if (param === "low" || param === "medium" || param === "high") return param;
    const stored = localStorage.getItem("site-perf-tier");
    if (stored === "low" || stored === "medium" || stored === "high") return stored;
  } catch (_) {}

  const cores = navigator.hardwareConcurrency ?? 4;
  const mem = (navigator as any).deviceMemory ?? 4;
  let score = 0;
  if (cores >= 8) score += 2; else if (cores >= 4) score += 1; else score -= 1;
  if (mem >= 8) score += 2; else if (mem >= 4) score += 1; else score -= 1;
  if (score >= 3) return "high";
  if (score >= 0) return "medium";
  return "low";
}

export function isTouchDevice(): boolean {
  if (typeof window === "undefined") return false;
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}
