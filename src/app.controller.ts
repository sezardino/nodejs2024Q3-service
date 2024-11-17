import { Controller, Get, HttpCode } from '@nestjs/common';
import { LoggingService } from './common/logging.service';
import { Public } from './decorators/auth';

@Controller('')
export class AppController {
  constructor(private readonly loggingService: LoggingService) {}

  @Get('')
  @HttpCode(200)
  @Public()
  helloWorld() {
    this.loggingService.log('This is an info log');
    this.loggingService.warn('This is a warning');
    this.loggingService.error('This is an error log', 'Some trace information');
    return 'Hello world';
  }
}
