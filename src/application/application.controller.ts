import { Controller, Post } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ConfigurationService } from 'src/configuration/configuration.service';
import { AddApplicationRequest } from 'src/application/requests/application.request';
import { AddConfigurationRequest } from 'src/configuration/requests/configuration.request';
import { ApplicationService } from './application.service';

@Controller('configuration/application')
export class ApplicationController {
  constructor(private applicationService: ApplicationService) {}

  @MessagePattern({ cmd: 'addApplicationEntry' })
  addApplicationEntry(request: AddApplicationRequest) {
    return this.applicationService.addApplicationEntry(request);
  }
}
