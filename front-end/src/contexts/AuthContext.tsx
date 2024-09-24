"use client";

import authSlice, { authSliceActions } from "@/store/slices/authSlice";
import { RootState } from "@/store/store";
import authHelper from "@/utils/authHelper";
import localStorageHelper from "@/utils/localStorageHelper";
import AppLoader from "@/views/Common/Loader/AppLoader";
import { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export type TAuthContext = {
  loggedIn: boolean;
};

export const AuthContext = createContext<TAuthContext>({ loggedIn: false });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loggedIn, setLoggedIn] = useState(false);
  const authData = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const { initalised, refreshToken } = authData;

  // On app load
  useEffect(() => {
    const localRefreshToken = localStorageHelper.getRefreshToken();

    if (authHelper.isTokenValid(localRefreshToken)) {
      setLoggedIn(true);
    }

    dispatch(authSliceActions.setInitialised({ initialised: true }));
  }, []);

  useEffect(() => {
    if (authHelper.isTokenValid(refreshToken)) {
      setLoggedIn(true);
    } else {
      setLoggedIn(false);
    }
  }, [refreshToken]);

  if (!initalised) {
    return <AppLoader />;
  }

  return (
    <AuthContext.Provider value={{ loggedIn }}>{children}</AuthContext.Provider>
  );
};
