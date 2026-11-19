import HoloMosaic from "./HoloMosaic";

export type Principle = { title: string; definition: string; detail: string };

/** Same mosaic settings as the inner-page hero, so the panel reads as its companion. */
const MOSAIC = {
  spectrum: "pearl", tileSize: 1.1, gap: 0.1, roundness: 0.2, bevel: 0.6, scatter: 0.3, tilt: 0.55,
  swirl: 1, ripple: 0.5, bands: 1.6, softness: 0.5, sheen: 1.0, grain: 0.06, speed: 0.4,
  intro: true, mouseInteraction: true, flipOnClick: true, mouseStrength: 1, mouseRadius: 0.25, dpr: 1.5,
} as const;

/**
 * Core principles in the inner-page hero's visual language: one light rounded panel with the
 * blue metallic mosaic bleeding in at the top right, and the five principles as equal columns.
 */
export function PrinciplesPanel({ principles }: { principles: Principle[] }) {
  return (
    <section id="principles" className="pp-section" aria-labelledby="principles-title">
      <div className="pp-panel">
        <div className="pp-art" aria-hidden="true">
          <HoloMosaic {...MOSAIC} variation={83} rotation={0} color="#f7f9fd" metalColor="#5a86e0"
            intensity={1.3} saturation={0.15} glitter={0.5} lightMode />
        </div>
        <div className="pp-shade" aria-hidden="true" />

        <div className="pp-inner">
          <div className="pp-head reveal">
            <p className="pp-eyebrow">Core principles</p>
            <h2 id="principles-title">Five commitments that <em>guide the network</em>.</h2>
            <p className="pp-intro">
              The charter establishes a shared standard for how Clarion&apos;s members govern research, protect
              institutional responsibilities, and pursue clinically meaningful real-world evidence.
            </p>
          </div>

          <ol className="pp-columns">
            {principles.map((p, i) => (
              <li key={p.title} className="reveal">
                <div className="pp-name">
                  <span className="pp-num" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span>
                  <h3>{p.title}</h3>
                </div>
                <div className="pp-text">
                  <p className="pp-def">{p.definition}</p>
                  <p className="pp-detail">{p.detail}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}

export default PrinciplesPanel;
