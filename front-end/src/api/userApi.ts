import { UserMeDto } from "@/dtos/UserMeDto";
import { appApi } from "./baseApi";

export class UserApi {
  public static async getMe() {
    return (await appApi.get("/users/me")).data as {
      data: UserMeDto;
    };
  }
}
