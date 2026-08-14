import landingSvg from "../assets/Landing.svg";
import AnimatedLogo from "./AnimatedLogo";
import bottleSvg from "../assets/bottle.svg";
import cookieSvg from "../assets/cookie.svg";

export default function DesktopLanding() {
  return (
    <div className="relative">
      <img src={landingSvg} alt="HackTX Landing" className="w-full h-auto block" />
      <AnimatedLogo className="absolute top-[15%] right-[8%]" style={{ width: "42vw" }} />
      <a
        href="https://cumbersome-puma-4a6.notion.site/38b7fa08b4598043b425ec91f2136b7c"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute transition-transform duration-200 hover:scale-110 hover:brightness-110"
        style={{ width: "18vw", top: "55%", left: "52%" }}
      >
        <img src={bottleSvg} alt="Bottle" className="w-full" />
      </a>
      <a
        href="https://cumbersome-puma-4a6.notion.site/38b7fa08b4598043b425ec91f2136b7c"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute transition-transform duration-200 hover:scale-110 hover:brightness-110"
        style={{ width: "9vw", top: "58%", left: "47%" }}
      >
        <img src={cookieSvg} alt="Cookie" className="w-full" />
      </a>
    </div>
  );
}
