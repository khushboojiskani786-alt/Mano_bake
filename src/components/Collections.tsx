import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from './ProductCard';

export const Collections: React.FC = () => {
  const {
    products,
    categories,
    setSelectedCategory,
    setActivePage,
    showToast
  } = useApp();

  const [newsletterEmail, setNewsletterEmail] = useState('');
  const bestSellers = products.filter(p => p.isBestseller);
  const seasonal = products.filter(p => p.isSeasonal);

  const handleCategorySelect = (slug: string) => {
    setSelectedCategory(slug);
    setActivePage('shop');
  };

  return (
    <div id="collections-main" className="space-y-20 py-10 bg-secondary">
      {/* 1. Curated Categories Sections */}
      <section id="featured-categories-grid" className="max-w-7xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-10 px-4">
          <span className="text-[10px] tracking-[0.3em] font-semibold text-accent uppercase block mb-2">
            Fine Confectioneries
          </span>
          <h2 className="font-serif italic text-3xl text-text-dark font-normal leading-tight">
            Curated Categories
          </h2>
          <div className="h-px w-20 bg-accent/40 mx-auto mt-4" />
        </div>

        <div className="sticky top-0 z-50 bg-secondary py-4 px-4 shadow-sm">
          <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 max-w-7xl mx-auto">
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => handleCategorySelect(cat.slug)}
                className="group relative h-48 sm:h-64 rounded-lg overflow-hidden border border-primary/20 bg-[#F5EAE6] cursor-pointer shadow-sm hover:shadow-md hover:border-accent/40 transition-all duration-300"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover object-center transition-transform duration-[800ms] group-hover:scale-110"
                  loading="lazy"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#4A3B35]/75 via-[#4A3B35]/15 to-transparent transition-opacity duration-300 group-hover:from-[#4A3B35]/90" />
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
        </div>
      </section>

      {/* 2. Signature Best Sellers */}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.length > 0 ? (
            bestSellers.map((prod) => (
              <div key={prod.id} className="w-full">
                <ProductCard product={prod} />
              </div>
            ))
          ) : (
            <p className="text-xs text-text-light text-center col-span-full italic">No bestsellers added yet.</p>
          )}
        </div>
      </section>

      {/* Parallax Mid Banner */}
      <section
        id="middle-editorial-strip"
        className="relative bg-cover bg-center h-[50vh] flex items-center justify-center text-center px-4"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1517686469429-8bdb88b9f907?q=80&w=870&auto=format&fit=crop')`,
          backgroundAttachment: 'fixed'
        }}
      >
        <div className="absolute inset-0 bg-[#4A3B35]/50 backdrop-blur-[1px]" />
        <div className="relative max-w-2xl text-center select-none bg-secondary/85 border border-[#EBCFC8]/50 p-6 sm:p-10 rounded shadow-xl">
          <span className="text-[#B9896A] tracking-[0.35em] text-[10px] font-bold uppercase block mb-3">Our Baking Mandate</span>
          <h3 className="font-serif italic text-xl sm:text-2xl text-text-dark font-normal mb-4">
            "We bake with premium organic butter, real vanilla beans, and heaps of love, because your sweet milestones deserve nothing less than perfection."
          </h3>
          <p className="text-[10px] tracking-wider text-text-light font-bold">MANO BAKES BAKERY TEAM — Islamabad</p>
        </div>
      </section>

      {/* 3. Seasonal Confections */}
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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {seasonal.length > 0 ? (
            seasonal.map((prod) => (
              <div key={prod.id} className="w-full">
                <ProductCard product={prod} />
              </div>
            ))
          ) : (
            <p className="text-xs text-text-light text-center col-span-full italic">Check back soon for upcoming limited-run recipes.</p>
          )}
        </div>
      </section>
    </div>
  );
};