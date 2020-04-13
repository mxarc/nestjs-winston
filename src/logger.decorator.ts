import { Inject } from '@nestjs/common';
import { LoggerModule } from './logger.module';
import { getLoggerToken } from './utils';

/**
 * Injects a `LoggerService` with a context identifier
 *
 * @param context Context which gets prepended before every log message
 * @returns LoggerService with prefix set
 */
export const Log = (context = 'App') => {
  if (!LoggerModule.prefixesForLoggers.includes(context)) {
    LoggerModule.prefixesForLoggers.push(context);
  }
  return Inject(getLoggerToken(context));
};
