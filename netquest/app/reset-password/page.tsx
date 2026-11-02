"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "../../utils/supabase/client";

export default function ResetPasswordPage() {
  const supabase = createClient();
  const router = useRouter();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    setBusy(true);
    setError("");
    setMessage("");

    try {
      if (password.length < 8) {
        throw new Error("Password must contain at least 8 characters.");
      }

      if (password !== confirmPassword) {
        throw new Error("Passwords do not match.");
      }

      // Verify the password reset session
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error(
          "Your password reset session has expired or is invalid. Please request a new reset link."
        );
      }

      // Check whether this account belongs to an Admin
      const { data: admin, error: adminError } = await supabase
        .from("admin_users")
        .select("user_id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (adminError) {
        throw new Error("Unable to verify account type. Please try again.");
      }

      // Update the password
      const { error: updateError } = await supabase.auth.updateUser({
        password,
      });

      if (updateError) throw updateError;

      setMessage(
        "Password updated successfully! Redirecting to the login page..."
      );

      // Redirect Admins and Students to their respective login pages
      setTimeout(() => {
        router.replace(admin ? "/admin/login" : "/student/login");
      }, 2000);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to update your password."
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
          Reset Password
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Create a new secure password for your NetQuest account.
        </p>

        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          <input
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="New password (minimum 8 characters)"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400"
          />

          <input
            type="password"
            autoComplete="new-password"
            required
            minLength={8}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm new password"
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
            {busy ? "Updating password..." : "Update Password"}
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