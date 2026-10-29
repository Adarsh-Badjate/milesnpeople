"use client";

import { useState, useEffect, useCallback } from "react";
import { Logo } from "@/components/Logo";

interface Contact {
  name: string;
  firstName: string;
  whatsapp: string;
  gender: string;
  source: string;
}

function buildMessage(firstName: string): string {
  return `Hey ${firstName}!

You've run with the *MilesNPeople (MNP) community*, and this Sunday we're throwing our *BIGGEST RUN with the BIGGEST FUN* yet!

Introducing *MNP HALLOWEEN RUN — WEEK 005!*

Here's what your *₹99 early bird spot* gets you:

*3K or 5K run* — Pick your distance. Every pace welcome, walkers too.

*Crazy Halloween games* — Spooky, silly, and total chaos after the run.

*Like-minded people* — Come solo, leave with a crew.

*Twist N Flavours discount* — The run starts and ends at Twist N Flavours. Special discounts on everything on the menu.

*Bigger space, crazier vibes* — More room to play. Costumes welcome!

*₹99. Less than a coffee. Early bird slots are limited and the price goes up once they're gone.*

Register yourself or bring your entire gang along!

Register now: https://milesnpeople.in/events/halloween-run-005

*Sunday, 1 Nov · 6:00 AM · Twist N Flavours, Chh. Sambhajinagar*

See you on Sunday, MNP fam!

*Biggest Run. Biggest Fun.*`;
}

export default function CampaignPage() {
  const [authed, setAuthed] = useState(false);
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [total, setTotal] = useState(0);
  const [alreadyRegistered, setAlreadyRegistered] = useState(0);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState<Set<string>>(new Set());
  const [search, setSearch] = useState("");

  const fetchContacts = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch("/api/admin/campaign");
      if (res.status === 401) {
        setAuthed(false);
        return;
      }
      const data = await res.json();
      setContacts(data.contacts || []);
      setTotal(data.total || 0);
      setAlreadyRegistered(data.alreadyRegistered || 0);
    } catch {
      // ignore
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    if (authed) fetchContacts();
  }, [authed, fetchContacts]);

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

  function markSent(whatsapp: string) {
    setSent((prev) => new Set(prev).add(whatsapp));
  }

  function openWhatsApp(contact: Contact) {
    const message = encodeURIComponent(buildMessage(contact.firstName));
    window.open(`https://web.whatsapp.com/send?phone=91${contact.whatsapp}&text=${message}`, "_blank");
    markSent(contact.whatsapp);
  }

  const filtered = contacts.filter(
    (c) =>
      !search ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.whatsapp.includes(search)
  );

  const sentCount = filtered.filter((c) => sent.has(c.whatsapp)).length;
  const pendingCount = filtered.length - sentCount;

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-dark text-cream font-[family-name:var(--font-barlow)]">
        <form onSubmit={handleLogin} className="w-full max-w-sm rounded-2xl border border-cream/10 bg-cream/5 p-8">
          <Logo stroke="#F4F2ED" className="text-cream justify-center mb-6" />
          <h1 className="mb-6 text-center font-[family-name:var(--font-anton)] text-3xl">CAMPAIGN</h1>
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
        <div className="mx-auto flex max-w-[800px] items-center justify-between px-5 py-4">
          <Logo stroke="#F4F2ED" className="text-cream" />
          <div className="flex items-center gap-4">
            <a
              href="/admin"
              className="font-[family-name:var(--font-barlow-condensed)] font-bold tracking-[0.06em] text-cream/60 no-underline hover:text-cream transition-colors"
            >
              Dashboard
            </a>
            <span className="font-[family-name:var(--font-barlow-condensed)] font-bold tracking-[0.1em] text-accent">
              CAMPAIGN
            </span>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-[800px] px-5 py-8">
        {/* Stats */}
        <div className="mb-6 grid grid-cols-3 gap-4">
          <div className="rounded-xl border border-cream/10 bg-cream/5 p-4 text-center">
            <div className="font-[family-name:var(--font-anton)] text-3xl">{total}</div>
            <div className="mt-1 text-sm text-cream/50">To Contact</div>
          </div>
          <div className="rounded-xl border border-cream/10 bg-cream/5 p-4 text-center">
            <div className="font-[family-name:var(--font-anton)] text-3xl text-green-400">{sentCount}</div>
            <div className="mt-1 text-sm text-cream/50">Sent</div>
          </div>
          <div className="rounded-xl border border-cream/10 bg-cream/5 p-4 text-center">
            <div className="font-[family-name:var(--font-anton)] text-3xl">{alreadyRegistered}</div>
            <div className="mt-1 text-sm text-cream/50">Already Registered</div>
          </div>
        </div>

        {/* Search */}
        <input
          type="text"
          placeholder="Search by name or phone..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="mb-4 w-full rounded-xl border border-cream/20 bg-cream/5 px-4 py-3 text-cream placeholder:text-cream/30 focus:border-accent focus:outline-none"
        />

        <div className="mb-4 flex items-center justify-between">
          <span className="text-sm text-cream/50">
            {pendingCount} pending · {sentCount} sent
          </span>
          {loading && <span className="text-sm text-cream/40">Loading...</span>}
        </div>

        {/* Contact list */}
        <div className="space-y-3">
          {filtered.map((contact) => {
            const isSent = sent.has(contact.whatsapp);
            return (
              <div
                key={contact.whatsapp}
                className={`flex items-center justify-between rounded-xl border p-4 transition-colors ${
                  isSent
                    ? "border-green-500/20 bg-green-500/5"
                    : "border-cream/10 bg-cream/5"
                }`}
              >
                <div>
                  <div className="font-semibold">{contact.name}</div>
                  <div className="text-sm text-cream/50">
                    {contact.whatsapp} · {contact.source}{contact.gender ? ` · ${contact.gender}` : ""}
                  </div>
                </div>
                <button
                  onClick={() => openWhatsApp(contact)}
                  className={`rounded-xl px-5 py-2.5 font-[family-name:var(--font-barlow-condensed)] font-bold tracking-[0.06em] transition-colors min-h-[44px] ${
                    isSent
                      ? "bg-green-500/20 text-green-400 hover:bg-green-500/30"
                      : "bg-gold text-dark hover:bg-gold-hover"
                  }`}
                >
                  {isSent ? "✓ SENT" : "SEND"}
                </button>
              </div>
            );
          })}

          {filtered.length === 0 && (
            <div className="rounded-xl border border-cream/10 p-8 text-center text-cream/40">
              {loading ? "Loading contacts..." : "No contacts found"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
