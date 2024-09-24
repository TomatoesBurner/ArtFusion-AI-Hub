import useAuth from "@/hooks/useAuth";
import AppLoader from "@/views/Common/Loader/AppLoader";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const AuthGuardWrapper = ({ children }: { children: React.ReactNode }) => {
  const { loggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loggedIn) {
      router.push("/login");
    }
  }, [loggedIn]);

  if (!loggedIn) {
    return <AppLoader />;
  }

  return <>{children}</>;
};

export default AuthGuardWrapper;
