/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, Dispatch, SetStateAction } from 'react';
import { 
  Building, PlusCircle, Trash2, Eye, BarChart3, Inbox, UploadCloud, 
  Sparkles, PhoneCall, Award, FileText, Check, AlertCircle, Trash, Plus, 
  CheckSquare, ShieldCheck, HelpCircle, Star, MessageSquare, Video, ArrowRight
} from 'lucide-react';
import { Property, Lead } from '../types';

interface OwnerPanelProps {
  properties: Property[];
  setProperties: Dispatch<SetStateAction<Property[]>>;
  leads: Lead[];
  setLeads: Dispatch<SetStateAction<Lead[]>>;
}

export default function OwnerPanel({ 
  properties, 
  setProperties, 
  leads, 
  setLeads 
}: OwnerPanelProps) {
  const [showAddForm, setShowAddForm] = useState(false);
  const [boostingPropId, setBoostingPropId] = useState<string | null>(null);
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

  // SIMULATOR CALL STATE
  const [simulatedCall, setSimulatedCall] = useState<{ active: boolean; name: string; type: 'audio' | 'video' } | null>(null);

  // MULTI-STEP PROPERTY FORM STATES
  const [formStep, setFormStep] = useState(1);
  const [title, setTitle] = useState('');
  const [type, setType] = useState<'residential' | 'commercial'>('residential');
  const [transaction, setTransaction] = useState<'sell' | 'rent' | 'lease'>('sell');
  const [category, setCategory] = useState<'Apartment' | 'Villa' | 'Plot' | 'Office' | 'Shop' | 'Warehouse'>('Apartment');
  const [price, setPrice] = useState<number>(4500000);
  const [negotiable, setNegotiable] = useState(true);
  const [maintenance, setMaintenance] = useState(2000);
  const [bookingAmount, setBookingAmount] = useState(100000);
  const [city, setCity] = useState('Mumbai');
  const [locality, setLocality] = useState('Andheri East');
  const [landMark, setLandMark] = useState('Near Metro Hub');
  const [builtUp, setBuiltUp] = useState(1200);
  const [carpet, setCarpet] = useState(980);
  const [furnishing, setFurnishing] = useState<'Fully Furnished' | 'Semi-Furnished' | 'Unfurnished'>('Fully Furnished');
  const [bedrooms, setBedrooms] = useState(2);
  const [bathrooms, setBathrooms] = useState(2);
  const [balconies, setBalconies] = useState(1);
  const [parking, setParking] = useState<'Covered' | 'Open' | 'None'>('Covered');
  const [facing, setFacing] = useState('East');
  const [floor, setFloor] = useState(4);
  const [totalFloors, setTotalFloors] = useState(12);
  const [ageOfProp, setAgeOfProp] = useState(3);
  const [constStatus, setConstStatus] = useState<'Ready to Move' | 'Under Construction'>('Ready to Move');
  const [imageUrl, setImageUrl] = useState('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=60');
  const [amenities, setAmenities] = useState<string[]>(['24x7 Security', 'Power Backup', 'Lift']);

  // Document states
  const [ownerDocName, setOwnerDocName] = useState('');
  const [ownerIdDocName, setOwnerIdDocName] = useState('');

  // Dummy variables for dashboard
  const myProperties = properties.filter(p => p.ownerId === 'user-owner-1');
  const activeEnquiries = leads.filter(l => myProperties.some(p => p.id === l.propertyId));

  const totalViews = myProperties.reduce((acc, p) => acc + p.views, 0);
  const conversionRate = myProperties.length > 0 ? ((activeEnquiries.length / myProperties.length) * 12).toFixed(1) : '0';

  // Toggle amenities selection
  const handleToggleAmenity = (name: string) => {
    if (amenities.includes(name)) {
      setAmenities(prev => prev.filter(a => a !== name));
    } else {
      setAmenities(prev => [...prev, name]);
    }
  };

  // Form submission
  const handleSubmitProperty = (e: React.FormEvent) => {
    e.preventDefault();

    const newProp: Property = {
      id: `prop-owner-${Date.now()}`,
      title: title || `${category} in ${locality}, ${city}`,
      type,
      transaction,
      category,
      price: Number(price),
      negotiable,
      maintenanceCharges: Number(maintenance),
      bookingAmount: Number(bookingAmount),
      city,
      locality,
      state: 'Maharashtra',
      landmark: landMark,
      coordinates: { lat: 19.0760, lng: 72.8777 },
      builtUpArea: Number(builtUp),
      carpetArea: Number(carpet),
      furnishing,
      bedrooms: type === 'commercial' ? 0 : Number(bedrooms),
      bathrooms: Number(bathrooms),
      balconies: Number(balconies),
      parking,
      facing,
      floorNumber: Number(floor),
      totalFloors: Number(totalFloors),
      ageOfProperty: Number(ageOfProp),
      status: constStatus,
      amenities,
      images: [imageUrl || 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=60'],
      ownerId: 'user-owner-1',
      ownerName: 'Vikram Malhotra',
      ownerPhone: '+91 98765 43210',
      ownerType: 'Broker',
      verificationStatus: 'Pending', // Sent to admin verification first
      isFeatured: false,
      verifiedBadge: false,
      views: 1,
      leadsCount: 0,
      ownershipDoc: ownerDocName || 'registry_deed_draft.pdf',
      verificationIdDoc: ownerIdDocName || 'aadhaar_verification_doc.png'
    };

    setProperties(prev => [newProp, ...prev]);

    // Reset multi step form indicators
    setTitle('');
    setFormStep(1);
    setShowAddForm(false);
  };

  // Upgradability flow: boost property listing
  const handleBoostListing = (id: string) => {
    setProperties(prev => prev.map(p => {
      if (p.id === id) {
        return { ...p, isFeatured: true, verifiedBadge: true };
      }
      return p;
    }));
    setBoostingPropId(null);
    alert("Outstanding! Your property listing has been successfully promoted to FEATURED class & is boosted higher across client searches.");
  };

  // Lead deletion
  const handleDeleteLead = (id: string) => {
    setLeads(prev => prev.filter(l => l.id !== id));
    if (selectedLead?.id === id) setSelectedLead(null);
  };

  return (
    <div id="owner-agent-panel-view" className="space-y-6">
      
      {/* 📊 KPI Top Metrics Row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'My Managed Listings', value: myProperties.length, sub: 'Active & Pending vetting', icon: Building, color: 'text-teal-600' },
          { label: 'Enquiries Received', value: activeEnquiries.length, sub: 'Hot leads needing follow-up', icon: Inbox, color: 'text-amber-500' },
          { label: 'Profile View Count', value: totalViews, sub: 'Across top searches', icon: BarChart3, color: 'text-emerald-500' },
          { label: 'Vetting Rating', value: '4.8 ★', sub: '98 reviews recorded', icon: Star, color: 'text-yellow-500' }
        ].map((stat, i) => (
          <div key={i} className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex items-center justify-between gap-2">
            <div>
              <span className="text-[10px] text-slate-400 block uppercase font-bold tracking-wider">{stat.label}</span>
              <h3 className="text-2xl font-extrabold text-slate-800 font-display mt-1">{stat.value}</h3>
              <p className="text-[9px] text-slate-400 font-semibold mt-0.5">{stat.sub}</p>
            </div>
            <stat.icon id={`stat-kpi-${i}`} className={`w-8 h-8 ${stat.color} opacity-80 shrink-0`} />
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Listings Controls */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold font-display text-slate-800 flex items-center gap-1.5 leading-none">
                <Building className="w-5 h-5 text-teal-600" /> Listings Workspace
              </h2>
              <p className="text-xs text-slate-400 font-medium">Verify documents, upgrade visibilities, and check active reviews</p>
            </div>

            <button
              id="owner-add-property-toggle-btn"
              onClick={() => {
                setShowAddForm(true);
                setFormStep(1);
              }}
              className="bg-teal-600 hover:bg-teal-700 text-white rounded-xl text-xs font-bold py-2.5 px-4 flex items-center gap-1.5 shadow-md active:scale-95 transition-all outline-none"
            >
              <PlusCircle className="w-4 h-4" /> Add New Property
            </button>
          </div>

          {/* Listings List Workspace */}
          {myProperties.length === 0 ? (
            <div className="bg-white p-12 text-center rounded-3xl border border-slate-100">
              <Building className="w-12 h-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-700 font-bold text-sm">No Listings Posted Yet</p>
              <p className="text-slate-400 text-xs max-w-xs mx-auto mt-0.5">Click 'Add New Property' above to list flat/commercial spaces with verification papers.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {myProperties.map(prop => (
                <div 
                  id={`owner-prop-row-${prop.id}`}
                  key={prop.id} 
                  className="bg-white border border-slate-100 rounded-3xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4 hover:shadow-sm transition-shadow shadow-sm"
                >
                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    <img src={prop.images[0]} alt="" className="w-16 h-16 object-cover rounded-2xl shrink-0 border border-slate-50" referrerPolicy="no-referrer" />
                    <div>
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className={`text-[9px] font-extrabold uppercase px-2 py-0.5 rounded ${prop.verificationStatus === 'Approved' ? 'bg-emerald-50 text-emerald-700 border border-emerald-100' : 'bg-amber-50 text-amber-700 border border-amber-100'}`}>
                          {prop.verificationStatus}
                        </span>
                        {prop.isFeatured && (
                          <span className="text-[9px] font-extrabold bg-teal-600 text-white px-2 py-0.5 rounded flex items-center gap-0.5">
                            <Sparkles className="w-2.5 h-2.5 fill-white" /> Featured Boost
                          </span>
                        )}
                        <span className="text-[10px] text-slate-400 font-bold">₹{(prop.price / 100000).toFixed(0)}L • {prop.city}</span>
                      </div>
                      <h4 className="font-extrabold text-sm text-slate-800 line-clamp-1 mt-0.5">{prop.title}</h4>
                      
                      <div className="flex gap-4 mt-2 text-[10px] font-medium text-slate-500">
                        <span>👁️ {prop.views} Views</span>
                        <span>🎯 {leads.filter(l => l.propertyId === prop.id).length} Leads</span>
                        <span>🔑 {prop.status}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions column */}
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    {!prop.isFeatured && (
                      <button 
                        id={`owner-boost-btn-${prop.id}`}
                        onClick={() => setBoostingPropId(prop.id)}
                        className="bg-amber-50 text-amber-700 hover:bg-amber-100 border border-amber-200 text-[10px] font-bold px-3 py-1.5 rounded-xl flex items-center gap-1"
                      >
                        <Sparkles className="w-3 h-3 text-amber-600" /> Boost Ad
                      </button>
                    )}
                    <button 
                      id={`owner-delete-listing-btn-${prop.id}`}
                      onClick={() => {
                        setProperties(prev => prev.filter(p => p.id !== prop.id));
                      }}
                      className="text-rose-600 hover:bg-rose-50 p-2 rounded-xl border border-slate-100 active:scale-95 transition-all shrink-0"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* 🚀 Active Promotions Packages Center (Subscription simulated payment) */}
          <div className="bg-gradient-to-r from-emerald-600 to-teal-800 rounded-3xl p-6 text-white shadow-md relative overflow-hidden">
            <div className="absolute right-0 bottom-0 opacity-10 transform translate-x-6 translate-y-6">
              <Award className="w-48 h-48" />
            </div>
            
            <div className="relative z-10">
              <span className="bg-white/20 text-white text-[10px] font-bold px-2 py-0.5 rounded tracking-wide mb-3 inline-block">PREMIUM ACCELERATOR HUB</span>
              <h3 className="text-base font-extrabold font-display">Upgrade to Propex Featured Class</h3>
              <p className="text-teal-50 text-xs mt-1 mb-4 max-w-md">Gain 7x higher visibility, auto-verification badges, and live WhatsApp mask communication triggers.</p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2">
                <div className="bg-white/10 backdrop-blur-md border border-white/10 rounded-2xl p-4">
                  <h4 className="text-xs font-bold uppercase tracking-widest text-teal-200">Standard Plan</h4>
                  <p className="font-extrabold text-sm mb-2 mt-1">₹1,499 / 30 Days</p>
                  <ul className="text-[10px] space-y-1 opacity-90 font-medium">
                    <li>✓ Post up to 10 Properties</li>
                    <li>✓ Upload interior floor layout plan</li>
                    <li>✓ SMS callback alerts</li>
                  </ul>
                  <button onClick={() => alert('Razorpay / Stripe Payment Simulator: Secure transaction simulated successfully!')} className="mt-4 bg-teal-500 hover:bg-teal-400 text-white text-[10px] font-bold w-full py-1.5 rounded-lg">Select Plan</button>
                </div>

                <div className="bg-white/15 backdrop-blur-md border border-amber-400/30 rounded-2xl p-4 relative">
                  <span className="absolute -top-2 right-2 bg-amber-400 text-slate-900 font-extrabold text-[8px] px-1.5 py-0.5 rounded uppercase">Best Value</span>
                  <h4 className="text-xs font-bold uppercase tracking-widest text-amber-200">Featured Booster Elite</h4>
                  <p className="font-extrabold text-sm mb-2 mt-1">₹3,499 / 45 Days</p>
                  <ul className="text-[10px] space-y-1 opacity-90 font-medium">
                    <li>✓ Unlimited Property postings</li>
                    <li>✓ High priority Featured placement</li>
                    <li>✓ RERA audit support & verification</li>
                    <li>✓ Professional interior video shoot helper</li>
                  </ul>
                  <button onClick={() => alert('Razorpay / Stripe Payment Simulator: Secure transaction simulated successfully!')} className="mt-4 bg-amber-500 hover:bg-amber-400 text-slate-950 text-[10px] font-bold w-full py-1.5 rounded-lg font-extrabold">Buy Ultimate Accelerator</button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Lead inbox & customer feedbacks */}
        <div className="space-y-6">
          
          {/* Incoming Customer Leads Panel */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex flex-col h-[520px]">
            <h3 className="text-sm font-bold text-slate-800 flex items-center justify-between mb-2">
              <span className="flex items-center gap-1.5">
                <Inbox className="w-4 h-4 text-teal-600" /> Active Lead Inbox
              </span>
              <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full shrink-0">
                {activeEnquiries.length} New
              </span>
            </h3>
            <p className="text-[10px] text-slate-400 font-medium mb-4">Click any client panel query block to log conversations, call, or initiate mock site-guided video tours</p>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {activeEnquiries.length === 0 ? (
                <div className="text-center py-12 text-slate-400 text-xs font-medium">
                  No active customer inquiries received yet. We will ping your phone on new bookings.
                </div>
              ) : (
                activeEnquiries.map(lead => {
                  const isSelect = selectedLead?.id === lead.id;
                  return (
                    <div 
                      key={lead.id}
                      id={`owner-lead-card-${lead.id}`}
                      onClick={() => setSelectedLead(lead)}
                      className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${isSelect ? 'bg-teal-50 border-teal-200 shadow-sm' : 'bg-slate-50 border-slate-100 hover:bg-slate-100'}`}
                    >
                      <div className="flex items-start justify-between gap-1">
                        <div>
                          <h4 className="font-bold text-xs text-slate-800">{lead.customerName}</h4>
                          <span className="text-[9px] text-teal-600 font-bold bg-teal-100/50 px-1.5 py-0.5 rounded line-clamp-1 mt-1 font-display">
                            {lead.propertyTitle}
                          </span>
                        </div>
                        <span className="text-[8px] text-slate-400 font-medium shrink-0">{lead.date}</span>
                      </div>
                      
                      <p className="text-xs text-slate-500 font-sans mt-2 line-clamp-2">
                        "{lead.message}"
                      </p>

                      {/* Display scheduled site visit date if present */}
                      {lead.siteVisitDate && (
                        <div className="mt-2 text-[9px] bg-amber-50 text-amber-800 font-bold rounded p-1.5 border border-amber-100">
                          🗓️ Site Tour: {lead.siteVisitDate} at {lead.siteVisitTime}
                        </div>
                      )}

                      {/* Expanded View with Chat / Call Masks */}
                      {isSelect && (
                        <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between gap-2 flex-wrap">
                          <div className="text-[9px] font-semibold text-slate-500">
                            ID: {lead.customerPhone}
                          </div>

                          <div className="flex items-center gap-1.5">
                            <button 
                              id={`owner-call-lead-${lead.id}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSimulatedCall({ active: true, name: lead.customerName, type: 'audio' });
                              }}
                              className="bg-teal-600 text-white p-1.5 rounded-lg active:scale-90 transition-all font-bold text-[10px] flex items-center gap-1"
                              title="Phone Masking Audio Call"
                            >
                              <PhoneCall className="w-3 h-3" /> Call
                            </button>
                            <button 
                              id={`owner-video-lead-${lead.id}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                setSimulatedCall({ active: true, name: lead.customerName, type: 'video' });
                              }}
                              className="bg-amber-500 text-slate-950 p-1.5 rounded-lg active:scale-90 transition-all font-bold text-[10px] flex items-center gap-1"
                              title="Property Tour Cam Video"
                            >
                              <Video className="w-3 h-3" /> Live Cam
                            </button>
                            <button 
                              id={`owner-delete-lead-${lead.id}`}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteLead(lead.id);
                              }}
                              className="text-rose-600 bg-white border border-slate-200 p-1.5 rounded-lg hover:text-rose-700"
                            >
                              <Trash className="w-3 h-3" />
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })
              )}
            </div>
          </div>

        </div>
      </div>

      {/* 🏡 MULTI-STEP PROPERTY POSTING FORM MODAL */}
      {showAddForm && (
        <div id="owner-add-property-modal" className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl overflow-hidden w-full max-w-xl border border-slate-100 shadow-xl relative my-8 animate-scaleUp">
            
            {/* Header with step indices */}
            <div className="bg-slate-900 p-5 text-white flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold font-display flex items-center gap-1.5">
                  <PlusCircle className="w-5 h-5 text-teal-400" /> List Property Workspace
                </h3>
                <p className="text-xs text-slate-300">Complete all parameters to schedule validation vetting</p>
              </div>
              <div className="text-xs bg-slate-800 text-slate-200 px-3 py-1 rounded-full font-bold">
                Step {formStep} of 3
              </div>
            </div>

            <form onSubmit={handleSubmitProperty} className="p-6">
              
              {/* Progress step visual indicators */}
              <div className="flex gap-2 mb-6">
                <span className={`h-1.5 flex-1 rounded-full ${formStep >= 1 ? 'bg-teal-500' : 'bg-slate-200'}`}></span>
                <span className={`h-1.5 flex-1 rounded-full ${formStep >= 2 ? 'bg-teal-500' : 'bg-slate-200'}`}></span>
                <span className={`h-1.5 flex-1 rounded-full ${formStep >= 3 ? 'bg-teal-500' : 'bg-slate-200'}`}></span>
              </div>

              {/* STEP 1: Basic Property definitions */}
              {formStep === 1 && (
                <div className="space-y-4 animate-fadeIn">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Step 1: General Category & Purpose</h4>
                  
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Interactive Title</label>
                    <input 
                      id="form-title"
                      type="text" 
                      required
                      placeholder="e.g. Spacious 3 BHK Penthouse in Bandra Heights"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      className="border border-slate-200 font-medium w-full rounded-xl text-xs px-3 py-2.5 focus:outline-teal-500" 
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Scope</label>
                      <select 
                        id="form-type"
                        value={type} 
                        onChange={(e) => setType(e.target.value as 'residential' | 'commercial')}
                        className="border border-slate-200 font-semibold w-full rounded-xl text-xs p-2.5 focus:outline-teal-500 bg-white"
                      >
                        <option value="residential">Residential</option>
                        <option value="commercial">Commercial</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Transaction</label>
                      <select 
                        id="form-transaction"
                        value={transaction} 
                        onChange={(e) => setTransaction(e.target.value as 'sell' | 'rent' | 'lease')}
                        className="border border-slate-200 font-semibold w-full rounded-xl text-xs p-2.5 focus:outline-teal-500 bg-white"
                      >
                        <option value="sell">Sell</option>
                        <option value="rent">Rent</option>
                        <option value="lease">Lease</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Property Category</label>
                      <select 
                        id="form-category"
                        value={category} 
                        onChange={(e) => setCategory(e.target.value as any)}
                        className="border border-slate-200 font-semibold w-full rounded-xl text-xs p-2.5 focus:outline-teal-500 bg-white"
                      >
                        <option value="Apartment">Apartment</option>
                        <option value="Villa">Villa / Row House</option>
                        <option value="Plot">Plot / Land</option>
                        <option value="Office">Office Room</option>
                        <option value="Shop">Retail Shop</option>
                        <option value="Warehouse">Warehouse Space</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Construction Status</label>
                      <select 
                        id="form-construction"
                        value={constStatus} 
                        onChange={(e) => setConstStatus(e.target.value as any)}
                        className="border border-slate-200 font-semibold w-full rounded-xl text-xs p-2.5 focus:outline-teal-500 bg-white"
                      >
                        <option value="Ready to Move">Ready to Move</option>
                        <option value="Under Construction">Under Construction</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">City</label>
                      <input 
                        id="form-city"
                        type="text" 
                        required
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="border border-slate-200 font-medium w-full rounded-xl text-xs px-3 py-2.5 focus:outline-teal-500" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Locality</label>
                      <input 
                        id="form-locality"
                        type="text" 
                        required
                        value={locality}
                        onChange={(e) => setLocality(e.target.value)}
                        className="border border-slate-200 font-medium w-full rounded-xl text-xs px-3 py-2.5 focus:outline-teal-500" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Landmark</label>
                      <input 
                        id="form-landmark"
                        type="text" 
                        value={landMark}
                        onChange={(e) => setLandMark(e.target.value)}
                        className="border border-slate-200 font-medium w-full rounded-xl text-xs px-3 py-2.5 focus:outline-teal-500" 
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 2: Specs, Furnishing & Amenities */}
              {formStep === 2 && (
                <div className="space-y-4 animate-fadeIn">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Step 2: Area Measurements & Specifications</h4>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Built-Up Area (sq.ft)</label>
                      <input 
                        id="form-builtup"
                        type="number" 
                        required
                        value={builtUp}
                        onChange={(e) => setBuiltUp(Number(e.target.value))}
                        className="border border-slate-200 font-medium w-full rounded-xl text-xs px-3 py-2.5 focus:outline-teal-500" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Carpet Area (sq.ft)</label>
                      <input 
                        id="form-carpet"
                        type="number" 
                        required
                        value={carpet}
                        onChange={(e) => setCarpet(Number(e.target.value))}
                        className="border border-slate-200 font-medium w-full rounded-xl text-xs px-3 py-2.5 focus:outline-teal-500" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">BHK count</label>
                      <input 
                        id="form-bedrooms"
                        type="number" 
                        disabled={type === 'commercial'}
                        value={bedrooms}
                        onChange={(e) => setBedrooms(Number(e.target.value))}
                        className="border border-slate-200 font-medium w-full rounded-xl text-xs px-3 py-2 focus:outline-teal-500 disabled:bg-slate-100" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Bathrooms</label>
                      <input 
                        id="form-bathrooms"
                        type="number" 
                        value={bathrooms}
                        onChange={(e) => setBathrooms(Number(e.target.value))}
                        className="border border-slate-200 font-medium w-full rounded-xl text-xs px-3 py-2 focus:outline-teal-500" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Balconies</label>
                      <input 
                        id="form-balconies"
                        type="number" 
                        value={balconies}
                        onChange={(e) => setBalconies(Number(e.target.value))}
                        className="border border-slate-200 font-medium w-full rounded-xl text-xs px-3 py-2 focus:outline-teal-500" 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Furnishing Status</label>
                      <select 
                        id="form-furnishing"
                        value={furnishing} 
                        onChange={(e) => setFurnishing(e.target.value as any)}
                        className="border border-slate-200 font-semibold w-full rounded-xl text-xs p-2.5 focus:outline-teal-500 bg-white"
                      >
                        <option value="Fully Furnished">Fully Furnished</option>
                        <option value="Semi-Furnished">Semi-Furnished</option>
                        <option value="Unfurnished">Unfurnished</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Parking Slot</label>
                      <select 
                        id="form-parking"
                        value={parking} 
                        onChange={(e) => setParking(e.target.value as any)}
                        className="border border-slate-200 font-semibold w-full rounded-xl text-xs p-2.5 focus:outline-teal-500 bg-white"
                      >
                        <option value="Covered">Covered</option>
                        <option value="Open">Open</option>
                        <option value="None">None</option>
                      </select>
                    </div>
                  </div>

                  {/* Multi select amenities lists */}
                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1.5">Amenities (Select Multi)</label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] leading-tight select-none">
                      {['Power Backup', '24x7 Security', 'Swimming Pool', 'Gym', 'Clubhouse', 'Kids Play Area', 'Visitor Parking', 'Private Garden'].map(name => {
                        const isSelect = amenities.includes(name);
                        return (
                          <div 
                            key={name}
                            onClick={() => handleToggleAmenity(name)}
                            className={`p-2 rounded-xl border flex items-center gap-1.5 cursor-pointer transition-colors ${isSelect ? 'bg-teal-50 border-teal-200 text-teal-800' : 'border-slate-100 bg-slate-50 hover:bg-slate-100'}`}
                          >
                            <input type="checkbox" checked={isSelect} readOnly className="rounded accent-teal-600 focus:ring-0" />
                            <span>{name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* STEP 3: Pricing, Images & Documents Upload */}
              {formStep === 3 && (
                <div className="space-y-4 animate-fadeIn">
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Step 3: Pricing, Images & Verification ID</h4>
                  
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Expected Pricing (INR)</label>
                      <input 
                        id="form-price"
                        type="number" 
                        required
                        value={price}
                        onChange={(e) => setPrice(Number(e.target.value))}
                        className="border border-slate-200 font-extrabold text-teal-700 w-full rounded-xl text-xs px-3 py-2.5 focus:outline-teal-500" 
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold text-slate-500 mb-1">Is Price Negotiable?</label>
                      <select 
                        id="form-negotiable"
                        value={negotiable ? 'Yes' : 'No'}
                        onChange={(e) => setNegotiable(e.target.value === 'Yes')}
                        className="border border-slate-200 font-semibold w-full rounded-xl text-xs p-2.5 focus:outline-teal-500 bg-white"
                      >
                        <option value="Yes">Yes, Open to negotiations</option>
                        <option value="No">No, Fixed Rate pricing</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-500 mb-1">Mock Property Image URL</label>
                    <input 
                      id="form-image"
                      type="text" 
                      required
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      className="border border-slate-200 font-mono text-slate-500 w-full rounded-xl text-xs px-3 py-2.5 focus:outline-teal-500" 
                    />
                  </div>

                  {/* 📂 Document Vault File Pick Simulation */}
                  <div className="border border-dashed border-slate-200 rounded-2xl p-4 bg-slate-50 space-y-3">
                    <span className="text-[10px] bg-slate-200 text-slate-700 font-bold px-2 py-0.5 rounded tracking-wide inline-block">MOCK DOCUMENT UPLOADER</span>
                    <p className="text-[10px] text-slate-400 leading-normal">Provide registry drafts & Aadhaar IDs. Active admin reviews will analyze these before granting the 'RERA-Active' verify badge.</p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 mb-1 flex items-center gap-1">
                          <FileText className="w-3 h-3 text-teal-500" /> Title Deed / Deed Registry
                        </label>
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            placeholder="registry_deed.pdf" 
                            value={ownerDocName}
                            onChange={(e) => setOwnerDocName(e.target.value)}
                            className="bg-white border border-slate-200 text-[10px] p-2 rounded-lg flex-1 text-slate-600 focus:outline-none"
                          />
                          <button 
                            type="button" 
                            onClick={() => setOwnerDocName('registry_deed_bandra_12B.pdf')}
                            className="bg-slate-200 font-bold text-[9px] px-2.5 rounded-lg active:scale-95"
                          >
                            Set Mock
                          </button>
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-bold text-slate-500 mb-1 flex items-center gap-1">
                          <ShieldCheck className="w-3 h-3 text-teal-500" /> Government Verification ID
                        </label>
                        <div className="flex gap-2">
                          <input 
                            type="text" 
                            placeholder="pan_verification.png" 
                            value={ownerIdDocName}
                            onChange={(e) => setOwnerIdDocName(e.target.value)}
                            className="bg-white border border-slate-200 text-[10px] p-2 rounded-lg flex-1 text-slate-600 focus:outline-none"
                          />
                          <button 
                            type="button" 
                            onClick={() => setOwnerIdDocName('pan_vikram_malhotra.png')}
                            className="bg-slate-200 font-bold text-[9px] px-2.5 rounded-lg active:scale-95"
                          >
                            Set Mock
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Form Navigation buttons */}
              <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between">
                <div>
                  {formStep > 1 && (
                    <button 
                      id="form-prev-btn"
                      type="button"
                      onClick={() => setFormStep(prev => prev - 1)}
                      className="bg-slate-100 text-slate-700 hover:bg-slate-200 font-bold text-xs px-4 py-2.5 rounded-xl transition-all"
                    >
                      Back
                    </button>
                  )}
                </div>

                <div className="flex gap-2">
                  <button 
                    id="form-cancel-btn"
                    type="button"
                    onClick={() => {
                      setShowAddForm(false);
                      setFormStep(1);
                    }}
                    className="bg-rose-50 text-rose-700 font-bold text-xs px-4 py-2.5 rounded-xl"
                  >
                    Cancel
                  </button>

                  {formStep < 3 ? (
                    <button 
                      id="form-next-btn"
                      type="button"
                      onClick={() => setFormStep(prev => prev + 1)}
                      className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl transition-all inline-flex items-center gap-1"
                    >
                      Continue <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  ) : (
                    <button 
                      id="form-submit-btn"
                      type="submit"
                      className="bg-gradient-to-r from-emerald-600 to-teal-700 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-lg hover:from-emerald-700 hover:to-teal-800 transition-all active:scale-[0.98] inline-flex items-center gap-1"
                    >
                      <Check className="w-4 h-4" /> Create Live Ad
                    </button>
                  )}
                </div>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* 💳 SIMULATE PROMOTION UPGRADE POPUP MODAL */}
      {boostingPropId && (
        <div id="boost-listing-modal" className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl overflow-hidden w-full max-w-sm border border-slate-100 shadow-xl relative animate-scaleUp">
            <button 
              id="close-boost-modal"
              onClick={() => setBoostingPropId(null)}
              className="absolute top-4 right-4 bg-slate-100 p-2 rounded-full"
            >
              <Trash className="w-4 h-4 text-slate-500" />
            </button>

            <div className="p-6 text-center text-slate-800">
              <Sparkles className="w-12 h-12 text-amber-500 mx-auto bg-amber-50 rounded-full p-2.5 mb-3 animate-spin duration-300" />
              <h3 className="text-base font-bold font-display">Confirm Ad Upgrade</h3>
              <p className="text-xs text-slate-400 mt-1 mb-6">Boost this property to the 'Featured Property Class' across buyer grids.</p>

              <div className="border border-dashed border-teal-200 rounded-2xl p-4 bg-teal-50 text-left text-xs mb-6">
                <span className="font-bold text-teal-800 block">💳 Razorpay Simulator Account</span>
                <p className="text-teal-600 mt-0.5">Amount: ₹1,499.00 INR</p>
                <p className="text-slate-400 text-[10px] mt-2">By clicking 'Pay & Activate', you authorize an automated mock wallet deduction for sandbox verification testing.</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={() => setBoostingPropId(null)}
                  className="bg-white border border-slate-200 text-slate-700 font-bold text-xs py-2 px-4 rounded-xl hover:bg-slate-50"
                >
                  Decline
                </button>
                <button 
                  id="owner-confirm-boost-btn"
                  onClick={() => handleBoostListing(boostingPropId)}
                  className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-extrabold text-xs py-2 px-4 rounded-xl"
                >
                  Pay & Activate
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 📞 REALTIME AUDIO / VIDEO CALL SIMULATOR PANEL */}
      {simulatedCall && (
        <div id="simulated-call-panel" className="fixed bottom-6 right-6 bg-slate-900 border border-slate-800 rounded-3xl p-6 text-white w-80 text-center shadow-2xl z-50 animate-scaleUp">
          {simulatedCall.type === 'video' ? (
            <div className="relative rounded-2xl overflow-hidden h-36 bg-slate-950 mb-4 border border-slate-800 flex items-center justify-center">
              <div className="animate-pulse flex flex-col items-center">
                <Video className="w-8 h-8 text-amber-400 mb-1" />
                <span className="text-[10px] tracking-widest uppercase font-mono text-slate-400">Transmitting camera feeds...</span>
              </div>
              <div className="absolute top-2 right-2 text-[10px] bg-red-600/90 rounded px-2 py-0.5 font-bold">LIVE</div>
            </div>
          ) : (
            <div className="w-16 h-16 bg-teal-600 rounded-full mx-auto flex items-center justify-center mb-4">
              <PhoneCall className="w-8 h-8 animate-bounce text-white" />
            </div>
          )}

          <h4 className="text-sm font-bold font-display">{simulatedCall.name}</h4>
          <p className="text-[11px] text-slate-400 mt-1">
            {simulatedCall.type === 'video' ? 'Virtual Guided Video Site Visit' : 'Propex masked audio connection'}
          </p>
          <div className="text-xs bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full font-mono font-bold w-fit mx-auto mt-4 animate-pulse">
            00:04 Connected
          </div>

          <button 
            id="hang-up-call-btn"
            onClick={() => setSimulatedCall(null)}
            className="mt-6 bg-red-600 hover:bg-red-700 text-white font-bold text-xs py-2 px-6 rounded-xl w-full active:scale-95 transition-all"
          >
            Hang Up Connection
          </button>
        </div>
      )}

    </div>
  );
}
