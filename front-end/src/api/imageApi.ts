import { appApi } from "./baseApi";
import { ApiResponseDto } from "@/dtos/ApiResponseDto";
import {
  ArgumentImagePromptResponseDto,
  ImagePromptDto,
} from "@/dtos/ImagePromptDto";
import { ImagePromptCreateDto } from "@/dtos/ImagePromptCreateDto";
import { CreateArgumentImagePromptResponseDto } from "@/dtos/CreateArgumentImagePromptResponseDto";

export class ImageApi {
  public static async getAllImagePrompts(
    ipsId: string,
    cursor: string | null = null,
    limit: number = 10
  ) {
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    return (
      await appApi.get(`/imagePromptSpaces/${ipsId}/imagePrompts`, {
        params: {
          cursor: cursor,
          limit: limit,
        },
      })
    ).data as ApiResponseDto<ImagePromptDto[]>;
  }

  public static async createImagePrompt({
    ipsId,
    input,
  }: {
    ipsId: string;
    input: ImagePromptCreateDto;
  }) {
    return (
      await appApi.post(`/imagePromptSpaces/${ipsId}/imagePrompts`, input)
    ).data as ApiResponseDto<ImagePromptDto>;
  }

  public static async createNewFilteredImage(
    ipsId: string,
    ipId: string,
    input: CreateArgumentImagePromptResponseDto
  ) {
    return (
      await appApi.post(
        `/imagePromptSpaces/${ipsId}/imagePrompts/${ipId}/argumentResponse`,
        input
      )
    ).data as ApiResponseDto<ArgumentImagePromptResponseDto>;
  }
}