export default function Home() {
  return (
    <>
      {/* MLH Trust Badge */}
      <a
        id="mlh-trust-badge"
        className="mlh-badge fixed top-0 right-8.5 w-[10%] max-w-25 min-w-15 z-10000 block"
        href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2026-season&utm_content=black"
        target="_blank"
        rel="noopener noreferrer"
      >
        <img
          src="https://logged-assets.s3.amazonaws.com/trust-badge/2027/mlh-trust-badge-2027-black.svg"
          alt="Major League Hacking 2026 Hackathon Season"
          className="w-full"
        />
      </a>

      <main className="min-h-dvh bg-[linear-gradient(155deg,#2d2060_0%,#513E99_25%,#8a4e7a_55%,#BC7953_100%)] relative overflow-hidden flex flex-col">
        {/* Dark left veil */}
        <div className="absolute inset-0 bg-[linear-gradient(100deg,rgba(20,14,40,0.65)_0%,rgba(20,14,40,0.2)_55%,transparent_80%)] pointer-events-none" />

        {/* Ghost "26" watermark */}
        <div className="v2-fade v2-ghost">26</div>

        {/* Top bar */}
        <div className="v2-topbar">
          <div className="v2-r1">
            <img
              src="./logo-transparent.png"
              alt="Freetail Hackers"
              width={130}
              height={130}
              className="v2-logo"
            />
          </div>
        </div>

        {/* Main content */}
        <div className="v2-content">
          <h1 className="font-(--font-anton) leading-[0.88] tracking-[-0.01em] m-0 mb-9 flex flex-col gap-[clamp(8px,2vw,20px)]">
            <div className="v2-r3 overflow-hidden">
              <span className="block text-[clamp(100px,22vw,200px)] text-white">HACK</span>
            </div>
            <div className="v2-r4 overflow-hidden">
              <span className="block text-[clamp(100px,22vw,200px)] text-transparent [-webkit-text-stroke:2px_rgba(255,255,255,0.9)]">
                TX&nbsp;26
              </span>
            </div>
          </h1>

          <div className="v2-r1 mb-4">
            <span className="font-(--font-dm-sans) text-[16px] text-white/60 tracking-[0.28em] uppercase">
              UT Austin&nbsp;&nbsp;·&nbsp;&nbsp;Oct 2026
            </span>
          </div>

          <div className="v2-r1 v2-wordmark mb-10">
            <span className="font-(--font-dm-sans) text-[28px] text-white/55 tracking-[0.22em] uppercase">
              Freetail Hackers
            </span>
          </div>

          <div className="v2-r5 v2-bottom">
            <span className="font-(--font-dm-sans) text-[15px] text-white/65 tracking-[0.16em] uppercase">
              Coming Soon
            </span>
            <span className="v2-dot text-white/25">·</span>
            <a
              href="https://cumbersome-puma-4a6.notion.site/38b7fa08b4598043b425ec91f2136b7c"
              target="_blank"
              rel="noopener noreferrer"
              className="v2-cta"
            >
              Interest Form
            </a>
          </div>
        </div>

        {/* Footer */}
        <footer className="relative z-[2] flex items-center justify-between px-[max(48px,6vw)] py-4 gap-4 flex-wrap">
          <span className="font-(--font-dm-sans) text-[13px] text-white/50 tracking-[0.1em]">
            &copy; Freetail Hackers 2026
          </span>
          <a
            href="https://github.com/MLH/mlh-policies/blob/main/code-of-conduct.md"
            target="_blank"
            rel="noopener noreferrer"
            className="font-(--font-dm-sans) text-[13px] text-white/50 tracking-[0.1em] hover:text-white/80 transition-colors duration-200"
          >
            Code of Conduct
          </a>
        </footer>
      </main>
    </>
  );
}
