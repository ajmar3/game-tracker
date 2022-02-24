import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app/app.module';
import { appConfig } from './config'

async function bootstrap() {

  process.env.JWT_TOKEN_SECRET = appConfig.JWT_TOKEN_SECRET;
  process.env.PORT = appConfig.PORT
  process.env.FRONTEND = appConfig.FRONTEND

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Game Tracker')
  .setDescription('API for game tracking app')
  .setVersion('1.0')
  .addTag('users')
  .build();
  
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  app.enableCors({credentials: true, origin: process.env.FRONTEND})
  await app.listen(process.env.PORT);
}
bootstrap();
