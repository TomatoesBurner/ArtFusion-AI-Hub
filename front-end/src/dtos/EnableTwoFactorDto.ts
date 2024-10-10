export type EnableTwoFactorDto = {
  verifyId: string;
  secret: string;
  totpAuthUrl: string;
  expiresAt: Date;
};
