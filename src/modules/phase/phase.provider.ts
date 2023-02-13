import { PHASE_REPOSITORY } from "../../constants";
import { Phase } from "../../entities/phase.model";

export const PhaseProviders = [{
    provide: PHASE_REPOSITORY,
    useValue: Phase,
}];