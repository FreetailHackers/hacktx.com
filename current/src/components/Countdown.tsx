import { useState, useEffect, useRef } from "react";
import castleSvg from "../assets/castle.svg";
import hourHandPng from "../assets/hour-hand.png";
import minuteHandPng from "../assets/minute-hand.png";
import glassSlipperPng from "../assets/glass-slipper.png";
import sparklePng from "../assets/sparkle-star.png";
import sparkleLine1Png from "../assets/countdown/sparkle line 1.png";
import sparkleLine2Png from "../assets/countdown/sparkle line 2.png";
import sparkleLine3Png from "../assets/countdown/sparkle line 3.png";

const SHOE_KEYFRAMES = [
  { top: "51.2%", left: "20%", width: "6%", rotate: 10 },
  { top: "55%", left: "25%", width: "7%", rotate: -5 },
  { top: "59%", left: "30%", width: "10%", rotate: 0 },
  { top: "68%", left: "28%", width: "14%", rotate: -10 },
  { top: "75%", left: "43%", width: "17%", rotate: 0 },
];

function pct(s: string) {
  return parseFloat(s);
}

// Smooth ease-in-out
function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

function interpolateShoe(progress: number) {
  const n = SHOE_KEYFRAMES.length - 1;
  const rawSeg = progress * n;
  const seg = Math.min(Math.floor(rawSeg), n - 1);
  const t = easeInOut(rawSeg - seg); // 0..1 eased within segment

  const a = SHOE_KEYFRAMES[seg];
  const b = SHOE_KEYFRAMES[seg + 1];

  // Parabolic arc: shoe lifts slightly mid-step (4t(1-t) peaks at 0.5)
  const arc = 4 * t * (1 - t);

  // Raw (uneased) t for rotation so it spins at a steady rate
  const tRaw = rawSeg - seg;

  return {
    top: `${pct(a.top) + (pct(b.top) - pct(a.top)) * t - arc * 3}%`,
    left: `${pct(a.left) + (pct(b.left) - pct(a.left)) * t}%`,
    width: `${pct(a.width) + (pct(b.width) - pct(a.width)) * t}%`,
    rotate: a.rotate + (b.rotate - a.rotate) * tRaw,
  };
}

// HackTX 26 opens at 8:00 AM CST (UTC-6) on October 24, 2026
const HACKTX_START = new Date("2026-10-24T14:00:00Z");

function getTimeUntilHackTX() {
  const now = new Date();
  const diff = Math.max(0, HACKTX_START.getTime() - now.getTime());
  const totalSecs = Math.floor(diff / 1000);
  const days = Math.floor(totalSecs / 86400);
  const hours = Math.floor((totalSecs % 86400) / 3600);
  const minutes = Math.floor((totalSecs % 3600) / 60);
  const seconds = totalSecs % 60;
  const done = diff === 0;
  return { days, hours, minutes, seconds, done };
}

function getClockAngles(done: boolean) {
  // When countdown is over both hands rest at midnight (12 o'clock = 0°)
  if (done) return { hourDeg: 0, minuteDeg: 0 };

  const now = new Date();
  const diffMs = Math.max(0, HACKTX_START.getTime() - now.getTime());
  const totalSecs = diffMs / 1000;

  // Minute hand: one full rotation per hour of remaining time
  const secsIntoCurrentHour = totalSecs % 3600;
  const minuteDeg = (secsIntoCurrentHour / 3600) * 360;

  // Hour hand: one full rotation per 12 hours (classic clock)
  const secsInto12Hours = totalSecs % (12 * 3600);
  const hourDeg = (secsInto12Hours / (12 * 3600)) * 360;

  return { hourDeg, minuteDeg };
}

export default function CountdownSection() {
  const [timeLeft, setTimeLeft] = useState(getTimeUntilHackTX);
  const [clock, setClock] = useState(() => getClockAngles(timeLeft.done));
  const [shoeProgress, setShoeProgress] = useState(0);
  const [showSparkles, setShowSparkles] = useState(false);
  const [sparklesVisible, setSparklesVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const id = setInterval(() => {
      const t = getTimeUntilHackTX();
      setTimeLeft(t);
    }, 1000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (timeLeft.done) {
      setClock({ hourDeg: 0, minuteDeg: 0 });
      return;
    }
    let raf: number;
    const tick = () => {
      setClock(getClockAngles(false));
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [timeLeft.done]);

  // Trigger shoe animation once when the castle section enters view
  useEffect(() => {
    const DURATION = 3000; // ms

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || hasAnimated.current) return;
        hasAnimated.current = true;
        observer.disconnect();

        const start = performance.now();
        let raf: number;
        const tick = (now: number) => {
          const progress = Math.min((now - start) / DURATION, 1);
          setShoeProgress(progress);
          if (progress < 1) {
            raf = requestAnimationFrame(tick);
          } else {
            setTimeout(() => {
              setShowSparkles(true);
              // One frame later so the mount happens before the transition fires
              requestAnimationFrame(() => setSparklesVisible(true));
            }, 500);
          }
        };
        raf = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(raf);
      },
      { threshold: 0.3 },
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const pad = (n: number) => String(n).padStart(2, "0");

  return (
    <div
      ref={sectionRef}
      className="relative w-full min-h-screen flex items-center justify-center py-24"
      style={{ background: "#27231C" }}
    >
      <div className="relative overflow-visible w-full md:w-1/2 mx-auto">
        <img src={castleSvg} alt="Castle" className="w-full relative z-[3]" />

        {/* Sparkle lines — behind castle tower, above countdown timer box */}
        <img
          src={sparkleLine1Png}
          alt=""
          className="absolute pointer-events-none top-[-50%] -left-[50%] w-[70%] z-[2] opacity-80"
        />
        <img
          src={sparkleLine2Png}
          alt=""
          className="absolute pointer-events-none top-[-10%] -right-[50%] w-[90%] h-[110%] z-[0] opacity-80 scale-x-150 origin-right"
        />
        <img
          src={sparkleLine3Png}
          alt=""
          className="absolute pointer-events-none bottom-[-10%] left-0 w-full scale-x-200 scale-y-150 z-[2] opacity-80"
        />

        {/* Hour hand */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "41%",
            left: "81.2%",
            width: 0,
            height: 0,
            zIndex: 10,
            transform: `rotate(${clock.hourDeg}deg)`,
          }}
        >
          <img src={hourHandPng} alt="" className="clock-hand" />
        </div>

        {/* Countdown box — absolutely positioned over the castle, no layout impact */}
        <div className="absolute pointer-events-none top-[2%] md:top-[10%] left-[5%] md:-left-[10%] z-[1]">
          <div className="px-4 py-4 md:px-8 md:py-5 bg-[#EFE8CE]">
            <p className="font-['Pirata_One',serif] text-[6.5vw] md:text-[3.5vw] font-normal uppercase leading-normal text-black m-0 whitespace-nowrap">
              <span className="inline-block w-[2.4ch] text-center">{pad(timeLeft.days)}</span>d{" : "}
              <span className="inline-block w-[2.4ch] text-center">{pad(timeLeft.hours)}</span>h{" : "}
              <span className="inline-block w-[2.4ch] text-center">{pad(timeLeft.minutes)}</span>m{" : "}
              <span className="inline-block w-[2.4ch] text-center">{pad(timeLeft.seconds)}</span>s
            </p>
            <p className="font-['Pirata_One',serif] text-[4.3vw] md:text-[2.3vw] font-normal uppercase leading-normal text-black m-0 whitespace-nowrap text-right">
              {timeLeft.done ? "HackTX has begun!" : "until HackTX begins"}
            </p>
          </div>
        </div>

        {/* Shoe — scroll-driven stair descent */}
        {(() => {
          const s = interpolateShoe(shoeProgress);
          return (
            <img
              src={glassSlipperPng}
              alt="Glass slipper"
              className="absolute pointer-events-none"
              style={{
                top: s.top,
                left: s.left,
                width: s.width,
                transform: `rotate(${s.rotate}deg)`,
                zIndex: 15,
              }}
            />
          );
        })()}

        {/* Sparkles — only mount after shoe animation completes */}
        {showSparkles &&
          [
            { className: "sparkle", top: "72%", left: "41%", width: "5%" },
            { className: "sparkle-3", top: "75%", left: "55%", width: "6%" },
            { className: "sparkle-2", top: "84%", left: "45%", width: "4.5%" },
          ].map((s, i) => (
            <div
              key={i}
              className="absolute pointer-events-none"
              style={{
                top: s.top,
                left: s.left,
                width: s.width,
                zIndex: 16,
                opacity: sparklesVisible ? 1 : 0,
                transition: "opacity 0.8s ease",
              }}
            >
              <img src={sparklePng} alt="" className={`w-full ${s.className}`} />
            </div>
          ))}

        {/* Minute hand */}
        <div
          className="absolute pointer-events-none"
          style={{
            top: "41%",
            left: "81.2%",
            width: 0,
            height: 0,
            zIndex: 10,
            transform: `rotate(${clock.minuteDeg}deg)`,
          }}
        >
          <img src={minuteHandPng} alt="" className="clock-hand" />
        </div>
      </div>

    </div>
  );
}
