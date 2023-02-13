import { COMPANY_TASK_REPOSITORY, PHASE_REPOSITORY, TASK_REPOSITORY } from "src/constants";
import { CompanyTask } from "src/entities/companytask.model";
import { Phase } from "src/entities/phase.model";
import { Task } from "src/entities/task.model";

export const TaskProviders = [{
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
}];