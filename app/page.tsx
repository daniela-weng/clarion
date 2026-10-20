import Link from "next/link";
import { ArrowRight, BadgeCheck, FlaskConical, HandCoins } from "lucide-react";
import { BlurText } from "./components/BlurText";
import { HeroBackdrop } from "./components/HeroBackdrop";
import { HeroCta } from "./components/HeroCta";
import { CentersStrip } from "./components/CentersStrip";
import { FeaturesBento } from "./components/FeaturesBento";
import { NetworkMap, interestedSites } from "./components/NetworkMap";
import { RevealController } from "./components/RevealController";

const centerNames = [
  "Yale University",
  "University of Pennsylvania",
  "Columbia University",
  "Cornell University",
  "University of Florida",
  "University of California, Irvine",
  "Indiana University",
  "University of Minnesota",
];

const partnerPoints = [
  { label: "Financial & domain expertise backing", icon: HandCoins },
  { label: "Collaborative study design and exploration", icon: FlaskConical },
  { label: "Focus on regulatory-grade RWE generation", icon: BadgeCheck },
];

export default function Home() {
  return (
    <main id="main-content" className="home-v2">
      <section className="hx-hero" aria-labelledby="hero-title">
        <HeroBackdrop />
        <div className="hx-hero-shade" aria-hidden="true" />

        <div className="hx-shell hx-hero-center">
          <h1 id="hero-title">
            <BlurText className="hx-title-lead" text="Clarion Network for" />{" "}
            <BlurText text="AI-Driven Reproducible" delay={0.12} />{" "}
            <span className="hx-gold"><BlurText text="Real-World Evidence" delay={0.24} /></span>
          </h1>
          <p className="hx-lead">A national, distributed infrastructure to advance high-quality real-world evidence generation using artificial intelligence.</p>
          <div className="hx-actions">
            <HeroCta />
          </div>
        </div>

        <div className="hx-shell hx-hero-footer">
          <p className="hx-strip-label">Participating Medical Centers</p>
          <CentersStrip names={centerNames} />
        </div>
      </section>

      <section className="hx-section hx-mission" aria-labelledby="mission-title">
        <div className="hx-shell">
          <figure className="hx-mission-quote reveal">
            <p className="hx-eyebrow" id="mission-title">Our Core Mission</p>
            <blockquote>
              <p>“To enable high-quality, multi-institutional research by integrating structured and unstructured EHR data, generating robust evidence to improve clinical decision-making and innovation.”</p>
            </blockquote>
          </figure>
        </div>
      </section>

      <section className="hx-section hx-light hx-features" aria-labelledby="features-title">
        <div className="hx-shell">
          <FeaturesBento />
        </div>
      </section>

      <section className="hx-section hx-centers" aria-labelledby="centers-title">
        <div className="hx-shell mc-layout">
          <div className="mc-side reveal">
            <div className="hx-heading">
              <h2 id="centers-title" tabIndex={-1}>Participating Medical Centers</h2>
              <p>Expanding network with more centers joining.</p>
            </div>
            <p className="mc-stat">
              <span className="mc-stat-num">8</span>
              <span className="mc-stat-label">showed interest</span>
            </p>
            <ul className="mc-legend" aria-hidden="true">
              <li><span className="mc-dot mc-dot-hub" /> Coordinating center</li>
              <li><span className="mc-dot" /> Member site</li>
            </ul>
          </div>
          <div className="hx-map-panel mc-map reveal">
            <NetworkMap sites={interestedSites} arcs />
          </div>
        </div>
      </section>

      <section className="hx-section hx-light hx-partners-section" aria-labelledby="partners-title">
        <div className="hx-shell">
          <div className="hx-partners pt-panel reveal">
            <svg className="pt-arcs" viewBox="0 0 420 260" fill="none" aria-hidden="true">
              <path d="M400 40 Q250 -10 60 120" />
              <path d="M400 40 Q300 60 170 220" />
              <path d="M400 40 Q340 120 330 250" />
              <circle cx="400" cy="40" r="6" />
              <circle cx="60" cy="120" r="3.5" />
              <circle cx="170" cy="220" r="3.5" />
              <circle cx="330" cy="250" r="3.5" />
            </svg>

            <div className="pt-top">
              <div>
                <p className="hx-eyebrow">Public–Private Partnership</p>
                <h2 id="partners-title">Private &amp; Industry <span className="hx-gold">Partners</span></h2>
              </div>
              <p className="hx-partners-lead">Collaborating across the life sciences and healthcare ecosystem to turn data insights into clinical value.</p>
            </div>

            <ul className="pt-tiles">
              {partnerPoints.map(({ label, icon: Icon }) => (
                <li key={label}>
                  <span className="pt-tile-icon" aria-hidden="true"><Icon strokeWidth={1.6} /></span>
                  <span className="pt-tile-label">{label}</span>
                </li>
              ))}
            </ul>

            <div className="pt-model">
              <div className="pt-model-text">
                <ul className="pt-chips" aria-label="How industry members participate">
                  <li>Membership fees</li>
                  <li>Project-based collaborations</li>
                </ul>
                <p className="hx-partners-note">Industry members, including pharmaceutical and life sciences companies, participate through membership fees and project-based collaborations, thereby accelerating translation while maintaining scientific independence and methodological transparency.</p>
              </div>
              <Link className="pt-cta" href="/contact">Contact the coordinating center <ArrowRight aria-hidden="true" /></Link>
            </div>
          </div>
        </div>
      </section>

      <RevealController />
    </main>
  );
}
