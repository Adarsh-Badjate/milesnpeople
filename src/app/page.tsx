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
    status: "open" as const,
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
    <div className="min-h-screen bg-bg text-ink font-[family-name:var(--font-barlow)]">
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
                href={`/register/${nextRun.id}`}
                className="inline-block rounded-full bg-accent px-7 py-4 font-[family-name:var(--font-barlow-condensed)] text-xl font-extrabold tracking-[0.08em] text-white no-underline hover:bg-accent-hover transition-colors"
              >
                REGISTER FOR SUNDAY
              </a>
              <a
                href="#runs"
                className="inline-block rounded-full border-2 border-ink px-7 py-4 font-[family-name:var(--font-barlow-condensed)] text-xl font-extrabold tracking-[0.08em] text-ink no-underline hover:bg-ink hover:text-bg transition-colors"
              >
                SEE UPCOMING RUNS
              </a>
            </div>
          </div>

          {/* Next Run Card */}
          <div className="flex min-w-0 flex-1 basis-[400px] flex-col overflow-hidden rounded-[20px] border-2 border-ink bg-white">
            <div className="relative flex h-[220px] flex-col items-center justify-center bg-ink text-cream">
              {/* Decorative zigzag background */}
              <svg viewBox="205 272 390 260" fill="none" className="absolute inset-0 h-full w-full opacity-[0.06]" preserveAspectRatio="xMidYMid slice">
                <polyline points="240,500 312,305 399,460 487,290 564,515" stroke="#F4F2ED" strokeWidth="26" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <div className="relative z-10 text-center">
                <div className="font-[family-name:var(--font-barlow-condensed)] text-sm font-bold tracking-[0.3em] text-cream/50">
                  NEXT RUN
                </div>
                <div className="mt-1 font-[family-name:var(--font-anton)] text-[72px] leading-none text-cream">
                  {nextRun.week}
                </div>
                <div className="mt-1 font-[family-name:var(--font-barlow-condensed)] text-sm font-bold tracking-[0.2em] text-accent">
                  WEEK
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3.5 p-[22px_24px_24px]">
              <div className="font-[family-name:var(--font-anton)] text-4xl leading-none">
                {formatDate(nextRun.date)} · {nextRun.start_time}
              </div>

              <Countdown targetDate={`${nextRun.date}T05:30:00+05:30`} />

              <div className="grid grid-cols-[repeat(auto-fit,minmax(140px,1fr))] gap-[10px_16px] text-base">
                <div>
                  <div className="text-[13px] font-semibold tracking-[0.16em] text-muted">LOCATION</div>
                  {nextRun.map_url ? (
                    <a href={nextRun.map_url} target="_blank" rel="noopener noreferrer" className="text-ink underline hover:text-accent transition-colors">
                      {nextRun.meeting_point} ↗
                    </a>
                  ) : nextRun.meeting_point}
                </div>
                <div>
                  <div className="text-[13px] font-semibold tracking-[0.16em] text-muted">DISTANCE</div>
                  {nextRun.distances.replace(",", " / ")}
                </div>
                <div>
                  <div className="text-[13px] font-semibold tracking-[0.16em] text-muted">ENTRY</div>
                  Free
                </div>
                <div>
                  <div className="text-[13px] font-semibold tracking-[0.16em] text-muted">PARTNER</div>
                  {nextRun.partner || "—"}
                </div>
              </div>

              <a
                href={`/register/${nextRun.id}`}
                className="block rounded-xl bg-ink py-[15px] text-center font-[family-name:var(--font-barlow-condensed)] text-[19px] font-extrabold tracking-[0.1em] text-white no-underline hover:bg-accent transition-colors"
              >
                REGISTER NOW
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="relative -rotate-[1.2deg] bg-accent py-3 text-white text-xl">
        <Marquee items={["3K", "5K", "EVERY PACE WELCOME", "SUNDAYS · 5:30 AM", "NOBODY RUNS ALONE"]} />
      </div>

      {/* Upcoming Runs */}
      <section id="runs" aria-labelledby="runs-title" className="border-t border-border">
        <div className="mx-auto max-w-[1200px] px-5 py-16">
          <h2 id="runs-title" className="mb-7 font-[family-name:var(--font-anton)] text-5xl font-normal leading-none">
            UPCOMING RUNS
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(280px,1fr))] gap-5">
            {runs.map((run) => (
              <div key={run.id} className="flex flex-col gap-2.5 rounded-2xl border border-border bg-white p-[22px]">
                <div className={`font-[family-name:var(--font-barlow-condensed)] text-[15px] font-extrabold tracking-[0.2em] ${run.status === "open" ? "text-accent" : "text-muted"}`}>
                  WEEK {run.week} · {run.status === "open" ? "OPEN" : run.status === "closed" ? "CLOSED" : "COMING SOON"}
                </div>
                <div className="font-[family-name:var(--font-anton)] text-[30px] leading-none">{formatDate(run.date)}</div>
                <div className="text-[#3D3D3D]">{run.start_time} · {run.distances.replace(",", " / ")} · {run.meeting_point}</div>
                {run.status === "open" ? (
                  <a href={`/register/${run.id}`} className="mt-1.5 self-start rounded-full bg-accent px-[18px] py-[11px] font-[family-name:var(--font-barlow-condensed)] font-extrabold tracking-[0.08em] text-white no-underline hover:bg-accent-hover transition-colors">
                    REGISTER
                  </a>
                ) : (
                  <button type="button" disabled className="mt-1.5 self-start rounded-full border-2 border-border bg-white px-[18px] py-[11px] font-[family-name:var(--font-barlow-condensed)] text-[17px] font-extrabold tracking-[0.08em] text-muted cursor-not-allowed">
                    NOTIFY ME
                  </button>
                )}
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

      {/* Partners */}
      <section id="partners" aria-labelledby="partners-title" className="border-t border-border bg-bg">
        <div className="mx-auto max-w-[1200px] px-5 py-14">
          <h2 id="partners-title" className="mb-6 font-[family-name:var(--font-barlow-condensed)] text-lg font-extrabold tracking-[0.28em] text-muted">RUN WITH OUR PARTNERS</h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(180px,1fr))] gap-4">
            {[
              { name: "Salt n Pepper", logo: "/partners/salt-n-pepper.png" },
              { name: "Starbucks", logo: "/partners/starbucks.png" },
              { name: "Meridian Ice Cream", logo: "/partners/meridian.png" },
            ].map((partner) => (
              <div key={partner.name} className="flex h-24 items-center justify-center rounded-xl border border-[#D9D6CF] bg-white p-4">
                <img src={partner.logo} alt={partner.name} className="max-h-16 max-w-[140px] object-contain" />
              </div>
            ))}
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="flex h-24 items-center justify-center rounded-xl border border-dashed border-[#BDB9B0] text-muted hover:border-accent hover:text-accent transition-colors font-semibold">
              Partner with us →
            </a>
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
                  <span className="ml-4 text-muted transition-transform group-open:rotate-45">+</span>
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
