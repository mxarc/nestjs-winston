import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import 'reflect-metadata';
import { LoggerModule } from './logger.module';

describe('logger-module', () => {
  let app: INestApplication;

  it('should be truthy', () => {
    expect(LoggerModule).toBeTruthy();
  });

  describe('express app', () => {
    beforeEach(async () => {
      const module = await Test.createTestingModule({}).compile();
      app = module.createNestApplication();
    });

    it('should run the setup (non-normalized path)', async () => {
      expect(
        LoggerModule.forRoot({ level: 'info', silent: false }),
      ).toBeDefined();
    });
  });
});
