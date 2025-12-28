import Form from "@/components/ui/Form";
import { useAuth } from "@/context/AuthContext";
import { redirectToGoogleLogin } from "@/lib/auth";
import BookingService from "@/services/BookingService";
import { useCallback, useEffect, useState } from "react";

export default function AuthButton() {
  // Hooks
  const { user, loading, handleLogout } = useAuth();

  // States
  const [totalUnseenNotification, setTotalUnseenNotification] = useState(0);

  const handleGetTotalCountOfNotification = useCallback(async () => {
    try {
      const { status, data } =
        await BookingService.countUnreadNotificationsAndLoadCancelledBookings();

      if (status !== 200) {
        console.error(
          "Unexpected status error during get total count of notification at AuthButton.tsx: ",
          status
        );
        return;
      }

      setTotalUnseenNotification(data.totalUnseenNotification);
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

  useEffect(() => {
    handleGetTotalCountOfNotification();
  }, []);

  if (loading) return null;

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
      {userNavbarMenus.map((menu) => (
        <li key={menu.label}>
          <a
            href={menu.href}
            className="relative block py-2 px-3 rounded md:border-0 md:p-0 transition-colors font-medium duration-300 text-gray-500 hover:text-blue-600 cursor-pointer"
          >
            <span>{menu.label}</span>

            {menu.label === "Notifications" && totalUnseenNotification > 0 && (
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
                {totalUnseenNotification}
              </span>
            )}
          </a>
        </li>
      ))}
      <li>
        <div className="flex items-center gap-3">
          <span className="text-gray-800 font-medium">Hi, {user.name}!</span>
          <Form onSubmit={handleLogout}>
            <button
              type="button"
              onClick={handleLogout}
              className="text-red-500 hover:text-red-700 font-medium cursor-pointer"
            >
              {loading ? "Logging Out..." : "Logout"}
            </button>
          </Form>
        </div>
      </li>
    </>
  );
}
