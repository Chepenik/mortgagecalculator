"use client";
import React from "react";
import { motion } from "framer-motion";
import { Heart, BookOpen, CreditCard, Coffee } from "lucide-react";

const CompactSupportBar: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mt-12 p-6 bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/30 rounded-xl backdrop-blur"
    >
      <div className="text-center mb-4">
        <h3 className="text-lg font-bold text-orange-600 dark:text-orange-400 mb-2">
          ❤️ Love this calculator? Support the creator
        </h3>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          Help fund new features and keep this tool free for everyone
        </p>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <a
          href="https://ko-fi.com/chepenik"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 transform text-sm"
        >
          <Coffee className="h-4 w-4" />
          Ko-fi
        </a>
        
        <a
          href="https://creditcard.exchange.gemini.com/credit-card/apply?referral_code=jljkt4e94"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 transform text-sm"
        >
          <CreditCard className="h-4 w-4" />
          Gemini
        </a>
        
        <a
          href="https://www.amazon.com/Bitcoin-Coloring-Book-Conor-Chepenik/dp/B0FLDCGC5D"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white font-semibold rounded-lg transition-all duration-200 hover:scale-105 transform text-sm"
        >
          <BookOpen className="h-4 w-4" />
          Coloring Book
        </a>
        
        <div className="flex items-center justify-center px-4 py-3 bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-semibold text-sm">
          <Heart className="h-4 w-4 mr-1" />
          <span className="opacity-75">Thanks!</span>
        </div>
      </div>
    </motion.div>
  );
};

export default CompactSupportBar;
