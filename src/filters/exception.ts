import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggingService } from 'src/common/logging.service';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly loggingService: LoggingService) {}

  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException ? exception.getStatus() : 500;

    const logMessage = {
      method: request.method,
      url: request.url,
      body: request.body,
      query: request.query,
      statusCode: status,
      message: exception instanceof Error ? exception.message : 'Unknown error',
    };
    this.loggingService.error(
      `Exception caught: ${JSON.stringify(logMessage)}`,
    );

    response.status(status).json({
      statusCode: status,
      message:
        exception instanceof HttpException
          ? exception.getResponse()
          : 'Internal server error',
    });
  }
}
