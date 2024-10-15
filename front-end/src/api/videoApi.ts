import { appApi } from "./baseApi";
import { ApiResponseDto } from "@/dtos/ApiResponseDto";
import {
  ArgumentVideoPromptResponseDto,
  VideoPromptDto,
} from "@/dtos/VideoPromptDto";
import { VideoPromptCreateDto } from "@/dtos/VideoPromptCreateDto";
import { CreateArgumentVideoPromptResponseDto } from "@/dtos/CreateArgumentVideoPromptResponseDto";

export class VideoApi {
  public static async getAllVideoPrompts(
    vpsId: string,
    cursor: string | null = null,
    limit: number = 1000
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
}
