import { BaseDto } from "./BaseDto";

export type TokenRefreshInputDto = BaseDto & {
  accessToken: string;
  refreshToken: string;
};
