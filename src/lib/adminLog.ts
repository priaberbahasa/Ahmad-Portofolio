// Tiny pub/sub in-memory log of admin fetch calls. Used by the floating
// ErrorLog panel so the user can see exactly what every save/load did
// (and copy-paste it when something goes wrong).

export type LogEntry = {
  id: string;
  ts: number;
  method: string;
  url: string;
  status?: number;
  durationMs?: number;
  ok: boolean;
  level: "info" | "error";
  body?: string;       // response body snippet
  requestSize?: number;
  error?: string;      // JS error message
  meta?: Record<string, any>;
};

type Listener = (entries: LogEntry[]) => void;

const entries: LogEntry[] = [];
const listeners = new Set<Listener>();
const MAX = 100;

export function addLog(entry: Omit<LogEntry, "id" | "ts">): LogEntry {
  const full: LogEntry = { id: Math.random().toString(36).slice(2, 10), ts: Date.now(), ...entry };
  entries.unshift(full);
  if (entries.length > MAX) entries.length = MAX;
  listeners.forEach(l => l(entries.slice()));
  return full;
}

export function clearLog() {
  entries.length = 0;
  listeners.forEach(l => l([]));
}

export function subscribe(fn: Listener): () => void {
  listeners.add(fn);
  fn(entries.slice());
  return () => listeners.delete(fn);
}

export function snapshot(): LogEntry[] {
  return entries.slice();
}

export function serializeLog(list: LogEntry[]): string {
  const env = typeof navigator !== "undefined"
    ? { userAgent: navigator.userAgent, swController: !!navigator.serviceWorker?.controller, url: typeof window !== "undefined" ? window.location.href : "" }
    : {};
  return JSON.stringify({ env, entries: list }, null, 2);
}
