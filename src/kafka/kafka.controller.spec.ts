import { Test, TestingModule } from '@nestjs/testing';
import { KafkaController } from './kafka.controller';
import { KafkaService } from './kafka.service';
import { Logger } from '@nestjs/common';

describe('Kafka Controller', () => {
  let controller: KafkaController;
  let kafkaService: KafkaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KafkaController],
      providers: [KafkaService, Logger],
    }).compile();

    controller = module.get<KafkaController>(KafkaController);
    kafkaService = module.get<KafkaService>(KafkaService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('consume/:topic', () => {
    it('should return a boolean', async () => {
      jest.spyOn(kafkaService, 'consume').mockImplementation(() => true);
      expect(controller.consume('test')).toBe(true);
    });
  });
});
