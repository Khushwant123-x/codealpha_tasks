import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle } from 'lucide-react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'General Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setSubmitted(true);
      setTimeout(() => {
        setSubmitted(false);
        setFormData({ name: '', email: '', subject: 'General Inquiry', message: '' });
      }, 3000);
    }
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-12 fade-in-up">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto space-y-3">
        <h2 className="font-display font-extrabold text-3xl text-slate-900 dark:text-white">
          Clinical Consultation & Support
        </h2>
        <p className="text-slate-500 dark:text-slate-400 text-sm leading-relaxed">
          Have questions about the machine learning model, clinical integration, or data compliance? Reach out to our medical informatics team.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Side: Contact Information Cards */}
        <div className="md:col-span-5 space-y-4 flex flex-col justify-between">
          
          {/* Card 1: Medical Support */}
          <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 space-y-3 flex-1 flex flex-col justify-center">
            <div className="w-10 h-10 rounded-xl bg-medical-500/10 text-medical-600 dark:text-medical-400 flex items-center justify-center">
              <Mail className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-slate-900 dark:text-white">Informatics Support</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                For model documentation, licensing, or integration queries.
              </p>
              <a href="mailto:support@heartai.med" className="text-xs font-semibold text-medical-500 hover:underline mt-2 block">
                support@heartai.med
              </a>
            </div>
          </div>

          {/* Card 2: Phone */}
          <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 space-y-3 flex-1 flex flex-col justify-center">
            <div className="w-10 h-10 rounded-xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center">
              <Phone className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-slate-900 dark:text-white">Clinical Advisory Line</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Direct inquiry line for hospital partners and researchers.
              </p>
              <span className="text-xs font-semibold text-sky-500 mt-2 block">
                +1 (800) 555-HEART
              </span>
            </div>
          </div>

          {/* Card 3: Location */}
          <div className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/70 dark:bg-slate-900/60 space-y-3 flex-1 flex flex-col justify-center">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-slate-900 dark:text-white">Research Headquarters</h4>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                100 Medical Center Way, Suite 400, San Francisco, CA
              </p>
            </div>
          </div>

        </div>

        {/* Right Side: Message Form */}
        <div className="md:col-span-7">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-xl p-6 sm:p-8">
            
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 flex items-center justify-center mx-auto animate-bounce">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">Message Transmitted</h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
                  Thank you. Your inquiry has been routed to our medical informatics advisory board. We will respond within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-sm font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-1.5">
                  <MessageSquare className="w-4.5 h-4.5 text-medical-500" />
                  <span>Transmit Inquiry</span>
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Dr. John Doe"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-medical-500 text-sm text-slate-800 dark:text-slate-100"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="j.doe@medicalcenter.org"
                      className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-medical-500 text-sm text-slate-800 dark:text-slate-100"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">Subject</label>
                  <select
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-medical-500 text-sm text-slate-800 dark:text-slate-100"
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Model Integration / API">Model Integration / API</option>
                    <option value="Clinical Partnership">Clinical Partnership / Trial</option>
                    <option value="Compliance / Privacy">Compliance & Privacy</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">Message / Clinical Request</label>
                  <textarea
                    name="message"
                    required
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Describe your inquiry..."
                    className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-medical-500 text-sm text-slate-800 dark:text-slate-100 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-medical-600 to-sky-500 hover:from-medical-500 hover:to-sky-400 text-white font-semibold shadow-md hover:scale-[1.01] transition-all"
                >
                  <span>Transmit Secure Message</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}

          </div>
        </div>

      </div>

    </div>
  );
}
