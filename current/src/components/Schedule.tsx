import { useState } from "react";
import genieLamp from "../assets/Schedule/genie lamp.png";
import ribbonTop from "../assets/Schedule/ribbon top.png";
import ribbonBottom from "../assets/Schedule/ribbon bottom.png";
import sparkleStar from "../assets/sparkle-star.png";

type Category = "required" | "food" | "fun";

interface ScheduleEvent {
  time: string;
  title: string;
  location: string;
  categories: Category[];
}

const EVENTS: ScheduleEvent[] = [
  { time: "9:00 AM",  title: "Opening Ceremony",       location: "Main Hall",       categories: ["required"] },
  { time: "10:00 AM", title: "Hacking Begins",          location: "Hack Floor",      categories: ["required"] },
  { time: "11:30 AM", title: "Breakfast Burritos",      location: "Dining Hall",     categories: ["food"] },
  { time: "12:00 PM", title: "Sponsor Expo",            location: "Atrium",          categories: ["required"] },
  { time: "1:00 PM",  title: "Magic Show & Games",      location: "Recreation Room", categories: ["fun"] },
  { time: "2:00 PM",  title: "Pizza Party",             location: "Dining Hall",     categories: ["food"] },
  { time: "3:30 PM",  title: "Workshop: AI Wizardry",   location: "Room 101",        categories: ["fun"] },
  { time: "6:00 PM",  title: "Enchanted Dinner Feast",  location: "Dining Hall",     categories: ["food", "fun"] },
  { time: "8:00 PM",  title: "Midnight Snack Drop",     location: "Hack Floor",      categories: ["food"] },
  { time: "10:00 PM", title: "Mini-Games Tournament",   location: "Recreation Room", categories: ["fun"] },
  { time: "11:59 PM", title: "Hacking Ends — Submit!",  location: "Hack Floor",      categories: ["required"] },
  { time: "12:30 AM", title: "Judging Begins",          location: "Main Hall",       categories: ["required"] },
  { time: "2:00 AM",  title: "Awards Ceremony",         location: "Main Hall",       categories: ["required"] },
];

const FILTERS: { key: Category; label: string; color: string }[] = [
  { key: "required", label: "Required Event", color: "#7C3AED" },
  { key: "food",     label: "Food",           color: "#B45309" },
  { key: "fun",      label: "For Fun",        color: "#0369A1" },
];

export default function Schedule() {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<Set<Category>>(new Set());

  const toggleFilter = (key: Category) => {
    setActive((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const isHighlighted = (event: ScheduleEvent) =>
    active.size === 0 || event.categories.some((c) => active.has(c));

  return (
    <section className="relative w-full" style={{ background: "#EFE8CE", marginTop: "-2px" }}>

      {/* ── Background decorations ── */}
      {/* left side */}
      <img src={sparkleStar} alt="" aria-hidden="true" className="pointer-events-none absolute z-0" style={{ width: "3%",   top: "6%",    left: "19%", opacity: 0.55 }} />
      <img src={sparkleStar} alt="" aria-hidden="true" className="pointer-events-none absolute z-0" style={{ width: "2%",   top: "18%",   left: "22%", opacity: 0.4  }} />
      <img src={sparkleStar} alt="" aria-hidden="true" className="pointer-events-none absolute z-0" style={{ width: "1.5%", top: "30%",   left: "20%", opacity: 0.35 }} />
      <img src={sparkleStar} alt="" aria-hidden="true" className="pointer-events-none absolute z-0" style={{ width: "3.5%", top: "42%",   left: "21%", opacity: 0.5  }} />
      <img src={sparkleStar} alt="" aria-hidden="true" className="pointer-events-none absolute z-0" style={{ width: "2%",   top: "55%",   left: "19%", opacity: 0.3  }} />
      <img src={sparkleStar} alt="" aria-hidden="true" className="pointer-events-none absolute z-0" style={{ width: "4%",   top: "67%",   left: "22%", opacity: 0.45 }} />
      <img src={sparkleStar} alt="" aria-hidden="true" className="pointer-events-none absolute z-0" style={{ width: "1.5%", top: "78%",   left: "20%", opacity: 0.35 }} />
      <img src={sparkleStar} alt="" aria-hidden="true" className="pointer-events-none absolute z-0" style={{ width: "2.5%", bottom: "8%", left: "21%", opacity: 0.4  }} />
      {/* right side */}
      <img src={sparkleStar} alt="" aria-hidden="true" className="pointer-events-none absolute z-0" style={{ width: "2%",   top: "8%",    right: "21%", opacity: 0.45 }} />
      <img src={sparkleStar} alt="" aria-hidden="true" className="pointer-events-none absolute z-0" style={{ width: "3.5%", top: "20%",   right: "19%", opacity: 0.55 }} />
      <img src={sparkleStar} alt="" aria-hidden="true" className="pointer-events-none absolute z-0" style={{ width: "1.5%", top: "33%",   right: "22%", opacity: 0.3  }} />
      <img src={sparkleStar} alt="" aria-hidden="true" className="pointer-events-none absolute z-0" style={{ width: "2.5%", top: "46%",   right: "20%", opacity: 0.4  }} />
      <img src={sparkleStar} alt="" aria-hidden="true" className="pointer-events-none absolute z-0" style={{ width: "4%",   top: "58%",   right: "21%", opacity: 0.5  }} />
      <img src={sparkleStar} alt="" aria-hidden="true" className="pointer-events-none absolute z-0" style={{ width: "2%",   top: "70%",   right: "19%", opacity: 0.35 }} />
      <img src={sparkleStar} alt="" aria-hidden="true" className="pointer-events-none absolute z-0" style={{ width: "3%",   top: "80%",   right: "22%", opacity: 0.45 }} />
      <img src={sparkleStar} alt="" aria-hidden="true" className="pointer-events-none absolute z-0" style={{ width: "1.5%", bottom: "6%", right: "20%", opacity: 0.35 }} />
      {/* center scattered */}
      <img src={sparkleStar} alt="" aria-hidden="true" className="pointer-events-none absolute z-0" style={{ width: "2%",   top: "28%",    left: "30%",  opacity: 0.35 }} />
      <img src={sparkleStar} alt="" aria-hidden="true" className="pointer-events-none absolute z-0" style={{ width: "2%",   bottom: "20%", left: "40%",  opacity: 0.35 }} />
      <img src={sparkleStar} alt="" aria-hidden="true" className="pointer-events-none absolute z-0" style={{ width: "3%",   bottom: "30%", right: "35%", opacity: 0.4  }} />
      <img src={sparkleStar} alt="" aria-hidden="true" className="pointer-events-none absolute z-0" style={{ width: "1.5%", top: "70%",    left: "50%",  opacity: 0.3  }} />

      {/* ── Ribbon bottom — anchored to bottom-left ── */}
      <img
        src={ribbonBottom}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute left-0 bottom-0 z-[1]"
        style={{ width: "18%" }}
      />

      {/* ── Ribbon top — anchored to top-right ── */}
      <img
        src={ribbonTop}
        alt=""
        aria-hidden="true"
        className="pointer-events-none absolute right-0 top-0 z-[1]"
        style={{ width: "18%" }}
      />

      {/* ── All content sits between the ribbons ── */}
      <div className="relative z-[2] mx-[20%]">

        {/* ── Heading ── */}
        <div className="text-center pt-10 pb-2">
          <h2
            className="font-['Pirata_One',serif] text-5xl md:text-7xl"
            style={{ color: "#27231C" }}
          >
            I wish to see the future
          </h2>
        </div>

        {/* ── Lamp — top right ── */}
        <div className="flex justify-end pt-4 pb-2">
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close schedule" : "Open schedule"}
          className="focus:outline-none hover:scale-110 active:scale-95"
          style={{
            filter: open
              ? "drop-shadow(0 0 16px #9B5B6B) drop-shadow(0 0 32px #E4C9CE)"
              : "drop-shadow(0 4px 10px rgba(0,0,0,0.35))",
            transition: "filter 0.4s ease, transform 0.2s ease",
          }}
        >
          <img
            src={genieLamp}
            alt="Genie lamp"
            className="w-28 md:w-40 object-contain"
            style={{
              transform: open ? "rotate(-20deg)" : "rotate(0deg)",
              transition: "transform 0.5s ease",
            }}
          />
        </button>
      </div>

      {/* ── Schedule box — smoke pour from lamp ── */}
      <div
        style={{
          clipPath: open
            ? "inset(-20px -20px -20px -20px)"
            : "inset(-20px -20px 105% -20px)",
          filter: open ? "blur(0px)" : "blur(6px)",
          opacity: open ? 1 : 0,
          transition: open
            ? "clip-path 2s cubic-bezier(0.1,0,0.2,1), filter 1.2s ease, opacity 0.6s ease"
            : "clip-path 1s cubic-bezier(0.6,0,0.8,1), filter 0.6s ease, opacity 0.4s ease",
        }}
      >
        <div>
          <div
            className="mx-auto mt-2 mb-10"
            style={{
              width: "min(1100px, 92%)",
              background: "#E4C9CE",
              border: "5px solid #9B5B6B",
              boxShadow: "0 0 0 3px #E4C9CE, 0 0 0 8px #9B5B6B",
              borderRadius: "2rem",
            }}
          >
            {/* Curly top lip */}
            <div
              style={{
                height: "2.5rem",
                background: "#9B5B6B",
                borderRadius: "1.8rem 1.8rem 50% 50% / 1.8rem 1.8rem 2rem 2rem",
                marginBottom: "0.5rem",
              }}
            />

            {/* Title */}
            <div className="text-center pt-2 pb-4 px-6">
              <h2
                className="font-['Pirata_One',serif] text-5xl md:text-7xl"
                style={{ color: "#3D1A22" }}
              >
                ✦ Schedule ✦
              </h2>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 justify-center px-6 mb-5">
              {FILTERS.map(({ key, label, color }) => (
                <button
                  key={key}
                  onClick={() => toggleFilter(key)}
                  className="flex items-center gap-2 px-5 py-2 rounded-full font-medium transition-all duration-150 border-2 text-base"
                  style={{
                    borderColor: color,
                    background: active.has(key) ? color : "transparent",
                    color: active.has(key) ? "#fff" : color,
                  }}
                >
                  <img
                    src={sparkleStar}
                    alt=""
                    className="w-5 h-5 object-contain"
                    style={{ filter: active.has(key) ? "brightness(10)" : "none" }}
                  />
                  {label}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div
              className="mx-auto mb-6"
              style={{ width: "85%", height: "2px", background: "#9B5B6B", borderRadius: "1px" }}
            />

            {/* Two-column event grid */}
            <div className="px-6 pb-6 grid grid-cols-1 md:grid-cols-2 gap-3">
              {EVENTS.map((event, i) => {
                const highlighted = isHighlighted(event);
                const matchedFilter = FILTERS.find(
                  (f) => active.has(f.key) && event.categories.includes(f.key)
                );
                return (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-xl px-5 py-4 border-2 transition-all duration-200"
                    style={{
                      background: highlighted ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.18)",
                      borderColor:
                        highlighted && matchedFilter
                          ? matchedFilter.color
                          : highlighted
                          ? "#9B5B6B"
                          : "transparent",
                      opacity: active.size > 0 && !highlighted ? 0.3 : 1,
                    }}
                  >
                    <span
                      className="font-mono font-bold flex-shrink-0 mt-0.5 text-base"
                      style={{ color: "#7A3A4A", minWidth: "5rem" }}
                    >
                      {event.time}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-lg leading-tight" style={{ color: "#3D1A22" }}>
                        {event.title}
                      </p>
                      <p className="text-sm mt-0.5" style={{ color: "#7A3A4A" }}>
                        {event.location}
                      </p>
                    </div>
                    <div className="flex gap-1 flex-shrink-0 mt-1">
                      {event.categories.map((cat) => {
                        const f = FILTERS.find((f) => f.key === cat)!;
                        return (
                          <img key={cat} src={sparkleStar} alt={f.label} title={f.label} className="w-5 h-5 object-contain" />
                        );
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Curly bottom lip */}
            <div
              style={{
                height: "2.5rem",
                background: "#9B5B6B",
                borderRadius: "50% 50% 1.8rem 1.8rem / 2rem 2rem 1.8rem 1.8rem",
                marginTop: "0.5rem",
              }}
            />
          </div>
        </div>
      </div>

      </div>{/* end content between ribbons */}

    </section>
  );
}
