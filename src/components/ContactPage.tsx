import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MapPin, Phone, Mail, Clock, Send, ShieldAlert } from 'lucide-react';

export const ContactPage: React.FC = () => {
  const { showToast } = useApp();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [topic, setTopic] = useState('General Query');
  const [msg, setMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !msg) return;

    showToast(`Thank you, ${name}! Your inquiry concerning "${topic}" has been sent. Our patissiers will write back shortly.`, 'success');
    setName(''); setEmail(''); setPhone(''); setMsg('');
  };

  return (
    <div id="contact-page-root" className="max-w-7xl mx-auto px-4 md:px-6 py-28 bg-secondary min-h-screen">
      
      {/* Page header */}
      <div className="text-center max-w-xl mx-auto mb-16 select-none animate-fadeIn">
        <span className="text-[10px] tracking-[0.25em] font-bold text-accent uppercase block mb-1">Stay in Touch</span>
        <h1 className="font-serif italic text-3xl sm:text-4xl text-text-dark font-normal">Contact the Kitchen</h1>
        <p className="text-xs text-text-light mt-2 italic leading-relaxed">
          Plan an unforgettable milestone event, schedule a custom consultation, or check on collection bookings in Islamabad.
        </p>
        <div className="h-px w-20 bg-accent/30 mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        
        {/* Left Column (5 cols): Coordinates details */}
        <div className="lg:col-span-5 bg-white border border-primary/15 rounded-lg p-6 sm:p-8 shadow-sm space-y-8 self-start">
          <div>
            <h3 className="font-serif italic text-lg text-text-dark font-semibold mb-4">Gourmet Corner</h3>
            <p className="text-xs text-text-light leading-relaxed italic mb-6">
              Mano Bakes is an exclusive cake studio headquartered in Islamabad, Pakistan. Order custom wedding and anniversary cakes directly below.
            </p>
          </div>

          <div className="space-y-4 text-xs">
            {/* Address */}
            <div className="flex gap-4 items-start">
              <div className="h-9 w-9 bg-[#F4D3CD]/60 border border-accent/20 rounded-full flex items-center justify-center text-text-dark flex-shrink-0">
                <MapPin className="h-4.5 w-4.5" />
              </div>
              <div>
                <h4 className="font-bold text-text-dark uppercase tracking-wide">Main Cake Studio</h4>
                <p className="text-text-light mt-0.5 leading-relaxed">Sector F-7, Islamabad, Federal Capital, Pakistan.</p>
              </div>
            </div>

            {/* Tel */}
            <div className="flex gap-4 items-start">
              <div className="h-9 w-9 bg-[#F4D3CD]/60 border border-accent/20 rounded-full flex items-center justify-center text-text-dark flex-shrink-0">
                <Phone className="h-4.5 w-4.5" />
              </div>
              <div>
                <h4 className="font-bold text-text-dark uppercase tracking-wide">Inquiries & Whatsapp</h4>
                <p className="text-text-light mt-0.5 leading-relaxed font-mono">0300-1234567 | (021) 321-4567</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex gap-4 items-start">
              <div className="h-9 w-9 bg-[#F4D3CD]/60 border border-accent/20 rounded-full flex items-center justify-center text-text-dark flex-shrink-0">
                <Mail className="h-4.5 w-4.5" />
              </div>
              <div>
                <h4 className="font-bold text-text-dark uppercase tracking-wide">E-Mail Address</h4>
                <p className="text-text-light mt-0.5 leading-relaxed font-mono">hello@manobakes.pk</p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex gap-4 items-start">
              <div className="h-9 w-9 bg-[#F4D3CD]/60 border border-accent/20 rounded-full flex items-center justify-center text-text-dark flex-shrink-0">
                <Clock className="h-4.5 w-4.5" />
              </div>
              <div>
                <h4 className="font-bold text-text-dark uppercase tracking-wide">Studio Dispatch Hours</h4>
                <p className="text-text-light mt-0.5 leading-relaxed">11:00 AM - 10:00 PM | Open Daily</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column (7 cols): Inquiries Form */}
        <div className="lg:col-span-7 bg-white border border-primary/15 rounded-lg p-6 sm:p-8 shadow-sm">
          <h3 className="font-serif italic text-lg text-text-dark font-semibold mb-6">Write to Us</h3>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] tracking-wider uppercase font-bold text-text-dark block mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Amina Begum"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-primary/40 rounded px-3 py-2 text-xs italic bg-white text-text-dark"
                />
              </div>

              <div>
                <label className="text-[10px] tracking-wider uppercase font-bold text-text-dark block mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="e.g. amina@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-primary/40 rounded px-3 py-2 text-xs italic bg-white text-text-dark font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[10px] tracking-wider uppercase font-bold text-text-dark block mb-1">Phone Reference</label>
                <input
                  type="tel"
                  placeholder="e.g. 0321-1234567"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full border border-primary/40 rounded px-3 py-2 text-xs bg-white text-text-dark font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] tracking-wider uppercase font-bold text-text-dark block mb-1">Subject Matter</label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="w-full border border-primary/40 rounded px-3 py-2 bg-white text-xs text-text-dark cursor-pointer font-semibold"
                >
                  <option value="General Query">General Cake Inquiries</option>
                  <option value="Bespoke Wedding Cake">Bespoke Wedding consultations</option>
                  <option value="Corporate Catering">Large Event/Corporate Catering</option>
                  <option value="Feedback Complaint">Patron Love & Feedback</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[10px] tracking-wider uppercase font-bold text-text-dark block mb-1">Your Message Details</label>
              <textarea
                required
                rows={4}
                placeholder="Let our bakers know how indeed we can mold your sweet dreams into confectioneries..."
                value={msg}
                onChange={(e) => setMsg(e.target.value)}
                className="w-full border border-primary/40 rounded px-3 py-2 text-xs italic bg-white text-text-dark leading-relaxed"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-[#B9896A] hover:bg-[#B9896A]/95 text-white text-xs font-[600] uppercase tracking-widest py-2.5 rounded shadow transition-all duration-300 hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="h-4 w-4" /> Ship Inquiries Mail
            </button>
          </form>
        </div>

      </div>

    </div>
  );
};
