<p align="center">
<img src="logo.png" width="320" title="Logo" alt="Logo">
</p>

# Overview

This is a Winston based Logger module made for NestJS apps, it has support for a Logging context and it can replace the default NestJS logger implementation.

## Installation

Execute this command in your project folder:

```bash
npm install @bonusami/logger
# or if using yarn
yarn add @bonusami/logger
```

## How to enable

Import LoggerModule into your AppModule

Logger Module is a global module so there's no need to import it on every module of your app,
just import it once on AppModule and it'll be available to use everywhere.

### Example

```typescript
import { BonusamiLogger } from '@bonusami/logger';

@Module({
  imports: [
    /** Module declaration  */
    BonusamiLogger.forRoot({
      level: 'info',
      silent: false
    })
    // ... your other module imports
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {}
```

Then use the Logger Injector in any of your project classes

```typescript
import { Log, Logger } from '@bonusami/logger';

class UserService {
  constructor(@Log(UserService.name) private readonly logger: Logger) {
    this.logger.info('Hello world');
  }
}
```

If you wish to override the default NestJS logger module you can do this by creating an instance of NestLogger and replacing the default logger in the bootstrap method of NestJS

```typescript
import { NestLogger } from '@bonusami/logger';

export class App {
  /**
   * Boostrap Nest server
   */
  public async bootstrap(): Promise<INestApplication> {
    /** create App */
    const app = await NestFactory.create(AppModule, {
      logger: new NestLogger(),
    });
  }
}
```

More options will come soon like ability to change the log format and add/replace transports
