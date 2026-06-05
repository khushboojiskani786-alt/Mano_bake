import React from 'react';
import { useApp } from '../context/AppContext';
import { X, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    cartOpen,
    setCartOpen,
    updateCartQuantity,
    removeFromCart,
    cartInstructions,
    setCartInstructions,
    setActivePage
  } = useApp();

  const handleCheckoutClick = () => {
    if (cart.length === 0) return;
    setCartOpen(false);
    setActivePage('checkout');
  };

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = subtotal > 5000 || subtotal === 0 ? 0 : 350; // Free delivery matching premium above Rs. 5000
  const grandTotal = subtotal + deliveryFee;

  return (
    <AnimatePresence>
      {cartOpen && (
        <>
          {/* Backdrop screen shade */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.5 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black/60 z-[9991] backdrop-blur-xs"
          />

          {/* Sliding Panel */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
            className="fixed inset-y-0 right-0 max-w-md w-full bg-secondary z-[9999] shadow-2xl flex flex-col justify-between"
          >
            {/* Header section */}
            <div className="p-6 border-b border-primary/20 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <ShoppingBag className="h-5 w-5 text-text-dark" />
                <h2 className="font-serif italic text-lg font-semibold text-text-dark font-accent">Your Shopping Drawer</h2>
                <span className="text-[10px] bg-primary/20 text-text-dark px-2 py-0.5 rounded-full font-bold select-none">
                  {cart.length} items
                </span>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="p-1 px-2 rounded border border-primary/20 text-text-dark hover:bg-primary/20 hover:text-accent transition-all cursor-pointer flex items-center justify-center"
                aria-label="Close cart side panel"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Cart Items List */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {cart.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center text-center opacity-85 select-none py-10">
                  <div className="h-16 w-16 bg-luxury-beige rounded-full flex items-center justify-center border border-accent/20 text-text-light mb-4">
                    <ShoppingBag className="h-8 w-8" />
                  </div>
                  <h3 className="font-serif italic text-md text-text-dark font-semibold">Your drawer is empty</h3>
                  <p className="text-xs text-text-light mt-1.5 max-w-xs leading-relaxed">
                    Browse our premium range of bespoke floral cakes and artisanal treats to fill your tray.
                  </p>
                  <button
                    onClick={() => {
                      setCartOpen(false);
                      setActivePage('shop');
                    }}
                    className="mt-6 border border-accent text-accent hover:bg-accent hover:text-[#FFF8F6] text-xs font-bold tracking-widest uppercase px-6 py-2.5 rounded transition-all duration-300"
                  >
                    View Selection
                  </button>
                </div>
              ) : (
                cart.map((item, idx) => (
                  <div
                    key={`${item.product.id}-${item.selectedFlavor}-${item.selectedSize}-${idx}`}
                    className="flex gap-4 border-b border-primary/10 pb-4 last:border-0 last:pb-0 relative group"
                  >
                    {/* Item Thumbnail */}
                    <div className="h-20 w-20 bg-luxury-beige rounded overflow-hidden flex-shrink-0 border border-primary/15">
                      <img
                        src={item.product.images[0]}
                        alt={item.product.name}
                        className="h-full w-full object-cover object-center"
                        referrerPolicy="no-referrer"
                      />
                    </div>

                    {/* Item Metal Content */}
                    <div className="flex-1 min-w-0">
                      <h4 className="font-serif italic text-xs font-medium text-text-dark tracking-wide truncate pr-6 leading-tight">
                        {item.product.name}
                      </h4>
                      
                      {/* Configuration values */}
                      <span className="text-[10px] text-text-light block capitalize mt-1 italic">
                        Flavor: {item.selectedFlavor} | Size: {item.selectedSize}
                      </span>
                      
                      {/* Custom Cake text tag */}
                      {item.customMessage && (
                        <span className="inline-block bg-primary/20 text-text-dark text-[9px] font-medium px-1.5 py-0.5 rounded mt-1 italic font-mono">
                          Writing: "{item.customMessage}"
                        </span>
                      )}

                      <div className="flex items-center justify-between mt-3">
                        {/* Quantity adjusters */}
                        <div className="flex items-center border border-primary/30 rounded bg-white overflow-hidden">
                          <button
                            onClick={() => updateCartQuantity(idx, item.quantity - 1)}
                            className="px-2 py-0.5 text-text-light hover:text-text-dark hover:bg-primary/10 transition-colors font-semibold text-xs"
                          >
                            -
                          </button>
                          <span className="px-3 py-0.5 text-[10px] text-text-dark font-bold font-mono bg-luxury-beige select-none">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateCartQuantity(idx, item.quantity + 1)}
                            className="px-2 py-0.5 text-text-light hover:text-text-dark hover:bg-primary/10 transition-colors font-semibold text-xs"
                          >
                            +
                          </button>
                        </div>

                        {/* Price tally */}
                        <span className="text-xs font-bold text-text-dark">
                          Rs. {(item.product.price * item.quantity).toLocaleString()}
                        </span>
                      </div>
                    </div>

                    {/* Trash buttons */}
                    <button
                      onClick={() => removeFromCart(idx)}
                      className="absolute top-0 right-0 p-1 text-text-light hover:text-red-700 transition-colors hover:bg-red-50 rounded"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Bottom calculation and action footer block */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-primary/20 bg-luxury-beige/45">
                {/* Custom instructions box */}
                <div className="mb-4">
                  <label htmlFor="cart-drawer-notes" className="text-[10px] tracking-wider uppercase font-bold text-text-dark block mb-1.5">
                    Order Notes & Special Instructions
                  </label>
                  <textarea
                    id="cart-drawer-notes"
                    placeholder="e.g. Please send plastic butter knives, write 'HBD' in white cursive, deliver via gate-4..."
                    rows={2}
                    value={cartInstructions}
                    onChange={(e) => setCartInstructions(e.target.value)}
                    className="w-full border border-primary/30 rounded bg-white px-3 py-1.5 text-xs text-text-dark focus:outline-none focus:border-accent italic leading-relaxed"
                  />
                </div>

                {/* Pricing tallies rows */}
                <div className="space-y-1.5 text-xs text-text-dark border-t border-primary/10 pt-3">
                  <div className="flex justify-between text-text-light">
                    <span>Subtotal</span>
                    <span>Rs. {subtotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-text-light">
                    <span>Delivery Fee (Islamabad)</span>
                    <span>{deliveryFee === 0 ? 'FREE' : `Rs. ${deliveryFee}`}</span>
                  </div>
                  {deliveryFee > 0 && (
                     <p className="text-[9px] text-[#B9896A] italic -mt-1 block">Free delivery applies above Rs. 5,000</p>
                  )}
                  <div className="h-px bg-primary/20 my-2" />
                  <div className="flex justify-between text-sm font-bold text-text-dark">
                    <span>Grand Total</span>
                    <span>Rs. {grandTotal.toLocaleString()}</span>
                  </div>
                </div>

                {/* Checkout Trigger */}
                <button
                  onClick={handleCheckoutClick}
                  className="w-full bg-accent hover:bg-accent/95 text-[#FFF8F6] font-bold tracking-widest uppercase text-xs py-3.5 rounded mt-5 shadow duration-300 flex items-center justify-center gap-2 hover:scale-[1.01] cursor-pointer"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="h-4 w-4" />
                </button>

                <button
                  onClick={() => setCartOpen(false)}
                  className="w-full text-center text-[10px] text-text-light hover:text-text-dark font-bold uppercase tracking-widest mt-3 transition-colors block"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};
