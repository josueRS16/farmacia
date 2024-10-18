import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { PrescriptionService } from './prescriptions.service';

@ApiTags('prescriptions')
@Controller('prescriptions')
export class PrescriptionController {
  constructor(private readonly prescriptionService: PrescriptionService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new prescription' })
  async create(@Body() createPrescriptionDto: CreatePrescriptionDto) {
    return await this.prescriptionService.create(createPrescriptionDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all prescriptions' })
  async findAll() {
    return await this.prescriptionService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a prescription by ID' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.prescriptionService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a prescription' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updatePrescriptionDto: UpdatePrescriptionDto,
  ) {
    return await this.prescriptionService.update(id, updatePrescriptionDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a prescription' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.prescriptionService.remove(id);
    return { message: 'Prescription deleted successfully' };
  }
}