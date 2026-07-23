/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, GraduationCap, Users, MapPin, Sparkles } from 'lucide-react';
import { PageView } from '../types';

interface NavbarProps {
  currentView: PageView;
  setView: (view: PageView) => void;
  onOpenQuickBooking: () => void;
}

export default function Navbar({ currentView, setView, onOpenQuickBooking }: NavbarProps) {
  const navItems: { label: string; view: PageView }[] = [
    { label: 'Home', view: 'home' },
    { label: 'About Us', view: 'about' },
    { label: 'Our Services', view: 'services' },
    { label: 'STNA Training', view: 'training' },
    { label: 'Careers', view: 'careers' },
    { label: 'Testimonials', view: 'testimonials' },
    { label: 'FAQs', view: 'faq' },
    { label: 'Contact Us', view: 'contact' },
  ];

  const handleNavClick = (view: PageView) => {
    setView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-brand-cream-200/80 shadow-xs">
      {/* Top Banner Alert for trust & compliance */}
      <div className="bg-brand-blue-900 text-white py-1.5 px-4 text-xs font-medium tracking-wide">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="w-2 h-2 rounded-full bg-brand-sage-500 animate-pulse" />
            <span>State-Licensed & Fully Bonded Compassionate Care Specialists</span>
            <span className="bg-brand-sage-500 text-brand-blue-950 font-black px-2.5 py-0.5 rounded-full text-[10px] tracking-wide inline-flex items-center gap-1 shadow-xs border border-brand-sage-300">
              <MapPin className="w-3 h-3 text-brand-blue-950 fill-brand-blue-950" />
              <span>Now Serving Michigan!</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <a href="tel:+16142963599" className="flex items-center gap-1 hover:text-brand-blue-200 transition-colors">
              <Phone className="w-3.5 h-3.5" />
              <span>Call 24/7 Care Support: (614) 296-3599</span>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14 md:h-16 lg:h-18">
          {/* Logo & Brand Text on the Left */}
          <div 
            className="flex items-center gap-2 md:gap-3 cursor-pointer select-none"
            onClick={() => handleNavClick('home')}
            id="nav-logo"
          >
            <img 
              src="https://i.postimg.cc/TpY2c2Ym/Capture.png" 
              alt="Byass Premier Logo" 
              className="h-8 md:h-10 lg:h-11 w-auto object-contain transition-all duration-300 hover:scale-102"
              referrerPolicy="no-referrer"
            />
            <div className="flex flex-col justify-center">
              <span className="font-display font-black text-xs md:text-sm lg:text-base xl:text-lg tracking-wider text-brand-blue-800 leading-none">
                BYASS PREMIER
              </span>
              <span className="font-sans font-semibold text-[8px] md:text-[10px] lg:text-xs tracking-widest text-brand-sage-600 uppercase mt-0.5 leading-none">
                HEALTH CARE
              </span>
            </div>
          </div>

          {/* Desktop Navigation - Middle */}
          <nav className="hidden md:flex items-center gap-0.5 lg:gap-1.5 xl:gap-2">
            {navItems.map((item) => (
              <button
                key={item.view}
                onClick={() => handleNavClick(item.view)}
                className={`px-1.5 py-1.5 lg:px-2.5 lg:py-2 rounded-lg font-medium text-[11px] lg:text-xs xl:text-sm transition-all duration-200 ${
                  currentView === item.view
                    ? 'bg-brand-blue-50 text-brand-blue-700 font-semibold'
                    : 'text-gray-600 hover:text-brand-blue-600 hover:bg-brand-cream-50'
                }`}
                id={`nav-${item.view}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop Actions & Hotline - Right */}
          <div className="hidden md:flex items-center gap-2">
            <button
              onClick={() => handleNavClick('training')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all shadow-xs uppercase tracking-wider ${
                currentView === 'training'
                  ? 'bg-emerald-700 text-white'
                  : 'bg-emerald-600 hover:bg-emerald-700 text-white'
              }`}
              id="nav-become-stna-desktop"
            >
              <GraduationCap className="w-3.5 h-3.5" />
              <span>Become A STNA</span>
            </button>

            <a 
              href="tel:+16142963599" 
              className="flex items-center gap-1 px-2.5 py-1.5 text-brand-blue-700 bg-brand-blue-50/80 hover:bg-brand-blue-100/80 rounded-xl text-xs font-semibold transition-all border border-brand-blue-100/60 shadow-xs whitespace-nowrap"
            >
              <Phone className="w-3 h-3 text-brand-blue-600 animate-pulse" />
              <span className="hidden lg:inline">Care:</span>
              <span>(614) 296-3599</span>
            </a>
          </div>

          {/* Mobile Actions: Become A STNA and call button - visible below md */}
          <div className="flex md:hidden items-center gap-1.5">
            <button
              onClick={() => handleNavClick('training')}
              className="flex items-center gap-1 px-2 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-[10px] font-bold uppercase tracking-wider transition-all"
              id="nav-become-stna-mobile"
            >
              <GraduationCap className="w-3 h-3" />
              <span>Become A STNA</span>
            </button>
            <a 
              href="tel:+16142963599" 
              className="p-1.5 text-brand-blue-600 bg-brand-blue-50 hover:bg-brand-blue-100 rounded-lg transition-all border border-brand-blue-100/60 flex items-center justify-center"
              aria-label="Call Care support"
            >
              <Phone className="w-4 h-4" />
            </a>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Row (Pills) - ALWAYS VISIBLE below md breakpoint "on the go" */}
      <div className="md:hidden bg-brand-cream-50/75 border-t border-brand-cream-200/50 py-2.5 px-4 overflow-x-auto no-scrollbar scroll-smooth flex items-center gap-2">
        {navItems.map((item) => {
          const isActive = currentView === item.view;
          return (
            <button
              key={item.view}
              onClick={() => handleNavClick(item.view)}
              className={`whitespace-nowrap px-3.5 py-1.5 rounded-full font-medium text-xs transition-all duration-200 ${
                isActive
                  ? 'bg-brand-blue-600 text-white shadow-xs font-semibold scale-102'
                  : 'bg-white text-gray-700 hover:bg-gray-50 hover:text-brand-blue-600 border border-gray-200 shadow-2xs'
              }`}
              id={`mobile-nav-${item.view}`}
            >
              {item.label}
            </button>
          );
        })}
      </div>
    </header>
  );
}
