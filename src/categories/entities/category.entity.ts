import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/products/entities/product.entity';

@Entity()
export class Category {
  @ApiProperty({ description: 'Identificador único de la categoría' })
  @PrimaryGeneratedColumn()
  categoryId: number;

  @ApiProperty({ description: 'Nombre de la categoría' })
  @Column({ type: 'varchar', length: 100 })
  name: string;

  @ApiProperty({ description: 'Descripción de la categoría' })
  @Column({ type: 'text', nullable: true })
  description: string;

  @ApiProperty({ description: 'Productos pertenecientes a la categoría', type: () => [Product] })
  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}
