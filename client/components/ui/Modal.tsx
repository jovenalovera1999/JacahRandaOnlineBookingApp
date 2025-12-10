"use client";

import { ReactNode } from "react";

interface ModalProps {
  title: string;
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
}

export function Modal({ title, isOpen, children, onClose }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Modal */}
      <div className="relative bg-white rounded-md shadow-md w-full max-w-2xl p-6 z-50">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 pb-4">
          <h3 className="text-2xl font-semibold">{title}</h3>

          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 hover:bg-gray-100 cursor-pointer"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Body */}
        <div className="mt-4">{children}</div>
      </div>
    </div>
  );
}
