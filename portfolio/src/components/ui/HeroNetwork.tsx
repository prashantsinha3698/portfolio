"use client";

import { useEffect, useRef } from "react";

interface Neuron {
  x: number;
  y: number;
  originX: number;
  originY: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  glowColor: string;
  coreColor: string;
  pulsePhase: number;
  pulseSpeed: number;
  isExcited: boolean;
}

interface SynapticPulse {
  fromNode: number;
  toNode: number;
  progress: number;
  speed: number;
  color: string;
}

export default function HeroNetwork() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const checkReducedMotion = () =>
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const isReduced = checkReducedMotion();

    const isMobile = width < 768;
    const neuronCount = isMobile ? 18 : 36;

    // Palette: Forest Green neurons, burnt orange energetic pulses, lavender tech accents
    const coreColors = [
      "#2E6B5B", // Forest green
      "#2E6B5B",
      "#777080", // Lavender
      "#E65336", // Burnt orange
      "#D5AC42", // Gold accent
    ];

    const neurons: Neuron[] = [];

    // Distribute neurons with a bias toward the center & right (hero open space)
    for (let i = 0; i < neuronCount; i++) {
      const minX = isMobile ? width * 0.05 : width * 0.35;
      const maxX = width * 0.98;
      const x = minX + Math.random() * (maxX - minX);
      const y = height * 0.06 + Math.random() * (height * 0.88);

      const color = coreColors[Math.floor(Math.random() * coreColors.length)];
      const baseRadius = Math.random() > 0.75 ? 3.5 : 2.2;

      neurons.push({
        x,
        y,
        originX: x,
        originY: y,
        vx: (Math.random() - 0.5) * 0.32,
        vy: (Math.random() - 0.5) * 0.32,
        radius: baseRadius,
        baseRadius,
        coreColor: color,
        glowColor:
          color === "#E65336"
            ? "rgba(230, 83, 54, 0.45)"
            : color === "#D5AC42"
            ? "rgba(213, 172, 66, 0.4)"
            : "rgba(46, 107, 91, 0.38)",
        pulsePhase: Math.random() * Math.PI * 2,
        pulseSpeed: 0.02 + Math.random() * 0.025,
        isExcited: false,
      });
    }

    // Synaptic pulses traveling along vector connections
    const pulses: SynapticPulse[] = [];

    const spawnPulse = () => {
      if (neurons.length < 2) return;
      const from = Math.floor(Math.random() * neurons.length);
      // Pick a nearby neighbor
      let bestDist = 180;
      let target = -1;
      for (let j = 0; j < neurons.length; j++) {
        if (j === from) continue;
        const dx = neurons[from].x - neurons[j].x;
        const dy = neurons[from].y - neurons[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < bestDist) {
          bestDist = dist;
          target = j;
        }
      }

      if (target !== -1) {
        pulses.push({
          fromNode: from,
          toNode: target,
          progress: 0,
          speed: 0.012 + Math.random() * 0.015,
          color: Math.random() > 0.5 ? "#E65336" : "#2E6B5B",
        });
      }
    };

    let mouseX = -9999;
    let mouseY = -9999;
    let mouseActive = false;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
      mouseActive = true;
    };

    const handleMouseLeave = () => {
      mouseX = -9999;
      mouseY = -9999;
      mouseActive = false;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseleave", handleMouseLeave, { passive: true });

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    const maxConnectionDist = isMobile ? 100 : 155;
    const mouseRadius = 150;

    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.05 }
    );
    observer.observe(canvas);

    let frameCount = 0;

    const render = () => {
      if (!isVisible || isReduced) {
        if (!isReduced) {
          animationFrameId = requestAnimationFrame(render);
        }
        return;
      }

      frameCount++;
      // Spawn new neural action pulses periodically
      if (frameCount % 45 === 0 && pulses.length < 8) {
        spawnPulse();
      }

      ctx.clearRect(0, 0, width, height);

      // 1. Update neuron positions and pulse breathing
      for (let i = 0; i < neurons.length; i++) {
        const n = neurons[i];

        // Soft organic floating
        n.x += n.vx;
        n.y += n.vy;

        // Boundary containment
        const minX = isMobile ? width * 0.03 : width * 0.32;
        const maxX = width * 0.98;
        if (n.x < minX || n.x > maxX) n.vx *= -1;
        if (n.y < height * 0.04 || n.y > height * 0.96) n.vy *= -1;

        // Breathing neural pulse
        n.pulsePhase += n.pulseSpeed;
        const pulseFactor = Math.sin(n.pulsePhase);
        n.radius = n.baseRadius + pulseFactor * 0.7;

        // Mouse interaction: Gentle attraction & synaptic excitement
        if (mouseActive) {
          const dx = mouseX - n.x;
          const dy = mouseY - n.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseRadius && dist > 0) {
            n.isExcited = true;
            // Magnetic gentle draw toward cursor
            const force = (1 - dist / mouseRadius) * 0.85;
            n.x += (dx / dist) * force;
            n.y += (dy / dist) * force;
          } else {
            n.isExcited = false;
          }
        } else {
          n.isExcited = false;
        }

        // Spring return to origin
        n.x += (n.originX - n.x) * 0.007;
        n.y += (n.originY - n.y) * 0.007;
      }

      // 2. Draw neural filament axon connections
      ctx.lineWidth = 1;
      for (let i = 0; i < neurons.length; i++) {
        for (let j = i + 1; j < neurons.length; j++) {
          const n1 = neurons[i];
          const n2 = neurons[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectionDist) {
            const alpha = (1 - dist / maxConnectionDist) * 0.28;
            ctx.strokeStyle = `rgba(46, 107, 91, ${alpha})`;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
      }

      // 3. Draw cursor neural probe filaments
      if (mouseActive && mouseX > 0) {
        // Draw soft ambient cursor neural halo
        const cursorGlow = ctx.createRadialGradient(mouseX, mouseY, 0, mouseX, mouseY, 75);
        cursorGlow.addColorStop(0, "rgba(230, 83, 54, 0.12)");
        cursorGlow.addColorStop(1, "rgba(230, 83, 54, 0)");
        ctx.fillStyle = cursorGlow;
        ctx.beginPath();
        ctx.arc(mouseX, mouseY, 75, 0, Math.PI * 2);
        ctx.fill();

        for (let i = 0; i < neurons.length; i++) {
          const n = neurons[i];
          const dx = mouseX - n.x;
          const dy = mouseY - n.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < mouseRadius) {
            const alpha = (1 - dist / mouseRadius) * 0.45;
            ctx.strokeStyle = `rgba(230, 83, 54, ${alpha})`;
            ctx.lineWidth = 1.2;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(mouseX, mouseY);
            ctx.stroke();
          }
        }
      }

      // 4. Update and render traveling action pulses
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        pulse.progress += pulse.speed;

        if (pulse.progress >= 1) {
          pulses.splice(p, 1);
          continue;
        }

        const nFrom = neurons[pulse.fromNode];
        const nTo = neurons[pulse.toNode];
        if (!nFrom || !nTo) continue;

        const curX = nFrom.x + (nTo.x - nFrom.x) * pulse.progress;
        const curY = nFrom.y + (nTo.y - nFrom.y) * pulse.progress;

        // Glowing pulse head
        const pulseGlow = ctx.createRadialGradient(curX, curY, 0, curX, curY, 8);
        pulseGlow.addColorStop(0, pulse.color);
        pulseGlow.addColorStop(0.4, pulse.color === "#E65336" ? "rgba(230, 83, 54, 0.45)" : "rgba(46, 107, 91, 0.45)");
        pulseGlow.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = pulseGlow;
        ctx.beginPath();
        ctx.arc(curX, curY, 8, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = "#FFFFFF";
        ctx.beginPath();
        ctx.arc(curX, curY, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }

      // 5. Draw glowing neural nodes
      for (let i = 0; i < neurons.length; i++) {
        const n = neurons[i];

        // Soft radial glow halo around neuron
        const haloRadius = n.radius * (n.isExcited ? 5.5 : 3.8);
        const gradient = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, haloRadius);
        gradient.addColorStop(0, n.isExcited ? "rgba(230, 83, 54, 0.55)" : n.glowColor);
        gradient.addColorStop(0.5, n.isExcited ? "rgba(230, 83, 54, 0.15)" : n.glowColor.replace("0.45", "0.1").replace("0.38", "0.1"));
        gradient.addColorStop(1, "rgba(0, 0, 0, 0)");

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(n.x, n.y, haloRadius, 0, Math.PI * 2);
        ctx.fill();

        // Solid core nucleus
        ctx.fillStyle = n.isExcited ? "#E65336" : n.coreColor;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.radius, 0, Math.PI * 2);
        ctx.fill();

        // Inner bright spark
        ctx.fillStyle = "rgba(255, 255, 255, 0.75)";
        ctx.beginPath();
        ctx.arc(n.x - 0.5, n.y - 0.5, n.radius * 0.35, 0, Math.PI * 2);
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    if (isReduced) {
      // Draw a calm static neural network diagram
      ctx.clearRect(0, 0, width, height);
      for (let i = 0; i < neurons.length; i++) {
        for (let j = i + 1; j < neurons.length; j++) {
          const n1 = neurons[i];
          const n2 = neurons[j];
          const dx = n1.x - n2.x;
          const dy = n1.y - n2.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < maxConnectionDist) {
            ctx.strokeStyle = `rgba(46, 107, 91, 0.18)`;
            ctx.beginPath();
            ctx.moveTo(n1.x, n1.y);
            ctx.lineTo(n2.x, n2.y);
            ctx.stroke();
          }
        }
        ctx.fillStyle = neurons[i].coreColor;
        ctx.beginPath();
        ctx.arc(neurons[i].x, neurons[i].y, neurons[i].radius, 0, Math.PI * 2);
        ctx.fill();
      }
    } else {
      render();
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 1,
        opacity: 0.9,
      }}
    />
  );
}

