import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  console.log('MongoDB URI:', process.env.MONGO_URI);
  
  await app.listen(process.env.PORT ?? 8080);
}
bootstrap();
