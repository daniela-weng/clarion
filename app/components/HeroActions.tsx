"use client";

import Link from "next/link";
import SpecularButton from "./SpecularButton";
import { ArrowRight } from "lucide-react";

export function HeroActions() {
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
        aria-label="Explore Clarion"
        onClick={() => document.getElementById("clarion-pillars")?.scrollIntoView({ behavior: "smooth" })}
      >
        Explore Clarion
      </SpecularButton>
      <Link className="home-text-link" href="#model-title">
        How the model works <ArrowRight aria-hidden="true" />
      </Link>
    </div>
  );
}
