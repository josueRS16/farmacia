import { PartialType } from '@nestjs/swagger';
import { CreateWarehouseDto } from './create-ware-house.dto';

export class UpdateWareHouseDto extends PartialType(CreateWarehouseDto) {}
