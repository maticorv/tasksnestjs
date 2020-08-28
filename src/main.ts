import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import * as config from 'config';

async function bootstrap() {
  const logger = new Logger('bootstrap');
  const app = await NestFactory.create(AppModule);
  if (process.env.NODE_ENV === 'development') {
    app.enableCors();
  } else {
    app.enableCors({origin: config.server.origin});
    logger.log(`Accepting requests from origin ${config.server.origin}`)
  }
  const port = process.env.PORT || config.get('server').get('port');

  await app.listen(port);
  logger.log(`Aplicacion corriendo en puerto ${port}`)
}
bootstrap();
