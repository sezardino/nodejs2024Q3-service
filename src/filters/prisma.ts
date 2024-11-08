// src/exceptions/prisma-exception.filter.ts
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter implements ExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();

    let status = HttpStatus.INTERNAL_SERVER_ERROR;
    let message = 'An unexpected error occurred';

    switch (exception.code) {
      case 'P2002':
        status = HttpStatus.CONFLICT;
        message = `Unique constraint failed on the field(s): ${exception.meta?.target}`;
        break;

      case 'P2025':
        status = HttpStatus.NOT_FOUND;
        message = 'Record not found';
        break;

      case 'P2003':
        status = HttpStatus.BAD_REQUEST;
        message = `Foreign key constraint failed on the field(s): ${exception.meta?.target}`;
        break;

      case 'P2010':
        status = HttpStatus.BAD_REQUEST;
        message = `The input data is invalid or the selection does not match`;
        break;

      case 'P2004':
        status = HttpStatus.BAD_REQUEST;
        message = `Invalid value provided for one of the fields`;
        break;

      case 'P2021':
        status = HttpStatus.BAD_REQUEST;
        message = `Required field is missing: ${exception.meta?.target}`;
        break;

      case 'P2034':
        status = HttpStatus.BAD_REQUEST;
        message = `Cannot update record as some values are missing or invalid`;
        break;

      case 'P2011':
        status = HttpStatus.BAD_REQUEST;
        message = `Data validation failed during record creation`;
        break;

      case 'P2001':
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = `Database connection error`;
        break;

      case 'P2020':
        status = HttpStatus.CONFLICT;
        message = `The record was modified by another operation`;
        break;

      default:
        status = HttpStatus.INTERNAL_SERVER_ERROR;
        message = `An unexpected error occurred: ${exception.message}`;
        break;
    }

    response.status(status).json({
      statusCode: status,
      timestamp: new Date().toISOString(),
      path: request.url,
      message,
      error: exception.code,
    });
  }
}
