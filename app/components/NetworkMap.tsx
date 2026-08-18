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
const VIEWBOX = `${VIEWBOX_X} ${VIEWBOX_Y} ${VIEWBOX_W} ${VIEWBOX_H}`;
const CALLOUT_X = 1200;

const sites: Site[] = [
  { num: 1, name: "University of California, Irvine", x: 366, y: 372, dir: "right" },
  { num: 2, name: "University of Minnesota", x: 845, y: 165, dir: "right" },
  { num: 3, name: "Indiana University", x: 930, y: 288, dir: "right" },
  { num: 4, name: "University of Florida", x: 1012, y: 486, dir: "left" },
  { num: 5, name: "Cornell University", x: 1086, y: 176, dir: "callout", labelY: 150 },
  { num: 7, name: "Yale University", x: 1156, y: 196, dir: "callout", labelY: 196, hub: true },
  { num: 6, name: "Columbia University", x: 1150, y: 214, dir: "callout", labelY: 242 },
];

const pct = (v: number, origin: number, size: number) => ((v - origin) / size) * 100;

export function NetworkMap() {
  return (
    <div className="network-map">
      <div className="nm-canvas">
        <svg
          className="network-map-svg"
          viewBox={VIEWBOX}
          role="img"
          aria-label="Map of the United States showing the seven Clarion member institutions, with the Yale coordinating center connected to each site."
        >
          <g className="nm-states">
            {US_STATES.map((s) => (
              <path key={s.id} d={s.path} />
            ))}
          </g>

          <g className="nm-lines" aria-hidden="true">
            {sites
              .filter((s) => !s.hub)
              .map((s) => (
                <line key={s.name} x1={1156} y1={196} x2={s.x} y2={s.y} className="nm-line" />
              ))}
          </g>

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
                left: `${pct(s.x, VIEWBOX_X, VIEWBOX_W)}%`,
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
