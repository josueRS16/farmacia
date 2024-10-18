// src/purchase-invoice/purchase-invoice.controller.ts

import { Controller, Get, Post, Body, Param, ParseIntPipe } from '@nestjs/common';
import { PurchaseInvoiceService } from './purchase-invoice.service';
import { CreatePurchaseInvoiceDto } from './dto/create-purchase-invoice.dto';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('purchase-invoices')
@Controller('purchase-invoices')
export class PurchaseInvoiceController {
  constructor(private readonly purchaseInvoiceService: PurchaseInvoiceService) {}

  @Post()
  @ApiOperation({ summary: 'Crear una nueva factura de compra' })
  async create(@Body() createPurchaseInvoiceDto: CreatePurchaseInvoiceDto) {
    return await this.purchaseInvoiceService.create(createPurchaseInvoiceDto);
  }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las facturas de compra' })
  async findAll() {
    return await this.purchaseInvoiceService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una factura de compra por ID' })
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return await this.purchaseInvoiceService.findOne(id);
  }
}