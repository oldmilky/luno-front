import { useRouter } from "next/router";
import { useAuth } from "./useAuth";
import { redirect } from "next/navigation";
import { useEffect } from "react";

export const useAuthRedirect = () => {
  const { user } = useAuth();

  const router = useRouter();

  const redirecting = String(redirect) || "/";

  useEffect(() => {
    if (user) router.push("/");
  }, [user, router, redirecting]);
};
