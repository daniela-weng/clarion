"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";

const nodes = [
  { short: "UMN", label: "Minnesota", className: "node-minnesota" },
  { short: "IU", label: "Indiana", className: "node-indiana" },
  { short: "UCI", label: "UC Irvine", className: "node-irvine" },
  { short: "COL", label: "Columbia", className: "node-columbia" },
  { short: "COR", label: "Cornell", className: "node-cornell" },
  { short: "UF", label: "Florida", className: "node-florida" },
];

type RouteGeometry = {
  angle: number;
  left: number;
  top: number;
  width: number;
};

export function HeroNetwork() {
  const fieldRef = useRef<HTMLDivElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [routes, setRoutes] = useState<RouteGeometry[]>([]);

  useEffect(() => {
    const field = fieldRef.current;
    const hubBadge = hubRef.current?.querySelector("i");
    if (!field || !hubBadge) return;

    const updateRoutes = () => {
      const fieldRect = field.getBoundingClientRect();
      const hubRect = hubBadge.getBoundingClientRect();
      const hubX = hubRect.left - fieldRect.left + hubRect.width / 2;
      const hubY = hubRect.top - fieldRect.top + hubRect.height / 2;
      const hubRadius = hubRect.width / 2;

      const nextRoutes = nodeRefs.current.map((node) => {
        const badge = node?.querySelector("i");
        if (!badge) return { angle: 0, left: 0, top: 0, width: 0 };
        const badgeRect = badge.getBoundingClientRect();
        const nodeX = badgeRect.left - fieldRect.left + badgeRect.width / 2;
        const nodeY = badgeRect.top - fieldRect.top + badgeRect.height / 2;
        const dx = nodeX - hubX;
        const dy = nodeY - hubY;
        const distance = Math.hypot(dx, dy) || 1;
        const ux = dx / distance;
        const uy = dy / distance;
        const nodeRadius = badgeRect.width / 2;

        return {
          angle: Math.atan2(dy, dx) * (180 / Math.PI),
          left: hubX + ux * hubRadius,
          top: hubY + uy * hubRadius,
          width: Math.max(0, distance - hubRadius - nodeRadius),
        };
      });

      setRoutes(nextRoutes);
    };

    const frame = requestAnimationFrame(updateRoutes);
    const observer = new ResizeObserver(updateRoutes);
    observer.observe(field);
    window.addEventListener("resize", updateRoutes);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("resize", updateRoutes);
    };
  }, []);

  return (
    <div className="hero-network" role="img" aria-label="Seven academic institutions connected through Yale University as the Clarion coordinating center">
      <div className="hero-network-field" ref={fieldRef} aria-hidden="true">
        {routes.map((route, index) => (
          <span
            className={`network-route${index === 0 || index === 3 ? " route-flow" : ""}`}
            key={nodes[index].label}
            style={{
              left: route.left,
              top: route.top,
              width: route.width,
              transform: `rotate(${route.angle}deg)`,
            } as CSSProperties}
          />
        ))}
        {nodes.map((node, index) => (
          <div
            className={`hero-node ${node.className}`}
            key={node.label}
            ref={(element) => { nodeRefs.current[index] = element; }}
          >
            <i>{node.short}</i>
            <span>{node.label}</span>
          </div>
        ))}
        <div className="hero-node hero-node-yale" ref={hubRef}>
          <i>Y</i>
          <span>Yale University</span>
          <small>Coordinating center</small>
        </div>
      </div>
    </div>
  );
}
