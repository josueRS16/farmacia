import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Prescription } from 'src/prescriptions/entities/prescription.entity';
import { Branch } from 'src/branches/entities/branch.entity';
import { Exclude, Expose } from 'class-transformer';

@Entity()
@Exclude()
export class Doctor {
  @ApiProperty({ description: 'Unique identifier for the doctor' })
  @PrimaryGeneratedColumn()
  @Expose()
  doctorId: number;

  @ApiProperty({ description: 'First name of the doctor' })
  @Column({ length: 100 })
  @Expose()
  firstName: string;

  @ApiProperty({ description: 'Last name of the doctor' })
  @Column({ length: 100 })
  @Expose()
  lastName: string;

  @ApiProperty({ description: 'Specialty of the doctor' })
  @Column({ length: 100 })
  @Expose()
  specialty: string;

  @ApiProperty({ description: 'Phone number of the doctor' })
  @Column({ length: 20 })
  @Expose()
  phone: string;

  @ApiProperty({ description: 'Address of the doctor' })
  @Column({ length: 200 })
  @Expose()
  address: string;

  @ApiProperty({ description: 'Branch where the doctor works', type: () => Branch })
  @ManyToOne(() => Branch, (branch) => branch.doctors)
  @Expose()
  branch: Branch;

  @OneToMany(() => Prescription, (prescription) => prescription.doctor)
  prescriptions: Prescription[];
}