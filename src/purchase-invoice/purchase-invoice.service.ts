import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreatePurchaseInvoiceDto } from './dto/create-purchase-invoice.dto';
import { UpdatePurchaseInvoiceDto } from './dto/update-purchase-invoice.dto';
import { PurchaseInvoice } from './entities/purchase-invoice.entity';
import { PurchaseInvoiceDetail } from 'src/purchase-invoice-detail/entities/purchase-invoice-detail.entity';
import { SupplierService } from 'src/suppliers/suppliers.service';
import { ProductService } from 'src/products/products.service';
import { InventoryService } from 'src/inventories/inventories.service';
import { WarehouseService } from 'src/ware-houses/ware-houses.service';

@Injectable()
export class PurchaseInvoiceService {
  constructor(
    @InjectRepository(PurchaseInvoice)
    private purchaseInvoiceRepository: Repository<PurchaseInvoice>,
    @InjectRepository(PurchaseInvoiceDetail)
    private purchaseInvoiceDetailRepository: Repository<PurchaseInvoiceDetail>,
    private supplierService: SupplierService,
    private productService: ProductService,
    private inventoryService: InventoryService,
    private warehouseService: WarehouseService,
  ) {}

  async create(createPurchaseInvoiceDto: CreatePurchaseInvoiceDto): Promise<PurchaseInvoice> {
    const { supplierId, paymentMethod, date, total, details, warehouseId } = createPurchaseInvoiceDto;

    const supplier = await this.supplierService.findOne(supplierId);

    // Crear la factura de compra
    const purchaseInvoice = this.purchaseInvoiceRepository.create({
      date,
      total,
      paymentMethod,
      supplier,
    });

    // Guardar la factura
    await this.purchaseInvoiceRepository.save(purchaseInvoice);

    // Procesar detalles
    for (const detailDto of details) {
      const product = await this.productService.findOne(detailDto.productId);

      // Crear el detalle de la factura
      const purchaseDetail = this.purchaseInvoiceDetailRepository.create({
        purchaseInvoice,
        product,
        quantity: detailDto.quantity,
        unitPrice: detailDto.unitPrice,
        lotNumber: detailDto.lotNumber,
        expireDate: detailDto.expireDate,
      });

      await this.purchaseInvoiceDetailRepository.save(purchaseDetail);

      // Actualizar el stock del producto
      product.quantity += detailDto.quantity;
      await this.productService.updateQuantity(product.productId, product.quantity);

      // Crear el registro en Inventario
      const warehouse = await this.warehouseService.findOne(warehouseId);
      await this.inventoryService.create({
        productId: product.productId,
        warehouseId: warehouse.warehouseId,
        lotNumber: detailDto.lotNumber,
        quantity: detailDto.quantity,
        startDate: date, // Usamos la fecha de la factura
        expireDate: detailDto.expireDate,
      });
    }
    return this.findOne(purchaseInvoice.purchaseInvoiceId);
  }

  async findAll(): Promise<PurchaseInvoice[]> {
    return await this.purchaseInvoiceRepository.find({
      relations: ['supplier', 'details', 'details.product.category'],
    });
  }

  async findOne(id: number): Promise<PurchaseInvoice> {
    const purchaseInvoice = await this.purchaseInvoiceRepository.findOne({
      where: { purchaseInvoiceId: id },
      relations: ['supplier', 'details', 'details.product.category'],
    });
    if (!purchaseInvoice) {
      throw new NotFoundException(`Factura de compra con ID ${id} no encontrada`);
    }
    return purchaseInvoice;
  }

  // Métodos para actualizar y eliminar si son necesarios
}