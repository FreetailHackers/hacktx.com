import { useState } from "react";
import genieLamp from "../assets/Schedule/genie lamp.png";
import ribbonTop from "../assets/Schedule/ribbon top.png";
import ribbonBottom from "../assets/Schedule/ribbon bottom.png";
import sparkleStar from "../assets/sparkle-star.png";
import requiredIcon from "../assets/Schedule/Required.svg";
import foodIcon from "../assets/Schedule/Food.svg";
import workshopIcon from "../assets/Schedule/Event.svg";
import forFunIcon from "../assets/Schedule/For Fun.svg";
import { useRodeoSchedule, type Category, type ScheduleEvent } from "../lib/rodeoSchedule";

const FILTERS: { key: Category; label: string; color: string; icon: string }[] = [
  { key: "required", label: "Required",  color: "#7C3AED", icon: requiredIcon },
  { key: "workshop", label: "Workshop",  color: "#0369A1", icon: workshopIcon },
  { key: "food",     label: "Food",      color: "#B45309", icon: foodIcon },
  { key: "fun",      label: "For Fun",   color: "#0F766E", icon: forFunIcon },
];

const CATEGORY_ICON: Record<Category, string> = {
  required: requiredIcon,
  workshop: workshopIcon,
  food: foodIcon,
  fun: forFunIcon,
};

interface TimeSlot {
  time: string;
  endTime?: string;
  events: ScheduleEvent[];
}

interface DayGroup {
  label: string;
  slots: TimeSlot[];
}

function parseTimeToMinutes(t: string | undefined): number {
  if (!t) return Infinity;
  const m = t.match(/(\d+):(\d+)\s*(AM|PM)/i);
  if (!m) return Infinity;
  let h = parseInt(m[1], 10);
  const min = parseInt(m[2], 10);
  const isPM = m[3].toUpperCase() === "PM";
  if (isPM && h !== 12) h += 12;
  if (!isPM && h === 12) h = 0;
  return h * 60 + min;
}

function groupByDay(rows: ReturnType<typeof useRodeoSchedule>["rows"]): DayGroup[] {
  if (!rows) return [];
  const groups: DayGroup[] = [];
  for (const row of rows) {
    if ("divider" in row) {
      groups.push({ label: row.divider, slots: [] });
    } else {
      if (groups.length === 0) continue;
      const day = groups[groups.length - 1];
      const lastSlot = day.slots[day.slots.length - 1];
      if (lastSlot && lastSlot.time === row.time) {
        // Same time slot — add to existing slot
        lastSlot.events.push(row);
        // Extend endTime to the later of the two
        if (row.endTime && (!lastSlot.endTime || row.endTime > lastSlot.endTime)) {
          lastSlot.endTime = row.endTime;
        }
      } else {
        day.slots.push({ time: row.time, endTime: row.endTime, events: [row] });
      }
    }
  }
  return groups;
}

export default function Schedule() {
  const [active, setActive] = useState<Set<Category>>(new Set());
  const { rows, error } = useRodeoSchedule();

  const toggleFilter = (key: Category) => {
    setActive((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  const isHighlighted = (event: ScheduleEvent) =>
    active.size === 0 || event.categories.some((c) => active.has(c));

  const dayGroups = groupByDay(rows);

  return (
    <section
      id="schedule"
      tabIndex={-1}
      className="relative w-full"
      style={{
        background: "#EFE8CE",
        paddingBottom: "5rem",
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
      <div className="relative z-[2] mx-4 md:mx-[10%]">

        {/* Lamp */}
        <div className="flex flex-col items-end pt-10 pb-2">
          <img
            src={genieLamp}
            alt="Genie lamp"
            className="w-28 md:w-40 object-contain"
            style={{
              filter: "drop-shadow(0 0 16px #9B5B6B) drop-shadow(0 0 32px #E4C9CE)",
              transform: "rotate(-20deg)",
            }}
          />
        </div>

        {/* Schedule box */}
        <div>
          <div
            className="mx-auto mt-2 mb-10"
            style={{
              width: "min(1400px, 96%)",
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
              <h2 className="font-['Pirata_One',serif]" style={{ color: "#3D1A22", fontSize: "clamp(3.5rem, 8vw, 7rem)", lineHeight: 1 }}>
                ✦ Schedule ✦
              </h2>
            </div>

            {/* Filters */}
            <div className="flex flex-wrap gap-3 justify-center px-6 mb-5">
              {FILTERS.map(({ key, label, color, icon }) => (
                <button
                  key={key}
                  onClick={() => toggleFilter(key)}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-full font-medium transition-all duration-150 border-2 text-lg"
                  style={{
                    borderColor: color,
                    background: active.has(key) ? color : "transparent",
                    color: active.has(key) ? "#fff" : color,
                  }}
                >
                  <img src={icon} alt="" aria-hidden="true" className="w-6 h-6 object-contain" style={{ filter: active.has(key) ? "brightness(0) invert(1)" : "none" }} />
                  {label}
                </button>
              ))}
            </div>

            {/* Divider */}
            <div className="mx-auto mb-6" style={{ width: "85%", height: "2px", background: "#9B5B6B", borderRadius: "1px" }} />

            {/* Loading / empty states */}
            {rows === null && (
              <p className="text-center py-6 px-6" style={{ color: "#3D1A22" }}>
                {error ? "The schedule couldn't be loaded. Please try again soon." : "Loading schedule…"}
              </p>
            )}
            {rows !== null && dayGroups.length === 0 && (
              <p className="text-center py-6 px-6" style={{ color: "#3D1A22" }}>
                The schedule hasn't been announced yet.
              </p>
            )}

            {/* Two-column day layout */}
            {dayGroups.length > 0 && (
              <div className="px-6 pb-6 grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                {dayGroups.map((group) => (
                  <div key={group.label}>
                    {/* Day header */}
                    <div className="text-center mb-4">
                      <span
                        className="font-['Pirata_One',serif] text-3xl md:text-4xl px-6"
                        style={{ color: "#3D1A22", borderBottom: "2px solid #9B5B6B", paddingBottom: "4px" }}
                      >
                        {group.label}
                      </span>
                    </div>

                    {/* Time slots — events at the same time share a row */}
                    <div className="flex flex-col gap-3">
                      {group.slots.map((slot) => {
                        // Slot is highlighted if any event in it is highlighted
                        const slotHighlighted = slot.events.some(isHighlighted);
                        const slotDimmed = active.size > 0 && !slotHighlighted;

                        // If concurrent events end at different times, show each
                        // event's endTime individually rather than collapsing into one
                        const uniqueEndTimes = [...new Set(slot.events.map((e) => e.endTime ?? ""))];
                        const sharedEndTime = uniqueEndTimes.length === 1 ? (slot.events[0].endTime ?? undefined) : undefined;
                        const showPerEventEndTime = uniqueEndTimes.length > 1;

                        return (
                          <div
                            key={`${slot.time}-${slot.events[0].id}`}
                            className="flex items-stretch gap-3 rounded-xl px-4 py-3 border-2"
                            style={{
                              background: slotHighlighted ? "rgba(255,255,255,0.72)" : "rgba(255,255,255,0.18)",
                              borderColor: slotHighlighted ? "#9B5B6B" : "transparent",
                              opacity: slotDimmed ? 0.3 : 1,
                              transition: "opacity 0.2s ease",
                            }}
                          >
                            {/* Time — shown once for the whole slot */}
                            <div
                              className="flex-shrink-0 flex flex-col items-center justify-center"
                              style={{
                                minWidth: "5rem",
                                color: "#413720",
                                fontFamily: "'Pirata One', serif",
                                fontSize: "22px",
                                fontWeight: 400,
                                lineHeight: "1.3",
                                textAlign: "center",
                              }}
                            >
                              <span>{slot.time}</span>
                              {sharedEndTime && <span style={{ opacity: 0.65 }}>– {sharedEndTime}</span>}
                            </div>

                            {/* One card per concurrent event */}
                            <div className="flex-1 min-w-0 flex flex-col gap-2">
                              {[...slot.events].sort((a, b) => parseTimeToMinutes(a.endTime) - parseTimeToMinutes(b.endTime)).map((event) => {
                                const highlighted = isHighlighted(event);
                                const matchedFilter = FILTERS.find((f) => active.has(f.key) && event.categories.includes(f.key));
                                return (
                                  <div key={event.id} className="flex items-center gap-2">
                                    {/* End time — left of the divider, only when events overlap */}
                                    {showPerEventEndTime && (
                                      <span
                                        style={{
                                          color: "#413720",
                                          fontFamily: "'Pirata One', serif",
                                          fontSize: "13px",
                                          opacity: event.endTime ? 0.65 : 0,
                                          flexShrink: 0,
                                          minWidth: "3.5rem",
                                          textAlign: "right",
                                        }}
                                      >
                                        {event.endTime ? `– ${event.endTime}` : ""}
                                      </span>
                                    )}
                                    <div
                                      className="flex flex-1 items-center gap-2"
                                      style={{
                                        padding: slot.events.length > 1 ? "6px 8px" : undefined,
                                        borderRadius: slot.events.length > 1 ? "8px" : undefined,
                                        background: slot.events.length > 1 && highlighted && matchedFilter
                                          ? `${matchedFilter.color}18`
                                          : undefined,
                                        borderLeft: slot.events.length > 1
                                          ? `3px solid ${highlighted && matchedFilter ? matchedFilter.color : highlighted ? "#9B5B6B" : "#9B5B6B40"}`
                                          : undefined,
                                      }}
                                    >
                                      <div className="flex-1 min-w-0">
                                        <p className="text-2xl leading-tight" style={{ color: "#413720", fontWeight: 400 }}>
                                          {event.title}
                                        </p>
                                        {event.location && (
                                          <p style={{ color: "#413720", fontFamily: "'Pirata One', serif", fontSize: "13px", opacity: 0.65, marginTop: "2px" }}>
                                            {event.location}
                                          </p>
                                        )}
                                      </div>
                                      <div className="flex gap-1 flex-shrink-0">
                                        {event.categories.map((cat) => {
                                          const f = FILTERS.find((f) => f.key === cat)!;
                                          return (
                                            <img
                                              key={cat}
                                              src={CATEGORY_ICON[cat]}
                                              alt={f.label}
                                              title={f.label}
                                              className="w-6 h-6 object-contain"
                                            />
                                          );
                                        })}
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Curly bottom lip */}
            <div style={{ height: "2.5rem", background: "#9B5B6B", borderRadius: "50% 50% 1.8rem 1.8rem / 2rem 2rem 1.8rem 1.8rem", marginTop: "0.5rem" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
