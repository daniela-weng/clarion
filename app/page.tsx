import type { Metadata } from "next";
import { BadgeCheck, FlaskConical, HandCoins } from "lucide-react";
import { BlurText } from "./components/BlurText";
import { HeroBackdrop } from "./components/HeroBackdrop";
import { ContactCta, HeroCta } from "./components/HeroCta";
import { CentersStrip } from "./components/CentersStrip";
import { FeaturesBento } from "./components/FeaturesBento";
import { NetworkMap, interestedSites } from "./components/NetworkMap";
import { RevealController } from "./components/RevealController";

export const metadata: Metadata = {
  title: { absolute: "Clarion Network for AI-Driven Reproducible Real-World Evidence" },
  description: "Clarion Network for AI-Driven Reproducible Real-World Evidence will establish a national, distributed infrastructure to advance high-quality real-world evidence generation using artificial intelligence.",
  openGraph: { title: "Clarion Network for AI-Driven Reproducible Real-World Evidence", description: "Clarion Network for AI-Driven Reproducible Real-World Evidence will establish a national, distributed infrastructure to advance high-quality real-world evidence generation using artificial intelligence." },
  twitter: { title: "Clarion Network for AI-Driven Reproducible Real-World Evidence", description: "Clarion Network for AI-Driven Reproducible Real-World Evidence will establish a national, distributed infrastructure to advance high-quality real-world evidence generation using artificial intelligence." },
};

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
            <ul className="mc-legend" aria-hidden="true">
              <li><span className="mc-dot mc-dot-hub" /> Coordinating center</li>
              <li><span className="mc-dot" /> Participating medical center</li>
            </ul>
          </div>
          <div className="hx-map-panel mc-map reveal">
            <NetworkMap sites={interestedSites} arcs />
          </div>
        </div>
      </section>

      <section className="hx-section hx-light hx-partners-section" aria-labelledby="partners-title">
        <div className="hx-shell">
          <div className="pp-layout">
            <div className="pp-intro reveal">
              <p className="hx-eyebrow">Public–Private Partnership</p>
              <h2 id="partners-title">Private &amp; Industry <span className="hx-gold">Partners</span></h2>
              <p className="pp-lead">Collaborating across the life sciences and healthcare ecosystem to turn data insights into clinical value.</p>
              <ContactCta />
            </div>

            <div className="pp-detail reveal">
              <ul className="pp-points">
                {partnerPoints.map(({ label, icon: Icon }) => (
                  <li key={label}>
                    <span className="bx-icon" aria-hidden="true"><Icon strokeWidth={1.6} /></span>
                    <span className="pp-point-label">{label}</span>
                  </li>
                ))}
              </ul>
              <p className="pp-model">Clarion will establish a sustainable public–private partnership model by engaging industry members, including pharmaceutical and life sciences companies, who will participate through <strong>membership fees</strong> and <strong>project-based collaborations</strong>, thereby accelerating translation while maintaining scientific independence and methodological transparency.</p>
            </div>
          </div>
        </div>
      </section>

      <RevealController />
    </main>
  );
}
