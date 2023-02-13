import { Sequelize, ModelCtor } from 'sequelize-typescript';
import { Company } from 'src/entities/company.model';
import { Phase } from 'src/entities/phase.model';

export const DatabaseProviders = [{
    provide: Sequelize,
    useFactory: async() => {
        const sequelize = new Sequelize({ 
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
        });
        
        sequelize.addModels([Company, Phase]);

        await sequelize.sync({alter: true});
        return sequelize; 
    }
}]
