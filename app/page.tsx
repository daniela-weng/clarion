import Link from "next/link";
import { ArrowRight, ArrowUpRight, Network, ShieldCheck, FlaskConical } from "lucide-react";
import { BlurText } from "./components/BlurText";
import { HeroActions } from "./components/HeroActions";
import { HeroNetwork } from "./components/HeroNetwork";
import PixelBlast from "./components/PixelBlast";
import { FederatedFlow } from "./components/FederatedFlow";
import { NetworkMap } from "./components/NetworkMap";
import { RevealController } from "./components/RevealController";

const researchAreas = [
  {
    href: "/network",
    label: "The network",
    cta: "Explore the network",
    teaser: "Participating institutions, defined member roles, and Yale’s coordinating responsibilities.",
    icon: Network,
  },
  {
    href: "/governance",
    label: "Governance & data",
    cta: "Review governance",
    teaser: "Shared oversight, privacy protections, and policies for responsible multi-institutional research.",
    icon: ShieldCheck,
  },
  {
    href: "/sponsored-research",
    label: "Sponsored research",
    cta: "Plan a study",
    teaser: "Proposal review, feasibility assessment, and coordinated execution across approved member sites.",
    icon: FlaskConical,
  },
];

const stats = [
  { category: "Network", value: "Seven institutions" },
  { category: "Coordination", value: "Yale University" },
  { category: "Execution", value: "On-site analyses" },
  { category: "Data protection", value: "Aggregate outputs only" },
];

function SectionIntro({ eyebrow, title, description, id }: { eyebrow?: string; title: string; description?: string; id: string }) {
  return (
    <div className="story-heading">
      {eyebrow && <p className="home-kicker">{eyebrow}</p>}
      <h2 id={id}>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

export default function Home() {
  return (
    <main id="main-content" className="home-page">
      <section className="home-hero">
        <div className="home-hero-gradient" aria-hidden="true" />
        <div className="home-hero-mesh" aria-hidden="true" />
        <div className="home-hero-pixels" aria-hidden="true">
          <PixelBlast variant="square" pixelSize={2.6} color="#AFCFD6" patternScale={2.4} patternDensity={0.75} pixelSizeJitter={0} enableRipples rippleSpeed={0.35} rippleThickness={0.1} rippleIntensityScale={1.15} liquid={false} speed={0.4} edgeFade={0.34} transparent />
        </div>
        <div className="home-hero-glow" aria-hidden="true" />
        <div className="home-hero-overlay" aria-hidden="true" />
        <div className="home-shell home-hero-layout">
          <div className="home-hero-content">
            <h1>
              <BlurText text="Reliable Real-World Evidence" />
              <span className="hero-line-2"><BlurText text="Through AI" delay={0.14} /></span>
            </h1>
            <p className="home-hero-lead">A privacy-preserving data network connecting public, private, industry, and academic partners to generate reliable, decision-ready real-world evidence.</p>
            <HeroActions />
          </div>
          <HeroNetwork />
        </div>
      </section>

      <section className="home-stats" aria-label="Clarion at a glance">
        <div className="home-shell">
          <ul className="stat-band">
            {stats.map((stat) => (
              <li className="stat-cell reveal" key={stat.category}>
                <span className="stat-category">{stat.category}</span>
                <span className="stat-value">{stat.value}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="home-areas" id="clarion-pillars" aria-labelledby="areas-title">
        <div className="home-shell">
          <SectionIntro eyebrow="Explore Clarion" id="areas-title" title="One coordinated research framework." description="Three connected parts define how Clarion is organized, governed, and used for collaborative studies." />
          <div className="framework-list">
            {researchAreas.map(({ href, label, cta, teaser, icon: Icon }, index) => (
              <Link href={href} className="framework-module reveal" key={href}>
                <span className="framework-index" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
                <span className="framework-icon" aria-hidden="true"><Icon strokeWidth={1.6} /></span>
                <div><h3>{label}</h3><p>{teaser}</p></div>
                <span className="framework-cta">{cta} <ArrowUpRight aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home-federated" aria-labelledby="model-title">
        <div className="home-shell">
          <div className="home-federated-intro reveal">
            <SectionIntro eyebrow="Research model" id="model-title" title="Federated by design." description="Clarion supports multi-institutional analysis while preserving local control of patient-level data and institutional oversight." />
          </div>
          <FederatedFlow />
        </div>
      </section>

      <section className="home-institutions" aria-labelledby="institutions-title">
        <div className="home-shell">
          <div className="home-institutions-head reveal">
            <div className="home-institutions-heading">
              <p className="home-kicker">Participating institutions</p>
              <h2 id="institutions-title">Seven institutions, one coordinated network.</h2>
            </div>
            <Link className="home-text-link home-institutions-link" href="/network">View the network <ArrowRight aria-hidden="true" /></Link>
          </div>
          <div className="reveal">
            <NetworkMap />
          </div>
        </div>
      </section>

      <section className="home-cta" aria-labelledby="cta-title">
        <div className="home-cta-glow" aria-hidden="true" />
        <div className="home-shell home-cta-layout reveal">
          <div className="home-cta-lead">
            <p className="home-kicker">Sponsored research</p>
            <h2 id="cta-title">Planning a multi-institutional oncology study?</h2>
          </div>
          <div className="home-cta-side">
            <p>Clarion provides a coordinated framework for feasibility assessment, privacy-preserving governance, and distributed execution across approved member sites.</p>
            <div className="home-cta-actions">
              <Link className="home-cta-primary" href="/sponsored-research">Discuss a study <ArrowRight aria-hidden="true" /></Link>
              <Link className="home-text-link" href="/contact">Contact the coordinating center</Link>
            </div>
          </div>
        </div>
      </section>

      <RevealController />
    </main>
  );
}
