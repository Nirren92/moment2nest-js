import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  console.log('MongoDB URI:', process.env.AZURE_URL);
  const port = process.env.PORT || 8080; 
  await app.listen(port);
  console.log(`Application is running on: http://localhost:${port}`);
}
bootstrap();
