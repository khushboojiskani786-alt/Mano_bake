import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, ShieldAlert, FileText, CheckCircle2, ChevronRight, MapPin, RefreshCw, Eye } from 'lucide-react';

export const AccountPage: React.FC = () => {
  const {
    currentUser,
    setCurrentUser,
    orders,
    isAdminMode,
    setAdminMode,
    showToast,
    setActivePage,
    setTrackingOrderId
  } = useApp();

  // Profile forms states
  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [address, setAddress] = useState(currentUser?.address || '');

  // Filter orders matching current client email
  const clientOrders = orders.filter(
    o => o.customerEmail.toLowerCase() === (currentUser?.email || '').toLowerCase()
  );

  const handleProfileSave = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentUser({ name, email, phone, address });
    showToast('Your receiver details saved successfully.', 'success');
  };

  const handleTrackDirect = (id: string) => {
    setTrackingOrderId(id);
    setActivePage('order-tracking');
  };

  return (
    <div id="account-root" className="max-w-7xl mx-auto px-4 md:px-6 py-28 bg-secondary min-h-screen animate-fadeIn">
      
      {/* Editorial Header */}
      <div className="text-center max-w-xl mx-auto mb-16 select-none">
        <span className="text-[10px] tracking-[0.25em] font-bold text-accent uppercase block mb-1">Your Portfolio</span>
        <h1 className="font-serif italic text-3xl text-text-dark font-normal">Patron Profile Console</h1>
        <p className="text-xs text-text-light mt-2 italic leading-relaxed">
          Manage your default Islamabad coordinates, view receipt history, or toggle sandbox admin modules.
        </p>
        <div className="h-px w-20 bg-accent/30 mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (5 cols): Profile Settings Form */}
        <div className="lg:col-span-5 bg-white border border-primary/15 rounded-lg p-6 sm:p-8 shadow-sm space-y-6 self-start">
          <h3 className="font-serif italic text-lg text-text-dark font-semibold border-b border-primary/10 pb-3 flex items-center gap-2">
            <User className="h-5 w-5 text-accent" /> Recipient Defaults
          </h3>

          <form onSubmit={handleProfileSave} className="space-y-4 text-xs text-text-dark">
            <div>
              <label className="text-[10px] tracking-wider uppercase font-bold text-text-light block mb-1">Your Full Name</label>
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-primary/45 rounded px-3 py-2 text-xs italic bg-[#FFF8F6]"
              />
            </div>

            <div>
              <label className="text-[10px] tracking-wider uppercase font-bold text-text-light block mb-1">E-Mail Address</label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-primary/45 rounded px-3 py-2 text-xs italic bg-[#FFF8F6] font-mono"
              />
            </div>

            <div>
              <label className="text-[10px] tracking-wider uppercase font-bold text-text-light block mb-1">Active Phone No.</label>
              <input
                type="text"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-primary/45 rounded px-3 py-2 text-xs font-mono bg-[#FFF8F6]"
              />
            </div>

            <div>
              <label className="text-[10px] tracking-wider uppercase font-bold text-text-light block mb-1">Islamabad Delivery Address</label>
              <textarea
                rows={2}
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full border border-primary/45 rounded px-3 py-2 text-xs italic bg-[#FFF8F6] leading-relaxed"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#B9896A] hover:bg-[#B9896A]/95 text-white text-xs font-bold uppercase tracking-wider py-2.5 rounded shadow duration-200 cursor-pointer"
            >
              Update Credentials
            </button>
          </form>

          {/* Sandbox Admin Portal toggler card */}
          <div className="bg-[#F4D3CD]/15 border border-[#D9AB9E]/40 rounded-lg p-5 mt-4 text-center select-none">
            <span className="text-[9px] tracking-widest font-bold text-accent uppercase block">Security Gate</span>
            <h4 className="font-serif italic text-md text-text-dark font-semibold mt-1 flex items-center justify-center gap-1">
              <ShieldAlert className="h-4.5 w-4.5 text-accent" /> Sandbox Admin Console
            </h4>
            <p className="text-[10px] text-text-light italic mt-1.5 leading-relaxed">
              Activate the specialized owner's dashboard suite to add items, modify status rules, manage banners, or approve comments.
            </p>

            <button
              onClick={() => {
                setAdminMode(!isAdminMode);
                showToast(`Switched view mode to ${!isAdminMode ? 'ADMIN SUITE' : 'CLIENT FRONT'}`, 'info');
              }}
              className="mt-4 border border-accent rounded text-[10px] font-bold tracking-widest uppercase text-accent bg-white py-2 px-4 shadow hover:bg-neutral-50"
            >
              {isAdminMode ? 'Deactivate Admin Portal' : 'Activate Sandbox Admin'}
            </button>
          </div>
        </div>

        {/* Right Column (7 cols): Order history logs */}
        <div className="lg:col-span-7 bg-white border border-primary/15 rounded-lg p-6 sm:p-8 shadow-sm">
          <h3 className="font-serif italic text-lg text-text-dark font-semibold mb-6 flex items-center gap-2">
            <FileText className="h-5 w-5 text-accent" /> Chronological Receipt History
          </h3>

          {clientOrders.length === 0 ? (
            <div className="text-center py-16 opacity-85 select-none">
              <p className="text-xs text-text-light italic">
                You haven't checked out any luxury collections yet. Place some test desserts on the front desk to see chronologies here!
              </p>
              <button
                onClick={() => setActivePage('shop')}
                className="mt-4 border border-[#B9896A] text-[#B9896A] hover:bg-[#B9896A] hover:text-[#FFF8F6] font-[600] uppercase text-[10px] tracking-wider px-4 py-2 rounded-md transition duration-300"
              >
                Go Shop
              </button>
            </div>
          ) : (
            <div className="space-y-4">
              {clientOrders.map((or) => (
                <div
                  key={or.id}
                  onClick={() => handleTrackDirect(or.id)}
                  className="group flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 border border-primary/10 rounded bg-[#FFF8F6]/40 hover:bg-[#F4D3CD]/10 duration-200 cursor-pointer shadow-xs relative"
                >
                  <div>
                    <span className="text-[10px] font-mono font-bold bg-[#F4D3CD]/75 text-text-dark px-2 py-0.5 rounded">
                      #{or.id}
                    </span>
                    <span className="text-[10px] text-text-light font-bold block mt-2">
                      Placed: {new Date(or.createdAt).toLocaleDateString()}
                    </span>
                    <span className="text-[11px] text-text-dark font-semibold block leading-tight mt-1 truncate max-w-xs capitalize line-clamp-1 italic pr-4">
                      {or.items.map(it => it.product.name).join(', ')}
                    </span>
                  </div>

                  <div className="text-right mt-3 sm:mt-0 flex flex-col items-start sm:items-end flex-shrink-0">
                    <span className="text-xs font-bold text-text-dark block">Rs. {or.totalAmount.toLocaleString()}</span>
                    
                    {/* Status badges */}
                    <span className={`text-[9px] uppercase tracking-wider font-bold block mt-1.5 px-2 py-0.5 rounded-full ${
                      or.status === 'delivered' ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'
                    }`}>
                      {or.status === 'pending' ? 'Confirmed' : or.status}
                    </span>
                  </div>

                  <ChevronRight className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-primary/30 group-hover:translate-x-1.5 duration-200 hidden sm:block" />
                </div>
              ))}
            </div>
          )}
        </div>

      </div>

    </div>
  );
};
