import leftTopVine from "../assets/about/left top vine.svg";
import middleVine from "../assets/about/middle vine.png";
import leftBottomVine from "../assets/about/left-vine-mobile.png";
import rightVine from "../assets/about/right vine.png";
import rightTopVine from "../assets/about/right top vine.png";
import hackersLeaf from "../assets/about/leaf 1.png";
import prizesLeaf from "../assets/about/leaf 2.png";
import eventsLeaf from "../assets/about/leaf 3.png";
import organizersLeaf from "../assets/about/leaf 4.png";

export default function AboutSection() {
  return (
    <section className="about-scene" aria-labelledby="about-title">
      <img className="about-vine about-vine-left-top" src={leftTopVine} alt="" aria-hidden="true" />
      <img className="about-vine about-vine-middle" src={middleVine} alt="" aria-hidden="true" />
      <img className="about-vine about-vine-left-bottom" src={leftBottomVine} alt="" aria-hidden="true" />
      <img className="about-vine about-vine-right-top" src={rightTopVine} alt="" aria-hidden="true" />
      <img className="about-vine about-vine-right" src={rightVine} alt="" aria-hidden="true" />

      <div className="about-copy">
        <h2 id="about-title">About Us</h2>
        <p>
          Brought to you by a dedicated team of over 60 organizers across six committees, HackTX is a
          24-hour hackathon where students from across the country gather in Austin to build, imagine,
          and create together. Like any good fairy tale, it begins with curious minds, bold ideas, and
          the belief that something meaningful can be made from nothing.
        </p>
      </div>

      <img className="about-stat about-stat-organizers" src={organizersLeaf} alt="60+ organizers" />
      <img className="about-stat about-stat-hackers" src={hackersLeaf} alt="9,000+ hackers" />
      <img className="about-stat about-stat-events" src={eventsLeaf} alt="14 HackTX events" />
      <img className="about-stat about-stat-prizes" src={prizesLeaf} alt="$100K+ in prizes" />
    </section>
  );
}
