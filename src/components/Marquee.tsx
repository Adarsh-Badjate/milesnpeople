export function Marquee({
  items,
  className = "",
  speed = "normal",
}: {
  items: string[];
  className?: string;
  speed?: "normal" | "slow";
}) {
  const text = items.join(" ✦ ");
  const repeated = `${text} ✦ ${text} ✦ `;

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`} aria-hidden="true">
      <div className={speed === "slow" ? "animate-marquee-slow" : "animate-marquee"}>
        <span className="font-[family-name:var(--font-barlow-condensed)] font-extrabold tracking-[0.08em]">
          {repeated}
        </span>
      </div>
    </div>
  );
}
