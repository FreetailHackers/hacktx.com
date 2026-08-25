import mobileLandingSvg from "../assets/Landing/landing_mobile.svg";
import AnimatedLogo from "./AnimatedLogo";
import Tree from "./Landing/Tree";
import WindSprite from "./WindSprite";
import bottleSvg from "../assets/bottle.svg";
import cookieSvg from "../assets/cookie.svg";
import cloud1Svg from "../assets/Landing/clouds/cloud 1.svg";
import smallCloudSvg from "../assets/Landing/clouds/small cloud.svg";

export default function MobileLanding() {
  return (
    <div className="relative w-full overflow-hidden aspect-[390/1050]">
      <img src={mobileLandingSvg} alt="HackTX Landing" className="absolute inset-0 w-full h-full" />

      {/* Clouds — sky area, behind everything else */}
      <img
        src={cloud1Svg}
        alt=""
        aria-hidden
        className="cloud-c absolute"
        style={{ left: "42%", top: "2%", width: "52%", opacity: 0.9 }}
      />
      <img
        src={smallCloudSvg}
        alt=""
        aria-hidden
        className="cloud-e absolute"
        style={{ left: "5%", top: "12%", width: "30%", opacity: 0.85 }}
      />

      {/* Tree — left side, same component as desktop */}
      <Tree className="absolute" style={{ width: "200%", top: "14%", left: "-80%" }} />

      {/* Wind sprites — upper sky */}
      <WindSprite xRange={[5,  35]} yRange={[8,  35]} width="16.8%" opacity={0.75} initialDelay={0}    pauseMs={3000} fps={12} zIndex={6} />
      <WindSprite xRange={[50, 85]} yRange={[5,  30]} width="14.4%" opacity={0.65} initialDelay={1800} pauseMs={3600} fps={11} zIndex={6} />
      {/* Wind sprites — lower canopy / mid-scene */}
      <WindSprite xRange={[8,  45]} yRange={[42, 60]} width="15.6%" opacity={0.70} initialDelay={900}  pauseMs={2800} fps={12} zIndex={6} />
      <WindSprite xRange={[48, 82]} yRange={[48, 65]} width="13.2%" opacity={0.60} initialDelay={2700} pauseMs={3400} fps={11} zIndex={6} />

      {/* Logo */}
      <AnimatedLogo className="absolute left-1/2 -translate-x-1/2" style={{ top: "4%", width: "90%" }} />
      <p
        className="absolute left-1/2 -translate-x-1/2"
        style={{
          top: "25%",
          width: "90%",
          textAlign: "center",
          fontFamily: "'Pirata One', serif",
          fontSize: "clamp(1.2rem, 5vw, 2rem)",
          color: "#413720",
          opacity: 0,
          animation: "date-fade-in 0.8s ease forwards",
          animationDelay: "1.9s",
          letterSpacing: "0.05em",
        }}
      >
        10.24 — 10.25 · Apply by 9-24
      </p>

      {/* Cookie */}
      <a
        href="https://rodeo.freetailhackers.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute transition-transform duration-200 hover:scale-110 hover:brightness-110"
        style={{ top: "70%", left: "28%", width: "26.2%", zIndex: 10 }}
      >
        <img src={cookieSvg} alt="Cookie" className="w-full" />
      </a>

      {/* Bottle */}
      <a
        href="https://rodeo.freetailhackers.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute transition-transform duration-200 hover:scale-110 hover:brightness-110"
        style={{ top: "67%", left: "44%", width: "52%" }}
      >
        <img src={bottleSvg} alt="Bottle" className="w-full" />
      </a>
    </div>
  );
}
