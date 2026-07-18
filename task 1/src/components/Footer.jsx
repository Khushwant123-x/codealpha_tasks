import React from 'react';
import { Heart, ShieldCheck, Mail, Globe, Sparkles } from 'lucide-react';

export default function Footer({ setActiveTab }) {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800/80 bg-white dark:bg-[#080d1a] transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center pb-8 border-b border-slate-200 dark:border-slate-800/60">
          
          {/* Brand Info */}
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-medical-600 to-sky-400 text-white flex items-center justify-center shadow-md">
                <Heart className="w-4.5 h-4.5 fill-white animate-heartbeat" />
              </div>
              <span className="font-display font-bold text-lg tracking-tight bg-gradient-to-r from-medical-600 to-sky-500 dark:from-medical-400 dark:to-sky-300 bg-clip-text text-transparent">
                HeartAI
              </span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Transforming cardiovascular health assessment through modern, data-driven machine learning models.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex justify-center space-x-6 text-sm">
            <button onClick={() => setActiveTab('home')} className="text-slate-500 dark:text-slate-400 hover:text-medical-500 transition-colors">
              Home
            </button>
            <button onClick={() => setActiveTab('predict')} className="text-slate-500 dark:text-slate-400 hover:text-medical-500 transition-colors">
              Prediction
            </button>
            <button onClick={() => setActiveTab('insights')} className="text-slate-500 dark:text-slate-400 hover:text-medical-500 transition-colors">
              Health Insights
            </button>
          </div>

          {/* Tech Badges */}
          <div className="flex flex-wrap md:justify-end gap-2 text-xs">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 font-medium">
              <Sparkles className="w-3.5 h-3.5 text-medical-500" />
              Random Forest Classifier
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900 text-slate-500 dark:text-slate-400 font-medium">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              Secure Client Diagnostics
            </span>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="pt-6 text-center space-y-4">
          <div className="p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10 text-xs text-amber-800 dark:text-amber-300 max-w-4xl mx-auto leading-relaxed shadow-sm">
            <span className="font-bold uppercase tracking-wider text-[10px] bg-amber-500/15 text-amber-700 dark:text-amber-300 px-2 py-0.5 rounded-full mr-2">
              Disclaimer
            </span>
            HeartAI is an educational machine learning demonstration intended for informational purposes only. It is not designed, evaluated, or cleared by any health authority (such as the FDA) to diagnose, treat, prevent, or cure heart disease. Any predictive assessments should never replace professional medical diagnosis, advice, or treatment by a licensed physician.
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center text-[11px] text-slate-400 dark:text-slate-500 space-y-2 sm:space-y-0">
            <span>&copy; {new Date().getFullYear()} HeartAI Inc. All rights reserved. Developed for clinical research and ML demo.</span>
            <div className="flex gap-4">
              <a href="#" className="hover:text-medical-500 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-medical-500 transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-medical-500 transition-colors">Clinical Guidelines</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
