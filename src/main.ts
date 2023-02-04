import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule } from '@nestjs/swagger';
import { readFile } from 'fs/promises';
import { parse } from 'yaml';

const PORT_DEFAULT = 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const file = await readFile('doc/api.yaml', 'utf-8');
  const openAPIObject = parse(file);

  SwaggerModule.setup('doc', app, openAPIObject);

  const port = process.env.PORT || PORT_DEFAULT;
  await app.listen(port);
}
bootstrap();
