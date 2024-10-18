import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Supplier } from 'src/suppliers/entities/supplier.entity';
import { PurchaseInvoiceDetail } from 'src/purchase-invoice-detail/entities/purchase-invoice-detail.entity';

@Entity()
export class PurchaseInvoice {
  @ApiProperty({ description: 'Identificador único de la factura de compra' })
  @PrimaryGeneratedColumn()
  purchaseInvoiceId: number;

  @ApiProperty({ description: 'Fecha de la factura' })
  @Column({ type: 'date' })
  date: Date;

  @ApiProperty({ description: 'Total de la factura' })
  @Column({ type: 'float' })
  total: number;

  @ApiProperty({ description: 'Método de pago' })
  @Column({ length: 50 })
  paymentMethod: string;

  @ApiProperty({ description: 'Negociaciones de precios para esta factura', nullable: true })
  @Column({ type: 'text', nullable: true })
  negotiatedPrices: string;

  @ApiProperty({ description: 'Proveedor asociado', type: () => Supplier })
  @ManyToOne(() => Supplier, (supplier) => supplier.purchaseInvoices)
  supplier: Supplier;

  @OneToMany(() => PurchaseInvoiceDetail, (detail) => detail.purchaseInvoice)
  details: PurchaseInvoiceDetail[];
}