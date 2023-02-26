import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class AppLoggerMiddleware implements NestMiddleware {
  private logger = new Logger('HTTP');

  use(request: Request, response: Response, next: NextFunction): void {
    const { method, path: url, body, query } = request;
    const userAgent = request.get('user-agent') || '';

    response.on('close', () => {
      const { statusCode } = response;

      const logMessage = `${method} ${url} body: ${JSON.stringify(
        body,
      )} query: ${JSON.stringify(
        query,
      )} status code: ${statusCode} - ${userAgent}`;

      this.logger.log(logMessage);
    });

    next();
  }
}
