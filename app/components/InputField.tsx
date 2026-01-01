import React from 'react';

export interface InputFieldProps {
  icon: React.ReactNode;
  label: string;
  value: number;
  onChange: (value: number) => void;
  step?: number;
  min?: number;
  max?: number;
  required?: boolean;
  errorMessage?: string;
}

const InputField: React.FC<InputFieldProps> = ({
  icon,
  label,
  value,
  onChange,
  step = 1,
  min = 0,
  max,
  required = false,
  errorMessage
}) => {
  const isInvalid = required && (value <= 0 || (max !== undefined && value > max));
  const labelId = label.replace(/\s+/g, '-').toLowerCase();

  return (
    <div className="mb-4">
      <label
        htmlFor={labelId}
        className="block text-sm font-medium mb-1 text-gray-700 dark:text-gray-300"
      >
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative rounded-md shadow-sm">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          {icon}
        </div>
        <input
          type="number"
          name={labelId}
          id={labelId}
          className={`block w-full pl-12 pr-3 py-2 sm:text-sm rounded-md transition-colors
            focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:outline-none
            dark:bg-gray-700 dark:text-white text-gray-700
            ${isInvalid
              ? 'border-red-500 dark:border-red-500 border-2'
              : 'border-gray-300 dark:border-gray-600 border'
            }`}
          value={value}
          onChange={(e) => {
            const newValue = e.target.value === '' ? 0 : parseFloat(e.target.value);
            onChange(newValue);
          }}
          step={step}
          min={min}
          max={max}
          aria-invalid={isInvalid}
          aria-describedby={isInvalid ? `${labelId}-error` : undefined}
        />
      </div>
      {isInvalid && errorMessage && (
        <p id={`${labelId}-error`} className="mt-1 text-sm text-red-600 dark:text-red-400" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

export default InputField;