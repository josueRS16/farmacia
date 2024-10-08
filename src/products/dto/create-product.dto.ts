import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, IsNotEmpty, IsNumber, IsDate, IsOptional, Min } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({ description: 'Nombre del producto' })
  @IsString()
  @IsNotEmpty()
  readonly name: string;

  @ApiProperty({ description: 'Precio del producto' })
  @IsNumber()
  @Min(0)
  readonly price: number;

  @ApiProperty({ description: 'Fecha de caducidad del producto' })
  @Type(() => Date) // Transforma la cadena en una instancia de Date antes de la validación
  @IsDate({ message: 'expireDate debe ser una fecha válida.' })
  readonly expireDate: Date;

  @ApiProperty({ description: 'Número de lote del producto' })
  @IsNumber()
  @IsNotEmpty()
  readonly lot: number;

  @ApiProperty({ description: 'Cantidad disponible del producto' })
  @IsNumber()
  @Min(0)
  readonly quantity: number;

  @ApiProperty({ description: 'ID de la categoría a la que pertenece el producto' })
  @IsNumber()
  @IsNotEmpty()
  readonly categoryId: number;

  @ApiProperty({ description: 'Condiciones de almacenamiento del producto', required: false })
  @IsString()
  @IsOptional()
  readonly storageConditions?: string;
}