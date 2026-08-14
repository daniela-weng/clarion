"use client";

import { useEffect } from "react";

/**
 * Progressive scroll-reveal. Content is fully visible by default (SSR / no-JS /
 * reduced-motion). Only when JS runs and the user allows motion do we "arm"
 * `.reveal` elements (hide + offset) and then reveal them on scroll-in. This
 * guarantees content is never stuck hidden.
 */
export function RevealController() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = Array.from(document.querySelectorAll<HTMLElement>(".reveal"));
    if (!els.length) return;

    els.forEach((el, i) => {
      el.classList.add("reveal-armed");
      el.style.setProperty("--reveal-delay", `${Math.min(i % 4, 3) * 70}ms`);
    });

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            io.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}

export default RevealController;
