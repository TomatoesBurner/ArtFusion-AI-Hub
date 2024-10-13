import { BaseDto } from "./BaseDto";

export type VideoPromptInputFilterDto = {
  samplingSteps: number;
  cfgScale: number;
  eta: number;
  fps: number;
  width: number;
  height: number;
};

export type VideoPromptInputDto = {
  filters: VideoPromptInputFilterDto;
  message: string | null;
  fullMessage: string | null;
  model: string | null;
};

export type VideoPromptResponseDto = {
  originalVideoUrl: string | null;
  extension: string | null;
  videoUrl: string | null;
} & BaseDto;

export type ArgumentVideoPromptResponseDto = {
  filters: string;
  createdBy: string;
  extension: string;
  videoUrl: string;
  uploadUrl: string;
} & BaseDto;

export type VideoPromptDto = {
  input: VideoPromptInputDto;
  response: VideoPromptResponseDto;
  argumentResponses: ArgumentVideoPromptResponseDto[];
} & BaseDto;
