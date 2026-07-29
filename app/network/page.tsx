import type { Metadata } from "next";
import { academicMembers } from "../content";

export const metadata: Metadata = {
  title: "Network",
  description: "Participating roles and institutions in the Clarion network, and responsibilities across the coordinating center, academic members, industry members, and principal investigators.",
};

export default function NetworkPage() {
  return (
    <main id="main-content">
      <section className="page-hero">
        <p className="section-label">Network</p>
        <h1>Participating roles and institutions.</h1>
        <p className="page-hero-copy">
          Yale University serves as the Coordinating Center. Academic Members provide data and participate in
          approved analyses. Industry Members serve as funding partners and may participate in sponsored research
          under the network&apos;s governance framework.
        </p>
      </section>

      <section className="network-section">
        <div><p className="section-label">III / Membership</p><h2>Membership categories.</h2></div>
        <div className="network-copy"><p>Each member category carries defined responsibilities and access, ensuring consistent governance across the network.</p></div>
        <div className="membership-cards">
          <article><h3>Coordinating Center</h3><p><strong>Yale University</strong></p><p>Provides network governance and oversight; manages sponsored project intake, review, and approval; allocates project resources; coordinates agreements with member institutions; and oversees compliance, publication, and dissemination governance.</p></article>
          <article><h3>Academic Members</h3><p><strong>Data providers</strong></p><p>Maintain data locally, provide local regulatory oversight, execute approved analytic workflows in their secure environments, return only approved aggregate results to the Coordinating Center, and contribute to publication and dissemination activities.</p></article>
          <article><h3>Industry Members</h3><p><strong>Funding partners</strong></p><p>Provide financial support, propose project concepts, participate in feasibility and study-design discussions, and receive only Network-approved aggregate information as part of standard operations. Detailed membership terms are available to prospective partners on request.</p></article>
          <article><h3>Affiliate or Observer Members</h3><p>May participate in a limited capacity to access aggregated results, participate in workshops, or provide specialized expertise.</p></article>
        </div>
        <div className="member-heading"><p className="section-label">Initial academic members</p><p>The initial participating institutions identified in the charter are listed below.</p></div>
        <div className="institution-grid">{academicMembers.map((institution) => <div key={institution}>{institution}</div>)}</div>
      </section>

      <section className="roles-section">
        <div className="section-heading"><p className="section-label">V / Roles and Responsibilities</p><h2>Responsibilities across the network.</h2></div>
        <div className="role-table" role="table" aria-label="Network roles and responsibilities">
          <div role="row"><strong role="cell">Coordinating Center (Yale University)</strong><span role="cell">Project intake and review; subcontracting; overall network management; data-format standardization; central analytics support; publication and dissemination governance.</span></div>
          <div role="row"><strong role="cell">Academic Members (Data Providers)</strong><span role="cell">Data provision; local approvals; participation in projects; collaboration on analytics and interpretation; manuscript development, review, and transparent reporting.</span></div>
          <div role="row"><strong role="cell">Industry Members (Funding Partners)</strong><span role="cell">Financial support; project proposals; collaboration on study design; domain expertise; compliance with data-sharing and publication guidelines.</span></div>
          <div role="row"><strong role="cell">Principal Investigators</strong><span role="cell">Scientific aims; collaboration with the Coordinating Center and members; compliance with network policies; manuscript development, review, and transparent reporting.</span></div>
        </div>
      </section>
    </main>
  );
}
