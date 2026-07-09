/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Send, CheckCircle2, User, Mail, Phone, MessageSquare } from 'lucide-react';
import { Inquiry } from '../types';

interface ContactFormProps {
  onAddInquiry: (inquiry: Inquiry) => void;
}

export default function ContactForm({ onAddInquiry }: ContactFormProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [subject, setSubject] = useState('Request General Information');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !phone.trim() || !message.trim()) {
      setErrorMsg('Please fill in all required fields.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setErrorMsg('Please enter a valid email address.');
      return;
    }

    const newInquiry: Inquiry = {
      id: 'inq-' + Math.random().toString(36).substr(2, 9),
      name,
      email,
      phone,
      subject,
      message: message.trim(),
      status: 'New',
      createdAt: new Date().toISOString()
    };

    onAddInquiry(newInquiry);
    setIsSubmitted(true);
    setErrorMsg('');
  };

  if (isSubmitted) {
    return (
      <div className="bg-white p-8 rounded-2xl border border-brand-cream-200/60 shadow-lg text-center fade-in">
        <div className="w-14 h-14 bg-brand-sage-100 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle2 className="w-8 h-8 text-brand-sage-600" />
        </div>
        <h3 className="font-display font-bold text-xl text-brand-blue-950 mb-2">
          Inquiry Logged Securely!
        </h3>
        <p className="text-xs text-gray-600 leading-relaxed max-w-sm mx-auto mb-6">
          Thank you, <strong className="text-brand-blue-950">{name}</strong>. Your question has been forwarded to our local admin desk. A coordinator will email or call you shortly.
        </p>
        <button
          onClick={() => {
            setName('');
            setEmail('');
            setPhone('');
            setMessage('');
            setSubject('Request General Information');
            setIsSubmitted(false);
          }}
          className="text-xs font-semibold text-brand-blue-600 hover:text-brand-blue-800 underline focus:outline-hidden"
        >
          Send another inquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-2xl border border-brand-cream-200/80 shadow-lg space-y-4">
      <h3 className="font-display font-bold text-xl text-brand-blue-950 mb-1">
        Send Us a Message
      </h3>
      <p className="text-xs text-gray-400 mb-4">
        Our support agents monitor web inquiries and respond within 2 hours.
      </p>

      {errorMsg && (
        <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-medium">
          {errorMsg}
        </div>
      )}

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
          Full Name <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-blue-500"
            required
          />
          <User className="w-4.5 h-4.5 text-gray-400 absolute left-3.5 top-3 pointer-events-none" />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-blue-500"
              required
            />
            <Mail className="w-4.5 h-4.5 text-gray-400 absolute left-3.5 top-3 pointer-events-none" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
            Phone Number <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              type="tel"
              placeholder="(555) 000-0000"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-blue-500"
              required
            />
            <Phone className="w-4.5 h-4.5 text-gray-400 absolute left-3.5 top-3 pointer-events-none" />
          </div>
        </div>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
          Inquiry Subject
        </label>
        <select
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-blue-500"
        >
          <option value="Request General Information">Request General Information</option>
          <option value="Billing & Costs / Long-Term Care Insurance">Billing & Costs / LTCI</option>
          <option value="Caregiver Scheduling Question">Caregiver Scheduling</option>
          <option value="Complaints or State Compliance feedback">Regulatory & Compliance feedback</option>
          <option value="Partnership & Referrals request">Professional Medical Partnership</option>
        </select>
      </div>

      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
          Your Message <span className="text-rose-500">*</span>
        </label>
        <div className="relative">
          <textarea
            rows={4}
            placeholder="Tell us about your home care queries or clinical needs..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-blue-500"
            required
          />
          <MessageSquare className="w-4.5 h-4.5 text-gray-400 absolute left-3.5 top-3 pointer-events-none" />
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-brand-blue-600 hover:bg-brand-blue-700 text-white font-semibold text-sm py-3 rounded-xl transition-all shadow-md shadow-brand-blue-200 flex items-center justify-center gap-2"
      >
        <span>Send Secure Message</span>
        <Send className="w-4 h-4" />
      </button>
    </form>
  );
}
