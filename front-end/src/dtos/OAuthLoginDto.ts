import { BaseDto } from "./BaseDto";

export type OAuthLoginDto = BaseDto & {
  googleAuthCode: string;
  provider: string;
};
