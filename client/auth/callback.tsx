import { useRouter } from "next/router";
import { useEffect } from "react";
import Cookies from "js-cookie";

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const redirectTo = (router.query.redirect as string) || "/";
    router.replace(redirectTo);
  }, [router]);

  return <div>Logging you in...</div>;
}
