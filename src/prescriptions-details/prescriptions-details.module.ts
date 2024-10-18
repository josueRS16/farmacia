import { Module } from '@nestjs/common';
import { PrescriptionsDetailsService } from './prescriptions-details.service';
import { PrescriptionsDetailsController } from './prescriptions-details.controller';

@Module({
  controllers: [PrescriptionsDetailsController],
  providers: [PrescriptionsDetailsService],
})
export class PrescriptionsDetailsModule {}
