import { DynamicModule, Global, Provider } from '@nestjs/common';
import { LoggerOptions } from './interfaces';
import { createLoggerProviders } from './logger.providers';
import { LoggerService, WinstonService } from './services';

@Global()
export class LoggerModule {
  static prefixesForLoggers: string[] = new Array<string>();
  static forRoot(config: LoggerOptions): DynamicModule {
    // setup winston first
    const winston = WinstonService.getInstance();
    winston.setup(config);
    // create prefixed logger providers, which are 'LoggerService<Custom_Name>'
    const prefixedLoggerProviders: Provider<
      LoggerService
    >[] = createLoggerProviders(this.prefixesForLoggers);
    const providers: Provider<any>[] = [
      { provide: LoggerService, useValue: new LoggerService() },
      ...prefixedLoggerProviders,
    ];
    return {
      module: LoggerModule,
      providers: providers,
      exports: providers,
    };
  }
}
