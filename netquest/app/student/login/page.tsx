
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "../../../utils/supabase/client";

export default function StudentLoginPage() {
  const supabase = createClient();
  const router = useRouter();

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setMessage("");
    setError("");

    try {
      const cleanEmail = email.trim().toLowerCase();
      const cleanName = name.trim().replace(/\s+/g, " ");

      if (mode === "signup") {
        if (!cleanName) {
          setError("Please enter your full name.");
          return;
        }

        if (password.length < 8) {
          setError("Password must contain at least 8 characters.");
          return;
        }

        const { data, error: signupError } =
          await supabase.auth.signUp({
            email: cleanEmail,
            password,
            options: {
              data: { full_name: cleanName },
              emailRedirectTo: `${window.location.origin}/student/login`,
            },
          });

        if (signupError) throw signupError;

        if (data.session) {
          setMessage("Account created. Opening your dashboard...");
          router.replace("/dashboard");
          router.refresh();
        } else {
          setMessage(
            "Signup successful! Check your email and click the verification link. Then return here and log in."
          );
          setMode("login");
        }

        return;
      }

      const { error: loginError } =
        await supabase.auth.signInWithPassword({
          email: cleanEmail,
          password,
        });

      if (loginError) throw loginError;

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        throw userError || new Error("Unable to verify your account.");
      }

      const { data: student, error: studentError } = await supabase
        .from("students")
        .select("student_id, student_name")
        .eq("auth_user_id", user.id)
        .maybeSingle();

      if (studentError) throw studentError;

      if (!student) {
        await supabase.auth.signOut();
        throw new Error(
          "Student profile not found. Please contact the NetQuest administrator."
        );
      }

      localStorage.setItem("netquest_student_id", student.student_id);
      localStorage.setItem("netquest_student_name", student.student_name);

      router.replace("/dashboard");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong."
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
          {mode === "login" ? "Student Login" : "Create Student Account"}
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          {mode === "login"
            ? "Log in to access your dashboard and test history."
            : "Create your account to receive your permanent Student ID."}
        </p>

        <form onSubmit={handleSubmit} className="mt-7 space-y-4">
          {mode === "signup" && (
            <input
              type="text"
              autoComplete="name"
              required
              maxLength={100}
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400"
            />
          )}

          <input
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email address"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400"
          />

          <input
            type="password"
            autoComplete={
              mode === "login" ? "current-password" : "new-password"
            }
            minLength={8}
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password (minimum 8 characters)"
            className="w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-cyan-400"
          />

          {error && (
            <p role="alert" className="rounded-lg bg-red-950/50 p-3 text-sm text-red-300">
              {error}
            </p>
          )}

          {message && (
            <p role="status" className="rounded-lg bg-emerald-950/50 p-3 text-sm text-emerald-300">
              {message}
            </p>
          )}

          <button
            type="submit"
            disabled={busy}
            className="w-full rounded-xl bg-cyan-400 px-4 py-3 font-bold text-slate-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {busy
              ? "Please wait..."
              : mode === "login"
                ? "Log In"
                : "Create Account"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => {
            setMode(mode === "login" ? "signup" : "login");
            setError("");
            setMessage("");
          }}
          className="mt-5 w-full text-sm text-cyan-300 hover:underline"
        >
          {mode === "login"
            ? "New student? Create an account"
            : "Already registered? Log in"}
        </button>

        <Link
          href="/"
          className="mt-6 block text-center text-sm text-slate-400 hover:text-white"
        >
          ← Back to Home
        </Link>
      </section>
    </main>
  );
}
