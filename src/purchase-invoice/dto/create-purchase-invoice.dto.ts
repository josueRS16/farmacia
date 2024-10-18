import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsNumber,
  IsString,
  IsNotEmpty,
  ValidateNested,
  IsArray,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePurchaseInvoiceDetailDto } from '../../purchase-invoice-detail/dto/create-purchase-invoice-detail.dto';

export class CreatePurchaseInvoiceDto {
  @ApiProperty({ description: 'Fecha de la factura' })
  @IsDateString()
  date: Date;

  @ApiProperty({ description: 'Total de la factura' })
  @IsNumber()
  total: number;

  @ApiProperty({ description: 'Método de pago' })
  @IsString()
  @IsNotEmpty()
  paymentMethod: string;

  @ApiProperty({ description: 'Negociaciones de precios en precio unitario', required: false })
  @IsOptional()
  @IsString()
  negotiatedPrices?: string;

  @ApiProperty({ description: 'ID del proveedor' })
  @IsNumber()
  supplierId: number;

  @ApiProperty({ description: 'ID del almacén' })
  @IsNumber()
  warehouseId: number;

  @ApiProperty({
    description: 'Detalles de la factura de compra',
    type: [CreatePurchaseInvoiceDetailDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePurchaseInvoiceDetailDto)
  details: CreatePurchaseInvoiceDetailDto[];
}