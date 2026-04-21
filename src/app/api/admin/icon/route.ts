import { NextRequest, NextResponse } from "next/server";
import { writeBinaryFile, getFileSha } from "@/lib/github";

export const runtime = "nodejs";

// Accepts one square PNG (ideally 512x512 pre-resized client-side).
// Writes to multiple target paths so every icon surface is covered.
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
      return NextResponse.json({ error: "base64 required" }, { status: 400 });
    }
    if (base64.length * 0.75 > 4 * 1024 * 1024) {
      return NextResponse.json({ error: "Icon too large (max 4 MB)" }, { status: 413 });
    }
    const results: Array<{ path: string; commitSha: string; newSha: string }> = [];
    for (const path of TARGETS) {
      const existing = (await getFileSha(path)) || undefined;
      const r = await writeBinaryFile(path, base64, existing, `admin: update ${path.split("/").pop()}`);
      results.push({ path, ...r });
    }
    return NextResponse.json({ ok: true, results });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
