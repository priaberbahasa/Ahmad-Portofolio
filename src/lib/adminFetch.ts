// Defensive fetch for admin API calls. Returns the parsed JSON body if
// possible; otherwise throws an Error with enough context to debug
// service-worker interference, empty responses, HTML error pages, etc.
//
// Every call is published to the in-memory admin log so the floating
// ErrorLog panel can surface it to the user for audit.
import { addLog } from "./adminLog";

export async function adminFetch<T = unknown>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const method = (init?.method || "GET").toUpperCase();
  const url = typeof input === "string" ? input : (input as Request).url;
  const started = performance.now();

  let requestSize: number | undefined;
  if (init?.body && typeof init.body === "string") requestSize = init.body.length;

  // Opt out of any cached service-worker response.
  const merged: RequestInit = { ...init, cache: "no-store", credentials: "same-origin" };

  let res: Response;
  try {
    res = await fetch(input, merged);
  } catch (e) {
    const err = e as Error;
    addLog({ method, url, ok: false, level: "error", error: err.message, requestSize, durationMs: Math.round(performance.now() - started) });
    throw err;
  }

  const durationMs = Math.round(performance.now() - started);
  const text = await res.text();
  let data: any = null;
  if (text.length > 0) { try { data = JSON.parse(text); } catch { /* not JSON */ } }

  const bodyPreview = text.length > 600 ? text.slice(0, 600) + `\n…(+${text.length - 600} more chars)` : text;
  const contentType = res.headers.get("content-type") || "";
  const via = res.headers.get("x-vercel-cache") || res.headers.get("server") || "";

  if (!res.ok) {
    const msg = data?.error || (text ? `HTTP ${res.status}: ${text.slice(0, 180)}` : `HTTP ${res.status} with empty body`);
    addLog({
      method, url, status: res.status, ok: false, level: "error",
      body: bodyPreview, requestSize, durationMs,
      error: msg,
      meta: { contentType, via, swActive: typeof navigator !== "undefined" && !!navigator.serviceWorker?.controller },
    });
    throw new Error(msg);
  }

  if (data === null) {
    const msg = `Empty response (${res.status}). Check the log panel for details.`;
    addLog({
      method, url, status: res.status, ok: false, level: "error",
      body: bodyPreview, requestSize, durationMs,
      error: msg,
      meta: { contentType, via, swActive: typeof navigator !== "undefined" && !!navigator.serviceWorker?.controller },
    });
    throw new Error(msg);
  }

  addLog({
    method, url, status: res.status, ok: true, level: "info",
    requestSize, durationMs,
    meta: { contentType, via },
  });
  return data as T;
}
