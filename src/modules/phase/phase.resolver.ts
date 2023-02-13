import { NotFoundException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { PhaseService } from './phase.service';
import { CreatePhaseDTO } from './dto/phase.dto';
import { Phase } from '../../entities/phase.model';

@Resolver()
export class PhaseResolver {
    constructor(private readonly phaseService: PhaseService) {}

    @Query(() => [Phase])
    async getPhases(): Promise<Phase[]> {
      const phases = await this.phaseService.findAllPhases();
      return phases;
    }

    @Mutation(() => Phase)
    async createPhase(@Args('phase') phase: CreatePhaseDTO): Promise<Phase> {
      const phaseExist = await this.phaseService.findOneByTitle(phase.title);
      if (phaseExist) {
        throw new NotFoundException('Phase already exist');
      }
      return await this.phaseService.createPhase(phase);
    }
}
