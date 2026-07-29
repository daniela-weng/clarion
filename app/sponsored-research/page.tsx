import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sponsored Research",
  description: "How Clarion accepts sponsored project proposals, its no-patient-level-data-sharing policy, approved sponsor outputs, and the distributed federated analysis workflow.",
};

export default function SponsoredResearchPage() {
  return (
    <main id="main-content">
      <section className="page-hero">
        <p className="section-label">Sponsored Research</p>
        <h1>Project proposals, data sharing, and distributed execution.</h1>
        <p className="page-hero-copy">
          Clarion accepts sponsored project proposals that align with its mission, and executes them through a
          distributed model in which analyses run locally and only approved aggregate results are returned.
        </p>
      </section>

      <section className="sponsored-section">
        <div className="section-heading"><p className="section-label">VII / Sponsored Projects</p><h2>Eligibility, data sharing, and outputs.</h2></div>
        <div className="sponsored-grid">
          <article><h3>Eligibility to submit projects</h3><p>Clarion accepts proposals from pharmaceutical and biotechnology companies; medical device and diagnostics companies; health technology and AI/ML companies; academic or government researchers; and foundations or nonprofit research organizations.</p><p>All proposals must align with the network&apos;s mission and comply with data privacy and ethical standards.</p></article>
          <article><h3>Data-sharing policy</h3><p>By default, no patient-level structured or unstructured data leave member institutions. Data remain behind each institution&apos;s firewall and are accessed only through controlled, IRB-approved mechanisms. Sponsors do not receive raw, patient-level, or de-identified datasets as part of standard operations.</p><p>Exceptions require a fully executed Data Use Agreement or equivalent instrument, all required approvals, and voluntary agreement by the participating institution for a specific approved purpose.</p></article>
          <article><h3>Approved sponsor outputs</h3><p>Under all conditions, sponsors receive pre-approved aggregated outputs, summary statistics, model coefficients or performance metrics, derived insights, cross-site pooled analyses, or other non-identifiable results approved by the Coordinating Center.</p></article>
        </div>
        <div className="workflow-heading"><p className="section-label">Distributed or Federated Analysis Model</p><p>Sponsored projects follow a structured, federated workflow:</p></div>
        <ol className="workflow-list">
          <li><strong>Sponsor Engagement</strong><span>Sponsor submits a proposal; the Coordinating Center refines scientific aims; feasibility is assessed across member sites; and the Steering Committee approves the project.</span></li>
          <li><strong>Protocol &amp; Analysis Plan Development</strong><span>The Coordinating Center drafts the analytic plan; sites review local feasibility; and the Privacy &amp; Governance Committee signs off.</span></li>
          <li><strong>Distributed Execution</strong><span>Code and pipeline are delivered to each site; sites run analyses locally and return only approved outputs.</span></li>
          <li><strong>Multi-Site Synthesis</strong><span>The Coordinating Center aggregates, harmonizes, and validates results; generates sponsor-ready deliverables; and prepares manuscripts, reports, or regulatory briefs.</span></li>
          <li><strong>Subcontracting and Site Participation</strong><span>The Coordinating Center recommends participating sites; the Steering Committee approves the participation plan; and subcontracts are issued by the Coordinating Center.</span></li>
        </ol>
      </section>
    </main>
  );
}
