import { useState } from "react";

const BG = "#EFE8CE";
const TEXT = "#3D3726";
const BORDER = "#6B7A3A";

const faqs: { q: string; a: string }[] = [
  {
    q: "What is HackTX?",
    a: "HackTX is a 24-hour hackathon where students come together to build creative projects, learn new skills, and have fun!",
  },
  {
    q: "When is HackTX?",
    a: "Oct 24–25!",
  },
  {
    q: "Who can participate?",
    a: "HackTX is open only to currently enrolled students at The University of Texas at Austin.",
  },
  {
    q: "How much does it cost?",
    a: "Nothing! HackTX is completely free for all participants. We provide meals, snacks, and swag.",
  },
  {
    q: "Do I need a team?",
    a: "Nope! You can come solo and find a team at the event, or bring your own team of up to 4 people.",
  },
  {
    q: "What should I bring?",
    a: "Bring your laptop, charger, and anything else you need to be comfortable for 24 hours. We'll provide the rest!",
  },
  {
    q: "Where is HackTX?",
    a: "Check back soon for location details! Follow our socials for the latest updates.",
  },
  {
    q: "How do I apply?",
    a: "Applications are closed right now! However, we are taking walk-ins day of the event as space provides.",
  },
  {
    q: "How can I volunteer or mentor?",
    a: "We are always looking for mentors to answer student questions or workshop suggestions, as well as general volunteers to help run our event. If you want to help out, shoot us an email at admin@freetailhackers.com!",
  },
  {
    q: "What are the rules?",
    a: "All work must be done at the event. You can't demo something you didn't build. Don't talk about Fight Club. All attendees must abide by the MLH Code of Conduct.",
  },
  {
    q: "Will there be prizes?",
    a: "Yes! There will be $25k+ in prizes.",
  },
  {
    q: "I have more questions!",
    a: "Don't hesitate to reach out to admin@freetailhackers.com.",
  },
];

function FaqItem({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div
      style={{
        border: `1.5px solid ${BORDER}`,
        boxShadow: `0 0 0 4px ${BG}, 0 0 0 6px ${BORDER}`,
        borderRadius: "2px",
        marginBottom: "1.75rem",
        background: BG,
      }}
    >
      <button
        onClick={onToggle}
        aria-expanded={open}
        className="w-full text-left flex items-center justify-between gap-4 px-5 py-4 cursor-pointer"
        style={{
          background: "none",
          border: "none",
          fontFamily: "'Aunt Mildred MVB', serif",
          fontSize: "clamp(1.1rem, 1.9vw, 1.5rem)",
          color: TEXT,
          lineHeight: "1.4",
        }}
      >
        <span>{q}</span>
        <span
          style={{
            flexShrink: 0,
            fontSize: "clamp(1.2rem, 2vw, 1.6rem)",
            lineHeight: 1,
            color: BORDER,
            transition: "transform 0.2s",
            transform: open ? "rotate(45deg)" : "rotate(0deg)",
            display: "inline-block",
          }}
          aria-hidden="true"
        >
          +
        </span>
      </button>

      {open && (
        <div
          className="px-5 pb-5"
          style={{
            fontFamily: "'Aunt Mildred MVB', serif",
            fontSize: "clamp(1rem, 1.6vw, 1.3rem)",
            color: TEXT,
            lineHeight: "1.7",
            borderTop: `1px solid ${BORDER}40`,
            paddingTop: "1rem",
          }}
        >
          {a}
        </div>
      )}
    </div>
  );
}

export default function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section
      className="relative w-full"
      style={{ background: BG, paddingBottom: "8rem" }}
    >
      {/* ── Content ── */}
      <div className="relative z-[5] max-w-6xl mx-auto px-6 md:px-14">
        {/* Title */}
        <div className="pb-10 pt-8">
          <h2
            className="font-['Pirata_One',serif] text-left"
            style={{
              fontSize: "clamp(3.5rem, 8vw, 7rem)",
              color: "#27231C",
              lineHeight: 1,
            }}
          >
            FAQ
          </h2>
        </div>

        {/* Two-column grid on md+, single column on mobile */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:gap-x-10 items-start">
          {faqs.map((item, i) => (
            <FaqItem
              key={item.q}
              q={item.q}
              a={item.a}
              open={openIndex === i}
              onToggle={() => setOpenIndex(openIndex === i ? null : i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
