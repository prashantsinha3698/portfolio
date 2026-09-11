"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

export default function ScrollObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const revealElement = (el: Element) => {
      el.classList.add("revealed");
    };

    const handleObserve = () => {
      const elements = document.querySelectorAll(".scroll-reveal:not(.revealed)");
      if (elements.length === 0) return;

      if (prefersReducedMotion) {
        elements.forEach(revealElement);
        return;
      }

      const windowHeight = window.innerHeight;

      // Eagerly reveal any element already in or near viewport immediately
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < windowHeight * 0.95 && rect.bottom > 0) {
          revealElement(el);
        }
      });

      // Observe remaining elements
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              revealElement(entry.target);
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.05,
          rootMargin: "0px 0px -20px 0px",
        }
      );

      elements.forEach((el) => {
        if (!el.classList.contains("revealed")) {
          observer.observe(el);
        }
      });
    };

    // Run immediately and shortly after render
    handleObserve();
    const t1 = setTimeout(handleObserve, 150);
    const t2 = setTimeout(handleObserve, 500);

    // Watch for DOM mutations (e.g. Next.js route transitions or async components)
    const mutationObserver = new MutationObserver(() => {
      handleObserve();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Fallback safety net: Ensure no element is ever stuck invisible
    const safetyNet = setTimeout(() => {
      document.querySelectorAll(".scroll-reveal:not(.revealed)").forEach(revealElement);
    }, 1800);

    const handleScroll = () => {
      handleObserve();
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(safetyNet);
      mutationObserver.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, [pathname]);

  return null;
}
