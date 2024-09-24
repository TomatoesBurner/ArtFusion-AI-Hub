import { BaseDto } from "./BaseDto";
import { TokenDto } from "./TokenDto";

export type UserTokensDto = BaseDto & {
  userId: string;
  accessToken: TokenDto;
  refreshToken: TokenDto;
};
