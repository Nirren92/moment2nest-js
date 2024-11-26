import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  console.log('MongoDB URI:', "mongodb+srv://nibor:MongoDB1@moment1dt209g.mongocluster.cosmos.azure.com/?tls=true&authMechanism=SCRAM-SHA-256&retrywrites=false&maxIdleTimeMS=120000");

  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
