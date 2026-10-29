"use client";

import { useEffect, useState } from "react";

function calcTimeLeft(target: Date) {
  const diff = target.getTime() - Date.now();
  if (diff <= 0) return { days: 0, hrs: 0, min: 0, sec: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hrs: Math.floor((diff / (1000 * 60 * 60)) % 24),
    min: Math.floor((diff / (1000 * 60)) % 60),
    sec: Math.floor((diff / 1000) % 60),
  };
}

export function Countdown({ targetDate, dark = false }: { targetDate: string; dark?: boolean }) {
  const valueColor = dark ? "text-cream" : "text-ink";
  const accentColor = dark ? "text-[#FF7A1A]" : "text-accent";
  const labelColor = dark ? "text-cream/50" : "text-muted";

  const [time, setTime] = useState({ days: 0, hrs: 0, min: 0, sec: 0 });
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(calcTimeLeft(new Date(targetDate)));
    const id = setInterval(() => setTime(calcTimeLeft(new Date(targetDate))), 1000);
    return () => clearInterval(id);
  }, [targetDate]);

  if (!mounted) {
    return (
      <div className="flex gap-3">
        {["DAYS", "HRS", "MIN", "SEC"].map((label) => (
          <div key={label} className="text-center">
            <div className={`font-[family-name:var(--font-anton)] text-2xl leading-none ${valueColor}`}>--</div>
            <div className={`font-[family-name:var(--font-barlow-condensed)] text-[11px] font-bold tracking-[0.2em] ${labelColor}`}>{label}</div>
          </div>
        ))}
      </div>
    );
  }

  const items = [
    { label: "DAYS", value: time.days },
    { label: "HRS", value: time.hrs },
    { label: "MIN", value: time.min },
    { label: "SEC", value: time.sec },
  ];

  return (
    <div className="flex gap-3">
      {items.map((item) => (
        <div key={item.label} className="text-center">
          <div
            className={`font-[family-name:var(--font-anton)] text-2xl leading-none ${
              item.label === "SEC" ? accentColor : valueColor
            }`}
          >
            {String(item.value).padStart(2, "0")}
          </div>
          <div className={`font-[family-name:var(--font-barlow-condensed)] text-[11px] font-bold tracking-[0.2em] ${labelColor}`}>
            {item.label}
          </div>
        </div>
      ))}
    </div>
  );
}
