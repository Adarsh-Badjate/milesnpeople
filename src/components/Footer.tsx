import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="bg-ink text-cream">
      <div className="mx-auto flex max-w-[1200px] flex-wrap items-center justify-between gap-4 px-5 py-10">
        <Logo stroke="#F4F2ED" className="text-cream" />
        <div className="flex flex-wrap gap-5">
          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cream hover:text-accent transition-colors"
          >
            Instagram
          </a>
          <a
            href="#"
            target="_blank"
            rel="noopener noreferrer"
            className="text-cream hover:text-accent transition-colors"
          >
            WhatsApp community
          </a>
          <a href="mailto:hello@milesandpeople.com" className="text-cream hover:text-accent transition-colors">
            Contact
          </a>
        </div>
        <div className="text-cream/60 text-[15px]">© 2026 Miles &amp; People</div>
      </div>
    </footer>
  );
}
