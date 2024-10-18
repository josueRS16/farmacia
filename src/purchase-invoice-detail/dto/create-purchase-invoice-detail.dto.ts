import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, IsDateString } from 'class-validator';

export class CreatePurchaseInvoiceDetailDto {
  @ApiProperty({ description: 'ID del producto' })
  @IsNumber()
  productId: number;

  @ApiProperty({ description: 'Cantidad del producto' })
  @IsNumber()
  quantity: number;

  @ApiProperty({ description: 'Precio unitario del producto' })
  @IsNumber()
  unitPrice: number;

  @ApiProperty({ description: 'Número de lote del producto' })
  @IsString()
  lotNumber: string;

  @ApiProperty({ description: 'Fecha de caducidad del producto' })
  @IsDateString()
  expireDate: Date;
}