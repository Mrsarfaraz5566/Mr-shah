import { useState, useEffect, useRef, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, MapPin, ArrowUpRight } from 'lucide-react';
import { slides } from '@/data/slides';
import MagneticButton from '@/components/MagneticButton';

const AUTOPLAY_DURATION = 6000;

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [dragStart, setDragStart] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const touchStartX = useRef<number | null>(null);

  const total = slides.length;

  const goTo = useCallback(
    (index: number) => {
      if (isTransitioning) return;
      setIsTransitioning(true);
      setCurrent(((index % total) + total) % total);
      setTimeout(() => setIsTransitioning(false), 900);
    },
    [isTransitioning, total]
  );

  const next = useCallback(() => goTo(current + 1), [current, goTo]);
  const prev = useCallback(() => goTo(current - 1), [current, goTo]);

  // Autoplay
  useEffect(() => {
    if (isPaused || isTransitioning) return;
    const timer = setInterval(() => {
      goTo(current + 1);
    }, AUTOPLAY_DURATION);
    return () => clearInterval(timer);
  }, [current, isPaused, isTransitioning, goTo]);

  // Keyboard navigation
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
      if (e.key === ' ') {
        e.preventDefault();
        setIsPaused((p) => !p);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [next, prev]);

  // Parallax mouse tracking
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePos({ x, y });
    };
    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  // Touch / drag handling
  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
    setDragStart(e.touches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (dragStart !== null) {
      setDragOffset(e.touches[0].clientX - dragStart);
    }
  };

  const onTouchEnd = () => {
    if (dragOffset < -60) next();
    else if (dragOffset > 60) prev();
    setDragStart(null);
    setDragOffset(0);
  };

  const slide = slides[current];

  return (
    <section
      className="relative h-screen w-full overflow-hidden bg-ink grab-cursor select-none"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Brand watermark */}
      <div className="pointer-events-none absolute top-6 right-6 sm:right-12 md:right-16 z-30 hidden sm:flex items-center gap-2.5 opacity-90">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-400 to-emerald-600">
          <span className="font-display text-base font-bold text-ink">S</span>
        </div>
        <div className="flex flex-col leading-none">
          <span className="font-display text-base font-bold text-white tracking-tight">Mr Shah</span>
          <span className="text-[9px] uppercase tracking-[0.25em] text-white/50">Travel &amp; Co.</span>
        </div>
      </div>

      {/* Slides */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0 transition-opacity duration-[900ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
          style={{
            opacity: i === current ? 1 : 0,
            zIndex: i === current ? 10 : 1,
            transform:
              i === current
                ? `translateX(${dragOffset * 0.3}px)`
                : i < current
                ? 'translateX(-100%)'
                : 'translateX(100%)',
          }}
        >
          {/* Image with Ken Burns + parallax */}
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={s.image}
              alt={s.title}
              className={`h-full w-full object-cover ${i === current ? 'animate-kenburns' : ''}`}
              draggable={false}
              style={
                i === current
                  ? {
                      transform: `scale(1.1) translate(${mousePos.x * -15}px, ${mousePos.y * -15}px)`,
                      transition: 'transform 0.6s ease-out',
                    }
                  : undefined
              }
            />
          </div>

          {/* Gradient overlays */}
          <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/30 to-ink/40" />
          <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-transparent" />

          {/* Content */}
          {i === current && (
            <div className="relative z-20 flex h-full items-center">
              <div className="px-8 sm:px-12 md:px-16 lg:px-24 max-w-3xl">
                {/* Tag */}
                <div
                  className="slide-content active flex items-center gap-3 mb-6"
                  style={{ animation: 'fadeUp 0.7s 0.3s cubic-bezier(0.16,1,0.3,1) both' }}
                >
                  <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-white/90 backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    {s.tag}
                  </span>
                  <span className="inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.15em] text-white/60">
                    <MapPin size={14} />
                    {s.location}
                  </span>
                </div>

                {/* Subtitle */}
                <p
                  className="slide-content active font-display text-lg sm:text-xl italic text-white/70 mb-3"
                  style={{ animation: 'fadeUp 0.7s 0.5s cubic-bezier(0.16,1,0.3,1) both' }}
                >
                  {s.subtitle}
                </p>

                {/* Title */}
                <h1
                  className="slide-content active font-display text-5xl sm:text-7xl md:text-8xl font-bold text-white leading-[0.95] mb-6 tracking-tight"
                  style={{ animation: 'fadeUp 0.8s 0.6s cubic-bezier(0.16,1,0.3,1) both' }}
                >
                  {s.title}
                </h1>

                {/* Divider */}
                <div
                  className="slide-content active h-px bg-gradient-to-r from-white/60 to-transparent mb-6 max-w-xs"
                  style={{ animation: 'scaleIn 0.8s 0.8s cubic-bezier(0.16,1,0.3,1) both', transformOrigin: 'left' }}
                />

                {/* Description */}
                <p
                  className="slide-content active text-base sm:text-lg text-white/80 leading-relaxed max-w-xl mb-8 font-light"
                  style={{ animation: 'fadeUp 0.8s 0.9s cubic-bezier(0.16,1,0.3,1) both' }}
                >
                  {s.description}
                </p>

                {/* CTA with magnetic button */}
                <div
                  className="slide-content active flex items-center gap-4"
                  style={{ animation: 'fadeUp 0.8s 1.1s cubic-bezier(0.16,1,0.3,1) both' }}
                >
                  <MagneticButton className="group inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 text-sm font-semibold text-ink transition-all duration-300 hover:bg-emerald-400 hover:gap-3.5 hover:shadow-[0_0_40px_rgba(52,211,153,0.4)]">
                    Explore Destination
                    <ArrowUpRight
                      size={18}
                      className="transition-transform duration-300 group-hover:rotate-45"
                    />
                  </MagneticButton>
                  <MagneticButton
                    strength={0.25}
                    onClick={() => setIsPaused((p) => !p)}
                    className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/5 px-6 py-3.5 text-sm font-medium text-white/80 backdrop-blur-md transition-all duration-300 hover:bg-white/10 hover:border-white/40"
                  >
                    {isPaused ? <Play size={16} /> : <Pause size={16} />}
                    {isPaused ? 'Resume' : 'Pause'}
                  </MagneticButton>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Slide counter */}
      <div
        className="absolute bottom-10 right-8 sm:right-12 md:right-16 z-30 flex items-baseline gap-2 font-display"
        style={{ transform: `translateY(${mousePos.y * 10}px)` }}
      >
        <span className="text-5xl sm:text-6xl font-bold text-white tabular-nums">
          {String(current + 1).padStart(2, '0')}
        </span>
        <span className="text-lg text-white/40 font-light">/ {String(total).padStart(2, '0')}</span>
      </div>

      {/* Navigation arrows */}
      <MagneticButton
        strength={0.5}
        onClick={prev}
        className="absolute left-4 sm:left-6 top-1/2 z-30 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-ink hover:border-white hover:scale-110"
      >
        <ChevronLeft size={22} />
      </MagneticButton>
      <MagneticButton
        strength={0.5}
        onClick={next}
        className="absolute right-4 sm:right-6 top-1/2 z-30 -translate-y-1/2 flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-white/5 text-white backdrop-blur-md transition-all duration-300 hover:bg-white hover:text-ink hover:border-white hover:scale-110"
      >
        <ChevronRight size={22} />
      </MagneticButton>

      {/* Progress thumbnails */}
      <div className="absolute bottom-10 left-8 sm:left-12 md:left-16 lg:left-24 z-30 flex items-center gap-3">
        {slides.map((s, i) => (
          <button
            key={s.id}
            onClick={() => goTo(i)}
            className="group relative flex flex-col items-center gap-2"
            aria-label={`Go to slide ${i + 1}`}
          >
            {/* Thumbnail */}
            <div
              className={`overflow-hidden rounded-lg border-2 transition-all duration-500 ${
                i === current
                  ? 'h-16 w-24 border-white opacity-100'
                  : 'h-10 w-16 border-white/20 opacity-50 group-hover:opacity-80 group-hover:border-white/50'
              }`}
            >
              <img src={s.image} alt={s.title} className="h-full w-full object-cover" draggable={false} />
            </div>

            {/* Progress bar */}
            <div className="absolute -bottom-1 left-0 right-0 h-0.5 overflow-hidden rounded-full bg-white/20">
              {i === current && !isPaused && (
                <div
                  key={`${current}-${isPaused}`}
                  className="h-full bg-emerald-400 animate-progress-fill"
                  style={{ animationDuration: `${AUTOPLAY_DURATION}ms` }}
                />
              )}
              {i === current && isPaused && <div className="h-full w-1/3 bg-white/60" />}
            </div>
          </button>
        ))}
      </div>

      {/* Scroll hint with animated mouse */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center gap-2 text-white/40">
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <div className="relative flex h-9 w-5 justify-center rounded-full border border-white/30 pt-1.5">
          <div className="h-1.5 w-1 rounded-full bg-emerald-400 animate-float" />
        </div>
      </div>
    </section>
  );
}
