"use client";

import store from "@/store/store";
// import store from "@/store/store";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";
import { SnackbarProvider } from "notistack";
import ThemeWrapper from "@/themes/ThemeWrapper";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { AuthProvider } from "@/contexts/AuthContext";
import { CssBaseline } from "@mui/material";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

const BaseWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <GoogleOAuthProvider
      clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || ""}
    >
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ThemeWrapper>
            <CssBaseline />
            <AuthProvider>
              <SnackbarProvider
                autoHideDuration={3000}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
              />{" "}
              {children}
            </AuthProvider>
          </ThemeWrapper>
        </QueryClientProvider>
      </Provider>
    </GoogleOAuthProvider>
  );
};

export default BaseWrapper;
