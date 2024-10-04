export type ApiResponseDto<T = any> = {
  data: T;
  message: string | null;
  error: string | null;
  code: string | null;
  status: string | null;
};
