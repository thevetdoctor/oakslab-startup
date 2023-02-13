import { Test, TestingModule } from '@nestjs/testing';
import { CompanyModule } from '../company/company.module';
import { PhaseModule } from '../phase/phase.module';
import { TaskModule } from './task.module';
import { TaskProviders } from './task.provider';
import { TaskResolver } from './task.resolver';
import { TaskService } from './task.service';

describe('TaskResolver', () => {
  let resolver: TaskResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TaskModule, CompanyModule, PhaseModule],
      providers: [TaskResolver, ...TaskProviders],
    }).compile();

    resolver = module.get<TaskResolver>(TaskResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
