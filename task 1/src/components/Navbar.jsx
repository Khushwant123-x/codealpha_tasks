import React, { useState } from 'react';
import { Heart, Sun, Moon, Menu, X, Activity } from 'lucide-react';

export default function Navbar({ activeTab, setActiveTab, darkMode, setDarkMode }) {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'predict', label: 'Prediction' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <nav className="sticky top-0 z-50 transition-all duration-300 border-b glass-panel bg-white/80 dark:bg-slate-900/80 border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo Section */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setActiveTab('home')}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-tr from-medical-600 to-sky-400 text-white shadow-md shadow-medical-500/20">
              <Heart className="w-6 h-6 animate-heartbeat fill-white" />
            </div>
            <div>
              <span className="font-display font-bold text-xl tracking-tight bg-gradient-to-r from-medical-600 to-sky-500 dark:from-medical-400 dark:to-sky-300 bg-clip-text text-transparent">
                HeartAI
              </span>
              <span className="block text-[10px] text-slate-400 dark:text-slate-500 font-medium -mt-1">
                Cardiovascular Diagnostics
              </span>
            </div>
          </div>

          {/* Desktop Nav Items */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-4">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                  activeTab === item.id
                    ? 'bg-medical-50 dark:bg-medical-950/40 text-medical-600 dark:text-medical-400 font-semibold shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:text-medical-600 dark:hover:text-medical-400 hover:bg-slate-100/50 dark:hover:bg-slate-800/40'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>

          {/* Right Side: Theme, Status and Mobile Menu */}
          <div className="flex items-center gap-3">
            {/* AI Engine Status Badge */}
            <div className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full border border-emerald-500/20 bg-emerald-500/5 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-xs font-semibold">
              <Activity className="w-3.5 h-3.5 animate-pulse" />
              <span>AI Engine: Online</span>
            </div>

            {/* Dark Mode toggle button */}
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2.5 rounded-xl border border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? <Sun className="w-5 h-5 text-amber-500" /> : <Moon className="w-5 h-5" />}
            </button>

            {/* Mobile Menu Burger Icon */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 rounded-xl text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav Drawer */}
      {isOpen && (
        <div className="md:hidden border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 py-4 space-y-2">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsOpen(false);
              }}
              className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                activeTab === item.id
                  ? 'bg-medical-500 text-white font-semibold'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-550 dark:hover:bg-slate-800/50'
              }`}
            >
              {item.label}
            </button>
          ))}
          {/* Mobile AI status */}
          <div className="flex items-center gap-2 px-4 py-3 border-t border-slate-100 dark:border-slate-800">
            <Activity className="w-4 h-4 text-emerald-500 animate-pulse" />
            <span className="text-xs text-slate-500 dark:text-slate-400">AI Diagnostic Engine is active</span>
          </div>
        </div>
      )}
    </nav>
  );
}
