import { Sequelize, ModelCtor } from 'sequelize-typescript';

export const DatabaseProviders = [{
    provide: Sequelize,
    useFactory: async() => {
        const sequelize = new Sequelize({ 
            dialect: 'sqlite',
            storage: ':memory:',
            logging: false,
        });
        
        sequelize.addModels([]);

        await sequelize.sync({alter: true});
        return sequelize; 
    }
}]
