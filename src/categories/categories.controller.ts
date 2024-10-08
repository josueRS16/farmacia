import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryService } from './categories.service';

@ApiTags('categories')
@Controller('categories')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva categoría' })
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    return await this.categoryService.create(createCategoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las categorías' })
  async findAll() {
    return await this.categoryService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una categoría por ID' })
  async findOne(@Param('id') id: number) {
    return await this.categoryService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar una categoría por ID' })
  async update(@Param('id') id: number, @Body() updateCategoryDto: UpdateCategoryDto) {
    return await this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una categoría por ID' })
  async remove(@Param('id') id: number) {
    return await this.categoryService.remove(+id);
  }
}