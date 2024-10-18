import { Injectable } from '@nestjs/common';
import { CreatePrescriptionDetailDto } from './dto/create-prescriptions-detail.dto';
import { UpdatePrescriptionsDetailDto } from './dto/update-prescriptions-detail.dto';

@Injectable()
export class PrescriptionsDetailsService {
  create(createPrescriptionsDetailDto: CreatePrescriptionDetailDto) {
    return 'This action adds a new prescriptionsDetail';
  }

  findAll() {
    return `This action returns all prescriptionsDetails`;
  }

  findOne(id: number) {
    return `This action returns a #${id} prescriptionsDetail`;
  }

  update(id: number, updatePrescriptionsDetailDto: UpdatePrescriptionsDetailDto) {
    return `This action updates a #${id} prescriptionsDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} prescriptionsDetail`;
  }
}
