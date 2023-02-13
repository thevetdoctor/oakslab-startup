import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import seed from './utils/seed';

async function bootstrap() {
  const port = process.env.PORT ?? 3000;
  const app = await NestFactory.create(AppModule);

  seed(app);
  
  await app.listen(port);
  const app_url = await app.getUrl();
  
  console.log(`Application is running on: ${app_url}`);
  console.log(`GraphQL Playground URL: ${app_url}/graphql`);
}
bootstrap();
