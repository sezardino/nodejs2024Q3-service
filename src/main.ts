/* eslint-disable @typescript-eslint/ban-ts-comment */
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { PrismaClientExceptionFilter } from './filters/prisma';

import * as fs from 'fs';
import * as yaml from 'js-yaml';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalFilters(new PrismaClientExceptionFilter());
  await app.listen(process.env.PORT || 8080);
  console.log(process.env.PORT);

  const filePath = path.join(__dirname, '../doc/api.yaml');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const swaggerDocument = yaml.load(fileContents);

  // @ts-ignore
  SwaggerModule.setup('api/docs', app, swaggerDocument);

  await app.listen(process.env.PORT || 4000);
}
bootstrap();
