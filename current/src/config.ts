/** Base URL of the Rodeo instance that owns the schedule (no trailing slash). */
export const RODEO_URL: string = (
  import.meta.env.VITE_RODEO_URL ?? "https://rodeo.freetailhackers.com"
).replace(/\/+$/, "");
