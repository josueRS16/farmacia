// product.service.ts

import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { CategoryService } from 'src/categories/categories.service';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private productRepository: Repository<Product>,
    private categoryService: CategoryService,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const { categoryId, ...productData } = createProductDto;
    const category = await this.categoryService.findOne(categoryId);
    const product = this.productRepository.create({
      ...productData,
      category,
    });
    return await this.productRepository.save(product);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find({ relations: ['category'] });
  }

  async findOne(productId: number): Promise<Product> {
    if (!productId || isNaN(productId)) {
      throw new BadRequestException('El ID del producto es inválido.');
    }
  
    const product = await this.productRepository.findOne({ where: { productId } });
    if (!product) {
      throw new NotFoundException(`El producto con ID ${productId} no existe.`);
    }
    return product;
  }
  

  //  findProductsExpiringSoon-> Obtiene los productos que están próximos a caducar.
  // @param days Número de días a partir de hoy para considerar un producto como próximo a caducar.
   
  async findProductsExpiringSoon(days: number): Promise<Product[]> {
    try {
      const today = new Date();
      const futureDate = new Date();
      futureDate.setDate(today.getDate() + days);
  
      return await this.productRepository.find({
        where: {
          expireDate: Between(today, futureDate),
        },
        relations: ['category'],
      });
    } catch (error) {
      console.error('Error in findProductsExpiringSoon:', error);
      throw error;
    }
  }
  

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    const { categoryId, ...productData } = updateProductDto;
    const product = await this.productRepository.preload({
      productId: id,
      ...productData,
    });
    if (!product) {
      throw new NotFoundException(`El producto con ID ${id} no existe.`);
    }
    if (categoryId) {
      const category = await this.categoryService.findOne(categoryId);
      product.category = category;
    }
    return await this.productRepository.save(product);
  }

  async remove(id: number): Promise<void> {
    const product = await this.findOne(id);
    await this.productRepository.remove(product);
  }
}