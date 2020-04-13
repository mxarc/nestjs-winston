import { DynamicModule, Global, Provider } from '@nestjs/common';
import { createLoggerProviders } from './logger.providers';
import { LoggerService } from './services';

@Global()
export class LoggerModule {
  static prefixesForLoggers: string[] = new Array<string>();
  static forRoot(): DynamicModule {
    const prefixedLoggerProviders: Provider<
      LoggerService
    >[] = createLoggerProviders(this.prefixesForLoggers);
    const providers: Provider<any>[] = [
      { provide: LoggerService, useValue: new LoggerService('App') },
      ...prefixedLoggerProviders,
    ];
    return {
      module: LoggerModule,
      providers: providers,
      exports: providers,
    };
  }
}
