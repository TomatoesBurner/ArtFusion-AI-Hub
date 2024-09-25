"use client";

import useAuth from "@/hooks/useAuth";
import { APP_PATH } from "@/utils/constant";
import AppLoader from "@/views/Common/Loader/AppLoader";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const UnAuthGuardWrapper = ({ children }: { children: React.ReactNode }) => {
  const { initialised, loggedIn } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (initialised && loggedIn) {
      if (router) {
        router.push(APP_PATH.DASHBOARD);
      }
    }
  }, [initialised, loggedIn, router]);

  if (loggedIn) {
    return <AppLoader />;
  }

  return <>{children}</>;
};

export default UnAuthGuardWrapper;
