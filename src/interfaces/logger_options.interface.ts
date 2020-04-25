export interface LoggerOptions {
  level: LogLevel;
  silent: boolean;
}

export type LogLevel =
  | 'error'
  | 'warn'
  | 'verbose'
  | 'info'
  | 'debug'
  | 'silly';
