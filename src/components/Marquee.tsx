interface MarqueeProps {
  text: string;
  reverse?: boolean;
}

export default function Marquee({ text, reverse = false }: MarqueeProps) {
  const items = Array(8).fill(text);

  return (
    <div className="relative flex overflow-hidden border-y border-white/5 bg-white/[0.02] py-5 select-none">
      <div
        className={`flex shrink-0 items-center gap-8 whitespace-nowrap ${
          reverse ? 'animate-marquee-rev' : 'animate-marquee'
        }`}
      >
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white/80">
              {item}
            </span>
            <span className="text-emerald-400 text-xl">✦</span>
          </span>
        ))}
      </div>
      <div
        className={`flex shrink-0 items-center gap-8 whitespace-nowrap ${
          reverse ? 'animate-marquee-rev' : 'animate-marquee'
        }`}
        aria-hidden
      >
        {items.map((item, i) => (
          <span key={i} className="flex items-center gap-8">
            <span className="font-display text-2xl sm:text-3xl font-bold uppercase tracking-tight text-white/80">
              {item}
            </span>
            <span className="text-emerald-400 text-xl">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
