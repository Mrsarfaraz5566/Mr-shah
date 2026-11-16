import { useRef, useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, Instagram, Twitter, Facebook } from 'lucide-react';

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setVisible(true)),
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  const contactInfo = [
    { icon: Mail, label: 'Email', value: 'hello@mrshah.travel' },
    { icon: Phone, label: 'Phone', value: '+1 (555) 014-7788' },
    { icon: MapPin, label: 'Studio', value: 'Dubai · London · Tokyo' },
  ];

  const socials = [
    { icon: Instagram, label: 'Instagram' },
    { icon: Twitter, label: 'Twitter' },
    { icon: Facebook, label: 'Facebook' },
  ];

  return (
    <section id="contact" ref={ref} className="relative bg-ink py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-12 md:px-16">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Left — info */}
          <div
            className={`transition-all duration-700 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5 text-xs font-medium uppercase tracking-[0.2em] text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Get in Touch
            </span>
            <h2 className="mt-5 font-display text-4xl sm:text-5xl font-bold text-white leading-tight">
              Let's plan your
              <br />
              <span className="shimmer-text animate-shimmer">next journey</span>
            </h2>
            <p className="mt-6 max-w-md text-base text-white/60 leading-relaxed font-light">
              Tell us where you dream of going. We'll handle the rest — from the first spark of
              inspiration to the moment you arrive.
            </p>

            <div className="mt-10 flex flex-col gap-5">
              {contactInfo.map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-center gap-4">
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-emerald-400">
                      <Icon size={18} />
                    </div>
                    <div>
                      <p className="text-xs uppercase tracking-[0.15em] text-white/40">{item.label}</p>
                      <p className="text-sm font-medium text-white">{item.value}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Socials */}
            <div className="mt-10 flex items-center gap-3">
              {socials.map((s, i) => {
                const Icon = s.icon;
                return (
                  <a
                    key={i}
                    href="#"
                    aria-label={s.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-white/50 transition-all duration-300 hover:border-emerald-400/40 hover:bg-emerald-400/10 hover:text-emerald-400"
                  >
                    <Icon size={17} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Right — form */}
          <div
            className={`transition-all duration-700 delay-150 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}
          >
            <form
              onSubmit={handleSubmit}
              className="rounded-3xl border border-white/10 bg-white/[0.03] p-7 sm:p-9 backdrop-blur-sm"
            >
              <div className="mb-5">
                <label className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-white/40">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="John Doe"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder-white/30 outline-none transition-all duration-300 focus:border-emerald-400/50 focus:bg-white/[0.07]"
                />
              </div>
              <div className="mb-5">
                <label className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-white/40">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  placeholder="john@example.com"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder-white/30 outline-none transition-all duration-300 focus:border-emerald-400/50 focus:bg-white/[0.07]"
                />
              </div>
              <div className="mb-5">
                <label className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-white/40">
                  Dream Destination
                </label>
                <input
                  type="text"
                  required
                  placeholder="Where to next?"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder-white/30 outline-none transition-all duration-300 focus:border-emerald-400/50 focus:bg-white/[0.07]"
                />
              </div>
              <div className="mb-7">
                <label className="mb-2 block text-xs font-medium uppercase tracking-[0.15em] text-white/40">
                  Tell us more
                </label>
                <textarea
                  rows={3}
                  placeholder="What kind of experience are you looking for?"
                  className="w-full resize-none rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-sm text-white placeholder-white/30 outline-none transition-all duration-300 focus:border-emerald-400/50 focus:bg-white/[0.07]"
                />
              </div>
              <button
                type="submit"
                className="group inline-flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-400 px-6 py-4 text-sm font-semibold text-ink transition-all duration-300 hover:bg-white hover:shadow-[0_0_40px_rgba(52,211,153,0.3)]"
              >
                {submitted ? 'Message Sent!' : 'Send Inquiry'}
                <Send
                  size={16}
                  className={`transition-all duration-300 ${
                    submitted ? 'translate-x-1 opacity-0' : 'group-hover:translate-x-1'
                  }`}
                />
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
