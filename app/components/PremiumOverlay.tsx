"use client";
import React from "react";
import { Crown, Lock } from "lucide-react";

interface PremiumOverlayProps {
  featureName: string;
  onUpgrade: () => void;
  children: React.ReactNode;
}

const PremiumOverlay: React.FC<PremiumOverlayProps> = ({ 
  featureName, 
  onUpgrade, 
  children 
}) => {
  return (
    <div className="relative">
      {children}
      <div className="absolute inset-0 bg-gray-900 bg-opacity-75 backdrop-blur-sm flex items-center justify-center rounded-lg">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-sm text-center">
          <div className="flex items-center justify-center mb-3">
            <Crown className="h-8 w-8 text-yellow-500 mr-2" />
            <Lock className="h-6 w-6 text-gray-500" />
          </div>
          <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
            Premium Feature
          </h3>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {featureName} requires a premium subscription
          </p>
          <button
            onClick={onUpgrade}
            className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-4 py-2 rounded-lg font-semibold transition-all duration-200"
          >
            Upgrade to Premium
          </button>
        </div>
      </div>
    </div>
  );
};

export default PremiumOverlay;