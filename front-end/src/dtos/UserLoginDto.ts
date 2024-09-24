import { BaseDto } from "./BaseDto";

export type UserLoginDto = BaseDto & {
  email: string;
  password: string;
};
