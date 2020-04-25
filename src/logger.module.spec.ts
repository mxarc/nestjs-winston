import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import 'reflect-metadata';
import { BonusamiLogger } from './logger.module';

describe('bonusami-logger-module', () => {
  let app: INestApplication;

  it('should be truthy', () => {
    expect(BonusamiLogger).toBeTruthy();
  });

  describe('express app', () => {
    beforeEach(async () => {
      const module = await Test.createTestingModule({}).compile();
      app = module.createNestApplication();
    });

    it('should run the setup (non-normalized path)', async () => {
      expect(
        BonusamiLogger.forRoot({ level: 'info', silent: false }),
      ).toBeDefined();
    });
  });
});
