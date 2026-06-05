import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ShoppingBag, ArrowLeft, Calendar, Clock, CreditCard, Lock, CheckCircle, Truck, MapPin } from 'lucide-react';
import * as db from '../db';
import { Order } from '../types';

export const Checkout: React.FC = () => {
  const {
    cart,
    clearCart,
    cartInstructions,
    currentUser,
    setCurrentUser,
    setActivePage,
    setTrackingOrderId,
    showToast
  } = useApp();

  // Delivery states
  const [deliveryMethod, setDeliveryMethod] = useState<'delivery' | 'pickup'>('delivery');
  const [name, setName] = useState(currentUser?.name || 'Khushboo Jiskani');
  const [phone, setPhone] = useState(currentUser?.phone || '0300-1234567');
  const [email, setEmail] = useState(currentUser?.email || 'khushboojiskani786@gmail.com');
  const [address, setAddress] = useState(currentUser?.address || 'Sector F-7, Islamabad');
  const [delivDate, setDelivDate] = useState('');
  const [delivTime, setDelivTime] = useState('1:00 PM - 3:00 PM (Standard Afternoon)');
  
  // Custom mock checkout status
  const [loading, setLoading] = useState(false);
  const [detectingLoc, setDetectingLoc] = useState(false);

  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = deliveryMethod === 'pickup' ? 0 : (subtotal > 5000 || subtotal === 0 ? 0 : 350);
  const totalAmount = subtotal + deliveryFee;

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      showToast('Geolocation is not supported by your browser.', 'error');
      return;
    }
    setDetectingLoc(true);
    showToast('Communicating with global coordinates system...', 'info');
    
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          // Attempt reverse geocoding via OpenStreetMap's Nominatim API!
          const res = await fetch(
            `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`,
            {
              headers: {
                'Accept-Language': 'en',
                'User-Agent': 'ManoBakesApp/1.0'
              }
            }
          );
          if (res.ok) {
            const data = await res.json();
            if (data && data.display_name) {
              setAddress(data.display_name);
              showToast('Location automatically detected and parsed successfully!', 'success');
              setDetectingLoc(false);
              return;
            }
          }
          throw new Error('Nominatim parse error');
        } catch (err) {
          console.warn('Network reverse geocoding failed, falling back to approximation.', err);
          // High quality coordinate approximation for Islamabad center (around 33.7, 73.0)
          let approxSector = 'Sector F-7, Islamabad, Pakistan';
          const latDiff = Math.abs(latitude - 33.729);
          const lonDiff = Math.abs(longitude - 73.093);
          
          if (latDiff < 0.04 && lonDiff < 0.04) {
            approxSector = `Sector F-7/1, near Atelier (Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)})`;
          } else {
            approxSector = `Islamabad Area (Lat: ${latitude.toFixed(4)}, Lon: ${longitude.toFixed(4)})`;
          }
          setAddress(approxSector);
          showToast('Determined global coordinates helper successfully!', 'success');
        }
        setDetectingLoc(false);
      },
      (error) => {
        console.warn('Geolocation blocked or timed out', error);
        setDetectingLoc(false);
        showToast('Location permission denied or timed out. Please choose a sector below.', 'info');
      },
      { enableHighAccuracy: true, timeout: 7000 }
    );
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) {
      showToast('Your shopping bag is empty.', 'error');
      return;
    }
    if (!delivDate) {
      showToast('Please select your preferred pickup or delivery date first.', 'error');
      return;
    }

    setLoading(true);

    // Simulate luxury packaging, card approvals
    setTimeout(() => {
      const uniqueId = `MB-${Math.floor(1000 + Math.random() * 9000)}`;
      const resolvedAddress = deliveryMethod === 'pickup' 
        ? "Self-Pickup (Mano Bakes Atelier, House 12-B, Street 33, Sector F-7/1, Islamabad)" 
        : address;

      const newOrder: Order = {
        id: uniqueId,
        customerName: name,
        customerEmail: email,
        customerPhone: phone,
        address: resolvedAddress,
        deliveryDate: delivDate,
        deliveryTime: delivTime,
        items: [...cart],
        notes: cartInstructions,
        totalAmount: totalAmount,
        status: 'pending', // Starts at placed/pending
        createdAt: new Date().toISOString()
      };

      // Add to database
      db.addOrder(newOrder);

      // Cache user details for next orders
      setCurrentUser({ name, email, phone, address: resolvedAddress });

      // Clear Shopping Cart
      clearCart();

      // Setup tracking variables
      setTrackingOrderId(uniqueId);
      
      setLoading(false);
      showToast(`Exquisite Order ${uniqueId} placed successfully! Appointing bakers.`, 'success');
      
      // Redirect straight to Order Tracker page!
      setActivePage('order-tracking');
    }, 1800);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-32 text-center bg-secondary min-h-screen flex flex-col items-center justify-center">
        <div className="h-14 w-14 bg-luxury-beige rounded-full border border-primary/20 flex items-center justify-center text-text-light mb-4">
          <ShoppingBag className="h-6 w-6" />
        </div>
        <h2 className="font-serif italic text-lg text-text-dark font-semibold">Your shopping tray is currently empty</h2>
        <p className="text-xs text-text-light max-w-sm mt-1.5 leading-relaxed italic">
          To perform checkout, please return to our dessert menus and append your desired floral cakes or chocolate selections first.
        </p>
        <button
          onClick={() => setActivePage('shop')}
          className="mt-6 bg-[#EBCFC8] text-text-dark text-xs font-bold tracking-widest uppercase px-6 py-2.5 rounded hover:bg-white border border-[#EBCFC8]"
        >
          Explore Back
        </button>
      </div>
    );
  }

  return (
    <div id="checkout-root" className="max-w-7xl mx-auto px-4 md:px-6 py-28 bg-secondary min-h-screen">
      
      <button
        onClick={() => setActivePage('shop')}
        className="mb-8 hover:text-accent font-bold uppercase tracking-widest text-xs text-text-dark flex items-center gap-1.5 transition-colors cursor-pointer"
      >
        <ArrowLeft className="h-4 w-4" /> Change Meal Items
      </button>

      <div className="text-center max-w-xl mx-auto mb-10 select-none">
        <span className="text-[10px] tracking-[0.25em] font-bold text-accent uppercase block mb-1">Islamabad Bespoke Service</span>
        <h1 className="font-serif italic text-2xl sm:text-3xl text-text-dark font-normal">Secure Gourmet Checkout</h1>
        <div className="h-px w-20 bg-accent/30 mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column (8 cols): Delivery Details Form */}
        <div className="lg:col-span-7 bg-white border border-primary/15 rounded-lg p-6 sm:p-8 shadow-sm">
          <h2 className="font-serif italic text-lg text-text-dark font-semibold mb-6 flex items-center gap-1.5">
            <Truck className="h-5 w-5 text-accent" /> Recipient & Dispatch Method
          </h2>

          <form onSubmit={handlePlaceOrder} className="space-y-6">
            
            {/* Delivery Method Toggle */}
            <div className="grid grid-cols-2 gap-3 bg-[#FFF8F6] p-1 border border-[#EBCFC8]/50 rounded-md shadow-xs mb-3">
              <button
                type="button"
                onClick={() => {
                  setDeliveryMethod('delivery');
                  showToast('Selected Premium Home Delivery', 'info');
                }}
                className={`py-2 px-3 rounded text-[10px] sm:text-xs tracking-wider uppercase font-bold flex items-center justify-center gap-1.5 transition-all outline-none ${
                  deliveryMethod === 'delivery'
                    ? 'bg-[#B9896A] text-white shadow-sm'
                    : 'text-text-dark hover:bg-neutral-50'
                }`}
              >
                <Truck className="h-3.5 w-3.5" />
                Home Delivery
              </button>
              <button
                type="button"
                onClick={() => {
                  setDeliveryMethod('pickup');
                  showToast('Selected Self-Pickup from Atelier', 'info');
                }}
                className={`py-2 px-3 rounded text-[10px] sm:text-xs tracking-wider uppercase font-bold flex items-center justify-center gap-1.5 transition-all outline-none ${
                  deliveryMethod === 'pickup'
                    ? 'bg-[#B9896A] text-white shadow-sm'
                    : 'text-text-dark hover:bg-neutral-50'
                }`}
              >
                <ShoppingBag className="h-3.5 w-3.5" />
                Self Pickup
              </button>
            </div>

            {/* Standard contact inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] tracking-wider uppercase font-bold text-text-dark block mb-1.5">Recipient Full Name</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-primary/40 rounded px-3 py-2 text-xs italic focus:outline-none focus:border-accent"
                />
              </div>

              <div>
                <label className="text-[10px] tracking-wider uppercase font-bold text-text-dark block mb-1.5">Contact Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. 0300-1234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-primary/40 rounded px-3 py-2 text-xs font-mono focus:outline-none focus:border-accent"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="sm:col-span-2">
                <label className="text-[10px] tracking-wider uppercase font-bold text-text-dark block mb-1.5">Email Address (For Invoices)</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-primary/40 rounded px-3 py-2 text-xs italic focus:outline-none focus:border-accent"
                />
              </div>
            </div>

            {/* Delivery address landmark input / Pick up instructions card */}
            {deliveryMethod === 'delivery' ? (
              <div className="space-y-2_5 animate-fadeIn">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                  <label className="text-[10px] tracking-wider uppercase font-bold text-text-dark">
                    Delivery Address & Landmark (Islamabad ONLY)
                  </label>
                  <button
                    type="button"
                    disabled={detectingLoc}
                    onClick={handleDetectLocation}
                    className="text-[9px] uppercase tracking-widest font-bold text-[#B9896A] hover:bg-[#B9896A]/10 border border-[#B9896A]/30 rounded px-2.5 py-1 bg-white/70 transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  >
                    <MapPin className={`h-3 w-3 ${detectingLoc ? 'animate-bounce' : ''}`} />
                    {detectingLoc ? 'Detecting Coordinates...' : '📍 Auto Detect Location'}
                  </button>
                </div>
                <textarea
                  required={deliveryMethod === 'delivery'}
                  rows={2}
                  placeholder="e.g. Apartment/House No, Street, Sector Block, Islamabad Landmark..."
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full border border-primary/40 rounded px-3 py-2 text-xs italic focus:outline-none focus:border-accent leading-relaxed"
                />
                
                {/* Popular Sector Pills */}
                <div className="flex flex-wrap items-center gap-1.5 pt-1.5">
                  <span className="text-[8px] text-[#A2877C] font-bold uppercase tracking-wider">Quick Sectors:</span>
                  {['F-7', 'F-6', 'E-7', 'G-11', 'I-8', 'H-8', 'DHA Phase 2', 'Bahria Town'].map((sec) => (
                    <button
                      key={sec}
                      type="button"
                      onClick={() => {
                        setAddress(`Sector ${sec}, Islamabad, Pakistan`);
                        showToast(`Set address to Sector ${sec}`, 'success');
                      }}
                      className={`text-[8px] font-bold tracking-wider px-2 py-0.5 rounded border transition-colors ${
                        address.includes(sec)
                          ? 'bg-[#B9896A] text-white border-transparent'
                          : 'bg-white text-text-light border-primary/25 hover:bg-[#FFF8F6]'
                      }`}
                    >
                      {sec}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              /* Self-Pickup Confirmation Board */
              <div className="bg-[#FFF8F6] border border-[#EBCFC8]/50 rounded-md p-4 text-center select-none animate-fadeIn">
                <MapPin className="h-6 w-6 text-[#B9896A] mx-auto mb-1.5 animate-pulse" />
                <h4 className="text-xs font-serif italic text-text-dark font-bold">Pick Up Point: Mano Bakes Atelier</h4>
                <p className="text-[11px] text-[#A2877C] mt-0.5 leading-relaxed">
                  House 12-B, Street 33, Sector F-7/1, Islamabad. <br/>
                  <span className="text-text-dark font-semibold">Pickup Timings Support: 11:00 AM - 9:00 PM Daily.</span>
                </p>
                <p className="text-[9px] text-[#B9896A] mt-2 font-medium italic bg-white/70 inline-block px-3 py-1 rounded border border-[#EBCFC8]/20">
                  Ready at your selected pickup window. Perfect temperature-controlled packaging is fully active.
                </p>
              </div>
            )}

            {/* Premium Date & Hour Selectors (CRITICAL FOR BAKERY FRESHNESS!) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 border-t border-primary/10 pt-4">
              <div>
                <label className="text-[10px] tracking-wider uppercase font-bold text-text-dark block mb-1.5 flex items-center gap-1">
                  <Calendar className="h-3.5 w-3.5 text-accent" /> Choose {deliveryMethod === 'pickup' ? 'Pickup' : 'Delivery'} Date
                </label>
                <input
                  type="date"
                  required
                  min={new Date(Date.now() + 86400000).toISOString().split('T')[0]} // Min is tomorrow
                  value={delivDate}
                  onChange={(e) => setDelivDate(e.target.value)}
                  className="w-full border border-primary/40 rounded px-3 py-2 text-xs font-mono focus:outline-none focus:border-accent cursor-pointer"
                />
                <p className="text-[9px] text-[#A2877C] italic mt-1 font-medium">Please order 24 hours in advance for custom piping.</p>
              </div>

              <div>
                <label className="text-[10px] tracking-wider uppercase font-bold text-text-dark block mb-1.5 flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5 text-accent" /> Hourly Pickup & Dispatch Time
                </label>
                <select
                  value={delivTime}
                  onChange={(e) => setDelivTime(e.target.value)}
                  className="w-full border border-primary/40 rounded px-3 py-2 text-xs font-semibold focus:outline-none focus:border-accent cursor-pointer"
                >
                  <option value="11:00 AM - 1:00 PM (Morning Dispatch)">11:00 AM - 1:00 PM (Morning slots)</option>
                  <option value="1:00 PM - 3:00 PM (Standard Afternoon)">1:00 PM - 3:00 PM (Afternoon slots)</option>
                  <option value="3:00 PM - 5:00 PM (Late Afternoon)">3:00 PM - 5:00 PM (Late afternoon)</option>
                  <option value="5:00 PM - 7:00 PM (Dinner Hour Prep)">5:00 PM - 7:00 PM (Dinner hours)</option>
                  <option value="7:00 PM - 9:00 PM (Late High Tea Treat)">7:00 PM - 9:00 PM (Late high-tea)</option>
                </select>
                <p className="text-[9px] text-[#A2877C] italic mt-1 font-medium">Dedicated riders preserve cake temperature structures.</p>
              </div>
            </div>

            {/* Luxury Mock payment section */}
            <div className="bg-luxury-beige/45 rounded border border-primary/20 p-4 mt-6">
              <span className="text-[10px] tracking-wider uppercase font-bold text-text-dark block mb-3 flex items-center gap-1">
                <CreditCard className="h-3.5 w-3.5 text-accent" /> Settlement Option
              </span>

              <div className="space-y-2_5">
                <label className="flex items-center gap-3 bg-white border border-accent rounded p-3 cursor-pointer shadow-xs select-none">
                  <input type="radio" name="paymentOption" defaultChecked className="text-accent focus:ring-accent" />
                  <div>
                    <span className="text-xs font-bold text-text-dark block">Cash on Delivery (COD) / Bank Transfer</span>
                    <span className="text-[10px] text-text-light block leading-relaxed mt-0.5">
                      Pay our rider in cash upon receipt or transfer directly via Easypaisa/HBL after order verification!
                    </span>
                  </div>
                </label>
              </div>
            </div>

            {/* Lock Secure note */}
            <div className="flex items-center gap-2 text-text-light justify-center pt-2 select-none">
              <Lock className="h-3.5 w-3.5" />
              <span className="text-[10px] uppercase font-bold tracking-widest text-[#B9896A]">SSL Secured Handcrafted Procurement</span>
            </div>

            {/* Place Order Trigger */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#B9896A] hover:bg-[#B9896A]/95 disabled:bg-primary/50 text-[#FFF8F6] font-bold tracking-widest uppercase text-xs py-4 rounded shadow-lg transition-transform hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer mt-4"
            >
              {loading ? (
                <>
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Submitting Recipe Orders...</span>
                </>
              ) : (
                <>
                  <CheckCircle className="h-4 w-4" />
                  <span>Authorize Luxury Order</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Right Column (5 cols): Order Breakdown summary */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-[#FFF8F6] border border-primary/20 rounded-lg p-6 shadow-sm">
            <h3 className="font-serif italic text-md text-text-dark font-semibold mb-4 border-b border-primary/10 pb-2">
              Receipt Breakdown
            </h3>

            {/* List items */}
            <div className="space-y-4 max-h-[40vh] overflow-y-auto no-scrollbar pr-1">
              {cart.map((item, idx) => (
                <div key={idx} className="flex gap-3 justify-between items-start border-b border-primary/5 pb-3 last:border-0 last:pb-0">
                  <div className="flex gap-3">
                    <img
                      src={item.product.images[0]}
                      alt=""
                      className="h-12 w-12 object-cover rounded bg-luxury-beige border border-primary/10"
                      referrerPolicy="no-referrer"
                    />
                    <div>
                      <h4 className="text-xs font-bold text-text-dark leading-tight line-clamp-1">{item.product.name}</h4>
                      <span className="text-[9px] text-[#A2877C] block capitalize mt-0.5">
                        Flavor: {item.selectedFlavor} | Size: {item.selectedSize}
                      </span>
                      {item.customMessage && (
                        <span className="inline-block bg-primary/20 text-text-dark text-[8px] font-medium px-1.5 py-0.2 rounded mt-1 italic font-mono">
                          Writing: "{item.customMessage}"
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <span className="text-xs font-bold text-text-dark block">Rs. {(item.product.price * item.quantity).toLocaleString()}</span>
                    <span className="text-[9px] text-text-light block">Qty: {item.quantity}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Tally calculation cards */}
            <div className="space-y-1.5 text-xs text-text-dark border-t border-primary/15 pt-4 mt-6">
              <div className="flex justify-between text-text-light">
                <span>Dessert Subtotal</span>
                <span>Rs. {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-text-light">
                <span>{deliveryMethod === 'pickup' ? 'Atelier Pickup Service' : 'Insulated Box Packing Delivery'}</span>
                <span>{deliveryFee === 0 ? 'FREE' : `Rs. ${deliveryFee}`}</span>
              </div>
              {cartInstructions && (
                 <div className="bg-white/80 rounded border border-primary/10 p-3 mt-3">
                    <span className="text-[9px] font-bold text-text-dark uppercase tracking-wider block mb-0.5">Order Notes:</span>
                    <p className="text-[10px] text-text-light italic leading-relaxed font-medium">"{cartInstructions}"</p>
                 </div>
              )}
              <div className="h-px bg-primary/20 my-3" />
              <div className="flex justify-between text-sm font-bold text-text-dark bg-[#F4D3CD]/15 p-2 rounded">
                <span>Grand Total Amount</span>
                <span>Rs. {totalAmount.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
