import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Prescription } from 'src/prescriptions/entities/prescription.entity';
import { Product } from 'src/products/entities/product.entity';
import { Exclude, Expose } from 'class-transformer';

@Entity()
@Exclude()
export class PrescriptionDetail {
  @ApiProperty({ description: 'Unique identifier for the prescription detail' })
  @PrimaryGeneratedColumn()
  @Expose()
  prescriptionDetailId: number;

  @ApiProperty({ description: 'Quantity prescribed' })
  @Column({ type: 'int' })
  quantity: number;

  @ApiProperty({ description: 'Prescription associated', type: () => Prescription })
  @ManyToOne(() => Prescription, (prescription) => prescription.details, {
    onDelete: 'CASCADE',
  })
    // @Expose() // Do not expose the prescription to prevent recursion
  prescription: Prescription;

  @ApiProperty({ description: 'Product prescribed', type: () => Product })
  @ManyToOne(() => Product, (product) => product.prescriptionDetails)
  @Expose()
  product: Product;
}