"use client";

import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";

const nodes = [
  { short: "UMN", label: "Minnesota", className: "node-minnesota" },
  { short: "IU", label: "Indiana", className: "node-indiana" },
  { short: "UCI", label: "UC Irvine", className: "node-irvine" },
  { short: "COL", label: "Columbia", className: "node-columbia" },
  { short: "COR", label: "Cornell", className: "node-cornell" },
  { short: "UF", label: "Florida", className: "node-florida" },
];

type Point = { x: number; y: number };
type CurvedRoute = { start: Point; control: Point; end: Point };

function quadraticPoint(route: CurvedRoute, progress: number): Point {
  const inverse = 1 - progress;
  return {
    x: inverse * inverse * route.start.x + 2 * inverse * progress * route.control.x + progress * progress * route.end.x,
    y: inverse * inverse * route.start.y + 2 * inverse * progress * route.control.y + progress * progress * route.end.y,
  };
}

export function HeroNetwork() {
  const fieldRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hubRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Array<HTMLDivElement | null>>([]);

  useEffect(() => {
    const field = fieldRef.current;
    const canvas = canvasRef.current;
    const hubBadge = hubRef.current?.querySelector("i");
    if (!field || !canvas || !hubBadge) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let routes: CurvedRoute[] = [];
    let width = 0;
    let height = 0;
    let animationFrame = 0;

    const measure = () => {
      const fieldRect = field.getBoundingClientRect();
      const hubRect = hubBadge.getBoundingClientRect();
      const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
      width = fieldRect.width;
      height = fieldRect.height;
      canvas.width = Math.max(1, Math.round(width * pixelRatio));
      canvas.height = Math.max(1, Math.round(height * pixelRatio));
      context.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);

      const hubCenter = {
        x: hubRect.left - fieldRect.left + hubRect.width / 2,
        y: hubRect.top - fieldRect.top + hubRect.height / 2,
      };
      const hubRadius = hubRect.width / 2;

      routes = nodeRefs.current.flatMap((node, index) => {
        const badge = node?.querySelector("i");
        if (!badge) return [];
        const badgeRect = badge.getBoundingClientRect();
        const nodeCenter = {
          x: badgeRect.left - fieldRect.left + badgeRect.width / 2,
          y: badgeRect.top - fieldRect.top + badgeRect.height / 2,
        };
        const dx = nodeCenter.x - hubCenter.x;
        const dy = nodeCenter.y - hubCenter.y;
        const distance = Math.hypot(dx, dy) || 1;
        const unitX = dx / distance;
        const unitY = dy / distance;
        const nodeRadius = badgeRect.width / 2;
        const start = { x: hubCenter.x + unitX * hubRadius, y: hubCenter.y + unitY * hubRadius };
        const end = { x: nodeCenter.x - unitX * nodeRadius, y: nodeCenter.y - unitY * nodeRadius };
        const midpoint = { x: (start.x + end.x) / 2, y: (start.y + end.y) / 2 };
        const curveDirection = index % 2 === 0 ? 1 : -1;
        const curveAmount = distance * (index === 1 || index === 4 ? 0.1 : 0.16) * curveDirection;
        const control = {
          x: midpoint.x - unitY * curveAmount,
          y: midpoint.y + unitX * curveAmount,
        };
        return [{ start, control, end }];
      });
    };

    const draw = (time: number) => {
      context.clearRect(0, 0, width, height);

      routes.forEach((route) => {
        context.beginPath();
        context.moveTo(route.start.x, route.start.y);
        context.quadraticCurveTo(route.control.x, route.control.y, route.end.x, route.end.y);
        context.lineWidth = 4;
        context.strokeStyle = "rgba(128, 184, 195, 0.08)";
        context.shadowBlur = 12;
        context.shadowColor = "rgba(142, 203, 213, 0.14)";
        context.stroke();

        context.beginPath();
        context.moveTo(route.start.x, route.start.y);
        context.quadraticCurveTo(route.control.x, route.control.y, route.end.x, route.end.y);
        context.lineWidth = 1.1;
        context.strokeStyle = "rgba(174, 211, 218, 0.54)";
        context.shadowBlur = 0;
        context.stroke();
      });

      if (!reducedMotion) {
        [0, 3].forEach((routeIndex, particleIndex) => {
          const route = routes[routeIndex];
          if (!route) return;
          const progress = ((time / 9000) + particleIndex * 0.46) % 1;
          const point = quadraticPoint(route, progress);
          const glow = context.createRadialGradient(point.x, point.y, 0, point.x, point.y, 8);
          glow.addColorStop(0, "rgba(220, 245, 247, 0.95)");
          glow.addColorStop(0.28, "rgba(142, 211, 220, 0.72)");
          glow.addColorStop(1, "rgba(142, 211, 220, 0)");
          context.fillStyle = glow;
          context.beginPath();
          context.arc(point.x, point.y, 8, 0, Math.PI * 2);
          context.fill();
          context.fillStyle = "rgba(228, 249, 250, 0.9)";
          context.beginPath();
          context.arc(point.x, point.y, 1.8, 0, Math.PI * 2);
          context.fill();
        });
      }

      if (!reducedMotion) animationFrame = requestAnimationFrame(draw);
    };

    const refresh = () => {
      measure();
      if (reducedMotion) draw(0);
    };

    refresh();
    const observer = new ResizeObserver(refresh);
    observer.observe(field);
    if (!reducedMotion) animationFrame = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animationFrame);
      observer.disconnect();
    };
  }, []);

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bounds = event.currentTarget.getBoundingClientRect();
    const horizontal = (event.clientX - bounds.left) / bounds.width - 0.5;
    const vertical = (event.clientY - bounds.top) / bounds.height - 0.5;

    event.currentTarget.style.setProperty("--network-tilt-x", `${vertical * -1.2}deg`);
    event.currentTarget.style.setProperty("--network-tilt-y", `${horizontal * 1.6}deg`);
    event.currentTarget.style.setProperty("--network-shift-x", `${horizontal * 3}px`);
    event.currentTarget.style.setProperty("--network-shift-y", `${vertical * 3}px`);
  };

  const handlePointerLeave = (event: ReactPointerEvent<HTMLDivElement>) => {
    event.currentTarget.style.setProperty("--network-tilt-x", "0deg");
    event.currentTarget.style.setProperty("--network-tilt-y", "0deg");
    event.currentTarget.style.setProperty("--network-shift-x", "0px");
    event.currentTarget.style.setProperty("--network-shift-y", "0px");
  };

  return (
    <div
      className="hero-network"
      role="img"
      aria-label="Seven academic institutions connected through Yale University as the Clarion coordinating center"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="hero-network-field" ref={fieldRef} aria-hidden="true">
        <canvas ref={canvasRef} className="hero-network-canvas" />
        {nodes.map((node, index) => (
          <div className={`hero-node ${node.className}`} key={node.label} ref={(element) => { nodeRefs.current[index] = element; }}>
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
