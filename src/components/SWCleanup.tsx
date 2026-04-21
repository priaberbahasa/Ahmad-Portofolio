"use client";
import { useEffect } from "react";

// Unregister any service worker that was installed by earlier PWA-enabled
// builds, and purge all Cache Storage. Runs once per page load on every
// visitor — it's a no-op when no SW is registered.
export default function SWCleanup() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;
    (async () => {
      try {
        const regs = await navigator.serviceWorker.getRegistrations();
        for (const r of regs) await r.unregister();
        if ("caches" in window) {
          const names = await caches.keys();
          await Promise.all(names.map(n => caches.delete(n)));
        }
      } catch { /* ignore — best-effort cleanup */ }
    })();
  }, []);
  return null;
}
