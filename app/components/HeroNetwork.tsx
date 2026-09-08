"use client";

import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";
import * as THREE from "three";

type NetworkNode = {
  cluster: number;
  local: THREE.Vector3;
  position: THREE.Vector3;
  phase: number;
  drift: number;
  size: number;
};

type NetworkEdge = {
  from: number;
  to: number;
  bridge: boolean;
};

const clusterSpecs = [
  { center: [-1.18, 1.02, -0.3], radius: 0.75, count: 17, color: 0x76bcc7 },
  { center: [0.08, 1.38, -0.65], radius: 0.64, count: 14, color: 0xa6d5d6 },
  { center: [1.22, 0.9, -0.2], radius: 0.72, count: 18, color: 0x668fae },
  { center: [-0.92, -0.15, 0.05], radius: 0.8, count: 20, color: 0x5fa8b5 },
  { center: [0.36, 0.05, 0.45], radius: 0.94, count: 24, color: 0x91cbd0 },
  { center: [1.2, -0.94, -0.05], radius: 0.68, count: 16, color: 0x6c9eab },
  { center: [-0.3, -1.34, -0.45], radius: 0.72, count: 17, color: 0xc1dcda },
] as const;

const bridgePairs = [[0, 1], [1, 2], [0, 3], [1, 4], [2, 4], [2, 5], [3, 4], [3, 6], [4, 5], [4, 6], [5, 6]] as const;

function seeded(index: number, salt: number) {
  const value = Math.sin(index * 12.9898 + salt * 78.233) * 43758.5453;
  return value - Math.floor(value);
}

function makeGlowTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext("2d");
  if (!context) return new THREE.CanvasTexture(canvas);
  const glow = context.createRadialGradient(64, 64, 0, 64, 64, 58);
  glow.addColorStop(0, "rgba(255,249,226,1)");
  glow.addColorStop(.12, "rgba(255,220,163,.92)");
  glow.addColorStop(.38, "rgba(164,216,218,.32)");
  glow.addColorStop(1, "rgba(70,145,160,0)");
  context.fillStyle = glow;
  context.fillRect(0, 0, 128, 128);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export function HeroNetwork() {
  const fieldRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointerRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const field = fieldRef.current;
    const canvas = canvasRef.current;
    if (!field || !canvas) return;

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true, powerPreference: "high-performance" });
    renderer.setClearColor(0x000000, 0);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.7));

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 30);
    camera.position.set(0, 0, 7.7);
    camera.lookAt(0, 0, 0);

    const network = new THREE.Group();
    network.rotation.x = -0.04;
    network.rotation.z = -0.025;
    scene.add(network);

    const nodes: NetworkNode[] = [];
    const clusterNodeIndices: number[][] = [];
    let nodeSeed = 0;
    clusterSpecs.forEach((spec, clusterIndex) => {
      const indices: number[] = [];
      for (let index = 0; index < spec.count; index += 1) {
        const angle = seeded(nodeSeed, 1) * Math.PI * 2;
        const radial = Math.pow(seeded(nodeSeed, 2), 0.62) * spec.radius;
        const local = new THREE.Vector3(
          Math.cos(angle) * radial,
          Math.sin(angle) * radial * (0.58 + seeded(nodeSeed, 3) * 0.35),
          (seeded(nodeSeed, 4) - 0.5) * 0.75,
        );
        const center = new THREE.Vector3(...spec.center);
        indices.push(nodes.length);
        nodes.push({
          cluster: clusterIndex,
          local,
          position: center.clone().add(local),
          phase: seeded(nodeSeed, 5) * Math.PI * 2,
          drift: 0.42 + seeded(nodeSeed, 6) * 0.75,
          size: index === 0 ? 12 : 3.8 + seeded(nodeSeed, 7) * 5.8,
        });
        nodeSeed += 1;
      }
      clusterNodeIndices.push(indices);
    });

    const edges: NetworkEdge[] = [];
    const edgeKeys = new Set<string>();
    const addEdge = (from: number, to: number, bridge = false) => {
      const key = from < to ? `${from}-${to}` : `${to}-${from}`;
      if (from === to || edgeKeys.has(key)) return;
      edgeKeys.add(key);
      edges.push({ from, to, bridge });
    };

    clusterNodeIndices.forEach((indices) => {
      indices.forEach((nodeIndex, localIndex) => {
        const nearest = indices
          .filter((candidate) => candidate !== nodeIndex)
          .map((candidate) => ({ candidate, distance: nodes[nodeIndex].position.distanceTo(nodes[candidate].position) }))
          .sort((a, b) => a.distance - b.distance)
          .slice(0, localIndex % 4 === 0 ? 3 : 2);
        nearest.forEach(({ candidate }) => addEdge(nodeIndex, candidate));
      });
    });

    bridgePairs.forEach(([fromCluster, toCluster], bridgeIndex) => {
      const fromNodes = clusterNodeIndices[fromCluster];
      const toNodes = clusterNodeIndices[toCluster];
      addEdge(fromNodes[bridgeIndex % Math.min(4, fromNodes.length)], toNodes[(bridgeIndex * 3) % Math.min(5, toNodes.length)], true);
      if (bridgeIndex % 3 === 0) addEdge(fromNodes[0], toNodes[0], true);
    });

    const nodePositions = new Float32Array(nodes.length * 3);
    const nodeColors = new Float32Array(nodes.length * 3);
    const nodeSizes = new Float32Array(nodes.length);
    nodes.forEach((node, index) => {
      const color = new THREE.Color(clusterSpecs[node.cluster].color);
      nodeColors[index * 3] = color.r;
      nodeColors[index * 3 + 1] = color.g;
      nodeColors[index * 3 + 2] = color.b;
      nodeSizes[index] = node.size;
    });
    const nodeGeometry = new THREE.BufferGeometry();
    nodeGeometry.setAttribute("position", new THREE.BufferAttribute(nodePositions, 3));
    nodeGeometry.setAttribute("color", new THREE.BufferAttribute(nodeColors, 3));
    nodeGeometry.setAttribute("aSize", new THREE.BufferAttribute(nodeSizes, 1));
    const nodeMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexColors: true,
      vertexShader: `
        attribute float aSize;
        varying vec3 vColor;
        void main() {
          vColor = color;
          vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = aSize * (5.5 / max(1.0, -viewPosition.z));
          gl_Position = projectionMatrix * viewPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main() {
          float distanceToCenter = distance(gl_PointCoord, vec2(.5));
          float core = smoothstep(.28, 0.0, distanceToCenter);
          float halo = smoothstep(.5, .08, distanceToCenter) * .48;
          float alpha = core + halo;
          if (alpha < .015) discard;
          gl_FragColor = vec4(mix(vColor, vec3(.92, 1.0, .99), core * .65), alpha);
        }
      `,
    });
    network.add(new THREE.Points(nodeGeometry, nodeMaterial));

    const linePositions = new Float32Array(edges.length * 6);
    const lineColors = new Float32Array(edges.length * 6);
    edges.forEach((edge, index) => {
      const fromColor = new THREE.Color(clusterSpecs[nodes[edge.from].cluster].color);
      const toColor = new THREE.Color(clusterSpecs[nodes[edge.to].cluster].color);
      const strength = edge.bridge ? 0.95 : 0.68;
      lineColors.set([fromColor.r * strength, fromColor.g * strength, fromColor.b * strength], index * 6);
      lineColors.set([toColor.r * strength, toColor.g * strength, toColor.b * strength], index * 6 + 3);
    });
    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute("position", new THREE.BufferAttribute(linePositions, 3));
    lineGeometry.setAttribute("color", new THREE.BufferAttribute(lineColors, 3));
    const lineMaterial = new THREE.LineBasicMaterial({
      vertexColors: true,
      transparent: true,
      opacity: 0.28,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    network.add(new THREE.LineSegments(lineGeometry, lineMaterial));

    const glowTexture = makeGlowTexture();
    const hubs: THREE.Sprite[] = [];
    clusterNodeIndices.forEach((indices, index) => {
      const hub = new THREE.Sprite(new THREE.SpriteMaterial({
        map: glowTexture,
        color: index % 3 === 0 ? 0xffd9a0 : clusterSpecs[index].color,
        transparent: true,
        opacity: 0.52,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }));
      hub.position.copy(nodes[indices[0]].position);
      hub.scale.set(0.34, 0.34, 1);
      hub.userData.phase = index * 1.24;
      network.add(hub);
      hubs.push(hub);
    });

    const signalEdges = edges.filter((edge, index) => edge.bridge || index % 19 === 0).slice(0, 18);
    const signals = signalEdges.map((edge, index) => {
      const signal = new THREE.Sprite(new THREE.SpriteMaterial({
        map: glowTexture,
        color: index % 4 === 0 ? 0xffd18a : 0xdffefe,
        transparent: true,
        opacity: 0.88,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      }));
      const scale = index % 4 === 0 ? 0.17 : 0.12;
      signal.scale.set(scale, scale, 1);
      network.add(signal);
      return { sprite: signal, edge, offset: seeded(index, 24), speed: 0.06 + seeded(index, 25) * 0.045 };
    });

    const dustPositions = new Float32Array(85 * 3);
    for (let index = 0; index < 85; index += 1) {
      dustPositions[index * 3] = (seeded(index, 31) - 0.5) * 4.8;
      dustPositions[index * 3 + 1] = (seeded(index, 32) - 0.5) * 3.8;
      dustPositions[index * 3 + 2] = -0.9 - seeded(index, 33) * 1.5;
    }
    const dustGeometry = new THREE.BufferGeometry();
    dustGeometry.setAttribute("position", new THREE.BufferAttribute(dustPositions, 3));
    network.add(new THREE.Points(dustGeometry, new THREE.PointsMaterial({
      color: 0x8bbfc5,
      size: 0.018,
      transparent: true,
      opacity: 0.27,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    })));

    let width = 1;
    let height = 1;
    let frame = 0;
    const updateGeometry = (seconds: number) => {
      nodes.forEach((node, index) => {
        const spec = clusterSpecs[node.cluster];
        const center = new THREE.Vector3(...spec.center);
        const expansion = 1 + Math.sin(seconds * 0.22 + node.cluster * 0.75) * 0.055;
        const driftX = Math.sin(seconds * node.drift * 0.24 + node.phase) * 0.035;
        const driftY = Math.cos(seconds * node.drift * 0.2 + node.phase * 1.3) * 0.03;
        node.position.copy(center).addScaledVector(node.local, expansion);
        node.position.x += driftX;
        node.position.y += driftY;
        node.position.z += Math.sin(seconds * 0.17 + node.phase) * 0.025;
        nodePositions[index * 3] = node.position.x;
        nodePositions[index * 3 + 1] = node.position.y;
        nodePositions[index * 3 + 2] = node.position.z;
      });
      (nodeGeometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;

      edges.forEach((edge, index) => {
        const from = nodes[edge.from].position;
        const to = nodes[edge.to].position;
        linePositions.set([from.x, from.y, from.z, to.x, to.y, to.z], index * 6);
      });
      (lineGeometry.attributes.position as THREE.BufferAttribute).needsUpdate = true;
    };

    const render = (time: number) => {
      const seconds = time * 0.001;
      updateGeometry(seconds);
      const pointerX = pointerRef.current.x;
      const pointerY = pointerRef.current.y;
      network.rotation.y += (pointerX * 0.075 - network.rotation.y) * 0.025;
      network.rotation.x += (-0.04 - pointerY * 0.04 - network.rotation.x) * 0.025;
      network.position.x += (pointerX * 0.06 - network.position.x) * 0.022;

      hubs.forEach((hub, index) => {
        hub.position.copy(nodes[clusterNodeIndices[index][0]].position);
        const wave = 0.88 + Math.sin(seconds * 1.05 + hub.userData.phase) * 0.18;
        hub.scale.set(0.34 * wave, 0.34 * wave, 1);
        (hub.material as THREE.SpriteMaterial).opacity = 0.34 + wave * 0.2;
      });
      signals.forEach((signal) => {
        const progress = (signal.offset + seconds * signal.speed) % 1;
        const from = nodes[signal.edge.from].position;
        const to = nodes[signal.edge.to].position;
        const eased = progress * progress * (3 - 2 * progress);
        signal.sprite.position.lerpVectors(from, to, eased);
        (signal.sprite.material as THREE.SpriteMaterial).opacity = Math.sin(progress * Math.PI) * 0.9;
      });

      lineMaterial.opacity = 0.24 + Math.sin(seconds * 0.45) * 0.045;
      renderer.render(scene, camera);
      if (!reducedMotion) frame = requestAnimationFrame(render);
    };

    const resize = () => {
      const bounds = field.getBoundingClientRect();
      width = Math.max(1, bounds.width);
      height = Math.max(1, bounds.height);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.position.z = width < 520 ? 8.35 : 7.7;
      camera.updateProjectionMatrix();
      if (reducedMotion) render(0);
    };

    const observer = new ResizeObserver(resize);
    observer.observe(field);
    resize();
    if (!reducedMotion) frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      scene.traverse((object) => {
        const renderable = object as THREE.Mesh;
        renderable.geometry?.dispose?.();
        const materials = Array.isArray(renderable.material) ? renderable.material : renderable.material ? [renderable.material] : [];
        materials.forEach((material) => material.dispose());
      });
      glowTexture.dispose();
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
      className="hero-network hero-network-3d hero-network-cloud"
      role="img"
      aria-label="Animated network of connected research clusters"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <div className="hero-network-field" ref={fieldRef} aria-hidden="true">
        <canvas ref={canvasRef} className="hero-network-canvas" />
      </div>
    </div>
  );
}
