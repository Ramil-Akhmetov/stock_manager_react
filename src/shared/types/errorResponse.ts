export interface ErrorResponse {
  data: {
    message: string;
    errors?: {
      [key: string]: string;
    };
  };
  status: number;
}

export function isErrorResponse(obj: unknown): obj is ErrorResponse {
  return Boolean(
    obj &&
      typeof obj === 'object' &&
      'data' in obj &&
      obj.data !== null &&
      typeof obj.data === 'object' &&
      'message' in obj.data &&
      typeof obj.data.message === 'string' &&
      'status' in obj &&
      typeof obj.status === 'number'
  );
}
