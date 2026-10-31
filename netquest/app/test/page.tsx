
"use client";

import {
  Suspense,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { createClient } from "../../utils/supabase/client";

type Test = {
  id: number;
  title: string;
  description: string | null;
  category: string | null;
  difficulty: string | null;
  duration_minutes: number;
  question_count: number;
  total_marks: number;
  is_enabled: boolean;
};

type Question = {
  id: number;
  question: string;
  category: string | null;
  difficulty: string | null;
  marks: number;
  option_a: string;
  option_b: string;
  option_c: string;
  option_d: string;
};

type SubmissionResult = {
  resultId: number;
  score: number;
  totalMarks: number;
  percentage: number;
  correct: number;
  wrong: number;
  answered: number;
  warning?: string;
};

export default function TestPage() {
  return (
    <Suspense
      fallback={
        <main className="flex min-h-screen items-center justify-center bg-[#050816] text-white">
          Loading NetQuest...
        </main>
      }
    >
      <TestPageContent />
    </Suspense>
  );
}

function TestPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const requestedTestId = searchParams.get("testId");

  const submitLock = useRef(false);
  const startedAtRef = useRef<number | null>(null);

  const [tests, setTests] = useState<Test[]>([]);
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [started, setStarted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<SubmissionResult | null>(null);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  useEffect(() => {
    let cancelled = false;

    async function load() {
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
          .select("student_id")
          .eq("auth_user_id", user.id)
          .maybeSingle();

        if (profileError) throw profileError;

        if (!profile) {
          setError(
            "Student profile not found. Please contact the administrator."
          );
          return;
        }

        const { data, error: testError } = await supabase
          .from("tests")
          .select(
            "id, title, description, category, difficulty, duration_minutes, question_count, total_marks, is_enabled"
          )
          .eq("is_enabled", true)
          .order("created_at", { ascending: false });

        if (testError) throw testError;

        if (!cancelled) {
          setTests((data || []) as Test[]);
        }
      } catch (err) {
        if (!cancelled) {
          setError(
            err instanceof Error ? err.message : "Unable to load tests."
          );
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    void load();

    return () => {
      cancelled = true;
    };
  }, [router]);

  const startTest = useCallback(async (test: Test) => {
    const supabase = createClient();

    setLoading(true);
    setError("");
    setNotice("");

    try {
      const { data, error: questionError } = await supabase
        .from("test_questions")
        .select(`
          question_order,
          questions (
            id,
            question,
            category,
            difficulty,
            marks,
            option_a,
            option_b,
            option_c,
            option_d
          )
        `)
        .eq("test_id", test.id)
        .order("question_order", { ascending: true });

      if (questionError) throw questionError;

      const loaded = (data || [])
        .map((row: any) => row.questions)
        .filter(Boolean) as Question[];

      if (loaded.length === 0) {
        throw new Error("This test does not have any linked questions.");
      }

      setSelectedTest(test);
      setQuestions(loaded);
      setAnswers({});
      setCurrentIndex(0);
      setTimeLeft(Math.max(1, Number(test.duration_minutes) || 1) * 60);
      setResult(null);

      submitLock.current = false;
      startedAtRef.current = Date.now();

      setStarted(true);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to load questions."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!requestedTestId || tests.length === 0 || selectedTest) return;

    const test = tests.find(
      (item) => item.id === Number(requestedTestId)
    );

    if (test) {
      void startTest(test);
    } else {
      setError("This test is not available or has not been published.");
    }
  }, [requestedTestId, tests, selectedTest, startTest]);

  const submitTest = useCallback(async () => {
    if (!selectedTest || submitLock.current) return;

    const durationSeconds =
      startedAtRef.current === null
        ? null
        : Math.max(
            0,
            Math.floor((Date.now() - startedAtRef.current) / 1000)
          );

    submitLock.current = true;
    setSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/tests/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          testId: selectedTest.id,
          answers,
          durationSeconds,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Test submission failed.");
      }

      if (data.warning) {
        setNotice(data.warning);
      }

      router.push(`/results/${data.resultId}`);
    } catch (err) {
      submitLock.current = false;

      setError(
        err instanceof Error
          ? err.message
          : "Could not submit your test. Please try again."
      );
    } finally {
      setSubmitting(false);
    }
  }, [selectedTest, answers, router]);

  useEffect(() => {
    if (!started || submitting || result) return;

    const timer = window.setInterval(() => {
      setTimeLeft((previous) => Math.max(0, previous - 1));
    }, 1000);

    return () => window.clearInterval(timer);
  }, [started, submitting, result]);

  useEffect(() => {
    if (started && timeLeft === 0 && !submitting && !result) {
      void submitTest();
    }
  }, [started, timeLeft, submitting, result, submitTest]);

  function formatTime(seconds: number) {
    const minutes = Math.floor(seconds / 60);
    const remaining = seconds % 60;

    return `${String(minutes).padStart(2, "0")}:${String(
      remaining
    ).padStart(2, "0")}`;
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050816] text-white">
        <p className="text-slate-400">Loading test...</p>
      </main>
    );
  }

  const current = questions[currentIndex];

  return (
    <main className="min-h-screen bg-[#050816] px-4 py-8 text-white sm:px-8">
      <div className="mx-auto max-w-5xl">
        <header className="mb-8 flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-5">
          <Link href="/dashboard" className="font-black text-cyan-300">
            ← NETQUEST
          </Link>

          <Link
            href="/history"
            className="text-sm text-slate-400 hover:text-white"
          >
            My History
          </Link>
        </header>

        {error && (
          <div
            role="alert"
            className="mb-6 rounded-xl border border-red-400/30 bg-red-950/30 p-4 text-red-200"
          >
            {error}

            {!started && !result && (
              <button
                onClick={() => {
                  setError("");
                  router.refresh();
                }}
                className="ml-3 font-bold underline"
              >
                Refresh
              </button>
            )}
          </div>
        )}

        {notice && (
          <div
            role="status"
            className="mb-6 rounded-xl border border-yellow-400/30 bg-yellow-950/20 p-4 text-yellow-200"
          >
            {notice}
          </div>
        )}

        {result && selectedTest ? (
          <section className="rounded-3xl border border-cyan-400/20 bg-white/[0.03] p-6 text-center sm:p-10">
            <div className="text-6xl">
              {result.percentage >= 80 ? "🏆" : "🎯"}
            </div>

            <p className="mt-5 text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">
              Test Completed
            </p>

            <h1 className="mt-3 text-3xl font-black">
              {selectedTest.title}
            </h1>

            <p className="mt-8 text-6xl font-black text-cyan-300">
              {result.percentage}%
            </p>

            <p className="mt-2 text-xl font-bold">
              {result.score} / {result.totalMarks} marks
            </p>

            <div className="mt-8 grid grid-cols-3 gap-3">
              <Summary label="Answered" value={result.answered} />
              <Summary label="Correct" value={result.correct} />
              <Summary label="Wrong" value={result.wrong} />
            </div>

            <p className="mt-5 text-xs text-slate-500">
              Result reference: {result.resultId}
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <Link
                href="/history"
                className="rounded-xl border border-white/10 px-5 py-3 font-bold hover:bg-white/5"
              >
                View History
              </Link>

              <Link
                href="/dashboard"
                className="rounded-xl bg-cyan-400 px-5 py-3 font-black text-slate-950 hover:bg-cyan-300"
              >
                Dashboard
              </Link>
            </div>
          </section>
        ) : !started ? (
          <section>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">
              Student Assessment
            </p>

            <h1 className="mt-2 text-3xl font-black">
              Available Tests
            </h1>

            <p className="mt-2 text-slate-400">
              Select a published assessment to begin.
            </p>

            {tests.length === 0 ? (
              <div className="mt-6 rounded-2xl border border-white/10 p-8 text-center text-slate-400">
                No published tests are available.
              </div>
            ) : (
              <div className="mt-6 grid gap-4 md:grid-cols-2">
                {tests.map((test) => (
                  <article
                    key={test.id}
                    className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
                  >
                    <p className="text-xs font-bold uppercase text-cyan-400">
                      {test.category || "General"}
                    </p>

                    <h2 className="mt-3 text-xl font-black">
                      {test.title}
                    </h2>

                    <p className="mt-2 text-sm text-slate-400">
                      {test.description ||
                        "Test your knowledge with NetQuest."}
                    </p>

                    <div className="mt-5 flex flex-wrap gap-4 text-sm text-slate-400">
                      <span>{test.question_count} questions</span>
                      <span>{test.total_marks} marks</span>
                      <span>{test.duration_minutes} minutes</span>
                    </div>

                    <button
                      onClick={() => void startTest(test)}
                      className="mt-6 w-full rounded-xl bg-cyan-400 px-4 py-3 font-black text-slate-950 hover:bg-cyan-300"
                    >
                      Start Test →
                    </button>
                  </article>
                ))}
              </div>
            )}
          </section>
        ) : selectedTest && current ? (
          <section>
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
                  {selectedTest.category || "Assessment"}
                </p>

                <h1 className="mt-2 text-2xl font-black sm:text-3xl">
                  {selectedTest.title}
                </h1>

                <p className="mt-2 text-sm text-slate-400">
                  Question {currentIndex + 1} of {questions.length}
                </p>
              </div>

              <div
                className={`rounded-xl border px-5 py-3 text-xl font-black tabular-nums ${
                  timeLeft <= 60
                    ? "border-red-400/40 text-red-300"
                    : "border-cyan-400/30 text-cyan-300"
                }`}
              >
                ⏱ {formatTime(timeLeft)}
              </div>
            </div>

            <div className="mt-5 h-2 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full bg-cyan-400 transition-all"
                style={{
                  width: `${
                    ((currentIndex + 1) / questions.length) * 100
                  }%`,
                }}
              />
            </div>

            <article className="mt-6 rounded-3xl border border-white/10 bg-white/[0.03] p-6 sm:p-8">
              <div className="flex items-start justify-between gap-4">
                <h2 className="text-lg font-bold leading-8 sm:text-xl">
                  Q{currentIndex + 1}. {current.question}
                </h2>

                <span className="shrink-0 rounded-lg bg-cyan-400/10 px-3 py-2 text-sm font-bold text-cyan-300">
                  {current.marks || 0} marks
                </span>
              </div>

              <div className="mt-7 space-y-3">
                {(
                  [
                    ["A", current.option_a],
                    ["B", current.option_b],
                    ["C", current.option_c],
                    ["D", current.option_d],
                  ] as [string, string][]
                ).map(([letter, option]) => (
                  <button
                    key={letter}
                    onClick={() =>
                      setAnswers((previous) => ({
                        ...previous,
                        [current.id]: letter,
                      }))
                    }
                    className={`flex w-full items-start gap-4 rounded-xl border p-4 text-left transition ${
                      answers[current.id] === letter
                        ? "border-cyan-400 bg-cyan-400/10"
                        : "border-white/10 bg-black/20 hover:border-white/30"
                    }`}
                  >
                    <span
                      className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg font-black ${
                        answers[current.id] === letter
                          ? "bg-cyan-400 text-slate-950"
                          : "bg-white/10"
                      }`}
                    >
                      {letter}
                    </span>

                    <span className="pt-1">{option || "—"}</span>
                  </button>
                ))}
              </div>
            </article>

            <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
              <button
                disabled={currentIndex === 0 || submitting}
                onClick={() =>
                  setCurrentIndex((i) => Math.max(0, i - 1))
                }
                className="rounded-xl border border-white/10 px-5 py-3 font-bold disabled:opacity-30"
              >
                ← Previous
              </button>

              <p className="text-sm text-slate-400">
                Answered {Object.keys(answers).length} / {questions.length}
              </p>

              {currentIndex < questions.length - 1 ? (
                <button
                  disabled={submitting}
                  onClick={() =>
                    setCurrentIndex((i) =>
                      Math.min(questions.length - 1, i + 1)
                    )
                  }
                  className="rounded-xl bg-cyan-400 px-5 py-3 font-black text-slate-950 disabled:opacity-50"
                >
                  Next →
                </button>
              ) : (
                <button
                  disabled={submitting}
                  onClick={() => {
                    if (
                      window.confirm(
                        "Submit your test now? You cannot change answers after submission."
                      )
                    ) {
                      void submitTest();
                    }
                  }}
                  className="rounded-xl bg-emerald-400 px-5 py-3 font-black text-slate-950 disabled:opacity-50"
                >
                  {submitting ? "Submitting..." : "Submit Test"}
                </button>
              )}
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {questions.map((question, index) => (
                <button
                  key={question.id}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to question ${index + 1}`}
                  className={`h-10 w-10 rounded-lg border text-sm font-bold ${
                    currentIndex === index
                      ? "border-cyan-400 bg-cyan-400 text-slate-950"
                      : answers[question.id]
                        ? "border-emerald-400/40 bg-emerald-400/10 text-emerald-300"
                        : "border-white/10 bg-white/5 text-slate-400"
                  }`}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          </section>
        ) : null}
      </div>
    </main>
  );
}

function Summary({
  label,
  value,
}: {
  label: string;
  value: number;
}) {
  return (
    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
      <p className="text-xs text-slate-400">{label}</p>
      <p className="mt-2 text-2xl font-black">{value}</p>
    </div>
  );
}
