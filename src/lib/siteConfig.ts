// ============================================================
// SITE CONFIG — data lives in src/data/siteConfig.json and is
// edited through /admin/config. This file simply re-exports it
// with a typed surface for the rest of the app.
// ============================================================
import data from "@/data/siteConfig.json";

export type SiteConfig = typeof data;
export const siteConfig = data as SiteConfig;
