import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { AddApplicationRequest } from 'src/application/requests/application.request';
import { ApplicationService } from './application.service';

@Controller('configuration/application')
export class ApplicationController {
  constructor(private applicationService: ApplicationService) {}

  @GrpcMethod('ConfigGrpcService', 'AddApplicationEntry')
  addApplicationEntry(request: AddApplicationRequest) {
    return this.applicationService.addApplicationEntry(request);
  }
}
