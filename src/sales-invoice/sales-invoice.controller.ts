import { Controller, Get, Post, Body, Param, ParseIntPipe, Query } from '@nestjs/common';
import { SalesInvoiceService } from './sales-invoice.service';
import { CreateSalesInvoiceDto } from './dto/create-sales-invoice.dto';
import { ApiTags, ApiOperation, ApiQuery } from '@nestjs/swagger';

@ApiTags('sales-invoices')
@Controller('sales-invoices')
export class SalesInvoiceController {
  constructor(private readonly salesInvoiceService: SalesInvoiceService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva factura de venta' })
  async create(@Body() createSalesInvoiceDto: CreateSalesInvoiceDto) {
    return await this.salesInvoiceService.create(createSalesInvoiceDto);
  }

  @Get('report')
  @ApiOperation({ summary: 'Obtener reporte de ventas' })
  @ApiQuery({ name: 'productId', required: false, type: Number })
  async getSalesReport(
    @Query('startDate') startDate: string,
    @Query('endDate') endDate: string,
    @Query('productId') productId?: number,
  ) {
    return await this.salesInvoiceService.getSalesReport(startDate, endDate, productId);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las facturas de venta' })
  async findAll() {
    return await this.salesInvoiceService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una factura de venta por ID' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.salesInvoiceService.findOne(id);
  }
}