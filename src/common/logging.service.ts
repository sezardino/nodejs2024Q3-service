import { Injectable, LoggerService } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoggingService implements LoggerService {
  private readonly logFilePath: string;
  private readonly errorFilePath: string;
  private readonly logLevel: number;
  private readonly logMaxSize: number;

  constructor(private readonly configService: ConfigService) {
    this.logLevel = Number(configService.get('LOG_LEVEL')) || 0; // 0 - INFO, 1 - WARN, 2 - ERROR
    this.logMaxSize = Number(configService.get('LOG_FILE_MAX_SIZE')) || 10240;

    this.logFilePath = '/var/log/myapp/app.log';
    this.errorFilePath = '/var/log/myapp/error.log';

    this.ensureLogDirectoryExists();
  }

  private ensureLogDirectoryExists() {
    const logDirectory = path.dirname(this.logFilePath);
    console.log(fs.existsSync(logDirectory));
    if (!fs.existsSync(logDirectory)) {
      fs.mkdirSync(logDirectory, { recursive: true });
    }
  }

  private shouldLog(level: number): boolean {
    return level >= this.logLevel;
  }

  private writeLogToFile(message: string, level: string, filePath: string) {
    const currentDate = new Date().toISOString();
    const logMessage = `${currentDate} [${level}] ${message}\n`;

    const stats = fs.existsSync(filePath) ? fs.statSync(filePath) : null;
    if (stats && stats.size > this.logMaxSize * 1024) {
      fs.truncateSync(filePath, 0);
    }

    fs.appendFileSync(filePath, logMessage);
  }

  log(message: string) {
    if (this.shouldLog(0)) {
      console.log(message);
      this.writeLogToFile(message, 'INFO', this.logFilePath);
    }
  }

  error(message: string, trace?: string) {
    if (this.shouldLog(2)) {
      console.error(message);
      this.writeLogToFile(message, 'ERROR', this.errorFilePath);
      this.writeLogToFile(trace, 'ERROR', this.errorFilePath);
    }
  }

  warn(message: string) {
    if (this.shouldLog(1)) {
      console.warn(message);
      this.writeLogToFile(message, 'WARN', this.logFilePath);
    }
  }
}
