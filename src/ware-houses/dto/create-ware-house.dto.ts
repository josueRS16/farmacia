import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength } from 'class-validator';

export class CreateWarehouseDto {
  @ApiProperty({ description: 'Name of the warehouse' })
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({ description: 'Phone number of the warehouse' })
  @IsString()
  @MaxLength(20)
  phone: string;

  @ApiProperty({ description: 'Address of the warehouse' })
  @IsString()
  @MaxLength(200)
  address: string;

  @ApiProperty({ description: 'Manager of the warehouse' })
  @IsString()
  @MaxLength(100)
  manager: string;
}