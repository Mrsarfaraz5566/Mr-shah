export default function HeroSection() {
  return (
    <section className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-ink select-none">
      {/* Ambient glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-500/10 blur-[120px] animate-glow-pulse" />
      <div className="pointer-events-none absolute left-1/4 top-1/4 h-[300px] w-[300px] rounded-full bg-emerald-400/5 blur-[100px]" />
      <div className="pointer-events-none absolute right-1/4 bottom-1/4 h-[300px] w-[300px] rounded-full bg-emerald-400/5 blur-[100px]" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <p
          className="mb-4 text-xs sm:text-sm font-medium uppercase tracking-[0.4em] text-emerald-400"
          style={{ animation: 'fadeUp 0.7s 0.2s cubic-bezier(0.16,1,0.3,1) both' }}
        >
          Welcome
        </p>

        <h1
          className="font-display text-4xl sm:text-6xl md:text-8xl font-bold text-white leading-[1.05] tracking-tight"
          style={{ animation: 'fadeUp 0.8s 0.4s cubic-bezier(0.16,1,0.3,1) both' }}
        >
          King_shah720380
        </h1>

        <div
          className="mt-6 h-px w-32 bg-gradient-to-r from-transparent via-emerald-400/70 to-transparent"
          style={{ animation: 'scaleIn 0.8s 0.7s cubic-bezier(0.16,1,0.3,1) both', transformOrigin: 'center' }}
        />

        <p
          className="mt-6 max-w-xl text-base sm:text-lg text-white/60 font-light leading-relaxed"
          style={{ animation: 'fadeUp 0.8s 0.9s cubic-bezier(0.16,1,0.3,1) both' }}
        >
          Welcome to my world. Scroll down to explore the collection.
        </p>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 hidden lg:flex flex-col items-center gap-2 text-white/40">
        <span className="text-[10px] uppercase tracking-[0.3em]">Scroll</span>
        <div className="relative flex h-9 w-5 justify-center rounded-full border border-white/30 pt-1.5">
          <div className="h-1.5 w-1 rounded-full bg-emerald-400 animate-float" />
        </div>
      </div>
    </section>
  );
}
