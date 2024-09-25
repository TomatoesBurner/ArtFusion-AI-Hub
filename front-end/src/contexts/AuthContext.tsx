"use client";

import { AuthApi } from "@/api/authApi";
import { appApi } from "@/api/baseApi";
import { TokenDto } from "@/dtos/TokenDto";
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
  initialised: boolean;
  loggedIn: boolean;
  logout: () => void;
  login: (userTokensDto: UserTokensDto) => void;
  register: (userTokensDto: UserTokensDto) => void;
  oAuthLogin: (userTokensDto: UserTokensDto) => void;
};

const AuthContextInitialValue: TAuthContext = {
  initialised: false,
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

  const { loggedIn, initialised: initialised, refreshToken } = authData;

  // On app load
  useEffect(() => {
    appApi.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        if (error.response.status === 401) {
          const accessToken = localStorageHelper.getAccessToken();
          if (!authHelper.isTokenValid(accessToken)) {
            const refreshToken = localStorageHelper.getRefreshToken();
            if (!refreshToken || !accessToken) {
              logout();
            }
            if (!authHelper.isTokenValid(refreshToken)) {
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

    const localRefreshToken = localStorageHelper.getRefreshToken();
    const localAccessToken = localStorageHelper.getAccessToken();

    const tokens: UserTokensDto = {
      accessToken: {
        token: localAccessToken.token,
        expiresAt: new Date(localAccessToken.expiresAt).toISOString(),
      },
      refreshToken: {
        token: localRefreshToken.token,
        expiresAt: new Date(localRefreshToken.expiresAt).toISOString(),
      },
      userId: "",
    };

    dispatch(authSliceActions.setUserTokens(tokens));
    updateTokens(tokens);
    checkRefreshTokenAndNotify(tokens.refreshToken);
    dispatch(authSliceActions.setInitialised({ initialised: true }));
  }, []);

  useEffect(() => {
    if (initialised) {
      checkRefreshTokenAndNotify(refreshToken);
    }
  }, [initialised, refreshToken]);

  const logout = () => {
    dispatch(imageSliceActions.clearState({}));
    dispatch(videoSliceActions.clearState({}));
    dispatch(authSliceActions.clearState({}));
    localStorageHelper.setAccessToken(null);
    localStorageHelper.setRefreshToken(null);
    router.replace(APP_PATH.LOGIN);
  };

  const checkRefreshTokenAndNotify = (refreshToken: TokenDto | null) => {
    if (authHelper.isTokenValid(refreshToken)) {
      dispatch(authSliceActions.setLoggedIn({ loggedIn: true }));
    } else {
      dispatch(authSliceActions.setLoggedIn({ loggedIn: false }));
    }
  };

  const updateTokens = (userTokensDto: UserTokensDto) => {
    localStorageHelper.setAccessToken(userTokensDto.accessToken);
    localStorageHelper.setRefreshToken(userTokensDto.refreshToken);
    dispatch(authSliceActions.setUserTokens(userTokensDto));
  };

  const login = (userTokensDto: UserTokensDto) => {
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

  if (!initialised) {
    return <AppLoader />;
  }

  return (
    <AuthContext.Provider
      value={{
        initialised,
        loggedIn,
        logout,
        login: login,
        register,
        oAuthLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
