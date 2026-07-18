import React from 'react';
import { 
  Brain, Heart, Activity, LineChart, ShieldCheck, 
  ChevronRight, Apple, Flame, Stethoscope
} from 'lucide-react';

export default function DashboardFeatures({ setActiveTab }) {
  
  const insights = [
    {
      category: 'Diet & Nutrition',
      title: 'DASH Dietary Framework',
      description: 'Focus on consuming fruits, vegetables, whole grains, and lean proteins while restricting sodium below 1,500mg daily to naturally reduce blood pressure.',
      icon: Apple,
      color: 'text-amber-500 bg-amber-500/10'
    },
    {
      category: 'Exercise & Conditioning',
      title: 'Target Heart Rate Conditioning',
      description: 'Strive for 150 minutes of moderate aerobic exercise weekly. Engage in activities that raise heart rate to 60-80% of your maximum (220 minus age).',
      icon: Flame,
      color: 'text-rose-500 bg-rose-500/10'
    },
    {
      category: 'Diagnostics',
      title: 'Bi-annual Lipid Profiles',
      description: 'Schedule routine blood panels to measure HDL, LDL, and total cholesterol. Keep LDL levels under 100 mg/dl to reduce atherosclerosis risks.',
      icon: Stethoscope,
      color: 'text-medical-500 bg-medical-500/10'
    }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-12 fade-in-up">
      
      {/* Page Header */}
      <div className="text-center max-w-3xl mx-auto space-y-3">
        <h2 className="font-display font-extrabold text-3xl sm:text-4xl text-slate-900 dark:text-white">
          Cardiovascular AI Core
        </h2>
        <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
          Examine the architectural framework of our diagnostic neural ensemble and cardiovascular risk classification model.
        </p>
      </div>

      {/* Grid of Core Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        
        {/* ML Model Card */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/60 p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-medical-500/30 transition-all duration-300">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-medical-500/10 text-medical-600 dark:text-medical-400 flex items-center justify-center">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">Machine Learning Model</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Random Forest Ensemble Classifier</p>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Our model builds a forest of 100 decision trees. Features like ST depression, vessel count, and thalassemia status are analyzed across trees to output a robust risk probability.
            </p>
            {/* Mock Model Performance */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800 space-y-2">
              <div className="flex justify-between text-[11px] font-semibold text-slate-500">
                <span>ROC-AUC Curve Score</span>
                <span className="text-emerald-500 font-bold">0.93</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '93%' }}></div>
              </div>
              <div className="flex justify-between text-[10px] text-slate-400 mt-1">
                <span>Precision: 91%</span>
                <span>Recall: 89%</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setActiveTab('predict')}
            className="w-full mt-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Run Model Diagnostics</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Patient Analysis Card */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/60 p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-medical-500/30 transition-all duration-300">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-sky-500/10 text-sky-600 dark:text-sky-400 flex items-center justify-center">
              <Activity className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">Patient Analysis</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Explainable Clinical Inputs</p>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Provides direct insights into feature importance metrics. Every variable has a defined impact score based on clinical studies, ensuring that predictions remain fully auditable by physicians.
            </p>
            <div className="grid grid-cols-2 gap-2 text-[10px] uppercase font-bold text-slate-500 tracking-wider">
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                <span className="block text-[8px] text-slate-400">High Risk Factor</span>
                <span className="text-slate-800 dark:text-slate-200">Fluoroscopy</span>
              </div>
              <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-100 dark:border-slate-800">
                <span className="block text-[8px] text-slate-400">Secondary Factor</span>
                <span className="text-slate-800 dark:text-slate-200">Cholesterol</span>
              </div>
            </div>
          </div>
          <button 
            onClick={() => setActiveTab('predict')}
            className="w-full mt-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>Analyze Patient Profile</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        {/* Prediction History Card */}
        <div className="rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white/60 dark:bg-slate-900/60 p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-medical-500/30 transition-all duration-300">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-2xl bg-teal-500/10 text-teal-600 dark:text-teal-400 flex items-center justify-center">
              <LineChart className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">Prediction History</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Client-side Log Storage</p>
            </div>
            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
              Track previous medical assessments using our encrypted browser-level localStorage container. Securely keep logs of previous patients for comparative diagnosis, with zero database exposure.
            </p>
            <div className="flex items-center gap-2 p-3 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 leading-normal">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>Full compliance with client-side patient data privacy rules.</span>
            </div>
          </div>
          <button 
            onClick={() => setActiveTab('history')}
            className="w-full mt-6 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-200 text-xs font-bold hover:bg-slate-50 dark:hover:bg-slate-800 flex items-center justify-center gap-1.5 transition-colors"
          >
            <span>View Diagnostic History</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

      </div>

      {/* Health Insights Section */}
      <div id="health-insights" className="mt-16 border-t border-slate-200 dark:border-slate-800 pt-12">
        <h3 className="font-display font-bold text-2xl text-slate-900 dark:text-white text-center mb-8">
          Preventative Health Guidelines
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {insights.map((insight, idx) => {
            const Icon = insight.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-3xl border border-slate-200 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 space-y-4 hover:shadow-md transition-all duration-300"
              >
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${insight.color}`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                    {insight.category}
                  </span>
                  <h4 className="font-semibold text-sm text-slate-900 dark:text-white mt-1">
                    {insight.title}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                    {insight.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
