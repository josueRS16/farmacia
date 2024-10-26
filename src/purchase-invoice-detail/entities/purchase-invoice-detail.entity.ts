import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { PurchaseInvoice } from 'src/purchase-invoice/entities/purchase-invoice.entity';
import { Product } from 'src/products/entities/product.entity';

@Entity()
export class PurchaseInvoiceDetail {
  @ApiProperty({ description: 'Identificador único del detalle de factura de compra' })
  @PrimaryGeneratedColumn()
  purchaseInvoiceDetailId: number;

  @ApiProperty({ description: 'Factura de compra asociada', type: () => PurchaseInvoice })
  @ManyToOne(() => PurchaseInvoice, (invoice) => invoice.details, {
    onDelete: 'CASCADE', // Asegura que se elimine el detalle si la factura se elimina
  })
  purchaseInvoice: PurchaseInvoice;

  @ApiProperty({ description: 'Producto asociado', type: () => Product })
  @ManyToOne(() => Product, (product) => product.purchaseInvoiceDetails)
  product: Product;

  @ApiProperty({ description: 'Cantidad del producto' })
  @Column({ type: 'int' })
  quantity: number;

  @ApiProperty({ description: 'Precio unitario del producto' })
  @Column({ type: 'float' })
  unitPrice: number;

  @ApiProperty({ description: 'Número de lote del producto' })
  @Column({ length: 50 })
  lotNumber: string;

  @ApiProperty({ description: 'Fecha de caducidad del producto' })
  @Column({ type: 'date' })
  expireDate: Date;
}