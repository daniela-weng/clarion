"use client";

import { useEffect, useRef } from "react";
import { ArrowDownRight, BrainCircuit, Database, Scale, ShieldCheck } from "lucide-react";

type FeaturePoint = { term?: string; detail: string };
type Feature = { title: string; lead?: string; icon: typeof Scale; points: FeaturePoint[] };

const features: Feature[] = [
  {
    title: "Streamlined Governance",
    lead: "A unified public–private framework designed to remove administrative roadblocks.",
    icon: Scale,
    points: [
      { term: "Yale Coordinating Center", detail: "Serves as the central hub to handle master agreements, making the contracting process seamless." },
      { term: "Ecosystem Alignment", detail: "Harmonizes compliance rules across centers to accelerate research timelines." },
    ],
  },
  {
    title: "Diverse Data Sources",
    icon: Database,
    points: [
      { term: "Structured Data", detail: "Standardized diagnostic codes, laboratory panels, and medications." },
      { term: "Unstructured Data", detail: "Parses complex data modalities including clinical narratives, images, and genomics." },
    ],
  },
  {
    title: "AI Models and Tools",
    lead: "Advanced AI-based extraction to unlock the “Dark Matter” of health records.",
    icon: BrainCircuit,
    points: [
      { detail: "Automated cohort generation" },
      { detail: "Scalable extraction of study variables from structured and unstructured data" },
      { detail: "Standardized, reproducible analytic pipelines" },
    ],
  },
  {
    title: "Privacy-Preserving Federated Analysis",
    lead: "Data stays securely behind institutional firewalls with zero central data storage.",
    icon: ShieldCheck,
    points: [
      { detail: "Queries execute locally across participating medical hubs." },
      { detail: "Only summary, aggregate statistics are returned to the central node, eliminating privacy leaks." },
      { detail: "Cross-site analyses are conducted through federated learning and distributed computation frameworks, ensuring privacy, compliance, and reproducibility." },
    ],
  },
];

/**
 * Equal 2×2 grid of the four Clarion features with a cursor spotlight (after React Bits
 * ChromaGrid): near the pointer, each card's border and surface pick up a gold glow.
 */
export function FeaturesBento() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const cards = Array.from(grid.querySelectorAll<HTMLElement>(".bx-card"));
    let raf = 0;
    let px = 0;
    let py = 0;

    const paint = () => {
      raf = 0;
      for (const card of cards) {
        const r = card.getBoundingClientRect();
        card.style.setProperty("--mx", `${px - r.left}px`);
        card.style.setProperty("--my", `${py - r.top}px`);
      }
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      px = e.clientX;
      py = e.clientY;
      grid.dataset.lit = "";
      if (!raf) raf = requestAnimationFrame(paint);
    };
    const onLeave = () => { delete grid.dataset.lit; };

    grid.addEventListener("pointermove", onMove);
    grid.addEventListener("pointerleave", onLeave);
    return () => {
      cancelAnimationFrame(raf);
      grid.removeEventListener("pointermove", onMove);
      grid.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <>
      <div className="bx-header">
        <div className="hx-heading reveal">
          <p className="hx-eyebrow">Features of Clarion</p>
          <h2 id="features-title">Streamlined Governance and <span className="hx-gold">Advanced AI Technology</span> to Ensure Efficiency and Quality</h2>
        </div>
        <nav className="bx-index-nav reveal" aria-label="Features of Clarion">
          <ol>
            {features.map(({ title }, index) => (
              <li key={title}>
                <a href={`#feature-${index + 1}`}>
                  <span className="bx-index-num" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                  <span className="bx-index-title">{title}</span>
                  <ArrowDownRight className="bx-index-arrow" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ol>
        </nav>
      </div>

      {/* shared blue→gold stroke for the card icons (userSpaceOnUse so straight lines still render) */}
      <svg width="0" height="0" aria-hidden="true" focusable="false" style={{ position: "absolute" }}>
        <defs>
          <linearGradient id="bx-icon-stroke" gradientUnits="userSpaceOnUse" x1="2" y1="2" x2="22" y2="22">
            <stop offset="0%" stopColor="#2b5aa6" />
            <stop offset="60%" stopColor="#4f7fd0" />
            <stop offset="100%" stopColor="#c8913f" />
          </linearGradient>
        </defs>
      </svg>

      <div className="bx-grid" ref={gridRef}>
        {features.map(({ title, lead, icon: Icon, points }, index) => (
          <article className="bx-card reveal" key={title} id={`feature-${index + 1}`} aria-labelledby={`feature-${index + 1}-title`}>
            <span className="bx-wash" aria-hidden="true" />
            <span className="bx-rim" aria-hidden="true" />
            <div className="bx-body">
              <div className="bx-head">
                <span className="bx-icon" aria-hidden="true"><Icon strokeWidth={1.6} /></span>
                <span className="bx-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
              </div>
              <h3 id={`feature-${index + 1}-title`}>{title}</h3>
              {/* the lead slot is always rendered so dividers line up across cards */}
              <p className="bx-lead" aria-hidden={lead ? undefined : true}>{lead}</p>
              <ul className="bx-points">
                {points.map((point) => (
                  <li key={point.detail} className={point.term ? "has-term" : undefined}>
                    {point.term && <strong>{point.term}</strong>}
                    <span>{point.detail}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}
      </div>
    </>
  );
}

export default FeaturesBento;
