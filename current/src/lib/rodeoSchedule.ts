import { useEffect, useState } from "react";
import { RODEO_URL } from "../config";

/** In dev the Vite proxy forwards /rodeo/* to the Rodeo server, avoiding CORS. */
const SCHEDULE_ENDPOINT =
  import.meta.env.DEV ? "/rodeo/api/schedule" : `${RODEO_URL}/api/schedule`;

export type Category = "required" | "food" | "fun";

/** Shape of one row from Rodeo's `GET /api/schedule`. */
interface RodeoEvent {
  id: string;
  name: string;
  description: string | null;
  start: string;
  end: string;
  location: string;
  type: "EVENT" | "WORKSHOP" | "MEAL" | "CEREMONY";
}

interface RodeoFeed {
  timezone: string;
  events: RodeoEvent[];
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

/** Turns Rodeo's flat, start-sorted event list into rows with day dividers, in the hackathon's timezone. */
export function toRows(feed: RodeoFeed): EventRow[] {
  const tz = feed.timezone;
  const day = new Intl.DateTimeFormat("en-US", { timeZone: tz, weekday: "long" });
  const dayKey = new Intl.DateTimeFormat("en-CA", { timeZone: tz });
  const clock = new Intl.DateTimeFormat("en-US", { timeZone: tz, hour: "numeric", minute: "2-digit" });

  const events = [...feed.events].sort((a, b) => +new Date(a.start) - +new Date(b.start));
  const rows: EventRow[] = [];
  let lastDay = "";
  for (const e of events) {
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
        setRows(toRows((await res.json()) as RodeoFeed));
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
