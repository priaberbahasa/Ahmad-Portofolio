import { NextRequest, NextResponse } from "next/server";
import { listFiles, writeBinaryFile, deleteFile, getFileSha } from "@/lib/github";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const fetchCache = "force-no-store";

const NO_CACHE = { "Cache-Control": "no-store, no-cache, must-revalidate, max-age=0", "CDN-Cache-Control": "no-store", "Vercel-CDN-Cache-Control": "no-store" };

const IMAGE_DIR = "public/images";
const ALLOWED_EXT = /\.(jpe?g|png|webp|gif|svg)$/i;
const MAX_SIZE = 8 * 1024 * 1024;

export async function GET() {
  try {
    const items = await listFiles(IMAGE_DIR);
    const images = items
      .filter(i => i.type === "file" && ALLOWED_EXT.test(i.name))
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(i => ({
        name: i.name,
        path: i.path,
        sha: i.sha,
        size: i.size,
        url: "/" + i.path.replace(/^public\//, ""),
      }));
    return NextResponse.json({ images }, { headers: NO_CACHE });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500, headers: NO_CACHE });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, base64 } = await req.json();
    if (typeof name !== "string" || typeof base64 !== "string") {
      return NextResponse.json({ error: "name and base64 required" }, { status: 400, headers: NO_CACHE });
    }
    const cleanName = name.replace(/[^\w.\-]/g, "_");
    if (!ALLOWED_EXT.test(cleanName)) {
      return NextResponse.json({ error: "Unsupported file type. Allowed: jpg, png, webp, gif, svg" }, { status: 400, headers: NO_CACHE });
    }
    if (base64.length * 0.75 > MAX_SIZE) {
      return NextResponse.json({ error: "File too large (max 8 MB)" }, { status: 413, headers: NO_CACHE });
    }
    const path = `${IMAGE_DIR}/${cleanName}`;
    const existingSha = (await getFileSha(path)) || undefined;
    const result = await writeBinaryFile(path, base64, existingSha, `admin: upload ${cleanName}`);
    return NextResponse.json({ ok: true, name: cleanName, path, url: "/" + path.replace(/^public\//, ""), ...result }, { headers: NO_CACHE });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500, headers: NO_CACHE });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const path = req.nextUrl.searchParams.get("path");
    if (!path || !path.startsWith(IMAGE_DIR + "/")) {
      return NextResponse.json({ error: "Invalid path" }, { status: 400, headers: NO_CACHE });
    }
    const sha = await getFileSha(path);
    if (!sha) return NextResponse.json({ error: "Not found" }, { status: 404, headers: NO_CACHE });
    const result = await deleteFile(path, sha, `admin: delete ${path.split("/").pop()}`);
    return NextResponse.json({ ok: true, ...result }, { headers: NO_CACHE });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500, headers: NO_CACHE });
  }
}
