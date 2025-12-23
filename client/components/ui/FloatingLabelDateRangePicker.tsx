"use client";

import { useEffect, useRef, useState } from "react";
import { DayPicker, DateRange } from "react-day-picker";
import "react-day-picker/style.css";

interface FloatingLabelDateRangePickerProps {
  label: string;
  value?: DateRange;
  onChange?: (range: DateRange | undefined) => void;
  required?: boolean;
  disabled?: boolean;
  errors?: string[];
}

export default function FloatingLabelDateRangePicker({
  label,
  value,
  onChange,
  required,
  disabled,
  errors,
}: FloatingLabelDateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  // Format displayed value
  const formattedValue =
    value?.from && value?.to
      ? `${value.from.toLocaleDateString()} - ${value.to.toLocaleDateString()}`
      : "";

  // Close calendar on outside click
  const handleClickOutside = (e: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      <div className="relative" ref={wrapperRef}>
        {/* Input */}
        <input
          type="text"
          readOnly
          disabled={disabled}
          value={formattedValue}
          onClick={() => !disabled && setIsOpen(true)}
          placeholder=" "
          className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-800 bg-transparent
            rounded-lg border border-gray-300 appearance-none focus:outline-none
            focus:ring-0 focus:border-blue-600 peer cursor-pointer"
        />

        {/* Floating Label */}
        <label
          className="absolute text-sm text-gray-800 duration-300 transform
            -translate-y-4 scale-75 top-2 z-10 origin-left bg-white px-2
            peer-placeholder-shown:scale-100
            peer-placeholder-shown:top-1/2
            peer-placeholder-shown:-translate-y-1/2
            peer-focus:top-2
            peer-focus:scale-75
            peer-focus:-translate-y-4
            peer-focus:text-blue-600
            start-1"
        >
          {label}
          {required && <span className="text-red-600 ml-1">*</span>}
        </label>

        {/* Calendar */}
        {isOpen && (
          <div className="absolute z-50 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg p-3">
            <DayPicker
              mode="range"
              selected={value}
              onSelect={onChange}
              disabled={{ before: new Date() }} // Disable past dates
              numberOfMonths={1}
            />
          </div>
        )}
      </div>

      {/* Error */}
      {errors && errors.length > 0 && (
        <p className="mt-1 text-xs">
          <span className="font-medium text-red-600">{errors[0]}</span>
        </p>
      )}
    </>
  );
}
