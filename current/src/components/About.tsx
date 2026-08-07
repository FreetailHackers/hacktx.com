import leftTopVine from "../assets/about/left top vine.png";
import leftVine from "../assets/about/left vine.png";
import rightVine from "../assets/about/right vine.png";
import leaf1 from "../assets/about/leaf 1.png";
import leaf2 from "../assets/about/leaf 2.png";
import leaf3 from "../assets/about/leaf 3.png";
import leaf4 from "../assets/about/leaf 4.png";

export default function AboutSection() {
  return (
    <section
      className="relative w-full overflow-visible"
      style={{ background: "#EFE8CE", marginTop: "-2px" }}
    >
      {/* ── Leaf 1 — above vines ── */}
      {/* mobile: top/left/width | desktop (md:): top/left/width */}
      <img
        src={leaf1}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute z-[4] w-[30%] top-[10%] left-[5%] md:w-[30%] md:top-[27%] md:left-[57%]"
        style={{ transform: "none" }}
      />

      {/* ── Leaf 2 — above vines ── */}
      {/* mobile: top/left/width | desktop (md:): top/left/width */}
      <img
        src={leaf2}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute z-[4] w-[30%] top-[10%] left-[5%] md:w-[30%] md:top-[45%] md:left-[72%]"
        style={{ transform: "none" }}
      />

      {/* ── Leaf 3 — above vines ── */}
      {/* mobile: top/left/width | desktop (md:): top/left/width */}
      <img
        src={leaf3}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute z-[4] w-[30%] top-[10%] left-[5%] md:w-[45%] md:top-[60%] md:left-[47%]"
        style={{ transform: "none" }}
      />

      {/* ── Leaf 4 — above vines ── */}
      {/* mobile: top/left/width | desktop (md:): top/left/width */}
      <img
        src={leaf4}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute z-[4] w-[30%] top-[10%] left-[5%] md:w-[46%] md:top-[57%] md:left-[1%]"
        style={{ transform: "none" }}
      />

      {/* ── Vines — fixed decorative layers, independent of text ── */}
      <img
        src={leftTopVine}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-40 left-0 z-[1] w-[75%] md:w-[42%]"
        style={{ transform: "translate(0%, -40%" }}
      />
      <img
        src={rightVine}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-0 z-[1] w-[48%] md:w-[44%] top-[35%] md:top-[10%]"
        style={{ transform: "translate(0%, 22%) scaleX(1.2) scaleY(1.4)" }}
      />
      <img
        src={leftVine}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-[80%] left-0 z-[1] w-[55%] md:w-[42%] md:top-auto md:bottom-[-5%]"
        style={{ transform: "translate(0%, -5%) scaleX(1.2)", transformOrigin: "left center" }}
      />

      {/* ══ Content — full width, no vine-avoidance padding ══ */}
      <div className="relative z-[5]">
        {/* Title — left aligned */}
        <div className="pl-40 pr-[10%] md:pl-250 md:pr-[45%] pt-34 pb-2 md:pt-[36rem] text-left">
          <h2
            className="font-['Pirata_One',serif] text-7xl sm:text-8xl md:text-[13rem] leading-tight"
            style={{ color: "#27231C" }}
          >
            About Us
          </h2>
        </div>

        {/* Block 1 — right aligned */}
        <div
          className="pl-[40%] pr-[10%] md:pl-[30%] md:pr-[10%] pt-6 pb-10 md:pt-20 md:pb-14 text-center min-h-[120vw] md:min-h-[70vw]"
        >
          <p
            className="text-xl sm:text-6xl md:text-7xl leading-snug w-full px-1 py-0.5 rounded-sm"
            style={{
              color: "#3D3726",
              fontFamily: "'Aunt Mildred MVB', serif",
              background: "rgba(239, 232, 206, 0.75)",
            }}
          >
            HackTX is a 24-hour hackathon where technologists from across the country gather in Austin to
            build, imagine, and create together. Like any good fairy tale, it begins with curious minds, bold
            ideas, and the belief that something meaningful can be made from nothing.
          </p>
        </div>

        {/* Block 2 */}
        <div
          className="pl-[5%] pr-[40%] md:pl-[10%] md:pr-[45%] pb-0 md:pb-10 text-center mt-[-20vw] md:-mt-[45vw] min-h-[140vw] md:min-h-[100vw]"
        >
          <p
            className="text-xl sm:text-6xl md:text-7xl leading-snug w-full px-1 py-0.5 rounded-sm"
            style={{
              color: "#3D3726",
              fontFamily: "'Aunt Mildred MVB', serif",
              background: "rgba(239, 232, 206, 0.75)",
            }}
          >
            Join us for HackTX 2026 and become part of a growing tradition. Over the past decade, HackTX has
            welcomed more than 5,000 participants and awarded over $100,000 in prizes — and this year's story
            is just getting started.
          </p>
        </div>

        {/* Block 3 */}
        <div
          className="pl-[20%] pr-[20%] md:pl-[25%] md:pr-[40%] pb-18 md:pb-15 text-center mt-[20vw] md:-mt-[76vw] min-h-[90vw] md:min-h-[90vw]"
        >
          <p
            className="text-xl sm:text-6xl md:text-7xl leading-snug w-full px-1 py-0.5 rounded-sm"
            style={{
              color: "#3D3726",
              fontFamily: "'Aunt Mildred MVB', serif",
              background: "rgba(239, 232, 206, 0.75)",
            }}
          >
            Backed by a dedicated team of over 60 organizers across six committees, we design events that
            spark creativity, encourage collaboration, and push the boundaries of what's possible, one chapter
            at a time.
          </p>
        </div>
      </div>
    </section>
  );
}
