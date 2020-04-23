import { LogLevel } from './log_level.type';

export interface LoggerOptions {
  level: LogLevel;
  silent: boolean;
}
