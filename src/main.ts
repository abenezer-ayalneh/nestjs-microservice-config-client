import { HttpStatus, ValidationError, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  MicroserviceOptions,
  RpcException,
  Transport,
} from '@nestjs/microservices';
import { join } from 'path';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.GRPC,
      options: {
        package: 'config',
        protoPath: join(__dirname, 'proto/config.proto'),
      },
    },
  );

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      exceptionFactory: (errors: ValidationError[]) => {
        return errors.map((error) => {
          throw new RpcException({
            message: error.constraints
              ? Object.values(error.constraints)[0]
              : null,
            statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
            errors: error.constraints ? Object.values(error.constraints) : null,
          });
        });
      },
    }),
  );

  await app.listen();
}
bootstrap();
