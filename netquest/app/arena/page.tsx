import Link from "next/link";

const arenas = [
  { href: "/arena/networking", icon: "🌐", title: "Networking Arena", label: "CCNA & Network Fundamentals", desc: "IP addressing, subnetting, OSI/TCP-IP, routing, switching and cybersecurity." },
  { href: "/arena/network-detective", icon: "🕵️", title: "Network Detective", label: "Troubleshooting & Scenarios", desc: "Find assessments focused on diagnosing connectivity and configuration problems." },
  { href: "/arena/interview", icon: "💡", title: "Interview Arena", label: "Technical Interview Prep", desc: "Practice technical concepts and review explanations for interview readiness." },
  { href: "/arena/dsa", icon: "🧠", title: "DSA Arena", label: "Data Structures & Algorithms", desc: "Build problem-solving skills through DSA and programming assessments." },
];

export default function ArenaPage() {
  return <main className="min-h-screen bg-[#050816] px-5 py-10 text-white sm:px-8"><div className="mx-auto max-w-6xl">
    <nav className="mb-8 flex gap-3 text-sm text-slate-400"><Link href="/" className="hover:text-cyan-300">Home</Link><span>/</span><span className="text-cyan-300">Arena</span></nav>
    <section className="rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 to-indigo-500/10 p-8 sm:p-10"><p className="text-xs font-black uppercase tracking-[0.25em] text-cyan-300">PICK YOUR GAME MODE</p><h1 className="mt-3 text-4xl font-black sm:text-5xl">Challenge Arena</h1><p className="mt-5 max-w-3xl leading-7 text-slate-300">Choose a focused practice area. Each arena lists published active assessments matching its topic. New tests and questions are managed in the NetQuest Admin panel.</p><Link href="/test" className="mt-6 inline-flex rounded-xl border border-white/15 px-5 py-3 font-bold hover:bg-white/5">Browse all active tests →</Link></section>
    <section className="mt-10 grid gap-5 md:grid-cols-2">{arenas.map((arena) => <Link key={arena.href} href={arena.href} className="group rounded-2xl border border-white/10 bg-white/[0.03] p-7 transition hover:-translate-y-1 hover:border-cyan-400/40"><div className="text-4xl">{arena.icon}</div><p className="mt-5 text-xs font-bold uppercase tracking-wider text-cyan-300">{arena.label}</p><h2 className="mt-2 text-2xl font-black">{arena.title}</h2><p className="mt-3 leading-6 text-slate-400">{arena.desc}</p><p className="mt-6 font-bold text-cyan-300">Open arena →</p></Link>)}</section>
    <footer className="mt-12 flex flex-wrap gap-5 border-t border-white/10 pt-6 text-sm text-slate-500"><Link href="/learn" className="hover:text-cyan-300">Learning Paths</Link><Link href="/dashboard" className="hover:text-cyan-300">Dashboard</Link><Link href="/leaderboard" className="hover:text-cyan-300">Leaderboard</Link></footer>
  </div></main>;
}
