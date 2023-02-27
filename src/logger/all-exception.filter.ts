import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { Logger } from './logger.service';

@Catch()
export class AllExceptionFilter implements ExceptionFilter {
  constructor(
    private readonly httpAdapterHost: HttpAdapterHost,
    private logger: Logger,
  ) {}
  catch(exception: any, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    let httpStatus;

    if (exception instanceof HttpException) {
      httpStatus = exception.getStatus();
    } else {
      httpStatus = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
      message: exception.message,
    };

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
