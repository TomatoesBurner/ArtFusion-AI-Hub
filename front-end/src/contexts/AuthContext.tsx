"use client";

import { createContext } from "react";

export type TAuthContext = {
  loggedIn: boolean;
};

export const AuthContext = createContext<TAuthContext>({ loggedIn: false });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <AuthContext.Provider value={{ loggedIn: true }}>
      {children}
    </AuthContext.Provider>
  );
};
