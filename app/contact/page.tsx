import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact the Clarion coordinating team for research collaboration inquiries, sponsored project discussions, or network information.",
};

export default function ContactPage() {
  return (
    <main id="main-content">
      <section className="page-hero">
        <p className="section-label">Contact</p>
        <h1>Clarion coordinating team.</h1>
        <p className="page-hero-copy">
          For research collaboration inquiries, sponsored project discussions, or network information, contact
          the coordinating team at Yale University.
        </p>
      </section>

      <section className="contact contact-page">
        <div>
          <p className="section-label">Coordinating team</p>
          <div className="contact-person">
            <strong>Vipina K. Keloth, PhD</strong>
            <a href="mailto:vipina.kuttichikeloth@yale.edu">vipina.kuttichikeloth@yale.edu</a>
            <strong>Hua Xu, PhD</strong>
            <a href="mailto:hua.xu@yale.edu">hua.xu@yale.edu</a>
          </div>
        </div>
      </section>
    </main>
  );
}
