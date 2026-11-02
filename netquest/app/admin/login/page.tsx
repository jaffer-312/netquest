
"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../../utils/supabase/client";

export default function AdminLoginPage() {
  const supabase = createClient();
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [checkingSession, setCheckingSession] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function checkExistingAdminSession() {
      const { data, error: sessionError } =
        await supabase.auth.getSession();

      if (!active) return;

      if (sessionError) {
        setError("Unable to check your session. Please refresh the page.");
        setCheckingSession(false);
        return;
      }

      const user = data.session?.user;

      if (!user) {
        setCheckingSession(false);
        return;
      }

      const { data: admin, error: adminError } = await supabase
        .from("admin_users")
        .select("user_id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!active) return;

      if (adminError) {
        setError("Unable to verify admin access. Please try again.");
        setCheckingSession(false);
        return;
      }

      if (admin) {
        router.replace("/admin");
        router.refresh();
        return;
      }

      await supabase.auth.signOut();

      if (!active) return;

      setError("This account is not registered as an admin.");
      setCheckingSession(false);
    }

    void checkExistingAdminSession();

    return () => {
      active = false;
    };
  }, [router, supabase]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");

    const { data, error: signInError } =
      await supabase.auth.signInWithPassword({
        email: email.trim(),
        password,
      });

    if (signInError || !data.user) {
      setError(signInError?.message || "Login failed.");
      setBusy(false);
      return;
    }

    const { data: admin, error: adminError } = await supabase
      .from("admin_users")
      .select("user_id")
      .eq("user_id", data.user.id)
      .maybeSingle();

    if (adminError || !admin) {
      await supabase.auth.signOut();
      setError(
        adminError
          ? "Unable to verify admin access. Please try again."
          : "This account is not registered as an admin."
      );
      setBusy(false);
      return;
    }

    router.replace("/admin");
    router.refresh();
  }

  if (checkingSession) {
    return (
      <main
        style={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          background: "#080d1b",
          color: "#67e8f9",
        }}
      >
        Checking admin session...
      </main>
    );
  }

  return (
    <main
      style={{
        minHeight: "100vh",
        display: "grid",
        placeItems: "center",
        padding: 24,
        background: "#080d1b",
        color: "#f8fafc",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: 420,
          padding: 28,
          border: "1px solid #26334d",
          borderRadius: 18,
          background: "#10182b",
        }}
      >
        <div
          style={{
            color: "#67e8f9",
            fontSize: 13,
            fontWeight: 800,
            letterSpacing: 2,
          }}
        >
          NETQUEST
        </div>

        <h1 style={{ fontSize: 28, margin: "10px 0 6px" }}>
          Admin sign in
        </h1>

        <p style={{ color: "#aab7cf", marginTop: 0, marginBottom: 24 }}>
          Authorized administrators only.
        </p>

        <label style={{ display: "block", fontSize: 13, marginBottom: 7 }}>
          Email
        </label>
        <input
          type="email"
          autoComplete="username"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: 12,
            borderRadius: 9,
            border: "1px solid #35435f",
            background: "#080d1b",
            color: "white",
            marginBottom: 16,
          }}
        />

        <label style={{ display: "block", fontSize: 13, marginBottom: 7 }}>
          Password
        </label>
        <input
          type="password"
          autoComplete="current-password"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: 12,
            borderRadius: 9,
            border: "1px solid #35435f",
            background: "#080d1b",
            color: "white",
            marginBottom: 18,
          }}
        />
        <div style={{ textAlign: "right", marginTop: -10, marginBottom: 18 }}>
  <a
    href="/forgot-password"
    style={{
      color: "#67e8f9",
      fontSize: 13,
      textDecoration: "none",
    }}
  >
    Forgot Password?
  </a>
</div>

        {error && (
          <p role="alert" style={{ color: "#fca5a5", fontSize: 13 }}>
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={busy}
          style={{
            width: "100%",
            padding: 12,
            border: 0,
            borderRadius: 9,
            background: busy ? "#475569" : "#0891b2",
            color: "white",
            fontWeight: 800,
            cursor: busy ? "wait" : "pointer",
          }}
        >
          {busy ? "Signing in..." : "Sign in securely"}
        </button>
      </form>
    </main>
  );
}
