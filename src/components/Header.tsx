import React, { useState, useEffect } from 'react';
import { useApp, ActivePage } from '../context/AppContext';
import { ShoppingBag, Search, User, Menu, X, ChevronDown, Award, Eye, ShieldAlert } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const Header: React.FC = () => {
  const {
    activePage,
    setActivePage,
    cart,
    setCartOpen,
    categories,
    setSelectedCategory,
    isAdminMode,
    setAdminMode,
    showToast
  } = useApp();

  const [isSticky, setIsSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [shopDropdownOpen, setShopDropdownOpen] = useState(false);
  const [localSearch, setLocalSearch] = useState('');
  const [searchBarOpen, setSearchBarOpen] = useState(false);

  // Monitor scroll height for sticky effect
  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);

  const handleNavClick = (page: ActivePage) => {
    setActivePage(page);
    setMobileMenuOpen(false);
    setShopDropdownOpen(false);
  };

  const selectCategoryFromNav = (slug: string) => {
    setSelectedCategory(slug);
    setActivePage('shop');
    setShopDropdownOpen(false);
    setMobileMenuOpen(false);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (localSearch.trim()) {
      setActivePage('shop');
      setSelectedCategory('all');
      setSelectedCategory('all');
      showToast(`Searching for "${localSearch}"...`, 'info');
      // Set search query in global state
      const { setSearchQuery } = useApp();
      // We do it asynchronously or chain it
    }
    setSearchBarOpen(false);
  };

  return (
    <header
      id="main-luxury-header"
      className={`fixed top-0 left-0 w-full z-[990] transition-all duration-300 ${isSticky
        ? 'bg-secondary/95 backdrop-blur-md shadow-md py-2 border-b border-primary/20'
        : 'bg-transparent py-4'
        }`}
    >
      {/* Top Banner Alert (Promotional & Admin Sandbox Indicator) */}
      <div className="bg-[#EBCFC8] text-[#4A3B35] text-center py-2 text-[11px] tracking-[0.2em] font-bold uppercase flex justify-center items-center gap-3 px-4 select-none">
        <span>Complimentary delivery on orders above 5,000 PKR</span>
        <div className="hidden sm:flex h-3 w-px bg-[#4A3B35]/25"></div>

      </div>

      <div className="max-w-7xl mx-auto px-4 md:px-6 flex items-center justify-between mt-2">
        {/* Mobile Hamburger Icon */}
        <button
          id="btn-mobile-menu-toggle"
          onClick={() => setMobileMenuOpen(true)}
          className="lg:hidden p-2 text-text-dark hover:text-accent transition-colors"
          aria-label="Open navigation menu"
        >
          <Menu className="h-6 w-6" />
        </button>

        <div
          id="brand-logo-container"
          onClick={() => setActivePage('home')}
          className="cursor-pointer flex items-center group hidden md:flex"
        >
          {/* The Pink Circle Container */}
          <div className="relative h-14 w-14 sm:h-16 sm:w-16 bg-[#F4D3CD] rounded-full border border-[#D9AB9E]/60 p-1 shadow-inner flex items-center justify-center overflow-hidden transition-transform duration-500 hover:scale-105">

            {/* ADD YOUR LOGO IMAGE HERE */}
            <img
              src="/public/logo.png"
              alt="Mano Bakes Logo"
              className="w-full h-full object-contain"
            />

          </div>

          <div className="hidden md:flex flex-col ml-3 select-none">
            {/* Your text content remains here */}
          </div>
        </div>
        {/* NAVIGATION Centered (Desktop) */}
        <nav id="desktop-nav" className="hidden lg:flex items-center gap-8 font-medium text-sm text-text-dark/95">
          <button
            onClick={() => handleNavClick('home')}
            className={`hover:text-accent tracking-widest uppercase transition-colors py-2 relative ${activePage === 'home' ? 'text-accent font-semibold' : ''
              }`}
          >
            Home
            {activePage === 'home' && (
              <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 w-full h-[2px] bg-accent" />
            )}
          </button>

          {/* Luxury Dropdown for Shop */}
          <div
            className="relative"
            onMouseEnter={() => setShopDropdownOpen(true)}
            onMouseLeave={() => setShopDropdownOpen(false)}
          >
            <button
              onClick={() => handleNavClick('shop')}
              className={`hover:text-accent tracking-widest uppercase transition-colors py-2 flex items-center gap-1 ${activePage === 'shop' ? 'text-accent font-semibold' : ''
                }`}
            >
              Shop
              <ChevronDown className={`h-3 w-3 transition-transform duration-300 ${shopDropdownOpen ? 'rotate-180' : ''}`} />
              {activePage === 'shop' && (
                <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 w-full h-[2px] bg-accent" />
              )}
            </button>

            {/* Dropdown Box */}
            <AnimatePresence>
              {shopDropdownOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 15 }}
                  transition={{ duration: 0.2 }}
                  className="absolute left-0 top-full mt-0 w-56 bg-secondary border border-primary/20 rounded shadow-xl py-3 z-[999] backdrop-blur-md"
                >
                  <button
                    onClick={() => selectCategoryFromNav('all')}
                    className="w-full text-left px-5 py-2 text-xs uppercase tracking-wider text-text-dark hover:bg-primary/20 hover:text-accent transition-colors duration-200"
                  >
                    View All Products
                  </button>
                  <div className="h-px bg-text-dark/5 my-1 mx-4"></div>
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => selectCategoryFromNav(cat.slug)}
                      className="w-full text-left px-5 py-2 text-xs uppercase tracking-wider text-text-dark hover:bg-primary/20 hover:text-accent transition-colors duration-200"
                    >
                      {cat.name}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <button
            onClick={() => handleNavClick('customize')}
            className={`hover:text-accent tracking-widest uppercase transition-colors py-2 relative ${activePage === 'customize' ? 'text-accent font-semibold' : ''
              }`}
          >
            Customize
            {activePage === 'customize' && (
              <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 w-full h-[2px] bg-accent" />
            )}
          </button>

          <button
            onClick={() => handleNavClick('about')}
            className={`hover:text-accent tracking-widest uppercase transition-colors py-2 relative ${activePage === 'about' ? 'text-accent font-semibold' : ''
              }`}
          >
            Our Story
            {activePage === 'about' && (
              <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 w-full h-[2px] bg-accent" />
            )}
          </button>

          <button
            onClick={() => handleNavClick('contact')}
            className={`hover:text-accent tracking-widest uppercase transition-colors py-2 relative ${activePage === 'contact' ? 'text-accent font-semibold' : ''
              }`}
          >
            Contact
            {activePage === 'contact' && (
              <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 w-full h-[2px] bg-accent" />
            )}
          </button>

          <button
            onClick={() => handleNavClick('order-tracking')}
            className={`hover:text-accent tracking-widest uppercase transition-colors py-2 relative ${activePage === 'order-tracking' ? 'text-accent font-semibold' : ''
              }`}
          >
            Track Order
            {activePage === 'order-tracking' && (
              <motion.div layoutId="nav-underline" className="absolute bottom-0 left-0 w-full h-[2px] bg-accent" />
            )}
          </button>

          {isAdminMode && (
            <button
              onClick={() => handleNavClick('admin-dashboard')}
              className={`text-[#B9896A] border border-[#B9896A]/30 hover:bg-[#B9896A]/10 font-bold tracking-widest uppercase transition-all px-3 py-1.5 rounded text-xs py-2 relative flex items-center gap-1 ${activePage === 'admin-dashboard' ? 'bg-[#B9896A]/20' : ''
                }`}
            >
              Admin Suite
            </button>
          )}
        </nav>

        {/* UTILITIES / CART on Right */}
        <div id="header-utilities" className="flex items-center gap-2 sm:gap-4 text-text-dark">
          {/* Quick Search trigger */}
          <button
            onClick={() => setSearchBarOpen(!searchBarOpen)}
            className="p-2 hover:text-accent transition-colors hidden sm:block"
            aria-label="Toggle search container"
          >
            <Search className="h-5 w-5" />
          </button>

          {/* Account Profile / Admin Toggler */}
          <button
            onClick={() => handleNavClick('account')}
            className={`p-2 hover:text-accent transition-colors ${activePage === 'account' ? 'text-accent' : ''
              }`}
            aria-label="View user profile account"
          >
            <User className="h-5 w-5" />
          </button>

          {/* Shopping Bag Icon with animated counts */}
          <button
            id="btn-cart-drawer-trigger"
            onClick={() => setCartOpen(true)}
            className="relative p-2 text-text-dark hover:text-accent transition-colors flex items-center"
            aria-label="Open premium slide cart"
          >
            <ShoppingBag className="h-5 w-5 stroke-[1.8]" />
            <AnimatePresence>
              {totalCartItems > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute -top-1 -right-1 bg-accent text-[#FFF8F6] text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center shadow-md select-none"
                >
                  {totalCartItems}
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Floating Animated Expandable Search Bar */}
      <AnimatePresence>
        {searchBarOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute left-0 w-full bg-secondary border-b border-primary/30 p-4 shadow-md z-[80] mt-1"
          >
            <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex gap-2">
              <input
                type="text"
                placeholder="What luxury bakery slice are indeed craving today? (e.g. chocolate fudge, biscoff, flower cake)..."
                value={localSearch}
                onChange={(e) => setLocalSearch(e.target.value)}
                className="flex-1 border border-primary/60 rounded bg-[#FFF8F6] px-4 py-2 text-sm text-text-dark italic focus:outline-none focus:border-accent"
                autoFocus
              />
              <button
                type="submit"
                className="bg-accent hover:bg-accent/90 text-white text-xs font-semibold uppercase tracking-wider px-6 py-2 rounded transition-colors"
              >
                Search
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* MOBILE Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop cover */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 z-[9990]"
            />

            {/* Main drawer slider */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 max-w-xs w-full bg-secondary z-[9999] shadow-2xl p-6 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-8 border-b border-primary/20 pb-4">
                  <div className="flex items-center">
                    <div className="h-10 w-10 bg-[#F4D3CD] rounded-full flex items-center justify-center border border-accent/20">
                      <span className="font-serif italic text-xs font-semibold text-text-dark font-accent">M</span>
                    </div>
                    <span className="font-serif font-semibold text-md text-text-dark ml-2 uppercase tracking-wide">
                      Mano Bakes
                    </span>
                  </div>
                  <button
                    onClick={() => setMobileMenuOpen(false)}
                    className="p-1 text-text-dark rounded hover:bg-primary/20"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                <div className="flex flex-col gap-5 text-sm font-semibold tracking-widest text-text-dark uppercase">
                  <button
                    onClick={() => handleNavClick('home')}
                    className={`text-left py-2 hover:text-accent transition-colors ${activePage === 'home' ? 'text-accent pl-2 border-l-2 border-accent' : ''
                      }`}
                  >
                    Home
                  </button>

                  <div className="flex flex-col">
                    <button
                      onClick={() => handleNavClick('shop')}
                      className={`text-left py-2 hover:text-accent transition-colors ${activePage === 'shop' ? 'text-accent pl-2 border-l-2 border-accent font-bold' : ''
                        }`}
                    >
                      Shop Collection
                    </button>
                    {/* Category quick filters underneath Shop on mobile menu */}
                    <div className="pl-4 flex flex-col gap-2.5 mt-2 border-l border-primary/30">
                      {categories.map((cat) => (
                        <button
                          key={cat.id}
                          onClick={() => selectCategoryFromNav(cat.slug)}
                          className="text-left text-xs text-text-light hover:text-accent capitalize tracking-wider py-1"
                        >
                          {cat.name}
                        </button>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => handleNavClick('customize')}
                    className={`text-left py-2 hover:text-accent transition-colors ${activePage === 'customize' ? 'text-accent pl-2 border-l-2 border-accent' : ''
                      }`}
                  >
                    Customize Cake
                  </button>

                  <button
                    onClick={() => handleNavClick('about')}
                    className={`text-left py-2 hover:text-accent transition-colors ${activePage === 'about' ? 'text-accent pl-2 border-l-2 border-accent' : ''
                      }`}
                  >
                    Our Story
                  </button>

                  <button
                    onClick={() => handleNavClick('contact')}
                    className={`text-left py-2 hover:text-accent transition-colors ${activePage === 'contact' ? 'text-accent pl-2 border-l-2 border-accent' : ''
                      }`}
                  >
                    Contact
                  </button>

                  <button
                    onClick={() => handleNavClick('order-tracking')}
                    className={`text-left py-2 hover:text-accent transition-colors ${activePage === 'order-tracking' ? 'text-accent pl-2 border-l-2 border-accent' : ''
                      }`}
                  >
                    Track Order
                  </button>

                  {isAdminMode && (
                    <button
                      onClick={() => handleNavClick('admin-dashboard')}
                      className={`text-left py-2 text-accent font-bold flex items-center gap-1.5 ${activePage === 'admin-dashboard' ? 'pl-2 border-l-2 border-accent' : ''
                        }`}
                    >
                      Admin Dashboard
                    </button>
                  )}
                </div>
              </div>

              {/* Developer Sandbox Indicators on Drawer bottom */}
              <div className="border-t border-primary/20 pt-6">
                <p className="text-[10px] tracking-wider text-text-light font-medium uppercase mb-2">Sandbox Controller</p>
                <button
                  onClick={() => {
                    setAdminMode(!isAdminMode);
                    setMobileMenuOpen(false);
                    showToast(
                      `Switched to ${!isAdminMode ? 'Admin Portal' : 'Customer Storefront'} view`,
                      'info'
                    );
                  }}
                  className="w-full flex items-center justify-center gap-1.5 border border-accent/40 rounded py-2.5 px-2 text-[10px] font-bold uppercase tracking-widest text-accent hover:bg-[#B9896A]/10 bg-white shadow-sm whitespace-nowrap overflow-hidden"
                >
                  <Award className="h-4 w-4" />
                  {isAdminMode ? 'Deactivate Admin' : 'Sandbox Admin Login'}
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header >
  );
};
