"use client";

import { useRouter } from "next/navigation";
import SpecularButton from "./SpecularButton";

export function HeroActions() {
  const router = useRouter();

  return (
    <div className="home-actions">
      <SpecularButton
        size="lg"
        radius={10}
        textColor="#FFFCF6"
        lineColor="#CFEDE8"
        baseColor="#0E2A33"
        intensity={0.85}
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
