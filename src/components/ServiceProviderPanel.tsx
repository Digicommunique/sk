/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, Dispatch, SetStateAction } from 'react';
import { 
  Wrench, DollarSign, TrendingUp, Inbox, Calendar, Award, BookOpen, 
  Share2, Star, CheckCircle2, ShieldAlert, Plus, Edit3, Trash, UserCheck, Check
} from 'lucide-react';
import { ServiceProviderItem, ServiceLead } from '../types';

interface ServiceProviderPanelProps {
  providers: ServiceProviderItem[];
  serviceLeads: ServiceLead[];
  setServiceLeads: Dispatch<SetStateAction<ServiceLead[]>>;
}

export default function ServiceProviderPanel({
  providers,
  serviceLeads,
  setServiceLeads
}: ServiceProviderPanelProps) {
  // Service providers state controls
  const [activeSubTab, setActiveSubTab] = useState<'manager' | 'crm' | 'finance' | 'reputation'>('crm');
  
  // Custom Services list states
  const [servicesList, setServicesList] = useState([
    { id: 'srv-1', title: 'Premium full-home loading packing move', rate: '₹8,500 base rate', active: true },
    { id: 'srv-2', title: 'Modular Kitchen layout interior mockups', rate: '₹12,000 flat consultation', active: true },
    { id: 'srv-3', title: 'Pre-sanction mortgage document appraisal', rate: '₹4,500 per profile file', active: false }
  ]);

  const [newSrvTitle, setNewSrvTitle] = useState('');
  const [newSrvRate, setNewSrvRate] = useState('');
  
  const [showShareSuccess, setShowShareSuccess] = useState(false);

  // CRM Pipeline State update
  const handleUpdateLeadStatus = (leadId: string, nextStatus: 'Hot' | 'Warm' | 'Cold') => {
    setServiceLeads(prev => prev.map(lead => {
      if (lead.id === leadId) {
        return { ...lead, status: nextStatus };
      }
      return lead;
    }));
  };

  const handleAddCustomService = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSrvTitle || !newSrvRate) return;

    setServicesList(prev => [
      ...prev,
      {
        id: `srv-${Date.now()}`,
        title: newSrvTitle,
        rate: newSrvRate,
        active: true
      }
    ]);
    setNewSrvTitle('');
    setNewSrvRate('');
  };

  const handleDeleteService = (id: string) => {
    setServicesList(prev => prev.filter(s => s.id !== id));
  };

  return (
    <div id="service-expert-panel-view" className="space-y-6">
      
      {/* 🛠️ Main Dashboard Profile Completion Banner */}
      <div className="bg-white rounded-3xl p-6 border border-slate-100 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-tr from-teal-400 to-teal-600 rounded-2xl flex items-center justify-center font-black text-2xl text-white shadow-md">
            SH
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-extrabold text-base text-slate-800">Signature Habitat Interiors</h3>
              <span className="text-[9px] bg-teal-100 text-teal-800 font-bold px-2 py-0.5 rounded-full uppercase">GOLD AGENCY</span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5 font-medium">Category: Architecture & Remodeling, Packing Movers, Capital Finance advice</p>
            
            {/* Reputation star review */}
            <div className="flex items-center gap-1 mt-1.5 text-xs">
              <span className="flex items-center gap-0.5 text-yellow-500 font-bold">
                ★ 4.9 <span className="text-slate-400 font-normal">(88 client reviews verified)</span>
              </span>
              <span className="text-slate-300 mx-2">|</span>
              <span className="text-[10px] bg-emerald-50 text-emerald-700 font-bold px-2 py-0.5 rounded-full">
                ⏱ 95% High Response Speed
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic target completions metric progress */}
        <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 min-w-[200px] text-xs space-y-2">
          <div className="flex justify-between font-bold text-slate-600">
            <span>Profile Completeness</span>
            <span className="text-teal-600">85% Filled</span>
          </div>
          <div className="h-1.5 bg-slate-200 rounded-full w-full overflow-hidden">
            <div className="h-full bg-teal-500 rounded-full" style={{ width: '85%' }}></div>
          </div>
          <p className="text-[9px] text-slate-400 font-semibold text-center">Add Aadhaar documents to receive Verified Gold Badging!</p>
        </div>
      </div>

      {/* 🔘 Navigation pill tab layout */}
      <div className="flex gap-2 p-1 bg-slate-200/60 rounded-2xl w-full sm:w-fit scrollbar-none overflow-x-auto">
        {[
          { id: 'crm', label: 'Leads Pipeline CRM', icon: Inbox },
          { id: 'manager', label: 'Services List Editor', icon: Wrench },
          { id: 'finance', label: 'Earnings Tracker', icon: DollarSign },
          { id: 'reputation', label: 'Reviews & Badges', icon: Award }
        ].map(pill => (
          <button 
            id={`prov-subtab-${pill.id}`}
            key={pill.id}
            onClick={() => setActiveSubTab(pill.id as any)}
            className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all flex items-center gap-2 ${activeSubTab === pill.id ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-600 hover:text-teal-600'}`}
          >
            <pill.icon className="w-3.5 h-3.5" /> {pill.label}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 columns: Display selected sub tab activity area */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 1. CRM PIPELINE TAB */}
          {activeSubTab === 'crm' && (
            <div id="service-provider-crm-view" className="space-y-6">
              <div>
                <h3 className="text-sm font-bold text-slate-800 mb-1 flex items-center gap-1">
                  <Inbox className="w-4 h-4 text-teal-600" /> Active Service Leads Pipeline
                </h3>
                <p className="text-xs text-slate-400">Classified by temperature of user budgets & intent</p>
              </div>

              {/* 3 Pipeline Lanes (Hot / Warm / Cold) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* LANE 1: HOT */}
                <div className="bg-rose-50 border border-rose-100/60 rounded-3xl p-4 flex flex-col h-[400px]">
                  <span className="bg-rose-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full w-fit flex items-center gap-1 mb-4">
                    🔥 HOT STAGE ({serviceLeads.filter(l => l.status === 'Hot').length})
                  </span>

                  <div className="flex-1 overflow-y-auto space-y-3">
                    {serviceLeads.filter(l => l.status === 'Hot').map(lead => (
                      <div key={lead.id} className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 text-xs">
                        <h4 className="font-bold text-slate-800">{lead.customerName}</h4>
                        <p className="text-[10px] text-teal-600 font-bold mt-0.5">{lead.serviceCategory}</p>
                        <p className="text-[10px] text-slate-500 font-sans mt-2 line-clamp-3">"{lead.details}"</p>
                        <p className="text-[10px] text-slate-400 font-bold mt-2">Budget: {lead.budget || 'N/A'}</p>

                        <div className="flex gap-1 mt-3 pt-3 border-t border-slate-100 justify-end">
                          <button 
                            onClick={() => handleUpdateLeadStatus(lead.id, 'Warm')}
                            className="text-[9px] bg-amber-50 text-amber-700 hover:bg-amber-100 font-bold px-2.5 py-1 rounded-lg"
                          >
                            Set Warm
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* LANE 2: WARM */}
                <div className="bg-amber-50/50 border border-amber-100 rounded-3xl p-4 flex flex-col h-[400px]">
                  <span className="bg-amber-500 text-slate-950 text-[9px] font-bold px-2 py-0.5 rounded-full w-fit flex items-center gap-1 mb-4">
                    ⚡ WARM STAGE ({serviceLeads.filter(l => l.status === 'Warm').length})
                  </span>

                  <div className="flex-1 overflow-y-auto space-y-3">
                    {serviceLeads.filter(l => l.status === 'Warm').map(lead => (
                      <div key={lead.id} className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 text-xs">
                        <h4 className="font-bold text-slate-800">{lead.customerName}</h4>
                        <p className="text-[10px] text-teal-600 font-bold mt-0.5">{lead.serviceCategory}</p>
                        <p className="text-[10px] text-slate-500 font-sans mt-2 line-clamp-3">"{lead.details}"</p>
                        
                        <div className="flex gap-1 mt-3 pt-3 border-t border-slate-100 justify-end">
                          <button 
                            onClick={() => handleUpdateLeadStatus(lead.id, 'Hot')}
                            className="text-[9px] bg-rose-500 text-white hover:bg-rose-600 font-bold px-2.5 py-1 rounded-lg"
                          >
                            Set Hot
                          </button>
                          <button 
                            onClick={() => handleUpdateLeadStatus(lead.id, 'Cold')}
                            className="text-[9px] bg-slate-100 text-slate-600 hover:bg-slate-200 font-bold px-2 py-1 rounded-lg"
                          >
                            Set Cold
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* LANE 3: COLD */}
                <div className="bg-cyan-50/50 border border-cyan-100/60 rounded-3xl p-4 flex flex-col h-[400px]">
                  <span className="bg-cyan-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full w-fit flex items-center gap-1 mb-4">
                    ❄ COLD STAGE ({serviceLeads.filter(l => l.status === 'Cold').length})
                  </span>

                  <div className="flex-1 overflow-y-auto space-y-3">
                    {serviceLeads.filter(l => l.status === 'Cold').map(lead => (
                      <div key={lead.id} className="bg-white p-3 rounded-2xl shadow-sm border border-slate-100 text-xs text-slate-500">
                        <h4 className="font-bold text-slate-800">{lead.customerName}</h4>
                        <p className="text-[10px] text-teal-600 font-bold mt-0.5">{lead.serviceCategory}</p>
                        <p className="text-[10px] text-slate-400 mt-2 line-clamp-1">"{lead.details}"</p>

                        <div className="flex gap-1 mt-3 pt-3 border-t border-slate-100 justify-end">
                          <button 
                            onClick={() => handleUpdateLeadStatus(lead.id, 'Warm')}
                            className="text-[9px] bg-amber-500 text-slate-950 font-bold px-2.5 py-1 rounded-lg"
                          >
                            Re-Open Warm
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* 2. SERVICES LIST MANAGER TAB */}
          {activeSubTab === 'manager' && (
            <div id="service-provider-pricing-view" className="bg-white rounded-3xl p-6 border border-slate-100 space-y-6">
              <div>
                <h3 className="text-sm font-bold text-slate-800 mb-1 flex items-center gap-1">
                  <Wrench className="w-4 h-4 text-teal-600" /> Services Price Manager Widget
                </h3>
                <p className="text-xs text-slate-400">Configure what tasks clients pay you for, set custom flat rate and per-sqft configurations</p>
              </div>

              {/* Add New Service Form */}
              <form onSubmit={handleAddCustomService} className="bg-slate-50 border border-slate-100 rounded-2xl p-4">
                <span className="text-[10px] bg-teal-500 text-white font-bold px-2.5 py-0.5 rounded tracking-wide uppercase inline-block mb-3">Add Custom Service Block</span>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">Service Title Description</label>
                    <input 
                      id="prov-service-title"
                      type="text" 
                      required
                      placeholder="e.g. 2 BHK Premium Deep Sanitization Clean"
                      value={newSrvTitle}
                      onChange={(e) => setNewSrvTitle(e.target.value)}
                      className="bg-white border border-slate-200 w-full rounded-xl text-xs px-3 py-2.5 focus:outline-teal-500"
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">Price / Comm Rate Quote</label>
                    <input 
                      id="prov-service-rate"
                      type="text" 
                      required
                      placeholder="e.g. ₹6,500 flat billing"
                      value={newSrvRate}
                      onChange={(e) => setNewSrvRate(e.target.value)}
                      className="bg-white border border-slate-200 w-full rounded-xl text-xs px-3 py-2.5 focus:outline-teal-500"
                    />
                  </div>
                </div>

                <div className="text-right mt-4">
                  <button 
                    id="prov-add-service-btn"
                    type="submit" 
                    className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs py-2 px-4 rounded-xl shadowactive:scale-95 transition-all"
                  >
                    Add Service Offering
                  </button>
                </div>
              </form>

              {/* Current active list */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Listed services catalog</h4>

                {servicesList.map(srv => (
                  <div key={srv.id} className="p-4 border border-slate-100 rounded-2xl bg-white flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <span className={`w-2.5 h-2.5 rounded-full ${srv.active ? 'bg-emerald-500' : 'bg-slate-300'}`}></span>
                      <div>
                        <p className="text-xs font-bold text-slate-800">{srv.title}</p>
                        <p className="text-[10px] text-slate-400 mt-0.5">Rate Index: {srv.rate}</p>
                      </div>
                    </div>

                    <button 
                      onClick={() => handleDeleteService(srv.id)}
                      className="text-rose-600 hover:bg-rose-50 p-2 rounded-xl transition-colors active:scale-95"
                    >
                      <Trash className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. FINANCE TRACKER VIEW */}
          {activeSubTab === 'finance' && (
            <div id="service-provider-finance-view" className="bg-white rounded-3xl p-6 border border-slate-100 space-y-6 animate-fadeIn">
              <div>
                <h3 className="text-sm font-bold text-slate-800 mb-1 flex items-center gap-1">
                  <DollarSign className="w-4 h-4 text-teal-600" /> Earnings Tracker Console
                </h3>
                <p className="text-xs text-slate-400">Total processed commissions, paid consultation appointments, and payouts timeline</p>
              </div>

              {/* Finance cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-teal-50 border border-teal-100 rounded-3xl p-5">
                  <span className="text-[10px] text-teal-800 font-extrabold uppercase tracking-wider">MONTHLY SETTLED EARNINGS</span>
                  <h4 className="text-2xl font-black text-teal-900 font-display mt-1">₹1,84,500.00</h4>
                  <p className="text-[10px] text-teal-600 font-semibold mt-0.5">Includes 14 client consulting files processed successfully</p>
                  
                  <div className="mt-4 pt-4 border-t border-teal-200/50 flex justify-between text-xs font-bold text-teal-800">
                    <span>Direct Commission: 72%</span>
                    <span>Paid Consultings: 28%</span>
                  </div>
                </div>

                <div className="bg-slate-50 border border-slate-100 rounded-3xl p-5">
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wider">ANNUAL PROJECTED GOAL</span>
                  <div className="flex items-center gap-1.5 mt-1">
                    <h4 className="text-xl font-extrabold text-slate-800 font-display">₹15,00,000</h4>
                    <span className="text-[10px] bg-emerald-100 text-emerald-800 font-extrabold px-1.5 rounded-full">+4.2%</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-semibold mt-1">Goal completion cap is set at 75% for Q2 2026</p>

                  <div className="h-1.5 bg-slate-200 rounded-full w-full overflow-hidden mt-4">
                    <div className="h-full bg-emerald-500 rounded-full" style={{ width: '75%' }}></div>
                  </div>
                </div>
              </div>

              {/* Mock Earnings Sparkline charts bar */}
              <div className="border border-slate-150 rounded-2xl p-4 bg-slate-50/50">
                <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wide mb-4">Earnings bar trend 2026 (Jan - May)</h4>
                
                {/* Simulated Custom Bar chart blocks */}
                <div className="flex items-end justify-between gap-2 h-32 pt-8 font-sans">
                  {[
                    { month: 'Jan', val: 40, display: '₹40K' },
                    { month: 'Feb', val: 65, display: '₹65K' },
                    { month: 'Mar', val: 80, display: '₹80K' },
                    { month: 'Apr', val: 120, display: '₹1.2L' },
                    { month: 'May', val: 184, display: '₹1.8L' },
                  ].map((block, idx) => (
                    <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 group">
                      <div className="text-[9px] font-bold text-teal-700 opacity-0 group-hover:opacity-100 transition-opacity bg-teal-50 px-1 py-0.5 rounded">
                        {block.display}
                      </div>
                      <div 
                        className="bg-teal-600 hover:bg-slate-900 w-full rounded-t-lg transition-transform hover:scale-105 duration-150"
                        style={{ height: `${(block.val / 200) * 100}px` }}
                      ></div>
                      <span className="text-[10px] text-slate-400 font-bold">{block.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* 4. REPUTATION BOARD & VERIFIED BADGING */}
          {activeSubTab === 'reputation' && (
            <div id="service-provider-reputation-view" className="bg-white rounded-3xl p-6 border border-slate-100 space-y-6">
              <div>
                <h3 className="text-sm font-bold text-slate-800 mb-1 flex items-center gap-1">
                  <Award className="w-4 h-4 text-teal-600" /> Reputation & Verified Badge Board
                </h3>
                <p className="text-xs text-slate-400">Track consumer testimonials & unlock elite gold status tags</p>
              </div>

              {/* Status requirements tracker */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="border border-slate-100 rounded-2xl p-4 bg-teal-50/30">
                  <span className="text-[10px] text-teal-800 font-extrabold uppercase">RATING VERIFIER STATUS</span>
                  <div className="flex items-center gap-1.5 text-2xl font-black text-slate-800 font-display mt-2">
                    ★ 4.9 <span className="text-xs text-teal-700 font-bold">(Top 5% rated)</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">To gain diamond badge, average reviews must stay &gt; 4.95 for 3 months</p>
                </div>

                <div className="border border-slate-100 rounded-2xl p-4 bg-slate-50">
                  <span className="text-[10px] text-slate-400 font-extrabold uppercase">AUTO RESPONSE CRITEA</span>
                  <div className="text-2xl font-black text-emerald-600 font-display mt-2">
                    ⏱ 95% <span className="text-xs text-slate-500 font-bold">Excellent Speed</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-1">Average time elapsed replying to hot leads: 12 minutes</p>
                </div>
              </div>

              {/* Review entries listings */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Testimonials reported by Clients</h4>

                {[
                  { name: 'Sameer Singhania', text: 'Stellar work! Signature Habitat re-designed my Bandra Heights 3BHK and delivered layout plans ahead of our possession timeline.', rating: '5 ★' },
                  { name: 'Kamesh Chawla', text: 'Helpful mortgage counsel. Amit Saxena assisted us in selecting the lowest EMI rate index of 8.45%. Highly resource oriented!', rating: '5 ★' }
                ].map((testi, i) => (
                  <div key={i} className="p-3 bg-slate-50 border border-slate-100 rounded-xl text-xs">
                    <div className="flex items-center justify-between">
                      <strong className="text-slate-800">{testi.name}</strong>
                      <span className="text-amber-500 font-bold">{testi.rating}</span>
                    </div>
                    <p className="text-slate-500 mt-1 italic font-medium leading-normal">"{testi.text}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right column: Growth instructions & Marketing controls */}
        <div className="space-y-6">
          
          {/* Growth tutorial list with rewards */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5 mb-1">
              <BookOpen className="w-4 h-4 text-teal-600" /> Grow Business Hub
            </h3>
            <p className="text-[10px] text-slate-400 font-medium mb-4">Complete tutorials to claim premium marketing boosts & badges</p>

            <div className="space-y-3.5 text-xs font-medium">
              {[
                { title: 'Converting cold real estate leads to active visits', duration: '5 mins read', badge: '10 Boost credits' },
                { title: 'The math behind super area sizing indexes', duration: '8 mins video', badge: 'RERA badge plus' },
                { title: 'Optimal packing & movers damage policy drafting', duration: '4 mins read', badge: 'Legal verification helper' },
              ].map((tut, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 transition-colors cursor-pointer border border-slate-100">
                  <h4 className="font-extrabold text-slate-700 hover:text-teal-600 leading-snug">{tut.title}</h4>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 mt-2">
                    <span>🕒 {tut.duration}</span>
                    <span className="text-teal-700 bg-teal-50 font-bold px-1.5 py-0.5 rounded">{tut.badge}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Marketing tools - Profile sharing generator */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm text-center">
            <Share2 className="w-8 h-8 text-teal-600 mx-auto bg-teal-50 rounded-full p-1.5 mb-2.5" />
            <h3 className="text-sm font-bold text-slate-800">Marketing & Outreach Tools</h3>
            <p className="text-[11px] text-slate-400 mt-0.5 mb-4 leading-normal">Broadcast your verified reviews card or share profile details with clients directly via links</p>

            <button 
              id="prov-share-profile-btn"
              onClick={() => {
                setShowShareSuccess(true);
                setTimeout(() => setShowShareSuccess(false), 2000);
              }}
              className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs py-2 px-4 rounded-xl w-full active:scale-95 transition-all inline-flex items-center justify-center gap-1.5 shadow-sm"
            >
              <Share2 className="w-3.5 h-3.5" /> Generate Business Profile Link
            </button>

            {showShareSuccess && (
              <div className="mt-3 p-2 bg-emerald-50 border border-emerald-200 text-emerald-800 text-[10px] font-bold rounded-lg flex items-center justify-center gap-1 animate-fadeIn">
                <Check className="w-3.5 h-3.5 text-emerald-600" /> Link Copied to Sandbox Clipboard!
              </div>
            )}
          </div>

        </div>
      </div>

    </div>
  );
}
