"use client";

import store from "@/store/store";
// import store from "@/store/store";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import ThemeWrapper from "@/themes/ThemeWrapper";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "@/contexts/AuthContext";

const BaseWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
    >
      <Provider store={store}>
        <ThemeWrapper>
          <AuthProvider>
            <SnackbarProvider /> {children}
          </AuthProvider>
        </ThemeWrapper>
      </Provider>
    </GoogleOAuthProvider>
  );
};

export default BaseWrapper;
