import { Injectable, Scope } from '@nestjs/common';
import * as os from 'os';
import { LogLevel, WinstonLogger } from '../interfaces';
import { WinstonService } from './winston.service';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService implements WinstonLogger {
  private loggerContext: string;
  private logger: WinstonService;

  constructor(context = 'App') {
    this.setContext(context);
    this.logger = WinstonService.getInstance();
  }

  /**
   * Pass message to winston logger
   *
   * @param level Logger level
   * @param message Message to log
   * @param meta Extra data
   */
  private logToWinston(level: LogLevel, message: string, ...meta: any[]): void {
    const logger = this.logger.getLogger();
    if (logger) {
      logger.log({
        pid: process.pid,
        hostname: os.hostname(),
        level: level,
        message: message,
        context: this.getLoggerContext(),
        ...(meta.length >= 1 && {
          extra: meta,
        }),
      });
    }
  }

  public info(message: string, ...meta: any[]): void {
    this.logToWinston('info', message, meta);
  }

  public error(message: string, trace?: string, ...meta: any[]): void {
    this.logToWinston('error', message, {
      ...(trace && {
        trace: trace,
      }),
      meta,
    });
  }

  public warn(message: string, ...meta: any[]): void {
    this.logToWinston('warn', message, meta);
  }

  public silly(message: string, ...meta: any[]): void {
    this.logToWinston('silly', message, meta);
  }
  public debug(message: string, ...meta: any[]): void {
    this.logToWinston('debug', message, meta);
  }

  public verbose(message: string, ...meta: any[]): void {
    this.logToWinston('verbose', message, meta);
  }

  public setContext(context: string) {
    this.loggerContext = context;
  }

  /**
   * Returns the current Logger context if available
   *
   * @returns context The context for the injected logger
   */
  public getLoggerContext(): string {
    return this.loggerContext;
  }
}
