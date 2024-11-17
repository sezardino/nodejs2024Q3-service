import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoggingService } from 'src/common/logging';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly loggingService: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const { method, url, query, body } = req;

    res.on('finish', () => {
      const logMessage = {
        method,
        url,
        query,
        body,
        status: res.statusCode,
      };
      this.loggingService.log(JSON.stringify(logMessage), 'RequestLogger');
    });

    next();
  }
}
