# bonusami-logger

## Installation

Execute this command in your project folder:

```bash
npm install @bonusami/logger
# or if using yarn
yarn add @bonusami/logger
```

## How to enable

Import LoggerModule into your AppModule

### Example

```typescript
import { BonusamiLogger } from '@bonusami/logger';

@Module({
  imports: [
    /** Module declaration  */
    BonusamiLogger.forRoot({
      level: 'info',
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
