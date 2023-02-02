import { IsNotEmpty, IsString } from 'class-validator';

export class AddConfigurationRequest {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  value: string;
}

export class GetConfigurationRequest {
  @IsNotEmpty()
  @IsString()
  name: string;
}
