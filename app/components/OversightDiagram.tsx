"use client";

import { useEffect, useRef, useState } from "react";

type Point = { x: number; y: number };

export function OversightDiagram({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [points, setPoints] = useState<{ parent: Point; children: Point[] } | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    let active = true;
    const measure = () => {
      if (!active) return;
      const parent = root.querySelector<HTMLElement>("[data-oversight-parent]");
      const children = [...root.querySelectorAll<HTMLElement>("[data-oversight-child]")];
      if (!parent || children.length !== 3) return;
      const base = root.getBoundingClientRect();
      const center = (element: HTMLElement, edge: "top" | "bottom") => { const rect = element.getBoundingClientRect(); return { x: rect.left - base.left + rect.width / 2, y: edge === "top" ? rect.top - base.top : rect.bottom - base.top }; };
      setPoints({ parent: center(parent, "bottom"), children: children.map((child) => center(child, "top")) });
    };
    document.fonts.ready.then(measure);
    window.addEventListener("resize", measure);
    return () => { active = false; window.removeEventListener("resize", measure); };
  }, []);

  const branchY = points ? Math.min(...points.children.map((point) => point.y)) - 22 : 0;
  let path = "";
  let nodes: Point[] = [];
  if (points) {
    const { parent, children } = points;
    const [c0, c1, c2] = children;
    const bar = branchY;
    const r = Math.max(0, Math.min(16, (c2.x - c0.x) / 2 - 1));
    path = [
      `M ${parent.x} ${parent.y} V ${bar}`,
      `M ${c0.x} ${c0.y} V ${bar + r} Q ${c0.x} ${bar} ${c0.x + r} ${bar} H ${c2.x - r} Q ${c2.x} ${bar} ${c2.x} ${bar + r} V ${c2.y}`,
      `M ${c1.x} ${bar} V ${c1.y}`,
    ].join(" ");
    nodes = [{ x: parent.x, y: parent.y }, c0, c1, c2];
  }

  return <div ref={rootRef} className="oversight-diagram"><svg className="oversight-svg" aria-hidden="true"><path d={path} />{nodes.map((node, i) => <circle key={i} className="oversight-node" cx={node.x} cy={node.y} r="4.5" />)}</svg>{children}</div>;
}
