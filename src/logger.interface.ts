/**
 * Logger Interface
 */
export interface Logger {
  /**
   * Log message with `info` level
   *
   * @param message Log message
   * @param args Optional arguments
   */
  info(message: string, ...args: any[]): void;

  /**
   * Log message with `error` level
   *
   * @param message Log message
   * @param trace Optional trace
   * @param args Optional arguments
   */
  error(message: string, trace?: string, ...args: any[]): void;
  /**
   * Log message with `warn` level
   *
   * @param message Log message
   * @param args Optional arguments
   */
  warn(message: string, ...args: any[]): void;
  /**
   * Log message with `silly` level
   *
   * @param message Log message
   * @param args Optional arguments
   */
  silly(message: string, ...args: any[]): void;
  /**
   * Log message with `debug` level
   *
   * @param message Log message
   * @param args Optional arguments
   */
  debug(message: string, ...args: any[]): void;
  /**
   * Log message with `verbose` level
   *
   * @param message Log message
   * @param args Optional arguments
   */
  verbose(message: string, ...args: any[]): void;
}

export interface HTTPLog {
  httpLog(message: string): void;
}
