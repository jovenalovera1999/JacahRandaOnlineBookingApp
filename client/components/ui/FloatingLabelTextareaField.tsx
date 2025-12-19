"use client";

import { ChangeEvent } from "react";

interface FloatingLabelTextareaFieldProps {
  label: string;
  name: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  autoFocus?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  rows?: number;
  errors?: string[];
}

export default function FloatingLabelTextareaField({
  label,
  name,
  value,
  onChange,
  required,
  autoFocus,
  readOnly,
  disabled,
  rows = 4,
  errors,
}: FloatingLabelTextareaFieldProps) {
  return (
    <>
      <div className="relative">
        <textarea
          id={name}
          rows={rows}
          className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-800 bg-transparent rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer resize-y"
          placeholder=" "
          value={value}
          onChange={onChange}
          autoFocus={autoFocus}
          readOnly={readOnly}
          disabled={disabled}
        ></textarea>

        <label
          htmlFor={name}
          className="absolute text-sm text-gray-800 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-left bg-white px-2 
                     peer-focus:px-2 peer-focus:text-blue-600
                     peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2
                     peer-placeholder-shown:top-1/2
                     peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4
                     rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        >
          {label}
          {required && <span className="text-red-600 ml-1">*</span>}
        </label>
      </div>

      {/* Error Message */}
      {errors && errors.length > 0 && (
        <p className="mt-2 text-xs">
          <span className="font-medium text-red-600">{errors[0]}</span>
        </p>
      )}
    </>
  );
}
