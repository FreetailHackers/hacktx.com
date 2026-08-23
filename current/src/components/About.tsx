import leftTopVine from "../assets/about/Left-Vines.png";
import rightVine from "../assets/about/Right-Vine.png";

export default function AboutSection() {
  return (
    <section
      className="relative w-full overflow-visible pb-150"
      style={{ background: "#EFE8CE", marginTop: "-2px" }}
    >
      {/* ── Vines ── */}
      <img
        src={leftTopVine}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-[35%] left-0 z-[1] w-[50%] vine-top-transform"
      />
      <img
        src={rightVine}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-0 z-[1] w-[44%] top-[20%] vine-right-transform"
      />

      {/* ══ Content ══ */}
      <div className="relative z-[5]">
        {/* Title */}
        <div className="pt-25 -ml-[15%] pl-[0%] pr-[5%] pb-2 text-left">
          <h2
            className="font-['Pirata_One',serif] text-[7.8rem] leading-tight whitespace-nowrap"
            style={{ color: "#27231C" }}
          >
            About Us
          </h2>
        </div>

        {/* Block 1 */}
        <div className="pl-[30%] pr-[10%] pt-20 pb-14 text-center">
          <p
            className="text-[2.52rem] leading-snug w-full px-3 py-2"
            style={{
              color: "#3D3726",
              fontFamily: "'Aunt Mildred MVB', serif",
              background: "#EFE8CE",
              border: "1.5px solid #6B7A3A",
              boxShadow: "0 0 0 4px #EFE8CE, 0 0 0 6px #6B7A3A",
              borderRadius: "2px",
            }}
          >
            HackTX is a 24-hour hackathon where technologists from across the country gather in Austin to
            build, imagine, and create together. Like any good fairy tale, it begins with curious minds, bold
            ideas, and the belief that something meaningful can be made from nothing.
          </p>
        </div>

        {/* Block 2 */}
        <div className="pl-[10%] pr-[45%] pb-10 text-center mt-35">
          <p
            className="text-[2.52rem] leading-snug w-full px-3 py-2"
            style={{
              color: "#3D3726",
              fontFamily: "'Aunt Mildred MVB', serif",
              background: "#EFE8CE",
              border: "1.5px solid #6B7A3A",
              boxShadow: "0 0 0 4px #EFE8CE, 0 0 0 6px #6B7A3A",
              borderRadius: "2px",
            }}
          >
            Join us for HackTX 2026 and become part of a growing tradition. Over the past decade, HackTX has
            welcomed more than 5,000 participants and awarded over $100,000 in prizes — and this year's story
            is just getting started.
          </p>
        </div>

        {/* Block 3 */}
        <div className="pl-[25%] pr-[40%] pb-15 text-center mt-10">
          <p
            className="text-[2.52rem] leading-snug w-full px-3 py-2"
            style={{
              color: "#3D3726",
              fontFamily: "'Aunt Mildred MVB', serif",
              background: "#EFE8CE",
              border: "1.5px solid #6B7A3A",
              boxShadow: "0 0 0 4px #EFE8CE, 0 0 0 6px #6B7A3A",
              borderRadius: "2px",
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
