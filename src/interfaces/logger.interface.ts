/**
 * Logger Interface
 */
export interface Logger {
  /**
   * Log message with `info` level
   *
   * @param message Log message
   * @param meta Optional arguments
   */
  info(message: string, ...meta: any[]): void;

  /**
   * Log message with `error` level
   *
   * @param message Log message
   * @param trace Optional trace
   * @param meta Optional arguments
   */
  error(message: string, trace?: string, ...meta: any[]): void;
  /**
   * Log message with `warn` level
   *
   * @param message Log message
   * @param meta Optional arguments
   */
  warn(message: string, ...meta: any[]): void;
  /**
   * Log message with `silly` level
   *
   * @param message Log message
   * @param meta Optional arguments
   */
  silly(message: string, ...meta: any[]): void;
  /**
   * Log message with `debug` level
   *
   * @param message Log message
   * @param meta Optional arguments
   */
  debug(message: string, ...meta: any[]): void;
  /**
   * Log message with `verbose` level
   *
   * @param message Log message
   * @param meta Optional arguments
   */
  verbose(message: string, ...meta: any[]): void;

  /**
   * Set the context for each log message of this Logger Instance
   *
   * @param context The context which should be prepended before every log message
   */
  setContext(message: string): void;
}
