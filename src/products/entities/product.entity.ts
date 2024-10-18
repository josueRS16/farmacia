import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from 'src/categories/entities/category.entity';
import { PurchaseInvoiceDetail } from 'src/purchase-invoice-detail/entities/purchase-invoice-detail.entity';
import { Inventory } from 'src/inventories/entities/inventory.entity';
import { SalesInvoiceDetail } from 'src/sales-invoice-detail/entities/sales-invoice-detail.entity';
import { PrescriptionDetail } from 'src/prescriptions-details/entities/prescriptions-detail.entity';
import { Exclude, Expose } from 'class-transformer';

@Entity()
@Exclude()
export class Product {
  @ApiProperty({ description: 'Identificador único del producto' })
  @PrimaryGeneratedColumn()
  @Expose()
  productId: number;

  @ApiProperty({ description: 'Nombre del producto' })
  @Column({ type: 'varchar', length: 100 })
  @Expose()
  name: string;

  @ApiProperty({ description: 'Precio del producto' })
  @Column({ type: 'float' })
  @Expose()
  price: number;

  @ApiProperty({ description: 'Fecha de caducidad del producto' })
  @Column({ type: 'date' })
  @Expose()
  expireDate: Date;

  @ApiProperty({ description: 'Cantidad disponible del producto' })
  @Column({ type: 'int' })
  @Expose()
  quantity: number;

  @ApiProperty({ description: 'Condiciones de almacenamiento del producto', required: false })
  @Column({ type: 'text', nullable: true })
  @Expose()
  storageConditions?: string;

  @ApiProperty({ description: 'Categoría a la que pertenece el producto', type: () => Category })
  @ManyToOne(() => Category, (category) => category.products)
  @Expose()
  category: Category;

  @OneToMany(() => PurchaseInvoiceDetail, (detail) => detail.product)
  purchaseInvoiceDetails: PurchaseInvoiceDetail[];

  @OneToMany(() => Inventory, (inventory) => inventory.product)
  inventories: Inventory[];

  @OneToMany(() => SalesInvoiceDetail, (detail) => detail.product)
  salesInvoiceDetails: SalesInvoiceDetail[];

  @ApiProperty({ description: 'Detalle de receta para el producto', type: () => [PrescriptionDetail] })
  @OneToMany(() => PrescriptionDetail, (prescriptionDetail) => prescriptionDetail.product)
  prescriptionDetails: PrescriptionDetail[];
}