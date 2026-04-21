"use client";
import { useEffect } from "react";

// Unregisters any service worker installed by earlier PWA builds, purges
// Cache Storage, and — crucially — force-reloads the page if a SW is
// currently controlling it. .unregister() alone doesn't release the
// active SW: the current document keeps being intercepted by it until
// the next navigation. So the reload is required to actually escape.
//
// The sessionStorage guard prevents an infinite reload loop if something
// else weird is happening.
export default function SWCleanup() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!("serviceWorker" in navigator)) return;
    (async () => {
      try {
        const regs = await navigator.serviceWorker.getRegistrations();
        const hasController = !!navigator.serviceWorker.controller;
        if (regs.length === 0 && !hasController) return;

        for (const r of regs) await r.unregister();
        if ("caches" in window) {
          const names = await caches.keys();
          await Promise.all(names.map(n => caches.delete(n)));
        }

        if (hasController && !sessionStorage.getItem("sw-nuked")) {
          sessionStorage.setItem("sw-nuked", "1");
          window.location.reload();
        }
      } catch { /* ignore — best-effort cleanup */ }
    })();
  }, []);
  return null;
}
