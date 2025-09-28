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
      <header className="flex justify-between items-center mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-red-600 dark:text-orange-400 transition-colors duration-300">
          Ultimate Mortgage Calculator
        </h1>
        <div className="w-10 h-10"></div>
      </header>
    );
  }

  return (
    <header className="flex justify-between items-center mb-8">
      <h1 className="text-3xl sm:text-4xl font-bold text-red-600 dark:text-orange-400 transition-colors duration-300">
        Ultimate Mortgage Calculator
      </h1>
      <button
        onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
        className="p-2 rounded-full bg-orange-100 dark:bg-gray-700 hover:bg-orange-200 dark:hover:bg-gray-600 transition-colors duration-300"
        aria-label="Toggle dark mode"
      >
        {theme === "dark" ? (
          <Sun className="h-6 w-6 text-orange-400" />
        ) : (
          <Moon className="h-6 w-6 text-red-600" />
        )}
      </button>
    </header>
  );
};

export default Header;