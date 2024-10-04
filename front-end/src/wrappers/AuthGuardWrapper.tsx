import useAuth from "@/hooks/useAuth";
import { APP_PATH } from "@/utils/constant";
import AppLoader from "@/views/Common/Loader/AppLoader";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const AuthGuardWrapper = ({ children }: { children: React.ReactNode }) => {
  const { initialised, loggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (initialised && !loggedIn) {
      if (router) {
        router.push(APP_PATH.LOGIN);
      }
    }
  }, [initialised, loggedIn, router]);

  if (!initialised || !loggedIn) {
    return <AppLoader />;
  }

  return <>{children}</>;
};

export default AuthGuardWrapper;
