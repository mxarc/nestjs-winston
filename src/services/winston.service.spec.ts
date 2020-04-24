import { WinstonService } from './winston.service';

describe('winston class', () => {
  beforeEach(async () => {
    new WinstonService();
  });

  it('should create a valid instance of winston service', () => {
    const winstonInstance = WinstonService.getInstance();
    expect(winstonInstance).toBeInstanceOf(WinstonService);
  });

  it('should fail if no setup procedure was made', () => {
    const winstonInstance = WinstonService.getInstance();
    expect(winstonInstance.getLogger()).toBeUndefined();
  });

  it('should create a winston object', () => {
    const winstonInstance = WinstonService.getInstance();
    winstonInstance.setup({ level: 'info', silent: false });
    expect(winstonInstance.getLogger()).toBeDefined();
  });
});
