import { NetworkMap, interestedSites } from "./NetworkMap";

type CentersSectionProps = {
  title?: string;
  description?: string;
  /** id for the heading, so the section can be labelled and linked */
  headingId?: string;
};

/**
 * The homepage "Participating Medical Centers" band: navy section, legend on the left,
 * the US map with arcs to the Yale hub on the right. Shared by the homepage and Network page
 * so both show the same map. Its styles are scoped under .home-v2, so outside the homepage
 * it is rendered inside a .home-v2 wrapper.
 */
export function CentersSection({
  title = "Participating Medical Centers",
  description = "Expanding network with more centers joining.",
  headingId = "centers-title",
}: CentersSectionProps) {
  return (
    <section className="hx-section hx-centers" aria-labelledby={headingId}>
      <div className="hx-shell mc-layout">
        <div className="mc-side reveal">
          <div className="hx-heading">
            <h2 id={headingId} tabIndex={-1}>{title}</h2>
            <p>{description}</p>
          </div>
          <ul className="mc-legend" aria-hidden="true">
            <li><span className="mc-dot mc-dot-hub" /> Coordinating center</li>
            <li><span className="mc-dot" /> Participating medical center</li>
          </ul>
        </div>
        <div className="hx-map-panel mc-map reveal">
          <NetworkMap sites={interestedSites} arcs />
        </div>
      </div>
    </section>
  );
}

export default CentersSection;
