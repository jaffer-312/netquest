"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "../../utils/supabase/client";

type Student = {
  id: number;
  student_id: string;
  student_name: string;
  created_at: string;
};

type Test = {
  id: number;
  title: string;
  category: string;
  question_count: number;
  total_marks: number;
  is_enabled: boolean;
};

type Question = {
  id: number;
  category: string;
  question?: string;
  difficulty?: string;
  created_at?: string;
};

type Result = {
  id: number;
  student_id: string | null;
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

type Summary = Student & {
  attempts: number;
  best: number;
  average: number;
  challenges: number;
  lastAttempt: string | null;
};


export default function AdminPage() {
  const supabase = createClient();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("Overview");
  const [students, setStudents] = useState<Student[]>([]);
  const [results, setResults] = useState<Result[]>([]);
  const [tests, setTests] = useState<Test[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [search, setSearch] = useState("");
  const [loadingStudents, setLoadingStudents] = useState(false);
  const [selected, setSelected] = useState<Summary | null>(null);
  const [overviewLoading, setOverviewLoading] = useState(true);
const [overviewError, setOverviewError] = useState("");
const [overviewStats, setOverviewStats] = useState([
  { label: "Total Questions", value: 0, icon: "📚" },
  { label: "Registered Students", value: 0, icon: "👨‍🎓" },
  { label: "Active Tests", value: 0, icon: "📝" },
  { label: "Test Attempts", value: 0, icon: "📊" },
]);

const [recentQuestions, setRecentQuestions] = useState<Question[]>([]);

  async function loadStudents() {
    setLoadingStudents(true);
    const [{ data: s, error: se }, { data: r, error: re }] = await Promise.all([
      supabase.from("students").select("id, student_id, student_name, created_at").order("created_at", { ascending: false }),
      supabase.from("results").select("id, student_id, student_name, test_id, score, total_marks, percentage, correct_answers, wrong_answers, answered_questions, created_at").order("created_at", { ascending: false }),
    ]);
    if (se) console.error("ADMIN STUDENTS LOAD ERROR:", se);
    if (re) console.error("ADMIN RESULTS LOAD ERROR:", re);
    setStudents(s || []);
    setResults(r || []);
    setLoadingStudents(false);
  }


  async function loadOverview() {
  setOverviewLoading(true);
  setOverviewError("");

  try {
    const [
      questionCountResult,
      studentCountResult,
      attemptCountResult,
      testsResult,
      latestQuestionsResult,
    ] = await Promise.all([
      supabase
        .from("questions")
        .select("id", { count: "exact", head: true }),

      supabase
        .from("students")
        .select("id", { count: "exact", head: true }),

      supabase
        .from("results")
        .select("id", { count: "exact", head: true }),

      supabase
        .from("tests")
        .select("id, is_enabled"),

      supabase
        .from("questions")
        .select("id, question, category, difficulty, created_at")
        .order("created_at", { ascending: false })
        .limit(5),
    ]);

    const errors = [
      questionCountResult.error,
      studentCountResult.error,
      attemptCountResult.error,
      testsResult.error,
      latestQuestionsResult.error,
    ].filter(Boolean);

    if (errors.length) {
      console.error("OVERVIEW LOAD ERRORS:", errors);
      setOverviewError("Unable to load some dashboard data. Please check Supabase permissions and table columns.");
    }

    const activeTests = (testsResult.data || []).filter(
      (test) => test.is_enabled
    ).length;

    setOverviewStats([
      {
        label: "Total Questions",
        value: questionCountResult.count ?? 0,
        icon: "📚",
      },
      {
        label: "Registered Students",
        value: studentCountResult.count ?? 0,
        icon: "👨‍🎓",
      },
      {
        label: "Active Tests",
        value: activeTests,
        icon: "📝",
      },
      {
        label: "Test Attempts",
        value: attemptCountResult.count ?? 0,
        icon: "📊",
      },
    ]);

    setRecentQuestions(latestQuestionsResult.data || []);
  } catch (error) {
    console.error("OVERVIEW LOAD ERROR:", error);
    setOverviewError("Something went wrong while loading the dashboard.");
  } finally {
    setOverviewLoading(false);
  }
}

  useEffect(() => {
    if (activeTab === "Students") loadStudents();
    if (activeTab === "Analytics") loadAnalytics();
  }, [activeTab]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tab = params.get("tab");

    if (tab === "Students" || tab === "Analytics") {
      setActiveTab(tab);
    }
  }, []);

  useEffect(() => {
  loadOverview();
}, []);

async function loadAnalytics() {
    const [{ data: s, error: se }, { data: r, error: re }, { data: t, error: te }, { data: q, error: qe }] = await Promise.all([
      supabase.from("students").select("id, student_id, student_name, created_at").order("created_at", { ascending: false }),
      supabase.from("results").select("id, student_id, student_name, test_id, score, total_marks, percentage, correct_answers, wrong_answers, answered_questions, created_at").order("created_at", { ascending: false }),
      supabase.from("tests").select("id, title, category, question_count, total_marks, is_enabled"),
      supabase.from("questions").select("id, category"),
    ]);
    if (se) console.error("ANALYTICS STUDENTS LOAD ERROR:", se);
    if (re) console.error("ANALYTICS RESULTS LOAD ERROR:", re);
    if (te) console.error("ANALYTICS TESTS LOAD ERROR:", te);
    if (qe) console.error("ANALYTICS QUESTIONS LOAD ERROR:", qe);
    setStudents(s || []);
    setResults(r || []);
    setTests(t || []);
    setQuestions(q || []);
  }

  const summaries = useMemo<Summary[]>(() => students.map((s) => {
    const rows = results.filter((r) => r.student_id === s.student_id);
    const percentages = rows.map((r) => Number(r.percentage) || 0);
    return {
      ...s,
      attempts: rows.length,
      best: percentages.length ? Math.max(...percentages) : 0,
      average: percentages.length ? Math.round(percentages.reduce((a, b) => a + b, 0) / percentages.length) : 0,
      challenges: new Set(rows.map((r) => r.test_id)).size,
      lastAttempt: rows[0]?.created_at || null,
    };
  }), [students, results]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return q ? summaries.filter((s) => s.student_id.toLowerCase().includes(q) || s.student_name.toLowerCase().includes(q)) : summaries;
  }, [summaries, search]);

  return (
    <main className="min-h-screen bg-[#050816] text-white">

      <div className="mx-auto max-w-7xl px-6 py-8">
        {activeTab === "Students" ? (
          <StudentsPanel
            students={filtered}
            total={students.length}
            search={search}
            setSearch={setSearch}
            loading={loadingStudents}
            selected={selected}
            setSelected={setSelected}
            results={results}
          />
        ) : activeTab === "Analytics" ? (
          <AnalyticsPanel students={students} results={results} tests={tests} questions={questions} />
        ) : (
          <>
            <div className="mb-8 rounded-3xl border border-cyan-400/20 bg-gradient-to-r from-cyan-400/10 to-blue-500/5 p-8">
              <p className="text-sm font-bold uppercase tracking-widest text-cyan-400">Welcome back 👋</p>
              <h2 className="mt-2 text-3xl font-black">Control the NetQuest experience.</h2>
              <p className="mt-3 max-w-2xl text-slate-400">Create questions, conduct tests, monitor students and analyse performance from one place.</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
  {overviewStats.map((s) => (
    <div
      key={s.label}
      className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-cyan-400/30"
    >
      <div className="text-3xl">{s.icon}</div>
      <p className="mt-5 text-sm text-slate-500">{s.label}</p>

      <p className="mt-1 text-3xl font-black text-cyan-400">
        {overviewLoading ? "..." : s.value.toLocaleString()}
      </p>
    </div>
  ))}
</div>

{overviewError && (
  <div className="mt-4 rounded-xl border border-rose-400/20 bg-rose-400/10 p-4 text-sm text-rose-300">
    {overviewError}
  </div>
)}
            <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
              <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
                <div className="mb-6 flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-widest text-slate-500">Question Bank</p><h3 className="mt-1 text-xl font-black">Recent Questions</h3></div><button onClick={() => router.push("/admin/questions")} className="rounded-xl bg-cyan-400 px-4 py-2 text-sm font-bold text-slate-950">+ Add Question</button></div>
                <div className="space-y-3">
  {overviewLoading ? (
    <Box text="⚡ Loading latest questions..." />
  ) : recentQuestions.length === 0 ? (
    <Box text="No questions found in the Question Bank." />
  ) : (
    recentQuestions.map((q) => (
      <div
        key={q.id}
        className="flex flex-col gap-4 rounded-2xl border border-white/5 bg-black/20 p-4 md:flex-row md:items-center md:justify-between"
      >
        <div>
          <p className="font-semibold">
            {q.question || `Question #${q.id}`}
          </p>

          <div className="mt-2 flex flex-wrap gap-2 text-xs">
            <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-cyan-400">
              {q.category || "Uncategorized"}
            </span>

            <span className="rounded-full bg-white/5 px-3 py-1 text-slate-400">
              {q.difficulty || "Not specified"}
            </span>
          </div>
        </div>

        <button
          onClick={() => router.push("/admin/questions")}
          className="rounded-lg border border-white/10 px-4 py-2 text-xs font-bold text-slate-400 hover:text-white"
        >
          View Question Bank
        </button>
      </div>
    ))
  )}
</div>
              </section>
              <aside className="rounded-3xl border border-white/10 bg-white/[0.03] p-6"><p className="text-xs font-bold uppercase tracking-widest text-slate-500">Quick Actions</p><h3 className="mt-1 text-xl font-black">Manage NetQuest</h3><div className="mt-6 space-y-3">
                <QuickAction icon="➕" title="Add Question" text="Create a new challenge" onClick={() => router.push("/admin/questions")} />
                <QuickAction icon="📝" title="Create Test" text="Build a student assessment" onClick={() => router.push("/admin/tests")} />
                <QuickAction icon="👨‍🎓" title="Students" text="View student performance" onClick={() => setActiveTab("Students")} />
                <QuickAction icon="📊" title="Analytics" text="Analyse test results" onClick={() => setActiveTab("Analytics")} />
              </div></aside>
            </div>
          </>
        )}
        <div className="mt-6 rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-center text-sm text-slate-500">Current section: <span className="font-bold text-cyan-400">{activeTab}</span></div>
      </div>
    </main>
  );
}

function AnalyticsPanel({ students, results, tests, questions }: { students: Student[]; results: Result[]; tests: Test[]; questions: Question[] }) {
  const totalAttempts = results.length;
  const averageScore = totalAttempts ? Math.round(results.reduce((sum, r) => sum + (Number(r.percentage) || 0), 0) / totalAttempts) : 0;
  const highestScore = totalAttempts ? Math.max(...results.map((r) => Number(r.percentage) || 0)) : 0;
  const totalCorrect = results.reduce((sum, r) => sum + (Number(r.correct_answers) || 0), 0);
  const totalWrong = results.reduce((sum, r) => sum + (Number(r.wrong_answers) || 0), 0);

  const studentPerformance = students.map((s) => {
    const rows = results.filter((r) => r.student_id === s.student_id);
    const percentages = rows.map((r) => Number(r.percentage) || 0);
    return { ...s, attempts: rows.length, best: percentages.length ? Math.max(...percentages) : 0, average: percentages.length ? Math.round(percentages.reduce((a, b) => a + b, 0) / percentages.length) : 0 };
  }).filter((s) => s.attempts > 0).sort((a, b) => b.best - a.best || b.average - a.average).slice(0, 5);

  const challengeStats = tests.map((t) => {
    const rows = results.filter((r) => r.test_id === t.id);
    const avg = rows.length ? Math.round(rows.reduce((sum, r) => sum + (Number(r.percentage) || 0), 0) / rows.length) : 0;
    return { ...t, attempts: rows.length, average: avg };
  }).filter((t) => t.attempts > 0).sort((a, b) => b.attempts - a.attempts);


  // Performance grouped by the challenge's configured category
  const categoryMap = new Map<
    string,
    { attempts: number; scoreTotal: number }
  >();

  results.forEach((r) => {
    const test = tests.find((t) => t.id === r.test_id);
    const category = test?.category?.trim() || "Uncategorized";

    const item = categoryMap.get(category) || {
      attempts: 0,
      scoreTotal: 0,
    };

    item.attempts += 1;
    item.scoreTotal += Number(r.percentage) || 0;
    categoryMap.set(category, item);
  });

  const categories = Array.from(categoryMap.entries())
    .map(([category, data]) => ({
      category,
      attempts: data.attempts,
      average: Math.round(data.scoreTotal / data.attempts),
    }))
    .sort((a, b) => b.attempts - a.attempts);

  // Actual question counts grouped by Question Bank category
  
  // Actual question counts grouped by Question Bank category
  const questionCategoryStats = Array.from(
    questions.reduce((map, question) => {
      const category = question.category?.trim() || "Uncategorized";
      map.set(category, (map.get(category) || 0) + 1);
      return map;
    }, new Map<string, number>())
  )
    .map(([category, count]) => ({ category, count }))
    .sort((a, b) => b.count - a.count);


  const today = new Date();

  const daily = Array.from({ length: 7 }, (_, index) => {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(today.getDate() - (6 - index));

    const nextDate = new Date(date);
    nextDate.setDate(nextDate.getDate() + 1);

    const count = results.filter((r) => {
      const createdAt = new Date(r.created_at);
      return createdAt >= date && createdAt < nextDate;
    }).length;

    return {
      label: date.toLocaleDateString(undefined, { weekday: "short" }),
      count,
    };
  });

  const maxDaily = Math.max(1, ...daily.map((d) => d.count));

  function exportAnalyticsCsv() {
    const rows: (string | number)[][] = [
      ["Report", "NetQuest Analytics"],
      ["Generated At", new Date().toLocaleString()],
      [],
      ["Student Name", "Student ID", "Attempts", "Average Score (%)", "Best Score (%)", "Challenges Attempted", "Last Attempt"],
      ...students.map((student) => {
        const attempts = results.filter((r) => r.student_id === student.student_id);
        const scores = attempts.map((r) => Number(r.percentage) || 0);
        return [student.student_name, student.student_id, attempts.length,
          scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0,
          scores.length ? Math.max(...scores) : 0,
          new Set(attempts.map((r) => r.test_id)).size,
          attempts[0]?.created_at ? new Date(attempts[0].created_at).toLocaleString() : ""];
      }),
      [],
      ["Challenge", "Category", "Attempts", "Average Score (%)"],
      ...challengeStats.map((t) => [t.title, t.category || "Uncategorized", t.attempts, t.average]),
      [],
      ["Question Category", "Question Count"],
      ...questionCategoryStats.map((item) => [item.category, item.count]),
      [],
      ["Recent Attempt Student", "Student ID", "Challenge", "Score (%)", "Correct", "Wrong", "Date"],
      ...results.slice(0, 100).map((r) => [r.student_name, r.student_id || "", tests.find((t) => t.id === r.test_id)?.title || `Challenge ${r.test_id}`, Number(r.percentage) || 0, Number(r.correct_answers) || 0, Number(r.wrong_answers) || 0, new Date(r.created_at).toLocaleString()]),
    ];
    const csv = rows.map((row) => row.map((cell) => `"${String(cell ?? "").replace(/"/g, '""')}"`).join(",")).join("\r\n");
    const blob = new Blob(["\uFEFF", csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `netquest-analytics-${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
  }



  return (
    <section>
      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div><p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">Performance Intelligence</p><h2 className="mt-2 text-3xl font-black">📊 Analytics Dashboard</h2><p className="mt-2 text-slate-500">Live insights calculated from students, challenges and submitted results.</p></div>
        <div className="flex flex-wrap gap-3">
          <button onClick={exportAnalyticsCsv} className="rounded-xl bg-cyan-400 px-4 py-3 text-sm font-black text-slate-950 hover:bg-cyan-300">⬇ Export Excel-compatible CSV</button>
          <button onClick={() => window.location.reload()} className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-slate-300 hover:bg-white/10 hover:text-white">↻ Refresh Data</button>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <AnalyticCard icon="👨‍🎓" label="Total Students" value={students.length.toLocaleString()} />
        <AnalyticCard icon="📝" label="Total Attempts" value={totalAttempts.toLocaleString()} />
        <AnalyticCard icon="🎯" label="Average Score" value={`${averageScore}%`} />
        <AnalyticCard icon="🏆" label="Highest Score" value={`${highestScore}%`} />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex items-center justify-between"><div><p className="text-xs font-bold uppercase tracking-widest text-slate-500">Activity</p><h3 className="mt-1 text-xl font-black">Attempts — Last 7 Days</h3></div><span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-bold text-cyan-400">Live</span></div>
          <div className="mt-8 flex h-48 items-end justify-between gap-3">
            {daily.map((d) => <div key={d.label} className="flex h-full flex-1 flex-col items-center justify-end gap-2"><span className="text-xs font-bold text-slate-400">{d.count}</span><div className="w-full max-w-10 rounded-t-xl bg-cyan-400/70 transition-all" style={{ height: `${Math.max(8, (d.count / maxDaily) * 130)}px` }} /><span className="text-xs text-slate-600">{d.label}</span></div>)}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Answer Quality</p><h3 className="mt-1 text-xl font-black">Correct vs Wrong</h3>
          <div className="mt-8 flex items-center gap-8">
            <div className="relative flex h-36 w-36 shrink-0 items-center justify-center rounded-full border-[18px] border-cyan-400/70"><div className="absolute inset-[-18px] rounded-full border-[18px] border-transparent border-r-rose-400/70 border-t-rose-400/70" /><div className="text-center"><p className="text-2xl font-black">{totalCorrect + totalWrong ? Math.round((totalCorrect / (totalCorrect + totalWrong)) * 100) : 0}%</p><p className="text-[10px] uppercase text-slate-500">Correct</p></div></div>
            <div className="space-y-4 text-sm"><Metric label="Correct Answers" value={totalCorrect} /><Metric label="Wrong Answers" value={totalWrong} /><Metric label="Questions Attempted" value={totalCorrect + totalWrong} /></div>
          </div>
        </section>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Top Performance</p><h3 className="mt-1 text-xl font-black">Top Students</h3>
          <div className="mt-5 space-y-3">{studentPerformance.length ? studentPerformance.map((s, i) => <div key={s.student_id} className="flex items-center gap-4 rounded-2xl border border-white/5 bg-black/20 p-4"><div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400/10 font-black text-cyan-400">{i + 1}</div><div className="min-w-0 flex-1"><p className="truncate font-bold">{s.student_name}</p><p className="text-xs text-slate-600">{s.student_id} · {s.attempts} attempt{s.attempts === 1 ? "" : "s"}</p></div><div className="text-right"><p className="font-black text-cyan-400">{s.best}%</p><p className="text-[10px] uppercase text-slate-600">Best</p></div></div>) : <Box text="No submitted attempts yet." />}</div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Challenge Usage</p><h3 className="mt-1 text-xl font-black">Most Attempted Challenges</h3>
          <div className="mt-5 space-y-4">{challengeStats.slice(0, 6).map((t) => <div key={t.id}><div className="mb-2 flex items-center justify-between gap-4"><p className="truncate text-sm font-bold">{t.title}</p><span className="shrink-0 text-xs font-black text-cyan-400">{t.attempts}</span></div><div className="h-2 overflow-hidden rounded-full bg-white/5"><div className="h-full rounded-full bg-cyan-400" style={{ width: `${Math.min(100, (t.attempts / Math.max(1, challengeStats[0]?.attempts || 1)) * 100)}%` }} /></div><p className="mt-1 text-[10px] text-slate-600">Average score: {t.average}% · {t.category || "Uncategorized"}</p></div>)}{!challengeStats.length && <Box text="No challenge attempts yet." />}</div>
        </section>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Challenge Analytics</p>
          <h3 className="mt-1 text-xl font-black">Performance by Challenge Category</h3>
          <div className="mt-5 space-y-4">
            {categories.length ? categories.map((c) => (
              <div key={c.category}>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="font-bold">{c.category}</span>
                  <span className="text-xs text-slate-500">
                    {c.attempts} attempt{c.attempts === 1 ? "" : "s"} · {c.average}% avg
                  </span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-white/5">
                  <div className="h-full rounded-full bg-cyan-400" style={{ width: `${Math.min(100, c.average)}%` }} />
                </div>
              </div>
            )) : <Box text="No challenge category data yet." />}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Question Bank</p>
          <h3 className="mt-1 text-xl font-black">Questions by Category</h3>
          <div className="mt-5 space-y-4">
            {questionCategoryStats.length ? questionCategoryStats.map((item) => (
              <div key={item.category}>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <span className="font-bold">{item.category}</span>
                  <span className="text-sm text-cyan-400">{item.count} questions</span>
                </div>
                <div className="h-3 overflow-hidden rounded-full bg-white/5">
                  <div
                    className="h-full rounded-full bg-cyan-400"
                    style={{ width: `${(item.count / Math.max(1, questions.length)) * 100}%` }}
                  />
                </div>
              </div>
            )) : <Box text="No questions found in the Question Bank." />}
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 lg:col-span-2">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Student Intelligence</p>
          <h3 className="mt-1 text-xl font-black">Detailed Student Performance</h3>
          <p className="mt-2 text-sm text-slate-500">Average and best scores are calculated from submitted challenge results.</p>
          <div className="mt-5 overflow-x-auto">
            <table className="w-full min-w-[700px] text-left text-sm">
              <thead><tr className="border-b border-white/10 text-xs uppercase tracking-wider text-slate-500"><th className="p-3">Student</th><th className="p-3">Student ID</th><th className="p-3">Attempts</th><th className="p-3">Average</th><th className="p-3">Best</th><th className="p-3">Challenges</th><th className="p-3">Last Attempt</th></tr></thead>
              <tbody>{students.map((student) => {
                const attempts = results.filter((r) => r.student_id === student.student_id);
                const scores = attempts.map((r) => Number(r.percentage) || 0);
                const average = scores.length ? Math.round(scores.reduce((a, b) => a + b, 0) / scores.length) : 0;
                const best = scores.length ? Math.max(...scores) : 0;
                return <tr key={student.student_id} className="border-b border-white/5"><td className="p-3 font-bold">{student.student_name}</td><td className="p-3 text-cyan-400">{student.student_id}</td><td className="p-3">{attempts.length}</td><td className="p-3">{average}%</td><td className="p-3 font-bold">{best}%</td><td className="p-3">{new Set(attempts.map((r) => r.test_id)).size}</td><td className="p-3 text-xs text-slate-500">{attempts[0]?.created_at ? new Date(attempts[0].created_at).toLocaleString() : "—"}</td></tr>;
              })}{!students.length && <tr><td colSpan={7} className="p-5 text-center text-slate-500">No students found.</td></tr>}</tbody>
            </table>
          </div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 lg:col-span-2">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Recent Activity</p>
          <h3 className="mt-1 text-xl font-black">Latest 10 Submitted Attempts</h3>
          <div className="mt-5 overflow-x-auto"><table className="w-full min-w-[650px] text-left text-sm">
            <thead><tr className="border-b border-white/10 text-xs uppercase tracking-wider text-slate-500"><th className="p-3">Student</th><th className="p-3">Challenge</th><th className="p-3">Score</th><th className="p-3">Correct / Wrong</th><th className="p-3">Submitted</th></tr></thead>
            <tbody>{results.slice(0, 10).map((r) => <tr key={r.id} className="border-b border-white/5"><td className="p-3"><span className="font-bold">{r.student_name}</span><span className="mt-1 block text-xs text-slate-600">{r.student_id || "No student ID"}</span></td><td className="p-3">{tests.find((t) => t.id === r.test_id)?.title || `Challenge ${r.test_id}`}</td><td className="p-3 font-black text-cyan-400">{Number(r.percentage) || 0}%</td><td className="p-3">{Number(r.correct_answers) || 0} / {Number(r.wrong_answers) || 0}</td><td className="p-3 text-xs text-slate-500">{new Date(r.created_at).toLocaleString()}</td></tr>)}{!results.length && <tr><td colSpan={5} className="p-5 text-center text-slate-500">No submitted attempts yet.</td></tr>}</tbody>
          </table></div>
        </section>

        <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 lg:col-span-2">
          <p className="text-xs font-bold uppercase tracking-widest text-slate-500">Platform Snapshot</p>
          <h3 className="mt-1 text-xl font-black">NetQuest Overview</h3>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <MetricCard label="Question Bank" value={questions.length} icon="📚" />
            <MetricCard label="Challenges" value={tests.length} icon="🧪" />
            <MetricCard label="Active Challenges" value={tests.filter((t) => t.is_enabled).length} icon="🟢" />
            <MetricCard label="Registered Students" value={students.length} icon="👥" />
          </div>
        </section>
      </div>
    </section>
  );
}

function AnalyticCard({ icon, label, value }: { icon: string; label: string; value: string }) { return <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-cyan-400/30"><div className="text-3xl">{icon}</div><p className="mt-5 text-sm text-slate-500">{label}</p><p className="mt-1 text-3xl font-black text-cyan-400">{value}</p></div>; }
function Metric({ label, value }: { label: string; value: number }) { return <div><p className="text-xs text-slate-600">{label}</p><p className="font-black">{value.toLocaleString()}</p></div>; }
function MetricCard({ label, value, icon }: { label: string; value: number; icon: string }) { return <div className="rounded-2xl border border-white/5 bg-black/20 p-4"><div className="flex items-center justify-between"><span className="text-xs text-slate-500">{label}</span><span>{icon}</span></div><p className="mt-2 text-2xl font-black text-cyan-400">{value.toLocaleString()}</p></div>; }

function StudentsPanel({ students, total, search, setSearch, loading, selected, setSelected, results }: { students: Summary[]; total: number; search: string; setSearch: (v: string) => void; loading: boolean; selected: Summary | null; setSelected: (s: Summary | null) => void; results: Result[] }) {
  return (
    <section>
      <div className="mb-8 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
        <div><p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">Student Management</p><h2 className="mt-2 text-3xl font-black">👨‍🎓 Students</h2><p className="mt-2 text-slate-500">Search students and inspect their NetQuest performance.</p></div>
        <div className="rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-5 py-3"><p className="text-xs uppercase tracking-wider text-slate-500">Total Students</p><p className="mt-1 text-2xl font-black text-cyan-400">{total}</p></div>
      </div>
      <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by Student ID or name..." className="mb-6 w-full rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 text-white outline-none placeholder:text-slate-600 focus:border-cyan-400/50" />
      {loading ? <Box text="⚡ Loading students..." /> : students.length === 0 ? <Box text="🔎 No students found" /> : <div className="space-y-4">
        {students.map((s) => <div key={s.student_id} className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-cyan-400/30">
          <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
            <div><div className="flex flex-wrap items-center gap-3"><h3 className="text-xl font-black">{s.student_name}</h3><span className="rounded-full bg-cyan-400/10 px-3 py-1 text-xs font-black text-cyan-400">{s.student_id}</span></div><p className="mt-2 text-xs text-slate-600">Registered {new Date(s.created_at).toLocaleDateString()}</p></div>
            <div className="grid grid-cols-2 gap-2 sm:grid-cols-4"><Mini label="Attempts" value={String(s.attempts)} /><Mini label="Best %" value={`${s.best}%`} /><Mini label="Average" value={`${s.average}%`} /><Mini label="Challenges" value={String(s.challenges)} /></div>
            <button onClick={() => setSelected(s)} className="rounded-xl bg-cyan-400 px-5 py-3 font-black text-slate-950">VIEW DETAILS 👁️</button>
          </div>
          <div className="mt-4 border-t border-white/5 pt-4 text-xs text-slate-500">Last attempt: <span className="font-bold text-slate-400">{s.lastAttempt ? new Date(s.lastAttempt).toLocaleString() : "No attempts yet"}</span></div>
        </div>)}
      </div>}
      {selected && <StudentModal student={selected} results={results.filter((r) => r.student_id === selected.student_id)} close={() => setSelected(null)} />}
    </section>
  );
}

function StudentModal({ student, results, close }: { student: Summary; results: Result[]; close: () => void }) {
  return <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 px-5 py-10 backdrop-blur-sm">
    <div className="mx-auto max-w-4xl rounded-3xl border border-cyan-400/20 bg-[#0b1024] p-7 shadow-2xl">
      <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.25em] text-cyan-400">Student Profile</p><h2 className="mt-2 text-3xl font-black">{student.student_name}</h2><p className="mt-2 font-bold text-cyan-400">{student.student_id}</p></div><button onClick={close} className="rounded-xl border border-white/10 px-4 py-2 font-bold text-slate-400 hover:text-white">CLOSE ✕</button></div>
      <div className="mt-7 grid gap-3 sm:grid-cols-2 lg:grid-cols-4"><Mini label="Attempts" value={String(student.attempts)} /><Mini label="Best %" value={`${student.best}%`} /><Mini label="Average" value={`${student.average}%`} /><Mini label="Challenges" value={String(student.challenges)} /></div>
      <p className="mt-8 text-xs font-bold uppercase tracking-widest text-slate-500">Attempt History</p>
      {results.length === 0 ? <Box text="No attempts recorded for this student." /> : <div className="mt-4 space-y-3">{results.map((r, i) => <div key={r.id} className="rounded-2xl border border-white/5 bg-black/20 p-5"><div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between"><div><p className="text-xs font-bold uppercase tracking-wider text-cyan-400">Attempt #{results.length - i}</p><p className="mt-1 font-black">Challenge ID: {r.test_id}</p><p className="mt-1 text-xs text-slate-600">{new Date(r.created_at).toLocaleString()}</p></div><div className="grid grid-cols-2 gap-2 sm:grid-cols-4"><Mini label="Score" value={`${r.score}/${r.total_marks}`} /><Mini label="Percentage" value={`${Number(r.percentage) || 0}%`} /><Mini label="Correct" value={String(r.correct_answers)} /><Mini label="Wrong" value={String(r.wrong_answers)} /></div></div></div>)}</div>}
    </div>
  </div>;
}

function Box({ text }: { text: string }) { return <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-12 text-center text-slate-400">{text}</div>; }
function Mini({ label, value }: { label: string; value: string }) { return <div className="rounded-xl border border-white/10 bg-black/20 px-3 py-2 text-center"><p className="text-[10px] uppercase tracking-wider text-slate-600">{label}</p><p className="mt-1 font-black">{value}</p></div>; }
function QuickAction({ icon, title, text, onClick }: { icon: string; title: string; text: string; onClick: () => void }) { return <button onClick={onClick} className="flex w-full items-center gap-4 rounded-2xl border border-white/5 bg-black/20 p-4 text-left transition hover:border-cyan-400/30 hover:bg-cyan-400/5"><span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-xl">{icon}</span><span><span className="block font-bold">{title}</span><span className="text-xs text-slate-500">{text}</span></span></button>; }
