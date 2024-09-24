import { TokenDto } from "@/dtos/TokenDto";

const isTokenValid = (token: TokenDto | null) => {
  return token && new Date(token.expiresAt) > new Date();
};

export default {
  isTokenValid,
};
