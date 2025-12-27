import Form from "@/components/ui/Form";
import { useAuth } from "@/context/AuthContext";
import { redirectToGoogleLogin } from "@/lib/auth";

export default function AuthButton() {
  const { user, loading, handleLogout } = useAuth();

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
      <li>
        <a
          href="/my_bookings"
          className={`block py-2 px-3 rounded md:border-0 md:p-0 transition-colors font-medium duration-300 focus:text-blue-600 text-gray-500 hover:text-blue-600 cursor-pointer`}
        >
          My Bookings
        </a>
      </li>
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
