import { useEffect, useState, useRef } from 'react';

export default function CustomCursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);
  const ringRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const targetRef = useRef({ x: -100, y: -100 });
  const currentRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Only enable on desktop with fine pointer
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!mq.matches) return;

    const onMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY };

      // Check if hovering interactive element
      const el = e.target as HTMLElement;
      const interactive = el.closest('a, button, input, textarea, [role="button"]');
      setHovering(!!interactive);
    };

    const onDown = () => setClicking(true);
    const onUp = () => setClicking(false);

    const animate = () => {
      currentRef.current.x += (targetRef.current.x - currentRef.current.x) * 0.18;
      currentRef.current.y += (targetRef.current.y - currentRef.current.y) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${currentRef.current.x}px, ${currentRef.current.y}px) translate(-50%, -50%)`;
      }
      // dot follows instantly
      setPos({ x: targetRef.current.x, y: targetRef.current.y });
      rafRef.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mousedown', onDown);
    window.addEventListener('mouseup', onUp);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mousedown', onDown);
      window.removeEventListener('mouseup', onUp);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <>
      {/* Glowing dot (instant follow) */}
      <div
        className="pointer-events-none fixed z-[9998] hidden md:block"
        style={{ left: pos.x, top: pos.y, transform: 'translate(-50%, -50%)' }}
      >
        <div
          className={`rounded-full bg-emerald-400 transition-all duration-150 ${
            clicking ? 'h-2 w-2' : 'h-1.5 w-1.5'
          }`}
          style={{ boxShadow: '0 0 12px rgba(52, 211, 153, 0.8)' }}
        />
      </div>

      {/* Outer ring (smooth lerp follow) */}
      <div
        ref={ringRef}
        className={`pointer-events-none fixed z-[9998] hidden md:block rounded-full border transition-all duration-300 ${
          hovering
            ? 'h-12 w-12 border-emerald-400/60 bg-emerald-400/5'
            : 'h-8 w-8 border-white/30'
        } ${clicking ? 'scale-75' : ''}`}
        style={{ left: 0, top: 0 }}
      />
    </>
  );
}
