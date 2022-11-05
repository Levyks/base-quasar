type ExceptionDataMap = {
  'validation.failed': { fields: Record<string, string> };
};

export interface ExceptionResponseDto<
  Code extends keyof ExceptionDataMap = keyof ExceptionDataMap
> {
  code: Code;
  message: string;
  data: ExceptionDataMap[Code];
}
