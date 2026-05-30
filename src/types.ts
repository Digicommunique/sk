/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export type Role = 'buyer' | 'owner' | 'provider' | 'admin';

export type PropertyType = 'residential' | 'commercial';
export type TransactionType = 'sell' | 'rent' | 'lease';
export type PropertyCategory = 'Apartment' | 'Villa' | 'Plot' | 'Office' | 'Shop' | 'Warehouse' | 'Penthouse' | 'Builder Floor';
export type FurnishingStatus = 'Fully Furnished' | 'Semi-Furnished' | 'Unfurnished';
export type ConstructionStatus = 'Ready to Move' | 'Under Construction';

export interface Property {
  id: string;
  title: string;
  type: PropertyType;
  transaction: TransactionType;
  category: PropertyCategory;
  price: number;
  negotiable: boolean;
  maintenanceCharges?: number;
  bookingAmount?: number;
  
  // Location
  city: string;
  locality: string;
  state: string;
  landmark: string;
  coordinates: {
    lat: number;
    lng: number;
  };

  // Specs
  builtUpArea: number; // sqft
  carpetArea: number; // sqft
  furnishing: FurnishingStatus;
  bedrooms: number;
  bathrooms: number;
  balconies: number;
  parking: 'Covered' | 'Open' | 'None';
  facing: string;
  floorNumber: number;
  totalFloors: number;
  ageOfProperty: number; // years
  status: ConstructionStatus;
  possessionDate?: string;

  // Amenities
  amenities: string[];

  // Media
  images: string[];
  videoTour?: string;
  floorPlan?: string;

  // Verification & Owner Info
  ownerId: string;
  ownerName: string;
  ownerPhone: string;
  ownerType: 'Owner' | 'Broker' | 'Builder';
  verificationStatus: 'Pending' | 'Approved' | 'Live' | 'Rejected';
  isFeatured: boolean;
  verifiedBadge: boolean;
  views: number;
  leadsCount: number;

  // Documents
  ownershipDoc?: string;
  verificationIdDoc?: string;
}

export interface Lead {
  id: string;
  propertyId: string;
  propertyTitle: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  message: string;
  date: string;
  status: 'New' | 'Contacted' | 'Closed';
  siteVisitDate?: string;
  siteVisitTime?: string;
}

export interface ChatMessage {
  id: string;
  sender: 'buyer' | 'owner' | 'provider' | 'system' | 'bot';
  senderName: string;
  text: string;
  timestamp: string;
}

export interface ChatSession {
  id: string;
  participantName: string;
  participantRole: string;
  participantAvatar: string;
  lastMessage: string;
  unreadCount: number;
  messages: ChatMessage[];
}

export interface UserAccount {
  id: string;
  name: string;
  email: string;
  role: Role;
  phone: string;
  avatar: string;
  status: 'Active' | 'Banned' | 'Pending Approval';
  kycStatus: 'Verified' | 'Pending' | 'Unverified';
  kycDocumentType?: string;
  kycDocumentName?: string;
}

export interface ServiceProviderItem {
  id: string;
  name: string;
  category: 'Brokerage' | 'Interior Design' | 'Packers & Movers' | 'Home Loans' | 'Legal Advice';
  priceRange: string;
  rating: number;
  reviewsCount: number;
  experienceYears: number;
  avatar: string;
  phone: string;
  email: string;
  completedTasks: number;
}

export interface ServiceLead {
  id: string;
  serviceCategory: string;
  customerName: string;
  phone: string;
  email: string;
  details: string;
  status: 'Hot' | 'Warm' | 'Cold';
  date: string;
  budget?: string;
}

export interface SupportTicket {
  id: string;
  userEmail: string;
  subject: string;
  message: string;
  status: 'Open' | 'Resolved' | 'In Progress';
  date: string;
}
