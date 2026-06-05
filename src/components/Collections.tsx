import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';
import { Star, Award, ShieldCheck, CupSoda, MapPin, CheckCircle, Quote } from 'lucide-react';
import { motion } from 'motion/react';

export const Collections: React.FC = () => {
  const {
    products,
    categories,
    setSelectedCategory,
    setActivePage,
    reviews,
    showToast
  } = useApp();

  const [newsletterEmail, setNewsletterEmail] = useState('');

  const bestSellers = products.filter(p => p.isBestseller);
  const seasonal = products.filter(p => p.isSeasonal);

  // Filter approved five star reviews
  const topReviews = reviews.filter(r => r.rating === 5 && r.approved).slice(0, 3);

  const handleCategorySelect = (slug: string) => {
    setSelectedCategory(slug);
    setActivePage('shop');
  };

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newsletterEmail.trim()) {
      showToast('Welcome to the Secret Recipes list! Check your inbox for exclusive updates.', 'success');
      setNewsletterEmail('');
    }
  };

  return (
    <div id="collections-main" className="space-y-20 py-10 bg-secondary">
      
      {/* 1. Curated Categories Sections Grid */}
      <section id="featured-categories-grid" className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[10px] tracking-[0.3em] font-semibold text-accent uppercase block mb-2">
            Fine Confectioneries
          </span>
          <h2 className="font-serif italic text-3xl text-text-dark font-normal leading-tight">
            Curated Categories
          </h2>
          <div className="h-px w-20 bg-accent/40 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {categories.map((cat, idx) => (
            <div
              key={cat.id}
              onClick={() => handleCategorySelect(cat.slug)}
              className="group relative h-48 sm:h-64 rounded-lg overflow-hidden border border-primary/20 bg-[#F5EAE6] cursor-pointer shadow-sm hover:shadow-md hover:border-accent/40 transition-all duration-300"
            >
              {/* Image banner */}
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover object-center transition-transform duration-[800ms] group-hover:scale-110"
                loading="lazy"
                referrerPolicy="no-referrer"
              />

              {/* Tint overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-[#4A3B35]/75 via-[#4A3B35]/15 to-transparent transition-opacity duration-300 group-hover:from-[#4A3B35]/90" />

              {/* Category labels bottom aligned */}
              <div className="absolute bottom-0 left-0 w-full p-4 flex flex-col justify-end text-center sm:text-left select-none">
                <span className="text-[10px] sm:text-xs text-primary tracking-widest font-bold uppercase transition-transform duration-300 group-hover:translate-x-1">
                  Collection
                </span>
                <h3 className="font-serif text-sm sm:text-lg text-[#FFF8F6] font-normal leading-tight mt-0.5 sm:mt-1 font-accent">
                  {cat.name}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2. Signature Best Sellers Carousel / Bento Grid */}
      <section id="milestones-bestsellers" className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[10px] tracking-[0.3em] font-semibold text-accent uppercase block mb-2">
            Mano Bakes Favourites
          </span>
          <h2 className="font-serif italic text-3xl text-text-dark font-normal leading-tight">
            Our Signature Best Sellers
          </h2>
          <div className="h-px w-20 bg-accent/40 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.length > 0 ? (
            bestSellers.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))
          ) : (
            <p className="text-xs text-text-light text-center col-span-full italic">No bestsellers added yet.</p>
          )}
        </div>
      </section>

      {/* Parallax Mid Banner - Mano Bakes Philosophy */}
      <section
        id="middle-editorial-strip"
        className="relative bg-cover bg-center h-[50vh] flex items-center justify-center text-center px-4"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1517433456452-f9633a875f6f?auto=format&fit=crop&q=80&w=1400')`,
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-[#4A3B35]/50 backdrop-blur-[1px]" />
        
        <div className="relative max-w-2xl text-center select-none bg-secondary/85 border border-[#EBCFC8]/50 p-6 sm:p-10 rounded shadow-xl">
          <span className="text-[#B9896A] tracking-[0.35em] text-[10px] font-bold uppercase block mb-3">Our Baking Mandate</span>
          <h3 className="font-serif italic text-xl sm:text-2xl text-text-dark font-normal mb-4 font-serif">
            "We bake with premium organic butter, real vanilla beans, and heaps of love, because your sweet milestones deserve nothing less than perfection."
          </h3>
          <p className="text-[10px] tracking-wider text-text-light font-bold">MANO BAKES BAKERY TEAM — KARACHI</p>
        </div>
      </section>

      {/* 3. Curated Seasonal Confections Drawer list */}
      <section id="milestones-seasonal" className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="text-[10px] tracking-[0.3em] font-semibold text-accent uppercase block mb-2">
            Limited Creations
          </span>
          <h2 className="font-serif italic text-3xl text-text-dark font-normal leading-tight">
            Bespoke Seasonal Confections
          </h2>
          <div className="h-px w-20 bg-accent/40 mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {seasonal.length > 0 ? (
            seasonal.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))
          ) : (
            <p className="text-xs text-text-light text-center col-span-full italic">Check back soon for upcoming limited-run recipes.</p>
          )}
        </div>
      </section>

      {/* 4. Luxury Trust Elements Column List */}
      <section id="luxury-virtues" className="bg-luxury-beige/40 py-16 border-y border-primary/20">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Virtue 1 */}
            <div className="text-center p-4">
              <div className="h-12 w-12 bg-[#F4D3CD]/60 border border-accent/20 rounded-full flex items-center justify-center mx-auto text-text-dark mb-4 shadow-sm">
                <ShieldCheck className="h-5 w-5" />
              </div>
              <h4 className="font-serif italic text-md text-text-dark font-semibold mb-2">Premium Ingredients only</h4>
              <p className="text-xs text-text-light leading-relaxed max-w-xs mx-auto">
                No artificial presets or high-fructose syrups. We source real cream-butter, Belgian chocolate fudge, and fresh farm milk.
              </p>
            </div>

            {/* Virtue 2 */}
            <div className="text-center p-4">
              <div className="h-12 w-12 bg-[#F4D3CD]/60 border border-accent/20 rounded-full flex items-center justify-center mx-auto text-text-dark mb-4 shadow-sm">
                <MapPin className="h-5 w-5" />
              </div>
              <h4 className="font-serif italic text-md text-text-dark font-semibold mb-2">Islamabad Wide Luxury Delivery</h4>
              <p className="text-xs text-text-light leading-relaxed max-w-xs mx-auto">
                Shipped in high-grade insulated boxes via dedicated riders to defend your delicate multi-tiered cake details in transport.
              </p>
            </div>

            {/* Virtue 3 */}
            <div className="text-center p-4">
              <div className="h-12 w-12 bg-[#F4D3CD]/60 border border-accent/20 rounded-full flex items-center justify-center mx-auto text-text-dark mb-4 shadow-sm">
                <CupSoda className="h-5 w-5" />
              </div>
              <h4 className="font-serif italic text-md text-text-dark font-semibold mb-2">Bespoke Flavor Customizations</h4>
              <p className="text-xs text-text-light leading-relaxed max-w-xs mx-auto">
                Add precise cake writing, specific colors, and choose gluten-free custom cake sponge options in our easy cart configurations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Customer Reviews testimonial stack */}
      {topReviews.length > 0 && (
        <section id="confectionery-testimonials" className="max-w-5xl mx-auto px-4 md:px-6">
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="text-[10px] tracking-[0.3em] font-semibold text-accent uppercase block mb-2">
              Patron Affection
            </span>
            <h2 className="font-serif italic text-2xl text-text-dark font-normal leading-tight">
              Love Letters from Customers
            </h2>
            <div className="h-px w-20 bg-accent/40 mx-auto mt-4" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topReviews.map((rev) => (
              <div
                key={rev.id}
                className="bg-white border border-primary/20 rounded-lg p-6 relative shadow-sm hover:translate-y-[-2px] transition-transform duration-300"
              >
                <Quote className="absolute top-4 right-4 h-8 w-8 text-primary/20" />
                <div className="flex items-center gap-1 text-accent mb-3.5">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="h-3.5 w-3.5 fill-accent stroke-none" />
                  ))}
                </div>
                <p className="text-xs text-text-dark tracking-wide italic leading-relaxed mb-4">
                  "{rev.comment}"
                </p>
                <div className="border-t border-primary/10 pt-3 flex items-center justify-between">
                  <span className="text-[10px] uppercase font-bold text-text-dark tracking-wide">{rev.customerName}</span>
                  <span className="text-[9px] text-[#B9896A] font-medium block">Verified Patron</span>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* 6. Newsletter Signup editorial row */}
      <section id="bakery-newsletter" className="max-w-4xl mx-auto px-4 md:px-6 bg-[#F4D3CD]/30 border border-primary/30 rounded-xl p-8 sm:p-12 text-center relative overflow-hidden">
        <div className="absolute right-0 top-0 h-24 w-24 bg-[#EBCFC8]/40 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute left-0 bottom-0 h-24 w-24 bg-[#B9896A]/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-xl mx-auto">
          <span className="text-[10px] tracking-[0.25em] font-bold text-accent uppercase mb-2 block">Mano Bakes Chronicles</span>
          <h2 className="font-serif italic text-2xl text-text-dark font-medium mb-3">Join the Sweet-Tooth List</h2>
          <p className="text-xs text-text-light leading-relaxed mb-6 italic">
            Receive recipes tips, invitations to preview tastings in Islamabad, and custom discount updates straight to your mailbox.
          </p>

          <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <input
              type="email"
              required
              placeholder="Your elegant email address..."
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="flex-grow border border-primary/50 rounded bg-white px-4 py-2.5 text-xs text-text-dark italic focus:outline-none focus:border-accent"
            />
            <button
              type="submit"
              className="bg-accent hover:bg-accent/95 text-[#FFF8F6] font-bold tracking-widest uppercase text-xs px-6 py-2.5 rounded shadow transition-all duration-300"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

    </div>
  );
};
