import React from 'react';
import { ArrowRight, Brain, Activity, Clock, ShieldCheck, Heart } from 'lucide-react';

export default function HeroSection({ setActiveTab }) {
  return (
    <div className="relative overflow-hidden medical-grid-bg py-16 sm:py-24">
      {/* Ambient gradient glows */}
      <div className="absolute top-1/4 left-1/10 w-96 h-96 rounded-full bg-medical-500/10 blur-3xl -z-10 animate-pulse"></div>
      <div className="absolute bottom-1/3 right-1/10 w-96 h-96 rounded-full bg-sky-500/10 blur-3xl -z-10"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Text Column */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6 fade-in-up">
            
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-medical-500/30 bg-medical-500/5 text-medical-600 dark:text-medical-400 text-xs font-semibold">
              <Brain className="w-4 h-4 text-medical-500" />
              <span>Next-Gen Machine Learning Diagnostics</span>
            </div>

            {/* Title */}
            <h1 className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl tracking-tight leading-tight text-slate-900 dark:text-white">
              AI-Powered <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-medical-600 via-medical-500 to-sky-400 dark:from-medical-400 dark:via-medical-300 dark:to-sky-300 bg-clip-text text-transparent">
                Heart Disease
              </span> <br />
              Prediction Engine
            </h1>

            {/* Subtitle */}
            <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Predict cardiovascular risk using machine learning based on patient health parameters. Instantly analyze multi-factorial clinical signs with high diagnostic accuracy.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 pt-2">
              <button
                onClick={() => setActiveTab('predict')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-medical-600 to-sky-500 hover:from-medical-500 hover:to-sky-400 text-white font-semibold shadow-lg shadow-medical-500/25 hover:shadow-medical-400/30 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
              >
                <span>Start Prediction</span>
                <ArrowRight className="w-5 h-5" />
              </button>
              
              <button
                onClick={() => {
                  const element = document.getElementById('stats-section');
                  element?.scrollIntoView({ behavior: 'smooth' });
                }}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold hover:scale-[1.02] active:scale-[0.98] transition-all"
              >
                Learn More
              </button>
            </div>

            {/* Microtrust factors */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-6 pt-4 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>HIPAA-Compliant Architecture</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-500" />
                <span>Physician Reviewed Outputs</span>
              </div>
            </div>

          </div>

          {/* Right Image/Hologram Column */}
          <div className="lg:col-span-5 flex justify-center fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative group max-w-md w-full">
              
              {/* Background gradient glow behind illustration */}
              <div className="absolute inset-0 bg-gradient-to-tr from-medical-500 to-sky-400 rounded-3xl opacity-15 blur-xl group-hover:opacity-25 transition-opacity duration-300"></div>
              
              {/* Image Frame with Glassmorphism */}
              <div className="relative rounded-3xl overflow-hidden border border-slate-200/60 dark:border-slate-800/80 bg-white/70 dark:bg-slate-900/80 p-4 shadow-xl">
                
                {/* Simulated Window Controls */}
                <div className="flex gap-1.5 mb-3 px-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-red-400"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
                  <span className="ml-auto text-[10px] text-slate-400 font-mono font-medium">Diagnostic Module V1</span>
                </div>

                <div className="relative rounded-2xl overflow-hidden aspect-square bg-slate-100 dark:bg-slate-950 flex items-center justify-center border border-slate-100 dark:border-slate-900">
                  <img
                    src="/heart_medical_ai.png"
                    alt="AI Heart Diagnosis Model Representation"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    onError={(e) => {
                      // Fallback if image has error loading
                      e.target.onerror = null;
                      e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" fill="%230ea5e9"><path d="M100 30 C70 0, 20 20, 20 60 C20 110, 100 170, 100 170 C100 170, 180 110, 180 60 C180 20, 130 0, 100 30 Z" /></svg>';
                    }}
                  />
                  
                  {/* Glowing Pulse overlay */}
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none w-20 h-20 rounded-full border border-medical-500/20 bg-medical-500/5 animate-ping"></div>
                </div>

                {/* Overlaid stats tag */}
                <div className="absolute bottom-6 right-6 px-4 py-2.5 rounded-2xl glass-panel shadow-md border border-slate-200/50 dark:border-slate-700/50 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                  <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-200 uppercase tracking-wider">
                    Ready for Inference
                  </span>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* Statistics Cards Section */}
        <div id="stats-section" className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 fade-in-up" style={{ animationDelay: '0.4s' }}>
          
          {/* Card 1 */}
          <div className="group rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/60 p-8 shadow-sm hover:shadow-md hover:border-medical-500/30 hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-medical-500/10 text-medical-600 dark:text-medical-400 flex items-center justify-center mb-6 group-hover:bg-medical-500 group-hover:text-white transition-colors duration-300">
              <Activity className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-3xl text-slate-900 dark:text-white tracking-tight">
              90%+
            </h3>
            <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-200 mt-2">
              Model Diagnostic Accuracy
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              Trained on extensive clinical cohorts using optimized hyperparameters to minimize false negatives.
            </p>
          </div>

          {/* Card 2 */}
          <div className="group rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/60 p-8 shadow-sm hover:shadow-md hover:border-medical-500/30 hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-medical-500/10 text-medical-600 dark:text-medical-400 flex items-center justify-center mb-6 group-hover:bg-medical-500 group-hover:text-white transition-colors duration-300">
              <Brain className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-3xl text-slate-900 dark:text-white tracking-tight">
              Random Forest
            </h3>
            <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-200 mt-2">
              Machine Learning Model
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              Utilizes an ensemble decision tree architecture providing explainable, highly robust clinical pathing.
            </p>
          </div>

          {/* Card 3 */}
          <div className="group rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/60 p-8 shadow-sm hover:shadow-md hover:border-medical-500/30 hover:-translate-y-1 transition-all duration-300">
            <div className="w-12 h-12 rounded-2xl bg-medical-500/10 text-medical-600 dark:text-medical-400 flex items-center justify-center mb-6 group-hover:bg-medical-500 group-hover:text-white transition-colors duration-300">
              <Clock className="w-6 h-6" />
            </div>
            <h3 className="font-display font-bold text-3xl text-slate-900 dark:text-white tracking-tight">
              &lt; 50ms
            </h3>
            <h4 className="font-semibold text-sm text-slate-800 dark:text-slate-200 mt-2">
              Fast AI Prediction
            </h4>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
              Ultra-fast processing logic providing real-time cardiovascular risk ratings and clinical report exports.
            </p>
          </div>

        </div>

      </div>
    </div>
  );
}
