"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../utils/supabase/client";

const supabase = createClient();

type Result = {
  id: number;
  student_name: string;
  test_id: number;
  score: number;
  total_marks: number;
  percentage: number;
  correct_answers: number;
  wrong_answers: number;
  answered_questions: number;
  created_at: string;
};

type Test = {
  id: number;
  title: string;
};

export default function LeaderboardPage() {
  const [results, setResults] = useState<Result[]>([]);
  const [tests, setTests] = useState<Test[]>([]);
  const [selectedTestId, setSelectedTestId] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTests();
  }, []);

  useEffect(() => {
    if (selectedTestId !== null) {
      loadLeaderboard();
    }
  }, [selectedTestId]);

  async function loadTests() {
    const { data, error } = await supabase
      .from("tests")
      .select("id, title")
      .eq("is_enabled", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(
        "SUPABASE LEADERBOARD TEST ERROR:",
        JSON.stringify(error, null, 2)
      );
      setLoading(false);
      return;
    }

    setTests(data || []);

    if (data && data.length > 0) {
      setSelectedTestId(data[0].id);
    } else {
      setLoading(false);
    }
  }

  async function loadLeaderboard() {
    if (selectedTestId === null) {
      setResults([]);
      setLoading(false);
      return;
    }

    setLoading(true);

    const { data, error } = await supabase
      .from("results")
      .select("*")
      .eq("test_id", selectedTestId)
      .order("percentage", { ascending: false })
      .order("score", { ascending: false });

    if (error) {
      console.error(
        "SUPABASE LEADERBOARD ERROR:",
        JSON.stringify(error, null, 2)
      );
      setResults([]);
      setLoading(false);
      return;
    }

    setResults(data || []);
    setLoading(false);
  }

  return (
    <main className="min-h-screen bg-[#050816] px-5 py-10 text-white">
      <div className="mx-auto max-w-5xl">

        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">
            NetQuest
          </p>

          <h1 className="mt-2 text-4xl font-black">
            🏆 Leaderboard
          </h1>

          <p className="mt-2 text-slate-400">
            Top performers across NetQuest tests.
          </p>

          {tests.length > 0 && (
            <div className="mt-6 max-w-md">
              <label className="mb-2 block text-sm font-bold text-slate-400">
                Select Test
              </label>

              <select
                value={selectedTestId ?? ""}
                onChange={(e) =>
                  setSelectedTestId(Number(e.target.value))
                }
                className="w-full rounded-xl border border-white/10 bg-[#0b1024] px-4 py-3 text-white outline-none focus:border-cyan-400"
              >
                {tests.map((test) => (
                  <option key={test.id} value={test.id}>
                    {test.title}
                  </option>
                ))}
              </select>
            </div>
          )}
        </div>

        {loading ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center">
            Loading leaderboard...
          </div>
        ) : results.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-10 text-center">
            No results yet.
          </div>
        ) : (
          <div className="overflow-hidden rounded-3xl border border-white/10">

            {results.map((result, index) => (
              <div
                key={result.id}
                className="grid grid-cols-[70px_1fr_100px_100px] items-center gap-4 border-b border-white/10 bg-white/[0.03] px-6 py-5 last:border-b-0"
              >

                <div className="text-2xl font-black">
                  {index === 0
                    ? "🥇"
                    : index === 1
                    ? "🥈"
                    : index === 2
                    ? "🥉"
                    : `#${index + 1}`}
                </div>

                <div>
                  <p className="font-black">
                    {result.student_name || "Anonymous"}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    Correct: {result.correct_answers} · Wrong:{" "}
                    {result.wrong_answers}
                  </p>
                </div>

                <div className="text-center">
                  <p className="font-black">
                    {result.score}/{result.total_marks}
                  </p>

                  <p className="text-xs text-slate-500">
                    Score
                  </p>
                </div>

                <div className="text-right">
                  <p className="text-xl font-black text-cyan-400">
                    {result.percentage}%
                  </p>
                </div>

              </div>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}