import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const HeroSlider: React.FC = () => {
  const { banners, setActivePage, setSelectedCategory } = useApp();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide after 6 seconds to keep it slow and luxury-oriented
  useEffect(() => {
    if (banners.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 6500);
    return () => clearInterval(interval);
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
    <section id="luxury-hero" className="relative h-[85vh] sm:h-screen w-full bg-[#332A26] overflow-hidden select-none">
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
                style={{ backgroundImage: `url(${slide.image})` }}
                role="img"
                aria-label={slide.title}
              />
              
              {/* Darkened/Vignetted Overlay for Text Readability & Golden Mood */}
              <div className={`absolute inset-0 transition-opacity duration-500 ${
                slide.id === 'banner_1' 
                  ? 'bg-gradient-to-r from-black/20 via-transparent to-black/20 bg-black/5' 
                  : 'bg-gradient-to-r from-black/50 via-black/35 to-black/50'
              }`} />
              <div className="absolute inset-0 bg-gradient-to-t from-[#4A3B35]/35 via-transparent to-[#4A3B35]/15" />

              {/* Text Front Centered Content */}
              <div className="absolute inset-0 flex items-end sm:items-center justify-center pb-16 sm:pb-0 p-4">
                <div className="max-w-4xl text-center flex flex-col items-center">
                  {slide.id !== 'banner_1' ? (
                    <>
                      {/* Slow Reveal Subtitle */}
                      <motion.p
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-[10px] sm:text-xs tracking-[0.3em] font-semibold text-primary uppercase mb-3 sm:mb-4 drop-shadow"
                      >
                        {slide.subtitle || 'FRESHLY BAKED HAPPINESS'}
                      </motion.p>

                      {/* Elegant Playfair Large Title */}
                      <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.9 }}
                        className="font-serif italic font-normal text-3xl sm:text-5xl md:text-7xl text-secondary leading-tight tracking-wide mb-6 sm:mb-8 font-serif px-2 sm:px-10 drop-shadow-md"
                      >
                        {slide.title}
                      </motion.h1>
                    </>
                  ) : (
                    // Elegant subtle spacer to clear the embedded image text on mobile or desktop
                    <div className="h-28 sm:h-40" />
                  )}

                  {/* Premium Action Button */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: slide.id === 'banner_1' ? 0.3 : 0.8, duration: 0.6 }}
                  >
                    <button
                      onClick={() => handleShopNow(slide.link)}
                      className="group relative inline-flex items-center gap-3 bg-[#EBCFC8] hover:bg-[#FFF8F6] text-[#4A3B35] tracking-widest text-[10px] sm:text-xs font-bold uppercase px-8 sm:px-10 py-3.5 sm:py-4 rounded shadow-lg overflow-hidden transition-all duration-300 hover:scale-[1.03] border border-[#EBCFC8] cursor-pointer"
                    >
                      <span>Explore Collection</span>
                      <ArrowRight className="h-4.5 w-4.5 group-hover:translate-x-1.5 transition-transform duration-300" />
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
          {/* Left Arrow Trigger */}
          <button
            onClick={handlePrev}
            className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full border border-secondary/20 bg-black/10 text-secondary hover:bg-[#EBCFC8] hover:text-[#4A3B35] transition-all duration-300 cursor-pointer hidden md:flex items-center justify-center opacity-80 hover:opacity-100"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Right Arrow Trigger */}
          <button
            onClick={handleNext}
            className="absolute right-4 sm:right-6 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full border border-secondary/20 bg-black/10 text-secondary hover:bg-[#EBCFC8] hover:text-[#4A3B35] transition-all duration-300 cursor-pointer hidden md:flex items-center justify-center opacity-80 hover:opacity-100"
            aria-label="Next slide"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Bottom Pagination Dots */}
          <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentSlide(idx)}
                className={`h-2 rounded-full transition-all duration-500 cursor-pointer ${
                  idx === currentSlide ? 'w-8 bg-primary shadow-sm' : 'w-2 bg-secondary/50'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        </>
      )}

      {/* Exquisite bottom decorative divider wave */}
      <div className="absolute bottom-0 left-0 w-full h-8 bg-gradient-to-t from-secondary to-transparent pointer-events-none" />
    </section>
  );
};
