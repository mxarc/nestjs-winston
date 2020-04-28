import winston from 'winston';

export interface LoggerOptions {
  level: LogLevel;
  silent?: boolean;
  transports?: winston.LoggerOptions['transports'];
}

export type LogLevel =
  | 'error'
  | 'warn'
  | 'verbose'
  | 'info'
  | 'debug'
  | 'silly';
