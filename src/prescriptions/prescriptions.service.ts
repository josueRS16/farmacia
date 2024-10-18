import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePrescriptionDto } from './dto/create-prescription.dto';
import { UpdatePrescriptionDto } from './dto/update-prescription.dto';
import { Prescription } from './entities/prescription.entity';
import { DoctorService } from 'src/doctors/doctors.service';
import { ClientsService } from 'src/clients/clients.service';
import { ProductService } from 'src/products/products.service';
import { PrescriptionDetail } from 'src/prescriptions-details/entities/prescriptions-detail.entity';

@Injectable()
export class PrescriptionService {
  constructor(
    @InjectRepository(Prescription)
    private prescriptionRepository: Repository<Prescription>,
    private doctorService: DoctorService,
    private clientService: ClientsService,
    private productService: ProductService,
  ) {}

  async create(createPrescriptionDto: CreatePrescriptionDto): Promise<Prescription> {
    const { issueDate, doctorId, clientId, details } = createPrescriptionDto;

    const doctor = await this.doctorService.findOne(doctorId);
    const client = await this.clientService.findOne(clientId);

    // Crear una nueva instancia de Prescription
    const prescription = new Prescription();
    prescription.issueDate = issueDate;
    prescription.doctor = doctor;
    prescription.client = client;
    prescription.details = [];

    // Procesar los detalles de la receta
    for (const detailDto of details) {
      const product = await this.productService.findOne(detailDto.productId);
      const prescriptionDetail = new PrescriptionDetail();
      prescriptionDetail.quantity = detailDto.quantity;
      prescriptionDetail.product = product;
      prescriptionDetail.prescription = prescription; // Establecer la relación
      prescription.details.push(prescriptionDetail);
    }

    // Guardar la receta junto con los detalles
    return await this.prescriptionRepository.save(prescription);
  }

  async findAll(): Promise<Prescription[]> {
    return await this.prescriptionRepository.find({
      relations: ['doctor.branch', 'client', 'details', 'details.product.category'],
    });
  }

  async findOne(id: number): Promise<Prescription> {
    const prescription = await this.prescriptionRepository.findOne({
      where: { prescriptionId: id },
      relations: ['doctor.branch', 'client', 'details', 'details.product.category'],
    });
    if (!prescription) {
      throw new NotFoundException(`Prescription with ID ${id} not found`);
    }
    return prescription;
  }

  async update(id: number, updatePrescriptionDto: UpdatePrescriptionDto): Promise<Prescription> {
    const prescription = await this.findOne(id);

    if (updatePrescriptionDto.doctorId) {
      prescription.doctor = await this.doctorService.findOne(updatePrescriptionDto.doctorId);
    }

    if (updatePrescriptionDto.clientId) {
      prescription.client = await this.clientService.findOne(updatePrescriptionDto.clientId);
    }

    Object.assign(prescription, updatePrescriptionDto);
    return await this.prescriptionRepository.save(prescription);
  }

  async remove(id: number): Promise<void> {
    const prescription = await this.findOne(id);
    await this.prescriptionRepository.remove(prescription);
  }
}