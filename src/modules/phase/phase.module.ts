import { Module } from '@nestjs/common';
import { PhaseProviders } from './phase.provider';
import { PhaseResolver } from './phase.resolver';
import { PhaseService } from './phase.service';

@Module({
  providers: [PhaseResolver, PhaseService, ...PhaseProviders],
  exports: [PhaseService, ...PhaseProviders],
})
export class PhaseModule {}
