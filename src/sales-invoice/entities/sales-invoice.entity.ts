import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Client } from 'src/clients/entities/client.entity';
import { SalesInvoiceDetail } from 'src/sales-invoice-detail/entities/sales-invoice-detail.entity';
import { Type } from 'class-transformer';
import { Prescription } from 'src/prescriptions/entities/prescription.entity';
import { Seller } from 'src/sellers/entities/seller.entity';

@Entity()
export class SalesInvoice {
  @ApiProperty({ description: 'Identificador único de la factura de venta' })
  @PrimaryGeneratedColumn()
  salesInvoiceId: number;

  @ApiProperty({ description: 'Fecha de la venta' })
  @Column({ type: 'date' })
  saleDate: Date;

  @ApiProperty({ description: 'Total de la venta' })
  @Column({ type: 'float' })
  total: number;

  @ApiProperty({ description: 'Método de pago' })
  @Column({ length: 50 })
  paymentMethod: string;

  @ApiProperty({ description: 'Seller who processed the sale', type: () => Seller })
  @ManyToOne(() => Seller)
  seller: Seller;


  @ApiProperty({ description: 'Prescription associated with the sale', type: () => Prescription, nullable: true })
  @ManyToOne(() => Prescription, { nullable: true })
  prescription: Prescription;

  @ApiProperty({ description: 'Cliente asociado', type: () => Client })
  @ManyToOne(() => Client, (client) => client.salesInvoices)
  client: Client;

  @ApiProperty({ description: 'Detalles de la factura de venta', type: [SalesInvoiceDetail] })
  @OneToMany(() => SalesInvoiceDetail, (detail) => detail.salesInvoice, { cascade: true })
  @Type(() => SalesInvoiceDetail) // Aseguramos la transformación correcta
  details: SalesInvoiceDetail[];
}