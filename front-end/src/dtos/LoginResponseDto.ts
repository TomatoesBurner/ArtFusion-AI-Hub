import { UserTokensDto } from "./UserTokensDto";

export type LoginResponseDto = {
  verifyId: string | null;
  expiresAt: Date;
} & UserTokensDto;
