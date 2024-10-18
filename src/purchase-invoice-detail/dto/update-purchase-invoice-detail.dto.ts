import { PartialType } from '@nestjs/swagger';
import { CreatePurchaseInvoiceDetailDto } from './create-purchase-invoice-detail.dto';

export class UpdatePurchaseInvoiceDetailDto extends PartialType(CreatePurchaseInvoiceDetailDto) {}
