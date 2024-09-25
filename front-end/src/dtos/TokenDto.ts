import { BaseDto } from "./BaseDto";

export type TokenDto = BaseDto & {
  token: string;
  expiresAt: Date | string;
};
