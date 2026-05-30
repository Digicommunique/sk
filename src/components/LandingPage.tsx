/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { 
  Building, Sparkles, Shield, Zap, TrendingUp, CheckCircle, 
  ArrowRight, Heart, Database, Lock, Globe, Server
} from 'lucide-react';
import { Property, ServiceProviderItem } from '../types';

interface LandingPageProps {
  onEnterApp: () => void;
  properties: Property[];
  serviceProviders: ServiceProviderItem[];
}

export default function LandingPage({ onEnterApp, properties, serviceProviders }: LandingPageProps) {
  // Live simulation ticker events
  const [tickerEvents, setTickerEvents] = useState<string[]>([
    "System Boot: Propex360 ledger initialized.",
    "RERA index: Whitefield matching complete.",
    "KYC match: Resident broker Aadhaar logged.",
    "Ledger: Skyline Heights Premium approved."
  ]);

  useEffect(() => {
    const defaultEvents = [
      "Secured signature: Bandra lease agreement checked.",
      "Razorpay Sandbox: featured booster fee logged.",
      "RERA check: Connaught Place commercial office verified.",
      "KYC status: Vikram Malhotra verified.",
      "Site visit: Devender Grover booked a spot in CP.",
      "Activity check: Admin approved KYC credentials."
    ];

    const idx = setInterval(() => {
      const randMsg = defaultEvents[Math.floor(Math.random() * defaultEvents.length)];
      setTickerEvents(prev => [randMsg, ...prev.slice(0, 3)]);
    }, 4500);

    return () => clearInterval(idx);
  }, []);

  return (
    <div id="landing-main-wrapper" className="min-h-screen relative overflow-hidden flex flex-col justify-between font-sans selection:bg-teal-200">
      
      {/* 🧱 Image 2-inspired Geometric painted brick wall mural background */}
      <MuralBackground />

      {/* Very subtle edge vignette to keep the background fully bright and colorful like Image 2 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(15,23,42,0.08)_30%,rgba(15,23,42,0.48)_100%)] z-0 pointer-events-none" />

      {/* 🔝 Landing Page Header */}
      <header className="relative z-10 max-w-7xl w-full mx-auto px-4 sm:px-6 py-5 flex flex-col sm:flex-row justify-between items-center gap-4 border-b border-white/5 bg-slate-950/20 backdrop-blur-sm">
        
        {/* Brand identity */}
        <div className="flex items-center gap-3 self-start sm:self-auto">
          <div className="bg-[#10b981] text-slate-950 font-black px-3 py-2 rounded-2xl text-xl font-display tracking-tight shadow-md flex items-center justify-center">
            P360
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-display font-black text-2xl tracking-tight text-white">Propex 360</span>
              <span className="w-2 h-2 bg-[#00f59b] rounded-full animate-ping" />
            </div>
            <span className="text-[10px] text-slate-300 font-extrabold tracking-widest block leading-none uppercase">PROPERTY • SERVICES • LEADS</span>
          </div>
        </div>

        {/* Center Pill Menu (Image 1 replica) */}
        <nav className="flex items-center gap-2 px-5 py-2.5 bg-slate-950/45 border border-white/10 rounded-full text-slate-300 text-xs font-semibold backdrop-blur-md">
          <span className="hover:text-[#00f59b] cursor-pointer transition-colors block px-2.5">Features</span>
          <span className="text-white/20 select-none">|</span>
          <span className="hover:text-[#00f59b] cursor-pointer transition-colors block px-2.5 col">Service Providers</span>
          <span className="text-white/20 select-none">|</span>
          <span className="hover:text-[#00f59b] cursor-pointer transition-colors block px-2.5">Pricing Plans</span>
          <span className="text-white/20 select-none">|</span>
          <span className="hover:text-[#00f59b] cursor-pointer transition-colors block px-2.5">Testimonials</span>
        </nav>

        {/* Action Button */}
        <button 
          id="landing-cta-get-started"
          onClick={onEnterApp}
          className="bg-[#00f59b] hover:bg-[#10b981] text-slate-950 px-6 py-2.5 rounded-full text-xs font-black tracking-wider uppercase transition-all shadow-[0_0_20px_rgba(0,245,155,0.35)] active:scale-95 duration-150 self-end sm:self-auto"
        >
          GET STARTED
        </button>
      </header>

      {/* 🚀 Hero Section (Image 1 content layout) */}
      <main className="relative z-10 flex-1 flex items-center max-w-7xl w-full mx-auto px-4 sm:px-6 py-10 md:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center w-full">
          
          {/* Left Column (58% of space): Main message and Badges wrapped inside a glass backdrop card for premium readability */}
          <section className="lg:col-span-7 space-y-6 text-left bg-slate-900/40 border border-white/10 rounded-[2rem] p-6 sm:p-8 md:p-10 shadow-2xl backdrop-blur-md">
            
            {/* Horizontal glowing pill badges (Image 1 replica) */}
            <div className="flex flex-wrap gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-500/10 border border-emerald-400/20 text-[#00f59b] shadow-[0_2px_10px_rgba(16,185,129,0.05)]">
                <Shield className="w-3.5 h-3.5" /> VERIFIED LISTINGS
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-500/10 border border-blue-400/20 text-blue-300 shadow-[0_2px_10px_rgba(59,130,246,0.05)]">
                <Zap className="w-3.5 h-3.5" /> PRIORITY LEADS PIPELINE
              </span>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-amber-500/10 border border-amber-400/20 text-amber-300 shadow-[0_2px_10px_rgba(245,158,11,0.05)]">
                <Sparkles className="w-3.5 h-3.5" /> REAL-TIME SANDBOX MODELER
              </span>
            </div>

            {/* Headline with high contrast section */}
            <div className="space-y-1">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight text-white leading-none font-display">
                FIND. LIST. GROW —
              </h1>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-[#00f59b] tracking-tight leading-tight uppercase font-display">
                ALL IN ONE PROPERTY PLATFORM
              </h2>
            </div>

            {/* Subhead Context paragraph */}
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl font-medium">
              Propex360 bridges the gap between buyers in search of premium real estate, verified owners aiming to boost inbound leads, and licensed professionals building service empires. Seamlessly switch between workspace channels to experience absolute transaction clarity with zero brokerage friction.
            </p>

            {/* Instant workspace entrance trigger */}
            <div className="pt-4 flex flex-col sm:flex-row gap-4 items-stretch sm:items-center">
              <button 
                id="landing-hero-enter-btn"
                onClick={onEnterApp}
                className="bg-gradient-to-r from-teal-500 to-[#10b981] hover:from-teal-600 hover:to-[#059669] text-white font-extrabold text-sm px-8 py-4 rounded-3xl flex items-center justify-center gap-2 shadow-lg transition-transform active:scale-98"
              >
                <span>Launch Interactive Sandbox</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <span className="flex -space-x-2">
                  <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" className="w-7 h-7 rounded-full border border-slate-900 object-cover" alt="" />
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" className="w-7 h-7 rounded-full border border-slate-900 object-cover" alt="" />
                  <img src="https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=100" className="w-7 h-7 rounded-full border border-slate-900 object-cover" alt="" />
                </span>
                <span className="text-xs text-slate-400 font-bold">Vetted by 1,400+ members</span>
              </div>
            </div>

          </section>

          {/* Right Column (42% of space): Live Stats Ledger Widget (Image 1 replica) */}
          <section className="lg:col-span-5 w-full max-w-md mx-auto">
            <motion.div 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.15 }}
              className="bg-slate-900/40 border border-white/10 rounded-3xl p-6 shadow-2xl backdrop-blur-md relative overflow-hidden"
            >
              {/* LED display gloss background bar */}
              <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#00f59b]/50 to-transparent" />

              {/* Header section with live feed blinker */}
              <div className="flex items-center justify-between mb-6">
                <span className="text-[10px] uppercase font-black tracking-widest text-[#00f59b] flex items-center gap-2">
                  <span className="w-2.5 h-2.5 bg-emerald-500 rounded-full inline-block animate-ping" />
                  REAL-TIME STATISTICS LEDGER
                </span>
                <span className="text-[9px] bg-white/10 text-white/85 font-black px-2.5 p-0.5 rounded uppercase tracking-wider">
                  Live Feed
                </span>
              </div>

              {/* Metric grid boxes */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                
                {/* Metric 1 */}
                <div className="bg-slate-950/50 border border-white/5 rounded-2xl p-4 text-left">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wide block">Total Listings Active</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-4xl font-extrabold text-white font-display">{properties.length}</span>
                    <span className="text-xs text-[#00f59b] font-extrabold">+100%</span>
                  </div>
                  <span className="text-[9px] text-emerald-400 font-bold mt-1 inline-flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> 100% Admin Screened
                  </span>
                </div>

                {/* Metric 2 */}
                <div className="bg-slate-950/50 border border-white/5 rounded-2xl p-4 text-left">
                  <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wide block">Verified Service Partners</span>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-4xl font-extrabold text-white font-display">4</span>
                    <span className="text-xs text-[#00f59b] font-bold">Vetted</span>
                  </div>
                  <span className="text-[9px] text-blue-300 font-bold mt-1 inline-flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" /> Professional KYC Passed
                  </span>
                </div>

              </div>

              {/* Active Sandbox Ledger Logs Stream */}
              <div className="bg-slate-950/80 rounded-2xl p-4 border border-white/5 text-left font-mono">
                <div className="flex items-center justify-between mb-3 text-[10px] text-slate-500 font-bold">
                  <span className="flex items-center gap-1.5">
                    <Server className="w-3.5 h-3.5 text-teal-400" /> Active Sandbox Workspace
                  </span>
                  <span className="text-[#00f59b]">ONLINE</span>
                </div>

                <div className="space-y-1.5 max-h-24 overflow-y-auto">
                  {tickerEvents.map((evt, index) => (
                    <motion.div 
                      key={evt + index} 
                      initial={{ x: -10, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      className="text-[10px] text-slate-300 flex items-start gap-1"
                    >
                      <span className="text-teal-500 shrink-0">▶</span>
                      <span className="line-clamp-1">{evt}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

            </motion.div>
          </section>

        </div>
      </main>

      {/* 📥 Footer */}
      <footer className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 py-6 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-3 text-slate-505 text-xs text-slate-400 bg-slate-950/10">
        <div className="flex items-center gap-2">
          <span>RERA compliance active</span>
          <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
        </div>
        <p className="text-center sm:text-left">© 2026 Propex360 Property & Service Hub. Sandbox Workspace environment active.</p>
        <div className="flex gap-4">
          <span className="hover:text-white cursor-pointer select-none">Terms</span>
          <span className="hover:text-white cursor-pointer select-none">Privacy Ledger</span>
        </div>
      </footer>

    </div>
  );
}

/**
 * 🎨 Image 2 Custom Painted-Brick Mural Background component!
 * Handcrafted using geometric overlays with staggered brick line graphics to replicate the user's design.
 */
function MuralBackground() {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden w-full h-full pointer-events-none">
      
      {/* Absolute canvas SVG layout (ratio matches Image 2) */}
      <svg 
        id="painted-brick-canvas-svg"
        className="absolute inset-0 w-full h-full object-cover opacity-95 transition-opacity"
        viewBox="0 0 800 1000"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          {/* Staggered brick pattern layer */}
          <pattern id="brick-joints" width="105" height="42" patternUnits="userSpaceOnUse">
            {/* Dark cement/grout line shadows */}
            <line x1="0" y1="0" x2="105" y2="0" stroke="rgba(0, 0, 0, 0.45)" strokeWidth="2.5" />
            <line x1="0" y1="21" x2="105" y2="21" stroke="rgba(0, 0, 0, 0.45)" strokeWidth="2.5" />
            
            {/* Alternating row vertical splits to create a modular block layout */}
            <line x1="0" y1="0" x2="0" y2="21" stroke="rgba(0, 0, 0, 0.45)" strokeWidth="2" />
            <line x1="52.5" y1="0" x2="52.5" y2="21" stroke="rgba(0, 0, 0, 0.45)" strokeWidth="2" />
            
            <line x1="26.25" y1="21" x2="26.25" y2="42" stroke="rgba(0, 0, 0, 0.45)" strokeWidth="2" />
            <line x1="78.75" y1="21" x2="78.75" y2="42" stroke="rgba(0, 0, 0, 0.45)" strokeWidth="2" />
          </pattern>

          {/* Lighter grout relief highlight to give a textured 3D feel to the painted bricks */}
          <pattern id="brick-grout-relief" width="105" height="42" patternUnits="userSpaceOnUse">
            <line x1="0" y1="1" x2="105" y2="1" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1.2" />
            <line x1="0" y1="22" x2="105" y2="22" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="1.2" />
            
            <line x1="1" y1="0" x2="1" y2="21" stroke="rgba(255, 255, 255, 0.18)" strokeWidth="1" />
            <line x1="53.5" y1="0" x2="53.5" y2="21" stroke="rgba(255, 255, 255, 0.18)" strokeWidth="1" />
            
            <line x1="27.25" y1="21" x2="27.25" y2="42" stroke="rgba(255, 255, 255, 0.18)" strokeWidth="1" />
            <line x1="79.75" y1="21" x2="79.75" y2="42" stroke="rgba(255, 255, 255, 0.18)" strokeWidth="1" />
          </pattern>
        </defs>

        {/* 🎨 GEOMETRIC COLOR POLYGONS FROM IMAGE 2 */}
        
        {/* Base white surface */}
        <rect width="100%" height="100%" fill="#EFEFF4" />

        {/* 1. Cobalt Blue Sweep (middle-lower left quadrant) */}
        <path d="M -20 380 L 360 320 L 190 730 L -20 860 Z" fill="#2d6ef7" />

        {/* 2. Crimson Red (whole upper left block) */}
        <path d="M -20 -20 L 590 -20 L 490 290 Q 250 340 -20 395 Z" fill="#d01616" />

        {/* 3. Upper Right Blue block */}
        <path d="M 585 -20 L 820 -20 L 820 230 Z" fill="#3a7af5" />

        {/* 4. Pink-lavender (middle right panel) */}
        <path d="M 820 225 L 820 670 L 520 720 L 585 290 Z" fill="#ea7ab1" />

        {/* 5. Crescent Yellow element (center right) */}
        <path d="M 525 285 Q 730 300 690 580 Q 640 720 488 710 L 365 710 Q 400 480 525 285 Z" fill="#eab308" />

        {/* 6. Diagonal Green band (runs through center-left) */}
        <path d="M 320 330 L 525 285 L 420 760 L 175 710 Z" fill="#15a34a" />

        {/* 7. Center dark gray/black slice badge */}
        <path d="M 510 280 L 660 250 L 675 325 L 500 325 Z" fill="#1d222b" />

        {/* 8. Overlap Pink panel (lower center) */}
        <path d="M 320 780 L 640 700 L 530 890 L 340 850 Z" fill="#faa9dc" />

        {/* 9. Terracotta Orange-brown (bottom right) */}
        <path d="M 505 710 L 820 660 L 820 1020 L 425 1020 Z" fill="#ea580c" />

        {/* 10. Deep Plum bottom-left quadrant */}
        <path d="M -20 830 Q 360 760 520 880 L 425 1020 L -20 1020 Z" fill="#9d174d" />

        {/* 🧱 LAYER THE BRICK GRIDS AND CEMENT LINES OVER THE PAINT COLOR PATHS */}
        {/* Multiply blend mode and screen blend mode render perfectly combined translucent textures */}
        <rect width="100%" height="100%" fill="url(#brick-joints)" style={{ mixBlendMode: "multiply" }} opacity="0.68" />
        <rect width="100%" height="100%" fill="url(#brick-grout-relief)" style={{ mixBlendMode: "screen" }} opacity="0.45" />

        {/* Subtle overall noise pattern grid lines to replicate matte painted masonry wall feel */}
        <rect width="100%" height="100%" fill="rgba(0,0,0,0.015)" />
      </svg>
      
    </div>
  );
}
