import {PurchaseOrder} from './purchase-order';
import {Monogram} from './monogram';

export class OrderItem {
  purchaseOrder: PurchaseOrder;
  monogram: Monogram;
  signature: string;

  public constructor(init?: Partial<OrderItem>) {
    Object.assign(this, init);
  }
}
