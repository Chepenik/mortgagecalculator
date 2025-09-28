"use client";
import React from "react";
import { 
  ArrowRight, 
  CheckCircle, 
  BarChart3, 
  Bitcoin, 
  FileText, 
  Calculator, 
  Briefcase,
  Crown,
  X
} from "lucide-react";

interface PremiumUpgradeProps {
  onClose: () => void;
  onStartTrial: () => void;
  onViewFeatures: () => void;
}

const PremiumUpgrade: React.FC<PremiumUpgradeProps> = ({
  onClose,
  onStartTrial,
  onViewFeatures
}) => {
  const featureSections = [
    {
      id: 1,
      icon: <BarChart3 className="h-8 w-8 text-blue-500" />,
      title: "Multi-Scenario Analysis",
      features: [
        "Multiple Loan Comparison: Compare up to 3 different loan scenarios side-by-side (rates, down payments, terms)",
        "Rent vs Buy Calculator: Complete cost analysis over 10+ year horizons",
        "Refinancing Analysis: Break-even calculations and optimal timing recommendations"
      ]
    },
    {
      id: 2,
      icon: <Bitcoin className="h-8 w-8 text-orange-500" />,
      title: "Bitcoin Financial Strategy",
      subtitle: "Unique Differentiator",
      features: [
        "Bitcoin DCA Analysis: Compare monthly mortgage payment equivalent invested in Bitcoin vs real estate appreciation",
        "Bitcoin Collateral Scenarios: Calculate leverage opportunities using crypto holdings for property acquisition",
        "Historical Performance Comparison: 10-year Bitcoin vs real estate returns with future projection models"
      ]
    },
    {
      id: 3,
      icon: <FileText className="h-8 w-8 text-green-500" />,
      title: "Professional Documentation",
      features: [
        "PDF Reports: Complete mortgage analysis with amortization schedules and tax implications",
        "Excel Exports: Full data exports for loan officers and personal records",
        "Tax Analysis: Mortgage interest deductions and property tax benefit calculations"
      ]
    },
    {
      id: 4,
      icon: <Calculator className="h-8 w-8 text-purple-500" />,
      title: "Advanced Optimization Tools",
      features: [
        "Biweekly Payment Calculator: Exact savings from accelerated payment schedules",
        "Investment Opportunity Cost: Down payment alternative investment analysis",
        "PMI Calculator: Automatic calculations and removal timing predictions",
        "Inflation-Adjusted Projections: Long-term purchasing power analysis"
      ]
    },
    {
      id: 5,
      icon: <Briefcase className="h-8 w-8 text-indigo-500" />,
      title: "Portfolio Management",
      features: [
        "Save Unlimited Scenarios: Track multiple properties and loan options",
        "Location-Based Data: Custom appreciation rates using market-specific data",
        "Rate Change Alerts: Notifications for optimal refinancing opportunities"
      ]
    }
  ];

  const pricingFeatures = [
    "7-day free trial",
    "Cancel anytime",
    "All premium features included"
  ];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-red-600 to-orange-600 text-white p-8 rounded-t-2xl">
          <div className="flex justify-between items-start">
            <div>
              <div className="flex items-center gap-3 mb-3">
                <Crown className="h-10 w-10 text-yellow-300" />
                <h1 className="text-4xl font-bold">Unlock Advanced Mortgage Intelligence</h1>
              </div>
              <p className="text-xl text-red-100">
                Your basic calculations scratch the surface. Premium unlocks the complete financial picture.
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-white hover:bg-white hover:bg-opacity-20 p-2 rounded-full transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Feature Sections */}
        <div className="p-8">
          <div className="grid gap-8">
            {featureSections.map((section) => (
              <div key={section.id} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6">
                <div className="flex items-start gap-4 mb-4">
                  <div className="flex-shrink-0 p-3 bg-white dark:bg-gray-700 rounded-lg shadow-md">
                    {section.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white">
                        {section.title}
                      </h3>
                      {section.subtitle && (
                        <span className="bg-gradient-to-r from-orange-500 to-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                          {section.subtitle}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  {section.features.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 flex-shrink-0 mt-0.5" />
                      <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                        <strong className="text-gray-900 dark:text-white">
                          {feature.split(':')[0]}:
                        </strong>
                        {feature.split(':').slice(1).join(':')}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Section */}
          <div className="mt-12 bg-gradient-to-br from-gray-900 to-gray-800 dark:from-gray-800 dark:to-gray-700 rounded-2xl p-8 text-white">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Crown className="h-8 w-8 text-yellow-400" />
                <h2 className="text-3xl font-bold">Premium Plan</h2>
              </div>
              <div className="flex items-baseline justify-center gap-2 mb-2">
                <span className="text-5xl font-bold text-yellow-400">$4.99</span>
                <span className="text-xl text-gray-300">/month</span>
              </div>
              <p className="text-xl text-gray-300 mb-6">Complete mortgage decision framework</p>
              
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                {pricingFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <CheckCircle className="h-5 w-5 text-green-400" />
                    <span className="text-gray-200">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onStartTrial}
                className="flex items-center justify-center gap-2 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105"
              >
                Start 7-Day Free Trial
                <ArrowRight className="h-5 w-5" />
              </button>
              <button
                onClick={onViewFeatures}
                className="flex items-center justify-center gap-2 bg-transparent border-2 border-gray-400 hover:border-white text-gray-300 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200"
              >
                See all premium features
              </button>
            </div>
          </div>

          {/* Comparison Preview */}
          <div className="mt-8 bg-blue-50 dark:bg-blue-900/20 rounded-xl p-6">
            <h3 className="text-xl font-bold text-center mb-4 text-gray-900 dark:text-white">
              Premium vs Basic Comparison
            </h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 rounded-lg p-4">
                <h4 className="font-semibold text-gray-600 dark:text-gray-400 mb-3">Basic (Current)</h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Single mortgage calculation
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Basic amortization schedule
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Simple payment breakdown
                  </li>
                  <li className="text-gray-400">Limited to 3 calculations</li>
                </ul>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-900/20 dark:to-orange-900/20 rounded-lg p-4 border-2 border-red-200 dark:border-red-700">
                <h4 className="font-semibold text-red-600 dark:text-red-400 mb-3 flex items-center gap-2">
                  <Crown className="h-4 w-4" />
                  Premium
                </h4>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Unlimited calculations & scenarios
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Bitcoin investment analysis
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Professional PDF reports
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    Advanced optimization tools
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PremiumUpgrade;