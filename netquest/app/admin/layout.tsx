"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "../../utils/supabase/client";

const navItems = [
  { label: "Overview", href: "/admin" },
  { label: "Question Bank", href: "/admin/questions" },
  { label: "Tests", href: "/admin/tests" },
  { label: "Students", href: "/admin?tab=Students" },
  { label: "Analytics", href: "/admin?tab=Analytics" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
  const supabase = useMemo(() => createClient(), []);
  const pathname = usePathname();
  const [checking, setChecking] = useState(true);
  const [authorized, setAuthorized] = useState(false);
  const [loggingOut, setLoggingOut] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const profileRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pathname === "/admin/login") {
      setChecking(false);
      setAuthorized(false);
      return;
    }

    let active = true;

    async function verifyAdmin() {
      setChecking(true);
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      const user = sessionData.session?.user;

      if (sessionError || !user) {
        if (active) {
          setAuthorized(false);
          setChecking(false);
          window.location.replace("/admin/login");
        }
        return;
      }

      const { data: admin, error: adminError } = await supabase
        .from("admin_users")
        .select("user_id")
        .eq("user_id", user.id)
        .maybeSingle();

      if (!active) return;

      if (adminError || !admin) {
        await supabase.auth.signOut();
        setAuthorized(false);
        setChecking(false);
        window.location.replace("/admin/login");
        return;
      }

      setAuthorized(true);
      setChecking(false);
    }

    verifyAdmin();

    return () => {
      active = false;
    };
  }, [pathname, supabase]);

  useEffect(() => {
    function closeOnOutsideClick(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setProfileOpen(false);
      }
    }
    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setProfileOpen(false);
    }
    document.addEventListener("mousedown", closeOnOutsideClick);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeOnOutsideClick);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  async function handleLogout() {
    if (loggingOut) return;
    setLoggingOut(true);
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Logout failed:", error);
      setLoggingOut(false);
      alert("Logout failed. Please try again.");
      return;
    }
    window.location.replace("/admin/login");
  }

  if (pathname === "/admin/login") return <>{children}</>;

  if (checking || !authorized) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050816] px-6 text-white">
        <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-8 text-center">
          <div className="mx-auto mb-4 h-10 w-10 animate-spin rounded-full border-4 border-cyan-400/20 border-t-cyan-400" />
          <p className="font-bold">Verifying administrator access…</p>
          <p className="mt-2 text-sm text-slate-400">Please wait a moment.</p>
        </div>
      </main>
    );
  }

  const currentHref = pathname;

  return (
    <div className="min-h-screen bg-[#050816] text-white">
      <header className="sticky top-0 z-50 border-b border-white/10 bg-[#080d1c]/95 shadow-lg shadow-black/10 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-4 sm:px-6">
          <Link href="/admin" className="flex items-center gap-3" onClick={() => setProfileOpen(false)}>
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-cyan-300 to-blue-500 text-xl font-black text-slate-950">N</span>
            <span>
              <span className="block text-lg font-black tracking-tight">NetQuest</span>
              <span className="block text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-400">Admin Console</span>
            </span>
          </Link>

          <div className="relative" ref={profileRef}>
            <button
              type="button"
              aria-haspopup="menu"
              aria-expanded={profileOpen}
              onClick={() => setProfileOpen((open) => !open)}
              onMouseEnter={() => setProfileOpen(true)}
              className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.04] px-3 py-2 transition hover:border-cyan-400/40 hover:bg-white/[0.08]"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-cyan-400 font-black text-slate-950">A</span>
              <span className="hidden text-left sm:block">
                <span className="block text-sm font-bold">Administrator</span>
                <span className="block text-xs text-slate-400">Full Access</span>
              </span>
              <span className="text-xs text-slate-300">▾</span>
            </button>

            {profileOpen && (
              <div
                role="menu"
                onMouseLeave={() => setProfileOpen(false)}
                className="absolute right-0 top-full mt-2 w-60 overflow-hidden rounded-2xl border border-white/10 bg-[#111a2c] p-2 shadow-2xl shadow-black/40"
              >
                <div className="border-b border-white/10 px-3 py-3">
                  <p className="font-bold">Administrator</p>
                  <p className="text-xs text-slate-400">Manage your NetQuest console</p>
                </div>
                <button
                  role="menuitem"
                  type="button"
                  onClick={() => { setProfileOpen(false); window.location.reload(); }}
                  className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-semibold text-slate-200 transition hover:bg-white/10"
                >
                  <span>↻</span> Refresh Current Page
                </button>
                <button
                  role="menuitem"
                  type="button"
                  disabled={loggingOut}
                  onClick={handleLogout}
                  className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-bold text-rose-300 transition hover:bg-rose-500/10 disabled:opacity-60"
                >
                  <span>↪</span> {loggingOut ? "Logging out…" : "Logout"}
                </button>
              </div>
            )}
          </div>
        </div>

        <nav aria-label="Admin navigation" className="mx-auto flex max-w-7xl gap-2 overflow-x-auto px-4 pb-3 sm:px-6">
          {navItems.map((item) => {
            const active = item.href === "/admin"
              ? pathname === "/admin"
              : pathname === item.href;
            return (
             <a
  key={item.label}
  href={item.href}
  onClick={() => setProfileOpen(false)}
  className={`shrink-0 rounded-xl px-4 py-2.5 text-sm font-bold transition ${
    active
      ? "bg-cyan-400 text-slate-950"
      : "text-slate-400 hover:bg-white/[0.07] hover:text-white"
  }`}
>
  {item.label}
</a>
            );
          })}
        </nav>
      </header>

      <div>{children}</div>
    </div>
  );
}
