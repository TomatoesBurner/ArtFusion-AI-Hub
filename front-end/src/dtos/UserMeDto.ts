import { BaseDto } from "./BaseDto";

export type UserMeDto = BaseDto & {
  userId: string;
  name: string;
  firstName: string;
  lastName: string;
  email: string;
  registerMethod: string;
  themeMode: string;
  joinedAt: string | Date;
  imagePromptSpaceId: string;
  videoPromptSpaceId: string;
};
