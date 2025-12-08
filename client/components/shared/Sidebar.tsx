"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { ReactNode, useState } from "react";
import CompanyLogo from "@/public/img/ui/CompanyLogo.png";

interface SidebarProps {
  children: ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  const pathname = usePathname();
  const [openMenu, setOpenMenu] = useState<string | null>(null);

  const sidebarItems = [
    { label: "Dashboard", href: "/dashboard" },
    { label: "Room Management", href: "/room_management" },
    { label: "User Management", href: "#" },
    {
      label: "Report Management",
      subMenu: [
        { label: "General", href: "#" },
        { label: "Requested", href: "#" },
        { label: "Printed", href: "#" },
      ],
    },
  ];

  const toggleSubMenu = (label: string) =>
    setOpenMenu(openMenu === label ? null : label);

  const isActive = (href: string) => pathname === href;

  const isSubMenuActive = (subMenu: { href: string }[]) =>
    subMenu.some((sub) => pathname === sub.href);

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
                className="sm:hidden text-heading bg-transparent box-border border border-transparent hover:bg-neutral-secondary-medium focus:ring-4 focus:ring-neutral-tertiary font-medium leading-5 rounded-base text-sm p-2 focus:outline-none"
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
            <div className="flex items-center">
              <div className="flex items-center ms-3">
                <div>
                  <button
                    type="button"
                    className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300"
                    aria-expanded="false"
                    data-dropdown-toggle="dropdown-user"
                  >
                    <span className="sr-only">Open user menu</span>
                    {/* <Image
                      className="w-8 h-8 rounded-full"
                      src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
                      alt="user photo"
                      width={50}
                      height={50}
                    /> */}
                    User profile
                  </button>
                </div>
                <div
                  className="z-50 hidden bg-neutral-primary-medium border rounded-md shadow-md w-44"
                  id="dropdown-user"
                >
                  <div
                    className="px-4 py-3 border-b border-default-medium"
                    role="none"
                  >
                    <p className="text-sm font-medium text-heading" role="none">
                      Juan Dela Cruz
                    </p>
                    <p className="text-sm text-body truncate" role="none">
                      juan.delacruz@sample.com
                    </p>
                  </div>
                  {/* User submenu item */}
                  <ul className="p-2 text-sm text-body font-medium" role="none">
                    <li>
                      <a
                        href="#"
                        className="inline-flex items-center w-full p-2 hover:bg-neutral-tertiary-medium hover:text-heading rounded"
                        role="menuitem"
                      >
                        Sign out
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar */}
      <aside
        id="top-bar-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-full transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar"
      >
        <div className="h-full px-3 py-4 overflow-y-auto bg-neutral-primary-soft border-e border-gray-100 shadow-md">
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
                    className={`pl-4 mt-1 space-y-1 transition-all duration-300 overflow-hidden ${
                      openMenu === item.label || isSubMenuActive(item.subMenu)
                        ? "max-h-96 opacity-100"
                        : "max-h-0 opacity-0"
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
