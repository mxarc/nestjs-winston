import { Provider } from '@nestjs/common';
import { LoggerService } from './services';
import { getLoggerToken } from './utils';

const loggerFactory = (context: string): Provider<LoggerService> => {
  return {
    provide: getLoggerToken(context),
    useValue: new LoggerService(context),
    inject: [LoggerService],
  };
};

/**
 * Creates `LoggerService` providers for each given prefix
 */
export const createLoggerProviders = (
  prefixes: string[],
): Provider<LoggerService>[] => {
  return prefixes.map((context: string) => loggerFactory(context));
};
