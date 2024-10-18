import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateDoctorDto } from './dto/create-doctor.dto';
import { UpdateDoctorDto } from './dto/update-doctor.dto';
import { Doctor } from './entities/doctor.entity';
import { BranchService } from 'src/branches/branches.service';

@Injectable()
export class DoctorService {
  constructor(
    @InjectRepository(Doctor)
    private doctorRepository: Repository<Doctor>,
    private branchService: BranchService,
  ) {}

  async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    const { branchId, ...rest } = createDoctorDto;

    const doctor = this.doctorRepository.create(rest);

    if (branchId) {
      doctor.branch = await this.branchService.findOne(branchId);
    }

    return await this.doctorRepository.save(doctor);
  }

  async findAll(): Promise<Doctor[]> {
    return await this.doctorRepository.find({
      relations: ['branch'],
    });
  }

  async findOne(id: number): Promise<Doctor> {
    const doctor = await this.doctorRepository.findOne({
      where: { doctorId: id },
      relations: ['branch'],
    });
    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${id} not found`);
    }
    return doctor;
  }

  async update(id: number, updateDoctorDto: UpdateDoctorDto): Promise<Doctor> {
    const doctor = await this.findOne(id);

    if (updateDoctorDto.branchId) {
      doctor.branch = await this.branchService.findOne(updateDoctorDto.branchId);
    }

    Object.assign(doctor, updateDoctorDto);
    return await this.doctorRepository.save(doctor);
  }

  async remove(id: number): Promise<void> {
    const doctor = await this.findOne(id);
    await this.doctorRepository.remove(doctor);
  }
}