// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { SalesInvoiceDetailService } from './sales-invoice-detail.service';
// import { CreateSalesInvoiceDetailDto } from './dto/create-sales-invoice-detail.dto';
// import { UpdateSalesInvoiceDetailDto } from './dto/update-sales-invoice-detail.dto';

// @Controller('sales-invoice-detail')
// export class SalesInvoiceDetailController {
//   constructor(private readonly salesInvoiceDetailService: SalesInvoiceDetailService) {}

//   @Post()
//   create(@Body() createSalesInvoiceDetailDto: CreateSalesInvoiceDetailDto) {
//     return this.salesInvoiceDetailService.create(createSalesInvoiceDetailDto);
//   }

//   @Get()
//   findAll() {
//     return this.salesInvoiceDetailService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.salesInvoiceDetailService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updateSalesInvoiceDetailDto: UpdateSalesInvoiceDetailDto) {
//     return this.salesInvoiceDetailService.update(+id, updateSalesInvoiceDetailDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.salesInvoiceDetailService.remove(+id);
//   }
// }
