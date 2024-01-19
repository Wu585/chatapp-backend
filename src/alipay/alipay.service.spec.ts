import { Test, TestingModule } from '@nestjs/testing';
import { AlipayService } from './alipay.service';

describe('AlipayService', () => {
  let service: AlipayService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlipayService],
    }).compile();

    service = module.get<AlipayService>(AlipayService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
