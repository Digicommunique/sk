/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Property, Lead, ChatSession, UserAccount, ServiceProviderItem, ServiceLead, SupportTicket } from './types';

export const INITIAL_PROPERTIES: Property[] = [
  {
    id: 'prop-1',
    title: 'Skyline Heights Premium 3 BHK',
    type: 'residential',
    transaction: 'sell',
    category: 'Apartment',
    price: 18500000, // 1.85 Cr INR
    negotiable: true,
    maintenanceCharges: 4500,
    bookingAmount: 1000000,
    city: 'Mumbai',
    locality: 'Bandra West',
    state: 'Maharashtra',
    landmark: 'Near Carter Road Promenade',
    coordinates: { lat: 19.0607, lng: 72.8258 },
    builtUpArea: 1650,
    carpetArea: 1400,
    furnishing: 'Fully Furnished',
    bedrooms: 3,
    bathrooms: 3,
    balconies: 2,
    parking: 'Covered',
    facing: 'West (Sea Facing)',
    floorNumber: 12,
    totalFloors: 24,
    ageOfProperty: 2,
    status: 'Ready to Move',
    amenities: ['Swimming Pool', 'Gym', 'Clubhouse', 'Power Backup', '24x7 Security', 'Lift', 'Kids Play Area'],
    images: [
      'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=60'
    ],
    videoTour: 'https://www.w3schools.com/html/mov_bbb.mp4',
    floorPlan: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&auto=format&fit=crop&q=60',
    ownerId: 'user-owner-1',
    ownerName: 'Vikram Malhotra',
    ownerPhone: '+91 98765 43210',
    ownerType: 'Broker',
    verificationStatus: 'Approved',
    isFeatured: true,
    verifiedBadge: true,
    views: 482,
    leadsCount: 14,
    ownershipDoc: 'deed_skyline_heights_1204.pdf',
    verificationIdDoc: 'pan_vikram_malhotra.png'
  },
  {
    id: 'prop-2',
    title: 'Emerald Green Luxury 4BHK Villa',
    type: 'residential',
    transaction: 'sell',
    category: 'Villa',
    price: 42000000, // 4.2 Cr INR
    negotiable: false,
    maintenanceCharges: 8000,
    bookingAmount: 2500000,
    city: 'Bangalore',
    locality: 'Whitefield',
    state: 'Karnataka',
    landmark: 'Behind ITPL Tech Park',
    coordinates: { lat: 12.9698, lng: 77.7500 },
    builtUpArea: 4200,
    carpetArea: 3800,
    furnishing: 'Semi-Furnished',
    bedrooms: 4,
    bathrooms: 5,
    balconies: 3,
    parking: 'Covered',
    facing: 'East',
    floorNumber: 0,
    totalFloors: 2,
    ageOfProperty: 1,
    status: 'Ready to Move',
    amenities: ['Swimming Pool', 'Gym', 'Clubhouse', 'Private Garden', 'Power Backup', '24x7 Security', 'Water Softener'],
    images: [
      'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&auto=format&fit=crop&q=60'
    ],
    videoTour: 'https://www.w3schools.com/html/mov_bbb.mp4',
    floorPlan: 'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&auto=format&fit=crop&q=60',
    ownerId: 'user-owner-2',
    ownerName: 'Ananya Sharma',
    ownerPhone: '+91 99112 23344',
    ownerType: 'Owner',
    verificationStatus: 'Approved',
    isFeatured: true,
    verifiedBadge: true,
    views: 730,
    leadsCount: 22,
    ownershipDoc: 'registry_emerald_green_34.pdf',
    verificationIdDoc: 'aadhaar_ananya_sharma.pdf'
  },
  {
    id: 'prop-3',
    title: 'Modern Corporate Co-Working Space',
    type: 'commercial',
    transaction: 'lease',
    category: 'Office',
    price: 180000, // 1.8 Lakhs/Month INR
    negotiable: true,
    maintenanceCharges: 15000,
    bookingAmount: 540000,
    city: 'Delhi',
    locality: 'Connaught Place',
    state: 'Delhi NCR',
    landmark: 'Adjacent to Rajiv Chowk Metro Station',
    coordinates: { lat: 28.6304, lng: 77.2177 },
    builtUpArea: 2500,
    carpetArea: 2100,
    furnishing: 'Fully Furnished',
    bedrooms: 0,
    bathrooms: 2,
    balconies: 0,
    parking: 'Covered',
    facing: 'North',
    floorNumber: 3,
    totalFloors: 8,
    ageOfProperty: 4,
    status: 'Ready to Move',
    amenities: ['Power Backup', '24x7 Security', 'Lift', 'Serviced Cafeteria', 'Conference Rooms', 'High-Speed Internet'],
    images: [
      'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&auto=format&fit=crop&q=60'
    ],
    videoTour: '',
    floorPlan: '',
    ownerId: 'user-owner-3',
    ownerName: 'TechVeda Spaces Ltd.',
    ownerPhone: '+91 11 4321 0987',
    ownerType: 'Builder',
    verificationStatus: 'Approved',
    isFeatured: false,
    verifiedBadge: true,
    views: 290,
    leadsCount: 8,
    ownershipDoc: 'occupancy_certificate_cp_3.pdf',
    verificationIdDoc: 'gstin_techveda.pdf'
  },
  {
    id: 'prop-4',
    title: 'Cozy Smart 1 BHK Near Sector 62',
    type: 'residential',
    transaction: 'rent',
    category: 'Apartment',
    price: 25000, // 25,000 / month INR
    negotiable: true,
    maintenanceCharges: 1500,
    bookingAmount: 50000,
    city: 'Noida',
    locality: 'Sector 62',
    state: 'Uttar Pradesh',
    landmark: 'Near Fortis Hospital',
    coordinates: { lat: 28.6258, lng: 77.3734 },
    builtUpArea: 650,
    carpetArea: 550,
    furnishing: 'Semi-Furnished',
    bedrooms: 1,
    bathrooms: 1,
    balconies: 1,
    parking: 'Open',
    facing: 'North-East',
    floorNumber: 5,
    totalFloors: 14,
    ageOfProperty: 3,
    status: 'Ready to Move',
    amenities: ['Power Backup', '24x7 Security', 'Lift', 'Gym', 'Jogging Track'],
    images: [
      'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&auto=format&fit=crop&q=60'
    ],
    videoTour: '',
    floorPlan: '',
    ownerId: 'user-owner-1',
    ownerName: 'Vikram Malhotra',
    ownerPhone: '+91 98765 43210',
    ownerType: 'Broker',
    verificationStatus: 'Approved',
    isFeatured: false,
    verifiedBadge: false,
    views: 195,
    leadsCount: 4,
    ownershipDoc: '',
    verificationIdDoc: ''
  },
  {
    id: 'prop-5',
    title: 'Prime Retail Showroom on Main Road',
    type: 'commercial',
    transaction: 'rent',
    category: 'Shop',
    price: 110000, // 1.1 Lakhs/Month INR
    negotiable: true,
    maintenanceCharges: 5000,
    bookingAmount: 330000,
    city: 'Pune',
    locality: 'Koregaon Park',
    state: 'Maharashtra',
    landmark: 'Opposite German Bakery Lanes',
    coordinates: { lat: 18.5362, lng: 73.8930 },
    builtUpArea: 1200,
    carpetArea: 1050,
    furnishing: 'Unfurnished',
    bedrooms: 0,
    bathrooms: 1,
    balconies: 0,
    parking: 'Open',
    facing: 'South',
    floorNumber: 1,
    totalFloors: 4,
    ageOfProperty: 5,
    status: 'Ready to Move',
    amenities: ['24x7 Security', 'Power Backup', 'Water Storage', 'Visitor Parking'],
    images: [
      'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&auto=format&fit=crop&q=60'
    ],
    videoTour: '',
    floorPlan: '',
    ownerId: 'user-owner-4',
    ownerName: 'Rajesh Sanghavi',
    ownerPhone: '+91 88990 01122',
    ownerType: 'Owner',
    verificationStatus: 'Approved',
    isFeatured: false,
    verifiedBadge: true,
    views: 122,
    leadsCount: 2,
    ownershipDoc: '',
    verificationIdDoc: ''
  },
  {
    id: 'prop-6',
    title: 'Modern Logistic Warehouse Space',
    type: 'commercial',
    transaction: 'lease',
    category: 'Warehouse',
    price: 320000, // 3.2 Lakhs/Month
    negotiable: true,
    maintenanceCharges: 20000,
    bookingAmount: 1000000,
    city: 'Bangalore',
    locality: 'Peenya Industrial Area',
    state: 'Karnataka',
    landmark: 'Near Peenya Metro Depot',
    coordinates: { lat: 13.0298, lng: 77.5255 },
    builtUpArea: 12000,
    carpetArea: 11500,
    furnishing: 'Unfurnished',
    bedrooms: 0,
    bathrooms: 4,
    balconies: 0,
    parking: 'Covered',
    facing: 'East',
    floorNumber: 1,
    totalFloors: 1,
    ageOfProperty: 6,
    status: 'Ready to Move',
    amenities: ['Power Backup', '24x7 Security', 'Fire Fighting Systems', 'Loading Dock', 'Heavy Vehicles Parking'],
    images: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&auto=format&fit=crop&q=60',
      'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&auto=format&fit=crop&q=60'
    ],
    videoTour: '',
    floorPlan: '',
    ownerId: 'user-owner-5',
    ownerName: 'AeroGroup Logistics',
    ownerPhone: '+91 80 2345 6789',
    ownerType: 'Builder',
    verificationStatus: 'Pending',
    isFeatured: false,
    verifiedBadge: false,
    views: 38,
    leadsCount: 0,
    ownershipDoc: 'industrial_lease_deed.pdf',
    verificationIdDoc: 'co_incorporation_aerogroup.pdf'
  }
];

export const INITIAL_LEADS: Lead[] = [
  {
    id: 'lead-1',
    propertyId: 'prop-1',
    propertyTitle: 'Skyline Heights Premium 3 BHK',
    customerName: 'Rahul Mehra',
    customerEmail: 'rahul.mehra@gmail.com',
    customerPhone: '+91 91234 56789',
    message: 'I am highly interested in Skyline Heights. I would like to schedule a site visit this coming Sunday.',
    date: '2026-05-28',
    status: 'New',
    siteVisitDate: '2026-06-01',
    siteVisitTime: '11:00 AM'
  },
  {
    id: 'lead-2',
    propertyId: 'prop-2',
    propertyTitle: 'Emerald Green Luxury 4BHK Villa',
    customerName: 'Sanjay Deshmukh',
    customerEmail: 'sdeshmukh@rediffmail.com',
    customerPhone: '+91 93456 78901',
    message: 'Can you confirm if there is water stagnation during monsoons? Also send structural drawings.',
    date: '2026-05-29',
    status: 'Contacted',
  },
  {
    id: 'lead-3',
    propertyId: 'prop-1',
    propertyTitle: 'Skyline Heights Premium 3 BHK',
    customerName: 'Priyal Sen',
    customerEmail: 'priyal.sen@outlook.com',
    customerPhone: '+91 92345 67890',
    message: 'Is the price negotiable? I have a booking amount ready to secure this property.',
    date: '2026-05-29',
    status: 'New',
    siteVisitDate: '2026-05-31',
    siteVisitTime: '04:30 PM'
  },
  {
    id: 'lead-4',
    propertyId: 'prop-3',
    propertyTitle: 'Modern Corporate Co-Working Space',
    customerName: 'Siddharth Roy',
    customerEmail: 'siddharth@nexgensoft.com',
    customerPhone: '+91 94567 89012',
    message: 'Requesting layout map and power grid capability for a 40-seat workforce.',
    date: '2026-05-27',
    status: 'Closed'
  }
];

export const INITIAL_SERVICE_PROVIDERS: ServiceProviderItem[] = [
  {
    id: 'prov-1',
    name: 'Suresh Kumar (Noida Brokerage)',
    category: 'Brokerage',
    priceRange: '1% - 2% Commission',
    rating: 4.8,
    reviewsCount: 124,
    experienceYears: 12,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=60',
    phone: '+91 98123 45678',
    email: 'suresh.noidabroker@gmail.com',
    completedTasks: 450
  },
  {
    id: 'prov-2',
    name: 'Signature Habitat Interiors',
    category: 'Interior Design',
    priceRange: '₹350/sq.ft onwards',
    rating: 4.9,
    reviewsCount: 88,
    experienceYears: 8,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=60',
    phone: '+91 99334 45566',
    email: 'contact@signaturehabitat.in',
    completedTasks: 120
  },
  {
    id: 'prov-3',
    name: 'Safemove Packers & Movers',
    category: 'Packers & Movers',
    priceRange: '₹4,500 Base Rate',
    rating: 4.6,
    reviewsCount: 205,
    experienceYears: 10,
    avatar: 'https://images.unsplash.com/photo-1628157582853-a796fa650a6a?w=150&auto=format&fit=crop&q=60',
    phone: '+91 98888 77777',
    email: 'bookings@safemove.com',
    completedTasks: 840
  },
  {
    id: 'prov-4',
    name: 'EasyHome Mortgages & Loans',
    category: 'Home Loans',
    priceRange: 'Interest starting at 8.4% p.a.',
    rating: 4.7,
    reviewsCount: 64,
    experienceYears: 15,
    avatar: 'https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=150&auto=format&fit=crop&q=60',
    phone: '+91 1800 120 4455',
    email: 'advisories@easyhomeloans.co.in',
    completedTasks: 310
  }
];

export const INITIAL_SERVICE_LEADS: ServiceLead[] = [
  {
    id: 'slead-1',
    serviceCategory: 'Interior Design',
    customerName: 'Kamesh Chawla',
    phone: '+91 90123 45678',
    email: 'kamesh@vsnl.net',
    details: 'Need modular kitchen and living room cabinets designed for my newly bought 3BHK flat.',
    status: 'Hot',
    date: '2026-05-29',
    budget: '₹3,00,000'
  },
  {
    id: 'slead-2',
    serviceCategory: 'Packers & Movers',
    customerName: 'Deepa Krishnan',
    phone: '+91 99887 76655',
    email: 'deepa_k@gmail.com',
    details: 'Moving home household goods from Whitefield to Indiranagar (Bangalore). Require full packing.',
    status: 'Warm',
    date: '2026-05-29',
    budget: '₹8,500'
  },
  {
    id: 'slead-3',
    serviceCategory: 'Home Loans',
    customerName: 'Amit Saxena',
    phone: '+91 94440 12345',
    email: 'amit.sax@gmail.com',
    details: 'Requires self-employed loan of ₹85 Lakhs. Income documents are fully audited.',
    status: 'Cold',
    date: '2026-05-26',
    budget: '₹85,00,000'
  }
];

export const INITIAL_USER_ACCOUNTS: UserAccount[] = [
  {
    id: 'user-buyer-1',
    name: 'Rohan Joshi',
    email: 'rohan.joshi@gmail.com',
    role: 'buyer',
    phone: '+91 97766 55443',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=60',
    status: 'Active',
    kycStatus: 'Verified',
    kycDocumentType: 'PAN Card',
    kycDocumentName: 'pan_rohan_j.pdf'
  },
  {
    id: 'user-owner-1',
    name: 'Vikram Malhotra',
    email: 'vikram.malhotra@gmail.com',
    role: 'owner',
    phone: '+91 98765 43210',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60',
    status: 'Active',
    kycStatus: 'Verified',
    kycDocumentType: 'PAN Card',
    kycDocumentName: 'pan_vikram_m.png'
  },
  {
    id: 'user-owner-2',
    name: 'Ananya Sharma',
    email: 'ananya.sharma@gmail.com',
    role: 'owner',
    phone: '+91 99112 23344',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60',
    status: 'Active',
    kycStatus: 'Verified',
    kycDocumentType: 'Aadhaar Card',
    kycDocumentName: 'aadhaar_ananya.pdf'
  },
  {
    id: 'user-provider-1',
    name: 'Signature Habitat Interiors',
    email: 'contact@signaturehabitat.in',
    role: 'provider',
    phone: '+91 99334 45566',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=60',
    status: 'Active',
    kycStatus: 'Verified',
    kycDocumentType: 'GSTIN License',
    kycDocumentName: 'gstin_signature_habitat.pdf'
  },
  {
    id: 'user-owner-6',
    name: 'Devender Grover',
    email: 'grover_dev@yahoo.com',
    role: 'owner',
    phone: '+91 90001 02030',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=60',
    status: 'Pending Approval',
    kycStatus: 'Pending',
    kycDocumentType: 'Aadhaar Card',
    kycDocumentName: 'aadhaar_d_grover.jpg'
  },
  {
    id: 'user-owner-fraud',
    name: 'Fake Lister Prankster',
    email: 'spammer_99@gmail.com',
    role: 'owner',
    phone: '+91 80000 11111',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=60',
    status: 'Banned',
    kycStatus: 'Unverified'
  }
];

export const INITIAL_CHAT_SESSIONS: ChatSession[] = [
  {
    id: 'chat-1',
    participantName: 'Vikram Malhotra (Broker)',
    participantRole: 'Broker / Owner',
    participantAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&auto=format&fit=crop&q=60',
    lastMessage: 'Good morning! The 3BHK penthouse is open for visits this Sunday. Does 2 PM work for you?',
    unreadCount: 1,
    messages: [
      { id: '1', sender: 'buyer', senderName: 'You', text: 'Hi Vikram, I saw your Skyline Heights listing. Can I view it on Sunday?', timestamp: 'May 28, 10:15 AM' },
      { id: '2', sender: 'owner', senderName: 'Vikram Malhotra', text: 'Yes! It is fully ready to move and vacant.', timestamp: 'May 28, 11:32 AM' },
      { id: '3', sender: 'owner', senderName: 'Vikram Malhotra', text: 'Good morning! The 3BHK penthouse is open for visits this Sunday. Does 2 PM work for you?', timestamp: 'May 30, 08:00 AM' }
    ]
  },
  {
    id: 'chat-2',
    participantName: 'Ananya Sharma (Owner)',
    participantRole: 'Owner',
    participantAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=60',
    lastMessage: 'Sure, I will send you the registry document copy.',
    unreadCount: 0,
    messages: [
      { id: '1', sender: 'buyer', senderName: 'You', text: 'Hello, is the Emerald Green Villa priced at ₹4.2 Crore fully inclusive?', timestamp: 'May 29, 01:22 PM' },
      { id: '2', sender: 'owner', senderName: 'Ananya Sharma', text: 'Yes, except for registry and stamp duty charges.', timestamp: 'May 29, 02:40 PM' },
      { id: '3', sender: 'buyer', senderName: 'You', text: 'Can I check the title deed?', timestamp: 'May 29, 03:00 PM' },
      { id: '4', sender: 'owner', senderName: 'Ananya Sharma', text: 'Sure, I will send you the registry document copy.', timestamp: 'May 29, 03:15 PM' }
    ]
  },
  {
    id: 'chat-bot',
    participantName: 'Propex360 Assistant',
    participantRole: 'AI Virtual Advisor / FAQ Bot',
    participantAvatar: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=60By',
    lastMessage: 'Ask me anything about real estate stamp duty, home loans, and packing services!',
    unreadCount: 0,
    messages: [
      { id: '1', sender: 'bot', senderName: 'Propex360 Bot', text: 'Hello! I am your Propex360 assistant. Here are some FAQs you might want to ask: \n- How to calculate stamp duty?\n- What is the difference between carpet area and super area?\n- How can I post an ad?', timestamp: 'May 30, 04:45 AM' }
    ]
  }
];

export const INITIAL_TICKETS: SupportTicket[] = [
  {
    id: 'ticket-1',
    userEmail: 'devgrover@yahoo.com',
    subject: 'KYC Document verification delayed',
    message: 'Hello Support, I uploaded my Aadhaar details for account verification 3 days ago. It still says verification pending. Please resolve it so I can post my property.',
    status: 'Open',
    date: '2026-05-28'
  },
  {
    id: 'ticket-2',
    userEmail: 'spammer_99@gmail.com',
    subject: 'Account banned wrongfully',
    message: 'Why was my account banned? I am a genuine builder trying to list properties.',
    status: 'In Progress',
    date: '2026-05-29'
  }
];

export const BLOG_POSTS = [
  {
    id: 'blog-1',
    title: '5 Crucial Things to Check Before Signing a Rental Lease in Metro Cities',
    desc: 'Understanding maintenance riders, lock-in periods, security deposit return clauses, and structural checks.',
    tag: 'Renter Guide',
    readTime: '4 min read',
    author: 'Neha Deshta, Property Journalist'
  },
  {
    id: 'blog-2',
    title: 'Understanding carpet area vs built-up area vs super built-up area',
    desc: 'Avoid paying extra. Real estate developers often calculate properties differently. Here is the math decoded.',
    tag: 'Buyer Secrets',
    readTime: '6 min read',
    author: 'Amitabh Sen, Senior Architect'
  },
  {
    id: 'blog-3',
    title: 'Navigating the New ERA Standards for Real Estate Agents in 2026',
    desc: 'What the new state verification frameworks mean for brokerage compliance and customer safety.',
    tag: 'Agent Advisor',
    readTime: '8 min read',
    author: 'Ranjeet Singh, Legal Consultant'
  }
];

export const MARKETING_TEMPLATES = {
  sms: [
    { id: 'sms-1', name: 'Site Visit Scheduled Alert', template: 'Dear [Name], your site visit for [Property] has been booked for [Date] at [Time]. Please carry entry pass.' },
    { id: 'sms-2', name: 'New Lead notification', template: 'Hey [Agent], congratulations! A new hot lead from [Name] ([Phone]) has been received on your property [Property].' },
    { id: 'sms-3', name: 'Subscription renewed', template: 'Propex360 Alert: Your [Plan] has been successfully activated. You can now boost [BoostCount] listings!' }
  ],
  push: [
    { id: 'push-1', name: 'Price Drop Warning', title: 'Price drop alert!', body: 'A property on your saved list in [Locality] has dropped in price by [Discount]%.' },
    { id: 'push-2', name: 'Weekly Market trend', title: 'Pune Property Market on fire!', body: 'Koregaon Park property indices went up by 4.2% this quarter. Click to see the hot deals.' }
  ]
};
