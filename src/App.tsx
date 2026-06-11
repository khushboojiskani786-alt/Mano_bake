import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/Header';
import { HeroSlider } from './components/HeroSlider';
import { Collections } from './components/Collections';
import { ShopPage } from './components/ShopPage';
import { ProductDetails } from './components/ProductDetails';
import { Checkout } from './components/Checkout';
import { OrderTracker } from './components/OrderTracker';
import { AdminPanel } from './components/AdminPanel';
import { AboutPage } from './components/AboutPage';
import { ContactPage } from './components/ContactPage';
import { AccountPage } from './components/AccountPage';
import { CustomizePage } from './components/CustomizePage';
import { CartDrawer } from './components/CartDrawer';
import { Notification } from './components/Notification';
import { Instagram, Facebook, Mail, Phone, MapPin, Sparkles, AlertCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const AppContent: React.FC = () => {
  const { activePage, showCart, setShowCart, isAdminMode } = useApp();

  // Primary routing controller matching user pages
  const renderActivePage = () => {
    switch (activePage) {
      case 'home':
        return (
          <>
            <HeroSlider />
            <Collections />
            {/* About Page integrated into Home view */}
            <AboutPage />
          </>
        );
      case 'shop':
        return <ShopPage />;
      case 'product-details':
        return <ProductDetails />;
      case 'checkout':
        return <Checkout />;
      case 'order-tracking':
        return <OrderTracker />;
      case 'customize':
        return <CustomizePage />;
      case 'admin':
        return <AdminPanel />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      case 'account':
        return <AccountPage />;
      default:
        return (
          <>
            <HeroSlider />
            <Collections />
            <AboutPage />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-secondary text-text-dark flex flex-col selection:bg-[#F4D3CD]/80 selection:text-text-dark">

      {/* 1. Header (Sticky navigation) */}
      <Header />

      {/* Admin Mode floating alert reminder */}
      {isAdminMode && (
        <div id="admin-mode-banner" className="fixed top-18 left-0 right-0 z-40 bg-zinc-900 text-white text-center py-2 text-[10px] tracking-widest uppercase font-bold flex items-center justify-center gap-1.5 shadow-md">
          <AlertCircle className="h-3.5 w-3.5 text-accent" /> Mode: Boutique Admin Suite Active.
        </div>
      )}

      {/* 2. Main Page Render viewport */}
      <main className="flex-grow overflow-x-hidden pt-28">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePage}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.28, ease: "easeInOut" }}
          >
            {renderActivePage()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* 3. Sliding premium Shopping Cart Drawer */}
      <CartDrawer isOpen={showCart} onClose={() => setShowCart(false)} />

      {/* 4. Global Toast System notifier */}
      <Notification />

      {/* 5. Luxury Page Footer */}
      <footer id="mano-bakes-footer" className="bg-[#4A3B35] text-secondary border-t-2 border-[#EBCFC8] pt-16 pb-10">
        <div className="max-w-7xl mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 text-center md:text-left select-none">
            <div className="space-y-4">
              <div className="flex items-center justify-center md:justify-start gap-1">
                <Sparkles className="h-5 w-5 text-[#EBCFC8] animate-spin-slow" />
                <span className="font-serif italic text-lg sm:text-xl text-[#FFF8F6] tracking-wider font-accent">
                  Mano Bakes
                </span>
              </div>
              <p className="text-[11px] leading-relaxed italic text-white/70 max-w-xs mx-auto md:ml-0">
                Crafting finest, temperature-conscious cakes, classic macarons, and signature cupcakes across F-6, F-7, DHA, and greater Islamabad. We honor celebration cake craft.
              </p>
              <div className="flex justify-center md:justify-start gap-3.5 pt-2 text-[#EBCFC8]">
                <a href="#instagram" className="hover:text-white transition duration-200" aria-label="Follow us on Instagram">
                  <Instagram className="h-4.5 w-4.5" />
                </a>
                <a href="#facebook" className="hover:text-white transition duration-200" aria-label="Like us on Facebook">
                  <Facebook className="h-4.5 w-4.5" />
                </a>
                <a href="#whats-mail" className="hover:text-white transition duration-200" aria-label="Drop us an email">
                  <Mail className="h-4.5 w-4.5" />
                </a>
              </div>
            </div>
            <div className="space-y-4 text-xs font-medium">
              <h4 className="font-semibold text-[#EBCFC8] uppercase tracking-widest text-[10px]">Studio Coordinates</h4>
              <div className="space-y-3 text-white/85 leading-relaxed font-serif italic text-[11px]">
                <div className="flex gap-2 items-start justify-center md:justify-start">
                  <MapPin className="h-4.5 w-4.5 text-[#EBCFC8] flex-shrink-0" />
                  <span>Sector F-7, Islamabad, Federal Capital, Pakistan.</span>
                </div>
                <div className="flex gap-2 items-center justify-center md:justify-start">
                  <Phone className="h-4.5 w-4.5 text-[#EBCFC8] flex-shrink-0" />
                  <span className="font-mono">0300-1234567 | (051) 321-4567</span>
                </div>
              </div>
            </div>
            <div className="space-y-4">
              <h4 className="font-semibold text-[#EBCFC8] uppercase tracking-widest text-[10px]">Preparation Timelines</h4>
              <ul className="text-[11px] text-white/80 space-y-2 leading-relaxed">
                <li className="italic"><span className="font-bold text-[#EBCFC8]">Storefront Hours:</span> 11:00 AM – 10:00 PM</li>
                <li className="italic"><span className="font-bold text-[#EBCFC8]">Dispatch Shifts:</span> 12:00 PM, 3:00 PM, 6:00 PM</li>
                <li className="text-[10px] text-white/60">Please book 24-hours prior for custom theme cakes and writing request orders.</li>
              </ul>
            </div>
            <div className="space-y-4 text-xs">
              <h4 className="font-semibold text-[#EBCFC8] uppercase tracking-widest text-[10px]">Authentic Standards</h4>
              <p className="text-[11px] text-white/70 italic leading-relaxed max-w-xs mx-auto md:ml-0">
                Our kitchen strictly follows organic hand-beating procedures. No artificial food gelatin, fat emulsifiers, or preservatives are allowed on active tables.
              </p>
              <div className="bg-[#5c4a42] border border-white/10 rounded px-3 py-2 text-center text-[10px] tracking-wider text-white/80 font-bold uppercase select-none">
                🔒 SSL SECURED PORTAL
              </div>
            </div>
          </div>
          <div className="border-t border-white/10 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center text-[10px] text-white/50 tracking-wider text-center sm:text-left select-none">
            <p>© 2026 Mano Bakes Patisserie. All rights reserved across Islamabad. Inspired by Pink Frost aesthetics.</p>
            <p className="mt-2 sm:mt-0 italic hover:text-[#EBCFC8] transition duration-200 hover:cursor-pointer">
              Crafted with Premium Standard Butter & Sugar
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}