import React from 'react';
import { Sparkles, Calendar, Truck, CreditCard, ChevronRight, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';

export const PromoDeal: React.FC = () => {
  const { setActivePage, setSelectedProductId } = useApp();

  const handleClaimDeal = () => {
    // Direct link to the featured 1-pound cake deal product!
    setSelectedProductId('prod_deal_1');
    setActivePage('product-details');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div id="special-promotional-flyer" className="max-w-4xl mx-auto px-4 sm:px-6 my-10 animate-fadeIn">
      {/* Container simulating a boutique flyer sheet layout */}
      <div className="bg-[#FFF8F6] border-2 border-[#EBCFC8] rounded-xl overflow-hidden shadow-md relative pb-8">
        
        {/* Flyer Top Header Block */}
        <div className="flex flex-col sm:flex-row justify-between items-center px-6 py-6 border-b border-[#EBCFC8]/40 gap-4 sm:gap-0 bg-white">
          <div className="text-center sm:text-left select-noneTheme">
            <div className="flex items-center justify-center sm:justify-start gap-1 mb-1">
              <span className="h-6 w-px bg-accent/60 mr-1 block" />
              <h3 className="font-serif italic text-2xl text-text-dark font-medium tracking-wide">
                MANO BAKES
              </h3>
            </div>
            <p className="text-[10px] sm:text-xs tracking-[0.25em] text-[#A2877C] font-semibold uppercase">
              Home Bakery &bull; Freshly Baked Happiness
            </p>
          </div>
          
          {/* Special Offer badge mimicking the flyer top right box */}
          <div className="bg-[#4A3B35] text-white px-5 py-3 rounded text-center select-none shadow-sm min-w-[120px] border border-white/10">
            <span className="text-[8px] tracking-[0.2em] font-bold text-[#EBCFC8] uppercase block mb-0.5">Special</span>
            <span className="font-serif italic text-lg text-white font-normal block leading-tight">Offer</span>
            <span className="text-[10px] font-mono tracking-wider text-[#EBCFC8] font-bold block mt-0.5">2026</span>
          </div>
        </div>

        {/* Diamond limited banner */}
        <div className="bg-[#4D3932] text-[#F3E5E3] text-center py-2.5 px-4 text-[9px] sm:text-[11px] tracking-[0.2em] uppercase font-bold flex items-center justify-center gap-3.5 select-none font-sans">
          <span className="text-[#EBCFC8] text-xs">&bull;</span>
          <span>LIMITED TIME DEAL &mdash; DON'T MISS OUT</span>
          <span className="text-[#EBCFC8] text-xs">&bull;</span>
        </div>

        {/* Core Deal Presentation */}
        <div className="px-6 sm:px-12 pt-10 pb-8 text-center relative select-none">
          <div className="absolute top-2 right-10 text-accent/15">
            <Sparkles className="h-20 w-20 animate-pulse" />
          </div>

          <p className="text-xs sm:text-sm text-[#A2877C] font-serif italic mb-3">
            Introducing our most loved deal yet &mdash;
          </p>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-10 my-4">
            
            {/* Visual Cake vector replacement */}
            <div className="relative p-2 bg-white rounded-full border border-[#EBCFC8]/30 shadow-xs flex-shrink-0 animate-bounce-slow">
              <div className="h-20 w-20 sm:h-24 sm:w-24 bg-[#FCF0ED] rounded-full flex items-center justify-center text-4xl sm:text-5xl">
                🎂
              </div>
              <div className="absolute -bottom-1 -right-1 bg-accent text-white p-1 rounded-full text-[8px] px-1.5 font-bold shadow-sm uppercase tracking-wider">
                1 Lb
              </div>
            </div>

            {/* Price banner */}
            <div className="text-center md:text-left">
              <h2 className="font-serif italic text-3xl sm:text-4xl text-text-dark font-normal leading-tight">
                1 Pound Cake <span className="font-sans font-light text-xl sm:text-2xl text-[#A2877C] ml-1">only at</span>
              </h2>
              <div className="flex items-baseline justify-center md:justify-start gap-2.5 mt-2">
                <span className="text-base sm:text-lg font-mono font-bold text-text-dark uppercase tracking-wider">PKR</span>
                <span className="text-5xl sm:text-6xl font-serif italic text-[#C26D7C] font-normal tracking-tight">
                  1,000
                </span>
                <span className="text-xs font-semibold text-[#A2877C] uppercase tracking-[0.2em] ml-1">
                  Only_
                </span>
              </div>
              <p className="text-[10px] sm:text-xs text-[#A2877C] italic mt-1.5 pl-0.5">
                Freshly baked &bull; Custom premium flavours available
              </p>
            </div>
          </div>
        </div>

        {/* Validity Box */}
        <div className="max-w-xl mx-auto px-4 mb-8">
          <div className="bg-gradient-to-r from-[#8E6351] to-[#734F3F] text-white rounded-lg p-5 flex flex-col sm:flex-row justify-between items-center shadow border border-white/5 relative overflow-hidden select-none">
            <div className="absolute top-0 right-0 h-full w-24 bg-white/5 skew-x-12 translate-x-10 pointer-events-none" />
            
            <div className="text-center sm:text-left space-y-1 z-10 mb-3.5 sm:mb-0">
              <span className="text-[8px] sm:text-[9px] tracking-widest font-bold text-[#EBCFC8] uppercase block flex items-center justify-center sm:justify-start gap-1">
                📅 OFFER VALID
              </span>
              <h4 className="font-serif italic text-lg sm:text-xl text-white font-normal">
                20th &mdash; 27th May 2026
              </h4>
              <p className="text-[9px] text-[#FFF8F6]/75 uppercase tracking-wider pl-0.5 font-mono">
                Atelier Islamabad
              </p>
            </div>

            <div className="h-px sm:h-12 w-full sm:w-px bg-white/20 my-2 sm:my-0" />

            <div className="text-center z-10 sm:pr-2">
              <span className="font-serif italic text-3xl sm:text-4xl text-[#EBCFC8] leading-none block">
                8 Days
              </span>
              <span className="text-[8px] sm:text-[9px] font-mono tracking-widest uppercase text-white font-bold block mt-1 select-none">
                ONLY &bull; HURRY!
              </span>
            </div>
          </div>
        </div>

        {/* Bento Grid Logistics */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-6 sm:px-12 select-none">
          {/* Delivery Block */}
          <div className="bg-white border border-[#EBCFC8]/50 rounded-lg p-4 flex gap-4 items-start shadow-xs">
            <div className="p-2.5 bg-[#FFF8F6] border border-[#EBCFC8]/30 rounded text-[#B9896A] flex-shrink-0">
              <Truck className="h-5 w-5" />
            </div>
            <div>
              <h5 className="text-[10px] sm:text-xs tracking-wider uppercase font-bold text-text-dark">Bespoke Delivery</h5>
              <p className="text-[11px] text-[#A2877C] mt-1 leading-relaxed italic">
                Home delivery service available via <span className="font-bold text-[#4A3B35]">InDrive</span> riders across any sector of Islamabad.
              </p>
            </div>
          </div>

          {/* Payment Block */}
          <div className="bg-white border border-[#EBCFC8]/50 rounded-lg p-4 flex gap-4 items-start shadow-xs">
            <div className="p-2.5 bg-[#FFF8F6] border border-[#EBCFC8]/30 rounded text-[#B9896A] flex-shrink-0">
              <CreditCard className="h-5 w-5" />
            </div>
            <div>
              <h5 className="text-[10px] sm:text-xs tracking-wider uppercase font-bold text-text-dark">Secure Payment</h5>
              <p className="text-[11px] text-[#A2877C] mt-1 leading-relaxed italic">
                Digital ease of payout: <span className="font-bold text-[#4A3B35]">EasyPaisa</span>, <span className="font-bold text-[#4A3B35]">JazzCash</span>, or direct <span className="font-bold text-[#4A3B35]">Bank Wire Transfer</span> accepted.
              </p>
            </div>
          </div>
        </div>

        {/* Call to action pre-booking row */}
        <div className="text-center mt-8 px-6">
          <div className="text-[10px] tracking-[0.25em] font-bold text-accent uppercase mb-3 flex items-center justify-center gap-1.5 select-none">
            <span className="text-[#EBCFC8]">&bull;</span> PRE-BOOKING NOW OPEN! <span className="text-[#EBCFC8]">&bull;</span>
          </div>
          <button
            onClick={handleClaimDeal}
            className="inline-flex items-center gap-2 bg-[#B9896A] hover:bg-[#A8795A] text-[#FFF8F6] px-8 py-3.5 rounded font-bold tracking-widest text-[11px] sm:text-xs uppercase shadow hover:shadow-md transition-all active:scale-[0.98] cursor-pointer"
          >
            <ShoppingBag className="h-4 w-4" /> Claim this Special Deal <ChevronRight className="h-3.5 w-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
