import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, MoreThan, Repository } from 'typeorm';
import { CreateInventoryDto } from './dto/create-inventory.dto';
import { UpdateInventoryDto } from './dto/update-inventory.dto';
import { Inventory } from './entities/inventory.entity';
import { ProductService } from 'src/products/products.service';
import { WarehouseService } from 'src/ware-houses/ware-houses.service';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Inventory)
    private inventoryRepository: Repository<Inventory>,
    private productService: ProductService,
    private warehouseService: WarehouseService,
  ) {}

  async create(createInventoryDto: CreateInventoryDto): Promise<Inventory> {
    const { productId, warehouseId, lotNumber, quantity, startDate, expireDate } = createInventoryDto;

    const product = await this.productService.findOne(productId);
    const warehouse = await this.warehouseService.findOne(warehouseId);

    const inventory = this.inventoryRepository.create({
      product,
      warehouse,
      lotNumber,
      quantity,
      startDate,
      expireDate,
    });

    return await this.inventoryRepository.save(inventory);
  }

  async findAll(): Promise<Inventory[]> {
    return await this.inventoryRepository.find({ relations: ['product.category', 'warehouse'] });
  }

  async findOne(id: number): Promise<Inventory> {
    const inventory = await this.inventoryRepository.findOne({
      where: { inventoryId: id },
      relations: ['product.category', 'warehouse'],
    });
    if (!inventory) {
      throw new NotFoundException(`Inventario con ID ${id} no encontrado`);
    }
    return inventory;
  }

  async update(id: number, updateInventoryDto: UpdateInventoryDto): Promise<Inventory> {
    const inventory = await this.findOne(id);
    Object.assign(inventory, updateInventoryDto);
    return await this.inventoryRepository.save(inventory);
  }

  async remove(id: number): Promise<void> {
    const inventory = await this.findOne(id);
    await this.inventoryRepository.remove(inventory);
  }

   // Método para reducir el stock (ya implementado)
   async reduceStock(productId: number, quantity: number): Promise<void> {
    let remainingQuantity = quantity;

    const inventories = await this.inventoryRepository.find({
      where: { product: { productId }, quantity: MoreThan(0) },
      order: { startDate: 'ASC' },
    });

    for (const inventory of inventories) {
      if (remainingQuantity <= 0) break;

      if (inventory.quantity >= remainingQuantity) {
        inventory.quantity -= remainingQuantity;
        remainingQuantity = 0;
      } else {
        remainingQuantity -= inventory.quantity;
        inventory.quantity = 0;
      }

      await this.inventoryRepository.save(inventory);
    }

    if (remainingQuantity > 0) {
      throw new BadRequestException('Stock insuficiente para completar la venta');
    }

    // Actualizar la cantidad total en el producto
    const product = await this.productService.findOne(productId);
    product.quantity -= quantity;
    await this.productService.updateQuantity(productId, product.quantity);
  }

  // Verificar si hay stock suficiente
  async isStockAvailable(productId: number, quantity: number): Promise<boolean> {
    const totalStock = await this.getTotalStock(productId);
    console.log(totalStock);
    return totalStock >= quantity;
  }

  // Obtener el stock total de un producto
  async getTotalStock(productId: number): Promise<number> {
    const inventories = await this.inventoryRepository.find({
      where: { product: { productId }, quantity: MoreThan(0) },
    });
    return inventories.reduce((sum, inventory) => sum + inventory.quantity, 0);
  }

  async findExpiringProducts(days: number): Promise<Inventory[]> {
    const today = new Date();
    const futureDay = new Date();
    futureDay.setDate(today.getDate() + days);

    return await this.inventoryRepository.find({
      where: {
        expireDate: Between(today, futureDay),
        quantity: MoreThan(0),
      },
      relations: ['product', 'product.category'],
    });
  } catch (error) {
    console.error('Error in findExpiringProducts:', error);
    throw error;
  }
}