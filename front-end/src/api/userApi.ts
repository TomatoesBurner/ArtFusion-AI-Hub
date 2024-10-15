import { UserMeDto } from "@/dtos/UserMeDto";
import { appApi } from "./baseApi";
import { ApiResponseDto } from "@/dtos/ApiResponseDto";

export class UserApi {
  public static async getMe() {
    return (await appApi.get("/users/me")).data as ApiResponseDto<UserMeDto>;
  }

  // update user info
  public static async updateUser(data: Partial<UserMeDto>) {
    return (await appApi.patch("/users/me/update", data)) // Updated to use PATCH and correct endpoint
      .data as ApiResponseDto<UserMeDto>;
  }
}
