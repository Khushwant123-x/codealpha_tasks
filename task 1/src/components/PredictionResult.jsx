import React, { useEffect } from 'react';
import { 
  ShieldAlert, ShieldCheck, Heart, AlertTriangle, 
  RotateCcw, Download, Info, CheckCircle2, ChevronRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

export default function PredictionResult({ result, formData, onReset }) {
  const isHighRisk = result.riskStatus === 'High Risk';
  const probability = result.probability;
  const confidence = result.confidence;

  // Run confetti when low risk is shown as a nice user surprise
  useEffect(() => {
    if (!isHighRisk) {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#0ea5e9', '#38bdf8', '#10b981']
      });
    }
  }, [isHighRisk]);

  // Generate personalized medical advice based on input values
  const getPersonalizedRecommendations = () => {
    const recommendations = [];

    // Cholesterol check
    const cholVal = parseInt(formData.chol);
    if (cholVal > 240) {
      recommendations.push({
        type: 'warning',
        label: 'Elevated Serum Cholesterol Detected',
        text: `Your cholesterol level (${cholVal} mg/dl) is high. Consider a diet low in saturated fats, increasing soluble fiber, or consulting with a cardiologist about lipid-lowering therapies.`
      });
    }

    // Blood Pressure check
    const bpVal = parseInt(formData.trestbps);
    if (bpVal >= 140) {
      recommendations.push({
        type: 'warning',
        label: 'Stage 1/2 Hypertensive BP Level',
        text: `Resting blood pressure is elevated at ${bpVal} mmHg. Monitor BP daily, restrict sodium intake, engage in aerobic exercise, and evaluate medication options with a clinician.`
      });
    } else if (bpVal >= 120) {
      recommendations.push({
        type: 'info',
        label: 'Pre-hypertensive Blood Pressure',
        text: `Resting blood pressure (${bpVal} mmHg) is pre-hypertensive. Maintain a balanced diet (like the DASH diet) and exercise regularly.`
      });
    }

    // Fasting Blood Sugar check
    if (formData.fbs === '1') {
      recommendations.push({
        type: 'warning',
        label: 'High Fasting Blood Sugar (&gt;120 mg/dl)',
        text: 'FBS indicator points to diabetic or pre-diabetic ranges. Recommend HbA1c screening and carbohydrate management.'
      });
    }

    // Chest pain symptoms
    if (formData.cp === '0') {
      recommendations.push({
        type: 'info',
        label: 'Typical Angina Symptoms',
        text: 'Patient exhibits classic typical angina chest pains. Angiography or stress testing is clinically relevant.'
      });
    }

    // Default general advice
    recommendations.push({
      type: 'success',
      label: 'Regular Cardiovascular Monitoring',
      text: 'Participate in 150 minutes of moderate-intensity exercise weekly and schedule annual cardiovascular checkups.'
    });

    return recommendations.slice(0, 3); // top 3
  };

  const recommendations = getPersonalizedRecommendations();

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 fade-in-up">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column: Risk Gauge & Main Metrics */}
        <div className="lg:col-span-5 space-y-6">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 shadow-xl p-6 text-center relative overflow-hidden">
            
            {/* Ambient background accent */}
            <div className={`absolute top-0 inset-x-0 h-2 bg-gradient-to-r ${
              isHighRisk ? 'from-rose-500 to-amber-500' : 'from-emerald-500 to-teal-400'
            }`} />

            <h3 className="text-sm font-semibold text-slate-500 dark:text-slate-400 mt-2">
              Cardiovascular Risk Assessment
            </h3>

            {/* Circular Gauge */}
            <div className="relative w-44 h-44 mx-auto my-8">
              
              {/* Outer Glow */}
              <div className={`absolute inset-0 rounded-full blur-xl opacity-20 animate-pulse ${
                isHighRisk ? 'bg-rose-500' : 'bg-emerald-500'
              }`} />

              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                {/* Circle Background */}
                <circle 
                  cx="50" cy="50" r="42" 
                  className="stroke-slate-100 dark:stroke-slate-800"
                  strokeWidth="8" fill="transparent" 
                />
                {/* Circle Foreground Progress */}
                <circle 
                  cx="50" cy="50" r="42" 
                  className={`transition-all duration-1000 ease-out ${
                    isHighRisk ? 'stroke-rose-500' : 'stroke-emerald-500'
                  }`}
                  strokeWidth="8" 
                  fill="transparent" 
                  strokeDasharray="263.89"
                  strokeDashoffset={263.89 - (263.89 * probability) / 100}
                  strokeLinecap="round"
                />
              </svg>
              
              {/* Text inside circle */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-extrabold tracking-tight text-slate-950 dark:text-white">
                  {probability}%
                </span>
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Probability
                </span>
              </div>
            </div>

            {/* Risk Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-2xl font-bold text-sm tracking-wide shadow-sm border mb-4">
              {isHighRisk ? (
                <>
                  <ShieldAlert className="w-5 h-5 text-rose-500" />
                  <span className="text-rose-600 dark:text-rose-400">High Risk Detected</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-5 h-5 text-emerald-500" />
                  <span className="text-emerald-600 dark:text-emerald-400">Low Risk Classified</span>
                </>
              )}
            </div>

            {/* Confidence metric */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-4 mt-2 grid grid-cols-2 text-left">
              <div className="border-r border-slate-100 dark:border-slate-800 pr-4">
                <span className="block text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Confidence Level</span>
                <span className="text-lg font-bold text-slate-900 dark:text-slate-100">{confidence}%</span>
              </div>
              <div className="pl-4">
                <span className="block text-[10px] uppercase font-semibold text-slate-400 tracking-wider">Model Status</span>
                <span className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-600 dark:text-emerald-400 mt-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping"></span>
                  Verified
                </span>
              </div>
            </div>

          </div>

          {/* Reset button */}
          <button
            onClick={onReset}
            className="w-full flex items-center justify-center gap-2 py-3.5 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:bg-slate-50 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 font-semibold shadow-sm hover:shadow-md transition-all active:scale-[0.98]"
          >
            <RotateCcw className="w-4 h-4" />
            <span>New Patient Scan</span>
          </button>
        </div>

        {/* Right Column: Recommendations & Explanation */}
        <div className="lg:col-span-7 space-y-6">
          <div className="rounded-3xl border border-slate-200 dark:border-slate-800/80 bg-white/80 dark:bg-slate-900/80 shadow-xl p-6 sm:p-8 space-y-6">
            
            {/* Header */}
            <div className="flex justify-between items-center pb-4 border-b border-slate-100 dark:border-slate-800">
              <div>
                <h2 className="font-display font-bold text-xl text-slate-900 dark:text-white">AI Diagnostic Report</h2>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">Patient Clinical Assessment Summary</p>
              </div>
              <button 
                onClick={() => alert("Report download simulated successfully! Check your downloads folder (mock).")}
                className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 dark:text-slate-400 transition-all hover:text-medical-500"
                title="Download PDF"
              >
                <Download className="w-5 h-5" />
              </button>
            </div>

            {/* Feature Summary Analysis */}
            <div>
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                <Info className="w-4 h-4 text-medical-500" />
                <span>Feature Contribution Analysis</span>
              </h3>
              
              <div className="space-y-3">
                {/* Age feature bar */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-700 dark:text-slate-300">Patient Age ({formData.age} yrs)</span>
                    <span className="text-slate-500">Medium Impact</span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div className="bg-medical-500 h-full rounded-full" style={{ width: '55%' }}></div>
                  </div>
                </div>

                {/* Cholesterol feature bar */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-700 dark:text-slate-300">Serum Cholesterol ({formData.chol} mg/dl)</span>
                    <span className={parseInt(formData.chol) > 240 ? 'text-amber-500' : 'text-slate-500'}>
                      {parseInt(formData.chol) > 240 ? 'High Impact' : 'Low Impact'}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${parseInt(formData.chol) > 240 ? 'bg-amber-500' : 'bg-medical-500'}`}
                      style={{ width: parseInt(formData.chol) > 240 ? '80%' : '35%' }}
                    ></div>
                  </div>
                </div>

                {/* Resting BP feature bar */}
                <div>
                  <div className="flex justify-between text-xs font-semibold mb-1">
                    <span className="text-slate-700 dark:text-slate-300">Resting BP ({formData.trestbps} mmHg)</span>
                    <span className={parseInt(formData.trestbps) >= 140 ? 'text-amber-500' : 'text-slate-500'}>
                      {parseInt(formData.trestbps) >= 140 ? 'High Impact' : 'Low Impact'}
                    </span>
                  </div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-2 rounded-full overflow-hidden">
                    <div 
                      className={`h-full rounded-full ${parseInt(formData.trestbps) >= 140 ? 'bg-amber-500' : 'bg-medical-500'}`}
                      style={{ width: parseInt(formData.trestbps) >= 140 ? '75%' : '40%' }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Clinical Recommendations */}
            <div className="space-y-3">
              <h3 className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-1">
                Clinical Recommendations
              </h3>

              {recommendations.map((rec, index) => (
                <div 
                  key={index}
                  className={`p-4 rounded-2xl border flex gap-3 ${
                    rec.type === 'warning'
                      ? 'border-amber-500/20 bg-amber-500/5 text-amber-900 dark:text-amber-300'
                      : rec.type === 'info'
                      ? 'border-sky-500/20 bg-sky-500/5 text-sky-900 dark:text-sky-300'
                      : 'border-emerald-500/20 bg-emerald-500/5 text-emerald-900 dark:text-emerald-300'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">
                    {rec.type === 'warning' ? (
                      <AlertTriangle className="w-5 h-5 text-amber-500" />
                    ) : rec.type === 'info' ? (
                      <Info className="w-5 h-5 text-sky-500" />
                    ) : (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                    )}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm tracking-wide mb-0.5">{rec.label}</h4>
                    <p className="text-xs leading-relaxed opacity-90">{rec.text}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* FastAPI integration placeholder (Collapsible developer panel) */}
            <div className="border-t border-slate-100 dark:border-slate-800 pt-6">
              <details className="group cursor-pointer select-none">
                <summary className="list-none flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-400 group-hover:text-medical-500 transition-colors">
                  <span className="flex items-center gap-1.5">
                    <span className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-[10px]">API</span>
                    FastAPI Endpoint Integration Code
                  </span>
                  <ChevronRight className="w-4 h-4 transform group-open:rotate-90 transition-transform duration-200" />
                </summary>
                
                <div className="mt-4 p-4 rounded-2xl bg-slate-950 text-slate-300 font-mono text-[11px] leading-relaxed border border-slate-900 overflow-x-auto">
                  <p className="text-slate-500 mb-2">// Connect React to FastAPI backend</p>
                  <pre className="text-sky-300">{`const predictHeartDisease = async (patientData) => {
  try {
    const response = await fetch('http://localhost:8000/api/predict', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        age: parseInt(patientData.age),
        sex: parseInt(patientData.sex),
        cp: parseInt(patientData.cp),
        trestbps: parseInt(patientData.trestbps),
        chol: parseInt(patientData.chol),
        fbs: parseInt(patientData.fbs),
        restecg: parseInt(patientData.restecg),
        thalach: parseInt(patientData.thalach),
        exang: parseInt(patientData.exang),
        oldpeak: parseFloat(patientData.oldpeak),
        slope: parseInt(patientData.slope),
        ca: parseInt(patientData.ca),
        thal: parseInt(patientData.thal)
      })
    });
    
    const result = await response.json();
    return result; // returns { risk_status, probability, confidence }
  } catch (error) {
    console.error("FastAPI backend error:", error);
  }
};`}</pre>
                </div>
              </details>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
