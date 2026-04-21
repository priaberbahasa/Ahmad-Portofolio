// Protect admin surface. Covers both the /admin/* pages and the
// /api/admin/* routes. /admin/login and /api/admin/login are public so
// the user can actually sign in.
import { NextRequest, NextResponse } from "next/server";
import { isValidToken, sessionCookie } from "@/lib/adminAuth";

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};

const PUBLIC = new Set(["/admin/login", "/api/admin/login"]);

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;
  if (PUBLIC.has(pathname)) return NextResponse.next();

  const token = req.cookies.get(sessionCookie.name)?.value;
  const ok = await isValidToken(token);
  if (!ok) {
    // Pages → redirect to login. API → return 401 JSON.
    if (pathname.startsWith("/api/")) {
      return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
    }
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
