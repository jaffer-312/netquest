"use client";

import Link from "next/link";

import { useState } from "react";

export default function Home() {
  const [dark, setDark] = useState(true);

  const pageTheme = dark
    ? "bg-[#050816] text-white"
    : "bg-slate-100 text-slate-900";

  const mutedText = dark ? "text-slate-400" : "text-slate-600";
  const navLinkText = dark
    ? "text-slate-300 hover:text-cyan-500"
    : "text-slate-700 hover:text-cyan-700";
  return (
    <main className={`min-h-screen transition-colors duration-300 ${pageTheme}`}>
      {/* Navigation */}
      <nav className={`flex items-center justify-between border-b px-6 py-5 lg:px-12 ${
        dark ? "border-white/10" : "border-slate-200"
      }`}>
        <Link href="/" className="flex items-center gap-3" aria-label="NetQuest home">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400 font-black text-slate-950">
            NQ
          </div>
          <div>
            <h1 className="text-xl font-bold tracking-tight">NetQuest</h1>
            <p className={`text-xs ${mutedText}`}>Learn • Practice • Compete</p>
          </div>
        </Link>

        <div className="hidden items-center gap-5 md:flex lg:gap-8">
          <a href="#learn" className={`text-sm transition ${navLinkText}`}>Learn</a>
          <a href="#arena" className={`text-sm transition ${navLinkText}`}>Arena</a>
          <Link href="/leaderboard" className={`text-sm transition ${navLinkText}`}>Leaderboard</Link>

          <button
            type="button"
            onClick={() => setDark((current) => !current)}
            className={`rounded-full border px-4 py-2 text-sm transition ${
              dark
                ? "border-white/10 hover:bg-white/10"
                : "border-slate-300 hover:bg-slate-200"
            }`}
            aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
          >
            {dark ? "☀ Light" : "🌙 Dark"}
          </button>

          <Link
  href="/admin/login"
  className="rounded-xl border border-cyan-400/40 px-5 py-2.5 font-semibold text-cyan-400 transition hover:bg-cyan-400/10"
>
  🛡️ Admin Portal
</Link>

          <Link
            href="/dashboard"
            className="rounded-xl bg-cyan-400 px-5 py-2.5 font-semibold text-slate-950 transition hover:scale-105"
          >
            Student Dashboard
          </Link>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={() => setDark((current) => !current)}
            className={`rounded-full border px-3 py-2 text-sm ${
              dark ? "border-white/10" : "border-slate-300"
            }`}
          >
            {dark ? "☀" : "🌙"}
          </button>
          <Link href="/dashboard" className="rounded-lg bg-cyan-400 px-3 py-2 text-sm font-semibold text-slate-950">
            Dashboard
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative overflow-hidden px-6 py-20 lg:px-12 lg:py-28">
        <div className="pointer-events-none absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/10 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-7xl">
          <div className="max-w-4xl">
            <div className="mb-6 inline-flex rounded-full border border-cyan-400/20 bg-cyan-400/10 px-4 py-2 text-sm text-cyan-700 dark:text-cyan-300">
              ⚡ The next generation networking learning platform
            </div>

            <h2 className="text-5xl font-black leading-tight tracking-tight md:text-7xl">
              MASTER NETWORKING.
              <span className="block text-cyan-400">CRACK INTERVIEWS.</span>
              <span className="block">WIN THE GAME.</span>
            </h2>

            <p className={`mt-7 max-w-2xl text-lg leading-8 ${mutedText}`}>
              Learn Networking, CCNA, DSA and technical interview skills
              through challenges, simulations, quizzes and competitive
              assessments.
            </p>

            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/quiz"
                className="rounded-xl bg-cyan-400 px-7 py-4 font-bold text-slate-950 transition hover:scale-105"
              >
                🚀 Start Learning
              </Link>

              <Link
                href="/test"
                className={`rounded-xl border px-7 py-4 font-semibold backdrop-blur transition ${
                  dark
                    ? "border-white/15 bg-white/5 hover:bg-white/10"
                    : "border-slate-300 bg-white hover:bg-slate-200"
                }`}
              >
                🎮 Enter Challenge Arena
              </Link>
            </div>
          </div>

          {/* Learning cards */}
          <div id="learn" className="mt-20 grid scroll-mt-8 gap-5 md:grid-cols-3">
            <NetworkCard
              dark={dark}
              icon="💻"
              title="Learn"
              text="Understand concepts with practical examples."
              href="/quiz"
            />
            <NetworkCard
              dark={dark}
              icon="⚔️"
              title="Challenge"
              text="Solve real-world networking scenarios."
              href="/test"
            />
            <NetworkCard
              dark={dark}
              icon="🏆"
              title="Compete"
              text="Earn XP, climb rankings and become the topper."
              href="/leaderboard"
            />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className={`border-y px-6 py-10 ${
        dark ? "border-white/10 bg-white/[0.02]" : "border-slate-200 bg-white/70"
      }`}>
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-8 md:grid-cols-4">
          <Stat dark={dark} number="Practice" label="Question Bank" />
          <Stat dark={dark} number="Challenges" label="Available Tests" />
          <Stat dark={dark} number="Multiple" label="Learning Topics" />
          <Stat dark={dark} number="Anytime" label="Learn at Your Pace" />
        </div>
      </section>

      {/* Arena */}
      <section id="arena" className="scroll-mt-8 px-6 py-24 lg:px-12">
  <div className="mx-auto max-w-7xl">
    <div className="mb-12">
      <p className="text-sm font-bold uppercase tracking-widest text-cyan-500">
        GAME MODE
      </p>

      <h3 className="mt-3 text-4xl font-bold">Enter the Arena</h3>

      <p className={`mt-3 max-w-2xl ${mutedText}`}>
        Practice concepts and take available tests to build your skills.
      </p>
    </div>

    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <ArenaCard
        dark={dark}
        icon="🌐"
        title="Networking"
        description="CCNA, IP addressing, routing, switching and security."
        href="/arena/networking"
      />

      <ArenaCard
        dark={dark}
        icon="🕵️"
        title="Network Detective"
        description="Practice networking questions and troubleshoot concepts."
        href="/arena/network-detective"
      />

      <ArenaCard
        dark={dark}
        icon="💡"
        title="Interview Arena"
        description="Practice technical interview questions and challenges."
        href="/arena/interview"
      />

      <ArenaCard
        dark={dark}
        icon="🧠"
        title="DSA Arena"
        description="Explore available practice questions and assessments."
        href="/arena/dsa"
      />
    </div>
  </div>
</section>
      {/* Leaderboard preview */}
      <section id="leaderboard-preview" className="px-6 pb-24 lg:px-12">
        <div className={`mx-auto max-w-7xl rounded-3xl border p-8 ${
          dark ? "border-white/10 bg-white/[0.03]" : "border-slate-200 bg-white"
        }`}>
          <div className="flex flex-col justify-between gap-4 md:flex-row md:items-center">
            <div>
              <p className="text-sm font-bold uppercase tracking-widest text-yellow-500">
                🏆 RANKING
              </p>
              <h3 className="mt-2 text-3xl font-bold">Top Network Warriors</h3>
              <p className={`mt-2 text-sm ${mutedText}`}>
                Open the leaderboard to see recorded student rankings.
              </p>
            </div>

            <Link
              href="/leaderboard"
              className={`inline-flex items-center justify-center rounded-xl border px-5 py-3 text-sm transition ${
                dark
                  ? "border-white/10 hover:bg-white/10"
                  : "border-slate-300 hover:bg-slate-100"
              }`}
            >
              View Full Leaderboard →
            </Link>
          </div>

          
        </div>
      </section>

      {/* Footer */}
      <footer className={`border-t px-6 py-8 text-center text-sm ${
        dark ? "border-white/10 text-slate-500" : "border-slate-200 text-slate-600"
      }`}>
        © 2026 NetQuest — Learn. Practice. Compete.
        <div className="mt-3 flex justify-center gap-5">
          <Link href="/dashboard" className="hover:text-cyan-500">Dashboard</Link>
          <Link href="/history" className="hover:text-cyan-500">My History</Link>
          <Link href="/leaderboard" className="hover:text-cyan-500">Leaderboard</Link>
        </div>
      </footer>
    </main>
  );
}

function NetworkCard({
  icon,
  title,
  text,
  href,
  dark,
}: {
  icon: string;
  title: string;
  text: string;
  href: string;
  dark: boolean;
}) {
  return (
    <Link
      href={href}
      className={`block rounded-2xl border p-6 transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 ${
        dark ? "border-white/10 bg-white/[0.03]" : "border-slate-200 bg-white"
      }`}
    >
      <div className="mb-4 text-3xl">{icon}</div>
      <h3 className="text-xl font-bold">{title}</h3>
      <p className={`mt-2 text-sm leading-6 ${dark ? "text-slate-400" : "text-slate-600"}`}>{text}</p>
      <p className="mt-4 text-sm font-semibold text-cyan-500">Open →</p>
    </Link>
  );
}

function ArenaCard({
  icon,
  title,
  description,
  href,
  dark,
}: {
  icon: string;
  title: string;
  description: string;
  href: string;
  dark: boolean;
}) {
  return (
    <Link
      href={href}
      className={`group block rounded-2xl border p-6 transition duration-300 hover:-translate-y-2 hover:border-cyan-400/40 hover:shadow-2xl hover:shadow-cyan-500/10 ${
        dark ? "border-white/10 bg-[#0b1023]" : "border-slate-200 bg-white"
      }`}
    >
      <div className={`flex h-14 w-14 items-center justify-center rounded-xl text-3xl transition group-hover:scale-110 ${
        dark ? "bg-white/5" : "bg-slate-100"
      }`}>
        {icon}
      </div>
      <h4 className="mt-6 text-xl font-bold">{title}</h4>
      <p className={`mt-3 text-sm leading-6 ${dark ? "text-slate-400" : "text-slate-600"}`}>{description}</p>
      <div className="mt-6 text-sm font-semibold text-cyan-500">Open →</div>
    </Link>
  );
}

function Stat({ number, label, dark }: { number: string; label: string; dark: boolean }) {
  return (
    <div className="text-center">
      <div className="text-xl font-black text-cyan-500 md:text-3xl">{number}</div>
      <div className={`mt-1 text-sm ${dark ? "text-slate-500" : "text-slate-600"}`}>{label}</div>
    </div>
  );
}
