import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class ResetPasswordDto {
  @ApiProperty({ description: 'Verification code sent to the user email' })
  @IsString()
  code: string;

  @ApiProperty({ description: 'New password for the user' })
  @IsString()
  @MinLength(6)
  newPassword: string;
}