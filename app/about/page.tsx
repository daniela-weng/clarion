import type { Metadata } from "next";
import { mission, corePrinciples } from "../content";

export const metadata: Metadata = {
  title: "About",
  description: "Clarion's mission and core principles for multi-institutional, privacy-preserving oncology real-world evidence generation.",
};

export default function AboutPage() {
  return (
    <main id="main-content">
      <section className="page-hero">
        <p className="section-label">About Clarion</p>
        <h1>A network for multi-institutional oncology research.</h1>
        <p className="page-hero-copy">
          Clarion is a collaborative data network of academic institutions and healthcare systems,
          coordinated by Yale University, that uses structured and unstructured electronic health record
          data to accelerate real-world evidence generation in oncology research.
        </p>
      </section>

      <section className="intro section-grid">
        <div><p className="section-label">I / Introduction</p><h2>The network in brief.</h2></div>
        <div className="prose"><p>Clarion uses multi-institutional clinical and research data while maintaining high standards of data privacy, security, and regulatory compliance.</p><p>Its work is coordinated through a shared governance structure and is intended to support rigorous, reproducible real-world evidence generation.</p></div>
      </section>

      <section className="charter-section mission-section">
        <div className="section-heading"><p className="section-label">II / Mission</p><h2>The mission of the network.</h2></div>
        <ol className="mission-list">{mission.map((item) => <li key={item}>{item}</li>)}</ol>
      </section>

      <section className="charter-section">
        <div className="principles-strip principles-strip-standalone">
          <p className="section-label">XI / Core Principles</p>
          <div className="principle-list">
            {corePrinciples.map((p, i) => (
              <article key={p.term}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <div><h3>{p.term}</h3><p>{p.detail}</p></div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
