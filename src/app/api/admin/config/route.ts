import { NextRequest, NextResponse } from "next/server";
import { readFile, writeFile } from "@/lib/github";

export const runtime = "nodejs";

const CONFIG_PATH = "src/data/siteConfig.json";

export async function GET() {
  try {
    const { content, sha } = await readFile(CONFIG_PATH);
    return NextResponse.json({ data: JSON.parse(content), sha });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const { data, sha, message } = await req.json();
    if (!data || typeof data !== "object") {
      return NextResponse.json({ error: "data (object) required" }, { status: 400 });
    }
    const pretty = JSON.stringify(data, null, 2) + "\n";
    const result = await writeFile(CONFIG_PATH, pretty, sha, message || "admin: update siteConfig");
    return NextResponse.json({ ok: true, ...result });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
