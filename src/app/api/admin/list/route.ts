import { NextRequest, NextResponse } from "next/server";
import { listFiles } from "@/lib/github";

export const runtime = "nodejs";

export async function GET(req: NextRequest) {
  const path = req.nextUrl.searchParams.get("path") || "";
  try {
    const items = await listFiles(path);
    return NextResponse.json({ items });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
