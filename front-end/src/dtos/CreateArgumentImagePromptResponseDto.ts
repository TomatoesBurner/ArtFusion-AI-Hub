export type ArgumentImageFiltersDto = {
  brightness: number;
  contrast: number;
  saturate: number;
  grayscale: number;
  rotate: number;
  zoom: number;
  flipHorizontal: boolean;
  flipVertical: boolean;
};

export type CreateArgumentImagePromptResponseDto = {
  filters: ArgumentImageFiltersDto;
  extension: string;
};
