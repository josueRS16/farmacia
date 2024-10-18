import { Module } from '@nestjs/common';
import { SalesInvoiceService } from './sales-invoice.service';
import { SalesInvoiceController } from './sales-invoice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesInvoice } from './entities/sales-invoice.entity';
import { ClientsModule } from 'src/clients/clients.module';
import { ProductModule } from 'src/products/products.module';
import { InventoryModule } from 'src/inventories/inventories.module';
import { SalesInvoiceDetail } from 'src/sales-invoice-detail/entities/sales-invoice-detail.entity';
import { SellersModule } from 'src/sellers/sellers.module';
import { PrescriptionsModule } from 'src/prescriptions/prescriptions.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SalesInvoice, SalesInvoiceDetail]),
    ClientsModule,
    ProductModule,
    InventoryModule,
    SellersModule,
    PrescriptionsModule
  ],
  controllers: [SalesInvoiceController],
  providers: [SalesInvoiceService],
})
export class SalesInvoiceModule {}