"use client";

import { useState } from "react";

export default function Home() {
  const [dark, setDark] = useState(true);

  return (
    <main
      className={`min-h-screen ${
        dark
          ? "bg-[#050816] text-white"
          : "bg-slate-100 text-slate-900"
      }`}
    >
      {/* Navigation */}
      <nav className="flex items-center justify-between border-b border-white/10 px-6 py-5 lg:px-12">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400 font-black text-slate-950">
            NQ
          </div>

          <div>
            <h1 className="text-xl font-bold tracking-tight">NetQuest</h1>
            <p className="text-xs text-slate-400">
              Learn • Practice • Compete
            </p>
          </div>
        </div>

        <div className="hidden items-center gap-8 md:flex">
          <a href="#learn" className="text-sm text-slate-300 hover:text-cyan-400">
            Learn
          </a>
          <a href="#arena" className="text-sm text-slate-300 hover:text-cyan-400">
            Arena
          </a>
          <a href="#leaderboard" className="text-sm text-slate-300 hover:text-cyan-400">
            Leaderboard
          </a>

          <button
            onClick={() => setDark(!dark)}
            className="rounded-full border border-white/10 px-4 py-2 text-sm hover:bg-white/10"
          >
            {dark ? "☀ Light" : "🌙 Dark"}
          </button>

          <button className="rounded-xl bg-cyan-400 px-5 py-2.5 font-semibold text-slate-950 transition hover:scale-105">
            Login
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-20 lg:px-12 lg:py-28">
        <div className="absolute left-1/2 top-10 -z-0 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-300">
              ⚡ The next generation networking learning platform
            </div>

            <h2 className="text-5xl font-black leading-tight tracking-tight md:text-7xl">
              MASTER NETWORKING.
              <span className="block text-cyan-400">
                CRACK INTERVIEWS.
              </span>
              <span className="block">WIN THE GAME.</span>
            </h2>

            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-400">
              Learn Networking, CCNA, DSA and technical interview skills
              through challenges, simulations, quizzes and competitive
              assessments.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <button className="rounded-xl bg-cyan-400 px-7 py-4 font-bold text-slate-950 transition hover:scale-105">
                🚀 Start Learning
              </button>

              <button className="rounded-xl border border-white/15 bg-white/5 px-7 py-4 font-semibold backdrop-blur transition hover:bg-white/10">
                🎮 Enter Challenge Arena
              </button>
            </div>
          </div>

          {/* Network visual */}
          <div className="mt-20 grid gap-5 md:grid-cols-3">
            <NetworkCard icon="💻" title="Learn" text="Understand concepts with practical examples." />
            <NetworkCard icon="⚔️" title="Challenge" text="Solve real-world networking scenarios." />
            <NetworkCard icon="🏆" title="Compete" text="Earn XP, climb rankings and become the topper." />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-white/10 bg-white/[0.02] px-6 py-10">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 md:grid-cols-4">
          <Stat number="1,000+" label="Questions" />
          <Stat number="50+" label="Challenges" />
          <Stat number="25+" label="Networking Topics" />
          <Stat number="∞" label="Learning Possibilities" />
        </div>
      </section>

      {/* Arena */}
      <section id="arena" className="px-6 py-24 lg:px-12">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12">
            <p className="text-sm font-bold uppercase tracking-widest text-cyan-400">
              GAME MODE
            </p>
            <h3 className="mt-3 text-4xl font-bold">
              Enter the Arena
            </h3>
            <p className="mt-3 max-w-2xl text-slate-400">
              Forget boring MCQs. Solve problems like a real network engineer.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <ArenaCard
              icon="🌐"
              title="Networking"
              description="CCNA, IP addressing, routing, switching and security."
            />

            <ArenaCard
              icon="🕵️"
              title="Network Detective"
              description="Find the root cause of real networking problems."
            />

            <ArenaCard
              icon="💡"
              title="Interview Arena"
              description="Face practical technical interview scenarios."
            />

            <ArenaCard
              icon="🧠"
              title="DSA Arena"
              description="Algorithms, data structures and coding challenges."
            />
          </div>
        </div>
      </section>

      {/* Leaderboard preview */}
      <section id="leaderboard" className="px-6 pb-24 lg:px-12">
        <div className="mx-auto max-w-7xl rounded-3xl border border-white/10 bg-white/[0.03] p-8">
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-yellow-400">
                🏆 LIVE RANKING
              </p>
              <h3 className="mt-2 text-3xl font-bold">
                Top Network Warriors
              </h3>
            </div>

            <button className="rounded-xl border border-white/10 px-5 py-3 text-sm hover:bg-white/10">
              View Full Leaderboard →
            </button>
          </div>

          <div className="mt-8 space-y-3">
            <Rank position="1" name="Coming Soon" score="—" />
            <Rank position="2" name="Coming Soon" score="—" />
            <Rank position="3" name="Coming Soon" score="—" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-slate-500">
        © 2026 NetQuest — Learn. Practice. Compete.
      </footer>
    </main>
  );
}

function NetworkCard({
  icon,
  title,
  text,
}: {
  icon: string;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/30">
      <div className="mb-4 text-3xl">{icon}</div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className="mt-2 text-sm leading-6 text-slate-400">{text}</p>
    </div>
  );
}

function ArenaCard({
  icon,
  title,
  description,
}: {
  icon: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group cursor-pointer rounded-2xl border border-white/10 bg-[#0b1023] p-6 transition duration-300 hover:-translate-y-2 hover:border-cyan-400/40 hover:shadow-2xl hover:shadow-cyan-500/10">
      <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-white/5 text-3xl transition group-hover:scale-110">
        {icon}
      </div>

      <h4 className="mt-6 text-xl font-bold">{title}</h4>

      <p className="mt-3 text-sm leading-6 text-slate-400">
        {description}
      </p>

      <div className="mt-6 text-sm font-semibold text-cyan-400">
        Enter Arena →
      </div>
    </div>
  );
}

function Stat({ number, label }: { number: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-3xl font-black text-cyan-400">{number}</div>
      <div className="mt-1 text-sm text-slate-500">{label}</div>
    </div>
  );
}

function Rank({
  position,
  name,
  score,
}: {
  position: string;
  name: string;
  score: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] px-5 py-4">
      <div className="flex items-center gap-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400/10 font-bold text-cyan-400">
          {position}
        </div>
        <span className="font-medium">{name}</span>
      </div>

      <span className="font-bold text-cyan-400">{score}</span>
    </div>
  );
}