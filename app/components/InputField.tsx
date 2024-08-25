import React from 'react';

export interface InputFieldProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  onChange: (value: number) => void;
  step?: number;
  min?: number;
}

const InputField: React.FC<InputFieldProps> = ({ icon, label, value, onChange, step = 1, min = 0 }) => (
  <div className="mb-4">
    <label className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300" htmlFor={label}>
      {label}
    </label>
    <div className="relative rounded-md shadow-sm">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        {icon}
      </div>
      <input
        type="number"
        name={label}
        id={label}
        className="block w-full pl-10 pr-3 py-2 sm:text-sm border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white text-gray-700"
        value={value}
        onChange={(e) => {
          const newValue = e.target.value === '' ? 0 : parseFloat(e.target.value);
          onChange(newValue);
        }}
        step={step}
        min={min}
      />
    </div>
  </div>
);

export default InputField;