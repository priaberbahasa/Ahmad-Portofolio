"use client";
import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { adminFetch } from "@/lib/adminFetch";

function LoginInner() {
  const router = useRouter();
  const search = useSearchParams();
  const next = search.get("next") || "/admin";
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      await adminFetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });
      router.replace(next);
      router.refresh();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="container" style={{ maxWidth: 420, paddingTop: 40 }}>
      <div className="eyebrow">Admin</div>
      <h1 className="section-title">Sign in</h1>
      <p className="section-sub" style={{ marginBottom: 28 }}>Enter your password to edit site content.</p>

      <form onSubmit={onSubmit} className="contact-form">
        <label>
          <span>Password</span>
          <input
            type="password"
            required
            autoFocus
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
          />
        </label>
        {error && <div style={{ color: "#b54141", fontSize: 13, fontFamily: "var(--mono)" }}>{error}</div>}
        <button type="submit" className="btn btn-primary" disabled={loading || !password}>
          {loading ? "Signing in…" : "Sign in"}
        </button>
      </form>
    </div>
  );
}

export default function AdminLoginPage() {
  return (
    <Suspense fallback={<div className="container" style={{ paddingTop: 40 }}>Loading…</div>}>
      <LoginInner />
    </Suspense>
  );
}
