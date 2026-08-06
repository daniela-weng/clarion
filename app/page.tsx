import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { BlurText } from "./components/BlurText";
import { HeroActions } from "./components/HeroActions";
import PixelBlast from "./components/PixelBlast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { academicMembers } from "./content";

const researchAreas = [
  {
    href: "/network",
    number: "01",
    label: "The network",
    teaser:
      "Participating institutions, defined member roles, and Yale’s coordinating responsibilities.",
  },
  {
    href: "/governance",
    number: "02",
    label: "Governance & data",
    teaser:
      "Shared oversight, privacy protections, and policies for responsible multi-institutional research.",
  },
  {
    href: "/sponsored-research",
    number: "03",
    label: "Sponsored research",
    teaser:
      "Proposal review, feasibility assessment, and coordinated execution across approved member sites.",
  },
];

const modelSteps = [
  {
    number: "01",
    title: "Data remain local",
    text: "Structured and unstructured EHR data stay within each institution’s secure environment.",
  },
  {
    number: "02",
    title: "Analyses run on site",
    text: "Approved, standards-conforming workflows execute under local institutional oversight.",
  },
  {
    number: "03",
    title: "Results are synthesized",
    text: "Only approved aggregate outputs return to the Coordinating Center for synthesis.",
  },
];

export default function Home() {
  return (
    <main id="main-content" className="home-page">
      <section className="home-hero">
        <div className="home-hero-gradient" aria-hidden="true" />
        <div className="home-hero-mesh" aria-hidden="true" />
        <div className="home-hero-pixels" aria-hidden="true">
          <PixelBlast
            variant="square"
            pixelSize={3.8}
            color="#B8DDE3"
            patternScale={2.4}
            patternDensity={1.18}
            pixelSizeJitter={0}
            enableRipples
            rippleSpeed={0.4}
            rippleThickness={0.12}
            rippleIntensityScale={1.5}
            liquid={false}
            speed={0.5}
            edgeFade={0.18}
            transparent
          />
        </div>
        <div className="home-hero-glow" aria-hidden="true" />
        <div className="home-hero-overlay" aria-hidden="true" />
        <div className="home-shell">
          <div className="home-hero-content">
            <p className="home-kicker">Collaborative oncology research network</p>
            <h1>
              <BlurText text="Real-world evidence" />
              <span className="hero-line-2">
                <BlurText text="in oncology." delay={0.14} />
              </span>
            </h1>
            <p className="home-hero-lead">
              A privacy-preserving network of leading academic institutions and healthcare
              systems, coordinated by Yale University, that turns structured and unstructured EHR
              data into rigorous real-world evidence to improve cancer care.
            </p>
            <HeroActions />
          </div>
        </div>
      </section>

      <section className="home-summary-band">
        <div className="home-shell">
          <aside className="home-summary" aria-label="Clarion network summary">
            <div className="home-summary-heading">
              <p className="home-kicker">Network at a glance</p>
              <span>Current charter</span>
            </div>
            <dl>
              <div>
                <dt>Coordinating center</dt>
                <dd>Yale University</dd>
              </div>
              <div>
                <dt>Initial academic members</dt>
                <dd>7 institutions</dd>
              </div>
              <div>
                <dt>Analysis model</dt>
                <dd>Federated / on-site</dd>
              </div>
              <div>
                <dt>Patient-level data sharing</dt>
                <dd>None by default</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="home-members" aria-labelledby="members-title">
        <div className="home-shell">
          <div className="home-members-heading">
            <div>
              <p className="home-kicker">Initial academic members</p>
              <h2 id="members-title">A multi-institutional network.</h2>
            </div>
            <Link href="/network">
              Network overview <ArrowUpRight aria-hidden="true" />
            </Link>
          </div>
          <ul className="home-institution-list">
            {academicMembers.map((institution) => (
              <li key={institution}>{institution}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="home-model" aria-labelledby="model-title">
        <div className="home-shell">
          <div className="home-section-heading home-section-heading-split">
            <div>
              <p className="home-kicker">Research model</p>
              <h2 id="model-title">Federated by design.</h2>
            </div>
            <p>
              Clarion supports multi-institutional analysis while preserving local control
              of patient-level data and institutional oversight.
            </p>
          </div>
          <ol className="home-model-steps">
            {modelSteps.map((step, index) => (
              <li key={step.number}>
                <div className="home-step-meta">
                  <span>{step.number}</span>
                  {index < modelSteps.length - 1 && <ArrowRight aria-hidden="true" />}
                </div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </li>
            ))}
          </ol>
          <Link className="home-text-link home-model-link" href="/governance">
            Review governance and data protections <ArrowRight aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="home-areas" aria-labelledby="areas-title">
        <div className="home-shell">
          <div className="home-section-heading">
            <p className="home-kicker">Explore Clarion</p>
            <h2 id="areas-title">The network’s operating framework.</h2>
          </div>
          <div className="home-area-grid">
            {researchAreas.map((area) => (
              <Card key={area.href} className="home-area-card">
                <CardHeader>
                  <span className="home-card-number">{area.number}</span>
                  <CardTitle>
                    <Link href={area.href}>
                      {area.label} <ArrowUpRight aria-hidden="true" />
                    </Link>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{area.teaser}</CardDescription>
                </CardContent>
              </Card>
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
            <article>
              <span>01</span>
              <h3>Local oversight</h3>
              <p>Each institution maintains its own regulatory and operational oversight.</p>
            </article>
            <article>
              <span>02</span>
              <h3>Privacy by default</h3>
              <p>Patient-level data are not transferred as part of standard network operations.</p>
            </article>
            <article>
              <span>03</span>
              <h3>Coordinated review</h3>
              <p>Projects follow common review, approval, analysis, and publication processes.</p>
            </article>
          </div>
        </div>
      </section>

      <section className="home-contact" aria-labelledby="contact-title">
        <div className="home-shell home-contact-grid">
          <div>
            <p className="home-kicker">Contact</p>
            <h2 id="contact-title">Research collaboration inquiries.</h2>
          </div>
          <div className="home-contact-people">
            <p>For membership information, sponsored projects, or research collaboration:</p>
            <address>
              <a href="mailto:vipina.kuttichikeloth@yale.edu">
                <strong>Vipina K. Keloth, PhD</strong>
                <span>vipina.kuttichikeloth@yale.edu</span>
              </a>
              <a href="mailto:hua.xu@yale.edu">
                <strong>Hua Xu, PhD</strong>
                <span>hua.xu@yale.edu</span>
              </a>
            </address>
          </div>
        </div>
      </section>
    </main>
  );
}
