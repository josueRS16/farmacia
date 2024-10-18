import { Module } from '@nestjs/common';
import { DoctorService } from './doctors.service';
import { DoctorController } from './doctors.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Doctor } from './entities/doctor.entity';
import { BranchesModule } from 'src/branches/branches.module';

@Module({
  imports: [TypeOrmModule.forFeature([Doctor]), BranchesModule],
  controllers: [DoctorController],
  providers: [DoctorService],
  exports: [DoctorService],
})
export class DoctorsModule {}
