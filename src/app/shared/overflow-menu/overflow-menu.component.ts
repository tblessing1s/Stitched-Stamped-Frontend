import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {OrderItemService} from '../../services/order-item/order-item.service';
import {GeneratePdfService} from '../../services/generate-pdf/generate-pdf.service';
import {CustomerService} from '../../services/customer/customer.service';
import {Monogram} from '../../models/monogram';
import {SpecialOrder} from '../../models/special-order';
import {Customer} from '../../models/customer';
import {PurchaseOrderService} from '../../services/purchase-order/purchase-order.service';
import {PurchaseOrder} from '../../models/purchase-order';

@Component({
  selector: 'app-overflow-menu',
  templateUrl: './overflow-menu.component.html',
  styleUrls: ['./overflow-menu.component.scss']
})
export class OverflowMenuComponent implements OnInit  {
  @Input() purchaseOrderId: number;
  @Output() isOrderFinished: EventEmitter<boolean> = new EventEmitter<boolean>();

  monogramList: Monogram[];
  specialOrderList: SpecialOrder[];
  customer: Customer;
  purchaseOrder: PurchaseOrder;

  constructor(
    private generatePdfService: GeneratePdfService,
    private customerService: CustomerService,
    private orderItemService: OrderItemService,
    private purchaseOrderService: PurchaseOrderService
  ) {
  }

  ngOnInit() {
    this.purchaseOrderService.getPurchaseOrder(this.purchaseOrderId).subscribe(purchaseOrder => this.purchaseOrder = purchaseOrder);
    this.customerService.getCustomerByPurchaseOrderId(this.purchaseOrderId).subscribe(customer => this.customer = customer);
    this.orderItemService.getMonogramsByOrderId(this.purchaseOrderId).subscribe(monograms => this.monogramList = monograms);
    this.orderItemService.getSpecialOrdersByOrderId(this.purchaseOrderId).subscribe(specialOrders => this.specialOrderList = specialOrders);
  }

  handleFinishOrderClick() {
    this.isOrderFinished.emit(true);
  }

  handleGeneratePdfClick() {
    this.generatePdfService.createPDF(this.customer, this.purchaseOrder, this.monogramList, this.specialOrderList);
  }
}
