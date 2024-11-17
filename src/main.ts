/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from './filters/prisma';

import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as path from 'path';
import { LoggingService } from './common/logging.service';
import { AllExceptionsFilter } from './filters/exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const loggingService = app.get(LoggingService);

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new AllExceptionsFilter(loggingService));
  app.useGlobalFilters(new PrismaClientExceptionFilter());

  // docs
  const filePath = path.join(__dirname, '../doc/api.yaml');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const swaggerDocument = yaml.load(fileContents);
  // @ts-ignore
  SwaggerModule.setup('api/docs', app, swaggerDocument);

  const logError = (error: Error) => {
    const errorMessage = error.stack || error.message;
    loggingService.error(`UncaughtException: ${errorMessage}`, error.stack);
  };

  process.on('uncaughtException', (error: Error) => {
    logError(error);
    loggingService.error(
      'Uncaught exception detected. The application will exit now.',
      error.stack,
    );
    process.exit(1);
  });

  process.on('unhandledRejection', (reason: any) => {
    const error = new Error(`Unhandled Rejection: ${reason}`);
    loggingService.error(`Unhandled Rejection: ${error.message}`, error.stack);
    process.exit(1);
  });

  await app.listen(process.env.PORT || 4000);
  loggingService.log('NestJS application started successfully.');
}
bootstrap();
