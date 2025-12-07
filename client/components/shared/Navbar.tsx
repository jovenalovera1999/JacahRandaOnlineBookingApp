"use client";

import Image from "next/image";
import CompanyLogo from "@/public/img/ui/CompanyLogo.png";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isNavbarOpen, setIsNavbarOpen] = useState(false);
  const [isItemSelected, setIsItemSelected] = useState<string | null>(null);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const navbarRef = useRef<HTMLDivElement>(null);

  const pathname = usePathname();

  const navItems = [
    { label: "About", href: "#" },
    { label: "Services", href: "#" },
    { label: "Contact", href: "#" },
    {
      label: "Rooms",
      dropdown: [
        { label: "Deluxe", href: "#" },
        { label: "My downloads", href: "#" },
        { label: "Billing", href: "#" },
        { label: "Rewards", href: "#" },
      ],
    },
    { label: "Book a Room", href: "#" },
  ];

  // Navbar control in small or mobile screen
  const toggleNavbar = () => {
    setIsNavbarOpen((prev) => !prev);
    setOpenDropdown(null);
  };

  // Active control
  const toggleActive = (label: string) => {
    setIsItemSelected(isItemSelected === label ? null : label);
  };

  // Dropdown control
  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  // Handler to close dropdown when clicked anywhere
  const handler = (e: MouseEvent) => {
    if (navbarRef.current && !navbarRef.current.contains(e.target as Node)) {
      setIsNavbarOpen(false);
      setOpenDropdown(null);
    }
  };

  useEffect(() => {
    if (!pathname) return;

    const matchedItem = navItems.find((item) => {
      if (item.href && item.href !== "#") return item.href === pathname;

      if (item.dropdown)
        return item.dropdown.some((sub) => sub.href === pathname);

      return false;
    });

    if (matchedItem) setIsItemSelected(matchedItem.label);
  }, [pathname]);

  useEffect(() => {
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <>
      <nav
        className={`fixed w-full z-20 top-0 start-0 border-b border-gray-100 bg-white shadow-md`}
      >
        <div
          className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4"
          ref={navbarRef}
        >
          <a
            href="#"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <Image src={CompanyLogo} alt="Jacah-Randa" width={60} height={60} />
            <span className="self-center text-xl font-semibold whitespace-nowrap text-blue-600">
              Jacah-Randa
            </span>
          </a>
          <button
            type="button"
            onClick={toggleNavbar}
            data-collapse-toggle="navbar-multi-level-dropdown"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-body md:hidden focus:ring-1 focus:ring-blue-600 focus:bg-blue-100 rounded-md"
            aria-controls="navbar-multi-level-dropdown"
            aria-expanded="false"
          >
            <span className="sr-only">Open main menu</span>
            <svg
              className="w-6 h-6"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeWidth="2"
                d="M5 7h14M5 12h14M5 17h14"
              />
            </svg>
          </button>
          <div
            className={`${
              isNavbarOpen ? "block" : "hidden"
            } w-full md:block md:w-auto`}
            id="navbar-multi-level-dropdown"
          >
            <ul className="flex flex-col font-medium p-4 md:p-0 mt-4 rounded-base bg-neutral-secondary-soft md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0 md:bg-neutral-primary">
              {navItems.map((item) =>
                !item.dropdown ? (
                  <li key={item.label} onClick={() => toggleActive(item.label)}>
                    <a
                      href={item.href}
                      className={`block py-2 px-3 rounded md:border-0 md:p-0 transition-colors font-medium duration-300 ${
                        isItemSelected === item.label
                          ? "focus:text-blue-600"
                          : ""
                      } text-gray-500 hover:text-blue-600 cursor-pointer`}
                    >
                      {item.label}
                    </a>
                  </li>
                ) : (
                  <li key={item.label}>
                    <button
                      type="button"
                      onClick={() => toggleDropdown(item.label)}
                      className={`flex items-center justify-between w-full py-2 px-3 rounded font-medium ${
                        openDropdown === item.label ? "focus:text-blue-600" : ""
                      } text-gray-500 hover:text-blue-600 md:w-auto md:border-0 md:p-0 cursor-pointer`}
                    >
                      {item.label}
                      <svg
                        className={`w-4 h-4 ms-1.5 transition-transform duration-300 ${
                          openDropdown === item.label
                            ? "-rotate-180"
                            : "rotate-0"
                        }`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m19 9-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {/* Dropdown menu items */}
                    {openDropdown === item.label && (
                      <div className="absolute mt-2 w-40 bg-white rounded-md shadow-md p-2">
                        {item.dropdown.map((subItem) => (
                          <a
                            href={subItem.href}
                            className="block px-2 py-1 text-gray-500 hover:bg-blue-100 hover:text-blue-600 rounded-md transition-colors duration-300"
                            key={subItem.label}
                          >
                            {subItem.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </li>
                )
              )}
              <button
                type="button"
                className="block py-2 px-3 rounded md:border-0 md:p-0 transition-colors font-medium duration-300 text-gray-500 hover:text-blue-600 cursor-pointer"
              >
                Login
              </button>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}
