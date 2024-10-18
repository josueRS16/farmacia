import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, Min } from 'class-validator';

export class CreatePrescriptionDetailDto {
  @ApiProperty({ description: 'ID of the product' })
  @Type(() => Number)
  @IsInt()
  productId: number;

  @ApiProperty({ description: 'Quantity prescribed' })
  @IsInt()
  @Min(1)
  @Type(() => Number)
  quantity: number;
}