import type { Metadata } from "next";

import { PageHero } from "../components/PageHero";
import { RevealController } from "../components/RevealController";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact the Clarion coordinating team for research collaboration inquiries, sponsored project discussions, or network information.",
};

export default function ContactPage() {
  return (
    <main id="main-content" className="content-page contact-route">
      <PageHero seed={71} tone="light" tileSize={1.8} rotation={12}
        compact
        lead="Clarion"
        accent="coordinating team"
        body="For research collaboration inquiries, sponsored project discussions, or network information, contact the coordinating team at Yale University."
      />

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
                <strong>Vipina K. Keloth, PhD</strong>
                <span className="contact-role">Associate Research Scientist</span>
                <a href="mailto:vipina.kuttichikeloth@yale.edu">vipina.kuttichikeloth@yale.edu</a>
              </article>
              <article className="reveal">
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
