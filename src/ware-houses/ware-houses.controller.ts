import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { WarehouseService } from './ware-houses.service';
import { CreateWarehouseDto } from './dto/create-ware-house.dto';
import { UpdateWareHouseDto } from './dto/update-ware-house.dto';

@ApiTags('warehouses')
@Controller('warehouses')
export class WarehouseController {
  constructor(private readonly warehouseService: WarehouseService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new warehouse' })
  async create(@Body() createWarehouseDto: CreateWarehouseDto) {
    return await this.warehouseService.create(createWarehouseDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all warehouses' })
  async findAll() {
    return await this.warehouseService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get a warehouse by ID' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.warehouseService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a warehouse' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateWarehouseDto: UpdateWareHouseDto,
  ) {
    return await this.warehouseService.update(id, updateWarehouseDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a warehouse' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.warehouseService.remove(id);
    return { message: 'Warehouse deleted successfully' };
  }
}