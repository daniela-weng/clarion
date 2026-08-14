import { Building2, Cpu, Landmark } from "lucide-react";

type Stage = {
  label: string;
  title: string;
  text: string;
  icon: typeof Building2;
  sites?: string[];
};

const defaultStages: Stage[] = [
  {
    label: "Member institutions",
    title: "Data remain local",
    text: "Patient-level EHR data stay within each institution’s secure environment by default.",
    icon: Building2,
    sites: ["Site A", "Site B", "Site C"],
  },
  {
    label: "Local analysis",
    title: "Approved code runs on-site",
    text: "Network-approved, standards-conforming workflows execute under local institutional oversight.",
    icon: Cpu,
  },
  {
    label: "Coordinating center",
    title: "Aggregate returns to Yale",
    text: "Only authorized, non-identifiable outputs return to the Coordinating Center for cross-site synthesis.",
    icon: Landmark,
  },
];

const connectorLabels = ["Approved code", "Authorized aggregate"];

export function FederatedFlow({ stages = defaultStages }: { stages?: Stage[] }) {
  return (
    <div
      className="fed-flow reveal"
      role="img"
      aria-label="Federated model: member institutions keep patient-level data local, network-approved analyses run on site, and only authorized aggregate outputs return to the Yale coordinating center."
    >
      {stages.map((stage, index) => {
        const Icon = stage.icon;
        return (
          <div className="fed-cell" key={stage.label}>
            <article className={`fed-stage fed-stage-${index + 1}`}>
              <span className="fed-node" aria-hidden="true">
                <Icon strokeWidth={1.6} />
                <i className="fed-node-ring" />
              </span>
              <p className="fed-stage-label">{stage.label}</p>
              <h3>{stage.title}</h3>
              <p className="fed-stage-text">{stage.text}</p>
              {stage.sites && (
                <div className="fed-sites" aria-hidden="true">
                  {stage.sites.map((site) => (
                    <span key={site}>{site}</span>
                  ))}
                </div>
              )}
            </article>

            {index < stages.length - 1 && (
              <div className="fed-link" aria-hidden="true">
                <span className="fed-link-caption">{connectorLabels[index]}</span>
                <svg className="fed-link-svg" viewBox="0 0 120 16" preserveAspectRatio="none" fill="none">
                  <defs>
                    <marker
                      id={`fed-arrow-${index}`}
                      viewBox="0 0 10 10"
                      refX="7"
                      refY="5"
                      markerWidth="7"
                      markerHeight="7"
                      orient="auto-start-reverse"
                    >
                      <path d="M1 1 L8 5 L1 9" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                    </marker>
                  </defs>
                  <line className="fed-link-path" x1="0" y1="8" x2="110" y2="8" stroke="currentColor" strokeWidth="1.6" markerEnd={`url(#fed-arrow-${index})`} />
                </svg>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default FederatedFlow;
