import { Injectable, NestMiddleware, Logger, HttpStatus } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, path: url, body, query } = request;
    const userAgent = request.get('user-agent') || '';

    process.on('unhandledRejection', (reason) => {
      this.logger.error(`Unhandled Rejection: ${reason}`);
    });

    process.on('uncaughtException', (err) => {
      this.logger.error(`Uncaught Exception: ${err.message}`);
    });

    response.on('close', () => {
      const { statusCode } = response;

      const logMessage = `${method} ${url} body: ${JSON.stringify(
        body,
      )} query: ${JSON.stringify(
        query,
      )} status code: ${statusCode} - ${userAgent}`;

      if (statusCode >= HttpStatus.INTERNAL_SERVER_ERROR) {
        this.logger.error(logMessage);
      } else if (
        statusCode >= HttpStatus.BAD_REQUEST &&
        statusCode < HttpStatus.INTERNAL_SERVER_ERROR
      ) {
        this.logger.warn(logMessage);
      } else {
        this.logger.log(logMessage);
      }
    });

    next();
  }
}
