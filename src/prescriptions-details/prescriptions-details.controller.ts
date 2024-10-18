import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PrescriptionsDetailsService } from './prescriptions-details.service';
import { CreatePrescriptionDetailDto } from './dto/create-prescriptions-detail.dto';
import { UpdatePrescriptionsDetailDto } from './dto/update-prescriptions-detail.dto';

@Controller('prescriptions-details')
export class PrescriptionsDetailsController {
  constructor(private readonly prescriptionsDetailsService: PrescriptionsDetailsService) {}

  @Post()
  create(@Body() createPrescriptionsDetailDto: CreatePrescriptionDetailDto) {
    return this.prescriptionsDetailsService.create(createPrescriptionsDetailDto);
  }

  @Get()
  findAll() {
    return this.prescriptionsDetailsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.prescriptionsDetailsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePrescriptionsDetailDto: UpdatePrescriptionsDetailDto) {
    return this.prescriptionsDetailsService.update(+id, updatePrescriptionsDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.prescriptionsDetailsService.remove(+id);
  }
}
