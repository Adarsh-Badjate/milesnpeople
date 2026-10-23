"use client";

import { useState, useEffect, useCallback } from "react";
import { Logo } from "@/components/Logo";

interface Run {
  id: string;
  week: string;
  title: string;
  date: string;
  capacity: number;
}

interface Registration {
  timestamp: string;
  run_id: string;
  bib: string;
  name: string;
  whatsapp: string;
  email: string;
  instagram: string;
  age_group: string;
  gender: string;
  distance: string;
  experience: string;
  emergency_name: string;
  emergency_phone: string;
  source: string;
  waiver: string;
  whatsapp_optin: string;
  checked_in: string;
  payment_screenshot: string;
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [runs, setRuns] = useState<Run[]>([]);
  const [selectedRun, setSelectedRun] = useState("");
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchData = useCallback(async (runId?: string) => {
    setLoading(true);
    try {
      const url = runId ? `/api/admin?runId=${runId}` : "/api/admin";
      const res = await fetch(url);
      if (res.status === 401) {
        setAuthed(false);
        return;
      }
      const data = await res.json();
      setRuns(data.runs || []);
      setRegistrations(data.registrations || []);
    } catch {
      // ignore
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (authed) fetchData(selectedRun || undefined);
  }, [authed, selectedRun, fetchData]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action: "login", password }),
    });
    if (res.ok) {
      setAuthed(true);
      setLoginError("");
    } else {
      setLoginError("Wrong password");
    }
  }

  async function toggleCheckIn(bib: string, currentState: string) {
    const newState = currentState !== "TRUE";
    await fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: "checkin",
        runId: selectedRun,
        bib,
        checkedIn: newState,
      }),
    });
    setRegistrations((prev) =>
      prev.map((r) =>
        r.bib === bib ? { ...r, checked_in: newState ? "TRUE" : "" } : r
      )
    );
  }

  function exportCSV() {
    const headers = [
      "Bib",
      "Name",
      "WhatsApp",
      "Email",
      "Instagram",
      "Age Group",
      "Gender",
      "Distance",
      "Experience",
      "Emergency Name",
      "Emergency Phone",
      "Source",
      "Checked In",
      "Timestamp",
    ];
    const rows = filtered.map((r) => [
      r.bib,
      r.name,
      r.whatsapp,
      r.email,
      r.instagram,
      r.age_group,
      r.gender,
      r.distance,
      r.experience,
      r.emergency_name,
      r.emergency_phone,
      r.source,
      r.checked_in,
      r.timestamp,
    ]);
    const csv = [headers, ...rows].map((r) => r.map((c) => `"${c}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `registrations-${selectedRun || "all"}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  }

  const filtered = registrations.filter(
    (r) =>
      !search ||
      r.name.toLowerCase().includes(search.toLowerCase()) ||
      r.bib.includes(search) ||
      r.whatsapp.includes(search)
  );

  const total = filtered.length;
  const threeK = filtered.filter((r) => r.distance === "3K").length;
  const fiveK = filtered.filter((r) => r.distance === "5K").length;
  const firstTimers = filtered.filter((r) => r.experience === "First time running").length;
  const checkedIn = filtered.filter((r) => r.checked_in === "TRUE").length;
  const paid = filtered.filter((r) => r.payment_screenshot).length;
  const capacity = runs.find((r) => r.id === selectedRun)?.capacity || 0;

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-dark text-cream font-[family-name:var(--font-barlow)]">
        <form onSubmit={handleLogin} className="w-full max-w-sm rounded-2xl border border-cream/10 bg-cream/5 p-8">
          <Logo stroke="#F4F2ED" className="text-cream justify-center mb-6" />
          <h1 className="mb-6 text-center font-[family-name:var(--font-anton)] text-3xl">ADMIN</h1>
          {loginError && (
            <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/30 px-3 py-2 text-red-400 text-sm">{loginError}</div>
          )}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="w-full rounded-xl border border-cream/20 bg-cream/5 px-4 py-3 text-cream placeholder:text-cream/30 focus:border-accent focus:outline-none mb-4"
          />
          <button
            type="submit"
            className="w-full rounded-xl bg-accent py-3 font-[family-name:var(--font-barlow-condensed)] font-extrabold tracking-[0.08em] text-white hover:bg-accent-hover transition-colors min-h-[48px]"
          >
            LOGIN
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark text-cream font-[family-name:var(--font-barlow)]">
      <header className="border-b border-cream/10">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-5 py-4">
          <Logo stroke="#F4F2ED" className="text-cream" />
          <span className="font-[family-name:var(--font-barlow-condensed)] font-bold tracking-[0.1em] text-accent">
            ORGANIZER DASHBOARD
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-[1400px] px-5 py-8">
        {/* Run selector */}
        <div className="mb-6 flex flex-wrap items-center gap-4">
          <select
            value={selectedRun}
            onChange={(e) => setSelectedRun(e.target.value)}
            className="rounded-xl border border-cream/20 bg-cream/5 px-4 py-3 text-cream focus:border-accent focus:outline-none"
          >
            <option value="">All runs</option>
            {runs.map((r) => (
              <option key={r.id} value={r.id}>
                Week {r.week} — {r.title}
              </option>
            ))}
          </select>
          <button
            onClick={() => fetchData(selectedRun || undefined)}
            disabled={loading}
            className="rounded-xl border border-cream/20 px-4 py-3 text-cream hover:bg-cream/10 transition-colors min-h-[48px]"
          >
            {loading ? "Loading..." : "Refresh"}
          </button>
          <button
            onClick={exportCSV}
            className="rounded-xl border border-cream/20 px-4 py-3 text-cream hover:bg-cream/10 transition-colors min-h-[48px]"
          >
            Export CSV
          </button>
        </div>

        {/* Stat tiles */}
        <div className="mb-6 grid grid-cols-2 gap-4 md:grid-cols-6">
          {[
            { label: "Registered", value: `${total}${capacity ? ` / ${capacity}` : ""}` },
            { label: "3K", value: threeK },
            { label: "5K", value: fiveK },
            { label: "First-timers", value: firstTimers },
            { label: "Paid", value: paid },
            { label: "Checked in", value: checkedIn },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-xl border border-cream/10 bg-cream/5 p-4 text-center"
            >
              <div className="font-[family-name:var(--font-anton)] text-3xl">{stat.value}</div>
              <div className="mt-1 text-sm text-cream/50">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by name, bib, or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 w-full max-w-md rounded-xl border border-cream/20 bg-cream/5 px-4 py-3 text-cream placeholder:text-cream/30 focus:border-accent focus:outline-none"
        />

        {/* Table */}
        <div className="overflow-x-auto rounded-xl border border-cream/10">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-cream/10 bg-cream/5">
                <th className="px-4 py-3 font-[family-name:var(--font-barlow-condensed)] font-bold tracking-[0.1em]">BIB</th>
                <th className="px-4 py-3 font-[family-name:var(--font-barlow-condensed)] font-bold tracking-[0.1em]">NAME</th>
                <th className="px-4 py-3 font-[family-name:var(--font-barlow-condensed)] font-bold tracking-[0.1em]">DISTANCE</th>
                <th className="px-4 py-3 font-[family-name:var(--font-barlow-condensed)] font-bold tracking-[0.1em]">WHATSAPP</th>
                <th className="px-4 py-3 font-[family-name:var(--font-barlow-condensed)] font-bold tracking-[0.1em]">AGE</th>
                <th className="px-4 py-3 font-[family-name:var(--font-barlow-condensed)] font-bold tracking-[0.1em]">EXPERIENCE</th>
                <th className="px-4 py-3 font-[family-name:var(--font-barlow-condensed)] font-bold tracking-[0.1em]">PAID</th>
                <th className="px-4 py-3 font-[family-name:var(--font-barlow-condensed)] font-bold tracking-[0.1em]">CHECKED IN</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((reg) => (
                <tr key={`${reg.run_id}-${reg.bib}`} className="border-b border-cream/5 hover:bg-cream/5">
                  <td className="px-4 py-3 font-mono font-bold">{reg.bib}</td>
                  <td className="px-4 py-3">{reg.name}</td>
                  <td className="px-4 py-3">
                    <span className={`rounded-full px-2 py-0.5 text-xs font-bold ${reg.distance === "3K" ? "bg-accent/20 text-accent" : "bg-cream/10 text-cream/70"}`}>
                      {reg.distance}
                    </span>
                  </td>
                  <td className="px-4 py-3">{reg.whatsapp}</td>
                  <td className="px-4 py-3">{reg.age_group}</td>
                  <td className="px-4 py-3 text-cream/60">{reg.experience}</td>
                  <td className="px-4 py-3">
                    {reg.payment_screenshot ? (
                      <a
                        href={reg.payment_screenshot}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="rounded-lg bg-green-500/20 text-green-400 px-3 py-1.5 text-xs font-bold hover:bg-green-500/30 transition-colors inline-block"
                      >
                        ✓ VIEW
                      </a>
                    ) : (
                      <span className="rounded-lg bg-cream/10 text-cream/40 px-3 py-1.5 text-xs font-bold inline-block">
                        PENDING
                      </span>
                    )}
                  </td>
                  <td className="px-4 py-3">
                    <button
                      onClick={() => toggleCheckIn(reg.bib, reg.checked_in)}
                      className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors min-h-[36px] ${
                        reg.checked_in === "TRUE"
                          ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                          : "bg-cream/10 text-cream/40 hover:bg-cream/20"
                      }`}
                    >
                      {reg.checked_in === "TRUE" ? "✓ IN" : "CHECK IN"}
                    </button>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={8} className="px-4 py-8 text-center text-cream/40">
                    No registrations found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
