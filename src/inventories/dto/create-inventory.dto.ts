import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsDateString } from 'class-validator';

export class CreateInventoryDto {
  @ApiProperty({ description: 'ID del producto' })
  @IsNumber()
  productId: number;

  @ApiProperty({ description: 'ID del almacén' })
  @IsNumber()
  warehouseId: number;

  @ApiProperty({ description: 'Número de lote del producto' })
  @IsString()
  lotNumber: string;

  @ApiProperty({ description: 'Cantidad disponible del lote' })
  @IsNumber()
  quantity: number;

  @ApiProperty({ description: 'Fecha de ingreso al inventario' })
  @IsDateString()
  startDate: Date;

  @ApiProperty({ description: 'Fecha de caducidad del lote' })
  @IsDateString()
  expireDate: Date;
}