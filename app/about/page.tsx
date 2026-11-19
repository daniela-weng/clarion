import type { Metadata } from "next";
import { PageHero } from "../components/PageHero";
import { RevealController } from "../components/RevealController";

export const metadata: Metadata = {
  title: "About",
  description: "Clarion's mission and core principles for multi-institutional, privacy-preserving oncology real-world evidence generation.",
};

export default function AboutPage() {
  return (
    <main id="main-content" className="content-page about-page">
      <PageHero seed={11} tone="light" tileSize={1.8} rotation={0} longTitle
        lead="A network for"
        accent="multi-institutional oncology research"
        body="Clarion is a Yale-coordinated network of academic institutions and healthcare systems using structured and unstructured EHR data to advance real-world evidence generation in oncology."
      />

      <section id="mission" className="charter-section about-mission ui-section ui-section-split">
        <div className="section-heading ui-section-heading">
          <p className="section-label">Mission</p>
          <h2>What the network is built to advance.</h2>
        </div>
        <div className="about-prose mission-body reveal">
          <p className="mission-statement">
            Clarion facilitates high-quality, multi-institutional cancer research through the integration of
            structured and unstructured EHR data. The network generates real-world evidence to improve
            clinical outcomes, inform treatment decisions, and advance cancer science.
          </p>
          <p className="mission-detail">
            The network provides centralized coordination for projects, enabling consistent governance and
            analysis execution across participating sites. It promotes data standardization and
            interoperability to enhance reproducibility and accelerate translational research, and it fosters
            collaboration among academic institutions, healthcare systems, researchers, and industry partners.
          </p>
        </div>
      </section>

      <section id="principles" className="charter-section about-values about-principles ui-section">
        <div className="about-principles-intro reveal">
          <div className="section-heading ui-section-heading">
            <p className="section-label">Core principles</p>
            <h2>Five commitments that guide the network.</h2>
          </div>
          <p>
            The charter establishes a shared standard for how Clarion&apos;s members govern research, protect
            institutional responsibilities, and pursue clinically meaningful real-world evidence.
          </p>
        </div>
        <div className="principles-rail reveal">
          <article>
            <span className="principle-number">01</span>
            <h3>Collaboration</h3>
            <p className="principle-definition">Promote equitable participation across all member institutions.</p>
            <p>Members contribute local data stewardship, analytic execution, scientific interpretation, and publication review.</p>
          </article>
          <article>
            <span className="principle-number">02</span>
            <h3>Transparency</h3>
            <p className="principle-definition">Maintain open governance, project review, and data use policies.</p>
            <p>Projects follow defined feasibility, committee approval, publication, and disclosure processes.</p>
          </article>
          <article>
            <span className="principle-number">03</span>
            <h3>Compliance</h3>
            <p className="principle-definition">Adhere strictly to legal, ethical, and regulatory standards.</p>
            <p>Research follows IRB requirements, institutional policy, security safeguards, and approved data-use conditions.</p>
          </article>
          <article>
            <span className="principle-number">04</span>
            <h3>Innovation</h3>
            <p className="principle-definition">Encourage advanced analytics, including AI methods for unstructured EHR data.</p>
            <p>Modular, network-distributed workflows are executed within each institution&apos;s secure environment.</p>
          </article>
          <article>
            <span className="principle-number">05</span>
            <h3>Impact</h3>
            <p className="principle-definition">Focus on clinically relevant, real-world insights that improve cancer care.</p>
            <p>Approved outputs support treatment decisions, scientific publications, reports, and regulatory briefs.</p>
          </article>
        </div>
      </section>

      <RevealController />
    </main>
  );
}
