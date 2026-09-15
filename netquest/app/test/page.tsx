"use client";

import { createClient } from "../../utils/supabase/client";
import { useEffect, useState } from "react";

type Test = {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  duration_minutes: number;
  question_count: number;
  total_marks: number;
  randomize: boolean;
  is_enabled: boolean;
};

type Question = {
  id: number;
  question: string;
  category: string;
  difficulty: string;
  marks: number;
};

export default function StudentTestPage() {
  const supabase = createClient();

  const [tests, setTests] = useState<Test[]>([]);
  const [selectedTest, setSelectedTest] = useState<Test | null>(null);

  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [answers, setAnswers] = useState<Record<number, string>>({});
  
  const [loading, setLoading] = useState(true);
  const [testStarted, setTestStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  
const [testCompleted, setTestCompleted] = useState(false);
const [finalScore, setFinalScore] = useState(0);
const [finalTotalMarks, setFinalTotalMarks] = useState(0);
const [finalPercentage, setFinalPercentage] = useState(0);
const [correctAnswers, setCorrectAnswers] = useState(0);
const [wrongAnswers, setWrongAnswers] = useState(0);
const [showAnalysis, setShowAnalysis] = useState(false);
const [studentName, setStudentName] = useState("");
const [showNameInput, setShowNameInput] = useState(false);
  useEffect(() => {
    loadTests();
  }, []);

  async function loadTests() {
    setLoading(true);

    const { data, error } = await supabase
      .from("tests")
      .select("*")
      .eq("is_enabled", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error(
        "SUPABASE TEST LOAD ERROR:",
        JSON.stringify(error, null, 2)
      );
      setLoading(false);
      return;
    }

    setTests(data || []);
    setLoading(false);
  }

  async function startTest(test: Test) {
    setSelectedTest(test);
    setLoading(true);

    const { data, error } = await supabase
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
      option_d,
      answer,
      explanation
    )
  
      `)
      .eq("test_id", test.id)
      .order("question_order", { ascending: true });

    if (error) {
      console.error(
        "SUPABASE QUESTION LOAD ERROR:",
        JSON.stringify(error, null, 2)
      );

      alert(`Unable to load questions: ${error.message}`);
      setLoading(false);
      return;
    }

    const loadedQuestions = (data || [])
      .map((item: any) => item.questions)
      .filter(Boolean);

    setQuestions(loadedQuestions);
    setCurrentQuestion(0);
    setAnswers({});
    setTimeLeft(test.duration_minutes * 60);
    setTestStarted(true);
    setLoading(false);
  }

  function selectAnswer(answer: string) {
    const question = questions[currentQuestion];

    if (!question) return;

    setAnswers((prev) => ({
      ...prev,
      [question.id]: answer,
    }));
  }

  function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1);
    }
  }

  function previousQuestion() {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1);
    }
  }
useEffect(() => {
  if (!testStarted || testCompleted || timeLeft <= 0) {
    return;
  }

  const timer = setInterval(() => {
    setTimeLeft((prev) => prev - 1);
  }, 1000);

  return () => clearInterval(timer);
}, [testStarted, testCompleted, timeLeft]);

useEffect(() => {
  if (testStarted && !testCompleted && timeLeft === 0) {
    submitTest();
  }
}, [timeLeft, testStarted, testCompleted]);
function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
    .toString()
    .padStart(2, "0")}`;
}

async function submitTest() {
  let score = 0;
  let totalMarks = 0;
  let correct = 0;

  questions.forEach((question) => {
    totalMarks += question.marks || 0;

    if (answers[question.id] === question.answer) {
      score += question.marks || 0;
      correct++;
    }
  });

  const answered = Object.keys(answers).length;
  const wrong = answered - correct;

  const percentage =
    totalMarks > 0
      ? Math.round((score / totalMarks) * 100)
      : 0;

  // Save result to Supabase
  const { error } = await supabase
    .from("results")
    .insert({
      test_id: selectedTest?.id,
      student_name: studentName.trim(),
      score: score,
      total_marks: totalMarks,
      percentage: percentage,
      correct_answers: correct,
      wrong_answers: wrong,
      answered_questions: answered,
    });

  if (error) {
    console.error(
      "SUPABASE RESULT SAVE ERROR:",
      JSON.stringify(error, null, 2)
    );

    alert(`Result save failed: ${error.message}`);
    return;
  }

  setFinalScore(score);
  setFinalTotalMarks(totalMarks);
  setFinalPercentage(percentage);
  setCorrectAnswers(correct);
  setWrongAnswers(wrong);
  setTestCompleted(true);
}
if (testCompleted && selectedTest) {
  return (
    <main className="min-h-screen bg-[#050816] px-5 py-10 text-white">
      <div className="mx-auto max-w-3xl">

        <div className="text-center">

          <div className="text-6xl">
            {finalPercentage >= 80 ? "🏆" : "🎯"}
          </div>

          <p className="mt-5 text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">
            Test Completed
          </p>

          <h1 className="mt-3 text-4xl font-black">
            {selectedTest.title}
          </h1>

          <div className="mt-10 rounded-3xl border border-cyan-400/20 bg-white/[0.03] p-10">

            <p className="text-sm text-slate-500">
              YOUR SCORE
            </p>

            <div className="mt-3 text-7xl font-black text-cyan-400">
              {finalPercentage}%
            </div>

            <p className="mt-3 text-xl font-bold">
              {finalScore} / {finalTotalMarks}
            </p>

            <p className="mt-4 text-slate-400">
              {finalPercentage >= 80
                ? "Excellent performance! 🔥"
                : finalPercentage >= 50
                ? "Good effort! Keep improving. 💪"
                : "Keep practicing. You can do better! 🚀"}
            </p>

          </div>

          <div className="mt-6 grid grid-cols-3 gap-4">

            <ResultCard
              label="Answered"
              value={Object.keys(answers).length.toString()}
            />

            <ResultCard
              label="Correct"
              value={correctAnswers.toString()}
            />

            <ResultCard
              label="Wrong"
              value={wrongAnswers.toString()}
            />

          </div>
          <button
  onClick={() => setShowAnalysis(true)}
  className="mt-8 w-full rounded-xl border border-cyan-400/30 px-8 py-4 font-black text-cyan-400 hover:bg-cyan-400/10"
>
  VIEW ANALYSIS 📊
</button>
{showAnalysis && (
  <div className="mt-8 text-left">
    <h2 className="mb-5 text-2xl font-black">
      📊 Question-wise Analysis
    </h2>

    <div className="space-y-4">
      {questions.map((question, index) => {
        const selectedAnswer = answers[question.id];

        const isCorrect =
          selectedAnswer === question.answer;

        const options = {
          A: question.option_a,
          B: question.option_b,
          C: question.option_c,
          D: question.option_d,
        };

        return (
          <div
            key={question.id}
            className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"
          >
            <div className="flex items-start justify-between gap-4">
              <h3 className="font-bold leading-7">
                Q{index + 1}. {question.question}
              </h3>

              <span className="text-2xl">
                {isCorrect ? "✅" : "❌"}
              </span>
            </div>

            <p className="mt-4 text-sm">
              <span className="text-slate-500">
                Your answer:
              </span>{" "}
              {selectedAnswer
                ? `${selectedAnswer}. ${
                    options[
                      selectedAnswer as keyof typeof options
                    ]
                  }`
                : "Not answered"}
            </p>

            <p className="mt-2 text-sm">
              <span className="text-slate-500">
                Correct answer:
              </span>{" "}
              {question.answer}.{" "}
              {
                options[
                  question.answer as keyof typeof options
                ]
              }
            </p>

            {question.explanation && (
              <div className="mt-4 rounded-xl bg-black/20 p-4">
                <p className="text-xs font-bold uppercase text-cyan-400">
                  Explanation
                </p>

                <p className="mt-2 text-sm text-slate-400">
                  {question.explanation}
                </p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  </div>
)}

          <button
            onClick={() => window.location.reload()}
            className="mt-8 rounded-xl bg-cyan-400 px-8 py-4 font-black text-slate-950"
          >
            BACK TO TESTS
          </button>

        </div>

      </div>
    </main>
  );
}

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050816] text-white">
        <div className="text-center">
          <div className="text-4xl">⚡</div>
          <p className="mt-3 text-slate-400">
            Loading...
          </p>
        </div>
      </main>
    );
  }
if (testCompleted && selectedTest) {
  return (
    <main className="min-h-screen bg-[#050816] px-5 py-10 text-white">
      <div className="mx-auto max-w-3xl">

        <div className="text-center">

          <div className="text-6xl">
            {finalPercentage >= 80 ? "🏆" : "🎯"}
          </div>

          <p className="mt-5 text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">
            Test Completed
          </p>

          <h1 className="mt-3 text-4xl font-black">
            {selectedTest.title}
          </h1>

          <div className="mt-10 rounded-3xl border border-cyan-400/20 bg-white/[0.03] p-10">

            <p className="text-sm text-slate-500">
              YOUR SCORE
            </p>

            <div className="mt-3 text-7xl font-black text-cyan-400">
              {finalPercentage}%
            </div>

            <p className="mt-3 text-xl font-bold">
              {finalScore} / {finalTotalMarks}
            </p>

            <p className="mt-4 text-slate-400">
              {finalPercentage >= 80
                ? "Excellent performance! 🔥"
                : finalPercentage >= 50
                ? "Good effort! Keep improving. 💪"
                : "Keep practicing. You can do better! 🚀"}
            </p>

          </div>

          <div className="mt-6 grid grid-cols-3 gap-4">

            <ResultCard
              label="Answered"
              value={Object.keys(answers).length.toString()}
            />

            <ResultCard
              label="Correct"
              value={correctAnswers.toString()}
            />

            <ResultCard
              label="Wrong"
              value={wrongAnswers.toString()}
            />

          </div>
          {showAnalysis && (
  <div className="mt-8 text-left">

    <h2 className="mb-5 text-2xl font-black">
      📊 Question-wise Analysis
    </h2>

    <div className="space-y-4">
      {questions.map((question, index) => {
        const selectedAnswer = answers[question.id];
        const isCorrect =
          selectedAnswer === question.answer;

        const options = {
          A: question.option_a,
          B: question.option_b,
          C: question.option_c,
          D: question.option_d,
        };

        return (
          <div
            key={question.id}
            className={`rounded-2xl border p-6 ${
              isCorrect
                ? "border-green-400/30 bg-green-400/5"
                : "border-red-400/30 bg-red-400/5"
            }`}
          >

            <div className="flex items-start justify-between gap-4">

              <h3 className="font-bold leading-7">
                Q{index + 1}. {question.question}
              </h3>

              <span className="text-2xl">
                {isCorrect ? "✅" : "❌"}
              </span>

            </div>

            <div className="mt-5 space-y-2 text-sm">

              <p>
                <span className="text-slate-500">
                  Your answer:
                </span>{" "}
                <strong>
                  {selectedAnswer
                    ? `${selectedAnswer}. ${
                        options[
                          selectedAnswer as keyof typeof options
                        ]
                      }`
                    : "Not answered"}
                </strong>
              </p>

              <p>
                <span className="text-slate-500">
                  Correct answer:
                </span>{" "}
                <strong>
                  {question.answer}.{" "}
                  {
                    options[
                      question.answer as keyof typeof options
                    ]
                  }
                </strong>
              </p>

            </div>

            {question.explanation && (
              <div className="mt-5 rounded-xl bg-black/20 p-4">
                <p className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                  Explanation
                </p>

                <p className="mt-2 text-sm leading-6 text-slate-400">
                  {question.explanation}
                </p>
              </div>
            )}

          </div>
        );
      })}
    </div>

  </div>
)}

          <button
            onClick={() => window.location.reload()}
            className="mt-8 rounded-xl bg-cyan-400 px-8 py-4 font-black text-slate-950"
          >
            BACK TO TESTS
          </button>

        </div>

      </div>
    </main>
  );
}
  /* ---------- TEST SCREEN ---------- */

  if (testStarted && selectedTest) {
    const question = questions[currentQuestion];

    if (!question) {
      return (
        <main className="flex min-h-screen items-center justify-center bg-[#050816] text-white">
          No questions found for this test.
        </main>
      );
    }

    const selectedAnswer = answers[question.id];

    return (
      <main className="min-h-screen bg-[#050816] px-5 py-8 text-white">
        <div className="mx-auto max-w-4xl">

          {/* Header */}
          <div className="mb-8 flex items-center justify-between gap-4">

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">
                NetQuest
              </p>

              <h1 className="mt-2 text-2xl font-black">
                {selectedTest.title}
              </h1>
            </div>

            <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-5 py-3 text-center">
              <p className="text-xs text-slate-500">
                QUESTION
              </p>

              <p className="font-black text-cyan-400">
                {currentQuestion + 1} / {questions.length}
              </p>
            </div>

          </div>

          {/* Progress */}
          <div className="mb-8 h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full bg-cyan-400 transition-all"
              style={{
                width: `${
                  ((currentQuestion + 1) / questions.length) * 100
                }%`,
              }}
            />
          </div>

          {/* Question Card */}
          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-7">

            <div className="flex flex-wrap gap-2">
              <Badge text={question.category} />
              <Badge text={question.difficulty} />
              <Badge text={`${question.marks} mark`} />
            </div>
            <div className="mt-6 flex justify-end">
  <div className="rounded-2xl border border-red-400/20 bg-red-400/10 px-5 py-3 text-center">
    <p className="text-xs text-slate-500">
      TIME LEFT
    </p>

    <p className="font-black text-red-400">
      ⏱️ {formatTime(timeLeft)}
    </p>
  </div>
</div>
<div className="mt-7 text-sm font-bold text-gray-500">
  Question {currentQuestion + 1} / {questions.length}
</div>

            <h2 className="mt-7 text-2xl font-black leading-relaxed">
              {question.question}
            </h2>

            {/* Temporary options */}
            <div className="mt-8 grid gap-4">
  {[
    { key: "A", text: question.option_a },
    { key: "B", text: question.option_b },
    { key: "C", text: question.option_c },
    { key: "D", text: question.option_d },
  ].map((option) => (
    <button
      key={option.key}
      onClick={() => selectAnswer(option.key)}
      className={`rounded-2xl border p-5 text-left transition ${
        selectedAnswer === option.key
          ? "border-cyan-400 bg-cyan-400/10"
          : "border-white/10 bg-black/20 hover:border-cyan-400/30"
      }`}
    >
      <span className="mr-4 inline-flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 font-black">
        {option.key}
      </span>

      {option.text}
    </button>
  ))}
</div>     
            

          </section>

          {/* Navigation */}
          <div className="mt-6 flex items-center justify-between">

            <button
              onClick={previousQuestion}
              disabled={currentQuestion === 0}
              className="rounded-xl border border-white/10 px-6 py-3 font-bold disabled:opacity-30"
            >
              ← Previous
            </button>

            {currentQuestion === questions.length - 1 ? (
              <button
                onClick={submitTest}
                className="rounded-xl bg-cyan-400 px-7 py-3 font-black text-slate-950"
              >
                SUBMIT TEST 🚀
              </button>
            ) : (
              <button
                onClick={nextQuestion}
                className="rounded-xl bg-cyan-400 px-7 py-3 font-black text-slate-950"
              >
                NEXT →
              </button>
            )}

          </div>

        </div>
      </main>
    );
  }

  /* ---------- TEST LIST ---------- */
  if (showNameInput && selectedTest) {
  return (
    <main className="min-h-screen bg-[#050816] px-5 py-10 text-white">
      <div className="mx-auto flex min-h-[80vh] max-w-xl items-center justify-center">

        <div className="w-full rounded-3xl border border-white/10 bg-white/[0.03] p-8">

          <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">
            NetQuest
          </p>

          <h1 className="mt-3 text-3xl font-black">
            Enter Your Name
          </h1>

          <p className="mt-2 text-slate-400">
            Enter your name before starting the test.
          </p>

          <input
            type="text"
            value={studentName}
            onChange={(e) => setStudentName(e.target.value)}
            placeholder="Your name"
            className="mt-7 w-full rounded-xl border border-white/10 bg-black/20 px-5 py-4 text-white outline-none placeholder:text-slate-600 focus:border-cyan-400"
          />

          <button
            onClick={() => {
              if (!studentName.trim()) {
                alert("Please enter your name.");
                return;
              }

              setShowNameInput(false);
              startTest(selectedTest);
            }}
            className="mt-5 w-full rounded-xl bg-cyan-400 py-4 font-black text-slate-950"
          >
            START TEST 🚀
          </button>

        </div>
      </div>
    </main>
  );
}

  return (
    <main className="min-h-screen bg-[#050816] px-5 py-10 text-white">
      <div className="mx-auto max-w-6xl">

        <div className="mb-10">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">
            NetQuest
          </p>

          <h1 className="mt-2 text-4xl font-black">
            Available Tests
          </h1>

          <p className="mt-2 text-slate-400">
            Choose a test and challenge yourself.
          </p>
        </div>

        {tests.length === 0 ? (
          <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-12 text-center">
            <div className="text-5xl">📭</div>

            <h2 className="mt-4 text-xl font-black">
              No active tests
            </h2>

            <p className="mt-2 text-slate-500">
              There are no published tests available right now.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {tests.map((test) => (
              <section
                key={test.id}
                className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-cyan-400/30"
              >

                <div className="flex items-center justify-between">
                  <Badge text={test.category} />

                  <span className="text-xs text-slate-500">
                    {test.difficulty}
                  </span>
                </div>

                <h2 className="mt-5 text-2xl font-black">
                  {test.title}
                </h2>

                <p className="mt-3 min-h-12 text-sm leading-6 text-slate-500">
                  {test.description || "Test your knowledge with NetQuest."}
                </p>

                <div className="mt-6 grid grid-cols-3 gap-2">

                  <Stat
                    label="Questions"
                    value={test.question_count.toString()}
                  />

                  <Stat
                    label="Marks"
                    value={test.total_marks.toString()}
                  />

                  <Stat
                    label="Time"
                    value={`${test.duration_minutes}m`}
                  />

                </div>

                <button
                  onClick={() => {
                        setSelectedTest(test);
                        setShowNameInput(true);
                    }}
                  className="mt-6 w-full rounded-xl bg-cyan-400 py-3 font-black text-slate-950 transition hover:scale-[1.02]"
                >
                  START TEST 🚀
                </button>

              </section>
            ))}

          </div>
        )}

      </div>
    </main>
  );
}

function Badge({ text }: { text: string }) {
  return (
    <span className="rounded-full bg-white/5 px-3 py-1 text-xs font-bold text-slate-400">
      {text}
    </span>
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
    <div className="rounded-xl border border-white/10 bg-black/20 p-3 text-center">
      <p className="text-xs text-slate-600">
        {label}
      </p>

      <p className="mt-1 font-black">
        {value}
      </p>
    </div>
  );
}
function ResultCard({
  label,
  value,
}: {
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
      <p className="text-xs text-slate-500">
        {label}
      </p>

      <p className="mt-2 text-2xl font-black">
        {value}
      </p>
    </div>
  );
}