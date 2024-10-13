import { appApi } from "./baseApi";
import { ApiResponseDto } from "@/dtos/ApiResponseDto";

// Define the MediaItem interface only once
export interface MediaItem {
  id: string;
  type: "image" | "video";
  url: string;
}

export class ImageApi {
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
