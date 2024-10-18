import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { SalesInvoice } from 'src/sales-invoice/entities/sales-invoice.entity';
import { Prescription } from 'src/prescriptions/entities/prescription.entity';

@Entity()
export class Client {
  @ApiProperty({ description: 'Identificador único del cliente' })
  @PrimaryGeneratedColumn()
  clientId: number;

  @ApiProperty({ description: 'Nombre del cliente' })
  @Column({ length: 100 })
  name: string;

  @ApiProperty({ description: 'Apellido del cliente' })
  @Column({ length: 100 })
  lastName: string;

  @ApiProperty({ description: 'Dirección del cliente', nullable: true })
  @Column({ length: 200, nullable: true })
  address: string;

  @ApiProperty({ description: 'Teléfono del cliente', nullable: true })
  @Column({ length: 20, nullable: true })
  phone: string;

  @ApiProperty({ description: 'Email del cliente', nullable: true })
  @Column({ length: 100, nullable: true })
  email: string;

  @OneToMany(() => SalesInvoice, (salesInvoice) => salesInvoice.client)
  salesInvoices: SalesInvoice[];

  @ApiProperty({ description: 'Recetas asociadas con el cliente', type: () => [Prescription] })
  @OneToMany(() => Prescription, (prescription) => prescription.client)
  prescriptions: Prescription[];
}