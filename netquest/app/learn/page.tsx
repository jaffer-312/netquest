"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { createClient } from "../../utils/supabase/client";

type Topic = { title: string; category: string; level: string; description: string; href: string; icon: string; next: string };
const topics: Topic[] = [
  { title: "Networking Fundamentals", category: "Networking", level: "Beginner → Intermediate", description: "OSI and TCP/IP models, Ethernet, IPv4/IPv6, subnetting, switching and routing.", href: "/arena/networking", icon: "🌐", next: "Begin with OSI, IP addressing and subnetting." },
  { title: "CCNA Practice Path", category: "Networking", level: "Beginner → CCNA", description: "Practice routing, switching, VLANs, static routes, RIP/OSPF concepts and network services.", href: "/arena/networking", icon: "🧭", next: "Build fundamentals, then practise routing and switching." },
  { title: "Cybersecurity Basics", category: "Cybersecurity", level: "Beginner", description: "Security fundamentals, threats, access control and defensive networking concepts.", href: "/arena/networking", icon: "🛡️", next: "Start with security concepts and network defence." },
  { title: "Technical Interview Preparation", category: "Interview", level: "Placement preparation", description: "Revise technical concepts and practise interview-style questions with explanations.", href: "/arena/interview", icon: "💡", next: "Practise short answers, then review each explanation." },
  { title: "Data Structures & Algorithms", category: "DSA", level: "Beginner → Intermediate", description: "Build problem-solving foundations across common data structures and algorithmic concepts.", href: "/arena/dsa", icon: "🧠", next: "Start with arrays, strings, searching and sorting." },
  { title: "Troubleshooting Mindset", category: "Network Detective", level: "Scenario practice", description: "Learn to reason through symptoms, isolate causes and select the next diagnostic step.", href: "/arena/network-detective", icon: "🕵️", next: "Use the troubleshooting arena for currently published scenario assessments." },
];

export default function LearnPage() {
  const supabase = createClient();
  const [counts, setCounts] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    let cancelled = false;
    async function loadCounts() {
      const { data, error } = await supabase.from("questions").select("category");
      if (!cancelled) {
        if (!error && data) {
          const next: Record<string, number> = {};
          data.forEach((row: { category: string | null }) => {
            const key = (row.category || "Uncategorized").trim();
            next[key] = (next[key] || 0) + 1;
          });
          setCounts(next);
        }
        setLoading(false);
      }
    }
    void loadCounts();
    return () => { cancelled = true; };
  }, []);
  const categoryCount = (category: string) => Object.entries(counts).filter(([name]) => name.toLowerCase().includes(category.toLowerCase())).reduce((sum, [, count]) => sum + count, 0);

  return <main className="min-h-screen bg-[#050816] px-5 py-10 text-white sm:px-8"><div className="mx-auto max-w-6xl">
    <nav className="mb-8 flex gap-3 text-sm text-slate-400"><Link href="/" className="hover:text-cyan-300">Home</Link><span>/</span><span className="text-cyan-300">Learn</span></nav>
    <section className="rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 to-indigo-500/10 p-8 sm:p-10"><p className="text-xs font-black uppercase tracking-[0.25em] text-cyan-300">LEARN • PRACTISE • IMPROVE</p><h1 className="mt-3 text-4xl font-black sm:text-5xl">Learning Paths</h1><p className="mt-5 max-w-3xl leading-7 text-slate-300">Choose a path, review the suggested topics and continue into its practice arena. Question counts below come from the current Supabase Question Bank; structured lesson pages and lesson-completion tracking are the next learning-system phase.</p><div className="mt-6 flex flex-wrap gap-3"><Link href="/arena" className="rounded-xl bg-cyan-400 px-5 py-3 font-black text-slate-950 hover:bg-cyan-300">Explore Challenge Arena →</Link><Link href="/dashboard" className="rounded-xl border border-white/15 px-5 py-3 font-bold hover:bg-white/5">My Dashboard</Link></div></section>
    <section className="mt-10 grid gap-5 md:grid-cols-2">{topics.map((topic) => { const count = categoryCount(topic.category); return <article key={topic.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-6"><div className="flex items-start justify-between gap-4"><div className="text-4xl">{topic.icon}</div><span className="rounded-full bg-white/5 px-3 py-1 text-xs text-slate-300">{topic.level}</span></div><p className="mt-5 text-xs font-bold uppercase tracking-wider text-cyan-300">{topic.category}</p><h2 className="mt-2 text-2xl font-black">{topic.title}</h2><p className="mt-3 leading-6 text-slate-400">{topic.description}</p><div className="mt-5 rounded-xl border border-white/5 bg-black/20 p-4"><p className="text-xs font-bold uppercase tracking-wider text-slate-500">Suggested next step</p><p className="mt-2 text-sm text-slate-300">{topic.next}</p><p className="mt-3 text-xs text-slate-500">Question bank: {loading ? "Checking…" : `${count} matching question${count === 1 ? "" : "s"}`}</p></div><Link href={topic.href} className="mt-5 inline-flex rounded-xl bg-cyan-400 px-4 py-3 font-black text-slate-950 hover:bg-cyan-300">Open practice →</Link></article>; })}</section>
    <footer className="mt-12 flex flex-wrap gap-5 border-t border-white/10 pt-6 text-sm text-slate-500"><Link href="/arena" className="hover:text-cyan-300">All Arenas</Link><Link href="/history" className="hover:text-cyan-300">My History</Link><Link href="/leaderboard" className="hover:text-cyan-300">Leaderboard</Link></footer>
  </div></main>;
}
