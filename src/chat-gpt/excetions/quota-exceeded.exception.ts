// src/common/exceptions/quota-exceeded.exception.ts
import { HttpException, HttpStatus } from '@nestjs/common';

export class QuotaExceededException extends HttpException {
  constructor(message?: string) {
    super(
      {
        message: message || 'Quota exceeded',
        error: 'Too Many Requests',
        statusCode: HttpStatus.TOO_MANY_REQUESTS,
      },
      HttpStatus.TOO_MANY_REQUESTS,
    );
  }
}
