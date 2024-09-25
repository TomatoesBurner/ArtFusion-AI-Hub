"use client";

import { AuthApi } from "@/api/authApi";
import { appApi } from "@/api/baseApi";
import { UserTokensDto } from "@/dtos/UserTokensDto";
import { authSliceActions } from "@/store/slices/authSlice";
import { imageSliceActions } from "@/store/slices/imagesSlice";
import { videoSliceActions } from "@/store/slices/videosSlice";
import { RootState } from "@/store/store";
import authHelper from "@/utils/authHelper";
import { APP_PATH } from "@/utils/constant";
import localStorageHelper from "@/utils/localStorageHelper";
import AppLoader from "@/views/Common/Loader/AppLoader";
import { useRouter } from "next/navigation";
import { createContext, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export type TAuthContext = {
  loggedIn: boolean;
  logout: () => void;
  login: (userTokensDto: UserTokensDto) => void;
  register: (userTokensDto: UserTokensDto) => void;
  oAuthLogin: (userTokensDto: UserTokensDto) => void;
};

const AuthContextInitialValue: TAuthContext = {
  loggedIn: false,
  logout: () => {},
  login: () => {},
  register: () => {},
  oAuthLogin: () => {},
};

export const AuthContext = createContext<TAuthContext>(AuthContextInitialValue);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const router = useRouter();
  const authData = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const { loggedIn, initialised: initalised, refreshToken } = authData;

  // On app load
  useEffect(() => {
    const localRefreshToken = localStorageHelper.getRefreshToken();

    appApi.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        if (error.response.status === 401) {
          const accessToken = localStorageHelper.getAccessToken();
          if (!accessToken || accessToken.expiresAt < new Date()) {
            const refreshToken = localStorageHelper.getRefreshToken();
            if (!refreshToken || !accessToken) {
              logout();
            }
            if (refreshToken.expiresAt < new Date()) {
              logout();
              return Promise.reject(error);
            } else {
              const response = await AuthApi.tokenRefresh({
                accessToken: accessToken.token,
                refreshToken: refreshToken.token,
              });
              tokenRefresh(response.data);
              return appApi.request(error.config);
            }
          }
        }
        return Promise.reject(error);
      }
    );

    if (authHelper.isTokenValid(localRefreshToken)) {
      dispatch(authSliceActions.setLoggedIn({ loggedIn: true }));
    }

    dispatch(authSliceActions.setInitialised({ initialised: true }));
  }, []);

  useEffect(() => {
    if (authHelper.isTokenValid(refreshToken)) {
      dispatch(authSliceActions.setLoggedIn({ loggedIn: true }));
    } else {
      dispatch(authSliceActions.setLoggedIn({ loggedIn: false }));
    }
  }, [refreshToken]);

  const logout = () => {
    dispatch(imageSliceActions.clearState({}));
    dispatch(videoSliceActions.clearState({}));
    dispatch(authSliceActions.clearState({}));
    localStorageHelper.setAccessToken(null);
    localStorageHelper.setRefreshToken(null);
    router.replace(APP_PATH.LOGIN);
  };

  const updateTokens = (userTokensDto: UserTokensDto) => {
    localStorageHelper.setAccessToken(userTokensDto.accessToken);
    localStorageHelper.setRefreshToken(userTokensDto.refreshToken);
    dispatch(authSliceActions.setUserTokens(userTokensDto));
  };

  const logIn = (userTokensDto: UserTokensDto) => {
    updateTokens(userTokensDto);
  };

  const register = (userTokensDto: UserTokensDto) => {
    updateTokens(userTokensDto);
  };

  const oAuthLogin = (userTokensDto: UserTokensDto) => {
    updateTokens(userTokensDto);
  };

  const tokenRefresh = (userTokensDto: UserTokensDto) => {
    updateTokens(userTokensDto);
  };

  if (!initalised) {
    return <AppLoader />;
  }

  return (
    <AuthContext.Provider
      value={{ loggedIn, logout, login: logIn, register, oAuthLogin }}
    >
      {children}
    </AuthContext.Provider>
  );
};
