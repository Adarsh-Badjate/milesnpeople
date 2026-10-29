import { getRuns } from "@/lib/sheets";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Marquee } from "@/components/Marquee";
import { Countdown } from "@/components/Countdown";

export const dynamic = "force-dynamic";
export const revalidate = 60;

const FALLBACK_RUNS = [
  {
    id: "003",
    week: "003",
    title: "Community Run",
    date: "2026-10-18",
    start_time: "5:30 AM",
    meeting_point: "TBA",
    map_url: "",
    distances: "3K,5K",
    capacity: 50,
    status: "closed" as const,
    partner: "Meridian Ice Cream",
    partner_perk: "",
  },
];

async function getRunsData() {
  try {
    const runs = await getRuns();
    return runs.length > 0 ? runs : FALLBACK_RUNS;
  } catch {
    return FALLBACK_RUNS;
  }
}

function formatDate(dateStr: string) {
  try {
    const d = new Date(dateStr + "T00:00:00");
    return d.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" }).toUpperCase();
  } catch {
    return dateStr;
  }
}

export default async function HomePage() {
  const runs = await getRunsData();
  const nextRun = runs.find((r) => r.status === "open") || runs[0];

  return (
    <div className="min-h-screen overflow-x-hidden bg-bg text-ink font-[family-name:var(--font-barlow)]">
      <Header />

      {/* Hero */}
      <section aria-labelledby="hero-title">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-stretch gap-12 px-5 py-[72px] pb-16">
          <div className="flex min-w-0 flex-1 basis-[520px] flex-col justify-center gap-[22px]">
            <div className="font-[family-name:var(--font-barlow-condensed)] text-base font-bold tracking-[0.28em] text-muted">
              COMMUNITY RUN CLUB · CHH. SAMBHAJINAGAR
            </div>
            <h1
              id="hero-title"
              className="animate-slide-up m-0 font-[family-name:var(--font-anton)] text-[clamp(52px,7vw,104px)] font-normal leading-[0.95] tracking-[0.005em]"
            >
              COME FOR THE MILES.{" "}
              <span className="text-accent">STAY FOR THE PEOPLE.</span>
            </h1>
            <p className="animate-slide-up-delay m-0 max-w-[520px] text-xl text-[#3D3D3D]">
              Sunday morning community runs. 3K &amp; 5K. Every pace welcome.
              Register here in under a minute.
            </p>
            <div className="flex flex-wrap gap-3">
              <a
                href="/events/halloween-run-005"
                className="inline-block rounded-full bg-accent px-7 py-4 font-[family-name:var(--font-barlow-condensed)] text-xl font-extrabold tracking-[0.08em] text-white no-underline hover:bg-accent-hover transition-colors"
              >
                JOIN OUR NEXT EVENT
              </a>
              <a
                href="#runs"
                className="inline-block rounded-full border-2 border-ink px-7 py-4 font-[family-name:var(--font-barlow-condensed)] text-xl font-extrabold tracking-[0.08em] text-ink no-underline hover:bg-ink hover:text-bg transition-colors"
              >
                SEE PAST RUNS
              </a>
            </div>
          </div>

          {/* Next Event Card */}
          <div className="flex min-w-0 flex-1 basis-[400px] flex-col overflow-hidden rounded-[20px] border-2 border-ink bg-white">
            <div className="relative flex h-[220px] flex-col items-center justify-center bg-[#0A0A0A] text-cream">
              {/* Decorative pumpkin glow */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="h-[180px] w-[180px] rounded-full bg-[#FF7A1A]/15 blur-[40px]" />
              </div>
              <div className="relative z-10 text-center">
                <div className="font-[family-name:var(--font-barlow-condensed)] text-sm font-bold tracking-[0.3em] text-[#FF7A1A]">
                  WEEK 005 · 🎃
                </div>
                <div className="mt-2 font-[family-name:var(--font-anton)] text-[44px] leading-none text-cream">
                  HALLOWEEN RUN
                </div>
                <div className="mt-1 font-[family-name:var(--font-barlow-condensed)] text-base font-bold tracking-[0.1em] text-cream/50">
                  BIGGEST RUN · BIGGEST FUN
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3.5 p-[22px_24px_24px]">
              <div className="font-[family-name:var(--font-anton)] text-4xl leading-none">
                SUN, 1 NOV · 6 AM
              </div>

              <Countdown targetDate="2026-11-01T06:00:00+05:30" />

              <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-[10px_16px] text-base">
                <div>
                  <div className="text-[13px] font-semibold tracking-[0.16em] text-muted">VENUE</div>
                  Twist N Flavours
                </div>
                <div>
                  <div className="text-[13px] font-semibold tracking-[0.16em] text-muted">DISTANCE</div>
                  3K / 5K
                </div>
                <div>
                  <div className="text-[13px] font-semibold tracking-[0.16em] text-muted">ENTRY</div>
                  ₹99 early bird
                </div>
                <div>
                  <div className="text-[13px] font-semibold tracking-[0.16em] text-muted">INCLUDES</div>
                  Run · Games · Discounts
                </div>
              </div>

              <a
                href="/events/halloween-run-005"
                className="block rounded-xl bg-ink py-[15px] text-center font-[family-name:var(--font-barlow-condensed)] text-[19px] font-extrabold tracking-[0.1em] text-white no-underline hover:bg-accent transition-colors"
              >
                GRAB ₹99 EARLY BIRD
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Event Banner */}
      <section aria-labelledby="featured-event" className="bg-dark text-cream">
        <div className="mx-auto max-w-[1200px] px-5 py-12">
          <a
            href="/events/halloween-run-005"
            className="group block overflow-hidden rounded-2xl border border-[#FF7A1A]/25 bg-[#FF7A1A]/[0.05] p-8 md:p-10 no-underline transition-colors hover:border-[#FF7A1A]/50"
          >
            <div className="flex flex-wrap items-center justify-between gap-6">
              <div>
                <div className="font-[family-name:var(--font-barlow-condensed)] text-sm font-bold tracking-[0.3em] text-[#FF7A1A]">
                  WEEK 005 · SUN, 1 NOV 2026
                </div>
                <h2
                  id="featured-event"
                  className="mt-2 font-[family-name:var(--font-anton)] text-[clamp(28px,4vw,48px)] font-normal leading-[0.95] text-cream"
                >
                  MNP HALLOWEEN RUN — BIGGEST RUN, BIGGEST FUN
                </h2>
                <p className="mt-3 max-w-[520px] text-cream/60">
                  3K &amp; 5K run, crazy Halloween games, like-minded people, a bigger space, and special discounts on everything at Twist N Flavours. Early bird slots at just ₹99.
                </p>
              </div>
              <div className="flex flex-col items-end gap-3">
                <span className="inline-block rounded-full bg-[#FF7A1A] px-7 py-3.5 font-[family-name:var(--font-barlow-condensed)] text-lg font-extrabold tracking-[0.08em] text-[#0A0A0A] group-hover:bg-[#FF8F3D] transition-colors">
                  CLAIM ₹99 SPOT →
                </span>
                <span className="font-[family-name:var(--font-barlow-condensed)] text-sm font-bold tracking-[0.1em] text-cream/40">
                  CHH. SAMBHAJINAGAR · ₹99 EARLY BIRD
                </span>
              </div>
            </div>
          </a>
        </div>
      </section>

      {/* Marquee */}
      <div className="relative -rotate-[1.2deg] bg-accent py-3 text-white text-xl">
        <Marquee items={["3K", "5K", "EVERY PACE WELCOME", "SUNDAYS · 5:30 AM", "NOBODY RUNS ALONE"]} />
      </div>

      {/* Past Runs */}
      <section id="runs" aria-labelledby="runs-title" className="border-t border-border">
        <div className="mx-auto max-w-[1200px] px-5 py-16">
          <h2 id="runs-title" className="mb-7 font-[family-name:var(--font-anton)] text-5xl font-normal leading-none">
            PAST RUNS
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(320px,1fr))] gap-5">
            {runs.map((run) => (
              <div key={run.id} className="flex flex-col gap-2.5 rounded-2xl border border-border bg-white p-[22px]">
                <div className="font-[family-name:var(--font-barlow-condensed)] text-[15px] font-extrabold tracking-[0.2em] text-muted">
                  WEEK {run.week} · COMPLETED ✓
                </div>
                <div className="font-[family-name:var(--font-anton)] text-[30px] leading-none">{formatDate(run.date)}</div>
                <div className="text-[#3D3D3D]">{run.start_time} · {run.distances.replace(",", " / ")} · {run.meeting_point}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how" aria-labelledby="how-title" className="bg-ink text-cream">
        <div className="mx-auto max-w-[1200px] px-5 py-16">
          <h2 id="how-title" className="mb-7 font-[family-name:var(--font-anton)] text-5xl font-normal leading-none">
            HOW IT WORKS
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-5">
            {[
              { num: "01", title: "Register on the site", desc: "Pick your run and distance. Takes under a minute." },
              { num: "02", title: "Get your digital bib", desc: "Bib number, details and the WhatsApp group link land on your phone." },
              { num: "03", title: "Show up Sunday", desc: "Check in with your bib, run, then stay for the people." },
            ].map((step) => (
              <div key={step.num} className="flex flex-col gap-2.5 rounded-2xl border border-cream/20 p-6">
                <div className="font-[family-name:var(--font-anton)] text-[44px] leading-none text-accent-light">{step.num}</div>
                <div className="font-[family-name:var(--font-barlow-condensed)] text-2xl font-extrabold tracking-[0.04em]">{step.title}</div>
                <div className="text-cream/75">{step.desc}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Community — hidden until photos are available */}

      {/* Partners — scrolling marquee */}
      <section id="partners" aria-labelledby="partners-title" className="border-t border-border bg-bg overflow-hidden">
        <div className="mx-auto max-w-[1200px] px-5 pt-14 pb-4">
          <h2 id="partners-title" className="mb-6 font-[family-name:var(--font-barlow-condensed)] text-lg font-extrabold tracking-[0.28em] text-muted">RUN WITH OUR PARTNERS</h2>
        </div>
        <div className="relative py-8">
          <div className="animate-marquee-slow flex w-max items-center gap-16">
            {[
              { name: "Salt n Pepper", logo: "/partners/salt-n-pepper.png" },
              { name: "Starbucks", logo: "/partners/starbucks.png" },
              { name: "Meridian Ice Cream", logo: "/partners/meridian.png" },
              { name: "Your brand here?", logo: "" },
              { name: "Salt n Pepper", logo: "/partners/salt-n-pepper.png" },
              { name: "Starbucks", logo: "/partners/starbucks.png" },
              { name: "Meridian Ice Cream", logo: "/partners/meridian.png" },
              { name: "Your brand here?", logo: "" },
              { name: "Salt n Pepper", logo: "/partners/salt-n-pepper.png" },
              { name: "Starbucks", logo: "/partners/starbucks.png" },
              { name: "Meridian Ice Cream", logo: "/partners/meridian.png" },
              { name: "Your brand here?", logo: "" },
            ].map((partner, i) => (
              <div key={`${partner.name}-${i}`} className="flex-shrink-0">
                {partner.logo ? (
                  <img src={partner.logo} alt={partner.name} className="h-16 w-auto object-contain opacity-70 hover:opacity-100 transition-opacity grayscale hover:grayscale-0" />
                ) : (
                  <span className="font-[family-name:var(--font-barlow-condensed)] text-lg font-bold tracking-[0.08em] text-muted/50 italic">Your brand here?</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team CTA */}
      <section aria-labelledby="team-title" className="bg-accent text-white">
        <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-5 px-5 py-12">
          <div>
            <h2 id="team-title" className="m-0 font-[family-name:var(--font-anton)] text-[40px] font-normal leading-none">WANT TO BE PART OF THE TEAM?</h2>
            <div className="mt-2 font-[family-name:var(--font-barlow-condensed)] text-xl font-bold tracking-[0.08em]">Management · Content · Fitness</div>
          </div>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="rounded-full bg-ink px-[26px] py-[15px] font-[family-name:var(--font-barlow-condensed)] text-lg font-extrabold tracking-[0.08em] text-white no-underline hover:bg-dark transition-colors">APPLY / DM US</a>
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" aria-labelledby="faq-title" className="bg-bg">
        <div className="mx-auto max-w-[820px] px-5 py-16">
          <h2 id="faq-title" className="mb-6 font-[family-name:var(--font-anton)] text-5xl font-normal leading-none">FAQ</h2>
          <div className="flex flex-col border-t border-border">
            {[
              { q: "Is it free?", a: "Yes — community runs are completely free. Always." },
              { q: "I'm slow / a beginner. Can I join?", a: "Every pace is welcome. We have a 3K option and nobody gets left behind." },
              { q: "What should I bring?", a: "Water, comfortable shoes, and your digital bib on your phone." },
              { q: "Can I bring a friend?", a: "Absolutely! They just need to register separately so we have a bib for them." },
            ].map((faq) => (
              <details key={faq.q} className="border-b border-border py-[18px] group">
                <summary className="flex items-center justify-between text-[19px] font-semibold">
                  {faq.q}
                  <span className="ml-4 text-muted transition-transform group-open:rotate-180">▾</span>
                </summary>
                <p className="mt-2 text-[#3D3D3D]">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
