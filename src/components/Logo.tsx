export function LogoMark({
  className = "",
  stroke = "currentColor",
  size = 40,
}: {
  className?: string;
  stroke?: string;
  size?: number;
}) {
  const h = Math.round((size * 260) / 390);
  return (
    <svg
      width={size}
      height={h}
      viewBox="205 272 390 260"
      fill="none"
      role="img"
      aria-label="Miles & People logo"
      className={className}
    >
      <polyline
        points="240,500 312,305 399,460 487,290 564,515"
        stroke={stroke}
        strokeWidth="26"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <circle cx="236" cy="514" r="23" fill="#C2531F" />
    </svg>
  );
}

export function Logo({
  className = "",
  stroke = "currentColor",
}: {
  className?: string;
  stroke?: string;
}) {
  return (
    <a href="/" className={`flex items-center gap-2.5 no-underline ${className}`}>
      <LogoMark stroke={stroke} size={40} />
      <span className="font-[family-name:var(--font-barlow-condensed)] font-extrabold text-[22px] tracking-[0.12em]">
        MILES &amp; PEOPLE
      </span>
    </a>
  );
}
