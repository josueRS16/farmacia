import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class ChangePasswordDto {
  @ApiProperty({ description: 'Current password of the user' })
  @IsString()
  currentPassword: string;

  @ApiProperty({ description: 'New password of the user' })
  @IsString()
  @MinLength(6)
  newPassword: string;
}