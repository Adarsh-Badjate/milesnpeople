import type { Metadata } from "next";
import Link from "next/link";
import { Footer } from "@/components/Footer";
import { Logo } from "@/components/Logo";
import { Marquee } from "@/components/Marquee";
import { Countdown } from "@/components/Countdown";
import { EventRegistrationForm } from "./EventRegistrationForm";

export const metadata: Metadata = {
  title: "MNP Halloween Run — Biggest Run, Biggest Fun | Miles & People",
  description:
    "3K & 5K Halloween run in Chhatrapati Sambhajinagar. Crazy Halloween games, like-minded people, and Twist N Flavours breakfast discounts. Sunday, 1 November 2026. Early bird ₹99.",
  openGraph: {
    title: "MNP Halloween Run — Biggest Run, Biggest Fun",
    description:
      "3K & 5K run + crazy Halloween games + breakfast discounts at Twist N Flavours. Sunday, 1 Nov. Early bird slots at just ₹99.",
  },
};

export default function HalloweenRunPage() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-[#0B0710] text-cream font-[family-name:var(--font-barlow)]">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-cream/10 bg-[#0B0710]/95 backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between px-5 py-4">
          <Link href="/">
            <Logo stroke="#F4F2ED" className="text-cream" />
          </Link>
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="hidden md:inline font-[family-name:var(--font-barlow-condensed)] font-bold tracking-[0.06em] text-cream/60 no-underline hover:text-cream transition-colors"
            >
              Home
            </Link>
            <a
              href="#register"
              className="inline-block rounded-full bg-[#FF7A1A] px-5 py-2.5 font-[family-name:var(--font-barlow-condensed)] text-base font-extrabold tracking-[0.08em] text-[#0B0710] no-underline hover:bg-[#FF8F3D] transition-colors"
            >
              GRAB ₹99 SPOT
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section aria-labelledby="hero-title" className="relative overflow-hidden">
        {/* Fog + glow */}
        <div className="absolute top-[-25%] right-[-15%] h-[620px] w-[620px] rounded-full bg-[#7C3AED]/20 blur-[140px]" />
        <div className="absolute bottom-[-30%] left-[-15%] h-[480px] w-[480px] rounded-full bg-[#FF7A1A]/15 blur-[120px]" />

        <div className="relative mx-auto max-w-[1200px] px-5 py-16 md:py-24">
          <div className="max-w-[820px]">
            <div className="inline-flex items-center gap-2 rounded-full border border-[#FF7A1A]/40 bg-[#FF7A1A]/10 px-4 py-1.5 font-[family-name:var(--font-barlow-condensed)] text-sm font-bold tracking-[0.2em] text-[#FF7A1A]">
              <span className="h-2 w-2 animate-pulse rounded-full bg-[#FF7A1A]" />
              WEEK 005 · EARLY BIRD SLOTS LIVE
            </div>

            <h1
              id="hero-title"
              className="animate-slide-up mt-5 font-[family-name:var(--font-anton)] text-[clamp(46px,9vw,112px)] font-normal leading-[0.9] tracking-[0.005em]"
            >
              BIGGEST RUN.{" "}
              <span className="animate-flicker text-[#FF7A1A]">BIGGEST FUN.</span>
            </h1>

            <p className="animate-slide-up-delay mt-5 font-[family-name:var(--font-barlow-condensed)] text-[clamp(20px,2.5vw,30px)] font-bold tracking-[0.02em] text-cream/85">
              The MNP Halloween Run — 3K &amp; 5K this Sunday.
            </p>

            <p className="mt-4 max-w-[620px] text-lg text-cream/60">
              Run through the morning with the craziest crowd in CSN, then stay
              for wild Halloween games, new friends, and breakfast deals at
              Twist N Flavours. Costumes are optional. Fun is not.
            </p>

            {/* Event meta */}
            <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 font-[family-name:var(--font-barlow-condensed)] text-base font-bold tracking-[0.08em] text-cream/50">
              <span>
                <span className="text-[#FF7A1A]">DATE</span>{" "}
                <span className="text-cream">SUN, 1 NOV 2026</span>
              </span>
              <span>
                <span className="text-[#FF7A1A]">TIME</span>{" "}
                <span className="text-cream">6:00 AM</span>
              </span>
              <span>
                <span className="text-[#FF7A1A]">DISTANCE</span>{" "}
                <span className="text-cream">3K / 5K</span>
              </span>
              <span>
                <span className="text-[#FF7A1A]">CITY</span>{" "}
                <span className="text-cream">CHH. SAMBHAJINAGAR</span>
              </span>
              <span>
                <span className="text-[#FF7A1A]">ENTRY</span>{" "}
                <span className="text-cream">
                  ₹99 <span className="text-[#FF7A1A]/70">(EARLY BIRD)</span>
                </span>
              </span>
            </div>

            {/* Countdown */}
            <div className="mt-8 max-w-[420px] rounded-2xl border border-cream/10 bg-cream/[0.03] p-5">
              <div className="mb-3 font-[family-name:var(--font-barlow-condensed)] text-sm font-bold tracking-[0.2em] text-cream/50">
                FLAG-OFF IN
              </div>
              <Countdown targetDate="2026-11-01T06:00:00+05:30" dark />
            </div>

            {/* CTAs */}
            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href="#register"
                className="inline-block rounded-full bg-[#FF7A1A] px-8 py-4 font-[family-name:var(--font-barlow-condensed)] text-xl font-extrabold tracking-[0.08em] text-[#0B0710] no-underline shadow-[0_0_40px_rgba(255,122,26,0.35)] hover:bg-[#FF8F3D] transition-colors"
              >
                CLAIM EARLY BIRD — ₹99
              </a>
              <a
                href="#experience"
                className="inline-block rounded-full border-2 border-cream/30 px-8 py-4 font-[family-name:var(--font-barlow-condensed)] text-xl font-extrabold tracking-[0.08em] text-cream no-underline hover:border-[#FF7A1A] hover:text-[#FF7A1A] transition-colors"
              >
                WHAT&apos;S HAPPENING?
              </a>
            </div>
          </div>

          {/* Floating pumpkin */}
          <div
            aria-hidden="true"
            className="animate-spooky-float absolute right-10 top-1/2 hidden -translate-y-1/2 xl:block"
          >
            <div className="text-[200px] leading-none drop-shadow-[0_0_60px_rgba(255,122,26,0.45)]">
              🎃
            </div>
          </div>
        </div>
      </section>

      {/* Marquee */}
      <div className="relative -rotate-[1deg] bg-[#FF7A1A] py-3 text-[#0B0710] text-xl font-semibold">
        <Marquee
          items={[
            "BIGGEST RUN",
            "BIGGEST FUN",
            "3K & 5K",
            "CRAZY HALLOWEEN GAMES",
            "TWIST N FLAVOURS DEALS",
            "₹99 EARLY BIRD",
            "SUN 1 NOV · CSN",
            "COSTUMES WELCOME",
          ]}
        />
      </div>

      {/* Experience */}
      <section
        id="experience"
        aria-labelledby="experience-title"
        className="border-t border-cream/10"
      >
        <div className="mx-auto max-w-[1200px] px-5 py-16 md:py-24">
          <div className="mb-3 font-[family-name:var(--font-barlow-condensed)] text-sm font-bold tracking-[0.3em] text-[#FF7A1A]">
            THE MORNING UNFOLDS
          </div>
          <h2
            id="experience-title"
            className="mb-10 font-[family-name:var(--font-anton)] text-[clamp(36px,5vw,56px)] font-normal leading-[0.95]"
          >
            RUN. PLAY.{" "}
            <span className="text-[#FF7A1A]">FEAST.</span>
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                n: "01",
                title: "THE HALLOWEEN RUN",
                text: "Pick your distance — 3K or 5K. Every pace welcome, walkers too. Run it in a costume if you dare.",
                tag: "3K · 5K",
                featured: false,
              },
              {
                n: "02",
                title: "CRAZY HALLOWEEN GAMES",
                text: "Post-run madness. Spooky games, silly challenges, and the kind of chaos you'll be talking about all week.",
                tag: "★ MAIN EVENT",
                featured: true,
              },
              {
                n: "03",
                title: "BREAKFAST AT TWIST N FLAVOURS",
                text: "Refuel after the run. Every registered runner gets a discount on breakfast and beverages at Twist N Flavours.",
                tag: "EXCLUSIVE DISCOUNT",
                featured: false,
              },
            ].map((card) => (
              <div
                key={card.n}
                className={`group relative flex flex-col gap-4 rounded-2xl border p-7 transition-colors ${
                  card.featured
                    ? "border-[#FF7A1A]/30 bg-[#FF7A1A]/[0.06] hover:border-[#FF7A1A]/50"
                    : "border-cream/10 bg-cream/[0.03] hover:border-[#7C3AED]/50"
                }`}
              >
                <div
                  className={`font-[family-name:var(--font-anton)] text-5xl transition-colors ${
                    card.featured ? "text-[#FF7A1A]/60" : "text-[#A78BFA]/40 group-hover:text-[#A78BFA]/70"
                  }`}
                >
                  {card.n}
                </div>
                <h3 className="font-[family-name:var(--font-barlow-condensed)] text-2xl font-extrabold tracking-[0.06em]">
                  {card.title}
                </h3>
                <p className="text-cream/60">{card.text}</p>
                <div
                  className={`mt-auto pt-2 font-[family-name:var(--font-barlow-condensed)] text-sm font-bold tracking-[0.12em] ${
                    card.featured ? "text-[#FF7A1A]" : "text-[#A78BFA]/80"
                  }`}
                >
                  {card.tag}
                </div>
              </div>
            ))}
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
              ₹99. THAT&apos;S{" "}
              <span className="text-[#FF7A1A]">LESS THAN A COFFEE.</span>
            </h2>
            <p className="text-lg text-cream/70">
              For the price of one latte you get a Sunday morning you&apos;ll
              actually remember — a run, a crowd of people who get you, crazy
              games, and a breakfast deal at the end. Early bird slots are
              limited and the price goes up once they&apos;re gone.
            </p>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: "🏃",
                title: "3K or 5K — Your Call",
                text: "First-timer or regular, pick the distance that feels right. Nobody runs alone.",
              },
              {
                icon: "👻",
                title: "Crazy Halloween Games",
                text: "Spooky, silly, competitive. The most fun you'll have before 9 AM.",
              },
              {
                icon: "🤝",
                title: "Like-Minded People",
                text: "Come solo, leave with a crew. Meet people who'd rather run than scroll.",
              },
              {
                icon: "🥞",
                title: "Twist N Flavours Discount",
                text: "Discount on breakfast and beverages at Twist N Flavours for every registered runner.",
              },
              {
                icon: "🎭",
                title: "Costumes Welcome",
                text: "Vampire, zombie, witch, or just your gym fit — show up as whoever you want.",
              },
              {
                icon: "🔥",
                title: "₹99 Early Bird",
                text: "Limited early bird slots. Once they're gone, the price goes up.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-xl border border-cream/10 bg-cream/[0.03] px-5 py-5 transition-colors hover:border-[#FF7A1A]/30"
              >
                <div className="text-2xl">{item.icon}</div>
                <div className="mt-2 font-[family-name:var(--font-barlow-condensed)] text-lg font-extrabold tracking-[0.06em] text-cream">
                  {item.title}
                </div>
                <p className="mt-1 text-cream/60">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Registration */}
      <section
        id="register"
        aria-labelledby="register-title"
        className="relative overflow-hidden border-t border-cream/10"
      >
        <div className="absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-[#7C3AED]/10 blur-[120px]" />
        <div className="relative mx-auto max-w-[1200px] px-5 py-16 md:py-24">
          <div className="mx-auto max-w-[560px]">
            <div className="mb-2 text-center font-[family-name:var(--font-barlow-condensed)] text-sm font-bold tracking-[0.3em] text-[#FF7A1A]">
              EARLY BIRD SLOTS ARE LIMITED
            </div>
            <h2
              id="register-title"
              className="mb-3 text-center font-[family-name:var(--font-anton)] text-[clamp(36px,5vw,52px)] font-normal leading-[0.95]"
            >
              LOCK YOUR SPOT.
            </h2>
            <p className="mb-10 text-center text-cream/50">
              Sun, 1 Nov · 6:00 AM · 3K / 5K · ₹99 per person (early bird) · Chh. Sambhajinagar
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
              <span className="text-[#FF7A1A]">THE COMMUNITY.</span>
            </h2>
            <p className="text-lg text-cream/60">
              Four events in, and every one has been bigger than the last. Week
              005 is our biggest yet — same Miles &amp; People spirit, a lot
              more chaos.
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-6">
              {[
                { n: "04", label: "EVENTS DONE" },
                { n: "05", label: "THIS ONE" },
                { n: "∞", label: "FUN" },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl border border-cream/10 bg-cream/5 px-6 py-4 text-center"
                >
                  <div className="font-[family-name:var(--font-anton)] text-3xl text-[#FF7A1A]">
                    {s.n}
                  </div>
                  <div className="mt-1 font-[family-name:var(--font-barlow-condensed)] text-sm font-bold tracking-[0.1em] text-cream/50">
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
            <a
              href="https://www.instagram.com/milesnpeople/"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-block rounded-full border border-cream/20 px-6 py-3 font-[family-name:var(--font-barlow-condensed)] font-bold tracking-[0.08em] text-cream no-underline hover:border-[#FF7A1A] hover:text-[#FF7A1A] transition-colors"
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
                q: "I've never run 5K. Can I still join?",
                a: "Absolutely. Pick the 3K — walk, jog, or run. Every pace is welcome and nobody gets left behind.",
              },
              {
                q: "Do I need to wear a costume?",
                a: "Nope. Costumes are welcome (and encouraged!), but come in whatever you're comfortable running in.",
              },
              {
                q: "What does the ₹99 include?",
                a: "Your 3K or 5K run, the Halloween games, and a discount on breakfast and beverages at Twist N Flavours.",
              },
              {
                q: "Where do we meet?",
                a: "The meeting point will be shared on WhatsApp and email after you register.",
              },
              {
                q: "How long is the early bird price available?",
                a: "Only until the early bird slots run out. After that the price goes up — so lock yours now.",
              },
              {
                q: "Can I bring friends?",
                a: "Yes! Register up to 10 people at once using the attendee count in the form.",
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
