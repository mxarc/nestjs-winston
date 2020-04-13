import { Format, TransformableInfo } from 'logform';
import stripAnsi from 'strip-ansi';
import * as winston from 'winston';

export class WinstonLogger {
  private logger: winston.Logger;
  private httpLogger: winston.Logger;

  constructor() {
    this.createLogger();
  }

  /**
   * Returns winston console format, it has a special formatting
   *
   * @returns Format for winston console logger
   */
  private getConsoleFormat(): Format {
    return winston.format.combine(
      winston.format.timestamp(), // add timestamp key
      winston.format.colorize(), // add color to the level tag
      winston.format.simple(),
      /** custom log format for development */
      winston.format.printf((info: TransformableInfo) => {
        // unpack variables
        const { level, message, timestamp, ...meta } = info;
        // format for timestamp
        const ts = timestamp.slice(0, 19).replace('T', ' ');
        // logger format to console
        const logMessage = `${ts} | ${
          meta.context || 'App'
        } | ${level} » ${message}`;
        // as level has some hidden ansi strings, we need to strip them before comparing if level type is 'error'
        if (stripAnsi(level) === 'error' && meta.args) {
          // extra check if message contains args and is a valid error type
          const error: Error | string = meta.args[0].trace || '';
          if (error) {
            console.log(error);
          }
        }
        return logMessage;
      }),
    );
  }

  /**
   * Returns JSON log format for Winston use in production
   *
   * @returns Format for production mode (JSON format)
   */
  private getProductionFormat(): Format {
    return winston.format.combine(
      winston.format.uncolorize(),
      winston.format.timestamp(),
      winston.format.json(),
    );
  }

  /**
   * Creates Winston Logger instance with custom format and stdout transport
   */
  private createLogger(): void {
    this.logger = winston.createLogger({
      level: 'info', // minimum logger level
      silent: false, // logging will be disabled in testing,
      exitOnError: false, // disable exit on error,
    });
    // add stream transport to winston
    this.getLogger().add(
      new winston.transports.Stream({
        stream: process.stdout,
        handleExceptions: true,
        format: this.getConsoleFormat(),
      }),
    );
  }

  /**
   * Returns current logger instance
   *
   * @returns Winston logger
   */
  public getLogger(): winston.Logger {
    return this.logger;
  }
}
