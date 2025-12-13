"use client";

import { useEffect, useState } from "react";

interface ToastMessageProps {
  status: "success" | "warning" | "failed" | "others";
  message: string;
  duration: number;
}

export default function ToastMessage({
  status,
  message,
  duration,
}: ToastMessageProps) {
  const STATUS_STYLE = {
    success: {
      container: "bg-green-50 border-green-300 text-green-800",
      iconBg: "bg-green-100 text-green-600",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 11.917 9.724 16.5 19 7.5"
          />
        </svg>
      ),
    },
    warning: {
      container: "bg-yellow-50 border-yellow-300 text-yellow-800",
      iconBg: "bg-yellow-100 text-yellow-600",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 13V8m0 8h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
        </svg>
      ),
    },
    failed: {
      container: "bg-red-50 border-red-300 text-red-800",
      iconBg: "bg-red-100 text-red-600",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      ),
    },
    others: {
      container: "bg-gray-100 border-gray-300 text-gray-800",
      iconBg: "bg-gray-200 text-gray-600",
      icon: (
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 13V8m0 8h.01"
          />
        </svg>
      ),
    },
  };

  const [isVisible, setIsVisible] = useState(true);

  const styles = STATUS_STYLE[status];

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(false), duration);
    return () => clearTimeout(timer);
  }, [duration]);

  if (!isVisible) return null;

  return (
    <>
      <div
        role="alert"
        className={`fixed bottom-6 right-6 z-50 flex items-center w-full max-w-sm p-4 rounded-md border shadow-md ${styles.container} animate-toast`}
      >
        <div
          className={`inline-flex items-center justify-center w-7 h-7 rounded-md ${styles.iconBg}`}
        >
          {styles.icon}
        </div>
        <div className="ml-3 text-sm font-medium">{message}</div>
        <button
          type="button"
          onClick={() => setIsVisible(false)}
          className="ml-auto flex items-center justify-center rounded-md w-8 h-8 hover:bg-black/10 transition cursor-pointer"
          aria-label="Close"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18 17.94 6M18 18 6.06 6"
            />
          </svg>
        </button>
      </div>
    </>
  );
}
