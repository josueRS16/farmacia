import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './products/products.module';
import { CategoryModule } from './categories/categories.module';
import { SupplierModule } from './suppliers/suppliers.module';
import { PurchaseInvoiceModule } from './purchase-invoice/purchase-invoice.module';
import { InventoryModule } from './inventories/inventories.module';
import { ClientsModule } from './clients/clients.module';
import { SalesInvoiceModule } from './sales-invoice/sales-invoice.module';
import { PrescriptionsModule } from './prescriptions/prescriptions.module';
import { PrescriptionsDetailsModule } from './prescriptions-details/prescriptions-details.module';
import { DoctorsModule } from './doctors/doctors.module';
import { SellersModule } from './sellers/sellers.module';
import { BranchesModule } from './branches/branches.module';
import { WareHousesModule } from './ware-houses/ware-houses.module';
import { UsersModule } from './users/users.module';


@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'Math16',
    database: 'farmacia',
    entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true,
    logging: ["query", "error"]
  }),
    //Here goes all modules
    ProductModule,
    CategoryModule,
    SupplierModule,
    PurchaseInvoiceModule,
    InventoryModule,
    ClientsModule,
    SalesInvoiceModule,
    PrescriptionsModule,
    PrescriptionsDetailsModule,
    DoctorsModule,
    SellersModule,
    BranchesModule,
    WareHousesModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }