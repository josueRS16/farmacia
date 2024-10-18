import { Module } from '@nestjs/common';
import { SellerService } from './sellers.service';
import { SellerController } from './sellers.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seller } from './entities/seller.entity';
import { BranchesModule } from 'src/branches/branches.module';

@Module({
  imports: [TypeOrmModule.forFeature([Seller]), BranchesModule],
  controllers: [SellerController],
  providers: [SellerService],
  exports: [SellerService],
})
export class SellersModule {}
