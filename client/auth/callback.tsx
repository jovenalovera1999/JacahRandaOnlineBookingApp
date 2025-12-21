import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const { token, redirect } = router.query;

    if (token) {
      // Save token in cookie if not using HttpOnly
      Cookies.set("access_token", token as string);

      // Redirect to original page
      const redirectTo = redirect ? (redirect as string) : "/";
      router.replace(redirectTo);
    } else {
      // No token, redirect to main page
      router.replace("/");
    }
  }, [router]);

  return <div>Logging you in...</div>;
}
