import mobileLandingSvg from '../assets/Mobile-Landing.svg';
import AnimatedLogo from './AnimatedLogo';
import bottleSvg from '../assets/bottle.svg';
import cookieSvg from '../assets/cookie.svg';

export default function MobileLanding() {
  return (
    <div className="relative">
      <img src={mobileLandingSvg} alt="HackTX Landing" className="w-full h-auto block" />
      {/* Logo centered, animated draw */}
      <AnimatedLogo
        className="absolute left-1/2 -translate-x-1/2"
        style={{ top: '4%', width: '90vw' }}
      />
      {/* Cookie right of trunk, at the grass line */}
      <a
        href="https://cumbersome-puma-4a6.notion.site/38b7fa08b4598043b425ec91f2136b7c"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute transition-transform duration-200 hover:scale-110 hover:brightness-110"
        style={{ top: '50%', left: '28%', width: '26.2vw', zIndex: 10 }}
      >
        <img src={cookieSvg} alt="Cookie" className="w-full" />
      </a>
      {/* Bottle aligned with cookie */}
      <a
        href="https://cumbersome-puma-4a6.notion.site/38b7fa08b4598043b425ec91f2136b7c"
        target="_blank"
        rel="noopener noreferrer"
        className="absolute transition-transform duration-200 hover:scale-110 hover:brightness-110"
        style={{ top: '47%', left: '44%', width: '52vw' }}
      >
        <img src={bottleSvg} alt="Bottle" className="w-full" />
      </a>
    </div>
  );
}
