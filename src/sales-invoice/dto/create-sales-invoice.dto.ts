import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsString, ValidateNested, IsArray } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { CreateSalesInvoiceDetailDto, SalesInvoiceDetailDto } from '../../sales-invoice-detail/dto/create-sales-invoice-detail.dto';
import { Client } from 'src/clients/entities/client.entity';

export class CreateSalesInvoiceDto {
  @ApiProperty({ description: 'Fecha de la venta' })
  @IsDateString()
  saleDate: Date;

  @ApiProperty({ description: 'Total de la venta' })
  @IsNumber()
  total: number;

  @ApiProperty({ description: 'Método de pago' })
  @IsString()
  paymentMethod: string;

  @ApiProperty({ description: 'ID of the seller who processed the sale' })
  @IsNumber()
  @Type(() => Number)
  sellerId: number;

  @ApiProperty({ description: 'ID of the prescription' })
  @IsNumber()
  @Type(() => Number)
  prescriptionId: number;

  @ApiProperty({ description: 'ID del cliente' })
  @IsNumber()
  clientId: number;

  @ApiProperty({
    description: 'Detalles de la factura de venta',
    type: [CreateSalesInvoiceDetailDto],
  })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateSalesInvoiceDetailDto)
  details: CreateSalesInvoiceDetailDto[];
}

//this is for report with dates
export class SalesInvoiceDto {
  @ApiProperty()
  @Expose()
  salesInvoiceId: number;

  @ApiProperty()
  @Expose()
  saleDate: Date;

  @ApiProperty()
  @Expose()
  total: number;

  @ApiProperty()
  @Expose()
  paymentMethod: string;

  @ApiProperty({ type: () => Client })
  @Type(() => Client)
  @Expose()
  client: Client;

  @ApiProperty({ type: () => [SalesInvoiceDetailDto] })
  @Type(() => SalesInvoiceDetailDto)
  @Expose()
  details: CreateSalesInvoiceDetailDto[];
}