"use client";

import { ReactNode, useEffect, useRef, useState } from "react";
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

  const [direction, setDirection] = useState<"down" | "up">("down");
  const [render, setRender] = useState(false);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const handleToggleDropdown = () => {
    if (!wrapperRef.current) return;

    const rect = wrapperRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;
    const estimatedDropdownHeight = 160; // px

    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;

    spaceBelow < estimatedDropdownHeight && spaceAbove > spaceBelow
      ? setDirection("up")
      : setDirection("down");

    setOpenDropdownId(isOpen ? null : id);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (wrapperRef.current && !wrapperRef.current.contains(e.target as Node))
      setOpenDropdownId(null);
  };

  useEffect(() => {
    if (isOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen) {
      setRender(true);
    } else {
      const timeout = setTimeout(() => setRender(false), 150);
      return () => clearTimeout(timeout);
    }
  }, [isOpen]);

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
        {/* Dropdown content */}
        {render && (
          <div
            ref={dropdownRef}
            className={`absolute right-0 z-50 w-auto rounded-md bg-white shadow-md transition-opacity duration-200 ease-out ${
              direction === "down" ? "top-full mt-2" : "bottom-full mb-2"
            } ${isOpen ? "opacity-100" : "opacity-0"}`}
            onClick={() => setOpenDropdownId(null)}
          >
            <ul className="p-2 text-xs font-medium space-y-2">{children}</ul>
          </div>
        )}
      </div>
    </>
  );
}
