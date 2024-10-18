import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { SalesInvoice } from 'src/sales-invoice/entities/sales-invoice.entity';
import { Product } from 'src/products/entities/product.entity';
import { Exclude, Type } from 'class-transformer';

@Entity()
export class SalesInvoiceDetail {
  @ApiProperty({ description: 'Identificador único del detalle de la factura de venta' })
  @PrimaryGeneratedColumn()
  salesInvoiceDetailId: number;

  @ApiProperty({ description: 'Factura de venta asociada', type: () => SalesInvoice })
  @ManyToOne(() => SalesInvoice, (salesInvoice) => salesInvoice.details)
  @Exclude() // Excluimos esta propiedad de la serialización
  salesInvoice: SalesInvoice;

  @ApiProperty({ description: 'Producto vendido', type: () => Product })
  @ManyToOne(() => Product, (product) => product.salesInvoiceDetails)
  product: Product;

  @ApiProperty({ description: 'Cantidad vendida' })
  @Column({ type: 'int' })
  quantity: number;

  @ApiProperty({ description: 'Precio unitario de venta' })
  @Column({ type: 'float' })
  unitPrice: number;

  @ApiProperty({ description: 'Fecha de venta' })
  @Column({ type: 'date' })
  date: Date;
}