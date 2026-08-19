"use client";

import { useState } from "react";

const stats = [
  { label: "Total Questions", value: "125", icon: "📚" },
  { label: "Networking", value: "78", icon: "🌐" },
  { label: "Interview", value: "32", icon: "🎯" },
  { label: "DSA", value: "15", icon: "🧠" },
];

const recentQuestions = [
  {
    question: "Which device primarily operates at Layer 2?",
    category: "Networking",
    difficulty: "Easy",
  },
  {
    question: "What is the difference between TCP and UDP?",
    category: "Interview",
    difficulty: "Medium",
  },
  {
    question: "What is the time complexity of binary search?",
    category: "DSA",
    difficulty: "Easy",
  },
  {
    question: "Explain OSPF neighbor formation.",
    category: "Interview",
    difficulty: "Hard",
  },
];

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState("Overview");

  return (
    <main className="min-h-screen bg-[#050816] text-white">
      {/* Header */}
      <header className="border-b border-white/10 bg-white/[0.02]">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-cyan-400">
              NetQuest
            </p>

            <h1 className="mt-1 text-2xl font-black">
              Admin Control Center
            </h1>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-bold">Administrator</p>
              <p className="text-xs text-slate-500">Full Access</p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-cyan-400 font-black text-slate-950">
              A
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-6 py-8">
        {/* Navigation */}
        <div className="mb-8 flex flex-wrap gap-2">
          {["Overview", "Question Bank", "Tests", "Students", "Analytics"].map(
            (tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`rounded-xl px-5 py-3 text-sm font-bold transition ${
                  activeTab === tab
                    ? "bg-cyan-400 text-slate-950"
                    : "bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {tab}
              </button>
            )
          )}
        </div>

        {/* Welcome */}
        <div className="mb-8 rounded-3xl border border-cyan-400/20 bg-gradient-to-r from-cyan-400/10 to-blue-500/5 p-8">
          <p className="text-sm font-bold uppercase tracking-widest text-cyan-400">
            Welcome back 👋
          </p>

          <h2 className="mt-2 text-3xl font-black">
            Control the NetQuest experience.
          </h2>

          <p className="mt-3 max-w-2xl text-slate-400">
            Create questions, conduct tests, monitor students and analyse
            performance from one place.
          </p>
        </div>

        {/* Stats */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:-translate-y-1 hover:border-cyan-400/30"
            >
              <div className="text-3xl">{stat.icon}</div>

              <p className="mt-5 text-sm text-slate-500">
                {stat.label}
              </p>

              <p className="mt-1 text-3xl font-black text-cyan-400">
                {stat.value}
              </p>
            </div>
          ))}
        </div>

        {/* Main section */}
        <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* Recent questions */}
          <section className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                  Question Bank
                </p>

                <h3 className="mt-1 text-xl font-black">
                  Recent Questions
                </h3>
              </div>

              <button
                onClick={() => setActiveTab("Question Bank")}
                className="rounded-xl bg-cyan-400 px-4 py-2 text-sm font-bold text-slate-950"
              >
                + Add Question
              </button>
            </div>

            <div className="space-y-3">
              {recentQuestions.map((item, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-4 rounded-2xl border border-white/5 bg-black/20 p-4 md:flex-row md:items-center md:justify-between"
                >
                  <div>
                    <p className="font-semibold">{item.question}</p>

                    <div className="mt-2 flex gap-2 text-xs">
                      <span className="rounded-full bg-cyan-400/10 px-3 py-1 text-cyan-400">
                        {item.category}
                      </span>

                      <span className="rounded-full bg-white/5 px-3 py-1 text-slate-400">
                        {item.difficulty}
                      </span>
                    </div>
                  </div>

                  <button className="rounded-lg border border-white/10 px-4 py-2 text-xs font-bold text-slate-400 hover:text-white">
                    Edit
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Quick actions */}
          <aside className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
            <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
              Quick Actions
            </p>

            <h3 className="mt-1 text-xl font-black">
              Manage NetQuest
            </h3>

            <div className="mt-6 space-y-3">
              <QuickAction
                icon="➕"
                title="Add Question"
                text="Create a new challenge"
                onClick={() => setActiveTab("Question Bank")}
              />

              <QuickAction
                icon="📝"
                title="Create Test"
                text="Build a student assessment"
                onClick={() => setActiveTab("Tests")}
              />

              <QuickAction
                icon="👨‍🎓"
                title="Students"
                text="View student performance"
                onClick={() => setActiveTab("Students")}
              />

              <QuickAction
                icon="📊"
                title="Analytics"
                text="Analyse test results"
                onClick={() => setActiveTab("Analytics")}
              />
            </div>
          </aside>
        </div>

        {/* Current tab indicator */}
        <div className="mt-6 rounded-2xl border border-white/5 bg-white/[0.02] p-4 text-center text-sm text-slate-500">
          Current section:{" "}
          <span className="font-bold text-cyan-400">{activeTab}</span>
        </div>
      </div>
    </main>
  );
}

function QuickAction({
  icon,
  title,
  text,
  onClick,
}: {
  icon: string;
  title: string;
  text: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="flex w-full items-center gap-4 rounded-2xl border border-white/5 bg-black/20 p-4 text-left transition hover:border-cyan-400/30 hover:bg-cyan-400/5"
    >
      <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/5 text-xl">
        {icon}
      </span>

      <span>
        <span className="block font-bold">{title}</span>
        <span className="text-xs text-slate-500">{text}</span>
      </span>
    </button>
  );
}