import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { RevealController } from "../components/RevealController";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact the Clarion coordinating team for research collaboration inquiries, sponsored project discussions, or network information.",
};

export default function ContactPage() {
  return (
    <main id="main-content" className="content-page contact-route">
      <section className="page-hero">
        <div className="contact-hero-field" aria-hidden="true" />
        <p className="section-label">Contact</p>
        <h1>Clarion coordinating team.</h1>
        <p className="page-hero-copy">
          For research collaboration inquiries, sponsored project discussions, or network information, contact
          the coordinating team at Yale University.
        </p>
      </section>

      <section className="contact contact-page">
        <div className="contact-layout">
          <div className="ui-section-heading reveal">
            <p className="section-label">Coordinating team</p>
            <h2><span>Research and</span><span>network inquiries.</span></h2>
            <p>Contact the Yale-based coordinating team to discuss collaboration, participation, or a sponsored study.</p>
          </div>
          <div className="contact-directory reveal">
            <div className="contact-person">
              <article className="reveal">
                <span className="contact-mark" aria-hidden="true"><Mail size={20} strokeWidth={1.7} /></span>
                <strong>Vipina K. Keloth, PhD</strong>
                <span className="contact-role">Associate Research Scientist</span>
                <a href="mailto:vipina.kuttichikeloth@yale.edu">vipina.kuttichikeloth@yale.edu</a>
              </article>
              <article className="reveal">
                <span className="contact-mark" aria-hidden="true"><Mail size={20} strokeWidth={1.7} /></span>
                <strong>Hua Xu, PhD</strong>
                <span className="contact-role">Robert T. McCluskey Professor</span>
                <a href="mailto:hua.xu@yale.edu">hua.xu@yale.edu</a>
              </article>
            </div>
          </div>
        </div>
      </section>
      <RevealController />
    </main>
  );
}
