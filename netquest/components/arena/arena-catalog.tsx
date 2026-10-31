"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { createClient } from "../../utils/supabase/client";

type Mode = "networking" | "network-detective" | "interview" | "dsa";
type TestRow = {
  id: number;
  title: string;
  description: string | null;
  category: string | null;
  difficulty: string | null;
  duration_minutes: number | null;
  question_count: number | null;
  total_marks: number | null;
  is_enabled: boolean;
};
type LinkedQuestion = { category?: string | null; question?: string | null };
type LinkRow = {
  test_id: number;
  questions: LinkedQuestion | LinkedQuestion[] | null;
};

type ModeInfo = {
  title: string;
  eyebrow: string;
  description: string;
  icon: string;
  categoryAliases: string[];
  metadataAliases: string[];
  empty: string;
};

const MODE_INFO: Record<Mode, ModeInfo> = {
  networking: {
    title: "Networking Arena",
    eyebrow: "CCNA • NETWORK FUNDAMENTALS",
    icon: "🌐",
    description:
      "Practice IP addressing, subnetting, OSI/TCP-IP, routing, switching and cybersecurity questions from your published NetQuest tests.",
    categoryAliases: ["networking", "network", "ccna", "network fundamentals", "cybersecurity"],
    metadataAliases: ["networking", "network", "ccna", "routing", "switching", "ip address", "cybersecurity"],
    empty:
      "No active Networking tests were found. Link Networking-category questions to an enabled test, or give an unlinked test a clear Networking/CCNA title or category.",
  },
  "network-detective": {
    title: "Network Detective",
    eyebrow: "DIAGNOSE • REASON • TROUBLESHOOT",
    icon: "🕵️",
    description:
      "Work through troubleshooting-focused assessments. This page lists published diagnostic/scenario tests; full interactive network simulations are a later build step.",
    categoryAliases: ["network detective", "troubleshooting", "troubleshooting scenario", "diagnostics", "network diagnostics"],
    metadataAliases: ["network detective", "troubleshoot", "troubleshooting", "diagnostic", "scenario", "packet tracer"],
    empty:
      "No dedicated troubleshooting tests were found. Add Network Detective/Troubleshooting-category questions to an enabled test, or publish a clearly named troubleshooting test without linked questions.",
  },
  interview: {
    title: "Interview Arena",
    eyebrow: "TECHNICAL INTERVIEW PRACTICE",
    icon: "💡",
    description:
      "Prepare with technical questions and explanations. Publish interview tests or link questions from the Interview category to a test.",
    categoryAliases: ["interview", "technical interview", "hr", "viva"],
    metadataAliases: ["interview", "hr round", "technical round", "viva"],
    empty:
      "No active Interview tests were found. Link Interview-category questions to an enabled test, or give an unlinked test a clear Interview title or category.",
  },
  dsa: {
    title: "DSA Arena",
    eyebrow: "DATA STRUCTURES • ALGORITHMS",
    icon: "🧠",
    description:
      "Practice DSA and coding concepts through published assessments. Timed coding execution and an in-browser code runner are not implemented yet.",
    categoryAliases: ["dsa", "data structures", "data structure", "algorithms", "algorithm", "programming", "coding"],
    metadataAliases: ["dsa", "data structure", "algorithm", "coding", "programming"],
    empty:
      "No active DSA tests were found. Link DSA-category questions to an enabled test, or give an unlinked test a clear DSA title or category.",
  },
};

function asArray<T>(value: T | T[] | null | undefined): T[] {
  if (!value) return [];
  return Array.isArray(value) ? value : [value];
}

function normalize(value: string | null | undefined): string {
  return (value || "")
    .toLowerCase()
    .trim()
    .replace(/[_-]+/g, " ")
    .replace(/\s+/g, " ");
}


function matchesAlias(
  value: string | null | undefined,
  aliases: string[],
): boolean {
  const normalized = normalize(value);
  if (!normalized) return false;

  return aliases.some((alias) => normalized === normalize(alias));
}

function matchesMetadata(
  value: string | null | undefined,
  aliases: string[],
): boolean {
  const normalized = normalize(value);
  if (!normalized) return false;

  return aliases.some((alias) => normalized.includes(normalize(alias)));
}


export default function ArenaCatalog({ mode }: { mode: Mode }) {
  const supabase = useMemo(() => createClient(), []);
  const info = MODE_INFO[mode];
  const [tests, setTests] = useState<TestRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError("");

      const { data: testRows, error: testError } = await supabase
        .from("tests")
        .select("id,title,description,category,difficulty,duration_minutes,question_count,total_marks,is_enabled")
        .eq("is_enabled", true)
        .order("created_at", { ascending: false });

      if (testError) {
        if (!cancelled) {
          setError(testError.message);
          setTests([]);
          setLoading(false);
        }
        return;
      }

      const activeTests = (testRows || []) as TestRow[];
      const { data: linkedRows, error: linkError } = await supabase
        .from("test_questions")
        .select("test_id, questions(category, question)");

      // Do not silently show unrelated tests if category-link data cannot be loaded.
      if (linkError) {
        if (!cancelled) {
          setError(`Could not check linked question categories: ${linkError.message}`);
          setTests([]);
          setLoading(false);
        }
        return;
      }

      const linksByTest = new Map<number, LinkedQuestion[]>();
      ((linkedRows || []) as unknown as LinkRow[]).forEach((row) => {
        const questions = asArray(row.questions);
        linksByTest.set(row.test_id, [
          ...(linksByTest.get(row.test_id) || []),
          ...questions,
        ]);
      });

      const filtered = activeTests.filter((test) => {
        const linkedQuestions = linksByTest.get(test.id) || [];

        // If a test has linked questions, the question categories are the source of truth.
        // Do not let a generic title or "Mixed" test category bypass category filtering.
        if (linkedQuestions.length > 0) {
          return linkedQuestions.some((question) =>
  matchesAlias(question.category, info.categoryAliases),
);
        }

        // Metadata fallback is only for enabled tests with no linked question rows.
       const metadata = `${test.title || ""} ${test.description || ""} ${test.category || ""}`;
return matchesMetadata(metadata, info.metadataAliases);
      });

      if (!cancelled) {
        setTests(filtered);
        setLoading(false);
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, [mode, supabase]);

  const testCountLabel = useMemo(
    () => `${tests.length} active test${tests.length === 1 ? "" : "s"}`,
    [tests.length],
  );

  return (
    <main className="min-h-screen bg-[#050816] px-5 py-10 text-white sm:px-8">
      <div className="mx-auto max-w-6xl">
        <nav className="mb-8 flex flex-wrap items-center gap-3 text-sm text-slate-400">
          <Link className="hover:text-cyan-300" href="/">Home</Link>
          <span>/</span>
          <Link className="hover:text-cyan-300" href="/arena">Arena</Link>
          <span>/</span>
          <span className="text-cyan-300">{info.title}</span>
        </nav>

        <section className="overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 via-white/[0.03] to-indigo-500/10 p-7 sm:p-10">
          <div className="text-5xl" aria-hidden="true">{info.icon}</div>
          <p className="mt-6 text-xs font-black uppercase tracking-[0.25em] text-cyan-300">{info.eyebrow}</p>
          <h1 className="mt-3 text-4xl font-black tracking-tight sm:text-5xl">{info.title}</h1>
          <p className="mt-5 max-w-3xl leading-7 text-slate-300">{info.description}</p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/arena" className="rounded-xl border border-white/15 px-4 py-3 text-sm font-bold hover:bg-white/5">All Arenas</Link>
            <Link href="/learn" className="rounded-xl bg-cyan-400 px-4 py-3 text-sm font-black text-slate-950 hover:bg-cyan-300">Learning Paths →</Link>
          </div>
        </section>

        <section className="mt-10">
          <div className="mb-5 flex flex-wrap items-end justify-between gap-3">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">Choose an assessment</p>
              <h2 className="mt-2 text-2xl font-black">Published challenges</h2>
            </div>
            <p className="text-sm text-slate-400">{loading ? "Loading tests…" : testCountLabel}</p>
          </div>

          {loading ? (
            <div className="rounded-2xl border border-white/10 p-8 text-slate-400">Loading published tests…</div>
          ) : error ? (
            <div role="alert" className="rounded-2xl border border-rose-400/30 bg-rose-400/5 p-6 text-rose-200">Could not load tests: {error}</div>
          ) : tests.length === 0 ? (
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-7">
              <p className="font-bold">No matching tests yet</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">{info.empty}</p>
              <Link href="/test" className="mt-5 inline-flex rounded-xl bg-cyan-400 px-4 py-3 text-sm font-black text-slate-950">Browse all active tests →</Link>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {tests.map((test) => (
                <article key={test.id} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-cyan-400/30">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-300">{info.title}</span>
                    <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">{test.difficulty || "Mixed"}</span>
                  </div>
                  <h3 className="mt-5 text-xl font-black">{test.title}</h3>
                  <p className="mt-2 min-h-10 text-sm leading-6 text-slate-400">{test.description || "Practice questions selected for this assessment."}</p>
                  <div className="mt-5 flex flex-wrap gap-4 text-xs text-slate-400">
                    <span>📝 {test.question_count ?? "—"} questions</span>
                    <span>🎯 {test.total_marks ?? "—"} marks</span>
                    <span>⏱ {test.duration_minutes ?? "—"} min</span>
                  </div>
                  <Link href={`/test?testId=${test.id}`} className="mt-6 inline-flex w-full items-center justify-center rounded-xl bg-cyan-400 px-5 py-3 font-black text-slate-950 transition hover:bg-cyan-300">Start challenge →</Link>
                </article>
              ))}
            </div>
          )}
        </section>

        <footer className="mt-12 flex flex-wrap gap-5 border-t border-white/10 pt-6 text-sm text-slate-500">
          <Link href="/dashboard" className="hover:text-cyan-300">My Dashboard</Link>
          <Link href="/history" className="hover:text-cyan-300">My History</Link>
          <Link href="/leaderboard" className="hover:text-cyan-300">Leaderboard</Link>
        </footer>
      </div>
    </main>
  );
}
