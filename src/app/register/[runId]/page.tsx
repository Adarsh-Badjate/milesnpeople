import { getRunById, getRegistrationCount } from "@/lib/sheets";
import { RegisterForm } from "./RegisterForm";
import { Logo } from "@/components/Logo";

export const dynamic = "force-dynamic";
export const revalidate = 30;

const FALLBACK_RUN = {
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
};

export default async function RegisterPage({
  params,
}: {
  params: Promise<{ runId: string }>;
}) {
  const { runId } = await params;

  let run;
  let regCount = 0;
  try {
    run = await getRunById(runId);
    if (run) regCount = await getRegistrationCount(runId);
  } catch {
    run = null;
  }
  if (!run) run = FALLBACK_RUN;

  const spotsLeft = run.capacity - regCount;
  const isClosed = run.status !== "open" || spotsLeft <= 0;

  function formatDate(dateStr: string) {
    try {
      const d = new Date(dateStr + "T00:00:00");
      return d.toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  }

  return (
    <div className="min-h-screen bg-dark text-cream font-[family-name:var(--font-barlow)]">
      {/* Header */}
      <header className="border-b border-cream/10">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-4">
          <Logo stroke="#F4F2ED" className="text-cream" />
          <a
            href="/"
            className="font-[family-name:var(--font-barlow-condensed)] font-bold tracking-[0.06em] text-cream no-underline hover:text-accent transition-colors"
          >
            ← Back
          </a>
        </div>
      </header>

      <div className="mx-auto flex max-w-[1200px] flex-wrap gap-12 px-5 py-12">
        {/* Left: Run Summary + Live Bib Preview */}
        <div className="flex min-w-0 flex-1 basis-[400px] flex-col gap-8">
          <div>
            <div className="font-[family-name:var(--font-barlow-condensed)] text-sm font-bold tracking-[0.28em] text-accent">
              WEEK {run.week}
            </div>
            <h1 className="mt-2 font-[family-name:var(--font-anton)] text-[clamp(40px,5vw,72px)] font-normal leading-[0.95]">
              CLAIM YOUR BIB.
            </h1>
            <div className="mt-4 space-y-2 text-cream/70">
              <p>{formatDate(run.date)} · {run.start_time}</p>
              <p>{run.map_url ? (
                <a href={run.map_url} target="_blank" rel="noopener noreferrer" className="underline hover:text-accent transition-colors">{run.meeting_point} ↗</a>
              ) : run.meeting_point}</p>
              <p>{run.distances.replace(",", " / ")} · Free entry</p>
              {run.partner && <p>Partner: {run.partner}</p>}
              <p className="text-accent font-semibold">
                {spotsLeft > 0 ? `${spotsLeft} spots left` : "Full"}
              </p>
            </div>
          </div>

          {/* Live Bib Preview */}
          <div id="bib-preview" className="hidden lg:block">
            <div className="rounded-2xl border-2 border-cream/20 bg-cream/5 p-6 backdrop-blur">
              <div className="text-center font-[family-name:var(--font-barlow-condensed)] text-xs font-bold tracking-[0.3em] text-cream/40">
                YOUR BIB PREVIEW
              </div>
              <div className="mt-4 overflow-hidden rounded-xl bg-cream text-ink">
                <div className="bg-accent px-4 py-2 text-center font-[family-name:var(--font-barlow-condensed)] text-xs font-extrabold tracking-[0.2em] text-white">
                  MILES &amp; PEOPLE · WEEK {run.week}
                </div>
                <div className="p-6 text-center">
                  <div
                    id="bib-number-preview"
                    className="font-[family-name:var(--font-anton)] text-6xl leading-none text-ink"
                  >
                    ####
                  </div>
                  <div
                    id="bib-name-preview"
                    className="mt-2 font-[family-name:var(--font-barlow-condensed)] text-lg font-bold tracking-[0.1em] text-muted"
                  >
                    YOUR NAME
                  </div>
                  <div
                    id="bib-distance-preview"
                    className="mt-1 font-[family-name:var(--font-barlow-condensed)] text-sm font-bold tracking-[0.2em] text-accent"
                  >
                    — K
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Form */}
        <div className="min-w-0 flex-1 basis-[480px]">
          {isClosed ? (
            <div className="rounded-2xl border border-cream/10 bg-cream/5 p-8 text-center">
              <div className="font-[family-name:var(--font-anton)] text-4xl">
                REGISTRATIONS CLOSED
              </div>
              <p className="mt-4 text-cream/70">
                This run is {spotsLeft <= 0 ? "full" : "not yet open for registration"}.
              </p>
              <a
                href="/"
                className="mt-6 inline-block rounded-full bg-accent px-6 py-3 font-[family-name:var(--font-barlow-condensed)] font-extrabold tracking-[0.08em] text-white no-underline"
              >
                BACK TO HOME
              </a>
            </div>
          ) : (
            <RegisterForm
              runId={run.id}
              week={run.week}
              distances={run.distances.split(",")}
            />
          )}
        </div>
      </div>
    </div>
  );
}
