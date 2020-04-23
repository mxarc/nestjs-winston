import { Injectable, Scope } from '@nestjs/common';
import { Logger } from '../logger.interface';
import { LogLevel } from '../log_level.type';
import { WinstonService } from './winston.service';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService implements Logger {
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
   * @param args Extra arguments
   */
  private winstonLog(level: LogLevel, message: string, ...args: any[]): void {
    if (this.logger.getLogger()) {
      this.logger.getLogger().log({
        level: level,
        message: message,
        // add context to args
        context: this.getLoggerContext(),
        // expand the rest of the arguments if they are available
        args: args,
      });
    }
  }

  public info(message: string, ...args: any[]): void {
    this.winstonLog('info', message, args);
  }

  public error(message: string, trace?: string, ...args: any[]): void {
    this.winstonLog('error', message, {
      ...(trace && {
        trace: trace,
      }),
      ...args,
    });
  }

  public warn(message: string, ...args: any[]): void {
    this.winstonLog('warn', message, args);
  }

  public silly(message: string, ...args: any[]): void {
    this.winstonLog('silly', message, args);
  }
  public debug(message: string, ...args: any[]): void {
    this.winstonLog('debug', message, args);
  }

  public verbose(message: string, ...args: any[]): void {
    this.winstonLog('verbose', message, args);
  }

  /**
   * Set the context for each log message of this Logger Instance
   *
   * @param context The context which should be prepended before every log message
   */
  public setContext(context: string) {
    this.loggerContext = context;
  }

  /**
   * Returns the current Logger context if available
   *
   * @returns context The context for the injected logger
   */
  private getLoggerContext(): string {
    return this.loggerContext;
  }
}
