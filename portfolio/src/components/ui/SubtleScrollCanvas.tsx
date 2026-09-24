"use client";

import { useRef, useMemo, useEffect, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { detectPerfTier, isTouchDevice } from "@/lib/perfTier";

// Cleanly suppress Three.js r186 THREE.Clock deprecation warning from all channels
if (typeof window !== "undefined") {
  // 1. Hook into Three.js's internal logger directly
  if (typeof (THREE as unknown as { setConsoleFunction?: unknown }).setConsoleFunction === "function") {
    (THREE as unknown as { setConsoleFunction: (fn: (type: string, msg: unknown, ...p: unknown[]) => void) => void }).setConsoleFunction(
      (type: string, message: unknown, ...params: unknown[]) => {
        const text = String(message);
        if (text.includes("Clock") && (text.includes("deprecated") || text.includes("Timer"))) {
          return;
        }
        const fn =
          (console as unknown as Record<string, (...args: unknown[]) => void>)[type] ||
          console.warn;
        fn.call(console, message, ...params);
      }
    );
  }

  // 2. Filter console.warn and console.error for all argument types (strings, Errors, devtools objects)
  const isClockDeprecation = (args: unknown[]) => {
    return args.some((a) => {
      if (!a) return false;
      const str =
        a instanceof Error
          ? a.message + " " + (a.stack || "")
          : typeof a === "object"
          ? String((a as { message?: string }).message || "") + " " + JSON.stringify(a)
          : String(a);
      return str.includes("Clock") && (str.includes("deprecated") || str.includes("Timer"));
    });
  };

  const origWarn = console.warn;
  console.warn = (...args: unknown[]) => {
    if (isClockDeprecation(args)) return;
    origWarn.apply(console, args);
  };

  const origError = console.error;
  console.error = (...args: unknown[]) => {
    if (isClockDeprecation(args)) return;
    origError.apply(console, args);
  };
}

interface DottedGlobeStarsProps {
  globeCount: number;
  coronaCount: number;
  isDark: boolean;
  scrollProgress: React.MutableRefObject<number>;
  mouseRef: React.MutableRefObject<[number, number]>;
  profileCardPosRef: React.MutableRefObject<{ cardLeftNdcX: number; cardCenterNdcY: number } | null>;
}

function DottedGlobeStars({
  globeCount,
  coronaCount,
  isDark,
  scrollProgress,
  mouseRef,
  profileCardPosRef,
}: DottedGlobeStarsProps) {
  const globePointsRef = useRef<THREE.Points>(null!);
  const coronaPointsRef = useRef<THREE.Points>(null!);

  const auraOrb1Ref = useRef<THREE.Mesh>(null!);
  const auraOrb2Ref = useRef<THREE.Mesh>(null!);
  const auraOrb3Ref = useRef<THREE.Mesh>(null!);

  const smoothedP = useRef<number>(0);

  // Soft glowing circular point texture with lighter visibility glow
  const circleTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 64;
    canvas.height = 64;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 31);
    gradient.addColorStop(0, "rgba(255, 255, 255, 1.0)");
    gradient.addColorStop(0.38, "rgba(255, 255, 255, 1.0)"); // Solid bright luminous core
    gradient.addColorStop(0.66, "rgba(255, 255, 255, 0.62)"); // Soft glow ring
    gradient.addColorStop(0.88, "rgba(255, 255, 255, 0.18)"); // Ethereal outer halo
    gradient.addColorStop(1.0, "rgba(255, 255, 255, 0.0)");

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(32, 32, 31, 0, Math.PI * 2);
    ctx.fill();

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  // Large Gaussian-blurred atmospheric aura texture (spans entire screen width)
  const auraBlurTexture = useMemo(() => {
    if (typeof document === "undefined") return null;
    const canvas = document.createElement("canvas");
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    const gradient = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
    gradient.addColorStop(0, "rgba(255, 255, 255, 0.85)");
    gradient.addColorStop(0.25, "rgba(255, 255, 255, 0.55)");
    gradient.addColorStop(0.52, "rgba(255, 255, 255, 0.22)");
    gradient.addColorStop(0.78, "rgba(255, 255, 255, 0.06)");
    gradient.addColorStop(1.0, "rgba(255, 255, 255, 0.0)");

    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 256, 256);

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;
    return tex;
  }, []);

  // Strictly ONLY shades of orange, green, and orangish-red (Zero blue, zero lavender)
  const { darkPalette, lightPalette } = useMemo(() => {
    return {
      darkPalette: [
        new THREE.Color("#FF3D00"), // Vibrant Orangish-Red / Coral Flame
        new THREE.Color("#00E599"), // Neon Emerald / Mint Green
        new THREE.Color("#FF7A00"), // Electric Amber Orange
        new THREE.Color("#10B981"), // Radiant Spring Green
        new THREE.Color("#FF5722"), // Warm Terracotta Orangish-Red
        new THREE.Color("#FFA000"), // Bright Warm Tangerine Orange
      ],
      lightPalette: [
        new THREE.Color("#C0391E"), // Deep Burnt Orangish-Red (Terracotta)
        new THREE.Color("#15803D"), // Rich Emerald Forest Green
        new THREE.Color("#D45D00"), // Deep Warm Rust Orange
        new THREE.Color("#1E705A"), // Rich Pine Forest Green
        new THREE.Color("#B9381E"), // Warm Ochre Terracotta
        new THREE.Color("#C96F00"), // Warm Golden Amber Orange
      ],
    };
  }, []);

  const palette = isDark ? darkPalette : lightPalette;

  // --- 1. GLOBE CORE PARTICLES (Intact Spherical Form with Subtle Surface Energy) ---
  const {
    globeUnitDirs,
    globeStarPos,
    globeColors,
    initialGlobePositions,
  } = useMemo(() => {
    const unitDirs = new Float32Array(globeCount * 3); // normalized unit directions (ux, uy, uz)
    const stPos = new Float32Array(globeCount * 3);
    const curPos = new Float32Array(globeCount * 3);
    const col = new Float32Array(globeCount * 3);

    // Enlarged globe radius for increased circumference
    const R0 = 2.40;

    for (let i = 0; i < globeCount; i++) {
      const i3 = i * 3;

      // Fibonacci sphere distribution for uniform spherical lattice
      const phi = Math.acos(1 - (2 * (i + 0.5)) / globeCount);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;

      const ux = Math.sin(phi) * Math.cos(theta);
      const uy = Math.sin(phi) * Math.sin(theta);
      const uz = Math.cos(phi);

      unitDirs[i3] = ux;
      unitDirs[i3 + 1] = uy;
      unitDirs[i3 + 2] = uz;

      // Dispersed star positions across 3D screen frustum
      const u = ((i * 1.6180339887) % 1) - 0.5;
      const v = ((i * 2.7182818284) % 1) - 0.5;
      const w = ((i * 3.1415926535) % 1) - 0.5;

      stPos[i3] = u * 15.0;
      stPos[i3 + 1] = v * 12.0;
      stPos[i3 + 2] = w * 6.0 - 1.0;

      // Initial position around profile section in Hero (30-40% to the left, rest behind)
      curPos[i3] = ux * R0 + 1.95;
      curPos[i3 + 1] = uy * R0 + 0.05;
      curPos[i3 + 2] = uz * R0 - 0.5;

      const c = palette[i % palette.length];
      col[i3] = c.r;
      col[i3 + 1] = c.g;
      col[i3 + 2] = c.b;
    }

    return {
      globeUnitDirs: unitDirs,
      globeStarPos: stPos,
      globeColors: col,
      initialGlobePositions: curPos,
    };
  }, [globeCount, palette]);

  // --- 2. HARMONIOUS BOUNCING MOTES AROUND THE GLOBE (Subtle, Cohesive Motion) ---
  const {
    coronaBaseData,
    coronaStarPos,
    coronaColors,
    initialCoronaPositions,
  } = useMemo(() => {
    // 7 floats per mote: baseTheta, basePhi, speed, baseRadius, hopFreq, hopPhase, tilt
    const baseData = new Float32Array(coronaCount * 7);
    const stPos = new Float32Array(coronaCount * 3);
    const curPos = new Float32Array(coronaCount * 3);
    const col = new Float32Array(coronaCount * 3);

    for (let i = 0; i < coronaCount; i++) {
      const i7 = i * 7;
      const i3 = i * 3;

      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.90;
      const speed = 0.35 + Math.random() * 0.40; // serene, smooth orbital drift
      const baseRadius = 2.44 + Math.random() * 0.18; // floats gracefully just above R0 = 2.38
      const hopFreq = 0.90 + Math.random() * 0.85; // subtle, gentle bouncing cadence
      const hopPhase = Math.random() * Math.PI * 2;
      const tilt = (Math.random() - 0.5) * 0.95; // graceful inclined 3D orbit angle

      baseData[i7] = theta;
      baseData[i7 + 1] = phi;
      baseData[i7 + 2] = speed;
      baseData[i7 + 3] = baseRadius;
      baseData[i7 + 4] = hopFreq;
      baseData[i7 + 5] = hopPhase;
      baseData[i7 + 6] = tilt;

      const u = ((i * 1.41421356) % 1) - 0.5;
      const v = ((i * 1.7320508) % 1) - 0.5;
      const w = ((i * 2.2360679) % 1) - 0.5;

      stPos[i3] = u * 15.0;
      stPos[i3 + 1] = v * 12.0;
      stPos[i3 + 2] = w * 6.0 - 1.0;

      curPos[i3] = 1.95;
      curPos[i3 + 1] = 0.05;
      curPos[i3 + 2] = -0.5;

      const c = palette[(i + 1) % palette.length];
      col[i3] = c.r;
      col[i3 + 1] = c.g;
      col[i3 + 2] = c.b;
    }

    return {
      coronaBaseData: baseData,
      coronaStarPos: stPos,
      coronaColors: col,
      initialCoronaPositions: curPos,
    };
  }, [coronaCount, palette]);

  // Plane geometry for Gaussian aura orbs
  const auraPlaneGeo = useMemo(() => new THREE.PlaneGeometry(1, 1), []);

  useFrame(({ clock, camera, viewport }) => {
    if (!globePointsRef.current || !coronaPointsRef.current) return;

    // Smooth spring lerp for scroll progress
    const targetP = scrollProgress.current;
    smoothedP.current = THREE.MathUtils.lerp(smoothedP.current, targetP, 0.075);
    const p = smoothedP.current;

    const time = clock.getElapsedTime();
    const [mx, my] = mouseRef.current;

    // World mouse coordinates at globe depth (Z ≈ -0.5)
    const worldMouseX = (mx * viewport.width) / 2;
    const worldMouseY = (my * viewport.height) / 2;

    // Exact alignment with the Profile Section (Avatar Div) in Hero:
    // Centrally vertically aligned with the profile section card,
    // and horizontally aligned so 60% of the globe is visible to the left of the section and 40% behind it.
    const centerZ = -0.5;
    const distToPlane = camera.position.z - centerZ; // 5.0 - (-0.5) = 5.5
    const pCam = camera as THREE.PerspectiveCamera;
    const fovRad = (pCam.fov * Math.PI) / 360;
    const visibleFrustumHeight = 2 * Math.tan(fovRad) * distToPlane;
    const visibleFrustumWidth =
      visibleFrustumHeight * (viewport.width / viewport.height);

    const R0 = 2.40;

    let initialCenterX = 1.95;
    let initialCenterY = 0.05;

    if (profileCardPosRef.current) {
      const cardLeftWorldX =
        profileCardPosRef.current.cardLeftNdcX * (visibleFrustumWidth / 2);
      const cardCenterWorldY =
        profileCardPosRef.current.cardCenterNdcY * (visibleFrustumHeight / 2);

      // Properly balanced: 30-40% of the globe diameter to the left of this div, ~60-70% behind it
      initialCenterX = cardLeftWorldX - 0.08 * R0;
      // Centrally vertically aligned with the profile section
      initialCenterY = cardCenterWorldY;
    }

    // --- Trajectory of the Globe Center ---
    let centerX = 0;
    let centerY = 0;

    if (p < 0.28) {
      const t = p / 0.28;
      const s = t * t * (3 - 2 * t);
      centerX = THREE.MathUtils.lerp(initialCenterX, -2.35, s);
      centerY = THREE.MathUtils.lerp(initialCenterY, 0.2, s);
    } else if (p < 0.52) {
      const t = (p - 0.28) / 0.24;
      const s = t * t * (3 - 2 * t);
      centerX = THREE.MathUtils.lerp(-2.35, 0.0, s);
      centerY = THREE.MathUtils.lerp(0.2, 0.0, s);
    } else {
      centerX = 0.0;
      centerY = 0.0;
    }

    // --- Globe Expansion & Morphing into Stars Everywhere ---
    let sphereScale = 1.0;
    let starMorph = 0.0;

    if (p < 0.48) {
      sphereScale = 1.0;
      starMorph = 0.0;
    } else if (p < 0.72) {
      const t = (p - 0.48) / 0.24;
      const s = t * t * (3 - 2 * t);
      sphereScale = THREE.MathUtils.lerp(1.0, 2.2, s);
      starMorph = THREE.MathUtils.lerp(0.0, 0.4, s);
    } else {
      const t = (p - 0.72) / 0.28;
      const s = t * t * (3 - 2 * t);
      sphereScale = THREE.MathUtils.lerp(2.2, 3.2, s);
      starMorph = THREE.MathUtils.lerp(0.4, 1.0, s);
    }

    // Smooth, serene rotation with gentle axis tilt
    const rotY = time * 0.05 + p * 2.0 + mx * 0.05;
    const rotX = 0.14 + 0.03 * Math.sin(time * 0.4) + p * 0.2 - my * 0.05;

    const cosY = Math.cos(rotY);
    const sinY = Math.sin(rotY);
    const cosX = Math.cos(rotX);
    const sinX = Math.sin(rotX);

    // --- 1. UPDATE GLOBE CORE PARTICLES (Globe Shape Kept Intact, Subtle Energy on Select Dots) ---
    const gGeo = globePointsRef.current.geometry;
    const gPosAttr = gGeo.attributes.position;
    const gPosArr = gPosAttr.array as Float32Array;

    for (let i = 0; i < globeCount; i++) {
      const i3 = i * 3;

      const ux = globeUnitDirs[i3];
      const uy = globeUnitDirs[i3 + 1];
      const uz = globeUnitDirs[i3 + 2];

      // Keep the spherical shape intact:
      // ~83% of dots stay rock-solid at radius R0 for a pristine, crisp sphere.
      // Only ~17% of dots (i % 6 === 0) have a gentle, subtle micro-pulse.
      let surfaceDisplacement = 0;
      if (i % 6 === 0) {
        surfaceDisplacement =
          (1 - starMorph) *
          (0.045 * Math.sin(time * 1.6 + i * 0.4) +
            0.025 * Math.sin(3.0 * ux + time * 1.2));
      }

      const currentR = R0 + surfaceDisplacement;

      // Base position on the sphere
      const xs = ux * currentR;
      const ys = uy * currentR;
      const zs = uz * currentR;

      // Rotate sphere
      const x1 = xs * cosY - zs * sinY;
      const z1 = xs * sinY + zs * cosY;
      const y1 = ys * cosX - z1 * sinX;
      const z2 = ys * sinX + z1 * cosX;

      let gX = x1 * sphereScale + centerX;
      let gY = y1 * sphereScale + centerY;
      let gZ = z2 * sphereScale + centerZ;

      // Mouse pointer touch & swirl interaction (in hero/projects view)
      if (p < 0.35) {
        const dx = gX - worldMouseX;
        const dy = gY - worldMouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 2.6 && dist > 0.001) {
          const force = Math.pow(1 - dist / 2.6, 2) * 0.95;
          gX += (dx / dist) * force * 0.75 + (-dy / dist) * force * 0.45;
          gY += (dy / dist) * force * 0.75 + (dx / dist) * force * 0.45;
          gZ += force * 0.6; // 3D forward bounce
        }
      }

      const sX = globeStarPos[i3];
      const sY = globeStarPos[i3 + 1];
      const sZ = globeStarPos[i3 + 2];

      gPosArr[i3] = THREE.MathUtils.lerp(gX, sX, starMorph);
      gPosArr[i3 + 1] = THREE.MathUtils.lerp(gY, sY, starMorph);
      gPosArr[i3 + 2] = THREE.MathUtils.lerp(gZ, sZ, starMorph);
    }
    gPosAttr.needsUpdate = true;

    // --- 2. UPDATE HARMONIOUS BOUNCING MOTES AROUND THE GLOBE ---
    const cGeo = coronaPointsRef.current.geometry;
    const cPosAttr = cGeo.attributes.position;
    const cPosArr = cPosAttr.array as Float32Array;

    for (let i = 0; i < coronaCount; i++) {
      const i7 = i * 7;
      const i3 = i * 3;

      const baseTheta = coronaBaseData[i7];
      const basePhi = coronaBaseData[i7 + 1];
      const speed = coronaBaseData[i7 + 2];
      const baseR = coronaBaseData[i7 + 3];
      const hopFreq = coronaBaseData[i7 + 4];
      const hopPhase = coronaBaseData[i7 + 5];
      const tilt = coronaBaseData[i7 + 6];

      // Smooth, cohesive orbital motion
      const curTheta = baseTheta + time * 0.22 * speed;
      const curPhi = basePhi + Math.sin(time * 1.1 * speed + i * 0.5) * 0.20;

      // Gentle, subtle bounce: hops smoothly above the globe surface without violent shaking
      const bounceHop = Math.pow(Math.abs(Math.sin(time * hopFreq + hopPhase)), 1.2) * 0.25;

      // Harmonious undulating wave above the globe
      const waveSurge =
        0.12 *
        Math.sin(2.4 * curTheta + 1.2 * time) *
        Math.cos(2.0 * curPhi - 1.0 * time);

      const rMote = baseR + (1 - starMorph) * (bounceHop + waveSurge);

      // Inclined 3D orbital plane coordinate transform
      const cosT = Math.cos(tilt);
      const sinT = Math.sin(tilt);

      const unrotatedX = rMote * Math.cos(curPhi) * Math.sin(curTheta);
      const unrotatedY = rMote * (Math.sin(curPhi) * cosT - Math.cos(curPhi) * Math.cos(curTheta) * sinT);
      const unrotatedZ = rMote * (Math.sin(curPhi) * sinT + Math.cos(curPhi) * Math.cos(curTheta) * cosT);

      // Rotate with globe orientation
      const cx1 = unrotatedX * cosY - unrotatedZ * sinY;
      const cz1 = unrotatedX * sinY + unrotatedZ * cosY;
      const cy1 = unrotatedY * cosX - cz1 * sinX;
      const cz2 = unrotatedY * sinX + cz1 * cosX;

      let cX = cx1 * sphereScale + centerX;
      let cY = cy1 * sphereScale + centerY;
      let cZ = cz2 * sphereScale + centerZ;

      // Mouse pointer interaction on bouncing motes
      if (p < 0.35) {
        const dx = cX - worldMouseX;
        const dy = cY - worldMouseY;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 2.8 && dist > 0.001) {
          const force = Math.pow(1 - dist / 2.8, 2) * 1.2;
          cX += (dx / dist) * force * 0.9 + (-dy / dist) * force * 0.6;
          cY += (dy / dist) * force * 0.9 + (dx / dist) * force * 0.6;
          cZ += force * 0.75;
        }
      }

      const stX = coronaStarPos[i3];
      const stY = coronaStarPos[i3 + 1];
      const stZ = coronaStarPos[i3 + 2];

      cPosArr[i3] = THREE.MathUtils.lerp(cX, stX, starMorph);
      cPosArr[i3 + 1] = THREE.MathUtils.lerp(cY, stY, starMorph);
      cPosArr[i3 + 2] = THREE.MathUtils.lerp(cZ, stZ, starMorph);
    }
    cPosAttr.needsUpdate = true;

    // --- 3. AMBIENT ETHEREAL AURA PLASMA (Freely moving across screen width, behind globe) ---
    const auraBaseOpacity = isDark ? 0.20 : 0.14;

    // Aura Pool 1: Burnt Crimson / Terracotta glow (drifts around globe & right-to-center)
    if (auraOrb1Ref.current) {
      const o1X = centerX * 0.8 + Math.sin(time * 0.35) * 0.8 + mx * 0.9;
      const o1Y = centerY * 0.8 + Math.cos(time * 0.28) * 0.5 - my * 0.6;
      auraOrb1Ref.current.position.set(o1X, o1Y, -2.6);
      const s1 = 6.4 + Math.sin(time * 0.4) * 0.6 + p * 2.0;
      auraOrb1Ref.current.scale.set(s1, s1, 1);
      (auraOrb1Ref.current.material as THREE.MeshBasicMaterial).opacity = auraBaseOpacity;
    }

    // Aura Pool 2: Forest Green / Emerald glow (spans center-left across screen width)
    if (auraOrb2Ref.current) {
      const o2X = -2.8 + Math.cos(time * 0.3) * 1.2 + mx * 0.7 - p * 1.5;
      const o2Y = 0.6 + Math.sin(time * 0.42) * 0.7 - my * 0.5;
      auraOrb2Ref.current.position.set(o2X, o2Y, -2.9);
      const s2 = 7.2 + Math.cos(time * 0.35) * 0.8 + p * 2.2;
      auraOrb2Ref.current.scale.set(s2, s2, 1);
      (auraOrb2Ref.current.material as THREE.MeshBasicMaterial).opacity = auraBaseOpacity * 0.9;
    }

    // Aura Pool 3: Warm Amber Gold glow (spans bottom-center across screen width)
    if (auraOrb3Ref.current) {
      const o3X = 0.2 + Math.sin(time * 0.45) * 1.4 + mx * 0.8;
      const o3Y = -1.6 + Math.cos(time * 0.38) * 0.6 - my * 0.5;
      auraOrb3Ref.current.position.set(o3X, o3Y, -2.7);
      const s3 = 6.8 + Math.sin(time * 0.32) * 0.7 + p * 2.0;
      auraOrb3Ref.current.scale.set(s3, s3, 1);
      (auraOrb3Ref.current.material as THREE.MeshBasicMaterial).opacity = auraBaseOpacity * 0.85;
    }
  });

  // Slightly decreased dot size in dark mode, forming a dense luminous bead lattice
  const globeDotSize = isDark ? 0.033 : 0.038;
  const coronaDotSize = isDark ? 0.027 : 0.032;
  const globeOpacity = isDark ? 0.96 : 0.92;
  const coronaOpacity = isDark ? 0.88 : 0.82;

  return (
    <group>
      {/* --- AMBIENT GAUSSIAN AURA PLASMA (Behind Globe at Z = -2.6 to -2.9) --- */}
      {/* 1. Orangish-Red Ambient Aura Pool */}
      <mesh ref={auraOrb1Ref} geometry={auraPlaneGeo}>
        <meshBasicMaterial
          map={auraBlurTexture || undefined}
          color={palette[0]}
          transparent
          depthWrite={false}
          blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
          opacity={isDark ? 0.20 : 0.14}
        />
      </mesh>

      {/* 2. Emerald / Forest Green Ambient Aura Pool */}
      <mesh ref={auraOrb2Ref} geometry={auraPlaneGeo}>
        <meshBasicMaterial
          map={auraBlurTexture || undefined}
          color={palette[1]}
          transparent
          depthWrite={false}
          blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
          opacity={isDark ? 0.18 : 0.12}
        />
      </mesh>

      {/* 3. Warm Tangerine Orange Ambient Aura Pool */}
      <mesh ref={auraOrb3Ref} geometry={auraPlaneGeo}>
        <meshBasicMaterial
          map={auraBlurTexture || undefined}
          color={palette[2]}
          transparent
          depthWrite={false}
          blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
          opacity={isDark ? 0.16 : 0.11}
        />
      </mesh>

      {/* --- 1. BOUNCING DOTTED GLOBE SURFACE & STARS (Luminous Beads) --- */}
      <points ref={globePointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[initialGlobePositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[globeColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          transparent
          vertexColors
          size={globeDotSize}
          sizeAttenuation
          depthWrite={false}
          map={circleTexture || undefined}
          alphaTest={0.001}
          opacity={globeOpacity}
          blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
        />
      </points>

      {/* --- 2. ENERGETIC BOUNCING & CONTINUOUSLY MOVING MOTES ABOVE THE SURFACE --- */}
      <points ref={coronaPointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[initialCoronaPositions, 3]}
          />
          <bufferAttribute
            attach="attributes-color"
            args={[coronaColors, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          transparent
          vertexColors
          size={coronaDotSize}
          sizeAttenuation
          depthWrite={false}
          map={circleTexture || undefined}
          alphaTest={0.001}
          opacity={coronaOpacity}
          blending={isDark ? THREE.AdditiveBlending : THREE.NormalBlending}
        />
      </points>
    </group>
  );
}

export default function SubtleScrollCanvas() {
  const [tier, setTier] = useState<"low" | "medium" | "high">("medium");
  const [isDark, setIsDark] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const scrollProgress = useRef<number>(0);
  const mouseRef = useRef<[number, number]>([0, 0]);
  const profileCardPosRef = useRef<{ cardLeftNdcX: number; cardCenterNdcY: number } | null>(null);

  useEffect(() => {
    setTier(detectPerfTier());

    // Measure exact screen position of hero profile section (avatar div) for vertical & horizontal alignment
    const updateProfilePos = () => {
      if (typeof document === "undefined") return;
      const el =
        document.getElementById("hero-profile-card") ||
        document.querySelector(".pixel-avatar-artifact") ||
        document.getElementById("hero-avatar-frame");
      if (el) {
        const rect = el.getBoundingClientRect();
        const cardCenterY = rect.top + rect.height / 2;
        const cardLeftX = rect.left;
        profileCardPosRef.current = {
          cardLeftNdcX: (cardLeftX / window.innerWidth) * 2 - 1,
          cardCenterNdcY: -(cardCenterY / window.innerHeight) * 2 + 1,
        };
      }
    };

    updateProfilePos();
    window.addEventListener("resize", updateProfilePos, { passive: true });
    window.addEventListener("page_reveal_start", updateProfilePos, { once: true });
    const timerAvatar1 = setTimeout(updateProfilePos, 150);
    const timerAvatar2 = setTimeout(updateProfilePos, 700);

    // Synchronize canvas entrance with hero reveal
    if (
      typeof document !== "undefined" &&
      document.documentElement.classList.contains("page-reveal-active")
    ) {
      setIsReady(true);
    } else {
      const handleReady = () => setIsReady(true);
      window.addEventListener("page_reveal_start", handleReady, { once: true });
      const timer = setTimeout(() => setIsReady(true), 500);
      return () => {
        window.removeEventListener("page_reveal_start", handleReady);
        clearTimeout(timer);
      };
    }

    const updateTheme = () => {
      setIsDark(document.documentElement.getAttribute("data-theme") === "dark");
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });

    const handleScroll = () => {
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
      scrollProgress.current = Math.min(1, Math.max(0, window.scrollY / maxScroll));
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = [
        (e.clientX / window.innerWidth - 0.5) * 2,
        -(e.clientY / window.innerHeight - 0.5) * 2,
      ];
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    handleScroll();

    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("resize", updateProfilePos);
      window.removeEventListener("page_reveal_start", updateProfilePos);
      clearTimeout(timerAvatar1);
      clearTimeout(timerAvatar2);
    };
  }, []);

  const isTouch = isTouchDevice();
  // Substantially increased count to decrease spacing between latitude & longitude dots
  const globeCount = tier === "low" ? 1200 : isTouch ? 1500 : tier === "high" ? 2400 : 1900;
  const coronaCount = tier === "low" ? 280 : isTouch ? 350 : tier === "high" ? 560 : 460;

  return (
    <div
      aria-hidden="true"
      className="subtle-canvas-container"
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
        opacity: isReady ? 1 : 0,
        transition: "opacity 1.2s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      <style suppressHydrationWarning>{`
        .subtle-canvas-container,
        .subtle-canvas-container *,
        .subtle-canvas-container canvas,
        .subtle-canvas-container div {
          pointer-events: none !important;
        }
      `}</style>
      <Canvas
        camera={{ position: [0, 0, 5.0], fov: 60 }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          alpha: true,
        }}
        dpr={Math.min(typeof window !== "undefined" ? window.devicePixelRatio : 1, 1.75)}
        frameloop="always"
        style={{ background: "transparent", pointerEvents: "none" }}
      >
        <ambientLight intensity={isDark ? 0.6 : 0.9} />
        <DottedGlobeStars
          globeCount={globeCount}
          coronaCount={coronaCount}
          isDark={isDark}
          scrollProgress={scrollProgress}
          mouseRef={mouseRef}
          profileCardPosRef={profileCardPosRef}
        />
      </Canvas>
    </div>
  );
}
