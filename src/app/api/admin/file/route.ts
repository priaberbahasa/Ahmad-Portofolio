import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from "@/lib/github";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

const NO_CACHE = { "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0", "CDN-Cache-Control": "no-store", "Vercel-CDN-Cache-Control": "no-store" };

// Only allow editing these paths/prefixes for safety.
const ALLOWED_PATHS = [
  /^content\/(research|projects|experience|activities)\/[\w-]+\.mdx$/,
  /^src\/lib\/siteConfig\.ts$/,
  /^src\/data\/siteConfig\.json$/,
];

function isAllowed(p: string): boolean {
  return ALLOWED_PATHS.some(r => r.test(p));
}

export async function GET(req: NextRequest) {
  const path = req.nextUrl.searchParams.get("path");
  if (!path) return NextResponse.json({ error: "path required" }, { status: 400, headers: NO_CACHE });
  if (!isAllowed(path)) return NextResponse.json({ error: "Path not allowed" }, { status: 403, headers: NO_CACHE });
  try {
    const { content, sha } = await readFile(path);
    return NextResponse.json({ content, sha }, { headers: NO_CACHE });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500, headers: NO_CACHE });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { path, content, sha, message } = await req.json();
    if (!path || typeof content !== "string") {
      return NextResponse.json({ error: "path and content required" }, { status: 400, headers: NO_CACHE });
    }
    if (!isAllowed(path)) {
      return NextResponse.json({ error: "Path not allowed" }, { status: 403, headers: NO_CACHE });
    }
    const commitMsg = message || `admin: update ${path}`;
    const result = await writeFile(path, content, sha, commitMsg);
    return NextResponse.json({ ok: true, ...result }, { headers: NO_CACHE });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500, headers: NO_CACHE });
  }
}
