// import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
// import { PurchaseInvoiceDetailService } from './purchase-invoice-detail.service';
// import { CreatePurchaseInvoiceDetailDto } from './dto/create-purchase-invoice-detail.dto';
// import { UpdatePurchaseInvoiceDetailDto } from './dto/update-purchase-invoice-detail.dto';

// @Controller('purchase-invoice-detail')
// export class PurchaseInvoiceDetailController {
//   constructor(private readonly purchaseInvoiceDetailService: PurchaseInvoiceDetailService) {}

//   @Post()
//   create(@Body() createPurchaseInvoiceDetailDto: CreatePurchaseInvoiceDetailDto) {
//     return this.purchaseInvoiceDetailService.create(createPurchaseInvoiceDetailDto);
//   }

//   @Get()
//   findAll() {
//     return this.purchaseInvoiceDetailService.findAll();
//   }

//   @Get(':id')
//   findOne(@Param('id') id: string) {
//     return this.purchaseInvoiceDetailService.findOne(+id);
//   }

//   @Patch(':id')
//   update(@Param('id') id: string, @Body() updatePurchaseInvoiceDetailDto: UpdatePurchaseInvoiceDetailDto) {
//     return this.purchaseInvoiceDetailService.update(+id, updatePurchaseInvoiceDetailDto);
//   }

//   @Delete(':id')
//   remove(@Param('id') id: string) {
//     return this.purchaseInvoiceDetailService.remove(+id);
//   }
// }
