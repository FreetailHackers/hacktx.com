import { useState, useEffect } from "react";

// Eagerly load all 16 frames and sort them numerically (W401-1 … W401-16)
const frameModules = import.meta.glob(
  "../assets/Landing/wind/W401-*.png",
  { eager: true }
);

const frames: string[] = Object.entries(frameModules)
  .sort(([a], [b]) => {
    const n = (s: string) => parseInt(s.match(/W401-(\d+)\.png/)?.[1] ?? "0");
    return n(a) - n(b);
  })
  .map(([, m]) => (m as { default: string }).default);

function rand(min: number, max: number) {
  return min + Math.random() * (max - min);
}

interface WindSpriteProps {
  /** Horizontal range [minPct, maxPct] the sprite can appear within */
  xRange: [number, number];
  /** Vertical range [minPct, maxPct] the sprite can appear within */
  yRange: [number, number];
  width?: string;
  opacity?: number;
  zIndex?: number;
  fps?: number;
  /** Delay in ms before the very first play */
  initialDelay?: number;
  /** Gap in ms between loops (sprite is invisible during this time) */
  pauseMs?: number;
}

export default function WindSprite({
  xRange,
  yRange,
  width = "8vw",
  opacity = 0.8,
  zIndex = 5,
  fps = 12,
  initialDelay = 0,
  pauseMs = 2000,
}: WindSpriteProps) {
  const [frame, setFrame] = useState(0);
  // "waiting" → initial delay; "playing" → animating; "hidden" → invisible gap between loops
  const [phase, setPhase] = useState<"waiting" | "playing" | "hidden">(
    initialDelay > 0 ? "waiting" : "playing"
  );
  const [pos, setPos] = useState(() => ({
    top: rand(yRange[0], yRange[1]),
    left: rand(xRange[0], xRange[1]),
  }));

  // Initial delay before first play
  useEffect(() => {
    if (initialDelay <= 0) return;
    const t = setTimeout(() => setPhase("playing"), initialDelay);
    return () => clearTimeout(t);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Hidden gap: re-randomise position, then restart
  useEffect(() => {
    if (phase !== "hidden") return;
    const t = setTimeout(() => {
      setPos({
        top: rand(yRange[0], yRange[1]),
        left: rand(xRange[0], xRange[1]),
      });
      setFrame(0);
      setPhase("playing");
    }, pauseMs);
    return () => clearTimeout(t);
  }, [phase, pauseMs, xRange, yRange]);

  // Frame ticker
  useEffect(() => {
    if (phase !== "playing") return;
    const id = setInterval(() => {
      setFrame((prev) => {
        if (prev >= frames.length - 1) {
          setPhase("hidden"); // last frame → go invisible immediately
          return prev;
        }
        return prev + 1;
      });
    }, 1000 / fps);
    return () => clearInterval(id);
  }, [phase, fps]);

  // Not visible during waiting or hidden phases — last frame never lingers
  if (phase === "waiting" || phase === "hidden") return null;

  return (
    <img
      src={frames[frame]}
      alt=""
      aria-hidden="true"
      style={{
        position: "absolute",
        pointerEvents: "none",
        top: `${pos.top}%`,
        left: `${pos.left}%`,
        width,
        opacity,
        zIndex,
      }}
    />
  );
}
