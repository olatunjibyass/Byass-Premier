/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Heart, Phone, Mail, MapPin, ShieldCheck, Award, FileCheck, ExternalLink } from 'lucide-react';
import { PageView } from '../types';

interface FooterProps {
  setView: (view: PageView) => void;
  onOpenPrivacy: (title: string, content: string) => void;
}

export default function Footer({ setView, onOpenPrivacy }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handlePageNav = (view: PageView) => {
    setView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const triggerPrivacy = () => {
    onOpenPrivacy(
      'Privacy Policy & HIPAA Statement',
      `Byass Premier Health Care ("we," "our," "us") is dedicated to protecting the privacy of our clients and website visitors. This privacy statement explains our information-gathering and security practices.

1. HIPAA Compliance & Protected Health Information (PHI)
We maintain rigorous protocols in compliance with the Health Insurance Portability and Accountability Act (HIPAA). All client medical records, service plans, care notes, and assessment communications are encrypted in transit and at rest. We never sell, lease, or distribute Protected Health Information to third parties.

2. Information Collection & Web Inquiries
We collect contact details (such as names, phone numbers, email addresses, and service requests) purely to facilitate home care consultations and job applications. These records are stored in a secure cloud environment accessed strictly by authorized administrative staff.

3. Secure Job Applications
Resumes uploaded via our careers form are handled confidentially and evaluated solely for recruitment within Byass Premier.

4. Client Contact Preferences
By submitting your phone number or email, you authorize Byass Premier representatives to contact you regarding home care schedules. You can opt out of email communications at any time.`
    );
  };

  const triggerTerms = () => {
    onOpenPrivacy(
      'Terms of Service & Care Agreement Guidelines',
      `Welcome to Byass Premier Health Care. By accessing this website or requesting an assessment, you agree to comply with the following operational terms:

1. Scope of Non-Clinical Home Care Support
Our home care professionals provide non-medical assistance with daily living (bathing, dressing, meal prep, cognitive support, companionship, and transportation) and medication reminders. While we employ CNAs and HHAs, our standard home care plans are non-clinical. If medical nursing care is required, we coordinate with licensed Medicare home health organizations.

2. Transparent Billing & Care Changes
All active care rates are detailed in individual care agreements. We operate without long-term contracts. Families may adjust scheduling shifts or cancel regular service packages with a standard 48-hour advanced notice.

3. Employer Indemnity & Caregiver Screening
Byass Premier is the direct employer of record for all caregiver personnel. We handle all payroll taxes, workers' compensation insurance, and employment liabilities. Our clients are completely protected from employment claims.

4. Equal Opportunity Care Provider
We accept clients and hire caregivers without regard to race, creed, religion, age, gender, sexual orientation, disability, or national origin.`
    );
  };

  return (
    <footer className="bg-slate-900 text-slate-300 border-t-4 border-brand-blue-600 pt-10 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 pb-8 border-b border-slate-800">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center cursor-pointer" onClick={() => handlePageNav('home')}>
              <div className="bg-white px-4 py-2 rounded-2xl flex items-center justify-center shadow-md">
                <img 
                  src="https://i.postimg.cc/TpY2c2Ym/Capture.png" 
                  alt="Byass Premier Logo" 
                  className="h-16 w-auto object-contain max-w-[240px]"
                  referrerPolicy="no-referrer"
                />
              </div>
            </div>
            <p className="text-sm text-slate-400 leading-relaxed">
              Compassionate, reliable, and highly personalized home care services that promote independence, safety, and comfort. Helping seniors and recovering adults live fulfilling lives in the comfort of their own homes.
            </p>
            <div className="pt-2 flex flex-wrap gap-2.5">
              <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-800/80 rounded-full border border-slate-700/50 text-[11px] font-medium text-slate-300">
                <ShieldCheck className="w-3.5 h-3.5 text-brand-sage-500" />
                <span>Fully Licensed Agency</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1 bg-slate-800/80 rounded-full border border-slate-700/50 text-[11px] font-medium text-slate-300">
                <Award className="w-3.5 h-3.5 text-amber-500" />
                <span>100% Bonded & Insured</span>
              </div>
            </div>
          </div>

          {/* Quick Links Column */}
          <div>
            <h3 className="font-display font-semibold text-white tracking-wide uppercase text-sm mb-5 border-l-2 border-brand-blue-500 pl-3">
              Explore Our Agency
            </h3>
            <ul className="space-y-3 text-sm">
              {[
                { label: 'About Our Mission', view: 'about' as PageView },
                { label: 'Our Specialty Services', view: 'services' as PageView },
                { label: 'Careers & Opportunities', view: 'careers' as PageView },
                { label: 'Client Testimonials', view: 'testimonials' as PageView },
                { label: 'Frequently Asked Questions', view: 'faq' as PageView },
                { label: 'Contact & Consultation', view: 'contact' as PageView },
                { label: 'Staff & Client Portal', view: 'portal' as PageView },
              ].map((link) => (
                <li key={link.view}>
                  <button
                    onClick={() => handlePageNav(link.view)}
                    className="hover:text-white hover:translate-x-1 transition-all duration-200 flex items-center gap-1"
                  >
                    <span>&rsaquo;</span>
                    <span>{link.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Specialty Services Column */}
          <div>
            <h3 className="font-display font-semibold text-white tracking-wide uppercase text-sm mb-5 border-l-2 border-brand-blue-500 pl-3">
              Specialized Care
            </h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li>
                <button onClick={() => handlePageNav('services')} className="hover:text-white text-left">
                  Personal Care Assistance
                </button>
              </li>
              <li>
                <button onClick={() => handlePageNav('services')} className="hover:text-white text-left">
                  Companion Care Services
                </button>
              </li>
              <li>
                <button onClick={() => handlePageNav('services')} className="hover:text-white text-left">
                  Dementia & Alzheimer\'s Care
                </button>
              </li>
              <li>
                <button onClick={() => handlePageNav('services')} className="hover:text-white text-left">
                  Respite Care for Families
                </button>
              </li>
              <li>
                <button onClick={() => handlePageNav('services')} className="hover:text-white text-left">
                  Post-Hospital Recovery Care
                </button>
              </li>
              <li>
                <button onClick={() => handlePageNav('services')} className="hover:text-white text-left">
                  24/7 & Live-In Care plans
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details & Newsletter */}
          <div className="space-y-5">
            <h3 className="font-display font-semibold text-white tracking-wide uppercase text-sm border-l-2 border-brand-blue-500 pl-3">
              Office HQ
            </h3>
            <ul className="space-y-3.5 text-sm">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-brand-blue-400 shrink-0 mt-0.5" />
                <span className="text-slate-400">
                  Byass Premier HQ<br />
                  80 S Liberty Street<br />
                  Powell Ohio 43065
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-brand-blue-400" />
                <a href="tel:+16142963599" className="hover:text-white text-slate-400 transition-colors">
                  (614) 296-3599
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-brand-blue-400" />
                <a href="mailto:info@byasspremier.com" className="hover:text-white text-slate-400 transition-colors">
                  info@byasspremier.com
                </a>
              </li>
            </ul>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                Join our Wellness Newsletter
              </label>
              <form onSubmit={(e) => { e.preventDefault(); alert('Thank you for subscribing to our wellness newsletter!'); }} className="flex gap-1.5">
                <input
                  type="email"
                  placeholder="Enter email address"
                  className="bg-slate-800 text-xs text-white px-3 py-2 rounded-lg border border-slate-700 w-full focus:outline-hidden focus:ring-1 focus:ring-brand-blue-500"
                  required
                />
                <button
                  type="submit"
                  className="bg-brand-blue-600 text-white font-medium text-xs px-3.5 py-2 rounded-lg hover:bg-brand-blue-500 transition-colors shrink-0"
                >
                  Join
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Agency Compliance Details & Licensure */}
        <div className="py-5 grid grid-cols-1 md:grid-cols-3 gap-4 text-xs text-slate-500 border-b border-slate-800">
          <div className="flex gap-2">
            <FileCheck className="w-5 h-5 text-brand-sage-600 shrink-0" />
            <div>
              <p className="font-semibold text-slate-400 uppercase tracking-wider">State Licensure Compliance</p>
              <p className="mt-0.5 text-slate-500 leading-relaxed">
                Byass Premier Health Care is licensed under the State Department of Health (Agency License No: #LCO-9042551-A) as an authorized private duty home care provider.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <ShieldCheck className="w-5 h-5 text-brand-blue-400 shrink-0" />
            <div>
              <p className="font-semibold text-slate-400 uppercase tracking-wider">Caregiver Safety Guarantee</p>
              <p className="mt-0.5 text-slate-500 leading-relaxed">
                100% of Caregiver staff are verified through fingerprint screening (FBI/DOJ database), checked against national sex-offender registries, and possess active elder-abuse clearance checks.
              </p>
            </div>
          </div>
          <div className="flex gap-2">
            <Heart className="w-5 h-5 text-rose-500 shrink-0" />
            <div>
              <p className="font-semibold text-slate-400 uppercase tracking-wider">HIPAA Protected Security</p>
              <p className="mt-0.5 text-slate-500 leading-relaxed">
                Patient records are maintained in absolute confidentiality under strict regulatory guidelines. Website submissions employ SSL data encryption protocols.
              </p>
            </div>
          </div>
        </div>

        {/* Legal and Copyright bottom bar */}
        <div className="pt-5 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-slate-500">
          <div>
            &copy; {currentYear} Byass Premier Health Care. All rights reserved. 
            <span className="mx-2">|</span>
            National Provider Identifier (NPI): <span className="text-slate-400">194200512</span>
          </div>
          <div className="flex gap-4">
            <button onClick={triggerPrivacy} className="hover:text-white underline text-left cursor-pointer">
              Privacy Policy & HIPAA Statement
            </button>
            <button onClick={triggerTerms} className="hover:text-white underline text-left cursor-pointer">
              Terms of Service
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
