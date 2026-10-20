import { US_STATES } from "./usStates";

// Coordinates in the source map user space (from viewBox "192 9 1028 746").
// The displayed viewBox below crops to the contiguous US + a right gutter for the
// Northeast callout. Positions are hand-tuned to city locations.
type Site = {
  num: number;
  name: string;
  x: number;
  y: number;
  dir: "right" | "left" | "callout";
  labelY?: number; // callout label y (source units)
  hub?: boolean;
};

const VIEWBOX_X = 285;
const VIEWBOX_Y = 60;
const VIEWBOX_W = 1095;
const VIEWBOX_H = 545;
const CALLOUT_X = 1200;

export type { Site };

const memberSites: Site[] = [
  { num: 1, name: "University of California, Irvine", x: 366, y: 372, dir: "right" },
  { num: 2, name: "University of Minnesota", x: 845, y: 165, dir: "right" },
  { num: 3, name: "Indiana University", x: 930, y: 288, dir: "right" },
  { num: 4, name: "University of Florida", x: 1012, y: 486, dir: "left" },
  { num: 5, name: "Cornell University", x: 1086, y: 176, dir: "callout", labelY: 150 },
  { num: 7, name: "Yale University", x: 1156, y: 196, dir: "callout", labelY: 196, hub: true },
  { num: 6, name: "Columbia University", x: 1150, y: 214, dir: "callout", labelY: 242 },
];

// Every institution that has shown interest, including the University of
// Pennsylvania (Philadelphia), listed in the Northeast callout.
export const interestedSites: Site[] = [
  ...memberSites.map((s) => {
    if (s.name === "Yale University") return { ...s, num: 8 };
    // labels on the left of the dot keep the Midwest clear of the Northeast callouts
    if (s.name === "University of Minnesota" || s.name === "Indiana University") return { ...s, dir: "left" as const };
    return s;
  }),
  { num: 7, name: "University of Pennsylvania", x: 1121, y: 236, dir: "callout", labelY: 288 },
];

const NUMBER_WORDS = ["zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten"];

const pct = (v: number, origin: number, size: number) => ((v - origin) / size) * 100;

const HUB_X = 1156;
const HUB_Y = 196;

// Upward-bowing quadratic arc from the hub to a site; taller for longer routes.
const arcPath = (x: number, y: number) => {
  const mx = (HUB_X + x) / 2;
  const my = (HUB_Y + y) / 2;
  const lift = Math.min(170, Math.max(16, Math.hypot(x - HUB_X, y - HUB_Y) * 0.3));
  return `M${HUB_X} ${HUB_Y} Q${mx.toFixed(1)} ${(my - lift).toFixed(1)} ${x} ${y}`;
};

export function NetworkMap({ sites = memberSites, arcs = false }: { sites?: Site[]; arcs?: boolean } = {}) {
  const count = NUMBER_WORDS[sites.length] ?? String(sites.length);
  // "University of Pennsylvania" is the longest Northeast callout label; give the right gutter room for it.
  const viewW = VIEWBOX_W + (sites.some((s) => s.name === "University of Pennsylvania") ? 250 : 0);
  return (
    <div className="network-map">
      <div className="nm-canvas" style={{ aspectRatio: `${viewW} / ${VIEWBOX_H}` }}>
        <svg
          className="network-map-svg"
          viewBox={`${VIEWBOX_X} ${VIEWBOX_Y} ${viewW} ${VIEWBOX_H}`}
          role="img"
          aria-label={`Map of the United States showing ${count} Clarion institutions, with the Yale coordinating center connected to each site.`}
        >
          <g className="nm-states">
            {US_STATES.map((s) => (
              <path key={s.id} d={s.path} />
            ))}
          </g>

          {arcs ? (
            <g className="nm-lines nm-arcs" aria-hidden="true">
              <defs>
                <filter id="nm-arc-glow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur stdDeviation="3" />
                </filter>
                {sites.filter((s) => !s.hub).map((s, i) => (
                  <linearGradient key={s.name} id={`nm-arc-grad-${i}`} gradientUnits="userSpaceOnUse" x1={HUB_X} y1={HUB_Y} x2={s.x} y2={s.y}>
                    <stop offset="0%" stopColor="#f2b56b" />
                    <stop offset="100%" stopColor="#7fb2ff" />
                  </linearGradient>
                ))}
              </defs>
              {sites.filter((s) => !s.hub).map((s) => (
                <ellipse key={`g${s.name}`} className="nm-ground" cx={s.x} cy={s.y + 2} rx="13" ry="4" />
              ))}
              {sites.filter((s) => !s.hub).map((s) => (
                <path key={`h${s.name}`} className="nm-arc-halo" d={arcPath(s.x, s.y)} filter="url(#nm-arc-glow)" />
              ))}
              {sites.filter((s) => !s.hub).map((s, i) => (
                <path key={`a${s.name}`} id={`nm-arc-${i}`} className="nm-arc" d={arcPath(s.x, s.y)} stroke={`url(#nm-arc-grad-${i})`} />
              ))}
              {sites.filter((s) => !s.hub).map((s, i) => (
                <circle key={`p${s.name}`} className="nm-pulse" r="3.2">
                  <animateMotion dur={`${3.2 + (i % 3) * 0.6}s`} begin={`${i * 0.45}s`} repeatCount="indefinite" keyPoints="0;1" keyTimes="0;1" calcMode="spline" keySplines="0.45 0 0.25 1">
                    <mpath href={`#nm-arc-${i}`} />
                  </animateMotion>
                </circle>
              ))}
            </g>
          ) : (
            <g className="nm-lines" aria-hidden="true">
              {sites
                .filter((s) => !s.hub)
                .map((s) => (
                  <line key={s.name} x1={HUB_X} y1={HUB_Y} x2={s.x} y2={s.y} className="nm-line" />
                ))}
            </g>
          )}

          {/* desktop leader lines for the Northeast callout */}
          <g className="nm-leaders nm-desktop" aria-hidden="true">
            {sites
              .filter((s) => s.dir === "callout")
              .map((s) => (
                <polyline
                  key={s.name}
                  className="nm-leader"
                  points={`${s.x + (s.hub ? 9 : 5)},${s.y} ${CALLOUT_X - 8},${s.labelY! - 4}`}
                  fill="none"
                />
              ))}
          </g>

          <g className="nm-nodes" aria-hidden="true">
            {sites
              .filter((s) => !s.hub)
              .map((s) => (
                <circle key={s.name} cx={s.x} cy={s.y} r={5} className="nm-dot" />
              ))}
            <circle cx={1156} cy={196} r={14} className="nm-hub-ring" />
            <circle cx={1156} cy={196} r={7.5} className="nm-hub" />
          </g>

          {/* desktop full-name labels (one uniform style) */}
          <g className="nm-labels nm-desktop" aria-hidden="true">
            {sites.map((s) => {
              if (s.dir === "callout") {
                return (
                  <text key={s.name} className="nm-label" x={CALLOUT_X} y={s.labelY} textAnchor="start">
                    {s.name}
                  </text>
                );
              }
              const right = s.dir === "right";
              return (
                <text
                  key={s.name}
                  className="nm-label"
                  x={s.x + (right ? 14 : -14)}
                  y={s.y + 5}
                  textAnchor={right ? "start" : "end"}
                >
                  {s.name}
                </text>
              );
            })}
          </g>
        </svg>

        {/* mobile number badges, positioned over the map */}
        <div className="nm-badges nm-mobile" aria-hidden="true">
          {sites.map((s) => (
            <span
              key={s.name}
              data-num={s.num}
              className={s.hub ? "nm-badge nm-badge-hub" : "nm-badge"}
              style={{
                left: `${pct(s.x, VIEWBOX_X, viewW)}%`,
                top: `${pct(s.y, VIEWBOX_Y, VIEWBOX_H)}%`,
              }}
            >
              {s.num}
            </span>
          ))}
        </div>
      </div>

      <ol className="nm-legend-list">
        {[...sites]
          .sort((a, b) => a.num - b.num)
          .map((s) => (
            <li key={s.name} value={s.num}>
              <span className="nm-legend-num">{s.num}</span>
              <span className="nm-legend-name">
                {s.name}
                {s.hub && <span className="nm-legend-tag"> — Coordinating center</span>}
              </span>
            </li>
          ))}
      </ol>

      <p className="nm-key" aria-hidden="true">
        <span className="nm-key-item"><span className="nm-key-dot" /> Member site</span>
        <span className="nm-key-item"><span className="nm-key-dot nm-key-dot-hub" /> Coordinating center</span>
      </p>
    </div>
  );
}

export default NetworkMap;
