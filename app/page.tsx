import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { Arrow } from "./components/Arrow";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const sectionCards = [
  { href: "/about", label: "About", teaser: "Mission, introduction, and the network's core principles." },
  { href: "/network", label: "Network", teaser: "Coordinating center, academic and industry members, and participating institutions." },
  { href: "/governance", label: "Governance & Data", teaser: "Oversight committees, data protection, and network policies." },
  { href: "/sponsored-research", label: "Sponsored Research", teaser: "Proposal eligibility, data-sharing policy, and the federated analysis workflow." },
];

export default function Home() {
  return (
    <main id="main-content">
      <section className="hero charter-hero">
        <div className="hero-main">
          <div className="hero-lead">
            <div className="eyebrow">Collaborative oncology research network</div>
            <h1>Real-world evidence<br /><em>in oncology.</em></h1>
            <p className="hero-copy">
              Clarion is a collaborative data network of academic institutions and healthcare systems,
              coordinated by Yale University, that uses structured and unstructured electronic health
              record data to accelerate real-world evidence generation in oncology research.
            </p>
            <div className="hero-actions">
              <Button asChild size="lg" className="clarion-button">
                <Link href="/about">Explore the network <ArrowUpRight data-icon="inline-end" /></Link>
              </Button>
              <Link className="text-link" href="/contact">Contact the coordinating team <Arrow /></Link>
            </div>
          </div>
          <aside className="hero-glance" aria-label="Clarion at a glance">
            <p className="section-label">At a glance</p>
            <dl>
              <div><dt>Coordinating Center</dt><dd>Yale University</dd></div>
              <div><dt>Academic members</dt><dd>7 institutions</dd></div>
              <div><dt>Analysis model</dt><dd>Federated / on-site</dd></div>
              <div><dt>Data sharing</dt><dd>None by default</dd></div>
            </dl>
          </aside>
        </div>
        <div className="hero-rule" />
        <div className="hero-facts" aria-label="Clarion data principles">
          <span>Data remain local</span><span>No patient-level data sharing by default</span><span>Institutional oversight</span>
        </div>
      </section>

      <section className="model-section" aria-labelledby="model-title">
        <div className="model-heading">
          <p className="section-label">Research model</p>
          <h2 id="model-title">A <em>federated</em> analysis model.</h2>
          <p>Patient-level data never leave the institution. Approved analytic workflows run locally at each member site, and only aggregate results are synthesized by the Coordinating Center.</p>
        </div>
        <div className="federated-diagram" role="img" aria-label="Federated analysis diagram: member sites run analyses locally and return only aggregate outputs to the Clarion coordinating center.">
          <div className="diagram-line line-a" aria-hidden="true" />
          <div className="diagram-line line-b" aria-hidden="true" />
          <div className="diagram-line line-c" aria-hidden="true" />
          <div className="diagram-line line-d" aria-hidden="true" />
          <div className="diagram-site site-one" aria-hidden="true">Member site<i /></div>
          <div className="diagram-site site-two" aria-hidden="true">Member site<i /></div>
          <div className="diagram-site site-three" aria-hidden="true">Member site<i /></div>
          <div className="diagram-site site-four" aria-hidden="true">Member site<i /></div>
          <div className="diagram-center" aria-hidden="true"><b>CLARION</b><span>Coordinating Center</span></div>
          <div className="diagram-note" aria-hidden="true">Only aggregate outputs are returned</div>
        </div>
        <div className="model-steps">
          <div><span>01</span><h3>Data stay local</h3><p>Structured and unstructured EHR data remain behind each institution&apos;s firewall under local IRB oversight.</p></div>
          <div><span>02</span><h3>Analyses run on site</h3><p>Network-distributed, standards-conforming code executes within each institution&apos;s secure environment.</p></div>
          <div><span>03</span><h3>Aggregates synthesized</h3><p>Only derived variables, summary statistics, and other approved outputs are returned and harmonized centrally.</p></div>
        </div>
      </section>

      <section className="nav-cards-section" aria-labelledby="explore-title">
        <div className="section-heading"><p className="section-label">Explore</p><h2 id="explore-title">Explore the network.</h2></div>
        <div className="nav-cards">
          {sectionCards.map((card) => (
            <Card key={card.href} className="nav-card" size="sm">
              <CardHeader>
                <CardTitle className="font-serif text-2xl font-normal tracking-[-.02em]">
                  <Link href={card.href} className="card-link">{card.label} <ArrowUpRight aria-hidden="true" /></Link>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>{card.teaser}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="collaboration">
        <p className="section-label">Get in touch</p>
        <div className="collaboration-grid">
          <div>
            <h2>Research collaboration inquiries.</h2>
          </div>
          <div className="prose">
            <p>For sponsored project discussions, membership information, or research collaboration, contact the Clarion coordinating team at Yale University.</p>
            <Button asChild variant="secondary" size="lg" className="clarion-button clarion-button-light">
              <Link href="/contact">Contact the team <ArrowUpRight data-icon="inline-end" /></Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}
