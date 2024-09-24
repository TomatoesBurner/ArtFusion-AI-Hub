import { UserLoginDto } from "@/dtos/UserLoginDto";
import appApi from "./baseApi";
import { UserRegisterDto } from "@/dtos/UserRegisterDto";
import { TokenRefreshInputDto } from "@/dtos/TokenRefreshInputDto";
import { OAuthLoginDto } from "@/dtos/OAuthLoginDto";

export class AuthApi {
  public static login(userLoginDto: UserLoginDto) {
    return appApi.post("/login", userLoginDto);
  }

  public static register(userRegisterDto: UserRegisterDto) {
    return appApi.post("/register", userRegisterDto);
  }

  public static tokenRefresh(tokenRefreshInputDto: TokenRefreshInputDto) {
    return appApi.post("/token/refresh", tokenRefreshInputDto);
  }

  public static oAuthLogin(oAuthLoginDto: OAuthLoginDto) {
    return appApi.post("/oauth/login", oAuthLoginDto);
  }
}
