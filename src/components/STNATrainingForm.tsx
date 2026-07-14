/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { CheckCircle2, GraduationCap, Calendar, Phone, Mail, Clock, Send, DollarSign, Award } from 'lucide-react';

export default function STNATrainingForm() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    preferredSchedule: 'Day Shift (2 Weeks)',
    paymentOption: 'Full Payment ($600)',
    hasExperience: 'No',
    notes: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.email || !formData.phone) {
      alert('Please fill out all required fields.');
      return;
    }
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-emerald-50 border border-emerald-200 rounded-3xl p-8 text-center space-y-4 max-w-lg mx-auto shadow-sm fade-in">
        <div className="mx-auto w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center">
          <CheckCircle2 className="w-9 h-9" />
        </div>
        <h3 className="font-display font-extrabold text-2xl text-slate-900 tracking-tight">
          Enrollment Inquiry Submitted!
        </h3>
        <p className="text-sm text-slate-600 leading-relaxed max-w-sm mx-auto">
          Thank you, <span className="font-semibold text-emerald-700">{formData.fullName}</span>. Your STNA course registration inquiry has been received.
        </p>
        <p className="text-xs text-slate-500 leading-relaxed max-w-sm mx-auto">
          An administration coordinator will contact you at <span className="font-semibold text-slate-700">{formData.phone}</span> or <span className="font-semibold text-slate-700">{formData.email}</span> within 24 business hours to complete your orientation paperwork and confirm your slot.
        </p>
        <div className="bg-white rounded-xl p-4.5 border border-emerald-100 text-left space-y-2 max-w-xs mx-auto">
          <div className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Registration Summary:</div>
          <div className="text-xs text-slate-700"><span className="font-semibold">Schedule:</span> {formData.preferredSchedule}</div>
          <div className="text-xs text-slate-700"><span className="font-semibold">Tuition Option:</span> {formData.paymentOption}</div>
        </div>
        <button
          onClick={() => {
            setSubmitted(false);
            setFormData({
              fullName: '',
              email: '',
              phone: '',
              preferredSchedule: 'Day Shift (2 Weeks)',
              paymentOption: 'Full Payment ($600)',
              hasExperience: 'No',
              notes: '',
            });
          }}
          className="text-xs font-semibold text-emerald-700 hover:text-emerald-800 underline block mx-auto cursor-pointer"
        >
          Submit Another Inquiry
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-brand-cream-200/80 p-6 md:p-8 space-y-6">
      <div className="space-y-1.5">
        <h3 className="font-display font-black text-xl text-brand-blue-950 uppercase tracking-wide flex items-center gap-2">
          <GraduationCap className="w-5 h-5 text-emerald-600" />
          <span>Course Registration Intake</span>
        </h3>
        <p className="text-xs text-gray-500 leading-relaxed">
          Ready to kickstart your nursing career? Fill out the secure registration inquiry form below. Our classes fill up quickly.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4 text-xs">
        <div className="space-y-1">
          <label className="block font-bold text-gray-700 uppercase tracking-wider">Full Name <span className="text-red-500">*</span></label>
          <input
            type="text"
            required
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50/50"
            placeholder="Jane Doe"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block font-bold text-gray-700 uppercase tracking-wider">Email Address <span className="text-red-500">*</span></label>
            <input
              type="email"
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50/50"
              placeholder="jane@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            />
          </div>
          <div className="space-y-1">
            <label className="block font-bold text-gray-700 uppercase tracking-wider">Phone Number <span className="text-red-500">*</span></label>
            <input
              type="tel"
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50/50"
              placeholder="(614) 555-0199"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="block font-bold text-gray-700 uppercase tracking-wider">Preferred Class Schedule</label>
            <select
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50/50"
              value={formData.preferredSchedule}
              onChange={(e) => setFormData({ ...formData, preferredSchedule: e.target.value })}
            >
              <option value="Day Shift (2 Weeks)">Day Shift (2 Weeks)</option>
              <option value="Evening Shift (4 Weeks)">Evening Shift (4 Weeks)</option>
              <option value="Weekend Shift (5 Weeks)">Weekend Shift (5 Weeks)</option>
            </select>
          </div>

          <div className="space-y-1">
            <label className="block font-bold text-gray-700 uppercase tracking-wider">Tuition Payment Option</label>
            <select
              className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50/50"
              value={formData.paymentOption}
              onChange={(e) => setFormData({ ...formData, paymentOption: e.target.value })}
            >
              <option value="Full Payment ($600)">Full Payment ($600)</option>
              <option value="2-Part Payment Plans">2-Part Payment Plan</option>
              <option value="Weekly Installments">Weekly Installments</option>
            </select>
          </div>
        </div>

        <div className="space-y-1">
          <label className="block font-bold text-gray-700 uppercase tracking-wider">Any Previous Caregiver Experience?</label>
          <select
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50/50"
            value={formData.hasExperience}
            onChange={(e) => setFormData({ ...formData, hasExperience: e.target.value })}
          >
            <option value="No">No, I am completely new to the industry</option>
            <option value="Yes - Informal">Yes, informal/family care experience</option>
            <option value="Yes - Professional">Yes, professional caregiving experience</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="block font-bold text-gray-700 uppercase tracking-wider">Additional Notes / Questions (Optional)</label>
          <textarea
            rows={3}
            className="w-full px-3.5 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 bg-gray-50/50"
            placeholder="Let us know if you need financial assistance information, scheduling details, or have specific questions..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold rounded-2xl transition-all shadow-md uppercase tracking-wider text-xs flex items-center justify-center gap-2 cursor-pointer mt-2"
        >
          <Send className="w-4 h-4" />
          <span>Submit Course Enrollment</span>
        </button>
      </form>
    </div>
  );
}
