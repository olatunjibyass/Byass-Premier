/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Calendar, Clock, User, Heart, MessageSquare, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Booking } from '../types';
import { SERVICES } from '../data';

interface BookingFormProps {
  initialCareType?: string;
  onAddBooking: (booking: Booking) => void;
  onClose?: () => void;
}

export default function BookingForm({ initialCareType, onAddBooking, onClose }: BookingFormProps) {
  const [step, setStep] = useState(1);
  const [careType, setCareType] = useState(initialCareType || SERVICES[0].title);
  const [recipient, setRecipient] = useState('Parent');
  const [preferredDate, setPreferredDate] = useState('');
  const [preferredTime, setPreferredTime] = useState('Morning (8:00 AM - 12:00 PM)');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleNextStep = () => {
    if (step === 1) {
      if (!careType || !recipient) {
        setValidationError('Please select the care type and the recipient.');
        return;
      }
      setValidationError('');
      setStep(2);
    } else if (step === 2) {
      if (!preferredDate) {
        setValidationError('Please select a preferred date for the consultation.');
        return;
      }
      // Date must be today or in the future
      const selected = new Date(preferredDate);
      const today = new Date();
      today.setHours(0,0,0,0);
      if (selected < today) {
        setValidationError('Consultation date cannot be in the past.');
        return;
      }
      setValidationError('');
      setStep(3);
    }
  };

  const handlePrevStep = () => {
    setValidationError('');
    setStep(step - 1);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.trim() || !clientPhone.trim()) {
      setValidationError('Please fill in your name, email, and phone number.');
      return;
    }

    // Basic email validation regex
    if (!/\S+@\S+\.\S+/.test(clientEmail)) {
      setValidationError('Please enter a valid email address.');
      return;
    }

    // Save booking to parent list
    const newBooking: Booking = {
      id: 'book-' + Math.random().toString(36).substr(2, 9),
      clientName,
      clientEmail,
      clientPhone,
      preferredDate,
      preferredTime,
      careType: `${careType} (for ${recipient})`,
      notes: notes.trim() || 'No additional notes provided.',
      status: 'Pending',
      createdAt: new Date().toISOString(),
    };

    onAddBooking(newBooking);
    setIsSubmitted(true);
    setValidationError('');
  };

  const timeSlots = [
    'Morning (8:00 AM - 12:00 PM)',
    'Midday (12:00 PM - 4:00 PM)',
    'Evening (4:00 PM - 8:00 PM)',
    'Overnight (8:00 PM - 8:00 AM)',
  ];

  const recipientOptions = ['Parent', 'Spouse', 'Self', 'Relative / Other'];

  if (isSubmitted) {
    return (
      <div className="text-center py-10 px-4 bg-white rounded-2xl border border-brand-cream-200/60 shadow-xl max-w-xl mx-auto fade-in">
        <div className="w-16 h-16 bg-brand-sage-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-brand-sage-600" />
        </div>
        <h3 className="font-display font-bold text-2xl text-brand-blue-950 mb-3">
          Care Request Submitted!
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed max-w-md mx-auto mb-8">
          Thank you, <strong className="text-brand-blue-950">{clientName}</strong>. Our registered nurse care coordinator will review your profile and contact you at <strong className="text-brand-blue-950">{clientPhone}</strong> within the next 2 hours to confirm your consultation schedule.
        </p>

        <div className="bg-brand-blue-50/50 rounded-xl p-5 border border-brand-blue-100 text-left mb-8 text-sm">
          <p className="font-semibold text-brand-blue-950 uppercase text-xs tracking-wider border-b border-brand-blue-100 pb-2 mb-3">
            Your Care Consultation Blueprint
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-4">
            <div>
              <span className="text-xs text-gray-400 block uppercase font-medium">Care Required</span>
              <span className="font-medium text-brand-blue-900">{careType}</span>
            </div>
            <div>
              <span className="text-xs text-gray-400 block uppercase font-medium">Recipient</span>
              <span className="font-medium text-brand-blue-900">{recipient}</span>
            </div>
            <div>
              <span className="text-xs text-gray-400 block uppercase font-medium">Preferred Date</span>
              <span className="font-medium text-brand-blue-900">{preferredDate}</span>
            </div>
            <div>
              <span className="text-xs text-gray-400 block uppercase font-medium">Preferred Time</span>
              <span className="font-medium text-brand-blue-900">{preferredTime}</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          {onClose && (
            <button
              onClick={onClose}
              className="px-6 py-2.5 border border-gray-200 rounded-xl font-medium text-sm text-gray-600 hover:bg-gray-50 transition-colors"
            >
              Close Window
            </button>
          )}
          <button
            onClick={() => {
              setStep(1);
              setClientName('');
              setClientEmail('');
              setClientPhone('');
              setNotes('');
              setIsSubmitted(false);
            }}
            className="px-6 py-2.5 bg-brand-blue-600 hover:bg-brand-blue-700 text-white font-medium text-sm rounded-xl transition-colors shadow-md shadow-brand-blue-200"
          >
            Submit Another Request
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-brand-cream-200/80 shadow-xl max-w-xl mx-auto overflow-hidden">
      {/* Header Progress Tracker */}
      <div className="bg-brand-blue-900 px-6 py-5 text-white flex justify-between items-center">
        <div>
          <h3 className="font-display font-bold text-lg">In-Home Care Consultation</h3>
          <p className="text-xs text-brand-blue-200 mt-0.5">Free clinical home assessment & custom care planning</p>
        </div>
        <div className="text-right shrink-0">
          <span className="text-xs font-semibold uppercase tracking-wider text-brand-blue-300">Step {step} of 3</span>
          <div className="w-24 h-1.5 bg-brand-blue-950 rounded-full mt-1.5 overflow-hidden">
            <div 
              className="h-full bg-brand-sage-500 transition-all duration-300"
              style={{ width: `${(step / 3) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="p-6">
        {validationError && (
          <div className="mb-4 p-3.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-medium">
            {validationError}
          </div>
        )}

        {/* STEP 1: CARE DETAIL SELECTION */}
        {step === 1 && (
          <div className="space-y-5 fade-in">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2.5">
                1. What specific type of care is required?
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {SERVICES.map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setCareType(s.title)}
                    className={`p-3.5 rounded-xl border text-left transition-all duration-200 flex items-start gap-3 ${
                      careType === s.title
                        ? 'border-brand-blue-600 bg-brand-blue-50/50 ring-2 ring-brand-blue-500/20 shadow-xs'
                        : 'border-gray-200 hover:border-brand-blue-300 hover:bg-brand-cream-50'
                    }`}
                  >
                    <div className={`p-1.5 rounded-lg shrink-0 ${careType === s.title ? 'bg-brand-blue-600 text-white' : 'bg-gray-100 text-gray-500'}`}>
                      <Heart className="w-4 h-4 fill-current" />
                    </div>
                    <div>
                      <span className="font-semibold text-xs block text-brand-blue-950 leading-tight">{s.title}</span>
                      <span className="text-[10px] text-gray-400 line-clamp-1 mt-0.5">{s.shortDescription}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2.5">
                2. Who is this care for?
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {recipientOptions.map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    onClick={() => setRecipient(opt)}
                    className={`py-3 px-1.5 rounded-xl border text-center font-medium text-xs transition-colors cursor-pointer ${
                      recipient === opt
                        ? 'border-brand-blue-600 bg-brand-blue-600 text-white font-bold'
                        : 'border-gray-200 text-gray-600 hover:bg-brand-cream-50'
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-2 border-t border-gray-100 flex justify-end">
              <button
                onClick={handleNextStep}
                className="w-full sm:w-auto bg-brand-blue-600 hover:bg-brand-blue-700 text-white text-sm font-semibold py-3 px-6 rounded-xl transition-all shadow-md shadow-brand-blue-200 flex items-center justify-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 2: SCHEDULING DETAILS */}
        {step === 2 && (
          <div className="space-y-5 fade-in">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
                Preferred Consultation Date
              </label>
              <p className="text-xs text-gray-400 mb-2.5">Our coordinator will align with this request during call verification.</p>
              <div className="relative">
                <input
                  type="date"
                  value={preferredDate}
                  onChange={(e) => setPreferredDate(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-brand-blue-500 text-sm font-medium"
                  required
                />
                <Calendar className="w-5 h-5 text-gray-400 absolute left-4 top-3 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2.5">
                Preferred Time of Day
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {timeSlots.map((slot) => (
                  <button
                    key={slot}
                    type="button"
                    onClick={() => setPreferredTime(slot)}
                    className={`p-3.5 rounded-xl border text-left transition-colors flex items-center gap-3 cursor-pointer ${
                      preferredTime === slot
                        ? 'border-brand-blue-600 bg-brand-blue-50 text-brand-blue-900 font-semibold ring-2 ring-brand-blue-500/20'
                        : 'border-gray-200 hover:border-brand-blue-300 hover:bg-brand-cream-50'
                    }`}
                  >
                    <Clock className={`w-4 h-4 shrink-0 ${preferredTime === slot ? 'text-brand-blue-600' : 'text-gray-400'}`} />
                    <span className="text-xs">{slot}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-between gap-3">
              <button
                onClick={handlePrevStep}
                className="border border-gray-200 text-gray-600 font-semibold py-3 px-5 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                onClick={handleNextStep}
                className="bg-brand-blue-600 hover:bg-brand-blue-700 text-white text-sm font-semibold py-3 px-6 rounded-xl transition-all shadow-md shadow-brand-blue-200 flex items-center gap-2"
              >
                <span>Continue</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: CONTACT INFORMATION */}
        {step === 3 && (
          <form onSubmit={handleSubmit} className="space-y-4 fade-in">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                Your Full Name <span className="text-rose-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="John Doe"
                  value={clientName}
                  onChange={(e) => setClientName(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-brand-blue-500 text-sm"
                  required
                />
                <User className="w-5 h-5 text-gray-400 absolute left-4 top-3 pointer-events-none" />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <input
                  type="email"
                  placeholder="johndoe@example.com"
                  value={clientEmail}
                  onChange={(e) => setClientEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-brand-blue-500 text-sm"
                  required
                />
              </div>
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                  Phone Number <span className="text-rose-500">*</span>
                </label>
                <input
                  type="tel"
                  placeholder="(555) 000-0000"
                  value={clientPhone}
                  onChange={(e) => setClientPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-brand-blue-500 text-sm"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                Special Care Notes or Mobility Obstacles (Optional)
              </label>
              <div className="relative">
                <textarea
                  rows={3}
                  placeholder="E.g., client has progressive Alzheimer's, uses a light walker, needs meal prep for specialized diabetic diet..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-brand-blue-500 text-sm"
                />
                <MessageSquare className="w-5 h-5 text-gray-400 absolute left-4 top-3 pointer-events-none" />
              </div>
            </div>

            <div className="pt-4 border-t border-gray-100 flex justify-between gap-3">
              <button
                type="button"
                onClick={handlePrevStep}
                className="border border-gray-200 text-gray-600 font-semibold py-3 px-5 rounded-xl hover:bg-gray-50 transition-colors flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
              <button
                type="submit"
                className="bg-brand-blue-600 hover:bg-brand-blue-700 text-white text-sm font-semibold py-3 px-6 rounded-xl transition-all shadow-md shadow-brand-blue-200 flex items-center gap-2"
              >
                <span>Request Free Assessment</span>
                <CheckCircle2 className="w-4 h-4" />
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
