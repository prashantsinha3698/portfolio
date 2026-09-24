/**
 * Reliable, high-performance smooth scrolling utility.
 *
 * Uses requestAnimationFrame with quartic easing. Sets scroll position across
 * window, documentElement, and body on each frame so it is completely immune
 * to compositor interruptions, browser conflicts, or trackpad momentum events.
 */

export interface SmoothScrollOptions {
  duration?: number;
  offset?: number;
}

export function smoothScrollTo(targetY: number, options: SmoothScrollOptions = {}) {
  if (typeof window === "undefined") return;

  const { duration = 550, offset = 0 } = options;
  const finalTargetY = Math.max(0, Math.round(targetY + offset));

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) {
    window.scrollTo(0, finalTargetY);
    if (document.documentElement) document.documentElement.scrollTop = finalTargetY;
    if (document.body) document.body.scrollTop = finalTargetY;
    return;
  }

  const getScrollY = () =>
    window.scrollY ||
    window.pageYOffset ||
    (document.documentElement ? document.documentElement.scrollTop : 0) ||
    (document.body ? document.body.scrollTop : 0) ||
    0;

  const startY = getScrollY();
  const distance = finalTargetY - startY;

  if (Math.abs(distance) < 2) {
    window.scrollTo(0, finalTargetY);
    if (document.documentElement) document.documentElement.scrollTop = finalTargetY;
    if (document.body) document.body.scrollTop = finalTargetY;
    return;
  }

  // Ensure CSS smooth scroll is not active on html/body to prevent competing interpolations
  const html = document.documentElement;
  const prevHtmlBehavior = html ? html.style.scrollBehavior : "";
  const prevBodyBehavior = document.body ? document.body.style.scrollBehavior : "";
  if (html) html.style.scrollBehavior = "auto";
  if (document.body) document.body.style.scrollBehavior = "auto";

  const startTime = performance.now();

  // Smooth quartic ease-out for tactile, responsive deceleration
  const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);

  let animationFrameId: number;
  let intervalFallbackId: NodeJS.Timeout | null = null;

  const applyScroll = (y: number) => {
    window.scrollTo(0, y);
    if (document.documentElement) document.documentElement.scrollTop = y;
    if (document.body) document.body.scrollTop = y;
  };

  const finish = () => {
    cancelAnimationFrame(animationFrameId);
    if (intervalFallbackId) clearInterval(intervalFallbackId);
    applyScroll(finalTargetY);
    if (html) html.style.scrollBehavior = prevHtmlBehavior;
    if (document.body) document.body.style.scrollBehavior = prevBodyBehavior;
  };

  const step = (currentTime: number) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const eased = easeOutQuart(progress);

    const nextY = Math.round(startY + distance * eased);
    applyScroll(nextY);

    if (progress < 1) {
      animationFrameId = requestAnimationFrame(step);
    } else {
      finish();
    }
  };

  // Run RAF animation
  animationFrameId = requestAnimationFrame(step);

  // Safety net: ensure scroll finishes even if RAF gets throttled in inactive tab
  intervalFallbackId = setInterval(() => {
    const elapsed = performance.now() - startTime;
    if (elapsed >= duration + 50) {
      finish();
    }
  }, 100);
}

export function smoothScrollToTop(duration = 550) {
  smoothScrollTo(0, { duration });
}

export function smoothScrollToElement(
  elementOrId: HTMLElement | string,
  options: SmoothScrollOptions = {}
) {
  if (typeof window === "undefined") return;

  const element =
    typeof elementOrId === "string" ? document.getElementById(elementOrId) : elementOrId;
  if (!element) return;

  const rect = element.getBoundingClientRect();
  const currentY =
    window.scrollY ||
    window.pageYOffset ||
    (document.documentElement ? document.documentElement.scrollTop : 0) ||
    0;
  const targetY = rect.top + currentY;

  smoothScrollTo(targetY, options);
}
