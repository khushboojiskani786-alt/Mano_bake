import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const HeroSlider: React.FC = () => {
  const { banners, setActivePage, setSelectedCategory } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isMobile, setIsMobile] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth < 640 : false
  );

  // Auto-slide and Resize listener
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener('resize', handleResize);

    if (banners.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 6500);

    return () => {
      window.removeEventListener('resize', handleResize);
      clearInterval(interval);
    };
  }, [banners.length]);

  const handlePrev = () => {
    setCurrentSlide((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentSlide((prev) => (prev + 1) % banners.length);
  };

  const handleShopNow = (categorySlug?: string) => {
    setSelectedCategory(categorySlug || 'all');
    setActivePage('shop');
  };

  if (banners.length === 0) return null;

  return (
    <section
      id="luxury-hero"
      // Changed h-[300px] to h-[60vh] to make it more visible on mobile
      className="relative h-[60vh] sm:h-screen w-full bg-[#332A26] overflow-hidden select-none"
    >
      {/* Slide Image Wrapper */}
      <AnimatePresence mode="wait">
        {banners.map((slide, index) => {
          if (index !== currentSlide) return null;

          return (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              transition={{ duration: 1.2 }}
              className="absolute inset-0 w-full h-full"
            >
              {/* Background Cover */}
              <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                  // Ensure the path is wrapped in valid quotes
                  backgroundImage: `url("${isMobile && slide.mobileImage ? slide.mobileImage : slide.image}")`
                }}
                role="img"
                aria-label={slide.title}
              />
              {/* Darkened/Vignetted Overlay for Text Readability & Golden Mood */}
              <div className={`absolute inset-0 transition-opacity duration-500 ${slide.id === 'banner_1'
                ? 'bg-gradient-to-r from-black/20 via-transparent to-black/20 bg-black/5'
                : 'bg-gradient-to-r from-black/50 via-black/35 to-black/50'
                }`} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4A3B35]/35 via-transparent to-[#4A3B35]/15" />

              {/* Text Front Centered Content */}
              <div className="absolute inset-0 flex items-end sm:items-center justify-center pb-10 sm:pb-0 p-4">
                <div className="max-w-4xl text-center flex flex-col items-center">
                  {slide.id !== 'banner_1' ? (
                    <>
                      {/* Slow Reveal Subtitle */}
                      <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-[8px] sm:text-xs tracking-[0.3em] font-semibold text-primary uppercase mb-2 sm:mb-4 drop-shadow"
                      >
                        {slide.subtitle || 'FRESHLY BAKED HAPPINESS'}
                      </motion.p>

                      {/* Elegant Playfair Large Title */}
                      <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.9 }}
                        className="font-serif italic font-normal text-2xl sm:text-5xl md:text-7xl text-secondary leading-tight tracking-wide mb-4 sm:mb-8 font-serif px-2 sm:px-10 drop-shadow-md"
                      >
                        {slide.title}
                      </motion.h1>
                    </>
                  ) : (
                    <div className="h-20 sm:h-40" />
                  )}

                  {/* Premium Action Button */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: slide.id === 'banner_1' ? 0.3 : 0.8, duration: 0.6 }}
                  >
                    <button
                      onClick={() => handleShopNow(slide.link)}
                      className="group relative inline-flex items-center gap-2 bg-[#EBCFC8] hover:bg-[#FFF8F6] text-[#4A3B35] tracking-widest text-[9px] sm:text-xs font-bold uppercase px-6 sm:px-10 py-2.5 sm:py-4 rounded shadow-lg overflow-hidden transition-all duration-300 hover:scale-[1.03] border border-[#EBCFC8] cursor-pointer"
                    >
                      <span>Explore</span>
                      <ArrowRight className="h-3 w-3 sm:h-4.5 sm:w-4.5 group-hover:translate-x-1.5 transition-transform duration-300" />
                    </button>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Manual Sliding Trigger Selectors */}
      {banners.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-1.5 rounded-full border border-secondary/20 bg-black/10 text-secondary hover:bg-[#EBCFC8] hover:text-[#4A3B35] transition-all duration-300 cursor-pointer hidden md:flex items-center justify-center opacity-80"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-4 w-4" />
          </button>

          <button
            onClick={handleNext}
            className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-1.5 rounded-full border border-secondary/20 bg-black/10 text-secondary hover:bg-[#EBCFC8] hover:text-[#4A3B35] transition-all duration-300 cursor-pointer hidden md:flex items-center justify-center opacity-80"
            aria-label="Next slide"
          >
            <ChevronRight className="h-4 w-4" />
          </button>

          {/* Bottom Pagination Dots */}
          <div className="absolute bottom-4 sm:bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-1.5 rounded-full transition-all duration-500 cursor-pointer ${idx === currentSlide ? 'w-6 bg-primary shadow-sm' : 'w-1.5 bg-secondary/50'
                  }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}
      <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-secondary to-transparent pointer-events-none" />
    </section>
  );
};