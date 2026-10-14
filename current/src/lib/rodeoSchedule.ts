import { useEffect, useState } from "react";

/** Proxied through Vite (dev) and Vercel (prod) to avoid CORS. */
const SCHEDULE_ENDPOINT = "/rodeo/api/trpc/schedule.list";

/** HackTX is held in Austin, TX. */
const TIMEZONE = "America/Chicago";

export type Category = "required" | "food" | "fun";

interface RodeoEvent {
  id: string;
  name: string;
  description: string | null;
  start: string;
  end: string;
  location: string;
  type: "EVENT" | "WORKSHOP" | "MEAL" | "CEREMONY";
}

export interface ScheduleEvent {
  id: string;
  time: string;
  endTime?: string;
  title: string;
  location: string;
  categories: Category[];
}

export type EventRow = ScheduleEvent | { divider: string };

const CATEGORY_BY_TYPE: Record<RodeoEvent["type"], Category> = {
  CEREMONY: "required",
  MEAL: "food",
  WORKSHOP: "fun",
  EVENT: "fun",
};

const POLL_MS = 60_000;
const NIGHT_OWL_MS = 4 * 60 * 60 * 1000;

/** Turns Rodeo's flat, start-sorted event list into rows with day dividers. */
export function toRows(events: RodeoEvent[]): EventRow[] {
  const day = new Intl.DateTimeFormat("en-US", { timeZone: TIMEZONE, weekday: "long" });
  const dayKey = new Intl.DateTimeFormat("en-CA", { timeZone: TIMEZONE });
  const clock = new Intl.DateTimeFormat("en-US", { timeZone: TIMEZONE, hour: "numeric", minute: "2-digit" });

  const sorted = [...events].sort((a, b) => +new Date(a.start) - +new Date(b.start));
  const rows: EventRow[] = [];
  let lastDay = "";
  for (const e of sorted) {
    const start = new Date(e.start);
    // Events before 4 AM belong to the night before (Midnight Snack stays under Saturday).
    const dayStart = new Date(start.getTime() - NIGHT_OWL_MS);
    const key = dayKey.format(dayStart);
    if (key !== lastDay) {
      rows.push({ divider: day.format(dayStart) });
      lastDay = key;
    }
    rows.push({
      id: e.id,
      time: clock.format(start),
      endTime: e.end === e.start ? undefined : clock.format(new Date(e.end)),
      title: e.name,
      location: e.location,
      categories: [CATEGORY_BY_TYPE[e.type] ?? "fun"],
    });
  }
  return rows;
}

/** Live schedule from Rodeo: events added, edited or removed there show up here on the next poll. */
export function useRodeoSchedule() {
  const [rows, setRows] = useState<EventRow[] | null>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const load = async () => {
      try {
        const res = await fetch(SCHEDULE_ENDPOINT, { signal: controller.signal });
        if (!res.ok) throw new Error(String(res.status));
        // tRPC v11 wraps responses with superjson: { result: { data: { json: T } } }
        const body = await res.json();
        const events = body.result.data.json as RodeoEvent[];
        setRows(toRows(events));
        setError(false);
      } catch (err) {
        if (!controller.signal.aborted) setError(true);
        console.error("Failed to load schedule from Rodeo", err);
      }
    };

    load();
    const timer = setInterval(load, POLL_MS);
    return () => {
      controller.abort();
      clearInterval(timer);
    };
  }, []);

  return { rows, error };
}
