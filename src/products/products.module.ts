import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { CategoryModule } from 'src/categories/categories.module';
import { ProductService } from './products.service';
import { ProductController } from './products.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), CategoryModule],
  providers: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}