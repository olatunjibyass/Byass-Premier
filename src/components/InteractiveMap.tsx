/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { MapPin, Navigation, Map, Compass, Info, Check } from 'lucide-react';

export default function InteractiveMap() {
  const [directionStep, setDirectionStep] = useState<number | null>(null);

  const directionGuides = [
    {
      title: 'From Delaware / North (US-23)',
      steps: [
        'Head South on US-23 (Columbus Pike).',
        'Turn right onto Powell Road / SR-750 West.',
        'Continue West into downtown Powell for approximately 3 miles.',
        'Turn left onto South Liberty Street. Byass Premier is on the left.'
      ]
    },
    {
      title: 'From Columbus / South (I-270)',
      steps: [
        'Take I-270 to Sawmill Road North exit.',
        'Drive North on Sawmill Road (which becomes Sawmill Parkway).',
        'Turn right onto Powell Road / SR-750 East.',
        'Turn right onto South Liberty Street. The office is on your left.'
      ]
    }
  ];

  return (
    <div className="bg-white rounded-2xl border border-brand-cream-200/80 shadow-lg overflow-hidden">
      <div className="bg-brand-blue-900 p-4 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Map className="w-5 h-5 text-brand-blue-300" />
          <h4 className="font-display font-semibold text-sm">Byass Premier Interactive Locator</h4>
        </div>
        <span className="text-[10px] bg-brand-blue-950 font-bold px-2 py-0.5 rounded-full border border-brand-blue-800 text-brand-sage-500">
          HQ Office
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3">
        {/* SVG Styled Vector Map */}
        <div className="lg:col-span-2 bg-brand-blue-50/40 relative h-72 sm:h-80 flex items-center justify-center p-6 border-r border-gray-100">
          
          {/* Decorative Vector Grid Lines representing City Blocks */}
          <div className="absolute inset-0 opacity-10 bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:4rem_4rem]" />
          
          {/* Vector Streets representation */}
          <div className="absolute inset-x-0 top-1/3 h-10 bg-slate-200/60 flex items-center px-4" title="S. Liberty Street">
            <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 font-bold">S. Liberty Street</span>
          </div>
          <div className="absolute inset-y-0 left-1/4 w-12 bg-slate-200/60 flex items-center justify-center" title="Powell Road">
            <span className="text-[9px] font-mono uppercase tracking-wider text-slate-400 font-bold rotate-90 whitespace-nowrap">Powell Road</span>
          </div>
          <div className="absolute inset-y-0 right-1/4 w-8 bg-slate-300/30" />

          {/* Points of interest */}
          <div className="absolute top-10 right-12 bg-white/90 border border-brand-blue-100 rounded-lg p-2 text-center shadow-xs">
            <div className="text-[10px] font-bold text-brand-blue-900 leading-none">Powell Village Center</div>
            <div className="text-[8px] text-gray-400 mt-0.5">Downtown Powell</div>
          </div>

          <div className="absolute bottom-10 left-8 bg-white/90 border border-brand-blue-100 rounded-lg p-2 text-center shadow-xs">
            <div className="text-[10px] font-bold text-brand-blue-900 leading-none">Sawmill Parkway</div>
            <div className="text-[8px] text-gray-400 mt-0.5">0.8 Miles West</div>
          </div>

          {/* Principal HQ Pin marker */}
          <div className="absolute top-[28%] left-[23%] z-10 animate-bounce">
            <div className="bg-brand-blue-600 text-white p-3 rounded-full shadow-lg shadow-brand-blue-400 flex items-center justify-center relative">
              <MapPin className="w-6 h-6 fill-white text-brand-blue-600" />
              {/* Outer wave rings */}
              <div className="absolute inset-0 bg-brand-blue-500 rounded-full animate-ping opacity-30 pointer-events-none" />
            </div>
            {/* Popover badge */}
            <div className="bg-slate-900 text-white px-2.5 py-1 rounded-md text-[10px] font-bold tracking-wide mt-2 shadow-md uppercase whitespace-nowrap">
              Byass Premier HQ
            </div>
          </div>

          {/* Compass layout ornament */}
          <div className="absolute bottom-4 right-4 text-slate-300 flex flex-col items-center">
            <Compass className="w-8 h-8" />
            <span className="text-[8px] font-mono mt-0.5">GPS LOCATOR</span>
          </div>
        </div>

        {/* Directions Sidebar */}
        <div className="p-5 flex flex-col justify-between bg-white text-xs">
          <div>
            <div className="flex items-center gap-1.5 mb-3">
              <Info className="w-4 h-4 text-brand-blue-600 shrink-0" />
              <h5 className="font-semibold text-brand-blue-950 uppercase tracking-wide text-[10px]">
                Escorted Navigation Directions
              </h5>
            </div>
            <p className="text-gray-500 leading-relaxed mb-4">
              Select your origin route to view specific step-by-step navigation instructions for visiting our office:
            </p>

            <div className="space-y-2">
              {directionGuides.map((guide, idx) => (
                <button
                  key={guide.title}
                  onClick={() => setDirectionStep(directionStep === idx ? null : idx)}
                  className={`w-full text-left p-3 rounded-xl border transition-colors flex items-center justify-between gap-2 ${
                    directionStep === idx
                      ? 'border-brand-blue-600 bg-brand-blue-50 text-brand-blue-900 font-semibold'
                      : 'border-gray-200 text-gray-700 hover:bg-brand-cream-50'
                  }`}
                >
                  <span>{guide.title}</span>
                  <Navigation className={`w-3.5 h-3.5 shrink-0 ${directionStep === idx ? 'text-brand-blue-600' : 'text-gray-400'}`} />
                </button>
              ))}
            </div>
          </div>

          {/* Render active direction steps */}
          {directionStep !== null && (
            <div className="mt-4 p-3.5 bg-slate-900 text-slate-100 rounded-xl border border-slate-800 space-y-2.5 fade-in">
              <p className="font-semibold text-[10px] text-brand-blue-400 uppercase tracking-wider">
                {directionGuides[directionStep].title}
              </p>
              <ol className="space-y-1.5 text-[11px] list-decimal list-inside leading-snug text-slate-300">
                {directionGuides[directionStep].steps.map((stepStr, sIdx) => (
                  <li key={sIdx} className="pl-1">
                    <span className="text-slate-300">{stepStr}</span>
                  </li>
                ))}
              </ol>
            </div>
          )}

          <div className="mt-4 pt-3 border-t border-gray-100 text-[10px] text-gray-400 flex items-center justify-between">
            <span>Powell, OH 43065</span>
            <span>Phone support: (614) 296-3599</span>
          </div>
        </div>
      </div>
    </div>
  );
}
