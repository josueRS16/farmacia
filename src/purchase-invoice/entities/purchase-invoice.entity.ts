import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Supplier } from 'src/suppliers/entities/supplier.entity';
import { PurchaseInvoiceDetail } from 'src/purchase-invoice-detail/entities/purchase-invoice-detail.entity';
import { Warehouse } from 'src/ware-houses/entities/ware-house.entity';

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
  @ManyToOne(() => Supplier, (supplier) => supplier.purchaseInvoices, { eager: true })
  supplier: Supplier;

  @ApiProperty({ description: 'Almacén asociado', type: () => Warehouse })
  @ManyToOne(() => Warehouse, (warehouse) => warehouse.purchaseInvoices, { eager: true })
  warehouse: Warehouse;

  @OneToMany(() => PurchaseInvoiceDetail, (detail) => detail.purchaseInvoice, {
    cascade: true, // Permite operaciones en cascada
    eager: true,
    onDelete: 'CASCADE', // Asegura que los detalles se eliminen al eliminar la factura
  })
  details: PurchaseInvoiceDetail[];
}