import { UserTokensDto } from "./UserTokensDto";

export type LoginResponseDto = {
  verifyId: number | null;
} & UserTokensDto;
