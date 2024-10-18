import { ApiProperty } from '@nestjs/swagger';
import { Expose, Type } from 'class-transformer';
import { IsNumber, IsDateString } from 'class-validator';
import { Product } from 'src/products/entities/product.entity';

export class CreateSalesInvoiceDetailDto {
  @ApiProperty({ description: 'ID del producto vendido' })
  @IsNumber()
  productId: number;

  @ApiProperty({ description: 'Cantidad vendida' })
  @IsNumber()
  quantity: number;

  @ApiProperty({ description: 'Precio unitario de venta' })
  @IsNumber()
  unitPrice: number;

  @ApiProperty({ description: 'Fecha de venta' })
  @IsDateString()
  date: Date;
}

export class SalesInvoiceDetailDto {
  @ApiProperty()
  @Expose()
  salesInvoiceDetailId: number;

  @ApiProperty()
  @Expose()
  quantity: number;

  @ApiProperty()
  @Expose()
  unitPrice: number;

  @ApiProperty()
  @Expose()
  date: Date;

  @ApiProperty({ type: () => Product })
  @Type(() => Product)
  @Expose()
  product: Product;
}