import { PartialType } from '@nestjs/swagger';
import { CreateSalesInvoiceDetailDto } from './create-sales-invoice-detail.dto';

export class UpdateSalesInvoiceDetailDto extends PartialType(CreateSalesInvoiceDetailDto) {}
