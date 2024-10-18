import type { ErrorCode } from '@shared/consts/error';

export class AppError extends Error {
  constructor(public readonly errorCode: ErrorCode) {
    super();
    this.name = 'AppError';
  }
}
