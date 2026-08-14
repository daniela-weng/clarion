"use client";

import { useEffect, useRef, useState } from "react";

type Point = { x: number; y: number };

export function OversightDiagram({ children }: { children: React.ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);
  const [points, setPoints] = useState<{ parent: Point; children: Point[] } | null>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;
    const measure = () => {
      const parent = root.querySelector<HTMLElement>("[data-oversight-parent]");
      const children = [...root.querySelectorAll<HTMLElement>("[data-oversight-child]")];
      if (!parent || children.length !== 3) return;
      const base = root.getBoundingClientRect();
      const center = (element: HTMLElement, edge: "top" | "bottom") => { const rect = element.getBoundingClientRect(); return { x: rect.left - base.left + rect.width / 2, y: edge === "top" ? rect.top - base.top : rect.bottom - base.top }; };
      setPoints({ parent: center(parent, "bottom"), children: children.map((child) => center(child, "top")) });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(root);
    root.querySelectorAll("[data-oversight-parent], [data-oversight-child]").forEach((element) => observer.observe(element));
    window.addEventListener("resize", measure);
    return () => { observer.disconnect(); window.removeEventListener("resize", measure); };
  }, []);

  const branchY = points ? Math.min(...points.children.map((point) => point.y)) - 22 : 0;
  const path = points ? `M ${points.parent.x} ${points.parent.y} V ${branchY} M ${points.children[0].x} ${branchY} H ${points.children[2].x} M ${points.children[0].x} ${branchY} V ${points.children[0].y} M ${points.children[1].x} ${branchY} V ${points.children[1].y} M ${points.children[2].x} ${branchY} V ${points.children[2].y}` : "";

  return <div ref={rootRef} className="oversight-diagram"><svg className="oversight-svg" aria-hidden="true"><path d={path} /></svg>{children}</div>;
}
