import landingSvg from "../assets/Landing/landing.svg";
import AnimatedLogo from "./AnimatedLogo";
import Tree from "./Landing/Tree";
import WindSprite from "./WindSprite";
import bottleSvg from "../assets/bottle.svg";
import cookieSvg from "../assets/cookie.svg";
import cloud1Svg from "../assets/Landing/clouds/cloud 1.svg";
import cloud2Svg from "../assets/Landing/clouds/cloud 2.svg";
import smallCloudSvg from "../assets/Landing/clouds/small cloud.svg";

export default function DesktopLanding() {
  return (
    <div className="relative w-full overflow-hidden aspect-[1440/1324]">
      <img src={landingSvg} alt="HackTX Landing" className="absolute inset-0 w-full h-full" />
      {/* Clouds — behind the tree, drifting slowly */}
      <img
        src={cloud1Svg}
        alt=""
        aria-hidden
        className="cloud-a absolute"
        style={{ left: "3%", top: "3%", width: "26.4%", opacity: 0.9 }}
      />
      <img
        src={smallCloudSvg}
        alt=""
        aria-hidden
        className="cloud-b absolute"
        style={{ left: "30%", top: "2%", width: "23.1%", opacity: 0.85 }}
      />
      <img
        src={cloud2Svg}
        alt=""
        aria-hidden
        className="cloud-c absolute"
        style={{ left: "44%", top: "6%", width: "24.2%", opacity: 0.9 }}
      />
      <img
        src={smallCloudSvg}
        alt=""
        aria-hidden
        className="cloud-d absolute"
        style={{ left: "69%", top: "4%", width: "9.9%", opacity: 0.8 }}
      />
      <img
        src={cloud1Svg}
        alt=""
        aria-hidden
        className="cloud-e absolute"
        style={{ left: "78%", top: "10%", width: "19.8%", opacity: 0.85 }}
      />
      {/* Tree — single SVG unit, scales with the container via its viewBox */}
      <Tree className="absolute" style={{ width: "65%", top: "7%", left: "-16%" }} />
      {/* Wind sprites — 2 around the tree, 3 across the rest of the page */}
      <WindSprite
        xRange={[2, 22]}
        yRange={[8, 35]}
        width="8.4%"
        opacity={0.75}
        initialDelay={0}
        pauseMs={2800}
        fps={12}
        zIndex={6}
      />
      <WindSprite
        xRange={[5, 30]}
        yRange={[30, 55]}
        width="7.2%"
        opacity={0.7}
        initialDelay={1400}
        pauseMs={3200}
        fps={11}
        zIndex={6}
      />
      {/* Right side of page */}
      <WindSprite
        xRange={[42, 62]}
        yRange={[5, 30]}
        width="6%"
        opacity={0.6}
        initialDelay={700}
        pauseMs={3800}
        fps={10}
        zIndex={6}
      />
      <WindSprite
        xRange={[60, 80]}
        yRange={[15, 45]}
        width="5.4%"
        opacity={0.55}
        initialDelay={2100}
        pauseMs={3000}
        fps={12}
        zIndex={6}
      />
      <WindSprite
        xRange={[78, 94]}
        yRange={[8, 38]}
        width="6.6%"
        opacity={0.65}
        initialDelay={3200}
        pauseMs={2600}
        fps={11}
        zIndex={6}
      />
      <AnimatedLogo className="absolute top-[15%] right-[8%]" style={{ width: "42%" }} />
      <a
        href="https://rodeo.freetailhackers.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute transition-transform duration-200 hover:scale-110 hover:brightness-110"
        style={{ width: "18%", top: "55%", left: "52%" }}
      >
        <img src={bottleSvg} alt="Bottle" className="w-full" />
      </a>
      <a
        href="https://rodeo.freetailhackers.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute transition-transform duration-200 hover:scale-110 hover:brightness-110"
        style={{ width: "9%", top: "58%", left: "47%" }}
      >
        <img src={cookieSvg} alt="Cookie" className="w-full" />
      </a>
    </div>
  );
}
