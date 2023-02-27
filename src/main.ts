import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { parse } from 'yaml';
import * as dotenv from 'dotenv';
import { ClassSerializerInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

dotenv.config();

const PORT_DEFAULT = 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(app.get(Reflector)));

  const swaggerFile = await readFile('doc/api.yaml', 'utf-8');
  const openAPIObject = parse(swaggerFile);
  SwaggerModule.setup('doc', app, openAPIObject);

  app.useGlobalPipes(new ValidationPipe());

  const port = process.env.PORT || PORT_DEFAULT;
  await app.listen(port);
}
bootstrap();
