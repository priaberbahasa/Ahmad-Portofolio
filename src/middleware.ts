// Protect /admin/* routes (except /admin/login). Verifies the session JWT.
import { NextRequest, NextResponse } from "next/server";
import { isValidToken, sessionCookie } from "@/lib/adminAuth";

export const config = {
  matcher: ["/admin/:path*"],
};

export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // allow the login page through
  if (pathname === "/admin/login") return NextResponse.next();

  const token = req.cookies.get(sessionCookie.name)?.value;
  const ok = await isValidToken(token);
  if (!ok) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}
