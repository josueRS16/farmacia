import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Inventory } from './entities/inventory.entity';
import { ProductModule } from 'src/products/products.module';
import { InventoryService } from './inventories.service';
import { InventoryController } from './inventories.controller';
import { WareHousesModule } from 'src/ware-houses/ware-houses.module';

@Module({
  imports: [TypeOrmModule.forFeature([Inventory]), ProductModule, WareHousesModule],
  providers: [InventoryService],
  controllers: [InventoryController],
  exports: [InventoryService],
})
export class InventoryModule {}