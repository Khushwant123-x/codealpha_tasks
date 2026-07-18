import React, { useState } from 'react';
import { 
  User, Activity, Heart, Droplet, Percent, 
  HelpCircle, ShieldCheck, AlertCircle, ArrowRight
} from 'lucide-react';

export default function PredictionForm({ onSubmit, isPredicting }) {
  const [formData, setFormData] = useState({
    age: '54',
    sex: '1',
    cp: '1',
    trestbps: '130',
    chol: '240',
    fbs: '0',
    restecg: '0',
    thalach: '150',
    exang: '0',
    oldpeak: '1.2',
    slope: '1',
    ca: '0',
    thal: '2'
  });

  const [errors, setErrors] = useState({});

  const validate = () => {
    const newErrors = {};
    
    // Age check
    const ageVal = parseInt(formData.age);
    if (!formData.age || isNaN(ageVal) || ageVal < 1 || ageVal > 120) {
      newErrors.age = 'Age must be between 1 and 120';
    }

    // Resting BP check
    const bpVal = parseInt(formData.trestbps);
    if (!formData.trestbps || isNaN(bpVal) || bpVal < 50 || bpVal > 250) {
      newErrors.trestbps = 'Resting BP must be between 50 and 250 mmHg';
    }

    // Cholesterol check
    const cholVal = parseInt(formData.chol);
    if (!formData.chol || isNaN(cholVal) || cholVal < 80 || cholVal > 600) {
      newErrors.chol = 'Cholesterol must be between 80 and 600 mg/dl';
    }

    // Max Heart Rate check
    const thalachVal = parseInt(formData.thalach);
    if (!formData.thalach || isNaN(thalachVal) || thalachVal < 50 || thalachVal > 250) {
      newErrors.thalach = 'Max heart rate must be between 50 and 250 bpm';
    }

    // Oldpeak check
    const oldpeakVal = parseFloat(formData.oldpeak);
    if (formData.oldpeak === '' || isNaN(oldpeakVal) || oldpeakVal < 0.0 || oldpeakVal > 10.0) {
      newErrors.oldpeak = 'Oldpeak must be between 0.0 and 10.0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, name: value, [name]: value }));
    // Clear validation error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 fade-in-up">
      <div className="rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white dark:bg-slate-900/60 shadow-xl overflow-hidden">
        
        {/* Form Header */}
        <div className="bg-gradient-to-r from-medical-600 to-sky-500 p-6 sm:p-8 text-white relative">
          <div className="absolute top-0 right-0 p-8 opacity-10 pointer-events-none">
            <Heart className="w-32 h-32 animate-pulse fill-white" />
          </div>
          <h2 className="font-display font-bold text-2xl sm:text-3xl">Patient Diagnostic Panel</h2>
          <p className="text-sky-100 text-sm mt-1 max-w-2xl">
            Complete the form below with the clinical diagnostics of the patient. The AI model will process these variables to assess cardiovascular risk.
          </p>
        </div>

        {/* Input Form */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-8">
          
          {/* SECTION 1: Patient Profile & Vitals */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-medical-600 dark:text-medical-400 mb-4 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
              <User className="w-4 h-4" />
              <span>Demographics & Vitals</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Age */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5 flex items-center gap-1.5">
                  Age <HelpCircle className="w-3.5 h-3.5 text-slate-400 tooltip" title="Patient's age in years" />
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-xl border ${errors.age ? 'border-red-500 dark:border-red-500 bg-red-500/5' : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900'} focus:outline-none focus:ring-2 focus:ring-medical-500 text-sm text-slate-800 dark:text-slate-100`}
                    placeholder="e.g. 45"
                  />
                  {errors.age && (
                    <span className="text-[10px] text-red-500 font-semibold mt-1 block flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.age}
                    </span>
                  )}
                </div>
              </div>

              {/* Sex */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                  Gender
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleChange({ target: { name: 'sex', value: '1' } })}
                    className={`py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                      formData.sex === '1'
                        ? 'bg-medical-500 border-medical-500 text-white shadow-md shadow-medical-500/10'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    Male
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChange({ target: { name: 'sex', value: '0' } })}
                    className={`py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                      formData.sex === '0'
                        ? 'bg-medical-500 border-medical-500 text-white shadow-md shadow-medical-500/10'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    Female
                  </button>
                </div>
              </div>

              {/* Chest Pain Type */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                  Chest Pain Type
                </label>
                <select
                  name="cp"
                  value={formData.cp}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-medical-500 text-sm text-slate-800 dark:text-slate-100"
                >
                  <option value="0">Typical Angina (Level 1)</option>
                  <option value="1">Atypical Angina (Level 2)</option>
                  <option value="2">Non-Anginal Pain (Level 3)</option>
                  <option value="3">Asymptomatic (Level 4)</option>
                </select>
              </div>
            </div>
          </div>

          {/* SECTION 2: Cardiovascular Vitals */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-medical-600 dark:text-medical-400 mb-4 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
              <Activity className="w-4 h-4" />
              <span>Cardiovascular Measurements</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Resting BP */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5 flex items-center gap-1.5">
                  Resting Blood Pressure <HelpCircle className="w-3.5 h-3.5 text-slate-400" title="BP measured in mmHg upon admission" />
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="trestbps"
                    value={formData.trestbps}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-xl border ${errors.trestbps ? 'border-red-500 dark:border-red-500 bg-red-500/5' : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900'} focus:outline-none focus:ring-2 focus:ring-medical-500 text-sm text-slate-800 dark:text-slate-100`}
                    placeholder="mmHg"
                  />
                  <span className="absolute right-3 top-3 text-[11px] font-semibold text-slate-400 dark:text-slate-500">mmHg</span>
                </div>
                {errors.trestbps && (
                  <span className="text-[10px] text-red-500 font-semibold mt-1 block flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.trestbps}
                  </span>
                )}
              </div>

              {/* Cholesterol */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5 flex items-center gap-1.5">
                  Serum Cholesterol <HelpCircle className="w-3.5 h-3.5 text-slate-400" title="Total serum cholesterol in mg/dl" />
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="chol"
                    value={formData.chol}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-xl border ${errors.chol ? 'border-red-500 dark:border-red-500 bg-red-500/5' : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900'} focus:outline-none focus:ring-2 focus:ring-medical-500 text-sm text-slate-800 dark:text-slate-100`}
                    placeholder="mg/dl"
                  />
                  <span className="absolute right-3 top-3 text-[11px] font-semibold text-slate-400 dark:text-slate-500">mg/dl</span>
                </div>
                {errors.chol && (
                  <span className="text-[10px] text-red-500 font-semibold mt-1 block flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.chol}
                  </span>
                )}
              </div>

              {/* Fasting Blood Sugar */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5 flex items-center gap-1.5">
                  Fasting Blood Sugar <HelpCircle className="w-3.5 h-3.5 text-slate-400" title="Fasting blood sugar > 120 mg/dl" />
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleChange({ target: { name: 'fbs', value: '1' } })}
                    className={`py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                      formData.fbs === '1'
                        ? 'bg-medical-500 border-medical-500 text-white shadow-md shadow-medical-500/10'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    &gt; 120 mg/dl
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChange({ target: { name: 'fbs', value: '0' } })}
                    className={`py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                      formData.fbs === '0'
                        ? 'bg-medical-500 border-medical-500 text-white shadow-md shadow-medical-500/10'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    &le; 120 mg/dl
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 3: Electrocardiogram & Diagnostics */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-medical-600 dark:text-medical-400 mb-4 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
              <Heart className="w-4 h-4" />
              <span>Electrocardiogram & Performance</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Resting ECG */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                  Resting Electrocardiographic Results
                </label>
                <select
                  name="restecg"
                  value={formData.restecg}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-medical-500 text-sm text-slate-800 dark:text-slate-100"
                >
                  <option value="0">Normal</option>
                  <option value="1">ST-T Wave Abnormality</option>
                  <option value="2">Left Ventricular Hypertrophy</option>
                </select>
              </div>

              {/* Max Heart Rate (thalach) */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5 flex items-center gap-1.5">
                  Max Heart Rate <HelpCircle className="w-3.5 h-3.5 text-slate-400" title="Maximum heart rate achieved in bpm during exercise" />
                </label>
                <div className="relative">
                  <input
                    type="number"
                    name="thalach"
                    value={formData.thalach}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-xl border ${errors.thalach ? 'border-red-500 dark:border-red-500 bg-red-500/5' : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900'} focus:outline-none focus:ring-2 focus:ring-medical-500 text-sm text-slate-800 dark:text-slate-100`}
                    placeholder="bpm"
                  />
                  <span className="absolute right-3 top-3 text-[11px] font-semibold text-slate-400 dark:text-slate-500">bpm</span>
                </div>
                {errors.thalach && (
                  <span className="text-[10px] text-red-500 font-semibold mt-1 block flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.thalach}
                  </span>
                )}
              </div>

              {/* Exercise Induced Angina */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5 flex items-center gap-1.5">
                  Exercise Induced Angina <HelpCircle className="w-3.5 h-3.5 text-slate-400" title="Is chest pain induced during exertion test?" />
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleChange({ target: { name: 'exang', value: '1' } })}
                    className={`py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                      formData.exang === '1'
                        ? 'bg-medical-500 border-medical-500 text-white shadow-md shadow-medical-500/10'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    Yes
                  </button>
                  <button
                    type="button"
                    onClick={() => handleChange({ target: { name: 'exang', value: '0' } })}
                    className={`py-2.5 rounded-xl text-sm font-semibold border transition-all ${
                      formData.exang === '0'
                        ? 'bg-medical-500 border-medical-500 text-white shadow-md shadow-medical-500/10'
                        : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 4: Cardiac Stress & Vessels */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-medical-600 dark:text-medical-400 mb-4 pb-2 border-b border-slate-100 dark:border-slate-800 flex items-center gap-2">
              <Droplet className="w-4 h-4" />
              <span>Cardiac Stress & Fluoroscopy</span>
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {/* Oldpeak */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5 flex items-center gap-1.5">
                  ST Depression (Oldpeak) <HelpCircle className="w-3.5 h-3.5 text-slate-400" title="ST depression induced by exercise relative to rest" />
                </label>
                <input
                  type="number"
                  step="0.1"
                  name="oldpeak"
                  value={formData.oldpeak}
                  onChange={handleChange}
                  className={`w-full px-4 py-2.5 rounded-xl border ${errors.oldpeak ? 'border-red-500 dark:border-red-500 bg-red-500/5' : 'border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900'} focus:outline-none focus:ring-2 focus:ring-medical-500 text-sm text-slate-800 dark:text-slate-100`}
                  placeholder="e.g. 1.2"
                />
                {errors.oldpeak && (
                  <span className="text-[10px] text-red-500 font-semibold mt-1 block flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.oldpeak}
                  </span>
                )}
              </div>

              {/* Slope */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                  ST Slope
                </label>
                <select
                  name="slope"
                  value={formData.slope}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-medical-500 text-sm text-slate-800 dark:text-slate-100"
                >
                  <option value="0">Upsloping (Level 0)</option>
                  <option value="1">Flat (Level 1)</option>
                  <option value="2">Downsloping (Level 2)</option>
                </select>
              </div>

              {/* Number of Major Vessels (ca) */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                  Fluoroscopy Vessels Count
                </label>
                <select
                  name="ca"
                  value={formData.ca}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-medical-500 text-sm text-slate-800 dark:text-slate-100"
                >
                  <option value="0">0 Vessels Colored</option>
                  <option value="1">1 Vessel Colored</option>
                  <option value="2">2 Vessels Colored</option>
                  <option value="3">3 Vessels Colored</option>
                  <option value="4">4 Vessels Colored</option>
                </select>
              </div>

              {/* Thalassemia (thal) */}
              <div>
                <label className="block text-xs font-semibold text-slate-700 dark:text-slate-200 mb-1.5">
                  Thalassemia Status
                </label>
                <select
                  name="thal"
                  value={formData.thal}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900 focus:outline-none focus:ring-2 focus:ring-medical-500 text-sm text-slate-800 dark:text-slate-100"
                >
                  <option value="0">Normal/None (Value 0)</option>
                  <option value="1">Fixed Defect (Value 1)</option>
                  <option value="2">Reversible Defect (Value 2)</option>
                  <option value="3">Normal/Typical (Value 3)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Form Actions */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between border-t border-slate-100 dark:border-slate-800 gap-4">
            
            <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
              <span>HIPAA privacy guaranteed. No data is stored externally.</span>
            </div>

            <button
              type="submit"
              disabled={isPredicting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-medical-600 to-sky-500 hover:from-medical-500 hover:to-sky-400 text-white font-semibold shadow-lg shadow-medical-500/20 transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-75 disabled:pointer-events-none"
            >
              {isPredicting ? (
                <>
                  <div className="w-5 h-5 rounded-full border-2 border-white border-t-transparent animate-spin"></div>
                  <span>Running Diagnostic scan...</span>
                </>
              ) : (
                <>
                  <span>Predict Heart Disease Risk</span>
                  <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </div>

        </form>

      </div>
    </div>
  );
}
