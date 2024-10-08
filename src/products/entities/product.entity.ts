import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/categories/entities/category.entity';

@Entity()
export class Product {
  @ApiProperty({ description: 'Identificador único del producto' })
  @PrimaryGeneratedColumn()
  productId: number;

  @ApiProperty({ description: 'Nombre del producto' })
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ApiProperty({ description: 'Precio del producto' })
  @Column({ type: 'float' })
  price: number;

  @ApiProperty({ description: 'Fecha de caducidad del producto' })
  @Column({ type: 'date' })
  expireDate: Date;

  @ApiProperty({ description: 'Número de lote del producto' })
  @Column({ type: 'int' })
  lot: number;

  @ApiProperty({ description: 'Condiciones de almacenamiento del producto', required: false })
  @Column({ type: 'text', nullable: true })
  storageConditions?: string;

  @ApiProperty({ description: 'Categoría a la que pertenece el producto', type: () => Category })
  @ManyToOne(() => Category, (category) => category.products)
  category: Category;
}