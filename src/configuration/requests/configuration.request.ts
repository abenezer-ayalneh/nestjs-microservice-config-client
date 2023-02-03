import { Optional } from '@nestjs/common';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddConfigurationRequest {
  @IsString({ message: 'Configuration name should be a string' })
  @IsNotEmpty({ message: 'Configuration name should not be empty' })
  name: string;

  @IsString({ message: 'Configuration value should be a string' })
  @IsNotEmpty({ message: 'Configuration value should not be empty' })
  value: string;

  @Type(() => Number)
  @IsInt({ message: 'Application ID must be a number' })
  @IsNotEmpty({ message: 'Application ID should not be empty' })
  applicationId: number;
}

export class GetConfigurationRequest {
  @Type(() => Number)
  @IsInt({ message: 'Application ID must be a number' })
  @IsNotEmpty({ message: 'Application ID should not be empty' })
  applicationId: number;

  @IsString({ message: 'Configuration name should be a string' })
  @IsOptional()
  name?: string | null | undefined;
}
