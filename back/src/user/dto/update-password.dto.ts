import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class UpdatePasswordDTO {
  @ApiProperty()
  @IsString()
  @MinLength(8)
  password?: string;
}
