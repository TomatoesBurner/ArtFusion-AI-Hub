import HomeLayout from "@/layouts/HomeLayout/HomeLayout";
import UnAuthGuardWrapper from "@/wrappers/UnAuthGuardWrapper";
import React from "react";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <UnAuthGuardWrapper>
      <HomeLayout>{children}</HomeLayout>
    </UnAuthGuardWrapper>
  );
};

export default Layout;
