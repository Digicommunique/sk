/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Building, Sparkles, Shield, Zap, TrendingUp, CheckCircle, 
  ArrowRight, Heart, Database, Lock, Globe, Server, X, Star, Tag, ChevronRight
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

  // Active navigation tab detail overlay state
  const [activeTab, setActiveTab] = useState<'features' | 'providers' | 'pricing' | 'testimonials' | null>(null);

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
          <button 
            type="button"
            onClick={() => setActiveTab(activeTab === 'features' ? null : 'features')}
            className={`hover:text-[#00f59b] cursor-pointer transition-colors block px-2.5 outline-none focus:outline-none bg-transparent ${activeTab === 'features' ? 'text-[#00f59b] font-extrabold' : ''}`}
          >
            Features
          </button>
          <span className="text-white/20 select-none">|</span>
          <button 
            type="button"
            onClick={() => setActiveTab(activeTab === 'providers' ? null : 'providers')}
            className={`hover:text-[#00f59b] cursor-pointer transition-colors block px-2.5 outline-none focus:outline-none bg-transparent ${activeTab === 'providers' ? 'text-[#00f59b] font-extrabold' : ''}`}
          >
            Service Providers
          </button>
          <span className="text-white/20 select-none">|</span>
          <button 
            type="button"
            onClick={() => setActiveTab(activeTab === 'pricing' ? null : 'pricing')}
            className={`hover:text-[#00f59b] cursor-pointer transition-colors block px-2.5 outline-none focus:outline-none bg-transparent ${activeTab === 'pricing' ? 'text-[#00f59b] font-extrabold' : ''}`}
          >
            Pricing Plans
          </button>
          <span className="text-white/20 select-none">|</span>
          <button 
            type="button"
            onClick={() => setActiveTab(activeTab === 'testimonials' ? null : 'testimonials')}
            className={`hover:text-[#00f59b] cursor-pointer transition-colors block px-2.5 outline-none focus:outline-none bg-transparent ${activeTab === 'testimonials' ? 'text-[#00f59b] font-extrabold' : ''}`}
          >
            Testimonials
          </button>
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

      {/* 🔮 INTERACTIVE EXPANSION TABS OVERLAY PANEL */}
      <AnimatePresence>
        {activeTab && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
            
            {/* Modal Box */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0, y: 15 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 15 }}
              transition={{ duration: 0.2 }}
              className="bg-slate-900/90 border border-white/10 rounded-[2.5rem] w-full max-w-4xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl relative"
            >
              
              {/* Dynamic top-edge decoration bar corresponding to active tab */}
              <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${
                activeTab === 'features' ? 'from-emerald-400 to-[#00f59b]' : 
                activeTab === 'providers' ? 'from-blue-400 to-indigo-500' : 
                activeTab === 'pricing' ? 'from-amber-400 to-orange-500' : 
                'from-pink-400 to-[#ea7ab1]'
              }`} />

              {/* Modal Core Header */}
              <div className="px-6 sm:px-8 pt-6 pb-4 border-b border-white/5 flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block">Propex 360 Workspace Information</span>
                  <h3 className="text-xl sm:text-2xl font-black text-white font-display tracking-tight flex items-center gap-2">
                    {activeTab === 'features' && <><Sparkles className="w-5 h-5 text-emerald-400" /> Platform Core Features</>}
                    {activeTab === 'providers' && <><Building className="w-5 h-5 text-blue-400" /> Vetted Property Services</>}
                    {activeTab === 'pricing' && <><Tag className="w-5 h-5 text-amber-400" /> Dynamic Membership Tiers</>}
                    {activeTab === 'testimonials' && <><Heart className="w-5 h-5 text-pink-400" /> Trusted Member Stories</>}
                  </h3>
                </div>
                
                {/* Close Button */}
                <button 
                  onClick={() => setActiveTab(null)}
                  className="bg-white/5 hover:bg-white/15 text-slate-400 hover:text-white p-2.5 rounded-2xl transition-colors cursor-pointer outline-none focus:outline-none"
                  title="Close panel overlay"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Navigation Sub-Pills for seamless in-modal switching */}
              <div className="px-6 sm:px-8 py-3 bg-slate-950/25 border-b border-white/5 flex items-center gap-1.5 overflow-x-auto select-none no-scrollbar">
                {[
                  { id: 'features', label: 'Platform Features', color: 'bg-emerald-500/10 border-emerald-500/20 text-[#00f59b]' },
                  { id: 'providers', label: 'Service Experts Directory', color: 'bg-blue-500/10 border-blue-500/20 text-blue-400' },
                  { id: 'pricing', label: 'Premium Pricing plans', color: 'bg-amber-500/10 border-amber-500/20 text-amber-400' },
                  { id: 'testimonials', label: 'Success Testimonials', color: 'bg-pink-500/10 border-pink-500/20 text-pink-400' }
                ].map((pill) => (
                  <button
                    key={pill.id}
                    onClick={() => setActiveTab(pill.id as any)}
                    className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all border whitespace-nowrap outline-none focus:outline-none ${
                      activeTab === pill.id 
                        ? pill.color + ' ring-1 ring-white/10 scale-102' 
                        : 'border-transparent text-slate-400 hover:text-white bg-transparent'
                    }`}
                  >
                    {pill.label}
                  </button>
                ))}
              </div>

              {/* Modal Scrollable Content Area */}
              <div className="p-6 sm:p-8 overflow-y-auto flex-1 bg-slate-950/50">
                
                {/* 1. FEATURES TAB CONTENT */}
                {activeTab === 'features' && (
                  <div className="space-y-6">
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl font-medium">
                      Propex360 provides a direct ledger bridging buyers, renters, and licensed experts. No brokers inflating price commissions, just absolute peer-to-peer workspace clarity.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* Feature Item 1 */}
                      <div className="bg-slate-900 border border-white/5 rounded-2xl p-5 hover:border-emerald-500/20 transition-all text-left">
                        <div className="w-9 h-9 rounded-xl bg-emerald-500/15 flex items-center justify-center text-emerald-400 mb-3">
                          <Building className="w-5 h-5" />
                        </div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-tight">360° Discovery Grid</h4>
                        <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
                          List properties with unlimited beautiful high-resolution image portfolios, direct exact coordinates, interactive video tours, RERA certificate papers, and structured carpet layout metrics.
                        </p>
                      </div>

                      {/* Feature Item 2 */}
                      <div className="bg-slate-900 border border-white/5 rounded-2xl p-5 hover:border-blue-500/20 transition-all text-left">
                        <div className="w-9 h-9 rounded-xl bg-blue-500/15 flex items-center justify-center text-blue-400 mb-3">
                          <Zap className="w-5 h-5" />
                        </div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-tight">Direct Owner Sandbox CRM</h4>
                        <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
                          Receive direct buyer leads on your custom inquiry boards with real-time browser alerts. Proactively manage client feedback loops without intermediary agencies.
                        </p>
                      </div>

                      {/* Feature Item 3 */}
                      <div className="bg-slate-900 border border-white/5 rounded-2xl p-5 hover:border-amber-500/20 transition-all text-left">
                        <div className="w-9 h-9 rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-400 mb-3">
                          <Server className="w-5 h-5" />
                        </div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-tight">Integrated Experts Console</h4>
                        <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
                          Specialized channel for home movers, interior designers, architects, and independent brokers to claim project leads, build client portfolios, and update work logs verified on blockchain.
                        </p>
                      </div>

                      {/* Feature Item 4 */}
                      <div className="bg-slate-900 border border-white/5 rounded-2xl p-5 hover:border-pink-500/20 transition-all text-left">
                        <div className="w-9 h-9 rounded-xl bg-pink-500/15 flex items-center justify-center text-pink-400 mb-3">
                          <Shield className="w-5 h-5" />
                        </div>
                        <h4 className="text-sm font-bold text-white uppercase tracking-tight">Instant Vetting System</h4>
                        <p className="text-[11px] text-slate-400 mt-1.5 leading-relaxed">
                          Rigorous admin oversight panel to verify uploaded land registry papers, physical broker licenses, and customer Aadhaar/KYC credentials for comprehensive transaction security.
                        </p>
                      </div>

                    </div>

                    <div className="mt-4 pt-4 border-t border-white/5 flex justify-end">
                      <button 
                        onClick={onEnterApp}
                        className="bg-[#00f59b] hover:bg-[#10b981] text-slate-950 font-extrabold text-xs px-5 py-2.5 rounded-full flex items-center gap-1.5 uppercase transition-all"
                      >
                        <span>Launch Sandbox App</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* 2. SERVICES TAB CONTENT (Real values map!) */}
                {activeTab === 'providers' && (
                  <div className="space-y-6">
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl font-medium">
                      Showing vetted, licensed service professionals active inside the Propex360 sandbox network. Each merchant has gone through rigorous physical verification.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {serviceProviders.map((provider) => (
                        <div key={provider.id} className="bg-slate-900 border border-white/5 rounded-2xl p-4 flex gap-4 text-left hover:border-white/10 transition-all items-start relative">
                          
                          {/* Avatar */}
                          <img 
                            src={provider.avatar} 
                            alt={provider.name} 
                            className="w-12 h-12 rounded-xl object-cover border border-white/15"
                          />

                          {/* Detail */}
                          <div className="space-y-1 flex-1">
                            <span className="text-[9px] bg-blue-500/10 text-blue-400 font-extrabold px-2 py-0.5 rounded uppercase tracking-wider inline-block">
                              {provider.category}
                            </span>
                            <h4 className="text-xs sm:text-sm font-bold text-white leading-tight">
                              {provider.name}
                            </h4>
                            <p className="text-[10px] text-slate-400 font-mono">
                              💸 Pricing: {provider.priceRange}
                            </p>
                            <div className="flex items-center gap-3 text-[10px] text-slate-400 pt-1">
                              <span className="flex items-center gap-1 font-bold text-amber-400">
                                <Star className="w-3 h-3 fill-amber-400 shrink-0" /> {provider.rating} ({provider.reviewsCount} reviews)
                              </span>
                              <span>•</span>
                              <span>💼 {provider.experienceYears} Years Exp</span>
                            </div>
                          </div>

                          {/* Direct Action trigger */}
                          <button 
                            onClick={onEnterApp}
                            className="absolute bottom-4 right-4 bg-white/5 hover:bg-white/10 text-white rounded-lg p-1.5 transition-all text-[10px] font-bold"
                            title="Interactive Contact"
                          >
                            <ChevronRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="mt-4 pt-4 border-t border-white/5 flex items-center justify-between">
                      <span className="text-[10px] font-mono text-slate-500">Total Registered Specialists: 4 active</span>
                      <button 
                        onClick={onEnterApp}
                        className="bg-blue-500 hover:bg-blue-600 text-white font-extrabold text-xs px-5 py-2.5 rounded-full flex items-center gap-1.5 uppercase transition-all"
                      >
                        <span>Join As Provider</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                )}

                {/* 3. PRICING PLANS TAB CONTENT */}
                {activeTab === 'pricing' && (
                  <div className="space-y-6">
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl font-medium">
                      Upgrade listings prioritization status, get bulk client alerts or unlock professional blockchain logging tokens. All sandbox pricing features are fully simulated!
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      
                      {/* Plan 1 */}
                      <div className="bg-slate-900 border border-white/5 rounded-2xl p-5 flex flex-col justify-between text-left relative overflow-hidden">
                        <div>
                          <span className="text-[9px] text-slate-400 font-extrabold uppercase tracking-widest block">Free Starter</span>
                          <div className="flex items-baseline gap-1 mt-2 mb-4">
                            <span className="text-2xl sm:text-3xl font-black text-white font-display">₹0</span>
                            <span className="text-[10px] text-slate-400 font-bold">/ forever</span>
                          </div>
                          <ul className="space-y-2 text-[10px] text-slate-300">
                            <li className="flex items-center gap-1.5">
                              <CheckCircle className="w-3.5 h-3.5 text-[#00f59b]" /> 1 Property listing allocation
                            </li>
                            <li className="flex items-center gap-1.5">
                              <CheckCircle className="w-3.5 h-3.5 text-[#00f59b]" /> Standard search prioritization
                            </li>
                            <li className="flex items-center gap-1.5">
                              <CheckCircle className="w-3.5 h-3.5 text-[#00f59b]" /> Direct peer-to-peer customer chat
                            </li>
                          </ul>
                        </div>
                        <button 
                          onClick={onEnterApp}
                          className="mt-6 w-full text-center py-2 bg-white/5 hover:bg-white/10 text-white font-extrabold rounded-xl transition-all text-[10px] uppercase"
                        >
                          ACTIVE PLAN
                        </button>
                      </div>

                      {/* Plan 2 */}
                      <div className="bg-slate-900 border-2 border-[#00f59b] rounded-2xl p-5 flex flex-col justify-between text-left relative overflow-hidden">
                        <div className="absolute top-0 right-0 bg-[#00f59b] text-slate-950 text-[8px] font-black uppercase px-2 py-0.5 rounded-bl">
                          POPULAR
                        </div>
                        <div>
                          <span className="text-[9px] text-emerald-400 font-extrabold uppercase tracking-widest block">Premium Booster</span>
                          <div className="flex items-baseline gap-1 mt-2 mb-4">
                            <span className="text-2xl sm:text-3xl font-black text-white font-display">₹4,999</span>
                            <span className="text-[10px] text-slate-400 font-bold">/ monthly</span>
                          </div>
                          <ul className="space-y-2 text-[10px] text-slate-300">
                            <li className="flex items-center gap-1.5">
                              <CheckCircle className="w-3.5 h-3.5 text-[#00f59b]" /> Unlimited properties listings
                            </li>
                            <li className="flex items-center gap-1.5">
                              <CheckCircle className="w-3.5 h-3.5 text-[#00f59b]" /> <strong>"Featured" Glow badge</strong>
                            </li>
                            <li className="flex items-center gap-1.5">
                              <CheckCircle className="w-3.5 h-3.5 text-[#00f59b]" /> Priority instant SMS lead triggers
                            </li>
                            <li className="flex items-center gap-1.5">
                              <CheckCircle className="w-3.5 h-3.5 text-[#00f59b]" /> Interactive 3D Video uploading
                            </li>
                          </ul>
                        </div>
                        <button 
                          onClick={onEnterApp}
                          className="mt-6 w-full text-center py-2 bg-[#00f59b] hover:bg-[#10b981] text-slate-950 font-extrabold rounded-xl transition-all text-[10px] uppercase shadow-lg shadow-[#00f59b]/25"
                        >
                          Simulate Upgrade
                        </button>
                      </div>

                      {/* Plan 3 */}
                      <div className="bg-slate-900 border border-white/5 rounded-2xl p-5 flex flex-col justify-between text-left relative overflow-hidden">
                        <div>
                          <span className="text-[9px] text-amber-400 font-extrabold uppercase tracking-widest block">Enterprise Elite</span>
                          <div className="flex items-baseline gap-1 mt-2 mb-4">
                            <span className="text-2xl sm:text-3xl font-black text-white font-display">₹14,999</span>
                            <span className="text-[10px] text-slate-400 font-bold">/ monthly</span>
                          </div>
                          <ul className="space-y-2 text-[10px] text-slate-300">
                            <li className="flex items-center gap-1.5">
                              <CheckCircle className="w-3.5 h-3.5 text-[#00f59b]" /> Bulk broker license integration
                            </li>
                            <li className="flex items-center gap-1.5">
                              <CheckCircle className="w-3.5 h-3.5 text-[#00f59b]" /> Multi-user team CRM dashboard
                            </li>
                            <li className="flex items-center gap-1.5">
                              <CheckCircle className="w-3.5 h-3.5 text-[#00f59b]" /> Pre-approved super admin status
                            </li>
                            <li className="flex items-center gap-1.5">
                              <CheckCircle className="w-3.5 h-3.5 text-[#00f59b]" /> Direct API spreadsheet push link
                            </li>
                          </ul>
                        </div>
                        <button 
                          onClick={onEnterApp}
                          className="mt-6 w-full text-center py-2 bg-white/5 hover:bg-white/10 text-white font-extrabold rounded-xl transition-all text-[10px] uppercase"
                        >
                          Contact Enterprise
                        </button>
                      </div>

                    </div>
                  </div>
                )}

                {/* 4. TESTIMONIALS TAB CONTENT */}
                {activeTab === 'testimonials' && (
                  <div className="space-y-6">
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed max-w-2xl font-medium">
                      Listen to actual verified builders, renters, and professional partners who utilize our sandbox workflow to execute transactions with massive security.
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      
                      {/* Testimonial 1 */}
                      <div className="bg-slate-900 border border-white/5 rounded-2xl p-5 text-left relative flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-1 mb-2.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                          <p className="text-[11px] text-slate-300 italic leading-relaxed font-semibold">
                            "Bandra space agreements are a breeze of transparent clarity with direct chat. Getting my premium sea-facing apartment uploaded and approved by the Propex admin took less than 20 minutes. Highly recommended sandbox experience!"
                          </p>
                        </div>
                        <div className="flex items-center gap-2.5 mt-4 pt-4 border-t border-white/5">
                          <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100" className="w-8 h-8 rounded-full object-cover border border-white/10" alt="" />
                          <div>
                            <span className="text-xs font-bold text-white block">Ananya Sharma</span>
                            <span className="text-[9px] text-slate-400 font-semibold block leading-none">Verified Owner, Bangalore / Mumbai</span>
                          </div>
                        </div>
                      </div>

                      {/* Testimonial 2 */}
                      <div className="bg-slate-900 border border-white/5 rounded-2xl p-5 text-left relative flex flex-col justify-between">
                        <div>
                          <div className="flex items-center gap-1 mb-2.5">
                            {[1, 2, 3, 4, 5].map((s) => (
                              <Star key={s} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                            ))}
                          </div>
                          <p className="text-[11px] text-slate-300 italic leading-relaxed font-semibold">
                            "As an independent broker in the Noida corridor, handling property listings is exceptionally tedious with double brokering and fake postings. The secure PDF deed uploads on Propex360 give buyers total assurance before booking calls!"
                          </p>
                        </div>
                        <div className="flex items-center gap-2.5 mt-4 pt-4 border-t border-white/5">
                          <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" className="w-8 h-8 rounded-full object-cover border border-white/10" alt="" />
                          <div>
                            <span className="text-xs font-bold text-white block">Suresh Kumar</span>
                            <span className="text-[9px] text-slate-400 font-semibold block leading-none">Real Estate Specialist • Suresh Brokerage</span>
                          </div>
                        </div>
                      </div>

                    </div>
                  </div>
                )}

              </div>

              {/* Modal footer close option */}
              <div className="px-6 py-4 bg-slate-950 border-t border-white/5 flex items-center justify-between">
                <span className="text-[9px] text-slate-500 font-mono">Simulated Workspace Ledger 2026</span>
                <button 
                  onClick={() => setActiveTab(null)}
                  className="bg-white/10 hover:bg-white/15 text-white text-[10px] uppercase font-bold px-4 py-2 rounded-xl transition-all cursor-pointer outline-none focus:outline-none"
                >
                  Close Panel
                </button>
              </div>

            </motion.div>

          </div>
        )}
      </AnimatePresence>

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
