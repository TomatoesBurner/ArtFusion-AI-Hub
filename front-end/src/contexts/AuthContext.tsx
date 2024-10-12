"use client";

import { AuthApi } from "@/api/authApi";
import { appApi } from "@/api/baseApi";
import { UserApi } from "@/api/userApi";
import { TokenDto } from "@/dtos/TokenDto";
import { UserTokensDto } from "@/dtos/UserTokensDto";
import { authSliceActions, TAuthUser } from "@/store/slices/authSlice";
import { imageSliceActions } from "@/store/slices/imagesSlice";
import { videoSliceActions } from "@/store/slices/videosSlice";
import { userSliceActions } from "@/store/slices/userSlice";
import { RootState } from "@/store/store";
import authHelper from "@/utils/authHelper";
import { API_RESPONSE_CODE, APP_PATH } from "@/utils/constant";
import localStorageHelper from "@/utils/localStorageHelper";
import AppLoader from "@/views/Common/Loader/AppLoader";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ApiResponseDto } from "@/dtos/ApiResponseDto";

export type TAuthContext = {
  user: TAuthUser | null;
  initialised: boolean;
  loggedIn: boolean;
  logout: () => void;
  login: (userTokensDto: UserTokensDto) => void;
  register: (userTokensDto: UserTokensDto) => void;
  oAuthLogin: (userTokensDto: UserTokensDto) => void;
};

const AuthContextInitialValue: TAuthContext = {
  user: null,
  initialised: false,
  loggedIn: false,
  logout: () => {},
  login: () => {},
  register: () => {},
  oAuthLogin: () => {},
};

export const AuthContext = createContext<TAuthContext>(AuthContextInitialValue);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [initMe, setInitMe] = useState(false);

  const router = useRouter();
  const authData = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();

  const { user, loggedIn, initialised: initialised, refreshToken } = authData;

  const { isLoading: getMeLoading, refetch: getMeRefetch } = useQuery({
    queryKey: ["getMe"],
    queryFn: UserApi.getMe,
    enabled: false,
    retry: false,
  });

  const userId = user?.userId ?? "";

  // On app load
  useEffect(() => {
    appApi.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const response = error.response.data as ApiResponseDto;

        if (response.code == API_RESPONSE_CODE.invalidRefreshToken) {
          logout();
        } else if (
          response.code === API_RESPONSE_CODE.accessTokenExpired ||
          response.code === API_RESPONSE_CODE.invalidAccessToken
        ) {
          const accessToken = localStorageHelper.getAccessToken();
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

    if (checkRefreshTokenAndNotify(tokens.refreshToken)) {
      dispatch(authSliceActions.setUserTokens(tokens));
    }

    dispatch(authSliceActions.setInitialised({ initialised: true }));
  }, []);

  useEffect(() => {
    if (initialised) {
      checkRefreshTokenAndNotify(refreshToken);
    }
  }, [initialised, refreshToken]);

  useEffect(() => {
    if (initialised && userId && loggedIn) {
      getMe();
    }
  }, [userId, loggedIn, initialised]);

  const logout = () => {
    dispatch(imageSliceActions.clearState());
    dispatch(videoSliceActions.clearState({}));
    dispatch(authSliceActions.clearAuthState({}));
    dispatch(userSliceActions.clearState({}));
    localStorageHelper.setAccessToken(null);
    localStorageHelper.setRefreshToken(null);
    router.replace(APP_PATH.LOGIN);
  };

  const checkRefreshTokenAndNotify = (
    refreshToken: TokenDto | null
  ): boolean => {
    const isvalid = authHelper.isTokenValid(refreshToken);
    if (isvalid) {
      dispatch(authSliceActions.setLoggedIn({ loggedIn: true }));
    } else {
      dispatch(authSliceActions.setLoggedIn({ loggedIn: false }));
    }
    return isvalid;
  };

  const getMe = () => {
    getMeRefetch().then(
      (response) => {
        const user = response.data?.data;
        if (user == undefined) {
          return;
        }

        setInitMe(true);

        dispatch(userSliceActions.setUser({ user: user }));
      },
      (error) => {
        console.log(error);
      }
    );
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

  const anyLoading = getMeLoading;

  if (!initialised || anyLoading || (loggedIn && !initMe)) {
    return <AppLoader />;
  }

  return (
    <AuthContext.Provider
      value={{
        user,
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
