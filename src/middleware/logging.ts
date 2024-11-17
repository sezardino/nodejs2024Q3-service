import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { LoggingService } from 'src/common/logging.service';

@Injectable()
export class LoggingMiddleware implements NestMiddleware {
  constructor(private readonly loggingService: LoggingService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const start = Date.now();

    this.loggingService.log(`Request: ${req.method} ${req.url}`);
    this.loggingService.log(`Query Params: ${JSON.stringify(req.query)}`);
    this.loggingService.log(`Request Body: ${JSON.stringify(req.body)}`);

    res.on('finish', () => {
      const duration = Date.now() - start;
      this.loggingService.log(`Response: ${res.statusCode} - ${duration}ms`);
    });

    next();
  }
}
