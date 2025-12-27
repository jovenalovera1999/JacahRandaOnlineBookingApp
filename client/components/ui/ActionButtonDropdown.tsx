"use client";

import { createPortal } from "react-dom";
import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import Button from "./Button";

interface ActionButtonDropdownProps {
  id: string | number;
  openDropdownId: string | number | null;
  setOpenDropdownId: (id: string | number | null) => void;
  children: ReactNode;
}

export default function ActionButtonDropdown({
  id,
  openDropdownId,
  setOpenDropdownId,
  children,
}: ActionButtonDropdownProps) {
  const isOpen = openDropdownId === id;

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const [direction, setDirection] = useState<"down" | "up">("down");
  const [coords, setCoords] = useState<{ top: number; left: number }>({
    top: 0,
    left: 0,
  });

  const estimatedDropdownHeight = 160;

  const computePosition = useCallback(() => {
    if (!wrapperRef.current) return;

    const rect = wrapperRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;

    const newDirection =
      spaceBelow < estimatedDropdownHeight && spaceAbove > spaceBelow
        ? "up"
        : "down";

    setDirection(newDirection);

    setCoords({
      top: newDirection === "down" ? rect.bottom + 8 : rect.top - 105,
      left: rect.right - 140,
    });
  }, []);

  const handleToggleDropdown = () => {
    if (isOpen) {
      setOpenDropdownId(null);
      return;
    }

    computePosition();
    setOpenDropdownId(id);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (
      wrapperRef.current &&
      !wrapperRef.current.contains(e.target as Node) &&
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setOpenDropdownId(null);
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    document.addEventListener("mousedown", handleClickOutside);
    window.addEventListener("scroll", computePosition, true);
    window.addEventListener("resize", computePosition);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      window.removeEventListener("scroll", computePosition, true);
      window.removeEventListener("resize", computePosition);
    };
  }, [isOpen, computePosition]);

  return (
    <>
      <div ref={wrapperRef} className="relative inline-block text-left">
        <Button
          tag="button"
          type="button"
          onClick={handleToggleDropdown}
          className="inline-flex items-center justify-center rounded-md bg-white text-gray-800 shadow-md px-3 py-2 text-sm font-medium hover:bg-gray-100 focus:outline-none focus:ring-0"
        >
          <svg
            className="w-4 h-4"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="3"
              d="M6 12h.01m6 0h.01m5.99 0h.01"
            />
          </svg>
        </Button>
      </div>

      {isOpen &&
        typeof window !== "undefined" &&
        createPortal(
          <div
            ref={dropdownRef}
            style={{
              position: "fixed",
              top: coords.top,
              left: coords.left,
              zIndex: 40,
            }}
            className="rounded-md bg-white shadow-md"
          >
            <ul className="flex flex-col p-2 text-xs font-medium gap-2 w-auto">
              {children}
            </ul>
          </div>,
          document.body
        )}
    </>
  );
}
