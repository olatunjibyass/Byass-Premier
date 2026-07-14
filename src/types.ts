/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Service {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  icon: string;
  category: 'clinical' | 'daily-living' | 'specialized';
  benefits: string[];
  typicalPlan: string;
  whoWeServe?: string[];
  whyChoose?: string[];
  referralTypes?: string[];
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'General' | 'Services' | 'Caregivers' | 'Costs & Insurance' | 'Scheduling';
}

export interface Testimonial {
  id: string;
  author: string;
  relationship: string; // e.g., "Daughter of client", "Client", "Caregiver with 3 years service"
  quote: string;
  rating: number;
  type: 'client' | 'caregiver';
  image?: string;
}

export interface Job {
  id: string;
  title: string;
  department: string;
  type: 'Full-time' | 'Part-time' | 'PRN' | 'Live-In';
  location: string;
  shortDescription: string;
  requirements: string[];
  benefits: string[];
}

export interface Booking {
  id: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  preferredDate: string;
  preferredTime: string;
  careType: string;
  notes: string;
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface JobApplication {
  id: string;
  jobId: string;
  jobTitle: string;
  applicantName: string;
  applicantEmail: string;
  applicantPhone: string;
  qualifications: string[];
  resumeName: string;
  coverLetter?: string;
  status: 'Received' | 'Reviewed' | 'Interview' | 'Hired' | 'Declined';
  createdAt: string;
}

export interface Inquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  status: 'New' | 'Responded' | 'Archived';
  createdAt: string;
}

export type PageView =
  | 'home'
  | 'about'
  | 'services'
  | 'careers'
  | 'testimonials'
  | 'faq'
  | 'contact'
  | 'portal'
  | 'training';
