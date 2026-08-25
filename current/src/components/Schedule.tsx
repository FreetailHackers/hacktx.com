import { useState } from "react";
import genieLamp from "../assets/Schedule/genie lamp.png";
import ribbonTop from "../assets/Schedule/ribbon top.png";
import ribbonBottom from "../assets/Schedule/ribbon bottom.png";
import sparkleStar from "../assets/sparkle-star.png";

type Category = "required" | "food" | "fun";

interface ScheduleEvent {
  time: string;
  title: string;
  categories: Category[];
}

type EventRow = ScheduleEvent | { divider: string };

const EVENTS: EventRow[] = [
  { divider: "Saturday" },
  { time: "8:00 AM",  title: "Check-In",                 categories: ["required"] },
  { time: "10:00 AM", title: "Opening Ceremony",          categories: ["required"] },
  { time: "10:00 AM", title: "Late Check In",             categories: ["required"] },
  { time: "11:00 AM", title: "Hacking Starts",            categories: ["required"] },
  { time: "11:00 AM", title: "Workshop: Team Matching",   categories: ["fun"] },
  { time: "1:30 PM",  title: "Sponsor Expo",              categories: ["required"] },
  { time: "2:00 PM",  title: "Lunch",                     categories: ["food"] },
  { time: "6:00 PM",  title: "Dinner",                    categories: ["food"] },
  { time: "8:00 PM",  title: "TechTogether Meetup",       categories: ["fun"] },
  { time: "12:00 AM", title: "Midnight Snack",            categories: ["food"] },
  { divider: "Sunday" },
  { time: "1:00 AM",  title: "Gaming Night",              categories: ["fun"] },
  { time: "7:00 AM",  title: "Sunrise Watch Party",       categories: ["fun"] },
  { time: "8:30 AM",  title: "Breakfast",                 categories: ["food"] },
  { time: "11:00 AM", title: "Hacking Ends",              categories: ["required"] },
  { time: "11:00 AM", title: "Lunch",                     categories: ["food"] },
  { time: "1:00 PM",  title: "Judging Begins",            categories: ["required"] },
  { time: "4:00 PM",  title: "Judging Ends",              categories: ["required"] },
  { time: "4:00 PM",  title: "Pitching Begins",           categories: ["required"] },
  { time: "4:30 PM",  title: "Pitching Ends",             categories: ["required"] },
  { time: "5:00 PM",  title: "Closing Ceremony",          categories: ["required"] },
];

const FILTERS: { key: Category; label: string; color: string }[] = [
  { key: "required", label: "Required Event", color: "#7C3AED" },
  { key: "food",     label: "Food",           color: "#B45309" },
  { key: "fun",      label: "For Fun",        color: "#0369A1" },
];

export default function Schedule() {
  const [open, setOpen] = useState(false);
  const [boxVisible, setBoxVisible] = useState(false);
  const [itemsVisible, setItemsVisible] = useState(false);
  const [active, setActive] = useState<Set<Category>>(new Set());

  const toggleFilter = (key: Category) => {
    setActive((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const isEvent = (row: EventRow): row is ScheduleEvent => !("divider" in row);

  const isHighlighted = (event: ScheduleEvent) =>
    active.size === 0 || event.categories.some((c) => active.has(c));

  const handleLampClick = () => {
    if (open) {
      setOpen(false);
      setBoxVisible(false);
      setItemsVisible(false);
      return;
    }
    setOpen(true);
    setTimeout(() => setBoxVisible(true), 150);
    setTimeout(() => setItemsVisible(true), 550);
  };

  return (
    <section
      className="relative w-full"
      style={{
        background: "#EFE8CE",
        paddingBottom: open ? "5rem" : "2rem",
        transition: "padding-bottom 0.9s cubic-bezier(0.2,0,0.2,1)",
      }}
    >

      {/* ── Background decorations — scattered stars ── */}
      <img src={sparkleStar} alt="" aria-hidden="true" className="pointer-events-none absolute z-0" style={{ width: "3%",   top: "4%",    left: "7%",   opacity: 0.5  }} />
      <img src={sparkleStar} alt="" aria-hidden="true" className="pointer-events-none absolute z-0" style={{ width: "2%",   top: "22%",   left: "2%",   opacity: 0.4  }} />
      <img src={sparkleStar} alt="" aria-hidden="true" className="pointer-events-none absolute z-0" style={{ width: "4%",   top: "38%",   left: "11%",  opacity: 0.55 }} />
      <img src={sparkleStar} alt="" aria-hidden="true" className="pointer-events-none absolute z-0" style={{ width: "1.5%", top: "62%",   left: "5%",   opacity: 0.35 }} />
      <img src={sparkleStar} alt="" aria-hidden="true" className="pointer-events-none absolute z-0" style={{ width: "2.5%", bottom: "7%", left: "13%",  opacity: 0.45 }} />
      <img src={sparkleStar} alt="" aria-hidden="true" className="pointer-events-none absolute z-0" style={{ width: "2%",   top: "14%",   left: "28%",  opacity: 0.3  }} />
      <img src={sparkleStar} alt="" aria-hidden="true" className="pointer-events-none absolute z-0" style={{ width: "3.5%", top: "52%",   left: "18%",  opacity: 0.4  }} />
      <img src={sparkleStar} alt="" aria-hidden="true" className="pointer-events-none absolute z-0" style={{ width: "1.5%", bottom: "18%",left: "35%",  opacity: 0.3  }} />
      <img src={sparkleStar} alt="" aria-hidden="true" className="pointer-events-none absolute z-0" style={{ width: "2%",   top: "8%",    left: "55%",  opacity: 0.35 }} />
      <img src={sparkleStar} alt="" aria-hidden="true" className="pointer-events-none absolute z-0" style={{ width: "3%",   bottom: "10%",left: "62%",  opacity: 0.4  }} />
      <img src={sparkleStar} alt="" aria-hidden="true" className="pointer-events-none absolute z-0" style={{ width: "1.5%", top: "44%",   left: "44%",  opacity: 0.3  }} />
      <img src={sparkleStar} alt="" aria-hidden="true" className="pointer-events-none absolute z-0" style={{ width: "2%",   top: "6%",    right: "4%",  opacity: 0.45 }} />
      <img src={sparkleStar} alt="" aria-hidden="true" className="pointer-events-none absolute z-0" style={{ width: "3.5%", top: "30%",   right: "9%",  opacity: 0.55 }} />
      <img src={sparkleStar} alt="" aria-hidden="true" className="pointer-events-none absolute z-0" style={{ width: "1.5%", top: "55%",   right: "2%",  opacity: 0.3  }} />
      <img src={sparkleStar} alt="" aria-hidden="true" className="pointer-events-none absolute z-0" style={{ width: "4%",   top: "70%",   right: "12%", opacity: 0.5  }} />
      <img src={sparkleStar} alt="" aria-hidden="true" className="pointer-events-none absolute z-0" style={{ width: "2.5%", bottom: "5%", right: "6%",  opacity: 0.4  }} />
      <img src={sparkleStar} alt="" aria-hidden="true" className="pointer-events-none absolute z-0" style={{ width: "2%",   top: "17%",   right: "26%", opacity: 0.35 }} />
      <img src={sparkleStar} alt="" aria-hidden="true" className="pointer-events-none absolute z-0" style={{ width: "3%",   top: "78%",   right: "33%", opacity: 0.4  }} />
      <img src={sparkleStar} alt="" aria-hidden="true" className="pointer-events-none absolute z-0" style={{ width: "1.5%", bottom: "22%",right: "18%", opacity: 0.3  }} />
      <img src={sparkleStar} alt="" aria-hidden="true" className="pointer-events-none absolute z-0" style={{ width: "2%",   top: "85%",   left: "48%",  opacity: 0.35 }} />

      {/* ── Ribbon bottom ── */}
      <img src={ribbonBottom} alt="" aria-hidden="true" className="pointer-events-none absolute left-0 bottom-0 z-[1]" style={{ width: "18%" }} />

      {/* ── Ribbon top ── */}
      <img src={ribbonTop} alt="" aria-hidden="true" className="pointer-events-none absolute right-0 top-0 z-[1]" style={{ width: "18%" }} />

      {/* ── Content ── */}
      <div className="relative z-[2] mx-4 md:mx-[20%]">

        {/* Heading */}
        <div className="text-center pt-10 pb-2">
          <h2 className="font-['Pirata_One',serif] text-5xl md:text-7xl" style={{ color: "#27231C" }}>
            I wish to see the future
          </h2>
        </div>

        {/* Lamp */}
        <div className="flex flex-col items-end pt-4 pb-2">
          <button
            onClick={handleLampClick}
            aria-label={open ? "Close schedule" : "Open schedule"}
            className="focus:outline-none hover:scale-110 active:scale-95"
            style={{
              filter: open
                ? "drop-shadow(0 0 16px #9B5B6B) drop-shadow(0 0 32px #E4C9CE)"
                : "drop-shadow(0 0 8px #C4956A) drop-shadow(0 0 20px #E4C9CE)",
              transition: "filter 0.4s ease, transform 0.2s ease",
              animation: open ? "none" : "lamp-pulse 2s ease-in-out infinite",
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
          {!open && (
            <p
              style={{
                fontFamily: "'Aunt Mildred MVB', serif",
                fontSize: "clamp(0.8rem, 1.2vw, 1rem)",
                color: "#7A3A4A",
                opacity: 0.75,
                marginTop: "0.25rem",
                animation: "lamp-pulse 2s ease-in-out infinite",
              }}
            >
              rub the lamp...
            </p>
          )}
        </div>

        {/* Schedule box — expands section as it opens */}
        <div
          style={{
            maxHeight: open ? "6000px" : "0px",
            overflow: "hidden",
            transition: "max-height 2s cubic-bezier(0.2,0,0.2,1)",
          }}
        >
        <div
          style={{
            opacity: boxVisible ? 1 : 0,
            transform: boxVisible ? "translateY(0)" : "translateY(-24px)",
            transition: "opacity 0.9s cubic-bezier(0.2,0,0.2,1), transform 0.9s cubic-bezier(0.2,0,0.2,1)",
            pointerEvents: boxVisible ? "auto" : "none",
          }}
        >
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
            <div style={{ height: "2.5rem", background: "#9B5B6B", borderRadius: "1.8rem 1.8rem 50% 50% / 1.8rem 1.8rem 2rem 2rem", marginBottom: "0.5rem" }} />

            {/* Title */}
            <div className="text-center pt-2 pb-4 px-6">
              <h2 className="font-['Pirata_One',serif] text-5xl md:text-7xl" style={{ color: "#3D1A22" }}>
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
                  <img src={sparkleStar} alt="" className="w-5 h-5 object-contain" style={{ filter: active.has(key) ? "brightness(10)" : "none" }} />
                  {label}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="mx-auto mb-6" style={{ width: "85%", height: "2px", background: "#9B5B6B", borderRadius: "1px" }} />

            {/* Event grid */}
            <div className="px-6 pb-6 grid grid-cols-1 md:grid-cols-2 gap-3">
              {EVENTS.map((row, i) => {
                if (!isEvent(row)) {
                  return (
                    <div
                      key={`divider-${i}`}
                      className="col-span-1 md:col-span-2 text-center py-2"
                      style={{
                        opacity: itemsVisible ? 1 : 0,
                        transition: `opacity 0.5s ease ${i * 55}ms`,
                      }}
                    >
                      <span
                        className="font-['Pirata_One',serif] text-2xl md:text-3xl px-6"
                        style={{ color: "#3D1A22", borderBottom: "2px solid #9B5B6B", paddingBottom: "4px" }}
                      >
                        {row.divider}
                      </span>
                    </div>
                  );
                }
                const highlighted = isHighlighted(row);
                const matchedFilter = FILTERS.find((f) => active.has(f.key) && row.categories.includes(f.key));
                return (
                  <div
                    key={i}
                    className="flex items-start gap-3 rounded-xl px-5 py-4 border-2"
                    style={{
                      background: highlighted ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.18)",
                      borderColor: highlighted && matchedFilter ? matchedFilter.color : highlighted ? "#9B5B6B" : "transparent",
                      opacity: itemsVisible ? (active.size > 0 && !highlighted ? 0.3 : 1) : 0,
                      transform: itemsVisible ? "translateY(0)" : "translateY(10px)",
                      transition: `opacity 0.5s ease ${i * 55}ms, transform 0.5s ease ${i * 55}ms`,
                    }}
                  >
                    <span className="font-mono font-bold flex-shrink-0 mt-0.5 text-base" style={{ color: "#7A3A4A", minWidth: "5rem" }}>
                      {row.time}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-lg leading-tight" style={{ color: "#3D1A22" }}>{row.title}</p>
                    </div>
                    <div className="flex gap-1 flex-shrink-0 mt-1">
                      {row.categories.map((cat) => {
                        const f = FILTERS.find((f) => f.key === cat)!;
                        return <img key={cat} src={sparkleStar} alt={f.label} title={f.label} className="w-5 h-5 object-contain" />;
                      })}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Curly bottom lip */}
            <div style={{ height: "2.5rem", background: "#9B5B6B", borderRadius: "50% 50% 1.8rem 1.8rem / 2rem 2rem 1.8rem 1.8rem", marginTop: "0.5rem" }} />
          </div>
        </div>
        </div>
      </div>

      <style>{`
        @keyframes lamp-pulse {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.5; }
        }
        @media (prefers-reduced-motion: reduce) {
          button[aria-label] { animation: none !important; }
        }
      `}</style>
    </section>
  );
}
