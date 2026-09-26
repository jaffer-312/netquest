"use client";

import { useEffect, useMemo, useState } from "react";
import { createClient } from "../../utils/supabase/client";

const supabase = createClient();

type Result = {
  id: number;
  test_id: number;
  student_id: string | null;
  student_name: string;
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
  category: string;
  difficulty: string;
};

type Attempt = Result & {
  test?: Test;
};

export default function HistoryPage() {
  const [results, setResults] = useState<Result[]>([]);
  const [tests, setTests] = useState<Test[]>([]);
  const [studentName, setStudentName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedAttemptId, setSelectedAttemptId] = useState<number | null>(null);
  const [showIdentityGate, setShowIdentityGate] = useState(false);
  const [identityName, setIdentityName] = useState("");

  useEffect(() => {
    const savedName = localStorage.getItem("netquest_student_name");
    const savedStudentId = localStorage.getItem("netquest_student_id");

    if (savedName) setStudentName(savedName);

    if (savedStudentId) {
      setStudentId(savedStudentId);
      loadHistory(savedStudentId);
    } else {
      setLoading(false);
      setShowIdentityGate(true);
    }
  }, []);

  async function continueAsStudent() {
    const cleanName = identityName.trim();
    if (!cleanName) {
      alert("Please enter your name.");
      return;
    }

    const { data: existingStudent, error: existingError } = await supabase
      .from("students")
      .select("student_id, student_name")
      .eq("student_name", cleanName)
      .maybeSingle();

    if (existingError) {
      console.error("STUDENT LOOKUP ERROR:", existingError);
      alert("Unable to find your Student ID.");
      return;
    }

    let finalStudentId = existingStudent?.student_id;
    let finalStudentName = existingStudent?.student_name || cleanName;

    if (!finalStudentId) {
      const { data: newStudent, error: createError } = await supabase
        .from("students")
        .insert({ student_name: cleanName })
        .select("student_id, student_name")
        .single();

      if (createError) {
        console.error("STUDENT CREATE ERROR:", createError);
        alert("Unable to create your Student ID.");
        return;
      }

      finalStudentId = newStudent.student_id;
      finalStudentName = newStudent.student_name;
    }

    localStorage.setItem("netquest_student_id", finalStudentId);
    localStorage.setItem("netquest_student_name", finalStudentName);
    setStudentId(finalStudentId);
    setStudentName(finalStudentName);
    setIdentityName("");
    setShowIdentityGate(false);
    await loadHistory(finalStudentId);
  }

  async function loadHistory(studentIdValue: string) {
    setLoading(true);

    const [{ data: resultData, error: resultError }, { data: testData, error: testError }] =
      await Promise.all([
        supabase
          .from("results")
          .select("*")
          .eq("student_id", studentIdValue)
          .order("created_at", { ascending: false }),
        supabase
          .from("tests")
          .select("id, title, category, difficulty"),
      ]);

    if (resultError) {
      console.error("HISTORY RESULTS LOAD ERROR:", resultError);
      setResults([]);
    } else {
      setResults(resultData || []);
    }

    if (testError) {
      console.error("HISTORY TEST LOAD ERROR:", testError);
      setTests([]);
    } else {
      setTests(testData || []);
    }

    setLoading(false);
  }

  const attempts: Attempt[] = useMemo(() => {
    const testMap = new Map(tests.map((test) => [test.id, test]));
    return results.map((result) => ({
      ...result,
      test: testMap.get(result.test_id),
    }));
  }, [results, tests]);

  const bestPercentage = results.length
    ? Math.max(...results.map((result) => Number(result.percentage) || 0))
    : 0;
  const averagePercentage = results.length
    ? Math.round(
        results.reduce(
          (sum, result) => sum + (Number(result.percentage) || 0),
          0
        ) / results.length
      )
    : 0;

  return (
    <>
      {showIdentityGate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-5 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-cyan-400/20 bg-[#0b1024] p-8 shadow-2xl">
            <div className="text-center">
              <div className="text-5xl">📜</div>
              <p className="mt-5 text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">
                NETQUEST
              </p>
              <h2 className="mt-3 text-3xl font-black">Your Attempt History</h2>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                Enter your name to load your Student ID and previous attempts.
              </p>
              <input
                value={identityName}
                onChange={(e) => setIdentityName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") continueAsStudent();
                }}
                placeholder="Enter your name"
                className="mt-6 w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-white outline-none placeholder:text-slate-600 focus:border-cyan-400"
              />
              <button
                onClick={continueAsStudent}
                className="mt-4 w-full rounded-xl bg-cyan-400 py-3 font-black text-slate-950 transition hover:scale-[1.02]"
              >
                CONTINUE 🚀
              </button>
            </div>
          </div>
        </div>
      )}

      <main className="min-h-screen bg-[#050816] px-5 py-8 text-white">
        <div className="mx-auto max-w-6xl">
          <header className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">
                NETQUEST
              </p>
              <h1 className="mt-3 text-4xl font-black md:text-5xl">
                Attempt History 📜
              </h1>
              <p className="mt-2 text-slate-400">
                Review your previous challenges and track your progress.
              </p>
            </div>
            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-5 py-3 text-center">
              <p className="text-xs uppercase tracking-wider text-slate-500">Student ID</p>
              <p className="mt-1 font-black text-cyan-400">{studentId || "--"}</p>
            </div>
          </header>

          <section className="mb-10 grid gap-5 sm:grid-cols-3">
            <SummaryCard icon="🎯" label="Total Attempts" value={results.length.toString()} />
            <SummaryCard icon="🏆" label="Best Score" value={results.length ? `${bestPercentage}%` : "--"} />
            <SummaryCard icon="📈" label="Average" value={results.length ? `${averagePercentage}%` : "--"} />
          </section>

          {loading ? (
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-12 text-center">
              <div className="text-4xl">⚡</div>
              <p className="mt-3 text-slate-400">Loading your attempts...</p>
            </div>
          ) : attempts.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-12 text-center">
              <div className="text-5xl">🎮</div>
              <h2 className="mt-4 text-2xl font-black">No attempts yet</h2>
              <p className="mt-2 text-slate-500">
                Start a challenge and your result will appear here automatically.
              </p>
              <a
                href="/test"
                className="mt-6 inline-block rounded-xl bg-cyan-400 px-7 py-3 font-black text-slate-950"
              >
                START A CHALLENGE 🚀
              </a>
            </div>
          ) : (
            <section>
              <div className="mb-5">
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
                  Performance Log
                </p>
                <h2 className="mt-2 text-3xl font-black">All Attempts</h2>
              </div>

              <div className="space-y-4">
                {attempts.map((attempt, index) => {
                  const expanded = selectedAttemptId === attempt.id;
                  const percentage = Number(attempt.percentage) || 0;
                  const date = new Date(attempt.created_at).toLocaleString("en-IN", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  });

                  return (
                    <article
                      key={attempt.id}
                      className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-cyan-400/30"
                    >
                      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                        <div className="min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-400">
                              Attempt #{results.length - index}
                            </span>
                            {attempt.test && (
                              <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-bold text-slate-500">
                                {attempt.test.difficulty}
                              </span>
                            )}
                          </div>
                          <h3 className="mt-3 truncate text-xl font-black">
                            {attempt.test?.title || `Challenge #${attempt.test_id}`}
                          </h3>
                          <p className="mt-2 text-sm text-slate-500">{date}</p>
                        </div>

                        <div className="grid grid-cols-3 gap-3 lg:min-w-[420px]">
                          <MiniStat label="Score" value={`${attempt.score}/${attempt.total_marks}`} />
                          <MiniStat label="Percentage" value={`${percentage}%`} />
                          <MiniStat label="Correct" value={`${attempt.correct_answers}`} />
                        </div>
                      </div>

                      <button
                        onClick={() => setSelectedAttemptId(expanded ? null : attempt.id)}
                        className="mt-5 w-full rounded-xl border border-cyan-400/20 bg-cyan-400/5 py-3 font-black text-cyan-400 transition hover:bg-cyan-400/10"
                      >
                        {expanded ? "HIDE ATTEMPT DETAILS ↑" : "VIEW ATTEMPT DETAILS ↓"}
                      </button>

                      {expanded && (
                        <div className="mt-5 grid gap-4 border-t border-white/10 pt-5 sm:grid-cols-2 lg:grid-cols-4">
                          <MiniStat label="Answered" value={`${attempt.answered_questions}`} />
                          <MiniStat label="Correct" value={`${attempt.correct_answers}`} />
                          <MiniStat label="Wrong" value={`${attempt.wrong_answers}`} />
                          <MiniStat label="Result" value={percentage >= 80 ? "Excellent 🔥" : percentage >= 50 ? "Good 💪" : "Keep Practicing 🚀"} />
                        </div>
                      )}
                    </article>
                  );
                })}
              </div>
            </section>
          )}

          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <a
              href="/dashboard"
              className="rounded-xl border border-white/10 px-7 py-3 text-center font-black transition hover:border-cyan-400/30"
            >
              ← DASHBOARD
            </a>
            <a
              href="/test"
              className="rounded-xl bg-cyan-400 px-7 py-3 text-center font-black text-slate-950"
            >
              START NEW CHALLENGE 🚀
            </a>
          </div>

          <footer className="mt-16 border-t border-white/10 pt-6 text-center text-xs text-slate-600">
            NETQUEST • Learn • Practice • Compete 🚀
          </footer>
        </div>
      </main>
    </>
  );
}

function SummaryCard({ icon, label, value }: { icon: string; label: string; value: string }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <div className="flex items-center justify-between">
        <span className="text-3xl">{icon}</span>
        <span className="text-3xl font-black text-cyan-400">{value}</span>
      </div>
      <p className="mt-4 text-sm font-bold uppercase tracking-wider text-slate-500">{label}</p>
    </div>
  );
}

function MiniStat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-3 text-center">
      <p className="text-xs text-slate-600">{label}</p>
      <p className="mt-1 font-black">{value}</p>
    </div>
  );
}
