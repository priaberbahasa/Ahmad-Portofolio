// GitHub Contents API wrapper — read and commit files to the portfolio repo
import { Octokit } from "@octokit/rest";

function env(k: string): string {
  const v = process.env[k];
  if (!v) throw new Error(`${k} is not set`);
  return v;
}

function client() {
  return new Octokit({ auth: env("GITHUB_TOKEN") });
}

function repo() {
  return { owner: env("GITHUB_OWNER"), repo: env("GITHUB_REPO"), branch: env("GITHUB_BRANCH") };
}

export async function readFile(path: string): Promise<{ content: string; sha: string }> {
  const { owner, repo: name, branch } = repo();
  const res = await client().repos.getContent({ owner, repo: name, path, ref: branch });
  const data = res.data as { type: string; content: string; encoding: string; sha: string };
  if (data.type !== "file") throw new Error(`${path} is not a file`);
  const content = Buffer.from(data.content, data.encoding as BufferEncoding).toString("utf-8");
  return { content, sha: data.sha };
}

export async function writeFile(path: string, content: string, sha: string | undefined, message: string): Promise<{ commitSha: string; newSha: string }> {
  const { owner, repo: name, branch } = repo();
  const res = await client().repos.createOrUpdateFileContents({
    owner, repo: name, path, message, branch,
    content: Buffer.from(content, "utf-8").toString("base64"),
    sha,
    committer: { name: "Portfolio Admin", email: "admin@local" },
    author: { name: "Portfolio Admin", email: "admin@local" },
  });
  return {
    commitSha: res.data.commit.sha || "",
    newSha: res.data.content?.sha || "",
  };
}

// Upload binary (already-base64-encoded) — used for images.
export async function writeBinaryFile(path: string, base64Content: string, sha: string | undefined, message: string): Promise<{ commitSha: string; newSha: string }> {
  const { owner, repo: name, branch } = repo();
  const res = await client().repos.createOrUpdateFileContents({
    owner, repo: name, path, message, branch,
    content: base64Content,
    sha,
    committer: { name: "Portfolio Admin", email: "admin@local" },
    author: { name: "Portfolio Admin", email: "admin@local" },
  });
  return {
    commitSha: res.data.commit.sha || "",
    newSha: res.data.content?.sha || "",
  };
}

export async function deleteFile(path: string, sha: string, message: string): Promise<{ commitSha: string }> {
  const { owner, repo: name, branch } = repo();
  const res = await client().repos.deleteFile({
    owner, repo: name, path, message, branch, sha,
    committer: { name: "Portfolio Admin", email: "admin@local" },
    author: { name: "Portfolio Admin", email: "admin@local" },
  });
  return { commitSha: res.data.commit.sha || "" };
}

export async function listFiles(path: string): Promise<{ name: string; path: string; type: string; sha: string; size: number }[]> {
  const { owner, repo: name, branch } = repo();
  const res = await client().repos.getContent({ owner, repo: name, path, ref: branch });
  const data = res.data as Array<{ name: string; path: string; type: string; sha: string; size: number }>;
  if (!Array.isArray(data)) throw new Error(`${path} is not a directory`);
  return data.map(d => ({ name: d.name, path: d.path, type: d.type, sha: d.sha, size: d.size }));
}

// Get just the sha of a file without downloading its content (used before deletes)
export async function getFileSha(path: string): Promise<string | null> {
  try {
    const { owner, repo: name, branch } = repo();
    const res = await client().repos.getContent({ owner, repo: name, path, ref: branch });
    const data = res.data as { sha: string };
    return data.sha || null;
  } catch {
    return null;
  }
}
