import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateBranchDto {
  @ApiProperty({ description: 'Name of the branch' })
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({ description: 'Phone number of the branch' })
  @IsString()
  @MaxLength(20)
  phone: string;

  @ApiProperty({ description: 'Manager of the branch' })
  @IsString()
  @MaxLength(100)
  manager: string;
}