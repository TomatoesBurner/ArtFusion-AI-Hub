import { UserLoginDto } from "@/dtos/UserLoginDto";
import { appApi, nonAuthAppApi } from "./baseApi";
import { UserRegisterDto } from "@/dtos/UserRegisterDto";
import { TokenRefreshInputDto } from "@/dtos/TokenRefreshInputDto";
import { OAuthLoginDto } from "@/dtos/OAuthLoginDto";
import { UserTokensDto } from "@/dtos/UserTokensDto";

export class AuthApi {
  public static async login(userLoginDto: UserLoginDto) {
    return (await nonAuthAppApi.post("/users/login", userLoginDto)).data as {
      data: UserTokensDto;
    };
  }

  public static async register(userRegisterDto: UserRegisterDto) {
    return (await nonAuthAppApi.post("/users/register", userRegisterDto))
      .data as { data: UserTokensDto };
  }

  public static async tokenRefresh(tokenRefreshInputDto: TokenRefreshInputDto) {
    return (
      await nonAuthAppApi.post("/users/token/refresh", tokenRefreshInputDto)
    ).data as { data: UserTokensDto };
  }

  public static async oAuthLogin(oAuthLoginDto: OAuthLoginDto) {
    return (await nonAuthAppApi.post("/users/oAuthLogin", oAuthLoginDto))
      .data as { data: UserTokensDto };
  }
}
