import facebookIcon from "../assets/links/facebook.png";
import instagramIcon from "../assets/links/instagram.png";
import linkedinIcon from "../assets/links/linkedin.png";
import tiktokIcon from "../assets/links/tiktok.png";
import twitterIcon from "../assets/links/twitter.png";

const BG = "#413720";
const WHITE = "#FFFDF6";
const MUTED = "#A08D6E";

interface LinkItem {
  label: string;
  href?: string;
  comingSoon?: boolean;
}

function ColHeader({ children }: { children: React.ReactNode }) {
  return (
    <h3
      style={{
        color: WHITE,
        fontFamily: "Pirata One",
        fontSize: "clamp(20px, 2vw, 28px)",
        fontWeight: 400,
        textTransform: "uppercase",
        textAlign: "left",
        marginBottom: "1rem",
        letterSpacing: "0.04em",
      }}
    >
      {children}
    </h3>
  );
}

function ColLink({ item }: { item: LinkItem }) {
  if (item.comingSoon) {
    return (
      <p
        style={{
          color: MUTED,
          fontFamily: "Aunt Mildred MVB, serif",
          fontSize: "clamp(13px, 1.1vw, 16px)",
          lineHeight: "1.8",
          textAlign: "left",
          margin: 0,
        }}
      >
        {item.label} <span style={{ fontSize: "0.8em", opacity: 0.7 }}>(coming soon)</span>
      </p>
    );
  }
  return (
    <a
      href={item.href}
      target={item.href?.startsWith("mailto") ? undefined : "_blank"}
      rel="noopener noreferrer"
      style={{
        display: "block",
        color: WHITE,
        fontFamily: "Aunt Mildred MVB, serif",
        fontSize: "clamp(13px, 1.1vw, 16px)",
        lineHeight: "1.8",
        textAlign: "left",
        textDecoration: "none",
        transition: "opacity 0.15s",
      }}
      onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.7")}
      onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
    >
      {item.label}
    </a>
  );
}

const socialLinks = [
  { href: "https://www.instagram.com/freetailhackers/", icon: instagramIcon, label: "Instagram" },
  { href: "https://www.facebook.com/freetailhackers", icon: facebookIcon, label: "Facebook" },
  { href: "https://twitter.com/freetailhackers", icon: twitterIcon, label: "Twitter / X" },
  { href: "https://www.linkedin.com/company/freetail-hackers", icon: linkedinIcon, label: "LinkedIn" },
  { href: "https://www.tiktok.com/@freetailhackers", icon: tiktokIcon, label: "TikTok" },
];

const hacktxLinks: LinkItem[] = [
  { label: "Devpost", comingSoon: true },
  { label: "Hacker Resources", href: "https://uhsg.freetailhackers.com/" },
  { label: "Discord", comingSoon: true },
  { label: "MLH", href: "https://mlh.io" },
];

const hackerResourceLinks: LinkItem[] = [
  { label: "GitHub Student Pack", href: "https://education.github.com/pack" },
  { label: "MLH Hacker Guide", href: "https://guide.mlh.io" },
  { label: "Devpost", href: "https://devpost.com" },
  {
    label: "HackTX Code of Conduct",
    href: "https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md",
  },
  { label: "MLH Privacy Policy", href: "https://mlh.io/privacy" },
];

const texasHackathons: LinkItem[] = [
  { label: "TAMUhack", href: "https://tamuhack.org" },
  { label: "HackUTD", href: "https://hackutd.co" },
  { label: "RowdyHacks", href: "https://rowdyhacks.org" },
  { label: "HackRice", href: "https://hackrice.com" },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: BG }} className="w-full pt-16 pb-10 px-6 md:px-16">
      {/* Big header */}
      <h1
        style={{
          color: WHITE,
          fontFamily: "Pirata One",
          fontSize: "clamp(40px, 7vw, 96px)",
          fontWeight: 400,
          textTransform: "uppercase",
          textAlign: "center",
          lineHeight: "normal",
          margin: 0,
        }}
      >
        Freetail Hackers
      </h1>

      {/* Sub-header */}
      <p
        style={{
          color: MUTED,
          fontFamily: "Aunt Mildred MVB, serif",
          fontSize: "clamp(14px, 1.4vw, 20px)",
          textAlign: "center",
          marginTop: "0.5rem",
          marginBottom: "4rem",
          letterSpacing: "0.08em",
          textTransform: "uppercase",
        }}
      >
        Made with ♥ by Freetail Hackers
      </p>

      {/* Divider */}
      <div style={{ borderTop: `1px solid ${MUTED}40`, marginBottom: "3rem" }} />

      {/* 4 columns */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-10 max-w-6xl mx-auto">
        {/* Column 1 — Freetail Hackers */}
        <div>
          <ColHeader>Freetail Hackers</ColHeader>
          <ColLink item={{ label: "freetailhackers.com", href: "https://freetailhackers.com" }} />
          <ColLink item={{ label: "admin@freetailhackers.com", href: "mailto:admin@freetailhackers.com" }} />

          {/* Social icons */}
          <div style={{ display: "flex", gap: "0.75rem", marginTop: "1.25rem", flexWrap: "wrap" }}>
            {socialLinks.map(({ href, icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                style={{ display: "inline-flex", transition: "opacity 0.15s" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.7")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
              >
                <img
                  src={icon}
                  alt={label}
                  style={{
                    width: "clamp(20px, 2vw, 28px)",
                    height: "clamp(20px, 2vw, 28px)",
                    objectFit: "contain",
                  }}
                />
              </a>
            ))}
          </div>
        </div>

        {/* Column 2 — HackTX 2026 */}
        <div>
          <ColHeader>HackTX 2026</ColHeader>
          {hacktxLinks.map((item) => (
            <ColLink key={item.label} item={item} />
          ))}
        </div>

        {/* Column 3 — Hacker Resources */}
        <div>
          <ColHeader>Hacker Resources</ColHeader>
          {hackerResourceLinks.map((item) => (
            <ColLink key={item.label} item={item} />
          ))}
        </div>

        {/* Column 4 — Other Hackathons */}
        <div>
          <ColHeader>Other Hackathons</ColHeader>
          {texasHackathons.map((item) => (
            <ColLink key={item.label} item={item} />
          ))}
        </div>
      </div>

      {/* Bottom strip */}
      <div
        style={{
          borderTop: `1px solid ${MUTED}40`,
          marginTop: "3rem",
          paddingTop: "1.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <span
          style={{
            color: MUTED,
            fontFamily: "Aunt Mildred MVB, serif",
            fontSize: "clamp(11px, 1vw, 14px)",
          }}
        >
          &copy; Freetail Hackers 2026
        </span>
        <a
          href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: MUTED,
            fontFamily: "Aunt Mildred MVB, serif",
            fontSize: "clamp(11px, 1vw, 14px)",
            textDecoration: "underline",
            textUnderlineOffset: "2px",
            transition: "opacity 0.15s",
          }}
          onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.7")}
          onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
        >
          Code of Conduct
        </a>
      </div>
    </footer>
  );
}
