import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsInt, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { CreatePrescriptionDetailDto } from 'src/prescriptions-details/dto/create-prescriptions-detail.dto';

export class CreatePrescriptionDto {
  @ApiProperty({ description: 'Date when the prescription was issued' })
  @IsDateString()
  issueDate: Date;

  @ApiProperty({ description: 'ID of the doctor who issued the prescription' })
  @IsInt()
  @Type(() => Number)
  doctorId: number;

  @ApiProperty({ description: 'ID of the client' })
  @IsInt()
  @Type(() => Number)
  clientId: number;

  @ApiProperty({ description: 'Details of the prescription', type: [CreatePrescriptionDetailDto] })
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePrescriptionDetailDto)
  details: CreatePrescriptionDetailDto[];
}