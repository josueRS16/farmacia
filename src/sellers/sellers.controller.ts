import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CreateSellerDto } from './dto/create-seller.dto';
import { UpdateSellerDto } from './dto/update-seller.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { SellerService } from './sellers.service';

@ApiTags('sellers')
@Controller('sellers')
export class SellerController {
  constructor(private readonly sellerService: SellerService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new seller' })
  async create(@Body() createSellerDto: CreateSellerDto) {
    return await this.sellerService.create(createSellerDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all sellers' })
  async findAll() {
    return await this.sellerService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a seller by ID' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.sellerService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a seller' })
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateSellerDto: UpdateSellerDto) {
    return await this.sellerService.update(id, updateSellerDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a seller' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.sellerService.remove(id);
    return { message: 'Seller deleted successfully' };
  }
}