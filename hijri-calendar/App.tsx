import React, { useEffect, useState } from 'react';
import { HijriDate } from './types';
import { fetchHijriDate } from './services/hijriService';
import { Loader2, ExternalLink, Moon, Sun } from 'lucide-react';

const REDIRECT_URL = "https://ummalquracalendar.org";

export default function App() {
  const [hijriDate, setHijriDate] = useState<HijriDate | null>(null);
  const [timeLeft, setTimeLeft] = useState(5);
  const [source, setSource] = useState<'local' | 'api' | 'loading'>('loading');
  
  const [isDarkMode, setIsDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  // Logic 1: Fetch Date (Hybrid Local/API)
  useEffect(() => {
    let mounted = true;

    const initDate = async () => {
      const result = await fetchHijriDate();
      if (mounted) {
        setHijriDate(result.date);
        setSource(result.source);
      }
    };

    initDate();

    return () => {
      mounted = false;
    };
  }, []);

  // Logic 2: Redirect Timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          window.location.replace(REDIRECT_URL);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Get current Gregorian date for display
  const gregorianDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 p-4 transition-colors duration-300">
      <div className="max-w-md w-full bg-white dark:bg-slate-900 shadow-xl rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-800 transition-colors duration-300">
        
        {/* Header / Status Bar */}
        <div className="bg-emerald-600 dark:bg-emerald-800 px-6 py-4 flex items-center justify-between text-white transition-colors duration-300">
          <div>
            <h1 className="font-bold text-xl leading-tight">
              {hijriDate ? `${hijriDate.month.en} ${hijriDate.year} AH` : 'Hijri Calendar'}
            </h1>
            {hijriDate && (
              <p className="text-xs text-emerald-100 font-medium opacity-90 mt-0.5">
                {gregorianDate}
              </p>
            )}
          </div>
          <div className="flex items-center gap-3">
            <div className="text-[10px] font-bold uppercase tracking-wider bg-emerald-700 dark:bg-emerald-900 px-2 py-1 rounded shadow-sm">
              {source === 'loading' ? 'Init...' : source === 'local' ? 'Offline' : 'Online'}
            </div>
            <button 
              onClick={toggleTheme}
              className="p-1.5 rounded-full hover:bg-emerald-700 dark:hover:bg-emerald-700 transition-colors bg-emerald-700/50"
              aria-label="Toggle dark mode"
            >
              {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* Main Content */}
        <div className="p-8 text-center min-h-[250px] flex flex-col items-center justify-center">
          
          {hijriDate ? (
            <div className="space-y-4 animate-in fade-in zoom-in duration-500">
              <div className="text-8xl font-extrabold text-emerald-800 dark:text-emerald-400 tracking-tighter leading-none transition-colors duration-300">
                {hijriDate.day}
              </div>
              
              <div className="flex flex-col items-center gap-1">
                <div className="text-2xl font-bold text-slate-800 dark:text-slate-100 transition-colors duration-300">
                  {hijriDate.month.en}
                </div>
                <div className="text-3xl font-arabic text-emerald-600 dark:text-emerald-500 transition-colors duration-300 mt-1">
                  {hijriDate.month.ar}
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <Loader2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 animate-spin transition-colors duration-300" />
              <span className="text-sm text-slate-400">Loading calendar data...</span>
            </div>
          )}

        </div>

        {/* Footer / Redirect Notice */}
        <div className="bg-slate-50 dark:bg-slate-950 px-6 py-4 border-t border-slate-100 dark:border-slate-800 transition-colors duration-300">
            <div className="flex flex-col items-center gap-2 text-center">
                <p className="text-sm text-slate-500 dark:text-slate-400 transition-colors duration-300">
                    You will be redirected to <span className="font-mono text-emerald-600 dark:text-emerald-400 font-semibold">ummalquracalendar.org</span>
                </p>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest transition-colors duration-300">
                    <Loader2 className="w-3 h-3 animate-spin" />
                    Redirecting in {timeLeft}s
                </div>
            </div>
        </div>
      </div>

      <div className="mt-8 text-center opacity-60 hover:opacity-100 transition-opacity">
        <a 
          href={REDIRECT_URL}
          className="inline-flex items-center gap-2 text-sm text-emerald-700 dark:text-emerald-400 hover:text-emerald-800 dark:hover:text-emerald-300 underline underline-offset-4 transition-colors duration-300"
        >
          Click here if you are not redirected
          <ExternalLink className="w-3 h-3" />
        </a>
      </div>
    </div>
  );
}