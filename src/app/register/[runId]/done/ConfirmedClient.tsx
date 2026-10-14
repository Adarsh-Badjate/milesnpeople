"use client";

import { useEffect, useRef } from "react";
import { Logo } from "@/components/Logo";

function generateICS(date: string, startTime: string, meetingPoint: string): string {
  const d = new Date(date + "T00:00:00");
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  // Parse start time like "5:30 AM"
  const match = startTime.match(/(\d+):(\d+)\s*(AM|PM)/i);
  let hour = match ? parseInt(match[1]) : 5;
  const min = match ? match[2] : "30";
  if (match && match[3].toUpperCase() === "PM" && hour < 12) hour += 12;
  if (match && match[3].toUpperCase() === "AM" && hour === 12) hour = 0;
  const hStr = String(hour).padStart(2, "0");

  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Miles & People//Run//EN",
    "BEGIN:VEVENT",
    `DTSTART:${year}${month}${day}T${hStr}${min}00`,
    `DTEND:${year}${month}${day}T${String(hour + 2).padStart(2, "0")}${min}00`,
    "SUMMARY:Miles & People Sunday Run",
    `LOCATION:${meetingPoint}`,
    "DESCRIPTION:Community run - bring water and your digital bib!",
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}

function confetti(canvas: HTMLCanvasElement) {
  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (prefersReduced) return;

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const colors = ["#C2531F", "#E0733D", "#F4F2ED", "#FFD700", "#FF6B6B"];
  const particles: Array<{
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    color: string;
    rotation: number;
    vr: number;
    life: number;
  }> = [];

  for (let i = 0; i < 150; i++) {
    particles.push({
      x: canvas.width / 2 + (Math.random() - 0.5) * 200,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 15,
      vy: Math.random() * -18 - 5,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * Math.PI * 2,
      vr: (Math.random() - 0.5) * 0.3,
      life: 1,
    });
  }

  let frame = 0;
  function animate() {
    if (frame > 180) {
      ctx!.clearRect(0, 0, canvas.width, canvas.height);
      return;
    }
    ctx!.clearRect(0, 0, canvas.width, canvas.height);
    for (const p of particles) {
      p.x += p.vx;
      p.y += p.vy;
      p.vy += 0.3;
      p.vx *= 0.99;
      p.rotation += p.vr;
      p.life -= 0.005;
      if (p.life <= 0) continue;
      ctx!.save();
      ctx!.translate(p.x, p.y);
      ctx!.rotate(p.rotation);
      ctx!.fillStyle = p.color;
      ctx!.globalAlpha = p.life;
      ctx!.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx!.restore();
    }
    frame++;
    requestAnimationFrame(animate);
  }
  animate();
}

export function ConfirmedClient({
  bib,
  name,
  week,
  distance,
  date,
  startTime,
  meetingPoint,
  runId,
  whatsappUrl,
}: {
  bib: string;
  name: string;
  week: string;
  distance: string;
  date: string;
  startTime: string;
  meetingPoint: string;
  runId: string;
  whatsappUrl: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const firstName = name.split(" ")[0];

  useEffect(() => {
    if (canvasRef.current) confetti(canvasRef.current);
  }, []);

  function formatDate(dateStr: string) {
    try {
      const d = new Date(dateStr + "T00:00:00");
      return d.toLocaleDateString("en-US", { weekday: "short", day: "numeric", month: "short" });
    } catch {
      return dateStr;
    }
  }

  function downloadICS() {
    const ics = generateICS(date, startTime, meetingPoint);
    const blob = new Blob([ics], { type: "text/calendar" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `miles-and-people-week-${week}.ics`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <div className="min-h-screen bg-dark text-cream font-[family-name:var(--font-barlow)] flex flex-col items-center justify-center px-5 py-12">
      <canvas ref={canvasRef} className="confetti-canvas" />

      <div className="animate-slide-up text-center mb-8">
        <Logo stroke="#F4F2ED" className="text-cream justify-center mb-6" />
        <h1 className="font-[family-name:var(--font-anton)] text-[clamp(36px,6vw,72px)] font-normal leading-[0.95]">
          YOU&apos;RE IN, <span className="text-accent">{firstName.toUpperCase()}.</span>
        </h1>
        <p className="mt-4 text-cream/60 text-lg">See you Sunday morning!</p>
      </div>

      {/* Digital Bib */}
      <div className="animate-slide-up-delay w-full max-w-sm">
        <div className="overflow-hidden rounded-2xl bg-cream text-ink shadow-2xl">
          <div className="bg-accent px-4 py-3 text-center font-[family-name:var(--font-barlow-condensed)] text-xs font-extrabold tracking-[0.2em] text-white">
            MILES &amp; PEOPLE · WEEK {week}
          </div>
          <div className="p-8 text-center">
            <div className="font-[family-name:var(--font-anton)] text-[80px] leading-none">
              {bib}
            </div>
            <div className="mt-2 font-[family-name:var(--font-barlow-condensed)] text-xl font-bold tracking-[0.1em] text-ink/70">
              {name.toUpperCase()}
            </div>
            <div className="mt-1 font-[family-name:var(--font-barlow-condensed)] text-lg font-bold tracking-[0.2em] text-accent">
              {distance}
            </div>

            {/* Dashed tear line */}
            <div className="my-6 border-t-2 border-dashed border-ink/20" />

            <div className="space-y-1 text-sm text-ink/60">
              <p>{formatDate(date)} · {startTime}</p>
              <p>{meetingPoint}</p>
            </div>

            {/* QR placeholder */}
            <div className="mx-auto mt-4 flex h-24 w-24 items-center justify-center rounded-lg bg-ink/5 text-xs text-ink/30">
              QR: {runId}-{bib}
            </div>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          onClick={downloadICS}
          className="rounded-full border-2 border-cream/20 px-5 py-3 font-[family-name:var(--font-barlow-condensed)] font-bold tracking-[0.06em] text-cream hover:bg-cream/10 transition-colors min-h-[48px]"
        >
          📅 Add to calendar
        </button>
        {whatsappUrl && (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border-2 border-cream/20 px-5 py-3 font-[family-name:var(--font-barlow-condensed)] font-bold tracking-[0.06em] text-cream no-underline hover:bg-cream/10 transition-colors min-h-[48px]"
          >
            💬 Join WhatsApp group
          </a>
        )}
        <a
          href="/"
          className="rounded-full border-2 border-cream/20 px-5 py-3 font-[family-name:var(--font-barlow-condensed)] font-bold tracking-[0.06em] text-cream no-underline hover:bg-cream/10 transition-colors min-h-[48px]"
        >
          ← Back to home
        </a>
      </div>

      {/* Before Sunday checklist */}
      <div className="mt-12 w-full max-w-sm rounded-2xl border border-cream/10 bg-cream/5 p-6">
        <h2 className="mb-4 font-[family-name:var(--font-barlow-condensed)] text-lg font-extrabold tracking-[0.12em] text-accent">
          BEFORE SUNDAY
        </h2>
        <ul className="space-y-3 text-cream/70">
          <li className="flex items-start gap-3">
            <span className="mt-0.5 text-accent">✓</span>
            <span>Screenshot your bib — you&apos;ll need it at check-in</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-0.5 text-accent">✓</span>
            <span>Wear comfortable running shoes</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-0.5 text-accent">✓</span>
            <span>Carry a water bottle</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-0.5 text-accent">✓</span>
            <span>Arrive 10 minutes early</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="mt-0.5 text-accent">✓</span>
            <span>Join the WhatsApp group for updates</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
