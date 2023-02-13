import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddConfigurationRequest {
  @IsString({ message: 'validation.CONFIGURATION_NAME_SHOULD_BE_STRING' })
  @IsNotEmpty({ message: 'validation.CONFIGURATION_NAME_SHOULD_NOT_BE_EMPTY' })
  name: string;

  @IsString({ message: 'validation.CONFIGURATION_VALUE_SHOULD_BE_STRING' })
  @IsNotEmpty({ message: 'validation.CONFIGURATION_VALUE_SHOULD_NOT_BE_EMPTY' })
  value: string;

  @Type(() => Number)
  @IsInt({ message: 'validation.APPLICATION_ID_SHOULD_BE_NUMBER' })
  @IsNotEmpty({ message: 'validation.APPLICATION_ID_SHOULD_NOT_BE_EMPTY' })
  applicationId: number;
}

export class GetConfigurationRequest {
  @Type(() => Number)
  @IsInt({ message: 'validation.APPLICATION_ID_SHOULD_BE_NUMBER' })
  @IsNotEmpty({ message: 'validation.APPLICATION_ID_SHOULD_NOT_BE_EMPTY' })
  applicationId: number;

  @IsString({ message: 'validation.CONFIGURATION_NAME_SHOULD_BE_STRING' })
  @IsOptional()
  name?: string | null | undefined;
}
