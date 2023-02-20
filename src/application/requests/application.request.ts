import { IsNotEmpty, IsString } from 'class-validator';

export class AddApplicationRequest {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  version: string;
}
