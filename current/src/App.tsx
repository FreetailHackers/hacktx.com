import { useState, useEffect } from "react";
import DesktopLanding from "./components/DesktopLanding";
import MobileLanding from "./components/MobileLanding";
import CountdownSection from "./components/Countdown";
import AboutSection from "./components/About";
import MobileAboutSection from "./components/MobileAbout";
import FaqSection from "./components/Faq";
import Schedule from "./components/Schedule";
import Footer from "./components/Footer";

export default function App() {
  const [pos, setPos] = useState({ x: 0, y: 0, absY: 0 });
  const [scrollY, setScrollY] = useState(0);
  const devMode = false; // Set to true to enable dev mode

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    const scroll = () => {
      // Only scroll down on desktop (≥768px); mobile starts at the top
      if (window.innerWidth >= 768) {
        window.scrollTo({ top: 125 });
      }
    };
    setTimeout(scroll, 0);
  }, []);

  return (
    <main className="relative" style={{ overflowClipMargin: 0, overflow: "clip" }} onMouseMove={(e) => setPos({ x: e.clientX, y: e.clientY, absY: e.pageY })}>
      <a
        href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2027-season&utm_content=black"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed top-0 right-6 z-50 w-16 md:w-20 mlh-badge"
      >
        <img
          src="https://logged-assets.s3.amazonaws.com/trust-badge/2027/mlh-trust-badge-2027-black.svg"
          alt="Major League Hacking 2027 Hackathon Season"
          className="w-full"
        />
      </a>
      {devMode && (
        <>
          <div className="fixed top-2 left-2 z-50 bg-black/70 text-white text-xs font-mono px-2 py-1 rounded pointer-events-none">
            viewport: {pos.x}, {pos.y} | abs: {pos.x}, {pos.absY} | scroll: {scrollY}
          </div>

          {/* % grid overlay */}
          <div className="fixed inset-0 pointer-events-none z-40">
            {Array.from({ length: 9 }, (_, i) => (i + 1) * 10).map((pct) => (
              <div key={`v${pct}`}>
                {/* vertical line */}
                <div className="absolute top-0 bottom-0 w-px bg-red-500/40" style={{ left: `${pct}%` }} />
                <span
                  className="absolute top-1 text-red-400 text-[9px] font-mono -translate-x-1/2"
                  style={{ left: `${pct}%` }}
                >
                  {pct}%
                </span>
              </div>
            ))}
            {Array.from({ length: 9 }, (_, i) => (i + 1) * 10).map((pct) => (
              <div key={`h${pct}`}>
                {/* horizontal line */}
                <div className="absolute left-0 right-0 h-px bg-blue-500/40" style={{ top: `${pct}%` }} />
                <span
                  className="absolute left-1 text-blue-400 text-[9px] font-mono -translate-y-1/2"
                  style={{ top: `${pct}%` }}
                >
                  {pct}%
                </span>
              </div>
            ))}
          </div>
        </>
      )}

      <div>
        <div className="hidden md:block">
          <DesktopLanding />
        </div>
        <div className="block md:hidden">
          <MobileLanding />
        </div>
      </div>

      {/* Gradient seam between Landing and Countdown */}
      <div
        className="relative w-full pointer-events-none"
        style={{
          height: "18vw",
          marginTop: "-18vw",
          background: "linear-gradient(to bottom, transparent 0%, #27231C 100%)",
        }}
      />

      <CountdownSection />
      {/* <div className="-mt-[30vw] relative z-10">
        
      </div> */}

      {/* Gradient seam between Countdown and About — sits behind About's vines since About renders after */}
      <div
        className="relative w-full pointer-events-none"
        style={{
          height: "18vw",
          marginTop: "-18vw",
          background: "linear-gradient(to bottom, #27231C 0%, #EFE8CE 100%)",
        }}
      />

      <div className="hidden md:block">
        <AboutSection />
      </div>
      <div className="block md:hidden">
        <MobileAboutSection />
      </div>

      <FaqSection />

      <Schedule />

      <div className="relative z-10">
        <Footer />
      </div>
    </main>
  );
}
