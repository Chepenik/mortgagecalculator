"use client";

import React, { useEffect, useState } from 'react';
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <header className="flex justify-between items-center mb-8 pb-6 border-b-2 border-orange-200 dark:border-orange-500/30">
        <div className="flex items-center gap-2">
          <span className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400 bg-clip-text text-transparent">
            Sound Money Mortgage
          </span>
          <span className="text-3xl sm:text-4xl font-black text-orange-600 dark:text-orange-400">₿</span>
        </div>
        <div className="w-10 h-10"></div>
      </header>
    );
  }

  return (
    <header className="flex justify-between items-center mb-8 pb-6 border-b-2 border-orange-200 dark:border-orange-500/30">
      <div className="flex items-center gap-2">
        <span className="text-3xl sm:text-4xl font-black bg-gradient-to-r from-orange-600 to-red-600 dark:from-orange-400 dark:to-red-400 bg-clip-text text-transparent">
          Sound Money Mortgage
        </span>
        <span className="text-3xl sm:text-4xl font-black text-orange-600 dark:text-orange-400 animate-pulse">₿</span>
      </div>
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="p-2 rounded-full bg-gradient-to-r from-orange-100 to-red-100 dark:from-orange-900/30 dark:to-red-900/30 hover:from-orange-200 hover:to-red-200 dark:hover:from-orange-800/50 dark:hover:to-red-800/50 transition-all duration-300 border border-orange-300 dark:border-orange-500/50"
        aria-label="Toggle dark mode"
      >
        {theme === "dark" ? (
          <Sun className="h-6 w-6 text-orange-400" />
        ) : (
          <Moon className="h-6 w-6 text-orange-600" />
        )}
      </button>
    </header>
  );
};

export default Header;