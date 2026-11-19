import { BlurText } from "./BlurText";
import HoloMosaic from "./HoloMosaic";

/** Settings shared by every mosaic layer. */
const MOSAIC = {
  spectrum: "pearl", tileSize: 1.3, gap: 0.1, roundness: 0.2, bevel: 0.4, scatter: 0.3, tilt: 0.35,
  swirl: 1, ripple: 0.5, bands: 1.3, softness: 0.5, sheen: 0.45, grain: 0.06, speed: 0.4,
  intro: true, mouseInteraction: true, flipOnClick: true, mouseStrength: 1, mouseRadius: 0.25, dpr: 1.5,
} as const;

type PageHeroProps = {
  /** First, quieter line of the title. */
  lead: string;
  /** Key phrase, set large in gold. */
  accent: string;
  body: string;
  /** Optional "at a glance" figures shown in a glass panel. */
  stats?: { value: string; label: string }[];
  /** Shorter hero for pages with little intro copy. */
  compact?: boolean;
  /** Seed for the mosaic, so each page gets its own tile pattern. */
  seed?: number;
  /** "light": pearl mosaic on a pale ground with navy type. Default "dark". */
  tone?: "dark" | "light";
  /** Per-page variation of the mosaic: tile scale (1.3 default) and grid angle in degrees. */
  tileSize?: number;
  rotation?: number;
  /** Long accent phrase: smaller title so it still sets in two lines on desktop. */
  longTitle?: boolean;
};

/**
 * Inner-page hero: an editorial split. Copy sits on deep navy at left; a pearl/
 * champagne HoloMosaic (React Bits) fills the right as an artwork panel that melts
 * into the navy. It shares the homepage's navy, gold and blurred title, but its
 * tiled, metallic surface sets the inner pages apart from the homepage's slats.
 */
export function PageHero({ lead, accent, body, stats, compact, seed = 0, tone = "dark", tileSize = 1.3, rotation = 0, longTitle = false }: PageHeroProps) {
  const light = tone === "light";
  const classes = ["ph-hero", compact && "ph-compact", light && "ph-light", longTitle && "ph-long-title"].filter(Boolean).join(" ");
  return (
    <section className={classes} aria-labelledby="page-title">
      <div className="ph-art" aria-hidden="true">
        {light ? (
          <>
            {/* pearl tiles carry the panel ... */}
            <HoloMosaic {...MOSAIC} variation={seed} tileSize={tileSize} rotation={rotation} color="#f7f9fd" metalColor="#5a86e0"
              intensity={1.3} saturation={0.15} glitter={0.5} sheen={1.0} tilt={0.55} bevel={0.6} bands={1.6} lightMode />
            {/* ... with a faint data-character layer over them for a hint of data */}
            <HoloMosaic {...MOSAIC} variation={seed} tileSize={tileSize} rotation={rotation} className="ph-art-data" color="#f7f9fd" metalColor="#5b7fc4"
              intensity={1.2} saturation={0.3} glitter={0} lightMode filter="ascii" filterSize={1} />
          </>
        ) : (
          <HoloMosaic {...MOSAIC} variation={seed} tileSize={tileSize} rotation={rotation} color="#06112a" metalColor="#c9a46e"
            intensity={0.75} saturation={0.3} glitter={0.5} />
        )}
      </div>
      <div className="ph-shade" aria-hidden="true" />

      <div className="ph-shell ph-main">
        <div className="ph-copy">
          <h1 id="page-title">
            <BlurText className="ph-title-lead" text={lead} />{" "}
            <span className="ph-gold"><BlurText text={accent} delay={0.14} /></span>
          </h1>
          <p className="ph-lede">{body}</p>
        </div>

        {stats && (
          <aside className="ph-stats" aria-label="At a glance">
            <p className="ph-stats-label">At a glance</p>
            <dl>
              {stats.map(({ value, label }) => (
                <div key={label}>
                  <dt>{value}</dt>
                  <dd>{label}</dd>
                </div>
              ))}
            </dl>
          </aside>
        )}
      </div>

    </section>
  );
}

export default PageHero;
