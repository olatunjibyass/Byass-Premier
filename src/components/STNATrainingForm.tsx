/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Phone, AlertTriangle, GraduationCap, Clock, CheckCircle, Calendar, Sparkles } from 'lucide-react';

export default function STNATrainingForm() {
  return (
    <div className="bg-slate-900 text-white rounded-3xl shadow-xl border border-slate-800 p-6 md:p-8 space-y-6 relative overflow-hidden">
      {/* Decorative background flare */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

      {/* Urgency Alert Badge */}
      <div className="flex items-center gap-2 px-3 py-2 bg-amber-500/10 border border-amber-500/20 rounded-2xl text-amber-300">
        <AlertTriangle className="w-5 h-5 shrink-0 text-amber-400" />
        <div className="text-xs font-bold uppercase tracking-wider">
          Class Seats Filling Fast!
        </div>
      </div>

      {/* Main Title & Statement */}
      <div className="space-y-2">
        <h3 className="font-display font-black text-2xl text-white tracking-tight flex items-center gap-2">
          <GraduationCap className="w-6 h-6 text-emerald-400" />
          <span>Call Us To Secure Your Seat</span>
        </h3>
        <p className="text-xs text-slate-300 leading-relaxed">
          Due to extremely high demand and our limited-time <span className="text-emerald-400 font-bold">$600 Launch Special</span>, remaining classroom and clinical slots are getting filled very quickly. 
        </p>
        <p className="text-xs text-slate-300 leading-relaxed">
          Online enrollment form registrations are currently paused. <span className="font-semibold text-white">Direct call-in is required</span> to lock in your schedule and promotional tuition pricing.
        </p>
      </div>

      {/* High-visibility Phone Actions */}
      <div className="space-y-3 pt-2">
        <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
          Call Admissions Support Now:
        </div>
        
        <div className="grid grid-cols-1 gap-3">
          <a
            href="tel:+16142963599"
            className="flex items-center justify-between p-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-2xl transition-all duration-300 group shadow-md"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Phone className="w-4.5 h-4.5" />
              </div>
              <div className="text-left">
                <div className="text-[9px] font-bold uppercase tracking-wider text-emerald-100">Primary Line (24/7)</div>
                <div className="text-base font-extrabold tracking-tight">(614) 296-3599</div>
              </div>
            </div>
            <span className="text-xs bg-white/20 px-2.5 py-1 rounded-lg font-bold uppercase tracking-wider text-[10px]">
              Call Now
            </span>
          </a>

          <a
            href="tel:+16144016775"
            className="flex items-center justify-between p-4 bg-slate-800 hover:bg-slate-700 text-white rounded-2xl transition-all duration-300 group border border-slate-700/60"
          >
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-slate-700 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Phone className="w-4.5 h-4.5 text-emerald-400" />
              </div>
              <div className="text-left">
                <div className="text-[9px] font-bold uppercase tracking-wider text-slate-400">Secondary Line</div>
                <div className="text-base font-extrabold tracking-tight">(614) 401-6775</div>
              </div>
            </div>
            <span className="text-xs bg-slate-700 text-emerald-400 px-2.5 py-1 rounded-lg font-bold uppercase tracking-wider text-[10px]">
              Call Now
            </span>
          </a>
        </div>
      </div>

      {/* Helpful guidelines for caller */}
      <div className="bg-slate-950/80 p-4.5 rounded-2xl border border-slate-800/80 space-y-3">
        <div className="flex items-center gap-1.5 text-emerald-400 font-semibold text-xs">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Quick Preparation Checklist:</span>
        </div>
        
        <ul className="space-y-2 text-[11px] text-slate-300">
          <li className="flex items-start gap-2">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
            <span>Mention the <span className="text-white font-semibold">STNA $600 Launch Special</span> discount rate.</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
            <span>Select your shift preference (Morning, Evening, or Weekend).</span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
            <span>Inquire about flexible payment installment plans.</span>
          </li>
        </ul>
      </div>

      {/* Footer slogan */}
      <div className="text-center text-[10px] text-slate-500 pt-1 border-t border-slate-800/60">
        Admissions lines open 24 hours. Class location: Powell, OH.
      </div>
    </div>
  );
}
