import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { ConfigurationService } from './configuration.service';
import {
  AddConfigurationRequest,
  GetConfigurationRequest,
} from './requests/configuration.request';

@Controller('configuration')
export class ConfigurationController {
  constructor(private configurationService: ConfigurationService) {}

  @MessagePattern({ cmd: 'addConfigurationEntry' })
  addConfigurationEntry(request: AddConfigurationRequest) {
    return this.configurationService.addConfigurationEntry(request);
  }

  @MessagePattern({ cmd: 'getConfigurationEntry' })
  getConfigurationEntry(request: GetConfigurationRequest) {
    return this.configurationService.getConfigurationEntry(request);
  }
}
