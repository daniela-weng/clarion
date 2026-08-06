"use client";

import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";
import * as THREE from "three";

const institutions = [
  { short: "UMN", label: "Minnesota", position: [-2.65, 1.75, -0.65], side: "left" },
  { short: "IU", label: "Indiana", position: [-3.05, 0.18, 0.32], side: "left" },
  { short: "UCI", label: "UC Irvine", position: [-2.45, -1.72, -0.12], side: "left" },
  { short: "COL", label: "Columbia", position: [2.58, 1.62, -0.28], side: "right" },
  { short: "COR", label: "Cornell", position: [3.02, 0.1, 0.52], side: "right" },
  { short: "UF", label: "Florida", position: [2.38, -1.75, -0.58], side: "right" },
] as const;

type Route = {
  curve: THREE.QuadraticBezierCurve3;
  particle?: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>;
  offset: number;
};

export function HeroNetwork() {
  const fieldRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelRefs = useRef<Array<HTMLDivElement | null>>([]);
  const yaleLabelRef = useRef<HTMLDivElement>(null);
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
    renderer.toneMappingExposure = 1.05;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 40);
    camera.position.set(0, 0, 9.8);
    camera.lookAt(0, 0, 0);

    const network = new THREE.Group();
    scene.add(network);

    scene.add(new THREE.HemisphereLight(0xcceff2, 0x07111c, 1.9));
    const keyLight = new THREE.DirectionalLight(0xdaf8f8, 3.4);
    keyLight.position.set(-3.5, 5, 7);
    scene.add(keyLight);
    const rimLight = new THREE.PointLight(0x68b8c7, 12, 16, 2);
    rimLight.position.set(4, -1.5, 4);
    scene.add(rimLight);

    const hubGeometry = new THREE.IcosahedronGeometry(0.72, 2);
    const hubMaterial = new THREE.MeshStandardMaterial({
      color: 0x8fc6cf,
      emissive: 0x123744,
      emissiveIntensity: 0.34,
      flatShading: true,
      metalness: 0.16,
      roughness: 0.34,
    });
    const hub = new THREE.Mesh(hubGeometry, hubMaterial);
    hub.position.z = 0.38;
    network.add(hub);

    const hubEdges = new THREE.LineSegments(
      new THREE.EdgesGeometry(hubGeometry, 22),
      new THREE.LineBasicMaterial({ color: 0xd8f2f2, transparent: true, opacity: 0.28, depthWrite: false }),
    );
    hub.add(hubEdges);

    const halo = new THREE.Mesh(
      new THREE.IcosahedronGeometry(0.94, 2),
      new THREE.MeshBasicMaterial({ color: 0x7fc4d0, wireframe: true, transparent: true, opacity: 0.065, depthWrite: false }),
    );
    halo.position.copy(hub.position);
    network.add(halo);

    const satelliteGeometry = new THREE.IcosahedronGeometry(0.23, 1);
    const satelliteMaterial = new THREE.MeshStandardMaterial({
      color: 0x4f8e9d,
      emissive: 0x102f3a,
      emissiveIntensity: 0.25,
      flatShading: true,
      metalness: 0.1,
      roughness: 0.43,
    });
    const nodeMeshes: THREE.Mesh[] = [];
    const routes: Route[] = [];

    institutions.forEach((institution, index) => {
      const position = new THREE.Vector3(...institution.position);
      const node = new THREE.Mesh(satelliteGeometry, satelliteMaterial);
      node.position.copy(position);
      node.rotation.set(index * 0.38, index * 0.52, index * 0.19);
      network.add(node);
      nodeMeshes.push(node);

      const direction = position.clone().sub(hub.position).normalize();
      const start = hub.position.clone().add(direction.clone().multiplyScalar(0.72));
      const end = position.clone().sub(direction.clone().multiplyScalar(0.23));
      const control = start.clone().lerp(end, 0.5);
      control.z += index % 2 === 0 ? 0.48 : -0.34;
      control.y += index < 3 ? 0.1 : -0.08;
      const curve = new THREE.QuadraticBezierCurve3(start, control, end);

      const routeGeometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(64));
      const routeMaterial = new THREE.LineBasicMaterial({
        color: index === 1 || index === 4 ? 0xa1d8df : 0x73aeba,
        transparent: true,
        opacity: index === 1 || index === 4 ? 0.68 : 0.4,
        depthWrite: false,
      });
      const line = new THREE.Line(routeGeometry, routeMaterial);
      network.add(line);

      let particle: Route["particle"];
      if (index === 1 || index === 4) {
        particle = new THREE.Mesh(
          new THREE.SphereGeometry(0.045, 12, 12),
          new THREE.MeshBasicMaterial({ color: 0xdaf8f7, transparent: true, opacity: 0.92 }),
        );
        particle.position.copy(start);
        network.add(particle);
      }
      routes.push({ curve, particle, offset: index === 4 ? 0.48 : 0 });
    });

    const dustPositions: number[] = [];
    for (let index = 0; index < 46; index += 1) {
      const angle = index * 2.39996;
      const radius = 1.1 + ((index * 37) % 100) / 42;
      dustPositions.push(Math.cos(angle) * radius, Math.sin(angle) * radius * 0.72, -0.9 - (index % 7) * 0.08);
    }
    const dustGeometry = new THREE.BufferGeometry();
    dustGeometry.setAttribute("position", new THREE.Float32BufferAttribute(dustPositions, 3));
    const dust = new THREE.Points(
      dustGeometry,
      new THREE.PointsMaterial({ color: 0x91bdc5, size: 0.025, transparent: true, opacity: 0.22, depthWrite: false }),
    );
    network.add(dust);

    let width = 1;
    let height = 1;
    let frame = 0;
    const resize = () => {
      const bounds = field.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.position.z = width < 520 ? 10.8 : 9.8;
      camera.updateProjectionMatrix();
    };

    const placeLabel = (element: HTMLDivElement | null, object: THREE.Object3D) => {
      if (!element) return;
      const projected = object.getWorldPosition(new THREE.Vector3()).project(camera);
      element.style.left = `${(projected.x * 0.5 + 0.5) * width}px`;
      element.style.top = `${(-projected.y * 0.5 + 0.5) * height}px`;
      element.style.opacity = `${THREE.MathUtils.clamp(0.72 + projected.z * -0.18, 0.55, 1)}`;
    };

    const render = (time: number) => {
      const seconds = time * 0.001;
      const idleY = reducedMotion ? 0 : Math.sin(seconds * 0.18) * 0.045;
      const idleX = reducedMotion ? 0 : Math.cos(seconds * 0.14) * 0.018;
      const targetY = pointerRef.current.x * 0.12 + idleY;
      const targetX = pointerRef.current.y * -0.075 + idleX;
      network.rotation.y += (targetY - network.rotation.y) * 0.035;
      network.rotation.x += (targetX - network.rotation.x) * 0.035;

      if (!reducedMotion) {
        hub.rotation.y = seconds * 0.075;
        hub.rotation.x = seconds * 0.025;
        halo.rotation.y = seconds * -0.035;
        halo.rotation.z = seconds * 0.022;
        nodeMeshes.forEach((node, index) => {
          node.rotation.y += 0.0015 + index * 0.00008;
          node.rotation.x += 0.0007;
        });
        routes.forEach((route) => {
          if (!route.particle) return;
          const progress = (seconds * 0.065 + route.offset) % 1;
          route.particle.position.copy(route.curve.getPoint(progress));
          const pulse = 0.78 + Math.sin(seconds * 2.2) * 0.14;
          route.particle.scale.setScalar(pulse);
        });
      }

      scene.updateMatrixWorld(true);
      nodeMeshes.forEach((node, index) => placeLabel(labelRefs.current[index], node));
      placeLabel(yaleLabelRef.current, hub);
      renderer.render(scene, camera);
      if (!reducedMotion) frame = requestAnimationFrame(render);
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
      className="hero-network hero-network-3d"
      role="img"
      aria-label="Six participating academic institutions connected to Yale University, the Clarion coordinating center"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="hero-network-field" ref={fieldRef} aria-hidden="true">
        <canvas ref={canvasRef} className="hero-network-canvas" />
        {institutions.map((institution, index) => (
          <div
            className="hero-network-label"
            data-side={institution.side}
            key={institution.short}
            ref={(element) => { labelRefs.current[index] = element; }}
          >
            <b>{institution.short}</b>
            <span>{institution.label}</span>
          </div>
        ))}
        <div className="hero-network-label hero-network-label-yale" ref={yaleLabelRef}>
          <strong>Yale University</strong>
          <small>Coordinating center</small>
        </div>
      </div>
      <p className="hero-network-key"><span /> Approved analyses <i /> Authorized aggregate results</p>
    </div>
  );
}
