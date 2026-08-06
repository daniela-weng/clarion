import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { BlurText } from "./components/BlurText";
import { HeroActions } from "./components/HeroActions";
import { HeroNetwork } from "./components/HeroNetwork";
import PixelBlast from "./components/PixelBlast";
import { academicMembers } from "./content";

const researchAreas = [
  {
    href: "/network",
    number: "01",
    label: "The network",
    cta: "Explore the network",
    teaser: "Participating institutions, defined member roles, and Yale’s coordinating responsibilities.",
  },
  {
    href: "/governance",
    number: "02",
    label: "Governance & data",
    cta: "Review governance",
    teaser: "Shared oversight, privacy protections, and policies for responsible multi-institutional research.",
  },
  {
    href: "/sponsored-research",
    number: "03",
    label: "Sponsored research",
    cta: "Plan a study",
    teaser: "Proposal review, feasibility assessment, and coordinated execution across approved member sites.",
  },
];

const modelSteps = [
  {
    number: "01",
    title: "Data remain local",
    text: "Structured and unstructured EHR data stay within each institution’s secure environment.",
    label: "Local data",
  },
  {
    number: "02",
    title: "Analyses run on site",
    text: "Approved, standards-conforming workflows execute under local institutional oversight.",
    label: "On-site analysis",
  },
  {
    number: "03",
    title: "Results are synthesized",
    text: "Only approved aggregate outputs return to the Coordinating Center for synthesis.",
    label: "Aggregate results",
  },
];

const principles = [
  {
    number: "01",
    title: "Multi-institutional reach",
    text: "Coordinate oncology research across participating academic health systems.",
  },
  {
    number: "02",
    title: "Privacy by architecture",
    text: "Patient-level data remain within participating institutions by default.",
  },
  {
    number: "03",
    title: "Shared research standards",
    text: "Approved workflows, common analysis methods, and coordinated institutional oversight support consistent research execution.",
  },
];

function SectionIntro({ eyebrow, title, description, id }: { eyebrow: string; title: string; description?: string; id: string }) {
  return (
    <div className="story-heading">
      <p className="home-kicker">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {description && <p>{description}</p>}
    </div>
  );
}

function MemberNetwork() {
  return (
    <div className="member-network" aria-label="Initial Clarion academic member network">
      <div className="member-hub">
        <span>Coordinating center</span>
        <strong>Yale University</strong>
      </div>
      <ul>
        {academicMembers.filter((institution) => institution !== "Yale University").map((institution, index) => (
          <li key={institution}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <strong>{institution}</strong>
          </li>
        ))}
      </ul>
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
              <BlurText text="Oncology evidence," />
              <span className="hero-line-2"><BlurText text="connected without centralizing patient data." delay={0.14} /></span>
            </h1>
            <p className="home-hero-lead">Participating institutions run approved analyses locally and return only authorized aggregate results.</p>
            <HeroActions />
          </div>
          <HeroNetwork />
        </div>
      </section>

      <section className="home-summary-band" aria-labelledby="summary-title">
        <div className="home-shell home-summary">
          <div className="home-summary-heading">
            <p className="home-kicker" id="summary-title">Current network</p>
            <span>Charter overview</span>
          </div>
          <dl>
            <div><dd>7</dd><dt>Academic institutions</dt></div>
            <div><dd>Yale University</dd><dt>Coordinating center</dt></div>
            <div><dd>Federated / on-site</dd><dt>Analysis model</dt></div>
            <div><dd>Local by default</dd><dt>Patient-level data</dt></div>
          </dl>
        </div>
      </section>

      <section className="home-members" aria-labelledby="members-title">
        <div className="home-shell story-split">
          <div className="member-copy">
            <SectionIntro eyebrow="Initial academic members" id="members-title" title="Seven institutions. One coordinated research network." description="Clarion brings together leading academic health systems through a shared framework for privacy-preserving oncology research." />
            <Link className="home-text-link" href="/network">View the network <ArrowRight aria-hidden="true" /></Link>
          </div>
          <MemberNetwork />
        </div>
      </section>

      <section className="home-why" aria-labelledby="why-title">
        <div className="home-shell story-split story-split-wide">
          <div className="why-statement">
            <p className="home-kicker">Why Clarion</p>
            <h2 id="why-title">Research across institutions, <em>without centralizing patient data.</em></h2>
            <div className="why-signal" aria-hidden="true"><span /><span /><span /><span /></div>
          </div>
          <div className="why-principles">
            {principles.map((principle) => (
              <article key={principle.number}>
                <span>{principle.number}</span>
                <div><h3>{principle.title}</h3><p>{principle.text}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="home-model" aria-labelledby="model-title">
        <div className="home-shell">
          <SectionIntro eyebrow="Research model" id="model-title" title="Federated by design." description="Clarion supports multi-institutional analysis while preserving local control of patient-level data and institutional oversight." />
          <ol className="model-flow">
            {modelSteps.map((step, index) => (
              <li key={step.number}>
                <div className="flow-node"><span>{step.number}</span></div>
                {index < modelSteps.length - 1 && <ArrowRight className="flow-arrow" aria-hidden="true" />}
                <small>{step.label}</small>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
          <div className="model-principle">
            <span>Network principle</span>
            <strong>Patient-level data do not leave participating institutions by default.</strong>
          </div>
          <Link className="home-text-link home-model-link" href="/governance">Review governance and data protections <ArrowRight aria-hidden="true" /></Link>
        </div>
      </section>

      <section className="home-areas" aria-labelledby="areas-title">
        <div className="home-shell">
          <SectionIntro eyebrow="Explore Clarion" id="areas-title" title="The network’s operating framework." />
          <div className="framework-list">
            {researchAreas.map((area) => (
              <Link href={area.href} className="framework-module" key={area.href}>
                <span className="framework-number">{area.number}</span>
                <div><h3>{area.label}</h3><p>{area.teaser}</p></div>
                <span className="framework-cta">{area.cta} <ArrowUpRight aria-hidden="true" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="home-assurance" aria-labelledby="assurance-title">
        <div className="home-shell">
          <div className="home-assurance-intro">
            <p className="home-kicker">Governance assurance</p>
            <h2 id="assurance-title">Research with institutional control.</h2>
          </div>
          <div className="home-assurance-points">
            <article><span>01</span><h3>Local oversight</h3><p>Each institution maintains its own regulatory and operational oversight.</p></article>
            <article><span>02</span><h3>Privacy by default</h3><p>Patient-level data are not transferred as part of standard network operations.</p></article>
            <article><span>03</span><h3>Coordinated review</h3><p>Projects follow common review, approval, analysis, and publication processes.</p></article>
          </div>
        </div>
      </section>

      <section className="home-study-cta" aria-labelledby="study-cta-title">
        <div className="study-pattern" aria-hidden="true" />
        <div className="home-shell study-cta-layout">
          <div>
            <p className="home-kicker">Engage with Clarion</p>
            <h2 id="study-cta-title">Planning a multi-institutional oncology study?</h2>
          </div>
          <div>
            <p>Clarion provides a coordinated framework for privacy-preserving feasibility assessment, research governance, and multi-site study execution.</p>
            <div className="study-actions">
              <Link className="study-primary" href="/sponsored-research">Discuss a study <ArrowRight aria-hidden="true" /></Link>
              <Link className="study-secondary" href="/contact">Contact the coordinating center</Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
