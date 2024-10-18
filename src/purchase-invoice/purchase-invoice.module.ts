import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseInvoiceService } from './purchase-invoice.service';
import { PurchaseInvoiceController } from './purchase-invoice.controller';
import { ProductModule } from 'src/products/products.module';
import { SupplierModule } from 'src/suppliers/suppliers.module';
import { PurchaseInvoice } from './entities/purchase-invoice.entity';
import { PurchaseInvoiceDetail } from 'src/purchase-invoice-detail/entities/purchase-invoice-detail.entity';
import { InventoryModule } from 'src/inventories/inventories.module';
import { WareHousesModule } from 'src/ware-houses/ware-houses.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PurchaseInvoice, PurchaseInvoiceDetail]),
    SupplierModule,
    ProductModule,
    InventoryModule,
    WareHousesModule
  ],
  providers: [PurchaseInvoiceService],
  controllers: [PurchaseInvoiceController],
})
export class PurchaseInvoiceModule {}