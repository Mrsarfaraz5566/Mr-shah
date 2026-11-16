import { useRef, useState, useEffect } from 'react';
import { slides } from '@/data/slides';
import { MapPin, ArrowUpRight, Compass, Camera, Mountain } from 'lucide-react';
import CountUp from '@/components/CountUp';

export default function GallerySection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [visibleIndex, setVisibleIndex] = useState(-1);
  const [tiltStates, setTiltStates] = useState<Record<number, { rx: number; ry: number }>>({});

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const idx = Number((entry.target as HTMLElement).dataset.index);
            setVisibleIndex(idx);
          }
        });
      },
      { threshold: 0.3 }
    );

    const cards = sectionRef.current?.querySelectorAll('[data-index]');
    cards?.forEach((c) => observer.observe(c));
    return () => observer.disconnect();
  }, []);

  const handleTilt = (i: number, e: React.MouseEvent) => {
    const card = e.currentTarget as HTMLElement;
    const rect = card.getBoundingClientRect();
    const cx = e.clientX - rect.left;
    const cy = e.clientY - rect.top;
    const px = (cx / rect.width - 0.5) * 2;
    const py = (cy / rect.height - 0.5) * 2;
    setTiltStates((prev) => ({ ...prev, [i]: { rx: -py * 8, ry: px * 10 } }));
  };

  const resetTilt = (i: number) => {
    setTiltStates((prev) => ({ ...prev, [i]: { rx: 0, ry: 0 } }));
  };

  const stats = [
    { icon: Compass, label: 'Destinations', value: 120, suffix: '+' },
    { icon: Camera, label: 'Photos Captured', value: 84, suffix: 'K' },
    { icon: Mountain, label: 'Peaks Conquered', value: 47, suffix: '' },
  ];

  return (
    <section ref={sectionRef} className="relative bg-ink py-24 sm:py-32">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute right-0 top-1/4 h-[400px] w-[400px] rounded-full bg-emerald-500/5 blur-[120px]" />

      {/* Section header */}
      <div className="mx-auto max-w-7xl px-6 sm:px-12 md:px-16">
        <div className="mb-16 flex flex-col items-start gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Collection
            </span>
            <h2 className="mt-5 font-display text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
              Journeys worth
              <br />
              <span className="shimmer-text animate-shimmer">chasing</span>
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-white/50 font-light">
            Five curated destinations from around the globe — each chosen for its raw, untamed beauty
            and the feeling it leaves behind.
          </p>
        </div>

        {/* Stats with animated counters */}
        <div className="mb-20 grid grid-cols-3 gap-4 sm:gap-8">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={i}
                className="group flex flex-col gap-2 rounded-2xl border border-white/5 bg-white/[0.02] p-5 sm:p-7 transition-all duration-500 hover:border-emerald-400/20 hover:bg-white/[0.04]"
              >
                <Icon size={20} className="text-emerald-400 transition-transform duration-300 group-hover:scale-110" />
                <span className="font-display text-3xl sm:text-5xl font-bold text-white">
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </span>
                <span className="text-xs uppercase tracking-[0.15em] text-white/40">
                  {stat.label}
                </span>
              </div>
            );
          })}
        </div>

        {/* Gallery grid with 3D tilt */}
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3" style={{ perspective: '1200px' }}>
          {slides.map((slide, i) => {
            const isVisible = visibleIndex >= i;
            const tilt = tiltStates[i] || { rx: 0, ry: 0 };
            return (
              <div
                key={slide.id}
                data-index={i}
                onMouseMove={(e) => handleTilt(i, e)}
                onMouseLeave={() => resetTilt(i)}
                className={`tilt-card group relative overflow-hidden rounded-3xl transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{
                  transform: `translateY(${isVisible ? '0' : '48px'}) perspective(1200px) rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
                  transitionDelay: `${i * 80}ms`,
                }}
              >
                <div className="aspect-[4/5] w-full overflow-hidden">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="h-full w-full object-cover transition-transform duration-[1.2s] ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-110"
                    draggable={false}
                  />
                </div>

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/20 to-transparent opacity-80 transition-opacity duration-500 group-hover:opacity-90" />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 tilt-card-inner">
                  <span className="mb-2 inline-flex w-fit items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[10px] font-medium uppercase tracking-[0.2em] text-white/80 backdrop-blur-md">
                    <MapPin size={11} />
                    {slide.location}
                  </span>
                  <h3 className="font-display text-2xl font-bold text-white">{slide.title}</h3>
                  <p className="mt-1 text-sm text-white/60 font-light line-clamp-2 max-h-0 overflow-hidden opacity-0 transition-all duration-500 group-hover:max-h-20 group-hover:opacity-100">
                    {slide.description}
                  </p>
                  <div className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-emerald-400 opacity-0 transition-all duration-500 group-hover:opacity-100">
                    View Journey
                    <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
                  </div>
                </div>

                {/* Hover border glow */}
                <div className="pointer-events-none absolute inset-0 rounded-3xl ring-1 ring-inset ring-white/0 transition-all duration-500 group-hover:ring-emerald-400/20" />
              </div>
            );
          })}
        </div>
      </div>

      {/* Footer */}
      <div className="mx-auto mt-24 max-w-7xl px-6 sm:px-12 md:px-16">
        <div className="flex flex-col items-center justify-between gap-6 border-t border-white/5 pt-10 sm:flex-row">
          <p className="font-display text-xl italic text-white/40">
            "The world is a book, and those who do not travel read only one page."
          </p>
          <span className="text-xs uppercase tracking-[0.2em] text-white/30">
            Mr Shah — Travel &amp; Co. 2026
          </span>
        </div>
      </div>
    </section>
  );
}
