import { Injectable, LoggerService, LogLevel } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class LoggingService implements LoggerService {
  private logFile: string;
  private maxFileSizeKB: number;

  constructor() {
    this.logFile =
      process.env.LOG_FILE_PATH || path.join(__dirname, 'logs/app.log');
    this.maxFileSizeKB = parseInt(process.env.LOG_FILE_MAX_SIZE || '1024', 10); // Default: 1 MB
    this.setupLogFileRotation();
  }

  log(message: string, context?: string) {
    this.writeLog('LOG', message, context);
  }

  error(message: string, trace?: string, context?: string) {
    this.writeLog('ERROR', `${message} - ${trace}`, context);
  }

  warn(message: string, context?: string) {
    this.writeLog('WARN', message, context);
  }

  debug?(message: string, context?: string) {
    if (this.shouldLog('debug')) {
      this.writeLog('DEBUG', message, context);
    }
  }

  verbose?(message: string, context?: string) {
    if (this.shouldLog('verbose')) {
      this.writeLog('VERBOSE', message, context);
    }
  }

  private shouldLog(level: LogLevel): boolean {
    const allowedLevels = (process.env.LOG_LEVEL || 'log,warn,error').split(
      ',',
    );
    return allowedLevels.includes(level);
  }

  private writeLog(level: string, message: string, context?: string) {
    const timestamp = new Date().toISOString();
    const logMessage = `[${timestamp}] [${level}] ${
      context ? `[${context}]` : ''
    } ${message}\n`;

    fs.appendFileSync(this.logFile, logMessage, 'utf8');
    console.log(logMessage); // Also write to stdout
  }

  private setupLogFileRotation() {
    const stats = fs.existsSync(this.logFile) && fs.statSync(this.logFile);
    if (stats && stats.size > this.maxFileSizeKB * 1024) {
      const rotatedLogFile = `${this.logFile}.${Date.now()}`;
      fs.renameSync(this.logFile, rotatedLogFile);
    }
  }
}
