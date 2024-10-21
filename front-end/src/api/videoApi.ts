import { appApi } from "./baseApi";
import { ApiResponseDto } from "@/dtos/ApiResponseDto";
import {
  ArgumentVideoPromptResponseDto,
  VideoPromptDto,
} from "@/dtos/VideoPromptDto";
import { VideoPromptCreateDto } from "@/dtos/VideoPromptCreateDto";
import { CreateArgumentVideoPromptResponseDto } from "@/dtos/CreateArgumentVideoPromptResponseDto";
import { MediaItem } from "./imageApi";

export interface VideoItem {
  id: string;
  type: "video";
  url: string;
}
export class VideoApi {
  public static async getAllVideoPrompts(
    vpsId: string,
    cursor: string | null = null,
    limit: number = 100
  ) {
    // await new Promise((resolve) => setTimeout(resolve, 3000));

    return (
      await appApi.get(`/videoPromptSpaces/${vpsId}/videoPrompts`, {
        params: {
          cursor: cursor,
          limit: limit,
        },
      })
    ).data as ApiResponseDto<VideoPromptDto[]>;
  }

  public static async createVideoPrompt({
    vpsId,
    input,
  }: {
    vpsId: string;
    input: VideoPromptCreateDto;
  }) {
    if (!vpsId) {
      console.error("vpsId is undefined!");
      return;
    }

    return (
      await appApi.post(`/videoPromptSpaces/${vpsId}/videoPrompts`, input)
    ).data as ApiResponseDto<VideoPromptDto>;
  }

  // use for gallery
  public static async fetchVideo(
    vpsId: string,
    limit: number = 100
  ): Promise<ApiResponseDto<VideoItem[]>> {
    const response = await appApi.get(
      `/videoPromptSpaces/${vpsId}/videoPrompts`,
      {
        params: {
          limit: limit,
        },
      }
    );
    return response.data as ApiResponseDto<VideoItem[]>;
  }

  public static async deleteVideoPrompt({
    vpsId,
    vpId,
  }: {
    vpsId: string;
    vpId: string;
  }) {
    return await appApi.delete(
      `/videoPromptSpaces/${vpsId}/videoPrompts/${vpId}`
    );
  }

  public static async fetchVideoMediaItems(
    vpsId: string,
    limit: number = 100
  ): Promise<MediaItem[]> {
    const response = (
      await appApi.get(`/videoPromptSpaces/${vpsId}/videoPrompts`, {
        params: {
          limit: limit,
        },
      })
    ).data as ApiResponseDto<VideoPromptDto[]>;

    return (response.data || []).map((imagePrompt) => ({
      id: imagePrompt.id || "",
      type: "video",
      url: imagePrompt.response.videoUrl || "",
    }));
  }
}
