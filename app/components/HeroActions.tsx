"use client";

import { useRouter } from "next/navigation";
import SpecularButton from "./SpecularButton";

export function HeroActions() {
  const router = useRouter();

  return (
    <div className="home-actions">
      <SpecularButton
        size="lg"
        radius={6}
        textColor="#162330"
        lineColor="#FFFDF8"
        baseColor="#D8D2C7"
        intensity={0.22}
        shineSize={12}
        shineFade={46}
        thickness={0.85}
        speed={0.3}
        followMouse
        proximity={280}
        tintOpacity={0}
        aria-label="About Clarion"
        onClick={() => router.push("/about")}
      >
        About Clarion
      </SpecularButton>
    </div>
  );
}
