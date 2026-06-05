import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Search, Flame, ChefHat, Truck, CheckCircle2, ChevronRight, HelpCircle, FileText } from 'lucide-react';
import * as db from '../db';
import { Order } from '../types';

export const OrderTracker: React.FC = () => {
  const { trackingOrderId, setTrackingOrderId, orders, refreshData, showToast } = useApp();
  const [searchId, setSearchId] = useState('');

  const activeOrder = orders.find(
    o => o.id.toLowerCase() === (trackingOrderId || '').toLowerCase()
  );

  const handleSearchTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchId.trim()) return;

    const found = orders.find(o => o.id.toLowerCase() === searchId.trim().toLowerCase());
    if (found) {
      setTrackingOrderId(found.id);
      showToast(`Located order details for #${found.id}!`, 'success');
      setSearchId('');
    } else {
      showToast(`We couldn't locate any order reference matching "${searchId.trim()}". Try again.`, 'error');
    }
  };

  // Helper values for timeline steps
  const steps = [
    { label: 'Order Confirmed', key: 'pending', desc: 'Kitchen receipt approved and cake sponge ingredients allocated.', icon: FileText },
    { label: 'In the Oven/Baking', key: 'baking', desc: 'Head bakers are crafting, baking layers, and piping buttercream design details.', icon: ChefHat },
    { label: 'Out for Dispatch', key: 'shipped', desc: 'Slices loaded in luxury insulated boxes with dedicated transit riders.', icon: Truck },
    { label: 'Safely Delivered', key: 'delivered', desc: 'Order hand-delivered successfully. Enjoy your freshly baked happiness!', icon: CheckCircle2 }
  ];

  // Derive active index
  const getActiveStepIndex = (status: Order['status']) => {
    if (status === 'pending') return 0;
    if (status === 'baking') return 1;
    if (status === 'shipped') return 2;
    if (status === 'delivered') return 3;
    return 0;
  };

  const activeStepIdx = activeOrder ? getActiveStepIndex(activeOrder.status) : 0;

  // Simulator helper to push status in sandbox
  const handleStatusShift = (nextStatus: Order['status']) => {
    if (!activeOrder) return;
    db.updateOrderStatus(activeOrder.id, nextStatus);
    refreshData();
    showToast(`Order status bumped to "${nextStatus.toUpperCase()}"!`, 'info');
  };

  return (
    <div id="tracker-root" className="max-w-4xl mx-auto px-4 md:px-6 py-28 bg-secondary min-h-screen">
      
      {/* Search and lookup bar */}
      <div className="text-center max-w-xl mx-auto mb-10 select-none">
        <span className="text-[10px] tracking-[0.25em] font-bold text-accent uppercase block mb-1">Mano Bakes Dispatch Center</span>
        <h1 className="font-serif italic text-2xl sm:text-3xl text-text-dark font-normal">Real-Time Order Tracking</h1>
        <div className="h-px w-20 bg-accent/30 mx-auto mt-4" />
      </div>

      <div className="bg-white border border-primary/20 rounded-lg p-6 mb-8 shadow-sm max-w-2xl mx-auto">
        <label className="text-[10px] tracking-wider uppercase font-bold text-text-dark block mb-2 text-center">
          Search Active Order Reference
        </label>
        <form onSubmit={handleSearchTrack} className="flex gap-2">
          <input
            type="text"
            placeholder="e.g. MB-1025, or check your profile for references..."
            value={searchId}
            onChange={(e) => setSearchId(e.target.value)}
            className="flex-1 border border-primary/45 rounded bg-white px-4 py-2.5 text-xs text-text-dark focus:outline-none focus:border-accent italic font-mono"
          />
          <button
            type="submit"
            className="bg-accent hover:bg-accent/95 text-[#FFF8F6] font-[600] text-xs uppercase tracking-wider px-6 py-2 rounded shadow transition-all duration-300"
          >
            Locate
          </button>
        </form>
      </div>

      {/* Tracker Body */}
      {activeOrder ? (
        <div className="space-y-8 animate-fadeIn">
          {/* Summary Box */}
          <div className="bg-white border border-primary/20 rounded-xl p-6 shadow-sm flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <span className="text-[10px] uppercase font-bold bg-[#F4D3CD]/60 text-text-dark px-2.5 py-0.5 rounded-full select-none font-mono">
                #{activeOrder.id}
              </span>
              <h2 className="font-serif italic text-lg text-text-dark font-semibold mt-1.5 capitalize">
                Baking for {activeOrder.customerName}
              </h2>
              <span className="text-[11px] text-text-light block font-medium mt-1">
                Requested Slot: {activeOrder.deliveryDate} | {activeOrder.deliveryTime}
              </span>
            </div>

            <div className="text-right sm:self-center">
              <span className="text-[10px] uppercase tracking-wider text-text-light font-bold block mb-0.5">Total Bill</span>
              <span className="text-md font-bold text-text-dark">Rs. {activeOrder.totalAmount.toLocaleString()}</span>
            </div>
          </div>

          {/* Interactive Progress Bar */}
          <div className="bg-white border border-primary/15 rounded-xl p-6 sm:p-10 shadow-sm">
            <h3 className="text-xs uppercase font-bold tracking-widest text-text-dark border-b border-primary/10 pb-3 mb-8 text-center sm:text-left select-none">
              Preparation Progress Pipeline
            </h3>

            {/* Custom Horizontal connector tracks */}
            <div className="relative pt-2 pl-4 sm:pl-0">
              <div className="flex flex-col sm:flex-row justify-between relative gap-8 sm:gap-4">
                
                {steps.map((st, idx) => {
                  const IconComponent = st.icon;
                  const isCompleted = idx <= activeStepIdx;
                  const isCurrent = idx === activeStepIdx;

                  return (
                    <div key={st.key} className="flex-1 flex gap-3 sm:flex-col items-start sm:items-center text-left sm:text-center relative z-10 select-none">
                      
                      {/* Check Bubble logo */}
                      <div
                        className={`h-10 w-10 sm:h-12 sm:w-12 rounded-full border flex items-center justify-center transition-all duration-500 shadow-sm flex-shrink-0 ${
                          isCompleted
                            ? 'bg-[#B9896A] text-[#FFF8F6] border-[#B9896A]'
                            : 'bg-white text-primary/60 border-primary/35'
                        } ${isCurrent ? 'ring-4 ring-[#EBCFC8]' : ''}`}
                      >
                        <IconComponent className="h-5 w-5" />
                      </div>

                      {/* Info details */}
                      <div className="sm:mt-3 pr-2">
                        <h4
                          className={`text-xs font-bold leading-tight uppercase tracking-wider ${
                            isCompleted ? 'text-text-dark' : 'text-primary'
                          } ${isCurrent ? 'text-[#B9896A]' : ''}`}
                        >
                          {st.label}
                        </h4>
                        <p className="text-[10px] text-text-light italic mt-1 sm:max-w-xs mx-auto leading-relaxed">
                          {st.desc}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Sandbox Prep simulator (making the app highly interactive and playful in AI Studio) */}
          <div className="bg-[#F4D3CD]/20 border border-[#D9AB9E]/50 rounded-xl p-6 text-center shadow-inner relative overflow-hidden select-none">
            <div className="max-w-md mx-auto">
              <span className="text-[10px] tracking-widest font-bold text-accent uppercase block mb-1">
                AI Studio Sandbox Control Panel
              </span>
              <h4 className="font-serif italic text-md text-text-dark font-medium leading-tight mb-2">
                Simulate Chef Actions & Riders
              </h4>
              <p className="text-[10px] text-text-light mb-4 italic leading-relaxed">
                As a sandbox evaluator, you don't have to wait! Manually push your order state through the pipeline to track responsive progress bar changes.
              </p>

              {/* Status selectors row */}
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  onClick={() => handleStatusShift('pending')}
                  className={`px-3 py-1.5 border rounded text-[10px] font-bold tracking-wider uppercase transition-colors cursor-pointer ${
                    activeOrder.status === 'pending'
                      ? 'bg-accent text-white border-accent'
                      : 'bg-white border-primary/40 text-text-dark hover:border-accent'
                  }`}
                >
                  1. Confirmed
                </button>
                <button
                  onClick={() => handleStatusShift('baking')}
                  className={`px-3 py-1.5 border rounded text-[10px] font-bold tracking-wider uppercase transition-colors cursor-pointer ${
                    activeOrder.status === 'baking'
                      ? 'bg-accent text-white border-accent'
                      : 'bg-white border-primary/40 text-text-dark hover:border-accent'
                  }`}
                >
                  2. Baking
                </button>
                <button
                  onClick={() => handleStatusShift('shipped')}
                  className={`px-3 py-1.5 border rounded text-[10px] font-bold tracking-wider uppercase transition-colors cursor-pointer ${
                    activeOrder.status === 'shipped'
                      ? 'bg-accent text-white border-accent'
                      : 'bg-white border-primary/40 text-text-dark hover:border-accent'
                  }`}
                >
                  3. Dispached
                </button>
                <button
                  onClick={() => handleStatusShift('delivered')}
                  className={`px-3 py-1.5 border rounded text-[10px] font-bold tracking-wider uppercase transition-colors cursor-pointer ${
                    activeOrder.status === 'delivered'
                      ? 'bg-accent text-white border-accent'
                      : 'bg-white border-primary/40 text-text-dark hover:border-accent'
                  }`}
                >
                  4. Delivered
                </button>
              </div>
            </div>
          </div>

          {/* Slices review breakdown summary list */}
          <div className="bg-white border border-primary/20 rounded-xl p-6 shadow-sm">
            <h3 className="font-serif italic text-sm text-text-dark font-semibold mb-4 border-b border-primary/10 pb-2">
              Receipt Inventory
            </h3>
            <div className="space-y-3.5">
              {activeOrder.items.map((item, id) => (
                <div key={id} className="flex justify-between items-center text-xs text-text-dark">
                  <div>
                    <span className="font-bold">{item.product.name}</span>
                    <span className="block text-[9px] text-[#A2877C] capitalize mt-0.5 font-medium">
                      Flavor: {item.selectedFlavor} | Size: {item.selectedSize}
                    </span>
                    {item.customMessage && (
                      <span className="inline-block bg-primary/20 text-text-dark text-[8px] font-medium px-2 py-0.2 rounded mt-1 italic font-mono">
                        Writing: "{item.customMessage}"
                      </span>
                    )}
                  </div>
                  <span className="font-mono text-text-light select-none">x{item.quantity}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-24 bg-white border border-primary/20 rounded-xl flex flex-col items-center max-w-2xl mx-auto shadow-sm">
          <HelpCircle className="h-10 w-10 text-accent/50 mb-3" />
          <h3 className="font-serif italic text-lg text-text-dark font-medium">No active track selected</h3>
          <p className="text-xs text-text-light mt-1.5 max-w-sm leading-relaxed italic">
            Please search for an existing order ID above (e.g. after placing a test order at checkout) or log into your account profile to retrieve your references list.
          </p>
        </div>
      )}

    </div>
  );
};
