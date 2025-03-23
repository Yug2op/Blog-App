import React, { useId, forwardRef } from 'react';

const Select = forwardRef(({ options = [], label, className = '', ...props }, ref) => {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-md font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`px-4 py-2 rounded-lg bg-white-700 text-black placeholder-gray-400 
                   outline-none border border-white-800 focus:ring-2 focus:ring-blue-500 
                   focus:border-blue-200 hover:border-gray-400 transition duration-200 w-full ${className}`}
      >
        {options.length > 0 ? (
          options.map((option, index) => (
            <option key={index} value={option} className="text-gray-900 bg-white-100">
              {option}
            </option>
          ))
        ) : (
          <option disabled className="text-gray-900">
            No options available
          </option>
        )}
      </select>
    </div>
  );
});

export default Select;
