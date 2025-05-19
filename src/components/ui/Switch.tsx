import React from 'react';

interface SwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label?: string;
  disabled?: boolean;
  className?: string;
}

const Switch: React.FC<SwitchProps> = ({
  checked,
  onChange,
  label,
  disabled = false,
  className = '',
}) => {
  const handleChange = () => {
    if (!disabled) {
      onChange(!checked);
    }
  };

  return (
    <div className={`flex items-center ${className}`}>
      <label
        className={`relative inline-flex items-center cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        <input
          type="checkbox"
          checked={checked}
          onChange={handleChange}
          className="sr-only"
          disabled={disabled}
        />
        <div
          className={`
            relative w-11 h-6 bg-gray-200 rounded-full peer-focus:outline-none 
            dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-blue-300 
            dark:peer-focus:ring-blue-800 transition-colors
            ${checked ? 'bg-blue-600 dark:bg-blue-500' : ''}
          `}
        >
          <div
            className={`
              absolute top-[2px] left-[2px] bg-white rounded-full h-5 w-5 
              transition-transform shadow-sm
              ${checked ? 'translate-x-5' : 'translate-x-0'}
            `}
          />
        </div>
        {label && (
          <span className="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300">
            {label}
          </span>
        )}
      </label>
    </div>
  );
};

export default Switch;