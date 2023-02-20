import { Application } from '.prisma/client';
import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { AddApplicationRequest } from 'src/application/requests/application.request';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class ApplicationService {
  constructor(private prisma: PrismaService) {}

  async addApplicationEntry(
    request: AddApplicationRequest,
  ): Promise<Application> {
    try {
      return await this.prisma.application.create({
        data: request,
      });
    } catch (exception) {
      if (exception instanceof PrismaClientKnownRequestError) {
        switch (exception.code) {
          case 'P2002':
            throw new RpcException({
              message: 'Entry exists on the system',
              statusCode: HttpStatus.UNPROCESSABLE_ENTITY,
            });
          default:
            throw new RpcException({
              message: exception.message,
              statusCode: 400,
            });
        }
      } else {
        throw new RpcException({
          message: exception.message,
          statusCode: 400,
        });
      }
    }
  }
}
