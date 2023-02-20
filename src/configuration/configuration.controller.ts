import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { ConfigurationService } from './configuration.service';
import {
  AddConfigurationRequest,
  GetConfigurationRequest,
} from './requests/configuration.request';

@Controller()
export class ConfigurationController {
  constructor(private configurationService: ConfigurationService) {}

  @GrpcMethod('ConfigGrpcService', 'AddConfigurationEntry')
  addConfigurationEntry(request: AddConfigurationRequest) {
    return this.configurationService.addConfigurationEntry(request);
  }

  @GrpcMethod('ConfigGrpcService', 'GetConfigurationEntry')
  getConfigurationEntry(request: GetConfigurationRequest) {
    return this.configurationService.getConfigurationEntry(request);
  }
}
