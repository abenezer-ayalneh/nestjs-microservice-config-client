import { HttpStatus, Injectable } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Configuration } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime';
import { PrismaService } from 'src/prisma/prisma.service';
import {
  AddConfigurationRequest,
  GetConfigurationRequest,
} from './requests/configuration.request';

@Injectable()
export class ConfigurationService {
  constructor(private prisma: PrismaService) {}
  async addConfigurationEntry(request: AddConfigurationRequest) {
    try {
      return await this.prisma.configuration.create({
        data: {
          name: request.name,
          value: request.value,
          // applicationId: request.applicationId,
          application: {
            connect: { id: request.applicationId },
          },
        },
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

  async getConfigurationEntry(request: GetConfigurationRequest) {
    try {
      let configuration: object = {};
      if (request.name) {
        configuration = await this.prisma.configuration.findUnique({
          where: {
            name_applicationId: {
              name: request.name,
              applicationId: request.applicationId,
            },
          },
        });
      } else {
        const configsFromDb: Configuration[] =
          await this.prisma.configuration.findMany({
            where: {
              applicationId: request.applicationId,
            },
          });

        configsFromDb.forEach((config) => {
          configuration[config.name] = config.value;
        });
      }

      return configuration;
    } catch (exception) {
      throw new RpcException({
        message: exception.message,
        statusCode: 400,
      });
    }
  }
}
