import { Test, TestingModule } from '@nestjs/testing';
import { PhaseProviders } from './phase.provider';
import { PhaseService } from './phase.service';

describe('PhaseService', () => {
  let service: PhaseService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PhaseService, ...PhaseProviders],
    }).compile();

    service = module.get<PhaseService>(PhaseService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
