"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import QRCode from "qrcode";

const SOURCES = [
  "Instagram",
  "WhatsApp",
  "Friend / word of mouth",
  "Poster / flyer",
  "Other",
];

const PRICE = 99;

const ATTENDANCE_OPTIONS = [
  { value: "3K", label: "3K Run", desc: "Easy pace, perfect for first-timers and walkers" },
  { value: "5K", label: "5K Run", desc: "Go the full distance — Halloween glory awaits" },
];

export function EventRegistrationForm() {
  // Step: "form" → "payment" → "confirmed"
  const [step, setStep] = useState<"form" | "payment" | "confirmed">("form");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [instagram, setInstagram] = useState("");
  const [gender, setGender] = useState("");
  const [attendance, setAttendance] = useState("");
  const [attendees, setAttendees] = useState(1);
  const [source, setSource] = useState("");
  const [consent, setConsent] = useState(false);
  const [whatsappOptin, setWhatsappOptin] = useState(true);

  const totalPrice = attendees * PRICE;

  // Step 1: Validate form (check capacity, duplicates) without saving
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          run_id: "halloween-005",
          name,
          whatsapp: phone,
          email,
          instagram,
          age_group: "",
          gender,
          distance: attendance,
          experience: String(attendees),
          emergency_name: "",
          emergency_phone: "",
          source,
          waiver: consent ? "true" : "false",
          whatsapp_optin: whatsappOptin,
          validate_only: true,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      setStep("payment");
    } catch {
      setError("Network error. Please try again.");
    }
    setLoading(false);
  }

  const [qrDataUrl, setQrDataUrl] = useState("");
  const [txnId, setTxnId] = useState("");
  const [submittingTxn, setSubmittingTxn] = useState(false);
  const [txnError, setTxnError] = useState("");

  const upiUrl = `upi://pay?pa=adarshjain7972-1@okhdfcbank&pn=Miles%20and%20People&am=${totalPrice}&cu=INR&tn=MNP%20Halloween%20Run%20005`;

  useEffect(() => {
    if (step !== "payment") return;
    QRCode.toDataURL(upiUrl, {
      width: 280,
      margin: 2,
      color: { dark: "#141414", light: "#F4F2ED" },
    }).then(setQrDataUrl).catch(() => {});
  }, [step, upiUrl]);

  // Step 2: Save registration with transaction ID
  async function handleTxnSubmit() {
    if (!txnId.trim()) return;

    setTxnError("");
    setSubmittingTxn(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          run_id: "halloween-005",
          name,
          whatsapp: phone,
          email,
          instagram,
          age_group: "",
          gender,
          distance: attendance,
          experience: String(attendees),
          emergency_name: "",
          emergency_phone: "",
          source,
          waiver: consent ? "true" : "false",
          whatsapp_optin: whatsappOptin,
          transaction_id: txnId.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setTxnError(data.error || "Something went wrong");
      } else {
        setStep("confirmed");
      }
    } catch {
      setTxnError("Network error. Please try again.");
    }
    setSubmittingTxn(false);
  }

  // ── CONFIRMED ──
  if (step === "confirmed") {
    return (
      <div className="rounded-2xl border border-[#FF7A1A]/20 bg-[#FF7A1A]/[0.04] p-8 md:p-10 text-center">
        <div className="font-[family-name:var(--font-anton)] text-5xl text-[#FF7A1A]">
          YOU&apos;RE IN.
        </div>
        <p className="mt-4 text-lg text-cream/70">
          {attendees > 1
            ? `${attendees} spots reserved for ${name}.`
            : `Spot reserved for ${name}.`}
        </p>

        <div className="mt-6 rounded-xl border border-cream/10 bg-cream/5 p-5">
          <div className="font-[family-name:var(--font-barlow-condensed)] text-sm font-bold tracking-[0.12em] text-[#FF7A1A]">
            WHAT&apos;S NEXT
          </div>
          <p className="mt-2 text-cream/60">
            See you Sunday, 1 Nov at 6:00 AM at Twist N Flavours. Event updates will be shared on WhatsApp and email. Costume optional!
          </p>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="https://www.instagram.com/milesnpeople/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full border border-cream/20 px-6 py-3 font-[family-name:var(--font-barlow-condensed)] font-bold tracking-[0.08em] text-cream no-underline hover:border-[#FF7A1A] hover:text-[#FF7A1A] transition-colors"
          >
            FOLLOW ON INSTAGRAM
          </a>
          <Link
            href="/"
            className="inline-block rounded-full border border-cream/20 px-6 py-3 font-[family-name:var(--font-barlow-condensed)] font-bold tracking-[0.08em] text-cream no-underline hover:border-cream/40 transition-colors"
          >
            BACK TO HOME
          </Link>
        </div>
      </div>
    );
  }

  // ── PAYMENT ──
  if (step === "payment") {
    return (
      <div className="rounded-2xl border border-[#FF7A1A]/20 bg-[#FF7A1A]/[0.04] p-8 md:p-10 text-center">
        <div className="font-[family-name:var(--font-barlow-condensed)] text-sm font-bold tracking-[0.12em] text-[#FF7A1A]">
          ALMOST THERE, {name.split(" ")[0].toUpperCase()}!
        </div>
        <p className="mt-2 text-cream/60">
          Complete payment to confirm your spot.
        </p>

        {/* UPI Payment */}
        <div className="mt-8 rounded-xl border border-[#FF7A1A]/20 bg-cream/5 p-6">
          <div className="font-[family-name:var(--font-barlow-condensed)] text-sm font-bold tracking-[0.12em] text-[#FF7A1A]">
            STEP 1 — PAY VIA UPI
          </div>
          <div className="mt-4 font-[family-name:var(--font-anton)] text-3xl text-[#FF7A1A]">
            ₹{totalPrice}
          </div>
          <p className="mt-1 text-sm text-cream/40">
            {attendees} × ₹{PRICE}
          </p>

          {/* QR code */}
          {qrDataUrl && (
            <div className="mt-5">
              <p className="text-sm text-cream/60 mb-3">
                Scan with any UPI app (GPay, PhonePe, Paytm)
              </p>
              <div className="inline-block rounded-xl overflow-hidden">
                <img
                  src={qrDataUrl}
                  alt={`UPI QR code for ₹${totalPrice}`}
                  width={280}
                  height={280}
                />
              </div>
              <p className="mt-3 text-sm text-cream/50">
                Or pay directly to <span className="text-cream font-semibold">7447561810</span> via any UPI app
              </p>
            </div>
          )}
        </div>

        {/* Payment confirmation */}
        <div className="mt-6 rounded-xl border border-[#FF7A1A]/20 bg-cream/5 p-6">
          <div className="font-[family-name:var(--font-barlow-condensed)] text-sm font-bold tracking-[0.12em] text-[#FF7A1A]">
            STEP 2 — CONFIRM PAYMENT
          </div>
          <p className="mt-2 text-cream/60">
            Enter the name on your UPI account to lock your ticket. This is mandatory.
          </p>

          {txnError && (
            <div className="mt-4 rounded-lg bg-red-500/10 border border-red-500/30 px-4 py-3 text-red-400 text-sm">
              {txnError}
            </div>
          )}
          <div className="mt-4 space-y-3">
            <input
              type="text"
              value={txnId}
              onChange={(e) => setTxnId(e.target.value)}
              placeholder="e.g. Adarsh Badjate"
              className="w-full rounded-xl border border-cream/20 bg-cream/5 px-4 py-3 text-cream placeholder:text-cream/30 focus:border-[#FF7A1A] focus:outline-none focus:ring-1 focus:ring-[#FF7A1A] transition-colors"
            />
            <button
              type="button"
              onClick={handleTxnSubmit}
              disabled={submittingTxn || !txnId.trim()}
              className="w-full rounded-xl bg-[#FF7A1A] py-4 font-[family-name:var(--font-barlow-condensed)] text-xl font-extrabold tracking-[0.08em] text-[#0B0710] transition-colors hover:bg-[#FF8F3D] disabled:opacity-50 disabled:cursor-not-allowed min-h-[52px]"
            >
              {submittingTxn ? "CONFIRMING..." : "CONFIRM & LOCK TICKET"}
            </button>
          </div>
        </div>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-cream/20 bg-cream/5 px-4 py-3 text-cream placeholder:text-cream/30 focus:border-[#FF7A1A] focus:outline-none focus:ring-1 focus:ring-[#FF7A1A] transition-colors [&_option]:bg-[#1a1a1a] [&_option]:text-cream";
  const labelClass =
    "block mb-1.5 font-[family-name:var(--font-barlow-condensed)] text-sm font-bold tracking-[0.12em] text-cream/60";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-cream/10 bg-cream/[0.03] p-6 md:p-8"
    >
      {error && (
        <div className="mb-6 rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* About You */}
      <h3 className="mb-5 font-[family-name:var(--font-barlow-condensed)] text-lg font-extrabold tracking-[0.12em] text-[#FF7A1A]">
        ABOUT YOU
      </h3>

      <div className="space-y-4">
        <div>
          <label htmlFor="hw-name" className={labelClass}>
            FULL NAME *
          </label>
          <input
            id="hw-name"
            type="text"
            required
            minLength={2}
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="hw-email" className={labelClass}>
            EMAIL *
          </label>
          <input
            id="hw-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="hw-phone" className={labelClass}>
            PHONE NUMBER *
          </label>
          <input
            id="hw-phone"
            type="tel"
            required
            pattern="[6-9][0-9]{9}"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
            }
            placeholder="10-digit mobile number"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="hw-instagram" className={labelClass}>
            INSTAGRAM (OPTIONAL)
          </label>
          <input
            id="hw-instagram"
            type="text"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            placeholder="@yourusername"
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>GENDER *</label>
          <div className="grid grid-cols-2 gap-3">
            {["Male", "Female"].map((g) => (
              <button
                key={g}
                type="button"
                onClick={() => setGender(g)}
                className={`rounded-xl border-2 px-4 py-3 text-center transition-colors ${
                  gender === g
                    ? "border-[#FF7A1A] bg-[#FF7A1A]/10"
                    : "border-cream/20 hover:border-cream/40"
                }`}
              >
                <div
                  className={`font-[family-name:var(--font-barlow-condensed)] text-lg font-extrabold tracking-[0.04em] ${
                    gender === g ? "text-[#FF7A1A]" : "text-cream/70"
                  }`}
                >
                  {g}
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Your Experience */}
      <h3 className="mb-5 mt-8 font-[family-name:var(--font-barlow-condensed)] text-lg font-extrabold tracking-[0.12em] text-[#FF7A1A]">
        YOUR EXPERIENCE
      </h3>

      <div className="space-y-4">
        <div>
          <label className={labelClass}>CHOOSE YOUR DISTANCE *</label>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {ATTENDANCE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setAttendance(opt.value)}
                className={`rounded-xl border-2 px-4 py-4 text-left transition-colors ${
                  attendance === opt.value
                    ? "border-[#FF7A1A] bg-[#FF7A1A]/10"
                    : "border-cream/20 hover:border-cream/40"
                }`}
              >
                <div
                  className={`font-[family-name:var(--font-barlow-condensed)] text-lg font-extrabold tracking-[0.04em] ${
                    attendance === opt.value ? "text-[#FF7A1A]" : "text-cream/70"
                  }`}
                >
                  {opt.label}
                </div>
                <div className="mt-1 text-sm text-cream/40">{opt.desc}</div>
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="hw-attendees" className={labelClass}>
            NUMBER OF ATTENDEES *
          </label>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setAttendees(Math.max(1, attendees - 1))}
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-cream/20 text-xl text-cream/60 hover:border-[#FF7A1A] hover:text-[#FF7A1A] transition-colors"
              aria-label="Decrease attendees"
            >
              −
            </button>
            <input
              id="hw-attendees"
              type="number"
              min={1}
              max={10}
              value={attendees}
              onChange={(e) => {
                const v = parseInt(e.target.value, 10);
                if (v >= 1 && v <= 10) setAttendees(v);
              }}
              className="w-20 rounded-xl border border-cream/20 bg-cream/5 px-4 py-3 text-center text-cream font-[family-name:var(--font-anton)] text-2xl focus:border-[#FF7A1A] focus:outline-none focus:ring-1 focus:ring-[#FF7A1A] transition-colors"
            />
            <button
              type="button"
              onClick={() => setAttendees(Math.min(10, attendees + 1))}
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-cream/20 text-xl text-cream/60 hover:border-[#FF7A1A] hover:text-[#FF7A1A] transition-colors"
              aria-label="Increase attendees"
            >
              +
            </button>
            <div className="ml-auto text-right">
              <div className="font-[family-name:var(--font-anton)] text-2xl text-[#FF7A1A]">
                ₹{totalPrice}
              </div>
              <div className="text-xs text-cream/40">
                {attendees} × ₹{PRICE}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* More */}
      <h3 className="mb-5 mt-8 font-[family-name:var(--font-barlow-condensed)] text-lg font-extrabold tracking-[0.12em] text-[#FF7A1A]">
        ONE LAST THING
      </h3>

      <div className="space-y-4">
        <div>
          <label htmlFor="hw-source" className={labelClass}>
            HOW DID YOU HEAR ABOUT THIS?
          </label>
          <select
            id="hw-source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className={inputClass}
          >
            <option value="">Select</option>
            {SOURCES.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Checkboxes */}
      <div className="mt-8 space-y-3">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            required
            className="mt-1 h-5 w-5 rounded border-cream/20 bg-cream/5 accent-[#FF7A1A]"
          />
          <span className="text-sm text-cream/70">
            I understand this is a community event. I take full responsibility
            for my well-being and will not hold Miles &amp; People liable for
            any issues. Photos and videos from the event may be used for
            promotion. *
          </span>
        </label>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={whatsappOptin}
            onChange={(e) => setWhatsappOptin(e.target.checked)}
            className="mt-1 h-5 w-5 rounded border-cream/20 bg-cream/5 accent-[#FF7A1A]"
          />
          <span className="text-sm text-cream/70">
            Add me to the Miles &amp; People WhatsApp group for updates
          </span>
        </label>
      </div>

      <button
        type="submit"
        disabled={loading || !consent || !attendance || !gender}
        className="mt-8 w-full rounded-xl bg-[#FF7A1A] py-4 font-[family-name:var(--font-barlow-condensed)] text-xl font-extrabold tracking-[0.08em] text-[#0B0710] transition-colors hover:bg-[#FF8F3D] disabled:opacity-50 disabled:cursor-not-allowed min-h-[52px]"
      >
        {loading
          ? "REGISTERING..."
          : `GRAB EARLY BIRD — ₹${totalPrice}`}
      </button>

      <p className="mt-4 text-center text-xs text-cream/30">
        UPI payment QR will be shown after registration.
        Your spot is confirmed once payment is received.
      </p>
    </form>
  );
}
