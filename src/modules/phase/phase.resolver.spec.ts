import { Test, TestingModule } from '@nestjs/testing';
import { PhaseModule } from './phase.module';
import { PhaseProviders } from './phase.provider';
import { PhaseResolver } from './phase.resolver';

describe('PhaseResolver', () => {
  let resolver: PhaseResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [PhaseModule],
      providers: [PhaseResolver, ...PhaseProviders],
    }).compile();

    resolver = module.get<PhaseResolver>(PhaseResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
