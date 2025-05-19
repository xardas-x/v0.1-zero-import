import React, { useState, useEffect, useRef } from 'react';

interface SliderProps {
  min: number;
  max: number;
  step?: number;
  value: number;
  onChange: (value: number) => void;
  label?: string;
  markers?: { value: number; label: string }[];
  className?: string;
}

const Slider: React.FC<SliderProps> = ({
  min,
  max,
  step = 1,
  value,
  onChange,
  label,
  markers = [],
  className = '',
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);

  // Calculate percentage for positioning the thumb
  const percentage = ((value - min) / (max - min)) * 100;

  const handleMove = (clientX: number) => {
    if (sliderRef.current) {
      const rect = sliderRef.current.getBoundingClientRect();
      const sliderWidth = rect.width;
      const offsetX = clientX - rect.left;
      
      // Calculate the new value based on position
      let newPercentage = Math.max(0, Math.min(100, (offsetX / sliderWidth) * 100));
      let newValue = min + (newPercentage / 100) * (max - min);
      
      // If step is provided, round to the nearest step
      if (step) {
        newValue = Math.round(newValue / step) * step;
      }
      
      // Ensure the value is within bounds
      newValue = Math.max(min, Math.min(max, newValue));
      
      onChange(newValue);
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
    handleMove(e.clientX);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    e.preventDefault();
    setIsDragging(true);
    handleMove(e.touches[0].clientX);
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (isDragging) {
        handleMove(e.clientX);
      }
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (isDragging && e.touches[0]) {
        handleMove(e.touches[0].clientX);
      }
    };

    const handleEnd = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('touchmove', handleTouchMove);
      document.addEventListener('mouseup', handleEnd);
      document.addEventListener('touchend', handleEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('touchmove', handleTouchMove);
      document.removeEventListener('mouseup', handleEnd);
      document.removeEventListener('touchend', handleEnd);
    };
  }, [isDragging]);

  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">
          {label}
        </label>
      )}
      
      <div 
        ref={sliderRef}
        className="relative h-6 w-full cursor-pointer"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        {/* Track background */}
        <div className="absolute top-1/2 transform -translate-y-1/2 left-0 right-0 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
        
        {/* Filled track */}
        <div 
          className="absolute top-1/2 transform -translate-y-1/2 left-0 h-2 bg-blue-500 rounded-full dark:bg-blue-600" 
          style={{ width: `${percentage}%` }} 
        />
        
        {/* Thumb */}
        <div 
          className={`absolute top-1/2 transform -translate-y-1/2 h-6 w-6 bg-white border-2 border-blue-500 rounded-full shadow-md transition-transform ${isDragging ? 'scale-110' : ''}`}
          style={{ left: `calc(${percentage}% - 12px)` }}
        />
        
        {/* Markers */}
        {markers.map((marker, index) => {
          const markerPercentage = ((marker.value - min) / (max - min)) * 100;
          return (
            <div key={index} className="absolute top-8" style={{ left: `calc(${markerPercentage}% - 12px)` }}>
              <div className="h-1.5 w-1 bg-gray-400 mx-auto mb-1" />
              <span className="text-xs text-gray-500 whitespace-nowrap">{marker.label}</span>
            </div>
          );
        })}
      </div>
      
      <div className="flex justify-between mt-8">
        <span className="text-sm text-gray-500">{min}</span>
        <span className="text-sm text-gray-500">{max}</span>
      </div>
    </div>
  );
};

export default Slider;