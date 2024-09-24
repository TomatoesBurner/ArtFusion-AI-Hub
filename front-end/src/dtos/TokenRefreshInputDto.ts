import { BaseDto } from "./BaseDto";
import { TokenDto } from "./TokenDto";

export type TokenRefreshInputDto = BaseDto & {
  accessToken: TokenDto;
  refreshToken: TokenDto;
};
