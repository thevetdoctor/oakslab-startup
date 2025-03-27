import { Sequelize, ModelCtor } from 'sequelize-typescript';
import { Company } from 'src/entities/company.model';
import { CompanyTask } from 'src/entities/companytask.model';
import { Phase } from 'src/entities/phase.model';
import { Task } from 'src/entities/task.model';

export const DatabaseProviders = [
  {
    provide: Sequelize,
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'sqlite',
        storage: ':memory:',
        logging: false,
      });

      sequelize.addModels([Company, Phase, Task, CompanyTask]);

      Phase.hasMany(Task, {
        foreignKey: 'phaseId',
      });
      Task.belongsTo(Phase, {
        foreignKey: 'phaseId',
      });
      Company.belongsToMany(Task, {
        foreignKey: 'companyId',
        as: 'tasks',
        through: CompanyTask,
      });
      Task.belongsToMany(Company, {
        foreignKey: 'taskId',
        as: 'tasks',
        through: CompanyTask,
      });

      await sequelize.sync({ alter: true });
      return sequelize;
    },
  },
];
