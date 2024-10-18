import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToOne } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Product } from 'src/products/entities/product.entity';
import { PurchaseInvoiceDetail } from 'src/purchase-invoice-detail/entities/purchase-invoice-detail.entity';
import { Warehouse } from 'src/ware-houses/entities/ware-house.entity';

@Entity()
export class Inventory {
  @ApiProperty({ description: 'Identificador único del inventario' })
  @PrimaryGeneratedColumn()
  inventoryId: number;

  @ApiProperty({ description: 'Producto asociado', type: () => Product })
  @ManyToOne(() => Product, (product) => product.inventories)
  product: Product;

  @ApiProperty({ description: 'Número de lote del producto' })
  @Column({ length: 50 })
  lotNumber: string;

  @ApiProperty({ description: 'Cantidad disponible del lote' })
  @Column({ type: 'int' })
  quantity: number;

  @ApiProperty({ description: 'Fecha de ingreso al inventario' })
  @Column({ type: 'date' })
  startDate: Date;

  @ApiProperty({ description: 'Fecha de caducidad del lote' })
  @Column({ type: 'date' })
  expireDate: Date;

  @ApiProperty({ description: 'Fecha de salida del inventario', required: false })
  @Column({ type: 'date', nullable: true })
  endDate: Date;

  @ApiProperty({ description: 'Warehouse where the inventory is stored', type: () => Warehouse })
  @ManyToOne(() => Warehouse, (warehouse) => warehouse.inventories)
  warehouse: Warehouse;
}