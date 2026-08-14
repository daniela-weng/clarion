"use client";

import { useEffect, useRef, type PointerEvent as ReactPointerEvent } from "react";
import * as THREE from "three";

const networkNodes = [
  { short: "YALE", label: "Yale University", note: "Coordinating center", vector: [0, 0, 1], side: "right", yale: true },
  { short: "UMN", label: "University of Minnesota", note: "", vector: [-0.55, 0.72, 0.35], side: "left", yale: false },
  { short: "IU", label: "Indiana University", note: "", vector: [-0.92, 0.05, 0.22], side: "left", yale: false },
  { short: "UCI", label: "University of California, Irvine", note: "", vector: [-0.52, -0.75, 0.4], side: "left", yale: false },
  { short: "COL", label: "Columbia University", note: "", vector: [0.52, 0.73, 0.43], side: "right", yale: false },
  { short: "COR", label: "Cornell University", note: "", vector: [0.92, 0.08, 0.23], side: "right", yale: false },
  { short: "UF", label: "University of Florida", note: "", vector: [0.46, -0.76, 0.45], side: "right", yale: false },
] as const;

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

class OrbitalArcCurve extends THREE.Curve<THREE.Vector3> {
  constructor(
    private readonly center: THREE.Vector3,
    private readonly basisU: THREE.Vector3,
    private readonly basisV: THREE.Vector3,
    private readonly centerAngle: number,
    private readonly signedSpan: number,
    private readonly radius: number,
  ) {
    super();
  }

  override getPoint(t: number, target = new THREE.Vector3()) {
    const angle = this.centerAngle + (t - 0.5) * this.signedSpan;
    return target.copy(this.center)
      .addScaledVector(this.basisU, Math.cos(angle) * this.radius)
      .addScaledVector(this.basisV, Math.sin(angle) * this.radius);
  }
}

function createMarkerTexture(isYale: boolean) {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext("2d");
  if (!context) return new THREE.CanvasTexture(canvas);

  const halo = context.createRadialGradient(64, 64, 0, 64, 64, isYale ? 34 : 25);
  halo.addColorStop(0, "rgba(255,248,226,1)");
  halo.addColorStop(.18, "rgba(255,216,153,.88)");
  halo.addColorStop(.48, "rgba(222,163,91,.28)");
  halo.addColorStop(1, "rgba(204,139,67,0)");
  context.fillStyle = halo;
  context.fillRect(0, 0, 128, 128);

  context.fillStyle = "rgba(255,232,190,1)";
  context.beginPath();
  context.arc(64, 64, isYale ? 6 : 4.5, 0, Math.PI * 2);
  context.fill();

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
}

function createPulseTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext("2d");
  if (!context) return new THREE.CanvasTexture(canvas);

  const halo = context.createRadialGradient(64, 64, 1, 64, 64, 46);
  halo.addColorStop(0, "rgba(255,240,205,.78)");
  halo.addColorStop(.18, "rgba(255,208,137,.52)");
  halo.addColorStop(.52, "rgba(222,163,91,.2)");
  halo.addColorStop(1, "rgba(204,139,67,0)");
  context.fillStyle = halo;
  context.fillRect(0, 0, 128, 128);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.minFilter = THREE.LinearFilter;
  texture.magFilter = THREE.LinearFilter;
  texture.needsUpdate = true;
  return texture;
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
    const surfaceRadius = sphereRadius * 1.008;
    const innerSphere = new THREE.Mesh(
      new THREE.SphereGeometry(sphereRadius * 0.985, 36, 24),
      new THREE.MeshBasicMaterial({ color: 0x102637, transparent: true, opacity: 0.13, depthWrite: false }),
    );
    globe.add(innerSphere);

    const rimSphere = new THREE.Mesh(
      new THREE.SphereGeometry(sphereRadius * 1.012, 56, 36),
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
        vertexShader: `
          varying float vFresnel;
          void main() {
            vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
            vec3 viewNormal = normalize(normalMatrix * normal);
            vec3 viewDirection = normalize(-viewPosition.xyz);
            vFresnel = pow(1.0 - abs(dot(viewNormal, viewDirection)), 3.3);
            gl_Position = projectionMatrix * viewPosition;
          }
        `,
        fragmentShader: `
          varying float vFresnel;
          void main() {
            gl_FragColor = vec4(vec3(0.48, 0.73, 0.77), vFresnel * 0.13);
          }
        `,
      }),
    );
    globe.add(rimSphere);

    const flowColors = [0x78b9c4, 0xa5d2d5];
    const dataPoints: Array<{
      marker: THREE.Mesh;
      curve: THREE.Curve<THREE.Vector3>;
      offset: number;
      speed: number;
    }> = [];

    // One intentional surface route passes directly through Yale so the
    // coordinating node reads as part of the network rather than floating over it.
    const yaleSurfacePoint = new THREE.Vector3(0, 0, surfaceRadius);
    const yaleRouteNormal = new THREE.Vector3(0.68, -0.4, 0.61).normalize();
    const yalePlaneOffset = yaleRouteNormal.dot(yaleSurfacePoint);
    const yaleRouteCenter = yaleRouteNormal.clone().multiplyScalar(yalePlaneOffset);
    const yaleRouteRadius = Math.sqrt(surfaceRadius * surfaceRadius - yalePlaneOffset * yalePlaneOffset);
    const yaleRouteU = yaleSurfacePoint.clone().sub(yaleRouteCenter).normalize();
    const yaleRouteV = new THREE.Vector3().crossVectors(yaleRouteNormal, yaleRouteU).normalize();
    const yaleRoute = new OrbitalArcCurve(
      yaleRouteCenter,
      yaleRouteU,
      yaleRouteV,
      0,
      Math.PI * 1.34,
      yaleRouteRadius,
    );
    const yaleRouteGeometry = new THREE.TubeGeometry(yaleRoute, 64, 0.0065, 5, false);
    const yaleRouteMaterial = new THREE.MeshBasicMaterial({
      color: 0x9bcbd0,
      transparent: true,
      opacity: 0.28,
      blending: THREE.NormalBlending,
      depthWrite: false,
    });
    globe.add(new THREE.Mesh(yaleRouteGeometry, yaleRouteMaterial));

    for (let index = 0; index < 42; index += 1) {
      const layer = index < 7 ? "foreground" : index < 28 ? "midground" : "background";
      const emphasized = layer === "foreground";
      const normalAzimuth = seeded(index, 1) * Math.PI * 2;
      const normalSign = seeded(index, 4) > 0.5 ? 1 : -1;
      const normalZ = normalSign * (0.24 + seeded(index, 5) * 0.54);
      const normalRadial = Math.sqrt(1 - normalZ * normalZ);
      const planeNormal = new THREE.Vector3(
        Math.cos(normalAzimuth) * normalRadial,
        Math.sin(normalAzimuth) * normalRadial,
        normalZ,
      ).normalize();
      const helper = Math.abs(planeNormal.y) > 0.88
        ? new THREE.Vector3(1, 0, 0)
        : new THREE.Vector3(0, 1, 0);
      const basisU = new THREE.Vector3().crossVectors(planeNormal, helper).normalize();
      const basisV = new THREE.Vector3().crossVectors(planeNormal, basisU).normalize();
      const frontAngle = Math.atan2(basisV.z, basisU.z);
      const planeOffset = (seeded(index, 8) - 0.5) * surfaceRadius * 1.18;
      const orbitRadius = Math.sqrt(surfaceRadius * surfaceRadius - planeOffset * planeOffset);
      const orbitCenter = planeNormal.clone().multiplyScalar(planeOffset);
      const span = Math.PI * (1.02 + seeded(index, 3) * 0.27);
      const direction = index % 2 === 0 ? 1 : -1;
      const curve: THREE.Curve<THREE.Vector3> = new OrbitalArcCurve(
        orbitCenter,
        basisU,
        basisV,
        frontAngle,
        span * direction,
        orbitRadius,
      );
      const geometry = new THREE.BufferGeometry().setFromPoints(curve.getPoints(56));
      const material = new THREE.ShaderMaterial({
        uniforms: {
          uColor: { value: new THREE.Color(flowColors[index % flowColors.length]) },
          uOpacity: { value: layer === "foreground"
            ? 0.24 + seeded(index, 6) * 0.09
            : layer === "midground"
              ? 0.105 + seeded(index, 6) * 0.065
              : 0.04 + seeded(index, 6) * 0.035 },
        },
        transparent: true,
        blending: THREE.NormalBlending,
        depthWrite: false,
        vertexShader: `
          varying float vFacing;
          void main() {
            vec4 viewPosition = modelViewMatrix * vec4(position, 1.0);
            vec3 sphereNormal = normalize(normalMatrix * normalize(position));
            vec3 viewDirection = normalize(-viewPosition.xyz);
            vFacing = dot(sphereNormal, viewDirection);
            gl_Position = projectionMatrix * viewPosition;
          }
        `,
        fragmentShader: `
          uniform vec3 uColor;
          uniform float uOpacity;
          varying float vFacing;
          void main() {
            float depthFade = mix(0.22, 1.0, smoothstep(-0.35, 0.58, vFacing));
            gl_FragColor = vec4(uColor, uOpacity * depthFade);
          }
        `,
      });
      globe.add(new THREE.Line(geometry, material));

      const baseRadius = layer === "foreground"
        ? 0.004 + seeded(index, 16) * 0.0025
        : layer === "midground"
          ? 0.0022 + seeded(index, 16) * 0.002
          : 0.0015 + seeded(index, 16) * 0.0013;
      const baseTubeGeometry = new THREE.TubeGeometry(curve, 58, baseRadius, 4, false);
      const baseTubeMaterial = new THREE.MeshBasicMaterial({
        color: flowColors[index % flowColors.length],
        transparent: true,
        opacity: layer === "foreground"
          ? 0.12 + seeded(index, 17) * 0.055
          : layer === "midground"
            ? 0.055 + seeded(index, 17) * 0.04
            : 0.025 + seeded(index, 17) * 0.025,
        blending: THREE.NormalBlending,
        depthWrite: false,
      });
      globe.add(new THREE.Mesh(baseTubeGeometry, baseTubeMaterial));

      if (emphasized) {
        const glowGeometry = new THREE.TubeGeometry(curve, 58, 0.014, 5, false);
        const glowMaterial = new THREE.MeshBasicMaterial({
          color: flowColors[index % flowColors.length],
          transparent: true,
          opacity: 0.026,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
        });
        globe.add(new THREE.Mesh(glowGeometry, glowMaterial));

        const emphasisGeometry = new THREE.TubeGeometry(curve, 58, 0.006 + seeded(index, 20) * 0.0025, 5, false);
        const emphasisMaterial = new THREE.MeshBasicMaterial({
          color: flowColors[index % flowColors.length],
          transparent: true,
          opacity: 0.25,
          blending: THREE.NormalBlending,
          depthWrite: false,
        });
        globe.add(new THREE.Mesh(emphasisGeometry, emphasisMaterial));
      }

      if (index % 4 === 1) {
        const dataPoint = new THREE.Mesh(
          new THREE.SphereGeometry(layer === "foreground" ? 0.026 : 0.019, 10, 10),
          new THREE.MeshBasicMaterial({
            color: layer === "background" ? 0x8eb9bf : 0xd7eeee,
            transparent: true,
            opacity: layer === "background" ? 0.42 : 0.72,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
          }),
        );
        const offset = seeded(index, 28);
        dataPoint.position.copy(curve.getPoint(offset));
        globe.add(dataPoint);
        dataPoints.push({
          marker: dataPoint,
          curve,
          offset,
          speed: 0.004 + seeded(index, 29) * 0.003,
        });
      }

    }

    const memberMarkerTexture = createMarkerTexture(false);
    const yaleMarkerTexture = createMarkerTexture(true);
    const pulseTexture = createPulseTexture();
    const memberMarkerMaterial = new THREE.SpriteMaterial({
      map: memberMarkerTexture,
      color: 0xffffff,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const yaleMarkerMaterial = new THREE.SpriteMaterial({
      map: yaleMarkerTexture,
      color: 0xffffff,
      transparent: true,
      opacity: 1,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const pulseMaterial = new THREE.SpriteMaterial({
      map: pulseTexture,
      color: 0xffe0a8,
      transparent: true,
      opacity: 0.1,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const nodeMarkers: THREE.Sprite[] = [];
    const haloMarkers: THREE.Sprite[] = [];
    networkNodes.forEach((entry, index) => {
      const markerMaterial = (entry.yale ? yaleMarkerMaterial : memberMarkerMaterial).clone();
      markerMaterial.opacity = entry.yale ? 1 : 0.82;
      const marker = new THREE.Sprite(markerMaterial);
      marker.position.copy(new THREE.Vector3(...entry.vector).normalize().multiplyScalar(surfaceRadius));
      const scale = entry.yale ? 0.47 : 0.38;
      marker.scale.set(scale, scale, 1);
      marker.userData.baseScale = scale;
      marker.userData.phase = index * 1.17;
      marker.userData.yale = entry.yale;

      const halo = new THREE.Sprite(pulseMaterial.clone());
      halo.position.copy(marker.position);
      halo.scale.set(scale * (entry.yale ? 1.2 : 1.1), scale * (entry.yale ? 1.2 : 1.1), 1);
      halo.userData.baseScale = scale;
      halo.userData.phase = index * 1.17;
      halo.userData.yale = entry.yale;
      halo.renderOrder = 1;
      marker.renderOrder = 2;
      globe.add(halo);
      globe.add(marker);
      haloMarkers.push(halo);
      nodeMarkers.push(marker);
    });

    let width = 1;
    let height = 1;
    let frame = 0;
    const temporaryPosition = new THREE.Vector3();

    const placeLabel = (element: HTMLDivElement | null, object: THREE.Object3D, isYale: boolean) => {
      if (!element) return;
      object.getWorldPosition(temporaryPosition);
      temporaryPosition.project(camera);
      element.style.left = `${(temporaryPosition.x * 0.5 + 0.5) * width}px`;
      element.style.top = `${(-temporaryPosition.y * 0.5 + 0.5) * height}px`;
      const opacity = isYale ? 1 : 0.86;
      element.style.setProperty("--network-label-opacity", `${opacity}`);
    };

    const render = (time: number) => {
      const seconds = time * 0.001;
      const idleY = reducedMotion ? 0 : Math.sin(seconds * 0.11) * 0.04;
      const idleX = reducedMotion ? -0.04 : -0.04 + Math.cos(seconds * 0.09) * 0.016;
      const targetY = pointerRef.current.x * 0.07 + idleY;
      const targetX = pointerRef.current.y * -0.04 + idleX;
      globe.rotation.y += (targetY - globe.rotation.y) * 0.022;
      globe.rotation.x += (targetX - globe.rotation.x) * 0.022;

      if (!reducedMotion) {
        dataPoints.forEach((dataPoint) => {
          const progress = (dataPoint.offset + seconds * dataPoint.speed) % 1;
          dataPoint.marker.position.copy(dataPoint.curve.getPoint(progress));
        });
        nodeMarkers.forEach((marker, index) => {
          const isYale = Boolean(marker.userData.yale);
          const speed = isYale ? 1.58 : 2.05;
          const wave = Math.pow((Math.sin(seconds * speed + marker.userData.phase) + 1) * 0.5, isYale ? 1.15 : 1.35);
          const pulse = isYale ? 0.96 + wave * 0.16 : 0.92 + wave * 0.18;
          const scale = marker.userData.baseScale * pulse;
          marker.scale.set(scale, scale, 1);
          const material = marker.material as THREE.SpriteMaterial;
          material.opacity = isYale ? 0.7 + wave * 0.3 : 0.56 + wave * 0.44;

          const halo = haloMarkers[index];
          const haloScale = marker.userData.baseScale * (isYale ? 1.12 + wave * 0.92 : 1.02 + wave * 0.78);
          halo.scale.set(haloScale, haloScale, 1);
          (halo.material as THREE.SpriteMaterial).opacity = isYale ? 0.06 + wave * 0.78 : 0.04 + wave * 0.72;
        });
      }

      scene.updateMatrixWorld(true);
      nodeMarkers.forEach((node, index) => placeLabel(labelRefs.current[index], node, Boolean(networkNodes[index].yale)));
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
      memberMarkerTexture.dispose();
      yaleMarkerTexture.dispose();
      pulseTexture.dispose();
      memberMarkerMaterial.dispose();
      yaleMarkerMaterial.dispose();
      pulseMaterial.dispose();
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
            <b>{entry.short}</b>
          </div>
        ))}
      </div>
    </div>
  );
}
