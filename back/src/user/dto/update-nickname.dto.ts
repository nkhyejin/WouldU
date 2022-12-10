import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class UpdateNicknameDto {
  @ApiProperty()
  @IsString()
  nickname: string;
}
