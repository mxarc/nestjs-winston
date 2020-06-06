import * as index from './index';
describe('index', () => {
  it('should export interfaces', () => {
    expect(index).toBeTruthy();
  });
  it('should export logger module', () => {
    expect(index).toHaveProperty('LoggerModule');
  });
  it('should export logger decorator', () => {
    expect(index).toHaveProperty('InjectLogger');
  });
  it('should export logger service', () => {
    expect(index).toHaveProperty('LoggerService');
  });
  it('should export nest logger service', () => {
    expect(index).toHaveProperty('LoggerService');
  });
});
