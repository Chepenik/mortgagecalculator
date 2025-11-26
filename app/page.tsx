"use client";
import React, { useState, useEffect, lazy, Suspense } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner";
import SupportSection from "./components/SupportSection";

const MortgageCalculator = lazy(() => import("./components/MortgageCalculator"));

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between bg-gradient-to-br from-orange-50 to-red-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="w-full">
        <div className="p-4 sm:p-8 max-w-6xl mx-auto w-full">
          <Header />
          <Suspense fallback={<LoadingSpinner />}>
            {mounted && <MortgageCalculator />}
          </Suspense>
        </div>
        <SupportSection />
      </div>
      <Footer />
    </main>
  );
}