"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useRef, useState } from "react";
import CompanyLogo from "@/public/img/ui/CompanyLogo.png";
import { useAuth } from "@/context/AuthContext";

interface SidebarProps {
  children: ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  const pathname = usePathname();
  const { user, isLoading, handleLogout } = useAuth();

  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserSubMenuOpen, setIsUserSubMenuOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const sidebarItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Room Management", href: "/room_management" },
    { label: "Booked Management", href: "booked_management" },
    { label: "User Management", href: "/user_management" },
    {
      label: "Report Management",
      subMenu: [
        { label: "General", href: "#" },
        { label: "Requested", href: "#" },
        { label: "Printed", href: "#" },
      ],
    },
  ];

  const toggleSidebar = () => setIsSidebarOpen((prev) => !prev);

  const toggleUserSubMenu = () => setIsUserSubMenuOpen((prev) => !prev);

  const toggleSubMenu = (label: string) =>
    setOpenMenu(openMenu === label ? null : label);

  const isActive = (href: string) => pathname === href;

  const isSubMenuActive = (subMenu: { href: string }[]) =>
    subMenu.some((sub) => pathname === sub.href);

  const handleClickOutside = (e: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(e.target as Node)
    ) {
      setIsUserSubMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {/* Header */}
      <nav className="fixed top-0 z-50 w-full bg-white border-b border-gray-100 shadow-md">
        <div className="px-3 py-3 lg:px-5 lg:pl-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center justify-start rtl:justify-end">
              <button
                data-drawer-target="top-bar-sidebar"
                data-drawer-toggle="top-bar-sidebar"
                aria-controls="top-bar-sidebar"
                type="button"
                className="sm:hidden text-heading bg-transparent box-border border border-transparent hover:bg-gray-100 focus:ring-0 font-medium leading-5 rounded-md text-sm p-2 focus:outline-none"
                onClick={toggleSidebar}
              >
                <span className="sr-only">Open sidebar</span>
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
                    d="M5 7h14M5 12h14M5 17h10"
                  />
                </svg>
              </button>
              <a href="https://flowbite.com" className="flex ms-2 md:me-24">
                <span className="flex gap-2 self-center items-center justify-center text-lg font-semibold whitespace-nowrap text-gray-800">
                  <Image
                    src={CompanyLogo}
                    alt="Jacah-Randa"
                    width={50}
                    height={50}
                  />
                  Jacah-Randa
                </span>
              </a>
            </div>
            <div className="relative ms-3" ref={dropdownRef}>
              <button
                type="button"
                onClick={toggleUserSubMenu}
                className="flex items-center text-sm bg-transparent rounded-md focus:ring-0 cursor-pointer"
                aria-expanded={isUserSubMenuOpen}
              >
                <span className="sr-only">Open user menu</span>
                {user?.name ?? "No Name"}
                <svg
                  className={`w-4 h-4 ms-1 transition-transform duration-300 ${
                    isUserSubMenuOpen ? "-rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              {isUserSubMenuOpen && (
                <div className="absolute right-0 mt-2 w-44 bg-white rounded-md shadow-md z-50">
                  <ul
                    className="p-2 text-sm text-gray-800 font-medium"
                    role="menu"
                  >
                    <li>
                      <button
                        onClick={handleLogout}
                        className="w-full text-left p-2 rounded hover:bg-red-100 hover:text-red-600 transition-colors cursor-pointer"
                        role="menuitem"
                      >
                        {isLoading ? "Logging Out..." : "Logout"}
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        id="top-bar-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-full transition-transform transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } sm:translate-x-0`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-white border-e border-gray-100 shadow-md">
          <a
            href="https://flowbite.com/"
            className="flex items-center ps-2.5 mb-5"
          >
            <Image src={CompanyLogo} alt="Jacah-Randa" width={50} height={50} />
            <span className="self-center text-lg text-heading font-semibold whitespace-nowrap">
              Jacah-Randa
            </span>
          </a>
          <ul className="space-y-2">
            {sidebarItems.map((item) =>
              !item.subMenu ? (
                // Without submenu
                <li key={item.label}>
                  <a
                    href={item.href}
                    className={`inline-flex items-center w-full p-2 hover:bg-blue-100 hover:text-blue-600 font-medium text-sm cursor-pointer transition-colors duration-200 rounded-md ${
                      isActive(item.href)
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-800 rounded-md"
                    }`}
                    role="menuitem"
                  >
                    {item.label}
                  </a>
                </li>
              ) : (
                // With submenu
                <li key={item.label}>
                  <button
                    type="button"
                    onClick={() => toggleSubMenu(item.label)}
                    className={`inline-flex items-center w-full p-2 rounded-md hover:bg-blue-100 hover:text-blue-600 font-medium text-sm cursor-pointer transition-colors duration-200 ${
                      isSubMenuActive(item.subMenu)
                        ? "bg-blue-100 text-blue-600"
                        : "text-gray-800"
                    }`}
                    role="menuitem"
                  >
                    {item.label}
                    <svg
                      className={`w-4 h-4 ms-1.5 transition-transform duration-300 ${
                        openMenu === item.label || isSubMenuActive(item.subMenu)
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
                  <ul
                    className={`pl-4 mt-1 space-y-1 transition-all duration-200 overflow-hidden ${
                      openMenu === item.label || isSubMenuActive(item.subMenu)
                        ? "max-h-96"
                        : "max-h-0"
                    }`}
                  >
                    {item.subMenu.map((subItem) => (
                      <li key={subItem.label}>
                        <a
                          href={subItem.href}
                          className={`block px-3 py-1.5 rounded-md text-sm transition hover:bg-blue-100 hover:text-blue-600 ${
                            isActive(subItem.href)
                              ? "bg-blue-100 text-blue-600"
                              : "text-gray-800"
                          }`}
                        >
                          {subItem.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </li>
              )
            )}
          </ul>
        </div>
      </aside>

      {/* Content body here */}
      <div className="p-4 sm:ml-64 mt-20">{children}</div>
    </>
  );
}
