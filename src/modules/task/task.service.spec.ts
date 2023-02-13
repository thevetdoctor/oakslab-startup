import { Test, TestingModule } from '@nestjs/testing';
import { Task } from 'src/entities/task.model';
import { CompanyTask } from 'src/entities/companytask.model';
import { TaskService } from './task.service';
import { TaskProviders } from './task.provider';

describe('TaskService', () => {
  let service: TaskService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TaskService, ...TaskProviders],
    }).compile();

    service = module.get<TaskService>(TaskService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
