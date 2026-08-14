"use client";

import { useEffect, useRef } from "react";

export function NetworkHeroAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const points = Array.from({ length: 28 }, (_, index) => ({
      x: .46 + ((index * 37) % 53) / 100,
      y: .12 + ((index * 61) % 76) / 100,
      phase: index * 1.7,
      size: index % 7 === 0 ? 2.4 : 1.25,
    }));
    let frame = 0;
    let animation = 0;
    let pointer = { x: 0, y: 0 };
    const resize = () => { const ratio = Math.min(window.devicePixelRatio || 1, 2); canvas.width = canvas.clientWidth * ratio; canvas.height = canvas.clientHeight * ratio; context.setTransform(ratio, 0, 0, ratio, 0, 0); };
    const draw = () => {
      const width = canvas.clientWidth; const height = canvas.clientHeight; const time = reduced ? 0 : frame * .006;
      context.clearRect(0, 0, width, height);
      const coords = points.map((point) => ({ x: point.x * width + pointer.x * 7, y: point.y * height + pointer.y * 5 }));
      context.lineWidth = 1; context.strokeStyle = "rgba(143,184,194,.28)";
      coords.forEach((point, index) => coords.slice(index + 1).forEach((other) => { const distance = Math.hypot(point.x - other.x, point.y - other.y); if (distance < width * .16) { context.globalAlpha = Math.max(0, 1 - distance / (width * .16)) * .52; context.beginPath(); context.moveTo(point.x, point.y); context.lineTo(other.x, other.y); context.stroke(); } }));
      context.globalAlpha = 1;
      coords.forEach((point, index) => { const source = points[index]; const pulse = source.size > 2 ? 1 + Math.sin(time + source.phase) * .35 : 1; context.fillStyle = source.size > 2 ? "#E7EEEE" : "#6FA7B2"; context.beginPath(); context.arc(point.x, point.y, source.size * pulse, 0, Math.PI * 2); context.fill(); if (source.size > 2) { context.strokeStyle = "rgba(143,184,194,.25)"; context.beginPath(); context.arc(point.x, point.y, 9 + pulse * 3, 0, Math.PI * 2); context.stroke(); } });
      frame += 1; if (!reduced) animation = requestAnimationFrame(draw);
    };
    const onMove = (event: PointerEvent) => { const rect = canvas.getBoundingClientRect(); pointer = { x: (event.clientX - rect.left) / rect.width - .5, y: (event.clientY - rect.top) / rect.height - .5 }; };
    resize(); draw(); window.addEventListener("resize", resize); canvas.addEventListener("pointermove", onMove);
    return () => { cancelAnimationFrame(animation); window.removeEventListener("resize", resize); canvas.removeEventListener("pointermove", onMove); };
  }, []);

  return <canvas ref={canvasRef} className="network-hero-canvas" aria-hidden="true" />;
}
