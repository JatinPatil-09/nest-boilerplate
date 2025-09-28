import type { ApiResponseSuccess, ApiResponseError } from '../interfaces';

export class ResponseHelper {
  static success<T>(message: string, data: T): ApiResponseSuccess<T> {
    return {
      status: 'success',
      message,
      data,
    };
  }

  static error(message: string): ApiResponseError {
    return {
      status: 'error',
      message,
    };
  }
}
