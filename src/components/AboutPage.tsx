import React, { useState } from 'react';
import { Heart, Home, Sparkles, Coffee } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const AboutPage: React.FC = () => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const { showToast } = useApp();

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast(`Thank you! "${newsletterEmail}" has been added to our list.`, 'success');
    setNewsletterEmail('');
  };

  return (
    // Wrapped in a single parent div
    <div id="about-page-root" className="max-w-4xl mx-auto px-4 md:px-6 py-28 bg-secondary min-h-screen space-y-16">

      {/* Existing Content */}
      <div className="text-center max-w-xl mx-auto mb-16 select-none animate-fadeIn">
        <span className="text-[10px] tracking-[0.25em] font-bold text-accent uppercase block mb-1">Our Story</span>
        <h1 className="font-serif italic text-3xl sm:text-4xl text-text-dark font-normal">Born in Our Kitchen</h1>
        <p className="text-xs text-text-light mt-2 italic leading-relaxed">
          It all started with a whisk, an oven, and a simple desire to share the joy of a perfect slice.
        </p>
        <div className="h-px w-20 bg-accent/30 mx-auto mt-4" />
      </div>

      <div className="space-y-10 mb-20">
        <div className="aspect-video rounded-xl overflow-hidden shadow-sm border border-[#EBCFC8]/30">
          <img
            src="https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?q=80&w=870&auto=format&fit=crop"
            alt="Warm home baking scene"
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-6 px-4 md:px-0">
          <p className="text-sm text-text-dark leading-relaxed italic">
            Mano Bakes didn’t start in a boardroom or a commercial lab—it started right here in our home kitchen. What began as weekend experiments for family gatherings quickly became a neighborhood secret. We realized that the store-bought cakes weren't capturing the magic of those warm, buttery childhood memories, so we decided to recreate them ourselves.
          </p>
          <p className="text-sm text-text-dark leading-relaxed italic">
            Everything we bake is made the way we would for our own family. There are no industrial shortcuts, no preservatives to extend shelf life, and definitely no shortcuts on quality. We believe that true luxury isn't about complexity; it's about the simplicity of pure ingredients and the extra time taken to get it just right.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
          <div className="flex gap-4 p-4 border border-primary/10 rounded-lg">
            <Heart className="h-6 w-6 text-accent flex-shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-text-dark uppercase tracking-wide">Made with Love</h4>
              <p className="text-[11px] text-text-light mt-1">Every cake is hand-mixed and carefully decorated in small batches, just for you.</p>
            </div>
          </div>
          <div className="flex gap-4 p-4 border border-primary/10 rounded-lg">
            <Home className="h-6 w-6 text-accent flex-shrink-0" />
            <div>
              <h4 className="text-xs font-bold text-text-dark uppercase tracking-wide">Family Tradition</h4>
              <p className="text-[11px] text-text-light mt-1">Our recipes have been passed down and perfected over countless kitchen experiments.</p>
            </div>
          </div>
        </div>
      </div>

      <section id="our-ingredients" className="bg-[#FFF8F6] p-8 sm:p-12 rounded-xl border border-primary/10">
        <h3 className="font-serif italic text-xl text-text-dark text-center mb-8">From Our Pantry to Your Table</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <Sparkles className="h-6 w-6 text-accent mx-auto mb-3" />
            <h4 className="font-semibold text-xs uppercase tracking-widest mb-2">Real Ingredients</h4>
            <p className="text-[11px] text-text-light italic">We use real farm butter, fresh eggs, and quality cocoa. No hidden additives, ever.</p>
          </div>
          <div className="text-center">
            <Coffee className="h-6 w-6 text-accent mx-auto mb-3" />
            <h4 className="font-semibold text-xs uppercase tracking-widest mb-2">Small Batches</h4>
            <p className="text-[11px] text-text-light italic">By keeping our production small, we ensure every single cupcake and slice is perfection.</p>
          </div>
          <div className="text-center">
            <Heart className="h-6 w-6 text-accent mx-auto mb-3" />
            <h4 className="font-semibold text-xs uppercase tracking-widest mb-2">Your Milestones</h4>
            <p className="text-[11px] text-text-light italic">We are honored to be a small part of your birthdays, anniversaries, and cozy Sunday teas.</p>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section id="bakery-newsletter" className="bg-[#F4D3CD]/30 border border-primary/30 rounded-xl p-8 sm:p-12 text-center relative overflow-hidden">
        <div className="relative z-10 max-w-xl mx-auto">
          <span className="text-[10px] tracking-[0.25em] font-bold text-accent uppercase mb-2 block">Mano Bakes Chronicles</span>
          <h2 className="font-serif italic text-2xl text-text-dark font-medium mb-3">Join the Sweet-Tooth List</h2>
          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="Your elegant email address..."
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-grow border border-primary/50 rounded bg-white px-4 py-2.5 text-xs text-text-dark italic focus:outline-none focus:border-accent"
            />
            <button type="submit" className="bg-accent hover:bg-accent/95 text-[#FFF8F6] font-bold tracking-widest uppercase text-xs px-6 py-2.5 rounded shadow">
              Subscribe
            </button>
          </form>
        </div>
      </section>

    </div>
  );
};