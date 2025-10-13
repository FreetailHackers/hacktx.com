import React, { useState, useEffect } from "react";
import { supabase, type FAQItem } from "../lib/supabase";

// Fallback data in case Supabase is unavailable
const fallbackFaqData: FAQItem[] = [
  {
    question: "What is HackTX?",
    answer:
      "HackTX is the annual hackathon hosted by Freetail Hackers! At HackTX 2024, Freetail was 1 of 3 winners of AI aim to promote novel ideas, creations, and conversations centered around fast-paced innovation and artificial intelligence.\n\nThis hackathon serves to provide an electric environment where the creators of tomorrow can collaborate to learn, create change, and, above all, have fun creating something new! No prior experience is required and all majors are welcome!",
  },
  {
    question: "Where is HackTX?",
    answer:
      "HackTX 2025 will take place on the University of Texas at Austin campus! Hacking, judging, mini-events, and more will occur fully in-person!",
  },
  {
    question: "What's the schedule?",
    answer:
      "We'll release a more detailed schedule on our website in the coming weeks, stay tuned on social media for more updates!",
  },
  {
    question: "Any rules?",
    answer:
      "All work must be done at the event. You can't demo something you didn't build. All attendees (hackers, supporters, mentors, volunteers, etc.) must abide by the MLH Code of Conduct.",
  },
  {
    question: "What should I bring?",
    answer:
      "Yourself, your valid university ID, a form of ID proving you are over 18 years old, a laptop, chargers, or anything else you might need within the 24 hours.\n\nFirearms, weapons, alcohol, illegal drugs, and power tools are not allowed. Smiles and high-fives are welcome :)",
  },
  {
    question: "How much money will this cost me?",
    answer:
      "Zero. Zip. Zilch. Nada. Nothing. Gratis. It's free! Freetail Hackers provides students with Wi-Fi, meals, swag, workspace, and prizes for all of our events!",
  },
  {
    question: "When is HackTX?",
    answer:
      "HackTX 2025 starts at 8am on October 18, 2025 and ends at 5pm on October 19, 2025.",
  },
  {
    question: "When is the application due?",
    answer:
      "Applications open on August 18th, 2025. However, please apply early since we will be releasing decisions in waves!",
  },
  {
    question:
      "What can I do if I missed the application deadline or got rejected?",
    answer:
      "We will have walk-in registration on Saturday, October 18th. The specific closing time for walk-in registration will be announced on our website during the event week, so be on the lookout! This is first come, first serve until we hit capacity. Admission to the event is not guaranteed so we advise non-Austin attendees to not travel for walk-in registration.",
  },
  {
    question: "How do teams work?",
    answer:
      "Teams can be up to 4 members. If you don't have a team, don't worry! Joining a team of new friends is the best part of a hackathon. We will have team matching available for everyone on the day of the event. If you would like to create a team beforehand, that works too!",
  },
  {
    question: "How do I volunteer?",
    answer:
      "We are always looking for mentors to answer student questions or workshop suggestions, as well as general volunteers to help run our event. If you want to help out at our event, apply at this link! If you are looking to help outside of volunteering and mentoring shoot us an email at hello@freetailhackers.com.",
  },
  {
    question: "Will there be prizes?",
    answer:
      "Yes! We will have prizes for our challenges as well as smaller activities and mini-events! Specific details will be revealed at the opening ceremony!",
  },
  {
    question: "Do y'all give travel reimbursements?",
    answer:
      "Unfortunately, we will not be able to provide travel reimbursements this year. We encourage you to look at low-cost transportation methods if you are coming from Texas such as Amtrak, Flixbus, and Redcoach.",
  },
];

function Star({
  className = "",
  size = "small",
}: {
  className?: string;
  size?: "small" | "large";
}) {
  const dimension = size === "large" ? "w-12 h-12" : "w-8 h-8";

  return (
    <img
      src="/vectors/faq-star.svg"
      alt=""
      className={`absolute ${dimension} ${className} pointer-events-none`}
      draggable={false}
    />
  );
}

function FAQEntry({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const textShadowStyle = {
    textShadow:
      isHovered || isOpen
        ? "0 4px 4px rgba(221, 185, 69, 0.25), 0 0 4px #DDB945"
        : "none",
    transition: "text-shadow 0.3s ease-in-out",
  };

  return (
    <div className="mb-15 text-white">
      <button
        className="w-full text-left cursor-pointer"
        onClick={() => setIsOpen(!isOpen)}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        aria-expanded={isOpen}
        type="button"
      >
        <h3 className="lg:text-xl font-bold mb-3 flex items-start cursor-pointer transition-opacity duration-300">
          <img
            src={
              isOpen
                ? "/vectors/faq-glowiest-star.svg"
                : isHovered
                  ? "/vectors/faq-glow-star.svg"
                  : "/vectors/faq-star.svg"
            }
            alt=""
            className={`w-6 h-6 mr-3 mt-0.5 flex-shrink-0 transition-transform duration-300 ${
              isOpen ? "rotate-180" : isHovered ? "rotate-12" : "rotate-0"
            }`}
            draggable={false}
          />
          <span style={textShadowStyle}>{question}</span>
        </h3>
      </button>
      <div
        className={`overflow-hidden transition-all duration-500 ease-in-out ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="ml-10 mb-3 max-sm:text-sm">{answer}</p>
      </div>
    </div>
  );
}

export default function FAQ() {
  const [faqData, setFaqData] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchFAQs();
  }, []);

  const fetchFAQs = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data, error: supabaseError } = await supabase
        .from("FAQ")
        .select("*")
        .order('id', { ascending: true });

      if (supabaseError) {
        throw supabaseError;
      }

      if (data) {
        setFaqData(data);
      } else {
        setFaqData(fallbackFaqData);
      }
    } catch (err) {
      console.error("Error fetching FAQs:", err);
      setError("Failed to load FAQs");
      setFaqData(fallbackFaqData);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="relative w-screen py-20 -mx-5 lg:mt-60">
        <div className="max-w-[1200px] mx-auto px-5 text-center">
          <div className="text-white text-xl">Loading FAQs...</div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-screen py-20 -mx-5 lg:mt-20 lg:mb-20 overflow-visible" id="faq">
      {/* Background squiggles */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1523px] h-[1650px] -z-10">
        <img src="/images/FAQ Nebula.png" alt="FAQ Nebula" draggable={false} />
      </div>

      <div className="relative max-w-[850px]  lg:max-w-[1200px] mx-auto xl:px-5 lg:px-15 px-5">
        {/* Top border decorations */}
        <img
          src="/vectors/faq-border-top-left.png"
          alt=""
          className="absolute -top-32 -left-30 pointer-events-none hidden lg:block"
          draggable={false}
        />
        <img
          src="/vectors/faq-border-bottom-right.png"
          alt=""
          className="absolute -bottom-32 -right-30 pointer-events-none hidden lg:block"
          draggable={false}
        />
        {/* Background constellation lines */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none opacity-30"
          preserveAspectRatio="none"
          aria-label="Constellation lines"
        >
          <line
            x1="10%"
            y1="20%"
            x2="25%"
            y2="35%"
            stroke="#E8D8A1"
            strokeWidth="0.5"
          />
          <line
            x1="25%"
            y1="35%"
            x2="15%"
            y2="60%"
            stroke="#E8D8A1"
            strokeWidth="0.5"
          />
          <line
            x1="75%"
            y1="25%"
            x2="85%"
            y2="45%"
            stroke="#E8D8A1"
            strokeWidth="0.5"
          />
          <line
            x1="85%"
            y1="45%"
            x2="90%"
            y2="70%"
            stroke="#E8D8A1"
            strokeWidth="0.5"
          />
        </svg>

        {/* Decorative stars */}
        <Star className="top-10 left-[5%] animate-pulse" size="small" />

        <Star
          className="top-64 left-[15%] animate-pulse [animation-delay:1000ms]"
          size="small"
        />
        <Star
          className="bottom-40 right-[20%] animate-pulse [animation-delay:1500ms]"
          size="small"
        />
        <Star
          className="bottom-20 left-[8%] animate-pulse [animation-delay:2000ms]"
          size="large"
        />
        <Star className="top-96 right-[5%] animate-pulse" size="small" />

        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif text-left mb-8 text-white tracking-wider max-sm:text-center max-sm:text-xl">
            ASK THE CRYSTAL BALL
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:gap-x-16 lg:gap-y-4">
            <div className="space-y-16">
              {faqData.slice(0, faqData.length / 2).map((faq) => (
                <FAQEntry
                  key={faq.question}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
            <div className="space-y-16">
              {faqData.slice(faqData.length / 2, faqData.length).map((faq) => (
                <FAQEntry
                  key={faq.question}
                  question={faq.question}
                  answer={faq.answer}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
