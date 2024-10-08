import { Controller, Get, Post, Body, Patch, Param, Delete, Query, DefaultValuePipe, ParseIntPipe, BadRequestException } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductService } from './products.service';

@ApiTags('products')
@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo producto' })
  async create(@Body() createProductDto: CreateProductDto) {
    return await this.productService.create(createProductDto);
  }

  @Get('expiring-soon')
  @ApiOperation({ summary: 'Obtener productos próximos a caducar' })
  async findExpiringSoon(@Query('days') days: string) {
    const daysNumber = parseInt(days, 10);

    if (isNaN(daysNumber) || daysNumber < 0) {
      throw new BadRequestException('El parámetro "days" debe ser un número válido y mayor o igual a cero.');
    }

    return await this.productService.findProductsExpiringSoon(daysNumber);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los productos' })
  async findAll() {
    return await this.productService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.productService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un producto por ID' })
  async update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    return await this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un producto por ID' })
  async remove(@Param('id') id: number) {
    return await this.productService.remove(+id);
  }
}