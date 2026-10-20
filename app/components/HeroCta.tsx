"use client";

import type { ComponentType, ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import SpecularButtonJs from "./SpecularButton";

// The vendored JS component infers `children` as string from its default; widen it.
const SpecularButton = SpecularButtonJs as unknown as ComponentType<Record<string, unknown> & { children?: ReactNode }>;

/** Hero call to action: a glass button whose gold rim catches light as the cursor approaches. */
export function HeroCta() {
  return (
    <SpecularButton
      className="hx-cta"
      size="lg"
      radius={10}
      tint="#f2b56b"
      tintOpacity={0.2}
      blur={6}
      textColor="#f4efe4"
      lineColor="#f6c98a"
      baseColor="#c9a46a"
      intensity={1}
      idleIntensity={0.5}
      shineSize={10}
      shineFade={34}
      thickness={1.2}
      glow={1}
      followMouse
      proximity={250}
      onClick={() => {
        const target = document.getElementById("centers-title");
        if (!target) return;
        // move keyboard/screen-reader focus first; focusing mid-scroll would cancel the smooth scroll
        target.focus({ preventScroll: true });
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
    >
      Explore the Network <ArrowRight aria-hidden="true" />
    </SpecularButton>
  );
}

export default HeroCta;
