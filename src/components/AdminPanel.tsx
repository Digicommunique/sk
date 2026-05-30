/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, Dispatch, SetStateAction } from 'react';
import { 
  ShieldCheck, AlertTriangle, Users, DollarSign, Megaphone, CheckCircle, 
  XCircle, Filter, Trash2, Mail, MessageSquare, ExternalLink, HelpCircle, Check, X
} from 'lucide-react';
import { Property, Lead, UserAccount, SupportTicket } from '../types';
import { MARKETING_TEMPLATES } from '../mockData';

interface AdminPanelProps {
  properties: Property[];
  setProperties: Dispatch<SetStateAction<Property[]>>;
  users: UserAccount[];
  setUsers: Dispatch<SetStateAction<UserAccount[]>>;
  tickets: SupportTicket[];
  setTickets: Dispatch<SetStateAction<SupportTicket[]>>;
  leads: Lead[];
}

export default function AdminPanel({
  properties,
  setProperties,
  users,
  setUsers,
  tickets,
  setTickets,
  leads
}: AdminPanelProps) {
  // Sub tab selection
  const [activeSubTab, setActiveSubTab] = useState<'moderation' | 'users' | 'billing' | 'marketing' | 'support'>('moderation');
  
  // Marketing campaign states
  const [promoTitle, setPromoTitle] = useState('');
  const [promoBody, setPromoBody] = useState('');
  const [campaignSuccess, setCampaignSuccess] = useState(false);

  // Filter criteria for moderation list
  const pendingModeration = properties.filter(p => p.verificationStatus === 'Pending');
  const activeUsers = users.filter(u => u.status === 'Active');
  const totalBanned = users.filter(u => u.status === 'Banned').length;

  // Global KPIs values
  const systemKPIs = [
    { label: 'Active Users', count: users.length, diff: '+12% this week' },
    { label: 'Vetted Properties', count: properties.length, diff: '3 approval pending' },
    { label: 'Platform Leads', count: leads.length, diff: '95% response rate' },
    { label: 'Cumulative Revenue', count: '₹2,84,500', diff: '12 active plans' }
  ];

  // User control actions (Approve/Ban/Unban)
  const handleToggleUserBan = (userId: string, currentStatus: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        return { 
          ...u, 
          status: currentStatus === 'Banned' ? 'Active' : 'Banned',
          kycStatus: currentStatus === 'Banned' ? 'Verified' : 'Unverified'
        };
      }
      return u;
    }));
  };

  const handleVerifyKycUser = (userId: string) => {
    setUsers(prev => prev.map(u => {
      if (u.id === userId) {
        return { ...u, kycStatus: 'Verified', status: 'Active' };
      }
      return u;
    }));
  };

  // Property moderation controls
  const handleModerateProperty = (id: string, action: 'Approve' | 'Reject') => {
    setProperties(prev => prev.map(p => {
      if (p.id === id) {
        return { 
          ...p, 
          verificationStatus: action === 'Approve' ? 'Approved' : 'Rejected',
          verifiedBadge: action === 'Approve' ? true : false
        };
      }
      return p;
    }));
  };

  // Support ticket actions
  const handleResolveTicket = (ticketId: string) => {
    setTickets(prev => prev.map(t => {
      if (t.id === ticketId) {
        return { ...t, status: 'Resolved' };
      }
      return t;
    }));
  };

  // Send Broadcast Trigger
  const handleSendCampaign = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoTitle || !promoBody) return;

    setCampaignSuccess(true);
    setTimeout(() => {
      setCampaignSuccess(false);
      setPromoTitle('');
      setPromoBody('');
    }, 2000);
  };

  return (
    <div id="admin-panel-view" className="space-y-6">
      
      {/* 📊 Global KPIs Stats Ribbon */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {systemKPIs.map((kpi, idx) => (
          <div key={idx} className="bg-slate-900 rounded-3xl p-5 text-white flex flex-col justify-between h-28 relative overflow-hidden">
            <span className="text-[10px] uppercase font-extrabold tracking-widest text-slate-400">{kpi.label}</span>
            <span className="text-2xl font-black mt-1 font-display">{kpi.count}</span>
            <span className="text-[9px] text-teal-300 font-semibold mt-1">{kpi.diff}</span>
          </div>
        ))}
      </div>

      {/* 🔘 Main Sub Tab controller pills */}
      <div className="flex gap-2 p-1 bg-slate-200/65 rounded-2xl w-full sm:w-fit overflow-x-auto scrollbar-none shrink-0">
        {[
          { id: 'moderation', label: 'Listing Quality Control', icon: ShieldCheck, badgeCount: pendingModeration.length },
          { id: 'users', label: 'User Account Control', icon: Users },
          { id: 'billing', label: 'Financial Roster', icon: DollarSign },
          { id: 'marketing', label: 'Campaign Broadcaster', icon: Megaphone },
          { id: 'support', label: 'Support Ticket Center', icon: HelpCircle, badgeCount: tickets.filter(t => t.status !== 'Resolved').length }
        ].map(tab => (
          <button 
            id={`admin-subtab-${tab.id}`}
            key={tab.id}
            onClick={() => setActiveSubTab(tab.id as any)}
            className={`px-4 py-2 text-xs font-bold shrink-0 rounded-xl transition-all flex items-center gap-2 ${activeSubTab === tab.id ? 'bg-teal-600 text-white shadow-sm' : 'text-slate-600 hover:text-teal-600'}`}
          >
            <tab.icon className="w-3.5 h-3.5" /> 
            <span>{tab.label}</span>
            {tab.badgeCount !== undefined && tab.badgeCount > 0 && (
              <span className="bg-red-500 text-white text-[9px] px-1.5 py-0.5 rounded-full font-bold ml-1">
                {tab.badgeCount}
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 columns: Display content based on activeSubTab selection */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 1. PROPERTY MODERATION GRID WORKSPACE */}
          {activeSubTab === 'moderation' && (
            <div id="admin-moderation-view" className="bg-white rounded-3xl p-6 border border-slate-100 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-800 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" /> Listings Moderation Tray
                  </span>
                  <span className="text-[10px] bg-amber-50 text-amber-800 border border-amber-200 px-2.5 py-0.5 rounded-full font-bold">
                    {pendingModeration.length} Pending vetting
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Audit uploaded ownership records and descriptions before authorizing public visibility indices</p>
              </div>

              {pendingModeration.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs font-medium">
                  <CheckCircle className="w-12 h-12 text-emerald-500 mx-auto mb-3" />
                  All submitted property listings are verified! Standard is up-to-date.
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingModeration.map(p => (
                    <div key={p.id} className="p-4 border border-slate-100 rounded-2xl bg-slate-50 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] bg-slate-200 text-slate-700 font-bold px-1.5 py-0.5 rounded uppercase">
                            {p.category}
                          </span>
                          <span className="text-xs font-bold text-slate-800">₹{(p.price / 100000).toFixed(0)}L • Area: {p.builtUpArea} sqft</span>
                        </div>
                        <h4 className="font-extrabold text-xs text-slate-700 mt-1 line-clamp-1">{p.title}</h4>
                        <p className="text-[10px] text-slate-400 mt-0.5">Posted by {p.ownerName} ({p.ownerType}) • Landmark: {p.landmark}, {p.city}</p>
                        
                        {/* Simulated papers link verification */}
                        <div className="flex gap-4 mt-2 text-[10px] font-semibold text-teal-600">
                          {p.ownershipDoc && <span className="underline cursor-pointer">📄 Ownership deed verified</span>}
                          {p.verificationIdDoc && <span className="underline cursor-pointer">🆔 Owner PAN card logged</span>}
                        </div>
                      </div>

                      <div className="flex gap-2 self-end sm:self-auto shrink-0">
                        <button 
                          id={`admin-reject-listing-${p.id}`}
                          onClick={() => handleModerateProperty(p.id, 'Reject')}
                          className="bg-white border border-rose-200 text-rose-600 p-2 rounded-xl text-xs font-bold active:scale-95 transition-all outline-none"
                          title="Reject / Flag duplicate listing"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <button 
                          id={`admin-approve-listing-${p.id}`}
                          onClick={() => handleModerateProperty(p.id, 'Approve')}
                          className="bg-emerald-600 text-white hover:bg-emerald-700 p-2 rounded-xl text-xs font-bold active:scale-95 transition-all inline-flex items-center gap-1 shadow-sm font-semibold outline-none"
                        >
                          <Check className="w-4 h-4" /> Verify & Authorize
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* 2. USER MANAGEMENT WORKSPACE */}
          {activeSubTab === 'users' && (
            <div id="admin-users-view" className="bg-white rounded-3xl p-6 border border-slate-100 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-800 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-teal-600" /> User Accounts Control Center
                  </span>
                  <span className="text-[10px] bg-red-100 text-red-800 px-2.5 py-0.5 rounded-full font-bold">
                    {totalBanned} Flagged / Banned
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Validate user registrations, audit KYC records, and ban fraudulent operators</p>
              </div>

              <div className="space-y-3.5">
                {users.map(u => (
                  <div key={u.id} className="p-4 border border-slate-100 rounded-2xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="flex items-center gap-3">
                      <img src={u.avatar} alt="" className="w-10 h-10 object-cover rounded-full shrink-0" />
                      <div>
                        <div className="flex items-center gap-1.5">
                          <strong className="text-xs text-slate-800 leading-none">{u.name}</strong>
                          <span className="text-[9px] bg-slate-100 text-slate-600 font-bold px-1.5 py-0.5 rounded leading-none uppercase">
                            {u.role}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-1">Email: {u.email} | Phone: {u.phone}</p>
                        
                        {/* Display uploaded documents */}
                        <div className="flex items-center gap-1.5 mt-1.5">
                          <span className={`text-[9px] font-bold px-1.5 rounded-full ${u.kycStatus === 'Verified' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                            KYC: {u.kycStatus}
                          </span>
                          {u.kycDocumentName && (
                            <span className="text-[9px] text-slate-500 italic block">
                              ({u.kycDocumentType}: {u.kycDocumentName})
                            </span>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="flex gap-2 self-end sm:self-auto shrink-0">
                      {u.kycStatus === 'Pending' && (
                        <button 
                          id={`admin-verify-kyc-btn-${u.id}`}
                          onClick={() => handleVerifyKycUser(u.id)}
                          className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 text-[10px] font-bold px-3 py-1.5 rounded-xl border border-emerald-100"
                        >
                          Approve KYC papers
                        </button>
                      )}

                      <button 
                        id={`admin-ban-toggle-btn-${u.id}`}
                        onClick={() => handleToggleUserBan(u.id, u.status)}
                        className={`text-[10px] font-bold px-3 py-1.5 rounded-xl border transition-colors ${u.status === 'Banned' ? 'bg-emerald-50 border-emerald-100 text-emerald-800' : 'bg-rose-50 border-rose-100 text-rose-800'}`}
                      >
                        {u.status === 'Banned' ? 'Re-activate Account' : 'Restrict & Ban Use'}
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 3. PLATFORM BILLING LOGS */}
          {activeSubTab === 'billing' && (
            <div id="admin-billing-view" className="bg-white rounded-3xl p-6 border border-slate-100 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-800 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <DollarSign className="w-4 h-4 text-emerald-600" /> Subscription Roster logs
                  </span>
                  <span className="text-[10px] bg-teal-50 text-teal-800 border border-teal-200 px-2.5 py-0.5 rounded-full font-bold">
                    Razorpay Sandbox Active
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Realtime listings of transaction indices verified on payment gateways</p>
              </div>

              {/* Invoices grid */}
              <div className="space-y-2 font-mono text-xs">
                {[
                  { id: 'TXN-9403-A2', email: 'vikram.malhotra@gmail.com', desc: 'Featured Booster pack 30D', amount: '₹1,499.00', date: '2026-05-29', status: 'Payment Settled' },
                  { id: 'TXN-4011-B5', email: 'contact@signaturehabitat.in', desc: 'Broker premium dashboard annual', amount: '₹8,500.00', date: '2026-05-28', status: 'Payment Settled' },
                  { id: 'TXN-8821-X9', email: 'ananya.sharma@gmail.com', desc: 'Gold verify listing audit', amount: '₹1,499.00', date: '2026-05-28', status: 'Payment Settled' }
                ].map((inv, idx) => (
                  <div key={idx} className="p-3 bg-slate-50 rounded-xl border border-slate-100 flex items-center justify-between text-[11px] gap-2 flex-wrap">
                    <div>
                      <p className="font-bold text-slate-800">{inv.id} - <span className="text-slate-400 italic font-medium">{inv.date}</span></p>
                      <p className="text-slate-500 font-sans mt-1">User: {inv.email}</p>
                      <p className="text-slate-550 font-sans">{inv.desc}</p>
                    </div>

                    <div className="text-right">
                      <p className="font-extrabold text-teal-700">{inv.amount}</p>
                      <span className="bg-emerald-50 text-emerald-800 border border-emerald-100 text-[9px] font-bold px-1.5 rounded block mt-1">
                        {inv.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 4. CAMPAIGN BROADCASTER */}
          {activeSubTab === 'marketing' && (
            <div id="admin-marketing-view" className="bg-white rounded-3xl p-6 border border-slate-100 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-800 mb-1 flex items-center gap-1">
                  <Megaphone className="w-4 h-4 text-teal-600" /> Marketing Campaign Broadcaster
                </h3>
                <p className="text-xs text-slate-400">Deploy real estate tips, warning alerts, and weekly price trends instantly via push channels & SMS carriers</p>
              </div>

              <form onSubmit={handleSendCampaign} className="bg-slate-50 border border-slate-100 rounded-2xl p-4 space-y-3">
                <span className="text-[10px] bg-teal-500 text-white font-bold px-2.5 py-0.5 rounded tracking-wide uppercase inline-block">Dispatch Live Campaign</span>

                {campaignSuccess ? (
                  <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-bold rounded-xl p-4 text-center py-6 animate-fadeIn">
                    ✓ Broadcase dispatched to SMS & Push servers successfully!
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 gap-3">
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 mb-1">Headline Subject</label>
                        <input 
                          id="camp-title"
                          type="text" 
                          required
                          value={promoTitle}
                          onChange={(e) => setPromoTitle(e.target.value)}
                          placeholder="e.g. Bandra property values rose by +12%! Check top deals..."
                          className="bg-white border border-slate-200 w-full rounded-xl text-xs px-3 py-2.5 focus:outline-teal-500"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] font-bold text-slate-500 mb-1">Push Body Context text</label>
                        <textarea 
                          id="camp-body"
                          rows={3}
                          required
                          value={promoBody}
                          onChange={(e) => setPromoBody(e.target.value)}
                          placeholder="Provide a clickbait recap and direct matching link parameters..."
                          className="bg-white border border-slate-200 w-full rounded-xl text-xs p-3 focus:outline-teal-500"
                        />
                      </div>
                    </div>

                    <div className="text-right mt-3">
                      <button 
                        id="camp-send-btn"
                        type="submit"
                        className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs py-2 px-5 rounded-xl shadowactive:scale-95 transition-all"
                      >
                        Fire Push Broadcast Now
                      </button>
                    </div>
                  </>
                )}
              </form>

              {/* Preset templates list preview */}
              <div className="space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Preloaded Core SMS Templates</h4>

                {MARKETING_TEMPLATES.sms.map(sms => (
                  <div key={sms.id} className="p-3 bg-white border border-slate-100 rounded-xl text-xs">
                    <p className="font-bold text-slate-800 mb-1 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 bg-teal-500 rounded-full"></span> {sms.name}
                    </p>
                    <p className="text-slate-400 italic text-[11px]">"{sms.template}"</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 5. SUPPORT TICKETING CENTER */}
          {activeSubTab === 'support' && (
            <div id="admin-support-view" className="bg-white rounded-3xl p-6 border border-slate-100 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-slate-800 flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <Mail className="w-4 h-4 text-teal-600" /> Client Service Tickets
                  </span>
                  <span className="text-[10px] bg-red-100 text-red-800 px-2.5 py-0.5 rounded-full font-bold">
                    {tickets.filter(t => t.status !== 'Resolved').length} Open Issues
                  </span>
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Fulfill user escalations regarding delay in identity vetting or payment discrepancies</p>
              </div>

              <div className="space-y-3">
                {tickets.map(t => (
                  <div key={t.id} className="p-4 border border-slate-100 rounded-2xl bg-slate-50 text-xs">
                    <div className="flex items-center justify-between gap-2.5">
                      <strong className="text-slate-800 font-display text-sm">{t.subject}</strong>
                      <span className={`text-[9px] font-extrabold px-2 py-0.5 rounded uppercase ${t.status === 'Resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-red-100 text-red-800'}`}>
                        {t.status}
                      </span>
                    </div>
                    <p className="text-slate-400 text-[10px] mt-0.5">Reporter: {t.userEmail} | Date: {t.date}</p>
                    
                    <p className="text-slate-600 font-medium leading-relaxed font-sans mt-3 border-t border-slate-100 pt-3">
                      "{t.message}"
                    </p>

                    {t.status !== 'Resolved' && (
                      <div className="text-right mt-3">
                        <button 
                          id={`admin-resolve-ticket-btn-${t.id}`}
                          onClick={() => handleResolveTicket(t.id)}
                          className="bg-emerald-50 text-emerald-700 hover:bg-emerald-100 font-bold px-3 py-1.5 rounded-lg border border-emerald-100 text-[10px]"
                        >
                          Mark as Solved
                        </button>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* Right column: Fraud coordinates analysis */}
        <div className="space-y-6">
          
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5 mb-1.5">
              <AlertTriangle className="w-4 h-4 text-amber-500" /> Fraud Detection Warnings
            </h3>
            <p className="text-[10px] text-slate-400 font-medium mb-4">AI scanners flagging coordinate duplicates or fake accounts</p>

            <div className="space-y-3.5 text-xs text-slate-600">
              <div className="p-3 bg-red-50 border border-red-150 rounded-2xl">
                <span className="font-bold text-red-800 block">🚩 Multiple lists detected</span>
                <p className="text-[10px] text-red-600 mt-1 leading-normal">
                  User 'spammer_99@gmail.com' posted 3 listings matching identical GPS Coordinates in Connaught Place. Vetting recommended!
                </p>
              </div>

              <div className="p-3 bg-amber-50 border border-amber-150 rounded-2xl">
                <span className="font-bold text-amber-800 block">⚠️ Unregistered Broker Alert</span>
                <p className="text-[10px] text-amber-600 mt-1 leading-normal">
                  A representative claimed Builder status on Bandra properties but uploaded regular consumer Aadhaar papers. KYC Flag assigned.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  );
}
