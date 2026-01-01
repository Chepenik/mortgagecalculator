import React from 'react';
import { DollarSign, Percent, Calendar, Home, Shield } from "lucide-react";
import InputField from "./InputField";

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

interface MortgageInputsProps {
  data: MortgageData;
  onChange: (data: MortgageData) => void;
}

const MortgageInputs: React.FC<MortgageInputsProps> = ({ data, onChange }) => {
  const handleInputChange = (name: keyof MortgageData) => (value: number) => {
    onChange({ ...data, [name]: value });
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
      <InputField
        icon={<DollarSign className="h-5 w-5 text-orange-500 dark:text-orange-400" />}
        label="Home Price"
        value={data.homePrice}
        onChange={handleInputChange('homePrice')}
        step={1000}
        required
        errorMessage="Home price is required"
      />
      <InputField
        icon={<DollarSign className="h-5 w-5 text-orange-500 dark:text-orange-400" />}
        label="Down Payment Amount"
        value={data.downPayment}
        onChange={handleInputChange('downPayment')}
        step={1000}
        max={data.homePrice}
        errorMessage="Down payment cannot exceed home price"
      />
      <InputField
        icon={<Percent className="h-5 w-5 text-orange-500 dark:text-orange-400" />}
        label="Annual Interest Rate"
        value={data.annualInterestRate}
        onChange={handleInputChange('annualInterestRate')}
        step={0.1}
        max={30}
        required
        errorMessage="Interest rate is required (max 30%)"
      />
      <InputField
        icon={<Calendar className="h-5 w-5 text-orange-500 dark:text-orange-400" />}
        label="Loan Term (Years)"
        value={data.loanTermYears}
        onChange={handleInputChange('loanTermYears')}
        min={1}
        max={50}
        required
        errorMessage="Loan term is required (1-50 years)"
      />
      <InputField
        icon={<Home className="h-5 w-5 text-orange-500 dark:text-orange-400" />}
        label="Annual Property Tax"
        value={data.propertyTax}
        onChange={handleInputChange('propertyTax')}
        step={100}
      />
      <InputField
        icon={<Shield className="h-5 w-5 text-orange-500 dark:text-orange-400" />}
        label="Annual Home Insurance"
        value={data.homeInsurance}
        onChange={handleInputChange('homeInsurance')}
        step={100}
      />
      <InputField
        icon={<DollarSign className="h-5 w-5 text-orange-500 dark:text-orange-400" />}
        label="Monthly HOA"
        value={data.hoa}
        onChange={handleInputChange('hoa')}
        step={10}
      />
      <InputField
        icon={<Percent className="h-5 w-5 text-orange-500 dark:text-orange-400" />}
        label="Annual Home Appreciation Rate"
        value={data.homeAppreciationRate}
        onChange={handleInputChange('homeAppreciationRate')}
        step={0.1}
      />
    </div>
  );
};

export default MortgageInputs;