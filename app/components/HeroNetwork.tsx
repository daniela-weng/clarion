"use client";

import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";
import * as THREE from "three";

const networkNodes = [
  { short: "Y", label: "Yale University", note: "Coordinating center", vector: [0.32, -0.02, 1], side: "right", yale: true },
  { short: "UMN", label: "Minnesota", note: "", vector: [-0.55, 0.72, 0.35], side: "left", yale: false },
  { short: "IU", label: "Indiana", note: "", vector: [-0.92, 0.05, 0.22], side: "left", yale: false },
  { short: "UCI", label: "UC Irvine", note: "", vector: [-0.52, -0.75, 0.4], side: "left", yale: false },
  { short: "COL", label: "Columbia", note: "", vector: [0.52, 0.73, 0.43], side: "right", yale: false },
  { short: "COR", label: "Cornell", note: "", vector: [0.92, 0.08, 0.23], side: "right", yale: false },
  { short: "UF", label: "Florida", note: "", vector: [0.46, -0.76, 0.45], side: "right", yale: false },
] as const;

type FlowParticle = {
  curve: THREE.QuadraticBezierCurve3;
  mesh: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>;
  offset: number;
  speed: number;
};

function seeded(index: number, salt: number) {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function pointOnSphere(radius: number, azimuth: number, polar: number) {
  return new THREE.Vector3(
    radius * Math.sin(polar) * Math.cos(azimuth),
    radius * Math.cos(polar),
    radius * Math.sin(polar) * Math.sin(azimuth),
  );
}

export function HeroNetwork() {
  const fieldRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const field = fieldRef.current;
    const canvas = canvasRef.current;
    if (!field || !canvas) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(39, 1, 0.1, 40);
    camera.position.set(0, 0, 8.6);
    camera.lookAt(0, 0, 0);

    const globe = new THREE.Group();
    globe.rotation.x = -0.04;
    scene.add(globe);

    scene.add(new THREE.HemisphereLight(0xd7f7f5, 0x06111d, 1.75));
    const keyLight = new THREE.DirectionalLight(0xd9fbfa, 3.1);
    keyLight.position.set(-3.2, 4.6, 6.5);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(0x4fb7cb, 10, 13, 2);
    rimLight.position.set(3.6, -1.2, 4.5);
    scene.add(rimLight);

    const sphereRadius = 2.08;
    const innerSphere = new THREE.Mesh(
      new THREE.SphereGeometry(sphereRadius * 0.985, 36, 24),
      new THREE.MeshBasicMaterial({ color: 0x102637, transparent: true, opacity: 0.13, depthWrite: false }),
    );
    globe.add(innerSphere);

    const flowColors = [0x61c9da, 0x428fc8, 0x7ab6c0, 0x92d8df];
    const flowParticles: FlowParticle[] = [];
    for (let index = 0; index < 68; index += 1) {
      const startAzimuth = seeded(index, 1) * Math.PI * 2;
      const startPolar = 0.16 + seeded(index, 2) * (Math.PI - 0.32);
      const direction = index % 2 === 0 ? 1 : -1;
      const endAzimuth = startAzimuth + direction * (0.38 + seeded(index, 3) * 1.02);
      const endPolar = THREE.MathUtils.clamp(startPolar + (seeded(index, 4) - 0.5) * 0.92, 0.14, Math.PI - 0.14);
      const start = pointOnSphere(sphereRadius, startAzimuth, startPolar);
      const end = pointOnSphere(sphereRadius, endAzimuth, endPolar);
      const control = start.clone().add(end).normalize().multiplyScalar(sphereRadius * (1.07 + seeded(index, 5) * 0.1));
      const curve = new THREE.QuadraticBezierCurve3(start, control, end);
      const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(42));
      const material = new THREE.LineBasicMaterial({
        color: flowColors[index % flowColors.length],
        transparent: true,
        opacity: 0.11 + seeded(index, 6) * 0.2,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      globe.add(new THREE.Line(geometry, material));

      if (index % 11 === 0) {
        const particle = new THREE.Mesh(
          new THREE.SphereGeometry(index % 22 === 0 ? 0.028 : 0.02, 8, 8),
          new THREE.MeshBasicMaterial({ color: 0xcaf4f3, transparent: true, opacity: 0.8 }),
        );
        particle.position.copy(start);
        globe.add(particle);
        flowParticles.push({ curve, mesh: particle, offset: seeded(index, 7), speed: 0.025 + seeded(index, 8) * 0.022 });
      }
    }

    const dustPositions: number[] = [];
    for (let index = 0; index < 150; index += 1) {
      const y = 1 - (index / 149) * 2;
      const radial = Math.sqrt(1 - y * y);
      const angle = index * 2.39996;
      const radius = sphereRadius * (0.985 + seeded(index, 9) * 0.045);
      dustPositions.push(Math.cos(angle) * radial * radius, y * radius, Math.sin(angle) * radial * radius);
    }
    const dustGeometry = new THREE.BufferGeometry();
    dustGeometry.setAttribute("position", new THREE.Float32BufferAttribute(dustPositions, 3));
    const dust = new THREE.Points(
      dustGeometry,
      new THREE.PointsMaterial({ color: 0xb4dfe2, size: 0.023, transparent: true, opacity: 0.38, depthWrite: false }),
    );
    globe.add(dust);

    const nodeMeshes: THREE.Mesh[] = [];
    networkNodes.forEach((entry, index) => {
      const radius = entry.yale ? 0.17 : 0.115;
      const geometry = new THREE.IcosahedronGeometry(radius, 1);
      const material = new THREE.MeshStandardMaterial({
        color: entry.yale ? 0xe2f2ef : 0x6eb3c0,
        emissive: entry.yale ? 0x3d7982 : 0x163b47,
        emissiveIntensity: entry.yale ? 0.62 : 0.36,
        flatShading: true,
        metalness: 0.08,
        roughness: 0.34,
      });
      const node = new THREE.Mesh(geometry, material);
      node.position.copy(new THREE.Vector3(...entry.vector).normalize().multiplyScalar(sphereRadius * 1.015));
      node.rotation.set(index * 0.31, index * 0.47, index * 0.19);
      globe.add(node);

      const halo = new THREE.Mesh(
        new THREE.SphereGeometry(radius * (entry.yale ? 1.9 : 1.65), 14, 10),
        new THREE.MeshBasicMaterial({
          color: entry.yale ? 0xc7eeea : 0x6fc0cc,
          transparent: true,
          opacity: entry.yale ? 0.11 : 0.045,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        }),
      );
      node.add(halo);
      nodeMeshes.push(node);
    });

    let width = 1;
    let height = 1;
    let frame = 0;
    const temporaryPosition = new THREE.Vector3();

    const placeLabel = (element: HTMLDivElement | null, object: THREE.Object3D, isYale: boolean) => {
      if (!element) return;
      object.getWorldPosition(temporaryPosition);
      const depth = temporaryPosition.z;
      temporaryPosition.project(camera);
      element.style.left = `${(temporaryPosition.x * 0.5 + 0.5) * width}px`;
      element.style.top = `${(-temporaryPosition.y * 0.5 + 0.5) * height}px`;
      const opacity = isYale ? 1 : THREE.MathUtils.clamp(0.34 + ((depth + sphereRadius) / (sphereRadius * 2)) * 0.55, 0.3, 0.82);
      element.style.setProperty("--network-label-opacity", `${opacity}`);
    };

    const render = (time: number) => {
      const seconds = time * 0.001;
      const idleY = reducedMotion ? 0 : Math.sin(seconds * 0.16) * 0.065;
      const idleX = reducedMotion ? -0.04 : -0.04 + Math.cos(seconds * 0.13) * 0.022;
      const targetY = pointerRef.current.x * 0.11 + idleY;
      const targetX = pointerRef.current.y * -0.065 + idleX;
      globe.rotation.y += (targetY - globe.rotation.y) * 0.028;
      globe.rotation.x += (targetX - globe.rotation.x) * 0.028;

      if (!reducedMotion) {
        nodeMeshes.forEach((node, index) => {
          node.rotation.y += 0.0013 + index * 0.00005;
          node.rotation.x += 0.00055;
        });
        flowParticles.forEach((particle) => {
          const progress = (seconds * particle.speed + particle.offset) % 1;
          particle.mesh.position.copy(particle.curve.getPoint(progress));
          const pulse = 0.82 + Math.sin(seconds * 1.8 + particle.offset * 5) * 0.18;
          particle.mesh.scale.setScalar(pulse);
        });
      }

      scene.updateMatrixWorld(true);
      nodeMeshes.forEach((node, index) => placeLabel(labelRefs.current[index], node, Boolean(networkNodes[index].yale)));
      renderer.render(scene, camera);
      if (!reducedMotion) frame = requestAnimationFrame(render);
    };

    const resize = () => {
      const bounds = field.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.65));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.position.z = width < 520 ? 9.6 : 8.6;
      camera.updateProjectionMatrix();
      if (reducedMotion) requestAnimationFrame(() => render(0));
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(field);
    render(0);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      scene.traverse((object) => {
        const mesh = object as THREE.Mesh;
        mesh.geometry?.dispose?.();
        const materials = Array.isArray(mesh.material) ? mesh.material : mesh.material ? [mesh.material] : [];
        materials.forEach((material) => material.dispose());
      });
      renderer.dispose();
      renderer.forceContextLoss();
    };
  }, []);

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const bounds = event.currentTarget.getBoundingClientRect();
    pointerRef.current = {
      x: THREE.MathUtils.clamp(((event.clientX - bounds.left) / bounds.width - 0.5) * 2, -1, 1),
      y: THREE.MathUtils.clamp(((event.clientY - bounds.top) / bounds.height - 0.5) * 2, -1, 1),
    };
  };

  const handlePointerLeave = () => {
    pointerRef.current = { x: 0, y: 0 };
  };

  return (
    <div
      className="hero-network hero-network-3d hero-network-sphere"
      role="img"
      aria-label="A federated data sphere showing Yale University coordinating research across six participating academic institutions"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="hero-network-field" ref={fieldRef} aria-hidden="true">
        <canvas ref={canvasRef} className="hero-network-canvas" />
        {networkNodes.map((entry, index) => (
          <div
            className={`hero-network-label${entry.yale ? " hero-network-label-yale" : ""}`}
            data-side={entry.side}
            data-yale={entry.yale ? "true" : undefined}
            key={entry.short}
            ref={(element) => { labelRefs.current[index] = element; }}
          >
            {entry.yale ? (
              <><strong>{entry.label}</strong><small>{entry.note}</small></>
            ) : (
              <><b>{entry.short}</b><span>{entry.label}</span></>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
