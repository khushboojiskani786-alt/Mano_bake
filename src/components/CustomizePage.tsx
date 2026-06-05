import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, Send, CheckCircle, Upload, Heart, Info, DollarSign } from 'lucide-react';

export const CustomizePage: React.FC = () => {
  const { showToast, setActivePage } = useApp();

  // Custom cake parameters
  const [shape, setShape] = useState<'round' | 'square' | 'heart'>('round');
  const [tiers, setTiers] = useState<number>(1);
  const [baseFlavour, setBaseFlavour] = useState('Classic Belgian Chocolate Fudge');
  const [frostingStyle, setFrostingStyle] = useState('Silk Textured Buttercream');
  const [guestCount, setGuestCount] = useState<string>('15-25 guests (Small gathering)');
  const [customWriting, setCustomWriting] = useState('');
  
  // Photo drag and drop simulation
  const [dragActive, setDragActive] = useState(false);
  const [referenceFile, setReferenceFile] = useState<string | null>(null);

  // User details
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [details, setDetails] = useState('');

  // Inquiry submitted state
  const [submitted, setSubmitted] = useState(false);
  const [inquiryId, setInquiryId] = useState('');

  // Live premium quote estimation algorithm
  const estimatedQuote = React.useMemo(() => {
    let basePrice = 3000; // Base rate for custom 1-tier cake

    // Multipliers
    if (tiers === 2) basePrice += 2800;
    if (tiers === 3) basePrice += 6200;

    if (shape === 'heart') basePrice += 800; // Heart shape requires manual carving craft
    if (shape === 'square') basePrice += 500;

    if (baseFlavour.includes('Lotus')) basePrice += 1200;
    if (baseFlavour.includes('Pistachio')) basePrice += 1500;

    if (frostingStyle.includes('Gold Leaf') || frostingStyle.includes('Flowers')) {
      basePrice += 1800;
    }

    return basePrice;
  }, [shape, tiers, baseFlavour, frostingStyle]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0];
      setReferenceFile(file.name);
      showToast(`Attached reference photo: ${file.name}`, 'success');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setReferenceFile(file.name);
      showToast(`Selected reference photo: ${file.name}`, 'success');
    }
  };

  const handleSubmitQuote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      showToast('Please fill out your contact details to receive your official quotation.', 'error');
      return;
    }

    const randomId = `CQ-${Math.floor(100000 + Math.random() * 900000)}`;
    setInquiryId(randomId);
    setSubmitted(true);
    showToast('Your custom cake consultation dossier has been filed successfully!', 'success');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetConsultation = () => {
    setSubmitted(false);
    setReferenceFile(null);
    setName('');
    setEmail('');
    setPhone('');
    setEventDate('');
    setDetails('');
    setCustomWriting('');
  };

  if (submitted) {
    return (
      <div id="quote-success-screen" className="max-w-xl mx-auto px-4 py-32 text-center select-none animate-fadeIn">
        <div className="bg-[#FFF8F6] border-2 border-[#EBCFC8] rounded-xl p-8 sm:p-12 shadow-md relative">
          <div className="h-16 w-16 bg-accent text-[#FFF8F6] rounded-full flex items-center justify-center mx-auto mb-6 shadow-sm">
            <CheckCircle className="h-8 w-8" />
          </div>

          <span className="text-[10px] tracking-[0.25em] font-bold text-accent uppercase block mb-1">Dossier Registered</span>
          <h2 className="font-serif italic text-2xl sm:text-3xl text-text-dark font-normal">Inquiry {inquiryId} Live</h2>
          <div className="h-px w-20 bg-accent/30 mx-auto my-5" />

          <div className="text-left space-y-4 bg-white border border-[#EBCFC8]/40 p-5 rounded-md text-xs italic text-text-light mb-8 select-text">
            <h4 className="font-bold text-text-dark font-serif not-italic text-sm text-center border-b border-[#EBCFC8]/30 pb-2 mb-3">
              Consultation Specification Summary
            </h4>
            <p><strong className="text-text-dark not-italic font-bold">Patron Name:</strong> {name}</p>
            <p><strong className="text-text-dark not-italic font-bold">Contact Node:</strong> {phone} &bull; {email}</p>
            <p><strong className="text-text-dark not-italic font-bold">Event Target Date:</strong> {eventDate || 'Urgent / TBD'}</p>
            <p><strong className="text-text-dark not-italic font-bold">Requested Canvas:</strong> {tiers} Tier &bull; {shape.toUpperCase()} Shape cake</p>
            <p><strong className="text-text-dark not-italic font-bold">Flavour & Decors:</strong> {baseFlavour} &mdash; {frostingStyle}</p>
            <p><strong className="text-text-dark not-italic font-bold">Target scale:</strong> {guestCount}</p>
            {customWriting && (
              <p><strong className="text-text-dark not-italic font-bold">Icing inscription:</strong> "{customWriting}"</p>
            )}
            <p className="border-t border-[#EBCFC8]/30 pt-3 flex justify-between items-center not-italic font-bold text-[#B9896A] text-sm">
              <span>Estimated Studio Quote:</span>
              <span>Rs. {estimatedQuote.toLocaleString()}*</span>
            </p>
          </div>

          <p className="text-xs text-text-light leading-relaxed mb-6 italic">
            Thank you for trusting Mano Bakes with your custom milestone. Our senior chef patissier will review your file specs, reference files, and write back to your coordinate node within 3-4 commercial hours.
          </p>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => {
                setActivePage('shop');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="bg-white border border-primary/45 text-text-dark rounded py-2.5 text-xs font-bold tracking-wider uppercase transition-colors hover:bg-[#FFF8F6]"
            >
              Back to Menu
            </button>
            <button
              onClick={handleResetConsultation}
              className="bg-[#B9896A] hover:bg-[#A8795A] text-white rounded py-2.5 text-xs font-bold tracking-wider uppercase shadow transition-all"
            >
              Draft Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div id="customize-consultation-container" className="max-w-7xl mx-auto px-4 md:px-6 py-28 bg-secondary min-h-screen">
      
      {/* Editorial Header */}
      <div className="text-center max-w-xl mx-auto mb-16 select-none animate-fadeIn">
        <span className="text-[10px] tracking-[0.25em] font-bold text-accent uppercase block mb-1">Bespoke Table Cakes</span>
        <h1 className="font-serif italic text-3xl sm:text-4xl text-text-dark font-normal">Customize & Get a Quote</h1>
        <p className="text-xs text-text-light mt-2 italic leading-relaxed">
          Draft your dream celebratory centerpiece. Set your coordinates, tier scales, and watch our cake estimators model your budget instantly.
        </p>
        <div className="h-px w-20 bg-accent/30 mx-auto mt-4" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Column - Specifications (7 Tiers of interactive builders) */}
        <div className="lg:col-span-7 bg-white border border-primary/15 rounded-lg p-6 sm:p-8 shadow-sm space-y-6">
          <h2 className="font-serif italic text-lg text-text-dark font-semibold border-b border-primary/10 pb-3 flex items-center gap-1.5">
            <Sparkles className="h-5 w-5 text-accent animate-pulse" /> Modeling Interactive Canvas
          </h2>

          {/* 1. Shape Picker */}
          <div>
            <label className="text-[10px] tracking-wider uppercase font-bold text-text-dark block mb-2">1. Geometric Shape</label>
            <div className="grid grid-cols-3 gap-3">
              {(['round', 'square', 'heart'] as const).map((sh) => (
                <button
                  key={sh}
                  type="button"
                  onClick={() => {
                    setShape(sh);
                    showToast(`Updated geometry to ${sh.toUpperCase()}`, 'info');
                  }}
                  className={`py-3 rounded border text-xs tracking-wide uppercase font-bold flex flex-col items-center gap-1 transition-all cursor-pointer ${
                    shape === sh
                      ? 'bg-[#B9896A] text-white border-transparent shadow'
                      : 'bg-white border-primary/20 text-text-light hover:border-[#B9896A]/60 hover:text-[#B9896A]'
                  }`}
                >
                  <span className="text-base">
                    {sh === 'round' ? '⭕' : sh === 'square' ? '⏹️' : '❤️'}
                  </span>
                  {sh}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Tiers Count */}
          <div>
            <label className="text-[10px] tracking-wider uppercase font-bold text-text-dark block mb-2">2. Visual Tiers Configuration</label>
            <div className="grid grid-cols-3 gap-3">
              {[1, 2, 3].map((t) => (
                <button
                  key={t}
                  type="button"
                  onClick={() => {
                    setTiers(t);
                    showToast(`Selected elegant ${t}-tier structure`, 'info');
                  }}
                  className={`py-3 rounded border text-xs font-bold leading-none flex flex-col items-center gap-1 transition-all cursor-pointer ${
                    tiers === t
                      ? 'bg-[#B9896A] text-white border-transparent shadow'
                      : 'bg-white border-primary/20 text-text-light hover:border-[#B9896A]/60'
                  }`}
                >
                  <span className="text-lg">
                    {t === 1 ? '🎂' : t === 2 ? '🎂🎂' : '🏛️'}
                  </span>
                  <span>{t} {t === 1 ? 'Single Tier' : t === 2 ? 'Two-Tier' : 'Three-Tier'}</span>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Base Recipe Flavour */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] tracking-wider uppercase font-bold text-text-dark block mb-1.5">3. Secret Sponge Recipe</label>
              <select
                value={baseFlavour}
                onChange={(e) => setBaseFlavour(e.target.value)}
                className="w-full border border-primary/35 rounded px-3 py-2 text-xs bg-white text-text-dark font-medium cursor-pointer"
              >
                <option value="Classic Belgian Chocolate Fudge">Rich Belgian Chocolate Fudge Sponge</option>
                <option value="Silk Vanilla Buttercream Rosewater">French Vanilla Rosewater Moist Sponge</option>
                <option value="Velvet Scarlet Crumb Cheese">Red Velvet Cocoa Butter Cheese</option>
                <option value="Lotus Speculoos Cookie Crumble">Lotus Biscoff Dream & Cookie Base</option>
                <option value="Pistachio Cardamom Saffron">Aroma Persian Pistachio & Saffron (+Rs.1,500)</option>
              </select>
            </div>

            {/* 4. Frosting Decors style */}
            <div>
              <label className="text-[10px] tracking-wider uppercase font-bold text-text-dark block mb-1.5">4. Frosting Texture & Craft</label>
              <select
                value={frostingStyle}
                onChange={(e) => setFrostingStyle(e.target.value)}
                className="w-full border border-primary/35 rounded px-3 py-2 text-xs bg-white text-text-dark font-medium cursor-pointer"
              >
                <option value="Silk Textured Buttercream">Classic Silk Buttercream Layering</option>
                <option value="Semi-Naked Rustic Crumbs">Semi-Naked Rustic Flourish</option>
                <option value="Sugar Floral Cascade & Gold Foil">Sugar Rose Petals & Gold Foiling (+Rs.1,800)</option>
                <option value="Modern Bas-Relief Palette Sculpt">Structured Bas-Relief Palette Strokes (+Rs.2,000)</option>
              </select>
            </div>
          </div>

          {/* 5. Scale & Inscription inputs */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[10px] tracking-wider uppercase font-bold text-text-dark block mb-1.5">5. Gathering Scale Estimate</label>
              <select
                value={guestCount}
                onChange={(e) => setGuestCount(e.target.value)}
                className="w-full border border-primary/35 rounded px-3 py-2 text-xs bg-white text-text-dark font-semibold cursor-pointer"
              >
                <option value="15-25 guests (Small gathering)">15-25 guests (Small intimate table)</option>
                <option value="25-50 guests (Medium event)">25-50 guests (Anniversaries & high teas)</option>
                <option value="50-100 guests (Luxury milestone)">50-100 guests (Bespoke grand party)</option>
                <option value="100+ guests (Grand Wedding scale)">100+ guests (Grand Wedding Tiered banquet)</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] tracking-wider uppercase font-bold text-text-dark block mb-1.5">
                6. Custom Inscription Message (Optional)
              </label>
              <input
                type="text"
                maxLength={35}
                placeholder="e.g. Happy 30th Birthday Ali!"
                value={customWriting}
                onChange={(e) => setCustomWriting(e.target.value)}
                className="w-full border border-primary/45 rounded px-3 py-1.8 text-xs italic bg-white text-text-dark focus:border-[#B9896A] outline-none"
              />
            </div>
          </div>

          {/* 7. Image Reference uploader */}
          <div>
            <label className="text-[10px] tracking-wider uppercase font-bold text-text-dark block mb-1.5">
              7. Visual Design References (Optional)
            </label>
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={() => document.getElementById('file-upload-invisible')?.click()}
              className={`border-2 border-dashed rounded-lg p-5 text-center flex flex-col items-center justify-center transition-colors cursor-pointer select-none ${
                dragActive
                  ? 'border-[#B9896A] bg-[#FFF8F6]'
                  : referenceFile
                  ? 'border-[#D9AB9E]/80 bg-[#FFF8F6]/30'
                  : 'border-primary/25 hover:border-[#B9896A]/60 hover:bg-[#FFF8F6]/20'
              }`}
            >
              <input
                id="file-upload-invisible"
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <Upload className={`h-6 w-6 mb-2 ${referenceFile ? 'text-[#B9896A]' : 'text-text-light/50'}`} />
              <p className="text-[11px] font-bold text-text-dark">
                {referenceFile ? `✓ Attached File: ${referenceFile}` : 'Drag & Drop reference photo, or Click to browse'}
              </p>
              <p className="text-[9px] text-[#A2877C] mt-1">Accepts Pinterest screenshots, invite graphics, palette sheets (max 10MB)</p>
            </div>
          </div>
        </div>

        {/* Right Column - Realtime Quote Dossier Form (5 Tiers) */}
        <div className="lg:col-span-5 space-y-6">
          {/* A. Dynamic Quote Panel */}
          <div className="bg-[#FFF8F6] border border-[#EBCFC8] rounded-lg p-6 shadow-sm select-none text-center">
            <span className="text-[9px] tracking-widest font-bold text-accent uppercase block mb-1">Interactive Quote Estimator</span>
            <h3 className="font-serif italic text-lg text-text-dark font-normal">Your Handcrafted Estimate</h3>
            
            <div className="flex items-baseline justify-center gap-1.5 my-4">
              <span className="text-xs font-bold text-text-light font-mono">PKR</span>
              <span className="text-4xl font-serif text-[#C26D7C] italic font-semibold tracking-tight">
                ~{estimatedQuote.toLocaleString()}
              </span>
              <span className="text-[8px] text-[#A2877C] font-semibold uppercase tracking-wider pl-1">Starting Rate</span>
            </div>

            <div className="text-left text-[10px] text-[#A2877C] italic space-y-1.5 border-t border-[#EBCFC8]/45 pt-3">
              <p className="flex justify-between">
                <span>&bull; Craft Base ({shape} shape blueprint)</span>
                <span className="font-mono text-text-dark">Included</span>
              </p>
              <p className="flex justify-between">
                <span>&bull; Level Thickness ({tiers} active tiers stacking)</span>
                <span className="font-mono text-text-dark">Rs. {tiers > 1 ? (tiers === 2 ? 2800 : 6200).toLocaleString() : '0'}</span>
              </p>
              <p className="flex justify-between">
                <span>&bull; Recipe Base: {baseFlavour.split(' ')[0]} crumb</span>
                <span className="font-mono text-text-dark">Included</span>
              </p>
              <p className="flex justify-between text-[#B9896A] font-bold italic">
                <span>*Premium packaging & board foundation</span>
                <span className="font-mono">Complementary</span>
              </p>
            </div>
            
            <div className="mt-4 p-2 bg-white rounded border border-[#EBCFC8]/30 text-[9px] text-text-light italic leading-relaxed flex gap-2 items-start text-left">
              <Info className="h-4 w-4 text-[#B9896A] flex-shrink-0 mt-0.5" />
              <span>Estimates reflect pure premium daily ingredients & artisanal wages. Tax & shipping are calculated upon checkouts.</span>
            </div>
          </div>

          {/* B. Patron Contact Intake Form */}
          <div className="bg-white border border-primary/15 rounded-lg p-6 shadow-sm">
            <h4 className="font-serif italic text-md text-text-dark font-semibold mb-4 border-b border-primary/10 pb-2">Patron Registration Dossier</h4>
            
            <form onSubmit={handleSubmitQuote} className="space-y-4">
              <div>
                <label className="text-[10px] tracking-wider uppercase font-bold text-text-dark block mb-1">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Khushboo Jiskani"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full border border-primary/40 rounded px-2.5 py-1.8 text-xs bg-white text-text-dark font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] tracking-wider uppercase font-bold text-text-dark block mb-1">Contact Phone</label>
                  <input
                    type="tel"
                    required
                    placeholder="e.g. 0300-1234567"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full border border-primary/40 rounded px-2.5 py-1.8 text-xs bg-white text-text-dark font-mono"
                  />
                </div>
                <div>
                  <label className="text-[10px] tracking-wider uppercase font-bold text-text-dark block mb-1">E-Mail Address</label>
                  <input
                    type="email"
                    required
                    placeholder="patron@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full border border-primary/40 rounded px-2.5 py-1.8 text-xs bg-white text-text-dark font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="text-[10px] tracking-wider uppercase font-bold text-text-dark block mb-1">Milestone Event Target Date</label>
                <input
                  type="date"
                  required
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full border border-primary/40 rounded px-2.5 py-1.8 text-xs bg-white text-text-dark font-mono"
                />
              </div>

              <div>
                <label className="text-[10px] tracking-wider uppercase font-bold text-text-dark block mb-1">Event Motif Notes (Optional)</label>
                <textarea
                  rows={3}
                  placeholder="Tell our decorators about event color schemes, flavor twists, or physical venue themes..."
                  value={details}
                  onChange={(e) => setDetails(e.target.value)}
                  className="w-full border border-primary/40 rounded px-3 py-2 text-xs italic bg-white text-text-dark leading-relaxed"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#B9896A] hover:bg-[#A8795A] text-white text-xs font-[600] uppercase tracking-widest py-3 rounded shadow transition-all duration-300 hover:scale-[1.01] flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                <Send className="h-4 w-4" /> Dispatch Form & Lock Quote
              </button>
            </form>
          </div>
        </div>

      </div>
    </div>
  );
};
