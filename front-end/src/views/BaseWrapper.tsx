"use client";

import store from "@/store/store";
// import store from "@/store/store";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import ThemeWrapper from "@/themes/ThemeWrapper";

const BaseWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <ThemeWrapper>
        <SnackbarProvider /> {children}
      </ThemeWrapper>
    </Provider>
  );
};

export default BaseWrapper;
