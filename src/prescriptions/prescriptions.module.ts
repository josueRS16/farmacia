import { Module } from '@nestjs/common';
import { PrescriptionService } from './prescriptions.service';
import { PrescriptionController } from './prescriptions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Prescription } from './entities/prescription.entity';
import { PrescriptionDetail } from 'src/prescriptions-details/entities/prescriptions-detail.entity';
import { DoctorsModule } from 'src/doctors/doctors.module';
import { ClientsModule } from 'src/clients/clients.module';
import { ProductModule } from 'src/products/products.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Prescription, PrescriptionDetail]),
    DoctorsModule,
    ClientsModule,
    ProductModule,
  ],
  controllers: [PrescriptionController],
  providers: [PrescriptionService],
  exports: [PrescriptionService],
})
export class PrescriptionsModule {}
