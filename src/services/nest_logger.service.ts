import { LoggerService as NestLoggerService } from '@nestjs/common';
import { LoggerService } from './logger.service';

/**
 * Overrides default NestLogger and pipes output to our custom logger
 */
export class NestLogger implements NestLoggerService {
  private logger: LoggerService;

  constructor() {
    this.logger = new LoggerService();
  }

  log(message: any, context?: string) {
    this.logger.setContext(context);
    this.logger.info(message);
  }
  error(message: any, trace?: string, context?: string) {
    this.logger.setContext(context);
    this.logger.error(message, trace);
  }
  warn(message: any, context?: string) {
    this.logger.setContext(context);
    this.logger.warn(message);
  }
  debug(message: any, context?: string) {
    this.logger.setContext(context);
    this.logger.debug(message);
  }
  verbose(message: any, context?: string) {
    this.logger.setContext(context);
    this.logger.verbose(message);
  }
}
