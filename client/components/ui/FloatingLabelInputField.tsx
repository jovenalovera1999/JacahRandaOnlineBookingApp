"use client";

interface FloatingLabelInputFieldProps {
  label: string;
  type: "text" | "date" | "password";
  name: string;
  errors: string[];
}

export default function FloatingLabelInputField({
  label,
  type,
  name,
  errors,
}: FloatingLabelInputFieldProps) {
  return (
    <>
      <div className="relative">
        <input
          type={type}
          id={name}
          className="block px-2.5 pb-2.5 pt-4 w-full text-sm text-heading bg-transparent rounded-base border appearance-none focus:outline-none focus:ring-0 focus:border-brand peer"
          placeholder=" "
        />
        <label
          htmlFor={name}
          className="absolute text-sm text-body duration-300 transform -translate-y-4 scale-75 top-2 z-10 origin-left bg-neutral-primary px-2 peer-focus:px-2 peer-focus:text-fg-brand peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-2 peer-focus:scale-75 peer-focus:-translate-y-4 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto start-1"
        >
          {label}
        </label>
      </div>

      {/* Message error */}
      {errors && errors.length > 0 && (
        <p className="mt-2 text-xs">
          <span className="font-medium text-red-600">{errors[0]}</span>
        </p>
      )}
    </>
  );
}
