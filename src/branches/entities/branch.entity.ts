import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Seller } from 'src/sellers/entities/seller.entity';

@Entity()
export class Branch {
  @ApiProperty({ description: 'Unique identifier for the branch' })
  @PrimaryGeneratedColumn()
  branchId: number;

  @ApiProperty({ description: 'Name of the branch' })
  @Column({ length: 100 })
  name: string;

  @ApiProperty({ description: 'Phone number of the branch' })
  @Column({ length: 20 })
  phone: string;

  @ApiProperty({ description: 'Manager of the branch' })
  @Column({ length: 100 })
  manager: string;

  @OneToMany(() => Doctor, (doctor) => doctor.branch)
  doctors: Doctor[];

  @OneToMany(() => Seller, (seller) => seller.branch)
  sellers: Seller[];
}