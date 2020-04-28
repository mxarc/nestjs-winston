import winston from 'winston';
import { LoggerOptions } from '../interfaces';
import { devTransport } from '../transports';

export class WinstonService {
  private logger: winston.Logger;
  static _instance: WinstonService;

  public static getInstance() {
    return this._instance || (this._instance = new this());
  }

  public static deleteInstance() {
    this._instance = null;
  }

  /**
   * Setup Winston module
   * @param options Logger Options object
   */
  public setup(options: LoggerOptions) {
    this.createLogger(options);
  }

  /**
   * Creates Winston Logger instance with custom format and stdout transport
   */
  private createLogger(options: LoggerOptions): void {
    this.logger = winston.createLogger({
      level: options.level || 'info', // minimum logger level
      silent: options.silent || false, // logging will be disabled in testing,
      transports: options.transports, // custom transports
    });
    // add stream transport to winston
    if (!options.transports) {
      this.getLogger().add(devTransport);
    }
  }

  /**
   * Returns current Winston Logger instance
   *
   * @returns Winston logger
   */
  public getLogger(): winston.Logger {
    return this.logger;
  }
}
