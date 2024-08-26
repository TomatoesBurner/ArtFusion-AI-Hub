"use client";

import store from "@/store/store";
// import store from "@/store/store";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";

const BaseWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <SnackbarProvider /> {children}
    </Provider>
  );
};

export default BaseWrapper;
