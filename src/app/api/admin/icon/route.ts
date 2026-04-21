import { NextRequest, NextResponse } from "next/server";
import { writeBinaryFile, getFileSha } from "@/lib/github";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

const NO_CACHE = { "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0", "CDN-Cache-Control": "no-store", "Vercel-CDN-Cache-Control": "no-store" };

const TARGETS = [
  "public/favicon.png",
  "public/icon-192.png",
  "public/icon-512.png",
  "public/apple-icon.png",
];

export async function POST(req: NextRequest) {
  try {
    const { base64 } = await req.json();
    if (typeof base64 !== "string" || !base64) {
      return NextResponse.json({ error: "base64 required" }, { status: 400, headers: NO_CACHE });
    }
    if (base64.length * 0.75 > 4 * 1024 * 1024) {
      return NextResponse.json({ error: "Icon too large (max 4 MB)" }, { status: 413, headers: NO_CACHE });
    }
    const results: Array<{ path: string; commitSha: string; newSha: string }> = [];
    for (const path of TARGETS) {
      const existing = (await getFileSha(path)) || undefined;
      const r = await writeBinaryFile(path, base64, existing, `admin: update ${path.split("/").pop()}`);
      results.push({ path, ...r });
    }
    return NextResponse.json({ ok: true, results }, { headers: NO_CACHE });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500, headers: NO_CACHE });
  }
}
