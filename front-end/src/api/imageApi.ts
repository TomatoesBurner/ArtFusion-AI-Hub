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

  // use for gallery
  public static async fetchImageMediaItems(
    ipsId: string,
    limit: number = 100
  ): Promise<MediaItem[]> {
    const response = (
      await appApi.get(`/imagePromptSpaces/${ipsId}/imagePrompts`, {
        params: {
          limit: limit,
        },
      })
    ).data as ApiResponseDto<ImagePromptDto[]>;

    return (response.data || []).map((imagePrompt) => ({
      id: imagePrompt.id || "",
      type: "image",
      url: imagePrompt.response.imageUrl || "",
    }));
  }

  public static async deleteImagePrompt({
    ipsId,
    ipId,
  }: {
    ipsId: string;
    ipId: string;
  }) {
    return await appApi.delete(
      `/imagePromptSpaces/${ipsId}/imagePrompts/${ipId}`
    );
  }
}
