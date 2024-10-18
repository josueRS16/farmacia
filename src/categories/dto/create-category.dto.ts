import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateCategoryDto {
  @ApiProperty({ description: 'Nombre de la categoría' })
  @IsString({ message: 'El nombre debe ser una cadena de texto.' })
  @IsNotEmpty({ message: 'El nombre de la categoría no puede estar vacío.' })
  readonly name: string;

  @ApiProperty({ description: 'Descripción de la categoría', required: false })
  @IsString({ message: 'La descripción debe ser una cadena de texto.' })
  @IsOptional()
  readonly description?: string;
}