import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
    OneToMany,
  } from 'typeorm';
  import { ApiProperty } from '@nestjs/swagger';
  import { IsDateString } from 'class-validator';
import { PrescriptionDetail } from 'src/prescriptions-details/entities/prescriptions-detail.entity';
import { Client } from 'src/clients/entities/client.entity';
import { Doctor } from 'src/doctors/entities/doctor.entity';
import { Exclude, Expose } from 'class-transformer';
  
  @Entity()
  @Exclude() 
  export class Prescription {
    @ApiProperty({ description: 'Unique identifier for the prescription' })
    @PrimaryGeneratedColumn()
    @Expose()
    prescriptionId: number;
  
    @ApiProperty({ description: 'Date when the prescription was issued' })
    @Column({ type: 'date' })
    @IsDateString()
    @Expose()
    issueDate: Date;
  
    @ApiProperty({ description: 'Doctor who issued the prescription', type: () => Doctor })
    @ManyToOne(() => Doctor, (doctor) => doctor.prescriptions)
    @Expose()
    doctor: Doctor;
  
    @ApiProperty({ description: 'Client associated with the prescription', type: () => Client })
    @ManyToOne(() => Client, (client) => client.prescriptions)
    @Expose()
    client: Client;
  
    @ApiProperty({ description: 'Details of the prescription', type: () => [PrescriptionDetail] })
    @OneToMany(() => PrescriptionDetail, (detail) => detail.prescription, { cascade: true })
    @Expose()
    details: PrescriptionDetail[];
  }  