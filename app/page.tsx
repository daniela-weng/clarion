const academicMembers = [
  "Columbia University",
  "Cornell University",
  "University of Florida",
  "UC Irvine",
  "Indiana University",
  "University of Minnesota",
  "Yale University",
];

const mission = [
  "Facilitate high-quality, multi-institutional cancer research through the integration of structured and unstructured EHR data.",
  "Generate real-world evidence to improve clinical outcomes, inform treatment decisions, and advance cancer science.",
  "Provide centralized coordination for projects, enabling consistent governance and analysis execution across sites.",
  "Promote data standardization and interoperability to enhance reproducibility and accelerate translational research.",
  "Foster collaboration among academic institutions, healthcare systems, researchers, and industry partners.",
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
          <a href="#membership">Membership</a>
          <a href="#governance">Governance</a>
          <a href="#sponsored-projects">Sponsored projects</a>
          <a className="nav-contact" href="#contact">Contact</a>
        </nav>
      </header>

      <section className="hero charter-hero" id="top">
        <div className="eyebrow">Collaborative oncology research network</div>
        <h1>Real-world evidence<br /><em>in oncology.</em></h1>
        <p className="hero-copy">
          Clarion is a collaborative data network of academic institutions and healthcare systems,
          coordinated by Yale University, that uses structured and unstructured electronic health
          record data to accelerate real-world evidence generation in oncology research.
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#about">Read the charter overview <Arrow /></a>
          <a className="text-link" href="#contact">Contact the coordinating team <Arrow /></a>
        </div>
        <div className="hero-rule" />
        <div className="hero-facts" aria-label="Clarion data principles">
          <span>Data remain local</span><span>No patient-level data sharing by default</span><span>Institutional oversight</span>
        </div>
      </section>

      <section className="intro section-grid" id="about">
        <div><p className="section-label">I / Introduction</p><h2>A network for multi-institutional oncology research.</h2></div>
        <div className="prose"><p>Clarion uses multi-institutional clinical and research data while maintaining high standards of data privacy, security, and regulatory compliance.</p><p>Its work is coordinated through a shared governance structure and is intended to support rigorous, reproducible real-world evidence generation.</p></div>
      </section>

      <section className="charter-section mission-section" id="mission">
        <div className="section-heading"><p className="section-label">II / Mission</p><h2>The mission of the network.</h2></div>
        <ol className="mission-list">{mission.map((item) => <li key={item}>{item}</li>)}</ol>
      </section>

      <section className="network-section" id="membership">
        <div><p className="section-label">III / Membership</p><h2>Participating roles and institutions.</h2></div>
        <div className="network-copy"><p>Yale University serves as the Coordinating Center. Academic Members provide data and participate in approved analyses. Industry Members serve as funding partners and may participate in sponsored research under the network&apos;s governance framework.</p></div>
        <div className="membership-cards">
          <article><h3>Coordinating Center</h3><p><strong>Yale University</strong></p><p>Provides network governance and oversight; manages sponsored project intake, review, and approval; allocates project resources; coordinates agreements with member institutions; and oversees compliance, publication, and dissemination governance.</p></article>
          <article><h3>Academic Members</h3><p><strong>Data providers</strong></p><p>Maintain data locally, provide local regulatory oversight, execute approved analytic workflows in their secure environments, and return only approved aggregate results to the Coordinating Center.</p></article>
          <article><h3>Industry Members</h3><p><strong>Funding partners</strong></p><p>Provide financial support, propose project concepts, participate in feasibility and study-design discussions, and receive only Network-approved aggregate information as part of standard operations.</p></article>
          <article><h3>Affiliate or Observer Members</h3><p>May participate in a limited capacity to access aggregated results, participate in workshops, or provide specialized expertise.</p></article>
        </div>
        <div className="member-heading"><p className="section-label">Initial academic members</p><p>The initial participating institutions identified in the charter are listed below.</p></div>
        <div className="institution-grid">{academicMembers.map((institution) => <div key={institution}>{institution}</div>)}</div>
      </section>

      <section className="charter-section governance-section" id="governance">
        <div className="section-heading"><p className="section-label">IV / Governance Structure</p><h2>Network oversight and review.</h2></div>
        <div className="charter-cards">
          <article><h3>Steering Committee</h3><p>Chaired by the Coordinating Center and composed of representatives from each member institution. It provides strategic oversight, approves major initiatives, prioritizes sponsored projects, and reviews network policies.</p></article>
          <article><h3>Scientific Advisory Board</h3><p>External experts in oncology, bioinformatics, data science, and regulatory affairs provide guidance on research priorities, methodological approaches, and innovation opportunities.</p></article>
          <article><h3>Project Review Committee</h3><p>Evaluates sponsored project proposals for scientific merit, feasibility, and data access requirements, and makes recommendations on project approval and resource allocation.</p></article>
          <article><h3>Data Governance and Privacy Committee</h3><p>Oversees data access, use, and standardization; validates analytics workflows and privacy-preserving methods; and safeguards against transfer of patient-level data outside member institutions.</p></article>
        </div>
      </section>

      <section className="roles-section" id="roles">
        <div className="section-heading"><p className="section-label">V / Roles and Responsibilities</p><h2>Responsibilities across the network.</h2></div>
        <div className="role-table" role="table" aria-label="Network roles and responsibilities">
          <div role="row"><strong role="cell">Coordinating Center (Yale University)</strong><span role="cell">Project intake and review; subcontracting; overall network management; data-format standardization; central analytics support; publication and dissemination governance.</span></div>
          <div role="row"><strong role="cell">Academic Members (Data Providers)</strong><span role="cell">Data provision; local approvals; participation in projects; collaboration on analytics and interpretation; manuscript development, review, and transparent reporting.</span></div>
          <div role="row"><strong role="cell">Industry Members (Funding Partners)</strong><span role="cell">Financial support; project proposals; collaboration on study design; domain expertise; compliance with data-sharing and publication guidelines.</span></div>
          <div role="row"><strong role="cell">Principal Investigators</strong><span role="cell">Scientific aims; collaboration with the Coordinating Center and members; compliance with network policies; manuscript development, review, and transparent reporting.</span></div>
        </div>
      </section>

      <section className="data-section" id="data-governance">
        <div className="section-heading"><p className="section-label">VI / Data Governance, Privacy, and Security</p><h2>Local stewardship and controlled analysis.</h2></div>
        <div className="data-grid">
          <article><h3>Core data principles</h3><ul><li>Data remain local; there is no central data repository unless institutionally agreed.</li><li>No patient-level data leave institutions unless prior agreements have been made.</li><li>Local IRB or reliance agreements are required before analytic activity.</li></ul></article>
          <article><h3>Processing and analysis</h3><p>Data processing and analysis occur locally using network-distributed software packages, modular analytic components that conform to network standards, and optional institution-specific extensions.</p><p>Only derived variables, concept counts, embeddings, or summary-level outputs are returned.</p></article>
          <article><h3>Quality control and validation</h3><ul><li>Network-wide quality-control protocols</li><li>Standard model performance evaluation</li><li>Consistency checks for structured and unstructured outputs</li><li>Validated code packages delivered by the Coordinating Center or member institutions</li></ul></article>
          <article><h3>Data security</h3><p>Data are de-identified or pseudonymized according to regulatory standards. Centralized analytics adhere to security protocols, including encryption, access controls, and audit trails.</p></article>
        </div>
      </section>

      <section className="sponsored-section" id="sponsored-projects">
        <div className="section-heading"><p className="section-label">VII / Sponsored Projects</p><h2>Project proposals, data sharing, and distributed execution.</h2></div>
        <div className="sponsored-grid">
          <article><h3>Eligibility to submit projects</h3><p>Clarion accepts proposals from pharmaceutical and biotechnology companies; medical device and diagnostics companies; health technology and AI/ML companies; academic or government researchers; and foundations or nonprofit research organizations.</p><p>All proposals must align with the network&apos;s mission and comply with data privacy and ethical standards.</p></article>
          <article><h3>Data-sharing policy</h3><p>By default, no patient-level structured or unstructured data leave member institutions. Data remain behind each institution&apos;s firewall and are accessed only through controlled, IRB-approved mechanisms. Sponsors do not receive raw, patient-level, or de-identified datasets as part of standard operations.</p><p>Exceptions require a fully executed Data Use Agreement or equivalent instrument, all required approvals, and voluntary agreement by the participating institution for a specific approved purpose.</p></article>
          <article><h3>Approved sponsor outputs</h3><p>Under all conditions, sponsors receive pre-approved aggregated outputs, summary statistics, model coefficients or performance metrics, derived insights, cross-site pooled analyses, or other non-identifiable results approved by the Coordinating Center.</p></article>
        </div>
        <div className="workflow-heading"><p className="section-label">Distributed or Federated Analysis Model</p><p>This charter subsection defines the following sponsored-project workflow.</p></div>
        <ol className="workflow-list">
          <li><strong>Sponsor Engagement</strong><span>Sponsor submits a proposal; the Coordinating Center refines scientific aims; feasibility is assessed across member sites; and the Steering Committee approves the project.</span></li>
          <li><strong>Protocol &amp; Analysis Plan Development</strong><span>The Coordinating Center drafts the analytic plan; sites review local feasibility; and the Privacy &amp; Governance Committee signs off.</span></li>
          <li><strong>Distributed Execution</strong><span>Code and pipeline are delivered to each site; sites run analyses locally and return only approved outputs.</span></li>
          <li><strong>Multi-Site Synthesis</strong><span>The Coordinating Center aggregates, harmonizes, and validates results; generates sponsor-ready deliverables; and prepares manuscripts, reports, or regulatory briefs.</span></li>
          <li><strong>Subcontracting and Site Participation</strong><span>The Coordinating Center recommends participating sites; the Steering Committee approves the participation plan; and subcontracts are issued by the Coordinating Center.</span></li>
        </ol>
      </section>

      <section className="closing-section" id="policies">
        <div><p className="section-label">VIII–XI / Network Policies</p><h2>Publication, sustainability, review, and principles.</h2></div>
        <div className="closing-grid">
          <article><h3>Intellectual Property &amp; Publication</h3><p>Publications require approval by the Coordinating Center and involved member institutions. Intellectual property follows pre-defined agreements, and network recognition is included in publications and presentations.</p></article>
          <article><h3>Funding &amp; Sustainability</h3><p>The network is funded through sponsored projects, grants, and institutional contributions. Financial oversight is managed by the Coordinating Center.</p></article>
          <article><h3>Amendments &amp; Review</h3><p>The charter is reviewed annually by the Steering Committee. Amendments require a majority vote of the Steering Committee and approval by the Coordinating Center.</p></article>
          <article><h3>Core Principles</h3><p>Collaboration, transparency, compliance, innovation, and impact guide Clarion&apos;s work.</p></article>
        </div>
      </section>

      <section className="contact" id="contact">
        <div><p className="section-label">Contact</p><h2>Clarion coordinating team.</h2><p>For research collaboration inquiries, sponsored project discussions, or network information, contact:</p><div className="contact-person"><strong>Vipina K. Keloth, PhD</strong><a href="mailto:vipina.kuttichikeloth@yale.edu">vipina.kuttichikeloth@yale.edu</a><strong>Hua Xu, PhD</strong><a href="mailto:hua.xu@yale.edu">hua.xu@yale.edu</a></div></div>
      </section>

      <footer><a className="wordmark" href="#top">CLARION</a><p>Collaborative oncology research network.</p><span>© {new Date().getFullYear()} Clarion</span></footer>
    </main>
  );
}
