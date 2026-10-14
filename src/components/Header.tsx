"use client";

import { useState } from "react";
import { Logo } from "./Logo";

const NAV_LINKS = [
  { href: "/#runs", label: "Runs" },
  { href: "/#how", label: "How it works" },
  { href: "/#partners", label: "Partners" },
  { href: "/#faq", label: "FAQ" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-bg">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-3 px-5 py-4">
        <Logo stroke="#141414" className="text-ink" />

        {/* Mobile menu button */}
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex h-11 w-11 items-center justify-center rounded-lg md:hidden"
          aria-label="Toggle menu"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#141414" strokeWidth="2">
            {open ? (
              <path d="M6 6l12 12M6 18L18 6" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>

        <nav
          aria-label="Main"
          className={`${
            open ? "flex" : "hidden"
          } w-full flex-col items-start gap-1 md:flex md:w-auto md:flex-row md:items-center md:gap-6`}
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="font-[family-name:var(--font-barlow-condensed)] text-lg font-bold tracking-[0.06em] text-ink no-underline py-2.5 px-0"
            >
              {link.label}
            </a>
          ))}
          <a
            href="/register/3"
            className="inline-block rounded-full bg-accent px-[22px] py-3 font-[family-name:var(--font-barlow-condensed)] text-base font-extrabold tracking-[0.08em] text-white no-underline hover:bg-accent-hover transition-colors"
          >
            REGISTER
          </a>
        </nav>
      </div>
    </header>
  );
}
