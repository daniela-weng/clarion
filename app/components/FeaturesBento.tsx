"use client";

import { useEffect, useRef } from "react";
import { BrainCircuit, Check, Database, Scale, ShieldCheck } from "lucide-react";

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
    lead: "Multi-source, multi-site real-world data to enable comprehensive and generalizable evidence.",
    icon: Database,
    points: [
      { term: "Electronic Health Records (EHRs)", detail: "Longitudinal clinical data from academic medical centers, community hospitals, outpatient clinics, primary care, specialty care, and emergency departments." },
      { term: "Administrative Claims and Large-Scale Healthcare Databases", detail: "Commercial claims datasets such as MarketScan and multi-institutional EHR databases such as Epic Cosmos." },
      { term: "Diverse Healthcare Systems and Populations", detail: "Data from geographically distributed institutions serving urban, suburban, and rural communities, with variation in demographics, socioeconomic characteristics, disease burden, and healthcare delivery settings." },
    ],
  },
  {
    title: "Multimodal Data Extraction",
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
      </div>

      <div className="bx-grid" ref={gridRef}>
        {features.map(({ title, lead, icon: Icon, points }, index) => (
          <article className="bx-card reveal" key={title} id={`feature-${index + 1}`} aria-labelledby={`feature-${index + 1}-title`}>
            <span className="bx-wash" aria-hidden="true" />
            <span className="bx-rim" aria-hidden="true" />
            <div className="bx-body">
              <div className="bx-head">
                <span className="bx-icon" aria-hidden="true"><Icon strokeWidth={1.6} /></span>
                <div className="bx-head-text">
                  <p className="bx-seq" aria-hidden="true">{String(index + 1).padStart(2, "0")}</p>
                  <h3 id={`feature-${index + 1}-title`}>{title}</h3>
                </div>
              </div>
              {lead && <p className="bx-lead">{lead}</p>}
              <ul className="bx-points">
                {points.map((point) => (
                  <li key={point.detail} className={point.term ? "has-term" : undefined}>
                    <span className="bx-check" aria-hidden="true"><Check strokeWidth={2.4} /></span>
                    <span className="bx-point-text">
                      {point.term && <strong>{point.term} </strong>}
                      {point.detail}
                    </span>
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
