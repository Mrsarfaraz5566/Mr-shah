import { useRef, useState, useEffect } from 'react';
import { Globe2, Award, Heart, Sparkles } from 'lucide-react';

const values = [
  {
    icon: Globe2,
    title: 'Worldwide Reach',
    description: 'From remote mountain peaks to hidden island coves — we curate journeys across six continents.',
  },
  {
    icon: Award,
    title: 'Curated Excellence',
    description: 'Every destination is hand-picked and personally vetted to ensure an unforgettable experience.',
  },
  {
    icon: Heart,
    title: 'Passion-Driven',
    description: 'We travel because we love it. That passion reflects in every detail of every journey we craft.',
  },
  {
    icon: Sparkles,
    title: 'Unforgettable Moments',
    description: 'More than trips — we design memories that stay with you long after you return home.',
  },
];

export default function AboutSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setVisible(true)),
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="about" ref={ref} className="relative bg-ink py-24 sm:py-32">
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[600px] -translate-x-1/2 rounded-full bg-emerald-500/5 blur-[120px]" />

      <div className="mx-auto max-w-7xl px-6 sm:px-12 md:px-16">
        {/* Header */}
        <div
          className={`mb-16 max-w-2xl transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-emerald-400">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            About Mr Shah
          </span>
          <h2 className="mt-5 font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
            Crafting journeys,
            <br />
            <span className="shimmer-text animate-shimmer">not just trips</span>
          </h2>
          <p className="mt-6 text-base sm:text-lg text-white/60 leading-relaxed font-light">
            Mr Shah started as a single traveler with a camera and an insatiable curiosity.
            Today, it's a boutique travel studio dedicated to finding the most breathtaking places
            on Earth — and sharing them with those who seek more than the ordinary.
          </p>
        </div>

        {/* Values grid */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {values.map((v, i) => {
            const Icon = v.icon;
            return (
              <div
                key={i}
                className={`group rounded-3xl border border-white/5 bg-white/[0.02] p-7 transition-all duration-700 hover:border-emerald-400/20 hover:bg-white/[0.04] ${
                  visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${i * 100 + 200}ms` }}
              >
                <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-400/10 text-emerald-400 transition-all duration-300 group-hover:bg-emerald-400 group-hover:text-ink">
                  <Icon size={22} />
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-2">{v.title}</h3>
                <p className="text-sm text-white/50 leading-relaxed font-light">{v.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
