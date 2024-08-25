"use client";

import React, { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';
import MortgageCalculator from './components/MortgageCalculator';

export default function Home() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  useEffect(() => {
    document.body.classList.toggle('dark', darkMode);
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  return (
    <main className={`flex min-h-screen flex-col items-center justify-between p-8 ${darkMode ? 'dark' : ''} bg-orange-50 dark:bg-gray-900`}>
      <div className="w-full max-w-4xl">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-4xl font-bold text-red-600 dark:text-orange-400">Mortgage Calculator</h1>
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full hover:bg-orange-200 dark:hover:bg-red-800"
          >
            {darkMode ? <Sun className="h-6 w-6 text-orange-400" /> : <Moon className="h-6 w-6 text-red-600" />}
          </button>
        </div>
        <MortgageCalculator />
      </div>
    </main>
  );
}