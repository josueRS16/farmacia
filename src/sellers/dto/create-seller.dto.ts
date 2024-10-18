import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, IsDateString, IsInt } from 'class-validator';

export class CreateSellerDto {
  @ApiProperty({ description: 'First name of the seller' })
  @IsString()
  @MaxLength(100)
  firstName: string;

  @ApiProperty({ description: 'Last name of the seller' })
  @IsString()
  @MaxLength(100)
  lastName: string;

  @ApiProperty({ description: 'Phone number of the seller' })
  @IsString()
  @MaxLength(20)
  phone: string;

  @ApiProperty({ description: 'Hire date of the seller' })
  @IsDateString()
  hireDate: Date;

  @ApiProperty({ description: 'ID of the branch where the seller works' })
  @IsInt()
  branchId: number;
}