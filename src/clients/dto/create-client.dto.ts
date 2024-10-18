import { ApiProperty } from '@nestjs/swagger';
import { IsString, MaxLength, IsOptional, IsEmail } from 'class-validator';

export class CreateClientDto {
  @ApiProperty({ description: 'Nombre del cliente' })
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({ description: 'Apellido del cliente' })
  @IsString()
  @MaxLength(100)
  lastName: string;

  @ApiProperty({ description: 'Dirección del cliente', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  address?: string;

  @ApiProperty({ description: 'Teléfono del cliente', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @ApiProperty({ description: 'Email del cliente', required: false })
  @IsOptional()
  @IsEmail()
  @MaxLength(100)
  email?: string;
}