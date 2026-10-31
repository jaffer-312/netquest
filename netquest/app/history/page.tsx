
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Attempt = {
  id: number;
  test_id: number;
  score: number;
  total_marks: number;
  percentage: number;
  correct_answers: number;
  wrong_answers: number;
  answered_questions: number;
  duration_seconds: number | null;
  created_at: string;
  test: {
    id: number;
    title: string;
    category: string | null;
    difficulty: string | null;
  } | null;
  answers: {
    result_id: number;
    question_id: number;
    selected_answer: string | null;
    correct_answer: string | null;
    is_correct: boolean;
    category: string | null;
    marks_awarded: number | null;
    question: string;
  }[];
};

type HistoryResponse = {
  studentName: string;
  attempts: Attempt[];
  error?: string;
};

export default function HistoryPage() {
  const [studentName, setStudentName] = useState("");
  const [attempts, setAttempts] = useState<Attempt[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadHistory() {
      try {
        const response = await fetch("/api/student/history", {
          method: "GET",
          cache: "no-store",
        });

        const data: HistoryResponse = await response.json();

        if (!response.ok) {
          throw new Error(
            data.error ||
              (response.status === 401
                ? "Please log in to view your history."
                : "Unable to load history.")
          );
        }

        if (!active) return;

        setStudentName(data.studentName);
        setAttempts(data.attempts ?? []);
        setError("");
      } catch (err) {
        if (!active) return;

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load your history."
        );
      } finally {
        if (active) setLoading(false);
      }
    }

    void loadHistory();

    return () => {
      active = false;
    };
  }, []);

  const bestPercentage = attempts.length
    ? Math.max(...attempts.map((a) => Number(a.percentage) || 0))
    : 0;

  const averagePercentage = attempts.length
    ? Math.round(
        attempts.reduce(
          (sum, a) => sum + (Number(a.percentage) || 0),
          0
        ) / attempts.length
      )
    : 0;

  const averageDurationAttempts = attempts.filter(
    (a) => a.duration_seconds !== null &&
      a.duration_seconds !== undefined
  );

  const averageDuration = averageDurationAttempts.length
    ? Math.round(
        averageDurationAttempts.reduce(
          (sum, a) => sum + Number(a.duration_seconds),
          0
        ) / averageDurationAttempts.length
      )
    : null;

  function formatDuration(seconds: number | null | undefined) {
    if (seconds === null || seconds === undefined) {
      return "Not recorded";
    }

    const safeSeconds = Math.max(0, Math.floor(Number(seconds)));
    const minutes = Math.floor(safeSeconds / 60);
    const remaining = safeSeconds % 60;

    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60);
      const remainingMinutes = minutes % 60;
      return `${hours}h ${remainingMinutes}m`;
    }

    return `${minutes}m ${remaining}s`;
  }

  return (
    <main className="min-h-screen bg-[#050816] px-4 py-8 text-white sm:px-6">
      <div className="mx-auto max-w-6xl">

        <header className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">
              NETQUEST
            </p>

            <h1 className="mt-3 text-3xl font-black sm:text-5xl">
              Test History
            </h1>

            <p className="mt-3 text-slate-400">
              {studentName
                ? `Welcome, ${studentName}. Review your attempts and progress.`
                : "Review your attempts and track your progress."}
            </p>
          </div>

          <div className="flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-xl border border-white/10 px-4 py-3 font-semibold hover:border-cyan-400"
            >
              Home
            </Link>

            <Link
              href="/dashboard"
              className="rounded-xl bg-cyan-400 px-4 py-3 font-bold text-slate-950 hover:bg-cyan-300"
            >
              Dashboard
            </Link>
          </div>
        </header>

        {loading ? (
          <Panel>
            <p className="text-slate-400">
              Loading your attempts...
            </p>
          </Panel>
        ) : error ? (
          <Panel>
            <h2 className="text-xl font-bold text-rose-300">
              Could not load history
            </h2>

            <p className="mt-3 text-slate-300">{error}</p>

            {error.toLowerCase().includes("log in") && (
              <Link
                href="/student/login"
                className="mt-5 inline-block rounded-xl bg-cyan-400 px-5 py-3 font-bold text-slate-950"
              >
                Student Login
              </Link>
            )}
          </Panel>
        ) : (
          <>
            <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Summary
                label="Total Attempts"
                value={`${attempts.length}`}
                icon="📝"
              />

              <Summary
                label="Best Percentage"
                value={attempts.length ? `${bestPercentage}%` : "--"}
                icon="🏆"
              />

              <Summary
                label="Average Percentage"
                value={attempts.length ? `${averagePercentage}%` : "--"}
                icon="📊"
              />

              <Summary
                label="Average Duration"
                value={
                  averageDuration !== null
                    ? formatDuration(averageDuration)
                    : "--"
                }
                icon="⏱️"
              />
            </section>

            {attempts.length === 0 ? (
              <Panel>
                <div className="text-4xl">🎯</div>

                <h2 className="mt-3 text-2xl font-black">
                  No attempts yet
                </h2>

                <p className="mt-2 text-slate-400">
                  Complete a test and your results will appear here.
                </p>

                <Link
                  href="/test"
                  className="mt-5 inline-block rounded-xl bg-cyan-400 px-5 py-3 font-bold text-slate-950"
                >
                  Explore Tests
                </Link>
              </Panel>
            ) : (
              <section>
                <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h2 className="text-2xl font-black">
                      Your Attempts
                    </h2>

                    <p className="mt-1 text-sm text-slate-400">
                      Select an attempt to view its complete result.
                    </p>
                  </div>

                  <span className="rounded-full border border-white/10 px-4 py-2 text-sm text-slate-400">
                    {attempts.length} attempts
                  </span>
                </div>

                <div className="space-y-4">
                  {attempts.map((attempt, index) => {
                    const percentage =
                      Number(attempt.percentage) || 0;

                    return (
                      <article
                        key={attempt.id}
                        className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-cyan-400/40 sm:p-6"
                      >
                        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                          <div className="min-w-0">
                            <div className="flex flex-wrap gap-2">
                              <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-300">
                                Attempt #{attempts.length - index}
                              </span>

                              {attempt.test?.category && (
                                <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">
                                  {attempt.test.category}
                                </span>
                              )}

                              {attempt.test?.difficulty && (
                                <span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">
                                  {attempt.test.difficulty}
                                </span>
                              )}
                            </div>

                            <h3 className="mt-3 truncate text-xl font-black">
                              {attempt.test?.title ??
                                `Test #${attempt.test_id}`}
                            </h3>

                            <p className="mt-2 text-sm text-slate-400">
                              {new Date(
                                attempt.created_at
                              ).toLocaleString("en-IN", {
                                dateStyle: "medium",
                                timeStyle: "short",
                              })}
                            </p>
                          </div>

                          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                            <MiniStat
                              label="Score"
                              value={`${attempt.score}/${attempt.total_marks}`}
                            />

                            <MiniStat
                              label="Percentage"
                              value={`${percentage}%`}
                              highlight
                            />

                            <MiniStat
                              label="Correct"
                              value={`${attempt.correct_answers}`}
                            />

                            <MiniStat
                              label="Wrong"
                              value={`${attempt.wrong_answers}`}
                            />
                          </div>
                        </div>

                        <div className="mt-5 grid gap-3 border-t border-white/10 pt-4 sm:grid-cols-3">
                          <InfoItem
                            label="Questions answered"
                            value={`${attempt.answered_questions}`}
                          />

                          <InfoItem
                            label="Time taken"
                            value={formatDuration(
                              attempt.duration_seconds
                            )}
                          />

                          <InfoItem
                            label="Result reference"
                            value={`#${attempt.id}`}
                          />
                        </div>

                        <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <div className="mb-2 flex justify-between text-xs text-slate-400">
                              <span>Performance</span>
                              <span>{percentage}%</span>
                            </div>

                            <div className="h-2 overflow-hidden rounded-full bg-white/10">
                              <div
                                className="h-full rounded-full bg-cyan-400"
                                style={{
                                  width: `${Math.min(100, Math.max(0, percentage))}%`,
                                }}
                              />
                            </div>
                          </div>

                          <Link
                            href={`/results/${attempt.id}`}
                            className="rounded-xl bg-cyan-400 px-5 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-300"
                          >
                            View Full Result →
                          </Link>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            )}
          </>
        )}

        <footer className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-slate-500">
          NETQUEST · Learn · Practice · Improve
        </footer>
      </div>
    </main>
  );
}

function Panel({ children }: { children: React.ReactNode }) {
  return (
    <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-10">
      {children}
    </section>
  );
}

function Summary({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-bold uppercase tracking-wider text-slate-400">
          {label}
        </p>
        <span className="text-xl">{icon}</span>
      </div>

      <p className="mt-3 break-words text-2xl font-black text-cyan-300">
        {value}
      </p>
    </div>
  );
}

function MiniStat({
  label,
  value,
  highlight = false,
}: {
  label: string;
  value: string;
  highlight?: boolean;
}) {
  return (
    <div className="min-w-0 rounded-xl border border-white/10 bg-black/20 p-3 text-center">
      <p className="text-xs text-slate-400">{label}</p>
      <p
        className={`mt-2 break-words font-black ${
          highlight ? "text-cyan-300" : "text-white"
        }`}
      >
        {value}
      </p>
    </div>
  );
}

function InfoItem({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl bg-white/[0.03] p-3">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 break-words text-sm font-bold text-slate-200">
        {value}
      </p>
    </div>
  );
}
