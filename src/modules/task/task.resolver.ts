import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { TaskService } from './task.service';
import { CreateTaskDTO, DoTaskDTO } from './dto/task.dto';
import { Task } from '../../entities/task.model';
import { CompanyService } from '../company/company.service';
import { PhaseService } from '../phase/phase.service';
import { CompanyTask } from 'src/entities/companytask.model';

@Resolver()
export class TaskResolver {
    constructor(
      private readonly taskService: TaskService,
      private readonly companyService: CompanyService,
      private readonly phaseService: PhaseService,
      ) {}

    @Query(() => [Task])
    async getTasks(): Promise<Task[]> {
      const tasks = await this.taskService.findAllTasks();
      
      return tasks;
    }

    @Query(() => [CompanyTask])
    async getTasksByCompany(@Args('companyId') companyId: string): Promise<CompanyTask[]> {
      const tasks = await this.taskService.findAllTasksByCompanyId(companyId);
      
      return tasks;
    }
    
    @Mutation(() => Task)
    async createTask(@Args('task') task: CreateTaskDTO): Promise<Task> {
      const taskExist = await this.taskService.findOneByTitle(task.title);
      if (taskExist) {
        throw new NotFoundException('Task already exist'); 
      }
      return await this.taskService.createTask(task);
    }

    @Mutation(() => CompanyTask)
    async doTask(@Args('task') task: DoTaskDTO): Promise<CompanyTask|any> {

      const companyExist = await this.companyService.findOneById(task.companyId);
      if (!companyExist) { 
        throw new NotFoundException('Company not found'); 
      }
      const taskExist = await this.taskService.findOneById(task.taskId);
      if (!taskExist) { 
        throw new NotFoundException('Task not found');
      }
        
        // check if current task is eligible at this stage

        // Identify current phase
        const getPhase = await this.phaseService.findOneById(taskExist.phaseId);

        // If there are previous phases
        if (getPhase.order > 1) {
  
          const phases = await this.phaseService.findAllPhases();
          const prevPhases = phases.map(x => ({ id: x['dataValues']['id'], order: x['dataValues']['order'], title: x['dataValues'].title }) ).filter(y => y.order < getPhase.order);

          for (const phase of prevPhases) {

            // Loop through each previous phase
            const tasks = await this.taskService.findAllTasksByPhaseId(phase.id);
            const prevTasks = tasks.map(x => ({ id: x['dataValues']['id'], order: x['dataValues']['order'], title: x['dataValues'].title }) ).filter(y => y.order < taskExist.order);

            // Loop through each previous tasks (if any, and if pending)
            if (prevTasks.length) {
              for (const _task of prevTasks) {

              const companyPreviousTaskExist = await this.taskService.findCompanyTask({task, phaseId: phase.id});

              // Check if any previous tasks are pending)
              if (!companyPreviousTaskExist || (companyPreviousTaskExist && companyPreviousTaskExist.status === 'pending')) {
                throw new NotFoundException(`Task with title "${_task.title}" pending in Phase with title "${phase.title}"`);
                }
              }
            }
          }
          // If there is no previous phase
        } else {
          const tasks = await this.taskService.findAllTasksByPhaseId(taskExist.phaseId);
            const prevTasks = tasks.map(x => ({ id: x['dataValues']['id'], order: x['dataValues']['order'], title: x['dataValues'].title }) ).filter(y => y.order < taskExist.order);

            // Loop through each previous tasks (if any, and if pending)
            if (prevTasks.length) {
              for (const _task of prevTasks) {
                const taskPayload = { companyId: task.companyId, taskId: _task.id };
                const companyPreviousTaskExist = await this.taskService.findCompanyTask({task: taskPayload, phaseId: getPhase.id});

              // Check if any previous tasks are pending)
                if (!companyPreviousTaskExist || (companyPreviousTaskExist && companyPreviousTaskExist.status === 'pending')) {
                  throw new NotFoundException(`Task with title "${_task.title}" pending in Phase with title "${getPhase.title}"`);
                } 
              }
            }
        }
        // Attempt current task once 'previous task' usecases are taken care of
      const companyTaskExist = await this.taskService.findCompanyTask({task, phaseId: taskExist.phaseId});
      if (!companyTaskExist) {
        return await this.taskService.doTask({task, phaseId: taskExist.phaseId, status: 'done'});

      } else if (companyTaskExist && companyTaskExist.status === 'done'){
        // Change current task status to "pending" is previously "done"
        return await this.taskService.updateTask({task, phaseId: taskExist.phaseId, status: 'pending'});
      } else {
        // Change curremt task status to "done" is previously "pending"
        return await this.taskService.updateTask({task, phaseId: taskExist.phaseId, status: 'done'});
      }
    }
}
