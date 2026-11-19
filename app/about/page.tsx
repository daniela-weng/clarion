import type { Metadata } from "next";
import { Handshake, Layers, Network } from "lucide-react";
import ScrollStack, { ScrollStackItem } from "@/components/ScrollStack";
import { PageHero } from "../components/PageHero";
import { PrinciplesPanel } from "../components/PrinciplesPanel";
import { RevealController } from "../components/RevealController";

export const metadata: Metadata = {
  title: "About",
  description: "Clarion's mission and core principles for multi-institutional, privacy-preserving oncology real-world evidence generation.",
};

const pillarIcons = [Network, Layers, Handshake];

const pillars = [
  {
    title: "Centralized coordination",
    body: "Consistent governance and analysis execution for every project across participating sites.",
  },
  {
    title: "Standardization and interoperability",
    body: "Shared data standards that enhance reproducibility and accelerate translational research.",
  },
  {
    title: "Collaboration",
    body: "Academic institutions, healthcare systems, researchers, and industry partners working together.",
  },
];

const principles = [
  {
    title: "Collaboration",
    definition: "Promote equitable participation across all member institutions.",
    detail: "Members contribute local data stewardship, analytic execution, scientific interpretation, and publication review.",
  },
  {
    title: "Transparency",
    definition: "Maintain open governance, project review, and data use policies.",
    detail: "Projects follow defined feasibility, committee approval, publication, and disclosure processes.",
  },
  {
    title: "Compliance",
    definition: "Adhere strictly to legal, ethical, and regulatory standards.",
    detail: "Research follows IRB requirements, institutional policy, security safeguards, and approved data-use conditions.",
  },
  {
    title: "Innovation",
    definition: "Encourage advanced analytics, including AI methods for unstructured EHR data.",
    detail: "Modular, network-distributed workflows are executed within each institution’s secure environment.",
  },
  {
    title: "Impact",
    definition: "Focus on clinically relevant, real-world insights that improve cancer care.",
    detail: "Approved outputs support treatment decisions, scientific publications, reports, and regulatory briefs.",
  },
];

export default function AboutPage() {
  return (
    <main id="main-content" className="content-page about-page">
      <PageHero seed={11} tone="light" tileSize={1.8} rotation={0} longTitle
        lead="A network for"
        accent="multi-institutional oncology research"
        body="Clarion is a Yale-coordinated network of academic institutions and healthcare systems using structured and unstructured EHR data to advance real-world evidence generation in oncology."
      />

      <section id="mission" className="ab-mission mv-b" aria-labelledby="mission-title">
        <div className="ab-shell">
          <div className="mv-cols">
          <div className="mv-left">
          <p className="ab-eyebrow reveal">Mission</p>
          <h2 id="mission-title" className="mv-b-statement reveal">
            Clarion facilitates high-quality, multi-institutional cancer research through the integration of{" "}
            <em>structured and unstructured EHR data</em>. The network generates <em>real{"\u2011"}world evidence</em> to
            improve clinical outcomes, inform treatment decisions, and advance cancer science.
          </h2>
          </div>
          <div className="mv-stack">
            <ScrollStack useWindowScroll smoothScroll={false} stackPosition="18%" itemDistance={64}
              itemStackDistance={28} itemScale={0.04} baseScale={0.88} dimAmount={0.25} holdDistance={120} onStackComplete={undefined}>
              {pillars.map((pillar, i) => {
                const Icon = pillarIcons[i];
                return (
                <ScrollStackItem key={pillar.title} itemClassName="mv-card" style={undefined}>
                  <span className="mv-card-icon" aria-hidden="true"><Icon strokeWidth={1.25} /></span>
                  <div className="mv-card-body">
                    <h3>{pillar.title}</h3>
                    <p>{pillar.body}</p>
                  </div>
                </ScrollStackItem>
                );
              })}
            </ScrollStack>
          </div>
          </div>
        </div>
      </section>

      <PrinciplesPanel principles={principles} />

      <RevealController />
    </main>
  );
}
