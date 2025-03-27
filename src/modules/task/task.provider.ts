import { Task, Phase, CompanyTask } from 'src/entities';
import {
  TASK_REPOSITORY,
  PHASE_REPOSITORY,
  COMPANY_TASK_REPOSITORY,
} from 'src/utils';

export const TaskProviders = [
  {
    provide: TASK_REPOSITORY,
    useValue: Task,
  },
  {
    provide: PHASE_REPOSITORY,
    useValue: Phase,
  },
  {
    provide: COMPANY_TASK_REPOSITORY,
    useValue: CompanyTask,
  },
];
