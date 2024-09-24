import { BaseDto } from "./BaseDto";

export type UserRegisterDto = BaseDto & {
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};
