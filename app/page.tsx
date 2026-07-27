const institutions = [
  "Columbia University",
  "Cornell University",
  "University of Florida",
  "UC Irvine",
  "Indiana University",
  "University of Minnesota",
  "Yale University",
];

function Arrow() {
  return <span aria-hidden="true" className="arrow">→</span>;
}

export default function Home() {
  return (
    <main>
      <header className="site-header">
        <a className="wordmark" href="#top" aria-label="Clarion home">CLARION</a>
        <nav aria-label="Primary navigation">
          <a href="#about">About</a>
          <a href="#model">Research model</a>
          <a href="#governance">Governance</a>
          <a href="#collaboration">Collaboration</a>
          <a className="nav-contact" href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero" id="top">
        <div className="eyebrow">Multi-institutional oncology research</div>
        <h1>Real-world evidence,<br /><em>developed together.</em></h1>
        <p className="hero-copy">
          Clarion is a collaborative network supporting rigorous, privacy-preserving
          real-world evidence generation in oncology.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#model">Explore the research model <Arrow /></a>
          <a className="text-link" href="#contact">Research collaboration inquiries <Arrow /></a>
        </div>
        <div className="hero-rule" />
        <div className="hero-facts" aria-label="Clarion principles">
          <span>Federated analysis</span><span>Local data stewardship</span><span>Aggregate outputs</span>
        </div>
      </section>

      <section className="intro section-grid" id="about">
        <div>
          <p className="section-label">01 / About Clarion</p>
          <h2>Research infrastructure for questions that extend beyond one institution.</h2>
        </div>
        <div className="prose">
          <p>
            Clarion brings together academic institutions and healthcare systems to conduct
            multi-site oncology research using structured and unstructured electronic health
            record data. The network supports the generation of real-world evidence while
            maintaining local institutional control over patient data.
          </p>
          <p>
            Its work is organized around reproducible methods, shared standards, and a
            commitment to scientific integrity. Clarion&apos;s coordinating center provides
            governance, project review, analytic coordination, and publication oversight.
          </p>
          <a className="text-link" href="#governance">Read about governance <Arrow /></a>
        </div>
      </section>

      <section className="model-section" id="model">
        <div className="model-heading">
          <p className="section-label">02 / Research model</p>
          <h2>Distributed analysis. <em>Shared understanding.</em></h2>
          <p>Data remain within participating institutions. Approved workflows are executed locally, and only authorized summary-level results are returned for multi-site synthesis.</p>
        </div>
        <div className="federated-diagram" role="img" aria-label="A federated research workflow: participating institutions execute approved analyses locally and return approved aggregate outputs to the Clarion coordinating center.">
          <div className="diagram-site site-one"><span>Participating<br />institution</span><i /></div>
          <div className="diagram-site site-two"><span>Participating<br />institution</span><i /></div>
          <div className="diagram-site site-three"><span>Participating<br />institution</span><i /></div>
          <div className="diagram-site site-four"><span>Participating<br />institution</span><i /></div>
          <div className="diagram-center"><b>Clarion</b><span>Coordinating center</span></div>
          <div className="diagram-note">Approved aggregate outputs</div>
          <div className="diagram-line line-a" /><div className="diagram-line line-b" />
          <div className="diagram-line line-c" /><div className="diagram-line line-d" />
        </div>
        <div className="model-steps">
          <div><span>01</span><h3>Study development</h3><p>Scientific aims, feasibility, protocol, and analytic plan are reviewed across the network.</p></div>
          <div><span>02</span><h3>Local execution</h3><p>Validated analytic code is implemented in each institution&apos;s secure environment.</p></div>
          <div><span>03</span><h3>Multi-site synthesis</h3><p>Approved non-identifiable outputs are harmonized for scientific reporting and dissemination.</p></div>
        </div>
      </section>

      <section className="principles" id="governance">
        <div className="principles-intro">
          <p className="section-label">03 / Governance & data protection</p>
          <h2>Designed for accountable research.</h2>
          <p>Clarion&apos;s governance framework supports responsible collaboration across institutional, regulatory, and scientific boundaries.</p>
        </div>
        <div className="principle-list">
          <article><span>01</span><div><h3>Data remain local</h3><p>Patient-level structured and unstructured data remain under the stewardship of participating institutions, subject to their local policies and approvals.</p></div></article>
          <article><span>02</span><div><h3>Independent oversight</h3><p>Projects are evaluated for scientific merit, feasibility, privacy considerations, and alignment with network policies.</p></div></article>
          <article><span>03</span><div><h3>Reproducible methods</h3><p>Network-distributed software, common terminology standards, quality control protocols, and validated workflows support consistent execution.</p></div></article>
          <article><span>04</span><div><h3>Transparent dissemination</h3><p>Publication and dissemination are governed through coordinated review, institutional alignment, and established authorship practices.</p></div></article>
        </div>
      </section>

      <section className="network-section" id="network">
        <div><p className="section-label">04 / Network</p><h2>Academic collaboration across institutions.</h2></div>
        <div className="network-copy"><p>Initial network participation includes academic institutions committed to a shared model of rigorous, privacy-preserving oncology research.</p><p className="fine-print">Institutional participation and public use of names or marks are subject to approval.</p></div>
        <div className="institution-grid">
          {institutions.map((institution) => <div key={institution}>{institution}</div>)}
        </div>
      </section>

      <section className="collaboration" id="collaboration">
        <p className="section-label">05 / Collaboration</p>
        <div className="collaboration-grid">
          <h2>Advancing research through responsible partnership.</h2>
          <div className="prose"><p>Clarion accepts research proposals from academic, government, foundation, nonprofit, pharmaceutical, biotechnology, medical device, diagnostics, and health technology organizations. Each proposal follows a structured review process.</p><a className="button button-dark" href="#contact">Submit a research inquiry <Arrow /></a></div>
        </div>
      </section>

      <section className="contact" id="contact">
        <div><p className="section-label">06 / Contact</p><h2>Begin a conversation.</h2><p>For research collaboration inquiries, sponsored project discussions, or network information, contact the Clarion coordinating team.</p></div>
        <form onSubmit={(event) => event.preventDefault()}>
          <label>Full name<input name="name" autoComplete="name" placeholder="Your name" /></label>
          <label>Institution or organization<input name="organization" autoComplete="organization" placeholder="Institution or organization" /></label>
          <label>Email address<input name="email" type="email" autoComplete="email" placeholder="name@institution.edu" /></label>
          <label>Inquiry<textarea name="inquiry" rows={4} placeholder="Please briefly describe your inquiry." /></label>
          <button className="button button-primary" type="submit">Send inquiry <Arrow /></button>
          <p className="form-note">This demonstration form does not transmit information. A secure institutional endpoint will be configured before launch.</p>
        </form>
      </section>

      <footer><a className="wordmark" href="#top">CLARION</a><p>Collaborative oncology research infrastructure.</p><span>© {new Date().getFullYear()} Clarion</span></footer>
    </main>
  );
}
