import { BaseDto } from "./BaseDto";

export type ImagePromptInputFilterDto = {
  width?: number;
  height?: number;
  aspectRatio?: string;
  dpi?: number;
};

export type ImagePromptInputDto = {
  filters: ImagePromptInputFilterDto;
  message: string | null;
  fullMessage: string | null;
  model: string | null;
};

export type ImagePromptResponseDto = {
  originalImageUrl: string | null;
  extension: string | null;
  imageUrl: string | null;
} & BaseDto;

export type ArgumentImagePromptResponseDto = {
  filters: string;
  createdBy: string;
  extension: string;
  imageUrl: string;
  uploadUrl: string;
} & BaseDto;

export type ImagePromptDto = {
  input: ImagePromptInputDto;
  response: ImagePromptResponseDto;
  argumentResponses: ArgumentImagePromptResponseDto[];
} & BaseDto;
