"use client";
import React, { useState, useEffect, lazy, Suspense } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LoadingSpinner from "./components/LoadingSpinner";

const MortgageCalculator = lazy(() => import("./components/MortgageCalculator"));

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-4 sm:p-8 bg-gradient-to-br from-orange-50 to-red-100 dark:from-gray-900 dark:to-gray-800 transition-colors duration-300">
      <div className="w-full max-w-6xl">
        <Header />
        <Suspense fallback={<LoadingSpinner />}>
          {mounted && <MortgageCalculator />}
        </Suspense>
      </div>
      <Footer />
    </main>
  );
}