import { PartialType } from '@nestjs/swagger';
import { CreatePrescriptionDetailDto } from './create-prescriptions-detail.dto';

export class UpdatePrescriptionsDetailDto extends PartialType(CreatePrescriptionDetailDto) {}
