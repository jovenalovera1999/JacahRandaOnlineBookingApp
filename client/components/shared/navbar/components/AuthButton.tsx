import Form from "@/components/ui/Form";
import { useAuth } from "@/context/AuthContext";
import { redirectToGoogleLogin } from "@/lib/auth";

export default function AuthButton() {
  const { user, loading, handleLogout } = useAuth();

  if (loading) return null;

  if (!user) {
    return (
      <>
        <button
          type="button"
          className="block py-2 px-3 rounded md:border-0 md:p-0 transition-colors font-medium duration-300 text-gray-500 hover:text-blue-600 cursor-pointer"
          onClick={redirectToGoogleLogin}
        >
          Login
        </button>
      </>
    );
  }

  return (
    <>
      <div className="flex items-center gap-3">
        <span className="text-gray-700 font-medium">Hi, {user.username}</span>
        <Form>
          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-700 font-medium"
          >
            Logout
          </button>
        </Form>
      </div>
    </>
  );
}
