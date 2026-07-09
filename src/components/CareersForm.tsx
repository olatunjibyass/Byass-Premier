/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useRef } from 'react';
import { Upload, FileCheck, CheckCircle2, User, Mail, Phone, ShieldCheck, Briefcase, Trash2 } from 'lucide-react';
import { Job, JobApplication } from '../types';
import { JOBS } from '../data';

interface CareersFormProps {
  selectedJobId?: string;
  onAddApplication: (app: JobApplication) => void;
  onClose?: () => void;
}

export default function CareersForm({ selectedJobId, onAddApplication, onClose }: CareersFormProps) {
  const [jobId, setJobId] = useState(selectedJobId || JOBS[0].id);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  
  // Checklist for screening filters
  const [qualifications, setQualifications] = useState<string[]>([]);
  const qualificationOptions = [
    'Valid State Certified Nursing Assistant (CNA) / Home Health Aide (HHA) License',
    'Active CPR and First Aid Certified',
    'Passed Elder-Abuse & Nationwide Criminal Background Checks',
    'Valid Driver\'s License with Clean Driving Record & Insured Vehicle',
    'Up-to-Date Negative Tuberculosis (TB) Screen'
  ];

  // Drag and drop state
  const [isDragActive, setIsDragActive] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const fileInputRef = useRef<HTMLInputElement>(null);

  const toggleQualification = (opt: string) => {
    if (qualifications.includes(opt)) {
      setQualifications(qualifications.filter((item) => item !== opt));
    } else {
      setQualifications([...qualifications, opt]);
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setIsDragActive(true);
    } else if (e.type === 'dragleave') {
      setIsDragActive(false);
    }
  };

  const processFile = (file: File) => {
    // Check if PDF or Word
    const allowedExtensions = ['pdf', 'doc', 'docx'];
    const extension = file.name.split('.').pop()?.toLowerCase() || '';
    if (!allowedExtensions.includes(extension)) {
      setErrorMsg('Invalid file format. Please upload a PDF or Microsoft Word document (.pdf, .doc, .docx).');
      return;
    }

    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      setErrorMsg('File is too large. Maximum size allowed is 5MB.');
      return;
    }

    setErrorMsg('');
    setUploadedFile(file);
    setIsUploading(true);
    setUploadProgress(0);

    // Simulate upload timer
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + 15;
      });
    }, 100);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  const removeFile = () => {
    setUploadedFile(null);
    setUploadProgress(0);
    setIsUploading(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applicantName.trim() || !applicantEmail.trim() || !applicantPhone.trim()) {
      setErrorMsg('Please fill in your name, email, and phone number.');
      return;
    }

    if (!uploadedFile) {
      setErrorMsg('Please upload your resume to complete the job application.');
      return;
    }

    if (isUploading) {
      setErrorMsg('Please wait for your resume to finish uploading.');
      return;
    }

    const selectedJob = JOBS.find(j => j.id === jobId);
    const jobTitle = selectedJob ? selectedJob.title : 'General Application';

    // Save job application to parent state
    const newApp: JobApplication = {
      id: 'app-' + Math.random().toString(36).substr(2, 9),
      jobId,
      jobTitle,
      applicantName,
      applicantEmail,
      applicantPhone,
      qualifications,
      resumeName: uploadedFile.name,
      coverLetter: coverLetter.trim() || undefined,
      status: 'Received',
      createdAt: new Date().toISOString()
    };

    onAddApplication(newApp);
    setIsSubmitted(true);
    setErrorMsg('');
  };

  if (isSubmitted) {
    return (
      <div className="text-center py-10 px-4 bg-white rounded-2xl border border-brand-cream-200/60 shadow-xl max-w-xl mx-auto fade-in">
        <div className="w-16 h-16 bg-brand-sage-100 rounded-full flex items-center justify-center mx-auto mb-6">
          <CheckCircle2 className="w-10 h-10 text-brand-sage-600" />
        </div>
        <h3 className="font-display font-bold text-2xl text-brand-blue-950 mb-3">
          Application Received!
        </h3>
        <p className="text-sm text-gray-600 leading-relaxed max-w-md mx-auto mb-8">
          Thank you for applying, <strong className="text-brand-blue-950">{applicantName}</strong>. Your qualifications checklist and resume (<strong>{uploadedFile?.name}</strong>) have been entered into our secure employee candidate tracking system.
        </p>

        <div className="bg-brand-sage-50 rounded-xl p-5 border border-brand-sage-100 text-left mb-8 text-sm">
          <div className="flex items-center gap-2 border-b border-brand-sage-100 pb-2.5 mb-3">
            <ShieldCheck className="w-5 h-5 text-brand-sage-600" />
            <p className="font-semibold text-brand-sage-700 uppercase text-xs tracking-wider">
              Verification & Next Steps
            </p>
          </div>
          <p className="text-xs text-gray-600 leading-relaxed mb-3">
            Our Care Director is actively reviewing candidates for the position of: <strong className="text-brand-blue-950">{JOBS.find(j => j.id === jobId)?.title || 'General Care Provider'}</strong>.
          </p>
          <ul className="space-y-1.5 text-xs text-gray-600 list-disc list-inside">
            <li>Our recruitment coordinator will email you instructions for your fingerprint and state check.</li>
            <li>If your background is approved, an invitation to a virtual Zoom interview will follow.</li>
            <li>Typical candidate turnaround is 3 to 5 business days.</li>
          </ul>
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
              setApplicantName('');
              setApplicantEmail('');
              setApplicantPhone('');
              setCoverLetter('');
              setQualifications([]);
              setUploadedFile(null);
              setIsSubmitted(false);
            }}
            className="px-6 py-2.5 bg-brand-blue-600 hover:bg-brand-blue-700 text-white font-medium text-sm rounded-xl transition-all shadow-md shadow-brand-blue-200"
          >
            Submit Another Application
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-brand-cream-200/80 shadow-xl max-w-xl mx-auto overflow-hidden">
      {/* Header */}
      <div className="bg-brand-blue-900 px-6 py-5 text-white flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Briefcase className="w-6 h-6 text-brand-blue-300" />
          <div>
            <h3 className="font-display font-bold text-lg">Employment Application</h3>
            <p className="text-xs text-brand-blue-200 mt-0.5">Secure caregiver intake portal</p>
          </div>
        </div>
        <div className="bg-brand-blue-950 text-brand-sage-500 font-semibold text-xs px-3 py-1 rounded-full border border-brand-blue-800">
          State Compliant
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 space-y-5">
        {errorMsg && (
          <div className="p-3.5 bg-rose-50 border border-rose-200 text-rose-700 rounded-xl text-xs font-medium">
            {errorMsg}
          </div>
        )}

        {/* Job Selection */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
            Select Your Caregiving Position
          </label>
          <select
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
            className="w-full bg-white border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-hidden focus:ring-2 focus:ring-brand-blue-500"
          >
            {JOBS.map((j) => (
              <option key={j.id} value={j.id}>
                {j.title} ({j.type})
              </option>
            ))}
          </select>
        </div>

        {/* Contact info */}
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
              Your Full Name <span className="text-rose-500">*</span>
            </label>
            <div className="relative">
              <input
                type="text"
                placeholder="Jane Doe"
                value={applicantName}
                onChange={(e) => setApplicantName(e.target.value)}
                className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-brand-blue-500 text-sm"
                required
              />
              <User className="w-5 h-5 text-gray-400 absolute left-4 top-3.5 pointer-events-none" />
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
                  placeholder="jane@example.com"
                  value={applicantEmail}
                  onChange={(e) => setApplicantEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-brand-blue-500 text-sm"
                  required
                />
                <Mail className="w-5 h-5 text-gray-400 absolute left-4 top-3.5 pointer-events-none" />
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
                  value={applicantPhone}
                  onChange={(e) => setApplicantPhone(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-brand-blue-500 text-sm"
                  required
                />
                <Phone className="w-5 h-5 text-gray-400 absolute left-4 top-3.5 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Qualifications checklist */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
            Licensing & Screening Checklist (Check all that apply)
          </label>
          <div className="space-y-2">
            {qualificationOptions.map((opt) => (
              <label
                key={opt}
                className={`flex items-start gap-3 p-2.5 rounded-xl border text-xs cursor-pointer transition-colors ${
                  qualifications.includes(opt)
                    ? 'border-brand-blue-200 bg-brand-blue-50/50 text-brand-blue-900 font-semibold'
                    : 'border-gray-100 hover:bg-gray-50 text-gray-600'
                }`}
              >
                <input
                  type="checkbox"
                  checked={qualifications.includes(opt)}
                  onChange={() => toggleQualification(opt)}
                  className="mt-0.5 rounded border-gray-300 text-brand-blue-600 focus:ring-brand-blue-500 cursor-pointer"
                />
                <span>{opt}</span>
              </label>
            ))}
          </div>
        </div>

        {/* File Uploader supporting drag & drop + manual selection */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-2">
            Upload Your Resume (PDF, Word) <span className="text-rose-500">*</span>
          </label>
          
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileInputChange}
            accept=".pdf,.doc,.docx"
            className="hidden"
          />

          {!uploadedFile ? (
            <div
              onDragEnter={handleDrag}
              onDragOver={handleDrag}
              onDragLeave={handleDrag}
              onDrop={handleDrop}
              onClick={triggerFileInput}
              className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all ${
                isDragActive
                  ? 'border-brand-blue-600 bg-brand-blue-50'
                  : 'border-gray-300 hover:border-brand-blue-400 bg-brand-cream-50/50'
              }`}
            >
              <Upload className="w-8 h-8 text-brand-blue-600 mx-auto mb-2.5" />
              <p className="text-xs font-semibold text-brand-blue-950">
                Drag and drop your resume file here
              </p>
              <p className="text-[11px] text-gray-400 mt-1">
                or <span className="text-brand-blue-600 font-bold hover:underline">browse files</span> from your computer
              </p>
              <p className="text-[10px] text-gray-400 mt-2">
                Supported: PDF, DOC, DOCX (Max 5MB)
              </p>
            </div>
          ) : (
            <div className="border border-brand-sage-200 bg-brand-sage-50 rounded-xl p-4 flex items-center justify-between gap-4 fade-in">
              <div className="flex items-center gap-3 min-w-0">
                <FileCheck className="w-8 h-8 text-brand-sage-600 shrink-0" />
                <div className="min-w-0">
                  <p className="text-xs font-bold text-gray-800 truncate">
                    {uploadedFile.name}
                  </p>
                  <p className="text-[10px] text-gray-400">
                    {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                  </p>
                  
                  {isUploading && (
                    <div className="mt-1.5 w-32 sm:w-48 h-1.5 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-brand-sage-600 transition-all duration-100"
                        style={{ width: `${uploadProgress}%` }}
                      />
                    </div>
                  )}
                </div>
              </div>

              {!isUploading ? (
                <button
                  type="button"
                  onClick={removeFile}
                  className="p-1.5 text-gray-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                  title="Remove file"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              ) : (
                <span className="text-[11px] font-semibold text-brand-sage-600 shrink-0">{uploadProgress}%</span>
              )}
            </div>
          )}
        </div>

        {/* Short intro */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-gray-500 mb-1">
            Brief Care Philosophy or Cover Letter Summary
          </label>
          <textarea
            rows={3}
            placeholder="Tell us why you are passionate about home caregiving..."
            value={coverLetter}
            onChange={(e) => setCoverLetter(e.target.value)}
            className="w-full px-4 py-2.5 rounded-xl border border-gray-200 focus:outline-hidden focus:ring-2 focus:ring-brand-blue-500 text-sm"
          />
        </div>

        {/* Buttons */}
        <div className="pt-4 border-t border-gray-100 flex justify-end gap-3">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-3 border border-gray-200 rounded-xl font-semibold text-sm text-gray-500 hover:bg-gray-50"
            >
              Cancel
            </button>
          )}
          <button
            type="submit"
            className="w-full sm:w-auto bg-brand-blue-600 hover:bg-brand-blue-700 text-white font-semibold text-sm py-3 px-6 rounded-xl shadow-md shadow-brand-blue-200 flex items-center justify-center gap-2"
          >
            <span>Submit Application</span>
            <CheckCircle2 className="w-4.5 h-4.5" />
          </button>
        </div>
      </form>
    </div>
  );
}
