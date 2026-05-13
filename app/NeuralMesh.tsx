"use client";

import { useEffect, useRef } from "react";

const NODE_COUNT = 55;
const CONNECT_DIST = 180;
const MOUSE_RADIUS = 180;
const MOUSE_FORCE = 0.06;
const SPEED = 0.4;

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  opacity: number;
}

export default function NeuralMesh() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0;
    let nodes: Node[] = [];
    let mouse = { x: -9999, y: -9999 };
    let raf: number;

    function init() {
      W = canvas!.width = canvas!.offsetWidth;
      H = canvas!.height = canvas!.offsetHeight;
      nodes = Array.from({ length: NODE_COUNT }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * SPEED,
        vy: (Math.random() - 0.5) * SPEED,
        r: Math.random() * 1.5 + 1.5,
        opacity: Math.random() * 0.4 + 0.55,
      }));
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H);

      // Draw connections first (behind nodes)
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const ex = a.x - b.x;
          const ey = a.y - b.y;
          const d = Math.sqrt(ex * ex + ey * ey);
          if (d < CONNECT_DIST) {
            const alpha = (1 - d / CONNECT_DIST) * 0.55;
            ctx!.beginPath();
            ctx!.moveTo(a.x, a.y);
            ctx!.lineTo(b.x, b.y);
            ctx!.strokeStyle = `rgba(130, 90, 255, ${alpha})`;
            ctx!.lineWidth = 0.9;
            ctx!.stroke();
          }
        }
      }

      // Draw nodes on top
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];

        // Mouse attraction
        const dx = mouse.x - a.x;
        const dy = mouse.y - a.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MOUSE_RADIUS && dist > 1) {
          const strength = (1 - dist / MOUSE_RADIUS) * MOUSE_FORCE;
          a.vx += dx * strength;
          a.vy += dy * strength;
        }

        // Dampen + speed cap
        a.vx *= 0.98;
        a.vy *= 0.98;
        const speed = Math.sqrt(a.vx * a.vx + a.vy * a.vy);
        if (speed > SPEED * 4) {
          a.vx = (a.vx / speed) * SPEED * 4;
          a.vy = (a.vy / speed) * SPEED * 4;
        }
        // Keep minimum drift
        if (speed < SPEED * 0.3) {
          a.vx += (Math.random() - 0.5) * 0.05;
          a.vy += (Math.random() - 0.5) * 0.05;
        }

        a.x += a.vx;
        a.y += a.vy;

        // Wrap edges
        if (a.x < 0) a.x = W;
        if (a.x > W) a.x = 0;
        if (a.y < 0) a.y = H;
        if (a.y > H) a.y = 0;

        // Node glow
        const grd = ctx!.createRadialGradient(a.x, a.y, 0, a.x, a.y, a.r * 3);
        grd.addColorStop(0, `rgba(180, 150, 255, ${a.opacity})`);
        grd.addColorStop(1, `rgba(99, 49, 244, 0)`);
        ctx!.beginPath();
        ctx!.arc(a.x, a.y, a.r * 3, 0, Math.PI * 2);
        ctx!.fillStyle = grd;
        ctx!.fill();

        // Node dot
        ctx!.beginPath();
        ctx!.arc(a.x, a.y, a.r, 0, Math.PI * 2);
        ctx!.fillStyle = `rgba(200, 180, 255, ${a.opacity})`;
        ctx!.fill();
      }

      raf = requestAnimationFrame(draw);
    }

    const ro = new ResizeObserver(() => { init(); });
    ro.observe(canvas);
    init();
    draw();

    const onMove = (e: MouseEvent) => {
      const rect = canvas!.getBoundingClientRect();
      mouse = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouse = { x: -9999, y: -9999 }; };
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      canvas.removeEventListener("mousemove", onMove);
      canvas.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "auto",
      }}
    />
  );
}
