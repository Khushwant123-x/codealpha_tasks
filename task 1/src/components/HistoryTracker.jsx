import React, { useState } from 'react';
import { 
  Trash2, Calendar, User, Eye, AlertTriangle, 
  CheckCircle, FileDown, ShieldCheck, Heart
} from 'lucide-react';

export default function HistoryTracker({ history, onClear, onDeleteItem }) {
  const [selectedItem, setSelectedItem] = useState(null);

  const getGenderText = (sexVal) => {
    return sexVal === '1' ? 'Male' : 'Female';
  };

  const getCPText = (cpVal) => {
    const list = ['Typical Angina', 'Atypical Angina', 'Non-Anginal', 'Asymptomatic'];
    return list[parseInt(cpVal)] || 'Unknown';
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 fade-in-up">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-slate-200 dark:border-slate-800 pb-6 gap-4">
        <div>
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl text-slate-900 dark:text-white">
            Prediction History
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Browse and manage previous client-side diagnostic assessments. Logs are strictly stored in local sandbox storage.
          </p>
        </div>
        
        {history.length > 0 && (
          <button
            onClick={onClear}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold text-red-500 hover:text-white border border-red-500/20 hover:border-red-500 hover:bg-red-500 transition-all duration-200"
          >
            <Trash2 className="w-4 h-4" />
            Clear All History
          </button>
        )}
      </div>

      {history.length === 0 ? (
        /* Empty State */
        <div className="rounded-3xl border border-dashed border-slate-300 dark:border-slate-800 bg-white/40 dark:bg-slate-900/40 p-12 text-center max-w-xl mx-auto space-y-6 shadow-sm">
          <div className="w-16 h-16 rounded-2xl bg-slate-100 dark:bg-slate-800 flex items-center justify-center mx-auto text-slate-400 dark:text-slate-600">
            <Heart className="w-8 h-8" />
          </div>
          <div className="space-y-2">
            <h3 className="font-display font-bold text-lg text-slate-900 dark:text-white">No Diagnostic Logs Found</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-sm mx-auto leading-relaxed">
              You haven't run any heart disease risk predictions yet. Go to the Prediction Dashboard to run your first diagnostic model.
            </p>
          </div>
        </div>
      ) : (
        /* History Layout */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: History list */}
          <div className="lg:col-span-7 space-y-3">
            {history.map((item) => {
              const isHigh = item.result.riskStatus === 'High Risk';
              return (
                <div 
                  key={item.id}
                  onClick={() => setSelectedItem(item)}
                  className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-4 ${
                    selectedItem?.id === item.id 
                      ? 'border-medical-500 bg-medical-500/5 dark:bg-medical-950/20 ring-1 ring-medical-500/50' 
                      : 'border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">
                        Patient (Age {item.formData.age}, {getGenderText(item.formData.sex)})
                      </span>
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[9px] font-bold uppercase tracking-wider ${
                        isHigh 
                          ? 'bg-rose-500/10 text-rose-500 border border-rose-500/20' 
                          : 'bg-emerald-500/10 text-emerald-500 border border-emerald-500/20'
                      }`}>
                        {isHigh ? 'High Risk' : 'Low Risk'}
                      </span>
                    </div>
                    <div className="flex items-center gap-3 text-[10px] text-slate-400">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(item.timestamp).toLocaleDateString()} at {new Date(item.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </span>
                      <span>Probability: {item.result.probability}%</span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-colors"
                      title="Inspect Variables"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => onDeleteItem(item.id)}
                      className="p-2 rounded-xl hover:bg-red-500/10 text-slate-400 hover:text-red-500 transition-colors"
                      title="Delete Record"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Record Detail Inspector */}
          <div className="lg:col-span-5">
            {selectedItem ? (
              <div className="rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900 shadow-xl overflow-hidden sticky top-24">
                
                {/* Header */}
                <div className={`p-5 text-white ${
                  selectedItem.result.riskStatus === 'High Risk' 
                    ? 'bg-gradient-to-r from-rose-600 to-amber-500' 
                    : 'bg-gradient-to-r from-emerald-600 to-teal-500'
                }`}>
                  <h3 className="font-display font-bold text-lg">Case File Analysis</h3>
                  <p className="text-[10px] opacity-90 mt-0.5">UID: {selectedItem.id.substring(0, 8)} | Verified Inference</p>
                </div>

                {/* Content */}
                <div className="p-5 space-y-6">
                  
                  {/* Summary */}
                  <div className="grid grid-cols-2 gap-4 border-b border-slate-100 dark:border-slate-800 pb-4 text-xs">
                    <div>
                      <span className="block text-[10px] text-slate-400 uppercase font-semibold">Diagnosis Result</span>
                      <span className={`font-bold mt-0.5 block ${
                        selectedItem.result.riskStatus === 'High Risk' ? 'text-rose-500' : 'text-emerald-500'
                      }`}>
                        {selectedItem.result.riskStatus}
                      </span>
                    </div>
                    <div>
                      <span className="block text-[10px] text-slate-400 uppercase font-semibold">Model Probability</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200 mt-0.5 block">
                        {selectedItem.result.probability}%
                      </span>
                    </div>
                  </div>

                  {/* Variables Grid */}
                  <div>
                    <h4 className="text-[10px] uppercase font-bold text-slate-400 tracking-wider mb-3">Clinical Profile Values</h4>
                    
                    <div className="grid grid-cols-2 gap-x-6 gap-y-3 text-xs leading-normal">
                      <div className="flex justify-between border-b border-slate-50 dark:border-slate-800/30 pb-1.5">
                        <span className="text-slate-500">Age / Gender</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">
                          {selectedItem.formData.age} / {getGenderText(selectedItem.formData.sex)}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-slate-50 dark:border-slate-800/30 pb-1.5">
                        <span className="text-slate-500">Chest Pain cp</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200 truncate max-w-[120px]" title={getCPText(selectedItem.formData.cp)}>
                          {getCPText(selectedItem.formData.cp)}
                        </span>
                      </div>
                      <div className="flex justify-between border-b border-slate-50 dark:border-slate-800/30 pb-1.5">
                        <span className="text-slate-500">Resting BP trestbps</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedItem.formData.trestbps} mmHg</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-50 dark:border-slate-800/30 pb-1.5">
                        <span className="text-slate-500">Cholesterol chol</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedItem.formData.chol} mg/dl</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-50 dark:border-slate-800/30 pb-1.5">
                        <span className="text-slate-500">Max Heart Rate thalach</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedItem.formData.thalach} bpm</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-50 dark:border-slate-800/30 pb-1.5">
                        <span className="text-slate-500">Oldpeak oldpeak</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedItem.formData.oldpeak}</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-50 dark:border-slate-800/30 pb-1.5">
                        <span className="text-slate-500">Fluoroscopy ca</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedItem.formData.ca} vessels</span>
                      </div>
                      <div className="flex justify-between border-b border-slate-50 dark:border-slate-800/30 pb-1.5">
                        <span className="text-slate-500">Thalassemia thal</span>
                        <span className="font-semibold text-slate-800 dark:text-slate-200">Type {selectedItem.formData.thal}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-2 flex justify-end gap-2">
                    <button 
                      onClick={() => alert("Report downloaded (mock).")}
                      className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-50 dark:bg-slate-850 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 text-xs font-semibold text-slate-700 dark:text-slate-200 transition-colors"
                    >
                      <FileDown className="w-4 h-4" />
                      PDF Report
                    </button>
                  </div>

                </div>

              </div>
            ) : (
              <div className="rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white/40 dark:bg-slate-900/40 p-12 text-center text-slate-400 dark:text-slate-500 text-xs shadow-inner">
                Select a diagnostic case from the history list to inspect full clinical details.
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
