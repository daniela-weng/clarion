import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Governance & Data",
  description: "Clarion's governance structure, data governance and security model, and network policies on publication, funding, and amendments.",
};

export default function GovernancePage() {
  return (
    <main id="main-content">
      <section className="page-hero">
        <p className="section-label">Governance &amp; Data Protection</p>
        <h1>Local stewardship and controlled analysis.</h1>
        <p className="page-hero-copy">
          The network operates through a defined governance structure and strict data-protection principles:
          data remain local, and only approved aggregate outputs leave member institutions.
        </p>
      </section>

      <section className="charter-section governance-section">
        <div className="section-heading"><p className="section-label">IV / Governance Structure</p><h2>Network oversight and review.</h2></div>
        <div className="charter-cards">
          <article><h3>Steering Committee</h3><p>Chaired by the Coordinating Center and composed of representatives from each member institution. It provides strategic oversight, approves major initiatives, prioritizes sponsored projects, and reviews network policies.</p></article>
          <article><h3>Scientific Advisory Board</h3><p>External experts in oncology, bioinformatics, data science, and regulatory affairs provide guidance on research priorities, methodological approaches, and innovation opportunities.</p></article>
          <article><h3>Project Review Committee</h3><p>Evaluates sponsored project proposals for scientific merit, feasibility, and data access requirements, and makes recommendations on project approval and resource allocation.</p></article>
          <article><h3>Data Governance and Privacy Committee</h3><p>Oversees data access, use, and standardization; validates analytics workflows and privacy-preserving methods; and safeguards against transfer of patient-level data outside member institutions.</p></article>
        </div>
      </section>

      <section className="data-section">
        <div className="section-heading"><p className="section-label">VI / Data Governance, Privacy, and Security</p><h2>How data are protected.</h2></div>
        <div className="data-grid">
          <article><h3>Core data principles</h3><ul><li>Data remain local; there is no central data repository unless institutionally agreed.</li><li>No patient-level data leave institutions unless prior agreements have been made.</li><li>Local IRB or reliance agreements are required before analytic activity.</li></ul></article>
          <article><h3>Processing and analysis</h3><p>Data processing and analysis occur locally using network-distributed software packages, modular analytic components that conform to network standards, and optional institution-specific extensions.</p><p>Only derived variables, concept counts, embeddings, or summary-level outputs are returned.</p></article>
          <article><h3>Quality control and validation</h3><ul><li>Network-wide quality-control protocols</li><li>Standard model performance evaluation</li><li>Consistency checks for structured and unstructured outputs</li><li>Validated code packages delivered by the Coordinating Center or member institutions</li></ul></article>
          <article><h3>Data security</h3><p>Data are de-identified or pseudonymized according to regulatory standards. Centralized analytics adhere to security protocols, including encryption, access controls, and audit trails.</p></article>
        </div>
      </section>

      <section className="closing-section">
        <div><p className="section-label">VIII–X / Network Policies</p><h2>Publication, funding, and review.</h2></div>
        <div className="closing-grid">
          <article><h3>Intellectual Property &amp; Publication</h3><p>Publications require approval by the Coordinating Center and involved member institutions. Intellectual property follows pre-defined agreements, and network recognition is included in publications and presentations.</p></article>
          <article><h3>Funding &amp; Sustainability</h3><p>The network is funded through sponsored projects, grants, and institutional contributions. Financial oversight is managed by the Coordinating Center. Sustainable operations are supported by standardized data pipelines, shared infrastructure, and collaborative analytics resources.</p></article>
          <article><h3>Amendments &amp; Review</h3><p>The charter is reviewed annually by the Steering Committee. Amendments require a majority vote of the Steering Committee and approval by the Coordinating Center.</p></article>
        </div>
      </section>
    </main>
  );
}
