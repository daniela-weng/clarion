"use client";

import type { ComponentType, ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SpecularButtonJs from "./SpecularButton";

// The vendored JS component infers `children` as string from its default; widen it.
const SpecularButton = SpecularButtonJs as unknown as ComponentType<Record<string, unknown> & { children?: ReactNode }>;

/** Shared homepage CTA look: navy glass with a gold tint whose rim catches light as the cursor approaches. */
function GlassCta({ children, onClick, className = "" }: { children: ReactNode; onClick: () => void; className?: string }) {
  return (
    <SpecularButton
      className={`hx-cta ${className}`.trim()}
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
      onClick={onClick}
    >
      {children} <ArrowRight aria-hidden="true" />
    </SpecularButton>
  );
}

/** Hero call to action: scrolls to the medical centers map. */
export function HeroCta() {
  return (
    <GlassCta
      onClick={() => {
        const target = document.getElementById("centers-title");
        if (!target) return;
        // move keyboard/screen-reader focus first; focusing mid-scroll would cancel the smooth scroll
        target.focus({ preventScroll: true });
        target.scrollIntoView({ behavior: "smooth", block: "start" });
      }}
    >
      Participating Medical Centers
    </GlassCta>
  );
}

/**
 * Partners call to action on a light background: the hero CTA's shape, type, and arrow,
 * with a solid navy body and a gold rim on hover (glass + rim light only read on dark).
 */
export function ContactCta() {
  return (
    <Link className="hx-cta-solid" href="/contact">
      Contact the Coordinating Center <ArrowRight aria-hidden="true" />
    </Link>
  );
}

export default HeroCta;
