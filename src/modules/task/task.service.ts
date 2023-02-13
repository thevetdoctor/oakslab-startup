import { Inject, Injectable } from '@nestjs/common';
import { COMPANY_TASK_REPOSITORY, PHASE_REPOSITORY, TASK_REPOSITORY } from 'src/constants';
import { CompanyTask } from 'src/entities/companytask.model';
import { Phase } from 'src/entities/phase.model';
import { Task } from 'src/entities/task.model';

@Injectable()
export class TaskService {
  constructor(
    @Inject(TASK_REPOSITORY) private readonly taskModel: typeof Task,
    @Inject(PHASE_REPOSITORY) private readonly phaseModel: typeof Phase,
    @Inject(COMPANY_TASK_REPOSITORY) private readonly companyTaskModel: typeof CompanyTask
    ) {}
  
    async findOneById(id: string): Promise<Task> {
      const task = await this.taskModel.findOne({
        where: {
          id
        }
      });
      return task?.['dataValues'];
    }

    async findOneByTitle(title: string): Promise<Task> {
      const task = await this.taskModel.findOne({
        where: {
          title
        }
      });
      return task?.['dataValues'];
  }

    async findAllTasks(): Promise<Task[]> {
      return await this.taskModel.findAll({
        order: [['createdAt', 'ASC']]
      });
  }

  async findAllTasksByCompanyId(companyId): Promise<CompanyTask[]> {
    return await this.companyTaskModel.findAll({
      where: {
        companyId
      },
      order: [['createdAt', 'ASC']]
    });
}

  async findAllTasksByPhaseId(phaseId: string): Promise<Task[]> {
    return await this.taskModel.findAll({
      where: {
        phaseId
      },
      order: [['createdAt', 'ASC']]
    });
}

    async createTask(payload): Promise<Task> {
      return await this.taskModel.create(payload);
    }

    async findCompanyTask(payload): Promise<CompanyTask> {
      const { task: { companyId, taskId }, phaseId } = payload;
      const task = await this.companyTaskModel.findOne({
        where: {
          companyId,
          phaseId,
          taskId,
        }
      });
      return task?.['dataValues'];
  }

    async doTask(payload): Promise<CompanyTask> {
      const { task: { companyId, taskId }, phaseId, status } = payload;
      return await this.companyTaskModel.create<CompanyTask>({ 
        status, companyId, taskId, phaseId });
    }
 
    async updateTask(payload): Promise<CompanyTask> {
      const { task: { companyId, taskId }, phaseId, status } = payload;
      await this.companyTaskModel.update<CompanyTask>({ status }, { 
        where : {
        companyId, 
        phaseId,
        taskId
      }
    });
    return await this.findCompanyTask(payload);
  }
}
