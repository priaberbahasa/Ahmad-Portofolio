import { NextRequest, NextResponse } from "next/server";
import { verifyPassword, issueToken, sessionCookie } from "@/lib/adminAuth";

export const runtime = "nodejs"; // bcryptjs needs Node runtime

export async function POST(req: NextRequest) {
  try {
    const { password } = await req.json();
    if (typeof password !== "string") {
      return NextResponse.json({ error: "Password required" }, { status: 400 });
    }
    const ok = await verifyPassword(password);
    if (!ok) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }
    const token = await issueToken();
    const res = NextResponse.json({ ok: true });
    res.cookies.set(sessionCookie.name, token, sessionCookie.options);
    return res;
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message || "Login error" }, { status: 500 });
  }
}
