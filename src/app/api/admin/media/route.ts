import { NextRequest, NextResponse } from "next/server";
import { listFiles, writeBinaryFile, deleteFile, getFileSha } from "@/lib/github";

export const runtime = "nodejs";

const IMAGE_DIR = "public/images";
const ALLOWED_EXT = /\.(jpe?g|png|webp|gif|svg)$/i;
const MAX_SIZE = 8 * 1024 * 1024; // 8 MB per image

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
    return NextResponse.json({ images });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { name, base64 } = await req.json();
    if (typeof name !== "string" || typeof base64 !== "string") {
      return NextResponse.json({ error: "name and base64 required" }, { status: 400 });
    }
    const cleanName = name.replace(/[^\w.\-]/g, "_");
    if (!ALLOWED_EXT.test(cleanName)) {
      return NextResponse.json({ error: "Unsupported file type. Allowed: jpg, png, webp, gif, svg" }, { status: 400 });
    }
    // rough size check (base64 length * 0.75 ≈ bytes)
    if (base64.length * 0.75 > MAX_SIZE) {
      return NextResponse.json({ error: "File too large (max 8 MB)" }, { status: 413 });
    }
    const path = `${IMAGE_DIR}/${cleanName}`;
    const existingSha = (await getFileSha(path)) || undefined;
    const result = await writeBinaryFile(path, base64, existingSha, `admin: upload ${cleanName}`);
    return NextResponse.json({ ok: true, name: cleanName, path, url: "/" + path.replace(/^public\//, ""), ...result });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const path = req.nextUrl.searchParams.get("path");
    if (!path || !path.startsWith(IMAGE_DIR + "/")) {
      return NextResponse.json({ error: "Invalid path" }, { status: 400 });
    }
    const sha = await getFileSha(path);
    if (!sha) return NextResponse.json({ error: "Not found" }, { status: 404 });
    const result = await deleteFile(path, sha, `admin: delete ${path.split("/").pop()}`);
    return NextResponse.json({ ok: true, ...result });
  } catch (e) {
    return NextResponse.json({ error: (e as Error).message }, { status: 500 });
  }
}
