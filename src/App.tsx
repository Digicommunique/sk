/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { 
  Building, Users, Wrench, Shield, Menu, Bell, User, Sparkles, Check, 
  ChevronDown, LogOut, Compass, FileText, CheckCircle2, Heart, HelpCircle, Inbox, LayoutDashboard
} from 'lucide-react';
import { Role, Property, Lead, UserAccount, ServiceLead, SupportTicket } from './types';
import { 
  INITIAL_PROPERTIES, 
  INITIAL_LEADS, 
  INITIAL_SERVICE_PROVIDERS, 
  INITIAL_SERVICE_LEADS, 
  INITIAL_USER_ACCOUNTS, 
  INITIAL_CHAT_SESSIONS, 
  INITIAL_TICKETS 
} from './mockData';

// Sub panels
import BuyerPanel from './components/BuyerPanel';
import OwnerPanel from './components/OwnerPanel';
import ServiceProviderPanel from './components/ServiceProviderPanel';
import AdminPanel from './components/AdminPanel';
import LandingPage from './components/LandingPage';

export default function App() {
  // Global States (representing of a persistent DB)
  const [currentRole, setCurrentRole] = useState<Role>('buyer');
  const [properties, setProperties] = useState<Property[]>(INITIAL_PROPERTIES);
  const [savedPropertyIds, setSavedPropertyIds] = useState<string[]>(['prop-1']);
  const [leads, setLeads] = useState<Lead[]>(INITIAL_LEADS);
  const [users, setUsers] = useState<UserAccount[]>(INITIAL_USER_ACCOUNTS);
  const [serviceLeads, setServiceLeads] = useState<ServiceLead[]>(INITIAL_SERVICE_LEADS);
  const [supportTickets, setSupportTickets] = useState<SupportTicket[]>(INITIAL_TICKETS);
  const [chatSessions, setChatSessions] = useState(INITIAL_CHAT_SESSIONS);

  // Layout states
  const [isLanding, setIsLanding] = useState(true);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: '1', title: 'Hot Lead received!', body: 'Rahul Mehra requested a site visit for Skyline Heights.', read: false },
    { id: '2', title: 'Listing approved', body: 'Skyline Heights Premium 3 BHK has been vetted & is now active.', read: true },
    { id: '3', title: 'KYC delay alert', body: 'Support ticket #1 open for Devender Grover KYC papers.', read: false }
  ]);

  // Sidebar link handlers per Role
  const sidebarLinksByRole = {
    buyer: [
      { label: 'Discovery Search', desc: 'Find properties 360°', id: 'search-view' },
      { label: 'Favorites Grid', desc: 'Saved homes', id: 'saved-view' },
      { label: 'Active Visit Agenda', desc: 'Scheduled visits', id: 'visits-view' },
    ],
    owner: [
      { label: 'Listings Manager', desc: 'Active properties', id: 'listings-view' },
      { label: 'Inquiries Board', desc: 'Direct client leads', id: 'leads-view' },
      { label: 'Subscriptions', desc: 'Upgrade listings', id: 'billing-view' },
    ],
    provider: [
      { label: 'Leads CRM Pipeline', desc: 'Manage service leads', id: 'pipe-view' },
      { label: 'Offered Catalog', desc: 'Services & pricing', id: 'catalog-view' },
      { label: 'Finance Ledgers', desc: 'Completed earnings', id: 'finance-view' },
    ],
    admin: [
      { label: 'Property Vetting Tray', desc: 'Moderate listings', id: 'vet-view' },
      { label: 'User Control', desc: 'Manage access & KYC', id: 'usr-view' },
      { label: 'Ticket Center', desc: 'Support inquiries', id: 'tkt-view' },
    ]
  };

  const handleToggleSaveProperty = (id: string) => {
    if (savedPropertyIds.includes(id)) {
      setSavedPropertyIds(prev => prev.filter(item => item !== id));
    } else {
      setSavedPropertyIds(prev => [...prev, id]);
    }
  };

  const handleAddGlobalLead = (newLead: Omit<Lead, 'id'>) => {
    const leadObj: Lead = {
      ...newLead,
      id: `lead-added-${Date.now()}`
    };

    setLeads(prev => [leadObj, ...prev]);

    // Push corresponding notify
    setNotifications(prev => [
      {
        id: Date.now().toString(),
        title: 'New property inquiry logged!',
        body: `Client ${newLead.customerName} submitted an enquiry on ${newLead.propertyTitle}`,
        read: false
      },
      ...prev
    ]);
  };

  const handleMarkNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadNotifyCount = notifications.filter(n => !n.read).length;

  if (isLanding) {
    return (
      <LandingPage 
        onEnterApp={() => setIsLanding(false)} 
        properties={properties} 
        serviceProviders={INITIAL_SERVICE_PROVIDERS} 
      />
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans selection:bg-teal-100 selection:text-teal-900">
      
      {/* 🔝 Floating Global Persona Control bar */}
      <div className="bg-white border-b border-slate-100 sticky top-0 z-40 px-4 py-3 shadow-sm flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* Logo brand */}
          <div className="flex items-center gap-2">
            <div className="bg-teal-600 p-2 rounded-2xl text-white shadow-md shadow-teal-600/10 active:scale-95 transition-all">
              <Building className="w-5 h-5 shrink-0" />
            </div>
            <div>
              <span className="font-display font-extrabold text-base tracking-tight text-slate-800 block">Propex360</span>
              <span className="text-[10px] text-teal-600 font-bold block leading-none">Property & Service Hub</span>
            </div>
          </div>
          
          <span className="hidden sm:block text-slate-300">|</span>

          {/* Collapsible sidebar trigger */}
          <button 
            id="global-sidebar-toggle-btn"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="p-1.5 hover:bg-slate-50 rounded-xl text-slate-500 hidden sm:block active:scale-95 transition-all focus:outline-none"
            title="Toggle Sidebar Layout"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>

        {/* 🎮 ROLE CONTROLLER DROPDOWN */}
        <div className="flex items-center gap-3">
          {/* Landing shortcut */}
          <button 
            id="global-goto-landing-btn"
            onClick={() => setIsLanding(true)}
            className="hidden md:flex bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold px-3 py-1.5 rounded-xl text-xs active:scale-95 transition-all outline-none border border-slate-200/50 items-center gap-1.5 cursor-pointer"
            title="View Painted Mural Landing Page"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Interactive Home</span>
          </button>

          <div className="flex items-center gap-1 bg-teal-50 border border-teal-100/55 p-1 rounded-2xl">
            <span className="text-[10px] text-teal-800 font-extrabold px-3 py-1 hidden lg:inline-block">SWITCH ACTIVE WORKSPACE:</span>
            
            <div className="relative">
              <select 
                id="global-role-switcher-select"
                value={currentRole}
                onChange={(e) => {
                  setCurrentRole(e.target.value as Role);
                  // Trigger helpful visual response alert
                }}
                className="bg-teal-600 text-white font-extrabold text-xs px-3.5 py-1.5 pr-8 rounded-xl cursor-pointer hover:bg-teal-700 active:scale-95 duration-100 transition-all appearance-none outline-none focus:ring-1 focus:ring-teal-500"
              >
                <option value="buyer">Buyer / Renter Dashboard</option>
                <option value="owner">Owner / Agent Workspace</option>
                <option value="provider">Service Expert Console</option>
                <option value="admin">Global Admin Panel</option>
              </select>
              <ChevronDown className="w-4 h-4 text-white absolute right-2.5 top-2 pointer-events-none" />
            </div>
          </div>

          {/* 🔔 Notifications drop down stack */}
          <div className="relative">
            <button 
              id="global-notify-bell-btn"
              onClick={() => {
                setShowNotificationDropdown(!showNotificationDropdown);
                if (!showNotificationDropdown) handleMarkNotificationsRead();
              }}
              className="bg-slate-100 hover:bg-slate-200 text-slate-600 p-2.5 rounded-2xl relative active:scale-90 transition-all focus:outline-none"
            >
              <Bell className="w-4.5 h-4.5" />
              {unreadNotifyCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-black w-4.5 h-4.5 flex items-center justify-center rounded-full animate-bounce">
                  {unreadNotifyCount}
                </span>
              )}
            </button>

            {showNotificationDropdown && (
              <div id="global-notify-tray" className="absolute right-0 mt-3 bg-white rounded-3xl border border-slate-100 shadow-xl p-4 w-72 max-w-[90vw] space-y-3 z-50 animate-fadeIn">
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-widest flex items-center justify-between">
                  <span>System Broadcast Alerts</span>
                  <span className="text-[10px] bg-slate-100 px-2 py-0.5 text-slate-500 roundedNormal">Realtime</span>
                </h4>
                <hr className="border-slate-50" />

                <div className="space-y-2 max-h-64 overflow-y-auto">
                  {notifications.map(n => (
                    <div key={n.id} className={`p-2 rounded-xl text-[11px] font-sans ${n.read ? 'bg-slate-50 opacity-75' : 'bg-teal-50/50 border-l-2 border-teal-500'}`}>
                      <p className="font-extrabold text-slate-800">{n.title}</p>
                      <p className="text-slate-500 mt-0.5">{n.body}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile Avatars representation */}
          <div className="w-9 h-9 rounded-full overflow-hidden border-2 border-teal-500 shrink-0">
            <img 
              src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60" 
              alt="User profile" 
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>

      {/* 🚀 Interactive Sidebar + Core Stage Canvas */}
      <div className="flex-1 flex relative">
        
        {/* Left static sidebar (Collapsible) */}
        {isSidebarOpen && (
          <aside className="w-64 bg-white border-r border-slate-100 shrink-0 p-4 space-y-6 hidden sm:block">
            
            {/* Status Persona indicator */}
            <div className="bg-slate-50 border border-slate-100 rounded-2xl p-4 text-xs">
              <span className="text-[10px] text-slate-400 font-extrabold uppercase tracking-wide block">Active Status Token</span>
              <strong className="text-slate-800 mt-1 block">
                {currentRole === 'buyer' ? '🌐 Consumer / Renter' : currentRole === 'owner' ? '👔 Real Estate Agent' : currentRole === 'provider' ? '🛠️ Interior & Packer Expert' : '🛡️ Super Administrator'}
              </strong>
              <p className="text-[9px] text-slate-400 mt-1 leading-normal font-semibold">Workspace updates dynamically to mock role-based configurations.</p>
            </div>

            {/* Sub menus listings dynamically generated based on Role state */}
            <div className="space-y-2">
              <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider pl-2.5">Workspace Channels</span>
              <div className="space-y-1 text-xs">
                {sidebarLinksByRole[currentRole].map((link, idx) => (
                  <button
                    key={idx}
                    className={`w-full text-left p-2.5 rounded-xl transition-all flex items-center justify-between group ${idx === 0 ? 'bg-teal-500 text-white font-bold' : 'hover:bg-slate-50 text-slate-600'}`}
                  >
                    <div>
                      <p className="font-semibold">{link.label}</p>
                      <p className={`text-[9px] mt-0.5 leading-none ${idx === 0 ? 'text-teal-100' : 'text-slate-400 font-medium group-hover:text-teal-600'}`}>{link.desc}</p>
                    </div>
                    {idx === 0 && <Check className="w-3.5 h-3.5" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick platform resources badge shortcuts */}
            <div className="space-y-3 pt-6 border-t border-slate-50">
              <span className="text-[10px] text-slate-400 block font-bold uppercase tracking-wider pl-2.5">Regulatory Indices</span>
              <div className="space-y-2 text-[11px] font-semibold text-slate-500">
                <div className="flex items-center gap-2 pl-2.5">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping"></span>
                  <span>RERA compliance active</span>
                </div>
                <div className="flex items-center gap-2 pl-2.5">
                  <span className="w-2 h-2 bg-teal-500 rounded-full"></span>
                  <span>SSL payment active</span>
                </div>
              </div>
            </div>

          </aside>
        )}

        {/* Dynamic Panel Viewport Area */}
        <main className="flex-1 p-4 sm:p-6 overflow-x-hidden min-w-0 max-w-7xl mx-auto pb-16 sm:pb-6">
          {currentRole === 'buyer' && (
            <BuyerPanel 
              properties={properties}
              savedIds={savedPropertyIds}
              toggleSave={handleToggleSaveProperty}
              chatSessions={chatSessions}
              setChatSessions={setChatSessions}
              addLead={handleAddGlobalLead}
              serviceProviders={INITIAL_SERVICE_PROVIDERS}
            />
          )}

          {currentRole === 'owner' && (
            <OwnerPanel 
              properties={properties}
              setProperties={setProperties}
              leads={leads}
              setLeads={setLeads}
            />
          )}

          {currentRole === 'provider' && (
            <ServiceProviderPanel 
              providers={INITIAL_SERVICE_PROVIDERS}
              serviceLeads={serviceLeads}
              setServiceLeads={setServiceLeads}
            />
          )}

          {currentRole === 'admin' && (
            <AdminPanel 
              properties={properties}
              setProperties={setProperties}
              users={users}
              setUsers={setUsers}
              tickets={supportTickets}
              setTickets={setSupportTickets}
              leads={leads}
            />
          )}
        </main>

      </div>

      {/* 📱 Mobile Dynamic Bottom Nav Bar (collapsible) */}
      <footer id="mobile-bottom-nav-bar" className="sm:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-slate-100 px-4 py-2 flex items-center justify-around z-40 shadow-lg">
        {[
          { icon: Compass, label: 'Search', role: 'buyer' },
          { icon: Building, label: 'Owner Space', role: 'owner' },
          { icon: Wrench, label: 'Services', role: 'provider' },
          { icon: Shield, label: 'Admin Panel', role: 'admin' }
        ].map((btn, i) => (
          <button 
            id={`mobile-btn-${btn.role}`}
            key={i}
            onClick={() => setCurrentRole(btn.role as Role)}
            className={`flex flex-col items-center justify-center p-1 font-medium transition-all ${currentRole === btn.role ? 'text-teal-600 font-extrabold scale-105' : 'text-slate-400 hover:text-slate-600'}`}
          >
            <btn.icon className="w-5 h-5" />
            <span className="text-[9px] mt-0.5">{btn.label}</span>
          </button>
        ))}
      </footer>

    </div>
  );
}
