import type { Metadata } from "next";
import { BarChart3, Building2, Code2, FileText, Landmark, ShieldCheck } from "lucide-react";
import { RevealController } from "../components/RevealController";
import { FederatedFlow } from "../components/FederatedFlow";

export const metadata: Metadata = { title: "Sponsored Research", description: "Project proposals, data sharing, and distributed execution through the Clarion network." };

const eligibility = [
  ["Who may submit", FileText, "Clarion accepts proposals from pharmaceutical, biotechnology, medical device, diagnostics, health technology, AI/ML, academic, government, foundation, nonprofit, and similar research organizations."],
  ["Project eligibility", ShieldCheck, "Proposals must align with the Network’s oncology research mission, demonstrate scientific and operational feasibility, and meet applicable privacy, ethical, regulatory, and institutional requirements."],
  ["Sponsor deliverables", BarChart3, "Sponsors may receive pre-approved, non-identifiable deliverables such as aggregate results, summary statistics, model-performance metrics, derived insights, and cross-site analyses. Patient-level datasets are not provided under standard operations."],
] as const;
const steps = [
  ["Sponsor engagement", "The proposal, scientific aims, and Network-wide feasibility are assessed before Steering Committee approval."],
  ["Protocol and analysis plan", "The Coordinating Center develops the analytic plan with participating sites and obtains required governance review."],
  ["Distributed execution", "Approved code and pipelines are delivered to participating sites for controlled local execution."],
  ["Multi-site synthesis", "The Coordinating Center harmonizes and validates authorized site outputs and prepares study deliverables."],
  ["Site participation and agreements", "Sites are selected for scientific and operational fit, then engaged through an approved participation plan and coordinated subcontracts."],
] as const;
const federatedStages = [
  { label: "Member institutions", title: "Data remain under local stewardship", text: "Patient-level data stay within each institution’s secure environment by default.", icon: Building2 },
  { label: "Local analysis", title: "Approved analyses run on site", text: "Shared code executes inside each institution’s governed environment.", icon: Code2 },
  { label: "Coordinating Center", title: "Results are synthesized across sites", text: "Non-identifiable outputs are validated, combined, and prepared for reporting.", icon: Landmark },
];

export default function SponsoredResearchPage() {
  return <main id="main-content" className="sponsored-page">
    <section className="sponsored-hero"><div className="sponsored-hero-gradient" aria-hidden="true" /><div className="sponsored-hero-mesh" aria-hidden="true" /><div className="sponsored-hero-glow" aria-hidden="true" /><div className="sponsored-hero-inner"><p className="section-label">Sponsored research</p><h1><span>Projects designed for</span><span>trusted, distributed research<span className="hero-accent">.</span></span></h1><p>Clarion provides a governed pathway for organizations to develop and conduct multi-institutional oncology studies across participating academic sites.</p></div></section>
    <section className="sponsored-eligibility"><div className="sponsored-section-heading reveal"><p className="section-label">Sponsored projects</p><h2>Who can participate and what studies deliver.</h2></div><div className="eligibility-grid">{eligibility.map(([title, Icon, text], i) => <article className="reveal" key={title}><span className="card-index" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span><span className="sponsored-icon" aria-hidden="true"><Icon size={24} strokeWidth={1.6} /></span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section className="sponsored-workflow"><div className="workflow-heading reveal"><p className="section-label">Distributed or federated analysis model</p><h2>From proposal to approved output.</h2><p className="workflow-intro">Every sponsored study follows the same governed path from scientific review through local execution and cross-site synthesis.</p></div><ol className="research-process reveal">{steps.map(([title, text], i) => <li key={title}><span className="workflow-index" aria-hidden="true">{String(i + 1).padStart(2, "0")}</span><div className="process-copy"><h3>{title}</h3><p>{text}</p></div></li>)}</ol></section>
    <section className="sponsored-local"><div className="local-copy reveal"><p className="section-label">How Clarion&apos;s federated model works</p><h2>Patient-level data remain local by default.</h2><p>Approved analyses ordinarily run within participating institutions. Only authorized, non-identifiable outputs return to the Coordinating Center for cross-site synthesis.</p></div><div className="sponsored-federated-panel"><FederatedFlow stages={federatedStages} connectorLabels={["Approved code", "Authorized outputs"]} /></div></section>
    <RevealController />
  </main>;
}
