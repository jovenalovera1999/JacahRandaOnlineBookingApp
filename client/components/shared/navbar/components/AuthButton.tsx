"use client";

import { useGoogleAuth } from "@/context/GoogleAuthContext";
import { redirectToGoogleLogin } from "@/lib/auth";
import NotificationService from "@/services/NotificationService";
import { useCallback, useEffect, useState } from "react";

interface AuthButtonProps {
  reloadCountNotifications: boolean;
}

export default function AuthButton({
  reloadCountNotifications,
}: AuthButtonProps) {
  // Hooks
  const { user, loading, handleLogout } = useGoogleAuth();

  // States
  const [totalUnreadNotifications, setTotalUnreadNotifications] = useState(0);

  const handleGetTotalUnreadNotifications = useCallback(async () => {
    try {
      const { status, data } =
        await NotificationService.countUnreadNotifications();

      if (status !== 200) {
        console.error(
          "Unexpected status error during get total count of notification at AuthButton.tsx: ",
          status
        );
        return;
      }

      setTotalUnreadNotifications(data.totalUnreadNotifications);
    } catch (error) {
      console.error(
        "Unexpected server error during get total count of notification at AuthButton.tsx: ",
        error
      );
    }
  }, []);

  const userNavbarMenus = [
    {
      label: "My Bookings",
      href: "/my_bookings",
    },
    {
      label: "Notifications",
      href: "/notifications",
    },
  ];

  const hasOccupiedRoom =
    user?.bookings?.[0]?.room.room_status.room_status === "Occupied";

  useEffect(() => {
    handleGetTotalUnreadNotifications();
  }, [reloadCountNotifications, handleGetTotalUnreadNotifications]);

  if (!user) {
    return (
      <>
        <li>
          <button
            type="button"
            className="block py-2 px-3 rounded md:border-0 md:p-0 transition-colors font-medium duration-300 text-gray-500 hover:text-blue-600 cursor-pointer"
            onClick={redirectToGoogleLogin}
          >
            {loading ? "Logging In..." : "Login"}
          </button>
        </li>
      </>
    );
  }

  return (
    <>
      {hasOccupiedRoom && (
        <li>
          <a
            href="#"
            className="relative block py-2 px-3 rounded md:border-0 md:p-0 transition-colors font-medium duration-300 text-gray-500 hover:text-blue-600 cursor-pointer"
          >
            <span>Order a Food</span>
          </a>
        </li>
      )}

      {userNavbarMenus.map((menu) => (
        <li key={menu.label}>
          <a
            href={menu.href}
            className="relative block py-2 px-3 rounded md:border-0 md:p-0 transition-colors font-medium duration-300 text-gray-500 hover:text-blue-600 cursor-pointer"
          >
            <span>{menu.label}</span>

            {menu.label === "Notifications" && totalUnreadNotifications > 0 && (
              <span
                className="
                absolute -top-1 -right-3 
                inline-flex items-center justify-center 
                text-xs font-semibold 
                bg-red-600 text-white 
                rounded-full 
                min-w-[18px] h-[18px] px-1
              "
              >
                {totalUnreadNotifications}
              </span>
            )}
          </a>
        </li>
      ))}
      <li>
        <div className="flex items-center gap-3">
          <span className="text-gray-800 font-medium">Hi, {user.name}!</span>
          <button
            type="button"
            onClick={handleLogout}
            className="text-red-500 hover:text-red-700 font-medium cursor-pointer"
          >
            {loading ? "Logging Out..." : "Logout"}
          </button>
        </div>
      </li>
    </>
  );
}
