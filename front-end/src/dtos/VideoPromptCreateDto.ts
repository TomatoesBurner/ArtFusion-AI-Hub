export type VideoPromptCreateDto = {
  samplingSteps: number;
  cfgScale: number;
  eta: number;
  message: string;
  fps: number;
  model: string;
  width: number;
  height: number;
};
