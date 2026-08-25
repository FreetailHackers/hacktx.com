import leftVine from "../assets/about/Left-Vine-Mobile.svg";
import rightVine from "../assets/about/Right-Vine-Mobile.svg";

export default function MobileAboutSection() {
  return (
    <section
      className="relative w-full overflow-visible"
      style={{ background: "#EFE8CE", marginTop: "-2px" }}
    >
      {/* ── Vines ── */}
      <img
        src={leftVine}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute top-[-5%] left-0 z-[1] w-[100%]"
      />

      <img
        src={rightVine}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-0 z-[1] w-[70%] top-[-7%]"
      />

      {/* ══ Content ══ */}
      <div className="relative z-[5]">
        {/* Title */}
        <div className="pl-10 pr-[30%] pt-15 pb-2 text-left">
          <h2
            className="font-['Pirata_One',serif] text-7xl sm:text-8xl leading-tight"
            style={{ color: "#27231C" }}
          >
            About Us
          </h2>
        </div>

        {/* Block 1 */}
        <div className="pl-[20%] pr-[5%] pt-6 pb-10 text-center min-h-[120vw]">
          <p
            className="text-xl leading-snug w-full px-3 py-2"
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
        <div className="pl-[5%] pr-[40%] pb-0 text-center mt-[-3vw] min-h-[140vw]">
          <p
            className="text-xl leading-snug w-full px-3 py-2"
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
            welcomed more than 5,000 participants and awarded over $100,000 in prizes.
          </p>
        </div>

        {/* Block 3 */}
        <div className="pl-[30%] pr-[5%] pb-10 text-center mt-[-63%] min-h-[90vw]">
          <p
            className="text-xl leading-snug w-full px-3 py-2"
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
