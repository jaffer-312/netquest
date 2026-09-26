"use client";

import { useEffect, useState } from "react";
import { createClient } from "../../utils/supabase/client";

type Test = {
  id: number;
  title: string;
  description: string;
  category: string;
  difficulty: string;
  duration_minutes: number;
  question_count: number;
  total_marks: number;
  is_enabled: boolean;
};

export default function DashboardPage() {
  const supabase = createClient();

  const [tests, setTests] = useState<Test[]>([]);
  const [allTests, setAllTests] = useState<Test[]>([]);
  const [loading, setLoading] = useState(true);
  const [studentName, setStudentName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [results, setResults] = useState<any[]>([]);
  const [leaderboardRank, setLeaderboardRank] = useState("--");
  const [showIdentityGate, setShowIdentityGate] = useState(false);
  const [identityName, setIdentityName] = useState("");


useEffect(() => {
  const savedName = localStorage.getItem("netquest_student_name");
  const savedStudentId = localStorage.getItem("netquest_student_id");

  if (savedName) {
    setStudentName(savedName);
  }

  if (savedStudentId) {
    setStudentId(savedStudentId);
    loadStudentResults(savedStudentId);
  } else {
    setShowIdentityGate(true);
  }

  loadTests();
}, []);

async function loadStudentResults(studentIdValue: string) {
  const { data, error } = await supabase
    .from("results")
    .select("*")
    .eq("student_id", studentIdValue)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("DASHBOARD RESULTS LOAD ERROR:", error);
    return;
  }

  setResults(data || []);

  const { data: allResults, error: allResultsError } = await supabase
    .from("results")
    .select("student_id, percentage");

  if (allResultsError) {
    console.error("LEADERBOARD DATA LOAD ERROR:", allResultsError);
    return;
  }

  const studentBestScores: Record<string, number> = {};

  (allResults || []).forEach((result) => {
    if (!result.student_id) return;

    const percentage = Number(result.percentage) || 0;

    if (
      studentBestScores[result.student_id] === undefined ||
      percentage > studentBestScores[result.student_id]
    ) {
      studentBestScores[result.student_id] = percentage;
    }
  });

  const rankedStudents = Object.entries(studentBestScores).sort(
    (a, b) => b[1] - a[1]
  );

  const rank =
    rankedStudents.findIndex(
      ([studentId]) => studentId === studentIdValue
    ) + 1;

  setLeaderboardRank(rank > 0 ? `#${rank}` : "--");
}

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
      .insert({
        student_name: cleanName,
      })
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

  await loadStudentResults(finalStudentId);
}

async function loadTests() {
    setLoading(true);

    const { data, error } = await supabase
      .from("tests")
      .select("*")
      .eq("is_enabled", true)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("DASHBOARD TEST LOAD ERROR:", error);
      setLoading(false);
      return;
    }

    setTests(data || []);

    // Keep all challenge titles available for performance/history,
    // including challenges that may no longer be active.
    const { data: allTestData, error: allTestError } = await supabase
      .from("tests")
      .select("*")
      .order("created_at", { ascending: false });

    if (allTestError) {
      console.error("DASHBOARD ALL TESTS LOAD ERROR:", allTestError);
    } else {
      setAllTests(allTestData || []);
    }

    setLoading(false);
  }

  return (
    <>
      {showIdentityGate && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 px-5 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl border border-cyan-400/20 bg-[#0b1024] p-8 shadow-2xl">
            <div className="text-center">
              <div className="text-5xl">🎮</div>

              <p className="mt-5 text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">
                NETQUEST
              </p>

              <h2 className="mt-3 text-3xl font-black">
                Welcome to NetQuest
              </h2>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                Enter your name to continue. Your existing Student ID will be
                loaded automatically, or a new one will be created.
              </p>

              <input
                value={identityName}
                onChange={(e) => setIdentityName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    continueAsStudent();
                  }
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

        {/* HEADER */}
        <header className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">
              NETQUEST
            </p>

 <h1 className="mt-3 text-4xl font-black md:text-5xl">
  Welcome{studentName ? `, ${studentName}` : ""} 👋
</h1>

{studentId && (
  <p className="mt-2 text-lg font-bold text-cyan-400">
    Student ID: {studentId}
  </p>
)}

<p className="mt-2 text-2xl font-black text-white">
  Your Networking Arena 🎮
</p>

            <p className="mt-3 text-slate-400">
              Choose a challenge. Test your skills. Climb the leaderboard.
            </p>
          </div>

          <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-5 py-3">
            <p className="text-xs uppercase tracking-wider text-slate-500">
              Status
            </p>
            <p className="mt-1 font-black text-cyan-400">
              🟢 LIVE
            </p>
          </div>
        </header>

        {/* STATS */}
<section className="mb-12 grid gap-5 sm:grid-cols-3">

  {/* ACTIVE CHALLENGES */}
  <div className="group relative overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/[0.12] to-white/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40">
    <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-cyan-400/10 blur-2xl" />

    <div className="relative">
      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-400/10 text-2xl">
          🎯
        </div>

        <span className="text-4xl font-black text-cyan-400">
          {loading ? "..." : tests.length}
        </span>
      </div>

      <p className="mt-5 text-sm font-bold uppercase tracking-wider text-slate-500">
        Active Challenges
      </p>

      <p className="mt-1 text-xs text-slate-600">
        Challenges available to you
      </p>
    </div>
  </div>

  {/* LEADERBOARD RANK */}
  <div className="group relative overflow-hidden rounded-3xl border border-yellow-400/20 bg-gradient-to-br from-yellow-400/[0.10] to-white/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-yellow-400/40">
    <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-yellow-400/10 blur-2xl" />

    <div className="relative">
      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-yellow-400/10 text-2xl">
          🏆
        </div>

        <span className="text-4xl font-black text-yellow-400">
          {leaderboardRank}
        </span>
      </div>

      <p className="mt-5 text-sm font-bold uppercase tracking-wider text-slate-500">
        Leaderboard Rank
      </p>

      <p className="mt-1 text-xs text-slate-600">
        Your current position
      </p>
    </div>
  </div>

  {/* BEST SCORE */}
  <div className="group relative overflow-hidden rounded-3xl border border-purple-400/20 bg-gradient-to-br from-purple-400/[0.10] to-white/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-purple-400/40">
    <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-purple-400/10 blur-2xl" />

    <div className="relative">
      <div className="flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-400/10 text-2xl">
          ⭐
        </div>

        <span className="text-4xl font-black text-purple-400">
          {results.length > 0
            ? `${Math.max(
                ...results.map((r) => Number(r.percentage) || 0)
              )}%`
            : "--"}
        </span>
      </div>

      <p className="mt-5 text-sm font-bold uppercase tracking-wider text-slate-500">
        My Best Score
      </p>

      <p className="mt-1 text-xs text-slate-600">
        Highest percentage achieved
      </p>
    </div>
  </div>

</section>
       

        {/* MY PROFILE */}
        <section className="mt-12">
          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
              Student Profile
            </p>
            <h2 className="mt-2 text-3xl font-black">
              👤 My NetQuest Profile
            </h2>
            <p className="mt-2 text-slate-500">
              Your Student ID and overall challenge performance.
            </p>
          </div>

          <div className="grid gap-5 lg:grid-cols-[1.15fr_1fr]">
            <div className="rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/[0.10] to-white/[0.03] p-7">
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-slate-500">
                    Student
                  </p>
                  <h3 className="mt-2 text-3xl font-black">
                    {studentName || "NetQuest Student"}
                  </h3>
                  <p className="mt-2 font-bold text-cyan-400">
                    {studentId || "Student ID pending"}
                  </p>
                </div>
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-cyan-400/10 text-4xl">
                  🎓
                </div>
              </div>

              <div className="mt-7 grid grid-cols-2 gap-3">
                <MiniStat label="Attempts" value={results.length.toString()} />
                <MiniStat
                  label="Challenges"
                  value={new Set(results.map((r) => r.test_id)).size.toString()}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <ProfileMetric
                icon="🏆"
                label="Best %"
                value={
                  results.length > 0
                    ? `${Math.max(...results.map((r) => Number(r.percentage) || 0))}%`
                    : "--"
                }
              />
              <ProfileMetric
                icon="📈"
                label="Average %"
                value={
                  results.length > 0
                    ? `${Math.round(
                        results.reduce(
                          (sum, r) => sum + (Number(r.percentage) || 0),
                          0
                        ) / results.length
                      )}%`
                    : "--"
                }
              />
              <ProfileMetric
                icon="🎯"
                label="Correct"
                value={
                  results.length > 0
                    ? results
                        .reduce(
                          (sum, r) => sum + (Number(r.correct_answers) || 0),
                          0
                        )
                        .toString()
                    : "0"
                }
              />
              <ProfileMetric
                icon="🥇"
                label="Rank"
                value={leaderboardRank}
              />
            </div>
          </div>
        </section>

        {/* ACTIVE CHALLENGES */}
        <section>
          <div className="mb-5 flex items-end justify-between">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
                Challenge Zone
              </p>

              <h2 className="mt-2 text-3xl font-black">
                🔥 Active Challenges
              </h2>
            </div>

            <span className="text-sm text-slate-500">
              {tests.length} available
            </span>
          </div>

          {loading ? (
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-12 text-center">
              <div className="text-4xl">⚡</div>
              <p className="mt-3 text-slate-400">
                Loading challenges...
              </p>
            </div>
          ) : tests.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-12 text-center">
              <div className="text-5xl">📭</div>

              <h3 className="mt-4 text-xl font-black">
                No active challenges
              </h3>

              <p className="mt-2 text-slate-500">
                New challenges will appear here when they are activated.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {tests.map((test) => (
                <ChallengeCard key={test.id} test={test} />
              ))}
            </div>
          )}
        </section>

                {/* MY PERFORMANCE */}
        <section className="mt-12">
          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
              Performance
            </p>

            <h2 className="mt-2 text-3xl font-black">
              📊 My Challenge Performance
            </h2>

            <p className="mt-2 text-slate-500">
              Track your attempts, best scores and average performance.
            </p>
          </div>

          {results.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center">
              <div className="text-4xl">🎮</div>

              <p className="mt-3 text-slate-400">
                You have not attempted any challenge yet.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {tests.map((test) => {
                const challengeResults = results.filter(
                  (result) => result.test_id === test.id
                );

                if (challengeResults.length === 0) {
                  return null;
                }

                const attempts = challengeResults.length;

                const bestPercentage = Math.max(
                  ...challengeResults.map(
                    (result) => Number(result.percentage) || 0
                  )
                );

                const averagePercentage =
                  challengeResults.reduce(
                    (sum, result) =>
                      sum + (Number(result.percentage) || 0),
                    0
                  ) / attempts;

                const bestScore = Math.max(
                  ...challengeResults.map(
                    (result) => Number(result.score) || 0
                  )
                );

                const totalMarks =
                  challengeResults[0]?.total_marks || test.total_marks;

                return (
                  <div
                    key={test.id}
                    className="rounded-3xl border border-white/10 bg-white/[0.03] p-6"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="text-xs font-bold uppercase tracking-wider text-cyan-400">
                          Challenge
                        </p>

                        <h3 className="mt-2 text-xl font-black">
                          {test.title}
                        </h3>
                      </div>

                      <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-400">
                        {test.difficulty}
                      </span>
                    </div>

                    <div className="mt-6 grid grid-cols-2 gap-3">
                      <MiniStat
                        label="Attempts"
                        value={attempts.toString()}
                      />

                      <MiniStat
                        label="Best Score"
                        value={`${bestScore}/${totalMarks}`}
                      />

                      <MiniStat
                        label="Best %"
                        value={`${bestPercentage}%`}
                      />

                      <MiniStat
                        label="Average"
                        value={`${Math.round(averagePercentage)}%`}
                      />

                      <MiniStat
                        label="Rank"
                          value="--"
/>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* RECENT ATTEMPTS */}
        <section className="mt-12">
          <div className="mb-5">
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">
              Activity
            </p>
            <h2 className="mt-2 text-3xl font-black">
              🕘 Recent Attempts
            </h2>
            <p className="mt-2 text-slate-500">
              Your latest challenge submissions.
            </p>
          </div>

          {results.length === 0 ? (
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 text-center">
              <div className="text-4xl">📭</div>
              <p className="mt-3 text-slate-400">
                No attempts yet. Start a challenge to build your history.
              </p>
            </div>
          ) : (
            <div className="overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]">
              <div className="hidden grid-cols-[1.6fr_0.8fr_0.8fr_0.8fr_1.2fr] gap-4 border-b border-white/10 px-6 py-4 text-xs font-bold uppercase tracking-wider text-slate-500 md:grid">
                <span>Challenge</span>
                <span>Score</span>
                <span>Percentage</span>
                <span>Result</span>
                <span>Date</span>
              </div>

              <div className="divide-y divide-white/10">
                {results.slice(0, 8).map((result) => {
                  const test = allTests.find((item) => item.id === result.test_id);
                  const percentage = Number(result.percentage) || 0;

                  return (
                    <div
                      key={result.id}
                      className="grid gap-3 px-6 py-5 transition hover:bg-white/[0.03] md:grid-cols-[1.6fr_0.8fr_0.8fr_0.8fr_1.2fr] md:items-center md:gap-4"
                    >
                      <div>
                        <p className="font-black">
                          {test?.title || `Challenge #${result.test_id}`}
                        </p>
                        <p className="mt-1 text-xs text-slate-600">
                          Attempt #{result.id}
                        </p>
                      </div>

                      <div className="text-sm font-bold">
                        {result.score}/{result.total_marks}
                      </div>

                      <div className="font-black text-cyan-400">
                        {percentage}%
                      </div>

                      <div>
                        <span
                          className={`rounded-full px-3 py-1 text-xs font-bold ${
                            percentage >= 80
                              ? "bg-green-400/10 text-green-400"
                              : percentage >= 50
                                ? "bg-yellow-400/10 text-yellow-400"
                                : "bg-red-400/10 text-red-400"
                          }`}
                        >
                          {percentage >= 80
                            ? "Excellent"
                            : percentage >= 50
                              ? "Keep Going"
                              : "Practice More"}
                        </span>
                      </div>

                      <div className="text-sm text-slate-500">
                        {result.created_at
                          ? new Date(result.created_at).toLocaleString("en-IN", {
                              day: "2-digit",
                              month: "short",
                              year: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "--"}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </section>

        {/* QUICK ACCESS */}
        <section className="mt-12 grid gap-5 md:grid-cols-2">

          <a
            href="/leaderboard"
            className="group rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition hover:-translate-y-1 hover:border-cyan-400/30"
          >
            <div className="text-4xl">🏆</div>

            <h3 className="mt-4 text-2xl font-black">
              Leaderboard
            </h3>

            <p className="mt-2 text-slate-500">
              Check scores and see where you stand.
            </p>

            <div className="mt-5 font-bold text-cyan-400 transition group-hover:translate-x-1">
              VIEW LEADERBOARD →
            </div>
          </a>

          <a
            href="/test"
            className="group rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition hover:-translate-y-1 hover:border-cyan-400/30"
          >
            <div className="text-4xl">🎮</div>

            <h3 className="mt-4 text-2xl font-black">
              All Challenges
            </h3>

            <p className="mt-2 text-slate-500">
              Browse available tests and start your next challenge.
            </p>

            <div className="mt-5 font-bold text-cyan-400 transition group-hover:translate-x-1">
              START CHALLENGE →
            </div>
          </a>

        </section>

        {/* FOOTER */}
        <footer className="mt-16 border-t border-white/10 pt-6 text-center text-xs text-slate-600">
          NETQUEST • Learn • Practice • Compete 🚀
        </footer>

      </div>
    </main>
    </>
  );
}

function ChallengeCard({ test }: { test: Test }) {
  return (
    <section className="group rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-2 hover:border-cyan-400/40 hover:bg-cyan-400/[0.03]">

      <div className="flex items-center justify-between gap-3">
        <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-400">
          {test.category}
        </span>

        <span className="text-xs font-bold text-slate-500">
          {test.difficulty}
        </span>
      </div>

      <h3 className="mt-5 min-h-14 text-2xl font-black">
        {test.title}
      </h3>

      <p className="mt-3 min-h-12 text-sm leading-6 text-slate-500">
        {test.description || "Test your knowledge with NetQuest."}
      </p>

      <div className="mt-6 grid grid-cols-3 gap-2">
        <MiniStat
          label="Questions"
          value={test.question_count.toString()}
        />

        <MiniStat
          label="Marks"
          value={test.total_marks.toString()}
        />

        <MiniStat
          label="Time"
          value={`${test.duration_minutes}m`}
        />
      </div>

      <a
         href={`/test?testId=${test.id}`}
        className="mt-6 block w-full rounded-xl bg-cyan-400 py-3 text-center font-black text-slate-950 transition hover:scale-[1.02]"
      >
        START TEST 🚀
      </a>
    </section>
  );
}

function DashboardStat({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
      <div className="flex items-center justify-between">
        <span className="text-3xl">{icon}</span>

        <span className="text-3xl font-black text-cyan-400">
          {value}
        </span>
      </div>

      <p className="mt-4 text-sm font-bold text-slate-500">
        {label}
      </p>
    </div>
  );
}

function ProfileMetric({
  icon,
  label,
  value,
}: {
  icon: string;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5 transition hover:-translate-y-1 hover:border-cyan-400/20">
      <div className="flex items-center justify-between">
        <span className="text-2xl">{icon}</span>
        <span className="text-2xl font-black text-cyan-400">{value}</span>
      </div>
      <p className="mt-4 text-xs font-bold uppercase tracking-wider text-slate-500">
        {label}
      </p>
    </div>
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
      <p className="text-xs text-slate-600">
        {label}
      </p>

      <p className="mt-1 font-black">
        {value}
      </p>
    </div>
  );
}