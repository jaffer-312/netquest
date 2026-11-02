"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { createClient } from "../../utils/supabase/client";

export default function ForgotPasswordPage() {
  const supabase = createClient();

  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setBusy(true);
    setMessage("");
    setError("");

    try {
      const { error } = await supabase.auth.resetPasswordForEmail(
        email.trim().toLowerCase(),
        {
          redirectTo: `${window.location.origin}/reset-password`,
        }
      );

      if (error) throw error;

      setMessage(
        "Password reset link sent! Please check your email and follow the link to create a new password."
      );
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to send the password reset email."
      );
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-[#050816] px-4 py-10 text-white">
      <section className="w-full max-w-md rounded-2xl border border-cyan-400/20 bg-slate-900/80 p-7 shadow-2xl">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-cyan-400">
          NetQuest
        </p>

        <h1 className="mt-3 text-3xl font-black">
          Forgot Password?
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Enter your registered email address. We will send you a link to reset your password.
        </p>

        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          <input
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400"
          />

          {error && (
            <p
              role="alert"
              className="rounded-lg bg-red-950/50 p-3 text-sm text-red-300"
            >
              {error}
            </p>
          )}

          {message && (
            <p
              role="status"
              className="rounded-lg bg-emerald-950/50 p-3 text-sm text-emerald-300"
            >
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-xl bg-cyan-400 px-4 py-3 font-bold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busy ? "Sending reset link..." : "Send Reset Link"}
          </button>
        </form>

        <div className="mt-6 flex justify-between text-sm">
          <Link
            href="/student/login"
            className="text-cyan-300 hover:underline"
          >
            Student Login
          </Link>

          <Link
            href="/admin/login"
            className="text-cyan-300 hover:underline"
          >
            Admin Login
          </Link>
        </div>
      </section>
    </main>
  );
}