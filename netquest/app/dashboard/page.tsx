
"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "../../utils/supabase/client";

type Student = {
  student_id: string;
  student_name: string;
};

type Result = {
  id: number;
  test_id: number;
  score: number;
  total_marks: number;
  percentage: number;
  created_at: string;
  correct_answers: number;
  wrong_answers: number;
  duration_seconds: number | null;
};

type Test = {
  id: number;
  title: string;
  description: string | null;
  category: string | null;
  difficulty: string | null;
  duration_minutes: number;
  question_count: number;
  total_marks: number;
};

type ResultAnswer = {
  result_id: number;
  category: string | null;
  is_correct: boolean;
  marks_awarded: number | null;
};

type CategoryStat = {
  category: string;
  total: number;
  correct: number;
  wrong: number;
  accuracy: number;
};

export default function DashboardPage() {
  const router = useRouter();

  const [student, setStudent] = useState<Student | null>(null);
  const [results, setResults] = useState<Result[]>([]);
  const [tests, setTests] = useState<Test[]>([]);
  const [resultAnswers, setResultAnswers] = useState<ResultAnswer[]>([]);
  const [loading, setLoading] = useState(true);
  const [signingOut, setSigningOut] = useState(false);
  const [error, setError] = useState("");

  const loadDashboard = useCallback(async () => {
    const supabase = createClient();

    setLoading(true);
    setError("");

    try {
      const {
        data: { user },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError || !user) {
        router.replace("/student/login");
        return;
      }

      const { data: profile, error: profileError } = await supabase
        .from("students")
        .select("student_id, student_name")
        .eq("auth_user_id", user.id)
        .maybeSingle();

      if (profileError) throw profileError;

      if (!profile) {
        setError(
          "Your student profile was not found. Please contact the NetQuest administrator."
        );
        return;
      }

      setStudent(profile as Student);

      const [resultResponse, testResponse] = await Promise.all([
        supabase
          .from("results")
          .select(
            "id, test_id, score, total_marks, percentage, created_at, correct_answers, wrong_answers, duration_seconds"
          )
          .eq("student_id", profile.student_id)
          .order("created_at", { ascending: false }),

        supabase
          .from("tests")
          .select(
            "id, title, description, category, difficulty, duration_minutes, question_count, total_marks"
          )
          .eq("is_enabled", true)
          .order("created_at", { ascending: false }),
      ]);

      if (resultResponse.error) throw resultResponse.error;
      if (testResponse.error) throw testResponse.error;

      const fetchedResults = (resultResponse.data || []) as Result[];

      setResults(fetchedResults);
      setTests((testResponse.data || []) as Test[]);

      if (fetchedResults.length > 0) {
        const resultIds = fetchedResults.map((result) => result.id);

        const { data: answerData, error: answerError } = await supabase
          .from("result_answers")
          .select("result_id, category, is_correct, marks_awarded")
          .in("result_id", resultIds);

        if (answerError) {
          console.warn(
            "Dashboard category analysis unavailable:",
            answerError.message
          );
          setResultAnswers([]);
        } else {
          setResultAnswers((answerData || []) as ResultAnswer[]);
        }
      } else {
        setResultAnswers([]);
      }
    } catch (err) {
      console.error("Dashboard loading error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load your dashboard."
      );
    } finally {
      setLoading(false);
    }
  }, [router]);

  useEffect(() => {
    void loadDashboard();
  }, [loadDashboard]);

  async function handleLogout() {
    setSigningOut(true);

    try {
      const supabase = createClient();
      const { error: logoutError } = await supabase.auth.signOut();

      if (logoutError) throw logoutError;

      localStorage.removeItem("netquest_student_id");
      localStorage.removeItem("netquest_student_name");

      router.replace("/student/login");
      router.refresh();
    } catch (err) {
      console.error("Logout error:", err);

      setError(
        err instanceof Error ? err.message : "Unable to log out."
      );

      setSigningOut(false);
    }
  }

  const bestPercentage = results.length
    ? Math.max(...results.map((r) => Number(r.percentage) || 0))
    : 0;

  const averagePercentage = results.length
    ? Math.round(
        results.reduce(
          (sum, r) => sum + (Number(r.percentage) || 0),
          0
        ) / results.length
      )
    : 0;

  const averageDurationResults = results.filter(
    (result) =>
      result.duration_seconds !== null &&
      result.duration_seconds !== undefined
  );

  const averageDuration = averageDurationResults.length
    ? Math.round(
        averageDurationResults.reduce(
          (sum, result) => sum + Number(result.duration_seconds),
          0
        ) / averageDurationResults.length
      )
    : null;

  const categoryStats = useMemo<CategoryStat[]>(() => {
    const grouped = new Map<
      string,
      { total: number; correct: number; wrong: number }
    >();

    for (const answer of resultAnswers) {
      const category = answer.category || "Uncategorized";

      const current = grouped.get(category) ?? {
        total: 0,
        correct: 0,
        wrong: 0,
      };

      current.total += 1;

      if (answer.is_correct) {
        current.correct += 1;
      } else {
        current.wrong += 1;
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
  }, [resultAnswers]);

  const progressTrend = useMemo(() => {
    return [...results]
      .sort(
        (a, b) =>
          new Date(a.created_at).getTime() -
          new Date(b.created_at).getTime()
      )
      .slice(-8);
  }, [results]);

  const recentImprovement = useMemo(() => {
    if (progressTrend.length < 2) return null;

    const previous = Number(
      progressTrend[progressTrend.length - 2].percentage
    ) || 0;

    const latest = Number(
      progressTrend[progressTrend.length - 1].percentage
    ) || 0;

    return Math.round((latest - previous) * 10) / 10;
  }, [progressTrend]);

  const weakestCategory = categoryStats[0] ?? null;

  const testTitle = (testId: number) =>
    tests.find((test) => test.id === testId)?.title ??
    `Test #${testId}`;

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

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050816] text-white">
        <div className="text-center">
          <div className="text-5xl">⚡</div>
          <p className="mt-4 text-slate-400">
            Loading your NetQuest dashboard...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050816] px-4 py-6 text-white sm:px-8">
      <div className="mx-auto max-w-7xl">

        <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">
              NETQUEST
            </p>

            <h1 className="mt-2 text-3xl font-black sm:text-4xl">
              Student Dashboard
            </h1>

            <p className="mt-2 text-slate-400">
              Learn. Practice. Compete.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/history"
              className="rounded-xl border border-white/10 px-4 py-3 font-bold hover:bg-white/5"
            >
              My History
            </Link>

            <button
              onClick={handleLogout}
              disabled={signingOut}
              className="rounded-xl bg-red-500/10 px-4 py-3 font-bold text-red-300 hover:bg-red-500/20 disabled:opacity-50"
            >
              {signingOut ? "Logging out..." : "Logout"}
            </button>
          </div>
        </header>

        {error && (
          <section
            role="alert"
            className="mt-6 rounded-2xl border border-red-400/30 bg-red-950/30 p-5"
          >
            <h2 className="font-bold text-red-300">
              Something needs attention
            </h2>

            <p className="mt-2 break-words text-sm text-red-200">
              {error}
            </p>

            <button
              onClick={() => void loadDashboard()}
              className="mt-4 rounded-lg bg-white/10 px-4 py-2 font-bold hover:bg-white/20"
            >
              Try Again
            </button>
          </section>
        )}

        {student && (
          <>
            <section className="mt-8 rounded-3xl border border-cyan-400/20 bg-gradient-to-r from-cyan-400/10 to-blue-500/5 p-6 sm:p-8">
              <p className="text-sm font-bold text-cyan-400">
                WELCOME BACK 👋
              </p>

              <h2 className="mt-3 text-3xl font-black sm:text-4xl">
                {student.student_name}
              </h2>

              <p className="mt-3 text-slate-400">
                Your permanent Student ID
              </p>

              <p className="mt-1 text-xl font-black text-cyan-300">
                {student.student_id}
              </p>
            </section>

            {/* OVERALL PERFORMANCE */}

            <section className="mt-8">
              <SectionHeading
                title="Your Performance Overview"
                subtitle="Your learning progress based on submitted test attempts."
              />

              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
                <StatCard
                  label="Total Attempts"
                  value={String(results.length)}
                  icon="📝"
                />

                <StatCard
                  label="Best Score"
                  value={results.length ? `${bestPercentage}%` : "--"}
                  icon="🏆"
                />

                <StatCard
                  label="Average Score"
                  value={results.length ? `${averagePercentage}%` : "--"}
                  icon="📈"
                />

                <StatCard
                  label="Average Time"
                  value={
                    averageDuration !== null
                      ? formatDuration(averageDuration)
                      : "--"
                  }
                  icon="⏱️"
                />

                <StatCard
                  label="Available Tests"
                  value={String(tests.length)}
                  icon="🎯"
                />
              </div>
            </section>

            {/* PROGRESS TREND */}

            <section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <SectionHeading
                  title="Progress Trend"
                  subtitle="Your latest eight attempts, shown in chronological order."
                />

                {recentImprovement !== null && (
                  <span
                    className={`rounded-full px-3 py-2 text-sm font-bold ${
                      recentImprovement > 0
                        ? "bg-emerald-400/10 text-emerald-300"
                        : recentImprovement < 0
                          ? "bg-rose-400/10 text-rose-300"
                          : "bg-white/10 text-slate-300"
                    }`}
                  >
                    {recentImprovement > 0 ? "+" : ""}
                    {recentImprovement}% vs previous attempt
                  </span>
                )}
              </div>

              {progressTrend.length === 0 ? (
                <EmptyState message="Complete your first test to see your performance trend." />
              ) : (
                <>
                  <div className="mt-8 flex h-56 items-end gap-3 overflow-x-auto border-b border-white/10 pb-2">
                    {progressTrend.map((result, index) => {
                      const percentage = Math.min(
                        100,
                        Math.max(0, Number(result.percentage) || 0)
                      );

                      return (
                        <div
                          key={result.id}
                          className="flex h-full min-w-12 flex-1 flex-col items-center justify-end gap-2"
                        >
                          <span className="text-xs font-bold text-cyan-300">
                            {percentage}%
                          </span>

                          <div className="flex h-40 w-full items-end justify-center">
                            <div
                              title={`Attempt ${index + 1}: ${percentage}%`}
                              className="w-full max-w-12 rounded-t-lg bg-gradient-to-t from-blue-600 to-cyan-300 transition-all"
                              style={{
                                height: `${Math.max(percentage, 2)}%`,
                              }}
                            />
                          </div>

                          <span className="text-xs text-slate-500">
                            #{index + 1}
                          </span>
                        </div>
                      );
                    })}
                  </div>

                  <p className="mt-3 text-xs text-slate-500">
                    Oldest attempt on the left · Latest attempt on the right
                  </p>
                </>
              )}
            </section>

            {/* CATEGORY PERFORMANCE */}

            <section className="mt-10 rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <SectionHeading
                title="Category-wise Performance"
                subtitle="Identify your strong areas and topics that need more practice."
              />

              {categoryStats.length === 0 ? (
                <EmptyState message="Category analysis will appear after question-level answer records are available." />
              ) : (
                <div className="mt-6 grid gap-4 md:grid-cols-2">
                  {categoryStats.map((stat) => (
                    <article
                      key={stat.category}
                      className="rounded-2xl border border-white/10 bg-black/20 p-5"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <h3 className="font-black">
                          {stat.category}
                        </h3>

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

                      <p className="mt-2 text-xs text-slate-400">
                        {stat.correct} correct · {stat.wrong} incorrect · {stat.total} questions
                      </p>

                      <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
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
                    </article>
                  ))}
                </div>
              )}

              {weakestCategory && (
                <div className="mt-6 rounded-2xl border border-yellow-400/20 bg-yellow-400/5 p-5">
                  <p className="text-xs font-bold uppercase tracking-wider text-yellow-300">
                    Recommended Improvement Area
                  </p>

                  <h3 className="mt-2 text-xl font-black">
                    {weakestCategory.category}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-slate-300">
                    {weakestCategory.accuracy < 50
                      ? `Your accuracy is ${weakestCategory.accuracy}% in this category. Revise the fundamentals and practise more questions from this topic.`
                      : weakestCategory.accuracy < 75
                        ? `Your accuracy is ${weakestCategory.accuracy}%. A little more practice in this category can improve your overall performance.`
                        : `Your lowest category accuracy is ${weakestCategory.accuracy}%. Continue practising to maintain and improve your performance.`}
                  </p>
                </div>
              )}
            </section>

            {/* LEARNING ARENAS */}

            <section className="mt-10">
              <SectionHeading
                title="Your Learning Arenas"
                subtitle="Choose a practice area and improve your skills."
              />

              <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <ArenaCard
                  icon="🌐"
                  title="Networking"
                  description="CCNA, IP addressing, routing and switching."
                  href="/arena/networking"
                />

                <ArenaCard
                  icon="🕵️"
                  title="Network Detective"
                  description="Practice troubleshooting and diagnostics."
                  href="/arena/network-detective"
                />

                <ArenaCard
                  icon="💡"
                  title="Interview Arena"
                  description="Prepare for technical interviews and viva."
                  href="/arena/interview"
                />

                <ArenaCard
                  icon="🧠"
                  title="DSA Arena"
                  description="Practice data structures and algorithms."
                  href="/arena/dsa"
                />
              </div>
            </section>

            {/* ACTIVE CHALLENGES */}

            <section className="mt-10">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <SectionHeading
                  title="Active Challenges"
                  subtitle="Published assessments available to you."
                />

                <Link
                  href="/test"
                  className="font-bold text-cyan-300 hover:underline"
                >
                  All Tests →
                </Link>
              </div>

              {tests.length === 0 ? (
                <EmptyState message="No active tests are available right now." />
              ) : (
                <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {tests.map((test) => (
                    <article
                      key={test.id}
                      className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-cyan-400/30"
                    >
                      <p className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                        {test.category || "General"}
                      </p>

                      <h3 className="mt-3 text-xl font-black">
                        {test.title}
                      </h3>

                      <p className="mt-2 min-h-10 text-sm text-slate-400">
                        {test.description ||
                          "Test your knowledge with NetQuest."}
                      </p>

                      <div className="mt-5 grid grid-cols-3 gap-2">
                        <MiniStat
                          label="Questions"
                          value={String(test.question_count ?? 0)}
                        />

                        <MiniStat
                          label="Marks"
                          value={String(test.total_marks ?? 0)}
                        />

                        <MiniStat
                          label="Minutes"
                          value={String(test.duration_minutes ?? 0)}
                        />
                      </div>

                      <Link
                        href={`/test?testId=${test.id}`}
                        className="mt-5 block rounded-xl bg-cyan-400 px-4 py-3 text-center font-black text-slate-950 hover:bg-cyan-300"
                      >
                        START TEST →
                      </Link>
                    </article>
                  ))}
                </div>
              )}
            </section>

            {/* RECENT ATTEMPTS */}

            <section className="mt-10">
              <div className="flex flex-wrap items-end justify-between gap-3">
                <SectionHeading
                  title="Recent Attempts"
                  subtitle="Your latest submitted assessments."
                />

                <Link
                  href="/history"
                  className="font-bold text-cyan-300 hover:underline"
                >
                  Full History →
                </Link>
              </div>

              {results.length === 0 ? (
                <EmptyState message="You have not attempted a test yet. Choose an active challenge above to get started." />
              ) : (
                <div className="mt-5 overflow-x-auto rounded-2xl border border-white/10">
                  <table className="w-full min-w-[700px] text-left text-sm">
                    <thead className="bg-white/5 text-xs uppercase text-slate-400">
                      <tr>
                        <th className="px-5 py-4">Test</th>
                        <th className="px-5 py-4">Score</th>
                        <th className="px-5 py-4">Percentage</th>
                        <th className="px-5 py-4">Time Taken</th>
                        <th className="px-5 py-4">Date</th>
                        <th className="px-5 py-4">Result</th>
                      </tr>
                    </thead>

                    <tbody>
                      {results.slice(0, 10).map((result) => (
                        <tr
                          key={result.id}
                          className="border-t border-white/10"
                        >
                          <td className="px-5 py-4 font-bold">
                            {testTitle(result.test_id)}
                          </td>

                          <td className="px-5 py-4">
                            {result.score}/{result.total_marks}
                          </td>

                          <td className="px-5 py-4 font-black text-cyan-300">
                            {Number(result.percentage) || 0}%
                          </td>

                          <td className="px-5 py-4 text-slate-400">
                            {formatDuration(result.duration_seconds)}
                          </td>

                          <td className="px-5 py-4 text-slate-400">
                            {result.created_at
                              ? new Date(
                                  result.created_at
                                ).toLocaleDateString("en-IN", {
                                  day: "2-digit",
                                  month: "short",
                                  year: "numeric",
                                })
                              : "--"}
                          </td>

                          <td className="px-5 py-4">
                            <Link
                              href={`/results/${result.id}`}
                              className="font-bold text-cyan-300 hover:underline"
                            >
                              View →
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </section>

            {/* QUICK LINKS */}

            <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              <QuickLink
                icon="📜"
                title="Attempt History"
                description="Review your previous test attempts."
                href="/history"
              />

              <QuickLink
                icon="🏆"
                title="Leaderboard"
                description="Compare your performance with other students."
                href="/leaderboard"
              />

              <QuickLink
                icon="📚"
                title="Learning Resources"
                description="Explore available learning material."
                href="/learn"
              />
            </section>
          </>
        )}

        <footer className="mt-12 border-t border-white/10 py-6 text-center text-xs text-slate-500">
          NETQUEST • Learn • Practice • Compete
        </footer>
      </div>
    </main>
  );
}

function SectionHeading({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) {
  return (
    <div>
      <h2 className="text-2xl font-black">{title}</h2>
      <p className="mt-2 text-sm text-slate-400">{subtitle}</p>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
}: {
  label: string;
  value: string;
  icon: string;
}) {
  return (
    <article className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <div className="flex items-center justify-between gap-2">
        <span className="text-3xl">{icon}</span>
        <span className="break-words text-right text-2xl font-black text-cyan-300">
          {value}
        </span>
      </div>

      <p className="mt-4 text-sm font-bold text-slate-400">
        {label}
      </p>
    </article>
  );
}

function MiniStat({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-3 text-center">
      <p className="text-xs text-slate-500">{label}</p>
      <p className="mt-1 font-black">{value}</p>
    </div>
  );
}

function ArenaCard({
  icon,
  title,
  description,
  href,
}: {
  icon: string;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:-translate-y-1 hover:border-cyan-400/30"
    >
      <span className="text-3xl">{icon}</span>

      <h3 className="mt-4 text-lg font-black">{title}</h3>

      <p className="mt-2 text-sm leading-6 text-slate-400">
        {description}
      </p>

      <p className="mt-4 font-bold text-cyan-300">
        Explore →
      </p>
    </Link>
  );
}

function QuickLink({
  icon,
  title,
  description,
  href,
}: {
  icon: string;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 hover:border-cyan-400/30"
    >
      <span className="text-3xl">{icon}</span>

      <h3 className="mt-3 text-lg font-black">{title}</h3>

      <p className="mt-2 text-sm text-slate-400">
        {description}
      </p>
    </Link>
  );
}

function EmptyState({ message }: { message: string }) {
  return (
    <div className="mt-5 rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center text-slate-400">
      {message}
    </div>
  );
}
