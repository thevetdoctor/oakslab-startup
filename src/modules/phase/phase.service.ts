import { Inject, Injectable } from '@nestjs/common';
import { Phase } from 'src/entities';
import { PHASE_REPOSITORY } from 'src/utils';

@Injectable()
export class PhaseService {
  constructor(
    @Inject(PHASE_REPOSITORY) private readonly phaseModel: typeof Phase,
  ) {}

  async findOneById(id: string): Promise<Phase> {
    const phase = await this.phaseModel.findOne({
      where: {
        id,
      },
    });
    return phase?.['dataValues'];
  }

  async findOneByTitle(title: string): Promise<Phase> {
    const phase = await this.phaseModel.findOne({
      where: {
        title,
      },
    });
    return phase?.['dataValues'];
  }

  async findAllPhases(): Promise<Phase[]> {
    return await this.phaseModel.findAll({
      order: [['createdAt', 'ASC']],
    });
  }

  async createPhase(payload): Promise<Phase> {
    return await this.phaseModel.create(payload);
  }
}
