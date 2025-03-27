import { INestApplication } from '@nestjs/common';
import { PhaseService } from 'src/modules/phase/phase.service';
import { TaskService } from 'src/modules/task/task.service';

export default async function seed(app: INestApplication) {
  const phaseService = app.get(PhaseService);
  const taskService = app.get(TaskService);

  const phaseOne = await phaseService.createPhase({
    title: 'Foundation',
    order: 1,
    description: 'Foundation',
  });
  const phaseOneId = phaseOne['dataValues']['id'];
  await taskService.createTask({
    title: 'Setup Virtual Office',
    order: 1,
    description: 'Setup Virtual Office',
    phaseId: phaseOneId,
  });
  await taskService.createTask({
    title: 'Set Mission & Vision',
    order: 2,
    description: 'Set Mission & Vision',
    phaseId: phaseOneId,
  });
  await taskService.createTask({
    title: 'Select Business Name',
    order: 3,
    description: 'Select Business Name',
    phaseId: phaseOneId,
  });
  await taskService.createTask({
    title: 'Buy Domains',
    order: 4,
    description: 'Buy Domains',
    phaseId: phaseOneId,
  });

  const phaseTwo = await phaseService.createPhase({
    title: 'Discovery',
    order: 2,
    description: 'Discovery',
  });
  const phaseTwoId = phaseTwo['dataValues']['id'];
  await taskService.createTask({
    title: 'Create Roadmap',
    order: 5,
    description: 'Create Roadmap',
    phaseId: phaseTwoId,
  });
  await taskService.createTask({
    title: 'Competitor Analysis',
    order: 6,
    description: 'Competitor Analysis',
    phaseId: phaseTwoId,
  });

  const phaseThree = await phaseService.createPhase({
    title: 'Delivery',
    order: 3,
    description: 'Delivery',
  });
  const phaseThreeId = phaseThree['dataValues']['id'];
  await taskService.createTask({
    title: 'Release Marketing Website',
    order: 7,
    description: 'Release Marketing Website',
    phaseId: phaseThreeId,
  });
  await taskService.createTask({
    title: 'Release MVP',
    order: 8,
    description: 'Release MVP',
    phaseId: phaseThreeId,
  });
}
