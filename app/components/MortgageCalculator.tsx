"use client";
import React, { useState, useMemo } from "react";
import MortgageInputs from "./MortgageInputs";
import MortgageSummary from "./MortgageSummary";
import AmortizationSchedule from "./AmortizationSchedule";
import LoanBalanceChart from "./charts/LoanBalanceChart";
import PaymentBreakdownChart from "./charts/PaymentBreakdownChart";
import PrincipalVsInterestChart from "./charts/PrincipalVsInterestChart";
import EquityBuildupChart from "./charts/EquityBuildupChart";
import BitcoinWealthComparisonChart from "./charts/BitcoinWealthComparisonChart";
import BitcoinTicker from "./BitcoinTicker";
import CompactSupportBar from "./CompactSupportBar";
import {
  generateAmortizationSchedule,
  calculateTotalCostOfOwnership,
} from "../utils/mortgageCalculations";

interface MortgageData {
  homePrice: number;
  downPayment: number;
  annualInterestRate: number;
  loanTermYears: number;
  propertyTax: number;
  homeInsurance: number;
  hoa: number;
  homeAppreciationRate: number;
  additionalCosts: { name: string; value: number }[];
}

const initialMortgageData: MortgageData = {
  homePrice: 400000,
  downPayment: 80000,
  annualInterestRate: 6.25,
  loanTermYears: 30,
  propertyTax: 4000,
  homeInsurance: 2000,
  hoa: 0,
  homeAppreciationRate: 1.5,
  additionalCosts: [],
};

const MortgageCalculator: React.FC = () => {
  const [mortgageData, setMortgageData] = useState<MortgageData>(
    initialMortgageData
  );
  const [newCostName, setNewCostName] = useState("");
  const [newCostValue, setNewCostValue] = useState<number | "">(0);
  const [extraPayment, setExtraPayment] = useState(0);
  const [bitcoinPrice, setBitcoinPrice] = useState<number | null>(null);

  const handleAddCost = () => {
    if (
      newCostName &&
      typeof newCostValue === "number" &&
      newCostValue > 0
    ) {
      const newCosts = [
        ...mortgageData.additionalCosts,
        { name: newCostName, value: newCostValue },
      ];
      setMortgageData({ ...mortgageData, additionalCosts: newCosts });
      setNewCostName("");
      setNewCostValue("");
    }
  };

  const handleClearCosts = () => {
    setMortgageData({
      homePrice: 0,
      downPayment: 0,
      annualInterestRate: 0,
      loanTermYears: 0,
      propertyTax: 0,
      homeInsurance: 0,
      hoa: 0,
      homeAppreciationRate: 0,
      additionalCosts: [],
    });
    setNewCostName("");
    setNewCostValue("");
    setExtraPayment(0);
  };

  const handleExtraPaymentChange = (amount: number) => {
    setExtraPayment(amount);
  };

  const calculationResult = useMemo(() => {
    if (
      mortgageData.homePrice <= 0 ||
      mortgageData.annualInterestRate <= 0 ||
      mortgageData.loanTermYears <= 0
    ) {
      return {
        schedule: [],
        loanPayment: 0,
        totalMonthlyPayment: 0,
        totalInterest: 0,
        totalCost: 0,
        totalCostOfOwnership: 0,
        loanAmount: 0,
        downPayment: 0,
        actualLoanTermYears: 0,
      };
    }
    const loanAmount = mortgageData.homePrice - mortgageData.downPayment;
    const {
      schedule,
      loanPayment,
      totalMonthlyPayment: baseMonthlyPayment,
      totalInterest,
    } = generateAmortizationSchedule(
      loanAmount,
      mortgageData.annualInterestRate,
      mortgageData.loanTermYears,
      mortgageData.propertyTax,
      mortgageData.homeInsurance,
      mortgageData.hoa,
      extraPayment
    );
    const additionalCostsTotal = mortgageData.additionalCosts.reduce(
      (total, cost) => total + cost.value,
      0
    );
    const totalMonthlyPayment =
      baseMonthlyPayment + additionalCostsTotal + extraPayment;
    const { totalCost: totalCostOfOwnership, actualLoanTermYears } =
      calculateTotalCostOfOwnership(
        loanAmount,
        totalInterest,
        mortgageData.loanTermYears,
        mortgageData.propertyTax,
        mortgageData.homeInsurance,
        mortgageData.hoa,
        mortgageData.homeAppreciationRate,
        mortgageData.downPayment,
        mortgageData.additionalCosts,
        extraPayment
      );
    const totalCost = totalMonthlyPayment * 12 * actualLoanTermYears;
    return {
      schedule,
      loanPayment,
      totalMonthlyPayment,
      totalInterest,
      totalCost,
      totalCostOfOwnership,
      loanAmount,
      downPayment: mortgageData.downPayment,
      actualLoanTermYears,
    };
  }, [mortgageData, extraPayment]);

  const yearlyData = useMemo(() => {
    if (!calculationResult.schedule.length) return [];
    let cumulativePrincipal = 0;
    let cumulativeInterest = 0;
    return calculationResult.schedule
      .filter((row) => row.month % 12 === 0 || row.balance === 0)
      .map((row) => {
        cumulativePrincipal +=
          row.principalPayment * (row.month % 12 === 0 ? 12 : row.month % 12);
        cumulativeInterest +=
          row.interestPayment * (row.month % 12 === 0 ? 12 : row.month % 12);
        const currentHomeValue =
          mortgageData.homePrice *
          Math.pow(
            1 + mortgageData.homeAppreciationRate / 100,
            row.month / 12
          );
        return {
          year: row.month / 12,
          balance: row.balance,
          principalPaid: cumulativePrincipal,
          interestPaid: cumulativeInterest,
          homeValue: currentHomeValue,
          equity: currentHomeValue - row.balance,
        };
      });
  }, [calculationResult.schedule, mortgageData]);

  const paymentBreakdown = [
    { name: "Principal & Interest", value: calculationResult.loanPayment },
    { name: "Property Tax", value: mortgageData.propertyTax / 12 },
    { name: "Home Insurance", value: mortgageData.homeInsurance / 12 },
    { name: "HOA", value: mortgageData.hoa },
    ...mortgageData.additionalCosts,
    { name: "Extra Payment", value: extraPayment },
  ];

  const isDataFilled =
    mortgageData.homePrice > 0 &&
    mortgageData.loanTermYears > 0 &&
    mortgageData.annualInterestRate > 0;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-4 bg-gray-50 dark:bg-gray-900">
      <div className="lg:col-span-2">
        <BitcoinTicker onPriceUpdate={setBitcoinPrice} /> 
      </div>
      <div className="lg:col-span-2 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
          <MortgageInputs data={mortgageData} onChange={setMortgageData} />
          <div className="mt-6 space-y-4">
            <div className="flex flex-col space-y-2">
              <input
                type="text"
                value={newCostName}
                onChange={(e) => setNewCostName(e.target.value)}
                placeholder="Cost Name"
                className="w-full border p-2 rounded text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700"
              />
              <input
                type="number"
                value={newCostValue}
                onChange={(e) =>
                  setNewCostValue(
                    e.target.value === "" ? "" : Number(e.target.value)
                  )
                }
                placeholder="Cost Value (Denominate in monthly value)"
                className="w-full border p-2 rounded text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700"
              />
            </div>
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
              <button
                onClick={handleAddCost}
                className="w-full sm:w-1/2 px-4 py-2 bg-gray-300 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md hover:bg-gradient-to-r hover:from-pink-500 hover:via-red-500 hover:to-yellow-500 hover:text-white transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              >
                Add Cost
              </button>
              <button
                onClick={handleClearCosts}
                className="w-full sm:w-1/2 px-4 py-2 bg-red-500 dark:bg-red-700 text-white rounded-md hover:bg-red-600 dark:hover:bg-red-800 transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
              >
                Clear All
              </button>
            </div>
          </div>
        </div>
        <MortgageSummary
          principal={calculationResult.loanAmount}
          loanPayment={calculationResult.loanPayment}
          totalMonthlyPayment={calculationResult.totalMonthlyPayment}
          totalInterest={calculationResult.totalInterest}
          totalCostOfOwnership={calculationResult.totalCostOfOwnership}
          downPayment={calculationResult.downPayment}
          homePrice={mortgageData.homePrice}
          additionalCosts={mortgageData.additionalCosts}
        />
      </div>
      {isDataFilled && (
        <>
          <div className="lg:col-span-2 bg-white p-4 dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-red-600 dark:text-red-400">
              Loan Balance Over Time
            </h2>
            <LoanBalanceChart
              data={yearlyData}
              principal={calculationResult.loanAmount}
              loanTermYears={mortgageData.loanTermYears}
              extraPayment={extraPayment}
            />
          </div>
          <div className="lg:col-span-2 bg-white p-4 dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-red-600 dark:text-red-400">
              Monthly Payment Breakdown
            </h2>
            <PaymentBreakdownChart data={paymentBreakdown} />
          </div>
          <div className="lg:col-span-2 bg-white p-4 dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-red-600 dark:text-red-400">
              Principal vs Interest Payments
            </h2>
            <PrincipalVsInterestChart
              data={yearlyData}
              loanTermYears={calculationResult.actualLoanTermYears}
              extraPayment={extraPayment}
              onExtraPaymentChange={handleExtraPaymentChange}
            />
          </div>
          <div className="lg:col-span-2 bg-white p-4 dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-orange-600 dark:text-orange-400 flex items-center gap-2">
              ₿ Bitcoin Wealth vs Home Equity
            </h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
              What if you invested your down payment in Bitcoin instead of using it for a down payment?
            </p>
            <BitcoinWealthComparisonChart
              downPayment={mortgageData.downPayment}
              yearlyData={yearlyData}
              bitcoinPrice={bitcoinPrice}
              loanTermYears={mortgageData.loanTermYears}
            />
          </div>
          <div className="lg:col-span-2 bg-white p-4 dark:bg-gray-800 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold mb-4 text-red-600 dark:text-red-400">
              Home Value and Equity Over Time
            </h2>
            <EquityBuildupChart
              data={yearlyData}
              homePrice={mortgageData.homePrice}
              downPayment={mortgageData.downPayment}
            />
          </div>
          <div className="lg:col-span-2 bg-white p-4 dark:bg-gray-800 rounded-lg shadow-md">
            <AmortizationSchedule
              data={yearlyData}
              homePrice={mortgageData.homePrice}
              downPayment={mortgageData.downPayment}
              propertyTax={mortgageData.propertyTax}
              homeInsurance={mortgageData.homeInsurance}
              hoa={mortgageData.hoa}
              appreciationRate={mortgageData.homeAppreciationRate}
              loanPayment={calculationResult.loanPayment}
              additionalCosts={mortgageData.additionalCosts}
              totalMonthlyPayment={calculationResult.totalMonthlyPayment}
            />
          </div>
        </>
      )}
      <CompactSupportBar />
    </div>
  );
};

export default MortgageCalculator;
