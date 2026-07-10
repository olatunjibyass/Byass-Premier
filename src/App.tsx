/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Heart, 
  ShieldCheck, 
  Award, 
  Clock, 
  ArrowRight, 
  CheckCircle2, 
  ChevronRight, 
  Star, 
  HelpCircle, 
  Briefcase, 
  MapPin, 
  Phone, 
  Mail, 
  FileText, 
  Search, 
  User, 
  Filter, 
  AlertCircle, 
  X, 
  ExternalLink,
  ShieldAlert,
  GraduationCap,
  Calendar,
  Sparkles,
  HeartHandshake, 
  Smile, 
  Pill, 
  Coffee, 
  Brain, 
  Activity, 
  Home, 
  Bed, 
  Utensils, 
  Car
} from 'lucide-react';

import { PageView, Booking, JobApplication, Inquiry, Service, FAQ, Testimonial, Job } from './types';
import { 
  SERVICES, 
  FAQS, 
  TESTIMONIALS, 
  JOBS, 
  CORE_VALUES, 
  CARE_PROCESS_STEPS, 
  BENEFITS_WORKING_WITH_US 
} from './data';

// Component imports
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BookingForm from './components/BookingForm';
import CareersForm from './components/CareersForm';
import ContactForm from './components/ContactForm';
import InteractiveMap from './components/InteractiveMap';
import PortalDashboard from './components/PortalDashboard';

// Image paths from asset generation imported statically for production reliability
const IMAGE_HERO = 'https://i.postimg.cc/134yyr35/Capture.png';
const IMAGE_KITCHEN = 'https://i.postimg.cc/jSnB8gjp/Capture1.png';
const IMAGE_NURSE = 'https://images.unsplash.com/photo-1576765608535-5f04d1e3f289?auto=format&fit=crop&w=800&q=80';
const IMAGE_TEEJAY = 'https://i.postimg.cc/CFBc9rgg/Whats-App-Image-2026-07-09-at-5-59-35-PM.jpg';
const IMAGE_PRINCESS = 'https://i.postimg.cc/9VQ5DJm7/Whats-App-Image-2026-07-09-at-3-46-36-PM.jpg';

// Helper to resolve service icons
const getServiceIcon = (iconName: string, className = "w-6 h-6") => {
  switch (iconName) {
    case 'HeartHandshake': return <HeartHandshake className={className} />;
    case 'Smile': return <Smile className={className} />;
    case 'Pills': return <Pill className={className} />;
    case 'Coffee': return <Coffee className={className} />;
    case 'Brain': return <Brain className={className} />;
    case 'Activity': return <Activity className={className} />;
    case 'Home': return <Home className={className} />;
    case 'Bed': return <Bed className={className} />;
    case 'Utensils': return <Utensils className={className} />;
    case 'Car': return <Car className={className} />;
    default: return <Heart className={className} />;
  }
};

export default function App() {
  const [currentView, setView] = useState<PageView>('home');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Modals / Drawers state
  const [isQuickBookingOpen, setIsQuickBookingOpen] = useState(false);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedJobForApp, setSelectedJobForApp] = useState<Job | null>(null);
  
  // Footer terms modal
  const [activePrivacyModal, setActivePrivacyModal] = useState<{ title: string; content: string } | null>(null);

  // Core synchronized Local Storage datasets
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  // FAQ Category filter
  const [selectedFaqCat, setSelectedFaqCat] = useState<'All' | 'General' | 'Services' | 'Caregivers' | 'Costs & Insurance' | 'Scheduling'>('All');

  // Load initial data on mount
  useEffect(() => {
    const savedBookings = localStorage.getItem('byass_bookings');
    const savedApps = localStorage.getItem('byass_applications');
    const savedInquiries = localStorage.getItem('byass_inquiries');

    if (savedBookings) {
      setBookings(JSON.parse(savedBookings));
    } else {
      // Seed initial bookings for illustrative demonstration
      const initialBookings: Booking[] = [
        {
          id: 'book-001',
          clientName: 'Arthur Pendleton',
          clientEmail: 'arthur.p@outlook.com',
          clientPhone: '(555) 482-9011',
          preferredDate: '2026-07-15',
          preferredTime: 'Morning (8:00 AM - 12:00 PM)',
          careType: 'Respite Care (for Spouse)',
          notes: 'My wife has mild mobility issues. Need a trustworthy companion to stay for 4 hours while I run errands.',
          status: 'Pending',
          createdAt: new Date(Date.now() - 4 * 3600 * 1000).toISOString()
        },
        {
          id: 'book-002',
          clientName: 'Beatrice Higgins',
          clientEmail: 'b.higgins@gmail.com',
          clientPhone: '(555) 309-8871',
          preferredDate: '2026-07-12',
          preferredTime: 'Midday (12:00 PM - 4:00 PM)',
          careType: 'Companion Care (for Parent)',
          notes: 'Mother is lonely and loves gardens. Looking for someone to converse with her and play scrabble twice a week.',
          status: 'Confirmed',
          createdAt: new Date(Date.now() - 24 * 3600 * 1000).toISOString()
        }
      ];
      setBookings(initialBookings);
      localStorage.setItem('byass_bookings', JSON.stringify(initialBookings));
    }

    if (savedApps) {
      setApplications(JSON.parse(savedApps));
    } else {
      const initialApps: JobApplication[] = [
        {
          id: 'app-001',
          jobId: 'j-1',
          jobTitle: 'Certified Nursing Assistant (CNA) / Home Health Aide (HHA)',
          applicantName: 'Clara Oswald',
          applicantEmail: 'clara.oswald@gmail.com',
          applicantPhone: '(555) 782-1100',
          qualifications: [
            'Valid State Certified Nursing Assistant (CNA) / Home Health Aide (HHA) License',
            'Active CPR and First Aid Certified'
          ],
          resumeName: 'Clara_Oswald_CNA_Resume.pdf',
          coverLetter: 'I have worked in elder nursing homes for 3 years but prefer private duty home care. I love establishing long-term trust with my clients.',
          status: 'Reviewed',
          createdAt: new Date(Date.now() - 12 * 3600 * 1000).toISOString()
        }
      ];
      setApplications(initialApps);
      localStorage.setItem('byass_applications', JSON.stringify(initialApps));
    }

    if (savedInquiries) {
      setInquiries(JSON.parse(savedInquiries));
    } else {
      const initialInquiries: Inquiry[] = [
        {
          id: 'inq-001',
          name: 'Dr. James Vance',
          email: 'j.vance@metrohealth.org',
          phone: '(555) 902-1212',
          subject: 'Partnership & Referrals request',
          message: 'Hello, I am the lead orthopedic surgeon at Metro General. We discharge 20+ seniors monthly who need transitional care. I would love to schedule an introductory compliance partnership meeting.',
          status: 'New',
          createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString()
        }
      ];
      setInquiries(initialInquiries);
      localStorage.setItem('byass_inquiries', JSON.stringify(initialInquiries));
    }
  }, []);

  // Update states and synchronize with local storage helper
  const addBooking = (newBooking: Booking) => {
    const updated = [newBooking, ...bookings];
    setBookings(updated);
    localStorage.setItem('byass_bookings', JSON.stringify(updated));
  };

  const addApplication = (newApp: JobApplication) => {
    const updated = [newApp, ...applications];
    setApplications(updated);
    localStorage.setItem('byass_applications', JSON.stringify(updated));
  };

  const addInquiry = (newInq: Inquiry) => {
    const updated = [newInq, ...inquiries];
    setInquiries(updated);
    localStorage.setItem('byass_inquiries', JSON.stringify(updated));
  };

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    const updated = bookings.map(b => b.id === id ? { ...b, status } : b);
    setBookings(updated);
    localStorage.setItem('byass_bookings', JSON.stringify(updated));
  };

  const updateAppStatus = (id: string, status: JobApplication['status']) => {
    const updated = applications.map(a => a.id === id ? { ...a, status } : a);
    setApplications(updated);
    localStorage.setItem('byass_applications', JSON.stringify(updated));
  };

  const updateInquiryStatus = (id: string, status: Inquiry['status']) => {
    const updated = inquiries.map(i => i.id === id ? { ...i, status } : i);
    setInquiries(updated);
    localStorage.setItem('byass_inquiries', JSON.stringify(updated));
  };

  const deleteBooking = (id: string) => {
    const updated = bookings.filter(b => b.id !== id);
    setBookings(updated);
    localStorage.setItem('byass_bookings', JSON.stringify(updated));
  };

  const deleteApplication = (id: string) => {
    const updated = applications.filter(a => a.id !== id);
    setApplications(updated);
    localStorage.setItem('byass_applications', JSON.stringify(updated));
  };

  const deleteInquiry = (id: string) => {
    const updated = inquiries.filter(i => i.id !== id);
    setInquiries(updated);
    localStorage.setItem('byass_inquiries', JSON.stringify(updated));
  };

  // Search filter lists
  const filteredServices = SERVICES.filter(s => 
    s.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    s.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.fullDescription.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredFaqs = FAQS.filter(f => 
    (selectedFaqCat === 'All' || f.category === selectedFaqCat) &&
    (f.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
     f.answer.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const filteredJobs = JOBS.filter(j => 
    j.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    j.shortDescription.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="flex flex-col min-h-screen bg-brand-cream-50/20 selection:bg-brand-blue-100 selection:text-brand-blue-900">
      
      {/* Dynamic Header */}
      <Navbar 
        currentView={currentView} 
        setView={(view) => { setView(view); setSearchQuery(''); }}
        onSearch={(query) => setSearchQuery(query)}
        onOpenQuickBooking={() => setIsQuickBookingOpen(true)}
      />

      {/* Main Content Area with Animated Route Views */}
      <main className="flex-grow">
        
        {/* Real-time Global Search Overlay View */}
        {searchQuery.trim() !== '' ? (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 fade-in">
            <div className="flex items-center justify-between border-b border-gray-200 pb-4 mb-8">
              <div>
                <h1 className="font-display font-bold text-3xl text-brand-blue-950">
                  Search Results
                </h1>
                <p className="text-xs text-gray-500 mt-1">
                  Showing matches for &quot;<span className="font-bold text-brand-blue-600">{searchQuery}</span>&quot; across our entire clinical portal
                </p>
              </div>
              <button 
                onClick={() => setSearchQuery('')}
                className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 hover:text-brand-blue-600 bg-white border border-gray-200 px-3.5 py-1.5 rounded-xl transition-all"
              >
                <X className="w-4 h-4" />
                <span>Clear Search</span>
              </button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Matching Services */}
              <div className="lg:col-span-2 space-y-6">
                <h3 className="font-display font-bold text-base text-brand-blue-950 uppercase tracking-wider flex items-center gap-2">
                  <Heart className="w-5 h-5 text-brand-blue-600 fill-brand-blue-50" />
                  <span>Matching Home Care Programs ({filteredServices.length})</span>
                </h3>
                
                {filteredServices.length === 0 ? (
                  <p className="text-sm text-gray-400 bg-white p-6 rounded-2xl border border-gray-100">No care programs match your query.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {filteredServices.map(s => (
                      <div key={s.id} className="bg-white border border-gray-100 p-5 rounded-2xl shadow-xs hover:shadow-md transition-shadow">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="bg-brand-blue-50 text-brand-blue-600 p-2 rounded-xl">
                            {getServiceIcon(s.icon, "w-5 h-5")}
                          </div>
                          <h4 className="font-display font-bold text-sm text-brand-blue-950">{s.title}</h4>
                        </div>
                        <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{s.shortDescription}</p>
                        <button
                          onClick={() => setSelectedService(s)}
                          className="mt-4 text-xs font-semibold text-brand-blue-600 hover:text-brand-blue-700 flex items-center gap-1 cursor-pointer"
                        >
                          <span>Detailed Benefits</span>
                          <ArrowRight className="w-3 h-3" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                {/* Matching Job Positions */}
                <h3 className="font-display font-bold text-base text-brand-blue-950 uppercase tracking-wider flex items-center gap-2 pt-4">
                  <Briefcase className="w-5 h-5 text-brand-sage-600" />
                  <span>Matching Careers & Opportunities ({filteredJobs.length})</span>
                </h3>

                {filteredJobs.length === 0 ? (
                  <p className="text-sm text-gray-400 bg-white p-6 rounded-2xl border border-gray-100">No active job listings match your query.</p>
                ) : (
                  <div className="space-y-4">
                    {filteredJobs.map(j => (
                      <div key={j.id} className="bg-white border border-gray-100 p-5 rounded-2xl shadow-xs flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div>
                          <span className="text-[10px] bg-brand-blue-50 text-brand-blue-700 font-bold px-2 py-0.5 rounded-full">{j.type}</span>
                          <h4 className="font-display font-bold text-sm text-brand-blue-950 mt-1.5">{j.title}</h4>
                          <p className="text-xs text-gray-500 mt-1">{j.shortDescription}</p>
                        </div>
                        <button
                          onClick={() => setView('careers')}
                          className="bg-brand-blue-600 hover:bg-brand-blue-700 text-white text-xs font-semibold px-4 py-2 rounded-xl transition-all shadow-xs"
                        >
                          View Criteria
                        </button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Matching FAQs */}
              <div className="space-y-4">
                <h3 className="font-display font-bold text-base text-brand-blue-950 uppercase tracking-wider flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-purple-600" />
                  <span>Matching Help Guides ({filteredFaqs.length})</span>
                </h3>

                {filteredFaqs.length === 0 ? (
                  <p className="text-sm text-gray-400 bg-white p-6 rounded-2xl border border-gray-100">No help articles found.</p>
                ) : (
                  <div className="space-y-3">
                    {filteredFaqs.map(f => (
                      <div key={f.id} className="bg-white p-4.5 rounded-2xl border border-gray-100 shadow-xs">
                        <span className="text-[9px] uppercase font-bold tracking-wider text-purple-600 block mb-1">{f.category}</span>
                        <h4 className="font-bold text-xs text-brand-blue-950 leading-snug">{f.question}</h4>
                        <p className="text-xs text-gray-500 mt-2 leading-relaxed">{f.answer}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ) : (
          <AnimatePresence mode="wait">
            
            {/* VIEW 1: HOME PAGE */}
            {currentView === 'home' && (
              <motion.div
                key="home"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="space-y-12 pb-12"
              >
                {/* 1. Hero Section */}
                <section className="relative bg-gradient-to-r from-brand-blue-950 to-brand-blue-900 text-white overflow-hidden py-10 lg:py-14">
                  {/* Background overlay design */}
                  <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#38bdf8_1px,transparent_1px)] [background-size:16px_16px]" />
                  
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="space-y-6">
                      <div className="inline-flex items-center gap-2 px-3.5 py-1.5 bg-brand-blue-800/80 border border-brand-blue-700 rounded-full text-xs font-semibold text-brand-blue-200 uppercase tracking-wider">
                        <Award className="w-4 h-4 text-brand-sage-500 fill-brand-sage-500" />
                        <span>The Gold Standard in In-Home Caregiving</span>
                      </div>
                      
                      <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight text-white leading-[1.08]">
                        Compassionate Care. <br />
                        <span className="text-brand-blue-300">Professional Support.</span> <br />
                        Right at Home.
                      </h1>
                      
                      <p className="text-sm sm:text-base text-brand-blue-100 max-w-lg leading-relaxed">
                        Providing personalized, licensed home healthcare services that promote independence, safety, and comfort. We give families absolute peace of mind.
                      </p>

                      <div className="flex flex-col sm:flex-row gap-3 pt-2">
                        <a
                          href="tel:+16142963599"
                          className="bg-brand-blue-500 hover:bg-brand-blue-400 text-white font-bold text-sm px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-brand-blue-500/20 text-center inline-flex items-center justify-center gap-2"
                        >
                          <Phone className="w-4 h-4" />
                          <span>Request Care: (614) 296-3599</span>
                        </a>
                      </div>

                      {/* Client metrics strip */}
                      <div className="grid grid-cols-3 gap-4 pt-6 border-t border-brand-blue-800 text-center sm:text-left">
                        <div>
                          <span className="block text-2xl font-extrabold text-white">99.4%</span>
                          <span className="text-[10px] uppercase font-semibold text-brand-blue-300 tracking-wider">Client Trust Rate</span>
                        </div>
                        <div>
                          <span className="block text-2xl font-extrabold text-white">100%</span>
                          <span className="text-[10px] uppercase font-semibold text-brand-blue-300 tracking-wider">Licensed & Bonded</span>
                        </div>
                        <div>
                          <span className="block text-2xl font-extrabold text-white">24/7</span>
                          <span className="text-[10px] uppercase font-semibold text-brand-blue-300 tracking-wider">Nurse Availability</span>
                        </div>
                      </div>
                    </div>

                    {/* Hero Image frame */}
                    <div className="relative justify-self-center lg:justify-self-end w-full max-w-lg">
                      <div className="absolute -inset-1.5 bg-gradient-to-r from-brand-blue-500 to-brand-sage-500 rounded-3xl blur-md opacity-30" />
                      <div className="relative bg-slate-900 rounded-2xl overflow-hidden shadow-2xl aspect-[16/10]">
                        <img 
                          src={IMAGE_HERO} 
                          alt="Compassionate nurse caregiver smiling with an elderly grandfather" 
                          className="w-full h-full object-cover select-none"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                      
                      {/* Interactive Float element */}
                      <div className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl border border-gray-100 shadow-xl flex items-center gap-3 max-w-[240px] hidden sm:flex">
                        <div className="bg-brand-sage-50 text-brand-sage-600 p-2.5 rounded-lg">
                          <ShieldCheck className="w-5 h-5" />
                        </div>
                        <div>
                          <span className="text-[10px] text-gray-400 uppercase font-bold block">Background Checked</span>
                          <span className="font-display font-bold text-xs text-brand-blue-950">100% FBI Cleared Staff</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 2. About Us Sneak Peek */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    <div className="relative">
                      <div className="bg-brand-blue-50 rounded-3xl absolute inset-0 transform -rotate-2 scale-102 -z-10" />
                      <div className="relative bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-lg aspect-[4/3]">
                        <img 
                          src={IMAGE_KITCHEN} 
                          alt="Caregiver and senior preparing meals smiling together" 
                          className="w-full h-full object-cover"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    </div>

                    <div className="space-y-4">
                      <span className="text-xs font-bold uppercase text-brand-blue-600 tracking-widest block">
                        Our Healthcare Philosophy
                      </span>
                      <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-blue-950 tracking-tight">
                        Compassionate In-Home Care Designed for Independence
                      </h2>
                      <p className="text-sm text-gray-500 leading-relaxed">
                        At Byass Premier Health Care, we believe that healthcare is personal. We deliver certified, licensed home healthcare assistance tailored to each individual\'s unique clinical, physical, and cognitive routines. 
                      </p>
                      
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex gap-2.5">
                          <CheckCircle2 className="w-5 h-5 text-brand-sage-600 shrink-0" />
                          <div>
                            <span className="font-bold text-xs text-brand-blue-950 block">Our Core Mission</span>
                            <span className="text-[11px] text-gray-400 block mt-0.5">Enabling clients to maintain dignity, comfort, and security at home.</span>
                          </div>
                        </div>
                        <div className="flex gap-2.5">
                          <CheckCircle2 className="w-5 h-5 text-brand-sage-600 shrink-0" />
                          <div>
                            <span className="font-bold text-xs text-brand-blue-950 block">Experienced Caregivers</span>
                            <span className="text-[11px] text-gray-400 block mt-0.5">Continuous clinical training overseen by state registered nurses.</span>
                          </div>
                        </div>
                      </div>

                      <div className="pt-4 flex gap-4">
                        <button 
                          onClick={() => setView('about')} 
                          className="bg-brand-blue-600 hover:bg-brand-blue-700 text-white font-semibold text-xs px-5 py-3 rounded-xl transition-colors shadow-md shadow-brand-blue-200"
                        >
                          Our Full Story
                        </button>
                        <button 
                          onClick={() => setView('services')} 
                          className="text-brand-blue-600 hover:text-brand-blue-700 font-semibold text-xs py-3 px-1 flex items-center gap-1 cursor-pointer"
                        >
                          <span>Explore Specialty Programs</span>
                          <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </section>

                {/* 3. Our Services Preview */}
                <section className="bg-brand-cream-50/50 py-10 border-y border-brand-cream-100">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-2xl mx-auto mb-8">
                      <span className="text-xs font-bold uppercase text-brand-blue-600 tracking-widest">
                        Clinical & Companion Services
                      </span>
                      <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-blue-950 tracking-tight mt-2">
                        Comprehensive Personal Home Healthcare Programs
                      </h2>
                      <p className="text-xs sm:text-sm text-gray-400 mt-2">
                        Every package is designed in coordination with registered nurse practitioners and local physicians.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                      {SERVICES.map((s) => (
                        <div 
                          key={s.id} 
                          className="bg-brand-blue-900 border border-brand-blue-800/80 rounded-2xl p-4 shadow-sm hover:shadow-lg hover:-translate-y-1.5 transition-all flex flex-col justify-between text-white group"
                        >
                          <div>
                            <div className="bg-brand-blue-850 text-brand-sage-500 p-2.5 rounded-xl inline-block mb-3.5 border border-brand-blue-800/50 group-hover:bg-brand-blue-800 transition-colors">
                              {getServiceIcon(s.icon)}
                            </div>
                            <h3 className="font-display font-bold text-sm text-white leading-tight">
                              {s.title}
                            </h3>
                            <p className="text-xs text-brand-blue-100/80 mt-2 line-clamp-3 leading-relaxed">
                              {s.shortDescription}
                            </p>
                          </div>
                          
                          <button
                            onClick={() => setSelectedService(s)}
                            className="mt-4 text-xs font-semibold text-brand-sage-500 hover:text-brand-sage-400 flex items-center gap-1 pt-2.5 border-t border-brand-blue-800/60 cursor-pointer self-start transition-colors w-full"
                          >
                            <span>Benefits List</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                          </button>
                        </div>
                      ))}
                    </div>

                    <div className="mt-6 text-center">
                      <button
                        onClick={() => setView('services')}
                        className="bg-brand-blue-600 hover:bg-brand-blue-700 text-white font-bold text-xs px-6 py-3.5 rounded-xl transition-all shadow-md shadow-brand-blue-200"
                      >
                        Compare All 10 Programs & Rates
                      </button>
                    </div>
                  </div>
                </section>

                {/* 5. Our Care Process */}
                <section className="bg-slate-900 text-white py-10">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center max-w-xl mx-auto mb-8">
                      <span className="text-xs font-bold uppercase tracking-widest text-brand-blue-400">
                        Operational Walkthrough
                      </span>
                      <h2 className="font-display font-extrabold text-3xl sm:text-4xl tracking-tight text-white mt-1">
                        Our 5-Step Inbound Care Process
                      </h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
                      {/* Process lines connect cards */}
                      <div className="hidden md:block absolute top-12 left-10 right-10 h-0.5 bg-slate-800 -z-1" />

                      {CARE_PROCESS_STEPS.map((step) => (
                        <div key={step.step} className="bg-slate-800/80 p-5 rounded-2xl border border-slate-700/50 flex flex-col justify-between relative">
                          <div>
                            <span className="font-mono text-3xl font-extrabold text-brand-sage-500 block">
                              {step.step}
                            </span>
                            <h4 className="font-display font-bold text-sm text-white mt-3 leading-snug">
                              {step.title}
                            </h4>
                            <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                              {step.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                {/* 6. Testimonials Preview */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="text-center max-w-2xl mx-auto mb-6">
                    <span className="text-xs font-bold uppercase text-brand-blue-600 tracking-widest">
                      Reviews & Success Stories
                    </span>
                    <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-brand-blue-950 tracking-tight mt-2">
                      Trusted by Hundreds of Local Families
                    </h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {TESTIMONIALS.slice(0, 2).map((t) => (
                      <div key={t.id} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col justify-between">
                        <div>
                          <div className="flex gap-1 mb-3">
                            {[...Array(t.rating)].map((_, i) => (
                              <Star key={i} className="w-4.5 h-4.5 text-amber-500 fill-amber-500" />
                            ))}
                          </div>
                          <p className="text-xs sm:text-sm text-gray-500 italic leading-relaxed">
                            &ldquo;{t.quote}&rdquo;
                          </p>
                        </div>
                        <div className="mt-4 pt-3 border-t border-gray-50 flex justify-between items-center text-xs">
                          <div>
                            <strong className="text-brand-blue-950 block">{t.author}</strong>
                            <span className="text-[10px] text-gray-400 block">{t.relationship}</span>
                          </div>
                          <span className={`px-2 py-0.5 rounded-full text-[9px] font-semibold ${t.type === 'client' ? 'bg-brand-blue-50 text-brand-blue-700' : 'bg-brand-sage-50 text-brand-sage-700'}`}>
                            {t.type === 'client' ? 'Verified Client' : 'Byass Employee'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 text-center">
                    <button 
                      onClick={() => setView('testimonials')} 
                      className="text-xs font-bold text-brand-blue-600 hover:text-brand-blue-800 underline focus:outline-hidden"
                    >
                      Read more success stories
                    </button>
                  </div>
                </section>

                {/* 8. Contact Segment - Direct Call & Location */}
                <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="contact-home-section">
                  <div className="text-center max-w-xl mx-auto mb-5">
                    <span className="text-xs font-bold uppercase text-brand-blue-600 tracking-widest">
                      HQ & Customer Care
                    </span>
                    <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-brand-blue-950 tracking-tight mt-1">
                      Let's Begin Your Care Assessment
                    </h2>
                  </div>

                  <div className="bg-white border border-brand-cream-200 rounded-3xl p-6 md:p-8 shadow-sm max-w-4xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                      <div className="space-y-6">
                        <div className="space-y-2">
                          <h3 className="font-display font-bold text-xl text-brand-blue-950">
                            Byass Premier Headquarters
                          </h3>
                          <div className="flex items-start gap-3 text-slate-600 mt-3">
                            <MapPin className="w-5 h-5 text-brand-blue-500 shrink-0 mt-0.5" />
                            <span className="text-sm">
                              80 S Liberty Street<br />
                              Powell Ohio 43065
                            </span>
                          </div>
                        </div>

                        <div className="space-y-2 pt-2 border-t border-slate-100">
                          <h4 className="font-display font-semibold text-sm text-brand-blue-900 uppercase tracking-wider">
                            Office Hours & General Inquiries
                          </h4>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            Monday – Friday: 9:00 AM – 5:00 PM<br />
                            On-Call Coordinator: 24 Hours / 7 Days a Week
                          </p>
                          <p className="text-xs text-slate-500 mt-1">
                            Email: <a href="mailto:info@byasspremier.com" className="text-brand-blue-600 hover:underline">info@byasspremier.com</a>
                          </p>
                        </div>
                      </div>

                      <div className="bg-brand-blue-50 p-6 md:p-8 rounded-2xl border border-brand-blue-100 space-y-4 text-center">
                        <div className="inline-flex p-3 bg-brand-blue-100 text-brand-blue-600 rounded-2xl mb-1">
                          <Phone className="w-6 h-6 animate-pulse" />
                        </div>
                        <h3 className="font-display font-bold text-lg text-brand-blue-950">
                          24/7 Dispatch & Care Requests
                        </h3>
                        <p className="text-xs text-slate-600 leading-relaxed">
                          For immediate care requests, custom safety audits, or urgent hospital discharge coordination, speak directly with our lead nursing team:
                        </p>
                        <a 
                          href="tel:+16142963599" 
                          className="inline-flex w-full justify-center items-center gap-2 text-base font-extrabold text-white bg-brand-blue-600 hover:bg-brand-blue-700 px-6 py-3.5 rounded-xl shadow-md transition-colors"
                        >
                          <Phone className="w-5 h-5" />
                          <span>(614) 296-3599</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </section>
              </motion.div>
            )}

            {/* VIEW 2: ABOUT US PAGE */}
            {currentView === 'about' && (
              <motion.div
                key="about"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 pb-12"
              >
                {/* Intro Title */}
                <div className="text-center max-w-3xl mx-auto space-y-4">
                  <span className="text-xs font-bold uppercase text-brand-blue-600 tracking-widest">
                    About Byass Premier Health Care
                  </span>
                  <h1 className="font-display font-extrabold text-4xl sm:text-5xl text-brand-blue-950 tracking-tight">
                    Compassionate In-Home Care with Clinical Excellence
                  </h1>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Founded on the absolute core principle that every senior deserves to live with independence, safety, and joy, Byass Premier Health Care provides certified caregiver support tailored strictly to personal routines.
                  </p>
                </div>

                {/* Detailed Story Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                  <div className="space-y-6">
                    <h3 className="font-display font-bold text-xl text-brand-blue-950 uppercase tracking-wider border-l-3 border-brand-blue-600 pl-3">
                      Our Agency Story
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                      Byass Premier Health Care was created by passionate healthcare administrators who witnessed first-hand the vulnerabilities family members face when looking for trustworthy in-home caregivers. Traditional registries often fail to provide consistency or screen for empathy. 
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 leading-relaxed">
                      We changed that by building a fully licensed, state-compliant home healthcare company that acts as a direct employer. By handling background clearance, continuing education, and general liabilities ourselves, we protect our client families and empower our caregiving staff to deliver outstanding support.
                    </p>

                    <div className="p-4 bg-brand-blue-50/50 rounded-xl border border-brand-blue-100">
                      <span className="font-bold text-brand-blue-950 text-xs uppercase tracking-wider block">HIPAA Statement</span>
                      <p className="text-[11px] text-gray-500 mt-1 leading-relaxed">
                        As a registered healthcare provider, we operate in strict compliance with the Health Insurance Portability and Accountability Act. All records, assessment logs, and therapy plans are maintained in state-of-the-art secure databases.
                      </p>
                    </div>
                  </div>

                  <div className="relative">
                    <div className="absolute -inset-2 bg-gradient-to-r from-brand-blue-100 to-brand-sage-100 rounded-3xl blur-md opacity-20" />
                    <div className="relative bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-md aspect-[4/3]">
                      <img 
                        src={IMAGE_NURSE} 
                        alt="Compassionate nurse caregiver holding patient hands" 
                        className="w-full h-full object-cover"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  </div>
                </div>

                {/* Mission, Vision, Values */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 bg-brand-cream-50/50 p-8 rounded-3xl border border-brand-cream-100">
                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-3">
                    <div className="bg-brand-blue-50 text-brand-blue-600 p-2 rounded-lg inline-block font-extrabold text-sm">
                      MISSION
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      To deliver high-quality, clinical-compliant personal and companion caregiving services that preserve comfort, protect physical safety, and foster independent mental health right at home.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-3">
                    <div className="bg-brand-sage-50 text-brand-sage-600 p-2 rounded-lg inline-block font-extrabold text-sm">
                      VISION
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      To be the state\'s most respected, high-trust private duty agency, driving down hospital readmission rates and setting new benchmarks for compassionate in-home care.
                    </p>
                  </div>

                  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-xs space-y-3">
                    <div className="bg-purple-50 text-purple-600 p-2 rounded-lg inline-block font-extrabold text-sm">
                      VALUES
                    </div>
                    <p className="text-xs text-gray-600 leading-relaxed">
                      Founded on unconditional empathy, absolute reliability, continuous training, and clinical compliance. We treat every client like our own parent.
                    </p>
                  </div>
                </div>

                {/* Our Core values card stack */}
                <div className="space-y-6">
                  <h3 className="font-display font-bold text-xl text-brand-blue-950 text-center uppercase tracking-wider">
                    Our Operational Care Values
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {CORE_VALUES.map((val) => (
                      <div key={val.title} className="bg-white p-5 rounded-2xl border border-gray-150/80 shadow-xs text-center space-y-2.5">
                        <CheckCircle2 className="w-6 h-6 text-brand-sage-600 mx-auto" />
                        <h4 className="font-display font-bold text-xs uppercase tracking-wider text-brand-blue-950 leading-snug">
                          {val.title}
                        </h4>
                        <p className="text-xs text-gray-500 leading-relaxed">
                          {val.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Leadership Team Section */}
                <div className="space-y-8">
                  <div className="text-center max-w-xl mx-auto space-y-2">
                    <h3 className="font-display font-extrabold text-2xl text-brand-blue-950 uppercase tracking-wider">
                      Our Leadership Team
                    </h3>
                    <p className="text-xs text-gray-400">
                      Licensed practitioners and coordinators managing daily compliance.
                    </p>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-2xl mx-auto">
                    {[
                      {
                        name: 'Teejay Byass',
                        role: 'Director',
                        credentials: 'Care Administrator',
                        image: IMAGE_TEEJAY,
                      },
                      {
                        name: 'Princess Heirsmac',
                        role: 'Manager',
                        credentials: 'Care Coordinator',
                        image: IMAGE_PRINCESS,
                      }
                    ].map((person) => (
                      <div key={person.name} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
                        <div>
                          {person.image ? (
                            <img 
                              src={person.image} 
                              alt={person.name} 
                              className="w-16 h-16 rounded-full object-cover mb-3 border border-gray-100"
                              referrerPolicy="no-referrer"
                            />
                          ) : (
                            <div className="w-16 h-16 bg-brand-blue-50 text-brand-blue-700 rounded-full flex items-center justify-center font-display font-bold text-lg mb-3">
                              {person.name[0]}
                            </div>
                          )}
                          <span className="text-[9px] uppercase font-bold tracking-wider text-brand-blue-500">{person.credentials}</span>
                          <h4 className="font-display font-bold text-sm text-brand-blue-950 mt-1">{person.name}</h4>
                          <p className="text-xs font-semibold text-gray-500 mt-0.5">{person.role}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

              </motion.div>
            )}

            {/* VIEW 3: OUR SERVICES (ALL 10) */}
            {currentView === 'services' && (
              <motion.div
                key="services"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-12"
              >
                {/* Header */}
                <div className="text-center max-w-2xl mx-auto space-y-4">
                  <span className="text-xs font-bold uppercase text-brand-blue-600 tracking-widest">
                    Our Services Directory
                  </span>
                  <h1 className="font-display font-extrabold text-4xl text-brand-blue-950 tracking-tight">
                    Comprehensive Non-Medical Personal & Companion Care
                  </h1>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Byass Premier provides 10 distinct, customized care programs. Every plan includes a free home care assessment, personality matching, and continuous quality monitoring.
                  </p>
                </div>

                {/* All 10 Services Detailed Cards */}
                <div className="space-y-6">
                  {SERVICES.map((s) => (
                    <div 
                      key={s.id} 
                      className="bg-brand-blue-900 border border-brand-blue-800/80 rounded-2xl p-6 sm:p-8 shadow-sm hover:shadow-lg transition-all grid grid-cols-1 lg:grid-cols-3 gap-6 items-start text-white"
                    >
                      {/* Left: icon and title */}
                      <div className="space-y-3">
                        <div className="bg-brand-blue-850 text-brand-sage-500 p-3 rounded-xl inline-block border border-brand-blue-800/40">
                          {getServiceIcon(s.icon)}
                        </div>
                        <h3 className="font-display font-bold text-lg text-white leading-tight">
                          {s.title}
                        </h3>
                        <span className="inline-block text-[10px] bg-brand-blue-800 text-brand-blue-200 font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider border border-brand-blue-700/50">
                          {s.category.replace('-', ' ')}
                        </span>
                      </div>

                      {/* Middle: descriptions and typical plans */}
                      <div className="space-y-4 text-xs sm:text-sm">
                        <p className="text-brand-blue-100 font-medium leading-relaxed">
                          {s.shortDescription}
                        </p>
                        <p className="text-slate-300 leading-relaxed">
                          {s.fullDescription}
                        </p>
                        <div className="bg-brand-blue-950/80 p-4.5 rounded-xl border border-brand-blue-800/50 text-xs">
                          <strong className="text-brand-sage-500 block uppercase font-bold text-[10px] tracking-wider mb-1">Typical Care Plan Arrangement</strong>
                          <span className="text-slate-200 leading-relaxed">{s.typicalPlan}</span>
                        </div>
                      </div>

                      {/* Right: Specific benefits checklist & Booking button */}
                      <div className="space-y-4">
                        <h4 className="font-display font-bold text-xs uppercase tracking-wider text-white">
                          Included In-Home Support Checklist
                        </h4>
                        <ul className="space-y-2.5 text-xs text-slate-300">
                          {s.benefits.map((ben, idx) => (
                            <li key={idx} className="flex gap-2">
                              <span className="text-brand-sage-500 font-bold shrink-0">&bull;</span>
                              <span className="leading-snug">{ben}</span>
                            </li>
                          ))}
                        </ul>
                        <div className="pt-2">
                          <a
                            href="tel:+16142963599"
                            className="w-full bg-brand-sage-500 hover:bg-brand-sage-600 text-slate-950 font-extrabold text-xs py-3.5 rounded-xl transition-all shadow-xs text-center block"
                          >
                            Call (614) 296-3599 to Request Care
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* VIEW 4: CAREERS PAGE */}
            {currentView === 'careers' && (
              <motion.div
                key="careers"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10 pb-12"
              >
                {/* Careers Header */}
                <div className="text-center max-w-2xl mx-auto space-y-4">
                  <span className="text-xs font-bold uppercase text-brand-blue-600 tracking-widest">
                    Byass Premier Careers
                  </span>
                  <h1 className="font-display font-extrabold text-4xl text-brand-blue-950 tracking-tight">
                    Join Our Compassionate Caregiving Family
                  </h1>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    We value, respect, and defend our caregivers. Byass Premier is a licensed direct employer offering premium pay scales, paid orientation, state training certifications, health benefits, and PTO.
                  </p>
                </div>

                {/* Benefits of working with us */}
                <div className="bg-brand-cream-50/50 p-8 rounded-3xl border border-brand-cream-100 grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div>
                    <h3 className="font-display font-bold text-lg text-brand-blue-950 mb-3 uppercase tracking-wider">
                      Employment Benefits
                    </h3>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      We believe that when caregivers are respected, they deliver outstanding care. That is why we provide robust employment protections and career growth ladders.
                    </p>
                  </div>
                  <div className="lg:col-span-2">
                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-gray-600">
                      {BENEFITS_WORKING_WITH_US.map((ben, idx) => (
                        <li key={idx} className="flex gap-2 bg-white p-3 rounded-xl border border-gray-100 shadow-xs">
                          <CheckCircle2 className="w-4.5 h-4.5 text-brand-sage-600 shrink-0" />
                          <span className="leading-snug">{ben}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Open Positions Grid */}
                <div className="space-y-6">
                  <h3 className="font-display font-extrabold text-2xl text-brand-blue-950 text-center uppercase tracking-wider">
                    Current Job Openings
                  </h3>
                  
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {JOBS.map((j) => (
                      <div key={j.id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
                        <div>
                          <div className="flex justify-between items-center mb-2">
                            <span className="text-[10px] bg-brand-blue-50 text-brand-blue-700 font-bold px-2.5 py-0.5 rounded-full">
                              {j.type}
                            </span>
                            <span className="text-[10px] text-gray-400 font-semibold">{j.location}</span>
                          </div>
                          <h4 className="font-display font-bold text-sm text-brand-blue-950 leading-tight">
                            {j.title}
                          </h4>
                          <p className="text-gray-400 text-[10px] mt-0.5 font-medium">{j.department}</p>
                          
                          <p className="text-xs text-gray-500 mt-3 leading-relaxed">
                            {j.shortDescription}
                          </p>

                          <div className="mt-4 border-t border-gray-50 pt-4 space-y-3">
                            <span className="text-[9px] uppercase font-bold tracking-wider text-brand-blue-900">Key Criteria</span>
                            <ul className="space-y-1.5 text-xs text-gray-500">
                              {j.requirements.slice(0, 3).map((req, rIdx) => (
                                <li key={rIdx} className="flex gap-1.5">
                                  <span className="text-brand-sage-600 font-bold shrink-0">&bull;</span>
                                  <span className="leading-tight">{req}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>

                        <div className="mt-6 pt-3 border-t border-gray-50">
                          <button
                            onClick={() => setSelectedJobForApp(j)}
                            className="w-full bg-brand-blue-600 hover:bg-brand-blue-700 text-white font-bold text-xs py-2.5 rounded-xl transition-colors text-center"
                          >
                            Apply Now
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Embedded Careers Form segment */}
                <div className="bg-brand-cream-50/20 py-8 max-w-2xl mx-auto" id="application-careers-form">
                  <div className="text-center mb-6">
                    <h3 className="font-display font-bold text-xl text-brand-blue-950">
                      Submit Your Resume Confidential File
                    </h3>
                    <p className="text-xs text-gray-400 mt-1">
                      Our hiring system complies with EEOC guidelines.
                    </p>
                  </div>
                  <CareersForm 
                    selectedJobId={selectedJobForApp?.id} 
                    onAddApplication={addApplication} 
                  />
                </div>

              </motion.div>
            )}

            {/* VIEW 5: TESTIMONIALS */}
            {currentView === 'testimonials' && (
              <motion.div
                key="testimonials"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-12"
              >
                {/* Testimonial Header */}
                <div className="text-center max-w-2xl mx-auto space-y-4">
                  <span className="text-xs font-bold uppercase text-brand-blue-600 tracking-widest">
                    Testimonials & Stories
                  </span>
                  <h1 className="font-display font-extrabold text-4xl text-brand-blue-950 tracking-tight">
                    Reviews from Families and Caregivers
                  </h1>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    Nothing is more powerful than first-hand experience. Here is what families and our dedicated caregiver staff have to say about the Byass Premier clinical standard.
                  </p>
                </div>

                {/* Full Testimonials list */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {TESTIMONIALS.map((t) => (
                    <div key={t.id} className="bg-white p-6 sm:p-8 rounded-2xl border border-gray-150 shadow-sm flex flex-col justify-between">
                      <div className="space-y-4">
                        <div className="flex gap-1">
                          {[...Array(t.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-amber-500 fill-amber-500" />
                          ))}
                        </div>
                        <p className="text-xs sm:text-sm text-gray-600 italic leading-relaxed">
                          &ldquo;{t.quote}&rdquo;
                        </p>
                      </div>
                      <div className="mt-6 pt-4 border-t border-gray-100 flex justify-between items-center">
                        <div>
                          <strong className="text-brand-blue-950 text-sm block">{t.author}</strong>
                          <span className="text-xs text-gray-400 block">{t.relationship}</span>
                        </div>
                        <span className={`px-3.5 py-1 rounded-full text-[10px] font-bold ${
                          t.type === 'client' ? 'bg-brand-blue-50 text-brand-blue-700' : 'bg-brand-sage-50 text-brand-sage-700'
                        }`}>
                          {t.type === 'client' ? 'Verified Client' : 'Staff Caregiver'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <div className="bg-brand-blue-950 text-white rounded-3xl p-8 sm:p-12 text-center max-w-3xl mx-auto space-y-6">
                  <Heart className="w-12 h-12 text-brand-sage-500 mx-auto fill-brand-sage-500" />
                  <h3 className="font-display font-extrabold text-2xl sm:text-3xl tracking-tight">
                    Are You Ready to Discuss Your Loved One\'s Care?
                  </h3>
                  <p className="text-xs sm:text-sm text-brand-blue-200 leading-relaxed max-w-lg mx-auto">
                    We offer fully free, customized home safety audits and personalized Care Assessments with registered nurse coordinators. No commitment required.
                  </p>
                  <a
                    href="tel:+16142963599"
                    className="bg-brand-blue-500 hover:bg-brand-blue-400 text-white font-bold text-xs px-6 py-3.5 rounded-xl transition-all shadow-md shadow-brand-blue-500/20 text-center inline-block"
                  >
                    Call (614) 296-3599 for Free Consultation
                  </a>
                </div>
              </motion.div>
            )}

            {/* VIEW 6: FAQ PAGE */}
            {currentView === 'faq' && (
              <motion.div
                key="faq"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="max-w-4xl mx-auto px-4 py-8 space-y-8 pb-12"
              >
                {/* Header */}
                <div className="text-center space-y-4">
                  <span className="text-xs font-bold uppercase text-brand-blue-600 tracking-widest">
                    Help Desk FAQs
                  </span>
                  <h1 className="font-display font-extrabold text-4xl text-brand-blue-950 tracking-tight">
                    Frequently Asked Questions
                  </h1>
                  <p className="text-sm text-gray-500 leading-relaxed max-w-2xl mx-auto">
                    Everything you need to know about starting home care, background screenings, hourly rates, and care schedules.
                  </p>
                </div>

                {/* FAQ Category Filters */}
                <div className="flex flex-wrap gap-1.5 justify-center">
                  {(['All', 'General', 'Services', 'Caregivers', 'Costs & Insurance', 'Scheduling'] as const).map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setSelectedFaqCat(cat)}
                      className={`px-3.5 py-1.5 rounded-full text-xs font-semibold border transition-all cursor-pointer ${
                        selectedFaqCat === cat
                          ? 'bg-brand-blue-600 text-white border-brand-blue-600 shadow-xs'
                          : 'bg-white text-gray-600 border-gray-200 hover:border-brand-blue-300'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>

                {/* Accordion Questions */}
                <div className="space-y-4">
                  {filteredFaqs.length === 0 ? (
                    <p className="text-center py-12 text-gray-400 text-sm">No FAQ entries match this filter.</p>
                  ) : (
                    filteredFaqs.map((f) => (
                      <div 
                        key={f.id} 
                        className="bg-white border border-gray-150 rounded-2xl p-5 shadow-xs"
                      >
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-[9px] uppercase tracking-wider font-extrabold text-brand-blue-600 px-2 py-0.5 bg-brand-blue-50 rounded-md">
                            {f.category}
                          </span>
                        </div>
                        <h3 className="font-display font-bold text-sm text-brand-blue-950">
                          {f.question}
                        </h3>
                        <p className="text-xs sm:text-sm text-gray-500 mt-2.5 leading-relaxed">
                          {f.answer}
                        </p>
                      </div>
                    ))
                  )}
                </div>

                {/* Help Callout */}
                <div className="bg-brand-cream-50/50 p-6 rounded-2xl border border-brand-cream-100 flex flex-col sm:flex-row justify-between items-center gap-4 text-center sm:text-left text-xs">
                  <div>
                    <h4 className="font-bold text-brand-blue-950">Have a clinical question not answered here?</h4>
                    <p className="text-gray-400 mt-0.5">Ask our nurse coordinator or schedule an in-home consult.</p>
                  </div>
                  <button
                    onClick={() => setView('contact')}
                    className="bg-brand-blue-600 hover:bg-brand-blue-700 text-white font-bold px-4 py-2.5 rounded-xl transition-colors"
                  >
                    Contact Support
                  </button>
                </div>
              </motion.div>
            )}

            {/* VIEW 7: CONTACT US PAGE */}
            {currentView === 'contact' && (
              <motion.div
                key="contact"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 pb-12"
              >
                <div className="text-center max-w-2xl mx-auto space-y-4">
                  <span className="text-xs font-bold uppercase text-brand-blue-600 tracking-widest">
                    Contact Byass Premier
                  </span>
                  <h1 className="font-display font-extrabold text-4xl text-brand-blue-950 tracking-tight">
                    Direct Care Assessment & Contact
                  </h1>
                  <p className="text-sm text-gray-500 leading-relaxed">
                    We initiate customized home healthcare services and conduct complimentary safety audits. Speak directly with our nursing team or visit our Ohio office.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-5xl mx-auto">
                  {/* Left block: Location and Credentials */}
                  <div className="bg-white border border-brand-cream-200 rounded-3xl p-8 flex flex-col justify-between space-y-8 shadow-xs">
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <span className="text-[10px] bg-brand-blue-50 text-brand-blue-700 font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
                          Main Headquarters
                        </span>
                        <h2 className="font-display font-bold text-2xl text-brand-blue-950 mt-2">
                          Powell Office
                        </h2>
                        <div className="flex items-start gap-3 text-slate-600 mt-2">
                          <MapPin className="w-5 h-5 text-brand-blue-500 shrink-0 mt-0.5" />
                          <span className="text-base font-medium">
                            80 S Liberty Street<br />
                            Powell Ohio 43065
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2 pt-4 border-t border-slate-100">
                        <h4 className="font-display font-semibold text-xs text-brand-blue-900 uppercase tracking-wider">
                          Office Administration & Hours
                        </h4>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          Monday – Friday: 9:00 AM – 5:00 PM<br />
                          Direct on-call coordinators monitor clinical routing 24/7.
                        </p>
                        <p className="text-xs text-slate-500 mt-1">
                          General inquiries: <a href="mailto:info@byasspremier.com" className="text-brand-blue-600 hover:underline">info@byasspremier.com</a>
                        </p>
                      </div>
                    </div>

                    <div className="bg-brand-cream-100/60 p-5 rounded-2xl border border-brand-cream-200/50 space-y-4 text-xs">
                      <h4 className="font-display font-bold text-slate-800 uppercase tracking-wide text-[10px]">
                        ★ Licensure & Bonded Protection ★
                      </h4>
                      
                      <div className="flex gap-2.5">
                        <Award className="w-4.5 h-4.5 text-brand-sage-500 shrink-0" />
                        <div>
                          <span className="font-bold text-gray-800">State Approved Licensure</span>
                          <p className="text-slate-500 text-[11px] leading-snug">#LCO-9042551-A verified under State Department of Health codes.</p>
                        </div>
                      </div>

                      <div className="flex gap-2.5">
                        <ShieldCheck className="w-4.5 h-4.5 text-brand-sage-500 shrink-0" />
                        <div>
                          <span className="font-bold text-gray-800">Comprehensively Bonded & Insured</span>
                          <p className="text-slate-500 text-[11px] leading-snug">Guarded up to $1,000,000 protecting assets, liability, and surety bonds.</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right block: Massive Calling Callout Card */}
                  <div className="bg-slate-900 text-slate-100 rounded-3xl p-8 flex flex-col justify-between space-y-8 border border-slate-800 shadow-lg">
                    <div className="space-y-4">
                      <div className="inline-flex p-3 bg-slate-850 text-brand-sage-500 rounded-2xl border border-slate-800">
                        <Phone className="w-6 h-6 animate-pulse" />
                      </div>
                      <h3 className="font-display font-extrabold text-2xl text-white">
                        24-Hour Supervisor & Nurse Dispatch
                      </h3>
                      <p className="text-xs text-slate-400 leading-relaxed">
                        Families and clinical discharge discharge-planners can request direct service configuration, home assessments, safety audits, or hourly shifts over the phone.
                      </p>
                      <ul className="space-y-2 pt-3 text-xs text-slate-300">
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-brand-sage-500 rounded-full"></span>
                          <span>Immediate scheduling of home audits</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-brand-sage-500 rounded-full"></span>
                          <span>Urgent post-hospital care routing</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 bg-brand-sage-500 rounded-full"></span>
                          <span>Dedicated on-call coordinator available 24/7</span>
                        </li>
                      </ul>
                    </div>

                    <div className="space-y-4">
                      <p className="text-[11px] text-slate-400">Click the telephone number below to dial instantly:</p>
                      <a 
                        href="tel:+16142963599" 
                        className="inline-flex w-full justify-center items-center gap-3 text-lg font-black text-slate-900 bg-brand-sage-500 hover:bg-brand-sage-600 px-6 py-4 rounded-2xl shadow-md transition-colors"
                      >
                        <Phone className="w-5 h-5 fill-slate-900" />
                        <span>(614) 296-3599</span>
                      </a>
                      <span className="text-[10px] text-slate-500 text-center block leading-none">
                        Free Care consultations • No obligations
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* VIEW 8: STAFF & CLIENT PORTAL */}
            {currentView === 'portal' && (
              <motion.div
                key="portal"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pb-12"
              >
                <PortalDashboard
                  bookings={bookings}
                  applications={applications}
                  inquiries={inquiries}
                  onUpdateBookingStatus={updateBookingStatus}
                  onUpdateAppStatus={updateAppStatus}
                  onUpdateInquiryStatus={updateInquiryStatus}
                  onDeleteBooking={deleteBooking}
                  onDeleteApplication={deleteApplication}
                  onDeleteInquiry={deleteInquiry}
                />
              </motion.div>
            )}

          </AnimatePresence>
        )}
      </main>

      {/* Dynamic Footer with HIPAA modalities */}
      <Footer 
        setView={(view) => { setView(view); setSearchQuery(''); }} 
        onOpenPrivacy={(title, content) => setActivePrivacyModal({ title, content })}
      />

      {/* MODAL OVERLAY 1: QUICK REQUEST FREE CARE CONSULT */}
      {isQuickBookingOpen && (
        <div className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4 overflow-y-auto">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl">
            <button
              onClick={() => setIsQuickBookingOpen(false)}
              className="absolute top-4 right-4 text-white hover:text-brand-blue-300 bg-black/40 hover:bg-black/60 p-1.5 rounded-full z-10 transition-colors"
              title="Close Panel"
            >
              <X className="w-5 h-5" />
            </button>
            <BookingForm 
              onAddBooking={(b) => { addBooking(b); }} 
              onClose={() => setIsQuickBookingOpen(false)}
            />
          </div>
        </div>
      )}

      {/* MODAL OVERLAY 2: SERVICE DETAILED BENEFITS */}
      {selectedService && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-brand-blue-900 text-white rounded-2xl max-w-xl w-full p-6 sm:p-8 relative max-h-[90vh] overflow-y-auto border border-brand-blue-800/80 shadow-2xl fade-in">
            <button
              onClick={() => setSelectedService(null)}
              className="absolute top-5 right-5 text-brand-blue-200 hover:text-white hover:bg-brand-blue-800 p-1.5 rounded-lg transition-colors"
            >
              <X className="w-6 h-6" />
            </button>

            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="bg-brand-blue-850 text-brand-sage-500 p-2.5 rounded-xl shrink-0 border border-brand-blue-800/40">
                  {getServiceIcon(selectedService.icon)}
                </div>
                <div>
                  <h3 className="font-display font-extrabold text-lg text-white">{selectedService.title}</h3>
                  <span className="text-[10px] uppercase font-bold text-brand-blue-200 tracking-wider">Clinical Care Plan Blueprint</span>
                </div>
              </div>

              <div className="text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-brand-blue-800/60 pt-4 space-y-3">
                <p>{selectedService.fullDescription}</p>
                
                <div className="bg-brand-blue-950/80 p-4 rounded-xl border border-brand-blue-800/50 text-xs">
                  <strong className="block uppercase text-brand-sage-500 font-extrabold tracking-wider text-[10px] mb-1">Frequency & Schedules</strong>
                  <p className="text-slate-200 leading-relaxed">{selectedService.typicalPlan}</p>
                </div>

                <div className="space-y-2 pt-2">
                  <strong className="block uppercase text-white font-extrabold tracking-wider text-[10px]">What is Covered Under our Routine Checklists:</strong>
                  <ul className="space-y-2 list-disc list-inside text-slate-300">
                    {selectedService.benefits.map((ben, idx) => (
                      <li key={idx} className="pl-1">
                        <span className="text-slate-200 leading-snug">{ben}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-brand-blue-800/60 flex flex-col sm:flex-row gap-3">
                <a
                  href="tel:+16142963599"
                  onClick={() => setSelectedService(null)}
                  className="bg-brand-sage-500 hover:bg-brand-sage-600 text-slate-950 font-black text-xs py-3 px-5 rounded-xl shadow-md text-center grow cursor-pointer inline-flex items-center justify-center transition-colors"
                >
                  Call (614) 296-3599 to Request Care
                </a>
                <button
                  onClick={() => setSelectedService(null)}
                  className="bg-brand-blue-850 hover:bg-brand-blue-800 text-brand-blue-100 font-semibold text-xs py-3 px-5 rounded-xl text-center cursor-pointer transition-colors border border-brand-blue-800/60"
                >
                  Dismiss Details
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL OVERLAY 3: PRIVACY & LEGAL TEXT */}
      {activePrivacyModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 relative max-h-[85vh] overflow-y-auto border border-brand-cream-200 shadow-2xl fade-in">
            <button
              onClick={() => setActivePrivacyModal(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 p-1"
            >
              <X className="w-6 h-6" />
            </button>

            <h3 className="font-display font-bold text-lg text-brand-blue-950 border-b border-gray-150 pb-2 mb-4">
              {activePrivacyModal.title}
            </h3>

            <div className="text-xs text-gray-500 leading-relaxed whitespace-pre-wrap max-h-[60vh] overflow-y-auto pr-2 space-y-3 font-medium">
              {activePrivacyModal.content}
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex justify-end">
              <button
                onClick={() => setActivePrivacyModal(null)}
                className="bg-slate-900 text-white font-semibold text-xs px-5 py-2.5 rounded-xl cursor-pointer"
              >
                I Understand
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
