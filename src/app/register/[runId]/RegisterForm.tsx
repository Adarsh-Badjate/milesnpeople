"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const AGE_GROUPS = ["Under 18", "18–24", "25–34", "35–44", "45–54", "55+"];
const EXPERIENCE = [
  "First time running",
  "A few times",
  "Regular runner",
  "Marathon / competitive",
];
const SOURCES = [
  "Instagram",
  "WhatsApp",
  "Friend / word of mouth",
  "Poster / flyer",
  "Other",
];

export function RegisterForm({
  runId,
  week,
  distances,
}: {
  runId: string;
  week: string;
  distances: string[];
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [email, setEmail] = useState("");
  const [instagram, setInstagram] = useState("");
  const [ageGroup, setAgeGroup] = useState("");
  const [gender, setGender] = useState("");
  const [distance, setDistance] = useState("");
  const [experience, setExperience] = useState("");
  const [emergencyName, setEmergencyName] = useState("");
  const [emergencyPhone, setEmergencyPhone] = useState("");
  const [source, setSource] = useState("");
  const [waiver, setWaiver] = useState(false);
  const [whatsappOptin, setWhatsappOptin] = useState(true);

  // Update live bib preview
  useEffect(() => {
    const nameEl = document.getElementById("bib-name-preview");
    const distEl = document.getElementById("bib-distance-preview");
    if (nameEl) nameEl.textContent = name.trim().toUpperCase() || "YOUR NAME";
    if (distEl) distEl.textContent = distance || "— K";
  }, [name, distance]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          run_id: runId,
          name,
          whatsapp,
          email,
          instagram,
          age_group: ageGroup,
          gender,
          distance,
          experience,
          emergency_name: emergencyName,
          emergency_phone: emergencyPhone,
          source,
          waiver: waiver ? "true" : "false",
          whatsapp_optin: whatsappOptin,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        setError(data.error || "Something went wrong");
        setLoading(false);
        return;
      }

      router.push(
        `/register/${runId}/done?bib=${data.bib}&name=${encodeURIComponent(data.name)}&week=${week}&distance=${distance}`
      );
    } catch {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  const inputClass =
    "w-full rounded-xl border border-cream/20 bg-cream/5 px-4 py-3 text-cream placeholder:text-cream/30 focus:border-accent focus:outline-none focus:ring-1 focus:ring-accent transition-colors [&_option]:bg-[#1a1a1a] [&_option]:text-cream";
  const labelClass =
    "block mb-1.5 font-[family-name:var(--font-barlow-condensed)] text-sm font-bold tracking-[0.12em] text-cream/60";

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-cream/10 bg-cream/5 p-6 md:p-8"
    >
      {error && (
        <div className="mb-6 rounded-xl bg-red-500/10 border border-red-500/30 px-4 py-3 text-red-400 text-sm">
          {error}
        </div>
      )}

      {/* About You */}
      <h2 className="mb-5 font-[family-name:var(--font-barlow-condensed)] text-lg font-extrabold tracking-[0.12em] text-accent">
        ABOUT YOU
      </h2>

      <div className="space-y-4">
        <div>
          <label htmlFor="name" className={labelClass}>NAME *</label>
          <input
            id="name"
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
          <label htmlFor="whatsapp" className={labelClass}>WHATSAPP NUMBER *</label>
          <input
            id="whatsapp"
            type="tel"
            required
            pattern="[6-9][0-9]{9}"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value.replace(/\D/g, "").slice(0, 10))}
            placeholder="10-digit mobile number"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="email" className={labelClass}>EMAIL *</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="instagram" className={labelClass}>INSTAGRAM (OPTIONAL)</label>
          <input
            id="instagram"
            type="text"
            value={instagram}
            onChange={(e) => setInstagram(e.target.value)}
            placeholder="@yourusername"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="age_group" className={labelClass}>AGE GROUP *</label>
          <select
            id="age_group"
            required
            value={ageGroup}
            onChange={(e) => setAgeGroup(e.target.value)}
            className={inputClass}
          >
            <option value="">Select</option>
            {AGE_GROUPS.map((ag) => (
              <option key={ag} value={ag}>{ag}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="gender" className={labelClass}>GENDER (OPTIONAL)</label>
          <select
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            className={inputClass}
          >
            <option value="">Prefer not to say</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Non-binary">Non-binary</option>
          </select>
        </div>
      </div>

      {/* Your Run */}
      <h2 className="mb-5 mt-8 font-[family-name:var(--font-barlow-condensed)] text-lg font-extrabold tracking-[0.12em] text-accent">
        YOUR RUN
      </h2>

      <div className="space-y-4">
        <div>
          <label className={labelClass}>DISTANCE *</label>
          <div className="flex gap-3">
            {distances.map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => setDistance(d.trim())}
                className={`flex-1 rounded-xl border-2 px-4 py-4 text-center font-[family-name:var(--font-anton)] text-3xl transition-colors ${
                  distance === d.trim()
                    ? "border-accent bg-accent/20 text-accent"
                    : "border-cream/20 text-cream/50 hover:border-cream/40"
                }`}
              >
                {d.trim()}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="experience" className={labelClass}>HOW OFTEN DO YOU RUN? *</label>
          <select
            id="experience"
            required
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            className={inputClass}
          >
            <option value="">Select</option>
            {EXPERIENCE.map((exp) => (
              <option key={exp} value={exp}>{exp}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Safety */}
      <h2 className="mb-5 mt-8 font-[family-name:var(--font-barlow-condensed)] text-lg font-extrabold tracking-[0.12em] text-accent">
        SAFETY
      </h2>

      <div className="space-y-4">
        <div>
          <label htmlFor="emergency_name" className={labelClass}>EMERGENCY CONTACT NAME *</label>
          <input
            id="emergency_name"
            type="text"
            required
            value={emergencyName}
            onChange={(e) => setEmergencyName(e.target.value)}
            placeholder="Contact name"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="emergency_phone" className={labelClass}>EMERGENCY CONTACT PHONE *</label>
          <input
            id="emergency_phone"
            type="tel"
            required
            pattern="[6-9][0-9]{9}"
            value={emergencyPhone}
            onChange={(e) => setEmergencyPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
            placeholder="10-digit mobile number"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="source" className={labelClass}>HOW DID YOU HEAR ABOUT US?</label>
          <select
            id="source"
            value={source}
            onChange={(e) => setSource(e.target.value)}
            className={inputClass}
          >
            <option value="">Select</option>
            {SOURCES.map((s) => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Checkboxes */}
      <div className="mt-8 space-y-3">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={waiver}
            onChange={(e) => setWaiver(e.target.checked)}
            required
            className="mt-1 h-5 w-5 rounded border-cream/20 bg-cream/5 accent-accent"
          />
          <span className="text-sm text-cream/70">
            I understand this is a community run. I take full responsibility for my health and fitness, and I will not hold Miles &amp; People liable for any injury. *
          </span>
        </label>

        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={whatsappOptin}
            onChange={(e) => setWhatsappOptin(e.target.checked)}
            className="mt-1 h-5 w-5 rounded border-cream/20 bg-cream/5 accent-accent"
          />
          <span className="text-sm text-cream/70">
            Add me to the Miles &amp; People WhatsApp group for updates
          </span>
        </label>
      </div>

      <button
        type="submit"
        disabled={loading || !waiver || !distance}
        className="mt-8 w-full rounded-xl bg-accent py-4 font-[family-name:var(--font-barlow-condensed)] text-xl font-extrabold tracking-[0.08em] text-white transition-colors hover:bg-accent-hover disabled:opacity-50 disabled:cursor-not-allowed min-h-[52px]"
      >
        {loading ? "REGISTERING..." : "CONFIRM MY SPOT"}
      </button>
    </form>
  );
}
