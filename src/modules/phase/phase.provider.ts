import { Phase } from 'src/entities';
import { PHASE_REPOSITORY } from 'src/utils';

export const PhaseProviders = [
  {
    provide: PHASE_REPOSITORY,
    useValue: Phase,
  },
];
