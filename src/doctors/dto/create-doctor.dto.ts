import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, IsOptional, IsInt } from 'class-validator';

export class CreateDoctorDto {
  @ApiProperty({ description: 'First name of the doctor' })
  @IsString()
  @MaxLength(100)
  firstName: string;

  @ApiProperty({ description: 'Last name of the doctor' })
  @IsString()
  @MaxLength(100)
  lastName: string;

  @ApiProperty({ description: 'Specialty of the doctor' })
  @IsString()
  @MaxLength(100)
  specialty: string;

  @ApiProperty({ description: 'Phone number of the doctor' })
  @IsString()
  @MaxLength(20)
  phone: string;

  @ApiProperty({ description: 'Address of the doctor' })
  @IsString()
  @MaxLength(200)
  address: string;

  @ApiProperty({ description: 'ID of the branch where the doctor works', required: false })
  @IsOptional()
  @IsInt()
  branchId?: number;
}