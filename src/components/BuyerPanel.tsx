/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo, Dispatch, SetStateAction } from 'react';
import { 
  Search, SlidersHorizontal, MapPin, Heart, Sparkles, TrendingUp, 
  MessageSquare, Calendar, Star, Home, BedDouble, Bath, ArrowLeftRight, 
  PhoneCall, Video, Send, Compass, X, Check, Building, FileText, ArrowRight, BookOpen
} from 'lucide-react';
import { Property, Lead, ChatSession, ChatMessage, ServiceProviderItem } from '../types';
import { BLOG_POSTS } from '../mockData';

interface BuyerPanelProps {
  properties: Property[];
  savedIds: string[];
  toggleSave: (id: string) => void;
  chatSessions: ChatSession[];
  setChatSessions: Dispatch<SetStateAction<ChatSession[]>>;
  addLead: (lead: Omit<Lead, 'id'>) => void;
  serviceProviders: ServiceProviderItem[];
}

export default function BuyerPanel({
  properties,
  savedIds,
  toggleSave,
  chatSessions,
  setChatSessions,
  addLead,
  serviceProviders
}: BuyerPanelProps) {
  // Search & Filter state
  const [activeTab, setActiveTab] = useState<'buy' | 'rent' | 'commercial'>('buy');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [filterCity, setFilterCity] = useState('All');
  const [filterPrice, setFilterPrice] = useState<number>(50000000); // Max Budget
  const [filterBhk, setFilterBhk] = useState<string>('All');
  const [filterFurnishing, setFilterFurnishing] = useState<string>('All');
  const [filterStatus, setFilterStatus] = useState<string>('All');
  const [filterVerified, setFilterVerified] = useState<boolean>(false);

  // States
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [showMapModal, setShowMapModal] = useState(false);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [showCompareModal, setShowCompareModal] = useState(false);
  const [activeChatId, setActiveChatId] = useState<string>('chat-bot');
  const [chatMessageText, setChatMessageText] = useState('');
  
  // Visit scheduling modal state
  const [showVisitModal, setShowVisitModal] = useState<Property | null>(null);
  const [visitDate, setVisitDate] = useState('2026-06-01');
  const [visitTime, setVisitTime] = useState('11:00 AM');
  const [visitMessage, setVisitMessage] = useState('I would like to inspect the building.');
  const [bookingSuccess, setBookingSuccess] = useState(false);

  // Contact modal state
  const [showContactModal, setShowContactModal] = useState<Property | null>(null);
  const [contactName, setContactName] = useState('Rohan Joshi');
  const [contactEmail, setContactEmail] = useState('rohan.joshi@gmail.com');
  const [contactPhone, setContactPhone] = useState('+91 97766 55443');
  const [contactMessage, setContactMessage] = useState('Hi! I saw your listing on Propex360. Please share more details.');
  const [contactSubmitted, setContactSubmitted] = useState(false);

  // Filter properties
  const filteredProperties = useMemo(() => {
    return properties.filter(prop => {
      // 1. Tab Transaction Type match
      if (activeTab === 'commercial') {
        if (prop.type !== 'commercial') return false;
      } else {
        if (prop.type !== 'residential') return false;
        if (activeTab === 'buy' && prop.transaction !== 'sell') return false;
        if (activeTab === 'rent' && prop.transaction !== 'rent') return false;
      }

      // 2. City search check
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesQuery = 
          prop.title.toLowerCase().includes(query) ||
          prop.city.toLowerCase().includes(query) ||
          prop.locality.toLowerCase().includes(query) ||
          prop.category.toLowerCase().includes(query);
        if (!matchesQuery) return false;
      }

      // 3. Advanced filters
      if (filterCity !== 'All' && prop.city.toLowerCase() !== filterCity.toLowerCase()) return false;
      if (prop.price > filterPrice) return false;
      if (filterBhk !== 'All') {
        const requestedBhk = parseInt(filterBhk);
        if (prop.bedrooms !== requestedBhk) return false;
      }
      if (filterFurnishing !== 'All' && prop.furnishing !== filterFurnishing) return false;
      if (filterStatus !== 'All' && prop.status !== filterStatus) return false;
      if (filterVerified && !prop.verifiedBadge) return false;

      return true;
    });
  }, [properties, activeTab, searchQuery, filterCity, filterPrice, filterBhk, filterFurnishing, filterStatus, filterVerified]);

  // Extract list of cities for filter dropdown
  const cities = useMemo(() => {
    const list = new Set(properties.map(p => p.city));
    return ['All', ...Array.from(list)];
  }, [properties]);

  // Handle Save
  const isSaved = (id: string) => savedIds.includes(id);

  // Compare listings
  const handleToggleCompare = (id: string) => {
    if (compareIds.includes(id)) {
      setCompareIds(prev => prev.filter(item => item !== id));
    } else {
      if (compareIds.length >= 2) {
        // limit to 2
        alert("You can compare up to 2 properties side-by-side.");
        return;
      }
      setCompareIds(prev => [...prev, id]);
    }
  };

  const comparedProperties = useMemo(() => {
    return properties.filter(p => compareIds.includes(p.id));
  }, [properties, compareIds]);

  // Visited list / Appointments representation
  const appointments = [
    { id: '1', title: 'Skyline Heights Premium 3 BHK', date: '2026-06-01', time: '11:00 AM', status: 'Confirmed' },
    { id: '2', title: 'Emerald Green Luxury 4BHK Villa', date: '2026-06-03', time: '04:30 PM', status: 'Pending Review' }
  ];

  // Live Chat Handling
  const activeChat = chatSessions.find(c => c.id === activeChatId) || chatSessions[0];

  const handleSendMessage = () => {
    if (!chatMessageText.trim()) return;

    const newMessage: ChatMessage = {
      id: Date.now().toString(),
      sender: 'buyer',
      senderName: 'You',
      text: chatMessageText,
      timestamp: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedSessions = chatSessions.map(session => {
      if (session.id === activeChatId) {
        const updatedMsgs = [...session.messages, newMessage];
        return {
          ...session,
          lastMessage: chatMessageText,
          messages: updatedMsgs
        };
      }
      return session;
    });

    setChatSessions(updatedSessions);
    const userMsg = chatMessageText;
    setChatMessageText('');

    // Chatbot auto reply trigger if bot is open
    if (activeChatId === 'chat-bot') {
      setTimeout(() => {
        let reply = "I'm looking into this for you. Would you like me to connect you to verified real estate experts nearby?";
        const checkLower = userMsg.toLowerCase();
        
        if (checkLower.includes('stamp') || checkLower.includes('duty') || checkLower.includes('tax')) {
          reply = "Stamp duty varies by State in India. Usually, it is 5% to 7% of the agreement value. Females often get a 1% concession. Would you like a financial counselor call?";
        } else if (checkLower.includes('carpet') || checkLower.includes('super')) {
          reply = "Carpet Area is the net usable area you can lay carpet on (inner wall-to-wall space). Super Built-up Area includes common corridors, lift shaft, security desks up to an extra 30-40%. Pay attention to Carpet Area values!";
        } else if (checkLower.includes('post') || checkLower.includes('sell') || checkLower.includes('ad')) {
          reply = "To post your ad, just switch to the 'Owner / Agent Panel' using the controller at the top bar. Click 'Create Live Listing' and register your details absolutely free!";
        } else if (checkLower.includes('loan') || checkLower.includes('emi') || checkLower.includes('finance')) {
          reply = "Propex360 lists home loan options starting from 8.40% interest p.a. Check our Service Providers list on the workspace or connect with EasyHome Mortgages.";
        }

        const botMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'bot',
          senderName: 'Propex360 Bot',
          text: reply,
          timestamp: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setChatSessions(prev => prev.map(s => {
          if (s.id === 'chat-bot') {
            return {
              ...s,
              lastMessage: reply,
              messages: [...s.messages, botMsg]
            };
          }
          return s;
        }));
      }, 1000);
    } else {
      // Owner replica chat delay
      setTimeout(() => {
        const responses = [
          "Thank you for contacting me. Yes, this property is available. Will you be interested in visiting tomorrow?",
          "I have noted your requirement. Let me ask the owner and send you structural drafts.",
          "Our representative can pick you up from the nearest landmark block. Are you ready for a direct visit?"
        ];
        const randomReply = responses[Math.floor(Math.random() * responses.length)];
        
        const ownerMsg: ChatMessage = {
          id: (Date.now() + 1).toString(),
          sender: 'owner',
          senderName: activeChat.participantName,
          text: randomReply,
          timestamp: 'Today, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setChatSessions(prev => prev.map(s => {
          if (s.id === activeChatId) {
            return {
              ...s,
              lastMessage: randomReply,
              messages: [...s.messages, ownerMsg]
            };
          }
          return s;
        }));
      }, 1500);
    }
  };

  // Site visits handles
  const handleBookVisitSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showVisitModal) return;

    addLead({
      propertyId: showVisitModal.id,
      propertyTitle: showVisitModal.title,
      customerName: 'Rohan Joshi',
      customerEmail: 'rohan.joshi@gmail.com',
      customerPhone: '+91 97766 55443',
      message: visitMessage,
      date: new Date().toISOString().split('T')[0],
      status: 'New',
      siteVisitDate: visitDate,
      siteVisitTime: visitTime
    });

    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setShowVisitModal(null);
    }, 2000);
  };

  // Direct contact handles
  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!showContactModal) return;

    addLead({
      propertyId: showContactModal.id,
      propertyTitle: showContactModal.title,
      customerName: contactName,
      customerEmail: contactEmail,
      customerPhone: contactPhone,
      message: contactMessage,
      date: new Date().toISOString().split('T')[0],
      status: 'New'
    });

    setContactSubmitted(true);
    setTimeout(() => {
      setContactSubmitted(false);
      setShowContactModal(null);
    }, 2000);
  };

  return (
    <div id="buyer-renter-panel-view" className="space-y-6">
      
      {/* 🚀 Hero Section with Tabs & Dynamic Search Bar */}
      <div className="relative bg-gradient-to-r from-teal-700 to-teal-900 rounded-3xl p-8 text-white overflow-hidden shadow-xl">
        <div className="absolute right-0 top-0 opacity-10 pointer-events-none transform translate-x-12 -translate-y-12">
          <Compass className="w-96 h-96" />
        </div>
        
        <div className="relative z-10 max-w-3xl">
          <span className="bg-teal-500/30 text-teal-200 text-xs font-semibold px-3 py-1 rounded-full uppercase tracking-wider inline-flex items-center gap-1.5 mb-4">
            <Sparkles className="w-3.5 h-3.5 text-teal-300" /> Discover Verified Properties 360°
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2 font-display">
            Your Premium Search Ends Here
          </h1>
          <p className="text-teal-100 text-sm sm:text-base mb-6 max-w-xl">
            Explore verified flats, luxury villas, smart layouts, and massive commercial assets listed directly by verified brokers & owners.
          </p>

          {/* Tab Switcher */}
          <div className="flex gap-2 p-1 bg-black/20 rounded-xl w-fit mb-4">
            <button 
              id="buyer-search-buy-tab"
              onClick={() => setActiveTab('buy')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${activeTab === 'buy' ? 'bg-teal-500 text-white shadow' : 'text-teal-200 hover:text-white'}`}
            >
              Buy Residential
            </button>
            <button 
              id="buyer-search-rent-tab"
              onClick={() => setActiveTab('rent')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${activeTab === 'rent' ? 'bg-teal-500 text-white shadow' : 'text-teal-200 hover:text-white'}`}
            >
              Rent Residential
            </button>
            <button 
              id="buyer-search-commercial-tab"
              onClick={() => setActiveTab('commercial')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all ${activeTab === 'commercial' ? 'bg-teal-500 text-white shadow' : 'text-teal-200 hover:text-white'}`}
            >
              Commercial Hub
            </button>
          </div>

          {/* Search Inputs */}
          <div className="flex flex-col sm:flex-row gap-3 bg-white p-2 rounded-2xl text-slate-800 shadow-lg">
            <div className="flex items-center gap-2 flex-1 px-3 py-2 border-b sm:border-b-0 sm:border-r border-slate-100">
              <Search className="text-teal-600 w-5 h-5 shrink-0" />
              <input 
                id="buyer-search-input"
                type="text" 
                placeholder="Search Bandra, Whitefield, apartments, 3 BHK..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full text-sm focus:outline-none placeholder-slate-400 font-medium"
              />
            </div>
            <div className="flex items-center gap-2 px-3 py-2 w-full sm:w-auto sm:min-w-[160px]">
              <MapPin className="text-teal-500 w-4 h-4 shrink-0" />
              <select 
                id="buyer-city-filter"
                value={filterCity}
                onChange={(e) => setFilterCity(e.target.value)}
                className="bg-transparent text-sm font-semibold focus:outline-none cursor-pointer w-full"
              >
                {cities.map(c => (
                  <option key={c} value={c} className="text-slate-800">{c === 'All' ? 'All Cities' : c}</option>
                ))}
              </select>
            </div>
            
            <button 
              id="buyer-filter-toggle"
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition-all flex items-center justify-center gap-1.5 ${showFilters ? 'bg-teal-50 border-teal-200 text-teal-800' : 'border-slate-200 text-slate-600 hover:bg-slate-50'}`}
            >
              <SlidersHorizontal className="w-3.5 h-3.5" /> Filters
            </button>
            
            <button 
              id="buyer-map-toggle-top-btn"
              onClick={() => setShowMapModal(true)}
              className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl text-xs font-semibold shadow-md active:scale-95 transition-all flex items-center gap-1.5"
            >
              <Compass className="w-3.5 h-3.5" /> Map Pin
            </button>
          </div>

          {/* 🔍 Advanced filters tray */}
          {showFilters && (
            <div id="buyer-advanced-filters-tray" className="mt-4 p-4 bg-white/10 backdrop-blur rounded-2xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 animate-fadeIn text-white">
              {/* Price Slider */}
              <div>
                <label className="block text-xs font-semibold mb-1 opacity-90">Max Budget: ₹{(filterPrice / 100000).toFixed(0)} Lakhs</label>
                <input 
                  id="filter-price-slider"
                  type="range" 
                  min={10000}
                  max={50000000} 
                  step={50000}
                  value={filterPrice}
                  onChange={(e) => setFilterPrice(Number(e.target.value))}
                  className="w-full accent-teal-400 cursor-pointer text-xs" 
                />
              </div>

              {/* BHK */}
              <div>
                <label className="block text-xs font-semibold mb-1 opacity-90">Bedrooms (BHK)</label>
                <select 
                  id="filter-bhk-select"
                  value={filterBhk}
                  onChange={(e) => setFilterBhk(e.target.value)}
                  className="bg-teal-800 border border-teal-600 text-white rounded-lg p-1.5 text-xs w-full focus:outline-none"
                >
                  <option value="All">Any BHK</option>
                  <option value="1">1 BHK</option>
                  <option value="2">2 BHK</option>
                  <option value="3">3 BHK</option>
                  <option value="4">4 BHK</option>
                </select>
              </div>

              {/* Furnishing */}
              <div>
                <label className="block text-xs font-semibold mb-1 opacity-90">Furnishing</label>
                <select 
                  id="filter-furnishing-select"
                  value={filterFurnishing}
                  onChange={(e) => setFilterFurnishing(e.target.value)}
                  className="bg-teal-800 border border-teal-600 text-white rounded-lg p-1.5 text-xs w-full focus:outline-none"
                >
                  <option value="All">Any Status</option>
                  <option value="Fully Furnished">Fully Furnished</option>
                  <option value="Semi-Furnished">Semi-Furnished</option>
                  <option value="Unfurnished">Unfurnished</option>
                </select>
              </div>

              {/* Verified Badge Checkbox */}
              <div className="flex items-center gap-2 pt-5">
                <input 
                  id="filter-verified-checkbox"
                  type="checkbox"
                  checked={filterVerified}
                  onChange={(e) => setFilterVerified(e.target.checked)}
                  className="w-4 h-4 accent-teal-400 rounded focus:ring-0"
                />
                <label htmlFor="filter-verified-checkbox" className="text-xs font-semibold cursor-pointer flex items-center gap-1 leading-none select-none">
                  Verified Listings Only <Check className="w-3.5 h-3.5 bg-teal-500 rounded-full text-white p-0.5" />
                </label>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* 📊 Main Content Area: Left list & Right widgets */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Columns: Property Grid List */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-bold font-display text-slate-800 flex items-center gap-1.5">
                <Home className="w-5 h-5 text-teal-600" /> Search Results 
                <span className="text-xs bg-teal-100 text-teal-800 px-2.5 py-0.5 rounded-full font-semibold">
                  {filteredProperties.length} Properties
                </span>
              </h2>
              <p className="text-xs text-slate-500 font-medium">Matching your specific search preference criteria</p>
            </div>

            {/* Compare items count */}
            {compareIds.length > 0 && (
              <button 
                id="buyer-compare-trigger"
                onClick={() => setShowCompareModal(true)}
                className="bg-teal-50 text-teal-700 border border-teal-200 hover:bg-teal-100 px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 animate-pulse"
              >
                <ArrowLeftRight className="w-3.5 h-3.5" /> Compare Selection ({compareIds.length}/2)
              </button>
            )}
          </div>

          {/* Property Listings Loop */}
          {filteredProperties.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-100 p-12 text-center text-slate-500">
              <Compass className="w-16 h-16 text-slate-300 mx-auto mb-4" />
              <p className="font-semibold text-slate-700 text-base">No match found inside this catalog</p>
              <p className="text-xs text-slate-400 max-w-sm mx-auto mt-1">Try to expand your price slider budget, adjust Bed count, or type a general area name instead.</p>
              <button 
                id="buyer-clear-filters-btn"
                onClick={() => {
                  setSearchQuery('');
                  setFilterCity('All');
                  setFilterPrice(50000000);
                  setFilterBhk('All');
                  setFilterFurnishing('All');
                  setFilterVerified(false);
                }}
                className="mt-4 bg-teal-600 hover:bg-teal-700 text-white text-xs font-semibold px-4 py-2 rounded-xl"
              >
                Clear Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {filteredProperties.map(prop => {
                const checkedSave = isSaved(prop.id);
                const isComparing = compareIds.includes(prop.id);
                
                return (
                  <div 
                    id={`property-card-${prop.id}`}
                    key={prop.id} 
                    className="bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-md transition-all group flex flex-col h-full"
                  >
                    {/* Media Header */}
                    <div className="relative h-48 overflow-hidden bg-slate-100">
                      <img 
                        src={prop.images[0]} 
                        alt={prop.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        referrerPolicy="no-referrer"
                      />
                      
                      {/* Top badging */}
                      <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                        <span className="bg-slate-900/80 backdrop-blur text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-wide">
                          {prop.transaction === 'sell' ? 'For Sale' : prop.transaction === 'rent' ? 'For Rent' : 'Lease'}
                        </span>
                        {prop.isFeatured && (
                          <span className="bg-yellow-500 text-slate-950 text-[10px] font-bold px-2 py-0.5 rounded flex items-center gap-1">
                            <Sparkles className="w-2.5 h-2.5 fill-slate-950" /> FEATURED
                          </span>
                        )}
                      </div>

                      {/* Right save button */}
                      <button 
                        id={`buyer-save-btn-${prop.id}`}
                        onClick={() => toggleSave(prop.id)}
                        className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all active:scale-90 ${checkedSave ? 'bg-rose-50 text-rose-500' : 'bg-black/35 text-white hover:bg-white hover:text-rose-500'}`}
                      >
                        <Heart className={`w-4 h-4 ${checkedSave ? 'fill-current' : ''}`} />
                      </button>

                      {/* Map Locator Badge overlay */}
                      <div className="absolute bottom-3 left-3 bg-teal-900/75 backdrop-blur text-teal-200 text-[11px] font-medium px-2 py-0.5 rounded flex items-center gap-1">
                        <MapPin className="w-3 h-3" /> {prop.locality}, {prop.city}
                      </div>
                    </div>

                    {/* Card details body */}
                    <div className="p-4 flex-1 flex flex-col justify-between">
                      <div>
                        {/* Tags */}
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[11px] font-bold text-teal-700 bg-teal-50 px-2 py-0.5 rounded">
                            {prop.category}
                          </span>
                          
                          {/* Rating badge if verified */}
                          {prop.verifiedBadge ? (
                            <span className="text-[10px] bg-emerald-50 text-emerald-800 px-2 py-0.5 rounded-full font-semibold flex items-center gap-1">
                              RERA Active <Check className="w-2.5 h-2.5 bg-emerald-600 rounded-full text-white p-0.5" />
                            </span>
                          ) : (
                            <span className="text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full font-medium">
                              Listed {prop.ownerType}
                            </span>
                          )}
                        </div>

                        {/* Title */}
                        <h3 className="text-sm font-bold text-slate-800 line-clamp-2 leading-snug hover:text-teal-600 transition-colors cursor-pointer" onClick={() => setSelectedProperty(prop)}>
                          {prop.title}
                        </h3>

                        {/* Price */}
                        <p className="text-base font-extrabold text-teal-700 mt-1 font-display">
                          {prop.price >= 10000000 
                            ? `₹${(prop.price / 10000000).toFixed(2)} Cr` 
                            : prop.price >= 100000 
                              ? `₹${(prop.price / 100000).toFixed(2)} Lakhs` 
                              : `₹${prop.price.toLocaleString('en-IN')}`}
                          {prop.transaction === 'rent' || prop.transaction === 'lease' ? '/month' : ''}
                        </p>

                        {/* Property Specs */}
                        <div className="grid grid-cols-3 gap-2 mt-3 pt-3 border-t border-slate-50 text-xs text-slate-500 font-medium font-sans">
                          {prop.bedrooms > 0 && (
                            <span className="flex items-center gap-1 text-slate-600">
                              <BedDouble className="w-3.5 h-3.5 text-teal-500" /> {prop.bedrooms} BHK
                            </span>
                          )}
                          <span className="flex items-center gap-1 text-slate-600">
                            <Bath className="w-3.5 h-3.5 text-teal-500" /> {prop.bathrooms !== 0 ? prop.bathrooms : '-' } Baths
                          </span>
                          <span className="text-slate-600 block truncate">
                            📐 {prop.builtUpArea} sq.ft
                          </span>
                        </div>
                      </div>

                      {/* Interactive Buttons */}
                      <div className="grid grid-cols-2 gap-2 mt-4 pt-3 border-t border-slate-100">
                        <button 
                          id={`buyer-compare-toggle-${prop.id}`}
                          onClick={() => handleToggleCompare(prop.id)}
                          className={`text-[11px] font-bold px-2 py-2 rounded-xl transition-all flex items-center justify-center gap-1 ${isComparing ? 'bg-teal-700 text-white' : 'bg-slate-50 border border-slate-100 text-slate-700 hover:bg-slate-100'}`}
                        >
                          <ArrowLeftRight className="w-3 h-3" /> Compare
                        </button>
                        <button 
                          id={`buyer-view-details-btn-${prop.id}`}
                          onClick={() => setSelectedProperty(prop)}
                          className="bg-teal-50 text-teal-700 hover:bg-teal-100 text-[11px] font-bold px-2 py-2 rounded-xl"
                        >
                          Details 360°
                        </button>

                        <button 
                          id={`buyer-schedule-visit-btn-${prop.id}`}
                          onClick={() => setShowVisitModal(prop)}
                          className="col-span-2 bg-gradient-to-r from-teal-600 to-teal-700 text-white hover:from-teal-700 hover:to-teal-800 text-xs font-bold py-2 px-3 rounded-xl flex items-center justify-center gap-1 shadow-sm active:scale-[0.98] transition-all"
                        >
                          <Calendar className="w-3.5 h-3.5" /> Book Direct Visit
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* 📰 Read helpful tips & guidelines (CMS system mockup integration) */}
          <div className="bg-white rounded-2xl border border-slate-100 p-6">
            <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide flex items-center gap-2 mb-4">
              <BookOpen className="w-4 h-4 text-teal-600" /> Smart real estate guides & resources
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {BLOG_POSTS.map(post => (
                <div key={post.id} className="group cursor-pointer">
                  <span className="text-[10px] font-bold tracking-wide text-teal-600 bg-teal-50 px-2 py-0.5 rounded uppercase">
                    {post.tag}
                  </span>
                  <h4 className="text-xs font-bold text-slate-800 group-hover:text-teal-600 transition-colors mt-2 mb-1.5 leading-snug">
                    {post.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 line-clamp-3 mb-2">{post.desc}</p>
                  <p className="text-[10px] font-semibold text-slate-400">{post.readTime} • By {post.author}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Widgets Stack (Trends, Appointments, Live Interactive Chatbox) */}
        <div className="space-y-6">
          
          {/* Appointment Site Visits Status Widget */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 flex items-center justify-between mb-4">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-teal-600" /> My Visits Scheduled
              </span>
              <span className="text-[10px] bg-teal-100 text-teal-800 font-bold px-2 py-0.5 rounded-full">
                {appointments.length} Total
              </span>
            </h3>

            <div className="space-y-3">
              {appointments.map(visit => (
                <div key={visit.id} className="p-3 rounded-2xl bg-slate-50 border border-slate-100 text-xs flex items-start justify-between gap-2">
                  <div>
                    <h4 className="font-bold text-slate-800 line-clamp-1">{visit.title}</h4>
                    <p className="text-slate-500 text-[10px] mt-0.5">🗓️ {visit.date} at {visit.time}</p>
                  </div>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold shrink-0 ${visit.status === 'Confirmed' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'}`}>
                    {visit.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Market Trends Tracker Widget */}
          <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm">
            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5 mb-1">
              <TrendingUp className="w-4 h-4 text-teal-600" /> Price index trend 2026
            </h3>
            <p className="text-[10px] text-slate-400 font-medium mb-4">Average real estate property index values per Sqft</p>

            <div className="space-y-3.5">
              {[
                { city: 'Mumbai', value: '₹22,400/sq.ft', change: '+3.4%', color: 'teal', indexData: [50, 55, 62, 59, 68, 75, 78] },
                { city: 'Whitefield (Blor)', value: '₹9,800/sq.ft', change: '+5.8%', color: 'emerald', indexData: [30, 32, 40, 42, 43, 50, 56] },
                { city: 'Connaught Place', value: '₹18,500/sq.ft', change: '-1.1%', color: 'rose', indexData: [72, 70, 68, 71, 70, 69, 67] }
              ].map((item, i) => (
                <div key={i} className="flex items-center justify-between gap-4">
                  <div>
                    <h4 className="font-bold text-xs text-slate-700">{item.city}</h4>
                    <div className="flex items-center gap-1.5 text-[10px]">
                      <span className="font-semibold text-slate-500">{item.value}</span>
                      <span className={item.change.startsWith('+') ? 'text-emerald-600 font-bold' : 'text-rose-600 font-bold'}>{item.change}</span>
                    </div>
                  </div>

                  {/* Little custom sparkline drawn with SVG to dodge high heavy chart dependencies */}
                  <svg className="w-20 h-6 shrink-0" viewBox="0 0 100 30">
                    <polyline
                      fill="none"
                      stroke={item.color === 'rose' ? '#f43f5e' : item.color === 'emerald' ? '#10b981' : '#0d9488'}
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      points={item.indexData.map((val, idx) => `${(idx / (item.indexData.length - 1)) * 100},${30 - (val / 90) * 30}`).join(' ')}
                    />
                  </svg>
                </div>
              ))}
            </div>
          </div>

          {/* 💬 Messages & Calls Realtime Inbox Box */}
          <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden flex flex-col h-[400px]">
            {/* Header */}
            <div className="bg-slate-900 text-white p-4 flex items-center justify-between shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-white/20 relative">
                  <img src={activeChat.participantAvatar} alt={activeChat.participantName} className="w-full h-full object-cover" />
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-emerald-500 border border-slate-900 rounded-full"></span>
                </div>
                <div>
                  <h4 className="text-xs font-bold leading-none">{activeChat.participantName}</h4>
                  <p className="text-[9px] text-slate-300 font-medium leading-none mt-1">{activeChat.participantRole}</p>
                </div>
              </div>
              <MessageSquare className="w-4 h-4 text-slate-400" />
            </div>

            {/* Selector list */}
            <div className="bg-slate-100 p-1 flex gap-1 shrink-0">
              {chatSessions.map(session => (
                <button
                  key={session.id}
                  onClick={() => setActiveChatId(session.id)}
                  className={`flex-1 py-1 px-2 rounded-lg text-[9px] font-bold truncate transition-all text-center ${session.id === activeChatId ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:bg-white/50'}`}
                >
                  {session.participantName.split(' ')[0]}
                </button>
              ))}
            </div>

            {/* Messages Body */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50">
              {activeChat.messages.map((msg, idx) => (
                <div key={msg.id || idx} className={`flex flex-col ${msg.sender === 'buyer' ? 'items-end' : 'items-start'}`}>
                  <div className={`p-2.5 rounded-2xl max-w-[85%] text-xs ${msg.sender === 'buyer' ? 'bg-teal-600 text-white rounded-tr-none' : 'bg-white border border-slate-100 text-slate-800 rounded-tl-none'}`}>
                    <p className="leading-snug whitespace-pre-wrap">{msg.text}</p>
                  </div>
                  <span className="text-[8px] text-slate-400 font-medium mt-0.5">{msg.timestamp}</span>
                </div>
              ))}
            </div>

            {/* Input Footer */}
            <div className="p-3 border-t border-slate-100 bg-white flex items-center gap-2 shrink-0">
              <input 
                id="buyer-chat-input-field"
                type="text" 
                placeholder="Type your reply..."
                value={chatMessageText}
                onChange={(e) => setChatMessageText(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleSendMessage();
                }}
                className="flex-1 bg-slate-100 text-xs px-3 py-2 rounded-xl focus:outline-none focus:ring-1 focus:ring-teal-500 placeholder-slate-400 font-medium text-slate-800"
              />
              <button 
                id="buyer-chat-send-btn"
                onClick={handleSendMessage}
                className="bg-teal-600 hover:bg-teal-700 text-white p-2 rounded-xl active:scale-95 transition-all focus:outline-none"
              >
                <Send className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

        </div>
      </div>

      {/* 📍 SIMULATED MAP VIEW MODAL */}
      {showMapModal && (
        <div id="buyer-map-modal" className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm animate-fadeIn">
          <div className="bg-white rounded-3xl overflow-hidden w-full max-w-2xl border border-slate-100 shadow-xl relative animate-scaleUp">
            <button 
              id="buyer-close-map-modal"
              onClick={() => setShowMapModal(false)}
              className="absolute top-4 right-4 bg-slate-100 text-slate-500 hover:bg-slate-200 p-2 rounded-full z-10"
            >
              <X className="w-4 h-4" />
            </button>
            
            <div className="p-6">
              <h3 className="text-lg font-bold text-slate-800 font-display flex items-center gap-2 mb-1">
                <Compass className="w-5 h-5 text-teal-600" /> Propex360 Location Finder Map
              </h3>
              <p className="text-xs text-slate-400 mb-4">Visualizing verified listings in standard coordinates</p>

              {/* Map Simulator Visual Grid */}
              <div className="relative bg-slate-100 border border-slate-200 rounded-2xl h-80 overflow-hidden flex items-center justify-center">
                
                {/* Visual simulated street lines */}
                <div className="absolute inset-0 grid grid-cols-6 grid-rows-6 pointer-events-none opacity-25">
                  {Array.from({ length: 6 }).map((_, rIdx) => (
                    <div key={rIdx} className="border-b border-dashed border-slate-900 w-full h-full"></div>
                  ))}
                  {Array.from({ length: 6 }).map((_, cIdx) => (
                    <div key={cIdx} className="border-r border-dashed border-slate-900 w-full h-full"></div>
                  ))}
                </div>

                {/* Simulated Green Park */}
                <div className="absolute top-10 left-12 w-32 h-16 bg-emerald-100/60 rounded-full border border-emerald-200 text-[10px] text-emerald-800 font-bold flex items-center justify-center">
                  Bandra Reserve Garden
                </div>

                {/* Simulated Sea Water */}
                <div className="absolute bottom-0 right-0 w-44 h-36 bg-cyan-50 border-l border-t border-cyan-100 rounded-tl-3xl text-[10px] text-cyan-800 font-bold flex items-center justify-center">
                  Arabian Sea View Bay
                </div>

                {/* Plot Pins Loop */}
                {properties.map((prop, index) => (
                  <button
                    key={prop.id}
                    className="absolute bg-teal-600 hover:bg-slate-900 text-white font-extrabold text-[10px] px-2.5 py-1.5 rounded-full shadow-lg flex items-center gap-1 active:scale-95 transition-all animate-bounce"
                    style={{
                      top: `${20 + (index * 13) % 65}%`,
                      left: `${15 + (index * 22) % 65}%`
                    }}
                    onClick={() => {
                      setSelectedProperty(prop);
                      setShowMapModal(false);
                    }}
                  >
                    <MapPin className="w-3.5 h-3.5 fill-current" /> 
                    ₹{(prop.price / 100000).toFixed(0)}L
                  </button>
                ))}
              </div>

              <div className="mt-4 text-xs text-slate-500 font-sans text-center">
                Click on any of the coordinate pins above to inspect detailed interior amenities, carpet details, and book site inspections.
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 🔎 PROPERTY DETAILS MODAL */}
      {selectedProperty && (
        <div id="buyer-property-details-modal" className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl overflow-hidden w-full max-w-3xl border border-slate-100 shadow-xl relative my-8 translate-z-0">
            
            {/* Image Slider */}
            <div className="relative h-64 sm:h-80 bg-slate-900">
              <img 
                src={selectedProperty.images[0]} 
                alt={selectedProperty.title} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <button 
                id="buyer-close-details-modal"
                onClick={() => setSelectedProperty(null)}
                className="absolute top-4 right-4 bg-white/80 hover:bg-white text-slate-800 p-2 rounded-full text-slate-700"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between text-white backdrop-blur-md bg-black/35 p-4 rounded-2xl">
                <div>
                  <span className="text-[10px] bg-teal-600 text-white font-bold px-2 py-0.5 rounded tracking-wide uppercase">
                    {selectedProperty.category} • {selectedProperty.transaction.toUpperCase()}
                  </span>
                  <h3 className="text-lg font-bold font-display mt-1">{selectedProperty.title}</h3>
                  <p className="text-xs text-slate-200 mt-0.5 flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5" /> {selectedProperty.locality}, {selectedProperty.city}, {selectedProperty.state}
                  </p>
                </div>
                
                <p className="text-lg font-extrabold text-teal-300 font-display shrink-0">
                  {selectedProperty.price >= 10000000 
                    ? `₹${(selectedProperty.price / 10000000).toFixed(2)} Cr` 
                    : `₹${(selectedProperty.price / 100000).toFixed(2)} Lakhs`}
                </p>
              </div>
            </div>

            {/* Main Fields content scroll */}
            <div className="p-6 max-h-[450px] overflow-y-auto space-y-6">
              
              {/* Features badges row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl text-center">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Built-Up Area</span>
                  <span className="text-sm font-bold text-slate-700">{selectedProperty.builtUpArea} sq.ft</span>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl text-center">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Carpet Area</span>
                  <span className="text-sm font-bold text-slate-700">{selectedProperty.carpetArea} sq.ft</span>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl text-center">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Furnishing</span>
                  <span className="text-sm font-bold text-slate-700">{selectedProperty.furnishing}</span>
                </div>
                <div className="bg-slate-50 border border-slate-100 p-3 rounded-2xl text-center">
                  <span className="text-[10px] text-slate-400 block uppercase font-bold">Status</span>
                  <span className="text-sm font-bold text-slate-700">{selectedProperty.status}</span>
                </div>
              </div>

              {/* Detailed specification fields */}
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-3">Technical Specifications</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-y-3 gap-x-6 text-xs text-slate-600 font-medium border-t border-b border-slate-100 py-4">
                  <div className="flex justify-between">
                    <span>Bedrooms:</span>
                    <strong className="text-slate-800">{selectedProperty.bedrooms > 0 ? selectedProperty.bedrooms : 'N/A Commercial'}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Bathrooms:</span>
                    <strong className="text-slate-800">{selectedProperty.bathrooms}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Balconies:</span>
                    <strong className="text-slate-800">{selectedProperty.balconies}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Parking space:</span>
                    <strong className="text-slate-800">{selectedProperty.parking}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Facing direction:</span>
                    <strong className="text-slate-800">{selectedProperty.facing}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Age of House:</span>
                    <strong className="text-slate-800">{selectedProperty.ageOfProperty} Years</strong>
                  </div>
                  <div className="flex justify-between">
                    <span>Floor Level:</span>
                    <strong className="text-slate-800">{selectedProperty.floorNumber} (Total {selectedProperty.totalFloors})</strong>
                  </div>
                  <div className="flex justify-between text-teal-700 font-bold col-span-1 sm:col-span-2">
                    <span>Estimated EMI Options:</span>
                    <span>Starting ₹{Math.round(selectedProperty.price * 0.007).toLocaleString('en-IN')}/Month</span>
                  </div>
                </div>
              </div>

              {/* Multi-select Amenities */}
              <div>
                <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-3">Amenities Included</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProperty.amenities.map(amenity => (
                    <span key={amenity} className="bg-teal-50 text-teal-800 font-semibold px-3 py-1.5 rounded-full text-xs flex items-center gap-1.5 border border-teal-100/50">
                      <span className="w-1.5 h-1.5 bg-teal-500 rounded-full"></span> {amenity}
                    </span>
                  ))}
                </div>
              </div>

              {/* Structural video / documentation if uploaded */}
              {selectedProperty.videoTour && (
                <div>
                  <h4 className="text-xs font-extrabold uppercase tracking-widest text-slate-400 mb-2">Simulated Video Tour</h4>
                  <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-inner bg-slate-950 p-2 relative h-48 flex items-center justify-center">
                    <span className="absolute top-2 left-2 text-[10px] bg-slate-900/80 text-white font-mono px-2 py-0.5 rounded">RERA verification active</span>
                    <video src={selectedProperty.videoTour} controls className="w-full h-full rounded-xl object-cover"></video>
                  </div>
                </div>
              )}

              {/* Seller / Contact Info */}
              <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-slate-300 rounded-full font-bold text-slate-800 text-lg flex items-center justify-center">
                    {selectedProperty.ownerName.charAt(0)}
                  </div>
                  <div>
                    <h5 className="font-bold text-slate-800 text-sm leading-none flex items-center gap-1.5">
                      {selectedProperty.ownerName} 
                      <span className="text-[9px] bg-teal-100 text-teal-800 font-bold px-1.5 py-0.5 rounded uppercase">{selectedProperty.ownerType}</span>
                    </h5>
                    <p className="text-xs text-slate-400 mt-1">Listed operator ID: {selectedProperty.ownerId}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button 
                    id="buyer-contact-now-btn"
                    onClick={() => {
                      setShowContactModal(selectedProperty);
                    }}
                    className="bg-teal-600 hover:bg-teal-700 text-white font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 active:scale-95 transition-all"
                  >
                    <MessageSquare className="w-3.5 h-3.5" /> Call / Chat Now
                  </button>
                  <button 
                    id="buyer-modal-book-site-visit-btn"
                    onClick={() => {
                      setShowVisitModal(selectedProperty);
                    }}
                    className="bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs px-4 py-2 rounded-xl flex items-center gap-1.5 active:scale-95 transition-all"
                  >
                    <Calendar className="w-3.5 h-3.5" /> Book Inspection
                  </button>
                </div>
              </div>

            </div>

            {/* Footer buttons to close/confirm */}
            <div className="p-4 bg-slate-50 border-t border-slate-100 text-right">
              <button 
                id="buyer-details-modal-close-btn"
                onClick={() => setSelectedProperty(null)}
                className="bg-white border border-slate-200 text-slate-700 font-bold text-xs px-5 py-2.5 rounded-xl hover:bg-slate-50"
              >
                Close View
              </button>
            </div>

          </div>
        </div>
      )}

      {/* 🤝 SITE VISIT SCHEDULER MODAL */}
      {showVisitModal && (
        <div id="buyer-visit-scheduler-modal" className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl overflow-hidden w-full max-w-md border border-slate-100 shadow-xl relative animate-scaleUp">
            <button 
              id="buyer-visit-modal-close-icon"
              onClick={() => setShowVisitModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 bg-slate-100 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>

            <form onSubmit={handleBookVisitSubmit} className="p-6">
              <h3 className="text-base font-bold font-display text-slate-800 flex items-center gap-1.5 mb-2">
                <Calendar className="w-5 h-5 text-teal-600" /> Book Free Site Visit
              </h3>
              <p className="text-xs text-slate-400 mb-4">A host representative will pick you up or meet you at coordinates.</p>

              {bookingSuccess ? (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl p-4 text-center text-xs font-semibold py-8 animate-fadeIn">
                  <Check className="w-12 h-12 bg-emerald-600 text-white rounded-full p-2 mx-auto mb-2" />
                  Appointment Booking Confirmed!
                  <p className="text-[10px] text-emerald-600 font-normal mt-1">Check SMS/Email triggers and Appointments status list dashboard alerts.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">Property Selected</label>
                    <input 
                      type="text" 
                      disabled 
                      value={showVisitModal.title}
                      className="bg-slate-100 text-slate-600 w-full rounded-xl text-xs px-3 py-2.5 font-bold focus:outline-none" 
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">Preferred Date</label>
                      <input 
                        id="visit-date-input"
                        type="date" 
                        required
                        value={visitDate}
                        onChange={(e) => setVisitDate(e.target.value)}
                        className="border border-slate-200 text-emerald-900 font-semibold w-full rounded-xl text-xs px-3 py-2 focus:outline-emerald-500" 
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">Slot Timing</label>
                      <select 
                        id="visit-time-select"
                        value={visitTime}
                        onChange={(e) => setVisitTime(e.target.value)}
                        className="border border-slate-200 font-semibold w-full rounded-xl text-xs px-3 py-2.5 focus:outline-emerald-500"
                      >
                        <option value="11:00 AM">11:00 AM (Morning)</option>
                        <option value="01:30 PM">01:30 PM (Midday)</option>
                        <option value="04:30 PM">04:30 PM (Evening)</option>
                        <option value="06:00 PM">06:00 PM (Late slot)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">Optional note to Seller</label>
                    <textarea 
                      id="visit-message-textarea"
                      rows={3}
                      value={visitMessage}
                      onChange={(e) => setVisitMessage(e.target.value)}
                      placeholder="e.g. Please share structural plans or let me know where to park my car..."
                      className="border border-slate-200 w-full rounded-xl text-xs p-3 focus:outline-emerald-500 placeholder-slate-400 font-medium"
                    />
                  </div>

                  <button 
                    id="submit-book-visit-btn"
                    type="submit"
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-md transition-all active:scale-[0.98]"
                  >
                    Confirm Free Booking Slot
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* 📧 INQUIRY & CONTACT POPUP MODAL */}
      {showContactModal && (
        <div id="buyer-contact-modal" className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-3xl overflow-hidden w-full max-w-md border border-slate-100 shadow-xl relative animate-scaleUp">
            <button 
              id="buyer-contact-close-icon"
              onClick={() => setShowContactModal(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 bg-slate-100 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>

            <form onSubmit={handleContactSubmit} className="p-6">
              <h3 className="text-base font-bold font-display text-slate-800 flex items-center gap-1.5 mb-2">
                <PhoneCall className="w-5 h-5 text-teal-600" /> Contact Seller / Agent
              </h3>
              <p className="text-xs text-slate-400 mb-4">Your inquiry triggers SMS alerts & logs a hot lead inside their performance console.</p>

              {contactSubmitted ? (
                <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 rounded-2xl p-4 text-center text-xs font-semibold py-8 animate-fadeIn">
                  <Check className="w-12 h-12 bg-emerald-600 text-white rounded-full p-2 mx-auto mb-2" />
                  Your Contact Inquiry has been Shared!
                  <p className="text-[10px] text-emerald-600 font-normal mt-1">Vikram / Agency details have been active-linked under your realtime inbox.</p>
                </div>
              ) : (
                <div className="space-y-3.5">
                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">Your Full Name</label>
                    <input 
                      id="contact-name"
                      type="text" 
                      required
                      value={contactName}
                      onChange={(e) => setContactName(e.target.value)}
                      className="border border-slate-200 font-medium w-full rounded-xl text-xs px-3 py-2.5 focus:outline-teal-500" 
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">E-mail Address</label>
                      <input 
                        id="contact-email"
                        type="email" 
                        required
                        value={contactEmail}
                        onChange={(e) => setContactEmail(e.target.value)}
                        className="border border-slate-200 font-medium w-full rounded-xl text-xs px-3 py-2 focus:outline-teal-500" 
                      />
                    </div>
                    <div>
                      <label className="block text-[11px] font-bold text-slate-500 mb-1">Phone Masked</label>
                      <input 
                        id="contact-phone"
                        type="text" 
                        required
                        value={contactPhone}
                        onChange={(e) => setContactPhone(e.target.value)}
                        className="border border-slate-200 font-medium w-full rounded-xl text-xs px-3 py-2 focus:outline-teal-500" 
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-slate-500 mb-1">Your Message Profile</label>
                    <textarea 
                      id="contact-message"
                      rows={3}
                      required
                      value={contactMessage}
                      onChange={(e) => setContactMessage(e.target.value)}
                      className="border border-slate-200 w-full rounded-xl text-xs p-3 focus:outline-teal-500 placeholder-slate-400 font-medium"
                    />
                  </div>

                  <button 
                    id="submit-contact-btn"
                    type="submit"
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white font-bold py-2.5 rounded-xl text-xs shadow-md transition-all active:scale-[0.98]"
                  >
                    Submit Quick Inquiry
                  </button>
                </div>
              )}
            </form>
          </div>
        </div>
      )}

      {/* ⚖️ COMPARE PROPERTIES MODAL */}
      {showCompareModal && (
        <div id="buyer-comparison-modal" className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl overflow-hidden w-full max-w-2xl border border-slate-100 shadow-xl relative my-8 animate-scaleUp">
            <button 
              id="buyer-close-compare"
              onClick={() => setShowCompareModal(false)}
              className="absolute top-4 right-4 bg-slate-100 hover:bg-slate-200 p-2 rounded-full text-slate-700"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="p-6">
              <h3 className="text-base font-bold font-display text-slate-800 flex items-center gap-1.5 mb-1 text-center justify-center">
                <ArrowLeftRight className="w-5 h-5 text-teal-600" /> Side-by-Side Property Comparison
              </h3>
              <p className="text-xs text-slate-400 text-center mb-6">Evaluating key interior carpet specifications and amenities</p>

              {comparedProperties.length < 2 ? (
                <div className="p-12 text-center text-slate-400 text-xs">
                  Please select active listings for comparison by pressing 'Compare' underneath their thumbnail cards.
                </div>
              ) : (
                <div className="grid grid-cols-3 gap-3 text-xs text-slate-600">
                  <div className="space-y-4 pt-16 font-bold text-slate-500">
                    <div className="py-2 border-b border-slate-100">Category</div>
                    <div className="py-2 border-b border-slate-100">Price Points</div>
                    <div className="py-2 border-b border-slate-100">Carpet Area</div>
                    <div className="py-2 border-b border-slate-100">Layout (BHK)</div>
                    <div className="py-2 border-b border-slate-100">Bathrooms</div>
                    <div className="py-2 border-b border-slate-100">Furnishing</div>
                    <div className="py-2 border-b border-slate-100">Property Age</div>
                    <div className="py-2 border-b border-slate-100">Amenities</div>
                  </div>

                  {comparedProperties.map(p => (
                    <div key={p.id} className="text-center">
                      <div className="h-16 flex flex-col items-center justify-end mb-2">
                        <img src={p.images[0]} alt="" className="w-10 h-10 object-cover rounded-md mb-1" referrerPolicy="no-referrer" />
                        <span className="font-extrabold text-slate-800 line-clamp-1 text-[11px]">{p.title}</span>
                      </div>
                      
                      <div className="py-2 border-b border-slate-100 font-semibold">{p.category}</div>
                      <div className="py-2 border-b border-slate-100 font-extrabold text-teal-600">
                        ₹{(p.price / 100000).toFixed(0)} Lakhs
                      </div>
                      <div className="py-2 border-b border-slate-100 font-semibold">{p.carpetArea} sqft</div>
                      <div className="py-2 border-b border-slate-100 font-semibold">{p.bedrooms > 0 ? `${p.bedrooms} BHK` : 'N/A'}</div>
                      <div className="py-2 border-b border-slate-100 font-semibold">{p.bathrooms} Baths</div>
                      <div className="py-2 border-b border-slate-100 font-semibold">{p.furnishing}</div>
                      <div className="py-2 border-b border-slate-100 font-semibold">{p.ageOfProperty} Years</div>
                      <div className="py-2 border-b border-slate-100 text-[10px] truncate max-w-[150px] font-mono font-bold text-teal-800 bg-teal-50 rounded mx-auto">
                        {p.amenities.slice(0, 3).join(', ')}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 text-right">
              <button 
                id="buyer-close-compare-box"
                onClick={() => {
                  setCompareIds([]);
                  setShowCompareModal(false);
                }}
                className="bg-rose-50 text-rose-700 font-bold text-xs px-4 py-2 rounded-xl mr-2"
              >
                Clear All
              </button>
              <button 
                onClick={() => setShowCompareModal(false)}
                className="bg-teal-600 text-white font-bold text-xs px-4 py-2 rounded-xl"
              >
                Keep Comparison
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
