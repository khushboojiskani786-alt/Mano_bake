import React from 'react';
import { Award, Compass, Heart, ChefHat } from 'lucide-react';

export const AboutPage: React.FC = () => {
  return (
    <div id="about-page-root" className="max-w-7xl mx-auto px-4 md:px-6 py-28 bg-secondary min-h-screen">
      
      {/* Editorial Header */}
      <div className="text-center max-w-xl mx-auto mb-16 select-none animate-fadeIn">
        <span className="text-[10px] tracking-[0.25em] font-bold text-accent uppercase block mb-1">Our Heritage</span>
        <h1 className="font-serif italic text-3xl sm:text-4xl text-text-dark font-normal">Our Baking Story</h1>
        <p className="text-xs text-text-light mt-2 italic leading-relaxed">
          From a micro-kitchen in Islamabad  to providing bespoke luxury cakes across the city, discover our relentless pursuit of dessert perfection.
        </p>
        <div className="h-px w-20 bg-accent/30 mx-auto mt-4" />
      </div>

      {/* Main split display block */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24 items-center">
        {/* Pictures collage left */}
        <div className="relative aspect-video sm:aspect-square bg-luxury-beige rounded-xl overflow-hidden border border-primary/20 shadow-md">
          <img
            src="https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&q=80&w=1000"
            alt="Chef workspace detailing cakes"
            className="w-full h-full object-cover"
            loading="lazy"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-[#4A3B35]/15" />
        </div>

        {/* Story details right */}
        <div className="space-y-6">
          <span className="text-[10px] tracking-[0.25em] font-semibold text-accent uppercase block">Handcrafted Philosophy</span>
          <h2 className="font-serif italic text-2xl text-text-dark font-medium leading-tight">
            "Baked Daily to Celebrate Life's Fine Flavour"
          </h2>
          <p className="text-xs sm:text-sm text-text-light leading-relaxed italic">
            Mano Bakes was founded with a singular, stubborn goal: to bring the luxury dessert standards of Pink Frost and French patisseries directly home to Islamabad. We set aside industrial cake premixes, artificial colorings, and highly refined corn syrups. Instead, we choose premium butter churned daily, dense Belgian cacao blocks, and organic flour.
          </p>
          <p className="text-xs sm:text-sm text-text-light leading-relaxed italic">
            Each bespoke cake represents hours of drafting, custom icing piping, and delicate sugar-petal modeling. We believe that your milestones—be it a first birthday, an intimate wedding, or a quiet evening high tea—deserves nothing short of an absolute sensory masterpiece.
          </p>
          
          <div className="grid grid-cols-2 gap-4 border-t border-primary/10 pt-6">
            <div className="flex gap-2.5 items-start">
              <ChefHat className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-text-dark uppercase tracking-wide">Artisanal Patissiers</h4>
                <p className="text-[10px] text-text-light mt-0.5 leading-relaxed">Our head chefs are certified in classical European buttercream techniques.</p>
              </div>
            </div>
            <div className="flex gap-2.5 items-start">
              <Compass className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="text-xs font-bold text-text-dark uppercase tracking-wide">Bespoke Customization</h4>
                <p className="text-[10px] text-text-light mt-0.5 leading-relaxed">Choose precise sponge modifiers, specific frosting colorings, and card greetings.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Culinary Virtues list */}
      <section id="story-virtues" className="bg-[#F5EAE6]/50 rounded-xl p-8 sm:p-12 border border-primary/15">
        <div className="max-w-3xl mx-auto text-center mb-10 select-none">
          <span className="text-[10px] tracking-widest text-[#B9896A] font-bold uppercase block mb-1">Our Standards</span>
          <h3 className="font-serif italic text-2xl text-text-dark">Sourcing Code of Conduct</h3>
          <div className="h-px w-16 bg-[#B9896A]/40 mx-auto mt-2" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center sm:text-left border-b md:border-b-0 md:border-r border-primary/10 pb-6 md:pb-0 md:pr-6 last:border-0 last:pr-0">
            <h4 className="font-serif italic text-md text-text-dark font-semibold mb-2">1. Madagascar Vanilla Beans</h4>
            <p className="text-xs text-text-light leading-relaxed italic">
              We completely discard vanilla powder substitutes. Our custom sponge recipes utilize real seeds scraped straight from whole premium Madagascar beans for authentic aroma profiles.
            </p>
          </div>
          <div className="text-center sm:text-left border-b md:border-b-0 md:border-r border-primary/10 pb-6 md:pb-0 md:pr-6 last:border-0 last:pr-0">
            <h4 className="font-serif italic text-md text-text-dark font-semibold mb-2">2. Single-Origin Belgian Cacao</h4>
            <p className="text-xs text-text-light leading-relaxed italic">
              The rich, moist shine of our fudge cake rests on melting authentic 55% and 72% dark Belgian chocolate blocks—producing a thick, velvety coat that melts at room temperatures.
            </p>
          </div>
          <div className="text-center sm:text-left last:border-0">
            <h4 className="font-serif italic text-md text-text-dark font-semibold mb-2">3. Fresh Local Farm Dairy</h4>
            <p className="text-xs text-text-light leading-relaxed italic">
              Fresh liquid cream and churned sweet-cream butter arrive every single morning from local organic dairy farms, preserving absolute freshness and a silk-soft icing texture.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
};
