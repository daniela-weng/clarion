import type { Metadata } from "next";
import { BarChart3, BookOpen, ClipboardCheck, Database, FileText, LockKeyhole, Network, Scale, ShieldCheck, Users } from "lucide-react";
import { OversightDiagram } from "../components/OversightDiagram";
import { PageHero } from "../components/PageHero";
import { RevealController } from "../components/RevealController";

export const metadata: Metadata = {
  title: "Governance & Data",
  description: "Clarion's governance structure, data governance, privacy protections, security model, and network policies.",
};

const oversight = [
  { title: "Steering Committee", icon: Users, text: "Chaired by the Coordinating Center and composed of representatives from each member institution. It provides strategic oversight, approves major initiatives, prioritizes sponsored projects, and reviews Network policies.", featured: true },
  { title: "Scientific Advisory Board", icon: Scale, text: "External experts in observational research, bioinformatics, data science, and regulatory affairs provide guidance on research priorities, methodological approaches, and innovation opportunities." },
  { title: "Project Review Committee", icon: ClipboardCheck, text: "Evaluates sponsored project proposals for scientific merit, feasibility, and data access requirements, and makes recommendations on project approval and resource allocation." },
  { title: "Data Governance and Privacy Committee", icon: ShieldCheck, text: "Establishes and oversees Network policies for data access, standardization, privacy, and compliant analytic activity under HIPAA and local institutional requirements." },
];

const protections = [
  { title: "Local data stewardship", icon: Database, text: "Patient-level data remain within member institutions by default. Any exception requires prior institutional agreement and an approved legal and governance pathway; local IRB or reliance requirements must be satisfied before analysis begins." },
  { title: "Controlled local analysis", icon: Network, text: "Network-distributed software and standards-conforming analytic components execute inside each institution’s secure environment. Only approved derived variables, concept counts, embeddings, or summary-level outputs are returned." },
  { title: "Quality control and validation", icon: BarChart3, text: "Shared quality-control protocols, model-performance evaluation, consistency checks, and validated code packages support reliable and reproducible results across participating sites." },
  { title: "Security safeguards", icon: LockKeyhole, text: "Data are de-identified or pseudonymized as required. Encryption, access controls, audit trails, and institutional security protocols protect data throughout approved analytic activity." },
];

const policies = [
  ["Intellectual Property & Publication", FileText, "Publications require approval by the Coordinating Center and involved member institutions. Intellectual property follows pre-defined agreements among the Coordinating Center, member institutions, and sponsors, and Network recognition should be included in publications and presentations."],
  ["Funding & Sustainability", BookOpen, "The Network is funded through sponsored projects, grants, and institutional contributions. Financial oversight is managed by the Coordinating Center, with sustainable operations supported by shared infrastructure, standardized data pipelines, and collaborative analytics resources."],
  ["Amendments & Review", ClipboardCheck, "The Charter is reviewed annually by the Steering Committee. Amendments require a majority vote of the Steering Committee and approval by the Coordinating Center."],
] as const;

export default function GovernancePage() {
  return <main id="main-content" className="content-page governance-page">
    <PageHero seed={43} tone="light" tileSize={1.3} rotation={0} lead="Local stewardship and" accent="controlled analysis" body="Clarion combines shared Network governance with local institutional stewardship. Dedicated committees oversee research priorities, project review, data use, privacy, and compliance across participating institutions." />
    <section id="oversight" className="governance-oversight"><div className="governance-section-heading"><div><p className="section-label">Governance structure</p><h2>Network oversight<br />and review.</h2></div><p>A committee-led structure separates strategic direction, scientific guidance, project approval, and data governance while preserving institutional accountability.</p></div><OversightDiagram><div className="oversight-layout"><article data-oversight-parent className="oversight-card oversight-card-featured"><div className="oversight-card-heading"><span className="governance-icon" aria-hidden="true"><Users size={25} strokeWidth={1.6} /></span><h3>{oversight[0].title}</h3></div><p>{oversight[0].text}</p></article><div className="oversight-children">{oversight.slice(1).map(({ title, icon: Icon, text }) => <article data-oversight-child className="oversight-card" key={title}><div className="oversight-card-heading"><span className="governance-icon" aria-hidden="true"><Icon size={25} strokeWidth={1.6} /></span><h3>{title}</h3></div><p>{text}</p></article>)}</div></div></OversightDiagram></section>
    <section id="protection" className="governance-protections"><div className="governance-section-heading reveal"><p className="section-label">Data governance, privacy, and security</p><h2>How data are protected<span>.</span></h2></div><div className="protection-grid">{protections.map(({ title, icon: Icon, text }, index) => <article className="reveal" key={title}><span className="protection-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span><span className="protection-icon" aria-hidden="true"><Icon size={25} strokeWidth={1.6} /></span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
    <section id="policies" className="governance-policies"><div className="governance-section-heading reveal"><p className="section-label">Network policies</p><h2>Publication, funding,<br />and review<span>.</span></h2><p>Clear policies govern how research is published, funded, and reviewed across the Network.</p></div><div className="policy-list">{policies.map(([title, Icon, text], index) => <article className="reveal" key={title}><span className="policy-number">{String(index + 1).padStart(2, "0")}</span><span className="policy-icon" aria-hidden="true"><Icon size={22} strokeWidth={1.6} /></span><div><h3>{title}</h3><p>{text}</p></div></article>)}</div></section>

    <RevealController />
  </main>;
}
