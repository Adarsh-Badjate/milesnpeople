import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { Logo } from "@/components/Logo";
import { Marquee } from "@/components/Marquee";
import { EventRegistrationForm } from "./EventRegistrationForm";

export const metadata: Metadata = {
  title: "MNP Sundowner — Run, Jam & Kojagiri | Miles & People",
  description:
    "An evening of music, moonlight, and community. Join MilesNPeople's 4th community event in Chhatrapati Sambhajinagar. Sunday, 25 October 2026. ₹200 entry includes Kojagiri milk.",
  openGraph: {
    title: "MNP Sundowner — Run, Jam & Kojagiri | Miles & People",
    description:
      "Three community runs. One BIG community experience. Music, moonlight, new connections, and Kojagiri vibes. ₹200 entry.",
  },
};

export default function SundownerEventPage() {
  return (
    <div className="min-h-screen bg-dark text-cream font-[family-name:var(--font-barlow)]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-cream/10 bg-dark/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-4">
          <a href="/">
            <Logo stroke="#F4F2ED" className="text-cream" />
          </a>
          <div className="flex items-center gap-4">
            <a
              href="/"
              className="hidden md:inline font-[family-name:var(--font-barlow-condensed)] font-bold tracking-[0.06em] text-cream/60 no-underline hover:text-cream transition-colors"
            >
              Home
            </a>
            <a
              href="#register"
              className="inline-block rounded-full bg-gold px-5 py-2.5 font-[family-name:var(--font-barlow-condensed)] text-base font-extrabold tracking-[0.08em] text-dark no-underline hover:bg-gold-hover transition-colors"
            >
              REGISTER
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section aria-labelledby="hero-title" className="relative overflow-hidden">
        {/* Moon glow background */}
        <div className="absolute top-[-20%] right-[-10%] h-[600px] w-[600px] rounded-full bg-gold/5 blur-[120px]" />
        <div className="absolute bottom-[-30%] left-[-10%] h-[400px] w-[400px] rounded-full bg-gold/3 blur-[100px]" />

        <div className="relative mx-auto max-w-[1200px] px-5 py-16 md:py-24">
          <div className="max-w-[800px]">
            <div className="font-[family-name:var(--font-barlow-condensed)] text-sm font-bold tracking-[0.3em] text-gold">
              COMMUNITY EVENT #04 · 25 OCT 2026
            </div>

            <h1
              id="hero-title"
              className="animate-slide-up mt-4 font-[family-name:var(--font-anton)] text-[clamp(42px,8vw,96px)] font-normal leading-[0.92] tracking-[0.005em]"
            >
              CSN, LET&apos;S JAM{" "}
              <span className="text-gold">UNDER THE MOON.</span>
            </h1>

            <p className="animate-slide-up-delay mt-5 font-[family-name:var(--font-barlow-condensed)] text-[clamp(20px,2.5vw,28px)] font-bold tracking-[0.02em] text-cream/80">
              Three community runs. One BIG community experience.
            </p>

            <p className="mt-4 max-w-[600px] text-lg text-cream/60">
              An evening of music, moonlight, new connections, and Kojagiri
              vibes. Run with us, or skip the run and join the jamming directly.
            </p>

            {/* Event meta */}
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-[family-name:var(--font-barlow-condensed)] text-base font-bold tracking-[0.08em] text-cream/50">
              <span>
                <span className="text-gold">DATE</span>{" "}
                <span className="text-cream">SUN, 25 OCT 2026</span>
              </span>
              <span>
                <span className="text-gold">TIME</span>{" "}
                <span className="text-cream">6 PM — 9 PM</span>
              </span>
              <span>
                <span className="text-gold">CITY</span>{" "}
                <span className="text-cream">CHH. SAMBHAJINAGAR</span>
              </span>
              <span>
                <span className="text-gold">ENTRY</span>{" "}
                <span className="text-cream">₹200 / PERSON</span>
              </span>
              <span>
                <span className="text-gold">VENUE</span>{" "}
                <span className="text-cream/50">COMING SOON</span>
              </span>
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#register"
                className="inline-block rounded-full bg-gold px-8 py-4 font-[family-name:var(--font-barlow-condensed)] text-xl font-extrabold tracking-[0.08em] text-dark no-underline hover:bg-gold-hover transition-colors"
              >
                JOIN THE EXPERIENCE — ₹200
              </a>
              <a
                href="#register"
                className="inline-block rounded-full border-2 border-cream/30 px-8 py-4 font-[family-name:var(--font-barlow-condensed)] text-xl font-extrabold tracking-[0.08em] text-cream no-underline hover:border-gold hover:text-gold transition-colors"
              >
                JUST HERE TO JAM?
              </a>
            </div>
          </div>

          {/* Decorative moon */}
          <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:block">
            <div className="relative h-[280px] w-[280px]">
              <div className="absolute inset-0 rounded-full border border-gold/20" />
              <div className="absolute inset-4 rounded-full border border-gold/10" />
              <div className="absolute inset-8 rounded-full bg-gold/5" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-[family-name:var(--font-anton)] text-6xl text-gold/20">
                  ●
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="relative bg-gold py-3 text-dark text-xl font-semibold">
        <Marquee
          items={[
            "SUNDOWNER RUN",
            "OPEN JAMMING",
            "KOJAGIRI PURNIMA",
            "₹200 ENTRY",
            "25 OCT · CSN",
            "MUSIC · MOONLIGHT · MEMORIES",
          ]}
        />
      </div>

      {/* Event Experience */}
      <section
        id="experience"
        aria-labelledby="experience-title"
        className="border-t border-cream/10"
      >
        <div className="mx-auto max-w-[1200px] px-5 py-16 md:py-24">
          <div className="mb-3 font-[family-name:var(--font-barlow-condensed)] text-sm font-bold tracking-[0.3em] text-gold">
            THE EVENING UNFOLDS
          </div>
          <h2
            id="experience-title"
            className="mb-10 font-[family-name:var(--font-anton)] text-[clamp(36px,5vw,56px)] font-normal leading-[0.95]"
          >
            THREE PARTS.{" "}
            <span className="text-gold">ONE EXPERIENCE.</span>
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {/* Sundowner Run */}
            <div className="group relative flex flex-col gap-4 rounded-2xl border border-cream/10 bg-cream/[0.03] p-7 transition-colors hover:border-gold/30">
              <div className="font-[family-name:var(--font-anton)] text-5xl text-gold/30 transition-colors group-hover:text-gold/50">
                01
              </div>
              <h3 className="font-[family-name:var(--font-barlow-condensed)] text-2xl font-extrabold tracking-[0.06em]">
                SUNDOWNER RUN
              </h3>
              <p className="text-cream/60">
                A relaxed, inclusive 3K community run as the sun goes down.
                Participation is completely optional — come if you want to move,
                or skip it and join us for the music.
              </p>
              <div className="mt-auto pt-2 font-[family-name:var(--font-barlow-condensed)] text-sm font-bold tracking-[0.12em] text-gold/60">
                OPTIONAL
              </div>
            </div>

            {/* Open Jamming */}
            <div className="group relative flex flex-col gap-4 rounded-2xl border border-gold/20 bg-gold/[0.04] p-7 transition-colors hover:border-gold/40">
              <div className="font-[family-name:var(--font-anton)] text-5xl text-gold/50">
                02
              </div>
              <h3 className="font-[family-name:var(--font-barlow-condensed)] text-2xl font-extrabold tracking-[0.06em]">
                OPEN JAMMING
              </h3>
              <p className="text-cream/60">
                The main attraction. Music, singing, instruments, and real
                community connection. Whether you play or just vibe — this is
                your evening.
              </p>
              <div className="mt-auto pt-2 font-[family-name:var(--font-barlow-condensed)] text-sm font-bold tracking-[0.12em] text-gold">
                ★ MAIN EVENT
              </div>
            </div>

            {/* Kojagiri Celebration */}
            <div className="group relative flex flex-col gap-4 rounded-2xl border border-cream/10 bg-cream/[0.03] p-7 transition-colors hover:border-gold/30">
              <div className="font-[family-name:var(--font-anton)] text-5xl text-gold/30 transition-colors group-hover:text-gold/50">
                03
              </div>
              <h3 className="font-[family-name:var(--font-barlow-condensed)] text-2xl font-extrabold tracking-[0.06em]">
                KOJAGIRI CELEBRATION
              </h3>
              <p className="text-cream/60">
                Celebrate the full-moon occasion together. Kojagiri milk is
                included with your ₹200 entry — a tradition shared under the
                open sky.
              </p>
              <div className="mt-auto pt-2 font-[family-name:var(--font-barlow-condensed)] text-sm font-bold tracking-[0.12em] text-gold/60">
                INCLUDED IN ENTRY
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Join */}
      <section aria-labelledby="why-title" className="border-t border-cream/10">
        <div className="mx-auto max-w-[1200px] px-5 py-16 md:py-24">
          <div className="mx-auto max-w-[720px] text-center">
            <h2
              id="why-title"
              className="mb-8 font-[family-name:var(--font-anton)] text-[clamp(36px,5vw,56px)] font-normal leading-[0.95]"
            >
              YOU DON&apos;T NEED TO{" "}
              <span className="text-gold">BE A RUNNER.</span>
            </h2>
            <div className="space-y-6 text-lg text-cream/70">
              <p>
                This isn&apos;t a race. It&apos;s a community evening. Come for
                the music. Come for the moonlight. Come because your friend
                dragged you — and leave glad they did.
              </p>
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                text: "Come directly for the jamming — the run is optional.",
              },
              {
                text: "Attend solo or bring your friends. Everyone's welcome.",
              },
              {
                text: "It's community-led, not a competition. No experience needed.",
              },
              {
                text: "₹200 per person. Includes event access and Kojagiri milk.",
              },
            ].map((item) => (
              <div
                key={item.text}
                className="rounded-xl border border-cream/10 bg-cream/[0.03] px-5 py-5"
              >
                <p className="text-cream/80">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration */}
      <section
        id="register"
        aria-labelledby="register-title"
        className="border-t border-cream/10"
      >
        <div className="mx-auto max-w-[1200px] px-5 py-16 md:py-24">
          <div className="mx-auto max-w-[560px]">
            <div className="mb-2 text-center font-[family-name:var(--font-barlow-condensed)] text-sm font-bold tracking-[0.3em] text-gold">
              SECURE YOUR SPOT
            </div>
            <h2
              id="register-title"
              className="mb-3 text-center font-[family-name:var(--font-anton)] text-[clamp(36px,5vw,52px)] font-normal leading-[0.95]"
            >
              REGISTER NOW.
            </h2>
            <p className="mb-10 text-center text-cream/50">
              Sun, 25 Oct · 6 PM — 9 PM · ₹200 per person · Venue details shared with registered
              participants
            </p>
            <EventRegistrationForm />
          </div>
        </div>
      </section>

      {/* Community / Trust */}
      <section
        aria-labelledby="community-title"
        className="border-t border-cream/10 bg-cream/[0.02]"
      >
        <div className="mx-auto max-w-[1200px] px-5 py-16 md:py-20">
          <div className="mx-auto max-w-[640px] text-center">
            <h2
              id="community-title"
              className="mb-4 font-[family-name:var(--font-anton)] text-[clamp(32px,4vw,48px)] font-normal leading-[0.95]"
            >
              BUILT BY{" "}
              <span className="text-gold">THE COMMUNITY.</span>
            </h2>
            <p className="text-lg text-cream/60">
              This is MilesNPeople&apos;s fourth community event. We started
              with Sunday morning runs — three of them — and now we&apos;re
              taking it further. Same spirit, bigger experience.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
              <div className="rounded-xl border border-cream/10 bg-cream/5 px-6 py-4 text-center">
                <div className="font-[family-name:var(--font-anton)] text-3xl text-gold">
                  03
                </div>
                <div className="mt-1 font-[family-name:var(--font-barlow-condensed)] text-sm font-bold tracking-[0.1em] text-cream/50">
                  COMMUNITY RUNS
                </div>
              </div>
              <div className="rounded-xl border border-cream/10 bg-cream/5 px-6 py-4 text-center">
                <div className="font-[family-name:var(--font-anton)] text-3xl text-gold">
                  04
                </div>
                <div className="mt-1 font-[family-name:var(--font-barlow-condensed)] text-sm font-bold tracking-[0.1em] text-cream/50">
                  THIS EVENT
                </div>
              </div>
            </div>
            <a
              href="https://www.instagram.com/milesnpeople/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block rounded-full border border-cream/20 px-6 py-3 font-[family-name:var(--font-barlow-condensed)] font-bold tracking-[0.08em] text-cream no-underline hover:border-gold hover:text-gold transition-colors"
            >
              FOLLOW US ON INSTAGRAM →
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section
        id="faq"
        aria-labelledby="faq-title"
        className="border-t border-cream/10"
      >
        <div className="mx-auto max-w-[820px] px-5 py-16 md:py-20">
          <h2
            id="faq-title"
            className="mb-8 font-[family-name:var(--font-anton)] text-5xl font-normal leading-none"
          >
            FAQ
          </h2>
          <div className="flex flex-col border-t border-cream/10">
            {[
              {
                q: "Do I have to participate in the run?",
                a: "No. The run is completely optional. You can come directly for the jamming session.",
              },
              {
                q: "Can I come only for jamming?",
                a: 'Yes! Select "Jamming Only" when you register. The open jamming is the main event.',
              },
              {
                q: "What does the ₹200 entry include?",
                a: "Event access (run and/or jamming) and Kojagiri milk.",
              },
              {
                q: "Where is the venue?",
                a: "The venue in Chhatrapati Sambhajinagar is being finalized. Venue details will be shared with registered participants.",
              },
              {
                q: "Can I bring friends?",
                a: "Absolutely. You can register for multiple people at once using the attendee count in the registration form.",
              },
              {
                q: "What should I bring?",
                a: "Comfortable clothes and a positive vibe. If you want to join the run, wear running shoes. Instruments are welcome if you'd like to jam.",
              },
            ].map((faq) => (
              <details
                key={faq.q}
                className="group border-b border-cream/10 py-[18px]"
              >
                <summary className="flex items-center justify-between text-[19px] font-semibold text-cream cursor-pointer">
                  {faq.q}
                  <span className="ml-4 text-cream/40 transition-transform group-open:rotate-180">
                    ▾
                  </span>
                </summary>
                <p className="mt-2 text-cream/60">{faq.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
