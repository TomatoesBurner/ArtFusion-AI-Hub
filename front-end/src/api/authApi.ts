import { UserLoginDto } from "@/dtos/UserLoginDto";
import { appApi, nonAuthAppApi } from "./baseApi";
import { UserRegisterDto } from "@/dtos/UserRegisterDto";
import { TokenRefreshInputDto } from "@/dtos/TokenRefreshInputDto";
import { OAuthLoginDto } from "@/dtos/OAuthLoginDto";
import { UserTokensDto } from "@/dtos/UserTokensDto";
import { ApiResponseDto } from "@/dtos/ApiResponseDto";
import { LoginResponseDto } from "@/dtos/LoginResponseDto";
import { VerifyTwoFactorDto } from "@/dtos/VerifyTwoFactorDto";
import { EnableTwoFactorDto } from "@/dtos/EnableTwoFactorDto";
import { UserMeDto } from "@/dtos/UserMeDto";

export class AuthApi {
  public static async login(userLoginDto: UserLoginDto) {
    return (await nonAuthAppApi.post("/users/login", userLoginDto))
      .data as ApiResponseDto<LoginResponseDto>;
  }

  public static async register(userRegisterDto: UserRegisterDto) {
    return (await nonAuthAppApi.post("/users/signup", userRegisterDto))
      .data as ApiResponseDto<UserTokensDto>;
  }

  public static async tokenRefresh(tokenRefreshInputDto: TokenRefreshInputDto) {
    return (
      await nonAuthAppApi.post("/users/token/refresh", tokenRefreshInputDto)
    ).data as ApiResponseDto<UserTokensDto>;
  }

  public static async oAuthLogin(oAuthLoginDto: OAuthLoginDto) {
    return (await nonAuthAppApi.post("/users/oAuthLogin", oAuthLoginDto))
      .data as ApiResponseDto<UserTokensDto>;
  }

  public static async verifyTwoFactor(verifyTwoFactorDto: VerifyTwoFactorDto) {
    return (
      await nonAuthAppApi.post("/auth/verifyTwoFactor", verifyTwoFactorDto)
    ).data as ApiResponseDto<UserTokensDto>;
  }

  public static async enableTwoFactor() {
    return (await appApi.post("/auth/enableTwoFactor", {})) // Sending an empty object as body
      .data as ApiResponseDto<EnableTwoFactorDto>;
  }

  public static async getMe() {
    return (await appApi.get("/users/me")).data as ApiResponseDto<UserMeDto>;
  }
}
