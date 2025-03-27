import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { port } from './utils';
import seed from './utils/util.seed';

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule);

    seed(app);

    await app.listen(port);
    const app_url = await app.getUrl();

    console.log(`Application is running on: ${app_url}`);
    console.log(`GraphQL Playground URL: ${app_url}/graphql`);
  } catch (err) {
    console.error('Error starting the application:', err);
  }
}
bootstrap();
