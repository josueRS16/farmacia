import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateSalesInvoiceDto, SalesInvoiceDto } from './dto/create-sales-invoice.dto';
import { UpdateSalesInvoiceDto } from './dto/update-sales-invoice.dto';
import { SalesInvoice } from './entities/sales-invoice.entity';
import { ClientsService } from 'src/clients/clients.service';
import { ProductService } from 'src/products/products.service';
import { InventoryService } from 'src/inventories/inventories.service';
import { SalesInvoiceDetail } from 'src/sales-invoice-detail/entities/sales-invoice-detail.entity';
import { plainToClass } from 'class-transformer';
import { SellerService } from 'src/sellers/sellers.service';
import { PrescriptionService } from 'src/prescriptions/prescriptions.service';

@Injectable()
export class SalesInvoiceService {
  constructor(
    @InjectRepository(SalesInvoice)
    private salesInvoiceRepository: Repository<SalesInvoice>,
    private clientService: ClientsService,
    private productService: ProductService,
    private inventoryService: InventoryService,
    private sellerService: SellerService,
    private prescriptionService: PrescriptionService
  ) {}

  async create(createSalesInvoiceDto: CreateSalesInvoiceDto): Promise<SalesInvoice> {
    const { clientId, sellerId, prescriptionId, saleDate, total, paymentMethod, details } = createSalesInvoiceDto;

    const client = await this.clientService.findOne(clientId);
    const seller = await this.sellerService.findOne(sellerId);
    const prescription = await this.prescriptionService.findOne(prescriptionId);

    // Crear la factura de venta
    const salesInvoice = this.salesInvoiceRepository.create({
      saleDate,
      total,
      paymentMethod,
      client,
      seller,
      prescription,
    });

    // Inicializar la lista de detalles
    salesInvoice.details = [];

    // Procesar detalles
    for (const detailDto of details) {
      const product = await this.productService.findOne(detailDto.productId);

      // Verificar stock suficiente
      const isStockAvailable = await this.inventoryService.isStockAvailable(
        product.productId,
        detailDto.quantity,
      );

      console.log(isStockAvailable);

      if (!isStockAvailable) {
        throw new BadRequestException(
          `Stock insuficiente para el producto ${product.name}`,
        );
      }

      // Reducir el stock
      await this.inventoryService.reduceStock(product.productId, detailDto.quantity);

      // Crear el detalle de la factura
      const salesDetail = new SalesInvoiceDetail();
      salesDetail.product = product;
      salesDetail.quantity = detailDto.quantity;
      salesDetail.unitPrice = detailDto.unitPrice;
      salesDetail.date = detailDto.date;
      salesDetail.salesInvoice = salesInvoice; // Establecer la relación con la factura

      // Agregar el detalle a la lista
      salesInvoice.details.push(salesDetail);
    }

    // Guardar la factura de venta con los detalles
    return await this.salesInvoiceRepository.save(salesInvoice);
  }

  async findAll(): Promise<SalesInvoice[]> {
    return await this.salesInvoiceRepository.find({
      relations: ['seller.branch','client', 'prescription.doctor', 'prescription.client', 'details', 'details.product'],
    });
  }

  async findOne(id: number): Promise<SalesInvoice> {
    const salesInvoice = await this.salesInvoiceRepository.findOne({
      where: { salesInvoiceId: id },
      relations: ['seller.branch', 'client', 'prescription.doctor.cliente', 'details', 'details.product'],
    });
    if (!salesInvoice) {
      throw new NotFoundException(`Factura de venta con ID ${id} no encontrada`);
    }
    return salesInvoice;
  }

  async getSalesReport(
    startDate: string,
    endDate: string,
    productId?: number,
  ): Promise<SalesInvoiceDto[]> {
    const query = this.salesInvoiceRepository.createQueryBuilder('salesInvoice')
    .leftJoinAndSelect('salesInvoice.seller', 'seller')
      .leftJoinAndSelect('salesInvoice.client', 'client')
      .leftJoinAndSelect('salesInvoice.prescription', 'prescription')
      .leftJoinAndSelect('salesInvoice.details', 'details')
      .leftJoinAndSelect('details.product', 'product')
      .where('salesInvoice.saleDate BETWEEN :startDate AND :endDate', { startDate, endDate });

    if (productId) {
      query.andWhere('product.productId = :productId', { productId });
    }

    const salesInvoices = await query.getMany();
    return salesInvoices.map((invoice) =>
      plainToClass(SalesInvoiceDto, invoice, { excludeExtraneousValues: true }),
    );
  }

  // Métodos para actualizar y eliminar si son necesarios
}