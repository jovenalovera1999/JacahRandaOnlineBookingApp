"use client";

import { ReactNode, useEffect } from "react";
import { createPortal } from "react-dom";

interface ModalProps {
  title: string;
  isOpen: boolean;
  children: ReactNode;
  onClose: () => void;
}

export function Modal({ title, isOpen, children, onClose }: ModalProps) {
  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const modalContent = (
    <>
      <div className="fixed inset-0 z-50 animate-modal-in">
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/40" onClick={onClose} />
        {/* Viewport container */}
        <div className="relative flex h-full w-full items-center justify-center p-4">
          {/* Modal */}
          <div className="relative bg-white rounded-2xl shadow-md w-full max-w-2xl max-h-[90vh] flex flex-col z-50">
            {/* Header */}
            <div className="flex items-center justify-between border-b border-gray-100 p-6">
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

            {/* Scrollable body */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 custom-scrollbar">
              {children}
            </div>
          </div>
        </div>
      </div>
    </>
  );

  return createPortal(modalContent, document.body);
}
