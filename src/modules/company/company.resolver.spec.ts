import { Test, TestingModule } from '@nestjs/testing';
import { CompanyModule } from './company.module';
import { CompanyProviders } from './company.provider';
import { CompanyResolver } from './company.resolver';

describe('CompanyResolver', () => {
  let resolver: CompanyResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CompanyModule],
      providers: [CompanyResolver, ...CompanyProviders],
    }).compile();

    resolver = module.get<CompanyResolver>(CompanyResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
