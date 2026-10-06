import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import bedPillar from "../assets/sponsors/bed pillar.svg";
import centerFrame from "../assets/sponsors/center frame.png";
import frameDesign from "../assets/sponsors/frame design.png";
import outerFrame from "../assets/sponsors/outer frame.png";
import pillow from "../assets/sponsors/pillow.svg";
import metaLogo from "../assets/sponsors/logos/meta.png";
import annapurnaLogo from "../assets/sponsors/logos/TRANSPARENT Annapurna Logo Horizontal.png";
import nmc2Logo from "../assets/sponsors/logos/NMC2 Logo.png";
import tfsLogo from "../assets/sponsors/logos/TFS_logo_horiz_black_RGB_2021 (2).png";
import visaLogo from "../assets/sponsors/logos/Visa Logo.png";
import bhwLogo from "../assets/sponsors/logos/BHW-logo-black.png";
import descoLogo from "../assets/sponsors/logos/DESCO_Logo_2C.jpg";
import capitalOneLogo from "../assets/sponsors/logos/capitalone_logo_logo_colored (1).jpg";
import bottomMattress from "../assets/sponsors/mattresses/bottom mattress.png";
import blueFloralMattress from "../assets/sponsors/mattresses/mattress.png";
import diamondMattress from "../assets/sponsors/mattresses/diamond.png";
import blueMattress from "../assets/sponsors/mattresses/Rectangle 91.png";
import greenGridMattress from "../assets/sponsors/mattresses/mattress d.png";
import beigeMattress from "../assets/sponsors/mattresses/beige.png";
import zigzagMattress from "../assets/sponsors/mattresses/mattress e.png";
import redDotMattress from "../assets/sponsors/mattresses/Rectangle 83.png";
import stripedMattress from "../assets/sponsors/mattresses/mattress a.png";
import dustyMattress from "../assets/sponsors/mattresses/dusty.png";
import lavenderMattress from "../assets/sponsors/mattresses/mattress c.png";
import navyFloralMattress from "../assets/sponsors/mattresses/mattress-1.png";
import headerMattress from "../assets/sponsors/mattresses/header mattress.png";
import pea from "../assets/sponsors/mattresses/pea.png";

interface Sponsor {
  name: string;
  href: string;
  logo?: string;
  showName?: boolean;
  gold?: boolean;
}

// Add sponsors here. New entries automatically fill the pillow slots below.
const SPONSORS: Sponsor[] = [
  {
    name: "Meta",
    href: "https://www.meta.com/",
    logo: metaLogo,
    gold: true,
  },
  {
    name: "Visa",
    href: "https://www.visa.com/",
    logo: visaLogo,
  },
  {
    name: "Annapurna",
    href: "https://www.linkedin.com/company/annapurna-labs/",
    logo: annapurnaLogo,
  },
  {
    name: "NMC2",
    href: "https://nmc2.com/",
    logo: nmc2Logo,
  },
  {
    name: "TFS",
    href: "https://www.toyotafinancial.com/us/en.html",
    logo: tfsLogo,
  },
  {
    name: "BHW",
    href: "https://thebhwgroup.com/",
    logo: bhwLogo,
  },
  {
    name: "D. E. Shaw",
    href: "https://www.deshaw.com/",
    logo: descoLogo,
  },
  {
    name: "Capital One",
    href: "https://www.capitalone.com/",
    logo: capitalOneLogo,
  },
];

interface PillowSlot {
  left: number;
  top: number;
  width: number;
}

const PILLOW_ROWS = [
  { top: 20.6, width: 28,   positions: [50] },
  { top: 43.0, width: 21,   positions: [25, 50, 75] },
  { top: 64.0, width: 17.5, positions: [19, 39.7, 60.3, 81] },
];

const PILLOW_SLOTS: PillowSlot[] = PILLOW_ROWS.flatMap((row) =>
  row.positions.map((left) => ({ left, top: row.top, width: row.width })),
);

interface MattressLayer {
  src: string;
  top: number;
  width: number;
  angle: number;
}

// Bottom-to-top order controls both the final overlap and landing sequence.
const MATTRESS_LAYERS: MattressLayer[] = [
  { src: bottomMattress, top: 90.7, width: 93.5, angle: -1.5 },
  { src: blueFloralMattress, top: 83.2, width: 90.5, angle: 1.2 },
  { src: diamondMattress, top: 75.5, width: 94.0, angle: -1.1 },
  { src: blueMattress, top: 70.1, width: 91.0, angle: 0.8 },
  { src: greenGridMattress, top: 62.2, width: 94.5, angle: -0.8 },
  { src: beigeMattress, top: 55.4, width: 92.8, angle: 1.0 },
  { src: zigzagMattress, top: 45.8, width: 92.0, angle: -1.2 },
  { src: redDotMattress, top: 36.8, width: 93.0, angle: 1.1 },
  { src: stripedMattress, top: 30.0, width: 95.5, angle: -0.8 },
  { src: dustyMattress, top: 21.6, width: 92.0, angle: 0.9 },
  { src: lavenderMattress, top: 13.2, width: 89.5, angle: -0.7 },
  { src: navyFloralMattress, top: 6.1, width: 91.5, angle: 0.8 },
  // The header asset includes wider transparent side padding than the other layers.
  { src: headerMattress, top: 0.0, width: 99.8, angle: -0.6 },
];

const MATTRESS_STAGGER_MS = 115;
const MATTRESS_LANDING_MS = 680;
const PILLOW_START_MS = (MATTRESS_LAYERS.length - 1) * MATTRESS_STAGGER_MS + MATTRESS_LANDING_MS + 140;

function SponsorPillow({ sponsor, slot, index }: { sponsor: Sponsor; slot: PillowSlot; index: number }) {
  const showName = sponsor.showName || !sponsor.logo;
  const animationDelay = `${PILLOW_START_MS + index * 110}ms`;

  return (
    <a
      className="sponsor-pillow"
      href={sponsor.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${sponsor.name} website`}
      style={{
        left: `${slot.left}%`,
        top: `${slot.top}%`,
        width: `${slot.width}%`,
        animationDelay,
      }}
    >
      <span className="sponsor-pillow-contents">
        <img
          className={`sponsor-pillow-shape${sponsor.gold ? " sponsor-pillow-shape--gold" : ""}`}
          src={pillow}
          alt=""
          aria-hidden="true"
        />
        <span className={`sponsor-pillow-logo${showName ? " sponsor-pillow-logo-with-name" : ""}`}>
          {sponsor.logo && <img src={sponsor.logo} alt="" aria-hidden="true" />}
          {showName && <span className="sponsor-name">{sponsor.name}</span>}
        </span>
      </span>
    </a>
  );
}

export default function Sponsors() {
  const sectionRef = useRef<HTMLElement>(null);
  const [animationStarted, setAnimationStarted] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setAnimationStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.14 },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="sponsors-section" aria-labelledby="sponsors-title">
      <div className={`sponsors-bed${animationStarted ? " sponsors-bed-animated" : ""}`}>
        <h2 id="sponsors-title" className="sponsors-title">
          Thank you to our partners!
        </h2>

        <div className="sponsors-mattress-stack" aria-hidden="true">
          <img className="sponsors-pea" src={pea} alt="" />
          {MATTRESS_LAYERS.map((mattress, index) => (
            <img
              key={mattress.src}
              className="sponsors-mattress"
              src={mattress.src}
              alt=""
              style={
                {
                  top: `${mattress.top}%`,
                  width: `${mattress.width}%`,
                  zIndex: index + 1,
                  animationDelay: `${index * MATTRESS_STAGGER_MS}ms`,
                  "--drop-angle": `${mattress.angle}deg`,
                } as CSSProperties
              }
            />
          ))}
        </div>

        <div className="sponsors-pillows">
          {SPONSORS.slice(0, PILLOW_SLOTS.length).map((sponsor, index) => (
            <SponsorPillow key={sponsor.name} sponsor={sponsor} slot={PILLOW_SLOTS[index]} index={index} />
          ))}
        </div>

        <img className="sponsors-pillar sponsors-pillar-left" src={bedPillar} alt="" aria-hidden="true" />
        <img className="sponsors-pillar sponsors-pillar-right" src={bedPillar} alt="" aria-hidden="true" />

        <div className="sponsors-footboard" aria-hidden="true">
          <img className="sponsors-outer-frame" src={outerFrame} alt="" />
          <img className="sponsors-center-frame" src={centerFrame} alt="" />
          <img className="sponsors-frame-design" src={frameDesign} alt="" />
        </div>
      </div>
    </section>
  );
}
