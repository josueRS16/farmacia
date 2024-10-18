import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, MaxLength, IsEmail } from 'class-validator';

export class CreateSupplierDto {
  @ApiProperty({ description: 'Nombre del proveedor' })
  @IsString()
  @MaxLength(100)
  name: string;

  @ApiProperty({ description: 'Persona de contacto', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(100)
  contact?: string;

  @ApiProperty({ description: 'Dirección del proveedor', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(200)
  address?: string;

  @ApiProperty({ description: 'Teléfono del proveedor', required: false })
  @IsOptional()
  @IsString()
  @MaxLength(20)
  phone?: string;

  @ApiProperty({ description: 'Email del proveedor', required: false })
  @IsOptional()
  @IsEmail()
  @MaxLength(100)
  email?: string;

  @ApiProperty({ description: 'Condiciones de pago', required: false })
  @IsOptional()
  @IsString()
  paymentTerms?: string;
}