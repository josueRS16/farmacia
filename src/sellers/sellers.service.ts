import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { Seller } from './entities/seller.entity';
import { BranchService } from 'src/branches/branches.service';

@Injectable()
export class SellerService {
  constructor(
    @InjectRepository(Seller)
    private sellerRepository: Repository<Seller>,
    private branchService: BranchService,
  ) {}

  async create(createSellerDto: CreateSellerDto): Promise<Seller> {
    const { branchId, ...rest } = createSellerDto;

    const seller = this.sellerRepository.create(rest);
    seller.branch = await this.branchService.findOne(branchId);

    return await this.sellerRepository.save(seller);
  }

  async findAll(): Promise<Seller[]> {
    return await this.sellerRepository.find({
      relations: ['branch'],
    });
  }

  async findOne(id: number): Promise<Seller> {
    const seller = await this.sellerRepository.findOne({
      where: { sellerId: id },
      relations: ['branch'],
    });
    if (!seller) {
      throw new NotFoundException(`Seller with ID ${id} not found`);
    }
    return seller;
  }

  async update(id: number, updateSellerDto: UpdateSellerDto): Promise<Seller> {
    const seller = await this.findOne(id);

    if (updateSellerDto.branchId) {
      seller.branch = await this.branchService.findOne(updateSellerDto.branchId);
    }

    Object.assign(seller, updateSellerDto);
    return await this.sellerRepository.save(seller);
  }

  async remove(id: number): Promise<void> {
    const seller = await this.findOne(id);
    await this.sellerRepository.remove(seller);
  }
}