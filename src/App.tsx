import { useState, useEffect } from 'react';
import Preloader from '@/components/Preloader';
import CustomCursor from '@/components/CustomCursor';
import ScrollProgress from '@/components/ScrollProgress';
import Marquee from '@/components/Marquee';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import GallerySection from '@/components/GallerySection';
import AboutSection from '@/components/AboutSection';
import ContactSection from '@/components/ContactSection';

export default function App() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 3300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Preloader />
      <CustomCursor />
      <ScrollProgress />

      {/* Film grain overlay */}
      <div className="grain-overlay" />

      {/* Content wrapper — hidden until preloader finishes */}
      <div className={`transition-opacity duration-500 ${loaded ? 'opacity-100' : 'opacity-0'}`}>
        <main className="min-h-screen bg-ink">
          <Navbar />
          <div id="home">
            <HeroSection />
          </div>

          {/* Marquee strip between hero and gallery */}
          <Marquee text="Explore the World" />

          <div id="collection">
            <GallerySection />
          </div>

          {/* Reverse marquee between gallery and about */}
          <Marquee text="Wander Further" reverse />

          <AboutSection />

          {/* Marquee before contact */}
          <Marquee text="Begin Your Journey" />

          <ContactSection />
        </main>
      </div>
    </>
  );
}
