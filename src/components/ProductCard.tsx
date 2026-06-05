import React, { useState } from 'react';
import { Product } from '../types';
import { useApp } from '../context/AppContext';
import { Eye, ShoppingBag, Star, X, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, setActivePage, setSelectedProductId } = useApp();
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const [hovered, setHovered] = useState(false);

  // Quick View options states
  const [flavor, setFlavor] = useState(product.flavors[0] || 'Default');
  const [size, setSize] = useState(product.sizes[0] || 'Default');
  const [message, setMessage] = useState('');
  const [qt, setQt] = useState(1);

  const handleCardClick = () => {
    setSelectedProductId(product.id);
    setActivePage('product-details');
  };

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart({
      product,
      selectedFlavor: product.flavors[0] || 'Classic',
      selectedSize: product.sizes[0] || 'Standard',
      customMessage: '',
      quantity: 1
    });
  };

  const handleQuickViewAdd = () => {
    addToCart({
      product,
      selectedFlavor: flavor,
      selectedSize: size,
      customMessage: message,
      quantity: qt
    });
    setQuickViewOpen(false);
    setMessage('');
    setQt(1);
  };

  return (
    <>
      {/* Product Card Container */}
      <div
        id={`product-card-${product.id}`}
        className="group flex flex-col bg-secondary border border-primary/20 rounded-lg overflow-hidden transition-all duration-500 shadow-sm cursor-pointer hover:shadow-md hover:border-accent/40"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={handleCardClick}
      >
        {/* Image Box */}
        <div className="relative aspect-square w-full bg-luxury-beige overflow-hidden">
          {/* Zooming background image */}
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
            referrerPolicy="no-referrer"
          />

          {/* Quick-add floating status markers (Seasonal / Bestseller) */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5 select-none pointer-events-none">
            {product.isBestseller && (
              <span className="bg-[#B9896A] text-[#FFF8F6] text-[8px] sm:text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow">
                Bestseller
              </span>
            )}
            {product.isSeasonal && (
              <span className="bg-[#EBCFC8] text-[#4A3B35] text-[8px] sm:text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow border border-primary/30">
                Seasonal
              </span>
            )}
            {!product.inStock && (
              <span className="bg-red-200 text-red-800 text-[8px] sm:text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded shadow">
                Sold Out
              </span>
            )}
          </div>

          {/* Luxury On-Hover Overlay Actions (Desktop) */}
          <div className="absolute inset-0 bg-[#4A3B35]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 hidden sm:flex items-center justify-center gap-3">
            <button
              onClick={(e) => {
                e.stopPropagation();
                setQuickViewOpen(true);
              }}
              className="p-3 bg-secondary rounded-full text-text-dark hover:bg-accent hover:text-white transition-all duration-300 shadow shadow-black/10 hover:scale-105"
              aria-label="Quick overview modal"
            >
              <Eye className="h-4.5 w-4.5" />
            </button>
            {product.inStock && (
              <button
                onClick={handleQuickAdd}
                className="p-3 bg-secondary rounded-full text-text-dark hover:bg-accent hover:text-white transition-all duration-300 shadow shadow-black/10 hover:scale-105"
                aria-label="Add directly to cart"
              >
                <ShoppingBag className="h-4.5 w-4.5" />
              </button>
            )}
          </div>

          {/* Mobile Quick Add action banner always visible but stylized */}
          {!product.inStock ? (
            <div className="absolute bottom-0 left-0 w-full bg-red-100/90 text-center py-1.5 text-[9px] font-bold uppercase tracking-widest text-red-800 sm:hidden">
              Out of Stock
            </div>
          ) : (
            <button
              onClick={handleQuickAdd}
              className="absolute bottom-0 left-0 w-full bg-[#EBCFC8]/90 text-center py-2 text-[10px] font-bold uppercase tracking-widest text-text-dark sm:hidden flex items-center justify-center gap-1 bg-opacity-95"
            >
              <ShoppingBag className="h-3 w-3" /> Quick Add
            </button>
          )}
        </div>

        {/* Product Meta details */}
        <div id={`product-info-${product.id}`} className="p-4 flex-1 flex flex-col justify-between">
          <div>
            {/* Elegant reviews/rating row */}
            <div className="flex items-center gap-1 mb-1.5">
              <div className="flex items-center text-accent">
                <Star className="h-3 w-3 fill-accent" />
                <span className="text-[10px] font-semibold text-text-dark ml-1">{product.rating}</span>
              </div>
              <span className="text-[9px] text-text-light">({product.reviewsCount} reviews)</span>
            </div>

            {/* Breathtaking brand title text */}
            <h3 className="font-serif italic text-sm text-text-dark tracking-wide font-medium leading-tight mb-2 group-hover:text-accent transition-colors">
              {product.name}
            </h3>
          </div>

          <div className="flex items-center justify-between border-t border-primary/10 pt-2 mt-auto">
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-text-dark">
                Rs. {product.price.toLocaleString()}
              </span>
              {product.originalPrice && (
                <div className="flex items-center gap-1.5 mt-0.5">
                  <span className="text-[10px] line-through text-text-light/70 decoration-[#B9896A]/60 font-medium font-mono">
                    Rs. {product.originalPrice.toLocaleString()}
                  </span>
                  <span className="text-[8px] font-bold text-[#B9896A] bg-[#FFF8F6] px-1 rounded border border-[#EBCFC8]/45">
                    {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                  </span>
                </div>
              )}
            </div>
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#B9896A] flex items-center gap-0.5 group-hover:translate-x-1 transition-transform">
              Order <ChevronRight className="h-3 w-3" />
            </span>
          </div>
        </div>
      </div>

      {/* QUICK VIEW ANIMATED MODAL BOX */}
      <AnimatePresence>
        {quickViewOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            {/* Backdrop cover */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setQuickViewOpen(false)}
              className="absolute inset-0 bg-black/60"
            />

            {/* Modal Body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="relative w-full max-w-3xl bg-secondary rounded-lg overflow-hidden shadow-2xl border border-primary/20 z-10 flex flex-col md:flex-row max-h-[90vh] md:max-h-[80vh]"
            >
              <button
                onClick={() => setQuickViewOpen(false)}
                className="absolute top-4 right-4 z-20 p-2 bg-secondary rounded-full border border-primary/20 text-text-dark hover:text-accent transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="h-4.5 w-4.5" />
              </button>

              {/* Left Column: Product Image Gallery Carousel */}
              <div className="w-full md:w-1/2 bg-luxury-beige flex items-center justify-center relative aspect-square md:aspect-auto">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Right Column: Custom Configuration selections */}
              <div className="w-full md:w-1/2 p-6 overflow-y-auto flex flex-col justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-widest text-accent font-bold mb-1 block">Mano Bakes Premium</span>
                  <h2 className="font-serif italic text-xl text-text-dark font-medium leading-tight mb-2">{product.name}</h2>
                  
                   {/* Price info */}
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-lg font-bold text-text-dark font-mono">Rs. {product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                      <>
                        <span className="text-xs line-through text-text-light/70 font-medium font-mono">
                          Rs. {product.originalPrice.toLocaleString()}
                        </span>
                        <span className="text-[9px] uppercase font-bold tracking-wider text-[#B9896A] bg-[#FFF8F6] px-1.5 py-0.5 rounded border border-[#EBCFC8]/50">
                          {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                        </span>
                      </>
                    )}
                  </div>
                  
                  {/* Small description snippet */}
                  <p className="text-xs text-text-light leading-relaxed mb-6 italic">{product.description}</p>

                  <div className="space-y-4">
                    {/* Flavor Options Selection */}
                    {product.flavors.length > 0 && (
                      <div>
                        <label className="text-[10px] tracking-wider uppercase font-bold text-text-dark block mb-2">
                          Select Flavor Option
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {product.flavors.map((fl) => (
                            <button
                              key={fl}
                              onClick={() => setFlavor(fl)}
                              className={`px-3 py-1.5 border rounded text-xs tracking-wider capitalize transition-all ${
                                flavor === fl
                                  ? 'border-accent bg-[#B9896A] text-[#FFF8F6] font-medium shadow-sm'
                                  : 'border-primary/40 text-text-light bg-white hover:border-accent hover:text-text-dark'
                              }`}
                            >
                              {fl}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Sizing options Selection */}
                    {product.sizes.length > 0 && (
                      <div className="mt-4">
                        <label className="text-[10px] tracking-wider uppercase font-bold text-text-dark block mb-2">
                          Choose Cake Size / Weight
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {product.sizes.map((sz) => (
                            <button
                              key={sz}
                              onClick={() => setSize(sz)}
                              className={`px-3 py-1.5 border rounded text-xs tracking-wider capitalize transition-all ${
                                size === sz
                                  ? 'border-accent bg-[#B9896A] text-[#FFF8F6] font-medium shadow-sm'
                                  : 'border-primary/40 text-text-light bg-white hover:border-accent'
                              }`}
                            >
                              {sz}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Personal Custom Message on Cake box */}
                    <div className="mt-4">
                      <label className="text-[10px] tracking-wider uppercase font-bold text-text-dark block mb-2">
                        Writing on Cake / Spl. Message (Optional)
                      </label>
                      <input
                        type="text"
                        placeholder="e.g. 'Happy Birthday Amina!' max 30 chars..."
                        maxLength={35}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full border border-primary/40 rounded bg-white px-3 py-2 text-xs text-text-dark focus:outline-none focus:border-accent italic"
                      />
                    </div>
                  </div>
                </div>

                <div className="border-t border-primary/20 pt-4 mt-6">
                  {/* Quantity and Actions row */}
                  <div className="flex items-center gap-4">
                    <div className="flex items-center border border-primary/40 rounded bg-white">
                      <button
                        onClick={() => setQt(Math.max(1, qt - 1))}
                        className="px-3 py-1.5 text-text-light hover:text-text-dark transition-colors font-semibold"
                      >
                        -
                      </button>
                      <span className="px-4 py-1.5 text-xs text-text-dark font-bold font-mono">{qt}</span>
                      <button
                        onClick={() => setQt(qt + 1)}
                        className="px-3 py-1.5 text-text-light hover:text-text-dark transition-colors font-semibold"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={handleQuickViewAdd}
                      className="flex-1 bg-accent hover:bg-accent/95 text-[#FFF8F6] font-bold tracking-widest uppercase text-xs py-3 rounded shadow transition-all hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
                    >
                      <ShoppingBag className="h-4 w-4" /> Add To Shopping Drawer
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
