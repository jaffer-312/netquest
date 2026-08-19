"use client";

import { useEffect, useState } from "react";

const questions = [
  {
    question: "Which device primarily operates at Layer 2 of the OSI model?",
    options: ["Router", "Switch", "Hub", "Modem"],
    answer: "Switch",
    explanation:
      "A switch primarily operates at Layer 2 and forwards frames using MAC addresses.",
  },
  {
    question: "Which protocol is used to automatically assign IP addresses?",
    options: ["DNS", "HTTP", "DHCP", "FTP"],
    answer: "DHCP",
    explanation:
      "DHCP automatically provides clients with IP address configuration.",
  },
  {
    question: "Which address is used to identify a device at Layer 2?",
    options: ["IP Address", "MAC Address", "Port Number", "Subnet Mask"],
    answer: "MAC Address",
    explanation:
      "MAC addresses identify network interfaces at the Data Link Layer.",
  },
  {
    question: "Which protocol translates domain names into IP addresses?",
    options: ["DHCP", "DNS", "ARP", "ICMP"],
    answer: "DNS",
    explanation:
      "DNS resolves human-readable domain names into IP addresses.",
  },
  {
    question: "Which protocol is connection-oriented?",
    options: ["UDP", "IP", "TCP", "ARP"],
    answer: "TCP",
    explanation:
      "TCP establishes a connection and provides reliable, ordered delivery.",
  },
];

export default function QuizPage() {
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [score, setScore] = useState(0);
  const [xp, setXp] = useState(0);
  const [time, setTime] = useState(30);
  const [finished, setFinished] = useState(false);

  const question = questions[current];

  useEffect(() => {
    if (selected || finished) return;

    if (time === 0) {
      handleAnswer("");
      return;
    }

    const timer = setInterval(() => {
      setTime((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [time, selected, finished]);

  function handleAnswer(option: string) {
    if (selected) return;

    setSelected(option);

    if (option === question.answer) {
      setScore((prev) => prev + 1);
      setXp((prev) => prev + 100);
    }
  }

  function nextQuestion() {
    if (current === questions.length - 1) {
      setFinished(true);
      return;
    }

    setCurrent((prev) => prev + 1);
    setSelected(null);
    setTime(30);
  }

  function restartQuiz() {
    setCurrent(0);
    setSelected(null);
    setScore(0);
    setXp(0);
    setTime(30);
    setFinished(false);
  }

  if (finished) {
    const percentage = Math.round((score / questions.length) * 100);

    return (
      <main className="min-h-screen bg-[#050816] px-6 py-12 text-white">
        <div className="mx-auto flex min-h-[80vh] max-w-3xl items-center justify-center">
          <div className="w-full rounded-3xl border border-white/10 bg-white/[0.04] p-10 text-center shadow-2xl">
            <div className="mb-5 text-7xl">🏆</div>

            <p className="text-sm font-bold uppercase tracking-[0.3em] text-cyan-400">
              Challenge Complete
            </p>

            <h1 className="mt-4 text-5xl font-black">
              {percentage >= 80
                ? "NETWORKING WARRIOR!"
                : "KEEP PRACTICING!"}
            </h1>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              <ResultCard label="Score" value={`${score}/${questions.length}`} />
              <ResultCard label="Percentage" value={`${percentage}%`} />
              <ResultCard label="XP Earned" value={`+${xp}`} />
            </div>

            <button
              onClick={restartQuiz}
              className="mt-10 rounded-xl bg-cyan-400 px-8 py-4 font-bold text-slate-950 transition hover:scale-105"
            >
              🔄 Play Again
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050816] px-5 py-8 text-white">
      <div className="mx-auto max-w-4xl">

        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm font-bold uppercase tracking-widest text-cyan-400">
              NetQuest Arena
            </p>

            <h1 className="mt-1 text-2xl font-black">
              Networking Challenge
            </h1>
          </div>

          <div className="rounded-xl border border-white/10 bg-white/5 px-5 py-3">
            <span className="text-sm text-slate-400">XP</span>
            <span className="ml-2 font-bold text-cyan-400">
              {xp}
            </span>
          </div>
        </div>

        {/* Progress */}
        <div className="mb-6">
          <div className="mb-2 flex justify-between text-sm text-slate-400">
            <span>
              Question {current + 1} of {questions.length}
            </span>

            <span>{Math.round(((current + 1) / questions.length) * 100)}%</span>
          </div>

          <div className="h-2 overflow-hidden rounded-full bg-white/10">
            <div
              className="h-full rounded-full bg-cyan-400 transition-all duration-500"
              style={{
                width: `${((current + 1) / questions.length) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Timer */}
        <div className="mb-6 flex justify-end">
          <div
            className={`rounded-full border px-5 py-2 font-bold ${
              time <= 10
                ? "border-red-400/40 bg-red-400/10 text-red-400"
                : "border-cyan-400/20 bg-cyan-400/10 text-cyan-400"
            }`}
          >
            ⏱ {time}s
          </div>
        </div>

        {/* Question */}
        <div className="rounded-3xl border border-white/10 bg-white/[0.04] p-7 shadow-2xl md:p-10">
          <div className="mb-8">
            <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-cyan-400">
              Networking
            </span>

            <h2 className="mt-6 text-2xl font-bold leading-relaxed md:text-3xl">
              {question.question}
            </h2>
          </div>

          {/* Options */}
          <div className="grid gap-4">
            {question.options.map((option, index) => {
              const isCorrect =
                selected !== null && option === question.answer;

              const isWrong =
                selected === option && option !== question.answer;

              let style =
                "border-white/10 bg-white/[0.03] hover:border-cyan-400/50 hover:bg-cyan-400/5";

              if (isCorrect) {
                style =
                  "border-green-400 bg-green-400/10 text-green-300";
              }

              if (isWrong) {
                style =
                  "border-red-400 bg-red-400/10 text-red-300 animate-pulse";
              }

              return (
                <button
                  key={option}
                  onClick={() => handleAnswer(option)}
                  disabled={selected !== null}
                  className={`group flex items-center gap-4 rounded-2xl border p-5 text-left transition duration-300 ${style}`}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white/10 font-bold">
                    {String.fromCharCode(65 + index)}
                  </span>

                  <span className="font-medium">{option}</span>

                  {isCorrect && (
                    <span className="ml-auto text-xl">✓</span>
                  )}

                  {isWrong && (
                    <span className="ml-auto text-xl">✕</span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation */}
          {selected && (
            <div
              className={`mt-7 rounded-2xl border p-5 ${
                selected === question.answer
                  ? "border-green-400/20 bg-green-400/5"
                  : "border-red-400/20 bg-red-400/5"
              }`}
            >
              <p className="font-bold">
                {selected === question.answer
                  ? "🎯 Correct Answer!"
                  : "💡 Not quite!"}
              </p>

              <p className="mt-2 text-sm leading-6 text-slate-400">
                {question.explanation}
              </p>
            </div>
          )}

          {/* Next */}
          {selected && (
            <button
              onClick={nextQuestion}
              className="mt-7 w-full rounded-xl bg-cyan-400 py-4 font-bold text-slate-950 transition hover:scale-[1.01]"
            >
              {current === questions.length - 1
                ? "🏆 See My Result"
                : "Next Question →"}
            </button>
          )}
        </div>

        {/* Score */}
        <div className="mt-5 text-center text-sm text-slate-500">
          Current Score:{" "}
          <span className="font-bold text-white">
            {score}
          </span>
        </div>
      </div>
    </main>
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
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-3xl font-black text-cyan-400">
        {value}
      </p>
    </div>
  );
}