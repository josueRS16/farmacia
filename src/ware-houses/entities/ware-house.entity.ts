import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Inventory } from 'src/inventories/entities/inventory.entity';

@Entity()
export class Warehouse {
  @ApiProperty({ description: 'Unique identifier for the warehouse' })
  @PrimaryGeneratedColumn()
  warehouseId: number;

  @ApiProperty({ description: 'Name of the warehouse' })
  @Column({ length: 100 })
  name: string;

  @ApiProperty({ description: 'Phone number of the warehouse' })
  @Column({ length: 20 })
  phone: string;

  @ApiProperty({ description: 'Address of the warehouse' })
  @Column({ length: 200 })
  address: string;

  @ApiProperty({ description: 'Manager of the warehouse' })
  @Column({ length: 100 })
  manager: string;

  @OneToMany(() => Inventory, (inventory) => inventory.warehouse)
  inventories: Inventory[];
}