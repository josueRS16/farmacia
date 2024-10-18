import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Branch } from 'src/branches/entities/branch.entity';

@Entity()
export class Seller {
  @ApiProperty({ description: 'Unique identifier for the seller' })
  @PrimaryGeneratedColumn()
  sellerId: number;

  @ApiProperty({ description: 'First name of the seller' })
  @Column({ length: 100 })
  firstName: string;

  @ApiProperty({ description: 'Last name of the seller' })
  @Column({ length: 100 })
  lastName: string;

  @ApiProperty({ description: 'Phone number of the seller' })
  @Column({ length: 20 })
  phone: string;

  @ApiProperty({ description: 'Hire date of the seller' })
  @Column({ type: 'date' })
  hireDate: Date;

  @ApiProperty({ description: 'Branch where the seller works', type: () => Branch })
  @ManyToOne(() => Branch, (branch) => branch.sellers)
  branch: Branch;
}