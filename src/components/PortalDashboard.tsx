/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { 
  Booking, 
  JobApplication, 
  Inquiry 
} from '../types';
import { 
  ClipboardCheck, 
  Users, 
  Briefcase, 
  Inbox, 
  Activity, 
  Clock, 
  Heart, 
  CheckCircle, 
  XCircle, 
  UserCheck, 
  Calendar,
  Eye,
  Trash2,
  FileText
} from 'lucide-react';

interface PortalDashboardProps {
  bookings: Booking[];
  applications: JobApplication[];
  inquiries: Inquiry[];
  onUpdateBookingStatus: (id: string, status: Booking['status']) => void;
  onUpdateAppStatus: (id: string, status: JobApplication['status']) => void;
  onUpdateInquiryStatus: (id: string, status: Inquiry['status']) => void;
  onDeleteBooking: (id: string) => void;
  onDeleteApplication: (id: string) => void;
  onDeleteInquiry: (id: string) => void;
}

export default function PortalDashboard({
  bookings,
  applications,
  inquiries,
  onUpdateBookingStatus,
  onUpdateAppStatus,
  onUpdateInquiryStatus,
  onDeleteBooking,
  onDeleteApplication,
  onDeleteInquiry
}: PortalDashboardProps) {
  const [activeTab, setActiveTab] = useState<'overview' | 'bookings' | 'careers' | 'inquiries' | 'match'>('overview');
  const [selectedItem, setSelectedItem] = useState<{ type: 'booking' | 'app' | 'inq'; item: any } | null>(null);

  // Caregiver matching simulator state
  const [matchingBookingId, setMatchingBookingId] = useState('');
  const [matchingCaregiver, setMatchingCaregiver] = useState('Elena Rostova (Companion Care - 4 yrs exp)');
  const [matchingSuccessMsg, setMatchingSuccessMsg] = useState('');

  const mockCaregivers = [
    { name: 'Elena Rostova', role: 'Companion Care Specialist', exp: '4 Years', rating: '4.9/5' },
    { name: 'David Vance', role: 'Alzheimer\'s Specialist HHA', exp: '6 Years', rating: '5.0/5' },
    { name: 'Sarah Jenkins', role: 'Certified Nursing Assistant (CNA)', exp: '3 Years', rating: '4.8/5' },
    { name: 'Michael Peterson', role: 'Post-Surgery CNA', exp: '5 Years', rating: '4.9/5' },
  ];

  const handleMatchCaregiver = (e: React.FormEvent) => {
    e.preventDefault();
    if (!matchingBookingId) {
      alert('Please select a pending care request to match.');
      return;
    }
    const target = bookings.find(b => b.id === matchingBookingId);
    if (target) {
      onUpdateBookingStatus(matchingBookingId, 'Confirmed');
      setMatchingSuccessMsg(`Successfully matched caregiver ${matchingCaregiver} with client ${target.clientName} for their requested ${target.careType} plan! Scheduling status updated to 'Confirmed'.`);
      setTimeout(() => setMatchingSuccessMsg(''), 5000);
    }
  };

  return (
    <div className="bg-slate-50 rounded-2xl border border-brand-cream-200 shadow-xl overflow-hidden fade-in min-h-[550px]">
      {/* Portal Top Bar */}
      <div className="bg-slate-900 px-6 py-6 text-white flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <div className="flex items-center gap-2">
            <div className="bg-brand-blue-600 w-2.5 h-2.5 rounded-full animate-pulse" />
            <span className="text-[10px] uppercase font-bold tracking-widest text-brand-blue-400">Byass Agency Portal</span>
          </div>
          <h2 className="font-display font-bold text-2xl tracking-tight text-white mt-1">
            Care Operations & Inbound Desk
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Real-time tracking of in-home care bookings, employment files, and community general inquiries.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex flex-wrap gap-1 bg-slate-800 p-1 rounded-xl w-full md:w-auto">
          {[
            { id: 'overview', label: 'Console', icon: Activity },
            { id: 'bookings', label: 'Bookings', count: bookings.length, icon: ClipboardCheck },
            { id: 'careers', label: 'Careers', count: applications.length, icon: Briefcase },
            { id: 'inquiries', label: 'Messages', count: inquiries.length, icon: Inbox },
            { id: 'match', label: 'Matching Panel', icon: UserCheck },
          ].map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setSelectedItem(null);
                }}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-lg font-semibold text-xs transition-all cursor-pointer grow md:grow-0 justify-center ${
                  activeTab === tab.id
                    ? 'bg-brand-blue-600 text-white shadow-md'
                    : 'text-slate-400 hover:text-white hover:bg-slate-700/50'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span className={`text-[10px] px-1.5 py-0.2 rounded-full ${activeTab === tab.id ? 'bg-white text-brand-blue-700 font-bold' : 'bg-slate-700 text-slate-300'}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <div className="p-6">
        {/* OVERVIEW CONSOLE TAB */}
        {activeTab === 'overview' && (
          <div className="space-y-6 fade-in">
            {/* Quick Metrics Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-white p-4.5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4">
                <div className="bg-brand-blue-50 text-brand-blue-600 p-3 rounded-xl">
                  <ClipboardCheck className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase font-bold tracking-wider">Requested Bookings</span>
                  <span className="text-2xl font-bold text-gray-800">{bookings.length}</span>
                  <span className="text-[10px] text-brand-sage-600 block font-semibold mt-0.5">
                    {bookings.filter(b => b.status === 'Pending').length} Pending Assessment
                  </span>
                </div>
              </div>

              <div className="bg-white p-4.5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4">
                <div className="bg-brand-sage-50 text-brand-sage-600 p-3 rounded-xl">
                  <Briefcase className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase font-bold tracking-wider">Candidate Resumes</span>
                  <span className="text-2xl font-bold text-gray-800">{applications.length}</span>
                  <span className="text-[10px] text-brand-blue-600 block font-semibold mt-0.5">
                    {applications.filter(a => a.status === 'Received').length} New Applications
                  </span>
                </div>
              </div>

              <div className="bg-white p-4.5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4">
                <div className="bg-purple-50 text-purple-600 p-3 rounded-xl">
                  <Inbox className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase font-bold tracking-wider">Support Messages</span>
                  <span className="text-2xl font-bold text-gray-800">{inquiries.length}</span>
                  <span className="text-[10px] text-purple-600 block font-semibold mt-0.5">
                    {inquiries.filter(i => i.status === 'New').length} New Messages
                  </span>
                </div>
              </div>

              <div className="bg-white p-4.5 rounded-2xl border border-gray-100 shadow-xs flex items-center gap-4">
                <div className="bg-amber-50 text-amber-600 p-3 rounded-xl">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-[10px] text-gray-400 block uppercase font-bold tracking-wider">Match Efficiency</span>
                  <span className="text-2xl font-bold text-gray-800">
                    {bookings.length > 0 ? Math.round((bookings.filter(b => b.status === 'Confirmed').length / bookings.length) * 100) : 100}%
                  </span>
                  <span className="text-[10px] text-gray-500 block mt-0.5">Caregiver-Client Sync</span>
                </div>
              </div>
            </div>

            {/* Quick Activity Lists split panel */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Left Panel: Recent Bookings */}
              <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <ClipboardCheck className="w-4 h-4 text-brand-blue-600" />
                    <h3 className="font-display font-bold text-sm text-brand-blue-950">Recent Consultation Requests</h3>
                  </div>
                  <button onClick={() => setActiveTab('bookings')} className="text-xs text-brand-blue-600 hover:underline font-semibold">
                    View All
                  </button>
                </div>

                {bookings.length === 0 ? (
                  <div className="text-center py-8 text-gray-400 text-xs">
                    No bookings logged yet. Clients dial (614) 296-3599 directly to initiate care requests!
                  </div>
                ) : (
                  <div className="space-y-3">
                    {bookings.slice(0, 3).map((b) => (
                      <div key={b.id} className="p-3 bg-slate-50 rounded-xl flex justify-between items-center text-xs">
                        <div>
                          <p className="font-bold text-gray-800">{b.clientName}</p>
                          <p className="text-gray-500 text-[10px]">{b.careType}</p>
                          <p className="text-gray-400 text-[9px] mt-0.5">{b.preferredDate} at {b.preferredTime}</p>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                          b.status === 'Confirmed' ? 'bg-brand-sage-100 text-brand-sage-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {b.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Right Panel: Job Applications */}
              <div className="bg-white p-5 rounded-2xl border border-gray-200/80 shadow-xs">
                <div className="flex justify-between items-center border-b border-gray-100 pb-3 mb-3">
                  <div className="flex items-center gap-2">
                    <Briefcase className="w-4 h-4 text-brand-sage-600" />
                    <h3 className="font-display font-bold text-sm text-brand-blue-950">Active Caregiver Candidates</h3>
                  </div>
                  <button onClick={() => setActiveTab('careers')} className="text-xs text-brand-blue-600 hover:underline font-semibold">
                    View All
                  </button>
                </div>

                {applications.length === 0 ? (
                  <div className="text-center py-8 text-gray-400 text-xs">
                    No caregiver applications received yet. Go to Careers and upload a resume!
                  </div>
                ) : (
                  <div className="space-y-3">
                    {applications.slice(0, 3).map((app) => (
                      <div key={app.id} className="p-3 bg-slate-50 rounded-xl flex justify-between items-center text-xs">
                        <div>
                          <p className="font-bold text-gray-800">{app.applicantName}</p>
                          <p className="text-gray-500 text-[10px]">{app.jobTitle}</p>
                          <p className="text-brand-blue-600 text-[9px] font-semibold mt-0.5">Resume: {app.resumeName}</p>
                        </div>
                        <span className="bg-brand-blue-100 text-brand-blue-800 px-2 py-0.5 rounded-full text-[9px] font-bold">
                          {app.status}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Quick Security & Compliance Note */}
            <div className="p-4 bg-slate-900 text-slate-300 rounded-xl text-xs flex items-start gap-3 border border-slate-800">
              <span className="text-brand-sage-500 text-base font-bold select-none shrink-0 mt-0.5">✔</span>
              <p className="leading-relaxed">
                <strong>HIPAA Security Notice:</strong> All local records are saved directly to sandboxed local state. Personal data, patient care notes, and employee social background screenings are isolated and processed in absolute compliance with national clinical safety rules.
              </p>
            </div>
          </div>
        )}

        {/* CONSULTATION BOOKINGS TAB */}
        {activeTab === 'bookings' && (
          <div className="space-y-4 fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-gray-100 pb-3">
              <h3 className="font-display font-bold text-lg text-brand-blue-950">Care Consultation Bookings</h3>
              <p className="text-xs text-gray-500">Total {bookings.length} records</p>
            </div>

            {bookings.length === 0 ? (
              <div className="bg-white text-center py-12 rounded-2xl border border-gray-200 text-gray-500 text-sm">
                <ClipboardCheck className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="font-semibold">No Consultation Bookings Registered</p>
                <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
                  Clients dial (614) 296-3599 directly to request customized home healthcare services and schedule direct safety audits.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {bookings.map((b) => (
                  <div key={b.id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between relative group">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <span className="text-[10px] font-mono text-gray-400 block">{b.id}</span>
                          <h4 className="font-bold text-sm text-gray-900 mt-0.5">{b.clientName}</h4>
                        </div>
                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold ${
                          b.status === 'Confirmed' ? 'bg-brand-sage-100 text-brand-sage-700' :
                          b.status === 'Completed' ? 'bg-brand-blue-100 text-brand-blue-700' :
                          b.status === 'Cancelled' ? 'bg-rose-100 text-rose-700' : 'bg-amber-100 text-amber-700'
                        }`}>
                          {b.status}
                        </span>
                      </div>

                      <div className="mt-3.5 space-y-2 text-xs border-t border-gray-100 pt-3">
                        <p className="text-gray-600 font-semibold"><span className="text-gray-400 font-medium">Care:</span> {b.careType}</p>
                        <p className="text-gray-600"><span className="text-gray-400">Date/Time:</span> {b.preferredDate} at {b.preferredTime}</p>
                        <p className="text-gray-600"><span className="text-gray-400">Contact:</span> {b.clientPhone} | {b.clientEmail}</p>
                        <p className="text-gray-500 bg-slate-50 p-2 rounded-lg italic text-[11px] leading-relaxed mt-2 border border-slate-100">
                          &ldquo;{b.notes}&rdquo;
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 pt-3.5 border-t border-gray-100 flex items-center justify-between gap-2">
                      <div className="flex gap-1">
                        <button
                          onClick={() => onUpdateBookingStatus(b.id, 'Confirmed')}
                          className="bg-brand-sage-600 hover:bg-brand-sage-700 text-white font-semibold text-[10px] px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                        >
                          Confirm
                        </button>
                        <button
                          onClick={() => onUpdateBookingStatus(b.id, 'Cancelled')}
                          className="bg-rose-600 hover:bg-rose-700 text-white font-semibold text-[10px] px-2.5 py-1.5 rounded-lg transition-colors cursor-pointer"
                        >
                          Cancel
                        </button>
                      </div>
                      <button
                        onClick={() => onDeleteBooking(b.id)}
                        className="text-gray-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50"
                        title="Delete Record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CAREERS APPLICATIONS TAB */}
        {activeTab === 'careers' && (
          <div className="space-y-4 fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-gray-100 pb-3">
              <h3 className="font-display font-bold text-lg text-brand-blue-950">Caregiver Job Candidates</h3>
              <p className="text-xs text-gray-500">Total {applications.length} applications</p>
            </div>

            {applications.length === 0 ? (
              <div className="bg-white text-center py-12 rounded-2xl border border-gray-200 text-gray-500 text-sm">
                <Briefcase className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="font-semibold">No Employment Applications Received</p>
                <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
                  Go to our Careers page, browse open CNA / Companion postings, upload your resume, and click submit!
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {applications.map((app) => (
                  <div key={app.id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start gap-2">
                        <div>
                          <span className="text-[10px] font-mono text-gray-400 block">{app.id}</span>
                          <h4 className="font-bold text-sm text-gray-900 mt-0.5">{app.applicantName}</h4>
                          <span className="text-[10px] bg-brand-blue-50 text-brand-blue-700 font-semibold px-2 py-0.5 rounded-md mt-1 inline-block">
                            {app.jobTitle}
                          </span>
                        </div>
                        <span className="bg-brand-sage-50 text-brand-sage-700 text-[10px] font-bold px-2.5 py-0.5 rounded-full">
                          {app.status}
                        </span>
                      </div>

                      <div className="mt-4 space-y-2 text-xs border-t border-gray-100 pt-3.5">
                        <p className="text-gray-600"><span className="text-gray-400">Contacts:</span> {app.applicantPhone} | {app.applicantEmail}</p>
                        
                        <div className="bg-brand-blue-50/40 p-2.5 rounded-lg border border-brand-blue-100/50 mt-2 flex items-center gap-2">
                          <FileText className="w-4 h-4 text-brand-blue-600 shrink-0" />
                          <div className="min-w-0">
                            <span className="text-[10px] text-gray-400 block">Uploaded Resume File</span>
                            <span className="font-semibold text-gray-700 truncate block text-[11px]">{app.resumeName}</span>
                          </div>
                        </div>

                        {app.qualifications.length > 0 && (
                          <div className="mt-2">
                            <span className="text-[10px] text-gray-400 font-bold block uppercase mb-1">State Checked Credentials</span>
                            <div className="flex flex-wrap gap-1">
                              {app.qualifications.map((q: string, qIdx: number) => (
                                <span key={qIdx} className="bg-slate-100 text-slate-700 text-[9px] font-semibold px-1.5 py-0.5 rounded border border-slate-200">
                                  {q.split(' ')[0]} Verified
                                </span>
                              ))}
                            </div>
                          </div>
                        )}

                        {app.coverLetter && (
                          <p className="text-gray-500 bg-slate-50 p-2 rounded-lg italic text-[11px] leading-relaxed mt-2 border border-slate-100">
                            &ldquo;{app.coverLetter}&rdquo;
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-gray-100 flex justify-between items-center">
                      <div className="flex gap-1.5">
                        <select
                          value={app.status}
                          onChange={(e) => onUpdateAppStatus(app.id, e.target.value as any)}
                          className="bg-slate-100 text-slate-800 text-[10px] font-bold px-2 py-1.5 rounded-lg border border-slate-200"
                        >
                          <option value="Received">Received</option>
                          <option value="Reviewed">Reviewed</option>
                          <option value="Interview">Interview</option>
                          <option value="Hired">Hired</option>
                          <option value="Declined">Declined</option>
                        </select>
                      </div>
                      <button
                        onClick={() => onDeleteApplication(app.id)}
                        className="text-gray-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* GENERAL INQUIRIES MESSAGES TAB */}
        {activeTab === 'inquiries' && (
          <div className="space-y-4 fade-in">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-gray-100 pb-3">
              <h3 className="font-display font-bold text-lg text-brand-blue-950">Inbound Support Messages</h3>
              <p className="text-xs text-gray-500">Total {inquiries.length} records</p>
            </div>

            {inquiries.length === 0 ? (
              <div className="bg-white text-center py-12 rounded-2xl border border-gray-200 text-gray-500 text-sm">
                <Inbox className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="font-semibold">No Support Inquiries Registered</p>
                <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
                  Submit a query from our Contact Us page, and watch it populate instantly here!
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {inquiries.map((inq) => (
                  <div key={inq.id} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-xs flex flex-col md:flex-row md:justify-between gap-4">
                    <div className="grow">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[10px] font-mono text-gray-400">{inq.id}</span>
                        <span className={`px-2 py-0.2 rounded-full text-[9px] font-bold ${
                          inq.status === 'Responded' ? 'bg-brand-sage-100 text-brand-sage-700' : 'bg-brand-blue-100 text-brand-blue-700'
                        }`}>
                          {inq.status}
                        </span>
                        <span className="text-gray-400 text-[10px]">&bull; {new Date(inq.createdAt).toLocaleDateString()}</span>
                      </div>
                      <h4 className="font-bold text-sm text-gray-900 mt-1.5">{inq.name}</h4>
                      <p className="text-xs text-brand-blue-600 font-semibold mt-0.5">Subject: {inq.subject}</p>
                      
                      <p className="text-xs text-gray-600 mt-3 bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed italic">
                        &ldquo;{inq.message}&rdquo;
                      </p>

                      <p className="text-[10px] text-gray-400 mt-2.5">
                        Contact Info: <span className="font-semibold text-gray-700">{inq.phone}</span> | <span className="font-semibold text-gray-700">{inq.email}</span>
                      </p>
                    </div>

                    <div className="md:self-end flex items-center gap-2 shrink-0">
                      {inq.status !== 'Responded' && (
                        <button
                          onClick={() => onUpdateInquiryStatus(inq.id, 'Responded')}
                          className="bg-brand-blue-600 hover:bg-brand-blue-700 text-white font-semibold text-xs px-3 py-1.5 rounded-lg transition-colors cursor-pointer"
                        >
                          Mark Responded
                        </button>
                      )}
                      <button
                        onClick={() => onDeleteInquiry(inq.id)}
                        className="text-gray-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* CAREGIVER CLIENT MATCH TAB */}
        {activeTab === 'match' && (
          <div className="bg-white p-5 rounded-2xl border border-gray-200 shadow-sm space-y-5 fade-in">
            <div className="border-b border-gray-100 pb-3">
              <h3 className="font-display font-bold text-lg text-brand-blue-950">Caregiver Matching Panel</h3>
              <p className="text-xs text-gray-500">Process Step 4: Pair qualified staff with submitted consults.</p>
            </div>

            {matchingSuccessMsg && (
              <div className="p-3.5 bg-brand-sage-50 border border-brand-sage-200 text-brand-sage-700 rounded-xl text-xs font-medium">
                {matchingSuccessMsg}
              </div>
            )}

            <form onSubmit={handleMatchCaregiver} className="space-y-4 max-w-xl">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                  1. Select Pending Care Consultation Request
                </label>
                {bookings.filter(b => b.status === 'Pending').length === 0 ? (
                  <p className="text-xs text-gray-400 p-3 bg-gray-50 rounded-lg border border-dashed border-gray-200">
                    No pending bookings. Create a care booking first to see clients listed here!
                  </p>
                ) : (
                  <select
                    value={matchingBookingId}
                    onChange={(e) => setMatchingBookingId(e.target.value)}
                    className="w-full bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-xs focus:ring-2 focus:ring-brand-blue-500"
                  >
                    <option value="">-- Choose a Pending Client --</option>
                    {bookings.filter(b => b.status === 'Pending').map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.clientName} - {b.careType} ({b.preferredDate})
                      </option>
                    ))}
                  </select>
                )}
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1.5">
                  2. Select Available Caregiver for Referral
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {mockCaregivers.map((cg) => {
                    const identifier = `${cg.name} (${cg.role} - ${cg.exp} exp)`;
                    return (
                      <button
                        key={cg.name}
                        type="button"
                        onClick={() => setMatchingCaregiver(identifier)}
                        className={`p-3 rounded-xl border text-left text-xs transition-colors cursor-pointer ${
                          matchingCaregiver === identifier
                            ? 'border-brand-blue-600 bg-brand-blue-50 ring-2 ring-brand-blue-500/20'
                            : 'border-gray-200 hover:bg-gray-50'
                        }`}
                      >
                        <p className="font-bold text-gray-800">{cg.name}</p>
                        <p className="text-gray-500 text-[10px]">{cg.role}</p>
                        <div className="flex justify-between text-[9px] text-brand-blue-600 font-semibold mt-1.5">
                          <span>Exp: {cg.exp}</span>
                          <span>Rating: {cg.rating}</span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              <button
                type="submit"
                disabled={bookings.filter(b => b.status === 'Pending').length === 0}
                className="bg-brand-blue-600 hover:bg-brand-blue-700 disabled:opacity-50 text-white font-semibold text-xs py-3 px-5 rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
              >
                <UserCheck className="w-4.5 h-4.5" />
                <span>Assign & Confirm Schedule</span>
              </button>
            </form>

            <div className="p-4 bg-amber-50 text-amber-900 border border-amber-100 rounded-xl text-xs space-y-1.5">
              <p className="font-bold text-[10px] uppercase tracking-wider">How to test matching process:</p>
              <ul className="list-disc list-inside space-y-0.5 text-gray-600 text-[11px]">
                <li>Book a new Care Assessment via the Homepage form.</li>
                <li>Switch to this Care Portal and enter the <strong>Matching Panel</strong> tab.</li>
                <li>Your submitted client is dynamically available in the dropdown!</li>
                <li>Choose a caregiver, click Assign, and watch the consultation instantly transition to confirmed!</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
