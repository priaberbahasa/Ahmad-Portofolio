import { NextRequest, NextResponse } from "next/server";
import { listFiles } from "@/lib/github";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

const NO_CACHE = { "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0", "CDN-Cache-Control": "no-store", "Vercel-CDN-Cache-Control": "no-store" };

export async function GET(req: NextRequest) {
  const path = req.nextUrl.searchParams.get("path") || "";
  try {
    const items = await listFiles(path);
    return NextResponse.json({ items }, { headers: NO_CACHE });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500, headers: NO_CACHE });
  }
}
