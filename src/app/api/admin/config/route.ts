import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from "@/lib/github";

// Force this route to be dynamic and never cached / prerendered by Vercel.
// Without these, PUT requests were being answered from the prerender cache
// with "HTTP 405 with empty body" because the route was being treated like
// a static asset.
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

const CONFIG_PATH = "src/data/siteConfig.json";
const NO_CACHE = { "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0", "CDN-Cache-Control": "no-store", "Vercel-CDN-Cache-Control": "no-store" };

export async function GET() {
  try {
    const { content, sha } = await readFile(CONFIG_PATH);
    return NextResponse.json({ data: JSON.parse(content), sha }, { headers: NO_CACHE });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500, headers: NO_CACHE });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { data, sha, message } = await req.json();
    if (!data || typeof data !== "object") {
      return NextResponse.json({ error: "data (object) required" }, { status: 400, headers: NO_CACHE });
    }
    const pretty = JSON.stringify(data, null, 2) + "\n";
    const result = await writeFile(CONFIG_PATH, pretty, sha, message || "admin: update siteConfig");
    return NextResponse.json({ ok: true, ...result }, { headers: NO_CACHE });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500, headers: NO_CACHE });
  }
}
