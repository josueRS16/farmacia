import { Module } from '@nestjs/common';
import { BranchService } from './branches.service';
import { BranchController } from './branches.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Branch } from './entities/branch.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Branch])],
  controllers: [BranchController],
  providers: [BranchService],
  exports: [BranchService]
})
export class BranchesModule {}
