import { Module } from '@nestjs/common';
import { CompanyModule } from '../company/company.module';
import { PhaseModule } from '../phase/phase.module';
import { TaskProviders } from './task.provider';
import { TaskResolver } from './task.resolver';
import { TaskService } from './task.service';

@Module({
  imports: [CompanyModule, PhaseModule],
  providers: [TaskService, TaskResolver, ...TaskProviders],
  exports: [...TaskProviders, TaskService],
})
export class TaskModule {}
