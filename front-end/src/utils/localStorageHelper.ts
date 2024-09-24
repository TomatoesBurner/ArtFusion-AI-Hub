import { localStorageKey } from "./constant";
import { TokenDto } from "@/dtos/TokenDto";

const get = (key: string) => {
  return localStorage.getItem(key);
};

const set = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

const getAccessToken = (): TokenDto => {
  const accessToken = get(localStorageKey.accessToken);
  const accessTokenExpiresAt = get(localStorageKey.accessTokenExpiresAt) || "0";

  return {
    token: accessToken || "",
    expiresAt: new Date(accessTokenExpiresAt),
  };
};

const setAccessToken = (token: TokenDto | null) => {
  if (!token) {
    localStorage.removeItem(localStorageKey.accessToken);
    localStorage.removeItem(localStorageKey.accessTokenExpiresAt);
    return;
  }

  const { token: accessToken, expiresAt: accessTokenExpiresAt } = token;
  set(localStorageKey.accessToken, accessToken);
  set(localStorageKey.accessTokenExpiresAt, accessTokenExpiresAt.toUTCString());
};

const getRefreshToken = (): TokenDto => {
  const refreshToken = get(localStorageKey.refreshToken);
  const refreshTokenExpiresAt =
    get(localStorageKey.refreshTokenExpiresAt) || "0";

  return {
    token: refreshToken || "",
    expiresAt: new Date(refreshTokenExpiresAt),
  };
};

const setRefreshToken = (token: TokenDto | null) => {
  if (!token) {
    localStorage.removeItem(localStorageKey.refreshToken);
    localStorage.removeItem(localStorageKey.refreshTokenExpiresAt);
    return;
  }

  const { token: refreshToken, expiresAt: refreshTokenExpiresAt } = token;
  set(localStorageKey.refreshToken, refreshToken);
  set(
    localStorageKey.refreshTokenExpiresAt,
    refreshTokenExpiresAt.toUTCString()
  );
};

const localStorageHelper = {
  get,
  set,
  getAccessToken,
  setAccessToken,
  getRefreshToken,
  setRefreshToken,
};

export default localStorageHelper;
