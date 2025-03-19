import React, { useId } from 'react';

function Select(
  { options, label, className = '', ...props },
  ref
) {
  const id = useId();

  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={id}
          className="block mb-2 text-sm font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <select
        {...props}
        id={id}
        ref={ref}
        className={`px-4 py-2 rounded-lg bg-gray-50 text-gray-900 placeholder-gray-400 
                   outline-none border border-gray-300 focus:ring-2 focus:ring-blue-400 
                   focus:border-blue-400 hover:border-gray-400 transition duration-200 
                   w-full mb-4 ${className}`}
      >
        {options?.map((option) => (
          <option key={option} value={option} className="text-black">
            {option}
          </option>
        ))}
      </select>
    </div>
  );
}

export default React.forwardRef(Select);
