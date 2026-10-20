"use client";

import { useState } from "react";
import { Pause, Play } from "lucide-react";

/**
 * Scrolling strip of participating medical centers. Moving content that runs
 * longer than five seconds needs a pause control (WCAG 2.2.2), so the strip
 * has an explicit pause/play button in addition to pausing on hover and focus.
 */
export function CentersStrip({ names }: { names: string[] }) {
  const [paused, setPaused] = useState(false);

  return (
    <div className="hx-strip" data-paused={paused ? "" : undefined}>
      <ul className="hx-strip-track">
        {[...names, ...names].map((name, i) => (
          <li key={`${name}-${i}`} aria-hidden={i >= names.length ? true : undefined}>{name}</li>
        ))}
      </ul>
      <button
        type="button"
        className="hx-strip-toggle"
        aria-pressed={paused}
        aria-label={paused ? "Resume scrolling list of medical centers" : "Pause scrolling list of medical centers"}
        onClick={() => setPaused((p) => !p)}
      >
        {paused ? <Play aria-hidden="true" /> : <Pause aria-hidden="true" />}
      </button>
    </div>
  );
}

export default CentersStrip;
