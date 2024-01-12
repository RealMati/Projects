import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as cookieParser from 'cookie-parser'
import { json } from 'express'

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors()
  app.use(cookieParser())
  app.useGlobalPipes(new ValidationPipe())
  app.useStaticAssets(join(__dirname, '..', 'public')); // Public assets (stylesheets, images, etc.)
  app.useStaticAssets(join(__dirname, '..', 'local')); // Local assets (album thumbnails, etc.)

  app.setBaseViewsDir(join(__dirname, "..", "views"))

  app.setViewEngine('hbs')
  await app.listen(3000);
}

bootstrap();