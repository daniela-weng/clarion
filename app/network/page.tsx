import type { Metadata } from "next";
import { Database, Handshake, Landmark, UserRound, Users } from "lucide-react";
import { NetworkMap } from "../components/NetworkMap";
import { RevealController } from "../components/RevealController";

export const metadata: Metadata = {
  title: "Network",
  description: "Participating roles and institutions in the Clarion network.",
};

const memberships = [
  {
    title: "Coordinating Center",
    label: "Yale University",
    icon: Landmark,
    description: "Yale University coordinates Network governance and operations. The Coordinating Center manages project intake and review, allocates participating sites and analytic resources, coordinates agreements, and oversees regulatory, data-security, publication, and dissemination requirements.",
  },
  {
    title: "Academic Members",
    label: "Data stewards and research partners",
    icon: Database,
    description: "Academic Members maintain structured and unstructured EHR data within their own secure environments. They provide local regulatory oversight, execute Network-approved analytic workflows, return only approved aggregate results, and contribute to scientific interpretation and dissemination.",
  },
  {
    title: "Industry Members",
    label: "Funding and research partners",
    icon: Handshake,
    description: "Industry Members support Network infrastructure and multi-institutional research through membership and sponsored projects. They may propose studies, participate in feasibility and study-design discussions, and contribute domain expertise, but do not receive patient-level data.",
  },
  {
    title: "Affiliate or Observer Members",
    label: "Limited participation",
    icon: Users,
    description: "Additional institutions or organizations may participate in a limited capacity to access approved aggregate results, join workshops or working groups, or contribute specialized expertise to Network activities.",
  },
];

export default function NetworkPage() {
  return (
    <main id="main-content" className="network-page">
      <section className="network-hero">
        <div className="network-hero-gradient" aria-hidden="true" />
        <div className="network-hero-mesh" aria-hidden="true" />
        <div className="network-hero-glow" aria-hidden="true" />
        <div className="network-hero-overlay" aria-hidden="true" />
        <div className="network-hero-inner">
          <div className="network-hero-copy">
            <p className="section-label">The Clarion network</p>
            <h1><span>Participating roles and</span><span>institutions.</span></h1>
            <div className="network-hero-rule" />
            <p>Clarion brings together academic institutions, research leaders, and funding partners within a coordinated network led by Yale University. Each participant operates under defined responsibilities for governance, project execution, and scientific collaboration.</p>
          </div>
          <aside className="network-hero-facts-panel" aria-label="Network at a glance">
            <p>Network at a glance</p>
            <dl className="network-hero-facts">
              <div><dt>07</dt><dd>Academic institutions</dd></div>
              <div><dt>04</dt><dd>Membership roles</dd></div>
              <div><dt>01</dt><dd>Coordinating center</dd></div>
            </dl>
          </aside>
        </div>
      </section>

      <section className="network-section network-membership ui-section ui-section-standard">
        <div className="network-section-intro ui-section-heading reveal"><p className="section-label">Membership</p><h2>How members participate.</h2><p>Four membership categories define how organizations contribute to, govern, and engage with the Network.</p></div>
        <div className="membership-cards">
          {memberships.map((member, i) => { const Icon = member.icon; return <article key={member.title} className="membership-card reveal"><span className="card-index" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span><div className="membership-card-heading"><span className="membership-icon" aria-hidden="true"><Icon size={22} strokeWidth={1.7} /></span><div><h3>{member.title}</h3><p className="membership-label">{member.label}</p></div></div><p className="membership-description">{member.description}</p></article>; })}
        </div>
      </section>

      <section className="network-institutions ui-section ui-section-standard">
        <div className="institution-heading ui-section-heading reveal">
          <div><p className="section-label">Academic membership · 7 institutions</p><h2>Participating academic institutions.</h2></div>
          <p>Seven academic institutions contribute local expertise and securely governed data, connected through a common research framework coordinated by Yale University.</p>
        </div>
        <NetworkMap />
      </section>

      <section className="roles-section network-roles network-leadership ui-section ui-section-standard">
        <div className="section-heading ui-section-heading reveal"><p className="section-label">Project leadership</p><h2>Principal Investigators.</h2></div>
        <article className="leadership-profile reveal">
          <div className="leadership-profile-heading"><span className="membership-icon" aria-hidden="true"><UserRound size={22} strokeWidth={1.7} /></span><div><p className="membership-label">Role in each study</p></div></div>
          <p className="leadership-statement">Scientific ownership stays with the investigators leading each study.</p>
          <p className="membership-description">Principal Investigators propose projects, define scientific aims, and collaborate with the Coordinating Center and participating members. They ensure compliance with Network policies and contribute to manuscript development, review, and transparent reporting.</p>
        </article>
      </section>

      <RevealController />
    </main>
  );
}
