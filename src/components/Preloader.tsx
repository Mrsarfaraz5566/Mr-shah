import { useEffect, useState } from 'react';

export default function Preloader() {
  const [done, setDone] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setDone(true), 3200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-ink transition-transform duration-[800ms] ease-[cubic-bezier(0.76,0,0.24,1)] ${
        done ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[100px] animate-glow-pulse" />

      <div className="relative flex flex-col items-center gap-6">
        {/* Rotating ring + logo */}
        <div className="relative flex h-24 w-24 items-center justify-center">
          <div className="absolute inset-0 rounded-full border-2 border-white/10" />
          <div className="absolute inset-0 rounded-full border-2 border-transparent border-t-emerald-400 border-r-emerald-400 animate-spin-slow" />
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-400 to-emerald-600 shadow-[0_0_30px_rgba(52,211,153,0.4)]">
            <span className="font-display text-2xl font-bold text-ink animate-preloader-text">S</span>
          </div>
        </div>

        {/* Brand text */}
        <div className="text-center overflow-hidden">
          <h1
            className="font-display text-3xl font-bold text-white tracking-tight animate-preloader-text"
            style={{ animationDelay: '0.5s' }}
          >
            Mr Shah
          </h1>
          <p
            className="mt-1 text-[10px] uppercase tracking-[0.4em] text-white/40 animate-preloader-text"
            style={{ animationDelay: '0.7s' }}
          >
            Travel &amp; Co.
          </p>
        </div>

        {/* Loading bar */}
        <div className="h-px w-40 overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full bg-gradient-to-r from-emerald-400 to-emerald-300"
            style={{
              animation: 'progressFill 2s 0.5s cubic-bezier(0.16,1,0.3,1) forwards',
            }}
          />
        </div>
      </div>
    </div>
  );
}
