// "use client";

import DashBoardLayout from "@/layouts/DashBoardLayout/DashBoardLayout";
import AuthGuardWrapper from "@/wrappers/AuthGuardWrapper";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthGuardWrapper>
      <DashBoardLayout>{children}</DashBoardLayout>
    </AuthGuardWrapper>
  );
};

export default Layout;
