import type { Metadata } from "next";
import { UserRound } from "lucide-react";
import { CentersSection } from "../components/CentersSection";
import { NetworkRoles } from "../components/NetworkRoles";
import { PageHero } from "../components/PageHero";
import { RevealController } from "../components/RevealController";

export const metadata: Metadata = {
  title: "Network",
  description: "Participating roles and institutions in the Clarion network.",
};

const memberships = [
  {
    title: "Coordinating Center",
    access: "Governs the Network and coordinates every study",
    label: "Yale University",
    description: "Yale University coordinates Network governance and operations. The Coordinating Center manages project intake and review, allocates participating sites and analytic resources, coordinates agreements, and oversees regulatory, data-security, publication, and dissemination requirements.",
  },
  {
    title: "Academic Members",
    access: "Patient data stays inside each institution",
    label: "Data stewards and research partners",
    description: "Academic Members maintain structured and unstructured EHR data within their own secure environments. They provide local regulatory oversight, execute Network-approved analytic workflows, return only approved aggregate results, and contribute to scientific interpretation and dissemination.",
  },
  {
    title: "Industry Members",
    access: "No patient-level data",
    label: "Funding and research partners",
    description: "Industry Members support Network infrastructure and multi-institutional research through membership and sponsored projects. They may propose studies, participate in feasibility and study-design discussions, and contribute domain expertise, but do not receive patient-level data.",
  },
  {
    title: "Affiliate or Observer Members",
    access: "Approved aggregate results only",
    label: "Limited participation",
    description: "Additional institutions or organizations may participate in a limited capacity to access approved aggregate results, join workshops or working groups, or contribute specialized expertise to Network activities.",
  },
];

export default function NetworkPage() {
  return (
    <main id="main-content" className="network-page">
      <PageHero seed={27} tone="light" tileSize={0.9} rotation={0}
        lead="Participating roles and"
        accent="institutions"
        body="Clarion brings together academic institutions, research leaders, and funding partners within a coordinated network led by Yale University. Each participant operates under defined responsibilities for governance, project execution, and scientific collaboration."
        stats={[{ value: "08", label: "Academic institutions" }, { value: "04", label: "Membership roles" }, { value: "01", label: "Coordinating center" }]}
      />

      <NetworkRoles roles={memberships} />

      <div id="institutions" className="home-v2 nw-centers">
        <CentersSection />
      </div>

      <section id="leadership" className="roles-section network-roles network-leadership ui-section ui-section-standard">
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
