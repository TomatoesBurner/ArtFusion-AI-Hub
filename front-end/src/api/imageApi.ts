import { appApi } from "./baseApi";
import { ApiResponseDto } from "@/dtos/ApiResponseDto";
import {
  ArgumentImagePromptResponseDto,
  ImagePromptDto,
} from "@/dtos/ImagePromptDto";
import { ImagePromptCreateDto } from "@/dtos/ImagePromptCreateDto";
import { CreateArgumentImagePromptResponseDto } from "@/dtos/CreateArgumentImagePromptResponseDto";

// Define the MediaItem interface only once
export interface MediaItem {
  id: string;
  type: "image" | "video";
  url: string;
}

export class ImageApi {
  // Fetch all image prompts with pagination
  public static async getAllImagePrompts({
    ipsId,
    cursor = null,
    limit = 10,
  }: {
    ipsId: string;
    cursor: string | null;
    limit: number;
  }): Promise<ApiResponseDto<ImagePromptDto[]>> {
    return (
      await appApi.get(`/imagePromptSpaces/${ipsId}/imagePrompts`, {
        params: {
          cursor: cursor,
          limit: limit,
        },
      })
    ).data as ApiResponseDto<ImagePromptDto[]>;
  }

  // Create a new image prompt
  public static async createImagePrompt({
    ipsId,
    input,
  }: {
    ipsId: string;
    input: ImagePromptCreateDto;
  }): Promise<ApiResponseDto<ImagePromptDto>> {
    return (
      await appApi.post(`/imagePromptSpaces/${ipsId}/imagePrompts`, input)
    ).data as ApiResponseDto<ImagePromptDto>;
  }

  // Create a new filtered image (argument response)
  public static async createNewFilteredImage({
    ipsId,
    ipId,
    input,
  }: {
    ipsId: string;
    ipId: string;
    input: CreateArgumentImagePromptResponseDto;
  }): Promise<ApiResponseDto<ArgumentImagePromptResponseDto>> {
    return (
      await appApi.post(
        `/imagePromptSpaces/${ipsId}/imagePrompts/${ipId}/argumentResponse`,
        input
      )
    ).data as ApiResponseDto<ArgumentImagePromptResponseDto>;
  }

  // Fetch media items for a specific image prompt space (ipsId)
  public static async fetchMediaItems(
    ipsId: string
  ): Promise<ApiResponseDto<MediaItem[]>> {
    const response = await appApi.get(
      `/imagePromptSpaces/${ipsId}/imagePrompts`
    );
    return response.data as ApiResponseDto<MediaItem[]>;
  }
}
