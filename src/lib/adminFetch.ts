// Defensive fetch for admin API calls. Returns the parsed JSON body if
// possible; otherwise throws an Error with enough context to debug
// service-worker interference, empty responses, HTML error pages, etc.
export async function adminFetch<T = unknown>(input: RequestInfo, init?: RequestInit): Promise<T> {
  // Opt out of any cached service-worker response.
  const merged: RequestInit = { ...init, cache: "no-store" };
  const res = await fetch(input, merged);

  const text = await res.text();
  let data: any = null;
  if (text && text.length > 0) {
    try { data = JSON.parse(text); } catch { /* non-JSON response */ }
  }

  if (!res.ok) {
    const msg = data?.error || (text ? `HTTP ${res.status}: ${text.slice(0, 180)}` : `HTTP ${res.status} with empty body`);
    throw new Error(msg);
  }

  if (data === null) {
    throw new Error(`Empty response (${res.status}). If this persists, unregister the service worker from DevTools → Application.`);
  }

  return data as T;
}
