import { useState } from "react";
import type { ReactNode } from "react";

const BG = "#EFE8CE";
const TEXT = "#3D3726";
const BORDER = "#6B7A3A";

const faqs: { q: string; a: ReactNode }[] = [
  {
    q: "What is HackTX?",
    a: "HackTX is the annual hackathon hosted by Freetail Hackers! No prior experience is required and all majors are welcome!",
  },
  {
    q: "Where is HackTX?",
    a: "HackTX 26 will take place on the University of Texas at Austin campus! Hacking, judging, mini-events, and more will occur fully in-person!",
  },
  {
    q: "What's the schedule?",
    a: "We'll release a more detailed schedule on our website in the coming weeks, stay tuned on social media for more updates!",
  },
  {
    q: "Any rules?",
    a: "All work must be done at the event. You can't demo something you didn't build. All attendees (hackers, supporters, mentors, volunteers, etc.) must abide by the MLH Code of Conduct.",
  },
  {
    q: "What should I bring?",
    a: "Yourself, your valid university ID, a form of ID proving you are over 18 years old, a laptop, chargers, or anything else you might need within the 24 hours. Firearms, weapons, alcohol, illegal drugs, and power tools are not allowed. Smiles and high-fives are welcome :)",
  },
  {
    q: "How much money will this cost me?",
    a: "Zero. Zip. Zilch. Nada. Nothing. Gratis. It's free! Freetail Hackers provides students with Wi-Fi, meals, swag, workspace, and prizes for all of our events!",
  },
  {
    q: "When is HackTX?",
    a: "HackTX 26 starts at 8am on October 24, 2026 and ends at 5pm on October 25, 2026.",
  },
  {
    q: "When is the application due?",
    a: "Applications open on August 25th, 2026. Please apply early since we will be releasing decisions in waves! The application deadline is September 11th, 2026.",
  },
  {
    q: "What can I do if I missed the application deadline?",
    a: "We will have walk-in registration on Saturday, October 24th. The specific closing time for walk-in registration will be announced on our website during the event week, so be on the lookout! This is first come, first serve until we hit capacity. Admission to the event is not guaranteed so we advise non-Austin attendees to not travel for walk-in registration.",
  },
  {
    q: "How do teams work?",
    a: "Teams can be up to 4 members. If you don't have a team, don't worry! Joining a team of new friends is the best part of a hackathon. We will have team matching available for everyone on the day of the event. If you would like to create a team beforehand, that works too!",
  },
  {
    q: "How do I volunteer?",
    a: (
      <>
        We are always looking for mentors to answer student questions or workshop suggestions, as well as
        general volunteers to help run our event. If you want to help out at our event, apply at{" "}
        <a
          href="https://rodeo.freetailhackers.com/"
          target="_blank"
          rel="noopener noreferrer"
          style={{ color: BORDER, textDecoration: "underline" }}
        >
          this link
        </a>
        ! If you are looking to help outside of volunteering and mentoring shoot us an email at
        hello@freetailhackers.com.
      </>
    ),
  },
  {
    q: "Will there be prizes?",
    a: "Yes! We will have prizes for our challenges as well as smaller activities and mini-events! Specific details will be revealed at the opening ceremony!",
  },
  {
    q: "Do y'all give travel reimbursements?",
    a: "Unfortunately, we will not be able to provide travel reimbursements this year. We encourage you to look at low-cost transportation methods if you are coming from Texas such as Amtrak, Flixbus, and Redcoach.",
  },
];

function FaqItem({ q, a, open, onToggle }: { q: string; a: ReactNode; open: boolean; onToggle: () => void }) {
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
    <section className="relative w-full" style={{ background: BG, paddingBottom: "8rem" }}>
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
