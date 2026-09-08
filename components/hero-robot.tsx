"use client";

import { useEffect, useRef } from "react";

/**
 * Hero robot.
 *
 * The source clip is an opaque MP4 (the robot on a near-white background), so we
 * chroma-key the light background out in real time onto a <canvas>: the result
 * is a clean cut-out robot that sits on the dark hero with a warm glow behind
 * it — matching the still art direction. The clip always plays (muted, looped)
 * and the whole thing gently parallax-follows the pointer; when the mouse stops
 * it eases back to centre and keeps playing.
 */
export function HeroRobot() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // --- chroma-key the near-white background out, frame by frame ---
  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    video.muted = true;
    const play = () => {
      const p = video.play();
      if (p && typeof p.catch === "function") p.catch(() => {});
    };
    play();

    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    if (!ctx) return;

    let raf = 0;
    let sized = false;

    const draw = () => {
      raf = requestAnimationFrame(draw);
      if (video.readyState < 2 || !video.videoWidth) return;

      if (!sized) {
        // Downscale the working buffer for smooth per-pixel processing.
        const w = 460;
        const h = Math.round((video.videoHeight / video.videoWidth) * w);
        canvas.width = w;
        canvas.height = h;
        sized = true;
      }

      const { width: w, height: h } = canvas;
      ctx.clearRect(0, 0, w, h);
      ctx.drawImage(video, 0, 0, w, h);

      const frame = ctx.getImageData(0, 0, w, h);
      const d = frame.data;
      for (let i = 0; i < d.length; i += 4) {
        const r = d[i];
        const g = d[i + 1];
        const b = d[i + 2];
        const min = r < g ? (r < b ? r : b) : g < b ? g : b;
        const max = r > g ? (r > b ? r : b) : g > b ? g : b;
        // Light + low-saturation pixels are background (white / grey checker).
        if (min > 200 && max - min < 32) {
          d[i + 3] = 0; // fully transparent
        } else if (min > 178 && max - min < 42) {
          // soft edge feather to avoid a hard white halo
          d[i + 3] = Math.round(((200 - min) / 22) * 255);
        }
      }
      ctx.putImageData(frame, 0, 0);
    };

    raf = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(raf);
  }, []);

  // --- pointer parallax ---
  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches) return;

    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;
    let idle: ReturnType<typeof setTimeout> | null = null;
    let raf = 0;
    const MAX = 26;

    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      targetX = Math.max(-1, Math.min(1, (e.clientX - cx) / cx)) * MAX;
      targetY = Math.max(-1, Math.min(1, (e.clientY - cy) / cy)) * MAX;
      if (idle) clearTimeout(idle);
      idle = setTimeout(() => {
        targetX = 0;
        targetY = 0;
      }, 600);
    };

    const tick = () => {
      curX += (targetX - curX) * 0.06;
      curY += (targetY - curY) * 0.06;
      wrap.style.transform = `translate3d(${curX.toFixed(2)}px, ${curY.toFixed(
        2,
      )}px, 0)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
      if (idle) clearTimeout(idle);
    };
  }, []);

  return (
    <div className="relative mx-auto flex aspect-[3/4] w-full max-w-sm items-center justify-center lg:max-w-md">
      {/* warm glow aura behind the robot (theme-aware) */}
      <div
        aria-hidden
        className="robot-glow-1 pointer-events-none absolute inset-0 -z-10 blur-2xl"
      />
      <div
        aria-hidden
        className="robot-glow-2 pointer-events-none absolute inset-0 -z-10 blur-3xl"
      />

      <div ref={wrapRef} className="h-full w-full will-change-transform">
        <canvas
          ref={canvasRef}
          aria-hidden
          className="h-full w-full animate-float select-none object-contain drop-shadow-[0_25px_45px_rgba(0,0,0,0.45)]"
        />
      </div>

      {/* hidden source clip — always playing, muted */}
      <video
        ref={videoRef}
        src="/robot/robot-hero.mp4"
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden
        className="pointer-events-none absolute h-px w-px opacity-0"
      />
    </div>
  );
}
