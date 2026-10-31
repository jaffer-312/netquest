
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

type Answer = {
  result_id: number;
  question_id: number;
  selected_answer: string | null;
  correct_answer: string | null;
  is_correct: boolean;
  category: string | null;
  marks_awarded: number | null;
  question: string;
  options: Record<string, string | null>;
  explanation: string;
  selected_answer_text: string;
  correct_answer_text: string;
};

type ResultData = {
  studentName: string;
  result: {
    id: number;
    score: number;
    total_marks: number;
    percentage: number;
    correct_answers: number;
    wrong_answers: number;
    answered_questions: number;
    duration_seconds: number | null;
    created_at: string;
  };
  test: {
    title: string;
    category: string | null;
    difficulty: string | null;
  } | null;
  answers: Answer[];
  error?: string;
};

export default function DetailedResultPage() {
  const params = useParams<{ id: string }>();
  const id = params.id;

  const [data, setData] = useState<ResultData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function loadResult() {
      try {
        const response = await fetch(
          `/api/student/results/${encodeURIComponent(id)}`,
          { cache: "no-store" }
        );

        const json = await response.json();

        if (!response.ok) {
          throw new Error(json.error || "Unable to load result.");
        }

        if (active) setData(json as ResultData);
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error ? err.message : "Unable to load result."
          );
        }
      } finally {
        if (active) setLoading(false);
      }
    }

    if (id) void loadResult();

    return () => {
      active = false;
    };
  }, [id]);

  const categoryStats = useMemo(() => {
    if (!data) return [];

    const grouped = new Map<
      string,
      { total: number; correct: number; wrong: number }
    >();

    for (const answer of data.answers) {
      const category = answer.category || "Uncategorized";

      const current = grouped.get(category) ?? {
        total: 0,
        correct: 0,
        wrong: 0,
      };

      current.total++;

      if (answer.is_correct) {
        current.correct++;
      } else {
        current.wrong++;
      }

      grouped.set(category, current);
    }

    return Array.from(grouped.entries())
      .map(([category, stats]) => ({
        category,
        ...stats,
        accuracy: stats.total
          ? Math.round((stats.correct / stats.total) * 100)
          : 0,
      }))
      .sort((a, b) => a.accuracy - b.accuracy);
  }, [data]);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050816] p-8 text-white">
        <p className="text-slate-400">
          Loading detailed result...
        </p>
      </main>
    );
  }

  if (error || !data) {
    return (
      <main className="min-h-screen bg-[#050816] p-8 text-white">
        <h1 className="text-2xl font-black">
          Result unavailable
        </h1>

        <p className="mt-3 text-rose-300">
          {error || "Result could not be loaded."}
        </p>

        <Link
          className="mt-6 inline-block text-cyan-300"
          href="/history"
        >
          ← Back to History
        </Link>
      </main>
    );
  }

  const result = data.result;

  function formatDuration(seconds: number | null) {
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

  const weakestCategory = categoryStats[0];

  return (
    <main className="min-h-screen bg-[#050816] px-4 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-5xl">

        <header className="mb-8 flex flex-wrap items-center justify-between gap-3">
          <Link
            href="/dashboard"
            className="font-black text-cyan-300"
          >
            NETQUEST
          </Link>

          <div className="flex flex-wrap gap-4 text-sm">
            <Link
              href="/history"
              className="text-slate-300 hover:text-white"
            >
              My History
            </Link>

            <Link
              href="/dashboard"
              className="text-slate-300 hover:text-white"
            >
              Dashboard
            </Link>
          </div>
        </header>

        <section className="rounded-3xl border border-cyan-400/20 bg-white/[0.03] p-6 sm:p-9">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">
              Detailed Test Result
            </p>

            <span className="rounded-full border border-white/10 px-3 py-1 text-xs text-slate-400">
              Result #{result.id}
            </span>
          </div>

          <h1 className="mt-3 text-3xl font-black sm:text-4xl">
            {data.test?.title ?? "Test Result"}
          </h1>

          <p className="mt-2 text-slate-400">
            Welcome, {data.studentName}
          </p>

          <div className="mt-3 flex flex-wrap gap-2 text-xs text-slate-400">
            {data.test?.category && (
              <span className="rounded-full bg-white/5 px-3 py-2">
                {data.test.category}
              </span>
            )}

            {data.test?.difficulty && (
              <span className="rounded-full bg-white/5 px-3 py-2">
                {data.test.difficulty}
              </span>
            )}

            <span className="rounded-full bg-white/5 px-3 py-2">
              {new Date(result.created_at).toLocaleString("en-IN", {
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </span>
          </div>

          <div className="mt-9 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <Stat
              label="Score"
              value={`${result.score}/${result.total_marks}`}
            />

            <Stat
              label="Percentage"
              value={`${result.percentage}%`}
            />

            <Stat
              label="Correct"
              value={`${result.correct_answers}`}
            />

            <Stat
              label="Wrong"
              value={`${result.wrong_answers}`}
            />
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            <Stat
              label="Answered"
              value={`${result.answered_questions}`}
            />

            <Stat
              label="Time Taken"
              value={formatDuration(result.duration_seconds)}
            />

            <Stat
              label="Questions Reviewed"
              value={`${data.answers.length}`}
            />
          </div>
        </section>

        <section className="mt-8 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <h2 className="text-xl font-black">
            Performance Analysis
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Your performance across the topics in this test.
          </p>

          {categoryStats.length === 0 ? (
            <p className="mt-5 rounded-xl bg-black/20 p-4 text-sm text-slate-400">
              Category analysis is not available for this attempt.
            </p>
          ) : (
            <div className="mt-6 space-y-4">
              {categoryStats.map((stat) => (
                <div
                  key={stat.category}
                  className="rounded-2xl border border-white/10 bg-black/20 p-4"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h3 className="font-bold">
                        {stat.category}
                      </h3>

                      <p className="mt-1 text-xs text-slate-400">
                        {stat.correct} correct · {stat.wrong} incorrect · {stat.total} questions
                      </p>
                    </div>

                    <span
                      className={`text-lg font-black ${
                        stat.accuracy < 50
                          ? "text-rose-300"
                          : stat.accuracy < 75
                            ? "text-yellow-300"
                            : "text-emerald-300"
                      }`}
                    >
                      {stat.accuracy}%
                    </span>
                  </div>

                  <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                    <div
                      className={`h-full rounded-full ${
                        stat.accuracy < 50
                          ? "bg-rose-400"
                          : stat.accuracy < 75
                            ? "bg-yellow-400"
                            : "bg-emerald-400"
                      }`}
                      style={{
                        width: `${stat.accuracy}%`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          {weakestCategory && (
            <div className="mt-6 rounded-2xl border border-yellow-400/20 bg-yellow-400/5 p-5">
              <p className="text-xs font-bold uppercase tracking-wider text-yellow-300">
                Improvement Focus
              </p>

              <h3 className="mt-2 text-lg font-black">
                {weakestCategory.category}
              </h3>

              <p className="mt-2 text-sm leading-6 text-slate-300">
                {weakestCategory.accuracy < 50
                  ? `This is your weakest topic in this attempt, with ${weakestCategory.accuracy}% accuracy. Revise the fundamentals and practise more questions from this category.`
                  : weakestCategory.accuracy < 75
                    ? `You scored ${weakestCategory.accuracy}% in this topic. More practice can help improve your accuracy.`
                    : `You performed well in this topic. Continue practising to maintain your performance.`}
              </p>
            </div>
          )}
        </section>

        <section className="mt-8">
          <div className="mb-5">
            <h2 className="text-2xl font-black">
              Question-by-Question Review
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Review your selected answers, correct answers and explanations.
            </p>
          </div>

          {data.answers.length === 0 ? (
            <div className="rounded-2xl border border-white/10 p-5 text-slate-400">
              Detailed answers are not available for this attempt.
            </div>
          ) : (
            <div className="space-y-4">
              {data.answers.map((answer, index) => (
                <article
                  key={`${answer.result_id}-${answer.question_id}`}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-6"
                >
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <span className="text-sm font-bold text-slate-400">
                      Question {index + 1} · {answer.category || "General"}
                    </span>

                    <span
                      className={
                        answer.is_correct
                          ? "rounded-full bg-emerald-400/10 px-3 py-1 text-sm font-bold text-emerald-300"
                          : "rounded-full bg-rose-400/10 px-3 py-1 text-sm font-bold text-rose-300"
                      }
                    >
                      {answer.is_correct ? "Correct" : "Incorrect"}
                    </span>
                  </div>

                  <h3 className="mt-4 text-base font-bold leading-7">
                    Q{index + 1}. {answer.question || `Question ID: ${answer.question_id}`}
                  </h3>

                  <div className="mt-5 space-y-2">
                    {(["A", "B", "C", "D"] as const).map((letter) => {
                      const option = answer.options?.[letter];

                      if (!option) return null;

                      const isSelected =
                        String(answer.selected_answer ?? "").toUpperCase() === letter;

                      const isCorrect =
                        String(answer.correct_answer ?? "").toUpperCase() === letter;

                      return (
                        <div
                          key={letter}
                          className={`flex items-start gap-3 rounded-xl border p-3 ${
                            isCorrect
                              ? "border-emerald-400/40 bg-emerald-400/10"
                              : isSelected
                                ? "border-rose-400/40 bg-rose-400/10"
                                : "border-white/10 bg-black/20"
                          }`}
                        >
                          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-white/10 text-xs font-black">
                            {letter}
                          </span>

                          <span className="flex-1 text-sm leading-6">
                            {option}
                          </span>

                          {isCorrect && (
                            <span className="text-xs font-bold text-emerald-300">
                              Correct
                            </span>
                          )}

                          {isSelected && !isCorrect && (
                            <span className="text-xs font-bold text-rose-300">
                              Your answer
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    <div className="rounded-xl bg-white/[0.04] p-3">
                      <p className="text-xs text-slate-400">
                        Your answer
                      </p>

                      <p className="mt-1 font-bold">
                        {answer.selected_answer_text}
                      </p>
                    </div>

                    <div className="rounded-xl bg-white/[0.04] p-3">
                      <p className="text-xs text-slate-400">
                        Correct answer
                      </p>

                      <p className="mt-1 font-bold text-emerald-300">
                        {answer.correct_answer_text}
                      </p>
                    </div>
                  </div>

                  <p className="mt-3 text-sm text-slate-400">
                    Marks awarded: {Number(answer.marks_awarded) || 0}
                  </p>

                  {answer.explanation && (
                    <div className="mt-4 rounded-xl border border-cyan-400/20 bg-cyan-400/5 p-4">
                      <p className="text-sm font-bold text-cyan-300">
                        Explanation
                      </p>

                      <p className="mt-2 text-sm leading-6 text-slate-300">
                        {answer.explanation}
                      </p>
                    </div>
                  )}
                </article>
              ))}
            </div>
          )}
        </section>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/test"
            className="rounded-xl bg-cyan-400 px-5 py-3 font-bold text-slate-950 hover:bg-cyan-300"
          >
            Take Another Test
          </Link>

          <Link
            href="/history"
            className="rounded-xl border border-white/10 px-5 py-3 font-bold hover:bg-white/5"
          >
            View History
          </Link>

          <Link
            href="/dashboard"
            className="rounded-xl border border-white/10 px-5 py-3 font-bold hover:bg-white/5"
          >
            Dashboard
          </Link>
        </div>

        <footer className="mt-12 border-t border-white/10 pt-6 text-center text-xs text-slate-500">
          NETQUEST · Learn · Practice · Improve
        </footer>
      </div>
    </main>
  );
}

function Stat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="mt-2 break-words text-xl font-black text-cyan-300 sm:text-2xl">
        {value}
      </p>
    </div>
  );
}
