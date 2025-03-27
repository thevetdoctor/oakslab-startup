import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DatabaseModule } from './database/database.module';
import { CompanyModule } from './modules/company/company.module';
import { PhaseModule } from './modules/phase/phase.module';
import { TaskModule } from './modules/task/task.module';
import { LoggerMiddleware, GatewayAuthMiddleware } from './middlewares';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql',
      playground: true,  // Ensure Playground is enabled
      introspection: true, // Allow introspection queries
      persistedQueries: false,
    }),
    DatabaseModule,
    CompanyModule,
    PhaseModule,
    TaskModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  [x: string]: any;
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*'); // Protect all routes
    consumer.apply(GatewayAuthMiddleware).forRoutes('*'); // Protect all routes
  }
}
