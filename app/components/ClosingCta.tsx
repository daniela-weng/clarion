import Link from "next/link";
import { ArrowRight } from "lucide-react";

type ClosingCtaProps = {
  eyebrow?: string;
  title: string;
  body: string;
  primaryHref?: string;
  primaryLabel?: string;
  secondaryHref?: string;
  secondaryLabel?: string;
};

export function ClosingCta({
  eyebrow = "Sponsored research",
  title,
  body,
  primaryHref = "/sponsored-research",
  primaryLabel = "Discuss a study",
  secondaryHref = "/contact",
  secondaryLabel = "Contact the coordinating center",
}: ClosingCtaProps) {
  return (
    <section className="closing-cta" aria-labelledby="closing-cta-title">
      <div className="closing-cta-glow" aria-hidden="true" />
      <div className="closing-cta-layout reveal">
        <div className="closing-cta-lead">
          <p className="closing-cta-kicker">{eyebrow}</p>
          <h2 id="closing-cta-title">{title}</h2>
        </div>
        <div className="closing-cta-side">
          <p>{body}</p>
          <div className="closing-cta-actions">
            <Link className="closing-cta-primary" href={primaryHref}>
              {primaryLabel} <ArrowRight aria-hidden="true" />
            </Link>
            <Link className="closing-cta-link" href={secondaryHref}>
              {secondaryLabel}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ClosingCta;
