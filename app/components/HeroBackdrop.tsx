"use client";

import MicroSlats from "./MicroSlats";

/** Homepage hero background: React Bits MicroSlats in the navy + gold palette. */
export function HeroBackdrop() {
  return (
    <div className="hx-hero-anim" aria-hidden="true">
      <MicroSlats
        preset="swell"
        color="#2b5aa6"
        glintColor="#f2b56b"
        backgroundColor="#06112a"
        slatWidth={10}
        slatHeight={25}
        gap={3}
        roundness={0.75}
        interactive
        cursorStrength={1}
        cursorSize={40}
        swirl={0}
        trail={1.4}
        lean={0}
        intro
        scale={1.5}
        speed={0.6}
        direction={250}
        chop={0.55}
        stretch={0}
        glint={0.45}
        contrast={1.1}
        perspective={0.55}
        fog={0.6}
        introDuration={1.5}
        paused={false}
        style={undefined}
      />
    </div>
  );
}

export default HeroBackdrop;
