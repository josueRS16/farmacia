import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe, Query, BadRequestException } from '@nestjs/common';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { InventoryService } from './inventories.service';

@ApiTags('inventory')
@Controller('inventory')
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) { }

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo registro de inventario' })
  async create(@Body() createInventoryDto: CreateInventoryDto) {
    return await this.inventoryService.create(createInventoryDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los registros de inventario' })
  async findAll() {
    return await this.inventoryService.findAll();
  }

  @Get('expiring-products')
  @ApiOperation({ summary: 'Obtener productos próximos a caducar' })
  async getExpiringProducts(@Query('days', ParseIntPipe) days: number) {
    console.log('Days parameter:', days);
    return await this.inventoryService.findExpiringProducts(days);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un registro de inventario por ID' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.inventoryService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un registro de inventario' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateInventoryDto: UpdateInventoryDto,
  ) {
    return await this.inventoryService.update(id, updateInventoryDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un registro de inventario' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.inventoryService.remove(id);
    return { message: 'Registro de inventario eliminado correctamente' };
  }

  @Post('reduce-stock')
  @ApiOperation({ summary: 'Reducir el stock de un producto' })
  async reduceStock(
    @Body() body: { productId: number; quantity: number },
  ) {
    await this.inventoryService.reduceStock(body.productId, body.quantity);
    return { message: 'Stock reducido correctamente' };
  }
}