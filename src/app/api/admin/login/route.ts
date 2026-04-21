import { NextRequest, NextResponse } from "next/server";
import { verifyPassword, issueToken, sessionCookie } from "@/lib/adminAuth";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

const NO_CACHE = { "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0", "CDN-Cache-Control": "no-store", "Vercel-CDN-Cache-Control": "no-store" };

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    if (typeof password !== "string") {
      return NextResponse.json({ error: "Password required" }, { status: 400, headers: NO_CACHE });
    }
    const ok = await verifyPassword(password);
    if (!ok) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401, headers: NO_CACHE });
    }
    const token = await issueToken();
    const res = NextResponse.json({ ok: true }, { headers: NO_CACHE });
    res.cookies.set(sessionCookie.name, token, sessionCookie.options);
    return res;
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message || "Login error" }, { status: 500, headers: NO_CACHE });
  }
}
