import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from "@/lib/github";

export const runtime = "nodejs";

// Only allow editing these paths/prefixes for safety.
const ALLOWED_PATHS = [
  /^content\/(research|projects|experience|activities)\/[\w-]+\.mdx$/,
  /^src\/lib\/siteConfig\.ts$/,
];

function isAllowed(p: string): boolean {
  return ALLOWED_PATHS.some(r => r.test(p));
}

export async function GET(req: NextRequest) {
  const path = req.nextUrl.searchParams.get("path");
  if (!path) return NextResponse.json({ error: "path required" }, { status: 400 });
  if (!isAllowed(path)) return NextResponse.json({ error: "Path not allowed" }, { status: 403 });
  try {
    const { content, sha } = await readFile(path);
    return NextResponse.json({ content, sha });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { path, content, sha, message } = await req.json();
    if (!path || typeof content !== "string") {
      return NextResponse.json({ error: "path and content required" }, { status: 400 });
    }
    if (!isAllowed(path)) {
      return NextResponse.json({ error: "Path not allowed" }, { status: 403 });
    }
    const commitMsg = message || `admin: update ${path}`;
    const result = await writeFile(path, content, sha, commitMsg);
    return NextResponse.json({ ok: true, ...result });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
