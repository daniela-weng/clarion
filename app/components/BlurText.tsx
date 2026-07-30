"use client";

import { motion, useReducedMotion } from "motion/react";

type BlurTextProps = {
  text: string;
  className?: string;
  /** Stagger offset (seconds) applied before this line's words begin. */
  delay?: number;
};

/**
 * Word-by-word blur/fade-in reveal.
 * The DOM structure is identical on server and client (one span per word); only the
 * transition timing changes for reduced-motion, so there is no hydration mismatch.
 */
export function BlurText({ text, className, delay = 0 }: BlurTextProps) {
  const reduce = useReducedMotion();
  const words = text.split(" ");

  return (
    <span className={className}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          style={{ display: "inline-block", willChange: "transform, filter, opacity" }}
          initial={{ opacity: 0, filter: "blur(10px)", y: "0.35em" }}
          animate={{ opacity: 1, filter: "blur(0px)", y: "0em" }}
          transition={
            reduce
              ? { duration: 0 }
              : { duration: 0.6, delay: delay + i * 0.07, ease: [0.22, 1, 0.36, 1] }
          }
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </span>
  );
}
