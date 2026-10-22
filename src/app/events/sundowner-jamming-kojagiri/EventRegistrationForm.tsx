"use client";

import { useState } from "react";

const SOURCES = [
  "Instagram",
  "WhatsApp",
  "Friend / word of mouth",
  "Poster / flyer",
  "Other",
];

const ATTENDANCE_OPTIONS = [
  { value: "Run + Jamming", label: "Run + Jamming", desc: "Join the sundowner run and the jamming session" },
  { value: "Jamming Only", label: "Jamming Only", desc: "Skip the run, come directly for the music" },
];

export function EventRegistrationForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [instagram, setInstagram] = useState("");
  const [attendance, setAttendance] = useState("");
  const [attendees, setAttendees] = useState(1);
  const [source, setSource] = useState("");
  const [consent, setConsent] = useState(false);
  const [whatsappOptin, setWhatsappOptin] = useState(true);

  const totalPrice = attendees * 200;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          run_id: "sundowner-004",
          name,
          whatsapp: phone,
          email,
          instagram,
          age_group: "",
          gender: "",
          distance: attendance,
          experience: String(attendees),
          emergency_name: "",
          emergency_phone: "",
          source,
          waiver: consent ? "true" : "false",
          whatsapp_optin: whatsappOptin,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      setSuccess(true);
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="rounded-2xl border border-gold/20 bg-gold/[0.04] p-8 md:p-10 text-center">
        <div className="font-[family-name:var(--font-anton)] text-5xl text-gold">
          YOU&apos;RE IN.
        </div>
        <p className="mt-4 text-lg text-cream/70">
          {attendees > 1
            ? `${attendees} spots reserved for ${name}.`
            : `Spot reserved for ${name}.`}
        </p>
        <div className="mt-6 rounded-xl border border-cream/10 bg-cream/5 p-5">
          <div className="font-[family-name:var(--font-barlow-condensed)] text-sm font-bold tracking-[0.12em] text-gold">
            WHAT&apos;S NEXT
          </div>
          <p className="mt-2 text-cream/60">
            Payment details and venue information will be shared on WhatsApp and
            email. Keep an eye on your messages.
          </p>
          <p className="mt-2 text-sm text-cream/40">
            Total: ₹{totalPrice} ({attendees} × ₹200)
          </p>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-4">
          <a
            href="https://www.instagram.com/milesnpeople/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-full border border-cream/20 px-6 py-3 font-[family-name:var(--font-barlow-condensed)] font-bold tracking-[0.08em] text-cream no-underline hover:border-gold hover:text-gold transition-colors"
          >
            FOLLOW ON INSTAGRAM
          </a>
          <a
            href="/"
            className="inline-block rounded-full border border-cream/20 px-6 py-3 font-[family-name:var(--font-barlow-condensed)] font-bold tracking-[0.08em] text-cream no-underline hover:border-cream/40 transition-colors"
          >
            BACK TO HOME
          </a>
        </div>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-cream/20 bg-cream/5 px-4 py-3 text-cream placeholder:text-cream/30 focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors [&_option]:bg-[#1a1a1a] [&_option]:text-cream";
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
      <h3 className="mb-5 font-[family-name:var(--font-barlow-condensed)] text-lg font-extrabold tracking-[0.12em] text-gold">
        ABOUT YOU
      </h3>

      <div className="space-y-4">
        <div>
          <label htmlFor="evt-name" className={labelClass}>
            FULL NAME *
          </label>
          <input
            id="evt-name"
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
          <label htmlFor="evt-email" className={labelClass}>
            EMAIL *
          </label>
          <input
            id="evt-email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="evt-phone" className={labelClass}>
            PHONE NUMBER *
          </label>
          <input
            id="evt-phone"
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
          <label htmlFor="evt-instagram" className={labelClass}>
            INSTAGRAM (OPTIONAL)
          </label>
          <input
            id="evt-instagram"
            type="text"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            placeholder="@yourusername"
            className={inputClass}
          />
        </div>
      </div>

      {/* Your Experience */}
      <h3 className="mb-5 mt-8 font-[family-name:var(--font-barlow-condensed)] text-lg font-extrabold tracking-[0.12em] text-gold">
        YOUR EXPERIENCE
      </h3>

      <div className="space-y-4">
        <div>
          <label className={labelClass}>ATTENDANCE PREFERENCE *</label>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {ATTENDANCE_OPTIONS.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setAttendance(opt.value)}
                className={`rounded-xl border-2 px-4 py-4 text-left transition-colors ${
                  attendance === opt.value
                    ? "border-gold bg-gold/10"
                    : "border-cream/20 hover:border-cream/40"
                }`}
              >
                <div
                  className={`font-[family-name:var(--font-barlow-condensed)] text-lg font-extrabold tracking-[0.04em] ${
                    attendance === opt.value ? "text-gold" : "text-cream/70"
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
          <label htmlFor="evt-attendees" className={labelClass}>
            NUMBER OF ATTENDEES *
          </label>
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={() => setAttendees(Math.max(1, attendees - 1))}
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-cream/20 text-xl text-cream/60 hover:border-gold hover:text-gold transition-colors"
              aria-label="Decrease attendees"
            >
              −
            </button>
            <input
              id="evt-attendees"
              type="number"
              min={1}
              max={10}
              value={attendees}
              onChange={(e) => {
                const v = parseInt(e.target.value, 10);
                if (v >= 1 && v <= 10) setAttendees(v);
              }}
              className="w-20 rounded-xl border border-cream/20 bg-cream/5 px-4 py-3 text-center text-cream font-[family-name:var(--font-anton)] text-2xl focus:border-gold focus:outline-none focus:ring-1 focus:ring-gold transition-colors"
            />
            <button
              type="button"
              onClick={() => setAttendees(Math.min(10, attendees + 1))}
              className="flex h-12 w-12 items-center justify-center rounded-xl border border-cream/20 text-xl text-cream/60 hover:border-gold hover:text-gold transition-colors"
              aria-label="Increase attendees"
            >
              +
            </button>
            <div className="ml-auto text-right">
              <div className="font-[family-name:var(--font-anton)] text-2xl text-gold">
                ₹{totalPrice}
              </div>
              <div className="text-xs text-cream/40">
                {attendees} × ₹200
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* More */}
      <h3 className="mb-5 mt-8 font-[family-name:var(--font-barlow-condensed)] text-lg font-extrabold tracking-[0.12em] text-gold">
        ONE LAST THING
      </h3>

      <div className="space-y-4">
        <div>
          <label htmlFor="evt-source" className={labelClass}>
            HOW DID YOU HEAR ABOUT THIS?
          </label>
          <select
            id="evt-source"
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
            className="mt-1 h-5 w-5 rounded border-cream/20 bg-cream/5 accent-gold"
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
            className="mt-1 h-5 w-5 rounded border-cream/20 bg-cream/5 accent-gold"
          />
          <span className="text-sm text-cream/70">
            Add me to the Miles &amp; People WhatsApp group for updates
          </span>
        </label>
      </div>

      <button
        type="submit"
        disabled={loading || !consent || !attendance}
        className="mt-8 w-full rounded-xl bg-gold py-4 font-[family-name:var(--font-barlow-condensed)] text-xl font-extrabold tracking-[0.08em] text-dark transition-colors hover:bg-gold-hover disabled:opacity-50 disabled:cursor-not-allowed min-h-[52px]"
      >
        {loading
          ? "REGISTERING..."
          : `REGISTER — ₹${totalPrice}`}
      </button>

      <p className="mt-4 text-center text-xs text-cream/30">
        Payment details will be shared after registration.
        Your spot is confirmed once payment is received.
      </p>
    </form>
  );
}
