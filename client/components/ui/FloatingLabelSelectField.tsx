import { ChangeEvent, ReactNode } from "react";

interface FloatingLabelSelectFieldProps {
  label: string;
  name: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  autoFocus?: boolean;
  disabled?: boolean;
  errors?: string[];
  children: ReactNode;
}

export default function FloatingLabelSelectField({
  label,
  name,
  value,
  onChange,
  required,
  autoFocus,
  disabled,
  errors,
  children,
}: FloatingLabelSelectFieldProps) {
  return (
    <>
      <div className="relative">
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-gray-800 bg-white rounded-lg border border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer cursor-pointer"
          autoFocus={autoFocus}
          disabled={disabled}
        >
          {children}
        </select>
        {errors && errors.length > 0 && (
          <span className="text-red-600">{errors[0]}</span>
        )}
        <label
          htmlFor={name}
          className="absolute text-sm text-gray-500 duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-left bg-white px-2 peer-focus:px-2 peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 start-1"
        >
          {label}
          {required && <span className="text-red-600 ml-1">*</span>}
        </label>
      </div>
    </>
  );
}
