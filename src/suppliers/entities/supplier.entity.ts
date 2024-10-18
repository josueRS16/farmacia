import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { PurchaseInvoice } from 'src/purchase-invoice/entities/purchase-invoice.entity';

@Entity()
export class Supplier {
  @ApiProperty({ description: 'Identificador único del proveedor' })
  @PrimaryGeneratedColumn()
  supplierId: number;

  @ApiProperty({ description: 'Nombre del proveedor' })
  @Column({ length: 100 })
  name: string;

  @ApiProperty({ description: 'Persona de contacto', required: false })
  @Column({ length: 100, nullable: true })
  contact: string;

  @ApiProperty({ description: 'Dirección del proveedor', required: false })
  @Column({ length: 200, nullable: true })
  address: string;

  @ApiProperty({ description: 'Teléfono del proveedor', required: false })
  @Column({ length: 20, nullable: true })
  phone: string;

  @ApiProperty({ description: 'Email del proveedor', required: false })
  @Column({ length: 100, nullable: true })
  email: string;
  
  @ApiProperty({ description: 'Condiciones de pago acordadas con el proveedor', nullable: true })
  @Column({ type: 'text', nullable: true })
  paymentTerms: string;

  @OneToMany(() => PurchaseInvoice, (purchaseInvoice) => purchaseInvoice.supplier)
  purchaseInvoices: PurchaseInvoice[];
}