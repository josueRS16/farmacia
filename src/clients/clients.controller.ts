import { Controller, Get, Post, Body, Patch, Param, Delete, ParseIntPipe } from '@nestjs/common';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ClientsService } from './clients.service';

@ApiTags('clients')
@Controller('clients')
export class ClientsController {
  constructor(private readonly clientService: ClientsService) {}

  @Post()
  @ApiOperation({ summary: 'Crear un nuevo cliente' })
  async create(@Body() createClientDto: CreateClientDto) {
    return await this.clientService.create(createClientDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todos los clientes' })
  async findAll() {
    return await this.clientService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener un cliente por ID' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.clientService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Actualizar un cliente' })
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return await this.clientService.update(id, updateClientDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar un cliente' })
  async remove(@Param('id', ParseIntPipe) id: number) {
    await this.clientService.remove(id);
    return { message: 'Cliente eliminado correctamente' };
  }
}