/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Search, Phone } from 'lucide-react';
import { PageView } from '../types';

interface NavbarProps {
  currentView: PageView;
  setView: (view: PageView) => void;
  onSearch: (query: string) => void;
  onOpenQuickBooking: () => void;
}

export default function Navbar({ currentView, setView, onSearch, onOpenQuickBooking }: NavbarProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navItems: { label: string; view: PageView }[] = [
    { label: 'Home', view: 'home' },
    { label: 'About Us', view: 'about' },
    { label: 'Our Services', view: 'services' },
    { label: 'Careers', view: 'careers' },
    { label: 'Testimonials', view: 'testimonials' },
    { label: 'FAQs', view: 'faq' },
    { label: 'Contact Us', view: 'contact' },
  ];

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onSearch(searchQuery);
    }
  };

  const handleNavClick = (view: PageView) => {
    setView(view);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-brand-cream-200/80 shadow-xs">
      {/* Top Banner Alert for trust & compliance */}
      <div className="bg-brand-blue-900 text-white py-1.5 px-4 text-xs font-medium tracking-wide">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-1">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-brand-sage-500 animate-pulse" />
            <span>State-Licensed & Fully Bonded Compassionate Care In-Home Specialists</span>
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
            <form onSubmit={handleSearchSubmit} className="relative hidden xl:block">
              <div className="flex items-center">
                <input
                  type="text"
                  placeholder="Search care..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    onSearch(e.target.value);
                  }}
                  className="w-28 xl:w-36 pl-8 pr-3 py-1.5 rounded-full border border-gray-200 text-xs focus:ring-2 focus:ring-brand-blue-500 focus:outline-hidden transition-all duration-300"
                />
                <Search className="w-3 h-3 text-gray-400 absolute left-2.5 pointer-events-none" />
              </div>
            </form>

            <a 
              href="tel:+16142963599" 
              className="flex items-center gap-1 px-2.5 py-1.5 text-brand-blue-700 bg-brand-blue-50/80 hover:bg-brand-blue-100/80 rounded-xl text-xs font-semibold transition-all border border-brand-blue-100/60 shadow-xs whitespace-nowrap"
            >
              <Phone className="w-3 h-3 text-brand-blue-600 animate-pulse" />
              <span className="hidden lg:inline">Care:</span>
              <span>(614) 296-3599</span>
            </a>
          </div>

          {/* Mobile Actions: search toggle and call button - visible below md */}
          <div className="flex md:hidden items-center gap-1.5">
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="p-1.5 text-gray-500 hover:text-brand-blue-600 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label="Toggle Search"
            >
              <Search className="w-4.5 h-4.5" />
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

      {/* Mobile Search Row (expandable) */}
      {isSearchOpen && (
        <div className="md:hidden bg-brand-cream-50 border-t border-brand-cream-200 px-4 py-3 fade-in">
          <form onSubmit={handleSearchSubmit} className="relative w-full">
            <input
              type="text"
              placeholder="Search services, FAQs, careers..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                onSearch(e.target.value);
              }}
              className="w-full pl-9 pr-12 py-2 rounded-xl border border-gray-200 bg-white text-sm focus:ring-2 focus:ring-brand-blue-500 focus:outline-hidden"
              autoFocus
            />
            <Search className="w-4 h-4 text-gray-400 absolute left-3 top-3 pointer-events-none" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery('');
                  onSearch('');
                }}
                className="absolute right-3 top-2.5 text-xs text-gray-400 hover:text-gray-600"
              >
                Clear
              </button>
            )}
          </form>
        </div>
      )}
    </header>
  );
}
